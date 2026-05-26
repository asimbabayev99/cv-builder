import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMls9({ data, translations, language = 'en', colorHex = '#102A73' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const location = [data.city, data.country].filter(Boolean).join(', ');
  const hasContact = data.email || data.phone || data.city || data.country || data.website || data.driving_license || data.nationality || data.linkedin;

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
          background-color: #000;
          height: 4px;
        }

        /* Icon Row Styles */
        .dyn-mls9 .iconRow {
          display: table;
          table-layout: fixed;
          width: 100%;
          margin-bottom: 5px;
          word-wrap: break-word;
        }

        .dyn-mls9 .iconRow:last-child {
          margin-bottom: 0;
        }

        .dyn-mls9 .iconSvg {
          width: 8px;
          height: 8px;
          display: table-cell;
          vertical-align: middle;
        }

        .dyn-mls9 .iconSvg svg {
          vertical-align: middle;
          fill: #1A1A1A;
          width: 8px;
          height: 8px;
        }

        .dyn-mls9 .icoTxt {
          display: table-cell;
          padding-left: 11px;
        }

        .dyn-mls9.rtl .icoTxt {
          padding-left: 0;
          padding-right: 11px;
        }

        .dyn-mls9 .iconRow.phone .iconSvg svg {
          transform: scale(1.4);
        }

        .dyn-mls9 .iconRow.social svg {
          transform: scale(1.8);
          fill: #34383C;
        }

        .dyn-mls9 .brk-all {
          word-break: break-all;
        }

        .dyn-mls9 .lang-space {
          margin-bottom: 6px;
        }

        .dyn-mls9 .lang-scale {
          margin-top: 3px;
        }

        .dyn-mls9 .lang-scale .small-size {
          font-size: 8px;
          line-height: 10px;
          color: #000;
        }
      `}</style>

      <div className={`dyn-mls9 ${rtl ? 'rtl' : ''}`}>
        {/* Top Section */}
        <div className="topsection">
          <div className="left-box">
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
                  {/* Email */}
                  {data.email && (
                    <div className="iconRow">
                      <div className="iconSvg">
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 4.5C4.25 4.5 4.51562 4.42188 4.73438 4.25L8 1.71875V5.25C8 5.67188 7.65625 6 7.25 6H0.75C0.328125 6 0 5.67188 0 5.25V1.71875L3.25 4.25C3.46875 4.42188 3.73438 4.5 4 4.5ZM0.25 1.28125C0.09375 1.15625 0 0.953125 0 0.75C0 0.34375 0.328125 0 0.75 0H7.25C7.65625 0 8 0.34375 8 0.75C8 0.953125 7.89062 1.15625 7.73438 1.28125L4.42188 3.85938C4.17188 4.04688 3.8125 4.04688 3.5625 3.85938L0.25 1.28125Z" fill="#1A1A1A" />
                        </svg>
                      </div>
                      <div className="icoTxt">{data.email}</div>
                    </div>
                  )}

                  {/* Phone */}
                  {data.phone && (
                    <div className="iconRow phone">
                      <div className="iconSvg">
                        <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.98438 7.04688L7.60938 8.625C7.5625 8.85938 7.375 9.01562 7.14062 9.01562C3.20312 9 0 5.79688 0 1.85938C0 1.625 0.140625 1.4375 0.375 1.39062L1.95312 1.01562C2.17188 0.96875 2.40625 1.09375 2.5 1.29688L3.23438 3C3.3125 3.20312 3.26562 3.4375 3.09375 3.5625L2.25 4.25C2.78125 5.32812 3.65625 6.20312 4.75 6.73438L5.4375 5.89062C5.5625 5.73438 5.79688 5.67188 6 5.75L7.70312 6.48438C7.90625 6.59375 8.03125 6.82812 7.98438 7.04688Z" fill="#1A1A1A" />
                        </svg>
                      </div>
                      <div className="icoTxt">{data.phone}</div>
                    </div>
                  )}

                  {/* Address */}
                  {location && (
                    <div className="iconRow">
                      <div className="iconSvg">
                        <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 2.25C5 3.5 3.98438 4.5 2.75 4.5C1.5 4.5 0.5 3.5 0.5 2.25C0.5 1.01562 1.5 0 2.75 0C3.98438 0 5 1.01562 5 2.25ZM3 1C3 0.875 2.875 0.75 2.75 0.75C1.90625 0.75 1.25 1.42188 1.25 2.25C1.25 2.39062 1.35938 2.5 1.5 2.5C1.625 2.5 1.75 2.39062 1.75 2.25C1.75 1.70312 2.1875 1.25 2.75 1.25C2.875 1.25 3 1.14062 3 1ZM2.25 7.5V4.96875C2.40625 4.98438 2.57812 5 2.75 5C2.90625 5 3.07812 4.98438 3.25 4.96875V7.5C3.25 7.78125 3.01562 8 2.75 8C2.46875 8 2.25 7.78125 2.25 7.5Z" fill="#1A1A1A" />
                        </svg>
                      </div>
                      <div className="icoTxt">{location}</div>
                    </div>
                  )}

                  {/* Website */}
                  {data.website && (
                    <div className="iconRow">
                      <div className="iconSvg">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.5 4C5.5 4.35938 5.46875 4.6875 5.4375 5H2.54688C2.51562 4.6875 2.48438 4.35938 2.48438 4C2.48438 3.65625 2.51562 3.32812 2.54688 3H5.4375C5.46875 3.32812 5.5 3.65625 5.5 4ZM7.85938 3C7.95312 3.32812 8 3.65625 8 4C8 4.35938 7.95312 4.6875 7.85938 5H5.9375C5.96875 4.6875 6 4.34375 6 4C6 3.65625 5.96875 3.32812 5.9375 3H7.85938ZM7.70312 2.5H5.875C5.71875 1.51562 5.40625 0.671875 5.01562 0.140625C6.23438 0.46875 7.23438 1.34375 7.70312 2.5ZM5.375 2.5H2.60938C2.70312 1.9375 2.85938 1.4375 3.03125 1.03125C3.20312 0.65625 3.375 0.390625 3.5625 0.21875C3.73438 0.0625 3.875 0 4 0C4.10938 0 4.25 0.0625 4.42188 0.21875C4.60938 0.390625 4.78125 0.65625 4.95312 1.03125C5.125 1.4375 5.28125 1.9375 5.375 2.5ZM0.28125 2.5C0.75 1.34375 1.75 0.46875 2.96875 0.140625C2.57812 0.671875 2.26562 1.51562 2.10938 2.5H0.28125ZM2.04688 3C2.01562 3.32812 1.98438 3.65625 1.98438 4C1.98438 4.34375 2.01562 4.6875 2.04688 5H0.125C0.03125 4.6875 0 4.35938 0 4C0 3.65625 0.03125 3.32812 0.125 3H2.04688ZM3.03125 6.98438C2.85938 6.57812 2.70312 6.07812 2.60938 5.5H5.375C5.28125 6.07812 5.125 6.57812 4.95312 6.98438C4.78125 7.35938 4.60938 7.625 4.42188 7.79688C4.25 7.95312 4.10938 8 3.98438 8C3.875 8 3.73438 7.95312 3.5625 7.79688C3.375 7.625 3.20312 7.35938 3.03125 6.98438ZM2.96875 7.875C1.75 7.54688 0.75 6.67188 0.28125 5.5H2.10938C2.26562 6.5 2.57812 7.34375 2.96875 7.875ZM5.01562 7.875C5.40625 7.34375 5.71875 6.5 5.875 5.5H7.70312C7.23438 6.67188 6.23438 7.54688 5.01562 7.875Z" fill="#1A1A1A" />
                        </svg>
                      </div>
                      <div className="icoTxt brk-all">{data.website}</div>
                    </div>
                  )}

                  {/* Driving License */}
                  {data.driving_license && (
                    <div className="iconRow">
                      <div className="iconSvg">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.609375 3.07812L1.15625 1.51562C1.375 0.90625 1.9375 0.5 2.57812 0.5H5.40625C6.04688 0.5 6.60938 0.90625 6.82812 1.51562L7.375 3.07812C7.73438 3.23438 8 3.59375 8 4V7C8 7.28125 7.76562 7.5 7.5 7.5H7C6.71875 7.5 6.5 7.28125 6.5 7V6.25H1.5V7C1.5 7.28125 1.26562 7.5 1 7.5H0.5C0.21875 7.5 0 7.28125 0 7V4C0 3.59375 0.25 3.23438 0.609375 3.07812ZM1.70312 3H6.28125L5.875 1.84375C5.8125 1.64062 5.625 1.5 5.40625 1.5H2.57812C2.35938 1.5 2.17188 1.64062 2.10938 1.84375L1.70312 3ZM1.5 4C1.21875 4 1 4.23438 1 4.5C1 4.78125 1.21875 5 1.5 5C1.76562 5 2 4.78125 2 4.5C2 4.23438 1.76562 4 1.5 4ZM6.5 5C6.76562 5 7 4.78125 7 4.5C7 4.23438 6.76562 4 6.5 4C6.21875 4 6 4.23438 6 4.5C6 4.78125 6.21875 5 6.5 5Z" fill="#1A1A1A" />
                        </svg>
                      </div>
                      <div className="icoTxt">{data.driving_license}</div>
                    </div>
                  )}

                  {/* Nationality */}
                  {data.nationality && (
                    <div className="iconRow">
                      <div className="iconSvg">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 7.75V0.5C1 0.234375 0.765625 0 0.5 0C0.21875 0 0 0.234375 0 0.5V7.75C0 7.89062 0.109375 8 0.25 8H0.75C0.875 8 1 7.89062 1 7.75ZM7.4375 0C7.73438 0 8 0.1875 8 0.484375V5.20312C8 5.39062 7.875 5.5625 7.65625 5.64062C6.98438 5.90625 6.42188 6 5.92188 6C4.76562 6 3.96875 5.51562 2.8125 5.51562C2.42188 5.51562 2 5.57812 1.5 5.73438V0.25C2.04688 0.078125 2.5 0.015625 2.89062 0.015625C3.96875 0.015625 4.51562 0.515625 5.45312 0.515625C5.89062 0.515625 6.42188 0.40625 7.125 0.078125C7.23438 0.03125 7.32812 0 7.4375 0Z" fill="#1A1A1A" />
                        </svg>
                      </div>
                      <div className="icoTxt">{data.nationality}</div>
                    </div>
                  )}

                  {/* LinkedIn */}
                  {data.linkedin && (
                    <div className="iconRow social">
                      <div className="iconSvg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 30 30">
                          <path d="M10.7,8.6c0,1.2-1,2.1-2,2.1s-2.1-1-2.1-2.1,1-2.1,2.1-2.1,2,1,2,2.1ZM10.3,12.1h-3.4v11.3h3.5v-11.3s-.1,0,0,0ZM16,12.1h-3.4v11.3h3.4v-5.9c0-1.6.7-2.5,2.1-2.5s1.9,1,1.9,2.5v5.9h3.5v-7.1c0-3-1.7-4.5-4.1-4.5s-3.4,1.9-3.4,1.9v-1.7h0Z" fill="#34383C" />
                        </svg>
                      </div>
                      <div className="icoTxt">{data.linkedin}</div>
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

            {/* Languages Section */}
            {data.languages && data.languages.length > 0 && (
              <div className="section lang-sec">
                <div className="heading">
                  <div className="sectiontitle">{translations.languages}</div>
                </div>
                {data.languages.map((lang, index) => (
                  <div key={lang.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="lang-space">{lang.name}</div>
                    <div className="rating-bar">
                      <div className="inner-rating" style={{ width: `${(lang.level || 3) * 20}%` }} />
                    </div>
                    <div className="lang-scale">
                      <span className="small-size">{lang.proficiency}</span>
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
