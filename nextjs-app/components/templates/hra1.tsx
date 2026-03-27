/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations, formatDate } from "@/lib/translations";

const defaultTranslations = translations.en;

export default function TemplateHra1({
  data = sampleData,
  translations: t = defaultTranslations,
  language = "en",
  colorHex = "#000000",
}: Partial<DynamicTemplateProps> = {}) {
  const skills = data.skills || [];
  const midpoint = Math.ceil(skills.length / 2);
  const skillsColumn1 = skills.slice(0, midpoint);
  const skillsColumn2 = skills.slice(midpoint);

  const getLevelWidth = (level: number | undefined) => {
    if (!level) return '60%';
    return `${(level / 5) * 100}%`;
  };

  const getProficiencyLabel = (proficiency: string | undefined) => {
    if (!proficiency) return '';
    return proficiency.charAt(0).toUpperCase() + proficiency.slice(1);
  };

  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-hra1 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        .skn-hra1 span.paddedline,.skn-hra1 span.dates_wrapper{display:block}
        .skn-hra1 span.dates_wrapper{float:left}
        .skn-hra1 span.jobtitle,.skn-hra1 span.companyname,.skn-hra1 span.degree,.skn-hra1 span.programline,.skn-hra1 .txtBold{font-weight:bold}
		.skn-hra1 .logo,.skn-hra1 .nodisplay{display:none}
        .skn-hra1 .flt-right{float:right}
		.skn-hra1 .dispInBlk{display:inline-block}
		.skn-hra1 .dispBlk{display:block}
		.skn-hra1 .maxWidth{max-width:100%}
		.skn-hra1 .brk-all{word-break:break-all}

        .skn-hra1 ul,.skn-hra1 li{list-style-type:disc;margin:0 0 0 10px;padding:0}
        .skn-hra1 ul li{margin:0 0 0 13px}
        .skn-hra1 .adnlLnks ul{margin:0}
        .skn-hra1 .adnlLnks li{list-style:none;display:inline}

        .skn-hra1{color:#000;word-wrap:break-word;text-size-adjust:none;-ms-text-size-adjust:none;-moz-text-size-adjust:none;-webkit-text-size-adjust:none;min-height:792px}
		.skn-hra1 .name{font-size:15px;line-height:17px;font-weight:bold;padding:0;text-align:center;font-variant:small-caps}
        .skn-hra1 .resumeTitle{text-align:center;color:#4a4a4a}
        .skn-hra1 .paragraph{position:relative}
        .skn-hra1 .heading{width:100%;clear:both;font-weight:bold;font-variant:small-caps}
        .skn-hra1 .sectiontitle{background-color:#FFF;padding:0 10px 1px 0;position:absolute}
        .skn-hra1 .address{position:relative;text-align:center;font-size:0.917em;line-height:1.25em;margin-top:11px}
        .skn-hra1 .address2{position:relative;text-align:left;font-size:0.917em;line-height:1.25em}
        .skn-hra1 .section .adnlLnks{text-align:center;margin-left:0}
        .skn-hra1 .table_wrapper{width:100%;margin-top:0}
        .skn-hra1 table.twocol td{width:50%;vertical-align:top}
        .skn-hra1 table.skills th,.skn-hra1 table.skills td{width:20%;text-align:center}
        .skn-hra1 table.skills th{text-decoration:underline}
        .skn-hra1 table.skills .skillname,.skn-hra1 table.skills .skillrating{text-align:left;width:35%}
        .skn-hra1 table.skills .skillrating{width:20%}
        .skn-hra1 table.skills .skillyears,.skn-hra1 table.skills .skilllast{width:19%}
        .skn-hra1 table.skills .pad1{width:5%}
        .skn-hra1 table.skills .pad2,.skn-hra1 table.skills .pad3{width:1%}
        .skn-hra1 .section{position:relative}
		.skn-hra1 .social-link:last-child .sprtr,.skn-hra1 .fieldgroup .fielditem:last-child .sprtr{display:none}
        .skn-hra1 .paragraph-fieldgroup .sprtr{padding:0 3px}
        .skn-hra1 .address .fieldgroup:nth-child(2){padding-top:4px;display:inline-block}
        .skn-hra1 .address .fieldgroup:nth-child(2):empty{display:none}

        .skn-hra1 .totl-expr{display:inline-block;padding:1px 6px;color:#fff;font-weight:700;vertical-align:top;float:right;text-wrap:nowrap;margin-left:3px;height:100%}
        .skn-hra1.texp-curved .totl-expr{border-radius:10px}
        .skn-hra1 .dflex{display:flex;justify-content:space-between}

        /*Personal details section*/
        .skn-hra1 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-hra1 .details-wrap{width:49%}


        /*FIX for FORCEFULLY making left margin ZERO for CL*/
        .skn-hra1 .sectionCL .paragraph{margin-top:0}

        /* Style for Signature */
        .skn-hra1 .disclaim .singlecolumn,.skn-hra1 .signPic > .field_sign{margin-left:0}
        .skn-hra1 .disclaim .singlecolumn,.skn-hra1 .disclaim .singlecolumn li,.skn-hra1 .disclaim .singlecolumn p,.skn-hra1 .disclaim .singlecolumn span{font-size:9px;color:#8a8a8a}
        .skn-hra1 .field_sign{font-size:7px;color:#8a8a8a}
        .skn-hra1 .txtleft + .field_sign{text-align:left}
        .skn-hra1 .txtcenter + .field_sign{text-align:center}
        .skn-hra1 .txtright + .field_sign{text-align:right}
        .skn-hra1 .signPic span:first-child{padding-right:6px}
        .skn-hra1 .signPic img{padding-top:5px;max-width:100%}

        /*MES and MFR address order code*/
        .skn-hra1 .zipprefix,.skn-hra1.MES .zipsuffix,.skn-hra1.MFR .zipsuffix{display:none}
        .skn-hra1 .zipsuffix,.skn-hra1.MES .zipprefix,.skn-hra1.MFR .zipprefix{display:inline}
        .skn-hra1.MDE .hide-de{display:none}

        /*Infographic*/
        .skn-hra1 .lang-sec,.skn-hra1 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-hra1 .lang-sec .field *,.skn-hra1 .lang-sec .nativeLangPara .field,.skn-hra1 .skli-sec .field *{display:inline}
        .skn-hra1 .lang-sec .paragraph,.skn-hra1 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0}
        .skn-hra1 .lang-sec .singlecolumn,.skn-hra1 .skli-sec .singlecolumn{margin-left:0;position:relative}
        .skn-hra1 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
        .skn-hra1 .lang-sec .nativeLangPara{width:100%!important}
        .skn-hra1 .inner-rating{background-color:#576d7b;height:4px;width:60%}
        .skn-hra1 .lang-sec > .paragraph:nth-last-child(1),.skn-hra1 .lang-sec > .paragraph:nth-last-child(2),
        .skn-hra1 .skli-sec > .paragraph:nth-last-child(1),.skn-hra1 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0}
        .skn-hra1 .hide-bar .rating-bar,.skn-hra1 .hide-colon .paragraph .colon,.skn-hra1 .hide-only-bar .rating-bar{display:none}
		.skn-hra1 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-hra1 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}

        /*HILT multi para/section*/
        .skn-hra1 .multi-para-hilt:after{content: "";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/
        .skn-hra1 .multi-para-hilt .paragraph{margin-bottom:10px;margin-top:0;width:49%;float:left}
        .skn-hra1 .multi-para-hilt .paragraph:last-child,.skn-hra1 .multi-para-hilt .paragraph:nth-last-child(2):nth-child(2n){margin-bottom:0}
        .skn-hra1 .multi-para-hilt .paragraph:nth-child(2n+1){margin-left:2%}
        .skn-hra1 .multi-para-hilt .paragraph:nth-child(2n){clear:left}
        .skn-hra1 .multi-para-hilt .singlecolumn{margin:0}
        .skn-hra1 .multi-section-hilt .multi-para-opt,.skn-hra1 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-hra1 .multi-para-hilt .twocol.skill{display:none}

        /*For Extra Space Before Colon*/
        .skn-hra1 .beforecolonspace{display:none!important}
        .skn-hra1.MFR .beforecolonspace{display:inline!important}

        /* GRYR */
        .skn-hra1 .displayNoneThisField{display:none}/* Keep this class always at bottom */

        /* Text alignment bullet */
       .skn-hra1 .ttc-align-left ul{text-align:left}
       .skn-hra1 .ttc-align-right ul{text-align:right}
       .skn-hra1 .ttc-align-center ul{text-align:center}
       .skn-hra1 .ttc-align-justify ul{text-align:justify}
       .skn-hra1 .ttc-align-right li,.skn-hra1 .ttc-align-center li{position:relative;list-style-position:inside;margin-left:0}
       .skn-hra1:not(.for-pdf) .ttc-align-right li:first-letter,.skn-hra1:not(.for-pdf) .ttc-align-center li:first-letter{margin-left:-5px}

        /*Hyphen Handling*/
        .skn-hra1 .hyphen:before{content:' - '}
        .skn-hra1.hyphen-en-dash .hyphen:before{content:' – '}


        .skn-hra1,.skn-hra1 table{line-height:14px}
        .skn-hra1.pagesize{width:545px}
        .skn-hra1.fontsize,.skn-hra1 .lang-sec .paragraph *,.skn-hra1 .skli-sec .paragraph *{font-size:12px}
        .skn-hra1.fontface{font-family:Times New Roman}
        .skn-hra1.vmargins{padding-top:12px;padding-bottom:12px}
        .skn-hra1.hmargins{padding-left:25px;padding-right:25px}
        .skn-hra1 .section{margin-top:4px}
        .skn-hra1 .firstsection{margin-top:0}
        .skn-hra1 .SECTION_CNTC{margin-top:0}
        .skn-hra1 .heading{margin-bottom:1px;height:14px}
        .skn-hra1 .paragraph{margin-top:3px}
        .skn-hra1 .firstparagraph{margin-top:0}
        .skn-hra1 .singlecolumn,.skn-hra1 .maincolumn{margin-left:105px}
        .skn-hra1 span.dates_wrapper{width:105px}
        .skn-hra1 .bottomborder{border-bottom:1px solid ${colorHex}}
        .skn-hra1 .sectiontitle{font-size:14px;line-height:16px;border-bottom:1px solid #FFF;color:${colorHex}}
        .skn-hra1 .name{color:${colorHex};font-size:24px;line-height:28px}
        .skn-hra1 .resumeTitle{font-size:16px;line-height:26px;padding:4px 0}
        .skn-hra1 .address{font-size:12px;line-height:14px;margin-top:4px}
        .skn-hra1 table.skills td{padding-top:1px}
		.skn-hra1 .skli-sec .singlecolumn .field:last-child{min-height:14px}
        .skn-hra1 .totl-expr{background-color:${colorHex};font-size:8px;line-height:12px}

        /* Style for Signature */
        .skn-hra1 .disclaim{margin:0;padding:0;margin-top:20px}
        .skn-hra1 .disclaim .heading{margin-bottom:2px}

        /*FIX for Re-calculating width of singlecolumn for CL*/
        .skn-hra1 .sectionCL .singlecolumn{margin-left:0;width:100%}
        .skn-hra1 .address2{font-size:12px;line-height:14px}

        /*Infographic*/
        .skn-hra1 .lang-sec,.skn-hra1 .skli-sec,.skn-hra1 .multi-para-hilt{padding-left:105px}
        .skn-hra1 .lang-sec .heading,.skn-hra1 .skli-sec .heading,.skn-hra1 .multi-para-hilt .heading{margin-left:-105px}
        .skn-hra1 .lang-sec .heading,.skn-hra1 .skli-sec .heading{width:calc(100% + 105px)}
        .skn-hra1 .lang-sec .paragraph,.skn-hra1 .skli-sec .paragraph{width:47.8%}
        .skn-hra1 .inner-rating{background-color:${colorHex}}
        .skn-hra1 .data-LNGG .doc-item,.skn-hra1 .data-SKLI .doc-item{width:100%}
        .skn-hra1 .lang-sec .sortable-item,.skn-hra1 .skli-sec .sortable-item{vertical-align:top;margin-top:0}
        .skn-hra1 .data-LNGG .sortableInner,.skn-hra1 .data-SKLI .sortableInner,.skn-hra1 .SECTION_LNGG .sortableInner,.skn-hra1 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-hra1 .data-LNGG .sortable-item,.skn-hra1 .data-SKLI .sortable-item{width:47.8%}
        .skn-hra1 .data-LNGG .sortable-item .paragraph,.skn-hra1 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}
        .skn-hra1 .lang-sec .native-lang{width:100%}
      `}</style>
      <div className="svg-skin">
        <div className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-hra1 HRA1 MUK hyphen-normal texp-rectangle expr-durt-none">
          {/* Name & Contact Section */}
          <div className="name-contact">
            <div className="section-prfl section SECTION_PRFL firstsection">
              <div className="doc-item">
                <div className="paragraph PARAGRAPH_PRFL firstparagraph">
                  <div>
                    <div className="name">
                      <span>{data.first_name}</span>
                      {data.first_name && data.last_name && <span> </span>}
                      <span>{data.last_name}</span>
                    </div>

                    <div className="address">
                      <span className="zipsuffix">
                        {data.street_address && <span>{data.street_address}</span>}
                        {data.street_address && data.city && <span>, </span>}
                        <span className="spaced">{data.city}</span>
                        <span className="spaced"> </span>
                        <span className="spaced">{data.postcode}</span>
                      </span>

                      {(data.street_address || data.city || data.postcode) && <br />}

                      <span>{data.phone}</span>
                      {data.phone && data.email && <span className="hyphen"></span>}
                      <span>{data.email}</span>
                    </div>

                    {/* Additional Contact Info */}
                    {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                      <div className="address">
                        {data.nationality && (
                          <>
                            <span className="dispInBlk maxWidth">
                              <span className="txtBold">
                                <span>Nationality</span>
                                <span className="beforecolonspace">&nbsp;</span>
                                <span>:</span>
                              </span>
                              <span> {data.nationality}</span>
                            </span>
                            {(data.driving_license || data.website || data.linkedin) && (
                              <span className="sprtr"> | </span>
                            )}
                          </>
                        )}

                        {data.driving_license && (
                          <>
                            <span className="dispInBlk maxWidth">
                              <span className="txtBold">
                                <span>Permit</span>
                                <span className="beforecolonspace">&nbsp;</span>
                                <span>:</span>
                              </span>
                              <span> {data.driving_license}</span>
                            </span>
                            {(data.website || data.linkedin) && (
                              <span className="sprtr"> | </span>
                            )}
                          </>
                        )}

                        {data.website && (
                          <>
                            <span className="dispInBlk maxWidth">
                              <span className="txtBold">
                                <span>Web</span>
                                <span className="beforecolonspace">&nbsp;</span>
                                <span>:</span>
                              </span>
                              <span className="brk-all"> {data.website}</span>
                            </span>
                            {data.linkedin && <span className="sprtr"> | </span>}
                          </>
                        )}

                        {data.linkedin && (
                          <span className="maxWidth social-link">
                            <span className="dispInBlk">
                              <span className="txtBold">
                                <span>LinkedIn</span>
                                <span className="beforecolonspace"> </span>
                                <span>: </span>
                              </span>
                              <span className="brk-all">{data.linkedin}</span>
                            </span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="parent-wrapper">
            {/* Professional Summary */}
            {data.summary && (
              <div className="sortable-item section-container SortableItem-sibling">
                <div className="section SECTION_SUMM has-title">
                  <div className="doc-item">
                    <div className="heading bottomborder">
                      <div className="sectiontitle">{t.professional_summary || "Professional summary"}</div>
                    </div>
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
            )}

            {/* Work Experience */}
            {data.experiences && data.experiences.length > 0 && (
              <div className="sortable-item section-container SortableItem-sibling">
                <div className="section expr-sec SECTION_EXPR multi-para has-title">
                  <div className="doc-item">
                    <div className="heading bottomborder">
                      <div className="sectiontitle">{t.work_history || "Work history"}</div>
                    </div>
                    <div className="sortableInner">
                      {data.experiences.map((exp, index) => (
                        <div key={exp.id || index} className="sortable-item paragraph-container SortableItem-sibling">
                          <div className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}>
                            <div className="clearfix doc-item">
                              <span className="dates_wrapper">
                                <span className="jobdates">{exp.start_date ? formatDate(exp.start_date, language) : ''}</span>
                                {exp.start_date && (exp.end_date || exp.currently_working) && <span className="hyphen"></span>}
                                <span className="jobdates">{exp.currently_working ? (t.present || 'Current') : (exp.end_date ? formatDate(exp.end_date, language) : '')}</span>
                              </span>
                              <div className="singlecolumn">
                                {exp.job_title && (
                                  <span className="paddedline">
                                    <span className="dflex texp-row">
                                      <span className="jobtitle jobtitle-cell">{exp.job_title}</span>
                                    </span>
                                  </span>
                                )}
                                {(exp.company || exp.location) && (
                                  <span className="paddedline">
                                    <span className="companyname">{exp.company}</span>
                                    {exp.company && exp.location && <span className="hyphen"></span>}
                                    <span className="joblocation jobcity">{exp.location}</span>
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
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="sortable-item section-container SortableItem-sibling">
                <div className="section SECTION_HILT has-title">
                  <div className="doc-item">
                    <div className="heading bottomborder">
                      <div className="sectiontitle">{t.skills || "Skills"}</div>
                    </div>
                    <div className="paragraph PARAGRAPH_HILT firstparagraph">
                      <div className="clearfix doc-item">
                        <div className="singlecolumn maincolumn">
                          <table className="twocol skill">
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
                </div>
              </div>
            )}

            {/* Education */}
            {data.educations && data.educations.length > 0 && (
              <div className="sortable-item section-container SortableItem-sibling">
                <div className="section SECTION_EDUC multi-para has-title">
                  <div className="doc-item">
                    <div className="heading bottomborder">
                      <div className="sectiontitle">{t.education || "Education"}</div>
                    </div>
                    <div className="sortableInner">
                      {data.educations.map((edu, index) => (
                        <div key={edu.id || index} className="sortable-item paragraph-container SortableItem-sibling">
                          <div className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}>
                            <div className="clearfix doc-item">
                              <span className="dates_wrapper">
                                {edu.start_date && <span>{formatDate(edu.start_date, language)}</span>}
                                <span dependency="GRST+GRED" class="hyphen"></span>
                                {edu.end_date && <span>{formatDate(edu.end_date, language)}</span>}
                              </span>
                              <div className="singlecolumn">
                                {(edu.degree || edu.field_of_study) && (
                                  <span className="paddedline">
                                    {edu.degree && <span className="degree">{edu.degree}</span>}
                                    {edu.degree && edu.field_of_study && <span>: </span>}
                                    {edu.field_of_study && <span className="programline">{edu.field_of_study}</span>}
                                  </span>
                                )}
                                {(edu.institution || edu.location) && (
                                  <span className="paddedline">
                                    <span className="companyname companyname_educ">{edu.institution}</span>
                                    {edu.institution && edu.location && <span className="hyphen"></span>}
                                    <span className="joblocation jobcity">{edu.location}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <div className="sortable-item section-container SortableItem-sibling data-LNGGsortable-item data-LNGG">
                <div className="section lang-sec hide-colon SECTION_LNGG has-title data-LNGG">
                  <div className="doc-item">
                    <div className="heading bottomborder">
                      <div className="sectiontitle">{t.languages || "Languages"}</div>
                    </div>
                    <div className="sortableInner">
                      {data.languages.map((lang, index) => (
                        <div key={lang.id || index} className="data-LNGG sortable-item paragraph-container SortableItem-sibling">
                          <div className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}>
                            <div className="clearfix doc-item">
                              <div className="singlecolumn">
                                <div className="field">
                                  <span className="txtBold">{lang.name}</span>
                                  <span className="colon">
                                    <span className="beforecolonspace"> </span>
                                    <span>: </span>
                                  </span>
                                </div>
                                <div className="rating-bar">
                                  <div className="inner-rating" style={{ width: getLevelWidth(lang.level) }}></div>
                                </div>
                                <div className="field">
                                  <span>{getProficiencyLabel(lang.proficiency)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
