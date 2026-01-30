const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000';

async function request(method: string, path: string, token: string, body?: unknown) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  const res = await fetch(`${BASE_URL}/api/v1${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ---------------------------------------------------------------------------
// Resume CRUD
// ---------------------------------------------------------------------------

export function createResume(token: string, title: string) {
  return request('POST', '/resumes', token, { title });
}

export function getResume(token: string, id: number) {
  return request('GET', `/resumes/${id}`, token);
}

export function listResumes(token: string) {
  return request('GET', '/resumes', token);
}

export function deleteResume(token: string, id: number) {
  return request('DELETE', `/resumes/${id}`, token);
}

// ---------------------------------------------------------------------------
// Section saves
// ---------------------------------------------------------------------------

export function savePersonalInfo(token: string, id: number, data: Record<string, unknown>) {
  return request('PUT', `/resumes/${id}/personal-info`, token, data);
}

export function saveEducation(token: string, id: number, items: unknown[]) {
  return request('PUT', `/resumes/${id}/education`, token, items);
}

export function saveExperience(token: string, id: number, items: unknown[]) {
  return request('PUT', `/resumes/${id}/experience`, token, items);
}

export function saveSkills(token: string, id: number, items: unknown[]) {
  return request('PUT', `/resumes/${id}/skills`, token, items);
}

export function saveLanguages(token: string, id: number, items: unknown[]) {
  return request('PUT', `/resumes/${id}/languages`, token, items);
}

export function saveCertificates(token: string, id: number, items: unknown[]) {
  return request('PUT', `/resumes/${id}/certificates`, token, items);
}

export function saveCustomSections(token: string, id: number, items: unknown[]) {
  return request('PUT', `/resumes/${id}/custom-sections`, token, items);
}

export function saveTemplate(token: string, id: number, data: Record<string, unknown>) {
  return request('PUT', `/resumes/${id}/template`, token, data);
}

// ---------------------------------------------------------------------------
// Export / Download
// ---------------------------------------------------------------------------

async function downloadBlob(url: string, token: string, filename: string) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Download failed: ${res.status}`);
  }
  const blob = await res.blob();
  const objUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = objUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(objUrl);
}

export function downloadPdf(token: string, id: number) {
  return downloadBlob(`${BASE_URL}/api/v1/resumes/${id}/export/pdf`, token, `resume_${id}.pdf`);
}

export function downloadDocx(token: string, id: number) {
  return downloadBlob(`${BASE_URL}/api/v1/resumes/${id}/export/docx`, token, `resume_${id}.docx`);
}
