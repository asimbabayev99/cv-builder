import { DynamicTemplateProps } from '@/types/resume';
import { isRTL } from '@/lib/translations';

export default function DynamicAta1({ data, translations, language = 'en', colorHex = '#000000' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasAddress = data.city || data.country;

  // Format date for display (Month Year format)
  const formatDateLong = (dateStr: string | undefined): string => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
      const localeMap: Record<string, string> = {
        en: 'en-GB', de: 'de-DE', fr: 'fr-FR', es: 'es-ES', it: 'it-IT',
        pt: 'pt-PT', ru: 'ru-RU', ar: 'ar-SA', zh: 'zh-CN', ja: 'ja-JP', ko: 'ko-KR', az: 'az-AZ',
      };
      return date.toLocaleDateString(localeMap[language] || 'en-GB', options);
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      <style>{`
        .skn-ata1-dyn {
          color: #000;
          word-wrap: break-word;
          min-height: 792px;
          line-height: 15px;
          font-size: 11px;
          font-family: 'Palatino Linotype', 'Book Antiqua', Palatino, serif;
          padding: 37px 42px;
          width: 511px;
          box-sizing: border-box;
        }

        .skn-ata1-dyn.rtl {
          direction: rtl;
          text-align: right;
        }

        .skn-ata1-dyn * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .skn-ata1-dyn .clear {
          clear: both;
        }

        .skn-ata1-dyn .prfl-pic {
          float: left;
          padding-bottom: 10px;
        }

        .skn-ata1-dyn.rtl .prfl-pic {
          float: right;
        }

        .skn-ata1-dyn .prfl-pic img {
          width: 99px;
          height: 128px;
          object-fit: cover;
          vertical-align: top;
        }

        .skn-ata1-dyn .name-section {
          margin-left: 145px;
        }

        .skn-ata1-dyn.rtl .name-section {
          margin-left: 0;
          margin-right: 145px;
        }

        .skn-ata1-dyn .name {
          font-size: 21px;
          line-height: 29px;
          font-weight: bold;
          text-transform: uppercase;
          color: ${colorHex};
        }

        .skn-ata1-dyn .resume-title {
          font-size: 15px;
          line-height: 15px;
          padding-top: 8px;
          color: #4a4a4a;
        }

        .skn-ata1-dyn .address {
          margin-top: 11px;
          font-size: 11px;
          line-height: 15px;
        }

        .skn-ata1-dyn .icon-row {
          display: table;
          table-layout: fixed;
          width: 100%;
          margin-bottom: 5px;
        }

        .skn-ata1-dyn .icon-row:last-child {
          margin-bottom: 0;
        }

        .skn-ata1-dyn .icon-svg {
          width: 11px;
          height: 11px;
          display: table-cell;
          text-align: center;
          vertical-align: middle;
          line-height: 11px;
        }

        .skn-ata1-dyn .icon-svg svg {
          width: 11px;
          height: 11px;
          vertical-align: middle;
        }

        .skn-ata1-dyn .ico-txt {
          display: table-cell;
          padding-left: 10px;
        }

        .skn-ata1-dyn.rtl .ico-txt {
          padding-left: 0;
          padding-right: 10px;
        }

        .skn-ata1-dyn .section {
          margin-top: 5px;
          clear: both;
        }

        .skn-ata1-dyn .section:first-child {
          margin-top: 0;
        }

        .skn-ata1-dyn .heading {
          clear: both;
          font-weight: bold;
          margin-bottom: 1px;
        }

        .skn-ata1-dyn .section-title {
          font-size: 12px;
          line-height: 16px;
          border-bottom: 1px solid ${colorHex};
          color: ${colorHex};
        }

        .skn-ata1-dyn .paragraph {
          position: relative;
          clear: both;
          margin-top: 2px;
        }

        .skn-ata1-dyn .paragraph.first {
          margin-top: 0;
        }

        .skn-ata1-dyn .dates-wrapper {
          display: block;
          float: left;
          text-align: center;
          width: 145px;
          font-size: 10px;
        }

        .skn-ata1-dyn.rtl .dates-wrapper {
          float: right;
        }

        .skn-ata1-dyn .single-column {
          margin-left: 145px;
        }

        .skn-ata1-dyn.rtl .single-column {
          margin-left: 0;
          margin-right: 145px;
        }

        .skn-ata1-dyn .padded-line {
          display: block;
        }

        .skn-ata1-dyn .job-title,
        .skn-ata1-dyn .company-name,
        .skn-ata1-dyn .degree {
          font-weight: bold;
        }

        .skn-ata1-dyn .states-wrapper {
          float: right;
        }

        .skn-ata1-dyn.rtl .states-wrapper {
          float: left;
        }

        .skn-ata1-dyn ul {
          margin-left: 13px;
        }

        .skn-ata1-dyn.rtl ul {
          margin-left: 0;
          margin-right: 13px;
        }

        .skn-ata1-dyn ul li {
          margin-left: 16px;
          list-style-type: disc;
        }

        .skn-ata1-dyn.rtl ul li {
          margin-left: 0;
          margin-right: 16px;
        }

        .skn-ata1-dyn .skill-table {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .skn-ata1-dyn .skill-column {
          display: table-cell;
          width: 50%;
          vertical-align: top;
        }

        .skn-ata1-dyn .lang-section {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-left: 145px;
        }

        .skn-ata1-dyn.rtl .lang-section {
          padding-left: 0;
          padding-right: 145px;
        }

        .skn-ata1-dyn .lang-section .heading {
          width: 100%;
          margin-left: -145px;
        }

        .skn-ata1-dyn.rtl .lang-section .heading {
          margin-left: 0;
          margin-right: -145px;
        }

        .skn-ata1-dyn .lang-item {
          width: 48%;
          max-width: 48%;
          padding-bottom: 5px;
        }

        .skn-ata1-dyn .rating-bar {
          background: #d5d6d6;
          width: 100%;
          height: 4px;
          margin-top: 3px;
          overflow: hidden;
        }

        .skn-ata1-dyn .inner-rating {
          background-color: ${colorHex};
          height: 100%;
        }
      `}</style>

      <div className={`skn-ata1-dyn ${rtl ? 'rtl' : ''}`}>
        {/* Profile Section */}
        <div className="section">
          {/* Profile Picture */}
          {data.photo_url && (
            <div className="prfl-pic">
              <img src={data.photo_url} alt={fullName || 'Profile'} />
            </div>
          )}

          {/* Name and Contact */}
          <div className="name-section">
            {fullName && <div className="name">{fullName}</div>}
            {data.professional_title && (
              <div className="resume-title">{data.professional_title}</div>
            )}

            {/* Contact Info with Icons */}
            <div className="address">
              {/* Address */}
              {hasAddress && (
                <div className="icon-row">
                  <div className="icon-svg">
                    <svg width="9px" height="11px" viewBox="0 0 9 11">
                      <path d="M4.52262639,0.409856824 C2.49463692,0.409856824 0.844754581,2.05973916 0.844754581,4.08770879 C0.844754581,6.6044825 4.13608955,10.2992534 4.27622105,10.4553121 C4.40784351,10.6019097 4.63764728,10.6016518 4.76903172,10.4553121 C4.90916322,10.2992534 8.20049819,6.6044825 8.20049819,4.08770879 C8.20049819,2.05973916 6.55059602,0.409856824 4.52262639,0.409856824 Z M4.52262639,5.93813885 C3.5022945,5.93813885 2.67221616,5.10804068 2.67221616,4.08770879 C2.67221616,3.0673769 3.50231433,2.23729857 4.52262639,2.23729857 C5.54293844,2.23729857 6.37301677,3.06739674 6.37301677,4.08772863 C6.37301677,5.10806052 5.54293844,5.93813885 4.52262639,5.93813885 Z" />
                    </svg>
                  </div>
                  <div className="ico-txt">
                    {data.city && <span>{data.city}</span>}
                    {data.city && data.country && ', '}
                    {data.country && <span>{data.country}</span>}
                  </div>
                </div>
              )}

              {/* Phone */}
              {data.phone && (
                <div className="icon-row">
                  <div className="icon-svg">
                    <svg width="10px" height="12px" viewBox="0 0 10 12">
                      <path d="M9.99525068,8.94279654 C10.0164406,9.10812814 9.96696865,9.25187944 9.84704245,9.37405042 L8.43906428,10.7971354 C8.37554647,10.869011 8.29263774,10.9301582 8.19030348,10.9804183 C8.08796923,11.0307489 7.98741666,11.0630929 7.88864577,11.0774504 C7.88158823,11.0774504 7.86036373,11.0793002 7.82505876,11.0828939 C7.78982298,11.0864701 7.74394901,11.0883022 7.68748873,11.0883022 C7.55336098,11.0883022 7.33632449,11.0649427 7.03637926,11.0182059 C6.73643404,10.9714691 6.36945953,10.8564504 5.93545574,10.6732028 C5.50134817,10.4899199 5.00910242,10.2149603 4.45863201,9.8484297 C3.9081616,9.48191674 3.32236892,8.97875198 2.70130587,8.3390411 C2.20727844,7.84309913 1.79794143,7.36871985 1.47329483,6.91592089 C1.14864824,6.46308669 0.887519452,6.04441104 0.689908481,5.65987633 C0.492280211,5.27534161 0.344071983,4.92674472 0.245266497,4.61408566 C0.146461011,4.30142659 0.0794144315,4.03189291 0.044126758,3.80548462 C0.00883908447,3.57907633 -0.00527598493,3.4011841 0.00178154977,3.27180794 C0.00883908447,3.14243177 0.0123678518,3.07055612 0.0123678518,3.05618099 C0.0264829212,2.95555509 0.0582418274,2.85313229 0.10764457,2.7489126 C0.157047313,2.64469291 0.217036358,2.56023902 0.287611705,2.49555094 L1.69558988,1.06163177 C1.79439536,0.961005863 1.90731592,0.910692909 2.03435154,0.910692909 C2.12609949,0.910692909 2.20726114,0.937646277 2.27783649,0.991553013 C2.34841184,1.04545975 2.40840088,1.11194472 2.45780362,1.19100794 L3.59053794,3.37962141 C3.65405576,3.49462244 3.67169959,3.62040483 3.64346945,3.75696856 C3.61523932,3.89353229 3.55525027,4.00853332 3.46350232,4.10197167 L2.94477352,4.63025768 C2.93065845,4.64463281 2.91830776,4.66799239 2.90772146,4.70033643 C2.89713516,4.73268047 2.89184201,4.75963384 2.89184201,4.78119654 C2.92007215,4.9321354 2.98358996,5.10463695 3.08239545,5.2987012 C3.16708586,5.47120275 3.29765025,5.68143902 3.47408862,5.92941001 C3.65052699,6.17738099 3.90106947,6.46306907 4.22571607,6.78650949 C4.54330513,7.1171727 4.82560652,7.37409291 5.07262023,7.55741104 C5.31958205,7.74062348 5.52608413,7.87544317 5.6919362,7.96169395 C5.85778826,8.04794472 5.98482389,8.10005457 6.07302577,8.11797063 L6.20531995,8.14494161 C6.21943502,8.14494161 6.24242391,8.13953332 6.27414822,8.12876959 C6.30590712,8.11797063 6.32884411,8.10541001 6.34297648,8.09101726 L6.9463784,7.46569913 C7.07348321,7.35071571 7.22162225,7.29321519 7.39102038,7.29321519 C7.51103307,7.29321519 7.60625789,7.31476027 7.67683324,7.35790327 L7.68740224,7.35790327 L9.73054124,8.58697685 C9.87880136,8.68048566 9.96700325,8.79904524 9.99525068,8.94279654 Z" fill="#000000" />
                    </svg>
                  </div>
                  <div className="ico-txt">{data.phone}</div>
                </div>
              )}

              {/* Email */}
              {data.email && (
                <div className="icon-row">
                  <div className="icon-svg">
                    <svg width="11px" height="8px" viewBox="0 0 11 7">
                      <path d="M1.28245476,-1.24344979e-14 C1.18627065,-1.24344979e-14 1.09008655,0.0322580645 0.993902439,0.064516129 L5.16188041,3.80645161 C5.29012589,3.93548387 5.57867821,3.93548387 5.73898505,3.80645161 L9.90696302,0.064516129 C9.81077891,0.0322580645 9.71459481,-1.24344979e-14 9.6184107,-1.24344979e-14 L1.28245476,-1.24344979e-14 Z" />
                      <path d="M0.480920535,6.40322581 C0.480920535,6.85483871 0.833595594,7.20967742 1.28245476,7.20967742 L9.6184107,7.20967742 C10.0672699,7.20967742 10.4199449,6.85483871 10.4199449,6.40322581 L10.4199449,0.919354839 C10.4199449,0.919354839 10.4199449,0.887096774 10.4199449,0.887096774 L7.3420535,3.56451613 L9.36191975,5.46774194 C9.45810386,5.56451613 9.52222659,5.69354839 9.52222659,5.79032258 C9.52222659,5.88709677 9.52222659,5.98387097 9.42604249,6.11290323 C9.32985838,6.20967742 9.23367427,6.27419355 9.1054288,6.27419355 C9.00924469,6.27419355 8.91306058,6.20967742 8.81687648,6.17741935 L8.78481511,6.14516129 L6.73288749,4.17741935 L6.25196696,4.59677419 C6.02753737,4.79032258 5.70692368,4.88709677 5.41837136,4.88709677 C5.25806452,4.88709677 4.84126672,4.85483871 4.5527144,4.56451613 L4.10385523,4.17741935 L2.01986625,6.14516129 C1.92368214,6.17741935 1.82749803,6.24193548 1.73131393,6.24193548 C1.63512982,6.24193548 1.50688434,6.17741935 1.41070024,6.08064516 L1.41070024,6.08064516 C1.37863887,5.98387097 1.31451613,5.88709677 1.31451613,5.79032258 C1.31451613,5.69354839 1.3465775,5.53225806 1.47482297,5.46774194 L3.46262785,3.56451613 L0.480920535,0.887096774 C0.480920535,0.887096774 0.480920535,0.919354839 0.480920535,0.919354839 L0.480920535,6.40322581 Z" />
                    </svg>
                  </div>
                  <div className="ico-txt">{data.email}</div>
                </div>
              )}
            </div>
          </div>
          <div className="clear" />
        </div>

        {/* Professional Summary */}
        {data.summary && (
          <div className="section">
            <div className="heading">
              <div className="section-title">{translations.professional_summary.toUpperCase()}</div>
            </div>
            <div className="paragraph first">
              <div className="single-column">
                <p>{data.summary}</p>
              </div>
            </div>
          </div>
        )}

        {/* Work Experience */}
        {data.experiences && data.experiences.length > 0 && (
          <div className="section">
            <div className="heading">
              <div className="section-title">{translations.work_history.toUpperCase()}</div>
            </div>
            {data.experiences.map((exp, index) => (
              <div key={exp.id || index} className={`paragraph ${index === 0 ? 'first' : ''}`}>
                {/* Dates */}
                {(exp.start_date || exp.end_date || exp.currently_working) && (
                  <div className="dates-wrapper">
                    {exp.start_date && <div>{formatDateLong(exp.start_date)}</div>}
                    {exp.start_date && (exp.end_date || exp.currently_working) && <div>-</div>}
                    {exp.currently_working ? (
                      <div>{translations.present}</div>
                    ) : exp.end_date ? (
                      <div>{formatDateLong(exp.end_date)}</div>
                    ) : null}
                  </div>
                )}

                <div className="single-column">
                  {/* Company and Location */}
                  {(exp.company || exp.location) && (
                    <span className="padded-line">
                      {exp.company && <span className="company-name">{exp.company}</span>}
                      {exp.location && (
                        <span className="states-wrapper">
                          <span>{exp.location}</span>
                        </span>
                      )}
                    </span>
                  )}

                  {/* Job Title */}
                  {exp.job_title && (
                    <span className="padded-line">
                      <span className="job-title">{exp.job_title}</span>
                    </span>
                  )}

                  {/* Description */}
                  {exp.description && (
                    <span className="padded-line">
                      <ul>
                        {exp.description.split('\n').filter(Boolean).map((line, i) => (
                          <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                        ))}
                      </ul>
                    </span>
                  )}
                </div>
                <div className="clear" />
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="section">
            <div className="heading">
              <div className="section-title">{translations.skills.toUpperCase()}</div>
            </div>
            <div className="paragraph first">
              <div className="single-column">
                <div className="skill-table">
                  <div className="skill-column">
                    <ul>
                      {data.skills.slice(0, Math.ceil(data.skills.length / 2)).map((skill, index) => (
                        <li key={skill.id || index}>{skill.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="skill-column">
                    <ul>
                      {data.skills.slice(Math.ceil(data.skills.length / 2)).map((skill, index) => (
                        <li key={skill.id || index}>{skill.name}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Education */}
        {data.educations && data.educations.length > 0 && (
          <div className="section">
            <div className="heading">
              <div className="section-title">{translations.education.toUpperCase()}</div>
            </div>
            {data.educations.map((edu, index) => (
              <div key={edu.id || index} className={`paragraph ${index === 0 ? 'first' : ''}`}>
                {/* Dates */}
                <div className="dates-wrapper">
                  {edu.end_date && <div>{formatDateLong(edu.end_date)}</div>}
                </div>

                <div className="single-column">
                  {/* Institution and Location */}
                  {edu.institution && (
                    <span className="padded-line">
                      <span className="company-name">{edu.institution}</span>
                    </span>
                  )}

                  {/* Degree and Field */}
                  {(edu.degree || edu.field_of_study) && (
                    <span className="padded-line">
                      {edu.degree && <span className="degree">{edu.degree}</span>}
                      {edu.degree && edu.field_of_study && ': '}
                      {edu.field_of_study && <span>{edu.field_of_study}</span>}
                    </span>
                  )}

                  {/* Description */}
                  {edu.description && (
                    <span className="padded-line">
                      <span>{edu.description}</span>
                    </span>
                  )}
                </div>
                <div className="clear" />
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div className="section lang-section">
            <div className="heading">
              <div className="section-title">{translations.languages.toUpperCase()}</div>
            </div>
            {data.languages.map((lang, index) => (
              <div key={lang.id || index} className="lang-item">
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

        {/* Certificates */}
        {data.certificates && data.certificates.length > 0 && (
          <div className="section">
            <div className="heading">
              <div className="section-title">{translations.certificates.toUpperCase()}</div>
            </div>
            {data.certificates.map((cert, index) => (
              <div key={cert.id || index} className={`paragraph ${index === 0 ? 'first' : ''}`}>
                <div className="dates-wrapper">
                  {cert.issue_date && <div>{formatDateLong(cert.issue_date)}</div>}
                </div>
                <div className="single-column">
                  <span className="padded-line">
                    <span className="company-name">{cert.name}</span>
                  </span>
                  {cert.organization && (
                    <span className="padded-line">
                      <span>{cert.organization}</span>
                    </span>
                  )}
                </div>
                <div className="clear" />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
