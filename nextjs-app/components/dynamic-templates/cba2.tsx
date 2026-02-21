import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicCba2({ data, translations, language = 'en', colorHex = '#000000' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressParts = [data.city, data.country].filter(Boolean);
  const hasContact = data.email || data.phone || addressParts.length > 0;

  return (
    <>
      <style>{`
        .dyn-cba2 {
          font-family: 'Times New Roman', Times, serif;
          color: #000;
          line-height: 14px;
          font-size: 12px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 25px 30px;
        }

        .dyn-cba2.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-cba2 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-cba2 ul {
          list-style-type: disc;
          margin: 0 0 0 10px;
          padding: 0;
        }

        .dyn-cba2.rtl ul {
          margin: 0 10px 0 0;
        }

        .dyn-cba2 ul li {
          margin: 0 0 5px 10px;
        }

        .dyn-cba2.rtl ul li {
          margin: 0 10px 5px 0;
        }

        .dyn-cba2 ul li:last-child {
          margin-bottom: 0;
        }

        .dyn-cba2 .txtBold {
          font-weight: bold;
        }

        .dyn-cba2 .paddedline {
          display: block;
        }

        .dyn-cba2 .bottom-space {
          padding-bottom: 5px;
        }

        /* Name Section */
        .dyn-cba2 .name {
          font-size: 24px;
          line-height: 32px;
          padding-top: 10px;
          font-weight: bold;
          border-top: 1px solid ${colorHex};
          text-align: center;
          font-variant: small-caps;
          color: ${colorHex};
        }

        .dyn-cba2 .lowerborder {
          border-bottom: 1px solid ${colorHex};
          margin: 1px 0 2px 0;
          display: block;
        }

        .dyn-cba2 .lowerborder2 {
          border-top: 3px solid ${colorHex};
          display: block;
        }

        .dyn-cba2 .resumeTitle {
          text-align: center;
          color: #4a4a4a;
          font-size: 16px;
          line-height: 26px;
          padding: 0 0 10px 0;
        }

        /* Contact Section */
        .dyn-cba2 .address {
          position: relative;
          text-align: center;
          font-size: 11px;
          line-height: 13px;
          padding-top: 8px;
        }

        .dyn-cba2 .address ul {
          display: inline;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .dyn-cba2 .address li {
          display: inline;
          margin: 0;
          padding: 0;
        }

        .dyn-cba2 .address li::before {
          content: "\\25C6\\0020";
          vertical-align: bottom;
          padding: 0 10px;
          font-size: 10px;
        }

        .dyn-cba2 .address li:first-child::before {
          content: " ";
          padding: 0;
        }

        /* Section Styling */
        .dyn-cba2 .section {
          position: relative;
          margin-top: 15px;
        }

        .dyn-cba2 .section:first-child {
          margin-top: 0;
        }

        /* Heading */
        .dyn-cba2 .heading {
          width: 100%;
          flex-grow: 1;
          clear: both;
          text-align: center;
          font-weight: normal;
          font-variant: small-caps;
          position: relative;
          margin-bottom: 5px;
        }

        .dyn-cba2 .heading::before {
          border-top: 1px solid ${colorHex};
          content: "";
          display: block;
          height: 1px;
          position: absolute;
          top: 50%;
          width: 100%;
          z-index: 1;
        }

        .dyn-cba2 .sectiontitle {
          display: inline-block;
          position: relative;
          z-index: 5;
          background: #FFF;
          padding: 0 10px;
          font-size: 15px;
          line-height: 17px;
          color: ${colorHex};
        }

        /* Paragraph */
        .dyn-cba2 .paragraph {
          margin-top: 15px;
          position: relative;
        }

        .dyn-cba2 .firstparagraph {
          margin-top: 0;
        }

        /* Two Column Skills */
        .dyn-cba2 .twocol {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-cba2 .twocol td {
          width: 50%;
          vertical-align: top;
          display: table-cell;
        }

        /* Rating Bar for Languages */
        .dyn-cba2 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
        }

        .dyn-cba2 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }

        /* Languages/Skills flex layout */
        .dyn-cba2 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .dyn-cba2 .lang-sec .paragraph {
          display: inline-block;
          vertical-align: top;
          padding-bottom: 5px;
          margin-top: 0;
          width: 48.3%;
        }

        .dyn-cba2 .lang-sec .paragraph:nth-last-child(1),
        .dyn-cba2 .lang-sec .paragraph:nth-last-child(2) {
          padding-bottom: 0;
        }
      `}</style>

      <div className={`dyn-cba2 ${rtl ? 'rtl' : ''}`}>
        {/* Name & Contact Section */}
        <div className="name-contact">
          {fullName && (
            <>
              <div className="name">{fullName}</div>
              <div className="lowerborder"></div>
              <div className="lowerborder2"></div>
            </>
          )}

          {data.professional_title && (
            <div className="resumeTitle">{data.professional_title}</div>
          )}

          {hasContact && (
            <div className="address">
              <ul>
                {addressParts.length > 0 && <li>{addressParts.join(', ')}</li>}
                {data.phone && <li>{data.phone}</li>}
                {data.email && <li>{data.email}</li>}
              </ul>
            </div>
          )}
        </div>

        {/* Summary Section */}
        {data.summary && (
          <div className="section">
            <div className="heading">
              <div className="sectiontitle">{translations.professional_summary}</div>
            </div>
            <div className="paragraph firstparagraph">
              <p>{data.summary}</p>
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
                <span className="bottom-space paddedline">
                  <span className="txtBold">{exp.job_title}</span>
                  {exp.job_title && (exp.start_date || exp.end_date) && ', '}
                  {exp.start_date && formatDate(exp.start_date, language)}
                  {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                  {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                </span>
                {(exp.company || exp.location) && (
                  <span className="paddedline bottom-space">
                    <span className="txtBold">{exp.company}</span>
                    {exp.company && exp.location && ' - '}
                    {exp.location}
                  </span>
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

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <div className="section">
            <div className="heading">
              <div className="sectiontitle">{translations.skills}</div>
            </div>
            <div className="paragraph firstparagraph">
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
        )}

        {/* Education Section */}
        {data.educations && data.educations.length > 0 && (
          <div className="section">
            <div className="heading">
              <div className="sectiontitle">{translations.education}</div>
            </div>
            {data.educations.map((edu, index) => (
              <div key={edu.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                <span className="paddedline">
                  <span className="txtBold">{edu.degree}</span>
                  {edu.degree && edu.field_of_study && ' : '}
                  {edu.field_of_study}
                  {(edu.degree || edu.field_of_study) && edu.end_date && ', '}
                  {edu.end_date && formatDate(edu.end_date, language)}
                </span>
                {edu.institution && (
                  <span className="paddedline">
                    <span className="txtBold">{edu.institution}</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages Section */}
        {data.languages && data.languages.length > 0 && (
          <div className="section lang-sec">
            <div className="heading" style={{ width: '100%' }}>
              <div className="sectiontitle">{translations.languages}</div>
            </div>
            {data.languages.map((lang, index) => (
              <div key={lang.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
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

        {/* Certificates Section */}
        {data.certificates && data.certificates.length > 0 && (
          <div className="section">
            <div className="heading">
              <div className="sectiontitle">{translations.certificates}</div>
            </div>
            {data.certificates.map((cert, index) => (
              <div key={cert.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                <span className="paddedline">
                  <span className="txtBold">{cert.name}</span>
                </span>
                {cert.organization && <span className="paddedline">{cert.organization}</span>}
                {cert.issue_date && <span className="paddedline">{formatDate(cert.issue_date, language)}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
