import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMlu4({ data, translations, language = 'en', colorHex = '#2b2b2b' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasContact = data.email || data.phone || data.city || data.country;

  return (
    <>
      <style>{`
        .dyn-mlu4 {
          font-family: 'Trebuchet MS', sans-serif;
          color: #242424;
          line-height: 15px;
          font-size: 11px;
          min-height: 792px;
          word-wrap: break-word;
        }

        .dyn-mlu4.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mlu4 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mlu4 ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .dyn-mlu4 ul li {
          position: relative;
          margin: 0;
          padding-left: 8px;
        }

        .dyn-mlu4 ul li::before {
          content: '\\2022';
          font-size: 9px;
          position: absolute;
          left: 0;
          top: 0;
        }

        .dyn-mlu4.rtl ul li {
          padding-left: 0;
          padding-right: 8px;
        }

        .dyn-mlu4.rtl ul li::before {
          left: auto;
          right: 0;
        }

        .dyn-mlu4 .jobline ul {
          margin-top: 10px;
        }

        .dyn-mlu4 .paddedline {
          display: block;
        }

        .dyn-mlu4 .txtBold {
          font-weight: bold;
        }

        .dyn-mlu4 .txtItl {
          font-style: italic;
        }

        /* Parent Container */
        .dyn-mlu4 .parentContainer {
          display: table;
          table-layout: fixed;
          width: 100%;
          min-height: inherit;
        }

        /* Left Box - Dark Sidebar */
        .dyn-mlu4 .left-box {
          background-color: ${colorHex};
          display: table-cell;
          color: #fff;
          padding: 25px;
          width: 174px;
          vertical-align: top;
        }

        .dyn-mlu4 .left-box .section {
          padding: 10px;
          border-bottom: 1px solid #9b9b9b;
        }

        .dyn-mlu4 .left-box .section:first-child {
          padding-top: 0;
        }

        .dyn-mlu4 .left-box .section:last-of-type {
          border: none;
        }

        /* Photo Section */
        .dyn-mlu4 .pict-sec {
          text-align: center;
          padding-bottom: 0;
          margin-bottom: 25px;
          border: none !important;
        }

        .dyn-mlu4 .prflPic,
        .dyn-mlu4 .prflPic img {
          width: 130px;
          height: 167px;
        }

        .dyn-mlu4 .prflPic img {
          object-fit: cover;
          display: block;
          margin: 0 auto;
        }

        /* Right Box */
        .dyn-mlu4 .right-box {
          padding: 25px;
          display: table-cell;
          vertical-align: top;
          letter-spacing: 0.2px;
        }

        /* Name */
        .dyn-mlu4 .name {
          color: #4a4a4a;
          font-weight: bold;
          font-size: 34px;
          line-height: 32px;
          padding: 0 0 10px 0;
          word-wrap: break-word;
        }

        .dyn-mlu4 .resumeTitle {
          color: #4a4a4a;
          font-weight: bold;
          font-size: 18px;
          line-height: 18px;
          margin: 0 0 10px 0;
        }

        /* Section Styling */
        .dyn-mlu4 .section {
          padding-top: 20px;
        }

        .dyn-mlu4 .section:first-child {
          padding-top: 0;
        }

        .dyn-mlu4 .heading {
          font-weight: bold;
          font-size: 14px;
          line-height: 18px;
          margin-bottom: 10px;
          text-transform: uppercase;
        }

        .dyn-mlu4 .sectiontitle {
          word-wrap: break-word;
        }

        .dyn-mlu4 .paragraph {
          margin-top: 10px;
        }

        .dyn-mlu4 .firstparagraph {
          margin-top: 0;
        }

        .dyn-mlu4 .singlecolumn {
          margin-left: 0;
        }

        /* Contact Icons */
        .dyn-mlu4 .adrs-field {
          display: table;
          table-layout: fixed;
          width: 100%;
          margin-bottom: 10px;
          min-height: 14px;
        }

        .dyn-mlu4 .adrs-field:last-child {
          margin-bottom: 0;
        }

        .dyn-mlu4 .adrs-field .circle {
          width: 20px;
          height: 20px;
          display: table-cell;
          vertical-align: middle;
          text-align: center;
        }

        .dyn-mlu4 .adrs-field .circle svg {
          width: 20px;
          height: 20px;
          fill: #fff;
        }

        .dyn-mlu4 .adrs-field .addrCircle {
          display: table-cell;
          padding-left: 11px;
          vertical-align: middle;
        }

        .dyn-mlu4.rtl .adrs-field .addrCircle {
          padding-left: 0;
          padding-right: 11px;
        }

        /* Job Dates */
        .dyn-mlu4 .jobdates {
          font-size: 10px;
          font-style: italic;
        }

        /* Languages */
        .dyn-mlu4 .lang-sec .paragraph {
          padding-bottom: 5px;
          margin-top: 0;
        }

        .dyn-mlu4 .lang-sec .paragraph:last-child {
          padding-bottom: 0;
        }

        .dyn-mlu4 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
          position: relative;
        }

        .dyn-mlu4 .left-box .rating-bar::before {
          content: '';
          width: 100%;
          height: 4px;
          position: absolute;
          z-index: 1;
          opacity: 0.5;
          background-color: ${colorHex};
        }

        .dyn-mlu4 .inner-rating {
          background-color: #d5d6d6;
          height: 4px;
          position: relative;
          z-index: 2;
        }

        .dyn-mlu4 .right-box .inner-rating {
          background-color: ${colorHex};
        }

        /* Separator */
        .dyn-mlu4 .septr::before {
          content: '|';
          font-size: 9px;
          vertical-align: top;
          padding-left: 2px;
          padding-right: 2px;
        }
      `}</style>

      <div className={`dyn-mlu4 ${rtl ? 'rtl' : ''}`}>
        <div className="parentContainer">
          {/* Left Box - Dark Sidebar */}
          <div className="left-box">
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
          </div>

          {/* Right Box */}
          <div className="right-box">
            {/* Name Section */}
            <div className="section">
              {fullName && <div className="name">{fullName}</div>}
              {data.professional_title && (
                <div className="resumeTitle">{data.professional_title}</div>
              )}
            </div>

            {/* Contact Section */}
            {hasContact && (
              <div className="section">
                <div className="address">
                  <div className="singlecolumn">
                    {data.phone && (
                      <div className="adrs-field">
                        <span className="circle">
                          <svg viewBox="0 0 18 18">
                            <circle fill={colorHex} cx="9" cy="9" r="9" />
                            <path d="M8.945125,7.7507875 C8.872625,8.1107875 8.760125,8.4045375 8.598875,8.6507875 C8.426375,8.9095375 8.203875,9.1120375 7.917625,9.2695375 C7.525125,9.4857875 7.097625,9.5945375 6.641375,9.5945375 C6.298875,9.5945375 5.938875,9.5332875 5.562625,9.4120375 C4.803875,9.1670375 4.076375,8.7070375 3.527625,8.3320375 C2.997625,7.9707875 2.511375,7.5182875 2.040125,6.9520375 C1.540125,6.4107875 1.157625,5.8682875 0.868875,5.2957875 C0.568875,4.7032875 0.207625,3.9207875 0.065125,3.1370375 C-0.099875,2.2295375 0.051375,1.4507875 0.515125,0.8207875 C0.708875,0.5570375 0.940125,0.3645375 1.218875,0.2270375 C1.482625,0.0995375 1.788875,0.0257875 2.156375,0.0020375 C2.370125,-0.0117125 2.661375,0.0470375 2.828875,0.4082875 C2.963875,0.6995375 3.106375,0.9945375 3.242625,1.2795375 C3.342625,1.4845375 3.443875,1.6957875 3.542625,1.9057875 C3.606375,2.0407875 3.658875,2.1770375 3.700125,2.3095375 C3.780125,2.5732875 3.707625,2.7895375 3.477625,2.9720375 C3.181375,3.2057875 2.891375,3.4357875 2.616375,3.6695375 C2.605125,3.6795375 2.582625,3.6982875 2.568875,3.7120375 C2.572625,3.7257875 2.581375,3.7532875 2.600125,3.7970375 C2.881375,4.4920375 3.225125,5.0620375 3.647625,5.5370375 L3.653875,5.5445375 C4.071375,6.0257875 4.590125,6.4407875 5.241375,6.8120375 C5.282625,6.8370375 5.307625,6.8482875 5.322625,6.8532875 C5.337625,6.8407875 5.358875,6.8232875 5.370125,6.8132875 C5.637625,6.5695375 5.902625,6.3132875 6.175125,6.0507875 C6.385125,5.8470375 6.610125,5.8020375 6.860125,5.9170375 C6.987625,5.9745375 7.113875,6.0457875 7.240125,6.1257875 C7.433875,6.2520375 7.630125,6.3807875 7.821375,6.5057875 C8.086375,6.6795375 8.358875,6.8582875 8.630125,7.0307875 C8.967625,7.2445375 8.987625,7.5395375 8.945125,7.7507875" fill="#fff" transform="translate(4.5, 4)" />
                          </svg>
                        </span>
                        <span className="addrCircle">{data.phone}</span>
                      </div>
                    )}
                    {data.email && (
                      <div className="adrs-field">
                        <span className="circle">
                          <svg viewBox="0 0 18 18">
                            <circle fill={colorHex} cx="9" cy="9" r="9" />
                            <path d="M4.0425,6.40875 L4.0425,11.95 L6.8125,9.18 L4.0425,6.40875 Z M9.07375,10.46875 L13.54375,6 L4.45375,6 L8.92375,10.46875 C8.965,10.51 9.0325,10.51 9.07375,10.46875 L9.07375,10.46875 Z M9.20125,11.16375 C9.1475,11.21875 9.075,11.2475 8.99875,11.2475 C8.9225,11.2475 8.85125,11.21875 8.7975,11.16375 L7.22375,9.59 L4.47,12.34375 L13.53,12.34375 L10.77625,9.58875 L9.20125,11.16375 Z M13.9575,6.4075 L13.9575,11.94875 L11.18625,9.17875 L13.9575,6.4075 Z" fill="#fff" />
                          </svg>
                        </span>
                        <span className="addrCircle">{data.email}</span>
                      </div>
                    )}
                    {(data.city || data.country) && (
                      <div className="adrs-field">
                        <span className="circle">
                          <svg viewBox="0 0 18 18">
                            <circle fill={colorHex} cx="9" cy="9" r="9" />
                            <path d="M3.7,5.1C2.8,5.1,2,4.4,2,3.5s0.7-1.6,1.6-1.6s1.6,0.7,1.6,1.6S4.6,5.1,3.7,5.1 M3.7,0 C1.6,0,0,1.6,0,3.7c0,0.8,0.6,2.3,1.7,4.2c0.8,1.5,1.7,2.7,1.7,2.7L3.7,11l0.2-0.3c0,0,0.9-1.3,1.7-2.7c1.1-2,1.7-3.4,1.7-4.2 C7.3,1.6,5.7,0,3.7,0" fill="#fff" transform="translate(5, 4)" />
                          </svg>
                        </span>
                        <span className="addrCircle">
                          {data.city && <span>{data.city}</span>}
                          {data.city && data.country && ', '}
                          {data.country && <span>{data.country}</span>}
                        </span>
                      </div>
                    )}
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
                      {exp.job_title && (
                        <span className="paddedline">
                          <span className="txtBold">{exp.job_title}</span>
                        </span>
                      )}
                      {(exp.company || exp.location) && (
                        <span className="paddedline">
                          {exp.company && <span className="txtBold">{exp.company}</span>}
                          {exp.company && exp.location && ' | '}
                          {exp.location && <span>{exp.location}</span>}
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
        </div>
      </div>
    </>
  );
}
