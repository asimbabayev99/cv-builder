import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicPca1({ data, translations, language = 'en', colorHex = '#1A4771' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressParts = [data.city, data.country].filter(Boolean);
  const hasContact = data.email || data.phone || addressParts.length > 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&family=Roboto+Condensed:wght@700&display=swap');

        .dyn-pca1 {
          font-family: Roboto, sans-serif;
          color: #000;
          line-height: 13px;
          font-size: 11px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 0 25px 30px 25px;
        }

        .dyn-pca1.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-pca1 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-pca1 ul {
          list-style-type: disc;
          margin: 0 0 0 10px;
          padding: 0;
        }

        .dyn-pca1.rtl ul {
          margin: 0 10px 0 0;
        }

        .dyn-pca1 ul li {
          margin: 0 0 0 13px;
        }

        .dyn-pca1.rtl ul li {
          margin: 0 13px 0 0;
        }

        .dyn-pca1 .txtBold {
          font-weight: bold;
        }

        .dyn-pca1 .paddedline {
          display: block;
        }

        .dyn-pca1 .datesWrapper {
          float: right;
        }

        .dyn-pca1.rtl .datesWrapper {
          float: left;
        }

        /* Name Section */
        .dyn-pca1 .name {
          font-family: 'Roboto Condensed', sans-serif;
          font-size: 28px;
          line-height: 30px;
          font-weight: bold;
          letter-spacing: 0.58px;
          text-transform: uppercase;
          text-align: center;
          color: #fff;
          background-color: ${colorHex};
          padding: 30px 25px 10px 25px;
          margin: 0 -25px;
        }

        .dyn-pca1 .resumeTitle {
          font-weight: 900;
          background-color: ${colorHex};
          text-align: center;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 10px;
          line-height: 12px;
          padding-bottom: 10px;
          margin: -2px -25px 0 -25px;
        }

        /* Address with light background */
        .dyn-pca1 .lgtBg {
          position: relative;
          padding-bottom: 8px;
        }

        .dyn-pca1 .lgtBg::before {
          content: '';
          position: absolute;
          width: calc(100% + 50px);
          height: 100%;
          left: -25px;
          top: 0;
          opacity: 0.2;
          background-color: ${colorHex};
        }

        .dyn-pca1 .address {
          position: relative;
          text-align: center;
          font-size: 10px;
          line-height: 12px;
          color: ${colorHex};
          padding: 8px 5px 0 5px;
        }

        .dyn-pca1 .address .separator::before {
          content: '\\2022';
          vertical-align: bottom;
          padding: 0 3px;
          font-size: 13px;
        }

        .dyn-pca1 .thinbottomborder {
          border-bottom: 1px solid ${colorHex};
          position: relative;
        }

        .dyn-pca1 .lowerborder {
          margin-top: 2px;
          border-bottom: 2px solid ${colorHex};
        }

        /* Section Styling */
        .dyn-pca1 .section {
          margin-top: 6px;
          position: relative;
        }

        .dyn-pca1 .section:first-child,
        .dyn-pca1 .firstsection {
          margin-top: 0;
        }

        /* Heading */
        .dyn-pca1 .heading {
          clear: both;
          font-weight: bold;
          margin-bottom: 2px;
        }

        .dyn-pca1 .sectiontitle {
          font-size: 12px;
          line-height: 16px;
          text-transform: uppercase;
        }

        /* Paragraph */
        .dyn-pca1 .paragraph {
          margin-top: 4px;
          position: relative;
        }

        .dyn-pca1 .firstparagraph {
          margin-top: 0;
        }

        .dyn-pca1 .jobtitle,
        .dyn-pca1 .degree,
        .dyn-pca1 .companyname {
          font-weight: bold;
        }

        /* Two Column Skills */
        .dyn-pca1 .twocol {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-pca1 .twocol td {
          width: 50%;
          vertical-align: top;
          display: table-cell;
          padding-top: 2px;
        }

        /* Rating Bar */
        .dyn-pca1 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
        }

        .dyn-pca1 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }

        /* Languages flex layout */
        .dyn-pca1 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .dyn-pca1 .lang-sec .heading {
          width: 100%;
          flex-grow: 1;
        }

        .dyn-pca1 .lang-sec .paragraph {
          vertical-align: top;
          padding-bottom: 5px;
          margin-top: 0;
          width: 48.6%;
        }
      `}</style>

      <div className={`dyn-pca1 ${rtl ? 'rtl' : ''}`}>
        {/* Name & Contact Section */}
        <div className="name-contact">
          {fullName && <div className="name">{fullName}</div>}
          {data.professional_title && (
            <div className="resumeTitle">{data.professional_title}</div>
          )}
          {hasContact && (
            <div className="lgtBg">
              <div className="address">
                {addressParts.length > 0 && <span>{addressParts.join(', ')}</span>}
                {addressParts.length > 0 && (data.phone || data.email) && <span className="separator" />}
                {data.phone && <span>{data.phone}</span>}
                {data.phone && data.email && <span className="separator" />}
                {data.email && <span>{data.email}</span>}
              </div>
            </div>
          )}
          <div className="thinbottomborder" />
          <div className="lowerborder" />
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
                {exp.job_title && (
                  <span className="paddedline">
                    <span className="jobtitle">{exp.job_title}</span>
                  </span>
                )}
                <span className="paddedline">
                  {exp.company && <span className="companyname">{exp.company}</span>}
                  {exp.company && exp.location && ' - '}
                  {exp.location && <span>{exp.location}</span>}
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
                {(edu.degree || edu.field_of_study) && (
                  <span className="paddedline">
                    <span className="degree">{edu.degree}</span>
                    {edu.degree && edu.field_of_study && ' : '}
                    {edu.field_of_study}
                  </span>
                )}
                <span className="paddedline">
                  {edu.institution && <span className="companyname">{edu.institution}</span>}
                  {edu.end_date && (
                    <span className="datesWrapper">{formatDate(edu.end_date, language)}</span>
                  )}
                </span>
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
