import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, CheckCircle, AlertCircle, UserCheck, Camera as CameraIcon } from 'lucide-react';
import Profile from './Profile';

function KYCVerification() {
  const [verificationStep, setVerificationStep] = useState(1);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    idType: '',
    idNumber: '',
    profileImage: ''
  });

  const [facialScanInstructions, setFacialScanInstructions] = useState({
    current: 'center',
    completed: [],
    messages: {
      center: 'Position your face in the center',
      left: 'Turn your head slightly to the left',
      right: 'Turn your head slightly to the right',
      up: 'Tilt your head slightly up',
      down: 'Tilt your head slightly down'
    }
  });

  const idTypes = [
    { value: 'nin', label: 'National Identification Number (NIN)' },
    { value: 'passport', label: 'International Passport' },
    { value: 'driverLicense', label: "Driver's License" },
    { value: 'nationalId', label: 'National ID Card' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  const captureImage = useCallback(() => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL('image/jpeg');
      setFormData(prev => ({ ...prev, profileImage: imageData }));
      
      // Progress through facial scan instructions
      const positions = ['center', 'left', 'right', 'up', 'down'];
      const currentIndex = positions.indexOf(facialScanInstructions.current);
      if (currentIndex < positions.length - 1) {
        setFacialScanInstructions(prev => ({
          ...prev,
          completed: [...prev.completed, prev.current],
          current: positions[currentIndex + 1]
        }));
      } else {
        stopCamera();
        setVerificationStep(4);
      }
    }
  }, [facialScanInstructions.current]);

  const steps = [
    { number: 1, title: 'Personal Details' },
    { number: 2, title: 'Document Upload' },
    { number: 3, title: 'Facial Scan' },
    { number: 4, title: 'Verification' }
  ];

  if (isVerified) {
    return <Profile userData={formData} onUpdate={setFormData} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8 overflow-x-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-shrink-0">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              verificationStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {verificationStep > step.number ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                step.number
              )}
            </div>
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{step.title}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-full h-1 mx-4 ${
                verificationStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Verification Content */}
      <div className="bg-white rounded-xl shadow-sm p-8">
        {verificationStep === 1 && (
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-blue-900">Personal Information</h2>
              <p className="text-gray-600">Please provide your personal details for verification</p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
                <select
                  name="idType"
                  value={formData.idType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select ID Type</option>
                  {idTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </form>
          </div>
        )}

        {verificationStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-900">Upload Your Identity Document</h2>
            <p className="text-gray-600">Please upload a clear photo of your {
              idTypes.find(type => type.value === formData.idType)?.label || 'government-issued ID'
            }</p>
            
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) {
                  setSelectedFile(file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewUrl(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {previewUrl ? (
                <div className="space-y-4">
                  <img src={previewUrl} alt="Document preview" className="max-h-64 mx-auto rounded-lg" />
                  <button 
                    onClick={() => {
                      setSelectedFile(null);
                      setPreviewUrl('');
                    }}
                    className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop your document here, or</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Browse Files
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {verificationStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-blue-900">Facial Verification</h2>
            <p className="text-gray-600">Please follow the instructions to complete the facial scan</p>
            
            <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
              {isCameraActive ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 border-4 border-white rounded-full opacity-50" />
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 px-6 py-3 rounded-lg text-center">
                    <p className="text-gray-900 font-medium">
                      {facialScanInstructions.messages[facialScanInstructions.current]}
                    </p>
                    <div className="flex justify-center mt-2 space-x-2">
                      {['center', 'left', 'right', 'up', 'down'].map((position) => (
                        <div
                          key={position}
                          className={`w-2 h-2 rounded-full ${
                            facialScanInstructions.completed.includes(position)
                              ? 'bg-green-500'
                              : facialScanInstructions.current === position
                              ? 'bg-blue-500'
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 space-x-2">
                    <button
                      onClick={captureImage}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <CameraIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={stopCamera}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Stop Camera
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={startCamera}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Camera className="w-12 h-12 text-white" />
                  <span className="ml-2 text-white">Start Camera</span>
                </button>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Instructions:</h3>
              <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                <li>Ensure good lighting on your face</li>
                <li>Remove glasses or face coverings</li>
                <li>Keep your face centered in the circle</li>
                <li>Follow the prompts to turn your head slightly</li>
                <li>Stay still when capturing each position</li>
              </ul>
            </div>
          </div>
        )}

        {verificationStep === 4 && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <UserCheck className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Verification Complete!</h2>
              <p className="text-gray-600">Your identity has been successfully verified</p>
            </div>
            <button
              onClick={() => setIsVerified(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Profile
            </button>
          </div>
        )}

        {/* Navigation Buttons */}
        {verificationStep < 4 && (
          <div className="flex justify-between mt-8">
            {verificationStep > 1 && (
              <button
                onClick={() => {
                  if (verificationStep === 3) {
                    stopCamera();
                  }
                  setVerificationStep(prev => prev - 1);
                }}
                className="px-6 py-2 text-gray-600 hover:text-gray-900"
              >
                Back
              </button>
            )}
            <button
              onClick={() => {
                if (verificationStep === 3) {
                  stopCamera();
                }
                setVerificationStep(prev => prev + 1);
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default KYCVerification;