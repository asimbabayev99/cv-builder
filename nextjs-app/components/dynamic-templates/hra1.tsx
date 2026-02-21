import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicHra1({ data, translations, language = 'en', colorHex = '#000000' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressParts = [data.city, data.country].filter(Boolean);
  const hasContact = data.email || data.phone || addressParts.length > 0;

  return (
    <>
      <style>{`
        .dyn-hra1 {
          font-family: 'Times New Roman', Times, serif;
          color: #000;
          line-height: 14px;
          font-size: 12px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 12px 25px;
        }

        .dyn-hra1.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-hra1 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-hra1 ul {
          list-style-type: disc;
          margin: 0 0 0 10px;
          padding: 0;
        }

        .dyn-hra1.rtl ul {
          margin: 0 10px 0 0;
        }

        .dyn-hra1 ul li {
          margin: 0 0 0 13px;
        }

        .dyn-hra1.rtl ul li {
          margin: 0 13px 0 0;
        }

        .dyn-hra1 .txtBold {
          font-weight: bold;
        }

        .dyn-hra1 .paddedline {
          display: block;
        }

        .dyn-hra1 .dates_wrapper {
          display: block;
          float: left;
          width: 105px;
        }

        .dyn-hra1.rtl .dates_wrapper {
          float: right;
        }

        /* Name Section */
        .dyn-hra1 .name {
          font-size: 24px;
          line-height: 28px;
          font-weight: bold;
          padding: 0;
          text-align: center;
          font-variant: small-caps;
          color: ${colorHex};
        }

        .dyn-hra1 .resumeTitle {
          text-align: center;
          color: #4a4a4a;
          font-size: 16px;
          line-height: 26px;
          padding: 4px 0;
        }

        /* Address */
        .dyn-hra1 .address {
          position: relative;
          text-align: center;
          font-size: 12px;
          line-height: 14px;
          margin-top: 4px;
        }

        /* Section Styling */
        .dyn-hra1 .section {
          margin-top: 4px;
          position: relative;
        }

        .dyn-hra1 .section:first-child,
        .dyn-hra1 .firstsection {
          margin-top: 0;
        }

        /* Heading */
        .dyn-hra1 .heading {
          width: 100%;
          clear: both;
          font-weight: bold;
          font-variant: small-caps;
          margin-bottom: 1px;
          height: 14px;
          border-bottom: 1px solid ${colorHex};
        }

        .dyn-hra1 .sectiontitle {
          font-size: 14px;
          line-height: 16px;
          background-color: #FFF;
          padding: 0 10px 1px 0;
          position: absolute;
          color: ${colorHex};
          border-bottom: 1px solid #FFF;
        }

        .dyn-hra1.rtl .sectiontitle {
          padding: 0 0 1px 10px;
        }

        /* Paragraph */
        .dyn-hra1 .paragraph {
          margin-top: 3px;
          position: relative;
        }

        .dyn-hra1 .firstparagraph {
          margin-top: 0;
        }

        .dyn-hra1 .singlecolumn {
          margin-left: 105px;
        }

        .dyn-hra1.rtl .singlecolumn {
          margin-left: 0;
          margin-right: 105px;
        }

        .dyn-hra1 .paragraph::after {
          content: '';
          display: table;
          clear: both;
        }

        /* Two Column Skills */
        .dyn-hra1 .twocol {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-hra1 .twocol td {
          width: 50%;
          vertical-align: top;
          padding-top: 1px;
        }

        /* Rating Bar */
        .dyn-hra1 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
        }

        .dyn-hra1 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }

        /* Languages flex layout */
        .dyn-hra1 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-left: 105px;
        }

        .dyn-hra1.rtl .lang-sec {
          padding-left: 0;
          padding-right: 105px;
        }

        .dyn-hra1 .lang-sec .heading {
          margin-left: -105px;
          width: calc(100% + 105px);
        }

        .dyn-hra1.rtl .lang-sec .heading {
          margin-left: 0;
          margin-right: -105px;
        }

        .dyn-hra1 .lang-sec .paragraph {
          vertical-align: top;
          padding-bottom: 5px;
          margin-top: 0;
          width: 47.8%;
        }

        .dyn-hra1 .lang-sec .singlecolumn {
          margin-left: 0;
        }

        .dyn-hra1.rtl .lang-sec .singlecolumn {
          margin-right: 0;
        }
      `}</style>

      <div className={`dyn-hra1 ${rtl ? 'rtl' : ''}`}>
        {/* Name & Contact Section */}
        <div className="name-contact">
          {fullName && <div className="name">{fullName}</div>}
          {data.professional_title && (
            <div className="resumeTitle">{data.professional_title}</div>
          )}
          {hasContact && (
            <div className="address">
              {addressParts.length > 0 && <span>{addressParts.join(', ')}</span>}
              {addressParts.length > 0 && (data.phone || data.email) && <br />}
              {data.phone && <span>{data.phone}</span>}
              {data.phone && data.email && ' - '}
              {data.email && <span>{data.email}</span>}
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
                {(exp.start_date || exp.end_date) && (
                  <span className="dates_wrapper">
                    {exp.start_date && formatDate(exp.start_date, language)}
                    {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                    {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                  </span>
                )}
                <div className="singlecolumn">
                  {exp.job_title && (
                    <span className="paddedline txtBold">{exp.job_title}</span>
                  )}
                  {(exp.company || exp.location) && (
                    <span className="paddedline">
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
                {edu.end_date && (
                  <span className="dates_wrapper">{formatDate(edu.end_date, language)}</span>
                )}
                <div className="singlecolumn">
                  {(edu.degree || edu.field_of_study) && (
                    <span className="paddedline">
                      <span className="txtBold">{edu.degree}</span>
                      {edu.degree && edu.field_of_study && ' : '}
                      <span className="txtBold">{edu.field_of_study}</span>
                    </span>
                  )}
                  {edu.institution && (
                    <span className="paddedline">
                      <span className="txtBold">{edu.institution}</span>
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
                {cert.issue_date && (
                  <span className="dates_wrapper">{formatDate(cert.issue_date, language)}</span>
                )}
                <div className="singlecolumn">
                  <span className="paddedline txtBold">{cert.name}</span>
                  {cert.organization && <span className="paddedline">{cert.organization}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
