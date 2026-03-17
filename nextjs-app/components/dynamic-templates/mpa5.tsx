import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMpa5({ data, translations, language = 'en', colorHex = '#663399' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasContact = data.email || data.phone || data.city || data.country;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700');
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700');

        .dyn-mpa5 {
          font-family: 'Roboto', sans-serif;
          color: #000;
          line-height: 16px;
          font-size: 12px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 37px 62px;
        }

        .dyn-mpa5.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mpa5 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mpa5 ul {
          list-style-type: disc;
          margin: 0 0 0 10px;
          padding: 0;
        }

        .dyn-mpa5 ul li {
          margin: 0 0 0 13px;
        }

        .dyn-mpa5.rtl ul {
          margin: 0 10px 0 0;
        }

        .dyn-mpa5.rtl ul li {
          margin: 0 13px 0 0;
        }

        .dyn-mpa5 .paddedline {
          display: block;
        }

        .dyn-mpa5 .txtBold {
          font-weight: bold;
        }

        /* Name Section */
        .dyn-mpa5 .name {
          font-family: 'Roboto', sans-serif;
          color: ${colorHex};
          font-size: 30px;
          line-height: 38px;
          text-transform: uppercase;
          text-align: center;
          padding-top: 6px;
          border-top: 13px solid ${colorHex};
        }

        .dyn-mpa5 .resumeTitle {
          text-align: center;
          color: #4a4a4a;
          text-transform: lowercase;
          font-size: 16px;
          line-height: 28px;
          padding: 0 0 8px 0;
        }

        .dyn-mpa5 .resumeTitle::first-letter {
          text-transform: uppercase;
        }

        /* Address */
        .dyn-mpa5 .address {
          font-family: 'Roboto Condensed', sans-serif;
          font-size: 11px;
          line-height: 14px;
          text-align: center;
          text-transform: uppercase;
        }

        /* Section Styling */
        .dyn-mpa5 .section {
          margin-top: 10px;
        }

        .dyn-mpa5 .firstsection {
          margin-top: 0;
        }

        .dyn-mpa5 .heading {
          clear: both;
          color: #231F20;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .dyn-mpa5 .sectiontitle {
          font-family: 'Roboto Condensed', sans-serif;
          font-weight: bold;
          font-size: 14px;
          line-height: 20px;
        }

        .dyn-mpa5 .paragraph {
          margin-top: 6px;
        }

        .dyn-mpa5 .firstparagraph {
          margin-top: 0;
        }

        .dyn-mpa5 .singlecolumn {
          margin-left: 0;
        }

        /* Summary Section */
        .dyn-mpa5 .smryWrap {
          border-top: 2px dotted ${colorHex};
          border-bottom: 2px dotted ${colorHex};
          padding-top: 8px;
          padding-bottom: 8px;
        }

        .dyn-mpa5 .smryWrap .heading {
          display: none;
        }

        /* Skills Two Column */
        .dyn-mpa5 .skill {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-mpa5 .skill td {
          width: 50%;
          display: table-cell;
          vertical-align: top;
        }

        .dyn-mpa5 .skill td:last-child {
          border-left: 1px solid #FFF;
        }

        /* Experience */
        .dyn-mpa5 .septrSpace {
          margin: 0 4px;
        }

        .dyn-mpa5 .grayItl {
          font-style: italic;
          color: #666;
        }

        /* Languages */
        .dyn-mpa5 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .dyn-mpa5 .lang-sec .heading {
          width: 100%;
          flex-grow: 1;
        }

        .dyn-mpa5 .lang-sec .paragraph {
          width: 48.4%;
          padding-bottom: 5px;
          margin-top: 0;
        }

        .dyn-mpa5 .lang-sec .paragraph.nativeLangPara {
          width: 100%;
        }

        .dyn-mpa5 .lang-sec .singlecolumn {
          margin-left: 0;
        }

        .dyn-mpa5.rtl .lang-sec .singlecolumn {
          margin-right: 0;
        }

        .dyn-mpa5 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
        }

        .dyn-mpa5 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }
      `}</style>

      <div className={`dyn-mpa5 ${rtl ? 'rtl' : ''}`}>
        {/* Profile Section */}
        <div className="section firstsection">
          {fullName && <div className="name">{fullName}</div>}
          {data.professional_title && (
            <div className="resumeTitle">{data.professional_title}</div>
          )}
          {hasContact && (
            <div className="address">
              {data.city && <span>{data.city}</span>}
              {data.city && data.country && ', '}
              {data.country && <span>{data.country}</span>}
              {(data.city || data.country) && (data.phone || data.email) && ' | '}
              {data.phone && <span>{data.phone}</span>}
              {data.phone && data.email && ' | '}
              {data.email && <span>{data.email}</span>}
            </div>
          )}
        </div>

        {/* Summary Section */}
        {data.summary && (
          <div className="section smryWrap">
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
                  {exp.company && (
                    <span className="paddedline">
                      <span className="companyname">{exp.company}</span>
                    </span>
                  )}
                  <span className="paddedline grayItl">
                    {exp.job_title && <span className="jobtitle">{exp.job_title}</span>}
                    {exp.job_title && (exp.location || exp.start_date || exp.end_date) && (
                      <span className="septrSpace">{'/'}{'/'}</span>
                    )}
                    {exp.location && <span>{exp.location}</span>}
                    {exp.location && (exp.start_date || exp.end_date) && (
                      <span className="septrSpace">{'/'}{'/'}</span>
                    )}
                    {exp.start_date && formatDate(exp.start_date, language)}
                    {exp.start_date && (exp.end_date || exp.currently_working) && ' – '}
                    {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
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
                  <span className="paddedline">
                    {edu.degree && <span className="degree">{edu.degree}</span>}
                    {edu.degree && edu.field_of_study && ' - '}
                    {edu.field_of_study && <span>{edu.field_of_study}</span>}
                  </span>
                  <span className="paddedline">
                    {edu.institution && <span>{edu.institution}</span>}
                    {edu.institution && edu.end_date && (
                      <span className="septrSpace">{'/'}{'/'}</span>
                    )}
                    {edu.end_date && <span>{formatDate(edu.end_date, language)}</span>}
                  </span>
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
