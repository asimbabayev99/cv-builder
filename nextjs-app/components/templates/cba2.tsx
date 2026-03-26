import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations, formatDate } from "@/lib/translations";

const defaultTranslations = translations.en;

export default function TemplateCba2({
  data = sampleData,
  translations: t = defaultTranslations,
  language = "az",
  colorHex = "#000000",
}: Partial<DynamicTemplateProps> = {}) {
  const skills = data.skills || [];
  const midpoint = Math.ceil(skills.length / 2);
  const skillsColumn1 = skills.slice(0, midpoint);
  const skillsColumn2 = skills.slice(midpoint);

  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-cba2 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        .skn-cba2 span.jobtitle,.skn-cba2 span.companyname,.skn-cba2 span.degree{font-weight:bold}
		.skn-cba2 .txt-nrml{font-weight:400}
        .skn-cba2 span.paddedline{display:block}
        .skn-cba2 .nodisplay,.skn-cba2 .logo{display:none}
        .skn-cba2 .txtBold{font-weight:bold}
        .skn-cba2 .flt-right{float:right}
		.skn-cba2 .dispInBlk{display:inline-block!important}
		.skn-cba2 .maxWidth{max-width:100%}
		.skn-cba2 .bottom-space{padding-bottom:5px}
		.skn-cba2 .brk-all{word-break:break-all}

        .skn-cba2{word-wrap:break-word;text-size-adjust:none;-ms-text-size-adjust:none;-moz-text-size-adjust:none;-webkit-text-size-adjust:none;color:#000;min-height:792px}
        .skn-cba2 ul,.skn-cba2 li{list-style-type:disc;margin:0 0 0 10px;padding:0}
        .skn-cba2 ul li{margin:0 0 5px 10px}
		.skn-cba2 ul li:last-child{margin-bottom:0}
        .skn-cba2 .address li,.skn-cba2 .address ul,.skn-cba2 .adnlLnks li,.skn-cba2 .adnlLnks ul{display:inline;margin:0;padding:0;list-style:none}
        .skn-cba2 .address li:before,.skn-cba2 .adnlLnks li:before{content:"\\25C6\\0020";vertical-align:bottom;padding:0 10px}
        .skn-cba2 .address li.first:before,.skn-cba2 .address li:first-child:before,.skn-cba2 .adnlLnks li:first-child:before{content:" "}

        .skn-cba2 .lowerborder{border-bottom:1px solid;margin:1px 0 2px 0;display:block}
        .skn-cba2 .lowerborder2{border-top:3px solid;display:block}
        .skn-cba2 .SECTION_CNTC,.skn-cba2 .SECTION_ALNK{margin-top:0}
		.skn-cba2 .address.new-fields{padding-bottom:10px}
        .skn-cba2 .firstsection.section{margin-top:0}
        .skn-cba2 .name{font-size:15px;line-height:17px;padding-top:10px;font-weight:bold;border-top:1px solid;text-align:center;font-variant:small-caps}
        .skn-cba2 .resumeTitle{text-align:center;color:#4a4a4a}
        .skn-cba2 .paragraph{position:relative}
        .skn-cba2 .heading{width:100%;flex-grow:1;clear:both;text-align:center;font-weight:normal;font-variant:small-caps;position:relative;font-size: initial}
        .skn-cba2 .heading:before{border-top:1px solid black;content:"";display:block;height:1px;position:absolute;top:50%;width:100%;z-index:1}
        .skn-cba2 .section{position:relative}
        .skn-cba2 .sectiontitle{display:inline-block;position:relative;z-index:5;background:#FFF;padding:0 10px}
        .skn-cba2 .address{position:relative;text-align:center;font-size:0.917em;line-height:1.25em;padding-top:11px}
        .skn-cba2 .adnlLnks{text-align:center}
        .skn-cba2 .address2{position:relative;text-align:left;font-size:0.917em;line-height:1.25em}
        .skn-cba2 .table_wrapper{width:100%;margin-top:0}
		.skn-cba2 .skill{display:table;width:100%;table-layout:fixed}
        .skn-cba2 table.twocol td{width:50%;vertical-align:top;display:table-cell}
        .skn-cba2 table.skills th,.skn-cba2 table.skills td{width:20%;text-align:center}
        .skn-cba2 table.skills th{text-decoration:underline}
        .skn-cba2 table.skills .skillname,.skn-cba2 table.skills .skillrating{text-align:left;width:35%}
        .skn-cba2 table.skills .skillrating{width:20%}
        .skn-cba2 table.skills .skillyears,.skn-cba2 table.skills .skilllast{width:19%}
        .skn-cba2 table.skills .pad1{width:5%}
        .skn-cba2 table.skills .pad2,.skn-cba2 table.skills .pad3{width:1%}
        .skn-cba2 .paragraph-fieldgroup .address{padding-bottom:10px}
        .skn-cba2 .address .fieldgroup{display:block}
        .skn-cba2 .address .fieldgroup:nth-child(2){padding-top:8px;display:inline-block}
        .skn-cba2 .address .fieldgroup:nth-child(2):empty{display:none}
        .skn-cba2 .totl-expr{display:inline-block;padding:1px 6px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap;margin-left:3px}
        .skn-cba2.texp-curved .totl-expr{border-radius:10px}
        .skn-cba2 .dflex{display:flex;justify-content:space-between}

        /*Personal details section*/
        .skn-cba2 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-cba2 .details-wrap{width:49%;margin-bottom:5px}
        .skn-cba2 .details-wrap:nth-last-child(1),.skn-cba2 .details-wrap:nth-last-child(2){margin-bottom:0}

        /*FIX for FORCEFULLY making left margin ZERO for CL*/
        .skn-cba2 .sectionCL .paragraph{margin-top:0}

        /* Style for Signature */
        .skn-cba2 .disclaim .singlecolumn,.skn-cba2 .signPic > .field_sign{margin-left:0}
        .skn-cba2 .disclaim .singlecolumn,.skn-cba2 .disclaim .singlecolumn li,.skn-cba2 .disclaim .singlecolumn p,.skn-cba2 .disclaim .singlecolumn span{font-size:9px;color:#8a8a8a}
        .skn-cba2 .field_sign{font-size:7px;color:#8a8a8a}
        .skn-cba2 .txtleft + .field_sign{text-align:left}
        .skn-cba2 .txtcenter + .field_sign{text-align:center}
        .skn-cba2 .txtright + .field_sign{text-align:right}
        .skn-cba2 .signPic span:first-child{padding-right:6px}
        .skn-cba2 .signPic img{padding-top:5px;max-width:100%}

        /*MES and MFR address order code*/
        .skn-cba2 .zipprefix,.skn-cba2.MES .zipsuffix,.skn-cba2.MFR .zipsuffix{display:none!important}
        .skn-cba2 .zipsuffix,.skn-cba2.MES .zipprefix,.skn-cba2.MFR .zipprefix{display:inline!important}
        .skn-cba2.MDE .hide-de{display:none}

        /*Infographic*/
        .skn-cba2 .lang-sec,.skn-cba2 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-cba2 .lang-sec .field *,.skn-cba2 .lang-sec .nativeLangPara .field,.skn-cba2 .skli-sec .field *{display:inline}
        .skn-cba2 .lang-sec .paragraph,.skn-cba2 .skli-sec .paragraph{display:inline-block;vertical-align:top;padding-bottom:5px;margin-top:0}
        .skn-cba2 .lang-sec .singlecolumn,.skn-cba2 .skli-sec .singlecolumn{margin-left:0;position:relative}
        .skn-cba2 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
        .skn-cba2 .lang-sec .paragraph.nativeLangPara{width:100%}
        .skn-cba2 .inner-rating{background-color:#000;height:4px;width:60%}
        .skn-cba2 .lang-sec > .paragraph:nth-last-child(1),.skn-cba2 .lang-sec > .paragraph:nth-last-child(2),
        .skn-cba2 .skli-sec > .paragraph:nth-last-child(1),.skn-cba2 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0}
		.skn-cba2 .hide-bar .rating-bar,.skn-cba2 .hide-colon .colon,.skn-cba2 .hide-only-bar .rating-bar{display:none}
		.skn-cba2 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-cba2 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}

        /*HILT multi para/section*/
        .skn-cba2 .multi-para-hilt:after{content: "";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/
        .skn-cba2 .multi-para-hilt .paragraph{margin-bottom:15px;margin-top:0;width:49%;float:left}
        .skn-cba2 .multi-para-hilt .paragraph:last-child,.skn-cba2 .multi-para-hilt .paragraph:nth-last-child(2):nth-child(2n){margin-bottom:0}
        .skn-cba2 .multi-para-hilt .paragraph:nth-child(2n+1){margin-left:2%}
        .skn-cba2 .multi-para-hilt .paragraph:nth-child(2n){clear:left}
        .skn-cba2 .multi-para-hilt .singlecolumn{margin:0}
        .skn-cba2 .multi-section-hilt .multi-para-opt,.skn-cba2 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-cba2 .multi-para-hilt .twocol.skill{display:none}
        .skn-cba2 .multi-para-content .bottom-space{display:block}
        .skn-cba2 .para-head{margin-bottom:5px}

       /*For Extra Space Before Colon*/
        .skn-cba2 .beforecolonspace{display:none!important}
        .skn-cba2.MFR .beforecolonspace{display:inline!important}

        /* GRYR */
        .skn-cba2 .displayNoneThisField{display:none}/* Keep this class always at bottom */

        /* Text alignment bullet */
       .skn-cba2 .ttc-align-left ul{text-align:left}
       .skn-cba2 .ttc-align-right ul{text-align:right}
       .skn-cba2 .ttc-align-center ul{text-align:center}
       .skn-cba2 .ttc-align-justify ul{text-align:justify}
       .skn-cba2 .ttc-align-right li,.skn-cba2 .ttc-align-center li{position:relative;list-style-position:inside;margin-left:0}
       .skn-cba2:not(.for-pdf) .ttc-align-right li:first-letter,.skn-cba2:not(.for-pdf) .ttc-align-center li:first-letter{margin-left:-6px}

        /*Hyphen Handling*/
        .skn-cba2 .hyphen:before{content:' - '}
        .skn-cba2.hyphen-en-dash .hyphen:before{content:' – '}


        .skn-cba2,.skn-cba2 table{line-height:14px}
        .skn-cba2.pagesize{width:535px}
        .skn-cba2.fontsize,.skn-cba2 .lang-sec .paragraph *,.skn-cba2 .skli-sec .paragraph *{font-size:12px}
        .skn-cba2.fontface{font-family:Times New Roman}
        .skn-cba2.vmargins{padding-top:25px;padding-bottom:25px}
        .skn-cba2.hmargins{padding-left:30px;padding-right:30px}
        .skn-cba2 .section{margin-top:15px}
        .skn-cba2 .sectiontitle{font-size:15px;line-height:17px}
        .skn-cba2 .heading{margin-bottom:5px}
        .skn-cba2 .paragraph{margin-top:15px}
        .skn-cba2 .firstparagraph{margin-top:0}
        .skn-cba2 .singlecolumn,.skn-cba2 .maincolumn{margin-left:0px}
        .skn-cba2 table.skills td{padding-top:7px}
        .skn-cba2 .name{font-size:24px;line-height:32px}
        .skn-cba2 .resumeTitle{font-size:16px;line-height:26px;padding:0 0 10px 0}
        .skn-cba2 .address{font-size:11px;line-height:13px;padding-top:8px}
        .skn-cba2 .address li:before,.skn-cba2 .adnlLnks li:before{font-size:10px}
        .skn-cba2 .name,.skn-cba2 .sectiontitle{color:${colorHex}}
        .skn-cba2 .lowerborder,.skn-cba2 .lowerborder2,.skn-cba2 .heading:before{border-color:${colorHex}}
		.skn-cba2 .skli-sec .singlecolumn .field:last-child{min-height:14px}
        .skn-cba2 .totl-expr{background-color:${colorHex};font-size:8px;line-height:12px}

        /* Style for Signature */
        .skn-cba2 .disclaim{margin:0;padding:0;margin-top:50px}
        .skn-cba2 .disclaim .heading{margin-bottom:2px}

        /*FIX for Re-calculating width of singlecolumn for CL*/
        .skn-cba2 .sectionCL .singlecolumn{margin-left:0;width:100%}
        .skn-cba2 .address2{font-size:12px;line-height:14px}

        /*Infographic*/
        .skn-cba2 .lang-sec,.skn-cba2 .skli-sec,.skn-cba2 .multi-para-hilt{padding-left:0px}
        .skn-cba2 .lang-sec .heading,.skn-cba2 .skli-sec .heading,.skn-cba2 .multi-para-hilt .heading{margin-left:-0px}
        .skn-cba2 .lang-sec .paragraph,.skn-cba2 .skli-sec .paragraph{width:48.3%}
        .skn-cba2 .lang-sec .heading, .skn-cba2 .skli-sec .heading{width:calc(100% + 0px)}
        .skn-cba2 .inner-rating{background-color:${colorHex}}
		.skn-cba2 .lang-sec .sortable-item,.skn-cba2 .skli-sec .sortable-item{vertical-align:top}


		/*Finalize Fixes*/
        .skn-cba2 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}
		.page-finalize .skn-cba2 .sortableInner .paragraph-container+.paragraph-container{margin:0}
        .skn-cba2 .data-LNGG .doc-item,.skn-cba2 .data-SKLI .doc-item{width:100%}
        .skn-cba2 .data-LNGG .sortableInner,.skn-cba2 .data-SKLI .sortableInner,.skn-cba2 .SECTION_LNGG .sortableInner,.skn-cba2 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-cba2 .data-LNGG .sortable-item,.skn-cba2 .data-SKLI .sortable-item{width:48.3%}
        .skn-cba2 .data-LNGG .sortable-item .paragraph,.skn-cba2 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}
        .skn-cba2 .lang-sec .native-lang{width:100%}

	    /*Fixes for builder for skill*/
        .skn-cba2 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:14px}
        .skn-cba2 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-cba2 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}
	    .skn-cba2 .lang-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-cba2 .lang-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph, .skn-cba2  .skli-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-cba2  .skli-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0!important}

		/*PDF Flex Handling Code - Personal Information*/
		.skn-cba2.for-pdf .pdfpdwrapper{display:block}
		.skn-cba2.for-pdf .pdfpdwrapper .details-wrap:first-child{float:left;padding-right:5px}
		.skn-cba2.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){float:right}
		.skn-cba2.for-pdf .pdfpdwrapper .details-wrap{width:265px!important;padding-bottom:5px!important}

        /*CSS for Infographic PDFWrapper*/
        .skn-cba2.for-pdf .lang-sec,.skn-cba2.for-pdf .skli-sec{display: block;}
        .skn-cba2.for-pdf .section .pdfinfwrapper{display:block;width:100%}
        .skn-cba2.for-pdf .section .pdfinfwrapper:after{content:'';clear:both;display:table}
        .skn-cba2.for-pdf .section .pdfinfwrapper .paragraph:first-child{float:left}
        .skn-cba2.for-pdf .section .pdfinfwrapper .paragraph:nth-child(2){float:right}
        .skn-cba2.for-pdf .section .pdfinfwrapper .paragraph{margin-bottom:5px;padding-bottom: 0px;}
        .skn-cba2.for-pdf .section .pdfinfwrapper:last-child .paragraph{margin-bottom:0}
        .skn-cba2.for-pdf .section .pdfinfwrapper .paragraph{clear: none;}

         /*PDF Handling for TEXP*/
        .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .texp-row{display:block;}
        .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .jobtitle-cell{display:inline-block;width:65%}
        .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .texp-cell{display:inline-block;float:right;}

	`}</style>
      <div className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-cba2 CBA2 MUK hyphen-normal pict-pcpf-purl texp-rectangle expr-durt-none">
        {/* Name and Contact Section */}
        <div className="sortable-item section-container name-contact">
          <div className="section-prfl section SECTION_PRFL firstsection" data-section-cd="PRFL">
            <div className="doc-item">
              <div className="paragraph PARAGRAPH_PRFL firstparagraph">
                <div>
                  <div className="name">
                    <span id="FIELD_FNAM">{data.first_name}</span>
                    <span> </span>
                    <span id="FIELD_LNAM">{data.last_name}</span>
                  </div>

                  <div className="lowerborder"></div>
                  <div className="lowerborder2"></div>

                  <div className="address SECTION_CNTC">
                    <ul>
                      {(data.street_address || data.city || data.postcode) && (
                        <li className="first zipsuffix">
                          {data.street_address && <span id="FIELD_STRT">{data.street_address}</span>}
                          {data.street_address && data.city && <span>, </span>}
                          {data.city && <span className="spaced" id="FIELD_CITY">{data.city}</span>}
                          {data.postcode && <span className="spaced" id="FIELD_ZIPC">{data.postcode}</span>}
                        </li>
                      )}
                      {data.phone && (
                        <li className="dispInBlk maxWidth">
                          <span id="FIELD_HPHN">{data.phone}</span>
                        </li>
                      )}
                      {data.email && (
                        <li className="dispInBlk maxWidth">
                          <span id="FIELD_EMAI">{data.email}</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                    <div className="address new-fields">
                      <ul>
                        {data.nationality && (
                          <li className="dispInBlk maxWidth">
                            <span className="txtBold">
                              <span className="xslt_static_change">Nationality</span>
                              <span className="beforecolonspace"> </span>
                              <span>: </span>
                            </span>
                            <span id="FIELD_NTLY">{data.nationality}</span>
                          </li>
                        )}
                        {data.driving_license && (
                          <li className="dispInBlk maxWidth">
                            <span className="txtBold">
                              <span className="xslt_static_change">Permit</span>
                              <span className="beforecolonspace"> </span>
                              <span>: </span>
                            </span>
                            <span id="FIELD_DRIV">{data.driving_license}</span>
                          </li>
                        )}
                        {data.website && (
                          <li className="dispInBlk maxWidth">
                            <span className="txtBold">
                              <span className="xslt_static_change">Web</span>
                              <span className="beforecolonspace"> </span>
                              <span>: </span>
                            </span>
                            <span className="brk-all" id="FIELD_WEB1">{data.website}</span>
                          </li>
                        )}
                        {data.linkedin && (
                          <li className="dispInBlk maxWidth">
                            <span className="txtBold">
                              <span>LinkedIn</span>
                              <span className="beforecolonspace"> </span>
                              <span>: </span>
                            </span>
                            <span className="brk-all" id="FIELD_SOCL">{data.linkedin}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parent Wrapper - Main Content Sections */}
        <div className="parent-wrapper">
          {/* Professional Summary */}
          {data.summary && (
            <div className="sortable-item section-container SortableItem-sibling">
              <div className="section SECTION_SUMM has-title" data-section-cd="SUMM">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle" id="SECTIONNAME_SUMM">{t.professional_summary}</div>
                  </div>
                  <div className="paragraph PARAGRAPH_SUMM firstparagraph">
                    <div className="clearfix doc-item">
                      <div className="singlecolumn" id="FIELD_FRFM">
                        <p>{data.summary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Work History */}
          {data.experiences && data.experiences.length > 0 && (
            <div className="sortable-item section-container SortableItem-sibling">
              <div className="section expr-sec SECTION_EXPR multi-para has-title" data-section-cd="EXPR">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle" id="SECTIONNAME_EXPR">{t.work_history}</div>
                  </div>
                  <div className="sortableInner">
                    {data.experiences.map((exp, index) => (
                      <div key={exp.id || index} className="sortable-item paragraph-container SortableItem-sibling">
                        <div className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}>
                          <div className="clearfix doc-item">
                            <div className="singlecolumn">
                              <span className="bottom-space paddedline">
                                <span style={{ display: 'inline' }}>
                                  <span className="dflex texp-row">
                                    <span className="jobtitle-cell">
                                      <span className="jobtitle" id="FIELD_JTIT">{exp.job_title}</span>
                                      <span>, </span>
                                      <span style={{ display: 'inline' }}>
                                        <span className="jobdates" id="FIELD_JSTD">{formatDate(exp.start_date, language)}</span>
                                        <span className="hyphen"></span>
                                        <span className="jobdates" id="FIELD_EDDT">{exp.currently_working ? t.present : formatDate(exp.end_date, language)}</span>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                              </span>
                              <span className="paddedline bottom-space">
                                <span className="companyname" id="FIELD_COMP">{exp.company}</span>
                                {exp.location && (
                                  <>
                                    <span className="hyphen"></span>
                                    <span className="joblocation jobcity" id="FIELD_JCIT">{exp.location}</span>
                                  </>
                                )}
                              </span>
                              {exp.description && (
                                <span className="jobline" id="FIELD_JDES">
                                  <ul>
                                    {exp.description.split('\n').map((line, i) => (
                                      <li key={i}>{line}</li>
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
              <div className="section SECTION_HILT has-title" data-section-cd="HILT">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle" id="SECTIONNAME_HILT">{t.skills}</div>
                  </div>
                  <div className="paragraph PARAGRAPH_HILT firstparagraph">
                    <div className="clearfix doc-item">
                      <div className="singlecolumn maincolumn">
                        <table className="twocol skill">
                          <tbody>
                            <tr>
                              <td className="twocol_1" id="FIELD_SKC1">
                                <ul>
                                  {skillsColumn1.map((skill, index) => (
                                    <li key={skill.id || index}>{skill.name}</li>
                                  ))}
                                </ul>
                              </td>
                              <td className="twocol_2" id="FIELD_SKC2">
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
              <div className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle" id="SECTIONNAME_EDUC">{t.education}</div>
                  </div>
                  {data.educations.map((edu, index) => (
                    <div key={edu.id || index} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}>
                      <div className="clearfix doc-item">
                        <div className="singlecolumn">
                          <span className="paddedline">
                            {edu.degree && <span className="degree" id="FIELD_DGRE">{edu.degree}</span>}
                            {edu.field_of_study && (
                              <>
                                <span className="programline" id="FIELD_STUY">{edu.field_of_study}</span>
                              </>
                            )}
                            {(edu.start_date || edu.end_date) && (
                              <>
                                <span>, </span>
                                {edu.start_date && <span className="jobdates" id="FIELD_GRST">{formatDate(edu.start_date, language)}</span>}
                                {edu.start_date && edu.end_date && <span className="hyphen"></span>}
                                {edu.end_date && <span className="jobdates" id="FIELD_GRED">{formatDate(edu.end_date, language)}</span>}
                              </>
                            )}
                          </span>
                          <span className="paddedline">
                            <span className="companyname companyname_educ" id="FIELD_SCHO">{edu.institution}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div className="sortable-item section-container SortableItem-sibling data-LNGG">
              <div className="section lang-sec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle" id="SECTIONNAME_LNGG">{t.languages}</div>
                  </div>
                  <div className="sortableInner">
                    {data.languages.map((lang, index) => {
                      const ratingWidth = lang.level ? (lang.level / 5) * 100 : 60;
                      const proficiencyText = lang.proficiency
                        ? t[lang.proficiency as keyof typeof t] || lang.proficiency
                        : "";
                      return (
                        <div key={lang.id || index} className="data-LNGG sortable-item paragraph-container SortableItem-sibling">
                          <div className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''}`}>
                            <div className="clearfix doc-item">
                              <div className="singlecolumn">
                                <div className="field">
                                  <span className="txtBold" id="FIELD_FRFM">{lang.name}</span>
                                  <span className="colon">
                                    <span className="beforecolonspace"> </span>
                                    <span>: </span>
                                  </span>
                                  <span className="flt-right" id="FIELD_RATG"></span>
                                </div>
                                <div className="rating-bar">
                                  <div className="inner-rating" id="FIELD_RATV" style={{ width: `${ratingWidth}%` }}></div>
                                </div>
                                <div className="field">
                                  <span id="FIELD_RATT">{proficiencyText}</span>
                                </div>
                                <div className="field">
                                  <span id="FIELD_ADIF"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
