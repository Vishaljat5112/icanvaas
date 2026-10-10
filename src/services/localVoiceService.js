export class LocalVoiceService {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.stream = null;
  }

  async startRecording() {
    this.audioChunks = [];
    try {
      console.log('[STT] Requesting microphone access...');
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      console.log('[STT] Microphone access granted.');
      
      const mimeTypes = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/mp4',
        'audio/ogg;codecs=opus'
      ];
      
      let mimeType = '';
      for (const mt of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mt)) {
          mimeType = mt;
          break;
        }
      }
      
      if (!mimeType) {
        console.warn('[STT] No preferred MIME type supported, falling back to browser default.');
      } else {
        console.log(`[STT] Selected Audio MIME type: ${mimeType}`);
      }

      this.mediaRecorder = new MediaRecorder(this.stream, mimeType ? { mimeType } : undefined);
      this.startTime = Date.now();

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();
      console.log('[STT] Recording started...');
      return true;
    } catch (err) {
      console.error('Microphone access error:', err);
      throw new Error('Microphone permission denied or unsupported.');
    }
  }

  stopRecording() {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: this.mediaRecorder.mimeType });
        const duration = Date.now() - this.startTime;
        
        console.log(`[STT] Recording stopped.`);
        console.log(`[STT] Audio blob size: ${audioBlob.size} bytes`);
        console.log(`[STT] Approximate duration: ${duration}ms`);
        
        if (this.stream) {
          this.stream.getTracks().forEach((track) => track.stop());
        }
        resolve(audioBlob);
      };

      try {
        this.mediaRecorder.stop();
      } catch (e) {
        console.error('[STT] Error stopping MediaRecorder:', e);
        resolve(null);
      }
    });
  }

  async transcribeAudio(audioBlob) {
    if (!audioBlob || audioBlob.size === 0) {
      console.warn('[STT] Rejected empty audio blob before upload.');
      throw new Error('Audio blob is empty');
    }

    console.log('[STT] STT request started (uploading to /api/voice/transcribe)...');
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    // Default to proxy URL which is same origin if vite handles it
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    const res = await fetch(`${baseUrl}/api/voice/transcribe`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      throw new Error('STT Endpoint returned an error');
    }

    const data = await res.json();
    console.log('[STT] STT response received.');
    
    if (!data.success) {
      throw new Error(data.error || 'Transcription failed');
    }

    const transcript = data.text || '';
    console.log(`[STT] Transcript length: ${transcript.length}`);
    console.log(`[STT] Transcript text: "${transcript}"`);
    
    return transcript;
  }

  async sendToLocalLLM(message, history = []) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    const res = await fetch(`${baseUrl}/api/voice/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, history }),
    });

    if (!res.ok) {
      let errorMsg = 'LLM Endpoint returned an error';
      try {
        const errData = await res.json();
        if (errData.error && errData.error.message) {
          errorMsg = errData.error.message;
        } else if (errData.error) {
          errorMsg = errData.error;
        }
      } catch (e) {}
      throw new Error(errorMsg);
    }

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.error || 'Local LLM generation failed');
    }

    return data.text;
  }

  async synthesizeSpeech(text) {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    const res = await fetch(`${baseUrl}/api/voice/synthesize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      throw new Error('TTS Endpoint returned an error');
    }

    const blob = await res.blob();
    return URL.createObjectURL(blob);
  }
}

export const localVoiceService = new LocalVoiceService();
