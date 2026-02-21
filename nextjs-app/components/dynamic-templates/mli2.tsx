import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMli2({ data, translations, language = 'en', colorHex = '#2a5978' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressParts = [data.city, data.country].filter(Boolean);
  const hasContact = data.email || data.phone || addressParts.length > 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Fira+Sans:300,500,700');

        .dyn-mli2 {
          font-family: 'Fira Sans', sans-serif;
          color: #000;
          line-height: 15px;
          font-weight: 300;
          font-variant-ligatures: none;
          word-wrap: break-word;
          font-size: 10px;
          min-height: 792px;
          padding-left: 35px;
          padding-right: 35px;
        }

        .dyn-mli2.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mli2 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mli2 ul {
          list-style: none;
          margin: 0 0 0 8px;
          padding: 0;
        }

        .dyn-mli2.rtl ul {
          margin: 0 8px 0 0;
        }

        .dyn-mli2 ul li {
          position: relative;
          margin: 0;
        }

        .dyn-mli2 ul li::before {
          content: '\\2022';
          position: absolute;
          left: -8px;
          top: 0;
          font-family: auto;
        }

        .dyn-mli2.rtl ul li::before {
          left: auto;
          right: -8px;
        }

        .dyn-mli2 .txt-bold {
          font-weight: 700;
        }

        .dyn-mli2 .txt-medium {
          font-weight: 500;
        }

        /* Top Section - Name */
        .dyn-mli2 .topsection {
          position: relative;
          padding-top: 45px;
          border-bottom: 1px solid ${colorHex};
          padding-bottom: 5px;
        }

        .dyn-mli2 .topsection::before {
          content: '';
          background: ${colorHex};
          position: absolute;
          height: 35px;
          width: calc(100% + 70px);
          top: 0;
          left: -35px;
          opacity: 0.15;
        }

        .dyn-mli2.rtl .topsection::before {
          left: auto;
          right: -35px;
        }

        .dyn-mli2 .name {
          color: ${colorHex};
          font-size: 36px;
          line-height: 34px;
          font-weight: 700;
          text-transform: uppercase;
          padding-bottom: 5px;
        }

        .dyn-mli2 .resumeTitle {
          color: ${colorHex};
          font-size: 18px;
          padding-bottom: 5px;
        }

        /* Parent Container - Two Column Layout */
        .dyn-mli2 .parentContainer {
          display: table;
          table-layout: fixed;
          width: 100%;
          border-collapse: collapse;
        }

        .dyn-mli2 .left-box {
          padding: 25px 17px 25px 0;
          display: table-cell;
          width: 60%;
          vertical-align: top;
        }

        .dyn-mli2.rtl .left-box {
          padding: 25px 0 25px 17px;
        }

        .dyn-mli2 .right-box {
          padding: 25px 0 25px 17px;
          display: table-cell;
          width: 40%;
          vertical-align: top;
        }

        .dyn-mli2.rtl .right-box {
          padding: 25px 17px 25px 0;
        }

        /* Section Styling */
        .dyn-mli2 .section {
          margin-bottom: 25px;
          padding-bottom: 5px;
          border-bottom: 1px solid ${colorHex};
        }

        .dyn-mli2 .section:last-child {
          border-bottom: none;
        }

        .dyn-mli2 .heading {
          margin-bottom: 4px;
          font-weight: bold;
          font-size: 18px;
          overflow: hidden;
        }

        .dyn-mli2 .sectiontitle {
          color: ${colorHex};
          text-transform: uppercase;
          padding-right: 5px;
          display: inline;
          letter-spacing: 0.5px;
          font-size: 14px;
          line-height: 16px;
        }

        .dyn-mli2.rtl .sectiontitle {
          padding-right: 0;
          padding-left: 5px;
          letter-spacing: unset;
        }

        .dyn-mli2 .sectiontitle::after {
          content: '';
          display: inline-block;
          width: 100%;
          height: 11px;
          margin-right: -100%;
          margin-left: 5px;
          background: ${colorHex};
          opacity: 0.15;
        }

        .dyn-mli2.rtl .sectiontitle::after {
          margin-left: -100%;
          margin-right: 5px;
        }

        /* Paragraph Styling */
        .dyn-mli2 .paragraph {
          margin-top: 15px;
        }

        .dyn-mli2 .paragraph:first-child {
          margin-top: 0;
        }

        /* Contact Section */
        .dyn-mli2 .contact-row {
          display: block;
          margin-bottom: 3px;
        }

        .dyn-mli2 .contact-label {
          font-weight: 700;
        }

        /* Experience & Education */
        .dyn-mli2 .job-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          font-weight: 700;
        }

        .dyn-mli2.rtl .job-header {
          flex-direction: row-reverse;
        }

        .dyn-mli2 .job-dates {
          font-weight: 500;
          white-space: nowrap;
        }

        .dyn-mli2 .company-line {
          font-weight: 700;
          display: block;
        }

        .dyn-mli2 .job-description {
          margin-top: 3px;
        }

        .dyn-mli2 .edu-line {
          display: block;
        }

        .dyn-mli2 .degree {
          font-weight: 500;
        }

        .dyn-mli2 .programline {
          font-weight: 500;
        }

        /* Skills Section */
        .dyn-mli2 .skill-item {
          margin-bottom: 5px;
        }

        .dyn-mli2 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          height: 4px;
          margin-top: 3px;
        }

        .dyn-mli2 .inner-rating {
          background-color: ${colorHex};
          height: 100%;
        }

        /* Languages Section */
        .dyn-mli2 .lang-item {
          margin-bottom: 8px;
        }

        /* RTL Date Styling */
        .dyn-mli2.rtl .inner-date {
          direction: ltr;
          display: flex;
          flex-direction: row-reverse;
        }

        .dyn-mli2.rtl .dates_wrapper {
          font-weight: 500;
          padding-right: 2px;
        }
      `}</style>

      <div className={`dyn-mli2 ${rtl ? 'rtl' : ''}`}>
        {/* Top Section - Name */}
        {fullName && (
          <div className="topsection">
            <div className="name">{fullName}</div>
            {data.professional_title && (
              <div className="resumeTitle">{data.professional_title}</div>
            )}
          </div>
        )}

        {/* Two Column Layout */}
        <div className="parentContainer">
          {/* Left Column - Summary, Experience, Education */}
          <div className="left-box">
            {/* Professional Summary */}
            {data.summary && (
              <div className="section">
                <div className="heading">
                  <span className="sectiontitle">{translations.professional_summary}</span>
                </div>
                <div className="paragraph">
                  <p>{data.summary}</p>
                </div>
              </div>
            )}

            {/* Work Experience */}
            {data.experiences && data.experiences.length > 0 && (
              <div className="section">
                <div className="heading">
                  <span className="sectiontitle">{translations.work_history}</span>
                </div>
                {data.experiences.map((exp, index) => (
                  <div key={exp.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="job-header">
                      <span>
                        <span className="jobtitle">{exp.job_title}</span>
                        {exp.job_title && (exp.start_date || exp.end_date) && ', '}
                        <span className="dates_wrapper">
                          {exp.start_date && (
                            <span className="job-dates">{formatDate(exp.start_date, language)}</span>
                          )}
                          {exp.start_date && (exp.end_date || exp.currently_working) && ' to '}
                          {exp.currently_working ? (
                            <span className="job-dates">{translations.present}</span>
                          ) : exp.end_date && (
                            <span className="job-dates">{formatDate(exp.end_date, language)}</span>
                          )}
                        </span>
                      </span>
                    </div>
                    {(exp.company || exp.location) && (
                      <span className="company-line">
                        {exp.company}
                        {exp.company && exp.location && ' - '}
                        {exp.location}
                      </span>
                    )}
                    {exp.description && (
                      <div className="job-description">
                        <ul>
                          {exp.description.split('\n').filter(Boolean).map((line, i) => (
                            <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {data.educations && data.educations.length > 0 && (
              <div className="section">
                <div className="heading">
                  <span className="sectiontitle">{translations.education}</span>
                </div>
                {data.educations.map((edu, index) => (
                  <div key={edu.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="edu-line">
                      {edu.degree && <span className="degree">{edu.degree}</span>}
                      {edu.degree && edu.field_of_study && ', '}
                      {edu.field_of_study && <span className="programline">{edu.field_of_study}</span>}
                      {(edu.degree || edu.field_of_study) && edu.end_date && ', '}
                      {edu.end_date && (
                        <span className="job-dates">{formatDate(edu.end_date, language)}</span>
                      )}
                      {edu.currently_studying && (
                        <span className="job-dates"> ({translations.present})</span>
                      )}
                    </div>
                    {edu.institution && (
                      <div className="company-line">{edu.institution}</div>
                    )}
                    {edu.description && <div>{edu.description}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Certificates */}
            {data.certificates && data.certificates.length > 0 && (
              <div className="section">
                <div className="heading">
                  <span className="sectiontitle">{translations.certificates}</span>
                </div>
                {data.certificates.map((cert, index) => (
                  <div key={cert.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="txt-bold">{cert.name}</div>
                    {cert.organization && <div>{cert.organization}</div>}
                    {cert.issue_date && <div className="job-dates">{formatDate(cert.issue_date, language)}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Contact, Skills, Languages */}
          <div className="right-box">
            {/* Contact Section */}
            {hasContact && (
              <div className="section">
                <div className="heading">
                  <span className="sectiontitle">{translations.contact}</span>
                </div>
                <div className="paragraph">
                  {addressParts.length > 0 && (
                    <div className="contact-row">
                      <span className="contact-label">Address: </span>
                      <span>{addressParts.join(', ')}</span>
                    </div>
                  )}
                  {data.phone && (
                    <div className="contact-row">
                      <span className="contact-label">Phone: </span>
                      <span>{data.phone}</span>
                    </div>
                  )}
                  {data.email && (
                    <div className="contact-row">
                      <span className="contact-label">Email: </span>
                      <span>{data.email}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Skills Section */}
            {data.skills && data.skills.length > 0 && (
              <div className="section">
                <div className="heading">
                  <span className="sectiontitle">{translations.skills}</span>
                </div>
                <div className="paragraph">
                  <ul>
                    {data.skills.map((skill, index) => (
                      <li key={skill.id || index}>{skill.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Languages Section */}
            {data.languages && data.languages.length > 0 && (
              <div className="section">
                <div className="heading">
                  <span className="sectiontitle">{translations.languages}</span>
                </div>
                {data.languages.map((lang, index) => (
                  <div key={lang.id || index} className="lang-item">
                    <div>{lang.name}</div>
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
        </div>
      </div>
    </>
  );
}
