import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMlv4({ data, translations, language = 'en', colorHex = '#F98C79' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasContact = data.email || data.phone || data.city || data.country;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800');

        .dyn-mlv4 {
          font-family: Arial, sans-serif;
          color: #5D5D5D;
          line-height: 12px;
          font-size: 10px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 30px;
        }

        .dyn-mlv4.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mlv4 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mlv4 ul {
          list-style: none;
          margin: 0 0 0 5px;
          padding: 0;
        }

        .dyn-mlv4 ul li {
          position: relative;
          margin: 0 0 10px 0;
          padding-left: 10px;
        }

        .dyn-mlv4 li::before {
          content: '\\2022';
          display: inline-block;
          width: 2px;
          left: -3px;
          position: absolute;
          color: #5F5F5F;
        }

        .dyn-mlv4.rtl ul li {
          padding-left: 0;
          padding-right: 10px;
        }

        .dyn-mlv4.rtl li::before {
          left: auto;
          right: -3px;
        }

        .dyn-mlv4 .paddedline {
          display: block;
        }

        .dyn-mlv4 .txtBold {
          font-weight: bold;
        }

        .dyn-mlv4 .dispBlk {
          display: block;
        }

        /* Top Section */
        .dyn-mlv4 .top-section {
          display: flex;
          margin-bottom: 20px;
        }

        /* Left Box */
        .dyn-mlv4 .left-box {
          padding-right: 30px;
          width: calc(100% - 343px);
          position: relative;
        }

        .dyn-mlv4.rtl .left-box {
          padding-right: 0;
          padding-left: 30px;
        }

        .dyn-mlv4 .left-box::before {
          content: '';
          position: absolute;
          width: 1px;
          top: 186px;
          height: calc(100% - 186px);
          background: #707070;
          right: 0;
        }

        .dyn-mlv4.rtl .left-box::before {
          right: auto;
          left: 0;
        }

        /* Right Box */
        .dyn-mlv4 .right-box {
          padding-left: 30px;
          width: 343px;
        }

        .dyn-mlv4.rtl .right-box {
          padding-left: 0;
          padding-right: 30px;
        }

        /* Photo */
        .dyn-mlv4 .pict-sec {
          padding-right: 93px;
          margin-bottom: 40px;
        }

        .dyn-mlv4.rtl .pict-sec {
          padding-right: 0;
          padding-left: 93px;
        }

        .dyn-mlv4 .prfl-pic .field {
          width: 146px;
          height: 146px;
          border-radius: 50%;
          background-color: ${colorHex};
        }

        .dyn-mlv4 .prfl-pic img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        /* Name */
        .dyn-mlv4 .name {
          font-family: 'Montserrat', sans-serif;
          font-size: 41px;
          line-height: 40px;
          font-weight: bold;
          text-transform: uppercase;
          color: ${colorHex};
          padding-bottom: 5px;
        }

        .dyn-mlv4 .name span {
          display: block;
        }

        .dyn-mlv4 .prof-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          line-height: 13px;
          letter-spacing: 0.81px;
          text-transform: uppercase;
          color: #5F5F5F;
          font-weight: 800;
          padding-bottom: 10px;
        }

        /* Contact */
        .dyn-mlv4 .address {
          color: #5F5F5F;
          word-break: break-word;
          line-height: 14px;
        }

        .dyn-mlv4 .mb-10 {
          margin-bottom: 10px;
          font-weight: 600;
        }

        /* Section Styling */
        .dyn-mlv4 .section {
          margin-bottom: 20px;
        }

        .dyn-mlv4 .heading {
          margin-bottom: 10px;
        }

        .dyn-mlv4 .sectiontitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          line-height: 13px;
          letter-spacing: 0.81px;
          text-transform: uppercase;
          background: #747674;
          color: #fff;
          font-weight: 800;
          padding: 7px 10px;
        }

        .dyn-mlv4 .paragraph {
          margin-top: 10px;
        }

        .dyn-mlv4 .firstparagraph {
          margin-top: 0;
        }

        .dyn-mlv4 .singlecolumn {
          margin-left: 0;
        }

        /* Experience */
        .dyn-mlv4 .experience .paragraph {
          position: relative;
        }

        .dyn-mlv4 .experience .paragraph::before {
          content: '';
          position: absolute;
          top: 6px;
          left: -37px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #fff;
          border: 1px solid #707070;
        }

        .dyn-mlv4.rtl .experience .paragraph::before {
          left: auto;
          right: -37px;
        }

        .dyn-mlv4 .experience::before {
          content: '';
          position: absolute;
          width: 1px;
          top: 0;
          height: 100%;
          background: #707070;
          left: -31px;
        }

        .dyn-mlv4.rtl .experience::before {
          left: auto;
          right: -31px;
        }

        .dyn-mlv4 .jobtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          line-height: 14px;
          font-weight: 600;
          text-transform: uppercase;
          color: ${colorHex};
          padding-bottom: 3px;
        }

        .dyn-mlv4 .job-position {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          font-size: 9px;
          padding-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 0.04px;
          color: #5F5F5F;
        }

        .dyn-mlv4 .job-details {
          width: 57%;
        }

        .dyn-mlv4 .job-date {
          text-align: right;
          width: 43%;
        }

        /* Education */
        .dyn-mlv4 .school {
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          line-height: 14px;
          font-weight: 600;
          text-transform: uppercase;
          color: ${colorHex};
          padding-bottom: 3px;
        }

        .dyn-mlv4 .school-place,
        .dyn-mlv4 .school-date {
          text-transform: uppercase;
          font-size: 9px;
          padding-bottom: 5px;
          color: #5F5F5F;
        }

        .dyn-mlv4 .degree {
          font-size: 9px;
          padding-bottom: 5px;
        }

        /* Skills */
        .dyn-mlv4 .skill ul li {
          margin-bottom: 10px;
          line-height: 13px;
        }

        /* Languages */
        .dyn-mlv4 .lang-sec .paragraph {
          padding-bottom: 10px;
          margin-top: 0;
        }

        .dyn-mlv4 .lang-sec .paragraph:last-child {
          padding-bottom: 0;
        }

        .dyn-mlv4 .rating-bar {
          background: #D8D8D8;
          width: 100%;
          clear: both;
          margin-top: 3px;
          margin-bottom: 3px;
          border-radius: 5px;
        }

        .dyn-mlv4 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
          border-radius: 5px;
        }

        .dyn-mlv4 .lang-space {
          margin-bottom: 5px;
        }
      `}</style>

      <div className={`dyn-mlv4 ${rtl ? 'rtl' : ''}`}>
        {/* Top Section */}
        <div className="top-section">
          {/* Left Box */}
          <div className="left-box">
            {/* Photo Section */}
            {data.photo_url && (
              <div className="section pict-sec">
                <div className="prfl-pic">
                  <div className="field">
                    <img src={data.photo_url} alt="Profile" />
                  </div>
                </div>
              </div>
            )}

            {/* Contact Section */}
            {hasContact && (
              <div className="section">
                <div className="address">
                  {data.phone && <div className="mb-10">{data.phone}</div>}
                  {data.email && <div className="mb-10">{data.email}</div>}
                  {(data.city || data.country) && (
                    <div className="mb-10">
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
                  <div className="singlecolumn skill">
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
                        <span className="paddedline school">{edu.institution}</span>
                      )}
                      {edu.end_date && (
                        <span className="dispBlk school-date">{formatDate(edu.end_date, language)}</span>
                      )}
                      {(edu.degree || edu.field_of_study) && (
                        <span className="paddedline degree">
                          {edu.degree && <span>{edu.degree}</span>}
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

          {/* Right Box */}
          <div className="right-box">
            {/* Name Section */}
            <div className="section name-sec">
              {fullName && (
                <div className="name">
                  {data.first_name && <span>{data.first_name}</span>}
                  {data.last_name && <span>{data.last_name}</span>}
                </div>
              )}
              {data.professional_title && (
                <div className="prof-title">{data.professional_title}</div>
              )}
            </div>

            {/* Summary Section */}
            {data.summary && (
              <div className="section summary">
                <div className="paragraph firstparagraph">
                  <div className="singlecolumn">
                    <p>{data.summary}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Work Experience Section */}
            {data.experiences && data.experiences.length > 0 && (
              <div className="section experience">
                <div className="heading">
                  <div className="sectiontitle">{translations.work_history}</div>
                </div>
                {data.experiences.map((exp, index) => (
                  <div key={exp.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="singlecolumn">
                      {exp.job_title && (
                        <span className="jobtitle txtBold dispBlk">{exp.job_title}</span>
                      )}
                      <div className="job-position">
                        <div className="job-details">
                          {exp.company && <span>{exp.company}</span>}
                          {exp.company && exp.location && ' | '}
                          {exp.location && <span>{exp.location}</span>}
                        </div>
                        <div className="job-date">
                          {exp.start_date && formatDate(exp.start_date, language)}
                          {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                          {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                        </div>
                      </div>
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
