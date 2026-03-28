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

export default function TemplateUpa1({
  data = sampleData,
  translations: t = translations.en,
  language = "en",
  colorHex = "#C00000",
}: Partial<DynamicTemplateProps> = {}) {
  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-upa1 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        .skn-upa1 span.jobtitle,.skn-upa1 span.companyname,.skn-upa1 span.degree,.skn-upa1 .txtBold{font-weight:bold}
        .skn-upa1 .datesWrapper,.skn-upa1 .flt-right{float:right}
        .skn-upa1 .logo,.skn-upa1 .nodisplay{display:none}
        .skn-upa1 span.paddedline{display:block}
		.skn-upa1 .dispInBlk{display:inline-block}
		.skn-upa1 .maxWidth{max-width:100%}
        .skn-upa1 .brk-all{word-break:break-all}

        .skn-upa1 ul li{margin:0 0 0 13px;list-style:disc}
        .skn-upa1 .adnlLnks ul{margin:0}
        .skn-upa1 .adnlLnks li{display:inline!important}
        .skn-upa1 .adnlLnks li:first-child{margin:0}

        .skn-upa1{color:#000;word-wrap:break-word;text-size-adjust:none;-ms-text-size-adjust:none;-moz-text-size-adjust:none;-webkit-text-size-adjust:none;min-height:792px}
        .skn-upa1 .name,.skn-upa1 .resumeTitle,.skn-upa1 .address{text-align:right}
        .skn-upa1 .name{font-size:15px;line-height:17px;font-weight:bold;padding:0;text-transform:uppercase}
        .skn-upa1 .name span.lName{color:#C00000}
        .skn-upa1 .resumeTitle{color:#4a4a4a}
        .skn-upa1 .paragraph{position:relative}
        .skn-upa1 .heading{clear:both;font-weight:bold}
        .skn-upa1 .address{position:relative;font-size:0.917em;line-height:1.25em;margin-top:11px;background-color:#000;font-weight:bold;padding:4px 5px;color:#FFF}
        .skn-upa1 .address2{position:relative;text-align:left;font-size:0.917em;line-height:1.25em}
        .skn-upa1 .adnlLnks{text-align:center}
        .skn-upa1 .table_wrapper{width:100%;margin-top:0}
        .skn-upa1 table.twocol td{width:50%;vertical-align:top}
        .skn-upa1 table.skills th,.skn-upa1 table.skills td{width:20%;text-align:center}
        .skn-upa1 table.skills th{text-decoration:underline}
        .skn-upa1 table.skills .skillname,.skn-upa1 table.skills .skillrating{text-align:left;width:35%}
        .skn-upa1 table.skills .skillrating{width:20%}
        .skn-upa1 table.skills .skillyears,.skn-upa1 table.skills .skilllast{width:19%}
        .skn-upa1 table.skills .pad1{width:5%}
        .skn-upa1 table.skills .pad2,.skn-upa1 table.skills .pad3{width:1%}
        .skn-upa1 .social-link .sprtr{padding:0 2px}
        .skn-upa1 .social-link:last-child .sprtr{display:none}
        .skn-upa1 .twocol .twocol_2 ul{padding-left:5px}

        /*Personal details section*/
        .skn-upa1 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-upa1 .details-wrap{width:49%}
        
        /*FIX for FORCEFULLY making left margin ZERO for CL*/
        .skn-upa1 .sectionCL .paragraph{margin-top:0!important}

        /* Style for Signature */
        .skn-upa1 .disclaim .singlecolumn,.skn-upa1 .signPic > .field_sign{margin-left:0!important}
        .skn-upa1 .disclaim .singlecolumn,.skn-upa1 .disclaim .singlecolumn li,.skn-upa1 .disclaim .singlecolumn p,.skn-upa1 .disclaim .singlecolumn span{font-size:9px!important;color:#8a8a8a!important}
        .skn-upa1 .field_sign{font-size:7px!important;color:#8a8a8a!important}
        .skn-upa1 .txtleft + .field_sign{text-align:left}
        .skn-upa1 .txtcenter + .field_sign{text-align:center}
        .skn-upa1 .txtright + .field_sign{text-align:right}
        .skn-upa1 .signPic span:first-child{padding-right:6px}
        .skn-upa1 .signPic img{padding-top:5px;max-width:100%}

        /*MES and MFR address order code*/
        .skn-upa1 .zipprefix,.skn-upa1.MES .zipsuffix,.skn-upa1.MFR .zipsuffix{display:none}
        .skn-upa1 .zipsuffix,.skn-upa1.MES .zipprefix,.skn-upa1.MFR .zipprefix{display:inline}

        /*Infographic*/
        .skn-upa1 .lang-sec,.skn-upa1 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-upa1 .lang-sec .heading,.skn-upa1 .skli-sec .heading{width:100%;flex-grow:1}
        .skn-upa1 .lang-sec .paragraph, .skn-upa1 .skli-sec .paragraph{width:48.6%}
        .skn-upa1 .lang-sec .field *,.skn-upa1 .lang-sec .nativeLangPara .field,.skn-upa1 .skli-sec .field *{display:inline}
        .skn-upa1 .lang-sec .paragraph,.skn-upa1 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px!important;margin-top:0}
        .skn-upa1 .lang-sec .singlecolumn,.skn-upa1 .skli-sec .singlecolumn{margin-left:0!important;position:relative}
        .skn-upa1 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
        .skn-upa1 .lang-sec .nativeLangPara{width:100%!important}
        .skn-upa1 .inner-rating{background-color:#000;height:4px;width:60%}
        .skn-upa1 .lang-sec > .paragraph:nth-last-child(1),.skn-upa1 .lang-sec > .paragraph:nth-last-child(2),
        .skn-upa1 .skli-sec > .paragraph:nth-last-child(1),.skn-upa1 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0!important}
		.skn-upa1 .hide-bar .rating-bar,.skn-upa1 .hide-colon .colon,.skn-upa1 .hide-only-bar .rating-bar{display:none}
		
		.skn-upa1 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-upa1 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}

        /* Text alignment bullet */
       .skn-upa1 .ttc-align-left ul{text-align:left}
       .skn-upa1 .ttc-align-right ul{text-align:right}
       .skn-upa1 .ttc-align-center ul{text-align:center}
       .skn-upa1 .ttc-align-justify ul{text-align:justify}
       .skn-upa1 .ttc-align-right li,.skn-upa1 .ttc-align-center li{position:relative;list-style-position:inside;margin-left:0}
       .skn-upa1:not(.for-pdf) .ttc-align-right li:first-letter,.skn-upa1:not(.for-pdf) .ttc-align-center li:first-letter{margin-left:-5px}

        /* GRYR */
        .skn-upa1 .displayNoneThisField{display:none}/* Keep this class always at bottom */
		
		/*For Extra Space Before Colon*/
        .skn-upa1 .beforecolonspace{display:none!important}
        .skn-upa1.MFR .beforecolonspace{display:inline!important}

        .skn-upa1 .social-link:last-child .sprtr,.skn-upa1 .fieldgroup .fielditem:last-child .sprtr{display:none}
      .skn-upa1 .paragraph-fieldgroup .address a{color:#fff}
      .skn-upa1 .fieldgroup .sprtr{padding:0 2px}

        /* Duration tag */
        .skn-upa1 .totl-expr{display:inline-block;padding:0 5px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap}
        .skn-upa1.texp-curved .totl-expr{border-radius:10px}
        .skn-upa1 .texp-cell{display:block;text-align:right;margin-bottom:8px;}
        .skn-upa1 .firstparagraph .texp-cell{margin-top:7px}

    

        .skn-upa1,.skn-upa1 table{line-height:14px}
        .skn-upa1.pagesize{width:545px}
        .skn-upa1.fontsize,.skn-upa1 .lang-sec .paragraph *,.skn-upa1 .skli-sec .paragraph *{font-size:11px}
        .skn-upa1.fontface,.skn-upa1 .lang-sec .paragraph *,.skn-upa1 .skli-sec .paragraph *{font-family:Times New Roman}
        .skn-upa1.vmargins{padding-top:25px;padding-bottom:25px}
        .skn-upa1.hmargins{padding-left:25px;padding-right:25px}
        .skn-upa1 .section{margin-top:5px}
        .skn-upa1 .disclaim{margin:0;padding:0;margin-top:25px}
        .skn-upa1 .firstsection,.skn-upa1 .SECTION_CNTC,.skn-upa1 .firstparagraph{margin-top:0!important}
        .skn-upa1 .heading{margin-bottom:1px}
        .skn-upa1 .paragraph{margin-top:2px}
        .skn-upa1 .singlecolumn,.skn-upa1 .maincolumn{margin-left:0px}
        .skn-upa1 .bottomborder{border-bottom:1px solid}
        .skn-upa1 .sectiontitle{font-size:14px;line-height:17px}
        .skn-upa1 .name{font-size:29px;line-height:35px}
        .skn-upa1 .resumeTitle{font-size:15px;line-height:30px;padding:0 0 6px 0}
        .skn-upa1 .address{font-size:10px;line-height:16px;margin-top:3px}
        .skn-upa1 table.skills td{padding-top:1px}
        .skn-upa1 .heading{margin-bottom:1px;border-color:#C00000!important}
        .skn-upa1 .name span.lName{color:#C00000}
        .skn-upa1 .disclaim .heading{margin-bottom:3px}
		.skn-upa1 .skli-sec .singlecolumn .field:last-child{min-height:14px}
        .skn-upa1 .totl-expr{background-color:#C00000;font-size:7px;line-height:12px}
        .skn-upa1 .firstparagraph .texp-cell{margin-top:7px}
        .skn-upa1 .paragraph:not(.firstparagraph) .texp-cell{padding-top:14px}
        .skn-upa1 .texp-cell{margin-bottom:8px;line-height:12px}
        
        /*FIX for Re-calculating width of singlecolumn for CL*/
        .skn-upa1 .sectionCL .singlecolumn{margin-left:0!important;width:100%}
        .skn-upa1 .address2{font-size:11px;line-height:14px}

        /*Infographic*/
        .skn-upa1 .lang-sec,.skn-upa1 .skli-sec{padding-left:0px}
        .skn-upa1 .lang-sec .heading,.skn-upa1 .skli-sec .heading{margin-left:-0px}
        .skn-upa1 .inner-rating{background-color:#C00000}
        .skn-upa1 .lang-sec .sortable-item,.skn-upa1 .skli-sec .sortable-item{display:inline-block;vertical-align:top}

        /*finalize page fixes*/
        .skn-upa1 .langSec .sortableInner .sortable-item:not(:first-child) .paragraph,.skn-upa1 .infoSec .sortableInner .sortable-item:not(:first-child) .paragraph{vertical-align:top}
        .page-finalize .skn-upa1 .sortableInner .paragraph-container+.paragraph-container,.page-finalize .sortable-drag-item.skn-upa1 .section{margin-top:0!important}
        .skn-upa1 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}
        .skn-upa1 .data-LNGG .sortable-item.native-lang{width:100%;max-width:100%}
        .skn-upa1 .data-LNGG .doc-item,.skn-upa1 .data-SKLI .doc-item,.skn-upa1 .lang-sec .doc-item,.skn-upa1 .skli-sec .doc-item{width:100%}
        .skn-upa1 .data-LNGG .sortableInner,.skn-upa1 .data-SKLI .sortableInner,.skn-upa1 .SECTION_LNGG .sortableInner,.skn-upa1 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-upa1 .data-LNGG .sortable-item,.skn-upa1 .data-SKLI .sortable-item{width:48.6%}
        .skn-upa1 .data-LNGG .sortable-item .paragraph,.skn-upa1 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}
		
		 /*Fixes for builder for skill*/
        .skn-upa1 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:14px}	
        .skn-upa1 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-upa1 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}	
       .skn-upa1 .lang-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-upa1 .lang-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph, .skn-upa1  .skli-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-upa1  .skli-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0!important}
	   
	   /*PDF Flex Handling Code - Personal Information*/
		.skn-upa1.for-pdf .pdet-sec .singlecolumn{display:block}
		.skn-upa1.for-pdf .pdfpdwrapper{display:block}
		.skn-upa1.for-pdf .pdfpdwrapper .details-wrap:first-child{float:left;padding-right:5px}
		.skn-upa1.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){float:right}
		.skn-upa1.for-pdf .pdfpdwrapper .details-wrap{width:270px!important;}
	   
    /*Infographic Containers*/
    .skn-upa1.for-pdf .lang-sec,.skn-upa1.for-pdf .skli-sec{display:block}
    .skn-upa1.for-pdf .pdfinfwrapper{display:block}
    .skn-upa1.for-pdf .pdfinfwrapper:after{content:'';clear:both;display:table}
    .skn-upa1.for-pdf .pdfinfwrapper .paragraph:first-child{float:left}
    .skn-upa1.for-pdf .pdfinfwrapper .paragraph:nth-child(2){float:right}
    .skn-upa1.for-pdf .pdfinfwrapper:last-child .paragraph{margin-bottom:0;padding-bottom:0!important}
	 `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-upa1 UPA1 MUK texp-rectangle pict-pcpf-purl " docskinwidth="545" ><div data-testid="embd-91y4rV2" className="name-contact "><div></div><div></div><div data-testid="embd-88MByq6-PRFL" id="SECTION_PRFL30868c37-6fcc-4b70-b87a-afd2447ce0d4" className="section-prfl section SECTION_PRFL firstsection" data-section-cd="PRFL"><div data-testid="embd-88uQIHR-PRFL" className="doc-item"><div data-testid="embd-88aw0Ce-PRFL" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-04f55583-5181-435c-8336-f48964adf912" id="PARAGRAPH_PRFL_04f55583-5181-435c-8336-f48964adf912" className="paragraph PARAGRAPH_PRFL firstparagraph"><div data-testid="embd-78KlmQp">
                <div className="name">
                    <span id="FIELD_FNAM">{data.first_name}</span>
                    <span dependency="FNAM+LNAM"> </span>
                    <span className="lName" id="FIELD_LNAM">{data.last_name}</span>
                </div>

                <div className="address">
                    <span className="zipsuffix" dependency="ADDR|STRT|CITY|STAT|ZIPC">
                        <span id="FIELD_STRT">{data.address}</span><span dependency="STRT+CITY|STAT">, </span>
                        <span className="spaced" id="FIELD_CITY">{data.city}</span>
                        <span className="spaced" id="FIELD_STAT"></span>

                        <span className="spaced" id="FIELD_ZIPC">{data.postal_code}</span>
						<span id="FIELD_ADDR"></span>
                    </span>

                    <span dependency="ADDR|STRT|CITY|STAT|ZIPC"> | </span>
                    <span id="FIELD_REMW"></span>

                    <span className="dispInBlk maxWidth">
                    <span id="FIELD_HPHN">{data.phone}</span></span>
                    <span dependency="HPHN+CPHN|EMAI"> | </span>
                    <span className="dispInBlk maxWidth">
                    <span id="FIELD_CPHN"></span></span>

                    <span id="FIELD_EMAI">{data.email}</span>
                    {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                    <div dependency="DOB1|NTLY|WPMT|IDNV|IDNT|DRIV|MSTA|WEB1|VDCV|PRTF|SOCL">
                        {data.nationality && (
                        <>
                        <span dependency="NTLY" className="dispInBlk maxWidth">
                            <span className="txtBold"><span id="DOCDATAINFO_NTLY" className="xslt_static_change">Nationality</span><span className="beforecolonspace"> </span><span>: </span></span><span id="FIELD_NTLY">{data.nationality}</span>
                        </span>
                        <span dependency="NTLY"><span dependency="WPMT|IDNV|IDNT|DRIV|MSTA|WEB1|VDCV|PRTF|SOCL">{(data.driving_license || data.website || data.linkedin) && ' | '}</span></span>
                        </>
                        )}
                        {data.driving_license && (
                        <>
                        <span dependency="DRIV" className="dispInBlk maxWidth">
                            <span className="txtBold"><span id="DOCDATAINFO_DRIV" className="xslt_static_change">Permit</span><span className="beforecolonspace"> </span><span>: </span></span><span id="FIELD_DRIV">{data.driving_license}</span>
                          </span>
                        <span dependency="DRIV"><span dependency="MSTA|WEB1|VDCV|PRTF|SOCL">{(data.website || data.linkedin) && ' | '}</span></span>
                        </>
                        )}
                        {data.website && (
                        <>
                        <span dependency="WEB1" className="dispInBlk maxWidth">
                            <span className="txtBold"><span className="xslt_static_change">Web</span><span className="beforecolonspace"> </span><span>: </span></span><span className="brk-all" id="FIELD_WEB1">{data.website}</span>
                        </span>
                        <span dependency="WEB1"><span dependency="VDCV|PRTF|SOCL">{data.linkedin && ' | '}</span></span>
                        </>
                        )}
                        {data.linkedin && (
                        <span dependency="SOCL" className="maxWidth dispInBlk social-link" id="CATEGORY_SOCIAL_SOCL">
                            <span className="txtBold"><span id="DOCDATAINFO_SOCL">LinkedIn</span><span className="beforecolonspace"> </span><span>: </span></span><span className="brk-all" id="FIELD_SOCL">{data.linkedin}</span>
                        </span>
                        )}
                    </div>
                    )}
                </div>
            </div></div></div></div></div></div></div><div data-testid="embd-89XOkPJ0" className="parent-wrapper"><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="37" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading bottomborder"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">{t.professional_summary}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename PROFESSIONAL SUMMARY " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn" id="FIELD_FRFM" dangerouslySetInnerHTML={{ __html: data.summary }}></div>
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="37" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="37" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading bottomborder"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">{t.work_history}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Work history " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">{data.experiences.map((exp, index) => (
<div key={exp.id} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="37" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="37" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${exp.id}`} id={`PARAGRAPH_EXPR_${exp.id}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn">

                    <span className="paddedline" dependency="JTIT|JSTD|EDDT|TEXP">
                        <span className="jobtitle" id="FIELD_JTIT">{exp.title}</span>
                        <span className="datesWrapper" dependency="JSTD|EDDT">
                            <span className="jobdates" id="FIELD_JSTD">{formatDate(exp.start_date, language)}</span><span dependency="JSTD+EDDT"> - </span><span className="jobdates" id="FIELD_EDDT">{exp.is_current ? t.present : formatDate(exp.end_date, language)}</span>
                        </span>
                    </span>
                    <span className="paddedline" dependency="COMP|JSTA|JCIT|JCNT|JCTR">
                        <span className="companyname" id="FIELD_COMP">{exp.company}</span><span dependency="COMP"><span dependency="JCIT|JSTA|JCNT|JCTR"> - </span></span>
                        <span className="joblocation jobcity" id="FIELD_JCIT">{exp.city}</span><span className="joblocation jobstate" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span><span id="FIELD_JCTR"></span>
                    </span>
                    <span className="jobline" id="FIELD_JDES" dangerouslySetInnerHTML={{ __html: exp.description }}></span>
                </div>
            </div></div></div>
))}</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="37" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="37" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading bottomborder"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">{t.skills}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename SKILLS " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn maincolumn">
                    <table className="twocol">
                        <tbody><tr>
                            <td className="twocol_1" id="FIELD_SKC1"><ul>{data.skills.slice(0, Math.ceil(data.skills.length / 2)).map((skill) => (
  <li key={skill.id}>{skill.name}</li>
))}</ul></td>
                            <td className="twocol_2" id="FIELD_SKC2"><ul>{data.skills.slice(Math.ceil(data.skills.length / 2)).map((skill) => (
  <li key={skill.id}>{skill.name}</li>
))}</ul></td>
                        </tr>
                    </tbody></table>
                </div>
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="37" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="37" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading bottomborder"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">{t.education}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename EDUCATION " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">{data.educations.map((edu, index) => (
<div key={edu.id} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="37" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="37" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${edu.id}`} id={`PARAGRAPH_EDUC_${edu.id}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn">
                    <span className="paddedline" dependency="DGRE|STUY|GRYR|GRED|GRST|GRIP">
                        <span className="degree" id="FIELD_DGRE">{edu.degree}</span><span dependency="DGRE+STUY"><span className="beforecolonspace"> </span><span>: </span></span><span className="programline" id="FIELD_STUY">{edu.field_of_study}</span>
                        <span className="datesWrapper">
                            <span className="xslt_static_change displayNoneThisField">Expected in </span>
                            <span id="FIELD_GRYR">{formatDate(edu.start_date, language)}</span>
                            <span dependency="GRST+GRED"> - </span>
                            <span className="jobdates" id="FIELD_GRED">{formatDate(edu.end_date, language)}</span>

                            <span id="FIELD_GRIP"></span>
						</span>
                    </span>
                    <span className="paddedline" dependency="SCHO|SCIT|SSTA|SCNT|GRHN">
                        <span className="companyname companyname_educ" id="FIELD_SCHO">{edu.institution}</span><span dependency="SCHO"><span dependency="SCIT|SSTA|SCNT|GRHN"> - </span></span>
                        <span className="joblocation jobcity" id="FIELD_SCIT">{edu.city}</span><span className="joblocation jobstate" id="FIELD_SSTA"></span><span className="joblocation jobcountry" id="FIELD_SCNT"></span>
                        <span dependency="SCIT|SSTA|SCNT"></span><span id="FIELD_GRHN"></span>
					</span>


                    <span id="FIELD_FRFM"></span>
                </div>
            </div></div></div>
))}</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="37" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>

{data.languages && data.languages.length > 0 && (
<div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="37" className="sortable-item section-container SortableItem-sibling data-LNGG">
<div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG88bc36a1-247b-b72f-7918-a79948b8fc80" className="section lang-sec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
<div data-testid="embd-88uQIHR-LNGG" className="doc-item">
<div data-testid="embd-88ciQTv" className="heading bottomborder">
<div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_LNGG">{t.languages}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Languages " className="ds-link ds-link-default rename-section text-rename"></span></div>
</div>
<div data-testid="embd-88aw0Ce-LNGG" className="">
<div data-testid="embd-87S8HNi88bc36a1-247b-b72f-7918-a79948b8fc80" id="CONTAINER_88bc36a1-247b-b72f-7918-a79948b8fc80" className="sortableInner">
{data.languages.map((lang, index) => (
<div key={lang.id} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="37" className="data-LNGG sortable-item paragraph-container SortableItem-sibling">
<div data-testid={`embd-79HRa2m-${lang.id}`} id={`PARAGRAPH_LNGG_${lang.id}`} className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}>
<div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn">
                    <div className="field">
                        <span className="txtBold" id="FIELD_FRFM">{lang.name}</span><span className="colon"><span className="beforecolonspace"> </span><span dependency="FRFM">: </span></span>
                        <span className="flt-right" id="FIELD_RATG"></span>
                    </div>
                    <div className="rating-bar" dependency="RATV">
                        <div className="inner-rating" id="FIELD_RATV" style={{ width: getLevelWidth(lang.level) }}></div>
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
<button data-testid="embd-87enKtK-LNGG" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="37" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button>
</div>
))}
</div>
</div>
</div>
</div>
<button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="37" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button>
</div>
)}

</div></div><div></div></div></div>
    </>
  );
}
