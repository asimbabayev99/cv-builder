import { DynamicTemplateProps } from '@/types/resume';
import { formatDate, isRTL } from '@/lib/translations';

export default function DynamicMca2({ data, translations, language = 'en', colorHex = '#000000' }: DynamicTemplateProps) {
  const rtl = isRTL(language);
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const hasContact = data.email || data.phone || data.city || data.country;

  return (
    <>
      <style>{`
        .dyn-mca2 {
          font-family: 'Century Gothic', sans-serif;
          color: #000;
          line-height: 12px;
          font-size: 11px;
          min-height: 792px;
          word-wrap: break-word;
          padding: 32px 40px;
        }

        .dyn-mca2.rtl {
          direction: rtl;
          text-align: right;
        }

        .dyn-mca2 * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dyn-mca2 ul {
          list-style-type: disc;
          margin: 0 0 0 13px;
          padding: 0;
        }

        .dyn-mca2.rtl ul {
          margin: 0 13px 0 0;
        }

        .dyn-mca2 ul li {
          margin: 0 0 0 16px;
          padding: 0 0 0 3px;
        }

        .dyn-mca2.rtl ul li {
          margin: 0 16px 0 0;
          padding: 0 3px 0 0;
        }

        .dyn-mca2 .txtBold {
          font-weight: bold;
        }

        .dyn-mca2 .paddedline {
          display: block;
        }

        .dyn-mca2 .dates_wrapper {
          display: block;
          float: left;
          width: 115px;
          font-weight: bold;
          font-size: 11px;
          line-height: 13px;
        }

        .dyn-mca2.rtl .dates_wrapper {
          float: right;
        }

        /* Profile Section with Photo */
        .dyn-mca2 .prflSection {
          margin-left: 115px;
        }

        .dyn-mca2.rtl .prflSection {
          margin-left: 0;
          margin-right: 115px;
        }

        .dyn-mca2 .prflPic {
          float: right;
        }

        .dyn-mca2.rtl .prflPic {
          float: left;
        }

        .dyn-mca2 .prflPic img {
          width: 99px;
          height: 128px;
          object-fit: cover;
        }

        .dyn-mca2 .nmCntc {
          margin-right: 99px;
        }

        .dyn-mca2.rtl .nmCntc {
          margin-right: 0;
          margin-left: 99px;
        }

        /* Name Section */
        .dyn-mca2 .name {
          font-size: 21px;
          line-height: 38px;
          font-weight: normal;
          text-transform: uppercase;
          text-align: left;
          color: ${colorHex};
        }

        .dyn-mca2 .name .lName {
          font-weight: bold;
        }

        .dyn-mca2.rtl .name {
          text-align: right;
        }

        .dyn-mca2 .resumeTitle {
          color: #4a4a4a;
          text-transform: lowercase;
          font-size: 15px;
          line-height: 15px;
          padding: 0 0 10px 0;
        }

        .dyn-mca2 .resumeTitle::first-letter {
          text-transform: uppercase;
        }

        /* Address with icons */
        .dyn-mca2 .address {
          font-size: 11px;
          line-height: 13px;
        }

        .dyn-mca2 .iconRow {
          display: table;
          table-layout: fixed;
          width: 100%;
          margin-bottom: 5px;
        }

        .dyn-mca2 .iconRow:last-child {
          margin-bottom: 0;
        }

        .dyn-mca2 .iconSvg {
          width: 11px;
          height: 11px;
          display: table-cell;
          text-align: center;
          vertical-align: middle;
        }

        .dyn-mca2 .iconSvg svg {
          vertical-align: middle;
          width: 11px;
          height: 11px;
        }

        .dyn-mca2 .icoTxt {
          display: table-cell;
          padding-left: 10px;
        }

        .dyn-mca2.rtl .icoTxt {
          padding-left: 0;
          padding-right: 10px;
        }

        /* Section Styling */
        .dyn-mca2 .section {
          margin-top: 10px;
          position: relative;
          clear: both;
        }

        .dyn-mca2 .section:first-child,
        .dyn-mca2 .firstsection {
          margin-top: 0;
        }

        /* Heading */
        .dyn-mca2 .heading {
          clear: both;
          font-weight: bold;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .dyn-mca2 .sectiontitle {
          font-size: 12px;
          line-height: 13px;
          color: ${colorHex};
        }

        /* Paragraph */
        .dyn-mca2 .paragraph {
          margin-top: 4px;
          position: relative;
          clear: both;
        }

        .dyn-mca2 .firstparagraph {
          margin-top: 0;
        }

        .dyn-mca2 .singlecolumn {
          margin-left: 115px;
        }

        .dyn-mca2.rtl .singlecolumn {
          margin-left: 0;
          margin-right: 115px;
        }

        .dyn-mca2 .jobtitle,
        .dyn-mca2 .degree,
        .dyn-mca2 .companyname {
          font-weight: bold;
        }

        /* Two Column Skills */
        .dyn-mca2 .twocol {
          display: table;
          width: 100%;
          table-layout: fixed;
        }

        .dyn-mca2 .twocol td {
          width: 50%;
          vertical-align: top;
          padding-top: 2px;
        }

        /* Rating Bar */
        .dyn-mca2 .rating-bar {
          background: #d5d6d6;
          width: 100%;
          clear: both;
          margin-top: 3px;
          overflow: hidden;
        }

        .dyn-mca2 .inner-rating {
          background-color: ${colorHex};
          height: 4px;
        }

        /* Languages flex layout */
        .dyn-mca2 .lang-sec {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding-left: 115px;
        }

        .dyn-mca2.rtl .lang-sec {
          padding-left: 0;
          padding-right: 115px;
        }

        .dyn-mca2 .lang-sec .heading {
          margin-left: -115px;
          width: calc(100% + 115px);
        }

        .dyn-mca2.rtl .lang-sec .heading {
          margin-left: 0;
          margin-right: -115px;
        }

        .dyn-mca2 .lang-sec .paragraph {
          vertical-align: top;
          padding-bottom: 5px;
          margin-top: 0;
          width: 47.6%;
        }

        .dyn-mca2 .lang-sec .singlecolumn {
          margin-left: 0;
        }

        .dyn-mca2.rtl .lang-sec .singlecolumn {
          margin-right: 0;
        }
      `}</style>

      <div className={`dyn-mca2 ${rtl ? 'rtl' : ''}`}>
        {/* Name & Contact Section */}
        <div className="section firstsection">
          <div className="prflSection">
            {data.photo_url && (
              <div className="prflPic">
                <img src={data.photo_url} alt="Profile" />
              </div>
            )}
            <div className={data.photo_url ? 'nmCntc' : ''}>
              {fullName && (
                <div className="name">
                  {data.first_name && <span>{data.first_name}</span>}
                  {data.first_name && data.last_name && ' '}
                  {data.last_name && <span className="lName">{data.last_name}</span>}
                </div>
              )}
              {data.professional_title && (
                <div className="resumeTitle">{data.professional_title}</div>
              )}
              {hasContact && (
                <div className="address">
                  {(data.city || data.country) && (
                    <div className="iconRow">
                      <div className="iconSvg">
                        <svg width="9px" height="11px" viewBox="0 0 9 11">
                          <path d="M4.52262639,0.409856824 C2.49463692,0.409856824 0.844754581,2.05973916 0.844754581,4.08770879 C0.844754581,6.6044825 4.13608955,10.2992534 4.27622105,10.4553121 C4.40784351,10.6019097 4.63764728,10.6016518 4.76903172,10.4553121 C4.90916322,10.2992534 8.20049819,6.6044825 8.20049819,4.08770879 C8.20049819,2.05973916 6.55059602,0.409856824 4.52262639,0.409856824 Z M4.52262639,5.93813885 C3.5022945,5.93813885 2.67221616,5.10804068 2.67221616,4.08770879 C2.67221616,3.0673769 3.50231433,2.23729857 4.52262639,2.23729857 C5.54293844,2.23729857 6.37301677,3.06739674 6.37301677,4.08772863 C6.37301677,5.10806052 5.54293844,5.93813885 4.52262639,5.93813885 Z" fill="#000000" />
                        </svg>
                      </div>
                      <div className="icoTxt">
                        {[data.city, data.country].filter(Boolean).join(', ')}
                      </div>
                    </div>
                  )}
                  {data.phone && (
                    <div className="iconRow">
                      <div className="iconSvg">
                        <svg width="10px" height="12px" viewBox="0 0 10 12">
                          <path d="M9.99525068,8.94279654 C10.0164406,9.10812814 9.96696865,9.25187944 9.84704245,9.37405042 L8.43906428,10.7971354 C8.37554647,10.869011 8.29263774,10.9301582 8.19030348,10.9804183 C8.08796923,11.0307489 7.98741666,11.0630929 7.88864577,11.0774504 L7.68748873,11.0883022 C7.55336098,11.0883022 7.33632449,11.0649427 7.03637926,11.0182059 C6.73643404,10.9714691 6.36945953,10.8564504 5.93545574,10.6732028 C5.50134817,10.4899199 5.00910242,10.2149603 4.45863201,9.8484297 C3.9081616,9.48191674 3.32236892,8.97875198 2.70130587,8.3390411 C2.20727844,7.84309913 1.79794143,7.36871985 1.47329483,6.91592089 C1.14864824,6.46308669 0.887519452,6.04441104 0.689908481,5.65987633 C0.492280211,5.27534161 0.344071983,4.92674472 0.245266497,4.61408566 C0.146461011,4.30142659 0.0794144315,4.03189291 0.044126758,3.80548462 C0.00883908447,3.57907633 -0.00527598493,3.4011841 0.00178154977,3.27180794 L0.0123678518,3.05618099 C0.0264829212,2.95555509 0.0582418274,2.85313229 0.10764457,2.7489126 C0.157047313,2.64469291 0.217036358,2.56023902 0.287611705,2.49555094 L1.69558988,1.06163177 C1.79439536,0.961005863 1.90731592,0.910692909 2.03435154,0.910692909 C2.12609949,0.910692909 2.20726114,0.937646277 2.27783649,0.991553013 C2.34841184,1.04545975 2.40840088,1.11194472 2.45780362,1.19100794 L3.59053794,3.37962141 C3.65405576,3.49462244 3.67169959,3.62040483 3.64346945,3.75696856 C3.61523932,3.89353229 3.55525027,4.00853332 3.46350232,4.10197167 L2.94477352,4.63025768 C2.93065845,4.64463281 2.91830776,4.66799239 2.90772146,4.70033643 L2.89184201,4.78119654 C2.92007215,4.9321354 2.98358996,5.10463695 3.08239545,5.2987012 C3.16708586,5.47120275 3.29765025,5.68143902 3.47408862,5.92941001 C3.65052699,6.17738099 3.90106947,6.46306907 4.22571607,6.78650949 C4.54330513,7.1171727 4.82560652,7.37409291 5.07262023,7.55741104 C5.31958205,7.74062348 5.52608413,7.87544317 5.6919362,7.96169395 C5.85778826,8.04794472 5.98482389,8.10005457 6.07302577,8.11797063 L6.20531995,8.14494161 C6.21943502,8.14494161 6.24242391,8.13953332 6.27414822,8.12876959 L6.34297648,8.09101726 L6.9463784,7.46569913 C7.07348321,7.35071571 7.22162225,7.29321519 7.39102038,7.29321519 C7.51103307,7.29321519 7.60625789,7.31476027 7.67683324,7.35790327 L7.68740224,7.35790327 L9.73054124,8.58697685 C9.87880136,8.68048566 9.96700325,8.79904524 9.99525068,8.94279654 Z" fill="#000000" />
                        </svg>
                      </div>
                      <div className="icoTxt">{data.phone}</div>
                    </div>
                  )}
                  {data.email && (
                    <div className="iconRow">
                      <div className="iconSvg">
                        <svg width="11px" height="8px" viewBox="0 0 11 8">
                          <path d="M1.28245476,0 C1.18627065,0 1.09008655,0.0322580645 0.993902439,0.064516129 L5.16188041,3.80645161 C5.29012589,3.93548387 5.57867821,3.93548387 5.73898505,3.80645161 L9.90696302,0.064516129 C9.81077891,0.0322580645 9.71459481,0 9.6184107,0 L1.28245476,0 Z" fill="#000000" />
                          <path d="M0.480920535,6.40322581 C0.480920535,6.85483871 0.833595594,7.20967742 1.28245476,7.20967742 L9.6184107,7.20967742 C10.0672699,7.20967742 10.4199449,6.85483871 10.4199449,6.40322581 L10.4199449,0.919354839 L7.3420535,3.56451613 L9.36191975,5.46774194 C9.45810386,5.56451613 9.52222659,5.69354839 9.52222659,5.79032258 C9.52222659,5.88709677 9.52222659,5.98387097 9.42604249,6.11290323 C9.32985838,6.20967742 9.23367427,6.27419355 9.1054288,6.27419355 C9.00924469,6.27419355 8.91306058,6.20967742 8.81687648,6.17741935 L8.78481511,6.14516129 L6.73288749,4.17741935 L6.25196696,4.59677419 C6.02753737,4.79032258 5.70692368,4.88709677 5.41837136,4.88709677 C5.25806452,4.88709677 4.84126672,4.85483871 4.5527144,4.56451613 L4.10385523,4.17741935 L2.01986625,6.14516129 C1.92368214,6.17741935 1.82749803,6.24193548 1.73131393,6.24193548 C1.63512982,6.24193548 1.50688434,6.17741935 1.41070024,6.08064516 L1.41070024,6.08064516 C1.37863887,5.98387097 1.31451613,5.88709677 1.31451613,5.79032258 C1.31451613,5.69354839 1.3465775,5.53225806 1.47482297,5.46774194 L3.46262785,3.56451613 L0.480920535,0.887096774 L0.480920535,6.40322581 Z" fill="#000000" />
                        </svg>
                      </div>
                      <div className="icoTxt">{data.email}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

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
                {(exp.start_date || exp.end_date) && (
                  <span className="dates_wrapper">
                    {exp.start_date && formatDate(exp.start_date, language)}
                    {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                    {exp.currently_working ? translations.present : exp.end_date && formatDate(exp.end_date, language)}
                  </span>
                )}
                <div className="singlecolumn">
                  {exp.job_title && (
                    <span className="paddedline jobtitle">{exp.job_title}</span>
                  )}
                  {(exp.company || exp.location) && (
                    <span className="paddedline">
                      <span className="companyname">{exp.company}</span>
                      {exp.company && exp.location && ' - '}
                      {exp.location}
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

        {/* Skills Section */}
        {data.skills && data.skills.length > 0 && (
          <div className="section">
            <div className="heading">
              <div className="sectiontitle">{translations.skills}</div>
            </div>
            <div className="paragraph firstparagraph">
              <div className="singlecolumn">
                <table className="twocol">
                  <tbody>
                    <tr>
                      <td>
                        <ul>
                          {data.skills.slice(0, Math.ceil(data.skills.length / 2)).map((skill, index) => (
                            <li key={skill.id || index}>{skill.name}</li>
                          ))}
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {data.skills.slice(Math.ceil(data.skills.length / 2)).map((skill, index) => (
                            <li key={skill.id || index}>{skill.name}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                {edu.end_date && (
                  <span className="dates_wrapper">{formatDate(edu.end_date, language)}</span>
                )}
                <div className="singlecolumn">
                  {(edu.degree || edu.field_of_study) && (
                    <span className="paddedline">
                      <span className="degree">{edu.degree}</span>
                      {edu.degree && edu.field_of_study && ' : '}
                      {edu.field_of_study}
                    </span>
                  )}
                  {edu.institution && (
                    <span className="paddedline companyname">{edu.institution}</span>
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
                <div className="singlecolumn">
                  <div>{lang.name}</div>
                  {lang.level && (
                    <div className="rating-bar">
                      <div className="inner-rating" style={{ width: `${(lang.level / 5) * 100}%` }} />
                    </div>
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
                {cert.issue_date && (
                  <span className="dates_wrapper">{formatDate(cert.issue_date, language)}</span>
                )}
                <div className="singlecolumn">
                  <span className="paddedline txtBold">{cert.name}</span>
                  {cert.organization && <span className="paddedline">{cert.organization}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
