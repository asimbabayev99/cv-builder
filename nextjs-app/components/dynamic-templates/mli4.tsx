import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMli4({ data, translations, language = 'en', colorHex = '#576d7b' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressParts = [data.city, data.country].filter(Boolean);
  const hasContact = data.email || data.phone || addressParts.length > 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Oswald:300,400,700');
        @import url('https://fonts.googleapis.com/css?family=PT+Sans:400,700');

        .dyn-mli4 {
          font-family: 'PT Sans', sans-serif;
          color: #46464e;
          line-height: 12px;
          font-size: 9px;
          min-height: 792px;
          word-wrap: break-word;
          position: relative;
        }

        .dyn-mli4.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mli4 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mli4::before {
          content: '';
          position: absolute;
          background: ${colorHex};
          opacity: 0.15;
          left: 0;
          top: 0;
          height: 100%;
          width: 232px;
        }

        .dyn-mli4.rtl::before {
          left: auto;
          right: 0;
        }

        .dyn-mli4 ul {
          list-style: none;
          margin: 0 0 0 8px;
          padding: 0;
        }

        .dyn-mli4.rtl ul {
          margin: 0 8px 0 0;
        }

        .dyn-mli4 ul li {
          position: relative;
          margin: 3px 0 0 0;
        }

        .dyn-mli4 ul li::before {
          content: '\\2022';
          position: absolute;
          left: -8px;
          top: 0;
        }

        .dyn-mli4.rtl ul li::before {
          left: auto;
          right: -8px;
        }

        .dyn-mli4 .txt-bold {
          font-weight: bold;
        }

        .dyn-mli4 .dispBlock {
          display: block;
        }

        .dyn-mli4 .pb5 {
          padding-bottom: 5px;
        }

        .dyn-mli4 .compfont {
          font-size: 10px;
          color: #000;
        }

        /* Top Section */
        .dyn-mli4 .topsection {
          background: ${colorHex};
          position: relative;
          z-index: 2;
        }

        .dyn-mli4 .top-box {
          display: block;
          width: 100%;
          position: relative;
          padding: 25px;
          border-bottom: 3px solid ${colorHex};
        }

        .dyn-mli4 .top-box::before {
          content: '';
          border-bottom: 3px solid #fff;
          height: 5px;
          width: 100%;
          position: absolute;
          left: 0;
          bottom: 0;
        }

        .dyn-mli4 .name {
          font-family: 'Oswald', sans-serif;
          color: #eef0f1;
          font-weight: 300;
          padding: 0 0 12px 0;
          text-align: center;
          text-transform: uppercase;
          font-size: 40px;
          line-height: 54px;
        }

        .dyn-mli4 .resumeTitle {
          color: #eef0f1;
          font-weight: bold;
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 18px;
          line-height: 20px;
        }

        /* Parent Container */
        .dyn-mli4 .parentContainer {
          display: table;
          table-layout: fixed;
          width: 100%;
        }

        .dyn-mli4 .left-box,
        .dyn-mli4 .right-box {
          box-sizing: border-box;
          position: relative;
          padding: 40px 30px 25px;
          display: table-cell;
          vertical-align: top;
        }

        .dyn-mli4 .left-box {
          width: 232px;
          background: #fff;
        }

        .dyn-mli4 .left-box::before {
          content: '';
          background: ${colorHex};
          opacity: 0.15;
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 100%;
        }

        .dyn-mli4 .right-box::before {
          content: '';
          background: ${colorHex};
          opacity: 0.15;
          position: absolute;
          left: 0;
          top: 0;
          height: 10px;
          width: 100%;
        }

        .dyn-mli4.rtl .left-box {
          width: auto;
        }

        .dyn-mli4.rtl .right-box {
          width: 232px;
        }

        /* Section Styling */
        .dyn-mli4 .section {
          position: relative;
          margin-bottom: 25px;
        }

        .dyn-mli4 .heading {
          padding-bottom: 5px;
        }

        .dyn-mli4 .sectiontitle {
          text-transform: uppercase;
          color: #000;
          font-weight: 700;
          letter-spacing: 0.5px;
          font-size: 14px;
          line-height: 17px;
        }

        /* Paragraph Styling */
        .dyn-mli4 .paragraph {
          margin-top: 12px;
          padding-left: 15px;
        }

        .dyn-mli4.rtl .paragraph {
          padding-left: 0;
          padding-right: 15px;
        }

        .dyn-mli4 .firstparagraph {
          margin-top: 0;
        }

        .dyn-mli4 .left-box .paragraph {
          padding-left: 0;
        }

        .dyn-mli4.rtl .left-box .paragraph {
          padding-right: 0;
        }

        /* Address Section */
        .dyn-mli4 .address {
          color: #000;
        }

        /* Rating Bar for Skills */
        .dyn-mli4 .rating-bar {
          background: #fff;
          width: 100%;
          clear: both;
          margin-top: 3px;
        }

        .dyn-mli4 .right-box .rating-bar {
          background: #d5d6d6;
        }

        .dyn-mli4 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }

        /* Sliced Rect Tiles for Languages */
        .dyn-mli4 .sliced-rect {
          height: 6px;
          width: 100%;
          line-height: 0;
          margin-top: 3px;
          clear: both;
          display: flex;
        }

        .dyn-mli4 .sliced-rect-tile {
          height: 100%;
          background-color: #fff;
          flex: 1;
          margin-right: 3px;
        }

        .dyn-mli4 .right-box .sliced-rect-tile {
          background-color: #d5d6d6;
        }

        .dyn-mli4 .sliced-rect-tile:last-child {
          margin-right: 0;
        }

        .dyn-mli4.rtl .sliced-rect-tile {
          margin-right: 0;
          margin-left: 3px;
        }

        .dyn-mli4.rtl .sliced-rect-tile:last-child {
          margin-left: 0;
        }

        .dyn-mli4 .sliced-rect-tile.filled {
          background-color: ${colorHex};
        }
      `}</style>

      <div className={`dyn-mli4 ${rtl ? 'rtl' : ''}`}>
        {/* Top Section - Name */}
        {fullName && (
          <div className="topsection">
            <div className="top-box">
              <div className="name">{fullName}</div>
              {data.professional_title && (
                <div className="resumeTitle">{data.professional_title}</div>
              )}
            </div>
          </div>
        )}

        {/* Parent Container - Two Columns */}
        <div className="parentContainer">
          {/* Left Column - Contact & Skills */}
          <div className="left-box">
            {/* Contact Section */}
            {hasContact && (
              <div className="section">
                <div className="heading">
                  <div className="sectiontitle">{translations.contact}</div>
                </div>
                <div className="paragraph firstparagraph">
                  <div className="address">
                    {addressParts.length > 0 && (
                      <div className="dispBlock pb5">
                        <span className="txt-bold">{translations.address || 'Address'} : </span>
                        <span>{addressParts.join(', ')}</span>
                      </div>
                    )}
                    {data.phone && (
                      <div className="dispBlock pb5">
                        <span className="txt-bold">{translations.phone || 'Phone'} : </span>
                        <span>{data.phone}</span>
                      </div>
                    )}
                    {data.email && (
                      <div className="dispBlock pb5">
                        <span className="txt-bold">{translations.email || 'Email'} : </span>
                        <span>{data.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Skills Section */}
            {data.skills && data.skills.length > 0 && (
              <div className="section">
                <div className="heading">
                  <div className="sectiontitle">{translations.skills}</div>
                </div>
                <div className="paragraph firstparagraph">
                  <ul>
                    {data.skills.map((skill, index) => (
                      <li key={skill.id || index}>{skill.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Languages Section */}
            {data.languages && data.languages.length > 0 && (
              <div className="section">
                <div className="heading">
                  <div className="sectiontitle">{translations.languages}</div>
                </div>
                {data.languages.map((lang, index) => (
                  <div key={lang.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div>{lang.name}</div>
                    {lang.level && (
                      <div className="sliced-rect">
                        {[1, 2, 3, 4, 5].map((tile) => (
                          <div
                            key={tile}
                            className={`sliced-rect-tile ${tile <= lang.level! ? 'filled' : ''}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Summary, Experience, Education */}
          <div className="right-box">
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
                    <span className="dispBlock compfont">
                      <span className="txt-bold">{exp.job_title}</span>
                      {exp.job_title && (exp.start_date || exp.end_date) && ', '}
                      {exp.start_date && formatDate(exp.start_date, language)}
                      {exp.start_date && (exp.end_date || exp.currently_working) && ' to '}
                      {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                    </span>
                    {(exp.company || exp.location) && (
                      <span className="dispBlock compfont">
                        <span className="txt-bold">{exp.company}</span>
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
                ))}
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
                    <span className="dispBlock compfont">
                      <span className="txt-bold">{edu.degree}</span>
                      {edu.degree && edu.field_of_study && ' : '}
                      {edu.field_of_study}
                      {(edu.degree || edu.field_of_study) && edu.end_date && ', '}
                      {edu.end_date && formatDate(edu.end_date, language)}
                    </span>
                    {edu.institution && (
                      <span className="dispBlock compfont">
                        <span className="txt-bold">{edu.institution}</span>
                      </span>
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
                    <div className="txt-bold compfont">{cert.name}</div>
                    {cert.organization && <div className="compfont">{cert.organization}</div>}
                    {cert.issue_date && <div className="compfont">{formatDate(cert.issue_date, language)}</div>}
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
