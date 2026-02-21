import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMlu7({ data, translations, language = 'en', colorHex = '#4a4a4a' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasContact = data.email || data.phone || data.city || data.country;

  return (
    <>
      <style>{`
        .dyn-mlu7 {
          font-family: Arial, sans-serif;
          color: #3b3b3b;
          line-height: 15px;
          font-size: 11px;
          display: table;
          min-height: 792px;
          table-layout: fixed;
          width: 100%;
          word-wrap: break-word;
        }

        .dyn-mlu7.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mlu7 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mlu7 ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .dyn-mlu7 ul li {
          position: relative;
          margin: 0;
          padding-left: 10px;
        }

        .dyn-mlu7 ul li::before {
          content: '\\2022';
          font-size: 9px;
          position: absolute;
          left: 0;
          top: 0;
        }

        .dyn-mlu7.rtl ul li {
          padding-left: 0;
          padding-right: 10px;
        }

        .dyn-mlu7.rtl ul li::before {
          left: auto;
          right: 0;
        }

        .dyn-mlu7 .jobline ul {
          margin-top: 6px;
        }

        .dyn-mlu7 .dispBlock {
          display: block;
        }

        .dyn-mlu7 .txtBold {
          font-weight: bold;
        }

        .dyn-mlu7 .txtItl {
          font-style: italic;
        }

        /* Top Section */
        .dyn-mlu7 .topsection {
          display: table-row;
          width: 100%;
        }

        .dyn-mlu7 .topsection .left-box,
        .dyn-mlu7 .topsection .right-box {
          border-bottom: 1px solid #a9b1b5;
        }

        .dyn-mlu7 .topsection .left-box {
          vertical-align: middle;
          padding-top: 15px;
          padding-bottom: 15px;
        }

        /* Left Box */
        .dyn-mlu7 .left-box {
          padding: 20px 30px;
          display: table-cell;
          width: 164px;
          border-right: 1px solid #a9b1b5;
        }

        .dyn-mlu7.rtl .left-box {
          border-right: none;
          border-left: 1px solid #a9b1b5;
        }

        /* Right Box */
        .dyn-mlu7 .right-box {
          padding: 25px 30px 20px;
          display: table-cell;
          vertical-align: middle;
          letter-spacing: 0.2px;
        }

        .dyn-mlu7 .parentContainer .right-box {
          padding-top: 20px;
          vertical-align: top;
        }

        /* Parent Container */
        .dyn-mlu7 .parentContainer {
          display: table-row;
          width: 100%;
          height: 100%;
        }

        /* Photo */
        .dyn-mlu7 .PICTPic {
          height: 140px;
          width: 140px;
          position: relative;
          text-align: center;
        }

        .dyn-mlu7 .PICTPic img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Name */
        .dyn-mlu7 .name {
          font-weight: bold;
          font-size: 32px;
          line-height: 32px;
          padding: 0 0 10px 0;
          text-transform: uppercase;
          word-wrap: break-word;
          color: ${colorHex};
        }

        .dyn-mlu7 .name > span {
          display: block;
        }

        .dyn-mlu7 .resumeTitle {
          color: ${colorHex};
          text-transform: uppercase;
          font-size: 17px;
          line-height: 17px;
          margin: 0 0 15px 0;
        }

        /* Contact */
        .dyn-mlu7 .address {
          color: ${colorHex};
        }

        .dyn-mlu7 .address .singlecolumn {
          margin-left: 0;
        }

        /* Section Styling */
        .dyn-mlu7 .section {
          padding-top: 20px;
        }

        .dyn-mlu7 .section:first-child {
          padding-top: 0;
        }

        .dyn-mlu7 .heading {
          font-weight: bold;
          line-height: 15px;
          margin-bottom: 10px;
        }

        .dyn-mlu7 .sectiontitle {
          font-size: 13px;
          line-height: 14px;
          color: ${colorHex};
        }

        .dyn-mlu7 .paragraph {
          margin-top: 10px;
        }

        .dyn-mlu7 .firstparagraph {
          margin-top: 0;
        }

        .dyn-mlu7 .singlecolumn {
          margin-left: 0;
        }

        /* Job Dates */
        .dyn-mlu7 .jobdates {
          font-size: 10px;
          font-style: italic;
        }

        /* Languages */
        .dyn-mlu7 .langSec .paragraph {
          margin-top: 5px;
        }

        .dyn-mlu7 .langSec .firstparagraph {
          padding-top: 0;
        }

        .dyn-mlu7 .ratingBar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
        }

        .dyn-mlu7 .innerRating {
          background-color: ${colorHex};
          height: 4px;
        }

        /* Separator */
        .dyn-mlu7 .septr::before {
          content: '|';
          font-size: 9px;
          vertical-align: top;
          padding-left: 2px;
          padding-right: 2px;
        }
      `}</style>

      <div className={`dyn-mlu7 ${rtl ? 'rtl' : ''}`}>
        {/* Top Section */}
        <div className="topsection">
          {/* Left Box - Photo */}
          <div className="left-box">
            {data.photo_url && (
              <div className="PICTPic">
                <img src={data.photo_url} alt="Profile" />
              </div>
            )}
          </div>

          {/* Right Box - Name & Contact */}
          <div className="right-box">
            {fullName && (
              <div className="name">
                {data.first_name && <span>{data.first_name}</span>}
                {data.last_name && <span>{data.last_name}</span>}
              </div>
            )}

            {hasContact && (
              <div className="address txtItl">
                <div className="singlecolumn">
                  {data.phone && <span>{data.phone}</span>}
                  {data.phone && data.email && ' | '}
                  {data.email && <span>{data.email}</span>}
                  {(data.phone || data.email) && (data.city || data.country) && (
                    <span className="dispBlock">
                      {data.city && <span>{data.city}</span>}
                      {data.city && data.country && ', '}
                      {data.country && <span>{data.country}</span>}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="parentContainer">
          {/* Left Box - Skills & Education */}
          <div className="left-box">
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
                      {edu.end_date && (
                        <div className="jobdates txtItl">{formatDate(edu.end_date, language)}</div>
                      )}
                      {edu.institution && (
                        <div>
                          <span className="txtBold">{edu.institution}</span>
                        </div>
                      )}
                      {(edu.degree || edu.field_of_study) && (
                        <div>
                          {edu.degree && <span>{edu.degree}</span>}
                          {edu.degree && edu.field_of_study && ': '}
                          {edu.field_of_study && <span>{edu.field_of_study}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Languages Section */}
            {data.languages && data.languages.length > 0 && (
              <div className="section langSec">
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
          </div>

          {/* Right Box - Summary & Experience */}
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
                      {(exp.start_date || exp.end_date) && (
                        <span className="dispBlock">
                          <span className="jobdates txtItl">
                            {exp.start_date && formatDate(exp.start_date, language)}
                            {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                            {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                          </span>
                        </span>
                      )}
                      {(exp.company || exp.location) && (
                        <span className="dispBlock">
                          {exp.company && <span className="txtBold">{exp.company}</span>}
                          {exp.company && exp.location && ' | '}
                          {exp.location && <span>{exp.location}</span>}
                        </span>
                      )}
                      {exp.job_title && (
                        <span className="dispBlock">
                          <span>{exp.job_title}</span>
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

            {/* Certificates Section */}
            {data.certificates && data.certificates.length > 0 && (
              <div className="section">
                <div className="heading">
                  <div className="sectiontitle">{translations.certificates}</div>
                </div>
                {data.certificates.map((cert, index) => (
                  <div key={cert.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <span className="dispBlock txtBold">{cert.name}</span>
                    {cert.organization && <span className="dispBlock">{cert.organization}</span>}
                    {cert.issue_date && (
                      <span className="dispBlock">{formatDate(cert.issue_date, language)}</span>
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
