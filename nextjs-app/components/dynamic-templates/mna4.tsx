import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMna4({ data, translations, language = 'en', colorHex = '#4a4a4a' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasContact = data.email || data.phone || data.city || data.country;
  const initials = data.first_name && data.last_name
    ? `${data.first_name[0]}${data.last_name[0]}`.toUpperCase()
    : (data.first_name?.[0] || data.last_name?.[0] || '').toUpperCase();

  return (
    <>
      <style>{`
        .dyn-mna4 {
          font-family: 'Century Gothic', sans-serif;
          color: #494c4e;
          line-height: 14px;
          font-size: 11px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 25px;
        }

        .dyn-mna4.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mna4 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mna4 ul {
          list-style-type: disc;
          margin: 0 0 0 10px;
          padding: 0;
        }

        .dyn-mna4 ul li {
          margin: 0 0 0 15px;
          padding-left: 8px;
        }

        .dyn-mna4.rtl ul li {
          margin: 0 15px 0 0;
          padding-left: 0;
          padding-right: 8px;
        }

        .dyn-mna4 .paddedline {
          display: block;
          padding-bottom: 5px;
        }

        .dyn-mna4 .txtBold {
          font-weight: bold;
        }

        .dyn-mna4 .txtItl {
          font-style: italic;
        }

        .dyn-mna4 .sprtr {
          margin: 0 5px;
        }

        /* Monogram */
        .dyn-mna4 .monogram {
          float: left;
          margin-left: 30px;
          margin-top: 17px;
        }

        .dyn-mna4.rtl .monogram {
          float: right;
          margin-left: 0;
          margin-right: 30px;
        }

        .dyn-mna4 .monogram svg rect {
          stroke: ${colorHex};
        }

        .dyn-mna4 .monogram svg text {
          fill: ${colorHex};
        }

        /* Name */
        .dyn-mna4 .name {
          font-size: 42px;
          line-height: 48px;
          font-weight: bold;
          text-transform: uppercase;
          color: ${colorHex};
          margin-left: 140px;
          letter-spacing: 1px;
          top: 5px;
          position: relative;
        }

        .dyn-mna4.rtl .name {
          margin-left: 0;
          margin-right: 140px;
        }

        .dyn-mna4 .resumeTitle {
          color: ${colorHex};
          text-transform: lowercase;
          font-size: 15px;
          line-height: 15px;
          padding: 16px 0 0 0;
          margin-left: 140px;
        }

        .dyn-mna4.rtl .resumeTitle {
          margin-left: 0;
          margin-right: 140px;
        }

        .dyn-mna4 .resumeTitle::first-letter {
          text-transform: uppercase;
        }

        /* Address */
        .dyn-mna4 .address {
          color: ${colorHex};
          font-size: 11px;
          line-height: 17px;
          margin-left: 140px;
          margin-top: 14px;
        }

        .dyn-mna4.rtl .address {
          margin-left: 0;
          margin-right: 140px;
        }

        /* Section Styling */
        .dyn-mna4 .section {
          padding-top: 25px;
          clear: both;
        }

        .dyn-mna4 .section::after {
          content: '';
          display: block;
          clear: both;
        }

        .dyn-mna4 .firstsection {
          padding-top: 0;
        }

        .dyn-mna4 .heading {
          clear: both;
          font-weight: bold;
          text-align: right;
          float: left;
          width: 140px;
        }

        .dyn-mna4.rtl .heading {
          float: right;
          text-align: left;
        }

        .dyn-mna4 .sectiontitle {
          font-size: 11px;
          line-height: 14px;
          letter-spacing: 0.52px;
          text-transform: uppercase;
          margin-right: 30px;
          color: ${colorHex};
          word-wrap: break-word;
        }

        .dyn-mna4.rtl .sectiontitle {
          margin-right: 0;
          margin-left: 30px;
        }

        .dyn-mna4 .paragraph {
          margin-top: 15px;
        }

        .dyn-mna4 .firstparagraph {
          margin-top: 0;
        }

        .dyn-mna4 .singlecolumn {
          margin-left: 140px;
          min-height: 14px;
        }

        .dyn-mna4.rtl .singlecolumn {
          margin-left: 0;
          margin-right: 140px;
        }

        /* Dates Wrapper */
        .dyn-mna4 .datesWrapper {
          float: right;
          padding-left: 20px;
          text-transform: uppercase;
        }

        .dyn-mna4.rtl .datesWrapper {
          float: left;
          padding-left: 0;
          padding-right: 20px;
        }

        /* Skills Two Column */
        .dyn-mna4 .skill {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-mna4 .skill td {
          width: 50%;
          display: table-cell;
          vertical-align: top;
        }

        /* Languages */
        .dyn-mna4 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-left: 140px;
        }

        .dyn-mna4.rtl .lang-sec {
          padding-left: 0;
          padding-right: 140px;
        }

        .dyn-mna4 .lang-sec .heading {
          position: absolute;
          margin-left: -140px;
        }

        .dyn-mna4.rtl .lang-sec .heading {
          margin-left: 0;
          margin-right: -140px;
        }

        .dyn-mna4 .lang-sec .paragraph {
          width: 48.2%;
          padding-bottom: 5px;
          margin-top: 0;
        }

        .dyn-mna4 .lang-sec .paragraph.nativeLangPara {
          width: 100%;
        }

        .dyn-mna4 .lang-sec .singlecolumn {
          margin-left: 0;
        }

        .dyn-mna4.rtl .lang-sec .singlecolumn {
          margin-right: 0;
        }

        .dyn-mna4 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
        }

        .dyn-mna4 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }
      `}</style>

      <div className={`dyn-mna4 ${rtl ? 'rtl' : ''}`}>
        {/* Profile Section with Monogram */}
        <div className="section firstsection prfl-sec">
          {initials && (
            <div className="monogram">
              <svg width="78px" height="78px">
                <rect x="0px" y="0px" width="78px" height="78px" fill="none" strokeWidth="1px" />
                <text textAnchor="middle" x="39px" y="50px" fontSize="32px">{initials}</text>
              </svg>
            </div>
          )}
          {fullName && <div className="name">{fullName}</div>}
          {data.professional_title && (
            <div className="resumeTitle">{data.professional_title}</div>
          )}
          {hasContact && (
            <div className="address">
              {data.email && <span>{data.email}</span>}
              {data.email && data.phone && <span className="sprtr">|</span>}
              {data.phone && <span>{data.phone}</span>}
              {(data.city || data.country) && (
                <div>
                  {data.city && <span>{data.city}</span>}
                  {data.city && data.country && ', '}
                  {data.country && <span>{data.country}</span>}
                </div>
              )}
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
                  {(exp.start_date || exp.end_date) && (
                    <span className="datesWrapper">
                      {exp.start_date && formatDate(exp.start_date, language)}
                      {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                      {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                    </span>
                  )}
                  <span className="paddedline">
                    {exp.job_title && <span className="txtBold">{exp.job_title}</span>}
                    {exp.job_title && exp.company && <span className="sprtr">|</span>}
                    {exp.company && <span>{exp.company}</span>}
                    {exp.company && exp.location && ' - '}
                    {exp.location && <span>{exp.location}</span>}
                  </span>
                  {exp.description && (
                    <span className="jobline">
                      <ul>
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                        ))}
                      </ul>
                    </span>
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
                <table className="skill">
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
                  {edu.end_date && (
                    <span className="datesWrapper txtItl">{formatDate(edu.end_date, language)}</span>
                  )}
                  <span className="paddedline">
                    {edu.institution && <span>{edu.institution}</span>}
                    {edu.institution && edu.end_date && ', '}
                  </span>
                  {(edu.degree || edu.field_of_study) && (
                    <span className="paddedline">
                      {edu.degree && <span className="txtBold">{edu.degree}</span>}
                      {edu.degree && edu.field_of_study && ': '}
                      {edu.field_of_study && <span>{edu.field_of_study}</span>}
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
