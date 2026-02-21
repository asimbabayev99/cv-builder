import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMlf1({ data, translations, language = 'en', colorHex = '#576d7b' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasContact = data.email || data.phone || data.city || data.country;

  return (
    <>
      <style>{`
        .dyn-mlf1 {
          font-family: 'Century Gothic', sans-serif;
          color: #020303;
          line-height: 14px;
          font-size: 10px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 0 30px;
        }

        .dyn-mlf1.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mlf1 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mlf1 ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .dyn-mlf1 ul li {
          position: relative;
          margin: 0;
          padding-left: 10px;
        }

        .dyn-mlf1.rtl ul li {
          padding-left: 0;
          padding-right: 10px;
        }

        .dyn-mlf1 ul li::before {
          content: '\\2022';
          font-size: 9px;
          position: absolute;
          left: 0;
          top: 0;
        }

        .dyn-mlf1.rtl ul li::before {
          left: auto;
          right: 0;
        }

        .dyn-mlf1 .txtBold {
          font-weight: bold;
        }

        .dyn-mlf1 .txtItl {
          font-style: italic;
        }

        .dyn-mlf1 .dispBlock {
          display: block;
        }

        /* Top Section */
        .dyn-mlf1 .topsection {
          display: table;
          width: 100%;
          table-layout: fixed;
          border-top: 25px solid ${colorHex};
          min-height: 150px;
        }

        .dyn-mlf1 .left-box {
          display: table-cell;
          width: 137px;
          vertical-align: top;
        }

        .dyn-mlf1 .right-box {
          display: table-cell;
          vertical-align: top;
        }

        /* Photo Section */
        .dyn-mlf1 .photo-section {
          width: 100px;
          height: 100px;
          margin-top: 20px;
        }

        .dyn-mlf1 .photo-section img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 1px solid #373737;
        }

        /* Name Section */
        .dyn-mlf1 .name-section {
          padding-top: 16px;
        }

        .dyn-mlf1 .name {
          color: ${colorHex};
          font-weight: bold;
          font-size: 26px;
          line-height: 34px;
          padding: 5px 0 4px 0;
          text-transform: uppercase;
        }

        .dyn-mlf1 .name::before {
          content: '';
          display: inline-block;
          width: 0;
          height: 0;
          border-left: 18px solid ${colorHex};
          border-bottom: 18px solid transparent;
          vertical-align: top;
          margin-right: 5px;
        }

        .dyn-mlf1.rtl .name::before {
          border-left: none;
          border-right: 18px solid ${colorHex};
          margin-right: 0;
          margin-left: 5px;
        }

        .dyn-mlf1 .resumeTitle {
          color: #0e0e0e;
          text-transform: uppercase;
          letter-spacing: 0.86px;
          font-size: 12px;
          line-height: 20px;
        }

        /* Contact with Icons */
        .dyn-mlf1 .contact-section {
          display: table;
          width: 100%;
          margin-top: 10px;
        }

        .dyn-mlf1 .iconRow {
          clear: both;
          margin-bottom: 8px;
          display: table;
          table-layout: fixed;
          width: 100%;
          line-height: 12px;
        }

        .dyn-mlf1 .iconSvg {
          width: 10px;
          display: table-cell;
          vertical-align: middle;
        }

        .dyn-mlf1 .iconSvg .square {
          height: 10px;
          width: 10px;
          background-color: ${colorHex};
        }

        .dyn-mlf1 .icoTxt {
          padding-left: 6px;
          vertical-align: middle;
          display: table-cell;
        }

        .dyn-mlf1.rtl .icoTxt {
          padding-left: 0;
          padding-right: 6px;
        }

        /* Parent Container */
        .dyn-mlf1 .parentContainer {
          clear: both;
          width: 100%;
          display: table;
          table-layout: fixed;
        }

        .dyn-mlf1 .parentContainer .container {
          display: table-cell;
          padding-top: 25px;
          padding-bottom: 25px;
        }

        /* Section Styling */
        .dyn-mlf1 .section {
          margin-top: 25px;
          border-top: 1px solid ${colorHex};
          padding-top: 4px;
          position: relative;
          width: 100%;
        }

        .dyn-mlf1 .section:first-child {
          margin-top: 0;
        }

        .dyn-mlf1 .heading {
          float: left;
          width: 120px;
          position: relative;
        }

        .dyn-mlf1.rtl .heading {
          float: right;
        }

        .dyn-mlf1 .heading::before {
          content: '';
          position: absolute;
          left: 0;
          top: -8px;
          width: 120px;
          border-top: 3px solid ${colorHex};
          background: ${colorHex};
        }

        .dyn-mlf1.rtl .heading::before {
          left: auto;
          right: 0;
        }

        .dyn-mlf1 .sectiontitle {
          color: #000;
          letter-spacing: 0.1px;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 10px;
          line-height: 12px;
        }

        .dyn-mlf1 .singlecolumn {
          margin-left: 137px;
        }

        .dyn-mlf1.rtl .singlecolumn {
          margin-left: 0;
          margin-right: 137px;
        }

        .dyn-mlf1 .paragraph {
          margin-top: 20px;
        }

        .dyn-mlf1 .paragraph.firstparagraph {
          margin-top: 0;
        }

        .dyn-mlf1 .paragraph:not(.firstparagraph) .singlecolumn {
          padding-top: 3px;
          border-top: 1px dashed #000;
        }

        .dyn-mlf1 .jobtitle {
          text-transform: uppercase;
        }

        /* Two Column Skills */
        .dyn-mlf1 .twocol {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-mlf1 .twocol td {
          width: 50%;
          display: table-cell;
          vertical-align: top;
        }

        /* Languages Flex Layout */
        .dyn-mlf1 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-left: 137px;
        }

        .dyn-mlf1.rtl .lang-sec {
          padding-left: 0;
          padding-right: 137px;
        }

        .dyn-mlf1 .lang-sec .heading {
          margin-left: -137px;
          width: 100%;
        }

        .dyn-mlf1.rtl .lang-sec .heading {
          margin-left: 0;
          margin-right: -137px;
        }

        .dyn-mlf1 .lang-sec .paragraph {
          width: 48.2%;
          vertical-align: top;
          padding-bottom: 5px;
          margin-top: 0;
        }

        .dyn-mlf1 .lang-sec .paragraph .singlecolumn {
          margin-left: 0;
          padding: 0;
          border: none !important;
        }

        .dyn-mlf1.rtl .lang-sec .paragraph .singlecolumn {
          margin-right: 0;
        }

        /* Rating Bar */
        .dyn-mlf1 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
        }

        .dyn-mlf1 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }

        /* Section Clear */
        .dyn-mlf1 .section::after {
          content: '';
          display: table;
          clear: both;
        }
      `}</style>

      <div className={`dyn-mlf1 ${rtl ? 'rtl' : ''}`}>
        {/* Top Section */}
        <div className="topsection">
          <div className="left-box">
            {data.photo_url && (
              <div className="photo-section">
                <img src={data.photo_url} alt="Profile" />
              </div>
            )}
          </div>
          <div className="right-box">
            <div className="name-section">
              {fullName && <div className="name">{fullName}</div>}
              {data.professional_title && (
                <div className="resumeTitle">{data.professional_title}</div>
              )}
            </div>
            {hasContact && (
              <div className="contact-section">
                {(data.city || data.country) && (
                  <div className="iconRow">
                    <div className="iconSvg"><div className="square" /></div>
                    <div className="icoTxt">
                      {data.city && <span>{data.city}</span>}
                      {data.city && data.country && ', '}
                      {data.country && <span>{data.country}</span>}
                    </div>
                  </div>
                )}
                {data.phone && (
                  <div className="iconRow">
                    <div className="iconSvg"><div className="square" /></div>
                    <div className="icoTxt">{data.phone}</div>
                  </div>
                )}
                {data.email && (
                  <div className="iconRow">
                    <div className="iconSvg"><div className="square" /></div>
                    <div className="icoTxt">{data.email}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="parentContainer">
          <div className="container">
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
                      <span className="dispBlock">
                        {exp.job_title && <span className="jobtitle txtBold">{exp.job_title}</span>}
                        {exp.job_title && (exp.start_date || exp.end_date) && ', '}
                        {exp.start_date && formatDate(exp.start_date, language)}
                        {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                        {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                      </span>
                      {(exp.company || exp.location) && (
                        <span className="dispBlock">
                          {exp.company && <span className="txtBold txtItl">{exp.company}</span>}
                          {exp.company && exp.location && ', '}
                          {exp.location && <span>{exp.location}</span>}
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
                      <div className="txtItl">
                        {edu.institution && <span className="txtBold">{edu.institution}</span>}
                        {edu.institution && edu.end_date && ', '}
                        {edu.end_date && formatDate(edu.end_date, language)}
                      </div>
                      {(edu.degree || edu.field_of_study) && (
                        <div style={{ marginTop: '3px' }}>
                          {edu.degree && <span className="txtBold">{edu.degree}</span>}
                          {edu.degree && edu.field_of_study && ' : '}
                          {edu.field_of_study && <span className="txtBold">{edu.field_of_study}</span>}
                        </div>
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
                      <span className="dispBlock txtBold">{cert.name}</span>
                      {cert.organization && <span className="dispBlock">{cert.organization}</span>}
                      {cert.issue_date && (
                        <span className="dispBlock">{formatDate(cert.issue_date, language)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
