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

export default function TemplateLca1({
  data = sampleData,
  translations: t = translations.en,
  language = "en",
  colorHex = "#fcc74a",
}: Partial<DynamicTemplateProps> = {}) {
  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;background:#FFF;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-lca1 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        .skn-lca1 span.paddedline{display:block}
        .skn-lca1 .logo,.skn-lca1 .nodisplay{display:none}
        .skn-lca1 .sectiontitle{text-transform:uppercase}
        .skn-lca1 .jobtitle,.skn-lca1 .degree,.skn-lca1 .txtBold{font-weight:bold}
        .skn-lca1 .grayTxt{color:#787C85}
        .skn-lca1 .jobdates{text-transform:uppercase}
        .skn-lca1 .sprtr{margin:0 5px}
        .skn-lca1 .flt-right{float:right}
		.skn-lca1 .dispInBlk{display:inline-block}
		.skn-lca1 .maxWidth{max-width:100%}
		.skn-lca1 .brk-all{word-break:break-all}
        .skn-lca1 .txt-bold{font-weight:bold}

        .skn-lca1 ul,.skn-lca1 li{list-style-type:disc;margin:0 0 0 10px;padding:0}
        .skn-lca1 ul li{margin:0 0 0 13px}

        .skn-lca1{color:#000;background-color:#FFF;word-wrap:break-word;text-size-adjust:none;-ms-text-size-adjust:none;-moz-text-size-adjust:none;-webkit-text-size-adjust:none;min-height:792px}
        .skn-lca1 .address:last-child{padding-bottom:10px;border-bottom:5px solid #fcc74a}
        .skn-lca1 .name{font-size:15px;line-height:17px;font-weight:bold;padding:0;text-transform:uppercase;text-align:left;color:#000}
        .skn-lca1 .resumeTitle{color:#4a4a4a}
        .skn-lca1 .paragraph{position:relative}
        .skn-lca1 .heading{clear:both;font-weight:bold}
        .skn-lca1 .address,.skn-lca1 .adnlLnks{position:relative;text-align:left;font-size:0.917em;line-height:1.25em;margin:0;color:#787C85;text-transform:uppercase}
        .skn-lca1 .address2{position:relative;text-align:left;font-size:0.917em;line-height:1.25em}
		.skn-lca1 .section:not(.lang-sec):not(.skli-sec):after{content: '';display:block;height:0;clear:both}
        .skn-lca1 .table_wrapper{margin-top:0}
		.skn-lca1 .skill{display:table;width:100%;table-layout:fixed}
        .skn-lca1 table.twocol td{width:50%;display:table-cell}
        .skn-lca1 table.skills th,.skn-lca1 table.skills td{width:20%;text-align:center}
        .skn-lca1 table.skills th{text-decoration:underline}
        .skn-lca1 table.skills .skillname,.skn-lca1 table.skills .skillrating{text-align:left;width:35%}
        .skn-lca1 table.skills .skillrating{width:20%}
        .skn-lca1 table.skills .skillyears,.skn-lca1 table.skills .skilllast{width:19%}
        .skn-lca1 table.skills .pad1{width:5%}
        .skn-lca1 table.skills .pad2,.skn-lca1 table.skills .pad3{width:1%}
        .skn-lca1 .section{clear:both}
        .skn-lca1 .heading{float:left;word-wrap:break-word}
        .skn-lca1 .SortableItem .wrapper{display:block}
        .skn-lca1 .SortableItem .wrapper .heading{margin-bottom:7px}
        .skn-lca1 .sortableInner > .SortableItem .wrapper{margin-top:0}
         
        .skn-lca1 .totl-expr{display:inline-block;padding:0 6px;color:#fff;font-weight:700;vertical-align:top;float:right}
        .skn-lca1.texp-curved .totl-expr{border-radius:10px}

        /*Personal details section*/
        .skn-lca1 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-lca1 .details-wrap{width:49%}

        /*FIX for FORCEFULLY making left margin ZERO for CL*/
        .skn-lca1 .sectionCL .paragraph{margin-top:0}

        /*MES address order code*/
        .skn-lca1 .zipprefix,.skn-lca1.MES .zipsuffix,.skn-lca1.MFR .zipsuffix{display:none}
        .skn-lca1 .zipsuffix,.skn-lca1.MES .zipprefix,.skn-lca1.MFR .zipprefix{display:inline}
        .skn-lca1.MDE .hide-de{display:none}

        /*Infographic*/
        .skn-lca1 .langSec{box-sizing: border-box}
        .skn-lca1 .lang-sec,.skn-lca1 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between;position:relative}
        .skn-lca1 .lang-sec .field *,.skn-lca1 .lang-sec .nativeLangPara .field,.skn-lca1 .skli-sec .field *{display:inline}
        .skn-lca1 .lang-sec .paragraph,.skn-lca1 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0}
        .skn-lca1 .lang-sec .singlecolumn,.skn-lca1 .skli-sec .singlecolumn{margin-left:0;position:relative}
        .skn-lca1 .lang-sec .heading,.skn-lca1 .skli-sec .heading{position:absolute;left:auto} 
        .skn-lca1 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
        .skn-lca1 .lang-sec .nativeLangPara{width:100%!important}
        .skn-lca1 .inner-rating{background-color:#576d7b;height:4px;width:60%}
        .skn-lca1 .lang-sec > .paragraph:nth-last-child(1),.skn-lca1 .lang-sec > .paragraph:nth-last-child(2),
        .skn-lca1 .skli-sec > .paragraph:nth-last-child(1),.skn-lca1 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0}
        .skn-lca1 .hide-bar .rating-bar,.skn-lca1 .hide-colon .colon,.skn-lca1 .hide-only-bar .rating-bar{display:none}
		.skn-lca1 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-lca1 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}

        /*HILT multi para/section*/
        .skn-lca1 .multi-para-hilt{position:relative}
        .skn-lca1 .multi-para-hilt:after{content: "";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/
        .skn-lca1 .multi-para-hilt .paragraph{margin-bottom:10px;margin-top:0;width:49%;float:left}
        .skn-lca1 .multi-para-hilt .paragraph:last-child,.skn-lca1 .multi-para-hilt .paragraph:nth-last-child(2):nth-child(2n){margin-bottom:0}
        .skn-lca1 .multi-para-hilt .paragraph:nth-child(2n+1){margin-left:2%}
        .skn-lca1 .multi-para-hilt .paragraph:nth-child(2n){clear:left}
        .skn-lca1 .multi-para-hilt .singlecolumn{margin:0}
        .skn-lca1 .multi-para-hilt .heading{position:absolute;left:0}
        .skn-lca1 .multi-section-hilt .multi-para-opt,.skn-lca1 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-lca1 .multi-para-hilt .twocol.skill{display:none}

        /* GRYR */
        .skn-lca1 .displayNoneThisField{display:none}/* Keep this class always at bottom */
        .skn-lca1 .section.sign{padding-top:50px!important}

        /*For Extra Space Before Colon*/
        .skn-lca1 .beforecolonspace{display:none!important}
        .skn-lca1.MFR .beforecolonspace{display:inline!important}
                
        /* Style for Signature */
        .skn-lca1 .disclaim .singlecolumn,.skn-lca1 .disclaim .singlecolumn li,.skn-lca1 .disclaim .singlecolumn p,.skn-lca1 .disclaim .singlecolumn span{font-size:9px;color:#8a8a8a}
        .skn-lca1 .field_sign{font-size:7px;color:#8a8a8a}
        .skn-lca1 .txtleft + .field_sign{text-align:left}
        .skn-lca1 .txtcenter + .field_sign{text-align:center}
        .skn-lca1 .txtright + .field_sign{text-align:right}
        .skn-lca1 .signPic img{max-width:100%}

         /* Text alignment bullet */
       .skn-lca1 .ttc-align-left ul{text-align:left}
       .skn-lca1 .ttc-align-right ul{text-align:right}
       .skn-lca1 .ttc-align-center ul{text-align:center}
       .skn-lca1 .ttc-align-justify ul{text-align:justify}
       .skn-lca1 .ttc-align-right li,.skn-lca1 .ttc-align-center li{position:relative;list-style-position:inside;margin-left:0}
       .skn-lca1:not(.for-pdf) .ttc-align-right li:first-letter,.skn-lca1:not(.for-pdf) .ttc-align-center li:first-letter{margin-left:-6px}

    

        .skn-lca1,.skn-lca1 table{line-height:17px}
        .skn-lca1.pagesize{width:521px}
        .skn-lca1.fontsize,.skn-lca1 .lang-sec .paragraph *,.skn-lca1 .skli-sec .paragraph *{font-size:12px}
        .skn-lca1.fontface{font-family:Century Gothic}
        .skn-lca1.vmargins{padding-top:37px;padding-bottom:37px}
        .skn-lca1.hmargins{padding-left:37px;padding-right:37px}
        .skn-lca1 .section{padding-top:15px!important}
        body #previewResume .preview-template-contact-highlighter{min-height:17px}
        .skn-lca1 .SortableItem > .wrapper{margin-top:15px}
        .skn-lca1 .firstsection{padding-top:0!important}
        .skn-lca1 .heading{width:140px}
        .skn-lca1 .paragraph{margin-top:10px}
        .skn-lca1 .firstparagraph{margin-top:0}
        .skn-lca1 .singlecolumn,.skn-lca1 .maincolumn{margin-left:140px}
        .skn-lca1 .sectiontitle{font-size:12px;line-height:12px}
        .skn-lca1 table.skills td{padding-top:5px}
        .skn-lca1 .address:last-child{border-color:#fcc74a}
        .skn-lca1 .name{font-size:37px;line-height:47px}
        .skn-lca1 .resumeTitle{font-size:16px;line-height:21px;padding:10px 0}
        .skn-lca1 .address,.skn-lca1 .adnlLnks{font-size:12px;line-height:22px}
		.skn-lca1 .skli-sec .singlecolumn .field:last-child{min-height:17px}
        .skn-lca1 .multi-para-hilt .heading{top:15px}
        .skn-lca1 .totl-expr{background-color:#fcc74a;font-size:8px;line-height:12px}

        /*FIX for Re-calculating width of singlecolumn for CL*/
        .skn-lca1 .sectionCL .singlecolumn{margin-left:0;width:100%}
        .skn-lca1 .address2{font-size:12px;line-height:17px}

        /*Infographic*/
        .skn-lca1 .lang-sec,.skn-lca1 .skli-sec,.skn-lca1 .multi-para-hilt{padding-left:140px}
        .skn-lca1 .lang-sec .heading,.skn-lca1 .skli-sec .heading{margin-left:-140px}
        .skn-lca1 .lang-sec .paragraph,.skn-lca1 .skli-sec .paragraph{width:47.7%}
        .skn-lca1 .data-LNGG .doc-item,.skn-lca1 .data-SKLI .doc-item{width:100%}
        .skn-lca1 .data-LNGG .sortableInner,.skn-lca1 .data-SKLI .sortableInner,.skn-lca1 .SECTION_LNGG .sortableInner,.skn-lca1 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-lca1 .data-LNGG .sortable-item,.skn-lca1 .data-SKLI .sortable-item{width:47.7%}
        .skn-lca1 .data-LNGG .sortable-item .paragraph,.skn-lca1 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}
        .skn-lca1 .lang-sec .native-lang{width:100%}
        .skn-lca1 .inner-rating{background-color:#fcc74a}
        .skn-lca1 .lang-sec .sortable-item,.skn-lca1 .skli-sec .sortable-item{vertical-align:top;margin-top:0}
       

        /*Builder fixes*/
        .skn-lca1 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}
        .page-finalize .skn-lca1 .lang-sec,.page-finalize .skn-lca1 .skli-sec{padding-left:0}
        .page-finalize .skn-lca1 .lang-sec .heading,.page-finalize .skn-lca1 .skli-sec .heading{margin-left:0}
        .page-finalize .skn-lca1 .lang-sec .sortableInner,.page-finalize .skn-lca1 .skli-sec .sortableInner{margin-left:140px}
        .page-finalize .skn-lca1 .lang-sec .heading + div > div:not(.sortableInner) .firstparagraph{display:inline}
        .page-finalize .skn-lca1 .lang-sec .heading + div > div:not(.sortableInner) .firstparagraph .singlecolumn{margin-left:140px!important}
		.page-finalize .skn-lca1 .lang-sec .sortableInner .sortable-item .paragraph.nativeLangPara{max-width:100%}

        /*Spell checker*/
        .page-finalize #spellcheck .skn-lca1 .lang-sec,.page-finalize #spellcheck .skn-lca1 .skli-sec{padding-left:0px}
        .page-finalize #spellcheck .skn-lca1 .lang-sec .heading, .page-finalize #spellcheck .skn-lca1 .skli-sec .heading{margin-left:-0px}
		
		/*Fixes for builder for skill*/
        .skn-lca1 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:17px}	
        .skn-lca1 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-lca1 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}	
        .skn-lca1 .lang-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-lca1 .lang-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph, .skn-lca1  .skli-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-lca1  .skli-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0!important}        
        .page-finalize .skn-lca1 .multi-para-hilt .heading{left:-140px;top:0px}
	   
        /*PDF Flex Handling Code - Personal Information*/
		.skn-lca1.for-pdf .pdet-sec .singlecolumn{display:block}
		.skn-lca1.for-pdf .pdfpdwrapper{display:table}
		.skn-lca1.for-pdf .pdfpdwrapper .details-wrap:first-child{display:table-cell;padding-right:5px}
		.skn-lca1.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){display:table-cell}
		.skn-lca1.for-pdf .pdfpdwrapper .details-wrap{width:188px;}

        /*CSS for Infographic PDFWrapper*/
        .skn-lca1.for-pdf .lang-sec,.skn-lca1.for-pdf .skli-sec{display: block;}
        .skn-lca1.for-pdf .section .pdfinfwrapper{display:block;width:100%}
        .skn-lca1.for-pdf .section .pdfinfwrapper:after{content:'';clear:both;display:table}
        .skn-lca1.for-pdf .section .pdfinfwrapper .paragraph:first-child{float:left}
        .skn-lca1.for-pdf .section .pdfinfwrapper .paragraph:nth-child(2){float:right}
        .skn-lca1.for-pdf .section .pdfinfwrapper .paragraph{margin-bottom:5px;padding-bottom: 0px;}
        .skn-lca1.for-pdf .section .pdfinfwrapper:last-child .paragraph{margin-bottom:0}
        .skn-lca1.for-pdf .section .pdfinfwrapper .paragraph{clear: none;}

      /*PDF Handling for TEXP*/
      .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .texp-row{display:block;}
      .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .jobtitle-cell{display:inline-block;width:65%}
      .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .texp-cell{display:inline-block;float:right;}

    `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-lca1 LCA1 MUK pict-pcpf-purl texp-rectangle expr-durt-none " docskinwidth="521" ><div data-testid="embd-91y4rV2" className="name-contact "><div></div><div></div><div data-testid="embd-88MByq6-PRFL" id="SECTION_PRFL30868c37-6fcc-4b70-b87a-afd2447ce0d4" className="section SECTION_PRFL firstsection" data-section-cd="PRFL"><div data-testid="embd-88uQIHR-PRFL" className="doc-item"><div data-testid="embd-88aw0Ce-PRFL" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-04f55583-5181-435c-8336-f48964adf912" id="PARAGRAPH_PRFL_04f55583-5181-435c-8336-f48964adf912" className="paragraph PARAGRAPH_PRFL firstparagraph"><div data-testid="embd-78KlmQp">
                <div className="name" data-uppercase="true">
                    <span id="FIELD_FNAM">{data.first_name}</span>
                    <span dependency="FNAM+LNAM"> </span>
                    <span id="FIELD_LNAM">{data.last_name}</span>
                </div>

                <div className="address" data-uppercase="true">
                    <span className="zipsuffix" dependency="STRT|CITY|STAT|ZIPC|ADDR">
                        <span id="FIELD_STRT">{data.address}</span><span dependency="STRT"><span dependency="CITY|STAT">, </span></span>
                        <span className="spaced" id="FIELD_CITY">{data.city}</span>
                        <span className="spaced" id="FIELD_STAT"></span>
                        <span className="spaced" id="FIELD_ZIPC">{data.postal_code}</span>
                        <span id="FIELD_ADDR"></span>
                    </span>

                    <span dependency="STRT|CITY|STAT|ZIPC"> </span>
                    <span id="FIELD_REMW"></span>
                    <span dependency="HPHN+CPHN|REMW|EMAI"> </span>
                    <span className="dispInBlk maxWidth" dependency="HPHN"><span id="FIELD_HPHN">{data.phone}</span></span>
                    <span dependency="HPHN+CPHN|EMAI"> </span>


                    <span id="FIELD_EMAI">{data.email}</span>
                </div>
                {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                <div className="address" data-uppercase="true" dependency="DOB1|NTLY|IDNV|IDNT|DRIV|MSTA|AVAI|WEB1|VDCV|PRTF|SOCL">
                    {data.nationality && (
                    <>
                    <span dependency="NTLY" className="dispInBlk maxWidth">
                        <span className="txtBold"><span className="xslt_static_change">Nationality</span><span className="beforecolonspace"> </span><span>:</span></span>
                        <span id="FIELD_NTLY">{data.nationality}</span>
                    </span>
                    {(data.driving_license || data.website || data.linkedin) && <span> </span>}
                    </>
                    )}
                    {data.driving_license && (
                    <>
                    <span dependency="DRIV" className="dispInBlk maxWidth">
                        <span className="txtBold">
                           <span className="xslt_static_change">Permit</span><span className="beforecolonspace">&nbsp;</span><span>:</span>
                        </span>
                        <span id="FIELD_DRIV">{data.driving_license}</span>
                    </span>
                    {(data.website || data.linkedin) && <span> </span>}
                    </>
                    )}
                    {data.website && (
                    <>
                    <span dependency="WEB1" className="dispInBlk maxWidth">
                        <span className="txtBold">
                           <span className="xslt_static_change">Web</span><span className="beforecolonspace">&nbsp;</span><span>:</span>
                        </span>
                        <span className="brk-all" id="FIELD_WEB1">{data.website}</span>
                    </span>
                    {data.linkedin && <span> </span>}
                    </>
                    )}
                    {data.linkedin && (
                    <span dependency="SOCL" className="brk-all maxWidth" id="CATEGORY_SOCIAL_SOCL">
                        <span className="dispInBlk">
                            <span className="txtBold">
                                <span className="xslt_static_change"></span><span id="DOCDATAINFO_SOCL">LinkedIn</span><span className="beforecolonspace">&nbsp;</span><span>:</span>
                            </span>
                            <span id="FIELD_SOCL">{data.linkedin}</span>
                        </span>
                    </span>
                    )}
                </div>
                )}
            </div></div></div></div></div></div></div><div data-testid="embd-89XOkPJ0" className="parent-wrapper"><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="31" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">{t.professional_summary}</div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn" id="FIELD_FRFM" dangerouslySetInnerHTML={{ __html: data.summary || '' }}></div>
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="31" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="31" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section expr-sec SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">{t.work_history}</div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">
{data.experiences && data.experiences.map((exp, index) => (
<div key={exp.id} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="31" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="31" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${exp.id}`} id={`PARAGRAPH_EXPR_${exp.id}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn">
                    <span className="paddedline grayTxt texp-row" dependency="JSTD|EDDT|TEXP">
                        <span className="jobtitle-cell">
                            <span className="jobdates" data-uppercase="true" id="FIELD_JSTD" format="%B %Y">{formatDate(exp.start_date, language)}</span><span dependency="JSTD+EDDT" className="hyphen"></span><span className="jobdates" data-uppercase="true" id="FIELD_EDDT" format="%B %Y">{exp.currently_working ? t.present : formatDate(exp.end_date, language)}</span>
                        </span>
                        <span className="texp-cell">
                            <span className="totl-expr" id="FIELD_TEXP"></span>
                        </span>
                    </span>
                    <span className="paddedline" dependency="JTIT|JCTR|COMP|JCIT|JSTA|JCNT">
                        <span className="jobtitle" id="FIELD_JTIT">{exp.job_title}</span><span dependency="JTIT"><span dependency="JCTR|JCIT|JSTA|JCNT|COMP"> | </span></span>
                        <span className="companyname" id="FIELD_COMP">{exp.company}</span><span dependency="COMP"><span dependency="JCIT|JSTA|JCNT|JCTR"> | </span></span>
                        <span className="joblocation jobcity" id="FIELD_JCIT">{exp.city}</span><span className="joblocation jobstate" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span><span id="FIELD_JCTR"></span>
                    </span>
                    <span className="jobline" id="FIELD_JDES" dangerouslySetInnerHTML={{ __html: exp.description || '' }}></span>
                </div>
            </div></div></div>
))}
</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="31" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="31" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">{t.skills}</div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn maincolumn">
                    <table className="twocol skill">
                        <tbody><tr>
                            <td className="twocol_1" id="FIELD_SKC1"><ul>{data.skills && data.skills.slice(0, Math.ceil(data.skills.length / 2)).map((skill) => (
                              <li key={skill.id}>{skill.name}</li>
                            ))}</ul></td>
                            <td className="twocol_2" id="FIELD_SKC2"><ul>{data.skills && data.skills.slice(Math.ceil(data.skills.length / 2)).map((skill) => (
                              <li key={skill.id}>{skill.name}</li>
                            ))}</ul></td>
                        </tr>
                    </tbody></table>
                    <div className="multi-para-opt">
                        <div id="FIELD_PTTL" className="txtBold para-head"></div>
                            <div className="multi-para-content">
                                <div id="FIELD_SKC1"><ul>{data.skills && data.skills.slice(0, Math.ceil(data.skills.length / 2)).map((skill) => (
                                  <li key={skill.id}>{skill.name}</li>
                                ))}</ul></div>
                                <div id="FIELD_SKC2"><ul>{data.skills && data.skills.slice(Math.ceil(data.skills.length / 2)).map((skill) => (
                                  <li key={skill.id}>{skill.name}</li>
                                ))}</ul></div>
                            </div>
                    </div>
                </div>
              </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="31" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="31" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">{t.education}</div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">
{data.educations && data.educations.map((edu, index) => (
<div key={edu.id} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="31" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="31" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${edu.id}`} id={`PARAGRAPH_EDUC_${edu.id}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn">
                    <span className="paddedline grayTxt" dependency="GRYR|GRST|GRED|GRIP">
                        <span className="xslt_static_change displayNoneThisField">Expected in </span>
                        <span id="FIELD_GRYR" format="%B %Y"></span>
                        <span className="jobdates" data-uppercase="true" id="FIELD_GRST" format="%B %Y">{formatDate(edu.start_date, language)}</span>
                        <span dependency="GRST+GRED" className="hyphen"> - </span>
                        <span className="jobdates" data-uppercase="true" id="FIELD_GRED" format="%B %Y">{edu.currently_studying ? t.present : formatDate(edu.end_date, language)}</span>
                        <span dependency="GRED|GRST"></span>
                        <span id="FIELD_GRIP"></span>
                    </span>
                    <span className="paddedline" dependency="STUY|DGRE">
                        <span className="degree" id="FIELD_DGRE">{edu.degree}</span><span dependency="DGRE+STUY"><span className="beforecolonspace">&nbsp;</span><span>:</span></span>
                        <span className="programline" id="FIELD_STUY">{edu.field_of_study}</span>
                    </span>
                    <span className="paddedline" dependency="SCIT|SCHO|SSTA|SCNT|GRHN">
                        <span className="companyname companyname_educ" id="FIELD_SCHO">{edu.institution}</span><span dependency="SCHO"><span dependency="SCIT|SSTA|SCNT">, </span></span><span className="joblocation jobcity" id="FIELD_SCIT">{edu.location}</span><span className="joblocation jobstate" id="FIELD_SSTA"></span><span className="joblocation jobcountry" id="FIELD_SCNT"></span>
                        <span dependency="SCIT|SCHO|SSTA|SCNT"></span><span id="FIELD_GRHN"></span>
                    </span>


                    <span id="FIELD_FRFM"></span>
                </div>
            </div></div></div>
))}
</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="31" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>

{data.languages && data.languages.length > 0 && (
<div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="31" className="sortable-item section-container SortableItem-sibling data-LNGGsortable-item data-LNGG">
  <div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG88bc36a1-247b-b72f-7918-a79948b8fc80" className="section lang-sec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
    <div data-testid="embd-88uQIHR-LNGG" className="doc-item">
      <div data-testid="embd-88ciQTv" className="heading">
        <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_LNGG">{t.languages}</div>
      </div>
      <div data-testid="embd-88aw0Ce-LNGG" className="">
        <div data-testid="embd-87S8HNi88bc36a1-247b-b72f-7918-a79948b8fc80" id="CONTAINER_88bc36a1-247b-b72f-7918-a79948b8fc80" className="sortableInner">
          {data.languages.map((lang, index) => (
          <div key={lang.id} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="31" className="data-LNGG sortable-item paragraph-container SortableItem-sibling">
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
            <button data-testid="embd-87enKtK-LNGG" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="31" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button>
          </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  <button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="31" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button>
</div>
)}

</div></div><div></div></div></div>
    </>
  );
}
