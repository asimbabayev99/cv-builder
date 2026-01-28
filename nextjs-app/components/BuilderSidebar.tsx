'use client';

export interface StepItem {
  label: string;
  icon: string;
  completed: boolean;
  active?: boolean;
}

interface BuilderSidebarProps {
  steps: StepItem[];
  progress: number;
}

export const BUILDER_STEPS: StepItem[] = [
  { label: 'Profile', icon: 'account_circle', completed: false },
  { label: 'Personal Info', icon: 'person', completed: false },
  { label: 'Education', icon: 'school', completed: false },
  { label: 'Work Experience', icon: 'work', completed: false },
  { label: 'Skills', icon: 'construction', completed: false },
  { label: 'Languages', icon: 'translate', completed: false },
  { label: 'Certificates', icon: 'workspace_premium', completed: false },
  { label: 'Custom', icon: 'dashboard_customize', completed: false },
  { label: 'Summary', icon: 'description', completed: false },
  { label: 'Finalize', icon: 'verified', completed: false },
];

export default function BuilderSidebar({ steps, progress }: BuilderSidebarProps) {
  return (
    <aside className="w-64 flex flex-col bg-white border-r border-[#dbdbe6] shrink-0">
      <div className="p-6 flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-black tracking-tight text-primary">ResumeAI</h1>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-[#616289]">Progress</span>
              <span className="text-primary">{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#f0f0f4] rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <nav className="flex flex-col gap-1 grow">
          {steps.map((step) => (
            <div
              key={step.label}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                step.active
                  ? 'bg-primary/10 text-primary'
                  : 'text-[#616289] hover:bg-background-light'
              }`}
            >
              <span
                className={`material-symbols-outlined ${step.active ? 'fill-1' : ''} ${
                  step.completed ? 'text-green-500 font-bold' : ''
                }`}
                style={{ fontSize: '20px' }}
              >
                {step.completed ? 'check_circle' : step.icon}
              </span>
              <p className={`text-sm ${step.active ? 'font-bold' : 'font-medium'}`}>
                {step.label}
              </p>
            </div>
          ))}
        </nav>

        <div className="mt-auto border-t border-[#dbdbe6] pt-4">
          <div className="flex items-center gap-3 px-3 py-2 text-[#616289] cursor-pointer hover:bg-background-light rounded-lg transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
              help
            </span>
            <p className="text-sm font-medium">Help Center</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
