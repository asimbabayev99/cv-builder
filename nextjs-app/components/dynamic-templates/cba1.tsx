import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicCba1({ data, translations, language = 'en', colorHex = '#d76d76' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressPart = [data.city, data.country].filter(Boolean).join(', ');
  const contactParts = [addressPart, data.phone, data.email].filter(Boolean);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Palatino+Linotype&display=swap');

        .dyn-cba1 {
          color: #000;
          line-height: 1.4;
          font-variant-ligatures: none;
          min-height: 792px;
          word-wrap: break-word;
          font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
          font-size: 11px;
          padding: 40px;
        }

        .dyn-cba1.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-cba1 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-cba1 .header {
          text-align: center;
          margin-bottom: 20px;
        }

        .dyn-cba1 .name {
          font-size: 28px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 5px;
        }

        .dyn-cba1 .name-underline {
          width: 100%;
          height: 2px;
          background: #000;
          margin: 5px 0;
        }

        .dyn-cba1 .name-underline-thin {
          width: 100%;
          height: 1px;
          background: #000;
          margin: 3px 0 10px;
        }

        .dyn-cba1 .professional-title {
          font-size: 14px;
          font-style: italic;
          margin-bottom: 10px;
        }

        .dyn-cba1 .contact-line {
          font-size: 10px;
          text-align: center;
        }

        .dyn-cba1 .contact-line span:not(:last-child)::after {
          content: ' • ';
          padding: 0 5px;
        }

        .dyn-cba1 .section {
          margin-bottom: 20px;
        }

        .dyn-cba1 .section-title {
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 2px solid #000;
          padding-bottom: 5px;
          margin-bottom: 10px;
        }

        .dyn-cba1 .paragraph {
          margin-bottom: 15px;
        }

        .dyn-cba1 .job-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .dyn-cba1.rtl .job-header {
          flex-direction: row-reverse;
        }

        .dyn-cba1 .job-dates {
          text-align: right;
          white-space: nowrap;
          font-style: italic;
        }

        .dyn-cba1.rtl .job-dates {
          text-align: left;
        }

        .dyn-cba1 .txt-bold {
          font-weight: bold;
        }

        .dyn-cba1 ul {
          margin-left: 20px;
          margin-top: 5px;
        }

        .dyn-cba1.rtl ul {
          margin-left: 0;
          margin-right: 20px;
        }

        .dyn-cba1 ul li {
          list-style-type: disc;
          margin-bottom: 3px;
        }

        .dyn-cba1 .skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .dyn-cba1 .skill-item {
          width: 48%;
          margin-bottom: 8px;
        }

        .dyn-cba1 .rating-bar {
          background: #e0e0e0;
          width: 100%;
          height: 6px;
          margin-top: 3px;
          position: relative;
        }

        .dyn-cba1 .inner-rating {
          background-color: ${colorHex};
          height: 100%;
          position: relative;
        }

        .dyn-cba1 .profile-pic {
          text-align: center;
          margin-bottom: 15px;
        }

        .dyn-cba1 .profile-pic img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
        }
      `}</style>

      <div className={`dyn-cba1 ${rtl ? 'rtl' : ''}`}>
        {/* Header - Centered */}
        <div className="header">
          {data.photo_url && (
            <div className="profile-pic">
              <img src={data.photo_url} alt={fullName || 'Profile'} />
            </div>
          )}
          {fullName && <div className="name">{fullName}</div>}
          <div className="name-underline"></div>
          <div className="name-underline-thin"></div>
          {data.professional_title && (
            <div className="professional-title">{data.professional_title}</div>
          )}
          {contactParts.length > 0 && (
            <div className="contact-line">
              {contactParts.map((part, index) => (
                <span key={index}>{part}</span>
              ))}
            </div>
          )}
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <div className="section">
            <div className="section-title">{translations.professional_summary}</div>
            <p>{data.summary}</p>
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
                  <div className="txt-bold">
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
                    {edu.degree && edu.field_of_study && ': '}
                    {edu.field_of_study}
                  </div>
                  <span className="job-dates">
                    {edu.end_date && formatDate(edu.end_date, language)}
                  </span>
                </div>
                {edu.institution && <div className="txt-bold">{edu.institution}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Skills with Rating */}
        {data.skills && data.skills.length > 0 && (
          <div className="section">
            <div className="section-title">{translations.skills}</div>
            <div className="skills-grid">
              {data.skills.map((skill, index) => (
                <div key={skill.id || index} className="skill-item">
                  <div>{skill.name}</div>
                  {skill.level && (
                    <div className="rating-bar">
                      <div className="inner-rating" style={{ width: `${(skill.level / 5) * 100}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="section">
            <div className="section-title">{translations.languages}</div>
            <div className="skills-grid">
              {data.languages.map((lang, index) => (
                <div key={lang.id || index} className="skill-item">
                  <div>{lang.name}</div>
                  {lang.level && (
                    <div className="rating-bar">
                      <div className="inner-rating" style={{ width: `${(lang.level / 5) * 100}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certificates */}
        {data.certificates && data.certificates.length > 0 && (
          <div className="section">
            <div className="section-title">{translations.certificates}</div>
            {data.certificates.map((cert, index) => (
              <div key={cert.id || index} className="paragraph">
                <div className="txt-bold">{cert.name}</div>
                {cert.organization && <div>{cert.organization}</div>}
                {cert.issue_date && <div>{formatDate(cert.issue_date, language)}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
