import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicTma3({ data, translations, language = 'en', colorHex = '#343b40' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join('\n');
  const hasContact = data.email || data.phone || data.city || data.country;

  return (
    <>
      <style>{`
        .dyn-tma3 {
          font-family: Verdana, sans-serif;
          color: ${colorHex};
          line-height: 14px;
          font-size: 11px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 30px;
        }

        .dyn-tma3.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-tma3 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-tma3 ul {
          list-style-type: disc;
          margin: 5px 0 0 10px;
          padding: 0;
        }

        .dyn-tma3.rtl ul {
          margin: 5px 10px 0 0;
        }

        .dyn-tma3 ul li {
          margin: 0 0 0 13px;
          padding: 0 0 0 10px;
        }

        .dyn-tma3.rtl ul li {
          margin: 0 13px 0 0;
          padding: 0 10px 0 0;
        }

        .dyn-tma3 .paddedline {
          display: block;
        }

        .dyn-tma3 .datesWrapper {
          float: right;
          font-style: italic;
        }

        .dyn-tma3.rtl .datesWrapper {
          float: left;
        }

        .dyn-tma3 .txtBold {
          font-weight: bold;
        }

        .dyn-tma3 .jobtitle,
        .dyn-tma3 .degree {
          font-weight: bold;
          color: ${colorHex};
        }

        .dyn-tma3 .companyname,
        .dyn-tma3 .programline {
          color: ${colorHex};
        }

        /* Name Section */
        .dyn-tma3 .name {
          font-weight: bold;
          font-size: 28px;
          line-height: 31px;
          padding: 0;
          text-align: left;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: ${colorHex};
          white-space: pre-line;
        }

        .dyn-tma3.rtl .name {
          text-align: right;
        }

        .dyn-tma3 .address {
          position: relative;
          text-align: left;
          font-size: 11px;
          line-height: 14px;
          margin: 0;
        }

        .dyn-tma3.rtl .address {
          text-align: right;
        }

        /* Timeline Section */
        .dyn-tma3 .section {
          border-left: 1px solid ${colorHex};
          padding-left: 20px;
          margin-left: 17px;
          position: relative;
          padding-top: 20px;
        }

        .dyn-tma3.rtl .section {
          border-left: none;
          border-right: 1px solid ${colorHex};
          padding-left: 0;
          padding-right: 20px;
          margin-left: 0;
          margin-right: 17px;
        }

        .dyn-tma3 .firstsection {
          border: none;
          padding-top: 0;
          margin-top: 0;
          padding-bottom: 0;
        }

        .dyn-tma3 .heading {
          clear: both;
          font-weight: bold;
          text-transform: uppercase;
          color: ${colorHex};
          position: relative;
          padding-bottom: 5px;
        }

        .dyn-tma3 .heading::before {
          display: block;
          position: absolute;
          top: 5px;
          left: -25px;
          content: "";
          height: 8px;
          width: 8px;
          border: 1px solid ${colorHex};
          border-radius: 100%;
          background: #fff;
          z-index: 2;
        }

        .dyn-tma3.rtl .heading::before {
          left: auto;
          right: -25px;
        }

        .dyn-tma3 .sectiontitle {
          font-size: 11px;
          line-height: 20px;
          letter-spacing: 1px;
        }

        .dyn-tma3 .paragraph {
          position: relative;
          margin-top: 10px;
        }

        .dyn-tma3 .firstparagraph {
          margin-top: 0;
        }

        .dyn-tma3 .singlecolumn {
          margin-left: 0;
        }

        /* Two Column Skills */
        .dyn-tma3 .twocol {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-tma3 .twocol td {
          width: 50%;
          display: table-cell;
          vertical-align: top;
        }

        /* Languages Flex Layout */
        .dyn-tma3 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-left: 20px;
        }

        .dyn-tma3.rtl .lang-sec {
          padding-left: 0;
          padding-right: 20px;
        }

        .dyn-tma3 .lang-sec .heading {
          width: 100%;
          flex-grow: 1;
        }

        .dyn-tma3 .lang-sec .paragraph {
          width: 48.5%;
          vertical-align: top;
          padding-bottom: 5px;
          margin-top: 0;
          margin-left: 0;
        }

        .dyn-tma3.rtl .lang-sec .paragraph {
          margin-right: 0;
        }

        /* Rating Bar */
        .dyn-tma3 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
        }

        .dyn-tma3 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }
      `}</style>

      <div className={`dyn-tma3 ${rtl ? 'rtl' : ''}`}>
        {/* Name & Contact Section */}
        <div className="section firstsection">
          {fullName && <div className="name">{fullName}</div>}
          {hasContact && (
            <div className="address">
              {data.email && <span>{data.email}</span>}
              {data.email && data.phone && ' | '}
              {data.phone && <span>{data.phone}</span>}
              {(data.email || data.phone) && (data.city || data.country) && <br />}
              {data.city && <span>{data.city}</span>}
              {data.city && data.country && ', '}
              {data.country && <span>{data.country}</span>}
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
                <div className="singlecolumn">
                  <span className="paddedline">
                    {exp.job_title && <span className="jobtitle">{exp.job_title}</span>}
                    {exp.job_title && exp.company && ' | '}
                    {exp.company && <span className="companyname">{exp.company}</span>}
                    {(exp.company || exp.job_title) && exp.location && ' - '}
                    {exp.location && <span className="joblocation">{exp.location}</span>}
                    {(exp.start_date || exp.end_date) && (
                      <span className="datesWrapper">
                        {exp.start_date && formatDate(exp.start_date, language)}
                        {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                        {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                      </span>
                    )}
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
                  <span className="paddedline">
                    {edu.institution && <span className="companyname">{edu.institution}</span>}
                    {edu.end_date && (
                      <span className="datesWrapper">{formatDate(edu.end_date, language)}</span>
                    )}
                  </span>
                  {(edu.degree || edu.field_of_study) && (
                    <span className="paddedline">
                      {edu.degree && <span className="degree">{edu.degree}</span>}
                      {edu.degree && edu.field_of_study && ' : '}
                      {edu.field_of_study && <span className="programline">{edu.field_of_study}</span>}
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
                <span className="paddedline txtBold">{cert.name}</span>
                {cert.organization && <span className="paddedline">{cert.organization}</span>}
                {cert.issue_date && (
                  <span className="paddedline">{formatDate(cert.issue_date, language)}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
