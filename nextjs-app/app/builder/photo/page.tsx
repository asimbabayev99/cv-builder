'use client';

import { useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BuilderSidebar, { BUILDER_STEPS, StepItem } from '@/components/BuilderSidebar';
import BuilderPreview from '@/components/BuilderPreview';

export default function BuilderPhotoPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const steps: StepItem[] = useMemo(
    () =>
      BUILDER_STEPS.map((step) => ({
        ...step,
        active: step.label === 'Profile',
      })),
    []
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <BuilderSidebar steps={steps} progress={10} />

      {/* Center: Photo Upload Form */}
      <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 py-12 pb-32">
          {/* Header */}
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-4xl font-black leading-tight tracking-tight">Profile Image</h2>
            <p className="text-[#616289] text-base">
              Upload a professional photo to personalize your resume. This step is optional.
            </p>
          </div>

          {/* Upload Area */}
          <div className="flex flex-col">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={handleFileChange}
            />

            {preview ? (
              /* Photo uploaded state */
              <div className="flex flex-col items-center justify-center gap-6 rounded-xl border-2 border-primary/30 bg-primary/5 px-6 py-16 transition-colors">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={preview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                    width={128}
                    height={128}
                    unoptimized
                  />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <p className="text-[#111118] text-lg font-bold leading-tight tracking-tight text-center">
                    Photo uploaded
                  </p>
                  <p className="text-[#616289] text-sm font-normal leading-normal text-center">
                    Looking great! You can change it anytime.
                  </p>
                </div>
                <button
                  onClick={handleSelectFile}
                  className="flex min-w-[120px] items-center justify-center rounded-lg h-10 px-5 bg-white border border-[#dbdbe6] text-[#111118] text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <span className="truncate">Change Photo</span>
                </button>
              </div>
            ) : (
              /* Upload prompt state */
              <div
                onClick={handleSelectFile}
                className="group flex flex-col items-center justify-center gap-6 rounded-xl border-2 border-dashed border-[#dbdbe6] hover:border-primary bg-background-light/50 px-6 py-16 transition-colors cursor-pointer"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined !text-3xl">add_a_photo</span>
                  </div>
                  <div className="flex max-w-[480px] flex-col items-center gap-1">
                    <p className="text-[#111118] text-lg font-bold leading-tight tracking-tight text-center">
                      Upload your photo
                    </p>
                    <p className="text-[#616289] text-sm font-normal leading-normal text-center">
                      Supports JPG, PNG (Max 5MB)
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectFile();
                  }}
                  className="flex min-w-[120px] items-center justify-center rounded-lg h-10 px-5 bg-white border border-[#dbdbe6] text-[#111118] text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors"
                >
                  <span className="truncate">Select File</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Sticky Bottom Navigation */}
        <footer className="fixed bottom-0 left-64 right-[450px] bg-white/80 backdrop-blur-md border-t border-[#dbdbe6] px-8 py-4 z-10 flex justify-between items-center">
          <button
            onClick={() => router.push('/templates')}
            className="px-6 py-2.5 text-[#111118] font-bold text-sm hover:bg-[#f0f0f4] rounded-lg transition-all"
          >
            Back
          </button>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/builder/personal')}
              className="px-6 py-2.5 text-[#616289] font-bold text-sm hover:text-primary transition-all"
            >
              Skip this step
            </button>
            <button
              onClick={() => router.push('/builder/personal')}
              className="px-8 py-2.5 bg-primary text-white font-bold text-sm rounded-lg shadow-lg shadow-primary/20 hover:bg-[#3235d6] transition-all"
            >
              Save &amp; Continue
            </button>
          </div>
        </footer>
      </main>

      <BuilderPreview />
    </div>
  );
}
