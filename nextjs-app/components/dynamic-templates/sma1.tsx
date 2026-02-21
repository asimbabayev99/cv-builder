import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicSma1({ data, translations, language = 'en', colorHex = '#1A4771' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressPart = [data.city, data.country].filter(Boolean).join(', ');
  const contactParts = [addressPart, data.phone, data.email].filter(Boolean);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Century+Gothic&display=swap');

        .dyn-sma1 {
          color: #333;
          line-height: 1.5;
          font-variant-ligatures: none;
          min-height: 792px;
          word-wrap: break-word;
          font-family: 'Century Gothic', 'CenturyGothic', AppleGothic, sans-serif;
          font-size: 10px;
          padding: 35px 40px;
        }

        .dyn-sma1.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-sma1 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-sma1 .header {
          text-align: center;
          padding-bottom: 15px;
          border-bottom: 2px dashed #ccc;
          margin-bottom: 20px;
        }

        .dyn-sma1 .name {
          font-size: 26px;
          font-weight: bold;
          color: ${colorHex};
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 5px;
        }

        .dyn-sma1 .professional-title {
          font-size: 12px;
          color: #666;
          margin-bottom: 10px;
        }

        .dyn-sma1 .contact-line {
          font-size: 10px;
          color: #555;
        }

        .dyn-sma1 .contact-line span:not(:last-child)::after {
          content: ' | ';
          padding: 0 8px;
          color: #999;
        }

        .dyn-sma1 .section {
          margin-bottom: 18px;
        }

        .dyn-sma1 .section-title {
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: ${colorHex};
          margin-bottom: 8px;
          padding-bottom: 5px;
          border-bottom: 1px solid ${colorHex};
        }

        .dyn-sma1 .paragraph {
          margin-bottom: 12px;
        }

        .dyn-sma1 .job-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 3px;
        }

        .dyn-sma1.rtl .job-header {
          flex-direction: row-reverse;
        }

        .dyn-sma1 .job-dates {
          text-align: right;
          white-space: nowrap;
          color: #666;
          font-size: 9px;
        }

        .dyn-sma1.rtl .job-dates {
          text-align: left;
        }

        .dyn-sma1 .txt-bold {
          font-weight: bold;
        }

        .dyn-sma1 .company-line {
          color: #555;
          font-style: italic;
          margin-bottom: 5px;
        }

        .dyn-sma1 ul {
          margin-left: 15px;
          margin-top: 5px;
        }

        .dyn-sma1.rtl ul {
          margin-left: 0;
          margin-right: 15px;
        }

        .dyn-sma1 ul li {
          list-style-type: none;
          margin-bottom: 2px;
          position: relative;
          padding-left: 10px;
        }

        .dyn-sma1 ul li::before {
          content: '●';
          position: absolute;
          left: 0;
          color: ${colorHex};
          font-size: 6px;
          top: 4px;
        }

        .dyn-sma1.rtl ul li {
          padding-left: 0;
          padding-right: 10px;
        }

        .dyn-sma1.rtl ul li::before {
          left: auto;
          right: 0;
        }

        .dyn-sma1 .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
        }

        .dyn-sma1 .skill-item {
          width: 45%;
        }

        .dyn-sma1 .rating-bar {
          background: #e8e8e8;
          width: 100%;
          height: 4px;
          margin-top: 3px;
          border-radius: 2px;
        }

        .dyn-sma1 .inner-rating {
          background-color: ${colorHex};
          height: 100%;
          border-radius: 2px;
        }

        .dyn-sma1 .summary-text {
          color: #444;
          line-height: 1.6;
        }

        .dyn-sma1 .two-column {
          display: flex;
          gap: 30px;
        }

        .dyn-sma1 .column {
          flex: 1;
        }
      `}</style>

      <div className={`dyn-sma1 ${rtl ? 'rtl' : ''}`}>
        {/* Header - Centered */}
        <div className="header">
          {fullName && <div className="name">{fullName}</div>}
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
                    {exp.company && exp.location && ', '}
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

        {/* Two column layout for Skills and Languages */}
        <div className="two-column">
          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div className="column">
              <div className="section">
                <div className="section-title">{translations.skills}</div>
                <div className="skills-list">
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
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div className="column">
              <div className="section">
                <div className="section-title">{translations.languages}</div>
                <div className="skills-list">
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
            </div>
          )}
        </div>

        {/* Certificates */}
        {data.certificates && data.certificates.length > 0 && (
          <div className="section">
            <div className="section-title">{translations.certificates}</div>
            {data.certificates.map((cert, index) => (
              <div key={cert.id || index} className="paragraph">
                <span className="txt-bold">{cert.name}</span>
                {cert.organization && <span> - {cert.organization}</span>}
                {cert.issue_date && <span> ({formatDate(cert.issue_date, language)})</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
