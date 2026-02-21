'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BuilderSidebar, { BUILDER_STEPS, StepItem } from '@/components/BuilderSidebar';
import AiSummaryModal from '@/components/AiSummaryModal';
import ImageCropper from '@/components/ImageCropper';
import { useResume } from '@/contexts/ResumeContext';
import { templateRequiresPhoto } from '@/lib/template-config';

export default function BuilderPersonalPage() {
  const router = useRouter();
  const { resume, saveSection, loading } = useResume();
  const [showAiModal, setShowAiModal] = useState(false);

  // Profile Image State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [tempImageSrc, setTempImageSrc] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  // Personal Info State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [professionalTitle, setProfessionalTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [summary, setSummary] = useState('');

  // Populate from loaded resume
  useEffect(() => {
    if (!resume) return;
    setFirstName(resume.first_name ?? '');
    setLastName(resume.last_name ?? '');
    setProfessionalTitle(resume.professional_title ?? '');
    setEmail(resume.email ?? '');
    setPhone(resume.phone ?? '');
    setCountry(resume.country ?? '');
    setCity(resume.city ?? '');
    setSummary(resume.summary ?? '');
    setPhotoUrl(resume.photo_url ?? null);
  }, [resume]);

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Check if selected template requires photo
  const requiresPhoto = templateRequiresPhoto(resume?.template_name);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!country.trim()) {
      newErrors.country = 'Country is required';
    }
    if (!city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!summary.trim()) {
      newErrors.summary = 'Professional summary is required';
    }
    if (requiresPhoto && !photoUrl) {
      newErrors.photo = 'Profile photo is required for this template';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      await saveSection('personal-info', {
        first_name: firstName,
        last_name: lastName,
        professional_title: professionalTitle,
        email,
        phone,
        country,
        city,
        summary,
        photo_url: photoUrl,
      });
      router.push('/builder/education');
    } catch {
      // stay on page
    } finally {
      setSaving(false);
    }
  };

  // Handle file selection - open cropper
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImageSrc(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
    // Reset input so same file can be selected again
    e.target.value = '';
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    setPhotoUrl(croppedImageUrl);
    setTempImageSrc(null);
  };

  const handleRemovePhoto = () => {
    setPhotoUrl(null);
  };

  const steps: StepItem[] = useMemo(
    () =>
      BUILDER_STEPS.map((step) => ({
        ...step,
        active: step.label === 'Personal Info',
      })),
    []
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <BuilderSidebar steps={steps} progress={15} />

      {/* Center: Personal Information Form */}
      <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 py-12 pb-32">
          {/* Header */}
          <div className="flex flex-col gap-2 mb-10">
            <h2 className="text-4xl font-black leading-tight tracking-tight">
              Personal Information
            </h2>
            <p className="text-[#616289] text-base">
              Introduce yourself to employers and provide contact details.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Profile Image Section */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-[#111118]">
                Profile Photo {requiresPhoto ? <span className="text-red-500">*</span> : <span className="text-[#616289] font-normal">(Optional)</span>}
              </label>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="flex items-center gap-6">
                {/* Photo Preview or Placeholder */}
                <div
                  onClick={handleSelectFile}
                  className={`relative w-24 h-24 rounded-full overflow-hidden border-2 cursor-pointer transition-all ${
                    errors.photo
                      ? 'border-red-500 bg-red-50'
                      : photoUrl
                        ? 'border-primary/30 hover:border-primary'
                        : 'border-dashed border-[#dbdbe6] hover:border-primary bg-[#f8f8fa]'
                  }`}
                >
                  {photoUrl ? (
                    <Image
                      src={photoUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      width={96}
                      height={96}
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className={`material-symbols-outlined text-3xl ${errors.photo ? 'text-red-400' : 'text-[#616289]'}`}>
                        add_a_photo
                      </span>
                    </div>
                  )}
                </div>

                {/* Upload/Change Buttons */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleSelectFile}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-[#dbdbe6] text-[#111118] text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">upload</span>
                    {photoUrl ? 'Change Photo' : 'Upload Photo'}
                  </button>
                  {photoUrl && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 text-sm font-semibold hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                      Remove
                    </button>
                  )}
                  <p className="text-xs text-[#616289]">
                    JPG or PNG, max 5MB. Image will be cropped to square.
                  </p>
                  {errors.photo && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">error</span>
                      {errors.photo}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#f0f0f4]" />

            {/* Two-Column Grid for Personal Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#111118]">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full h-12 px-4 rounded-lg border bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all ${
                    errors.firstName ? 'border-red-500' : 'border-[#dbdbe6]'
                  }`}
                  placeholder="e.g. Alexander"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#111118]">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full h-12 px-4 rounded-lg border bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all ${
                    errors.lastName ? 'border-red-500' : 'border-[#dbdbe6]'
                  }`}
                  placeholder="e.g. Bennett"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-[#111118]">
                  Professional Title
                </label>
                <input
                  className="w-full h-12 px-4 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  placeholder="e.g. Senior Software Engineer"
                  type="text"
                  value={professionalTitle}
                  onChange={(e) => setProfessionalTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#111118]">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#616289] text-xl">
                    mail
                  </span>
                  <input
                    className={`w-full h-12 pl-11 pr-4 rounded-lg border bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all ${
                      errors.email ? 'border-red-500' : 'border-[#dbdbe6]'
                    }`}
                    placeholder="alex.b@example.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#111118]">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#616289] text-xl">
                    call
                  </span>
                  <input
                    className="w-full h-12 pl-11 pr-4 rounded-lg border border-[#dbdbe6] bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#111118]">
                  Country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#616289] text-xl">
                    public
                  </span>
                  <input
                    className={`w-full h-12 pl-11 pr-4 rounded-lg border bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all ${
                      errors.country ? 'border-red-500' : 'border-[#dbdbe6]'
                    }`}
                    placeholder="e.g. United States"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                {errors.country && (
                  <p className="text-xs text-red-500">{errors.country}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#111118]">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#616289] text-xl">
                    location_city
                  </span>
                  <input
                    className={`w-full h-12 pl-11 pr-4 rounded-lg border bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all ${
                      errors.city ? 'border-red-500' : 'border-[#dbdbe6]'
                    }`}
                    placeholder="e.g. San Francisco"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                {errors.city && (
                  <p className="text-xs text-red-500">{errors.city}</p>
                )}
              </div>
            </div>

            {/* AI Enhanced Summary Section */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <label className="text-sm font-semibold text-[#111118]">
                  Professional Summary <span className="text-red-500">*</span>
                </label>
                <button
                  className="flex items-center gap-2 px-4 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-full transition-colors border border-primary/20"
                  type="button"
                  onClick={() => setShowAiModal(true)}
                >
                  <span className="material-symbols-outlined text-sm">
                    auto_awesome
                  </span>
                  GENERATE SUMMARY
                </button>
              </div>
              <div className={`relative border rounded-xl overflow-hidden bg-white shadow-sm ${
                errors.summary ? 'border-red-500' : 'border-[#dbdbe6]'
              }`}>
                <div className="flex items-center gap-2 px-3 py-2 border-b border-[#f0f0f4] bg-[#fbfbfd]">
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      format_bold
                    </span>
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      format_italic
                    </span>
                  </button>
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      format_list_bulleted
                    </span>
                  </button>
                  <div className="h-4 w-px bg-[#dbdbe6] mx-1" />
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-xl">
                      undo
                    </span>
                  </button>
                </div>
                <textarea
                  className="w-full p-4 resize-none border-none focus:ring-0 bg-transparent text-[#111118] text-sm leading-relaxed outline-none"
                  placeholder="Briefly describe your professional background and key achievements..."
                  rows={6}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>
              {errors.summary && (
                <p className="text-xs text-red-500">{errors.summary}</p>
              )}
            </div>
          </form>
        </div>

        {/* Sticky Bottom Navigation */}
        <footer className="fixed bottom-0 left-64 right-0 bg-white/80 backdrop-blur-md border-t border-[#dbdbe6] px-8 py-4 z-10 flex justify-between items-center">
          <button
            onClick={() => router.push('/templates')}
            className="px-6 py-2.5 text-[#111118] font-bold text-sm hover:bg-[#f0f0f4] rounded-lg transition-all"
          >
            Back
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="px-8 py-2.5 bg-primary text-white font-bold text-sm rounded-lg shadow-lg shadow-primary/20 hover:bg-[#3235d6] transition-all disabled:opacity-50"
            type="button"
          >
            {saving ? 'Saving...' : 'Save & Continue'}
          </button>
        </footer>
      </main>

      <AiSummaryModal
        isOpen={showAiModal}
        onClose={() => setShowAiModal(false)}
        onApply={(text) => setSummary(text)}
        currentDraft={summary}
      />

      {/* Image Cropper Modal */}
      {tempImageSrc && (
        <ImageCropper
          isOpen={showCropper}
          imageSrc={tempImageSrc}
          onClose={() => {
            setShowCropper(false);
            setTempImageSrc(null);
          }}
          onCropComplete={handleCropComplete}
        />
      )}
    </div>
  );
}
