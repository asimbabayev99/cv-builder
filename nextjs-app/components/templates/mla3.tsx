/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations } from "@/lib/translations";

const defaultTranslations = translations.en;

// Format date as "MM/YYYY"
function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${year}`;
  } catch {
    return dateStr;
  }
}

export default function TemplateMla3({
  data = sampleData,
  translations: t = defaultTranslations,
  colorHex = "#DF7866",
}: Partial<DynamicTemplateProps> = {}) {
  const skills = data.skills || [];
  const midpoint = Math.ceil(skills.length / 2);
  const skillsColumn1 = skills.slice(0, midpoint);
  const skillsColumn2 = skills.slice(midpoint);

  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const initials = [data.first_name?.[0], data.last_name?.[0]].filter(Boolean).join('');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700');
        @import url('https://fonts.googleapis.com/css2?family=Unica+One');
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{background:#FFF;text-align:left}
        .skn-mla3 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%;table-layout:fixed}

        .skn-mla3 ul,.skn-mla3 li{margin:0 0 0 2px;padding:0;list-style:none}
        .skn-mla3 li::before{content:"•";display:inline-block;width:4px;left:-3px;position:absolute}
        .skn-mla3 ul{position:relative}
        .skn-mla3 ul li{margin:0 0 0 8px}
        .skn-mla3 ul li:last-child{padding-bottom:0}

        .skn-mla3 .flt-right{float:right}
        .skn-mla3 span.paddedline{display:block}
        .skn-mla3 span.dates-wrapper{display:block;float:left;text-align:left}
        .skn-mla3 .txt-bold{font-weight:bold}
        .skn-mla3 .dspl-inblk{display:inline-block}
        .skn-mla3 .no-pind,.skn-mla3 .sum-sec .singlecolumn,.skn-mla3 .obj-sec .singlecolumn{margin-left:0}

        .skn-mla3{word-wrap:break-word;color:#000;position:relative}
        .skn-mla3:before{content:"";height:100%;position:absolute;left:0;top:0;background:${colorHex};width:39px}
        .skn-mla3 .name{word-wrap:break-word;text-transform:uppercase;font-family:'Unica One', regular}
        .skn-mla3 .prof-title{letter-spacing:1px;padding-left:2px}
        .skn-mla3 .sectiontitle{letter-spacing:-.47px}
        .skn-mla3 .paragraph{clear:both}
        .skn-mla3 .heading{clear:both;text-transform:uppercase;font-family:"Unica One"}
        .skn-mla3 .address{word-wrap:break-word;position:relative;top:2px}
        .skn-mla3 .table-wrapper{width:100%;margin-top:0}
        .skn-mla3 table.twocol td{width:50%}
        .skn-mla3 .resume-title,.skn-mla3 .exec-rsmtitle{font-weight:bold;text-align:left}
        .skn-mla3 .educ-sec .company-detail{margin-top:3px}
        .skn-mla3 .firstsection,.skn-mla3 .section.name-sec,.skn-mla3 .section.pict-sec,.skn-mla3 .cntc-section,.skn-mla3 .firstparagraph,.skn-mla3 .address{margin-top:0!important}
        .skn-mla3 .disclaim .singlecolumn,.skn-mla3 .pict-sec + .name-sec,.skn-mla3 .hilt-sec ul,.skn-mla3 .accm-sec ul,.skn-mla3 .adn-link ul{margin-left:0}
        .skn-mla3 .pict-sec,.skn-mla3 .name-sec{display:inline-block}
        .skn-mla3 .top-box{display:flex;justify-content:left}
        .skn-mla3 .fielditem:last-child .sptr{display:none}
        .skn-mla3 .cntc-section li:before{display:none}
        .skn-mla3 .cntc-section{word-break:break-word}

        /* Language section */
        .skn-mla3 .lang-sec,.skn-mla3 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-mla3 .lang-sec .heading,.skn-mla3 .skli-sec .heading{width:100%;flex-grow:1}
        .skn-mla3 .lang-sec .paragraph.nativeLangPara{width:100%;max-width:100%}
        .skn-mla3 .lang-sec .paragraph,.skn-mla3 .skli-sec .paragraph{width:43.7%;max-width:43.7%}
        .skn-mla3 .lang-sec.infobarsec .field *,.skn-mla3 .lang-sec.infobarsec .nativeLangPara .field{display:inline}
        .skn-mla3 .lang-sec.infobarsec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0}
        .skn-mla3 .lang-sec.infobarsec .singlecolumn{margin-left:0!important;padding-left:0;position:relative}
        .skn-mla3 .lang-sec.infobarsec .inner-rating{position:relative}
        .skn-mla3 .lang-sec.infobarsec .rating-bar,.skn-mla3 .skli-sec.infobarsec .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;margin-bottom:3px}
        .skn-mla3 .lang-sec.infobarsec .inner-rating,.skn-mla3 .skli-sec.infobarsec .inner-rating{background-color:${colorHex};height:4px;width:60%}
        .skn-mla3 .lang-sec.infobarsec .paragraph:before{display:none}
        .skn-mla3 .lang-sec.infobarsec > .paragraph:nth-last-child(1),.skn-mla3 .lang-sec.infobarsec > .paragraph:nth-last-child(2){padding-bottom:0!important}

        /* Duration tag */
        .skn-mla3 .totl-expr{display:inline-block;float:right;padding:0 5px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap;margin-left:5px;background-color:${colorHex};font-size:8px;line-height:14px;border-radius:10px}
        .skn-mla3 .dflex{display:flex;justify-content:space-between}

        .skn-mla3,.skn-mla3 table{line-height:14px}
        .skn-mla3.pagesize{width:525px}
        .skn-mla3.fontsize,.skn-mla3 .lang-sec.infobarsec .paragraph *,.skn-mla3 .lang-sec.infotilesec .paragraph *,.skn-mla3 .skli-sec .paragraph *{font-size:10px}
        .skn-mla3.fontface{font-family:PT Sans}
        .skn-mla3.vmargins{padding-top:30px;padding-bottom:30px}
        .skn-mla3.hmargins{padding-left:35px;padding-right:35px}
        .skn-mla3 .section{margin-top:20px;margin-left:39px}
        .skn-mla3 .heading{margin-bottom:10px}
        .skn-mla3 .paragraph{margin-top:10px}
        .skn-mla3 .singlecolumn{margin-left:99px}
        .skn-mla3 span.dates-wrapper{width:99px;font-size:8px;line-height:10px;padding-right:25px;box-sizing:border-box}
        .skn-mla3 .sectiontitle{font-size:14px;line-height:17px}
        .skn-mla3 .name{font-size:34px;line-height:40px}
        .skn-mla3 .cntc-section{padding-top:10px;margin-top:5px!important;border-top:2px solid #D8D8D8}
        .skn-mla3 .address{font-size:9px;line-height:11px}
        .skn-mla3 table.skills td{padding-top:5px}
        .skn-mla3 .resume-title{font-size:12px;line-height:20px}
        .skn-mla3 .prof-title{font-size:10px;line-height:13px}
        .skn-mla3 .exec-rsmtitle{font-size:11px;line-height:14px}
        .skn-mla3 span.compdes-cwrap{margin-bottom:5px}
        .skn-mla3 .twocol_1{padding-right:12px}
        .skn-mla3 .twocol_2{padding-left:12px}
        .skn-mla3 .company-detail,.skn-mla3 .expr-sec ul,.skn-mla3 .educ-sec ul{margin-top:5px}
        .skn-mla3 .paddedline{line-height:13px}
        .skn-mla3 li{padding-bottom:5px}
        .skn-mla3 .sptr{padding-left:5px;padding-right:5px}
        .skn-mla3 .name-sec{width:calc(100% - 39px)}
        .skn-mla3 .small-size{font-size:8px!important;line-height:10px}
        .skn-mla3 .nativeLangPara .small-size{font-size:10px!important;line-height:14px}
        .skn-mla3 .address .fieldgroup .fielditem{line-height:16px}
        .skn-mla3 .lang-sec,.skn-mla3 .skli-sec,.skn-mla3 .lang-sec.infobarsec{padding-left:0px}
        .skn-mla3 .lang-sec.infobarsec .heading,.skn-mla3 .lang-sec.infotilesec .heading,.skn-mla3 .skli-sec .heading{margin-left:0px}
        .skn-mla3 .add-field{margin-top:3px}
      `}</style>
      <div className="svg-skin">
        <div className="document doc-root fontsize fontface vmargins hmargins pagesize skn-mla3">
          {/* Top Section - Name */}
          <div id="CONTAINER_0" className="top-box">
            {/* Name Section */}
            <div className="sortable-item section-container data-NAME">
              <div className="section name-sec firstsection">
                <div className="paragraph firstparagraph">
                  {fullName && (
                    <div className="name">
                      {data.first_name && <span className="field fName">{data.first_name}</span>}
                      {data.first_name && data.last_name && ' '}
                      {data.last_name && <span className="field">{data.last_name}</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div id="CONTAINER_1" className="left-box">
            {/* Contact Section */}
            <div className="section cntc-section">
              <div className="paragraph firstparagraph">
                <div className="clearfix doc-item">
                  <div className="address">
                    <div className="fieldgroup fieldgroup-0">
                      {(data.street_address || data.city || data.postcode) && (
                        <>
                          <span className="fielditem fielditem-addr">
                            <span>{[data.street_address, data.city, data.postcode].filter(Boolean).join(', ')}</span>
                            <span className="sptr">|</span>
                          </span>
                        </>
                      )}
                      {data.phone && (
                        <span className="fielditem fielditem-cphn">
                          <span>{data.phone}</span>
                          <span className="sptr">|</span>
                        </span>
                      )}
                      {data.email && (
                        <span className="fielditem fielditem-emai">
                          <span>{data.email}</span>
                        </span>
                      )}
                    </div>
                    <div className="add-field">
                      <div className="fieldgroup fieldgroup-1">
                        {data.driving_license && (
                          <span className="dspl-inblk fielditem fielditem-driv">
                            <span className="txt-bold label-cntc">Permit: </span>
                            <span className="space-left">{data.driving_license}</span>
                            <span className="sptr">|</span>
                          </span>
                        )}
                        {data.nationality && (
                          <span className="dspl-inblk fielditem fielditem-ntly">
                            <span className="txt-bold label-cntc">Nationality: </span>
                            <span className="space-left">{data.nationality}</span>
                            <span className="sptr">|</span>
                          </span>
                        )}
                        {data.website && (
                          <span className="dspl-inblk fielditem fielditem-web1">
                            <span className="txt-bold label-cntc">Web: </span>
                            <span className="space-left">{data.website}</span>
                            <span className="sptr">|</span>
                          </span>
                        )}
                        {data.linkedin && (
                          <span className="dspl-inblk social fielditem">
                            <span className="txt-bold label-cntc">LinkedIn: </span>
                            <span className="space-left">{data.linkedin}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            {data.summary && (
              <div className="section sum-sec">
                <div className="heading">
                  <div className="sectiontitle">{t.professional_summary?.toUpperCase()}</div>
                </div>
                <div className="paragraph firstparagraph">
                  <div className="clearfix doc-item">
                    <div className="singlecolumn no-pind">
                      <p>{data.summary}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Work Experience Section */}
            {data.experiences && data.experiences.length > 0 && (
              <div className="section expr-sec">
                <div className="heading">
                  <div className="sectiontitle">{t.work_history?.toUpperCase()}</div>
                </div>
                {data.experiences.map((exp, index) => (
                  <div key={exp.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="clearfix doc-item">
                      {(exp.start_date || exp.end_date) && (
                        <span className="dates-wrapper txt-bold">
                          {exp.start_date && formatDate(exp.start_date)}
                          {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                          {exp.currently_working ? t.present : exp.end_date && formatDate(exp.end_date)}
                        </span>
                      )}
                      <div className="singlecolumn">
                        {exp.job_title && (
                          <span className="paddedline">
                            <span className="dflex">
                              <span>{exp.job_title}</span>
                            </span>
                          </span>
                        )}
                        {(exp.company || exp.location) && (
                          <span className="paddedline company-detail">
                            {exp.company && <span className="companyname txt-bold">{exp.company}</span>}
                            {exp.company && exp.location && ' - '}
                            {exp.location && <span>{exp.location}</span>}
                          </span>
                        )}
                        {exp.description && (
                          <span className="paddedline">
                            <ul>
                              {exp.description.split('\n').filter(Boolean).map((line, i) => (
                                <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                              ))}
                            </ul>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills Section */}
            {skills.length > 0 && (
              <div className="section hilt-sec">
                <div className="heading">
                  <div className="sectiontitle">{t.skills?.toUpperCase()}</div>
                </div>
                <div className="paragraph firstparagraph">
                  <div className="clearfix doc-item">
                    <div className="singlecolumn">
                      <table className="twocol">
                        <tbody>
                          <tr>
                            <td className="twocol_1">
                              <ul>
                                {skillsColumn1.map((skill, index) => (
                                  <li key={skill.id || index}>{skill.name}</li>
                                ))}
                              </ul>
                            </td>
                            <td className="twocol_2">
                              <ul>
                                {skillsColumn2.map((skill, index) => (
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
              </div>
            )}

            {/* Languages Section */}
            {data.languages && data.languages.length > 0 && (
              <div className="section lang-sec">
                <div className="heading">
                  <div className="sectiontitle">{t.languages?.toUpperCase()}</div>
                </div>
                {data.languages.map((lang, index) => {
                  const proficiencyText = lang.proficiency ? (t[lang.proficiency as keyof typeof t] || lang.proficiency) : '';
                  const ratingWidth = lang.level ? (lang.level / 5) * 100 : 60;
                  return (
                    <div key={lang.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                      <div className="clearfix doc-item">
                        <div className="singlecolumn">
                          <div className="field fielditem-frfm">
                            <span className="txt-bold">{lang.name}</span>
                          </div>
                          {lang.level && (
                            <div className="rating-bar">
                              <div className="inner-rating" style={{ width: `${ratingWidth}%` }} />
                            </div>
                          )}
                          {proficiencyText && (
                            <div className="field field-ratt small-size">
                              <span className="small-size">{proficiencyText}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Education Section */}
            {data.educations && data.educations.length > 0 && (
              <div className="section educ-sec">
                <div className="heading">
                  <div className="sectiontitle">{t.education?.toUpperCase()}</div>
                </div>
                {data.educations.map((edu, index) => (
                  <div key={edu.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="clearfix doc-item">
                      {(edu.start_date || edu.end_date) && (
                        <span className="dates-wrapper txt-bold">
                          {edu.start_date && formatDate(edu.start_date)}
                          {edu.start_date && (edu.end_date || edu.currently_studying) && ' - '}
                          {edu.currently_studying ? t.present : edu.end_date && formatDate(edu.end_date)}
                        </span>
                      )}
                      <div className="singlecolumn">
                        {(edu.degree || edu.field_of_study) && (
                          <span className="paddedline">
                            {edu.degree && <span className="degree txt-bold">{edu.degree}</span>}
                            {edu.degree && edu.field_of_study && <span className="txt-bold">: </span>}
                            {edu.field_of_study && <span>{edu.field_of_study}</span>}
                          </span>
                        )}
                        {(edu.institution || edu.location) && (
                          <span className="paddedline company-detail">
                            {edu.institution && <span className="companyname txt-bold">{edu.institution}</span>}
                            {edu.institution && edu.location && ' - '}
                            {edu.location && <span>{edu.location}</span>}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Certificates Section */}
            {data.certificates && data.certificates.length > 0 && (
              <div className="section cert-sec">
                <div className="heading">
                  <div className="sectiontitle">{t.certificates?.toUpperCase()}</div>
                </div>
                {data.certificates.map((cert, index) => (
                  <div key={cert.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                    <div className="clearfix doc-item">
                      {cert.issue_date && (
                        <span className="dates-wrapper txt-bold">
                          {formatDate(cert.issue_date)}
                        </span>
                      )}
                      <div className="singlecolumn">
                        <span className="paddedline txt-bold">{cert.name}</span>
                        {cert.organization && <span className="paddedline">{cert.organization}</span>}
                      </div>
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
