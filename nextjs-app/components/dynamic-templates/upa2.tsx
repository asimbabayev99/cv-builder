import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicUpa2({ data, translations, language = 'en', colorHex = '#C00000' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const hasContact = data.email || data.phone || data.city || data.country;

  return (
    <>
      <style>{`
        .dyn-upa2 {
          font-family: 'Century Gothic', sans-serif;
          color: #000;
          line-height: 14px;
          font-size: 11px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 25px;
        }

        .dyn-upa2.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-upa2 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-upa2 ul li {
          margin: 0 0 0 13px;
          list-style: disc;
        }

        .dyn-upa2.rtl ul li {
          margin: 0 13px 0 0;
        }

        .dyn-upa2 .paddedline {
          display: block;
        }

        .dyn-upa2 .datesWrapper {
          float: right;
        }

        .dyn-upa2.rtl .datesWrapper {
          float: left;
        }

        .dyn-upa2 .jobtitle,
        .dyn-upa2 .companyname,
        .dyn-upa2 .degree,
        .dyn-upa2 .txtBold {
          font-weight: bold;
        }

        /* Name Section */
        .dyn-upa2 .name {
          text-align: left;
          font-size: 29px;
          line-height: 35px;
          font-weight: bold;
          padding: 0;
          text-transform: uppercase;
        }

        .dyn-upa2.rtl .name {
          text-align: right;
        }

        .dyn-upa2 .name .lName {
          color: ${colorHex};
        }

        .dyn-upa2 .resumeTitle {
          text-align: left;
          color: #4a4a4a;
          font-size: 15px;
          line-height: 30px;
          padding: 0 0 6px 0;
        }

        .dyn-upa2.rtl .resumeTitle {
          text-align: right;
        }

        /* Address Bar */
        .dyn-upa2 .address {
          position: relative;
          text-align: left;
          font-size: 10px;
          line-height: 16px;
          margin-top: 3px;
          background-color: #000;
          padding: 4px 5px;
          color: #FFF;
        }

        .dyn-upa2.rtl .address {
          text-align: right;
        }

        /* Section Styling */
        .dyn-upa2 .section {
          margin-top: 4px;
        }

        .dyn-upa2 .firstsection {
          margin-top: 0 !important;
        }

        .dyn-upa2 .heading {
          clear: both;
          font-weight: normal;
          margin-bottom: 1px;
          border-bottom: 1px solid ${colorHex};
        }

        .dyn-upa2 .sectiontitle {
          font-size: 14px;
          line-height: 17px;
        }

        .dyn-upa2 .paragraph {
          position: relative;
          margin-top: 2px;
        }

        .dyn-upa2 .firstparagraph {
          margin-top: 0 !important;
        }

        .dyn-upa2 .singlecolumn {
          margin-left: 0;
        }

        /* Two Column Skills */
        .dyn-upa2 .twocol {
          width: 100%;
          border-collapse: collapse;
        }

        .dyn-upa2 .twocol td {
          width: 50%;
          vertical-align: top;
        }

        /* Languages Flex Layout */
        .dyn-upa2 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .dyn-upa2 .lang-sec .heading {
          width: 100%;
          flex-grow: 1;
        }

        .dyn-upa2 .lang-sec .paragraph {
          width: 48.6%;
          vertical-align: top;
          padding-bottom: 5px !important;
          margin-top: 0;
        }

        /* Rating Bar */
        .dyn-upa2 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
        }

        .dyn-upa2 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }
      `}</style>

      <div className={`dyn-upa2 ${rtl ? 'rtl' : ''}`}>
        {/* Name Section */}
        <div className="section firstsection">
          <div className="name">
            {data.first_name && <span>{data.first_name} </span>}
            {data.last_name && <span className="lName">{data.last_name}</span>}
          </div>
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
                    {(exp.start_date || exp.end_date) && (
                      <span className="datesWrapper">
                        {exp.start_date && formatDate(exp.start_date, language)}
                        {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                        {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                      </span>
                    )}
                  </span>
                  {(exp.company || exp.location) && (
                    <span className="paddedline">
                      {exp.company && <span className="companyname">{exp.company}</span>}
                      {exp.company && exp.location && ' - '}
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
                      <td className="twocol_1">
                        <ul>
                          {data.skills.slice(0, Math.ceil(data.skills.length / 2)).map((skill, index) => (
                            <li key={skill.id || index}>{skill.name}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="twocol_2">
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
                    {edu.degree && edu.field_of_study && ' : '}
                    {edu.field_of_study && <span className="programline">{edu.field_of_study}</span>}
                    {edu.end_date && (
                      <span className="datesWrapper">{formatDate(edu.end_date, language)}</span>
                    )}
                  </span>
                  {edu.institution && (
                    <span className="paddedline">
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
