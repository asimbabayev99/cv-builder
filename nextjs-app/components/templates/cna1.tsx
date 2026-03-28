/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations, formatDate } from "@/lib/translations";

const getLevelWidth = (level: number): string => {
  const widths: Record<number, string> = {
    1: "20%",
    2: "40%",
    3: "60%",
    4: "80%",
    5: "100%",
  };
  return widths[level] || "60%";
};

const getProficiencyLabel = (
  proficiency: string,
  t: (typeof translations)["en"]
): string => {
  const labels: Record<string, string> = {
    native: t.native,
    fluent: t.fluent,
    advanced: t.advanced,
    intermediate: t.intermediate,
    beginner: t.beginner,
  };
  return labels[proficiency] || proficiency;
};

export default function TemplateCna1({
  data = sampleData,
  translations: t = translations.en,
  language = "en",
  colorHex = "#404041",
}: Partial<DynamicTemplateProps> = {}) {
  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-cna1 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        .skn-cna1 .grayItl{font-style:italic;color:#C3C3C3}
        .skn-cna1 span.jobtitle,.skn-cna1 span.degree,.skn-cna1 span.smry,.skn-cna1 span.skils{font-weight:bold}
        .skn-cna1 span.jobtitle,.skn-cna1 span.degree{text-transform:uppercase}
        .skn-cna1 span.email{color:#00ADEF;text-transform:lowercase}
        .skn-cna1 .logo,.skn-cna1 .nodisplay{display:none}
        .skn-cna1 span.paddedline{display:block}
        .skn-cna1 .txtBold{font-weight:bold}        
        .skn-cna1 .flt-right{float:right}
        .skn-cna1 .dispInBlk{display:inline-block}
        .skn-cna1 .maxWidth{max-width:100%}
        .skn-cna1 .brk-all{word-break:break-all}

        .skn-cna1 ul{margin-left:10px}
        .skn-cna1 ul li{margin-left:13px;list-style-type:disc}
        .skn-cna1 .adnlLnks ul,.skn-cna1 .adnlLnks li{list-style:none;margin:0}
        .skn-cna1 .adnlLnks li{display:inline;margin-right:10px}

        .skn-cna1{color:#666;word-wrap:break-word;text-size-adjust:none;-ms-text-size-adjust:none;-moz-text-size-adjust:none;-webkit-text-size-adjust:none;min-height:792px}
        .skn-cna1 .name{font-size:15px;font-weight:bold;line-height:17px;padding:0;text-transform:uppercase;border-top:6px solid #58585B;padding:18px 0 0 0}
        .skn-cna1 .resumeTitle{color:#4a4a4a;text-transform:lowercase}
        .skn-cna1 .resumeTitle:first-letter{text-transform:uppercase}/*To make sentence case*/
        .skn-cna1 .paragraph{position:relative}
        .skn-cna1 .heading{clear:both;color:#231F20;text-transform:uppercase;font-style:italic;font-weight:bold;width:100%}
        .skn-cna1 .address,.skn-cna1 .address2{position:relative;font-size:0.917em;line-height:1.25em;color:#808284}
        .skn-cna1 .address{text-transform:uppercase}
        .skn-cna1 .adnlLnks{margin-top:5px}
		.skn-cna1 .skill{display:table;width:100%;table-layout:fixed}
        .skn-cna1 .table_wrapper{width:100%;margin-top:0}
        .skn-cna1 table.twocol td{width:50%;vertical-align:top;display:table-cell}
        .skn-cna1 p font{color:#666}
        .skn-cna1 .social-link .sprtr{padding:0 2px}
        .skn-cna1 .social-link:last-child .sprtr{display:none}

        .skn-cna1 .totl-expr{display:inline-block;padding:0 6px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap;font-style:normal}
        .skn-cna1.texp-curved .totl-expr{border-radius:10px}
        .skn-cna1 .dflex{display:flex;justify-content:space-between}

        /*FIX for FORCEFULLY making left margin ZERO for CL*/
        .skn-cna1 .sectionCL{border:none!important}
        .skn-cna1 .sectionCL .paragraph{margin-top:0}

        /*For Extra Space Before Colon*/
        .skn-cna1 .beforecolonspace{display:none!important}
        .skn-cna1.MFR .beforecolonspace{display:inline!important}
        .skn-cna1.MDE .hide-de{display:none}

        /* Style for Signature */
        .skn-cna1 .disclaim .singlecolumn,.skn-cna1 .signPic > .field_sign{margin-left:0}
        .skn-cna1 .disclaim .singlecolumn,.skn-cna1 .disclaim .singlecolumn li,.skn-cna1 .disclaim .singlecolumn p,.skn-cna1 .disclaim .singlecolumn span{font-size:9px;color:#8a8a8a}
        .skn-cna1 .field_sign{font-size:7px;color:#8a8a8a}
        .skn-cna1 .txtleft+.field_sign{text-align:left}
        .skn-cna1 .txtcenter+.field_sign{text-align:center}
        .skn-cna1 .txtright+.field_sign{text-align:right}
        .skn-cna1 .signPic span:first-child{padding-right:6px}
        .skn-cna1 .signPic img{padding-top:5px;max-width:100%}
        .skn-cna1 .SECTION_PPDT_SGTR{border-top:0px!important}

        /*MES and MFR address order code*/
        .skn-cna1 span.zipprefix,.skn-cna1.MES .zipsuffix,.skn-cna1.MFR .zipsuffix{display:none}
        .skn-cna1 span.zipsuffix,.skn-cna1.MES .zipprefix,.skn-cna1.MFR .zipprefix{display:block}

        /*Infographic*/
        .skn-cna1 .lang-sec,.skn-cna1 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-cna1 .lang-sec .field *,.skn-cna1 .lang-sec .nativeLangPara .field,.skn-cna1 .skli-sec .field *{display:inline}
        .skn-cna1 .lang-sec .paragraph,.skn-cna1 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0}
        .skn-cna1 .lang-sec .singlecolumn,.skn-cna1 .skli-sec .singlecolumn{margin-left:0;position:relative}
        .skn-cna1 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
        .skn-cna1 .lang-sec .paragraph.nativeLangPara{width:100%}
        .skn-cna1 .inner-rating{background-color:#576d7b;height:4px;width:60%}
        .skn-cna1 .lang-sec > .paragraph:nth-last-child(1),.skn-cna1 .lang-sec > .paragraph:nth-last-child(2),
        .skn-cna1 .skli-sec > .paragraph:nth-last-child(1),.skn-cna1 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0}
        .skn-cna1 .hide-bar .rating-bar,.skn-cna1 .hide-colon .colon,.skn-cna1 .hide-only-bar .rating-bar{display:none}
		.skn-cna1 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-cna1 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}
       /*Personal details section*/
        .skn-cna1 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-cna1 .details-wrap{width:49%}
        /*HILT multi para/section*/
        .skn-cna1 .multi-para-hilt:after{content: "";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/
        .skn-cna1 .multi-para-hilt .paragraph{margin-bottom:10px;margin-top:0;width:49%;float:left}
        .skn-cna1 .multi-para-hilt .paragraph:last-child,.skn-cna1 .multi-para-hilt .paragraph:nth-last-child(2):nth-child(2n){margin-bottom:0}
        .skn-cna1 .multi-para-hilt .paragraph:nth-child(2n+1){margin-left:2%}
        .skn-cna1 .multi-para-hilt .paragraph:nth-child(2n){clear:left}
        .skn-cna1 .multi-para-hilt .singlecolumn{margin:0}
        .skn-cna1 .multi-section-hilt .multi-para-opt,.skn-cna1 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-cna1 .multi-para-hilt .twocol.skill{display:none}

       /* GRYR */
        .skn-cna1 .displayNoneThisField{display:none}/* Keep this class always at bottom */

        /* Text alignment bullet */
       .skn-cna1 .ttc-align-left ul{text-align:left}
       .skn-cna1 .ttc-align-right ul{text-align:right}
       .skn-cna1 .ttc-align-center ul{text-align:center}
       .skn-cna1 .ttc-align-justify ul{text-align:justify}
       .skn-cna1 .ttc-align-right li,.skn-cna1 .ttc-align-center li{position:relative;list-style-position:inside;margin-left:0}
       .skn-cna1:not(.for-pdf) .ttc-align-right li:first-letter,.skn-cna1:not(.for-pdf) .ttc-align-center li:first-letter{margin-left:-4px}

    

        .skn-cna1{line-height:12px;color:#404041}
        .skn-cna1 table{line-height:12px}
        .skn-cna1.pagesize{width:515px}
        .skn-cna1.fontsize,.skn-cna1 .lang-sec .paragraph *,.skn-cna1 .skli-sec .paragraph *{font-size:11px}
        .skn-cna1.fontface{font-family:Century Gothic}
        .skn-cna1.vmargins{padding-top:22px;padding-bottom:22px}
        .skn-cna1.hmargins{padding-left:40px;padding-right:40px}
        .skn-cna1 .section{margin-top:10px;border-top:1px solid #B2B0BF}
        .skn-cna1 .disclaim{margin:0;padding:0;margin-top:50px}
        .skn-cna1 .firstsection{margin-top:0;border:none}
        .skn-cna1 .section-prfl,.skn-cna1 .section-clprfl{margin-top:0;padding-bottom:1px;border:none}
        .skn-cna1 .heading{margin-bottom:2px}
        .skn-cna1 .paragraph{margin-top:4px}
        .skn-cna1 .firstparagraph{margin-top:0}
        .skn-cna1 .singlecolumn,.skn-cna1 .maincolumn{margin-left:15px}
        .skn-cna1 .sectiontitle{font-size:12px;line-height:16px}
        .skn-cna1 .name{font-size:22px;line-height:24px}
        .skn-cna1 .resumeTitle{font-size:15px;line-height:20px;padding:0 0 10px 0}
        .skn-cna1 .address{font-size:10px;line-height:13px}
        .skn-cna1 .smry{font-size:12px}
        .skn-cna1 table.skills td{padding-top:2px}
        .skn-cna1 .name,.skn-cna1 .sectiontitle{color:#404041}
        .skn-cna1 .name{border-top-color:#404041}
		.skn-cna1 .skli-sec .singlecolumn .field:last-child{min-height:12px}
		.skn-cna1 .totl-expr{background-color:#404041;font-size:8px;line-height:12px}

        /* Style for Signature */
        .skn-cna1 .disclaim{border:none}
        .skn-cna1 .disclaim .heading{margin-bottom:1px;border-top:1px solid #B2B0BF}

        /*FIX for Re-calculating width of singlecolumn for CL*/
        .skn-cna1 .sectionCL .singlecolumn{margin-left:0;width:100%}
        .skn-cna1 .address2{font-size:11px;line-height:12px}
        .skn-cna1 .sectionDateCL{padding-top:10px}

        /*Infographic*/
        .skn-cna1 .lang-sec,.skn-cna1 .skli-sec,.skn-cna1 .multi-para-hilt{padding-left:15px}
        .skn-cna1 .lang-sec .heading,.skn-cna1 .skli-sec .heading,.skn-cna1 .multi-para-hilt .heading{margin-left:-15px}
        .skn-cna1 .lang-sec .heading,.skn-cna1 .skli-sec .heading{width:calc(100% + 15px)}
        .skn-cna1 .inner-rating{background-color:#404041}
        .skn-cna1 .lang-sec .paragraph,.skn-cna1 .skli-sec .paragraph{width:48%}
        .skn-cna1 .lang-sec .sortable-item,.skn-cna1 .skli-sec .sortable-item{display:inline-block;vertical-align:top;margin-top:0}
        .skn-cna1 .lang-sec .sortableInner .sortable-item:nth-last-child(1) .paragraph,.skn-cna1 .lang-sec .sortableInner .sortable-item:nth-last-child(2) .paragraph,.skn-cna1 .skli-sec .sortableInner .sortable-item:nth-last-child(1) .paragraph,.skn-cna1 .skli-sec .sortableInner .sortable-item:nth-last-child(2) .paragraph,.page-finalize .skn-cna1 .section.multi-para>.doc-item{padding-bottom:0}

        /*Finalize Fixes*/
        .skn-cna1 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}
        .page-finalize .skn-cna1 .sortableInner .paragraph-container+.paragraph-container,.page-finalize .sortable-drag-item.skn-cna1 .section{margin:0}
        .skn-cna1 .lang-sec .sortableInner .sortable-item:not(:first-child) .paragraph,.skn-cna1 .skli-sec .sortableInner .sortable-item:not(:first-child) .paragraph{vertical-align:top}
        .page-finalize .skn-cna1 .section.langSec .paragraph{margin-top:0px}
		.skn-cna1 .data-LNGG .doc-item,.skn-cna1 .data-SKLI .doc-item{width:100%}
        .skn-cna1 .data-LNGG .sortableInner,.skn-cna1 .data-SKLI .sortableInner,.skn-cna1 .SECTION_LNGG .sortableInner,.skn-cna1 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-cna1 .data-LNGG .sortable-item,.skn-cna1 .data-SKLI .sortable-item{width:48%}
        .skn-cna1 .data-LNGG .sortable-item .paragraph,.skn-cna1 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}
        .skn-cna1 .lang-sec .native-lang{width:100%}

		 /*Fixes for builder for skill*/
        .skn-cna1 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:12px}	
        .skn-cna1 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-cna1 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}	
		
		/*PDF Flex Handling Code - Personal Information*/
		.skn-cna1.for-pdf .pdfpdwrapper{display:block}
		.skn-cna1.for-pdf .pdfpdwrapper .details-wrap:first-child{float:left;padding-right:5px}
		.skn-cna1.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){float:right}
		.skn-cna1.for-pdf .pdfpdwrapper .details-wrap{width:247px!important;}

        /*CSS for Infographic PDFWrapper*/
        .skn-cna1.for-pdf .lang-sec,.skn-cna1.for-pdf .skli-sec{display: block;}
        .skn-cna1.for-pdf .section .pdfinfwrapper{display:block;width:100%}
        .skn-cna1.for-pdf .section .pdfinfwrapper:after{content:'';clear:both;display:table}
        .skn-cna1.for-pdf .section .pdfinfwrapper .paragraph:first-child{float:left}
        .skn-cna1.for-pdf .section .pdfinfwrapper .paragraph:nth-child(2){float:right}
        .skn-cna1.for-pdf .section .pdfinfwrapper .paragraph{margin-bottom:5px;padding-bottom: 0px;}
        .skn-cna1.for-pdf .section .pdfinfwrapper:last-child .paragraph{margin-bottom:0}
        .skn-cna1.for-pdf .section .pdfinfwrapper .paragraph{clear: none;}
       
        /*PDF Handling for TEXP*/
        .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .texp-row{display:block;}
        .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .jobtitle-cell{display:inline-block;width:75%}
        .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .texp-cell{display:inline-block;float:right;}
    `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-cna1 CNA1 MUK     texp-rectangle expr-durt-none" docskinwidth="515" ><div data-testid="embd-91y4rV2" className="name-contact "><div></div><div></div><div data-testid="embd-88MByq6-PRFL" id="SECTION_PRFL30868c37-6fcc-4b70-b87a-afd2447ce0d4" className="section-prfl section SECTION_PRFL firstsection" data-section-cd="PRFL"><div data-testid="embd-88uQIHR-PRFL" className="doc-item"><div data-testid="embd-88aw0Ce-PRFL" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-04f55583-5181-435c-8336-f48964adf912" id="PARAGRAPH_PRFL_04f55583-5181-435c-8336-f48964adf912" className="paragraph PARAGRAPH_PRFL firstparagraph"><div data-testid="embd-78KlmQp">
                <div className="name" dependency="FNAM|LNAM" data-uppercase="true">
                    <span id="FIELD_FNAM">{data.first_name}</span>
                    <span dependency="FNAM+LNAM"> </span>
                    <span id="FIELD_LNAM">{data.last_name}</span>
                </div>

                <div className="address" data-uppercase="true">
                    <span className="paddedline zipsuffix" dependency="ADDR|STRT|CITY|STAT|ZIPC|REMW">
                        <span id="FIELD_STRT">{data.address}</span><span dependency="STRT+CITY|STAT">, </span>
                        <span className="spaced field" id="FIELD_CITY">{data.city}</span>
                        <span className="spaced field" id="FIELD_STAT"></span>

                        <span className="spaced field" id="FIELD_ZIPC">{data.postal_code}</span>
                        <span id="FIELD_ADDR"></span>
                        <span dependency="ADDR|STRT|CITY|STAT|ZIPC"></span>
                        <span id="FIELD_REMW"></span>
                    </span>

                    <span className="paddedline" dependency="HPHN|CPHN|EMAI">
                        <span className="dispInBlk maxWidth">
                        <span id="FIELD_HPHN">{data.phone}</span></span>
                        <span dependency="HPHN+CPHN|EMAI"> | </span>
                        <span className="dispInBlk maxWidth">
                        <span id="FIELD_CPHN"></span></span>

                        <span className="email" id="FIELD_EMAI">{data.email}</span>
                    </span>
                    {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                    <div dependency="DOB1|NTLY|IDNV|IDNT|DRIV|MSTA|WEB1|AVAI|VDCV|PRTF|SOCL">
                        {data.nationality && (
                        <>
                        <span dependency="NTLY" className="dispInBlk maxWidth">
                            <span className="txtBold"><span className="xslt_static_change">Nationality</span><span className="beforecolonspace">&nbsp;</span><span>:</span></span>
                            <span id="FIELD_NTLY">{data.nationality}</span>
                        </span>
                        {(data.driving_license || data.website || data.linkedin) && <span dependency="NTLY"><span dependency="IDNV|IDNT|DRIV|MSTA|WEB1|AVAI|VDCV|PRTF|SOCL" className="sprtr"> | </span></span>}
                        </>
                        )}
                        {data.driving_license && (
                        <>
                        <span dependency="DRIV" className="dispInBlk maxWidth">
                            <span className="txtBold"><span className="xslt_static_change">Permit</span><span className="beforecolonspace">&nbsp;</span><span>:</span></span>
                            <span id="FIELD_DRIV">{data.driving_license}</span>
                        </span>
                        {(data.website || data.linkedin) && <span dependency="DRIV"><span dependency="MSTA|WEB1|AVAI|VDCV|PRTF|SOCL" className="sprtr"> | </span></span>}
                        </>
                        )}
                        {data.website && (
                        <>
                        <span dependency="WEB1" className="dispInBlk maxWidth">
                            <span className="txtBold"><span className="xslt_static_change">Web</span><span className="beforecolonspace">&nbsp;</span><span>:</span></span>
                            <span id="FIELD_WEB1">{data.website}</span>
                        </span>
                        {data.linkedin && <span dependency="WEB1"><span dependency="AVAI|VDCV|PRTF|SOCL" className="sprtr"> | </span></span>}
                        </>
                        )}
                        {data.linkedin && (
                        <span dependency="SOCL">
                        <span className="maxWidth dispInBlk social-link" id="CATEGORY_SOCIAL_SOCL">
                            <span className="txtBold"><span id="DOCDATAINFO_SOCL">LinkedIn</span><span className="beforecolonspace"> </span><span>: </span></span>
                            <span className="brk-all" id="FIELD_SOCL">{data.linkedin}</span>
                        </span></span>
                        )}
                    </div>
                    )}
                </div>
            </div></div></div></div></div></div></div><div data-testid="embd-89XOkPJ0" className="parent-wrapper"><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="32" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">{t.professional_summary}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename PROFESSIONAL SUMMARY " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph smry PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn" id="FIELD_FRFM" dangerouslySetInnerHTML={{ __html: data.summary }}></div>
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="32" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="32" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section expr-sec SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">{t.work_history}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Work history " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">{data.experiences.map((exp, index) => (
<div key={exp.id} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="32" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="32" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${exp.id}`} id={`PARAGRAPH_EXPR_${exp.id}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn">
                    <span className="paddedline" dependency="JTIT">
                        <span className="jobtitle" id="FIELD_JTIT" data-uppercase="true">{exp.title}</span>
                    </span>
                    <span className="paddedline grayItl" dependency="COMP|JCTR|JSTA|JCIT|JCNT|JSTD|EDDT">
                        <span className="dflex texp-row">
                            <span className="jobtitle-cell">
                                <span className="companyname" id="FIELD_COMP">{exp.company}</span><span dependency="COMP"><span dependency="JCIT|JSTA|JCNT|JCTR|JSTD|EDDT"> | </span></span>
                                <span className="joblocation" id="FIELD_JCIT">{exp.city}</span><span className="joblocation" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span><span dependency="JCIT|JSTA|JCNT"><span dependency="JCTR|JSTD|EDDT"> | </span></span>
                                <span id="FIELD_JCTR"></span>
                                <span className="jobdates" id="FIELD_JSTD">{formatDate(exp.start_date, language)}</span><span dependency="JSTD+EDDT"> - </span><span className="jobdates" id="FIELD_EDDT">{exp.is_current ? t.present : formatDate(exp.end_date, language)}</span>
                            </span>

                        </span>
                    </span>
                    <span className="jobline" id="FIELD_JDES" dangerouslySetInnerHTML={{ __html: exp.description }}></span>
                </div>
            </div></div></div>
))}</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="32" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="32" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">{t.skills}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename SKILLS " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn maincolumn">
                    <table className="twocol skill">
                        <tbody><tr>
                            <td className="twocol_1" id="FIELD_SKC1"><ul>{data.skills.slice(0, Math.ceil(data.skills.length / 2)).map((skill) => (
  <li key={skill.id}>{skill.name}</li>
))}</ul></td>
                            <td className="twocol_2" id="FIELD_SKC2"><ul>{data.skills.slice(Math.ceil(data.skills.length / 2)).map((skill) => (
  <li key={skill.id}>{skill.name}</li>
))}</ul></td>
                        </tr>
                    </tbody></table>
                    <div className="multi-para-opt">
                        <div id="FIELD_PTTL" className="txtBold"></div>
                            <div className="multi-para-content">
                                <div id="FIELD_SKC1"><ul>{data.skills.slice(0, Math.ceil(data.skills.length / 2)).map((skill) => (
  <li key={skill.id}>{skill.name}</li>
))}</ul></div>
                                <div id="FIELD_SKC2"><ul>{data.skills.slice(Math.ceil(data.skills.length / 2)).map((skill) => (
  <li key={skill.id}>{skill.name}</li>
))}</ul></div>
                            </div>
                    </div>
                </div>
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="32" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="32" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">{t.education}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename EDUCATION " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">{data.educations.map((edu, index) => (
<div key={edu.id} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="32" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="32" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${edu.id}`} id={`PARAGRAPH_EDUC_${edu.id}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn">
                    <span className="paddedline" dependency="STUY|DGRE">
                        <span className="degree" id="FIELD_DGRE" data-uppercase="true">{edu.degree}</span><span dependency="DGRE"> </span><span className="programline" id="FIELD_STUY">{edu.field_of_study}</span>
                    </span>
                    <span className="paddedline" dependency="SCHO">
                        <span id="FIELD_SCHO">{edu.institution}</span>
                    </span>
                    <span className="paddedline grayItl" dependency="SCIT|SSTA|GRYR|SCNT|GRHN|GRIP|GRED|GRST">
                        <span id="FIELD_SCIT">{edu.city}</span><span id="FIELD_SSTA"></span><span className="joblocation jobcountry" id="FIELD_SCNT"></span>
						<span dependency="SCIT|SSTA|SCNT"><span dependency="GRYR|GRST|GRED|GRIP|GRHN"> | </span></span>
                        <span className="xslt_static_change displayNoneThisField">Expected in </span>
                        <span id="FIELD_GRYR">{formatDate(edu.start_date, language)}</span>
                        <span dependency="GRST+GRED" className="hyphen"> - </span>
                        <span className="jobdates" id="FIELD_GRED">{formatDate(edu.end_date, language)}</span>

                        <span id="FIELD_GRIP"></span>
						<span dependency="GRYR|GRIP|GRED|GRST"></span>
						<span id="FIELD_GRHN"></span>
				   </span>


                    <span id="FIELD_FRFM"></span>
                </div>
            </div></div></div>
))}</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="32" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>

{data.languages && data.languages.length > 0 && (
<div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="32" className="sortable-item section-container SortableItem-sibling data-LNGGsortable-item data-LNGG">
  <div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG88bc36a1-247b-b72f-7918-a79948b8fc80" className="section lang-sec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
    <div data-testid="embd-88uQIHR-LNGG" className="doc-item">
      <div data-testid="embd-88ciQTv" className="heading">
        <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_LNGG">{t.languages}</div>
      </div>
      <div data-testid="embd-88aw0Ce-LNGG" className="">
        <div data-testid="embd-87S8HNi88bc36a1-247b-b72f-7918-a79948b8fc80" id="CONTAINER_88bc36a1-247b-b72f-7918-a79948b8fc80" className="sortableInner">
          {data.languages.map((lang, index) => (
          <div key={lang.id} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="32" className="data-LNGG sortable-item paragraph-container SortableItem-sibling">
            <div data-testid={`embd-79HRa2m-${lang.id}`} id={`PARAGRAPH_LNGG_${lang.id}`} className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}>
              <div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn">
                  <div className="field">
                    <span className="txtBold" id="FIELD_FRFM">{lang.name}</span>
                    <span dependency="FRFM" className="colon"><span className="beforecolonspace"> </span><span>: </span></span>
                    <span className="flt-right" id="FIELD_RATG"></span>
                  </div>
                  <div className="rating-bar" dependency="RATV">
                    <div className="inner-rating" id="FIELD_RATV" type="width" style={{ width: getLevelWidth(lang.level) }}></div>
                  </div>
                  <div className="field">
                    <span id="FIELD_RATT">{getProficiencyLabel(lang.proficiency, t)}</span>
                  </div>
                  <div className="field">
                    <span id="FIELD_ADIF"></span>
                  </div>
                </div>
              </div>
            </div>
            <button data-testid="embd-87enKtK-LNGG" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="32" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button>
          </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  <button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="32" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button>
</div>
)}

</div></div><div></div></div></div>
    </>
  );
}
