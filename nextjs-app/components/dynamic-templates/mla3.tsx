import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMla3({ data, translations, language = 'en', colorHex = '#DF7866' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const initials = [data.first_name?.[0], data.last_name?.[0]].filter(Boolean).join('');
  const addressPart = [data.city, data.country].filter(Boolean).join(', ');

  // Create gradient colors from the main color
  const gradientEnd = colorHex + '80'; // Add transparency for lighter shade

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unica+One&family=Open+Sans:wght@400;600&display=swap');

        .dyn-mla3 {
          color: #333;
          line-height: 1.5;
          font-variant-ligatures: none;
          min-height: 792px;
          word-wrap: break-word;
          font-family: 'Open Sans', sans-serif;
          font-size: 10px;
        }

        .dyn-mla3.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mla3 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mla3 .container {
          display: flex;
          min-height: 792px;
        }

        .dyn-mla3 .sidebar {
          width: 200px;
          background: linear-gradient(180deg, ${colorHex} 0%, ${gradientEnd} 100%);
          color: #fff;
          padding: 30px 20px;
          flex-shrink: 0;
        }

        .dyn-mla3.rtl .sidebar {
          order: 2;
        }

        .dyn-mla3 .main-content {
          flex: 1;
          padding: 30px 35px;
          background: #fff;
        }

        .dyn-mla3 .profile-section {
          text-align: center;
          margin-bottom: 25px;
        }

        .dyn-mla3 .profile-pic img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #fff;
          margin-bottom: 15px;
        }

        .dyn-mla3 .monogram {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 15px;
          font-size: 36px;
          font-weight: bold;
          font-family: 'Unica One', sans-serif;
          border: 3px solid #fff;
        }

        .dyn-mla3 .sidebar-name {
          font-family: 'Unica One', sans-serif;
          font-size: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 5px;
        }

        .dyn-mla3 .sidebar-title {
          font-size: 11px;
          opacity: 0.9;
        }

        .dyn-mla3 .sidebar-section {
          margin-bottom: 20px;
        }

        .dyn-mla3 .sidebar-section-title {
          font-family: 'Unica One', sans-serif;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid rgba(255,255,255,0.3);
        }

        .dyn-mla3 .contact-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 8px;
          font-size: 10px;
        }

        .dyn-mla3 .contact-icon {
          width: 14px;
          height: 14px;
          margin-right: 8px;
          flex-shrink: 0;
        }

        .dyn-mla3.rtl .contact-icon {
          margin-right: 0;
          margin-left: 8px;
        }

        .dyn-mla3 .contact-icon svg {
          fill: #fff;
          width: 14px;
          height: 14px;
        }

        .dyn-mla3 .skill-item {
          margin-bottom: 10px;
        }

        .dyn-mla3 .skill-name {
          margin-bottom: 3px;
          font-size: 10px;
        }

        .dyn-mla3 .rating-bar {
          background: rgba(255,255,255,0.3);
          width: 100%;
          height: 4px;
          border-radius: 2px;
        }

        .dyn-mla3 .inner-rating {
          background-color: #fff;
          height: 100%;
          border-radius: 2px;
        }

        .dyn-mla3 .main-name {
          font-family: 'Unica One', sans-serif;
          font-size: 32px;
          color: ${colorHex};
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 5px;
        }

        .dyn-mla3 .main-title {
          font-size: 14px;
          color: #666;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid ${colorHex};
        }

        .dyn-mla3 .section {
          margin-bottom: 20px;
        }

        .dyn-mla3 .section-title {
          font-family: 'Unica One', sans-serif;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: ${colorHex};
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #e0e0e0;
        }

        .dyn-mla3 .paragraph {
          margin-bottom: 15px;
        }

        .dyn-mla3 .job-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .dyn-mla3.rtl .job-header {
          flex-direction: row-reverse;
        }

        .dyn-mla3 .job-dates {
          text-align: right;
          white-space: nowrap;
          color: #888;
          font-size: 9px;
        }

        .dyn-mla3.rtl .job-dates {
          text-align: left;
        }

        .dyn-mla3 .txt-bold {
          font-weight: 600;
        }

        .dyn-mla3 .company-line {
          color: #666;
          margin-bottom: 5px;
        }

        .dyn-mla3 ul {
          margin-left: 15px;
          margin-top: 5px;
        }

        .dyn-mla3.rtl ul {
          margin-left: 0;
          margin-right: 15px;
        }

        .dyn-mla3 ul li {
          list-style-type: disc;
          margin-bottom: 2px;
          color: #444;
        }

        .dyn-mla3 .summary-text {
          color: #444;
          line-height: 1.6;
        }
      `}</style>

      <div className={`dyn-mla3 ${rtl ? 'rtl' : ''}`}>
        <div className="container">
          {/* Sidebar */}
          <div className="sidebar">
            {/* Profile Section */}
            <div className="profile-section">
              {data.photo_url ? (
                <div className="profile-pic">
                  <img src={data.photo_url} alt={fullName || 'Profile'} />
                </div>
              ) : initials && (
                <div className="monogram">{initials}</div>
              )}
              {fullName && <div className="sidebar-name">{fullName}</div>}
              {data.professional_title && (
                <div className="sidebar-title">{data.professional_title}</div>
              )}
            </div>

            {/* Contact Section */}
            {(addressPart || data.phone || data.email) && (
              <div className="sidebar-section">
                <div className="sidebar-section-title">{translations.contact}</div>

                {addressPart && (
                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                    <span>{addressPart}</span>
                  </div>
                )}

                {data.phone && (
                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </div>
                    <span>{data.phone}</span>
                  </div>
                )}

                {data.email && (
                  <div className="contact-item">
                    <div className="contact-icon">
                      <svg viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <span>{data.email}</span>
                  </div>
                )}
              </div>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <div className="sidebar-section">
                <div className="sidebar-section-title">{translations.skills}</div>
                {data.skills.map((skill, index) => (
                  <div key={skill.id || index} className="skill-item">
                    <div className="skill-name">{skill.name}</div>
                    {skill.level && (
                      <div className="rating-bar">
                        <div className="inner-rating" style={{ width: `${(skill.level / 5) * 100}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <div className="sidebar-section">
                <div className="sidebar-section-title">{translations.languages}</div>
                {data.languages.map((lang, index) => (
                  <div key={lang.id || index} className="skill-item">
                    <div className="skill-name">{lang.name}</div>
                    {lang.level && (
                      <div className="rating-bar">
                        <div className="inner-rating" style={{ width: `${(lang.level / 5) * 100}%` }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="main-content">
            {/* Name (also shown in main for some layouts) */}
            {fullName && <div className="main-name">{fullName}</div>}
            {data.professional_title && (
              <div className="main-title">{data.professional_title}</div>
            )}

            {/* Professional Summary */}
            {data.summary && (
              <div className="section">
                <div className="section-title">{translations.professional_summary}</div>
                <div className="summary-text">{data.summary}</div>
              </div>
            )}

            {/* Work Experience */}
            {data.experiences && data.experiences.length > 0 && (
              <div className="section">
                <div className="section-title">{translations.work_history}</div>
                {data.experiences.map((exp, index) => (
                  <div key={exp.id || index} className="paragraph">
                    <div className="job-header">
                      <span className="txt-bold">{exp.job_title}</span>
                      <span className="job-dates">
                        {exp.start_date && formatDate(exp.start_date, language)}
                        {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                        {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                      </span>
                    </div>
                    {(exp.company || exp.location) && (
                      <div className="company-line">
                        {exp.company}
                        {exp.company && exp.location && ' | '}
                        {exp.location}
                      </div>
                    )}
                    {exp.description && (
                      <ul>
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {data.educations && data.educations.length > 0 && (
              <div className="section">
                <div className="section-title">{translations.education}</div>
                {data.educations.map((edu, index) => (
                  <div key={edu.id || index} className="paragraph">
                    <div className="job-header">
                      <div>
                        {edu.degree && <span className="txt-bold">{edu.degree}</span>}
                        {edu.degree && edu.field_of_study && ' - '}
                        {edu.field_of_study}
                      </div>
                      <span className="job-dates">
                        {edu.end_date && formatDate(edu.end_date, language)}
                      </span>
                    </div>
                    {edu.institution && <div className="company-line">{edu.institution}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Certificates */}
            {data.certificates && data.certificates.length > 0 && (
              <div className="section">
                <div className="section-title">{translations.certificates}</div>
                {data.certificates.map((cert, index) => (
                  <div key={cert.id || index} className="paragraph">
                    <div className="txt-bold">{cert.name}</div>
                    {cert.organization && <div className="company-line">{cert.organization}</div>}
                    {cert.issue_date && (
                      <div style={{ fontSize: '9px', color: '#888' }}>
                        {formatDate(cert.issue_date, language)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
