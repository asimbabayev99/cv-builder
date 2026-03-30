/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations as defaultTranslations, formatDate } from "@/lib/translations";

export default function TemplateUpa2({
  data = sampleData,
  translations: t = defaultTranslations,
  colorHex = '#C00000',
}: Partial<DynamicTemplateProps> = {}) {
  const skills = data.skills || [];
  const midpoint = Math.ceil(skills.length / 2);
  const firstColumnSkills = skills.slice(0, midpoint);
  const secondColumnSkills = skills.slice(midpoint);

  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-upa2 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        .skn-upa2 span.jobtitle,.skn-upa2 span.companyname,.skn-upa2 span.degree,.skn-upa2 .txtBold{font-weight:bold}
        .skn-upa2 .datesWrapper,.skn-upa2 .flt-right{float:right}
        .skn-upa2 .logo,.skn-upa2 .nodisplay{display:none}
        .skn-upa2 span.paddedline{display:block}
		    .skn-upa2 .dispInBlk{display:inline-block}
		    .skn-upa2 .maxWidth{max-width:100%}
        .skn-upa2 .brk-all{word-break:break-all}

        .skn-upa2 ul,.skn-upa2 li{list-style-type:disc;margin:0 0 0 10px;padding:0}
        .skn-upa2 ul li{margin:0 0 0 13px}
        .skn-upa2 .adnlLnks ul{margin:0}
        .skn-upa2 .adnlLnks li{display:inline!important}
        .skn-upa2 .adnlLnks li:first-child{margin:0}

        .skn-upa2{word-wrap:break-word;color:#000;text-size-adjust:none;-ms-text-size-adjust:none;-moz-text-size-adjust:none;-webkit-text-size-adjust:none;min-height:792px}
        .skn-upa2 .name{font-size:15px;line-height:17px;font-weight:bold;padding:0;text-align:left;text-transform:uppercase;color:#000}
        .skn-upa2 .name span.lName{color:#C00000}
        .skn-upa2 .resumeTitle{text-align:left;color:#4a4a4a}
        .skn-upa2 .paragraph{position:relative}
        .skn-upa2 .heading{clear:both;font-weight:normal}
        .skn-upa2 .address{position:relative;text-align:left;font-size:0.917em;line-height:1.25em;margin-top:11px;background-color:#000;padding:4px 5px;color:#FFF}
        .skn-upa2 .address2{position:relative;text-align:left;font-size:0.917em;line-height:1.25em}
        .skn-upa2 .adnlLnks{text-align:center;margin-top:5px}
        .skn-upa2 .table_wrapper{width:100%;margin-top:0}
		    .skn-upa2 .skill{display:table;width:100%;table-layout:fixed}
        .skn-upa2 table.twocol td{width:50%;vertical-align:top;display:table-cell}
        .skn-upa2 table.skills th,.skn-upa2 table.skills td{width:20%;text-align:center}
        .skn-upa2 table.skills th{text-decoration:underline}
        .skn-upa2 table.skills .skillname,.skn-upa2 table.skills .skillrating{text-align:left;width:35%}
        .skn-upa2 table.skills .skillrating{width:20%}
        .skn-upa2 table.skills .skillyears,.skn-upa2 table.skills .skilllast{width:19%}
        .skn-upa2 table.skills .pad1{width:5%}
        .skn-upa2 table.skills .pad2,.skn-upa2 table.skills .pad3{width:1%}
        .skn-upa2 .bottomborder{border-color:#C00000}
        .skn-upa2 .social-link .sprtr{padding:0 2px}
        .skn-upa2 .social-link:last-child .sprtr{display:none}

        .skn-upa2 .totl-expr{display:inline-block;padding:0 6px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap}
        .skn-upa2.texp-curved .totl-expr{border-radius:10px}
        .skn-upa2 .dflex{display:flex;justify-content:space-between}

        /*Personal details section*/
        .skn-upa2 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-upa2 .details-wrap{width:49%}

        /*FIX for FORCEFULLY making left margin ZERO for CL*/
        .skn-upa2 .sectionCL .paragraph{margin-top:0}

        /* Style for Signature */
        .skn-upa2 .disclaim .singlecolumn,.skn-upa2 .signPic > .field_sign{margin-left:0}
        .skn-upa2 .disclaim .singlecolumn,.skn-upa2 .disclaim .singlecolumn li,.skn-upa2 .disclaim .singlecolumn p,.skn-upa2 .disclaim .singlecolumn span{font-size:9px;color:#8a8a8a}
        .skn-upa2 .field_sign{font-size:7px;color:#8a8a8a}
        .skn-upa2 .txtleft + .field_sign{text-align:left}
        .skn-upa2 .txtcenter + .field_sign{text-align:center}
        .skn-upa2 .txtright + .field_sign{text-align:right}
        .skn-upa2 .signPic span:first-child{padding-right:6px}
        .skn-upa2 .signPic img{padding-top:5px;max-width:100%}

        /*MES and MFR address order code*/
        .skn-upa2 .zipprefix,.skn-upa2.MES .zipsuffix,.skn-upa2.MFR .zipsuffix{display:none}
        .skn-upa2 .zipsuffix,.skn-upa2.MES .zipprefix,.skn-upa2.MFR .zipprefix{display:inline}
        .skn-upa2.MDE .hide-de{display:none}

        /*Infographic*/
        .skn-upa2 .lang-sec,.skn-upa2 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-upa2 .lang-sec .heading,.skn-upa2 .skli-sec .heading{width:100%;flex-grow:1}
        .skn-upa2 .lang-sec .paragraph, .skn-upa2 .skli-sec .paragraph{width:48.6%}
        .skn-upa2 .lang-sec .field *,.skn-upa2 .lang-sec .nativeLangPara .field,.skn-upa2 .skli-sec .field *{display:inline}
        .skn-upa2 .lang-sec .paragraph,.skn-upa2 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0}
        .skn-upa2 .lang-sec .singlecolumn,.skn-upa2 .skli-sec .singlecolumn{margin-left:0;position:relative}
        .skn-upa2 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
        .skn-upa2 .lang-sec .paragraph.nativeLangPara{width:100%}
        .skn-upa2 .inner-rating{background-color:#000;height:4px;width:60%}
        .skn-upa2 .lang-sec > .paragraph:nth-last-child(1),.skn-upa2 .lang-sec > .paragraph:nth-last-child(2),
        .skn-upa2 .skli-sec > .paragraph:nth-last-child(1),.skn-upa2 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0}
		    .skn-upa2 .hide-bar .rating-bar,.skn-upa2 .hide-only-bar .rating-bar,.skn-upa2 .hide-colon .colon{display:none}
        .skn-upa2 .infoSec{display:block}
        .skn-upa2 .infoSec .singlecolumn{margin-left:0}
        .skn-upa2 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}

	    	.skn-upa2 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-upa2 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}

        /*HILT multi para/section*/
        .skn-upa2 .multi-section-hilt .multi-para-opt,.skn-upa2 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-upa2 .multi-para-hilt .dflt-view{display:none}
        .skn-upa2 .multi-para-hilt:after{content:"";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/
	      .skn-upa2 .multi-para-hilt .paragraph .singlecolumn{margin-left:0}
        .skn-upa2 .multi-para-hilt .paragraph{width:49%;max-width:49%;display:block;float:left;clear:none;margin-top:0px;margin-right:2%;margin-bottom:10px;margin-top:0}
        .skn-upa2 .multi-para-hilt .paragraph:nth-child(2n+1){margin-right:0}
        .skn-upa2 .multi-para-hilt .paragraph:last-child,.skn-upa2 .multi-para-hilt .paragraph:nth-last-child(2){margin-bottom:0}

        /* GRYR */
        .skn-upa2 .displayNoneThisField{display:none}/* Keep this class always at bottom */

		/*For Extra Space Before Colon*/
        .skn-upa2 .beforecolonspace{display:none!important}
        .skn-upa2.MFR .beforecolonspace{display:inline!important}

        /* Text alignment bullet */
        .skn-upa2 .ttc-align-left ul{text-align:left}
        .skn-upa2 .ttc-align-right ul{text-align:right}
        .skn-upa2 .ttc-align-center ul{text-align:center}
        .skn-upa2 .ttc-align-justify ul{text-align:justify}
        .skn-upa2 .ttc-align-right li,.skn-upa2 .ttc-align-center li{position:relative;list-style-position:inside;margin-left:0}
        .skn-upa2:not(.for-pdf) .ttc-align-right li:first-letter,.skn-upa2:not(.for-pdf) .ttc-align-center li:first-letter{margin-left:-4px}

        .skn-upa2.for-iron-pdf .rating-bar{page-break-inside:avoid}


        .skn-upa2,.skn-upa2 table{line-height:14px}
        .skn-upa2.pagesize{width:545px}
        .skn-upa2.fontsize,.skn-upa2 .lang-sec .paragraph *,.skn-upa2 .skli-sec .paragraph *{font-size:11px}
        .skn-upa2.fontface{font-family:Century Gothic}
        .skn-upa2.vmargins{padding-top:25px;padding-bottom:25px}
        .skn-upa2.hmargins{padding-left:25px;padding-right:25px}
        .skn-upa2 .section{margin-top:4px}
        .skn-upa2 .disclaim{margin:0;padding:0;margin-top:20px}
        .skn-upa2 .firstsection.section,.skn-upa2 .SECTION_CNTC,.skn-upa2 .SECTION_ALNK.section,.skn-upa2 .firstparagraph.paragraph{margin-top:0}
        .skn-upa2 .heading{margin-bottom:1px}
        .skn-upa2 .paragraph{margin-top:2px}
        .skn-upa2 .singlecolumn,.skn-upa2 .maincolumn{margin-left:0px}
        .skn-upa2 .bottomborder{border-bottom:1px solid}
        .skn-upa2 .sectiontitle{font-size:14px;line-height:17px}
        .skn-upa2 .name{font-size:29px;line-height:35px}
        .skn-upa2 .address{font-size:10px;line-height:16px;margin-top:3px}
        .skn-upa2 table.skills td{padding-top:1px}
        .skn-upa2 .heading{margin-bottom:1px;border-color:#C00000}
        .skn-upa2 .name span.lName{color:#C00000}
        .skn-upa2 .resumeTitle{font-size:15px;line-height:30px;padding:0 0 6px 0}
        .skn-upa2 .disclaim .heading{margin-bottom:3px}
		    .skn-upa2 .skli-sec .singlecolumn .field:last-child{min-height:14px}
        .skn-upa2 .totl-expr{background-color:#C00000;font-size:8px;line-height:12px}

        /*FIX for Re-calculating width of singlecolumn for CL*/
        .skn-upa2 .sectionCL .singlecolumn{margin-left:0;width:100%}
        .skn-upa2 .address2{font-size:11px;line-height:14px}

        /*Infographic*/
        .skn-upa2 .lang-sec,.skn-upa2 .skli-sec{padding-left:0px}
        .skn-upa2 .lang-sec .heading,.skn-upa2 .skli-sec .heading{margin-left:-0px}
        .skn-upa2 .inner-rating{background-color:#C00000}
        .skn-upa2 .lang-sec .sortable-item,.skn-upa2 .skli-sec .sortable-item{display:inline-block;vertical-align:top}

        /* Multi para hilt */
        .skn-upa2 .multi-para-hilt{margin-left:0px}
        .skn-upa2 .multi-para-hilt .heading{margin-left:-0px}

        /*finalize page fixes*/
        .skn-upa2 .langSec .sortableInner .sortable-item:not(:first-child) .paragraph,.skn-upa2 .infoSec .sortableInner .sortable-item:not(:first-child) .paragraph{vertical-align:top}
        .page-finalize .skn-upa2 .sortableInner .paragraph-container+.paragraph-container,.page-finalize .sortable-drag-item.skn-upa2 .section{margin-top:0}
        .page-finalize .skn-upa2 .section.langSec .paragraph{margin-top:0}
        .skn-upa2 .data-LNGG .sortable-item.native-lang{width:100%;max-width:100%}
        .skn-upa2 .data-LNGG .doc-item,.skn-upa2 .data-SKLI .doc-item,.skn-upa2 .lang-sec .doc-item,.skn-upa2 .skli-sec .doc-item{width:100%}
        .skn-upa2 .data-LNGG .sortableInner,.skn-upa2 .data-SKLI .sortableInner,.skn-upa2 .SECTION_LNGG .sortableInner,.skn-upa2 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-upa2 .data-LNGG .sortable-item,.skn-upa2 .data-SKLI .sortable-item{width:48.6%}
        .skn-upa2 .data-LNGG .sortable-item .paragraph,.skn-upa2 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}

        /*Fixes for builder for skill*/
        .skn-upa2 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:14px}
        .skn-upa2 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-upa2 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}
        .skn-upa2 .lang-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-upa2 .lang-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph, .skn-upa2  .skli-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-upa2  .skli-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0!important}

		 /*PDF Flex Handling Code - Personal Information*/
		.skn-upa2.for-pdf .pdet-sec .singlecolumn{display:block}
		.skn-upa2.for-pdf .pdfpdwrapper{display:block}
		.skn-upa2.for-pdf .pdfpdwrapper .details-wrap:first-child{float:left;padding-right:5px}
		.skn-upa2.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){float:right}
		.skn-upa2.for-pdf .pdfpdwrapper .details-wrap{width:270px!important;}

    /*Infographic Containers*/
    .skn-upa2.for-pdf .lang-sec,.skn-upa2.for-pdf .skli-sec{display:block}
    .skn-upa2.for-pdf .pdfinfwrapper{display:block}
    .skn-upa2.for-pdf .pdfinfwrapper:after{content:'';clear:both;display:table}
    .skn-upa2.for-pdf .pdfinfwrapper .paragraph:first-child{float:left}
    .skn-upa2.for-pdf .pdfinfwrapper .paragraph:nth-child(2){float:right}
    .skn-upa2.for-pdf .pdfinfwrapper:last-child .paragraph{margin-bottom:0;padding-bottom:0}

    /*PDF Handling for TEXP*/
    .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .texp-row{display:block;}
    .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .jobdetail-cell{display:inline-block;width:75%}
    .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .texp-cell{display:inline-block;float:right;}
    `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-upa2 UPA2 MUK   expr-durt-none texp-rectangle" docskinwidth="545" ><div data-testid="embd-91y4rV2" className="name-contact "><div></div><div></div><div data-testid="embd-88MByq6-PRFL" id="SECTION_PRFL30868c37-6fcc-4b70-b87a-afd2447ce0d4" className="section-prfl section SECTION_PRFL firstsection" data-section-cd="PRFL"><div data-testid="embd-88uQIHR-PRFL" className="doc-item"><div data-testid="embd-88aw0Ce-PRFL" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-04f55583-5181-435c-8336-f48964adf912" id="PARAGRAPH_PRFL_04f55583-5181-435c-8336-f48964adf912" className="paragraph PARAGRAPH_PRFL firstparagraph"><div data-testid="embd-78KlmQp">
        <div className="name" data-uppercase="true">
            {data.first_name && <span id="FIELD_FNAM">{data.first_name}</span>}
            {data.first_name && data.last_name && <span> </span>}
            {data.last_name && <span className="lName" id="FIELD_LNAM" style={{ color: colorHex }}>{data.last_name}</span>}
        </div>

        <div className="address">
            <span className="zipsuffix" dependency="ADDR|STRT|CITY|STAT|ZIPC">
              {data.street_address && <><span id="FIELD_STRT">{data.street_address}</span><span dependency="STRT"><span dependency="CITY|STAT|ZIPC">, </span></span></>}
              {data.city && <><span className="spaced" id="FIELD_CITY">{data.city}</span><span dependency="CITY+STAT|ZIPC">, </span></>}
              <span className="spaced" id="FIELD_STAT"></span>
              {data.postcode && <span className="spaced" id="FIELD_ZIPC">{data.postcode}</span>}
              <span id="FIELD_ADDR"></span>
          </span>

          {(data.street_address || data.city || data.postcode) && <span dependency="ADDR|STRT|CITY|STAT|ZIPC"> | </span>}
          <span id="FIELD_REMW"></span>

              {data.phone && <span className="dispInBlk maxWidth">
              <span id="FIELD_HPHN">{data.phone}</span></span>}
              {data.phone && data.email && <span dependency="HPHN+CPHN|EMAI"> | </span>}
              <span className="dispInBlk maxWidth">
              <span id="FIELD_CPHN"></span></span>

              {data.email && <span id="FIELD_EMAI">{data.email}</span>}

              {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                <div dependency="DOB1|NTLY|IDNV|IDNT|DRIV|MSTA|WEB1|AVAI|SOCL|PRTF|VDCV">
                    {data.nationality && (
                      <>
                        <span dependency="NTLY" className="dispInBlk maxWidth">
                            <span className="txtBold"><span className="xslt_static_change">{t.nationality || 'Nationality'}</span><span className="beforecolonspace">&nbsp;</span><span>:</span></span>
                            <span id="FIELD_NTLY">{data.nationality}</span>
                        </span>
                        {(data.driving_license || data.website || data.linkedin) && <span dependency="NTLY"><span dependency="IDNV|IDNT|DRIV|MSTA|WEB1|AVAI|SOCL|PRTF|VDCV" className="sprtr"> | </span></span>}
                      </>
                    )}

                    {data.driving_license && (
                      <>
                        <span dependency="DRIV" className="dispInBlk maxWidth">
                            <span className="txtBold"><span className="xslt_static_change">{t.permit || 'Permit'}</span><span className="beforecolonspace">&nbsp;</span><span>:</span></span>
                            <span id="FIELD_DRIV">{data.driving_license}</span>
                        </span>
                        {(data.website || data.linkedin) && <span dependency="DRIV"><span dependency="MSTA|WEB1|AVAI|SOCL|PRTF|VDCV" className="sprtr"> | </span></span>}
                      </>
                    )}

                    {data.website && (
                      <>
                        <span dependency="WEB1" className="dispInBlk maxWidth">
                            <span className="txtBold"><span className="xslt_static_change">{t.website || 'Web'}</span><span className="beforecolonspace">&nbsp;</span><span>:</span></span>
                            <span id="FIELD_WEB1">{data.website}</span>
                        </span>
                        {data.linkedin && <span dependency="WEB1"><span dependency="AVAI|SOCL|PRTF|VDCV" className="sprtr"> | </span></span>}
                      </>
                    )}

                    {data.linkedin && (
                      <span dependency="SOCL">
                        <span className="maxWidth dispInBlk social-link" id="CATEGORY_SOCIAL_SOCL">
                            <span className="txtBold"><span id="DOCDATAINFO_SOCL">{t.linkedin || 'LinkedIn'}</span><span className="beforecolonspace"> </span><span>: </span></span><span className="brk-all" id="FIELD_SOCL">{data.linkedin}</span>
                          </span>
                      </span>
                    )}
                </div>
              )}
        </div>
    </div></div></div></div></div></div></div><div data-testid="embd-89XOkPJ0" className="parent-wrapper">

    {/* Summary Section */}
    {data.summary && (
      <div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="41" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading bottomborder" style={{ borderColor: colorHex }}><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">{t.summary || 'PROFESSIONAL SUMMARY'}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename PROFESSIONAL SUMMARY " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
        <div className="singlecolumn" id="FIELD_FRFM"><p>{data.summary}</p></div>
      </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="41" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>
    )}

    {/* Work History Section */}
    {data.experiences && data.experiences.length > 0 && (
      <div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="41" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section expr-sec SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading bottomborder" style={{ borderColor: colorHex }}><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">{t.workHistory || 'Work history'}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Work history " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">
        {data.experiences.map((exp, index) => (
          <div key={exp.id} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="41" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="41" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-998e66f0-eaa8-4a72-b41c-7158c85a1d86" id={`PARAGRAPH_EXPR_${exp.id}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
        <div className="singlecolumn">
          <span className="paddedline" dependency="JTIT|JSTD|EDDT">
            <span className="jobtitle" id="FIELD_JTIT">{exp.job_title}</span>
            <span className="datesWrapper" dependency="JSTD|EDDT">
              <span className="jobdates" id="FIELD_JSTD" format="%m/%Y">{formatDate(exp.start_date)}</span><span dependency="JSTD+EDDT"> - </span><span className="jobdates" id="FIELD_EDDT" format="%m/%Y">{exp.currently_working ? (t.current || 'Current') : formatDate(exp.end_date)}</span>
            </span>
          </span>
          <span className="paddedline" dependency="COMP|JSTA|JCIT|JCNT|JCTR">
            <span className="dflex texp-row">
              <span className="jobdetail-cell">
                <span className="companyname" id="FIELD_COMP">{exp.company}</span>{exp.company && exp.location && <span dependency="COMP"><span dependency="JCIT|JSTA|JCNT|JCTR"> –</span></span>}
                <span className="joblocation jobcity" id="FIELD_JCIT">{exp.location}</span><span className="joblocation jobstate" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span>
                <span id="FIELD_JCTR"></span>
              </span>
            </span>
          </span>
          {exp.description && (
            <span className="jobline" id="FIELD_JDES"><ul>{exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
              <li key={i}>{line}</li>
            ))}</ul></span>
          )}
        </div>
      </div></div></div>
        ))}
      </div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="41" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>
    )}

    {/* Skills Section */}
    {skills.length > 0 && (
      <div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="41" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading bottomborder" style={{ borderColor: colorHex }}><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">{t.skills || 'SKILLS'}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename SKILLS " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
        <div className="singlecolumn maincolumn">
          <table className="twocol skill dflt-view">
            <tbody><tr>
              <td className="twocol_1" id="FIELD_SKC1"><ul>{firstColumnSkills.map(skill => (
                <li key={skill.id}>{skill.name}</li>
              ))}</ul></td>
              <td className="twocol_2" id="FIELD_SKC2"><ul>{secondColumnSkills.map(skill => (
                <li key={skill.id}>{skill.name}</li>
              ))}</ul></td>
            </tr>
          </tbody></table>
          <div className="multi-para-opt">
            <div id="FIELD_PTTL" className="txtBold"></div>
            <div className="multi-para-content">
                <div id="FIELD_SKC1"><ul>{firstColumnSkills.map(skill => (
                  <li key={skill.id}>{skill.name}</li>
                ))}</ul></div>
                <div id="FIELD_SKC2"><ul>{secondColumnSkills.map(skill => (
                  <li key={skill.id}>{skill.name}</li>
                ))}</ul></div>
            </div>
        </div>
        </div>
      </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="41" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>
    )}

    {/* Education Section */}
    {data.educations && data.educations.length > 0 && (
      <div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="41" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading bottomborder" style={{ borderColor: colorHex }}><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">{t.education || 'EDUCATION'}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename EDUCATION " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">
        {data.educations.map((edu, index) => (
          <div key={edu.id} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="41" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="41" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-e0037f47-0bb8-4767-a441-48042b09746f" id={`PARAGRAPH_EDUC_${edu.id}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn">
                    <span className="paddedline" dependency="DGRE|STUY|GRYR|GRED|GRST|GRIP">
                      {edu.degree && <><span className="degree" id="FIELD_DGRE">{edu.degree}</span><span dependency="DGRE+STUY"><span className="beforecolonspace"> </span><span>: </span></span></>}
                      <span className="programline" id="FIELD_STUY">{edu.field_of_study}</span>
                      <span className="datesWrapper">
                        <span className="xslt_static_change displayNoneThisField">Expected in </span>
                        <span id="FIELD_GRYR" format="%m/%Y"></span>
                        <span className="jobdates" id="FIELD_GRST" format="%m/%Y">{formatDate(edu.start_date)}</span>{edu.start_date && edu.end_date && <span dependency="GRST+GRED"> – </span>}<span className="jobdates" id="FIELD_GRED" format="%m/%Y">{formatDate(edu.end_date)}</span>
                        <span id="FIELD_GRIP"></span>
					          </span>
                    </span>
				          <span className="paddedline" dependency="SCHO|SCIT|SSTA|SCNT|GRHN">
                      <span className="companyname companyname_educ" id="FIELD_SCHO">{edu.institution}</span>{edu.institution && edu.location && <span dependency="SCHO"><span dependency="SCIT|SSTA|SCNT"> -</span></span>}
                      <span className="joblocation jobcity" id="FIELD_SCIT">{edu.location}</span><span className="joblocation jobstate" id="FIELD_SSTA"></span><span className="joblocation jobcountry" id="FIELD_SCNT"></span><span dependency="SCHO|SCIT|SSTA|SCNT"></span>
                      <span id="FIELD_GRHN"></span>
				          </span>

                    <span id="FIELD_FRFM"></span>
                </div>
            </div></div></div>
        ))}
      </div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="41" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>
    )}

    {/* Languages Section */}
    {data.languages && data.languages.length > 0 && (
      <div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="41" className="sortable-item section-container SortableItem-sibling data-LNGGsortable-item data-LNGG">
        <div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG88bc36a1-247b-b72f-7918-a79948b8fc80" className="section lang-sec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
          <div data-testid="embd-88uQIHR-LNGG" className="doc-item">
            <div data-testid="embd-88ciQTv" className="heading bottomborder" style={{ borderColor: colorHex }}>
              <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_LNGG">{t.languages || 'Languages'}</div>
            </div>
            <div data-testid="embd-88aw0Ce-LNGG" className="">
              <div data-testid="embd-87S8HNi88bc36a1-247b-b72f-7918-a79948b8fc80" id="CONTAINER_88bc36a1-247b-b72f-7918-a79948b8fc80" className="sortableInner">
                {data.languages.map((lang, index) => {
                  const widthPercent = ((lang.level || 3) / 5) * 100;
                  return (
                    <div key={lang.id} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="41" className="data-LNGG sortable-item paragraph-container SortableItem-sibling">
                      <div data-testid={`embd-79HRa2m-${lang.id}`} id={`PARAGRAPH_LNGG_${lang.id}`} className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}>
                        <div data-testid="embd-78FzR29" className="clearfix doc-item">
                          <div className="singlecolumn">
                            <div className="field">
                              <span className="txtBold" id="FIELD_FRFM">{lang.name}</span>
                              <span className="colon"><span className="beforecolonspace"> </span><span dependency="FRFM">: </span></span>
                              <span className="flt-right" id="FIELD_RATG"></span>
                            </div>
                            <div className="rating-bar" dependency="RATV">
                              <div className="inner-rating" id="FIELD_RATV" style={{ width: `${widthPercent}%`, backgroundColor: colorHex }}></div>
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
                      <button data-testid="embd-87enKtK-LNGG" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="41" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}>
          <i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="41" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i>
        </button>
      </div>
    )}

    </div></div><div></div></div></div>
    </>
  );
}
