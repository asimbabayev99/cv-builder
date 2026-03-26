/* eslint-disable */
// @ts-nocheck
import { sampleData } from "./sampleData";
import type { ResumeData } from "@/types/resume";

const defaultTranslations = {
  summary: "Professional Summary",
  experience: "Work History",
  education: "Education",
  skills: "Skills",
  languages: "Languages",
  certificates: "Certificates",
  present: "Current",
};

function formatDate(dateStr: string, language: string): string {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  if (!year) return "";
  if (!month) return year;
  return `${month}/${year}`;
}

interface DynamicTemplateProps {
  data: ResumeData;
  translations: typeof defaultTranslations;
  language: string;
  colorHex: string;
}

export default function TemplateMlf1({
  data = sampleData,
  translations: t = defaultTranslations,
  language = "en",
  colorHex = "#576d7b",
}: Partial<DynamicTemplateProps> = {}) {
  const fullName = `${data.first_name || ""} ${data.last_name || ""}`.trim();

  // Split skills into two columns
  const skills = data.skills || [];
  const halfLength = Math.ceil(skills.length / 2);
  const skillsColumn1 = skills.slice(0, halfLength);
  const skillsColumn2 = skills.slice(halfLength);

  // Map language level to percentage
  const getLanguageWidth = (level: number) => {
    return `${(level / 5) * 100}%`;
  };

  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-mlf1 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        /*START content disc style for LI*/
        .skn-mlf1 ul,.skn-mlf1 li{list-style:none;margin:0;padding:0}
        .skn-mlf1 ul li{position:relative;margin:0px;padding-left:10px}
        .skn-mlf1 ul li:before{content:'\\2022';font-size:9px;position:absolute;left:0;top:0}
        /*END content disc style for LI*/

        /*Helping classes*/
        .skn-mlf1 .txt-bold{font-weight:bold}
        .skn-mlf1 .txtItl{font-style:italic}
        .skn-mlf1 .dispBlock{display:block}
        .skn-mlf1 .flt-right{float:right}

        /*Document*/
        .skn-mlf1{color:#020303;line-height:14px;table-layout:fixed;box-sizing:content-box;word-wrap:break-word;word-break:break-word;min-height:792px}
        .skn-mlf1 .name{color:${colorHex};font-weight:bold;padding:5px 0 4px 0;text-align:left;text-transform:uppercase;position:relative}
        .skn-mlf1 .section.SECTION_CNTC{float:left;margin-top:0}
        .skn-mlf1 .parentContainer{clear:both}
        .skn-mlf1 .parentContainer .container{display:table-cell;padding-top:25px;padding-bottom:25px}
        .skn-mlf1 .parentContainer .section{border-top:1px solid ${colorHex};padding-top:4px;position:relative;width:100%;}
        .skn-mlf1 .parentContainer .section:not(.lang-sec):not(.skli-sec):after{content:'';display:table;clear:both}
        .skn-mlf1 .singlecolumn,.skn-mlf1 .sectiontitle{word-wrap:break-word}
        .skn-mlf1 .parentContainer .paragraph:not(.firstparagraph) .singlecolumn{padding-top:3px;border-top:1px dashed #000}
        .skn-mlf1 .SECTION_CNTC,.skn-mlf1 .topsection,.skn-mlf1 .parentContainer{width:100%;display:table;table-layout:fixed;}
        .skn-mlf1 .totl-expr{float:right;padding:0 5px;color:#fff;font-weight:700;background-color:${colorHex}}

        /*Common left-right container*/
        .skn-mlf1 .left-box{position:relative;float:left}
        .skn-mlf1 .right-box .section:first-child{padding-top:0;margin-top:0;margin-bottom:16px}
        .skn-mlf1 .left-box .section:first-child{padding-top:20px;margin-top:0}

        .skn-mlf1 .skill{display:table;width:100%;table-layout:fixed}
        .skn-mlf1 .skill .paddedline{display:table-cell;width:50%}
        .skn-mlf1 .skill .paddedline:last-child{padding-left:10px}

        /*Top section*/
        .skn-mlf1 .topsection{position:relative;border-top:25px solid ${colorHex}}
        .skn-mlf1 .section:empty{display:none}
        .skn-mlf1 .parentContainer .section:first-child{margin-top:0}

        /*PICT*/
        .skn-mlf1 .PICTPic,.skn-mlf1 .PICTPic .field{display:table-cell;vertical-align:middle;text-align:center}
        .skn-mlf1 .PICTPic img{width:100%;object-fit:cover}

        /*SVG Icon Style*/
        .skn-mlf1 .iconRow{clear:both;margin-bottom:8px;word-wrap:break-word;display:table;table-layout:fixed;width:100%;}
        .skn-mlf1 .iconRow .iconSvg{width:10px;display:table-cell;vertical-align:middle}
        .skn-mlf1 .iconRow .iconSvg svg{display:block;}
        .skn-mlf1 .iconRow .icoTxt{padding-left:6px;vertical-align: middle;display:table-cell}
        .skn-mlf1 .iconRow svg path.rect{fill:${colorHex}}
        .skn-mlf1 .topshape{fill:${colorHex};position:relative;top:-1px;vertical-align:top}
        .skn-mlf1 .address{display:table;table-layout:fixed;width:100%}
        .skn-mlf1 .address-inner{display:table-cell;width:50%;vertical-align:top}
        .skn-mlf1 .address-inner:first-child{padding-right:10px}

        /*Heading*/
        .skn-mlf1 .heading{float:left;left:0;position:relative}
        .skn-mlf1 .heading:before{content:'';position:absolute;left:0;top:-8px;border-top:3px solid ${colorHex};background:${colorHex}}
        .skn-mlf1 .sectiontitle{color:#000;letter-spacing:.1px;text-transform:uppercase;font-weight:bold}
        .skn-mlf1 .jobtitle{text-transform:uppercase}

        /*Infographic*/
        .skn-mlf1 .lang-sec{display:flex;flex-wrap:wrap;justify-content:space-between;position:relative}
        .skn-mlf1 .lang-sec .paragraph{width: 48.2%}
        .skn-mlf1 .lang-sec .heading{position:absolute;left:auto}
        .skn-mlf1 .lang-sec.infobarsec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0}
        .skn-mlf1 .lang-sec.infobarsec .singlecolumn{margin-left:0;padding-left:0;position:relative;display:block}
        .skn-mlf1 .lang-sec.infobarsec .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
        .skn-mlf1 .lang-sec.infobarsec .inner-rating{position:relative;background-color:${colorHex};height:4px;width:60%}
        .skn-mlf1 .lang-sec.infobarsec > .paragraph:nth-last-child(1),.skn-mlf1 .lang-sec.infobarsec > .paragraph:nth-last-child(2){padding-bottom:0!important}
        .skn-mlf1 .lang-sec .paragraph .singlecolumn{border:none!important;padding:0px!important}
        .skn-mlf1 .lang-sec.infobarsec .field p{display:inline}
        .skn-mlf1 .lang-sec.infobarsec .colon{display:none}
        .skn-mlf1 .lang-sec.infobarsec .field:first-child .colon{display:inline}

        .skn-mlf1,.skn-mlf1 table{line-height:14px}
        .skn-mlf1.pagesize{width:535px}
        .skn-mlf1.fontsize,.skn-mlf1 .lang-sec.infobarsec .paragraph *{font-size:10px}
        .skn-mlf1.fontface{font-family:Century Gothic}
        .skn-mlf1.hmargins{padding-left:30px;padding-right:30px}
        .skn-mlf1 .section{margin-top:25px}
        .skn-mlf1 .paragraph.firstparagraph{margin-top:0}
        .skn-mlf1 .paragraph{margin-top:20px}
        .skn-mlf1 .parentContainer .singlecolumn,.skn-mlf1 .parentContainer .maincolumn{margin-left:137px}

        .skn-mlf1 .name{font-size:26px;line-height:34px}
        .skn-mlf1 .heading,.skn-mlf1 .heading:before{width:120px}
        .skn-mlf1 .sectiontitle{font-size:10px;line-height:12px}
        .skn-mlf1 .iconRow{line-height:12px}
        .skn-mlf1 .left-box{width:137px}
        .skn-mlf1 .right-box{margin-left:137px}

        .skn-mlf1 .PICTPic,.skn-mlf1 .PICTPic .field{max-width:100px}
        .skn-mlf1 .topsection{min-height:150px}

        .skn-mlf1 .iconRow .iconSvg{height:10px;width:10px}
        .skn-mlf1 .iconRow .iconSvg svg{height:10px;width:10px}

        /*Infographic Bar*/
        .skn-mlf1 .lang-sec.infobarsec{padding-left:137px;box-sizing:border-box}
        .skn-mlf1 .lang-sec.infobarsec .heading{margin-left:-137px}

        /*Language Section sortable items*/
        .skn-mlf1 .data-LNGG .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-mlf1 .data-LNGG .sortable-item{width:48.2%;display:inline-block;vertical-align:top}
        .skn-mlf1 .data-LNGG .sortable-item .paragraph{width:100%;max-width:100%}
        .skn-mlf1 .data-LNGG .sortable-item:nth-last-child(1) .paragraph,.skn-mlf1 .data-LNGG .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0}
        .skn-mlf1 .data-LNGG .doc-item{width:100%}
        .skn-mlf1 .lang-sec .sortableInner .sortable-item:not(:first-child) .paragraph{vertical-align:top}
        .skn-mlf1 .beforecolonspace{display:none!important}

        .skn-mlf1 .name-contact .section.SECTION_CNTC{float:none;display:inline-block;margin-top:0;padding: 0 1% 0 0;}
    `}</style>
      <div className="document fontsize fontface hmargins pagesize skn-mlf1 MUK">
        {/* Top Section: Photo + Name/Contact */}
        <div className="topsection">
          {/* Left box - Photo */}
          <div className="left-box">
            <div className="section pict-sec SECTION_PICT firstsection">
              <div className="doc-item">
                <div className="paragraph firstparagraph">
                  <div className="clearfix doc-item">
                    <div className="PICTPic">
                      <div className="field">
                        {data.photo_url && (
                          <img src={data.photo_url} alt="Profile photo" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right box - Name and Contact */}
          <div className="right-box">
            <div className="name-contact">
              <div className="section SECTION_NAME firstsection">
                <div className="doc-item">
                  <div className="paragraph firstparagraph">
                    <svg className="topshape" height="18px" width="18px" viewBox="0 0 18 18">
                      <polygon points="0,0 0,18 18,0" fill={colorHex}></polygon>
                    </svg>
                    <div className="name">
                      <span>{data.first_name}</span>
                      {data.first_name && data.last_name && <span> </span>}
                      <span>{data.last_name}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="section SECTION_CNTC">
                <div className="doc-item">
                  <div className="paragraph firstparagraph">
                    <div className="clearfix doc-item">
                      <div className="address">
                        <div className="address-inner">
                          {/* Address */}
                          {(data.street_address || data.city || data.postcode) && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg viewBox="0 0 10 10">
                                  <path className="rect" fill={colorHex} d="M0 0h10v10H0z"></path>
                                  <path fill="#fff" d="M5.004 5.287a1.143 1.143 0 0 1 0-2.284 1.143 1.143 0 0 1 0 2.284zm0-3.407A2.266 2.266 0 0 0 2.74 4.143c0 1.55 2.026 3.823 2.112 3.92.08.09.222.09.303 0 .086-.097 2.112-2.37 2.112-3.92A2.266 2.266 0 0 0 5.003 1.88z"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">
                                {data.street_address && <span>{data.street_address}</span>}
                                {data.street_address && (data.city || data.postcode) && <span>, </span>}
                                {data.city && <span>{data.city}</span>}
                                {data.city && data.postcode && <span> </span>}
                                {data.postcode && <span>{data.postcode}</span>}
                              </div>
                            </div>
                          )}

                          {/* Phone */}
                          {data.phone && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg viewBox="0 0 10 10">
                                  <path className="rect" fill={colorHex} d="M4.58 5.382c.62.606 1.166.801 1.366.853l.746-.73c.063-.061.168-.061.241 0l1.418 1.387c.032.031.053.072.053.113 0 .041-.01.093-.042.123l-.83.812-.02.02-.022.01c-.21.165-.483.247-.82.247-.934 0-2.237-.678-3.308-1.725-1.524-1.47-2.185-3.246-1.524-4.047l.032-.031.83-.812c.063-.061.168-.061.241 0L4.36 2.99c.031.03.052.072.052.113a.163.163 0 0 1-.052.113l-.746.73c.063.174.325.8.966 1.437zM0 0v9.768h9.99V0z"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">
                                <span>{data.phone}</span>
                              </div>
                            </div>
                          )}

                          {/* Email */}
                          {data.email && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg viewBox="0 0 10 10">
                                  <path className="rect" fill={colorHex} d="M8.044 2.968v4.058c0 .073-.06.136-.131.136H1.72a.136.136 0 0 1-.13-.136V2.968c0-.074.06-.137.13-.137h6.192c.07 0 .13.063.13.137zM9.614 0H0v9.973h.161c.02.01.05.01.07.01h9.162c.03 0 .05-.01.07-.01h.151z"></path>
                                  <path className="rect" fill={colorHex} d="M7.592 3.475a.087.087 0 0 0-.1 0L4.88 4.898c-.04.02-.09.02-.119 0L2.138 3.475c-.03-.02-.069-.01-.099 0-.03.021-.049.052-.049.083v.515c0 .042.02.073.05.093L4.76 5.723c.02.01.03.01.05.01.02 0 .03 0 .05-.01l2.72-1.557a.11.11 0 0 0 .05-.093v-.515c.01-.031-.01-.062-.04-.083z"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">
                                <span>{data.email}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="address-inner">
                          {/* Website */}
                          {data.website && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg viewBox="0 0 10 10">
                                  <path className="rect" fill={colorHex} d="M0 0h10v10H0z"></path>
                                  <path fill="#fff" d="M5 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm0 6.3c-.2 0-.5-.4-.7-1h1.4c-.2.6-.5 1-.7 1zm-.8-1.5c0-.3-.1-.5-.1-.8s0-.5.1-.8h1.6c.1.3.1.5.1.8s0 .5-.1.8H4.2zm-1.7-.8c0-.3 0-.5.1-.8h1.1c0 .3-.1.5-.1.8s0 .5.1.8H2.6c-.1-.3-.1-.5-.1-.8zm2.5-3.3c.2 0 .5.4.7 1H4.3c.2-.6.5-1 .7-1zm1.8 1h.9c-.3-.5-.7-.9-1.3-1.1.2.3.3.7.4 1.1zm-3.2-1.1c-.6.2-1 .6-1.3 1.1h.9c.1-.4.2-.8.4-1.1zM2.3 5.5c-.1-.2-.2-.5-.2-.7 0-.4.1-.7.2-1h1c0 .3-.1.6-.1 1s0 .7.1 1h-1zm.4 1h.9c-.1.4-.3.8-.4 1.1-.6-.2-1-.6-1.3-1.1h.8zm3.6 1.1c.2-.3.3-.7.4-1.1h.9c-.3.5-.7.9-1.3 1.1zm1.4-1.6c.1-.3.2-.6.2-1s-.1-.7-.2-1h1c.1.3.2.6.2 1s-.1.7-.2 1h-1z"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">
                                <span>{data.website}</span>
                              </div>
                            </div>
                          )}

                          {/* LinkedIn */}
                          {data.linkedin && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg viewBox="0 0 10 10">
                                  <path className="rect" fill={colorHex} d="M0 0h10v10H0z"></path>
                                  <path fill="#fff" d="M2.5 3.5h1v4h-1v-4zm.5-1.5c-.3 0-.5.2-.5.5s.2.5.5.5.5-.2.5-.5-.2-.5-.5-.5zm4 1.5c-.6 0-1 .3-1.2.6v-.6h-1v4h1V5.8c0-.4.1-.8.6-.8s.6.5.6.8v1.7h1v-2c0-1-.5-1.5-1-1.5z"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">
                                <span>{data.linkedin}</span>
                              </div>
                            </div>
                          )}

                          {/* Nationality */}
                          {data.nationality && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg viewBox="0 0 10 10">
                                  <path className="rect" fill={colorHex} d="M0 0h10v10H0z"></path>
                                  <path fill="#fff" d="M5 1.5c-1.9 0-3.5 1.6-3.5 3.5S3.1 8.5 5 8.5 8.5 6.9 8.5 5 6.9 1.5 5 1.5zm0 6.3c-1.5 0-2.8-1.3-2.8-2.8S3.5 2.2 5 2.2 7.8 3.5 7.8 5 6.5 7.8 5 7.8zm.4-4.6v1.9l1.6 1-.4.6-2-1.2V3.2h.8z"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">
                                <span>{data.nationality}</span>
                              </div>
                            </div>
                          )}

                          {/* Driving License */}
                          {data.driving_license && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg viewBox="0 0 10 10">
                                  <path className="rect" fill={colorHex} d="M0 0h10v10H0z"></path>
                                  <path fill="#fff" d="M8.2 3H1.8c-.4 0-.8.4-.8.8v2.4c0 .4.4.8.8.8h6.4c.4 0 .8-.4.8-.8V3.8c0-.4-.4-.8-.8-.8zM3 6.5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm4.5.2H5v-.5h2.5v.5zm0-1H5v-.5h2.5v.5zm0-1H5v-.5h2.5v.5z"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">
                                <span>{data.driving_license}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parent Container - Main Content */}
        <div className="parentContainer">
          {/* Summary Section */}
          {data.summary && (
            <div className="section SECTION_SUMM has-title">
              <div className="doc-item">
                <div className="heading">
                  <div className="sectiontitle">{t.summary}</div>
                </div>
                <div className="paragraph firstparagraph">
                  <div className="clearfix doc-item">
                    <div className="singlecolumn">
                      <p>{data.summary}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Work Experience Section */}
          {data.experiences && data.experiences.length > 0 && (
            <div className="section SECTION_EXPR multi-para has-title">
              <div className="doc-item">
                <div className="heading">
                  <div className="sectiontitle">{t.experience}</div>
                </div>
                <div className="sortableInner">
                  {data.experiences.map((exp, index) => (
                    <div
                      key={exp.id}
                      className={`paragraph PARAGRAPH_EXPR ${index === 0 ? "firstparagraph" : ""}`}
                    >
                      <div className="clearfix doc-item">
                        <div className="singlecolumn">
                          <span className="dispBlock">
                            <span className="jobtitle txt-bold">{exp.job_title}</span>
                            {exp.job_title && (exp.start_date || exp.end_date) && <span>, </span>}
                            <span className="jobdates">{formatDate(exp.start_date, language)}</span>
                            {exp.start_date && (exp.end_date || exp.currently_working) && (
                              <span className="hyphen"> - </span>
                            )}
                            <span className="jobdates">
                              {exp.currently_working ? t.present : formatDate(exp.end_date, language)}
                            </span>
                          </span>
                          <span className="dispBlock locationGap">
                            <span className="companyname txt-bold txtItl">{exp.company}</span>
                            {exp.company && exp.location && <span>, </span>}
                            <span className="jobcity">{exp.location}</span>
                          </span>
                          {exp.description && (
                            <span className="jobline">
                              <ul>
                                {exp.description.split("\n").map((line, i) => (
                                  <li key={i}>{line}</li>
                                ))}
                              </ul>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <div className="section SECTION_HILT has-title">
              <div className="doc-item">
                <div className="heading">
                  <div className="sectiontitle">{t.skills}</div>
                </div>
                <div className="paragraph firstparagraph">
                  <div className="clearfix doc-item">
                    <div className="singlecolumn maincolumn">
                      <table className="twocol skill">
                        <tbody>
                          <tr>
                            <td className="field paddedline">
                              <ul>
                                {skillsColumn1.map((skill) => (
                                  <li key={skill.id}>{skill.name}</li>
                                ))}
                              </ul>
                            </td>
                            <td className="field paddedline">
                              <ul>
                                {skillsColumn2.map((skill) => (
                                  <li key={skill.id}>{skill.name}</li>
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
            </div>
          )}

          {/* Education Section */}
          {data.educations && data.educations.length > 0 && (
            <div className="section SECTION_EDUC multi-para has-title">
              <div className="doc-item">
                <div className="heading">
                  <div className="sectiontitle">{t.education}</div>
                </div>
                <div className="sortableInner">
                  {data.educations.map((edu, index) => (
                    <div
                      key={edu.id}
                      className={`paragraph PARAGRAPH_EDUC ${index === 0 ? "firstparagraph" : ""}`}
                    >
                      <div className="clearfix doc-item">
                        <div className="singlecolumn">
                          <div className="txtItl">
                            <span className="companyname txt-bold">{edu.institution}</span>
                            {edu.institution && <span>, </span>}
                            <span>{edu.end_date ? edu.end_date.split("-")[0] : ""}</span>
                          </div>
                          <div className="degreeGap">
                            <span className="degree txt-bold">{edu.degree}</span>
                            {edu.degree && edu.field_of_study && <span>: </span>}
                            <span className="programline txt-bold">{edu.field_of_study}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Languages Section */}
          {data.languages && data.languages.length > 0 && (
            <div className="section SECTION_LNGG lang-sec infobarsec has-title data-LNGG">
              <div className="doc-item">
                <div className="heading">
                  <div className="sectiontitle">{t.languages}</div>
                </div>
                <div className="sortableInner">
                  {data.languages.map((lang, index) => (
                    <div key={lang.id} className="sortable-item">
                      <div
                        className={`paragraph PARAGRAPH_LNGG ${index === 0 ? "firstparagraph" : ""}`}
                      >
                        <div className="clearfix doc-item">
                          <div className="singlecolumn infobarpara">
                            <div className="fieldgroup-0">
                              <div className="field fielditem-frfm">
                                <span>{lang.name}</span>
                                <span className="colon">
                                  <span className="beforecolonspace"> </span>:
                                </span>
                                <span className="flt-right"></span>
                              </div>
                              <div className="rating-bar fielditem-ratv">
                                <div
                                  className="inner-rating"
                                  style={{ width: getLanguageWidth(lang.level || 3) }}
                                ></div>
                              </div>
                              <div className="field field-ratt fielditem-ratt">
                                <span>{lang.proficiency}</span>
                                <span className="colon">: </span>
                              </div>
                              <div className="field fielditem-adif">
                                <span></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
