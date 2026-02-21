import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMls9({ data, translations, language = 'en', colorHex = '#102A73' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasContact = data.email || data.phone || data.city || data.country;
  const initials = data.first_name && data.last_name
    ? `${data.first_name[0]}|${data.last_name[0]}`.toUpperCase()
    : (data.first_name?.[0] || data.last_name?.[0] || '').toUpperCase();

  return (
    <>
      <style>{`
        .dyn-mls9 {
          font-family: Verdana, sans-serif;
          color: #2A2A2A;
          line-height: 14px;
          font-size: 10px;
          min-height: 792px;
          word-wrap: break-word;
          padding-bottom: 38px;
        }

        .dyn-mls9.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mls9 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mls9 ul {
          list-style: none;
          margin: 10px 0 0 0;
          padding: 0;
        }

        .dyn-mls9 ul li {
          position: relative;
          margin: 0 0 5px 0;
          padding-left: 9px;
        }

        .dyn-mls9 ul li::before {
          content: '';
          position: absolute;
          left: -3px;
          top: 5px;
          padding: 2px;
          transform: scale(0.7);
          background: #2a2a2a;
        }

        .dyn-mls9.rtl ul li {
          padding-left: 0;
          padding-right: 9px;
        }

        .dyn-mls9.rtl ul li::before {
          left: auto;
          right: -3px;
        }

        .dyn-mls9 .paddedline {
          display: block;
        }

        .dyn-mls9 .txtBold {
          font-weight: bold;
        }

        .dyn-mls9 .txtItl {
          font-style: italic;
        }

        /* Top Section */
        .dyn-mls9 .topsection {
          position: relative;
          padding: 41px 50px 24px 50px;
          margin-bottom: 40px;
        }

        .dyn-mls9 .topsection::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          opacity: 0.15;
          background: ${colorHex};
        }

        .dyn-mls9 .topsection .left-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .dyn-mls9 .topsection .left-box::before {
          content: '';
          position: absolute;
          width: calc(100% - 248px);
          background: linear-gradient(to right, ${colorHex} 10px, #fff 10px);
          background-size: 28px;
          height: 10px;
          top: 100%;
          left: 248px;
        }

        .dyn-mls9.rtl .topsection .left-box::before {
          left: auto;
          right: 248px;
        }

        .dyn-mls9 .topsection .left-box::after {
          content: '';
          position: absolute;
          width: 228px;
          height: 10px;
          background: ${colorHex};
          left: 0;
          top: 100%;
        }

        .dyn-mls9.rtl .topsection .left-box::after {
          left: auto;
          right: 0;
        }

        /* Photo/Monogram */
        .dyn-mls9 .pict-sec {
          margin-right: 15px;
        }

        .dyn-mls9.rtl .pict-sec {
          margin-right: 0;
          margin-left: 15px;
        }

        .dyn-mls9 .prfl-pic .field,
        .dyn-mls9 .monogram {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }

        .dyn-mls9 .prfl-pic img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .dyn-mls9 .monogram {
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #AFAFAF;
        }

        .dyn-mls9 .monogram .initial-name {
          font-family: Georgia, serif;
          font-size: 27px;
          line-height: 31px;
          text-transform: uppercase;
        }

        /* Name Section */
        .dyn-mls9 .name-sec {
          flex-grow: 1;
        }

        .dyn-mls9 .name {
          font-family: Georgia, serif;
          font-size: 31px;
          line-height: 35px;
          letter-spacing: 4.43px;
          text-transform: uppercase;
          word-break: break-word;
        }

        .dyn-mls9 .prof-title {
          letter-spacing: 0.5px;
          text-transform: capitalize;
          margin-top: 5px;
          font-size: 12px;
          line-height: 15px;
        }

        /* Parent Container */
        .dyn-mls9 .parent-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 0 50px;
        }

        .dyn-mls9 .parent-container .left-box {
          margin-right: 50px;
          width: 142px;
        }

        .dyn-mls9.rtl .parent-container .left-box {
          margin-right: 0;
          margin-left: 50px;
        }

        .dyn-mls9 .parent-container .right-box {
          width: calc(100% - 197px);
        }

        /* Section Styling */
        .dyn-mls9 .section {
          margin-bottom: 30px;
        }

        .dyn-mls9 .section:last-child {
          margin-bottom: 0;
        }

        .dyn-mls9 .heading {
          margin-bottom: 10px;
        }

        .dyn-mls9 .sectiontitle {
          font-family: Georgia, serif;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 12px;
          line-height: 14px;
        }

        .dyn-mls9 .paragraph {
          margin-top: 20px;
        }

        .dyn-mls9 .left-box .paragraph {
          margin-top: 15px;
        }

        .dyn-mls9 .firstparagraph {
          margin-top: 0;
        }

        .dyn-mls9 .right-box .singlecolumn {
          margin-left: 0;
        }

        /* Address */
        .dyn-mls9 .address {
          word-break: break-word;
          line-height: 12px;
        }

        .dyn-mls9 .address div {
          margin-bottom: 10px;
        }

        .dyn-mls9 .address div:last-child {
          margin-bottom: 0;
        }

        /* Skills Two Column */
        .dyn-mls9 .skill {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-mls9 .skill .paddedline {
          display: table-cell;
          width: 50%;
        }

        .dyn-mls9 .skill .paddedline:last-child {
          padding-left: 10px;
        }

        .dyn-mls9.rtl .skill .paddedline:last-child {
          padding-left: 0;
          padding-right: 10px;
        }

        .dyn-mls9 .skill ul {
          margin-top: 0;
        }

        /* Experience */
        .dyn-mls9 .exp-space {
          margin-bottom: 5px;
        }

        /* Education */
        .dyn-mls9 .edu-year {
          margin-bottom: 5px;
        }

        /* Languages */
        .dyn-mls9 .lang-sec .paragraph {
          margin-top: 0;
          padding-bottom: 10px;
        }

        .dyn-mls9 .lang-sec .paragraph:last-child {
          padding-bottom: 0;
        }

        .dyn-mls9 .rating-bar {
          background: #D8D8D8;
          width: 100%;
          clear: both;
          margin-top: 3px;
        }

        .dyn-mls9 .inner-rating {
          background-color: #303030;
          height: 4px;
        }

        .dyn-mls9 .lang-space {
          margin-bottom: 6px;
        }
      `}</style>

      <div className={`dyn-mls9 ${rtl ? 'rtl' : ''}`}>
        {/* Top Section */}
        <div className="topsection">
          <div className="left-box">
            {/* Photo or Monogram */}
            <div className="pict-sec">
              {data.photo_url ? (
                <div className="prfl-pic">
                  <div className="field">
                    <img src={data.photo_url} alt="Profile" />
                  </div>
                </div>
              ) : initials && (
                <div className="monogram">
                  <div className="initial-name">
                    <span>{initials}</span>
                  </div>
                </div>
              )}
            </div>
            {/* Name */}
            <div className="name-sec">
              {fullName && <div className="name">{fullName}</div>}
              {data.professional_title && (
                <div className="prof-title">{data.professional_title}</div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="parent-container">
          {/* Left Column */}
          <div className="left-box">
            {/* Contact Section */}
            {hasContact && (
              <div className="section">
                <div className="address">
                  {data.email && <div>{data.email}</div>}
                  {data.phone && <div>{data.phone}</div>}
                  {(data.city || data.country) && (
                    <div>
                      {data.city && <span>{data.city}</span>}
                      {data.city && data.country && ', '}
                      {data.country && <span>{data.country}</span>}
                    </div>
                  )}
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

            {/* Languages Section */}
            {data.languages && data.languages.length > 0 && (
              <div className="section lang-sec">
                <div className="heading">
                  <div className="sectiontitle">{translations.languages}</div>
                </div>
                {data.languages.map((lang, index) => (
                  <div key={lang.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="lang-space">{lang.name}</div>
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
                        <span className="paddedline exp-space">
                          {exp.job_title && <span className="txtBold">{exp.job_title}</span>}
                          {exp.job_title && exp.company && '. '}
                          {exp.company && <span>{exp.company}</span>}
                        </span>
                      )}
                      {(exp.start_date || exp.end_date || exp.location) && (
                        <span className="paddedline txtItl">
                          {exp.start_date && formatDate(exp.start_date, language)}
                          {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                          {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                          {(exp.start_date || exp.end_date) && exp.location && ' | '}
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
                          {edu.degree && edu.field_of_study && ' - '}
                          {edu.field_of_study && <span>{edu.field_of_study}</span>}
                        </span>
                      )}
                      {(edu.institution || edu.end_date) && (
                        <span className="paddedline edu-year">
                          {edu.institution && <span>{edu.institution}</span>}
                          {edu.institution && edu.end_date && ' - '}
                          {edu.end_date && <span>{formatDate(edu.end_date, language)}</span>}
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
