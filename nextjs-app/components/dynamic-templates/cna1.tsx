import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicCna1({ data, translations, language = 'en', colorHex = '#404041' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressParts = [data.city, data.country].filter(Boolean);
  const hasContact = data.email || data.phone || addressParts.length > 0;

  return (
    <>
      <style>{`
        .dyn-cna1 {
          font-family: 'Century Gothic', sans-serif;
          color: #404041;
          line-height: 12px;
          font-size: 11px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 22px 40px;
        }

        .dyn-cna1.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-cna1 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-cna1 ul {
          margin-left: 10px;
        }

        .dyn-cna1.rtl ul {
          margin-left: 0;
          margin-right: 10px;
        }

        .dyn-cna1 ul li {
          margin-left: 13px;
          list-style-type: disc;
        }

        .dyn-cna1.rtl ul li {
          margin-left: 0;
          margin-right: 13px;
        }

        .dyn-cna1 .txtBold {
          font-weight: bold;
        }

        .dyn-cna1 .paddedline {
          display: block;
        }

        .dyn-cna1 .grayItl {
          font-style: italic;
          color: #C3C3C3;
        }

        /* Name Section */
        .dyn-cna1 .name {
          font-size: 22px;
          font-weight: bold;
          line-height: 24px;
          padding: 18px 0 0 0;
          text-transform: uppercase;
          border-top: 6px solid ${colorHex};
          color: ${colorHex};
        }

        .dyn-cna1 .resumeTitle {
          color: #4a4a4a;
          text-transform: lowercase;
          font-size: 15px;
          line-height: 20px;
          padding: 0 0 10px 0;
        }

        .dyn-cna1 .resumeTitle::first-letter {
          text-transform: uppercase;
        }

        /* Address */
        .dyn-cna1 .address {
          position: relative;
          font-size: 10px;
          line-height: 13px;
          color: #808284;
          text-transform: uppercase;
        }

        .dyn-cna1 .email {
          color: #00ADEF;
          text-transform: lowercase;
        }

        /* Section Styling */
        .dyn-cna1 .section {
          margin-top: 10px;
          border-top: 1px solid #B2B0BF;
        }

        .dyn-cna1 .section:first-child,
        .dyn-cna1 .firstsection {
          margin-top: 0;
          border: none;
        }

        /* Heading */
        .dyn-cna1 .heading {
          clear: both;
          color: #231F20;
          text-transform: uppercase;
          font-style: italic;
          font-weight: bold;
          width: 100%;
          margin-bottom: 2px;
        }

        .dyn-cna1 .sectiontitle {
          font-size: 12px;
          line-height: 16px;
          color: ${colorHex};
        }

        /* Paragraph */
        .dyn-cna1 .paragraph {
          margin-top: 4px;
          position: relative;
        }

        .dyn-cna1 .firstparagraph {
          margin-top: 0;
        }

        .dyn-cna1 .singlecolumn {
          margin-left: 15px;
        }

        .dyn-cna1.rtl .singlecolumn {
          margin-left: 0;
          margin-right: 15px;
        }

        .dyn-cna1 .smry {
          font-weight: bold;
          font-size: 12px;
        }

        .dyn-cna1 .jobtitle {
          font-weight: bold;
          text-transform: uppercase;
        }

        .dyn-cna1 .degree {
          font-weight: bold;
          text-transform: uppercase;
        }

        /* Two Column Skills */
        .dyn-cna1 .twocol {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-cna1 .twocol td {
          width: 50%;
          vertical-align: top;
          display: table-cell;
          padding-top: 2px;
        }

        /* Rating Bar for Languages */
        .dyn-cna1 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
        }

        .dyn-cna1 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }

        /* Languages flex layout */
        .dyn-cna1 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-left: 15px;
        }

        .dyn-cna1.rtl .lang-sec {
          padding-left: 0;
          padding-right: 15px;
        }

        .dyn-cna1 .lang-sec .heading {
          margin-left: -15px;
          width: calc(100% + 15px);
        }

        .dyn-cna1.rtl .lang-sec .heading {
          margin-left: 0;
          margin-right: -15px;
        }

        .dyn-cna1 .lang-sec .paragraph {
          vertical-align: top;
          padding-bottom: 5px;
          margin-top: 0;
          width: 48%;
        }

        .dyn-cna1 .lang-sec .singlecolumn {
          margin-left: 0;
        }

        .dyn-cna1.rtl .lang-sec .singlecolumn {
          margin-right: 0;
        }

        .dyn-cna1 .lang-sec .paragraph:nth-last-child(1),
        .dyn-cna1 .lang-sec .paragraph:nth-last-child(2) {
          padding-bottom: 0;
        }
      `}</style>

      <div className={`dyn-cna1 ${rtl ? 'rtl' : ''}`}>
        {/* Name & Contact Section */}
        <div className="name-contact">
          {fullName && (
            <div className="name">{fullName}</div>
          )}

          {data.professional_title && (
            <div className="resumeTitle">{data.professional_title}</div>
          )}

          {hasContact && (
            <div className="address">
              {addressParts.length > 0 && (
                <span className="paddedline">{addressParts.join(', ')}</span>
              )}
              <span className="paddedline">
                {data.phone && <span>{data.phone}</span>}
                {data.phone && data.email && ' | '}
                {data.email && <span className="email">{data.email}</span>}
              </span>
            </div>
          )}
        </div>

        {/* Summary Section */}
        {data.summary && (
          <div className="section">
            <div className="heading">
              <div className="sectiontitle">{translations.professional_summary}</div>
            </div>
            <div className="paragraph smry firstparagraph">
              <div className="singlecolumn">
                <p>{data.summary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Work Experience Section */}
        {data.experiences && data.experiences.length > 0 && (
          <div className="section">
            <div className="heading">
              <div className="sectiontitle">{translations.work_history}</div>
            </div>
            {data.experiences.map((exp, index) => (
              <div key={exp.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                <div className="singlecolumn">
                  {exp.job_title && (
                    <span className="paddedline">
                      <span className="jobtitle">{exp.job_title}</span>
                    </span>
                  )}
                  <span className="paddedline grayItl">
                    {exp.company && <span>{exp.company}</span>}
                    {exp.company && (exp.location || exp.start_date || exp.end_date) && ' | '}
                    {exp.location && <span>{exp.location}</span>}
                    {exp.location && (exp.start_date || exp.end_date) && ' | '}
                    {exp.start_date && formatDate(exp.start_date, language)}
                    {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                    {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                  </span>
                  {exp.description && (
                    <ul>
                      {exp.description.split('\n').filter(Boolean).map((line, i) => (
                        <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <div className="section">
            <div className="heading">
              <div className="sectiontitle">{translations.skills}</div>
            </div>
            <div className="paragraph firstparagraph">
              <div className="singlecolumn">
                <table className="twocol">
                  <tbody>
                    <tr>
                      <td>
                        <ul>
                          {data.skills.slice(0, Math.ceil(data.skills.length / 2)).map((skill, index) => (
                            <li key={skill.id || index}>{skill.name}</li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {data.skills.slice(Math.ceil(data.skills.length / 2)).map((skill, index) => (
                            <li key={skill.id || index}>{skill.name}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Education Section */}
        {data.educations && data.educations.length > 0 && (
          <div className="section">
            <div className="heading">
              <div className="sectiontitle">{translations.education}</div>
            </div>
            {data.educations.map((edu, index) => (
              <div key={edu.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                <div className="singlecolumn">
                  {(edu.degree || edu.field_of_study) && (
                    <span className="paddedline">
                      <span className="degree">{edu.degree}</span>
                      {edu.degree && edu.field_of_study && ' '}
                      {edu.field_of_study}
                    </span>
                  )}
                  {edu.institution && (
                    <span className="paddedline">{edu.institution}</span>
                  )}
                  {edu.end_date && (
                    <span className="paddedline grayItl">
                      {formatDate(edu.end_date, language)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages Section */}
        {data.languages && data.languages.length > 0 && (
          <div className="section lang-sec">
            <div className="heading">
              <div className="sectiontitle">{translations.languages}</div>
            </div>
            {data.languages.map((lang, index) => (
              <div key={lang.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                <div className="singlecolumn">
                  <div>{lang.name}</div>
                  {lang.level && (
                    <div className="rating-bar">
                      <div className="inner-rating" style={{ width: `${(lang.level / 5) * 100}%` }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Certificates Section */}
        {data.certificates && data.certificates.length > 0 && (
          <div className="section">
            <div className="heading">
              <div className="sectiontitle">{translations.certificates}</div>
            </div>
            {data.certificates.map((cert, index) => (
              <div key={cert.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                <div className="singlecolumn">
                  <span className="paddedline txtBold">{cert.name}</span>
                  {cert.organization && <span className="paddedline">{cert.organization}</span>}
                  {cert.issue_date && (
                    <span className="paddedline grayItl">{formatDate(cert.issue_date, language)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
