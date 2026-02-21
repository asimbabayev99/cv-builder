import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMta2({ data, translations, language = 'en', colorHex = '#000000' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasContact = data.email || data.phone || data.city || data.country;

  return (
    <>
      <style>{`
        .dyn-mta2 {
          font-family: 'Century Gothic', sans-serif;
          color: #666;
          line-height: 14px;
          font-size: 11px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 25px;
        }

        .dyn-mta2.rtl {
          direction: rtl;
          text-align: left;
        }

        .dyn-mta2 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mta2 ul {
          list-style-type: disc;
          margin: 0 0 0 10px;
          padding: 0;
        }

        .dyn-mta2 ul li {
          margin: 0 0 0 13px;
          color: #666;
        }

        .dyn-mta2.rtl ul {
          margin: 0 10px 0 0;
        }

        .dyn-mta2.rtl ul li {
          margin: 0 13px 0 0;
        }

        .dyn-mta2 .paddedline {
          display: block;
        }

        .dyn-mta2 .txtBold {
          font-weight: bold;
        }

        .dyn-mta2 .datesWrapper {
          float: right;
        }

        .dyn-mta2.rtl .datesWrapper {
          float: left;
        }

        /* Name Section */
        .dyn-mta2 .name {
          color: ${colorHex};
          font-size: 31px;
          line-height: 43px;
          font-weight: bold;
          text-transform: uppercase;
          text-align: right;
        }

        .dyn-mta2.rtl .name {
          text-align: left;
        }

        .dyn-mta2 .resumeTitle {
          color: #4a4a4a;
          font-size: 16px;
          line-height: 16px;
          padding: 0 0 10px 0;
          text-align: right;
        }

        .dyn-mta2.rtl .resumeTitle {
          text-align: left;
        }

        /* Address */
        .dyn-mta2 .address {
          font-size: 10px;
          line-height: 13px;
          text-align: right;
          margin-top: 5px;
        }

        .dyn-mta2.rtl .address {
          text-align: left;
        }

        /* Section Styling */
        .dyn-mta2 .section {
          margin-top: 4px;
        }

        .dyn-mta2 .firstsection {
          margin-top: 0;
        }

        .dyn-mta2 .heading {
          clear: both;
          font-weight: bold;
          text-transform: lowercase;
          color: #000;
          margin-bottom: 1px;
        }

        .dyn-mta2 .sectiontitle {
          font-size: 14px;
          line-height: 17px;
          color: ${colorHex};
        }

        .dyn-mta2 .paragraph {
          margin-top: 2px;
        }

        .dyn-mta2 .firstparagraph {
          margin-top: 0;
        }

        .dyn-mta2 .singlecolumn {
          margin-left: 0;
        }

        /* Job Title and Dates */
        .dyn-mta2 .jobtitle {
          font-weight: bold;
          color: ${colorHex};
        }

        .dyn-mta2 .jobdates {
          color: ${colorHex};
        }

        .dyn-mta2 .companyname {
          font-weight: normal;
        }

        /* Skills Two Column */
        .dyn-mta2 .skill {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-mta2 .skill td {
          width: 50%;
          vertical-align: top;
        }

        /* Languages */
        .dyn-mta2 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .dyn-mta2 .lang-sec .heading {
          width: 100%;
          flex-grow: 1;
        }

        .dyn-mta2 .lang-sec .paragraph {
          width: 48.5%;
          padding-bottom: 5px;
          margin-top: 0;
        }

        .dyn-mta2 .lang-sec .paragraph.nativeLangPara {
          width: 100%;
        }

        .dyn-mta2 .lang-sec .singlecolumn {
          margin-left: 0;
        }

        .dyn-mta2.rtl .lang-sec .singlecolumn {
          margin-right: 0;
        }

        .dyn-mta2 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
        }

        .dyn-mta2 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }

        /* Education */
        .dyn-mta2 .degree {
          font-weight: bold;
          color: ${colorHex};
        }

        .dyn-mta2 .programline {
          font-weight: bold;
        }

        .dyn-mta2 .disptable {
          display: table;
          width: 100%;
        }

        .dyn-mta2 .degreepad {
          display: table-cell;
          padding-right: 10px;
        }

        .dyn-mta2.rtl .degreepad {
          padding-right: 0;
          padding-left: 10px;
        }

        .dyn-mta2 .disptable .datesWrapper {
          text-align: right;
          min-width: 100px;
        }

        .dyn-mta2.rtl .disptable .datesWrapper {
          text-align: left;
        }
      `}</style>

      <div className={`dyn-mta2 ${rtl ? 'rtl' : ''}`}>
        {/* Profile Section */}
        <div className="section firstsection">
          {fullName && <div className="name">{fullName}</div>}
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
                  <span className="paddedline" style={{ display: 'inline' }}>
                    {exp.job_title && <span className="jobtitle">{exp.job_title}</span>}
                    {(exp.start_date || exp.end_date) && (
                      <span className="datesWrapper">
                        <span className="jobdates">
                          {exp.start_date && formatDate(exp.start_date, language)}
                          {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                          {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                        </span>
                      </span>
                    )}
                  </span>
                  <br />
                  {(exp.company || exp.location) && (
                    <span className="paddedline">
                      {exp.company && <span className="companyname">{exp.company}</span>}
                      {exp.location && (
                        <span className="datesWrapper">
                          <span>{exp.location}</span>
                        </span>
                      )}
                    </span>
                  )}
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
              <div className="singlecolumn maincolumn">
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
                  <span className="paddedline disptable">
                    <span className="degreepad">
                      {edu.degree && <span className="degree">{edu.degree}</span>}
                      {edu.degree && edu.field_of_study && ': '}
                      {edu.field_of_study && <span className="programline">{edu.field_of_study}</span>}
                    </span>
                    {edu.end_date && (
                      <span className="datesWrapper jobdates">
                        {formatDate(edu.end_date, language)}
                      </span>
                    )}
                  </span>
                  {edu.institution && (
                    <span className="paddedline disptable">
                      <span className="degreepad">
                        <span className="companyname">{edu.institution}</span>
                      </span>
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
