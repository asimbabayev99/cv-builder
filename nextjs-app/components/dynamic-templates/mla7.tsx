import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMla7({ data, translations, language = 'en', colorHex = '#3ee2db' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasContact = data.email || data.phone || data.city || data.country;

  return (
    <>
      <style>{`
        .dyn-mla7 {
          font-family: 'Trebuchet MS', sans-serif;
          color: #4a4a4a;
          line-height: 13px;
          font-size: 10px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 0 45px 45px 45px;
        }

        .dyn-mla7.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mla7 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mla7 ul {
          list-style: none;
          margin: 0 0 0 8px;
          padding: 0;
        }

        .dyn-mla7.rtl ul {
          margin: 0 8px 0 0;
        }

        .dyn-mla7 ul li {
          position: relative;
          margin: 0 0 0 5px;
        }

        .dyn-mla7 ul li::before {
          content: '\\25CF\\0020';
          position: absolute;
          left: -13px;
          top: 0;
        }

        .dyn-mla7.rtl ul li::before {
          left: auto;
          right: -13px;
        }

        .dyn-mla7 .paddedline {
          display: block;
        }

        .dyn-mla7 .txtBold {
          font-weight: bold;
        }

        .dyn-mla7 .txtItl {
          font-style: italic;
        }

        .dyn-mla7 .sprtr {
          margin: 0 3px;
        }

        /* Header Section */
        .dyn-mla7 .firstsection {
          text-align: center;
          position: relative;
          padding: 45px 0 0 0;
          margin: 0 -45px;
          padding-left: 45px;
          padding-right: 45px;
        }

        .dyn-mla7 .firstsection::before {
          background: ${colorHex};
          content: "";
          display: block;
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 45px;
          left: 0;
          top: 0;
        }

        .dyn-mla7 .firstsection::after {
          background: ${colorHex};
          content: "";
          display: block;
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 25px;
          left: 0;
          top: 45px;
          opacity: 0.32;
        }

        .dyn-mla7 .name {
          border: 1px solid #505050;
          border-radius: 3px;
          display: inline-block;
          font-weight: bold;
          font-style: italic;
          padding: 0 25px;
          font-size: 32px;
          line-height: 49px;
          text-align: center;
          letter-spacing: 0.8px;
          max-width: 455px;
        }

        .dyn-mla7 .resumeTitle {
          text-align: center;
          color: #4a4a4a;
          font-size: 14px;
          line-height: 20px;
          padding: 15px 0 0 0;
        }

        .dyn-mla7 .address {
          text-align: center;
          font-size: 9px;
          line-height: 13px;
          padding-top: 15px;
        }

        /* Two Column Layout */
        .dyn-mla7 .parentContainer {
          display: table;
          width: 100%;
          table-layout: fixed;
          margin-top: -25px;
        }

        .dyn-mla7 .left-box {
          display: table-cell;
          width: 331px;
          padding-right: 20px;
          padding-top: 45px;
          padding-bottom: 45px;
          vertical-align: top;
        }

        .dyn-mla7.rtl .left-box {
          padding-right: 0;
          padding-left: 20px;
        }

        .dyn-mla7 .right-box {
          display: table-cell;
          padding-left: 20px;
          padding-top: 45px;
          padding-bottom: 45px;
          vertical-align: top;
        }

        .dyn-mla7.rtl .right-box {
          padding-left: 0;
          padding-right: 20px;
        }

        /* Section Styling */
        .dyn-mla7 .section {
          padding-top: 20px;
        }

        .dyn-mla7 .section:first-child {
          padding-top: 0;
        }

        .dyn-mla7 .heading {
          margin-bottom: 10px;
          font-weight: bold;
          font-size: 10px;
          line-height: 15px;
          text-transform: uppercase;
          font-style: italic;
        }

        .dyn-mla7 .sectiontitle {
          color: ${colorHex};
        }

        .dyn-mla7 .paragraph {
          margin-top: 15px;
        }

        .dyn-mla7 .firstparagraph {
          margin-top: 0;
        }

        .dyn-mla7 .singlecolumn {
          margin-left: 0;
        }

        .dyn-mla7 .jobline ul {
          margin-top: 6px;
        }

        /* Languages Flex Layout */
        .dyn-mla7 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        .dyn-mla7 .lang-sec .heading {
          width: 100%;
          flex-grow: 1;
        }

        .dyn-mla7 .lang-sec .paragraph {
          width: 155px;
          max-width: 155px;
          vertical-align: top;
          padding-bottom: 7px;
          margin-top: 0;
        }

        .dyn-mla7 .right-box .lang-sec .paragraph {
          width: 100%;
          max-width: 100%;
        }

        /* Rating Bar */
        .dyn-mla7 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
        }

        .dyn-mla7 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }
      `}</style>

      <div className={`dyn-mla7 ${rtl ? 'rtl' : ''}`}>
        {/* Header Section */}
        <div className="firstsection">
          {fullName && <div className="name">{fullName}</div>}
          {data.professional_title && (
            <div className="resumeTitle">{data.professional_title}</div>
          )}
          {hasContact && (
            <div className="address">
              {data.email && <span>{data.email}</span>}
              {data.email && (data.phone || data.city) && <span className="sprtr">|</span>}
              {data.phone && <span>{data.phone}</span>}
              {data.phone && data.city && <span className="sprtr">|</span>}
              {data.city && <span>{data.city}</span>}
              {data.city && data.country && ', '}
              {data.country && <span>{data.country}</span>}
            </div>
          )}
        </div>

        {/* Two Column Content */}
        <div className="parentContainer">
          {/* Left Column */}
          <div className="left-box">
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
                      {(exp.company || exp.location) && (
                        <span className="paddedline">
                          {exp.company && <span className="txtBold">{exp.company}</span>}
                          {exp.company && exp.location && '. '}
                          {exp.location && <span>{exp.location}</span>}
                        </span>
                      )}
                      <span className="paddedline txtItl">
                        {exp.job_title && <span>{exp.job_title}</span>}
                        {exp.job_title && (exp.start_date || exp.end_date) && <span className="sprtr">|</span>}
                        {exp.start_date && formatDate(exp.start_date, language)}
                        {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                        {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                      </span>
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
          </div>

          {/* Right Column */}
          <div className="right-box">
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

            {/* Education Section */}
            {data.educations && data.educations.length > 0 && (
              <div className="section">
                <div className="heading">
                  <div className="sectiontitle">{translations.education}</div>
                </div>
                {data.educations.map((edu, index) => (
                  <div key={edu.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="singlecolumn">
                      {edu.institution && (
                        <span className="paddedline txtBold">{edu.institution}</span>
                      )}
                      {edu.end_date && (
                        <span className="paddedline">{formatDate(edu.end_date, language)}</span>
                      )}
                      {(edu.degree || edu.field_of_study) && (
                        <span className="paddedline" style={{ marginTop: '5px' }}>
                          {edu.degree && <span className="txtBold">{edu.degree}</span>}
                          {edu.degree && edu.field_of_study && ': '}
                          {edu.field_of_study && <span>{edu.field_of_study}</span>}
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
        </div>
      </div>
    </>
  );
}
