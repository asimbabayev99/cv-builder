'use client';

export default function BuilderPreview() {
  return (
    <aside className="w-[450px] bg-[#f0f0f4] flex justify-center overflow-y-auto overflow-x-hidden custom-scrollbar border-l border-[#dbdbe6] shrink-0">
      <div className="flex flex-col items-center justify-center min-h-full py-12">
        {/* Zoom/Print Toolbar */}
        <div className="mb-4 flex gap-4 bg-white px-4 py-2 rounded-full shadow-sm border border-[#dbdbe6]">
          <button className="p-1 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">zoom_in</span>
          </button>
          <div className="w-[1px] h-4 bg-[#dbdbe6] my-auto" />
          <button className="p-1 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">zoom_out</span>
          </button>
          <div className="w-[1px] h-4 bg-[#dbdbe6] my-auto" />
          <button className="p-1 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-lg">print</span>
          </button>
        </div>

        {/* A4 Sheet Container with template image */}
        <div className="bg-white shadow-2xl rounded">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM8ok4ntoa6ySfniFh3UD4l5eSorNmITMiFSSvub8k4DQTS0S-G27rOJjzTs_Xc82WcC41fO91OptpcllTWmDLUCxAtKeJ3MZ4iRb61MSxboFQuK2Nw4K4VcYbvdm_KGc0Fwt2Vtopfew9qr-rLAFt9RraMeajWI5_46LOxRA4QTP4yFhBr8qmFp7ikhvM8z1gr-JlkZsl-itsiVkMmNajljGFY5MaVO4ccnLJWcQgWBN6T5lYCk3YvxzxeWGO358ZZIY5FiEGcEk"
            alt="Resume template preview"
            className="w-[360px] object-contain"
          />
        </div>
      </div>
    </aside>
  );
}
