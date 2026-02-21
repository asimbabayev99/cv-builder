import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMlu6({ data, translations, language = 'en', colorHex = '#4a4a4a' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasContact = data.email || data.phone || data.city || data.country;

  return (
    <>
      <style>{`
        .dyn-mlu6 {
          font-family: Arial, sans-serif;
          color: #242424;
          line-height: 15px;
          font-size: 11px;
          min-height: 792px;
          word-wrap: break-word;
        }

        .dyn-mlu6.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mlu6 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mlu6 ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .dyn-mlu6 ul li {
          position: relative;
          margin: 0;
          padding-left: 8px;
        }

        .dyn-mlu6 ul li::before {
          content: '\\2022';
          font-size: 9px;
          position: absolute;
          left: 0;
          top: 0;
        }

        .dyn-mlu6.rtl ul li {
          padding-left: 0;
          padding-right: 8px;
        }

        .dyn-mlu6.rtl ul li::before {
          left: auto;
          right: 0;
        }

        .dyn-mlu6 .jobline ul {
          margin-top: 10px;
        }

        .dyn-mlu6 .paddedline {
          display: block;
        }

        .dyn-mlu6 .txtBold {
          font-weight: bold;
        }

        .dyn-mlu6 .txtItl {
          font-style: italic;
        }

        /* Parent Container */
        .dyn-mlu6 .parentContainer {
          display: table;
          table-layout: fixed;
          width: 100%;
          min-height: inherit;
        }

        /* Left Box - Main Content */
        .dyn-mlu6 .left-box {
          padding: 25px;
          display: table-cell;
          vertical-align: top;
          letter-spacing: 0.2px;
        }

        /* Right Box - Gray Sidebar */
        .dyn-mlu6 .right-box {
          background-color: ${colorHex};
          display: table-cell;
          color: #fff;
          padding: 25px;
          width: 174px;
          vertical-align: top;
        }

        .dyn-mlu6 .right-box .section {
          padding: 10px;
          border-bottom: 1px solid #9b9b9b;
        }

        .dyn-mlu6 .right-box .section:first-child {
          padding-top: 0;
        }

        .dyn-mlu6 .right-box .section:last-of-type {
          border: none;
        }

        /* Photo Section */
        .dyn-mlu6 .pict-sec {
          text-align: center;
          padding-bottom: 0 !important;
          margin-bottom: 25px;
          border: none !important;
        }

        .dyn-mlu6 .prflPic img {
          width: 130px;
          height: 168px;
          object-fit: cover;
        }

        /* Name */
        .dyn-mlu6 .name {
          color: #4a4a4a;
          font-weight: bold;
          font-size: 34px;
          line-height: 32px;
          padding: 0 0 10px 0;
          word-wrap: break-word;
        }

        .dyn-mlu6 .resumeTitle {
          color: #4a4a4a;
          font-weight: bold;
          font-size: 17px;
          line-height: 17px;
          margin: 0 0 10px 0;
        }

        /* Contact Flex Layout */
        .dyn-mlu6 .address .singlecolumn {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          color: #3b3b3b;
        }

        .dyn-mlu6 .address .details-left {
          flex-grow: 1;
          width: 47%;
        }

        .dyn-mlu6 .address .details-right {
          width: 47%;
          padding-left: 10px;
        }

        .dyn-mlu6.rtl .address .details-right {
          padding-left: 0;
          padding-right: 10px;
        }

        /* Section Styling */
        .dyn-mlu6 .section {
          padding-top: 20px;
        }

        .dyn-mlu6 .section.firstsection,
        .dyn-mlu6 .SECTION_CNTC {
          padding-top: 0;
        }

        .dyn-mlu6 .left-box .firstsection + .section {
          padding-top: 30px;
        }

        .dyn-mlu6 .heading {
          font-weight: bold;
          font-size: 13px;
          line-height: 17px;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .dyn-mlu6 .sectiontitle {
          word-wrap: break-word;
        }

        .dyn-mlu6 .paragraph {
          margin-top: 10px;
        }

        .dyn-mlu6 .firstparagraph {
          margin-top: 0;
        }

        .dyn-mlu6 .left-box .singlecolumn {
          margin-left: 0;
          word-wrap: break-word;
        }

        /* Job Dates */
        .dyn-mlu6 .jobdates {
          font-size: 10px;
          font-style: italic;
        }

        /* Languages */
        .dyn-mlu6 .langSec .paragraph {
          margin-top: 5px;
        }

        .dyn-mlu6 .langSec .firstparagraph {
          padding-top: 0;
        }

        .dyn-mlu6 .ratingBar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          position: relative;
        }

        .dyn-mlu6 .ratingBar::before {
          content: '';
          width: 100%;
          height: 4px;
          position: absolute;
          z-index: 1;
          opacity: 0.5;
          background-color: ${colorHex};
        }

        .dyn-mlu6 .innerRating {
          background-color: #d5d6d6;
          height: 4px;
          position: relative;
          z-index: 2;
        }

        .dyn-mlu6 .left-box .innerRating {
          background-color: ${colorHex};
        }

        /* Separator */
        .dyn-mlu6 .septr::before {
          content: '|';
          font-size: 9px;
          vertical-align: top;
          padding-left: 2px;
          padding-right: 2px;
        }
      `}</style>

      <div className={`dyn-mlu6 ${rtl ? 'rtl' : ''}`}>
        <div className="parentContainer">
          {/* Left Box - Main Content */}
          <div className="left-box">
            {/* Name Section */}
            <div className="section firstsection">
              {fullName && <div className="name">{fullName}</div>}
              {data.professional_title && (
                <div className="resumeTitle">{data.professional_title}</div>
              )}
            </div>

            {/* Contact Section */}
            {hasContact && (
              <div className="section SECTION_CNTC">
                <div className="address">
                  <div className="singlecolumn">
                    <div className="details-left">
                      {data.phone && <div>{data.phone}</div>}
                      {data.email && <div>{data.email}</div>}
                      {(data.city || data.country) && (
                        <div>
                          {data.city && <span>{data.city}</span>}
                          {data.city && data.country && ', '}
                          {data.country && <span>{data.country}</span>}
                        </div>
                      )}
                    </div>
                  </div>
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
                      {(exp.start_date || exp.end_date) && (
                        <span className="paddedline">
                          <span className="jobdates">
                            {exp.start_date && formatDate(exp.start_date, language)}
                            {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                            {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                          </span>
                        </span>
                      )}
                      {(exp.company || exp.location) && (
                        <span className="paddedline">
                          {exp.company && <span className="txtBold">{exp.company}</span>}
                          {exp.company && exp.location && ' | '}
                          {exp.location && <span>{exp.location}</span>}
                        </span>
                      )}
                      {exp.job_title && (
                        <span className="paddedline">
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

          {/* Right Box - Gray Sidebar */}
          <div className="right-box">
            {/* Photo Section */}
            {data.photo_url && (
              <div className="section pict-sec">
                <div className="prflPic">
                  <img src={data.photo_url} alt="Profile" />
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
                        <div className="paddedline">
                          <span className="jobdates txtItl">{formatDate(edu.end_date, language)}</span>
                        </div>
                      )}
                      {edu.institution && (
                        <div className="paddedline">
                          <span className="txtBold">{edu.institution}</span>
                        </div>
                      )}
                      {(edu.degree || edu.field_of_study) && (
                        <div className="paddedline">
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
        </div>
      </div>
    </>
  );
}
