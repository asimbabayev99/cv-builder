/* eslint-disable */
// @ts-nocheck
import { sampleData } from "./sampleData";
import type { ResumeData } from "@/types/resume";

const defaultTranslations = {
  summary: "Professional Summary",
  experience: "Work history",
  education: "Education",
  skills: "Skills",
  languages: "Languages",
  certificates: "Certificates",
  present: "Current",
  nationality: "Nationality",
  permit: "Permit",
  web: "Web",
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

export default function TemplateMlu7({
  data = sampleData,
  translations: t = defaultTranslations,
  language = "en",
  colorHex = "#4a4a4a",
}: Partial<DynamicTemplateProps> = {}) {
  const getLanguageWidth = (level: number) => {
    return `${(level / 5) * 100}%`;
  };

  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-mlu7 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        /*START content disc style for LI*/
        .skn-mlu7 ul,.skn-mlu7 li{list-style:none;margin:0;padding:0}
        .skn-mlu7 ul li{position:relative;margin:0px;padding-left:10px}
        .skn-mlu7 ul li:before{content:'\\2022';font-size:9px;position:absolute;left:0;top:0}
        .skn-mlu7 .jobline ul,.skn-mlu7 .education .field ul{margin-top:6px}
        /*END content disc style for LI*/

        .skn-mlu7 .clear{clear:both;height:0}
        .skn-mlu7 .txtBold{font-weight:bold}
        .skn-mlu7 .txtItl{font-style:italic}
        .skn-mlu7 .dispBlock,.skn-mlu7 .name > span{display:block}
        .skn-mlu7 .sprtr{margin:0}
        .skn-mlu7 .fltRight{float:right}
		.skn-mlu7 .txt-bold{font-weight:bold}

        .skn-mlu7{color:#3b3b3b;line-height:16px;font-variant-ligatures:none;display:table;min-height:792px;table-layout:fixed}
        .skn-mlu7 .name{font-weight:bold;padding:0 0 10px 0;text-align:left;text-transform:uppercase;position:relative;word-wrap:break-word;color:${colorHex}}
        .skn-mlu7 .resumeTitle{color:${colorHex};text-transform:uppercase}
        .skn-mlu7 .address,.skn-mlu7 .additional_lnk{color:${colorHex};letter-spacing:0}
        .skn-mlu7 .singlecolumn,.skn-mlu7 .sectiontitle{word-wrap:break-word}
        .skn-mlu7 table.skills,.skn-mlu7 .table_wrapper{width:100%;margin-top:0}
        .skn-mlu7 table.skills th,.skn-mlu7 table.skills td{width:20%;text-align:center}
        .skn-mlu7 table.skills .skillname,.skn-mlu7 table.skills .skillrating{text-align:left;width:35%}
        .skn-mlu7 table.skills .skillrating{width:20%}
        .skn-mlu7 table.skills .skillyears,.skn-mlu7 table.skills .skilllast{width:19%}
        .skn-mlu7 table.skills .pad1{width:5%}
        .skn-mlu7 table.skills .pad2,.skn-mlu7 table.skills .pad3{width:1%}
		.skn-mlu7 .social-lnk:last-child .sprtr{display:none}

        /* common left-right container */
        .skn-mlu7 .topsection .left-box,.skn-mlu7 .parentContainer .left-box{border-right: 1px solid #a9b1b5}
        .skn-mlu7 .topsection .left-box{vertical-align:middle;padding-top:15px;padding-bottom:15px}
        .skn-mlu7 .left-box{padding:20px 30px;display:table-cell;position:relative}
        .skn-mlu7 .left-box > .section:first-child,.skn-mlu7 .right-box > .section:first-child{padding-top:0!important}
        .skn-mlu7 .right-box{padding:25px 30px 20px;display:table-cell;vertical-align:middle;letter-spacing:.2px}
        .skn-mlu7 .parentContainer{display:table-row;width:100%;height:100%}
        .skn-mlu7 .parentContainer .right-box{padding-top:20px;vertical-align:top}
        .skn-mlu7 .right-box > .section:first-child .heading,.skn-mlu7 .left-box > .section:first-child .heading{margin-bottom:10px!important}

        /* top section */
        .skn-mlu7 .topsection{display:table-row;width:100%}
        .skn-mlu7 .topsection .left-box,.skn-mlu7 .topsection .right-box{border-bottom: 1px solid #a9b1b5}
        .skn-mlu7 .section:empty{display:none}

        /* PRFL */
        .skn-mlu7 .PICTPic{position:relative;display:table-cell;vertical-align:middle;text-align:center;}
        .skn-mlu7 .PICTPic img{max-height:100%;max-width:100%;min-height:100%;min-width:100%;position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;object-fit:cover}

        /*Photo Layout styles*/
        .skn-mlu7.pict-pcsh-circle .paragraph .PICTPic img{border-radius:50%;border:1px solid #373737;box-sizing:border-box}
        .skn-mlu7.pict-pcsh-rectangle .paragraph .PICTPic img{border-radius:unset;border:1px solid #373737;box-sizing:border-box}
        .skn-mlu7.pict-pcsh-bottomleft .paragraph .PICTPic img{border-radius:50%;border-bottom-left-radius:8px;border:1px solid #373737;box-sizing:border-box}
        .skn-mlu7.pict-pcsh-bottomright .paragraph .PICTPic img{border-radius:50%;border-bottom-right-radius:8px;border:1px solid #373737;box-sizing:border-box}
        .skn-mlu7.pict-pcsh-radius .paragraph .PICTPic img{border-radius:10px;border:1px solid #373737;box-sizing:border-box}

        /* address and ALNK */
        .skn-mlu7 .address .singlecolumn,.skn-mlu7 .additional_lnk .singlecolumn{margin-left:0!important}
        .skn-mlu7 .SECTION_CNTC,.skn-mlu7 .additional_lnk{padding:0!important}

        /* Heading */
        .skn-mlu7 .heading{font-weight:bold;line-height:15px;margin-bottom:10px}
        .skn-mlu7 .right-box .sectiontitle{letter-spacing:0}
        .skn-mlu7 .septr:before{content:"|";font-size:9px;vertical-align:top;padding-left:2px;padding-right:2px}

		/* PPDT */
        .skn-mlu7 .bottombox .section:first-child:before,.skn-mlu7 .bottombox .section.disclaim:before{display:none}
        .skn-mlu7 .disclaim .singlecolumn,.skn-mlu7 .disclaim .singlecolumn li,.skn-mlu7 .disclaim .singlecolumn p,.skn-mlu7 .disclaim .singlecolumn span{font-size:9px!important;color:#8a8a8a!important}
		.skn-mlu7 .disclaim .singlecolumn{margin-left:0}

		/*Infographic*/
        .skn-mlu7 .langSec .field *,.skn-mlu7 .infoSec .field *{display:inline}
		.skn-mlu7 .right-box .langSec .firstparagraph .field{display:inline}
		.skn-mlu7 .right-box .langSec .firstparagraph .field.dispBlock,.skn-mlu7 .right-box .langSec.hide-bar .firstparagraph .field,.skn-mlu7 .right-box .langSec.hide-only-bar .firstparagraph .field{display:block}
        .skn-mlu7 .langSec .paragraph,.skn-mlu7 .infoSec .paragraph{clear:both;margin-top:0}
        .skn-mlu7 .ratingBar{background:#d5d6d6;width:100%;clear:both;page-break-inside:avoid}
		.skn-mlu7 .innerRating{background-color:${colorHex};height:4px;width:60%}

        .skn-mlu7 .hide-bar .ratingBar,.skn-mlu7 .hide-only-bar .ratingBar,.skn-mlu7 .hide-bar .field-ratt,.skn-mlu7 .hide-colon .colon{display:none}

        /* GRYR */
        .skn-mlu7 .displayNoneThisField{display:none}/* Keep this class always at bottom */

        /*builder fixes*/
        .skn-mlu7 .data-PICT .SECTION_PICT,.skn-mlu7 .name-contact .SECTION_NAME{padding-top:0}

        /*PICT support*/
        .skn-mlu7.pict-pcpf-none .pict-sec{display:none}

        /* Duration tag */
        .skn-mlu7 .totl-expr{display:inline-block;float:right; padding:0 5px;color:#fff;font-weight:600;vertical-align:top;text-wrap:nowrap;margin-left:5px;background-color:${colorHex}}
        .skn-mlu7.texp-curved .totl-expr{border-radius:10px}
        .skn-mlu7 .dflex{display:flex;justify-content:space-between}
        .skn-mlu7 .left-box .totl-expr{display:none}

        /* Only for firefox */
        @-moz-document url-prefix(){.skn-mlu7{height:1px}}

		 @media all and (-ms-high-contrast:none)
            {
                .skn-mlu7 .PICTPic img{position:static}
            }

        .skn-mlu7.for-iron-pdf .parentContainer .left-box,.skn-mlu7.for-iron-pdf .parentContainer .right-box{padding-bottom:0}
        .skn-mlu7.for-iron-pdf .topsection .left-box{padding-top:0}
        .skn-mlu7.for-iron-pdf .topsection .right-box{padding-top:10px}


        .skn-mlu7,.skn-mlu7 table{line-height:15px}
        .skn-mlu7.pagesize{width:595px}
        .skn-mlu7.fontsize,.skn-mlu7 ul li:before,.skn-mlu7 .septr:before{font-size:11px}
        .skn-mlu7.fontface{font-family:Arial}
        .skn-mlu7 .section{padding-top:20px}
        .skn-mlu7 .firstparagraph{margin-top:0!important}
        .skn-mlu7 .paragraph{margin-top:10px}
        .skn-mlu7 .singlecolumn,.skn-mlu7 .maincolumn{margin-left:0px}
        .skn-mlu7 .parentContainer .left-box .singlecolumn,.skn-mlu7 .parentContainer .left-box .maincolumn{margin-left:0}
        /*.skn-mlu7 .parentContainer .left-box .singlecolumn{width:{$PGIN}px}*/
        .skn-mlu7 table.skills td{padding-top:5px}
        .skn-mlu7 .name{font-size:32px;line-height:32px}
        .skn-mlu7 .resumeTitle{font-size:17px;line-height:17px;margin:0 0 15px 0}/*PPDT*/
        .skn-mlu7 .disclaim{margin:0;padding:0;padding-top:50px!important}

        .skn-mlu7 .address2{font-size:11px}
        .skn-mlu7 .sectiontitle{font-size:13px;line-height:14px;color:${colorHex}}
        .skn-mlu7 .left-box{width:164px}
        .skn-mlu7 .PICTPic{height:140px;width:140px}
        .skn-mlu7 .jobdates{font-size:10px}

		/*Infographic*/
        .skn-mlu7 .langSec .paragraph,.skn-mlu7 .infoSec .paragraph{margin-top:5px}
        .skn-mlu7 .langSec .firstparagraph,.skn-mlu7 .infoSec .firstparagraph{padding-top:0}
        .skn-mlu7.pict-pcsh-rectangle .paragraph .PICTPic{width:110px}
    `}</style>
      <div className="svg-skin">
        <div className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-mlu7 MLU7 MUK texp-none pict-pcpf-purl">
          {/* Top Section */}
          <div className="topsection">
            {/* Left Box - Photo */}
            <div className="left-box">
              <div className="section notdraggable pict-sec SECTION_PICT firstsection">
                <div className="doc-item">
                  <div className="paragraph PARAGRAPH_PICT firstparagraph">
                    <div className="clearfix doc-item">
                      <div className="PICTPic">
                        <img src={data.photo_url} alt="Profile" />
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Box - Name and Contact */}
            <div className="right-box">
              <div className="section notdraggable SECTION_NAME firstsection">
                <div className="doc-item">
                  <div className="paragraph PARAGRAPH_NAME firstparagraph">
                    <div className="name">
                      <span>{data.first_name}</span>
                      <span>{data.last_name}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section SECTION_CNTC notdraggable">
                <div className="doc-item">
                  <div className="paragraph PARAGRAPH_CNTC firstparagraph">
                    <div className="clearfix doc-item">
                      {/* Basic Contact Info */}
                      <div className="address txtItl">
                        <div className="singlecolumn">
                          {data.phone && (
                            <span>
                              <span>{data.phone}</span>
                            </span>
                          )}
                          {data.phone && data.email && <span> | </span>}
                          {data.email && (
                            <span>
                              <span>{data.email}</span>
                            </span>
                          )}
                          {(data.street_address || data.city || data.postcode) && (
                            <span className="dispBlock">
                              {data.street_address && <span>{data.street_address}</span>}
                              {data.street_address && (data.city || data.postcode) && <span>, </span>}
                              {data.city && <span>{data.city} </span>}
                              {data.postcode && <span>{data.postcode}</span>}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* Additional Contact Info - Nationality, Permit, Website, LinkedIn */}
                      {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                        <div className="address txtItl">
                          {data.nationality && (
                            <>
                              <span className="text-field">
                                <span className="txt-bold">
                                  <span>{t.nationality}</span>
                                  <span>: </span>
                                </span>
                                <span>{data.nationality}</span>
                              </span>
                              {(data.driving_license || data.website || data.linkedin) && (
                                <span className="sprtr"> | </span>
                              )}
                            </>
                          )}
                          {data.driving_license && (
                            <>
                              <span>
                                <span className="txt-bold">
                                  <span>{t.permit}</span>
                                  <span>: </span>
                                </span>
                                <span>{data.driving_license}</span>
                              </span>
                              {(data.website || data.linkedin) && (
                                <span className="sprtr"> | </span>
                              )}
                            </>
                          )}
                          {data.website && (
                            <>
                              <span>
                                <span className="txt-bold">
                                  <span>{t.web}</span>
                                  <span>: </span>
                                </span>
                                <span className="brk-all">{data.website}</span>
                              </span>
                              {data.linkedin && <span className="sprtr"> | </span>}
                            </>
                          )}
                          {data.linkedin && (
                            <span className="social-lnk">
                              <span className="txt-bold">
                                <span>LinkedIn</span>
                                <span>: </span>
                              </span>
                              <span className="brk-all">{data.linkedin}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Container */}
          <div className="parentContainer">
            {/* Left Box - Skills, Education, Languages */}
            <div className="left-box">
              {/* Skills Section */}
              <div className="section SECTION_HILT has-title">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.skills}</div>
                  </div>
                  <div>
                    <div className="paragraph PARAGRAPH_HILT firstparagraph">
                      <div className="clearfix doc-item">
                        <div className="singlecolumn maincolumn">
                          <ul>
                            {data.skills?.map((skill) => (
                              <li key={skill.id}>{skill.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Education Section */}
              <div className="section education SECTION_EDUC multi-para has-title">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.education}</div>
                  </div>
                  <div>
                    {data.educations?.map((edu, index) => (
                      <div
                        key={edu.id}
                        className={`paragraph PARAGRAPH_EDUC ${index === 0 ? "firstparagraph" : ""}`}
                      >
                        <div className="clearfix doc-item">
                          <div className="singlecolumn">
                            <div className="jobdates txtItl">
                              <span>{formatDate(edu.end_date, language) || formatDate(edu.start_date, language)}</span>
                            </div>
                            <div>
                              <span className="companyname txtBold">{edu.institution}</span>
                              {edu.institution && edu.location && <span className="septr"></span>}
                              <span className="joblocation jobcity txtItl">{edu.location}</span>
                            </div>
                            <div className="degreeGap">
                              {edu.degree && <span className="degree">{edu.degree}</span>}
                              {edu.degree && edu.field_of_study && <span>: </span>}
                              <span className="programline">{edu.field_of_study}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Languages Section */}
              {data.languages && data.languages.length > 0 && (
                <div className="section langSec hide-colon SECTION_LNGG has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{t.languages}</div>
                    </div>
                    <div>
                      {data.languages.map((lang, index) => (
                        <div
                          key={lang.id}
                          className={`paragraph PARAGRAPH_LNGG ${index === 0 ? "firstparagraph" : ""}`}
                        >
                          <div className="clearfix doc-item">
                            <div className="singlecolumn">
                              <div className="field">
                                <span className="txtBold">{lang.name}</span>
                                <span className="colon">:</span>
                              </div>
                              <div className="ratingBar">
                                <div
                                  className="innerRating"
                                  style={{ width: getLanguageWidth(lang.level || 3) }}
                                ></div>
                              </div>
                              <div className="field field-ratt">
                                <span>
                                  {lang.proficiency
                                    ? lang.proficiency.charAt(0).toUpperCase() + lang.proficiency.slice(1)
                                    : ""}
                                </span>
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
            {/* Right Box - Summary and Experience */}
            <div className="right-box">
              {/* Summary Section */}
              <div className="section SECTION_SUMM has-title">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.summary}</div>
                  </div>
                  <div>
                    <div className="paragraph PARAGRAPH_SUMM firstparagraph">
                      <div className="clearfix doc-item">
                        <div className="singlecolumn">
                          <p>{data.summary}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Experience Section */}
              <div className="section SECTION_EXPR multi-para has-title">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.experience}</div>
                  </div>
                  <div>
                    {data.experiences?.map((exp, index) => (
                      <div
                        key={exp.id}
                        className={`paragraph PARAGRAPH_EXPR ${index === 0 ? "firstparagraph" : ""}`}
                      >
                        <div className="clearfix doc-item">
                          <div className="singlecolumn">
                            <span className="dispBlock">
                              <span className="dflex">
                                <span>
                                  <span className="jobdates txtItl">{formatDate(exp.start_date, language)}</span>
                                  <span> - </span>
                                  <span className="jobdates txtItl">
                                    {exp.currently_working ? t.present : formatDate(exp.end_date, language)}
                                  </span>
                                  <br />
                                </span>
                              </span>
                            </span>
                            <span className="dispBlock locationGap">
                              <span className="companyname txtBold">{exp.company}</span>
                              {exp.company && exp.location && <span> | </span>}
                              <span className="jobcity">{exp.location}</span>
                            </span>
                            <span className="dispBlock">
                              <span className="jobtitle txtCaps">{exp.job_title}</span>
                            </span>
                            <span className="jobline">
                              <ul>
                                {exp.description?.split("\n").map((line, i) => (
                                  <li key={i}>{line}</li>
                                ))}
                              </ul>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
