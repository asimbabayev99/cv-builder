/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations, formatDate } from "@/lib/translations";

const defaultTranslations = translations.en;

export default function TemplateSma2({
  data = sampleData,
  translations: t = defaultTranslations,
  language = "en",
  colorHex = "#bcbfc3",
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
        body{line-height:1;background:#FFF;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-sma2 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        .skn-sma2 span.paddedline,.skn-sma2 span.dates_wrapper{display:block}
        .skn-sma2 .logo,.skn-sma2 .nodisplay{display:none}
        .skn-sma2 .txtReglr{font-weight:regular}
        .skn-sma2 .txtBold{font-weight:bold}
        .skn-sma2 span.dates_wrapper{float:left}
        .skn-sma2 .flt-right{float:right}
		.skn-sma2 .dispInBlk{display:inline-block}
		.skn-sma2 .maxWidth{max-width:100%}
        .skn-sma2 .brk-all{word-break:break-all}

        /*START content disc style for LI*/
        .skn-sma2 ul,.skn-sma2 li{list-style:none;margin:0 0 0 8px;padding:0}
        .skn-sma2 ul li{position:relative;margin:0 0 0 5px}
        .skn-sma2 ul li:before{content:'\\25CF\\0020';position:absolute;left:-13px;top:0}
        /*END content disc style for LI*/

        .skn-sma2{color:#4a4a4a;background-color:#fff;word-wrap:break-word;min-height:792px}
        .skn-sma2 .sectiontitle{font-weight:bold;text-transform:uppercase;letter-spacing:.5px}
        .skn-sma2 .SECTION_CNTC,.skn-sma2 div.firstsection{border:none;padding:0}
        .skn-sma2 .sectiontitle,.skn-sma2 .singlecolumn,.skn-sma2 .maincolumn,.skn-sma2 .parlrColmn{padding:0 10px}
        .skn-sma2 .parlrColmn .singlecolumn{padding:0 0 0 10px}
        .skn-sma2 .name{font-size:15px;line-height:17px;padding:0;text-transform:uppercase;text-align:center}
        .skn-sma2 .resumeTitle{text-align:center;color:#4a4a4a;text-transform:lowercase}
        .skn-sma2 .resumeTitle:first-letter{text-transform:uppercase}/*To make sentence case*/
        .skn-sma2 .paragraph{position:relative}
        .skn-sma2 .heading{background-color:${colorHex};color:#fff;clear:both;font-weight:normal;margin-bottom:10px}
        .skn-sma2 .address{position:relative;text-align:center;font-size:0.917em;line-height:1.25em}
        .skn-sma2 .address2{position:relative;text-align:left;font-size:0.917em;line-height:1.25em}
        .skn-sma2 .table_wrapper{width:100%;margin-top:0}
		.skn-sma2 .skill{display:table;width:100%;table-layout:fixed}
        .skn-sma2 table.twocol td{width:50%;display:table-cell}
        .skn-sma2 table.twocol td + td{padding-left:2%}
        .skn-sma2 table.skills th,.skn-sma2 table.skills td{width:20%;text-align:center}
        .skn-sma2 table.skills th{text-decoration:underline}
        .skn-sma2 table.skills .skillname,.skn-sma2 table.skills .skillrating{text-align:left;width:35%}
        .skn-sma2 table.skills .skillrating{width:20%}
        .skn-sma2 table.skills .skillyears,.skn-sma2 table.skills .skilllast{width:19%}
        .skn-sma2 table.skills .pad1{width:5%}
        .skn-sma2 table.skills .pad2,.skn-sma2 table.skills .pad3{width:1%}
        .skn-sma2 .parlrColmn{clear:both}
        .skn-sma2 .adnlLnks{text-align:center}
        .skn-sma2 .social-link .sprtr{padding:0 2px}
        .skn-sma2 .social-link:last-child .sprtr{display:none}

        .skn-sma2 .totl-expr{display:inline-block;padding:0 6px;color:#fff;font-weight:400;vertical-align:top}
        .skn-sma2.texp-curved .totl-expr{border-radius:10px}

        /*Personal details section*/
        .skn-sma2 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-sma2 .details-wrap{width:49%}

        /*FIX for FORCEFULLY making left margin ZERO for CL*/
        .skn-sma2 .sectionCL .paragraph{padding-top:0}
        .skn-sma2 .sprtr + .sprtr{display:none}

        /*MES and MFR address order code*/
        .skn-sma2 .zipprefix,.skn-sma2.MES .zipsuffix,.skn-sma2.MFR .zipsuffix{display:none}
        .skn-sma2 .zipsuffix,.skn-sma2.MES .zipprefix,.skn-sma2.MFR .zipprefix{display:inline}
        .skn-sma2.MDE .hide-de{display:none}

        /*Infographic*/
        .skn-sma2 .lang-sec,.skn-sma2 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-sma2 .lang-sec .heading,.skn-sma2 .skli-sec .heading{width:100%;flex-grow:1}
        .skn-sma2 .lang-sec .paragraph, .skn-sma2 .skli-sec .paragraph{width:48.5%}
        .skn-sma2 .lang-sec .field *,.skn-sma2 .lang-sec .nativeLangPara .field,.skn-sma2 .skli-sec .field *{display:inline}
        .skn-sma2 .lang-sec .paragraph,.skn-sma2 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0;padding-top:0}
        .skn-sma2 .lang-sec .singlecolumn,.skn-sma2 .skli-sec .singlecolumn{margin-left:0;position:relative}
        .skn-sma2 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
        .skn-sma2 .section.lang-sec .paragraph.nativeLangPara{width:100%;padding-bottom:5px}
        .skn-sma2 .inner-rating{background-color:${colorHex};height:4px;width:60%}
        .skn-sma2 .lang-sec > .paragraph:nth-last-child(1),.skn-sma2 .lang-sec > .paragraph:nth-last-child(2),
        .skn-sma2 .skli-sec > .paragraph:nth-last-child(1),.skn-sma2 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0}
        .skn-sma2 .hide-bar .rating-bar,.skn-sma2 .hide-colon .colon,.skn-sma2 .hide-only-bar .rating-bar{display:none}
        .skn-sma2 .lang-sec .para_odd .singlecolumn,.skn-sma2 .skli-sec .para_odd .singlecolumn{padding-right:0}
        .skn-sma2 .lang-sec .para_even .singlecolumn,.skn-sma2 .skli-sec .para_even .singlecolumn{padding-left:0}

		.skn-sma2 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-sma2 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}

        /*HILT multi para/section*/
        .skn-sma2 .multi-section-hilt .multi-para-opt,.skn-sma2 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-sma2 .multi-para-hilt .dflt-view{display:none}
        .skn-sma2 .multi-para-hilt:after{content:"";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/
	    .skn-sma2 .multi-para-hilt .paragraph .singlecolumn{margin-left:0}
        .skn-sma2 .multi-para-hilt .paragraph{width:49%;max-width:49%;display:block;float:left;clear:none;margin-top:0px;margin-right:2%;margin-bottom:10px;padding-top:0}
        .skn-sma2 .multi-para-hilt .paragraph:nth-child(2n+1){margin-right:0}
        .skn-sma2 .multi-para-hilt .paragraph:last-child,.skn-sma2 .multi-para-hilt .paragraph:nth-last-child(2){margin-bottom:0}

        /* GRYR */
        .skn-sma2 .displayNoneThisField{display:none}/* Keep this class always at bottom */
        .skn-sma2 .section.sign{padding-top:50px}

        /*For Extra Space Before Colon*/
        .skn-sma2 .beforecolonspace{display:none!important}
        .skn-sma2.MFR .beforecolonspace{display:inline!important}

        /* Style for Signature */
        .skn-sma2 .disclaim .singlecolumn,.skn-sma2 .disclaim .singlecolumn li,.skn-sma2 .disclaim .singlecolumn p,.skn-sma2 .disclaim .singlecolumn span{font-size:9px;color:#8a8a8a}
        .skn-sma2 .field_sign{font-size:7px;color:#8a8a8a}
        .skn-sma2 .txtleft + .field_sign{text-align:left}
        .skn-sma2 .txtcenter + .field_sign{text-align:center}
        .skn-sma2 .txtright + .field_sign{text-align:right}
        .skn-sma2 .signPic img{max-width:100%}

        /* Text Align Adjust */

        .skn-sma2 .ttc-align-left ul{text-align:left}
        .skn-sma2 .ttc-align-right ul{text-align:right}
        .skn-sma2 .ttc-align-center ul{text-align:center}
        .skn-sma2 .ttc-align-justify ul{text-align:justify}
        .skn-sma2 .ttc-align-right li:before,.skn-sma2 .ttc-align-center li:before{position:relative;left:-1.5px}



        .skn-sma2,.skn-sma2 table{line-height:15px}
        .skn-sma2.pagesize{width:515px}
        .skn-sma2.fontsize,.skn-sma2 .lang-sec .paragraph *,.skn-sma2 .skli-sec .paragraph *{font-size:11px}
        .skn-sma2.fontface{font-family:Century Gothic}
        .skn-sma2.vmargins{padding-top:40px; padding-bottom:40px}
        .skn-sma2.hmargins{padding-left:40px; padding-right:40px}
        .skn-sma2 .section{padding-top:25px}
        .skn-sma2 .sectiontitle{font-size:11px; line-height:15px}
        .skn-sma2 .paragraph{padding-top:10px}
        .skn-sma2 .paragraph.firstparagraph{padding-top:0}
        .skn-sma2 .singlecolumn,.skn-sma2 .maincolumn{margin-left:0px}
        .skn-sma2 table.skills td{padding-top:5px}
        .skn-sma2 .name{font-size:40px; line-height:44px}
        .skn-sma2 .resumeTitle{font-size:15px;line-height:15px;padding:8px 0}
        .skn-sma2 .address{font-size:11px; line-height:15px; margin-top:4px}
        .skn-sma2 span.dates_wrapper{width:185px}
        .skn-sma2 .parlrColmn .singlecolumn{margin-left:185px;width:auto}
		.skn-sma2 .skli-sec .singlecolumn .field:last-child{min-height:15px}
		.skn-sma2 .totl-expr{background-color:${colorHex};font-size:8px;line-height:12px}

        /*FIX for Re-calculating width of singlecolumn for CL*/
        .skn-sma2 .sectionCL{border:none;padding-top:none}
        .skn-sma2 .sectionCL .singlecolumn{margin-left:0;width:100%}
        .skn-sma2 .address2{font-size:11px; line-height:15px}

        /*Infographic*/
        .skn-sma2 .lang-sec .sortable-item,.skn-sma2 .skli-sec .sortable-item{display:inline-block;vertical-align:top}
        .skn-sma2 .lang-sec .heading, .skn-sma2 .skli-sec .heading{margin-left: -0px}
        .skn-sma2 .lang-sec, .skn-sma2 .skli-sec{padding-left:0px}

        /* Multi para hilt */
        .skn-sma2 .multi-para-hilt{margin-left:0px}
        .skn-sma2 .multi-para-hilt .heading{margin-left:-0px}

        /*Finalize Fixes*/
        .page-finalize .skn-sma2 .sortableInner .paragraph-container+.paragraph-container{margin:0}
        .skn-sma2 .lang-sec .sortableInner .sortable-item:not(:first-child) .paragraph,.skn-sma2 .skli-sec .sortableInner .sortable-item:not(:first-child) .paragraph{vertical-align:top}
        .skn-sma2 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}
        .skn-sma2 .data-LNGG .sortable-item.native-lang{width:100%;max-width:100%}
        .skn-sma2 .data-LNGG .doc-item,.skn-sma2 .data-SKLI .doc-item,.skn-sma2 .lang-sec .doc-item,.skn-sma2 .skli-sec .doc-item{width:100%}
        .skn-sma2 .data-LNGG .sortableInner,.skn-sma2 .data-SKLI .sortableInner,.skn-sma2 .SECTION_LNGG .sortableInner,.skn-sma2 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-sma2 .data-LNGG .sortable-item,.skn-sma2 .data-SKLI .sortable-item{width:48.5%}
        .skn-sma2 .data-LNGG .sortable-item .paragraph,.skn-sma2 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}

		/*Fixes for builder for skill*/
        .skn-sma2 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:15px}
        .skn-sma2 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-sma2 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}
        .skn-sma2 .lang-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-sma2 .lang-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph, .skn-sma2  .skli-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-sma2  .skli-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0}

        /*PDF Flex Handling Code - Personal Information*/
		.skn-sma2.for-pdf .pdet-sec .singlecolumn{display:block}
		.skn-sma2.for-pdf .pdfpdwrapper{display:block}
		.skn-sma2.for-pdf .pdfpdwrapper .details-wrap:first-child{float:left;padding-right:5px}
		.skn-sma2.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){float:right}
		.skn-sma2.for-pdf .pdfpdwrapper .details-wrap{width:243px!important;}

        .skn-sma2.for-pdf .lang-sec .heading, .skn-sma2.for-pdf .skli-sec .heading{width:unset}

    /*Infographic Containers*/
    .skn-sma2.for-pdf .lang-sec,.skn-sma2.for-pdf .skli-sec{display:block}
    .skn-sma2.for-pdf .pdfinfwrapper{display:block}
    .skn-sma2.for-pdf .pdfinfwrapper:after{content:'';clear:both;display:table}
    .skn-sma2.for-pdf .pdfinfwrapper .paragraph:first-child{float:left}
    .skn-sma2.for-pdf .pdfinfwrapper .paragraph:nth-child(2){float:right}
    .skn-sma2.for-pdf .pdfinfwrapper:last-child .paragraph{margin-bottom:0;padding-bottom:0}
    `}</style>
      <div className="svg-skin">
        <div className="" tabIndex={0}>
          <div></div>
          <div className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-sma2 SMA2 MUK texp-rectangle">
            <div className="name-contact">
              <div></div>
              <div></div>
              <div className="section SECTION_PRFL firstsection" data-section-cd="PRFL">
                <div className="doc-item">
                  <div className="">
                    <div className="">
                      <div className="paragraph PARAGRAPH_PRFL firstparagraph">
                        <div>
                          <div className="name" data-uppercase="true">
                            <span>{data.first_name}</span>
                            <span> </span>
                            <span>{data.last_name}</span>
                          </div>

                          <div className="address">
                            <span className="paddedline">
                              <span>{data.email}</span>
                              {data.email && data.phone && <span><span className="sprtr"> | </span></span>}
                              <span>{data.phone}</span>
                              {data.phone && (data.street_address || data.city || data.postcode) && (
                                <span><span className="sprtr"> | </span></span>
                              )}
                              <span className="zipsuffix">
                                {data.street_address && <span>{data.street_address}</span>}
                                {data.street_address && data.city && <span>, </span>}
                                <span className="spaced">{data.city}</span>
                                <span className="spaced"> </span>
                                <span className="spaced">{data.postcode}</span>
                              </span>
                            </span>
                          </div>

                          {/* Additional Contact Info */}
                          {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                            <div className="address">
                              {data.nationality && (
                                <>
                                  <span className="dispInBlk maxWidth">
                                    <span className="txtBold">
                                      <span className="xslt_static_change">Nationality</span>
                                      <span className="beforecolonspace">&nbsp;</span>
                                      <span>:</span>
                                    </span>
                                    <span> {data.nationality}</span>
                                  </span>
                                  {(data.driving_license || data.website || data.linkedin) && (
                                    <span><span className="sprtr"> | </span></span>
                                  )}
                                </>
                              )}

                              {data.driving_license && (
                                <>
                                  <span className="dispInBlk maxWidth">
                                    <span className="txtBold">
                                      <span className="xslt_static_change">Permit</span>
                                      <span className="beforecolonspace">&nbsp;</span>
                                      <span>:</span>
                                    </span>
                                    <span> {data.driving_license}</span>
                                  </span>
                                  {(data.website || data.linkedin) && (
                                    <span><span className="sprtr"> | </span></span>
                                  )}
                                </>
                              )}

                              {data.website && (
                                <>
                                  <span className="dispInBlk maxWidth">
                                    <span className="txtBold">
                                      <span className="xslt_static_change">Web</span>
                                      <span className="beforecolonspace">&nbsp;</span>
                                      <span>:</span>
                                    </span>
                                    <span> {data.website}</span>
                                  </span>
                                  {data.linkedin && <span><span className="sprtr"> | </span></span>}
                                </>
                              )}

                              {data.linkedin && (
                                <span className="maxWidth dispInBlk social-link">
                                  <span className="txtBold">
                                    <span>LinkedIn</span>
                                    <span className="beforecolonspace"> </span>
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
            </div>

            <div className="parent-wrapper">
              {/* Professional Summary */}
              {data.summary && (
                <div className="sortable-item section-container SortableItem-sibling">
                  <div className="section SECTION_SUMM has-title" data-section-cd="SUMM">
                    <div className="doc-item">
                      <div className="heading">
                        <div className="sectiontitle">{t.professional_summary || "PROFESSIONAL SUMMARY"}</div>
                      </div>
                      <div className="">
                        <div className="">
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
                  </div>
                </div>
              )}

              {/* Work Experience */}
              {data.experiences && data.experiences.length > 0 && (
                <div className="sortable-item section-container SortableItem-sibling">
                  <div className="section SECTION_EXPR multi-para has-title" data-section-cd="EXPR">
                    <div className="doc-item">
                      <div className="heading">
                        <div className="sectiontitle">{t.work_history || "Work history"}</div>
                      </div>
                      <div className="">
                        <div className="sortableInner">
                          {data.experiences.map((exp, index) => (
                            <div key={exp.id || index} className="sortable-item paragraph-container SortableItem-sibling">
                              <div className={`paragraph parlrColmn PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}>
                                <div className="clearfix doc-item">
                                  <span className="dates_wrapper txtReglr">
                                    <span className="paddedline">
                                      <div>
                                        <span className="jobdates">{exp.start_date ? formatDate(exp.start_date, language) : ''}</span>
                                        {exp.start_date && (exp.end_date || exp.currently_working) && <span> - </span>}
                                        <span className="jobdates">
                                          {exp.currently_working ? (t.present || 'Current') : (exp.end_date ? formatDate(exp.end_date, language) : '')}
                                        </span>
                                      </div>
                                    </span>
                                    {exp.job_title && (
                                      <span className="paddedline">
                                        <span className="jobtitle txtBold">{exp.job_title}</span>
                                      </span>
                                    )}
                                    {(exp.company || exp.location) && (
                                      <span className="paddedline">
                                        <span className="companyname">{exp.company}</span>
                                        {exp.company && exp.location && <span> -</span>}
                                        <span className="joblocation jobcity"> {exp.location}</span>
                                      </span>
                                    )}
                                  </span>
                                  <div className="singlecolumn">
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
                </div>
              )}

              {/* Skills */}
              {skills.length > 0 && (
                <div className="sortable-item section-container SortableItem-sibling">
                  <div className="section SECTION_HILT has-title" data-section-cd="HILT">
                    <div className="doc-item">
                      <div className="heading">
                        <div className="sectiontitle">{t.skills || "SKILLS"}</div>
                      </div>
                      <div className="">
                        <div className="">
                          <div className="paragraph PARAGRAPH_HILT firstparagraph">
                            <div className="clearfix doc-item">
                              <div className="singlecolumn maincolumn">
                                <table className="twocol skill dflt-view">
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
                  </div>
                </div>
              )}

              {/* Education */}
              {data.educations && data.educations.length > 0 && (
                <div className="sortable-item section-container SortableItem-sibling">
                  <div className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC">
                    <div className="doc-item">
                      <div className="heading">
                        <div className="sectiontitle">{t.education || "EDUCATION"}</div>
                      </div>
                      <div className="">
                        <div className="sortableInner">
                          {data.educations.map((edu, index) => (
                            <div key={edu.id || index} className="sortable-item paragraph-container SortableItem-sibling">
                              <div className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}>
                                <div className="clearfix doc-item">
                                  <div className="singlecolumn">
                                    <span className="paddedline">
                                      {edu.start_date && <span>{formatDate(edu.start_date, language, 'year')}</span>}
                                      {edu.start_date && edu.end_date && <span> - </span>}
                                      {edu.end_date && <span>{formatDate(edu.end_date, language, 'year')}</span>}
                                    </span>
                                    {(edu.degree || edu.field_of_study) && (
                                      <span className="paddedline">
                                        {edu.degree && <span className="degree txtBold">{edu.degree}</span>}
                                        {edu.degree && edu.field_of_study && (
                                          <>
                                            <span className="beforecolonspace">&nbsp;</span>
                                            <span>: </span>
                                          </>
                                        )}
                                        {edu.field_of_study && <span className="programline">{edu.field_of_study}</span>}
                                      </span>
                                    )}
                                    {(edu.institution || edu.location) && (
                                      <span className="paddedline">
                                        <span className="companyname">{edu.institution}</span>
                                        {edu.institution && edu.location && <span> |</span>}
                                        <span className="joblocation jobcity"> {edu.location}</span>
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
                </div>
              )}

              {/* Languages */}
              {data.languages && data.languages.length > 0 && (
                <div className="sortable-item section-container SortableItem-sibling data-LNGGsortable-item data-LNGG">
                  <div className="section lang-sec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
                    <div className="doc-item">
                      <div className="heading">
                        <div className="sectiontitle">{t.languages || "LANGUAGES"}</div>
                      </div>
                      <div className="">
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
