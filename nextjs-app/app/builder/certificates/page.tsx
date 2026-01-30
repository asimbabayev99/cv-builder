'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BuilderSidebar, { BUILDER_STEPS, StepItem } from '@/components/BuilderSidebar';
import BuilderPreview from '@/components/BuilderPreview';
import { useResume } from '@/contexts/ResumeContext';

interface Certificate {
  id: string;
  name: string;
  organization: string;
  issueDate: string;
  expirationDate: string;
  noExpiry: boolean;
  credentialLink: string;
  description: string;
}

export default function BuilderCertificatesPage() {
  const router = useRouter();
  const { resume, saveSection, loading } = useResume();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [editForm, setEditForm] = useState<Certificate>({
    id: '',
    name: '',
    organization: '',
    issueDate: '',
    expirationDate: '',
    noExpiry: false,
    credentialLink: '',
    description: '',
  });

  // Populate from loaded resume
  useEffect(() => {
    if (!resume) return;
    if (resume.certificates && resume.certificates.length > 0) {
      setCertificates(
        resume.certificates.map((c: Record<string, unknown>, i: number) => ({
          id: String(c.id ?? i),
          name: (c.name as string) ?? '',
          organization: (c.organization as string) ?? '',
          issueDate: (c.issue_date as string) ?? '',
          expirationDate: (c.expiration_date as string) ?? '',
          noExpiry: (c.no_expiry as boolean) ?? false,
          credentialLink: (c.credential_link as string) ?? '',
          description: (c.description as string) ?? '',
        }))
      );
    }
  }, [resume]);

  const startEdit = (cert: Certificate) => {
    setExpandedId(cert.id);
    setEditForm({ ...cert });
  };

  const cancelEdit = () => {
    setExpandedId(null);
  };

  const saveCertificate = () => {
    if (!editForm.name.trim()) return;
    setCertificates((prev) =>
      prev.map((c) => (c.id === editForm.id ? { ...editForm } : c))
    );
    setExpandedId(null);
  };

  const deleteCertificate = (id: string) => {
    setCertificates((prev) => prev.filter((c) => c.id !== id));
    setExpandedId(null);
  };

  const addCertificate = () => {
    const newCert: Certificate = {
      id: Date.now().toString(),
      name: '',
      organization: '',
      issueDate: '',
      expirationDate: '',
      noExpiry: false,
      credentialLink: '',
      description: '',
    };
    setCertificates((prev) => [...prev, newCert]);
    setExpandedId(newCert.id);
    setEditForm(newCert);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSection(
        'certificates',
        certificates
          .filter((c) => c.name.trim())
          .map((c, i) => ({
            name: c.name,
            organization: c.organization || null,
            issue_date: c.issueDate || null,
            expiration_date: c.expirationDate || null,
            no_expiry: c.noExpiry,
            credential_link: c.credentialLink || null,
            description: c.description || null,
            sort_order: i,
          }))
      );
      router.push('/builder/custom');
    } catch {
      // stay on page
    } finally {
      setSaving(false);
    }
  };

  const steps: StepItem[] = useMemo(
    () =>
      BUILDER_STEPS.map((step) => ({
        ...step,
        completed: [
          'Profile',
          'Personal Info',
          'Education',
          'Work Experience',
          'Skills',
          'Languages',
        ].includes(step.label),
        active: step.label === 'Certificates',
      })),
    []
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <BuilderSidebar steps={steps} progress={80} />

      {/* Center: Certificates Form */}
      <main className="flex-1 overflow-y-auto bg-white custom-scrollbar">
        <div className="max-w-[800px] mx-auto px-8 py-12 pb-32">
          {/* Heading */}
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-4xl font-black leading-tight tracking-tight">
              Certificates
            </h2>
            <p className="text-[#616289] text-base">
              Add and manage your professional certifications to stand out.
            </p>
          </div>

          {/* Certificate Cards */}
          <div className="flex flex-col gap-4">
            {certificates.map((cert) =>
              expandedId === cert.id ? (
                /* Expanded Card */
                <div
                  key={cert.id}
                  className="bg-white border-2 border-primary rounded-xl overflow-hidden shadow-lg"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">
                          edit_note
                        </span>
                        <h3 className="text-lg font-bold">Edit Certificate</h3>
                      </div>
                      <button
                        onClick={() => deleteCertificate(cert.id)}
                        className="text-[#616289] hover:text-red-500 transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Certificate Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#111118]">
                          Certificate Name
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#e0e0e0] focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm p-2.5 outline-none transition-all"
                          type="text"
                          value={editForm.name}
                          onChange={(e) =>
                            setEditForm({ ...editForm, name: e.target.value })
                          }
                        />
                      </div>

                      {/* Issuing Organization */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#111118]">
                          Issuing Organization
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#e0e0e0] focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm p-2.5 outline-none transition-all"
                          type="text"
                          value={editForm.organization}
                          onChange={(e) =>
                            setEditForm({ ...editForm, organization: e.target.value })
                          }
                        />
                      </div>

                      {/* Issue Date */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#111118]">
                          Issue Date
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#e0e0e0] focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm p-2.5 outline-none transition-all"
                          type="month"
                          value={editForm.issueDate}
                          onChange={(e) =>
                            setEditForm({ ...editForm, issueDate: e.target.value })
                          }
                        />
                      </div>

                      {/* Expiration Date */}
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#111118]">
                          Expiration Date
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            className="flex-1 rounded-lg border border-[#e0e0e0] focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm p-2.5 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            type="month"
                            value={editForm.expirationDate}
                            disabled={editForm.noExpiry}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                expirationDate: e.target.value,
                              })
                            }
                          />
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editForm.noExpiry}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  noExpiry: e.target.checked,
                                  expirationDate: e.target.checked
                                    ? ''
                                    : editForm.expirationDate,
                                })
                              }
                              className="rounded text-primary focus:ring-primary border-gray-300 w-4 h-4"
                            />
                            <span className="text-xs text-[#616289] whitespace-nowrap">
                              No expiry
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Credential ID / Link */}
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#111118]">
                          Credential ID / Link
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#e0e0e0] focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm p-2.5 outline-none transition-all"
                          type="text"
                          placeholder="e.g. https://aws.amazon.com/verification/..."
                          value={editForm.credentialLink}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              credentialLink: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* Description */}
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label className="text-sm font-semibold text-[#111118]">
                          Description
                        </label>
                        <textarea
                          className="w-full rounded-lg border border-[#e0e0e0] focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm p-2.5 outline-none transition-all resize-none"
                          rows={3}
                          value={editForm.description}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex justify-end gap-3">
                      <button
                        onClick={cancelEdit}
                        className="px-5 py-2 text-sm font-semibold rounded-lg border border-[#e0e0e0] hover:bg-gray-50 transition-colors"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveCertificate}
                        className="px-5 py-2 text-sm font-semibold rounded-lg bg-primary text-white shadow-md hover:bg-primary/90 transition-colors"
                        type="button"
                      >
                        Save Certificate
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Collapsed Card */
                <div
                  key={cert.id}
                  onClick={() => startEdit(cert)}
                  className="group relative flex items-center gap-4 bg-white border border-[#dbdbe6] rounded-xl p-4 cursor-pointer hover:border-primary/50 transition-all shadow-sm"
                >
                  <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 w-12 h-12">
                    <span className="material-symbols-outlined">
                      workspace_premium
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="text-[#111118] text-base font-semibold line-clamp-1">
                      {cert.name || 'Untitled Certificate'}
                    </p>
                    <p className="text-[#616289] text-sm">
                      {cert.organization || 'Organization'}
                      {cert.issueDate
                        ? ` | Issued ${new Date(cert.issueDate + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
                        : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#616289] hover:text-primary">
                      drag_indicator
                    </span>
                    <span className="material-symbols-outlined text-[#616289] hover:text-primary">
                      edit
                    </span>
                  </div>
                </div>
              )
            )}

            {/* Add Certificate Button */}
            <button
              onClick={addCertificate}
              className="w-full py-10 border-2 border-dashed border-[#e0e0e0] rounded-xl flex flex-col items-center justify-center gap-2 group hover:border-primary/50 hover:bg-primary/5 transition-all"
              type="button"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">add</span>
              </div>
              <span className="text-sm font-bold text-primary">
                Add Certificate
              </span>
            </button>
          </div>
        </div>

        {/* Sticky Bottom Navigation */}
        <footer className="fixed bottom-0 left-64 right-[450px] bg-white/80 backdrop-blur-md border-t border-[#dbdbe6] px-8 py-4 z-10 flex justify-between items-center">
          <button
            onClick={() => router.push('/builder/languages')}
            className="flex items-center gap-2 text-sm font-bold text-[#111118] hover:bg-[#f0f0f4] px-6 py-2.5 rounded-lg transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">
              arrow_back
            </span>
            Back
          </button>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="bg-primary hover:bg-[#3235d6] text-white px-8 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save & Continue'}
          </button>
        </footer>
      </main>

      <BuilderPreview />
    </div>
  );
}
