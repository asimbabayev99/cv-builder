'use client';

interface AiSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (text: string) => void;
  currentDraft: string;
}

const AI_SUGGESTION =
  'Dynamic Marketing Strategist with 5+ years of experience in digital growth. Specialized in data-driven campaign optimization and multi-channel marketing strategies. Proven track record of increasing user acquisition by 40% through innovative lifecycle marketing.';

export default function AiSummaryModal({
  isOpen,
  onClose,
  onApply,
  currentDraft,
}: AiSummaryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111118]/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#dbdbe6] flex items-center justify-between">
          <div className="flex items-center gap-3 text-primary">
            <span className="material-symbols-outlined text-2xl">
              auto_awesome
            </span>
            <h3 className="text-xl font-bold text-[#111118]">
              AI Summary Generator
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#616289] hover:text-[#111118] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#616289] bg-[#f0f0f4] px-2 py-1 rounded">
                Current Draft
              </span>
            </div>
            <div className="p-5 rounded-xl border-2 border-[#dbdbe6] bg-[#f9fafb] h-full">
              <p className="text-[#616289] leading-relaxed text-sm italic">
                &quot;{currentDraft || 'No summary written yet...'}&quot;
              </p>
            </div>
          </div>

          {/* After (AI Suggestion) */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">
                AI Suggestion
              </span>
              <div className="flex gap-0.5 ml-auto">
                <span className="size-1.5 bg-primary rounded-full animate-pulse" />
                <span className="size-1.5 bg-primary rounded-full animate-pulse [animation-delay:200ms]" />
                <span className="size-1.5 bg-primary rounded-full animate-pulse [animation-delay:400ms]" />
              </div>
            </div>
            <div className="p-5 rounded-xl border-2 border-primary bg-primary/5 h-full">
              <p className="text-[#111118] leading-relaxed text-sm font-medium">
                &quot;{AI_SUGGESTION}&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-[#f9fafb] flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#616289] hover:text-[#111118] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
            Discard Changes
          </button>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg border-2 border-[#dbdbe6] text-sm font-bold text-[#111118] hover:bg-[#f0f0f4] transition-all">
              <span className="material-symbols-outlined text-lg">
                refresh
              </span>
              Try Again
            </button>
            <button
              onClick={() => {
                onApply(AI_SUGGESTION);
                onClose();
              }}
              className="px-8 py-2.5 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Approve &amp; Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
