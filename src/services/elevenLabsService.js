/**
 * iCanvass PDM — ElevenLabs Voice Synthesis Service
 * Direct client-side speech generation for RealTalk, Audio Writer, and ConTalk
 */

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || '';

export const ELEVEN_VOICES = [
  { id: '21m00Tcm4TlvDq8ikWAM', name: 'Rachel', label: 'Rachel (Executive Female)', gender: 'female' },
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam', label: 'Adam (Authoritative Male Closer)', gender: 'male' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie', label: 'Charlie (Conversational Dynamic)', gender: 'male' },
];

/**
 * Smart extractor to pull out spoken dialogue from screenplay/scripts
 * Removes stage directions, [0:00-0:05], (SOUND OF...), and Markdown tags
 */
export function extractSpokenDialogue(rawScript) {
  if (!rawScript) return '';

  let clean = rawScript
    // Remove parenthesized directions e.g. (SOUND of subtle data processing...)
    .replace(/\([^)]*\)/g, '')
    // Remove timestamps like [0:00 - 0:05] or [pause]
    .replace(/\[[^\]]*\]/g, '')
    // Remove metadata headers like **Studio Mode:** or **Customer says:**
    .replace(/\*\*[^*]+\*\*/g, '')
    // Remove markdown symbols
    .replace(/[#*`_>~]/g, '')
    // Replace multiple spaces and newlines
    .replace(/\s+/g, ' ')
    .trim();

  // Limit character length to 500 chars to strictly conserve ElevenLabs free credits
  if (clean.length > 500) {
    clean = clean.slice(0, 500) + '...';
  }

  return clean;
}

/**
 * Call ElevenLabs Text-to-Speech API directly from browser
 * @param {string} text Spoken dialogue text
 * @param {string} voiceId ElevenLabs voice ID
 * @returns {Promise<string>} Blob URL of the generated MP3
 */
export async function generateElevenLabsSpeech(text, voiceId = '21m00Tcm4TlvDq8ikWAM') {
  const apiKey = ELEVENLABS_API_KEY;

  if (!apiKey || apiKey === 'your_elevenlabs_api_key_here') {
    throw new Error('ElevenLabs API key is missing. Please check VITE_ELEVENLABS_API_KEY in .env.');
  }

  const spokenText = extractSpokenDialogue(text);
  if (!spokenText || spokenText.length < 3) {
    throw new Error('No spoken dialogue found in the text to synthesize.');
  }

  const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': apiKey,
    },
    body: JSON.stringify({
      text: spokenText,
      model_id: 'eleven_multilingual_v2',
      voice_settings: {
        stability: 0.55,
        similarity_boost: 0.8,
        style: 0.15,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    const errorJson = await response.json().catch(() => ({}));
    const errorMsg = errorJson?.detail?.message || `ElevenLabs API error (HTTP ${response.status})`;
    throw new Error(errorMsg);
  }

  const audioBlob = await response.blob();
  return URL.createObjectURL(audioBlob);
}
