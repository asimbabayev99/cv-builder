import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicSli1({ data, translations, language = 'en', colorHex = '#009bcc' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressParts = [data.city, data.country].filter(Boolean);
  const hasContact = data.email || data.phone || addressParts.length > 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Saira:300,400,500,600,700,900');

        .dyn-sli1 {
          font-family: Saira, sans-serif;
          color: #020303;
          line-height: 14px;
          font-size: 10px;
          min-height: 812px;
          word-wrap: break-word;
          padding-bottom: 30px;
        }

        .dyn-sli1.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-sli1 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-sli1 ul {
          list-style: none;
          margin: 0 0 0 8px;
          padding: 0;
        }

        .dyn-sli1.rtl ul {
          margin: 0 8px 0 0;
        }

        .dyn-sli1 ul li {
          position: relative;
          margin: 0;
        }

        .dyn-sli1 ul li::before {
          content: '\\2022';
          position: absolute;
          left: -8px;
          top: 0;
        }

        .dyn-sli1.rtl ul li::before {
          left: auto;
          right: -8px;
        }

        .dyn-sli1 .paddedline {
          display: block;
        }

        .dyn-sli1 .datesWrapper {
          float: right;
        }

        .dyn-sli1.rtl .datesWrapper {
          float: left;
        }

        .dyn-sli1 .jobtitle {
          font-weight: 600;
          text-transform: uppercase;
        }

        .dyn-sli1 .degree {
          font-weight: 500;
        }

        .dyn-sli1 .txtBold {
          font-weight: bold;
        }

        /* Name & Contact Section */
        .dyn-sli1 .SECTION_NAME,
        .dyn-sli1 .SECTION_CNTC {
          margin: 0;
          padding: 0 30px;
          background: ${colorHex};
          border: 1px solid ${colorHex};
        }

        .dyn-sli1 .SECTION_NAME {
          padding-top: 42px !important;
        }

        .dyn-sli1 .name {
          letter-spacing: 0.5px;
          font-size: 40px;
          line-height: 40px;
          font-weight: 700;
          padding: 0;
          text-transform: uppercase;
          text-align: center;
          color: #fff;
        }

        .dyn-sli1 .SECTION_CNTC {
          padding-top: 20px;
          text-align: center;
        }

        .dyn-sli1 .address {
          position: relative;
          text-align: center;
          font-size: 10px;
          line-height: 12px;
          margin: 0;
          color: #fff;
          padding-bottom: 5px;
        }

        .dyn-sli1 .address .fieldWrapper {
          position: relative;
          display: inline-block;
          padding-bottom: 5px;
        }

        .dyn-sli1 .address .fieldWrapper::before {
          content: "\\25A0";
          width: 5px;
          height: 5px;
          font-size: 10px;
          padding: 0 7px;
          color: ${colorHex};
          position: relative;
          top: -1px;
        }

        .dyn-sli1 .address .fieldWrapper:first-child::before {
          display: none;
        }

        /* Section Styling */
        .dyn-sli1 .section {
          clear: both;
          border-top: 2px solid ${colorHex};
          margin: 25px 30px 0;
          padding-top: 7px !important;
        }

        .dyn-sli1 .section:empty {
          display: none;
        }

        .dyn-sli1 .section::after {
          content: "";
          display: table;
          clear: both;
        }

        .dyn-sli1 .firstsection {
          border-top: none;
        }

        .dyn-sli1 .heading {
          clear: both;
          font-weight: 600;
          float: left;
          text-align: left;
          width: 125px;
          color: ${colorHex};
        }

        .dyn-sli1.rtl .heading {
          float: right;
          text-align: right;
        }

        .dyn-sli1 .sectiontitle {
          font-size: 12px;
          line-height: 14px;
          letter-spacing: 0.12px;
          text-transform: uppercase;
        }

        .dyn-sli1 .paragraph {
          position: relative;
          margin-left: 133px;
          margin-top: 10px;
        }

        .dyn-sli1.rtl .paragraph {
          margin-left: 0;
          margin-right: 133px;
        }

        .dyn-sli1 .firstparagraph {
          margin-top: 0 !important;
        }

        .dyn-sli1 .singlecolumn {
          margin-left: 0;
        }

        .dyn-sli1 .jobdates,
        .dyn-sli1 .companyname {
          font-weight: 600;
        }

        .dyn-sli1 .jobcity {
          font-weight: 500;
        }

        /* Two Column Skills */
        .dyn-sli1 .twocol {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-sli1 .twocol td {
          width: 50%;
          display: table-cell;
          vertical-align: top;
        }

        /* Languages/Skills Flex Layout */
        .dyn-sli1 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-left: 133px;
        }

        .dyn-sli1.rtl .lang-sec {
          padding-left: 0;
          padding-right: 133px;
        }

        .dyn-sli1 .lang-sec .heading {
          width: 100%;
          flex-grow: 1;
          margin-left: -133px;
        }

        .dyn-sli1.rtl .lang-sec .heading {
          margin-left: 0;
          margin-right: -133px;
        }

        .dyn-sli1 .lang-sec .paragraph {
          width: 48.2%;
          margin-left: 0;
          padding-bottom: 5px;
        }

        .dyn-sli1.rtl .lang-sec .paragraph {
          margin-right: 0;
        }

        /* Rating Bar */
        .dyn-sli1 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
        }

        .dyn-sli1 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }
      `}</style>

      <div className={`dyn-sli1 ${rtl ? 'rtl' : ''}`}>
        {/* Name Section */}
        {fullName && (
          <div className="SECTION_NAME">
            <div className="name">{fullName}</div>
          </div>
        )}

        {/* Contact Section */}
        {hasContact && (
          <div className="SECTION_CNTC">
            <div className="address">
              {addressParts.length > 0 && (
                <span className="fieldWrapper">{addressParts.join(', ')}</span>
              )}
              {data.phone && <span className="fieldWrapper">{data.phone}</span>}
              {data.email && <span className="fieldWrapper">{data.email}</span>}
            </div>
          </div>
        )}

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
                  {exp.job_title && (
                    <span className="paddedline">
                      <span className="jobtitle">{exp.job_title}</span>
                      {(exp.start_date || exp.end_date) && (
                        <>
                          {' '}
                          <span className="jobdates">{exp.start_date && formatDate(exp.start_date, language)}</span>
                          {exp.start_date && (exp.end_date || exp.currently_working) && ' to '}
                          <span className="jobdates">
                            {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                          </span>
                        </>
                      )}
                    </span>
                  )}
                  {(exp.company || exp.location) && (
                    <span className="paddedline">
                      {exp.company && <span className="companyname">{exp.company}</span>}
                      {exp.company && exp.location && ', '}
                      {exp.location && <span className="jobcity">{exp.location}</span>}
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
                  {(edu.degree || edu.field_of_study || edu.end_date) && (
                    <span className="paddedline">
                      {edu.degree && <span className="degree txtBold">{edu.degree}</span>}
                      {edu.degree && edu.field_of_study && ' : '}
                      {edu.field_of_study && <span className="programline">{edu.field_of_study}</span>}
                      {edu.end_date && (
                        <span className="jobdates">, {formatDate(edu.end_date, language)}</span>
                      )}
                    </span>
                  )}
                  {edu.institution && (
                    <span className="paddedline">
                      <span className="companyname txtBold">{edu.institution}</span>
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
