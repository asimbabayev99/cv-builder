import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMli5({ data, translations, language = 'en', colorHex = '#2c5a77' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressParts = [data.city, data.country].filter(Boolean);
  const hasContact = data.email || data.phone || addressParts.length > 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Saira:300,400,500,600,700,900');

        .dyn-mli5 {
          font-family: 'Saira', sans-serif;
          color: #46464e;
          line-height: 14px;
          font-size: 10px;
          min-height: 792px;
          word-wrap: break-word;
        }

        .dyn-mli5.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mli5 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mli5 ul {
          list-style: none;
          margin: 0 0 0 8px;
          padding: 0;
        }

        .dyn-mli5.rtl ul {
          margin: 0 8px 0 0;
        }

        .dyn-mli5 ul li {
          position: relative;
          margin: 0;
          padding-bottom: 3px;
        }

        .dyn-mli5 ul li:last-child {
          padding-bottom: 0;
        }

        .dyn-mli5 ul li::before {
          content: '\\2022';
          position: absolute;
          left: -8px;
          top: 0;
        }

        .dyn-mli5.rtl ul li::before {
          left: auto;
          right: -8px;
        }

        .dyn-mli5 .txt-bold {
          font-weight: 600;
        }

        .dyn-mli5 .paddedline {
          display: block;
        }

        .dyn-mli5 .pb5 {
          padding-bottom: 5px;
        }

        /* Parent Container */
        .dyn-mli5 .parentContainer {
          display: table;
          table-layout: fixed;
          width: 100%;
          min-height: 792px;
        }

        /* Left Box */
        .dyn-mli5 .left-box {
          padding: 30px 20px 30px 35px;
          display: table-cell;
          vertical-align: top;
          letter-spacing: 0.2px;
        }

        .dyn-mli5.rtl .left-box {
          padding: 30px 35px 30px 20px;
        }

        /* Right Box */
        .dyn-mli5 .right-box {
          background-color: ${colorHex};
          display: table-cell;
          color: #fff;
          padding: 40px 35px 30px 20px;
          width: 169px;
          vertical-align: top;
        }

        .dyn-mli5.rtl .right-box {
          padding: 40px 20px 30px 35px;
        }

        /* Name Section */
        .dyn-mli5 .name {
          color: ${colorHex};
          font-weight: 900;
          padding: 0 0 10px 0;
          text-align: left;
          position: relative;
          letter-spacing: 0.9px;
          text-transform: uppercase;
          font-size: 36px;
          line-height: 34px;
        }

        .dyn-mli5.rtl .name {
          text-align: right;
        }

        .dyn-mli5 .resumeTitle {
          color: #4a4a4a;
          font-weight: 600;
          font-size: 18px;
          line-height: 18px;
          margin: 0 0 10px 0;
        }

        /* Section Styling */
        .dyn-mli5 .section {
          margin-bottom: 25px;
        }

        .dyn-mli5 .section:last-child {
          margin-bottom: 0;
        }

        .dyn-mli5 .left-box .section:first-child {
          border-bottom: 1px solid ${colorHex};
          padding-bottom: 0;
          margin-bottom: 30px;
        }

        /* Heading */
        .dyn-mli5 .heading {
          line-height: 15px;
          margin-bottom: 10px;
          font-size: 14px;
        }

        .dyn-mli5 .sectiontitle {
          display: block;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid ${colorHex};
        }

        .dyn-mli5 .left-box .sectiontitle {
          color: ${colorHex};
        }

        .dyn-mli5 .right-box .sectiontitle {
          border-bottom-color: #fff;
          margin-left: -20px;
          padding-left: 20px;
        }

        .dyn-mli5.rtl .right-box .sectiontitle {
          margin-left: 0;
          margin-right: -20px;
          padding-left: 0;
          padding-right: 20px;
        }

        /* Paragraph */
        .dyn-mli5 .paragraph {
          margin-top: 15px;
        }

        .dyn-mli5 .firstparagraph {
          margin-top: 0;
        }

        /* Experience Styling */
        .dyn-mli5 .left-box .experience .paddedline,
        .dyn-mli5 .left-box .education .paddedline {
          color: #000;
        }

        .dyn-mli5 .jobdates,
        .dyn-mli5 .companyname {
          font-weight: 500;
        }

        .dyn-mli5 .jobcity {
          font-weight: 400;
        }

        .dyn-mli5 .education .jobcity {
          font-weight: 300;
        }

        .dyn-mli5 .jobline ul {
          margin-top: 5px;
        }

        /* Address Section with Icons */
        .dyn-mli5 .address {
          text-align: left;
        }

        .dyn-mli5.rtl .address {
          text-align: right;
        }

        .dyn-mli5 .adrs-field {
          display: table;
          table-layout: fixed;
          width: 100%;
          margin-bottom: 10px;
          min-height: 14px;
        }

        .dyn-mli5 .adrs-field:last-child {
          margin-bottom: 0;
        }

        .dyn-mli5 .adrs-field .circle {
          border-radius: 100%;
          height: 17px;
          width: 18px;
          display: table-cell;
          vertical-align: middle;
          text-align: center;
          font-size: 9px;
        }

        .dyn-mli5 .adrs-field svg {
          height: 17px;
          width: 18px;
          vertical-align: middle;
        }

        .dyn-mli5 .adrs-field svg .fillclr {
          fill: ${colorHex};
        }

        .dyn-mli5 .address .addrCircle {
          display: table-cell;
          vertical-align: middle;
          padding-left: 10px;
          max-width: 166px;
        }

        .dyn-mli5.rtl .address .addrCircle {
          padding-left: 0;
          padding-right: 10px;
        }

        /* Rating Bar for Languages */
        .dyn-mli5 .rating-bar {
          background: rgba(255, 255, 255, 0.25);
          width: 100%;
          clear: both;
          margin-top: 3px;
          position: relative;
          overflow: hidden;
        }

        .dyn-mli5 .inner-rating {
          background: #fff;
          height: 4px;
          position: relative;
        }

        /* Sliced Rect Tiles */
        .dyn-mli5 .sliced-rect {
          height: 6px;
          width: 100%;
          line-height: 0;
          margin-top: 3px;
          clear: both;
          display: flex;
        }

        .dyn-mli5 .sliced-rect-tile {
          height: 100%;
          background: rgba(255, 255, 255, 0.25);
          flex: 1;
          margin-right: 3px;
        }

        .dyn-mli5 .sliced-rect-tile:last-child {
          margin-right: 0;
        }

        .dyn-mli5.rtl .sliced-rect-tile {
          margin-right: 0;
          margin-left: 3px;
        }

        .dyn-mli5.rtl .sliced-rect-tile:last-child {
          margin-left: 0;
        }

        .dyn-mli5 .sliced-rect-tile.filled {
          background: #fff;
        }

        .dyn-mli5 .right-box .skill-item {
          margin-bottom: 5px;
        }

        .dyn-mli5 .right-box .skill-item:last-child {
          margin-bottom: 0;
        }
      `}</style>

      <div className={`dyn-mli5 ${rtl ? 'rtl' : ''}`}>
        <div className="parentContainer">
          {/* Left Column - Name, Summary, Experience, Education */}
          <div className="left-box">
            {/* Name Section */}
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
              <div className="section experience">
                <div className="heading">
                  <div className="sectiontitle">{translations.work_history}</div>
                </div>
                {data.experiences.map((exp, index) => (
                  <div key={exp.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <span className="paddedline">
                      <span className="txt-bold">{exp.job_title}</span>
                      {exp.job_title && (exp.start_date || exp.end_date) && ', '}
                      {exp.start_date && formatDate(exp.start_date, language)}
                      {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                      {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                    </span>
                    {(exp.company || exp.location) && (
                      <span className="paddedline">
                        <span className="companyname">{exp.company}</span>
                        {exp.company && exp.location && ', '}
                        <span className="jobcity">{exp.location}</span>
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
                ))}
              </div>
            )}

            {/* Education Section */}
            {data.educations && data.educations.length > 0 && (
              <div className="section education">
                <div className="heading">
                  <div className="sectiontitle">{translations.education}</div>
                </div>
                {data.educations.map((edu, index) => (
                  <div key={edu.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="paddedline txt-bold">
                      <span className="degree">{edu.degree}</span>
                      {edu.degree && edu.field_of_study && ', '}
                      <span className="programline">{edu.field_of_study}</span>
                      {(edu.degree || edu.field_of_study) && edu.end_date && ', '}
                      {edu.end_date && formatDate(edu.end_date, language)}
                    </div>
                    {edu.institution && (
                      <div className="paddedline">
                        <span className="companyname">{edu.institution}</span>
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
                    <div className="paddedline txt-bold">{cert.name}</div>
                    {cert.organization && <div className="paddedline">{cert.organization}</div>}
                    {cert.issue_date && <div className="paddedline">{formatDate(cert.issue_date, language)}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Contact, Skills, Languages */}
          <div className="right-box">
            {/* Contact Section with Icons */}
            {hasContact && (
              <div className="section">
                <div className="address">
                  <div className="singlecolumn">
                    {/* Address */}
                    {addressParts.length > 0 && (
                      <div className="adrs-field">
                        <span className="circle">
                          <svg x="0px" y="0px" viewBox="-0.5 -0.5 19 19">
                            <circle fill="#FFFFFF" cx="9" cy="9" r="9"></circle>
                            <g className="fillclr" transform="translate(5.000000, 4.000000)">
                              <path d="M3.7,5.1C2.8,5.1,2,4.4,2,3.5s0.7-1.6,1.6-1.6s1.6,0.7,1.6,1.6S4.6,5.1,3.7,5.1 M3.7,0
                                C1.6,0,0,1.6,0,3.7c0,0.8,0.6,2.3,1.7,4.2c0.8,1.5,1.7,2.7,1.7,2.7L3.7,11l0.2-0.3c0,0,0.9-1.3,1.7-2.7c1.1-2,1.7-3.4,1.7-4.2
                                C7.3,1.6,5.7,0,3.7,0"></path>
                            </g>
                          </svg>
                        </span>
                        <span className="addrCircle">
                          <span className="wrap">{addressParts.join(', ')}</span>
                        </span>
                      </div>
                    )}

                    {/* Phone */}
                    {data.phone && (
                      <div className="adrs-field">
                        <span className="circle">
                          <svg viewBox="-0.5 -0.5 19 19">
                            <circle fill="#FFFFFF" cx="9" cy="9" r="9"></circle>
                            <g className="fillclr" transform="translate(4.500000, 4.000000)">
                              <path d="M8.945125,7.7507875 C8.872625,8.1107875 8.760125,8.4045375 8.598875,8.6507875 C8.426375,8.9095375 8.203875,9.1120375 7.917625,9.2695375 C7.525125,9.4857875 7.097625,9.5945375 6.641375,9.5945375 C6.298875,9.5945375 5.938875,9.5332875 5.562625,9.4120375 C4.803875,9.1670375 4.076375,8.7070375 3.527625,8.3320375 C2.997625,7.9707875 2.511375,7.5182875 2.040125,6.9520375 C1.540125,6.4107875 1.157625,5.8682875 0.868875,5.2957875 C0.568875,4.7032875 0.207625,3.9207875 0.065125,3.1370375 C-0.099875,2.2295375 0.051375,1.4507875 0.515125,0.8207875 C0.708875,0.5570375 0.940125,0.3645375 1.218875,0.2270375 C1.482625,0.0995375 1.788875,0.0257875 2.156375,0.0020375 C2.370125,-0.0117125 2.661375,0.0470375 2.828875,0.4082875 C2.963875,0.6995375 3.106375,0.9945375 3.242625,1.2795375 C3.342625,1.4845375 3.443875,1.6957875 3.542625,1.9057875 C3.606375,2.0407875 3.658875,2.1770375 3.700125,2.3095375 C3.780125,2.5732875 3.707625,2.7895375 3.477625,2.9720375 C3.181375,3.2057875 2.891375,3.4357875 2.616375,3.6695375 C2.605125,3.6795375 2.582625,3.6982875 2.568875,3.7120375 C2.572625,3.7257875 2.581375,3.7532875 2.600125,3.7970375 C2.881375,4.4920375 3.225125,5.0620375 3.647625,5.5370375 L3.653875,5.5445375 C4.071375,6.0257875 4.590125,6.4407875 5.241375,6.8120375 C5.282625,6.8370375 5.307625,6.8482875 5.322625,6.8532875 C5.337625,6.8407875 5.358875,6.8232875 5.370125,6.8132875 C5.637625,6.5695375 5.902625,6.3132875 6.175125,6.0507875 C6.385125,5.8470375 6.610125,5.8020375 6.860125,5.9170375 C6.987625,5.9745375 7.113875,6.0457875 7.240125,6.1257875 C7.433875,6.2520375 7.630125,6.3807875 7.821375,6.5057875 C8.086375,6.6795375 8.358875,6.8582875 8.630125,7.0307875 C8.967625,7.2445375 8.987625,7.5395375 8.945125,7.7507875"></path>
                            </g>
                          </svg>
                        </span>
                        <span className="addrCircle">
                          <span className="wrap">{data.phone}</span>
                        </span>
                      </div>
                    )}

                    {/* Email */}
                    {data.email && (
                      <div className="adrs-field">
                        <span className="circle">
                          <svg viewBox="-0.5 -0.5 19 19">
                            <circle fill="#FFFFFF" cx="9" cy="9" r="9"></circle>
                            <path className="fillclr" d="M4.0425,6.40875 L4.0425,11.95 L6.8125,9.18 L4.0425,6.40875 Z M9.07375,10.46875 L13.54375,6 L4.45375,6 L8.92375,10.46875 C8.965,10.51 9.0325,10.51 9.07375,10.46875 L9.07375,10.46875 Z M9.20125,11.16375 C9.1475,11.21875 9.075,11.2475 8.99875,11.2475 C8.9225,11.2475 8.85125,11.21875 8.7975,11.16375 L7.22375,9.59 L4.47,12.34375 L13.53,12.34375 L10.77625,9.58875 L9.20125,11.16375 Z M13.9575,6.4075 L13.9575,11.94875 L11.18625,9.17875 L13.9575,6.4075 Z"></path>
                          </svg>
                        </span>
                        <span className="addrCircle">
                          <span className="wrap">{data.email}</span>
                        </span>
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
                  <div key={lang.id || index} className={`paragraph skill-item ${index === 0 ? 'firstparagraph' : ''}`}>
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
        </div>
      </div>
    </>
  );
}
