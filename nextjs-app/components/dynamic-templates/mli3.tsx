import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMli3({ data, translations, language = 'en', colorHex = '#009bcc' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressParts = [data.city, data.country].filter(Boolean);
  const hasContact = data.email || data.phone || addressParts.length > 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Syncopate:400');

        .dyn-mli3 {
          font-family: 'Times New Roman', Times, serif;
          color: #000;
          line-height: 13px;
          font-size: 10px;
          min-height: 792px;
          word-wrap: break-word;
        }

        .dyn-mli3.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mli3 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mli3 ul {
          list-style: none;
          margin: 0 0 0 8px;
          padding: 0;
        }

        .dyn-mli3.rtl ul {
          margin: 0 8px 0 0;
        }

        .dyn-mli3 ul li {
          position: relative;
          margin: 0;
          margin-bottom: 5px;
        }

        .dyn-mli3 ul li::before {
          content: '\\2022';
          position: absolute;
          left: -8px;
          top: 0;
        }

        .dyn-mli3.rtl ul li::before {
          left: auto;
          right: -8px;
        }

        .dyn-mli3 .txt-bold {
          font-weight: bold;
        }

        .dyn-mli3 .txt-italic {
          font-style: italic;
        }

        .dyn-mli3 .pb5 {
          padding-bottom: 5px;
        }

        /* Top Section - Name */
        .dyn-mli3 .topsection {
          position: relative;
          padding: 40px 50px 10px;
        }

        .dyn-mli3 .name {
          font-family: 'Syncopate', sans-serif;
          color: #000;
          font-weight: 400;
          padding: 0 0 12px 0;
          text-align: center;
          text-transform: uppercase;
          font-size: 24px;
          line-height: 28px;
        }

        .dyn-mli3 .resumeTitle {
          font-family: 'Syncopate', sans-serif;
          color: #000;
          font-weight: 400;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 14px;
          line-height: 14px;
        }

        /* Middle Section - Contact & Summary */
        .dyn-mli3 .middlesection {
          position: relative;
          display: table;
          table-layout: fixed;
          width: 100%;
        }

        .dyn-mli3 .middlesection .left-box,
        .dyn-mli3 .middlesection .right-box {
          position: relative;
          padding: 25px 0;
          display: table-cell;
          vertical-align: top;
        }

        .dyn-mli3 .middlesection .left-box {
          padding-right: 20px;
          padding-left: 50px;
          width: 169px;
        }

        .dyn-mli3 .middlesection .right-box {
          padding-left: 20px;
          padding-right: 50px;
        }

        .dyn-mli3.rtl .middlesection .left-box {
          padding-left: 20px;
          padding-right: 50px;
        }

        .dyn-mli3.rtl .middlesection .right-box {
          padding-right: 20px;
          padding-left: 50px;
        }

        .dyn-mli3 .middlesection .left-box::before,
        .dyn-mli3 .middlesection .right-box::before {
          background: ${colorHex};
          content: '';
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0.15;
        }

        .dyn-mli3 .middlesection .left-box::after,
        .dyn-mli3 .middlesection .right-box::after {
          content: '';
          height: 3px;
          background: #000;
          position: absolute;
          top: 0;
        }

        .dyn-mli3 .middlesection .left-box::after {
          left: 0;
          width: 100%;
          margin-left: 50px;
        }

        .dyn-mli3 .middlesection .right-box::after {
          right: 0;
          width: 100%;
          margin-right: 50px;
        }

        /* Parent Container - Skills & Content */
        .dyn-mli3 .parentContainer {
          position: relative;
          display: table;
          table-layout: fixed;
          width: 100%;
          min-height: 500px;
        }

        .dyn-mli3 .parentContainer .left-box,
        .dyn-mli3 .parentContainer .right-box {
          position: relative;
          padding: 25px 0;
          display: table-cell;
          vertical-align: top;
        }

        .dyn-mli3 .parentContainer .left-box {
          padding-right: 20px;
          padding-left: 50px;
          width: 169px;
        }

        .dyn-mli3 .parentContainer .right-box {
          padding-left: 20px;
          padding-right: 50px;
        }

        .dyn-mli3.rtl .parentContainer .left-box {
          padding-left: 20px;
          padding-right: 50px;
        }

        .dyn-mli3.rtl .parentContainer .right-box {
          padding-right: 20px;
          padding-left: 50px;
        }

        /* Section Styling */
        .dyn-mli3 .section {
          margin-bottom: 25px;
          position: relative;
        }

        .dyn-mli3 .heading {
          padding-bottom: 5px;
        }

        .dyn-mli3 .sectiontitle {
          font-family: 'Syncopate', sans-serif;
          text-transform: uppercase;
          color: #000;
          font-weight: 400;
          letter-spacing: 0.5px;
          font-size: 14px;
          line-height: 17px;
        }

        /* Paragraph Styling */
        .dyn-mli3 .paragraph {
          margin-top: 15px;
        }

        .dyn-mli3 .paragraph:first-child,
        .dyn-mli3 .firstparagraph {
          margin-top: 0;
        }

        /* Content */
        .dyn-mli3 .singlecolumn {
          color: #46464e;
        }

        /* Rating Bar */
        .dyn-mli3 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          height: 4px;
          margin-top: 3px;
        }

        .dyn-mli3 .inner-rating {
          background-color: ${colorHex};
          height: 100%;
        }

        /* Bottom Section */
        .dyn-mli3 .bottomsection {
          height: 40px;
          background: ${colorHex};
          opacity: 0.15;
        }
      `}</style>

      <div className={`dyn-mli3 ${rtl ? 'rtl' : ''}`}>
        {/* Top Section - Name */}
        {fullName && (
          <div className="topsection">
            <div className="name">{fullName}</div>
            {data.professional_title && (
              <div className="resumeTitle">{data.professional_title}</div>
            )}
          </div>
        )}

        {/* Middle Section - Contact & Summary */}
        {(hasContact || data.summary) && (
          <div className="middlesection">
            {/* Left - Contact */}
            {hasContact && (
              <div className="left-box">
                <div className="section">
                  <div className="heading">
                    <div className="sectiontitle">{translations.contact}</div>
                  </div>
                  <div className="paragraph firstparagraph">
                    {addressParts.length > 0 && (
                      <div className="pb5">
                        <span className="txt-bold">Address : </span>
                        <span>{addressParts.join(', ')}</span>
                      </div>
                    )}
                    {data.phone && (
                      <div className="pb5">
                        <span className="txt-bold">Phone : </span>
                        <span>{data.phone}</span>
                      </div>
                    )}
                    {data.email && (
                      <div className="pb5">
                        <span className="txt-bold">Email : </span>
                        <span>{data.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Right - Summary */}
            {data.summary && (
              <div className="right-box">
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
              </div>
            )}
          </div>
        )}

        {/* Parent Container - Skills & Main Content */}
        <div className="parentContainer">
          {/* Left - Skills & Languages */}
          <div className="left-box">
            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <div className="section">
                <div className="heading">
                  <div className="sectiontitle">{translations.skills}</div>
                </div>
                <div className="paragraph firstparagraph">
                  <div className="singlecolumn">
                    <ul>
                      {data.skills.map((skill, index) => (
                        <li key={skill.id || index}>{skill.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <div className="section">
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
          </div>

          {/* Right - Experience & Education */}
          <div className="right-box">
            {/* Work Experience */}
            {data.experiences && data.experiences.length > 0 && (
              <div className="section">
                <div className="heading">
                  <div className="sectiontitle">{translations.work_history}</div>
                </div>
                {data.experiences.map((exp, index) => (
                  <div key={exp.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="singlecolumn">
                      <span className="pb5" style={{ display: 'block' }}>
                        <span className="txt-bold">{exp.job_title}</span>
                        {exp.job_title && (exp.start_date || exp.end_date) && ', '}
                        {exp.start_date && formatDate(exp.start_date, language)}
                        {exp.start_date && (exp.end_date || exp.currently_working) && ' to '}
                        {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                      </span>
                      {(exp.company || exp.location) && (
                        <span className="pb5" style={{ display: 'block' }}>
                          <span className="txt-bold txt-italic">{exp.company}</span>
                          {exp.company && exp.location && ' - '}
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

            {/* Education */}
            {data.educations && data.educations.length > 0 && (
              <div className="section">
                <div className="heading">
                  <div className="sectiontitle">{translations.education}</div>
                </div>
                {data.educations.map((edu, index) => (
                  <div key={edu.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="singlecolumn">
                      <span className="pb5" style={{ display: 'block' }}>
                        <span className="txt-bold">{edu.degree}</span>
                        {edu.degree && edu.field_of_study && ' : '}
                        {edu.field_of_study}
                        {(edu.degree || edu.field_of_study) && edu.end_date && ', '}
                        {edu.end_date && formatDate(edu.end_date, language)}
                      </span>
                      {edu.institution && (
                        <span className="pb5" style={{ display: 'block' }}>
                          <span className="txt-bold txt-italic">{edu.institution}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Certificates */}
            {data.certificates && data.certificates.length > 0 && (
              <div className="section">
                <div className="heading">
                  <div className="sectiontitle">{translations.certificates}</div>
                </div>
                {data.certificates.map((cert, index) => (
                  <div key={cert.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="singlecolumn">
                      <div className="txt-bold">{cert.name}</div>
                      {cert.organization && <div className="txt-italic">{cert.organization}</div>}
                      {cert.issue_date && <div>{formatDate(cert.issue_date, language)}</div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bottomsection"></div>
      </div>
    </>
  );
}
