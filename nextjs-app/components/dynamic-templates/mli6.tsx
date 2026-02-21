import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMli6({ data, translations, language = 'en', colorHex = '#0187de' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressParts = [data.city, data.country].filter(Boolean);
  const hasContact = data.email || data.phone || addressParts.length > 0;

  return (
    <>
      <style>{`
        .dyn-mli6 {
          font-family: 'Century Gothic', sans-serif;
          color: #020303;
          line-height: 14px;
          font-size: 10px;
          min-height: 792px;
          position: relative;
          padding: 25px;
        }

        .dyn-mli6.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mli6 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mli6::before {
          content: '';
          box-sizing: content-box;
          border: 20px solid ${colorHex};
          height: calc(100% - 40px);
          width: calc(100% - 40px);
          position: absolute;
          left: 0;
          top: 0;
          pointer-events: none;
        }

        .dyn-mli6 ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .dyn-mli6 ul li {
          position: relative;
          margin: 0 0 0 10px;
          padding-left: 10px;
        }

        .dyn-mli6.rtl ul li {
          margin: 0 10px 0 0;
          padding-left: 0;
          padding-right: 10px;
        }

        .dyn-mli6 ul li::before {
          content: '\\2022';
          font-size: 9px;
          position: absolute;
          left: 0;
          top: 0;
        }

        .dyn-mli6.rtl ul li::before {
          left: auto;
          right: 0;
        }

        .dyn-mli6 .txtBold {
          font-weight: bold;
        }

        .dyn-mli6 .dispBlock {
          display: block;
        }

        /* Top Section */
        .dyn-mli6 .topsection {
          width: 100%;
          position: relative;
          display: table;
          table-layout: fixed;
          margin-top: 20px;
        }

        .dyn-mli6 .topsection .left-box {
          display: table-cell;
          padding-left: 20px;
          padding-right: 16px;
          vertical-align: top;
          width: 81.6%;
        }

        .dyn-mli6.rtl .topsection .left-box {
          padding-left: 16px;
          padding-right: 20px;
        }

        .dyn-mli6 .topsection .right-box {
          display: table-cell;
          width: 81px;
          padding-right: 20px;
          vertical-align: top;
        }

        .dyn-mli6.rtl .topsection .right-box {
          padding-right: 0;
          padding-left: 20px;
        }

        /* Name */
        .dyn-mli6 .name {
          color: #000;
          font-weight: bold;
          padding: 0 0 9px 0;
          text-align: left;
          position: relative;
          word-wrap: break-word;
          text-transform: capitalize;
          font-size: 28px;
          line-height: 28px;
        }

        .dyn-mli6.rtl .name {
          text-align: right;
        }

        .dyn-mli6 .resumeTitle {
          color: ${colorHex};
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 12px;
          line-height: 14px;
        }

        .dyn-mli6 .summary {
          margin-top: 10px;
        }

        /* Photo */
        .dyn-mli6 .pictPic {
          width: 93px;
          height: 103px;
        }

        .dyn-mli6 .pictPic img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          border: 1px solid ${colorHex};
        }

        /* Contact Section */
        .dyn-mli6 .sectionadrs {
          clear: both;
          box-sizing: content-box;
          color: #fff;
          margin: 20px -25px 25px 0;
          float: right;
          background: ${colorHex};
          position: relative;
          width: calc(100% - 40px);
          padding-right: 45px;
        }

        .dyn-mli6.rtl .sectionadrs {
          margin: 20px 0 25px -25px;
          float: left;
          padding-right: 0;
          padding-left: 45px;
        }

        .dyn-mli6 .address {
          display: table;
          table-layout: fixed;
          width: 100%;
          padding: 10px;
        }

        .dyn-mli6 .col-left {
          display: table-cell;
          padding-right: 25px;
          width: 64.8%;
          vertical-align: top;
        }

        .dyn-mli6.rtl .col-left {
          padding-right: 0;
          padding-left: 25px;
        }

        .dyn-mli6 .col-right {
          display: table-cell;
          vertical-align: top;
          width: 201px;
          box-sizing: border-box;
          padding-left: 20px;
        }

        .dyn-mli6.rtl .col-right {
          padding-left: 0;
          padding-right: 20px;
        }

        /* Icon Row */
        .dyn-mli6 .iconRow {
          clear: both;
          padding-bottom: 5px;
          word-wrap: break-word;
        }

        .dyn-mli6 .iconRow:last-child {
          padding-bottom: 0;
        }

        .dyn-mli6 .iconRow .icon-svg {
          width: 11px;
          height: 11px;
          float: left;
          display: inline-flex;
          vertical-align: middle;
          margin-top: 2px;
        }

        .dyn-mli6.rtl .iconRow .icon-svg {
          float: right;
        }

        .dyn-mli6 .iconRow .icon-svg svg {
          fill: #fff;
        }

        .dyn-mli6 .iconRow .rgtspc {
          margin-left: 18px;
        }

        .dyn-mli6.rtl .iconRow .rgtspc {
          margin-left: 0;
          margin-right: 18px;
        }

        /* Parent Container */
        .dyn-mli6 .parentContainer {
          display: table;
          table-layout: fixed;
          width: 100%;
          margin-bottom: 20px;
        }

        .dyn-mli6 .parentContainer .left-box {
          letter-spacing: 0.2px;
          display: table-cell;
          padding-left: 20px;
          vertical-align: top;
          width: 75%;
        }

        .dyn-mli6.rtl .parentContainer .left-box {
          padding-left: 0;
          padding-right: 20px;
        }

        .dyn-mli6 .parentContainer .right-box {
          position: relative;
          display: table-cell;
          vertical-align: top;
          padding-right: 20px;
          width: 201px;
          border-left: 1px solid ${colorHex};
          word-break: break-word;
          box-sizing: content-box;
        }

        .dyn-mli6.rtl .parentContainer .right-box {
          border-left: none;
          border-right: 1px solid ${colorHex};
          padding-right: 0;
          padding-left: 20px;
        }

        .dyn-mli6 .parentContainer .left-box .section {
          padding-right: 25px;
          position: relative;
        }

        .dyn-mli6.rtl .parentContainer .left-box .section {
          padding-right: 0;
          padding-left: 25px;
        }

        .dyn-mli6 .parentContainer .right-box .section {
          padding-left: 20px;
        }

        .dyn-mli6.rtl .parentContainer .right-box .section {
          padding-left: 0;
          padding-right: 20px;
        }

        /* Section */
        .dyn-mli6 .section {
          padding-top: 25px;
        }

        .dyn-mli6 .section:first-child {
          padding-top: 0;
        }

        /* Heading */
        .dyn-mli6 .heading {
          margin-bottom: 5px;
          position: relative;
        }

        .dyn-mli6 .sectiontitle {
          text-transform: uppercase;
          color: #000;
          font-weight: bold;
          letter-spacing: 1.56px;
          font-size: 14px;
          line-height: 16px;
        }

        .dyn-mli6 .right-box .heading::before {
          content: '';
          border: 4px solid ${colorHex};
          position: absolute;
          left: -24.5px;
          top: 4px;
          z-index: 1;
        }

        .dyn-mli6.rtl .right-box .heading::before {
          left: auto;
          right: -24.5px;
        }

        /* Paragraph */
        .dyn-mli6 .paragraph {
          margin-top: 20px;
        }

        .dyn-mli6 .firstparagraph {
          margin-top: 0;
        }

        .dyn-mli6 .jobline ul {
          margin-top: 8px;
        }

        /* Rating Bar */
        .dyn-mli6 .ratingBar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
        }

        .dyn-mli6 .innerRating {
          background-color: ${colorHex};
          height: 4px;
        }
      `}</style>

      <div className={`dyn-mli6 ${rtl ? 'rtl' : ''}`}>
        {/* Top Section - Name, Summary, Photo */}
        <div className="topsection">
          <div className="left-box">
            {/* Name */}
            {fullName && (
              <div className="section">
                <div className="paragraph firstparagraph">
                  <div className="name">{fullName}</div>
                  {data.professional_title && (
                    <div className="resumeTitle">{data.professional_title}</div>
                  )}
                </div>
              </div>
            )}

            {/* Summary */}
            {data.summary && (
              <div className="section summary">
                <div className="paragraph firstparagraph">
                  <p>{data.summary}</p>
                </div>
              </div>
            )}
          </div>

          {/* Photo */}
          {data.photo_url && (
            <div className="right-box">
              <div className="section">
                <div className="paragraph firstparagraph">
                  <div className="pictPic">
                    <img src={data.photo_url} alt="Profile" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Contact Section Bar */}
        {hasContact && (
          <div className="sectionadrs">
            <div className="address">
              <div className="col-left">
                {/* Email */}
                {data.email && (
                  <div className="iconRow">
                    <div className="icon-svg">
                      <svg width="10px" height="10px" viewBox="0 0 12 12">
                        <path fill="#fff" d="M4.375 11.125a.376.376 0 0 0 .68.222l1.363-1.846-2.043-.695zM11.452.043L.202 5.918a.375.375 0 0 0 .052.687L3.38 7.674l6.661-5.695-5.155 6.21L10.13 9.98a.377.377 0 0 0 .492-.3L11.996.43a.376.376 0 0 0-.544-.387z" />
                      </svg>
                    </div>
                    <div className="rgtspc">{data.email}</div>
                  </div>
                )}

                {/* Phone */}
                {data.phone && (
                  <div className="iconRow">
                    <div className="icon-svg">
                      <svg width="10px" height="10px" viewBox="0 0 12 12">
                        <path fill="#fff" d="M6.4 3.2a.4.4 0 1 0 0 .8C7.282 4 8 4.718 8 5.6a.4.4 0 0 0 .8 0c0-1.323-1.077-2.4-2.4-2.4m0-1.6a.4.4 0 1 0 0 .8c1.765 0 3.2 1.436 3.2 3.2a.4.4 0 1 0 .8 0c0-2.205-1.795-4-4-4m0-1.6a.4.4 0 1 0 0 .8c2.647 0 4.8 2.153 4.8 4.8a.4.4 0 1 0 .8 0C12 2.512 9.487 0 6.4 0m4.4 8.8a7.422 7.422 0 0 1-3.288-.751.395.395 0 0 0-.307-.019.406.406 0 0 0-.23.205l-.628 1.301a10.062 10.062 0 0 1-3.882-3.882l1.301-.63a.4.4 0 0 0 .185-.536A7.429 7.429 0 0 1 3.2 1.2a.4.4 0 0 0-.4-.4H.4a.4.4 0 0 0-.4.4C0 7.156 4.845 12 10.8 12a.4.4 0 0 0 .4-.4V9.2a.4.4 0 0 0-.4-.4" />
                      </svg>
                    </div>
                    <div className="rgtspc">{data.phone}</div>
                  </div>
                )}
              </div>

              <div className="col-right">
                {/* Address */}
                {addressParts.length > 0 && (
                  <div className="iconRow">
                    <div className="icon-svg">
                      <svg width="10px" height="12px" viewBox="0 0 11.11 15">
                        <path fill="#fff" d="M5.378 2.484a2.906 2.906 0 0 1 2.91 2.893 2.906 2.906 0 0 1-2.894 2.91 2.906 2.906 0 0 1-2.91-2.893 2.906 2.906 0 0 1 2.893-2.91zm.424 3.315l1.245-.003-.002-.83-1.246.003-.003-1.245-.83.003.003 1.245-1.245.003.002.83 1.246-.003.003 1.245.83-.002zM5.365 0a5.387 5.387 0 0 1 5.396 5.365 5.325 5.325 0 0 1-1.127 3.31l-4.23 5.452-4.258-5.428A5.325 5.325 0 0 1 0 5.395 5.387 5.387 0 0 1 5.365 0zm.026 9.106A3.73 3.73 0 0 0 9.106 5.37 3.73 3.73 0 0 0 5.37 1.656 3.729 3.729 0 0 0 1.656 5.39 3.73 3.73 0 0 0 5.39 9.106z" />
                      </svg>
                    </div>
                    <div className="rgtspc">{addressParts.join(', ')}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Parent Container - Work History & Skills/Education */}
        <div className="parentContainer">
          {/* Left - Work Experience */}
          <div className="left-box">
            {data.experiences && data.experiences.length > 0 && (
              <div className="section">
                <div className="heading">
                  <div className="sectiontitle">{translations.work_history}</div>
                </div>
                {data.experiences.map((exp, index) => (
                  <div key={exp.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="singlecolumn">
                      {(exp.start_date || exp.end_date) && (
                        <span className="dispBlock">
                          {exp.start_date && formatDate(exp.start_date, language)}
                          {exp.start_date && (exp.end_date || exp.currently_working) && ' to '}
                          {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                        </span>
                      )}
                      {exp.job_title && (
                        <span className="dispBlock">
                          <span className="txtBold">{exp.job_title}</span>
                        </span>
                      )}
                      {(exp.company || exp.location) && (
                        <span className="dispBlock">
                          <span className="txtBold">{exp.company}</span>
                          {exp.company && exp.location && ', '}
                          {exp.location}
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
          </div>

          {/* Right - Skills & Education */}
          <div className="right-box">
            {/* Skills */}
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

            {/* Education */}
            {data.educations && data.educations.length > 0 && (
              <div className="section">
                <div className="heading">
                  <div className="sectiontitle">{translations.education}</div>
                </div>
                {data.educations.map((edu, index) => (
                  <div key={edu.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="singlecolumn">
                      {edu.end_date && (
                        <span className="dispBlock">{formatDate(edu.end_date, language)}</span>
                      )}
                      {(edu.degree || edu.field_of_study) && (
                        <span className="dispBlock txtBold">
                          {edu.degree}
                          {edu.degree && edu.field_of_study && ' '}
                          {edu.field_of_study}
                        </span>
                      )}
                      {edu.institution && (
                        <span className="dispBlock">
                          <span className="txtBold">{edu.institution}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
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
                      <div className="ratingBar">
                        <div className="innerRating" style={{ width: `${(lang.level / 5) * 100}%` }} />
                      </div>
                    )}
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
                    <div className="txtBold">{cert.name}</div>
                    {cert.organization && <div>{cert.organization}</div>}
                    {cert.issue_date && <div>{formatDate(cert.issue_date, language)}</div>}
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
