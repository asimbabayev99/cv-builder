import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicLca1({ data, translations, language = 'en', colorHex = '#fcc74a' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressParts = [data.city, data.country].filter(Boolean);
  const hasContact = data.email || data.phone || addressParts.length > 0;

  return (
    <>
      <style>{`
        .dyn-lca1 {
          font-family: 'Century Gothic', sans-serif;
          color: #000;
          background-color: #fff;
          line-height: 17px;
          font-size: 12px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 37px;
        }

        .dyn-lca1.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-lca1 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-lca1 ul {
          list-style-type: disc;
          margin: 0 0 0 10px;
          padding: 0;
        }

        .dyn-lca1.rtl ul {
          margin: 0 10px 0 0;
        }

        .dyn-lca1 ul li {
          margin: 0 0 0 13px;
        }

        .dyn-lca1.rtl ul li {
          margin: 0 13px 0 0;
        }

        .dyn-lca1 .txtBold {
          font-weight: bold;
        }

        .dyn-lca1 .paddedline {
          display: block;
        }

        .dyn-lca1 .grayTxt {
          color: #787C85;
        }

        /* Name Section */
        .dyn-lca1 .name {
          font-size: 37px;
          line-height: 47px;
          font-weight: bold;
          padding: 0;
          text-transform: uppercase;
          text-align: left;
          color: #000;
        }

        .dyn-lca1.rtl .name {
          text-align: right;
        }

        .dyn-lca1 .resumeTitle {
          color: #4a4a4a;
          font-size: 16px;
          line-height: 21px;
          padding: 10px 0;
        }

        /* Address */
        .dyn-lca1 .address {
          position: relative;
          text-align: left;
          font-size: 12px;
          line-height: 22px;
          color: #787C85;
          text-transform: uppercase;
          padding-bottom: 10px;
          border-bottom: 5px solid ${colorHex};
        }

        .dyn-lca1.rtl .address {
          text-align: right;
        }

        /* Section Styling */
        .dyn-lca1 .section {
          padding-top: 15px;
          position: relative;
          clear: both;
        }

        .dyn-lca1 .section::after {
          content: '';
          display: block;
          height: 0;
          clear: both;
        }

        .dyn-lca1 .section:first-child,
        .dyn-lca1 .firstsection {
          padding-top: 0;
        }

        /* Heading */
        .dyn-lca1 .heading {
          float: left;
          width: 140px;
          clear: both;
          font-weight: bold;
        }

        .dyn-lca1.rtl .heading {
          float: right;
        }

        .dyn-lca1 .sectiontitle {
          font-size: 12px;
          line-height: 12px;
          text-transform: uppercase;
        }

        /* Paragraph */
        .dyn-lca1 .paragraph {
          margin-top: 10px;
          position: relative;
        }

        .dyn-lca1 .firstparagraph {
          margin-top: 0;
        }

        .dyn-lca1 .singlecolumn {
          margin-left: 140px;
        }

        .dyn-lca1.rtl .singlecolumn {
          margin-left: 0;
          margin-right: 140px;
        }

        .dyn-lca1 .jobtitle,
        .dyn-lca1 .degree {
          font-weight: bold;
        }

        /* Two Column Skills */
        .dyn-lca1 .twocol {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-lca1 .twocol td {
          width: 50%;
          vertical-align: top;
          display: table-cell;
          padding-top: 5px;
        }

        /* Rating Bar */
        .dyn-lca1 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
        }

        .dyn-lca1 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }

        /* Languages flex layout */
        .dyn-lca1 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-left: 140px;
          position: relative;
        }

        .dyn-lca1.rtl .lang-sec {
          padding-left: 0;
          padding-right: 140px;
        }

        .dyn-lca1 .lang-sec .heading {
          position: absolute;
          left: 0;
          margin-left: -140px;
        }

        .dyn-lca1.rtl .lang-sec .heading {
          left: auto;
          right: 0;
          margin-left: 0;
          margin-right: -140px;
        }

        .dyn-lca1 .lang-sec .paragraph {
          vertical-align: top;
          padding-bottom: 5px;
          margin-top: 0;
          width: 47.7%;
        }

        .dyn-lca1 .lang-sec .singlecolumn {
          margin-left: 0;
        }

        .dyn-lca1.rtl .lang-sec .singlecolumn {
          margin-right: 0;
        }
      `}</style>

      <div className={`dyn-lca1 ${rtl ? 'rtl' : ''}`}>
        {/* Name & Contact Section */}
        <div className="name-contact section firstsection">
          {fullName && <div className="name">{fullName}</div>}
          {data.professional_title && (
            <div className="resumeTitle">{data.professional_title}</div>
          )}
          {hasContact && (
            <div className="address">
              {addressParts.length > 0 && <span>{addressParts.join(', ')}</span>}
              {addressParts.length > 0 && (data.phone || data.email) && ' '}
              {data.phone && <span>{data.phone}</span>}
              {data.phone && data.email && ' '}
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
                  {(exp.start_date || exp.end_date) && (
                    <span className="paddedline grayTxt">
                      {exp.start_date && formatDate(exp.start_date, language)}
                      {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                      {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                    </span>
                  )}
                  {exp.job_title && (
                    <span className="paddedline">
                      <span className="jobtitle">{exp.job_title}</span>
                      {(exp.company || exp.location) && ' | '}
                      {exp.company}
                      {exp.company && exp.location && ' | '}
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
                <div className="singlecolumn">
                  {edu.end_date && (
                    <span className="paddedline grayTxt">{formatDate(edu.end_date, language)}</span>
                  )}
                  {(edu.degree || edu.field_of_study) && (
                    <span className="paddedline">
                      <span className="degree">{edu.degree}</span>
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
                    <span className="paddedline grayTxt">{formatDate(cert.issue_date, language)}</span>
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
