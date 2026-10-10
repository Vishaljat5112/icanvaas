import React, { useState } from 'react';
import { User, FileText, UploadCloud, CheckCircle, ArrowRight, ArrowLeft, Camera, FileSignature, ShieldCheck, MapPin } from 'lucide-react';

export const OnboardingModule = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [signatureActive, setSignatureActive] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  const steps = [
    { id: 1, title: 'Personal Profile', icon: User, desc: 'Basic details' },
    { id: 2, title: 'Identity Upload', icon: Camera, desc: 'Verify your ID' },
    { id: 3, title: 'Legal Agreement', icon: FileSignature, desc: 'E-Sign contract' },
    { id: 4, title: 'Approval', icon: ShieldCheck, desc: 'Get verified' },
  ];

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 2000);
  };

  const handleSimulateSign = () => {
    setSignatureActive(true);
    setTimeout(() => {
      setSignatureActive(false);
      setIsSigned(true);
    }, 1500);
  };

  return (
    <div className="h-full bg-surface text-primary overflow-y-auto pb-10">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-b border-border">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <ShieldCheck className="w-64 h-64 text-blue-400" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-8 py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-4 border border-blue-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Action Required
          </div>
          <h1 className="text-4xl font-extrabold text-primary tracking-tight mb-2">Welcome to iCanvass PDM</h1>
          <p className="text-lg text-secondary max-w-2xl">
            Complete your mandatory onboarding process to activate your Circulator account and start collecting signatures.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 mt-8">
        
        {/* Progress Stepper */}
        <div className="mb-16 max-w-4xl mx-auto px-4 md:px-8">
          <div className="relative">
            <div className="absolute left-0 top-6 -translate-y-1/2 w-full h-1 bg-surface-secondary rounded-full z-0"></div>
            <div 
              className="absolute left-0 top-6 -translate-y-1/2 h-1 bg-blue-500 rounded-full z-0 transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            ></div>
            
            <div className="flex justify-between relative z-10">
              {steps.map((step) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex flex-col items-center w-28 md:w-32">
                    <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center border-4 transition-colors duration-300 bg-surface ${
                      isActive ? 'border-blue-500 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]' :
                      isCompleted ? 'border-emerald-500 text-emerald-400' :
                      'border-border text-secondary'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div className="mt-4 text-center h-12">
                      <p className={`text-xs md:text-sm font-bold leading-tight ${isActive ? 'text-primary' : 'text-secondary'}`}>{step.title}</p>
                      <p className="text-[10px] text-secondary hidden md:block mt-1 leading-tight">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="mt-24 bg-surface-secondary border border-border rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          
          {/* STEP 1: Personal Profile */}
          {currentStep === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400"><User className="w-6 h-6" /></div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">Personal Information</h2>
                  <p className="text-secondary text-sm">Enter your legal details as they appear on your ID.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Legal First Name</label>
                  <input type="text" className="w-full bg-surface-secondary border border-border rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="e.g. John" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Legal Last Name</label>
                  <input type="text" className="w-full bg-surface-secondary border border-border rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="e.g. Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Email Address</label>
                  <input type="email" className="w-full bg-surface-secondary border border-border rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="john@example.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Phone Number</label>
                  <input type="tel" className="w-full bg-surface-secondary border border-border rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="(555) 123-4567" />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Home Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
                    <input type="text" className="w-full bg-surface-secondary border border-border rounded-xl pl-12 pr-4 py-3 text-primary focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="123 Signature Ave, City, State, ZIP" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Identity Upload */}
          {currentStep === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400"><Camera className="w-6 h-6" /></div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">Upload Identification</h2>
                  <p className="text-secondary text-sm">State laws require a valid ID on file for all signature gatherers.</p>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* ID Front */}
                <div className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all ${uploadSuccess ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-border bg-surface-secondary hover:border-blue-500/50 hover:bg-surface-secondary'}`}>
                  {uploadSuccess ? (
                    <>
                      <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mb-4">
                        <CheckCircle className="w-8 h-8" />
                      </div>
                      <h3 className="text-emerald-400 font-semibold mb-1">Upload Complete</h3>
                      <p className="text-xs text-secondary">id_front_scan.jpg (2.4 MB)</p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center text-secondary mb-4">
                        <Camera className="w-8 h-8" />
                      </div>
                      <h3 className="text-primary font-semibold mb-2">Front of ID / Driver's License</h3>
                      <p className="text-sm text-secondary mb-6">JPEG, PNG or PDF up to 10MB</p>
                      <button 
                        onClick={handleSimulateUpload}
                        disabled={isUploading}
                        className="px-6 py-2 bg-surface-secondary hover:bg-surface-secondary text-primary rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        {isUploading ? (
                          <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Uploading...</>
                        ) : (
                          <><UploadCloud className="w-4 h-4" /> Select File</>
                        )}
                      </button>
                    </>
                  )}
                </div>
                
                {/* ID Back */}
                <div className="border-2 border-dashed border-border bg-surface-secondary rounded-2xl p-8 flex flex-col items-center justify-center text-center opacity-50 pointer-events-none">
                  <div className="w-16 h-16 bg-surface-secondary rounded-full flex items-center justify-center text-secondary mb-4">
                    <Camera className="w-8 h-8" />
                  </div>
                  <h3 className="text-primary font-semibold mb-2">Back of ID (Required)</h3>
                  <p className="text-sm text-secondary mb-6">Please upload the front first.</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Legal Agreement */}
          {currentStep === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400"><FileSignature className="w-6 h-6" /></div>
                <div>
                  <h2 className="text-2xl font-bold text-primary">Independent Contractor Agreement</h2>
                  <p className="text-secondary text-sm">Please review and electronically sign your contract.</p>
                </div>
              </div>
              
              <div className="mt-6 bg-surface-secondary border border-border rounded-xl p-6 h-64 overflow-y-auto mb-6 custom-scrollbar">
                <h4 className="text-lg font-bold text-primary mb-4">MASTER SERVICES AGREEMENT</h4>
                <p className="text-secondary text-sm leading-relaxed mb-4">
                  This Independent Contractor Agreement ("Agreement") is made and entered into by and between iCanvass PDM (the "Company") and the undersigned Circulator (the "Contractor").
                </p>
                <p className="text-secondary text-sm leading-relaxed mb-4">
                  1. SERVICES: The Contractor agrees to provide petition signature gathering services in compliance with all local, state, and federal laws.
                  <br/><br/>
                  2. COMPENSATION: The Contractor will be paid via the Commission Maker module based on the valid, verified signatures collected, as determined by the Validation Team.
                  <br/><br/>
                  3. INDEPENDENT STATUS: The Contractor is an independent contractor, not an employee. The Contractor is solely responsible for all taxes, withholdings, and compliance with labor laws.
                  <br/><br/>
                  4. INTEGRITY: Any fraudulent signatures or violation of state election laws will result in immediate termination, forfeiture of commissions, and potential legal action.
                </p>
              </div>

              <div className="border border-border rounded-xl p-1 bg-surface-secondary">
                <div className={`h-32 rounded-lg flex items-center justify-center relative overflow-hidden ${isSigned ? 'bg-emerald-500/10' : 'bg-surface'}`}>
                  {isSigned ? (
                    <div className="text-center animate-in zoom-in duration-300">
                      <div className="font-['Brush_Script_MT',cursive] text-4xl text-blue-400 mb-2">John Doe</div>
                      <p className="text-xs text-emerald-500 flex items-center gap-1 justify-center">
                        <CheckCircle className="w-3 h-3" /> Electronically Signed (IP: 192.168.1.1)
                      </p>
                    </div>
                  ) : signatureActive ? (
                    <div className="flex flex-col items-center text-blue-400">
                      <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-3" />
                      <p className="text-sm">Generating Cryptographic Signature...</p>
                    </div>
                  ) : (
                    <button 
                      onClick={handleSimulateSign}
                      className="px-8 py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl font-medium transition-colors"
                    >
                      Click to E-Sign Document
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Approval */}
          {currentStep === 4 && (
            <div className="animate-in fade-in zoom-in-95 duration-500 text-center py-10">
              <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping opacity-75"></div>
                <ShieldCheck className="w-12 h-12 text-blue-400 relative z-10" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-3">Onboarding Complete!</h2>
              <p className="text-secondary max-w-md mx-auto mb-8">
                Your profile, ID, and contract have been successfully submitted to your Sub-Coordinator for final validation. 
              </p>
              
              <div className="bg-surface-secondary border border-border p-6 rounded-2xl max-w-md mx-auto text-left mb-8">
                <h4 className="text-primary font-semibold mb-4 text-sm uppercase tracking-wider">Next Steps:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-secondary text-sm">Account provisioned in iCanvass PDM</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-primary text-sm font-medium">Pending HR / Coordinator Review</span>
                  </li>
                  <li className="flex items-start gap-3 opacity-50">
                    <div className="w-5 h-5 rounded-full border-2 border-border shrink-0"></div>
                    <span className="text-secondary text-sm">Receive territory assignments & materials</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-10 pt-6 border-t border-border flex items-center justify-between">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              className={`px-6 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2 ${
                currentStep === 1 || currentStep === 4
                  ? 'opacity-0 pointer-events-none'
                  : 'bg-surface-secondary hover:bg-surface-secondary text-secondary'
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
                disabled={(currentStep === 2 && !uploadSuccess) || (currentStep === 3 && !isSigned)}
                className={`px-8 py-2.5 rounded-xl font-medium transition-all shadow-lg flex items-center gap-2 ${
                  (currentStep === 2 && !uploadSuccess) || (currentStep === 3 && !isSigned)
                    ? 'bg-surface-secondary text-secondary cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-500 text-primary shadow-blue-500/20'
                }`}
              >
                {currentStep === 3 ? 'Submit & Finish' : 'Continue'} <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => window.location.href = '/crm/dashboard'}
                className="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-primary rounded-xl font-medium shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 mx-auto"
              >
                Go to Dashboard
              </button>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};
