import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicTma4({ data, translations, language = 'en', colorHex = '#0187de' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasContact = data.email || data.phone || data.city || data.country;
  const initials = `${data.first_name?.[0] || ''}${data.last_name?.[0] || ''}`.toUpperCase();

  return (
    <>
      <style>{`
        .dyn-tma4 {
          font-family: Arial, sans-serif;
          color: #231f20;
          line-height: 16px;
          font-size: 11px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 32px;
        }

        .dyn-tma4.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-tma4 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-tma4 ul {
          list-style-type: disc;
          margin: 0 0 0 10px;
          padding: 0;
        }

        .dyn-tma4.rtl ul {
          margin: 0 10px 0 0;
        }

        .dyn-tma4 ul li {
          margin: 0 0 0 8px;
          padding-left: 8px;
        }

        .dyn-tma4.rtl ul li {
          margin: 0 8px 0 0;
          padding-left: 0;
          padding-right: 8px;
        }

        .dyn-tma4 .paddedline {
          display: block;
        }

        .dyn-tma4 .datesWrapper {
          float: right;
          font-style: italic;
        }

        .dyn-tma4.rtl .datesWrapper {
          float: left;
        }

        .dyn-tma4 .txtBold {
          font-weight: bold;
        }

        /* Monogram */
        .dyn-tma4 .monogram {
          float: left;
          margin: 5px 0 0 70px;
          text-align: center;
        }

        .dyn-tma4.rtl .monogram {
          float: right;
          margin: 5px 70px 0 0;
        }

        .dyn-tma4 .monogram svg circle {
          stroke: ${colorHex};
        }

        /* Name Section */
        .dyn-tma4 .name {
          font-size: 34px;
          line-height: 44px;
          padding: 0;
          text-align: left;
          color: ${colorHex};
          position: relative;
          margin-left: 140px;
        }

        .dyn-tma4.rtl .name {
          text-align: right;
          margin-left: 0;
          margin-right: 140px;
        }

        .dyn-tma4 .resumeTitle {
          text-transform: uppercase;
          color: #4a4a4a;
          font-size: 15px;
          line-height: 25px;
          padding: 0 0 10px 0;
          margin-left: 140px;
        }

        .dyn-tma4.rtl .resumeTitle {
          margin-left: 0;
          margin-right: 140px;
        }

        .dyn-tma4 .address {
          position: relative;
          text-align: left;
          font-size: 11px;
          line-height: 16px;
          padding-bottom: 15px;
          margin-left: 140px;
        }

        .dyn-tma4.rtl .address {
          text-align: right;
          margin-left: 0;
          margin-right: 140px;
        }

        /* Timeline Section */
        .dyn-tma4 .section {
          clear: both;
          display: table;
          min-height: 50px;
          position: relative;
        }

        .dyn-tma4 .section::before {
          content: '';
          display: block;
          position: absolute;
          left: 140px;
          height: 100%;
          border-left: 1px solid #979797;
        }

        .dyn-tma4.rtl .section::before {
          left: auto;
          right: 140px;
          border-left: none;
          border-right: 1px solid #979797;
        }

        .dyn-tma4 .firstsection::before {
          border: none;
        }

        .dyn-tma4 .heading {
          clear: both;
          text-align: right;
          float: left;
          width: 140px;
          position: relative;
        }

        .dyn-tma4.rtl .heading {
          text-align: left;
          float: right;
        }

        .dyn-tma4 .heading::before {
          display: block;
          position: absolute;
          top: 3px;
          right: -6px;
          content: "";
          height: 9px;
          width: 9px;
          border: 1px solid #979797;
          border-radius: 100%;
          background: #fff;
          z-index: 10;
        }

        .dyn-tma4.rtl .heading::before {
          right: auto;
          left: -6px;
        }

        .dyn-tma4 .sectiontitle {
          font-weight: bold;
          padding: 0;
          text-transform: uppercase;
          color: ${colorHex};
          margin-right: 15px;
          font-size: 11px;
          line-height: 16px;
        }

        .dyn-tma4.rtl .sectiontitle {
          margin-right: 0;
          margin-left: 15px;
        }

        .dyn-tma4 .singlecolumn {
          border-left: 1px solid #979797;
          padding-left: 14px;
          margin-left: 140px;
          padding-top: 10px;
          padding-bottom: 10px;
          min-height: 16px;
        }

        .dyn-tma4.rtl .singlecolumn {
          border-left: none;
          border-right: 1px solid #979797;
          padding-left: 0;
          padding-right: 14px;
          margin-left: 0;
          margin-right: 140px;
        }

        .dyn-tma4 .paragraph {
          position: relative;
        }

        .dyn-tma4 .firstparagraph .singlecolumn {
          padding-top: 0;
        }

        .dyn-tma4 .jobtitle {
          color: ${colorHex};
          font-weight: bold;
          text-transform: uppercase;
        }

        .dyn-tma4 .degree {
          font-weight: bold;
        }

        /* Two Column Skills */
        .dyn-tma4 .twocol {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-tma4 .twocol td {
          width: 50%;
          display: table-cell;
          vertical-align: top;
        }

        /* Languages Flex Layout */
        .dyn-tma4 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          position: relative;
          border-left: 1px solid #979797;
          padding-left: 14px;
          margin-left: 140px;
          padding-bottom: 10px;
        }

        .dyn-tma4.rtl .lang-sec {
          border-left: none;
          border-right: 1px solid #979797;
          padding-left: 0;
          padding-right: 14px;
          margin-left: 0;
          margin-right: 140px;
        }

        .dyn-tma4 .lang-sec .heading {
          position: absolute;
          top: 0;
          left: -141px;
        }

        .dyn-tma4.rtl .lang-sec .heading {
          left: auto;
          right: -141px;
        }

        .dyn-tma4 .lang-sec .paragraph {
          width: 48%;
          vertical-align: top;
          padding-bottom: 5px;
        }

        .dyn-tma4 .lang-sec .paragraph .singlecolumn {
          margin-left: 0;
          border: none;
          padding: 0;
        }

        .dyn-tma4.rtl .lang-sec .paragraph .singlecolumn {
          margin-right: 0;
        }

        /* Rating Bar */
        .dyn-tma4 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
        }

        .dyn-tma4 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }
      `}</style>

      <div className={`dyn-tma4 ${rtl ? 'rtl' : ''}`}>
        {/* Name & Contact Section */}
        <div className="section firstsection">
          {initials && (
            <div className="monogram">
              <svg width="54px" height="54px">
                <circle cx="27px" cy="27px" r="26px" style={{ fill: '#fff', strokeWidth: 1 }} />
                <text textAnchor="middle" x="27px" y="36px" fill="#000000" fontSize="25px">{initials}</text>
              </svg>
            </div>
          )}
          {fullName && <div className="name">{fullName}</div>}
          {data.professional_title && (
            <div className="resumeTitle">{data.professional_title}</div>
          )}
          {hasContact && (
            <div className="address">
              {data.phone && <span>{data.phone}</span>}
              {data.phone && data.email && ' | '}
              {data.email && (
                <span>
                  <span className="txtBold">Email: </span>
                  {data.email}
                </span>
              )}
              <br />
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
                    {(exp.start_date || exp.end_date) && (
                      <span className="datesWrapper">
                        {exp.start_date && formatDate(exp.start_date, language)}
                        {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                        {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                      </span>
                    )}
                    {exp.job_title && <span className="jobtitle">{exp.job_title}</span>}
                  </span>
                  {(exp.company || exp.location) && (
                    <span className="paddedline txtBold">
                      {exp.company && <span className="companyname">{exp.company}</span>}
                      {exp.company && exp.location && ' | '}
                      {exp.location && <span className="joblocation">{exp.location}</span>}
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
                <div className="singlecolumn">
                  <span className="paddedline">
                    {edu.end_date && (
                      <span className="datesWrapper">{formatDate(edu.end_date, language)}</span>
                    )}
                    {edu.degree && <span className="degree">{edu.degree}</span>}
                    {edu.degree && edu.field_of_study && ' | '}
                    {edu.field_of_study && <span className="programline">{edu.field_of_study}</span>}
                  </span>
                  {edu.institution && (
                    <span className="paddedline txtBold">
                      <span className="companyname">{edu.institution}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages Section */}
        {data.languages && data.languages.length > 0 && (
          <div className="section">
            <div className="lang-sec">
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
                    <span className="paddedline">{formatDate(cert.issue_date, language)}</span>
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
