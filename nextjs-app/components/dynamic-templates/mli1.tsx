import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMli1({ data, translations, language = 'en', colorHex = '#496267' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const addressParts = [data.city, data.country].filter(Boolean);
  const hasContact = data.email || data.phone || addressParts.length > 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Blinker:400,700');

        .dyn-mli1 {
          color: #46464e;
          line-height: 16px;
          font-variant-ligatures: none;
          min-height: 792px;
          word-wrap: break-word;
          font-family: Blinker, sans-serif;
          font-size: 10px;
        }

        .dyn-mli1.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mli1 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mli1 .parent-container {
          display: table;
          table-layout: fixed;
          width: 100%;
          min-height: inherit;
        }

        .dyn-mli1 .left-box {
          background-color: ${colorHex};
          display: table-cell;
          vertical-align: top;
          color: #fff;
          padding: 25px 20px 25px 35px;
          width: 169px;
        }

        .dyn-mli1.rtl .left-box {
          padding: 25px 35px 25px 20px;
        }

        .dyn-mli1 .right-box {
          padding: 25px 35px 25px 20px;
          display: table-cell;
          vertical-align: top;
          letter-spacing: 0.2px;
        }

        .dyn-mli1.rtl .right-box {
          padding: 25px 20px 25px 35px;
        }

        .dyn-mli1 .section {
          margin-bottom: 25px;
        }

        .dyn-mli1 .left-box .section {
          border-top: 1px solid #fff;
          padding-top: 15px;
        }

        .dyn-mli1 .left-box .section:first-child {
          border-top: none;
          padding-top: 0;
        }

        .dyn-mli1 .right-box .section {
          border-top: 1px solid #000;
          padding-top: 15px;
        }

        .dyn-mli1 .right-box .section:first-child {
          border-top: none;
          border-bottom: 5px solid #000;
          padding-bottom: 10px;
          margin-bottom: 30px;
        }

        .dyn-mli1 .section-title {
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 14px;
          line-height: 17px;
          margin-bottom: 10px;
        }

        .dyn-mli1 .name {
          color: ${colorHex};
          font-weight: bold;
          font-size: 36px;
          line-height: 35px;
          letter-spacing: 0.5px;
        }

        .dyn-mli1 .profile-pic {
          text-align: center;
          margin-bottom: 25px;
        }

        .dyn-mli1 .profile-pic img {
          width: 139px;
          height: 139px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid #fff;
        }

        .dyn-mli1 .icon-row {
          display: flex;
          align-items: flex-start;
          margin-bottom: 5px;
          word-wrap: break-word;
        }

        .dyn-mli1 .icon-svg {
          width: 12px;
          height: 12px;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .dyn-mli1 .icon-svg svg {
          fill: #fff;
          width: 12px;
          height: 12px;
        }

        .dyn-mli1 .icon-text {
          padding-left: 10px;
          flex: 1;
        }

        .dyn-mli1.rtl .icon-text {
          padding-left: 0;
          padding-right: 10px;
        }

        .dyn-mli1 ul {
          list-style: none;
          margin: 0 0 0 8px;
          padding: 0;
        }

        .dyn-mli1.rtl ul {
          margin: 0 8px 0 0;
        }

        .dyn-mli1 ul li {
          position: relative;
          margin: 0;
          padding-left: 0;
        }

        .dyn-mli1 ul li::before {
          content: '\\2022';
          position: absolute;
          left: -8px;
          top: 2px;
          font-family: auto;
        }

        .dyn-mli1.rtl ul li::before {
          left: auto;
          right: -8px;
        }

        .dyn-mli1 .txt-bold {
          font-weight: bold;
        }

        .dyn-mli1 .paragraph {
          margin-top: 15px;
        }

        .dyn-mli1 .paragraph:first-child {
          margin-top: 0;
        }

        .dyn-mli1 .job-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .dyn-mli1.rtl .job-header {
          flex-direction: row-reverse;
        }

        .dyn-mli1 .job-dates {
          text-align: right;
          white-space: nowrap;
        }

        .dyn-mli1.rtl .job-dates {
          text-align: left;
        }

        .dyn-mli1 .skill-grid {
          display: flex;
          flex-wrap: wrap;
        }

        .dyn-mli1 .skill-column {
          width: 50%;
        }

        .dyn-mli1 .left-box .skill-column {
          width: 100%;
        }

        .dyn-mli1 .skill-item {
          margin-bottom: 8px;
        }

        .dyn-mli1 .rating-bar {
          background: rgba(255, 255, 255, 0.25);
          width: 100%;
          height: 4px;
          margin-top: 3px;
          position: relative;
        }

        .dyn-mli1 .right-box .rating-bar {
          background: #d5d6d6;
        }

        .dyn-mli1 .inner-rating {
          background-color: #fff;
          height: 100%;
          position: relative;
        }

        .dyn-mli1 .right-box .inner-rating {
          background-color: ${colorHex};
        }

        .dyn-mli1 .summary-text p {
          margin: 0;
        }

        .dyn-mli1 .job-description {
          margin-top: 5px;
        }
      `}</style>

      <div className={`dyn-mli1 ${rtl ? 'rtl' : ''}`}>
        <div className="parent-container">
          {/* Left Sidebar */}
          <div className="left-box">
            {/* Profile Picture */}
            {data.photo_url && (
              <div className="section profile-pic">
                <img src={data.photo_url} alt={fullName || 'Profile'} />
              </div>
            )}

            {/* Contact Section */}
            {hasContact && (
              <div className="section">
                <div className="section-title">{translations.contact}</div>

                {/* Address */}
                {addressParts.length > 0 && (
                  <div className="icon-row">
                    <div className="icon-svg">
                      <svg width="11px" height="15px" viewBox="0 0 11 15">
                        <path d="M5.390712,9.10533109 C3.337092,9.110718 1.661472,7.444818 1.65551617,5.390658 C1.649592,3.337038 3.316032,1.660878 5.370192,1.65546217 C7.423812,1.649538 9.099432,3.315978 9.10538783,5.370138 C9.111312,7.423758 7.444872,9.099378 5.390712,9.10533109 L5.390712,9.10533109 Z M5.365332,-0.000182380992 C2.398572,0.007938 -0.008208,2.428758 -0.000128385548,5.394978 C0.003132,6.606198 0.399492,7.748838 1.145772,8.699238 L5.404752,14.126778 L9.633492,8.675478 C10.374372,7.721298 10.764252,6.576498 10.761032,5.365278 C10.752912,2.399058 8.332092,-0.008262 5.365332,-0.000182380992 L5.365332,-0.000182380992 Z M5.798952,7.034958 L4.971132,7.037118 L4.967892,5.795658 L3.725892,5.798898 L3.723732,4.971078 L4.965192,4.967838 L4.961952,3.726378 L5.789772,3.723678 L5.793012,4.965138 L7.034472,4.961898 L7.037172,5.789718 L5.795712,5.792958 L5.798952,7.034958 Z M5.372352,2.48328723 C3.775032,2.487618 2.479032,3.791178 2.48334123,5.388498 C2.487672,6.985818 3.791232,8.281818 5.388552,8.27750877 C6.985872,8.273178 8.281872,6.969618 8.27756277,5.372298 C8.273232,3.774978 6.969672,2.478978 5.372352,2.48328723 L5.372352,2.48328723 Z" />
                      </svg>
                    </div>
                    <div className="icon-text">
                      {addressParts.join(', ')}
                    </div>
                  </div>
                )}

                {/* Phone */}
                {data.phone && (
                  <div className="icon-row">
                    <div className="icon-svg">
                      <svg width="12px" height="12px" viewBox="0 0 12 12">
                        <path d="M10.80006,8.7999 C9.63846,8.7999 8.53206,8.5473 7.51206,8.0487 C7.41606,8.0007 7.30566,7.9953 7.20546,8.0301 C7.10466,8.0655 7.02246,8.1393 6.97566,8.2347 L6.34746,9.5361 C4.72026,8.6277 3.37266,7.2819 2.46546,5.6541 L3.76626,5.0241 C3.86226,4.9773 3.93546,4.8951 3.97026,4.7943 C4.00506,4.6941 3.99846,4.5843 3.95106,4.4877 C3.45306,3.4677 3.19986,2.3619 3.19986,1.1997 C3.19986,0.9789 3.02106,0.8001 2.80026,0.8001 L0.40026,0.8001 C0.17886,0.8001 6e-05,0.9789 6e-05,1.1997 C6e-05,7.1553 4.84506,11.9997 10.80006,11.9997 C11.02086,11.9997 11.20026,11.8209 11.20026,11.6001 L11.20026,9.2001 C11.20026,8.9793 11.02086,8.7999 10.80006,8.7999 M6.40026,-0.0003 C6.17886,-0.0003 6.00006,0.1791 6.00006,0.3999 C6.00006,0.6207 6.17886,0.8001 6.40026,0.8001 C9.04746,0.8001 11.20026,2.9529 11.20026,5.6001 C11.20026,5.8209 11.37906,5.9997 11.59986,5.9997 C11.82066,5.9997 12.00006,5.8209 12.00006,5.6001 C12.00006,2.5119 9.48726,-0.0003 6.40026,-0.0003 M6.40026,1.5999 C6.17886,1.5999 6.00006,1.7793 6.00006,2.0001 C6.00006,2.2209 6.17886,2.3997 6.40026,2.3997 C8.16486,2.3997 9.60006,3.8355 9.60006,5.6001 C9.60006,5.8209 9.77886,5.9997 10.00026,5.9997 C10.22106,5.9997 10.39986,5.8209 10.39986,5.6001 C10.39986,3.3945 8.60526,1.5999 6.40026,1.5999 M6.40026,3.2001 C6.17886,3.2001 6.00006,3.3789 6.00006,3.5997 C6.00006,3.8211 6.17886,3.9999 6.40026,3.9999 C7.28226,3.9999 7.99986,4.7175 7.99986,5.6001 C7.99986,5.8209 8.17926,5.9997 8.40006,5.9997 C8.62086,5.9997 8.80026,5.8209 8.80026,5.6001 C8.80026,4.2765 7.72326,3.2001 6.40026,3.2001" />
                      </svg>
                    </div>
                    <div className="icon-text">{data.phone}</div>
                  </div>
                )}

                {/* Email */}
                {data.email && (
                  <div className="icon-row">
                    <div className="icon-svg">
                      <svg width="12px" height="12px" viewBox="0 0 12 12">
                        <path d="M11.8425,0.06954 C11.7279,-0.01206 11.5767,-0.02286 11.4519,0.04254 L0.2019,5.91774 C0.0687,5.98674 -0.0099,6.12894 0.0009,6.27834 C0.0123,6.42834 0.1119,6.55674 0.2535,6.60534 L3.3807,7.67394 L10.0419,1.97934 L4.8873,8.18874 L10.1289,9.98034 C10.1679,9.99294 10.2087,10.00014 10.2501,10.00014 C10.3179,10.00014 10.3857,9.98154 10.4451,9.94554 C10.5399,9.88734 10.6047,9.79014 10.6209,9.68034 L11.9961,0.43074 C12.0165,0.29034 11.9577,0.15174 11.8425,0.06954 L11.8425,0.06954 Z M4.3749,8.80614 L6.4083,9.50094 L5.0523,11.34714 C4.9797,11.44494 4.8669,11.50014 4.7499,11.50014 C4.7109,11.50014 4.6713,11.49414 4.6329,11.48154 C4.4793,11.43054 4.3749,11.28714 4.3749,11.12514 L4.3749,8.80614 Z" />
                      </svg>
                    </div>
                    <div className="icon-text">{data.email}</div>
                  </div>
                )}
              </div>
            )}

            {/* Skills Section (Left Sidebar) */}
            {data.skills && data.skills.length > 0 && (
              <div className="section">
                <div className="section-title">{translations.skills}</div>
                <div className="skill-grid">
                  <div className="skill-column">
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
              <div className="section">
                <div className="section-title">{translations.languages}</div>
                {data.languages.map((lang, index) => (
                  <div key={lang.id || index} className="skill-item">
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

          {/* Right Content */}
          <div className="right-box">
            {/* Name Section */}
            {fullName && (
              <div className="section">
                <div className="name">{fullName}</div>
                {data.professional_title && (
                  <div className="txt-bold" style={{ fontSize: '17px', marginTop: '5px' }}>
                    {data.professional_title}
                  </div>
                )}
              </div>
            )}

            {/* Professional Summary */}
            {data.summary && (
              <div className="section">
                <div className="section-title">{translations.professional_summary}</div>
                <div className="summary-text">
                  <p>{data.summary}</p>
                </div>
              </div>
            )}

            {/* Work Experience */}
            {data.experiences && data.experiences.length > 0 && (
              <div className="section">
                <div className="section-title">{translations.work_history}</div>
                {data.experiences.map((exp, index) => (
                  <div key={exp.id || index} className="paragraph">
                    <div className="job-header">
                      <span className="txt-bold">{exp.job_title}</span>
                      <span className="job-dates">
                        {exp.start_date && formatDate(exp.start_date, language)}
                        {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                        {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                      </span>
                    </div>
                    {(exp.company || exp.location) && (
                      <div className="txt-bold">
                        {exp.company}
                        {exp.company && exp.location && ' - '}
                        {exp.location}
                      </div>
                    )}
                    {exp.description && (
                      <div className="job-description">
                        <ul>
                          {exp.description.split('\n').filter(Boolean).map((line, i) => (
                            <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {data.educations && data.educations.length > 0 && (
              <div className="section">
                <div className="section-title">{translations.education}</div>
                {data.educations.map((edu, index) => (
                  <div key={edu.id || index} className="paragraph">
                    <div>
                      {edu.degree && <span className="txt-bold">{edu.degree}</span>}
                      {edu.degree && edu.field_of_study && ': '}
                      {edu.field_of_study && <span>{edu.field_of_study}</span>}
                      {(edu.degree || edu.field_of_study) && edu.end_date && ', '}
                      {edu.end_date && formatDate(edu.end_date, language)}
                    </div>
                    {edu.institution && (
                      <div className="txt-bold">{edu.institution}</div>
                    )}
                    {edu.description && <div>{edu.description}</div>}
                  </div>
                ))}
              </div>
            )}

            {/* Certificates */}
            {data.certificates && data.certificates.length > 0 && (
              <div className="section">
                <div className="section-title">{translations.certificates}</div>
                {data.certificates.map((cert, index) => (
                  <div key={cert.id || index} className="paragraph">
                    <div className="txt-bold">{cert.name}</div>
                    {cert.organization && <div>{cert.organization}</div>}
                    {cert.issue_date && <div>{formatDate(cert.issue_date, language)}</div>}
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
