import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMls8({ data, translations, language = 'en', colorHex = '#9B3016' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasContact = data.email || data.phone || data.city || data.country || data.website || data.driving_license || data.nationality || data.linkedin;
  const initials = data.first_name && data.last_name
    ? `${data.first_name[0]}|${data.last_name[0]}`.toUpperCase()
    : (data.first_name?.[0] || data.last_name?.[0] || '').toUpperCase();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Halant:wght@600;700');
        @import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700');

        .dyn-mls8 {
          font-family: 'PT Sans', sans-serif;
          color: #1A1A1A;
          line-height: 12px;
          font-size: 9px;
          min-height: 767px;
          word-wrap: break-word;
          padding: 0 40px 35px 40px;
        }

        .dyn-mls8.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mls8 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mls8 ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .dyn-mls8 ul li {
          position: relative;
          margin: 0;
          padding-left: 13px;
          padding-bottom: 3px;
        }

        .dyn-mls8.rtl ul li {
          padding-left: 0;
          padding-right: 13px;
        }

        .dyn-mls8 ul li:last-child {
          padding-bottom: 0;
        }

        .dyn-mls8 ul li::before {
          content: '';
          height: 5px;
          width: 5px;
          background: #000;
          border-radius: 50%;
          position: absolute;
          top: 3px;
          left: 5px;
          transform: scale(0.5);
        }

        .dyn-mls8.rtl ul li::before {
          left: auto;
          right: 5px;
        }

        .dyn-mls8 .paddedline {
          display: block;
        }

        .dyn-mls8 .txtBold {
          font-weight: bold;
        }

        /* Top Section */
        .dyn-mls8 .top-section {
          margin-bottom: 30px;
        }

        .dyn-mls8 .inner-box {
          display: flex;
          justify-content: space-between;
        }

        /* Photo/Monogram Section */
        .dyn-mls8 .pict-sec {
          padding-right: 30px;
        }

        .dyn-mls8.rtl .pict-sec {
          padding-right: 0;
          padding-left: 30px;
        }

        .dyn-mls8 .monogram-wrap {
          width: 117px;
          height: 132px;
          background: ${colorHex};
          padding-top: 23px;
          padding-bottom: 15px;
          border-bottom-left-radius: 50%;
          border-bottom-right-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        .dyn-mls8 .name-wrap {
          width: 75px;
          height: 75px;
          background: ${colorHex};
          border-radius: 50%;
          border: 2px solid #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dyn-mls8 .initial-name {
          font-size: 28px;
          line-height: 44px;
          color: #fff;
          font-weight: 700;
          font-family: 'Halant', serif;
          text-transform: uppercase;
        }

        .dyn-mls8 .prfl-pic {
          width: 117px;
          height: 132px;
          background: ${colorHex};
          padding-top: 23px;
          padding-bottom: 15px;
          border-bottom-left-radius: 50%;
          border-bottom-right-radius: 50%;
          display: flex;
          justify-content: center;
        }

        .dyn-mls8 .prfl-pic img {
          width: 75px;
          height: 75px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #fff;
        }

        /* Name Section */
        .dyn-mls8 .name-sec {
          width: calc(100% - 117px);
        }

        .dyn-mls8 .name {
          font-weight: 700;
          text-transform: uppercase;
          font-family: 'Halant', serif;
          color: ${colorHex};
          font-size: 36px;
          line-height: 36px;
          padding-top: 35px;
        }

        .dyn-mls8 .resume-title {
          font-weight: 700;
          letter-spacing: 0.5px;
          font-size: 11px;
          line-height: 14px;
          padding-top: 5px;
        }

        /* Parent Container - Two Column */
        .dyn-mls8 .parent-container {
          display: table;
          table-layout: fixed;
          width: 100%;
        }

        .dyn-mls8 .left-box {
          display: table-cell;
          width: 146px;
          max-width: 146px;
          padding-right: 21px;
          vertical-align: top;
        }

        .dyn-mls8.rtl .left-box {
          padding-right: 0;
          padding-left: 21px;
        }

        .dyn-mls8 .right-box {
          display: table-cell;
          padding-left: 19px;
          vertical-align: top;
          border-left: 1px solid #dadada;
        }

        .dyn-mls8.rtl .right-box {
          padding-left: 0;
          padding-right: 19px;
          border-left: none;
          border-right: 1px solid #dadada;
        }

        /* Section Styling */
        .dyn-mls8 .section {
          padding-top: 15px;
        }

        .dyn-mls8 .section:first-child {
          padding-top: 0;
        }

        .dyn-mls8 .heading {
          font-size: 13px;
          line-height: 16px;
          margin-bottom: 13px;
        }

        .dyn-mls8 .sectiontitle {
          font-weight: 600;
          text-transform: capitalize;
          font-family: 'Halant', serif;
          position: relative;
          color: ${colorHex};
        }

        .dyn-mls8 .sectiontitle::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 30px;
          height: 1px;
          background: #dadada;
        }

        .dyn-mls8.rtl .sectiontitle::after {
          left: auto;
          right: 0;
        }

        .dyn-mls8 .paragraph {
          margin-top: 16px;
        }

        .dyn-mls8 .paragraph.firstparagraph {
          margin-top: 0;
        }

        .dyn-mls8 .singlecolumn {
          margin-left: 0;
        }

        .dyn-mls8 .exp-textsize {
          font-size: 10px;
          margin-bottom: 2px;
        }

        .dyn-mls8 .jobline ul {
          margin-top: 5px;
        }

        .dyn-mls8 .space-inpipe {
          padding: 0 2px;
        }

        /* Contact Section */
        .dyn-mls8 .cntc-sec .icon-row {
          display: block;
          padding: 5px 0 0;
          word-break: break-all;
        }

        .dyn-mls8 .cntc-sec .icon-row:first-child {
          padding: 0;
        }

        /* Education Styles */
        .dyn-mls8 .edu-year {
          line-height: 10px;
          margin-bottom: 5px;
        }

        .dyn-mls8 .edu-degree {
          margin-bottom: 3px;
        }

        /* Two Column Skills */
        .dyn-mls8 .skill {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-mls8 .skill .paddedline {
          display: table-cell;
          width: 50%;
        }

        .dyn-mls8 .skill .paddedline:last-child {
          padding-left: 19px;
        }

        .dyn-mls8.rtl .skill .paddedline:last-child {
          padding-left: 0;
          padding-right: 19px;
        }

        /* Languages Flex Layout */
        .dyn-mls8 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .dyn-mls8 .lang-sec .heading {
          width: 100%;
          flex-grow: 1;
        }

        .dyn-mls8 .lang-sec .paragraph {
          width: 45.8%;
          vertical-align: top;
          padding-bottom: 8px;
          margin-top: 0;
        }

        .dyn-mls8 .left-box .lang-sec .paragraph {
          width: 100%;
          max-width: 100%;
          display: block;
          padding-bottom: 5px;
        }

        /* Rating Bar */
        .dyn-mls8 .rating-bar {
          background: #D8D8D8;
          width: 100%;
          clear: both;
          margin-top: 3px;
          margin-bottom: 3px;
        }

        .dyn-mls8 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }
      `}</style>

      <div className={`dyn-mls8 ${rtl ? 'rtl' : ''}`}>
        {/* Top Section */}
        <div className="top-section">
          <div className="inner-box">
            {/* Photo/Monogram */}
            <div className="pict-sec">
              {data.photo_url ? (
                <div className="prfl-pic">
                  <img src={data.photo_url} alt="Profile" />
                </div>
              ) : initials ? (
                <div className="monogram-wrap">
                  <div className="name-wrap">
                    <div className="initial-name">{initials}</div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Name Section */}
            <div className="name-sec">
              {fullName && <div className="name">{fullName}</div>}
              {data.professional_title && (
                <div className="resume-title">{data.professional_title}</div>
              )}
            </div>
          </div>
        </div>

        {/* Two Column Content */}
        <div className="parent-container">
          {/* Left Column */}
          <div className="left-box">
            {/* Contact Section */}
            {hasContact && (
              <div className="section cntc-sec">
                <div className="heading">
                  <div className="sectiontitle">{translations.contact || 'Contact'}</div>
                </div>
                {data.email && <div className="icon-row">{data.email}</div>}
                {data.phone && <div className="icon-row">{data.phone}</div>}
                {(data.city || data.country) && (
                  <div className="icon-row">
                    {data.city && <span>{data.city}</span>}
                    {data.city && data.country && ', '}
                    {data.country && <span>{data.country}</span>}
                  </div>
                )}
                {data.website && <div className="icon-row">{data.website}</div>}
                {data.driving_license && <div className="icon-row">{data.driving_license}</div>}
                {data.nationality && <div className="icon-row">{data.nationality}</div>}
                {data.linkedin && <div className="icon-row">{data.linkedin}</div>}
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
                      {(edu.start_date || edu.end_date) && (
                        <span className="paddedline edu-year">
                          {edu.start_date && formatDate(edu.start_date, language)}
                          {edu.start_date && (edu.end_date || edu.currently_studying) && ' - '}
                          {edu.currently_studying ? translations.present : edu.end_date && formatDate(edu.end_date, language)}
                        </span>
                      )}
                      {(edu.degree || edu.field_of_study) && (
                        <span className="paddedline edu-degree">
                          {edu.degree && <span className="txtBold">{edu.degree}</span>}
                          {edu.field_of_study && (
                            <span style={{ display: 'block' }}>{edu.field_of_study}</span>
                          )}
                        </span>
                      )}
                      {(edu.institution || edu.location) && (
                        <span className="paddedline">
                          <span className="txtBold">{edu.institution}</span>
                          {edu.institution && edu.location && ' - '}
                          {edu.location && <span>{edu.location}</span>}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Column */}
          <div className="right-box">
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
                        <span className="paddedline exp-textsize">
                          {exp.job_title && <span className="txtBold">{exp.job_title}</span>}
                          {exp.job_title && exp.company && ' - '}
                          {exp.company && <span>{exp.company}</span>}
                        </span>
                      )}
                      {(exp.location || exp.start_date || exp.end_date) && (
                        <span className="paddedline">
                          {exp.location && <span>{exp.location}</span>}
                          {exp.location && (exp.start_date || exp.end_date) && (
                            <span className="space-inpipe">|</span>
                          )}
                          {exp.start_date && formatDate(exp.start_date, language)}
                          {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                          {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                        </span>
                      )}
                      {exp.description && (
                        <div className="jobline">
                          <ul>
                            {exp.description.split('\n').filter(Boolean).map((line, i) => (
                              <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                            ))}
                          </ul>
                        </div>
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
                    <div className="skill">
                      <span className="paddedline">
                        <ul>
                          {data.skills.slice(0, Math.ceil(data.skills.length / 2)).map((skill, index) => (
                            <li key={skill.id || index}>{skill.name}</li>
                          ))}
                        </ul>
                      </span>
                      <span className="paddedline">
                        <ul>
                          {data.skills.slice(Math.ceil(data.skills.length / 2)).map((skill, index) => (
                            <li key={skill.id || index}>{skill.name}</li>
                          ))}
                        </ul>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Languages Section */}
            {data.languages && data.languages.length > 0 && (
              <div className="section lang-sec">
                <div className="heading">
                  <div className="sectiontitle">{translations.languages}</div>
                </div>
                {data.languages.map((lang, index) => {
                  const proficiencyText = lang.proficiency ? (translations[lang.proficiency as keyof typeof translations] || lang.proficiency) : '';
                  return (
                    <div key={lang.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                      <div className="txtBold">{lang.name}</div>
                      {lang.level && (
                        <div className="rating-bar">
                          <div className="inner-rating" style={{ width: `${(lang.level / 5) * 100}%` }} />
                        </div>
                      )}
                      {proficiencyText && <div>{proficiencyText}</div>}
                    </div>
                  );
                })}
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
                        <span className="paddedline">{formatDate(cert.issue_date, language)}</span>
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
