import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMlt6({ data, translations, language = 'en', colorHex = '#3c5769' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasContact = data.email || data.phone || data.city || data.country;
  const initials = data.first_name && data.last_name
    ? `${data.first_name[0]}${data.last_name[0]}`.toUpperCase()
    : (data.first_name?.[0] || data.last_name?.[0] || '').toUpperCase();

  return (
    <>
      <style>{`
        .dyn-mlt6 {
          font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
          color: #4a4a4a;
          line-height: 15px;
          font-size: 10px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 18px;
          position: relative;
        }

        .dyn-mlt6.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mlt6 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mlt6 ul {
          list-style: none;
          margin: 0 0 0 8px;
          padding: 0;
        }

        .dyn-mlt6 ul li {
          position: relative;
          margin: 0 0 0 5px;
        }

        .dyn-mlt6 ul li::before {
          content: '\\25CF\\0020';
          position: absolute;
          left: -13px;
          top: 0;
        }

        .dyn-mlt6.rtl ul {
          margin: 0 8px 0 0;
        }

        .dyn-mlt6.rtl ul li {
          margin: 0 5px 0 0;
        }

        .dyn-mlt6.rtl ul li::before {
          left: auto;
          right: -13px;
        }

        .dyn-mlt6 .paddedline {
          display: block;
        }

        .dyn-mlt6 .txtBold {
          font-weight: bold;
        }

        .dyn-mlt6 .txtItl {
          font-style: italic;
        }

        .dyn-mlt6 .fltRight {
          float: right;
        }

        .dyn-mlt6.rtl .fltRight {
          float: left;
        }

        /* Background for right column */
        .dyn-mlt6::after {
          content: '';
          background: #f5f5f5;
          position: absolute;
          right: 18px;
          top: 18px;
          height: calc(100% - 36px);
          width: 220px;
          z-index: -1;
        }

        .dyn-mlt6.rtl::after {
          right: auto;
          left: 18px;
        }

        /* Parent Container */
        .dyn-mlt6 .parentContainer {
          display: table;
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }

        /* Left Box */
        .dyn-mlt6 .left-box {
          padding: 0 15px 0 10px;
          display: table-cell;
          overflow: hidden;
          vertical-align: top;
        }

        .dyn-mlt6.rtl .left-box {
          padding: 0 10px 0 15px;
        }

        /* Right Box */
        .dyn-mlt6 .right-box {
          background-color: #f5f5f5;
          padding: 0 15px;
          display: table-cell;
          vertical-align: top;
          width: 190px;
        }

        /* Top Section */
        .dyn-mlt6 .top-section {
          background-color: ${colorHex};
          color: #fff;
          padding: 20px 15px;
          margin-bottom: 20px;
        }

        .dyn-mlt6 .monogram {
          text-align: center;
          margin-bottom: 10px;
        }

        .dyn-mlt6 .monogram svg {
          height: 40px;
          width: 40px;
          text-transform: uppercase;
        }

        .dyn-mlt6 .monogram svg text {
          fill: #fff;
        }

        .dyn-mlt6 .monogram svg rect {
          fill: none;
          stroke: #fff;
        }

        /* Name */
        .dyn-mlt6 .name {
          font-family: Georgia, serif;
          font-size: 26px;
          line-height: 46px;
          font-weight: bold;
          text-align: center;
          padding-bottom: 5px;
          letter-spacing: 1.5px;
          font-style: italic;
        }

        .dyn-mlt6 .resumeTitle {
          color: #fff;
          text-align: center;
          font-size: 18px;
          line-height: 20px;
          padding-bottom: 5px;
        }

        /* Address with Icons */
        .dyn-mlt6 .address {
          font-size: 10px;
          line-height: 15px;
        }

        .dyn-mlt6 .iconRow {
          display: table;
          table-layout: fixed;
          width: 100%;
          margin-bottom: 5px;
        }

        .dyn-mlt6 .iconSvg {
          display: table-cell;
          text-align: center;
          vertical-align: middle;
          width: 12px;
          line-height: 12px;
        }

        .dyn-mlt6 .iconSvg svg {
          width: 12px;
          height: 12px;
          vertical-align: middle;
        }

        .dyn-mlt6 .icoTxt {
          display: table-cell;
          padding-left: 10px;
        }

        .dyn-mlt6.rtl .icoTxt {
          padding-left: 0;
          padding-right: 10px;
        }

        /* Section Styling */
        .dyn-mlt6 .section {
          padding-top: 20px;
          margin-bottom: 20px;
          border-top: 1px solid #c4c4c4;
        }

        .dyn-mlt6 .section:first-child {
          border-top: none;
        }

        .dyn-mlt6 .heading {
          padding-bottom: 10px;
          font-weight: bold;
          font-size: 18px;
        }

        .dyn-mlt6 .sectiontitle {
          font-family: Georgia, serif;
          font-size: 12px;
          line-height: 17px;
          letter-spacing: 0.5px;
          font-style: italic;
        }

        .dyn-mlt6 .paragraph {
          margin-top: 20px;
        }

        .dyn-mlt6 .firstparagraph {
          margin-top: 0;
        }

        .dyn-mlt6 .singlecolumn {
          margin-left: 0;
        }

        /* Job Styling */
        .dyn-mlt6 .jobtitle {
          font-weight: bold;
        }

        .dyn-mlt6 .jobdates {
          font-style: italic;
        }

        .dyn-mlt6 .jobline ul {
          margin-top: 3px;
        }

        .dyn-mlt6 .hyphen::before {
          content: ' - ';
        }

        /* Languages */
        .dyn-mlt6 .lang-sec .paragraph {
          width: 100%;
          padding-bottom: 5px;
          margin-top: 0;
        }

        .dyn-mlt6 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
        }

        .dyn-mlt6 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }

        /* Skills in Right Box */
        .dyn-mlt6 .right-box .skill-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .dyn-mlt6 .right-box .skill-list li {
          position: relative;
          padding-left: 15px;
          margin-bottom: 5px;
        }

        .dyn-mlt6 .right-box .skill-list li::before {
          content: '\\25CF';
          position: absolute;
          left: 0;
          top: 0;
        }

        .dyn-mlt6.rtl .right-box .skill-list li {
          padding-left: 0;
          padding-right: 15px;
        }

        .dyn-mlt6.rtl .right-box .skill-list li::before {
          left: auto;
          right: 0;
        }
      `}</style>

      <div className={`dyn-mlt6 ${rtl ? 'rtl' : ''}`}>
        {/* Top Section with Name */}
        <div className="top-section">
          {initials && (
            <div className="monogram">
              <svg width="40px" height="40px" viewBox="0 0 40 40">
                <rect x="1" y="1" width="38" height="38" strokeWidth="1" />
                <text textAnchor="middle" x="20" y="26" fontSize="14">{initials}</text>
              </svg>
            </div>
          )}
          {fullName && <div className="name">{fullName}</div>}
          {data.professional_title && (
            <div className="resumeTitle">{data.professional_title}</div>
          )}
        </div>

        {/* Main Content */}
        <div className="parentContainer">
          {/* Left Box - Main Content */}
          <div className="left-box">
            {/* Contact Section */}
            {hasContact && (
              <div className="section" style={{ borderTop: 'none', paddingTop: 0 }}>
                <div className="address">
                  {(data.city || data.country) && (
                    <div className="iconRow">
                      <div className="iconSvg">
                        <svg viewBox="0 0 12 12">
                          <path d="M6,0 C3.8,0 2,1.8 2,4 C2,6.5 5.5,11 6,11 C6.5,11 10,6.5 10,4 C10,1.8 8.2,0 6,0 Z M6,5.5 C5.2,5.5 4.5,4.8 4.5,4 C4.5,3.2 5.2,2.5 6,2.5 C6.8,2.5 7.5,3.2 7.5,4 C7.5,4.8 6.8,5.5 6,5.5 Z" fill="#fff" />
                        </svg>
                      </div>
                      <div className="icoTxt">
                        {data.city && <span>{data.city}</span>}
                        {data.city && data.country && ', '}
                        {data.country && <span>{data.country}</span>}
                      </div>
                    </div>
                  )}
                  {data.phone && (
                    <div className="iconRow">
                      <div className="iconSvg">
                        <svg viewBox="0 0 12 12">
                          <path d="M11,9.5 L9.5,11 C9.3,11.2 9,11.3 8.7,11.3 C6.5,11.1 4.5,10 3,8.5 C1.5,7 0.9,5 0.7,3.3 C0.7,3 0.8,2.7 1,2.5 L2.5,1 C2.7,0.8 3.1,0.8 3.3,1 L5,3 C5.2,3.2 5.2,3.5 5,3.7 L4,4.7 C4.5,5.5 5,6 5.5,6.5 C6,7 6.5,7.5 7.3,8 L8.3,7 C8.5,6.8 8.8,6.8 9,7 L11,8.7 C11.2,8.9 11.2,9.3 11,9.5 Z" fill="#fff" />
                        </svg>
                      </div>
                      <div className="icoTxt">
                        <span>{data.phone}</span>
                      </div>
                    </div>
                  )}
                  {data.email && (
                    <div className="iconRow">
                      <div className="iconSvg">
                        <svg viewBox="0 0 12 12">
                          <path d="M10.5,2 L1.5,2 C0.7,2 0,2.7 0,3.5 L0,8.5 C0,9.3 0.7,10 1.5,10 L10.5,10 C11.3,10 12,9.3 12,8.5 L12,3.5 C12,2.7 11.3,2 10.5,2 Z M10.5,4 L6,7 L1.5,4 L1.5,3 L6,6 L10.5,3 L10.5,4 Z" fill="#fff" />
                        </svg>
                      </div>
                      <div className="icoTxt">
                        <span>{data.email}</span>
                      </div>
                    </div>
                  )}
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
                      {(exp.job_title || exp.company) && (
                        <span className="paddedline">
                          {exp.job_title && <span className="jobtitle txtBold">{exp.job_title}</span>}
                          {exp.job_title && exp.company && ' | '}
                          {exp.company && <span>{exp.company}</span>}
                          {exp.location && ` - ${exp.location}`}
                        </span>
                      )}
                      {(exp.start_date || exp.end_date) && (
                        <span className="paddedline jobdates">
                          {exp.start_date && formatDate(exp.start_date, language)}
                          {exp.start_date && (exp.end_date || exp.currently_working) && <span className="hyphen" />}
                          {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
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

            {/* Education Section */}
            {data.educations && data.educations.length > 0 && (
              <div className="section">
                <div className="heading">
                  <div className="sectiontitle">{translations.education}</div>
                </div>
                {data.educations.map((edu, index) => (
                  <div key={edu.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="singlecolumn">
                      {(edu.degree || edu.field_of_study) && (
                        <span className="paddedline">
                          {edu.degree && <span className="txtBold">{edu.degree}</span>}
                          {edu.degree && edu.field_of_study && ': '}
                          {edu.field_of_study && <span>{edu.field_of_study}</span>}
                        </span>
                      )}
                      {edu.institution && (
                        <span className="paddedline">
                          <span>{edu.institution}</span>
                        </span>
                      )}
                      {edu.end_date && (
                        <span className="paddedline txtItl">
                          {formatDate(edu.end_date, language)}
                        </span>
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

          {/* Right Box - Sidebar */}
          <div className="right-box">
            {/* Skills Section */}
            {data.skills && data.skills.length > 0 && (
              <div className="section" style={{ borderTop: 'none' }}>
                <div className="heading">
                  <div className="sectiontitle">{translations.skills}</div>
                </div>
                <div className="paragraph firstparagraph">
                  <ul className="skill-list">
                    {data.skills.map((skill, index) => (
                      <li key={skill.id || index}>{skill.name}</li>
                    ))}
                  </ul>
                </div>
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
          </div>
        </div>
      </div>
    </>
  );
}
