import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicSma2({ data, translations, language = 'en', colorHex = '#bcbfc3' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressParts = [data.city, data.country].filter(Boolean);
  const hasContact = data.email || data.phone || addressParts.length > 0;

  return (
    <>
      <style>{`
        .dyn-sma2 {
          font-family: 'Century Gothic', sans-serif;
          color: #4a4a4a;
          background-color: #fff;
          line-height: 15px;
          font-size: 11px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 40px;
        }

        .dyn-sma2.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-sma2 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-sma2 ul {
          list-style: none;
          margin: 0 0 0 8px;
          padding: 0;
        }

        .dyn-sma2.rtl ul {
          margin: 0 8px 0 0;
        }

        .dyn-sma2 ul li {
          position: relative;
          margin: 0 0 0 5px;
        }

        .dyn-sma2.rtl ul li {
          margin: 0 5px 0 0;
        }

        .dyn-sma2 ul li::before {
          content: '\\25CF\\0020';
          position: absolute;
          left: -13px;
          top: 0;
        }

        .dyn-sma2.rtl ul li::before {
          left: auto;
          right: -13px;
        }

        .dyn-sma2 .txtBold {
          font-weight: bold;
        }

        .dyn-sma2 .paddedline {
          display: block;
        }

        .dyn-sma2 .dates_wrapper {
          display: block;
          float: left;
          width: 185px;
        }

        .dyn-sma2.rtl .dates_wrapper {
          float: right;
        }

        /* Name Section */
        .dyn-sma2 .name {
          font-size: 40px;
          line-height: 44px;
          padding: 0;
          text-transform: uppercase;
          text-align: center;
        }

        .dyn-sma2 .resumeTitle {
          text-align: center;
          color: #4a4a4a;
          text-transform: lowercase;
          font-size: 15px;
          line-height: 15px;
          padding: 8px 0;
        }

        .dyn-sma2 .resumeTitle::first-letter {
          text-transform: uppercase;
        }

        /* Address */
        .dyn-sma2 .address {
          position: relative;
          text-align: center;
          font-size: 11px;
          line-height: 15px;
          margin-top: 4px;
        }

        /* Section Styling */
        .dyn-sma2 .section {
          padding-top: 25px;
        }

        .dyn-sma2 .section:first-child,
        .dyn-sma2 .firstsection {
          border: none;
          padding: 0;
        }

        /* Heading */
        .dyn-sma2 .heading {
          background-color: ${colorHex};
          color: #fff;
          clear: both;
          font-weight: normal;
          margin-bottom: 10px;
        }

        .dyn-sma2 .sectiontitle {
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 11px;
          line-height: 15px;
          padding: 0 10px;
        }

        /* Paragraph */
        .dyn-sma2 .paragraph {
          padding-top: 10px;
          position: relative;
        }

        .dyn-sma2 .firstparagraph {
          padding-top: 0;
        }

        .dyn-sma2 .parlrColmn {
          clear: both;
        }

        .dyn-sma2 .parlrColmn::after {
          content: '';
          display: table;
          clear: both;
        }

        .dyn-sma2 .parlrColmn .singlecolumn {
          margin-left: 185px;
          padding: 0 0 0 10px;
        }

        .dyn-sma2.rtl .parlrColmn .singlecolumn {
          margin-left: 0;
          margin-right: 185px;
          padding: 0 10px 0 0;
        }

        /* Two Column Skills */
        .dyn-sma2 .twocol {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-sma2 .twocol td {
          width: 50%;
          display: table-cell;
          padding-top: 5px;
        }

        .dyn-sma2 .twocol td + td {
          padding-left: 2%;
        }

        .dyn-sma2.rtl .twocol td + td {
          padding-left: 0;
          padding-right: 2%;
        }

        /* Rating Bar */
        .dyn-sma2 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
        }

        .dyn-sma2 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }

        /* Languages flex layout */
        .dyn-sma2 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .dyn-sma2 .lang-sec .heading {
          width: 100%;
          flex-grow: 1;
        }

        .dyn-sma2 .lang-sec .paragraph {
          width: 48.5%;
          vertical-align: top;
          padding-bottom: 5px;
          margin-top: 0;
          padding-top: 0;
        }

        .dyn-sma2 .lang-sec .singlecolumn {
          margin-left: 0;
        }

        .dyn-sma2.rtl .lang-sec .singlecolumn {
          margin-right: 0;
        }
      `}</style>

      <div className={`dyn-sma2 ${rtl ? 'rtl' : ''}`}>
        {/* Name & Contact Section */}
        <div className="name-contact section firstsection">
          {fullName && <div className="name">{fullName}</div>}
          {data.professional_title && (
            <div className="resumeTitle">{data.professional_title}</div>
          )}
          {hasContact && (
            <div className="address">
              <span className="paddedline">
                {data.email && <span>{data.email}</span>}
                {data.email && (data.phone || addressParts.length > 0) && ' | '}
                {data.phone && <span>{data.phone}</span>}
                {data.phone && addressParts.length > 0 && ' | '}
                {addressParts.length > 0 && <span>{addressParts.join(', ')}</span>}
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
            <div className="paragraph firstparagraph">
              <div className="singlecolumn" style={{ padding: '0 10px' }}>
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
              <div key={exp.id || index} className={`paragraph parlrColmn ${index === 0 ? 'firstparagraph' : ''}`}>
                <span className="dates_wrapper" style={{ padding: '0 10px' }}>
                  {(exp.start_date || exp.end_date) && (
                    <span className="paddedline">
                      {exp.start_date && formatDate(exp.start_date, language)}
                      {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                      {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                    </span>
                  )}
                  {exp.job_title && (
                    <span className="paddedline txtBold">{exp.job_title}</span>
                  )}
                  {(exp.company || exp.location) && (
                    <span className="paddedline">
                      {exp.company}
                      {exp.company && exp.location && ' - '}
                      {exp.location}
                    </span>
                  )}
                </span>
                <div className="singlecolumn">
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
              <div className="singlecolumn" style={{ padding: '0 10px' }}>
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
                <div className="singlecolumn" style={{ padding: '0 10px' }}>
                  {edu.end_date && (
                    <span className="paddedline">{formatDate(edu.end_date, language)}</span>
                  )}
                  {(edu.degree || edu.field_of_study) && (
                    <span className="paddedline">
                      <span className="txtBold">{edu.degree}</span>
                      {edu.degree && edu.field_of_study && ' : '}
                      {edu.field_of_study}
                    </span>
                  )}
                  {edu.institution && (
                    <span className="paddedline">{edu.institution}</span>
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
                <div className="singlecolumn" style={{ padding: '0 10px' }}>
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
                <div className="singlecolumn" style={{ padding: '0 10px' }}>
                  <span className="paddedline txtBold">{cert.name}</span>
                  {cert.organization && <span className="paddedline">{cert.organization}</span>}
                  {cert.issue_date && <span className="paddedline">{formatDate(cert.issue_date, language)}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
