/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations as defaultTranslations, formatDate } from "@/lib/translations";

export default function TemplateMpa5({
  data = sampleData,
  translations: t = defaultTranslations,
  colorHex = '#663399',
}: Partial<DynamicTemplateProps> = {}) {
  const skills = data.skills || [];
  const midpoint = Math.ceil(skills.length / 2);
  const skillsCol1 = skills.slice(0, midpoint);
  const skillsCol2 = skills.slice(midpoint);

  return (
    <>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700');
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700');

      html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
      body{line-height:1;background:#FFF;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
      .skn-mpa5 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

      .skn-mpa5{color:#000;background-color:#FFF;min-height:792px;word-wrap:break-word;text-size-adjust:none;-ms-text-size-adjust:none;-moz-text-size-adjust:none;-webkit-text-size-adjust:none}
      .skn-mpa5 .name{font-family:'Roboto',sans-serif}
      .skn-mpa5 .address,.skn-mpa5 .address2,.skn-mpa5 .sectiontitle{font-family:'Roboto Condensed',sans-serif}

      .skn-mpa5 span.septrSpace{margin:0 4px}
      .skn-mpa5 span.paddedline{display:block}
      .skn-mpa5 .logo,.skn-mpa5 .nodisplay,.skn-mpa5 .smryWrap .sectiontitle{display:none}
      .skn-mpa5 .txtBold{font-weight:bold}
      .skn-mpa5 .txt-nrml{font-weight:400}
      .skn-mpa5 .flt-right{float:right}
	    .skn-mpa5 .dispInBlk{display:inline-block}
	    .skn-mpa5 .maxWidth{max-width:100%}
      .skn-mpa5 .brk-all{word-break:break-all}

      .skn-mpa5 ul,.skn-mpa5 li{list-style-type:disc;margin:0 0 0 10px;padding:0}
      .skn-mpa5 ul li{margin:0 0 0 13px}
      .skn-mpa5 .adnlLnks ul{margin-left:0}
      .skn-mpa5 .adnlLnks li{display:inline-block;margin:0}
      .skn-mpa5 .adnlLnks li + li:before{content:'\\2022\\0020';display:inline-block;margin:0 10px 0 5px}

      .skn-mpa5 .name{color:#424243;font-size:15px;line-height:17px;text-transform:uppercase;text-align:center;padding:0;border-top:13px solid ${colorHex}}
      .skn-mpa5 .resumeTitle{text-align:center;color:#4a4a4a;text-transform:lowercase}
      .skn-mpa5 .resumeTitle:first-letter{text-transform:uppercase}/*To make sentence case*/
      .skn-mpa5 .paragraph{position:relative}
      .skn-mpa5 .heading{clear:both;color:#231F20;text-transform:uppercase}
      .skn-mpa5 .address,.skn-mpa5 .address2{position:relative;font-size:0.917em;line-height:1.25em;text-align:center;text-transform:uppercase}
      .skn-mpa5 .adnlLnks{text-align:center;margin:0}
      .skn-mpa5 .table_wrapper{width:100%;margin-top:0}
	    .skn-mpa5 .skill{display:table;width:100%;table-layout:fixed}
      .skn-mpa5 table.twocol td{width:50%;display:table-cell}
      .skn-mpa5 td.twocol_2{border-left:1px solid #FFF}
      .skn-mpa5 .sectiontitle{font-weight:bold}
      .skn-mpa5 p font{color:#000}
      .skn-mpa5 .social-link .sprtr{padding:0 2px}
      .skn-mpa5 .social-link:last-child .sprtr{display:none}

      .skn-mpa5 .totl-expr{display:inline-block;float:right; padding:0 6px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap}
      .skn-mpa5.texp-curved .totl-expr{border-radius:10px}
      .skn-mpa5 .paddedline.dflex{display:flex;justify-content:space-between}

      /*Personal details section*/
      .skn-mpa5 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
      .skn-mpa5 .details-wrap{width:49%}

      /*FIX for FORCEFULLY making left margin ZERO for CL*/
      .skn-mpa5 .sectionCL .singlecolumn {margin-left:0;width:100%}
      .skn-mpa5 .sectionCL .paragraph{margin-top:0}
      .skn-mpa5 .address2{text-align:left}

      /*MES and MFR address order code*/
      .skn-mpa5 .zipprefix,.skn-mpa5.MES .zipsuffix,.skn-mpa5.MFR .zipsuffix{display:none}
      .skn-mpa5 .zipsuffix,.skn-mpa5.MES .zipprefix,.skn-mpa5.MFR .zipprefix{display:block}
      .skn-mpa5 .SECTION_RCNT .zipsuffix,.skn-mpa5.MES .SECTION_RCNT .zipprefix,.skn-mpa5.MFR .SECTION_RCNT .zipprefix{display:inline}
      .skn-mpa5.MDE .hide-de{display:none}

      /*Infographic*/
      .skn-mpa5 .lang-sec,.skn-mpa5 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
      .skn-mpa5 .lang-sec .heading,.skn-mpa5 .skli-sec .heading{width:100%;flex-grow:1}
      .skn-mpa5 .lang-sec .paragraph, .skn-mpa5 .skli-sec .paragraph{width:48.4%}
      .skn-mpa5 .lang-sec .field *,.skn-mpa5 .lang-sec .nativeLangPara .field,.skn-mpa5 .skli-sec .field *{display:inline}
      .skn-mpa5 .lang-sec .paragraph,.skn-mpa5 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0}
      .skn-mpa5 .lang-sec .singlecolumn,.skn-mpa5 .skli-sec .singlecolumn{margin-left:0;position:relative}
      .skn-mpa5 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
      .skn-mpa5 .lang-sec .paragraph.nativeLangPara{width:100%}
      .skn-mpa5 .inner-rating{background-color:${colorHex};height:4px;width:60%}
      .skn-mpa5 .lang-sec > .paragraph:nth-last-child(1),.skn-mpa5 .lang-sec > .paragraph:nth-last-child(2),
      .skn-mpa5 .skli-sec > .paragraph:nth-last-child(1),.skn-mpa5 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0}
      .skn-mpa5 .hide-bar .rating-bar,.skn-mpa5 .hide-colon .colon,.skn-mpa5 .hide-only-bar .rating-bar{display:none}
	    .skn-mpa5 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-mpa5 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}
      /*HILT multi para/section*/
      .skn-mpa5 .multi-para-hilt:after{content: "";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/
      .skn-mpa5 .multi-para-hilt .paragraph{margin-bottom:10px;margin-top:0;width:49%;float:left}
      .skn-mpa5 .multi-para-hilt .paragraph:last-child,.skn-mpa5 .multi-para-hilt .paragraph:nth-last-child(2):nth-child(2n){margin-bottom:0}
      .skn-mpa5 .multi-para-hilt .paragraph:nth-child(2n+1){margin-left:2%}
      .skn-mpa5 .multi-para-hilt .paragraph:nth-child(2n){clear:left}
      .skn-mpa5 .multi-para-hilt .singlecolumn{margin:0}
      .skn-mpa5 .multi-section-hilt .multi-para-opt,.skn-mpa5 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-mpa5 .multi-para-hilt .twocol.skill{display:none}

      /* GRYR */
      .skn-mpa5 .displayNoneThisField{display:none}/* Keep this class always at bottom */
      .skn-mpa5 .section.sign{margin-top:50px}

      /*For Extra Space Before Colon*/
      .skn-mpa5 .beforecolonspace{display:none!important}
      .skn-mpa5.MFR .beforecolonspace{display:inline!important}

      /* Style for Signature */
      .skn-mpa5 .disclaim .singlecolumn,.skn-mpa5 .disclaim .singlecolumn li,.skn-mpa5 .disclaim .singlecolumn p,.skn-mpa5 .disclaim .singlecolumn span{font-size:9px;color:#8a8a8a}
      .skn-mpa5 .field_sign{font-size:7px;color:#8a8a8a}
      .skn-mpa5 .txtleft + .field_sign{text-align:left}
      .skn-mpa5 .txtcenter + .field_sign{text-align:center}
      .skn-mpa5 .txtright + .field_sign{text-align:right}
      .skn-mpa5 .signPic img{max-width:100%}

      /* Text alignment bullet */
      .skn-mpa5 .ttc-align-left ul{text-align:left}
      .skn-mpa5 .ttc-align-right ul{text-align:right}
      .skn-mpa5 .ttc-align-center ul{text-align:center}
      .skn-mpa5 .ttc-align-justify ul{text-align:justify}
      .skn-mpa5 .ttc-align-right li,.skn-mpa5 .ttc-align-center li{position:relative;list-style-position:inside;margin-left:0}
      .skn-mpa5:not(.for-pdf) .ttc-align-right li:first-letter,.skn-mpa5:not(.for-pdf) .ttc-align-center li:first-letter{margin-left:-3px}



      .skn-mpa5,.skn-mpa5 table{line-height:16px}
      .skn-mpa5.pagesize{width:471px}
      .skn-mpa5.fontsize,.skn-mpa5 .lang-sec .paragraph *,.skn-mpa5 .skli-sec .paragraph *{font-size:12px}
      .skn-mpa5.fontface{font-family:Roboto}
      .skn-mpa5.vmargins{padding-top:37px;padding-bottom:37px}
      .skn-mpa5.hmargins{padding-left:62px;padding-right:62px}
      .skn-mpa5 .section{margin-top:10px}
      .skn-mpa5 .firstsection.section,.skn-mpa5 .SECTION_CNTC,.skn-mpa5 .firstparagraph.paragraph{margin-top:0}
      .skn-mpa5 .paragraph{margin-top:6px}
      .skn-mpa5 .singlecolumn,.skn-mpa5 .maincolumn{margin-left:0px}
      .skn-mpa5 .sectiontitle{font-size:14px;line-height:20px}
      .skn-mpa5 .name{font-size:30px;line-height:38px;padding-top:6px;border-top-color:${colorHex};color:${colorHex}}
      .skn-mpa5 .resumeTitle{font-size:16px;line-height:28px;padding:0 0 8px 0}
      .skn-mpa5 .PARAGRAPH_PRFL .address,.skn-mpa5 .PARAGRAPH_CLPRFL .address{font-size:12px;line-height:16px}
      .skn-mpa5 table.skills td{padding-top:3px}
      .skn-mpa5 .smryWrap{border-top:2px dotted ${colorHex};border-bottom:2px dotted ${colorHex};padding-top:8px;padding-bottom:8px}
	    .skn-mpa5 .skli-sec .singlecolumn .field:last-child{min-height:16px}
      .skn-mpa5 .totl-expr{background-color:${colorHex};font-size:8px;line-height:14px}

      /*FIX for Re-calculating width of singlecolumn for CL*/
      .skn-mpa5 .address2{font-size:12px;line-height:16px}

      /*Infographic*/
      .skn-mpa5 .lang-sec,.skn-mpa5 .skli-sec,.skn-mpa5 .multi-para-hilt{padding-left:0px}
      .skn-mpa5 .lang-sec .heading,.skn-mpa5 .skli-sec .heading,.skn-mpa5 .multi-para-hilt .heading{margin-left:-0px}
      .skn-mpa5 .inner-rating{background-color:${colorHex}}

      /*Builder fixes*/
      .skn-mpa5 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}
      .skn-mpa5 .lang-sec .sortable-item,.skn-mpa5 .skli-sec .sortable-item{display:inline-block;vertical-align:top}
      .skn-mpa5 .data-LNGG .sortable-item.native-lang{width:100%;max-width:100%}
      .skn-mpa5 .data-LNGG .doc-item,.skn-mpa5 .data-SKLI .doc-item,.skn-mpa5 .lang-sec .doc-item,.skn-mpa5 .skli-sec .doc-item{width:100%}
      .skn-mpa5 .data-LNGG .sortableInner,.skn-mpa5 .data-SKLI .sortableInner,.skn-mpa5 .SECTION_LNGG .sortableInner,.skn-mpa5 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
      .skn-mpa5 .data-LNGG .sortable-item,.skn-mpa5 .data-SKLI .sortable-item{width:48.4%}
      .skn-mpa5 .data-LNGG .sortable-item .paragraph,.skn-mpa5 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}

	  /*Fixes for builder for skill*/
      .skn-mpa5 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:16px}
      .skn-mpa5 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-mpa5 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}
      .skn-mpa5 .lang-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-mpa5 .lang-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph, .skn-mpa5  .skli-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-mpa5  .skli-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0!important}

      /*PDF Flex Handling Code - Personal Information*/
		.skn-mpa5.for-pdf .pdet-sec .singlecolumn{display:block}
		.skn-mpa5.for-pdf .pdfpdwrapper{display:block}
		.skn-mpa5.for-pdf .pdfpdwrapper .details-wrap:first-child{float:left;padding-right:5px}
		.skn-mpa5.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){float:right}
		.skn-mpa5.for-pdf .pdfpdwrapper .details-wrap{width:233px;}

    /*Infographic Containers*/
    .skn-mpa5.for-pdf .lang-sec,.skn-mpa5.for-pdf .skli-sec{display:block}
    .skn-mpa5.for-pdf .pdfinfwrapper{display:block}
    .skn-mpa5.for-pdf .pdfinfwrapper:after{content:'';clear:both;display:table}
    .skn-mpa5.for-pdf .pdfinfwrapper .paragraph:first-child{float:left}
    .skn-mpa5.for-pdf .pdfinfwrapper .paragraph:nth-child(2){float:right}
    .skn-mpa5.for-pdf .pdfinfwrapper:last-child .paragraph{margin-bottom:0;padding-bottom:0}

    /*PDF Handling for TEXP*/
    .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .texp-row{display:block;}
    .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .jobtitle-cell{display:inline-block;width:75%}
    .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .texp-cell{display:inline-block;float:right;}
  `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-mpa5 MPA5 MUK pict-pcpf-purl texp-rectangle expr-durt-none " docskinwidth="471" ><div data-testid="embd-91y4rV2" className="name-contact "><div></div><div></div><div data-testid="embd-88MByq6-PRFL" id="SECTION_PRFL30868c37-6fcc-4b70-b87a-afd2447ce0d4" className="section-prfl section SECTION_PRFL firstsection" data-section-cd="PRFL"><div data-testid="embd-88uQIHR-PRFL" className="doc-item"><div data-testid="embd-88aw0Ce-PRFL" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-04f55583-5181-435c-8336-f48964adf912" id="PARAGRAPH_PRFL_04f55583-5181-435c-8336-f48964adf912" className="paragraph PARAGRAPH_PRFL firstparagraph"><div data-testid="embd-78KlmQp">
                <div className="name" data-uppercase="true">
                    <span id="FIELD_FNAM">{data.first_name}</span>
                    <span dependency="FNAM+LNAM"> </span>
                    <span className="lName" id="FIELD_LNAM">{data.last_name}</span>
                </div>

                <div className="address" data-uppercase="true">
                    <div className="zipsuffix" dependency="STRT|CITY|STAT|ZIPC|ADDR|REMW">
                        {data.street_address && <><span id="FIELD_STRT">{data.street_address}</span><span dependency="STRT"><span dependency="CITY|STAT">, </span></span></>}
                        {data.city && <span className="spaced field" id="FIELD_CITY">{data.city}</span>}
                        <span className="spaced field" id="FIELD_STAT"></span>

                        {data.postcode && <span className="spaced field" id="FIELD_ZIPC">{data.postcode}</span>}
                        <span className="spaced field" id="FIELD_ADDR"></span>
                        <span dependency="STRT|CITY|STAT|ZIPC|ADDR"></span>
                        <span className="spaced field" id="FIELD_REMW"></span>
                    </div>

                    {data.phone && <span className="dispInBlk maxWidth" dependency="HPHN"><span id="FIELD_HPHN">{data.phone}</span></span>}
                    {data.phone && data.email && <span dependency="HPHN+CPHN|EMAI"> | </span>}


                    {data.email && <span id="FIELD_EMAI">{data.email}</span>}
                </div>

                {/* Second address div for nationality, permit, website, linkedin */}
                {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                  <div className="address" data-uppercase="true" dependency="DOB1|NTLY|IDNV|IDNT|DRIV|MSTA|WEB1|AVAI|VDCV|PRTF|SOCL">
                    {data.nationality && (
                      <>
                        <span dependency="NTLY" className="dispInBlk maxWidth">
                          <span className="txtBold"><span className="xslt_static_change">{t.nationality || 'Nationality'}</span><span className="beforecolonspace">&nbsp;</span><span>: </span></span>
                          <span id="FIELD_NTLY">{data.nationality}</span>
                        </span>
                        {(data.driving_license || data.website || data.linkedin) && <span dependency="NTLY"><span dependency="IDNV|IDNT|DRIV|MSTA|WEB1|AVAI|VDCV|PRTF|SOCL" className="sprtr"> | </span></span>}
                      </>
                    )}

                    {data.driving_license && (
                      <>
                        <span dependency="DRIV" className="dispInBlk maxWidth">
                          <span className="txtBold"><span className="xslt_static_change">{t.permit || 'Driving License'}</span><span className="beforecolonspace">&nbsp;</span><span>: </span></span>
                          <span id="FIELD_DRIV">{data.driving_license}</span>
                        </span>
                        {(data.website || data.linkedin) && <span dependency="DRIV"><span dependency="MSTA|WEB1|AVAI|VDCV|PRTF|SOCL" className="sprtr"> | </span></span>}
                      </>
                    )}

                    {data.website && (
                      <>
                        <span dependency="WEB1" className="dispInBlk maxWidth">
                          <span className="txtBold"><span className="xslt_static_change">{t.website || 'Website'}</span><span className="beforecolonspace">&nbsp;</span><span>: </span></span>
                          <span id="FIELD_WEB1">{data.website}</span>
                        </span>
                        {data.linkedin && <span dependency="WEB1"><span dependency="AVAI|VDCV|PRTF|SOCL" className="sprtr"> | </span></span>}
                      </>
                    )}

                    {data.linkedin && (
                      <span dependency="SOCL">
                        <span dependency="SOCL" className="maxWidth dispInBlk social-link" id="CATEGORY_SOCIAL_SOCL">
                          <span className="txtBold"><span id="DOCDATAINFO_SOCL">{t.linkedin || 'LinkedIn'}</span><span className="beforecolonspace">&nbsp;</span><span>: </span></span>
                          <span className="brk-all" id="FIELD_SOCL">{data.linkedin}</span>
                        </span>
                      </span>
                    )}
                  </div>
                )}

            </div></div></div></div></div></div></div><div data-testid="embd-89XOkPJ0" className="parent-wrapper"><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="44" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section smryWrap SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">{t.professional_summary || 'Professional Summary'}</div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
        <div className="singlecolumn" id="FIELD_FRFM"><p>{data.summary}</p></div>
      </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="44" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="44" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section expr-sec SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">{t.work_history || 'Work History'}</div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">
        {data.experiences?.map((job, index) => (
          <div key={index} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="44" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="44" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-998e66f0-eaa8-4a72-b41c-7158c85a1d86" id={`PARAGRAPH_EXPR_${index}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
        <div className="singlecolumn">
          <span className="paddedline" dependency="COMP">
            <span className="companyname" id="FIELD_COMP">{job.company}</span>
          </span>
          <span className="paddedline grayItl dflex texp-row" dependency="JTIT|JCTR|JSTA|JCIT|JCNT|JSTD|EDDT|TEXP">
            <span className="jobtitle-cell">
              <span className="jobtitle" id="FIELD_JTIT">{job.job_title}</span><span dependency="JTIT"><span dependency="JCIT|JSTA|JCNT|JCTR|JSTD|EDDT"><span className="septrSpace"><span>//</span></span></span></span><span className="joblocation" id="FIELD_JCIT">{job.location}</span><span className="joblocation" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span><span dependency="JCTR|JSTD|EDDT"><span dependency="JCIT|JSTA|JCNT"><span className="septrSpace"><span>//</span></span></span></span><span id="FIELD_JCTR"></span><span className="jobdates" id="FIELD_JSTD">{formatDate(job.start_date)}</span><span dependency="JSTD+EDDT"> – </span><span className="jobdates" id="FIELD_EDDT">{job.end_date ? formatDate(job.end_date) : (t.present || 'Present')}</span>
            </span>

          </span>
          <span className="jobline" id="FIELD_JDES"><ul>{job.description?.split('\n').map((resp, i) => (
            <li key={i}>{resp}</li>
          ))}</ul></span>
        </div>
      </div></div></div>
        ))}
      </div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="44" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="44" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">{t.skills || 'Skills'}</div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
        <div className="singlecolumn maincolumn">
            <table className="twocol skill">
                <tbody><tr>
                    <td className="field twocol_1" id="FIELD_SKC1"><ul>{skillsCol1.map((skill, i) => (
                      <li key={i}>{skill.name}</li>
                    ))}</ul></td>
                    <td className="field twocol_2" id="FIELD_SKC2"><ul>{skillsCol2.map((skill, i) => (
                      <li key={i}>{skill.name}</li>
                    ))}</ul></td>
                </tr>
            </tbody></table>
        </div>
      </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="44" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="44" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">{t.education || 'Education'}</div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">
        {data.educations?.map((edu, index) => (
          <div key={index} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="44" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="44" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-e0037f47-0bb8-4767-a441-48042b09746f" id={`PARAGRAPH_EDUC_${index}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
			<div className="singlecolumn">
				<span className="paddedline" dependency="STUY|DGRE">
					{edu.degree && <span className="degree" id="FIELD_DGRE">{edu.degree}</span>}{edu.degree && edu.field_of_study && <span dependency="DGRE+STUY"> - </span>}<span className="programline" id="FIELD_STUY">{edu.field_of_study}</span>
				</span>
				<span className="paddedline">
					<span className="companyname companyname_educ" id="FIELD_SCHO">{edu.institution}</span>
          <span dependency="SCHO"><span dependency="SCIT|SSTA|SCNT|GRHN|GRED|GRST|GRIP|GRYR"><span className="septrSpace">//</span></span></span>
					<span className="joblocation jobcity" id="FIELD_SCIT">{edu.location}</span><span className="joblocation jobstate" id="FIELD_SSTA"></span><span className="joblocation jobcountry" id="FIELD_SCNT"></span>
					<span dependency="SCIT|SSTA|SCNT"><span dependency="GRHN|GRED|GRST|GRIP|GRYR"><span className="septrSpace">//</span></span></span>
           <span className="jobdates" id="FIELD_GRST">{formatDate(edu.start_date)}</span>{edu.start_date && edu.end_date && <span dependency="GRST+GRED"> – </span>}<span className="jobdates" id="FIELD_GRED">{formatDate(edu.end_date)}</span>
				</span>

				<span id="FIELD_FRFM"></span>
			</div>
		</div></div></div>
        ))}
      </div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="44" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>

    {/* Language Section */}
    {data.languages && data.languages.length > 0 && (
      <div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="44" className="sortable-item section-container SortableItem-sibling data-LNGGsortable-item data-LNGG">
        <div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG88bc36a1-247b-b72f-7918-a79948b8fc80" className="section lang-sec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
          <div data-testid="embd-88uQIHR-LNGG" className="doc-item">
            <div data-testid="embd-88ciQTv" className="heading">
              <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_LNGG">{t.languages || 'Languages'}</div>
            </div>
            <div data-testid="embd-88aw0Ce-LNGG" className="">
              <div data-testid="embd-87S8HNi88bc36a1-247b-b72f-7918-a79948b8fc80" id="CONTAINER_88bc36a1-247b-b72f-7918-a79948b8fc80" className="sortableInner">
                {data.languages.map((lang, index) => {
                  const widthPercent = ((lang.level || 3) / 5) * 100;
                  return (
                    <div key={lang.id} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="44" className="data-LNGG sortable-item paragraph-container SortableItem-sibling">
                      <div data-testid={`embd-79HRa2m-${lang.id}`} id={`PARAGRAPH_LNGG_${lang.id}`} className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}>
                        <div data-testid="embd-78FzR29" className="clearfix doc-item">
                          <div className="singlecolumn">
                            <div className="field">
                              <span className="txtBold" id="FIELD_FRFM">{lang.name}</span>
                              <span className="colon"><span className="beforecolonspace"> </span><span dependency="FRFM">: </span></span>
                              <span className="flt-right" id="FIELD_RATG"></span>
                            </div>
                            <div className="rating-bar" dependency="RATV">
                              <div className="inner-rating" id="FIELD_RATV" style={{ width: `${widthPercent}%` }}></div>
                            </div>
                            <div className="field">
                              <span id="FIELD_RATT">{lang.proficiency}</span>
                            </div>
                            <div className="field">
                              <span id="FIELD_ADIF"></span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button data-testid="embd-87enKtK-LNGG" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="44" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}>
          <i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="44" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i>
        </button>
      </div>
    )}

    </div></div><div></div></div></div>
    </>
  );
}
