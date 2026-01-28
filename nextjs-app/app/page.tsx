import Link from 'next/link';
import AppHeader from '@/components/AppHeader';

function LogoIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <AppHeader />

      <main className="flex flex-col items-center w-full">
        {/* Hero Section */}
        <section className="max-w-[1200px] w-full px-6 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <span className="text-primary font-bold text-sm tracking-wider uppercase">
                  AI-Powered Builder
                </span>
                <h1 className="text-[#111118] text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em] font-display">
                  Build a Professional Resume in Minutes
                </h1>
                <p className="text-gray-600 text-lg md:text-xl font-normal leading-relaxed">
                  Our AI-powered resume builder helps you create a job-winning CV that passes ATS filters
                  and impresses recruiters instantly.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/templates"
                  className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-6 bg-primary text-white text-lg font-bold hover:shadow-lg hover:shadow-primary/30 transition-all"
                >
                  <span>Create My CV</span>
                </Link>
                <Link
                  href="/templates"
                  className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-6 bg-white border border-[#dbdbe6] text-[#111118] text-lg font-bold hover:bg-gray-50 transition-all"
                >
                  <span>View Templates</span>
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-xl blur-2xl group-hover:bg-primary/20 transition-all duration-500" />
              <div className="relative bg-white p-4 rounded-xl shadow-2xl border border-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full aspect-[3/4] rounded-lg object-cover shadow-inner"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA76-ycSfepD6lybJ8Scmq-0TR8HrrzP0v57MVL1sIOAVOfmqjRy_EIpoXLN0lh3I04SfS-NsQRlz0nBW5KRCJkDLjfwTwEFE2JF1D9eKEdJhRBeJVdGEtWJXE4nSeTwA4a-zBNMI-o5A4yShaVs_JlzYkSH9N__YQOStijbmapiliVg2deeoSULDcGNx2K5r4H-rAEWQtqOHDXoh7OZ2pCDmdzwEH61rtzaWR7tn5_H7khOUDRmhwxT8GOIhNKTf8t1CuLkPk3kcw"
                  alt="Modern A4 resume template preview with clean typography"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="w-full bg-white py-10 border-y border-gray-100">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3 px-4 py-2 justify-center md:justify-start">
                <span className="material-symbols-outlined text-primary text-3xl">check_circle</span>
                <span className="text-[#111118] font-bold text-sm md:text-base">ATS Friendly</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 justify-center md:justify-start">
                <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
                <span className="text-[#111118] font-bold text-sm md:text-base">Recruiter Approved</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 justify-center md:justify-start">
                <span className="material-symbols-outlined text-primary text-3xl">download_for_offline</span>
                <span className="text-[#111118] font-bold text-sm md:text-base">Instant Download</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 justify-center md:justify-start">
                <span className="material-symbols-outlined text-primary text-3xl">auto_fix_high</span>
                <span className="text-[#111118] font-bold text-sm md:text-base">No Design Skills</span>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="max-w-[1200px] w-full px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Process</h2>
            <h3 className="text-[#111118] text-4xl font-black tracking-tight font-display">How it Works</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-6 p-8 rounded-2xl bg-white border border-[#dbdbe6] hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">dashboard_customize</span>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold">1. Choose a Template</h4>
                <p className="text-gray-500">Select from dozens of professional designs curated by hiring experts.</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 p-8 rounded-2xl bg-white border border-[#dbdbe6] hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">edit_note</span>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold">2. Fill Your Details</h4>
                <p className="text-gray-500">Our smart AI editor guides you through every section with tailored suggestions.</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 p-8 rounded-2xl bg-white border border-[#dbdbe6] hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-3xl">cloud_download</span>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-xl font-bold">3. Download &amp; Apply</h4>
                <p className="text-gray-500">Get your ATS-optimized PDF instantly and start your journey to a new job.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Features */}
        <section id="features" className="w-full bg-primary/5 py-24">
          <div className="max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">The AI Edge</h2>
                <h3 className="text-4xl font-black text-[#111118] leading-tight font-display">
                  AI-Powered Resume Assistance
                </h3>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary">psychology</span>
                  <div>
                    <p className="font-bold text-lg">Smart Content Generation</p>
                    <p className="text-gray-600">AI suggests impact-driven bullet points based on your job title.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary">spellcheck</span>
                  <div>
                    <p className="font-bold text-lg">Professional Tone Correction</p>
                    <p className="text-gray-600">Instantly rewrite sentences to sound more professional and confident.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary">target</span>
                  <div>
                    <p className="font-bold text-lg">Keyword Optimization</p>
                    <p className="text-gray-600">Automatically inject industry-specific keywords to beat ATS scanners.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-white rounded-2xl p-6 shadow-2xl border border-white/20 relative">
                <div className="flex items-center gap-4 mb-6 border-b pb-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">auto_awesome</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">AI Writing Assistant</p>
                    <p className="text-xs text-gray-400">Suggesting improvements...</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                  <div className="p-4 bg-primary/10 border-l-4 border-primary rounded">
                    <p className="text-sm font-medium italic">&quot;Managed a team of 5 developers to deliver a $2M project.&quot;</p>
                    <p className="text-xs text-primary mt-2 font-bold">
                      Suggested: &quot;Spearheaded a cross-functional engineering team of 5, successfully delivering a $2M high-impact project ahead of schedule.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Templates Showcase */}
        <section className="max-w-[1200px] w-full px-6 py-24">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Templates</h2>
              <h3 className="text-4xl font-black text-[#111118] font-display">Popular Resume Designs</h3>
            </div>
            <Link href="/templates" className="text-primary font-bold flex items-center gap-2 hover:underline">
              View All <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Template 1 */}
            <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="aspect-[3/4] w-full object-cover object-top"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM8ok4ntoa6ySfniFh3UD4l5eSorNmITMiFSSvub8k4DQTS0S-G27rOJjzTs_Xc82WcC41fO91OptpcllTWmDLUCxAtKeJ3MZ4iRb61MSxboFQuK2Nw4K4VcYbvdm_KGc0Fwt2Vtopfew9qr-rLAFt9RraMeajWI5_46LOxRA4QTP4yFhBr8qmFp7ikhvM8z1gr-JlkZsl-itsiVkMmNajljGFY5MaVO4ccnLJWcQgWBN6T5lYCk3YvxzxeWGO358ZZIY5FiEGcEk"
                alt="Professional blue minimalist resume layout"
              />
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Link href="/templates" className="bg-white text-primary px-6 py-3 rounded-lg font-bold">Use Template</Link>
              </div>
              <div className="p-4 border-t">
                <h5 className="font-bold text-lg">Executive Blue</h5>
              </div>
            </div>
            {/* Template 2 */}
            <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="aspect-[3/4] w-full object-cover object-top"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6rxHYs1Fa1qER2I9WbBeWEgJBXzH-0-EDYIx3qilrO_UnaBH1rBGRccRzvyA0tMMGYY4-lDl6EzrrXbdoflb-DjlpxQM7VjiWIe-4sNvgMnr85OvzxTs-y5l5WKhXSvHfKzs5oWdxmQfcxl0qoYC3Ycaq-sw0P1KA0SaHnP-2VkD3c2HEvO7LV1n6pgt9fIoSDvrPCz62BMa2zSvtCwYwd4FnteolP8iZL9CN5uobpzj5FFmYpbvXbUh5ITRbJSg0ebp7jaFGEto"
                alt="Creative modern resume design with sidebar"
              />
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Link href="/templates" className="bg-white text-primary px-6 py-3 rounded-lg font-bold">Use Template</Link>
              </div>
              <div className="p-4 border-t">
                <h5 className="font-bold text-lg">Modern Creative</h5>
              </div>
            </div>
            {/* Template 3 */}
            <div className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="aspect-[3/4] w-full object-cover object-top"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPHvRofvj7GDCBPrGjGHJNZ7IsdnPp-T-Q0W9HB7vPg8tXmCq_5yuJvyvh9gGw07Afb-xQjpf-0q3kWJek6jmOP26tYIJnKgBQZRkgNaTWKP7vs6vegH5FsNL53cutjmwnjj_2ZyEhx0TUtu6ZinlNslIthd_r8jXwtiagqJqFjYBbXx9b5Uqpl9RJKkU2vFbMAiW9XJl0IlYRBBZdXKJWcnVatoqNi7TZJ9a0SKTp6ti255kYw1IjRaiHCgNtvZSd72m_V9Azoxk"
                alt="Minimalist monochromatic professional CV design"
              />
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Link href="/templates" className="bg-white text-primary px-6 py-3 rounded-lg font-bold">Use Template</Link>
              </div>
              <div className="p-4 border-t">
                <h5 className="font-bold text-lg">Pure Minimalist</h5>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Success Stories</h2>
              <h3 className="text-4xl font-black text-[#111118] font-display">Trusted by 50,000+ Professionals</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background-light p-8 rounded-2xl border border-gray-100">
                <div className="flex text-yellow-400 mb-4">
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                </div>
                <p className="text-gray-600 mb-6 italic">&quot;The AI suggestions helped me quantify my achievements. I landed three interviews in the first week of using my new resume!&quot;</p>
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOnWcJNI88D4SQP5834Z0SC74VL0nDPUdrwOCtPUQvHmAHM3iLYN0mC83A7gc0vPOLcW6cR_7c__MUkqdL2QQPiw95w-qA5jMMYJuIkz1PJE2Kz0cWDchGAFXr_sdJKzgSQuKkTjw4O4qa8XDBx7qy_kdKp7dLfCosblzMT7Za2MmRDn5RHQC3o2rq7Jxkp7mXcfOVEBSDP0oUuuoqdJiI4gl498zrZU4OzmGVENBTV5QhttqeNmXaaN5Y42BNEYsfYVYkc_hErPA"
                    alt="Portrait of Sarah Jenkins"
                  />
                  <div>
                    <p className="font-bold text-sm">Sarah Jenkins</p>
                    <p className="text-xs text-gray-400">Software Engineer</p>
                  </div>
                </div>
              </div>
              <div className="bg-background-light p-8 rounded-2xl border border-gray-100">
                <div className="flex text-yellow-400 mb-4">
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                </div>
                <p className="text-gray-600 mb-6 italic">&quot;I was struggling with the layout for hours. With ResumePro, I had a beautiful PDF ready in exactly 15 minutes.&quot;</p>
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjp5S0oGhkzP07vKzVPEhfys4zQHLHpmic4mDrKXnQwMZ0iOKa0cFqY4JxddRKU9skoD3AzTNUtvmbe1L1qL_VDQFCdP45-FusBiolknXytiuY4G5mLKK0ZGGmi4_mV_aGZktv9z38rIAJJAnYjVctiRX9mq5smRF28Q_ti7slsb8-Wi19TDRsW9l4bNNmpG0hB-TqxTzcV22zQF2ZeYodEwe2TTd2BWsocku5ePzLbVgS9n1-oi7HnaGk-e21An1gunjxszOM0jk"
                    alt="Portrait of Marcus Chen"
                  />
                  <div>
                    <p className="font-bold text-sm">Marcus Chen</p>
                    <p className="text-xs text-gray-400">Marketing Manager</p>
                  </div>
                </div>
              </div>
              <div className="bg-background-light p-8 rounded-2xl border border-gray-100">
                <div className="flex text-yellow-400 mb-4">
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                </div>
                <p className="text-gray-600 mb-6 italic">&quot;The ATS-optimization is real. My response rate increased significantly after switching to these templates.&quot;</p>
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmkfLuS4NJMb3797wbai3UaNg1p004d5k9xDOB82v1ful5C68Iyepp03OYdGN0pL2Z7LVUQuR2MXVkyqdqM2jeYKmz6kVah8BTFJsAU1lplpnXng-6ztZEEj2DGANOCMofhox-T08ITh0BQGj7Cd00YpmFtD1Zy6pnadzrQYpAIExBEDohXLqtq0ogQUJidn02e_hS5ROSoBEIdWooifbPEHVyiTGqZXOponJEUdSFrDE5WkqHeeAqK2m1bPrZtC57oR5AoCLfcu0"
                    alt="Portrait of David Miller"
                  />
                  <div>
                    <p className="font-bold text-sm">David Miller</p>
                    <p className="text-xs text-gray-400">Project Specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-[1200px] w-full px-6 py-24">
          <div className="bg-primary rounded-[2rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
            <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black font-display">Ready to build your winning resume?</h2>
              <p className="text-white/80 text-lg md:text-xl">
                Join thousands of job seekers who got hired using our templates. Start building for free today.
              </p>
              <div className="pt-4">
                <Link
                  href="/templates"
                  className="inline-block bg-white text-primary px-10 py-5 rounded-xl font-black text-xl hover:scale-105 transition-transform shadow-2xl"
                >
                  Start Building for Free
                </Link>
                <p className="mt-4 text-sm text-white/60">No credit card required</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 text-primary mb-6">
                <LogoIcon />
                <h2 className="text-[#111118] text-xl font-bold font-display">ResumePro</h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Helping professionals land their dream jobs with AI-powered resume building tools and expert-designed templates.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><Link href="/templates" className="hover:text-primary transition-colors">Templates</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">AI Writer</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cover Letter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Legal</h4>
              <ul className="space-y-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-xs">&copy; 2024 ResumePro Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">language</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">groups</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">alternate_email</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
