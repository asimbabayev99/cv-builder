/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations as defaultTranslations, formatDate } from "@/lib/translations";

export default function TemplatePca1({
  data = sampleData,
  translations: t = defaultTranslations,
  colorHex = '#1A4771',
}: Partial<DynamicTemplateProps> = {}) {
  const skills = data.skills || [];
  const midpoint = Math.ceil(skills.length / 2);
  const skillsCol1 = skills.slice(0, midpoint);
  const skillsCol2 = skills.slice(midpoint);

  return (
    <>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900');
	  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@700');

	  html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
      body{line-height:1;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
      .skn-pca1 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

      .skn-pca1 span.jobtitle,.skn-pca1 span.companyname,.skn-pca1 span.degree,.skn-pca1 .txtBold{font-weight:bold}
      .skn-pca1 .datesWrapper,.skn-pca1 .flt-right{float:right}
      .skn-pca1 span.paddedline{display:block}
      .skn-pca1 .nodisplay,.skn-pca1 .logo{display:none}
	    .skn-pca1 .dispInBlk{display:inline-block}
	    .skn-pca1 .maxWidth{max-width:100%}
      .skn-pca1 .brk-all{word-break:break-all}

      .skn-pca1 .ttc-align-left ul{text-align:left}
      .skn-pca1 .ttc-align-right ul{text-align:right}
      .skn-pca1 .ttc-align-center ul{text-align:center}
      .skn-pca1 .ttc-align-justify ul{text-align:justify}
      .skn-pca1 .ttc-align-right li,.skn-pca1 .ttc-align-center li{position:relative;list-style-position:inside;margin-left:0}

      .skn-pca1 ul,.skn-pca1 li{list-style-type:disc;margin:0 0 0 10px;padding:0}
      .skn-pca1 ul li{margin:0 0 0 13px}
      .skn-pca1 .address li,.skn-pca1 .address ul,.skn-pca1 .adnlLnks li,.skn-pca1 .adnlLnks ul{display:inline;margin:0;padding:0;list-style:none}
      .skn-pca1 .address li:before,.skn-pca1 .adnlLnks li:before{content:"\\2022";vertical-align:bottom;padding: 0 3px}
      .skn-pca1 .adnlLnks li:first-child:before{content:"";margin:0}
      .skn-pca1 .adnlLnks li:before{margin-right:3px}

      .skn-pca1{color:#000;word-wrap:break-word;text-size-adjust:none;-ms-text-size-adjust:none;-moz-text-size-adjust:none;-webkit-text-size-adjust:none;min-height:792px}
      .skn-pca1 .lowerborder{margin-top:2px;border-bottom:2px solid ${colorHex}}
      .skn-pca1 .name{letter-spacing:0.58px;font-weight:bold;background-color:${colorHex};padding-bottom:10px;font-family:'Roboto Condensed';text-transform:uppercase;text-align:center;color:#FFF}
      .skn-pca1 .resumeTitle{font-weight:900;background-color:${colorHex};text-align:center;color:#fff;text-transform:uppercase;letter-spacing:0.5px;padding-bottom:10px;margin-top:-2px}
      .skn-pca1 .paragraph{position:relative}
      .skn-pca1 .heading{clear:both;font-weight:bold}
      .skn-pca1 .address{position:relative;text-align:center;font-size:0.917em;line-height:1.25em;margin:0;color:${colorHex};padding-left:5px;padding-right:5px}
      .skn-pca1 .adnlLnks{text-align:center}
      .skn-pca1 .address2{position:relative;text-align:left;font-size:0.917em;line-height:1.25em}
      .skn-pca1 .table_wrapper{width:100%;margin-top:0}
	    .skn-pca1 .skill{display:table;width:100%;table-layout:fixed}
      .skn-pca1 table.twocol td{width:50%;vertical-align:top;display:table-cell}
      .skn-pca1 table.skills,.skn-pca1 table.twocol{width:100%}
      .skn-pca1 table.skills th,.skn-pca1 table.skills td{width:20%;text-align:center}
      .skn-pca1 table.skills th{text-decoration:underline}
      .skn-pca1 table.skills .skillname,.skn-pca1 table.skills .skillrating{text-align:left;width:35%}
      .skn-pca1 table.skills .skillrating{width:20%}
      .skn-pca1 table.skills .skillyears,.skn-pca1 table.skills .skilllast{width:19%}
      .skn-pca1 table.skills .pad1{width:5%}
      .skn-pca1 table.skills .pad2,.skn-pca1 table.skills .pad3{width:1%}
      .skn-pca1 .section-prfl,.skn-pca1 .section-clprfl{padding-bottom:5px}
      .skn-pca1 .thinbottomborder{border-bottom:1px solid ${colorHex}}
      .skn-pca1 .section-prfl .thinbottomborder{position:relative}
      .skn-pca1 .sectiontitle{text-transform:uppercase}
	    .skn-pca1 .btmgap,.skn-pca1 .addrbtmgap{padding-top:8px}
      .skn-pca1 .btmgap + .addrbtmgap{padding-top:3px}
      .skn-pca1 .social-link:last-child .sprtr{display:none}
      .skn-pca1.expr-durt-cexp .section.expr-sec .flex-cell{display:flex;justify-content:space-between;column-gap:10px}
      .skn-pca1 .texp-cell{display:inline;text-align:right}
      .skn-pca1 .totl-expr{display:inline-block;padding:0px 6px;color:#fff;font-weight:700;text-wrap:nowrap}
      .skn-pca1.texp-curved .totl-expr{border-radius:10px}
      .skn-pca1 .dflex{display:flex;justify-content:space-between}

      /*Personal details section*/
      .skn-pca1 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
      .skn-pca1 .details-wrap{width:49%}

      /*FIX for FORCEFULLY making left margin ZERO for CL*/
      .skn-pca1 .sectionCL .paragraph{margin-top:0}

      /* Style for Signature */
      .skn-pca1 .disclaim .singlecolumn,.skn-pca1 .signPic > .field_sign{margin-left:0}
      .skn-pca1 .disclaim .singlecolumn,.skn-pca1 .disclaim .singlecolumn li,.skn-pca1 .disclaim .singlecolumn p,.skn-pca1 .disclaim .singlecolumn span{font-size:9px;color:#8a8a8a}
      .skn-pca1 .lgtBg{position:relative;padding-bottom:8px}
	    .skn-pca1 .lgtBg:before{content:'';position:absolute;width:100%;height:100%;left:0;top:0px;opacity:.2;background-color: ${colorHex};}
      .skn-pca1 .field_sign{font-size:7px;color:#8a8a8a}
      .skn-pca1 .txtleft + .field_sign{text-align:left}
      .skn-pca1 .txtcenter + .field_sign{text-align:center}
      .skn-pca1 .txtright + .field_sign{text-align:right}
      .skn-pca1 .signPic span:first-child{padding-right:6px}
      .skn-pca1 .signPic img{padding-top:5px;max-width:100%}

      /*MES and MFR address order code*/
      .skn-pca1 .zipprefix,.skn-pca1.MES .zipsuffix,.skn-pca1.MFR .zipsuffix{display:none}
      .skn-pca1 .zipsuffix,.skn-pca1.MES .zipprefix,.skn-pca1.MFR .zipprefix{display:inline}
      .skn-pca1.MDE .hide-de{display:none}

     /*Infographic*/
     .skn-pca1 .lang-sec,.skn-pca1 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
      .skn-pca1 .lang-sec .heading,.skn-pca1 .skli-sec .heading{width:100%;flex-grow:1}
      .skn-pca1 .lang-sec .paragraph, .skn-pca1 .skli-sec .paragraph{width:48.6%}
      .skn-pca1 .lang-sec .field *,.skn-pca1 .lang-sec .nativeLangPara .field,.skn-pca1 .skli-sec .field *{display:inline}
      .skn-pca1 .lang-sec .paragraph,.skn-pca1 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0}
      .skn-pca1 .lang-sec .singlecolumn,.skn-pca1 .skli-sec .singlecolumn{margin-left:0;position:relative}
      .skn-pca1 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
      .skn-pca1 .section.lang-sec .paragraph.nativeLangPara{width:100%;padding-bottom:5px}
      .skn-pca1 .inner-rating{background-color:${colorHex};height:4px;width:60%}
      .skn-pca1 .lang-sec > .paragraph:nth-last-child(1),.skn-pca1 .lang-sec > .paragraph:nth-last-child(2),
      .skn-pca1 .skli-sec > .paragraph:nth-last-child(1),.skn-pca1 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0}
      .skn-pca1 .hide-bar .rating-bar,.skn-pca1 .hide-only-bar .rating-bar,.skn-pca1 .hide-colon .colon{display:none}

	    .skn-pca1 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-pca1 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}

      /*For Extra Space Before Colon*/
      .skn-pca1 .beforecolonspace{display:none!important}
      .skn-pca1.MFR .beforecolonspace{display:inline!important}

       /*HILT multi para/section*/
      .skn-pca1 .multi-section-hilt .multi-para-opt,.skn-pca1 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-pca1 .multi-para-hilt .dflt-view{display:none}
      .skn-pca1 .multi-para-hilt:after{content:"";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/
	    .skn-pca1 .multi-para-hilt .paragraph .singlecolumn{margin-left:0}
      .skn-pca1 .multi-para-hilt .paragraph{width:49%;max-width:49%;display:block;float:left;clear:none;margin-top:0px;margin-right:2%;margin-bottom:10px;margin-top:0}
      .skn-pca1 .multi-para-hilt .paragraph:nth-child(2n+1){margin-right:0}
      .skn-pca1 .multi-para-hilt .paragraph:last-child,.skn-pca1 .multi-para-hilt .paragraph:nth-last-child(2){margin-bottom:0}
      .skn-pca1:not(.for-pdf) .ttc-align-right li:first-letter,.skn-pca1:not(.for-pdf) .ttc-align-center li:first-letter{margin-left:-4px}

      /* GRYR */
      .skn-pca1 .displayNoneThisField{display:none}/* Keep this class always at bottom */

      .skn-pca1.for-iron-pdf .rating-bar, .skn-pca1.for-iron-pdf .sliced-rect, .skn-pca1.for-iron-pdf .circle-parent { page-break-inside: avoid; }


      .skn-pca1,.skn-pca1 table{line-height:13px}
      .skn-pca1.pagesize{width:545px}
      .skn-pca1.fontsize,.skn-pca1 .lang-sec .paragraph *,.skn-pca1 .skli-sec .paragraph *{font-size:11px}
      .skn-pca1.fontface{font-family:Roboto}
      .skn-pca1.vmargins{padding-bottom:30px}
      .skn-pca1 .name{padding-top:30px}
      .skn-pca1.hmargins{padding-left:25px;padding-right:25px}
      .skn-pca1 .section{margin-top:6px}
      .skn-pca1 .disclaim{margin:0;padding:0;margin-top:30px}
      .skn-pca1 .section.firstsection,.skn-pca1 .section-prfl,.skn-pca1 .section.SECTION_CNTC,.skn-pca1 .section.SECTION_ALNK,.skn-pca1 .paragraph.firstparagraph{margin-top:0}
      .skn-pca1 .heading{margin-bottom:2px}
      .skn-pca1 .paragraph{margin-top:4px}
      .skn-pca1 .singlecolumn,.skn-pca1 .maincolumn{margin-left:0px}
      .skn-pca1 .thinbottomborder,.skn-pca1 .lowerborder{border-color:${colorHex}}
      .skn-pca1 .sectiontitle{font-size:12px;line-height:16px}
      .skn-pca1 table.skills td{padding-top:2px}
      .skn-pca1 .name{font-size:28px;line-height:30px}
      .skn-pca1 .address{font-size:10px;line-height:12px;color:${colorHex}}
      .skn-pca1 .address li:before{font-size:13px}
      .skn-pca1 .name{font-size:28px;line-height:30px;background-color:${colorHex}}
      .skn-pca1 .resumeTitle{font-size:10px;line-height:12px;background-color:${colorHex}}
      .skn-pca1 .lgtBg:before{background-color:${colorHex};opacity:.2}
	    .skn-pca1 .skli-sec .singlecolumn .field:last-child{min-height:13px}
      .skn-pca1.expr-durt-cexp .section.expr-sec .paragraph.firstparagraph .flex-cell{padding:10px 0 8px 0}
      .skn-pca1.expr-durt-cexp .section.expr-sec .flex-cell{column-gap:10px;padding:11px 0 8px 0}
      .skn-pca1 .totl-expr{background-color:${colorHex};font-size:8px;line-height:12px;padding:0 6px}

      /*FIX for Re-calculating width of singlecolumn for CL*/
      .skn-pca1 .sectionCL .singlecolumn{margin-left:0;width:100%}
      .skn-pca1 .address2{font-size:11px;line-height:13px}

      /*Infographic*/
      .skn-pca1 .lang-sec,.skn-pca1 .skli-sec{padding-left:0px}
      .skn-pca1 .lang-sec .heading,.skn-pca1 .skli-sec .heading{margin-left:-0px}
      .skn-pca1 .inner-rating{background-color:${colorHex}}
      .skn-pca1 .lang-sec .sortable-item,.skn-pca1 .skli-sec .sortable-item{display:inline-block;vertical-align:top}

      /* Multi para hilt */
      .skn-pca1 .multi-para-hilt{margin-left:0px}
      .skn-pca1 .multi-para-hilt .heading{margin-left:-0px}

      /*Finalize Fixes*/
      .page-finalize .skn-pca1 .sortableInner .paragraph-container+.paragraph-container{margin:0}
      .skn-pca1 .lang-sec .sortableInner .sortable-item:not(:first-child) .paragraph,.skn-pca1 .skli-sec .sortableInner .sortable-item:not(:first-child) .paragraph{vertical-align:top}
      .page-finalize .skn-pca1 .sortableInner .paragraph-container+.paragraph-container,.page-finalize .sortable-drag-item.skn-pca1 .section{margin-top:0!important}
      .skn-pca1 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}
      .skn-pca1 .data-LNGG .sortable-item.native-lang{width:100%;max-width:100%}
      .skn-pca1 .data-LNGG .doc-item,.skn-pca1 .data-SKLI .doc-item,.skn-pca1 .lang-sec .doc-item,.skn-pca1 .skli-sec .doc-item{width:100%}
      .skn-pca1 .data-LNGG .sortableInner,.skn-pca1 .data-SKLI .sortableInner,.skn-pca1 .SECTION_LNGG .sortableInner,.skn-pca1 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
      .skn-pca1 .data-LNGG .sortable-item,.skn-pca1 .data-SKLI .sortable-item{width:48.6%}
      .skn-pca1 .data-LNGG .sortable-item .paragraph,.skn-pca1 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}

	  /*Fixes for builder for skill*/
        .skn-pca1 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:13px}
        .skn-pca1 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-pca1 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}
       .skn-pca1 .lang-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-pca1 .lang-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph, .skn-pca1  .skli-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-pca1  .skli-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0}

       /*PDF Flex Handling Code - Personal Information*/
	    .skn-pca1.for-pdf .pdet-sec .singlecolumn{display:block}
		.skn-pca1.for-pdf .pdfpdwrapper{display:block}
		.skn-pca1.for-pdf .pdfpdwrapper .details-wrap:first-child{float:left;padding-right:5px}
		.skn-pca1.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){float:right}
		.skn-pca1.for-pdf .pdfpdwrapper .details-wrap{width:270px!important;}

    /*Infographic Containers*/
    .skn-pca1.for-pdf .lang-sec,.skn-pca1.for-pdf .skli-sec{display:block}
    .skn-pca1.for-pdf .pdfinfwrapper{display:block}
    .skn-pca1.for-pdf .pdfinfwrapper:after{content:'';clear:both;display:table}
    .skn-pca1.for-pdf .pdfinfwrapper .paragraph:first-child{float:left}
    .skn-pca1.for-pdf .pdfinfwrapper .paragraph:nth-child(2){float:right}
    .skn-pca1.for-pdf .pdfinfwrapper:last-child .paragraph{margin-bottom:0;padding-bottom:0}

    /*PDF Handling for TEXP*/
    .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .flex-cell{display:block;}
    .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .jobtitle{display:inline-block;width:65%}
    .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .texp-cell{display:inline-block;float:right;}
  `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-pca1 PCA1 MUK pict-pcpf-purl texp-rectangle expr-durt-none " docskinwidth="545" ><div data-testid="embd-91y4rV2" className="name-contact "><div></div><div></div><div data-testid="embd-88MByq6-PRFL" id="SECTION_PRFL30868c37-6fcc-4b70-b87a-afd2447ce0d4" className="section section-prfl SECTION_PRFL firstsection" data-section-cd="PRFL"><div data-testid="embd-88uQIHR-PRFL" className="doc-item"><div data-testid="embd-88aw0Ce-PRFL" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-04f55583-5181-435c-8336-f48964adf912" id="PARAGRAPH_PRFL_04f55583-5181-435c-8336-f48964adf912" className="paragraph PARAGRAPH_PRFL firstparagraph"><div data-testid="embd-78KlmQp">
        <div className="name" data-uppercase="true">
          <span id="FIELD_FNAM">{data.first_name}</span>
          <span dependency="FNAM+LNAM"> </span>
          <span id="FIELD_LNAM">{data.last_name}</span>
        </div>

       <div className="lgtBg">
	    <div className="address btmgap">
            <span className="zipsuffix" dependency="ADDR|STRT|CITY|STAT|ZIPC">
              {data.street_address && <><span id="FIELD_STRT">{data.street_address}</span><span dependency="STRT+CITY|STAT">, </span></>}
              {data.city && <span className="spaced" id="FIELD_CITY">{data.city}</span>}
              <span className="spaced" id="FIELD_STAT"></span>

              {data.postcode && <span className="spaced" id="FIELD_ZIPC">{data.postcode}</span>}
			  <span id="FIELD_ADDR"></span>
          </span>

          {(data.street_address || data.city || data.postcode) && data.phone && <span dependency="ADDR|STRT|CITY|STAT|ZIPC|NBHD|MSTA"><ul><li></li></ul></span>}
          <span id="FIELD_REMW"></span>

          {data.phone && <span className="dispInBlk maxWidth">
          <span id="FIELD_HPHN">{data.phone}</span></span>}
          {data.phone && data.email && <span dependency="HPHN+CPHN|EMAI"><ul><li></li></ul></span>}
          <span className="dispInBlk maxWidth">
          <span id="FIELD_CPHN"></span></span>

          {data.email && <span id="FIELD_EMAI">{data.email}</span>}
        </div>

        {/* Second address div for nationality, permit, website, linkedin */}
        {(data.nationality || data.driving_license || data.website || data.linkedin) && (
          <div className="address addrbtmgap" dependency="DOB1|NTLY|IDNV|IDNT|DRIV|MSTA|WEB1|AVAI|SOCL|PRTF|VDCV">
            {data.nationality && (
              <>
                <span dependency="NTLY" className="dispInBlk maxWidth">
                  <span className="txtBold"><span className="xslt_static_change">{t.nationality || 'Nationality'}</span><span className="beforecolonspace">&nbsp;</span><span>: </span></span>
                  <span id="FIELD_NTLY">{data.nationality}</span>
                </span>
                {(data.driving_license || data.website || data.linkedin) && <span dependency="NTLY"><ul dependency="IDNV|IDNT|DRIV|MSTA|WEB1|AVAI|SOCL|PRTF|VDCV"><li></li></ul></span>}
              </>
            )}

            {data.driving_license && (
              <>
                <span dependency="DRIV" className="dispInBlk maxWidth">
                  <span className="txtBold"><span className="xslt_static_change">{t.permit || 'Permit'}</span><span className="beforecolonspace">&nbsp;</span><span>: </span></span>
                  <span id="FIELD_DRIV">{data.driving_license}</span>
                </span>
                {(data.website || data.linkedin) && <span dependency="DRIV"><ul dependency="MSTA|WEB1|AVAI|SOCL|PRTF|VDCV"><li></li></ul></span>}
              </>
            )}

            {data.website && (
              <>
                <span dependency="WEB1" className="dispInBlk maxWidth">
                  <span className="txtBold"><span className="xslt_static_change">{t.website || 'Web'}</span><span className="beforecolonspace">&nbsp;</span><span>: </span></span>
                  <span id="FIELD_WEB1">{data.website}</span>
                </span>
                {data.linkedin && <span dependency="WEB1"><ul dependency="AVAI|SOCL|PRTF|VDCV"><li></li></ul></span>}
              </>
            )}

            {data.linkedin && (
              <span dependency="SOCL">
                <span className="maxWidth dispInBlk social-link" id="CATEGORY_SOCIAL_SOCL">
                  <span className="txtBold"><span id="DOCDATAINFO_SOCL">{t.linkedin || 'LinkedIn'}</span><span className="beforecolonspace"> </span><span>: </span></span>
                  <span className="brk-all" id="FIELD_SOCL">{data.linkedin}</span>
                </span>
              </span>
            )}
          </div>
        )}

        </div><div className="thinbottomborder"></div>
        <div className="lowerborder"></div>

      </div></div></div></div></div></div></div><div data-testid="embd-89XOkPJ0" className="parent-wrapper"><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="45" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">{t.professional_summary || 'PROFESSIONAL SUMMARY'}</div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
        <div className="singlecolumn" id="FIELD_FRFM"><p>{data.summary}</p></div>
      </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="45" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="45" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section expr-sec SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">{t.work_history || 'Work History'}</div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">
        {data.experiences?.map((job, index) => (
          <div key={index} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="45" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="45" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-998e66f0-eaa8-4a72-b41c-7158c85a1d86" id={`PARAGRAPH_EXPR_${index}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
        <div className="singlecolumn">
          <span className="paddedline flex-cell" dependency="JTIT">
            <span className="jobtitle" id="FIELD_JTIT">{job.job_title}</span>

          </span>
          <span className="paddedline" dependency="COMP|JSTA|JCIT|JCNT|JCTR">
            <span className="companyname" id="FIELD_COMP">{job.company}</span>{job.company && <span dependency="COMP"><span dependency="JCIT|JSTA|JCNT|JCTR"> -</span></span>}
            <span className="joblocation jobcity" id="FIELD_JCIT">{job.location}</span><span className="joblocation jobstate" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span>
            <span id="FIELD_JCTR"></span>
            <span className="datesWrapper" dependency="JSTD|EDDT">
              <span className="jobdates" id="FIELD_JSTD">{formatDate(job.start_date)}</span><span dependency="JSTD+EDDT"> - </span><span className="jobdates" id="FIELD_EDDT">{job.end_date ? formatDate(job.end_date) : (t.present || 'Current')}</span>
            </span>
          </span>
          <span className="jobline" id="FIELD_JDES"><ul>{job.description?.split('\n').map((resp, i) => (
            <li key={i}>{resp}</li>
          ))}</ul></span>
        </div>
      </div></div></div>
        ))}
      </div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="45" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="45" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">{t.skills || 'SKILLS'}</div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
        <div className="singlecolumn maincolumn">
          <table className="twocol dflt-view skill">
            <tbody><tr>
              <td className="twocol_1" id="FIELD_SKC1"><ul>{skillsCol1.map((skill, i) => (
                <li key={i}>{skill.name}</li>
              ))}</ul></td>
              <td className="twocol_2" id="FIELD_SKC2"><ul>{skillsCol2.map((skill, i) => (
                <li key={i}>{skill.name}</li>
              ))}</ul></td>
            </tr>
          </tbody></table>
        </div>
      </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="45" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="45" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">{t.education || 'EDUCATION'}</div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">
        {data.educations?.map((edu, index) => (
          <div key={index} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="45" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="45" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-e0037f47-0bb8-4767-a441-48042b09746f" id={`PARAGRAPH_EDUC_${index}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
        <div className="singlecolumn">
          <span className="paddedline" dependency="DGRE|STUY">
           {edu.degree && <span className="degree" id="FIELD_DGRE">{edu.degree}</span>}{edu.degree && edu.field_of_study && <span dependency="DGRE+STUY"><span className="beforecolonspace"> </span><span>: </span></span>}<span className="programline" id="FIELD_STUY">{edu.field_of_study}</span>
          </span>
	      <span className="paddedline" dependency="SCIT|SCHO|SSTA|SCNT|GRYR|GRED|GRST|GRIP|GRHN">
					<span className="companyname companyname_educ" id="FIELD_SCHO">{edu.institution}</span>{edu.institution && <span dependency="SCHO"><span dependency="SCIT|SSTA|SCNT|GRHN"> -</span></span>}
					<span className="joblocation jobcity" id="FIELD_SCIT">{edu.location}</span><span className="joblocation jobstate" id="FIELD_SSTA"></span><span className="joblocation jobcountry" id="FIELD_SCNT"></span>
            <span id="FIELD_GRHN"></span>
					<span className="datesWrapper">
						<span className="xslt_static_change displayNoneThisField">Expected in </span>
						<span id="FIELD_GRYR"></span>
						<span className="jobdates" id="FIELD_GRST">{formatDate(edu.start_date)}</span>{edu.start_date && edu.end_date && <span dependency="GRST+GRED"> – </span>}<span className="jobdates" id="FIELD_GRED">{formatDate(edu.end_date)}</span>

						<span id="FIELD_GRIP"></span>
					</span>
				</span>

          <span id="FIELD_FRFM"></span>
        </div>
      </div></div></div>
        ))}
      </div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="45" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>

    {/* Language Section */}
    {data.languages && data.languages.length > 0 && (
      <div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="45" className="sortable-item section-container SortableItem-sibling data-LNGGsortable-item data-LNGG">
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
                    <div key={lang.id} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="45" className="data-LNGG sortable-item paragraph-container SortableItem-sibling">
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
                      <button data-testid="embd-87enKtK-LNGG" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="45" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}>
          <i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="45" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i>
        </button>
      </div>
    )}

    </div></div><div></div></div></div>
    </>
  );
}
