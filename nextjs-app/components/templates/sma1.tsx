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

export default function TemplateSma1({
  data = sampleData,
  translations: t = translations.en,
  language = "en",
  colorHex = "#000000",
}: Partial<DynamicTemplateProps> = {}) {
  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;background:#FFF;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-sma1 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        .skn-sma1 span.paddedline{display:block;clear:both}
        .skn-sma1 .txtBold{font-weight:bold}
        .skn-sma1 .txtCaps{text-transform:uppercase}
        .skn-sma1 .locationGap{margin-bottom:3px}
        .skn-sma1 .flt-right{float:right}
		.skn-sma1 .dispInBlk{display:inline-block}
		.skn-sma1 .maxWidth{max-width:100%}
        .skn-sma1 .brk-all{word-break:break-all}

        /*START content disc style for LI*/
        .skn-sma1 ul,.skn-sma1 li{list-style:none;margin:0 0 0 8px;padding:0}
        .skn-sma1 ul li{position:relative;margin:0 0 0 5px}
        .skn-sma1 ul li:before{content:'\\25CF\\0020';position:absolute;left:-13px;top:0}
        /*END content disc style for LI*/

        .skn-sma1{color:#231f20;background-color:#FFF!important;word-wrap:break-word;text-size-adjust:none;-ms-text-size-adjust:none;-moz-text-size-adjust:none;-webkit-text-size-adjust:none;min-height:792px}
        .skn-sma1 .name{font-family:"Palatino Linotype";font-size:15px;line-height:17px;padding:0 0 10px 0;text-align:center;letter-spacing:1px;color:#000}
        .skn-sma1 .resumeTitle{text-transform:uppercase;;text-align:center;color:#4a4a4a}
        .skn-sma1 .paragraph{position:relative}
        .skn-sma1 .heading{font-family:"Palatino Linotype";clear:both;font-weight:bold;text-transform:uppercase;letter-spacing:.5px}
        .skn-sma1 .sectiontitle{color:#000}
        .skn-sma1 .address{position:relative;text-align:center;font-size:0.917em;line-height:1.25em;margin-top:0}
        .skn-sma1 .address2{position:relative;text-align:left;font-size:0.917em;line-height:1.25em}
        .skn-sma1 .address.adrsExtra{padding-bottom:0;border:none}
        .skn-sma1 .table_wrapper{width:100%;margin-top:0}
        .skn-sma1 table.twocol td{width:50%}
        .skn-sma1 table.skills th,.skn-sma1 table.skills td{width:20%;text-align:center}
        .skn-sma1 table.skills th{text-decoration:underline}
        .skn-sma1 table.skills .skillname,.skn-sma1 table.skills .skillrating{text-align:left;width:35%}
        .skn-sma1 table.skills .skillrating{width:20%}
        .skn-sma1 table.skills .skillyears,.skn-sma1 table.skills .skilllast{width:19%}
        .skn-sma1 table.skills .pad1{width:5%}
        .skn-sma1 table.skills .pad2,.skn-sma1 table.skills .pad3{width:1%}
        .skn-sma1 .address{padding:0 0 30px 0;border-bottom:1px dashed #CCC}
        .skn-sma1 .social-link:last-child .sprtr{display:none}
        .skn-sma1 .social-link .sprtr{padding:0 2px}
        .skn-sma1 table.skill{table-layout:fixed}
        .skn-sma1 table .twocol_2{padding-left:10px}

        /*Personal details section*/
        .skn-sma1 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-sma1 .details-wrap{width:49%}

        /*FIX for FORCEFULLY making left margin ZERO for CL*/
        .skn-sma1 .sectionCL .paragraph{margin-top:0!important}

        /*MES and MFR address order code*/
        .skn-sma1 .zipprefix,.skn-sma1.MES .zipsuffix,.skn-sma1.MFR .zipsuffix{display:none}
        .skn-sma1 .zipsuffix,.skn-sma1.MES .zipprefix,.skn-sma1.MFR .zipprefix{display:block}

        /*Infographic*/
        .skn-sma1 .lang-sec,.skn-sma1 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-sma1 .lang-sec .heading,.skn-sma1 .skli-sec .heading{width:100%;flex-grow:1}
        .skn-sma1 .lang-sec .paragraph, .skn-sma1 .skli-sec .paragraph{width:48.4%}
        .skn-sma1 .lang-sec,.skn-sma1 .skli-sec{font-family:"arial"}
        .skn-sma1 .lang-sec .field *,.skn-sma1 .lang-sec .nativeLangPara .field,.skn-sma1 .skli-sec .field *{display:inline}
        .skn-sma1 .lang-sec .paragraph,.skn-sma1 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px!important;margin-top:0}
        .skn-sma1 .lang-sec .singlecolumn,.skn-sma1 .skli-sec .singlecolumn{margin-left:0!important;position:relative}
        .skn-sma1 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
        .skn-sma1 .lang-sec .nativeLangPara{width:100%!important}
        .skn-sma1 .inner-rating{background-color:#1A4771;height:4px;width:60%}
        .skn-sma1 .lang-sec > .paragraph:nth-last-child(1),.skn-sma1 .lang-sec > .paragraph:nth-last-child(2),
        .skn-sma1 .skli-sec > .paragraph:nth-last-child(1),.skn-sma1 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0!important}
        .skn-sma1 .hide-bar .rating-bar,.skn-sma1 .hide-colon .paragraph .colon,.skn-sma1 .hide-only-bar .rating-bar{display:none}
        .skn-sma1 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-sma1 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}
       
        /* GRYR */
        .skn-sma1 .displayNoneThisField{display:none}/* Keep this class always at bottom */

        /* Text Align Adjust */
        .skn-sma1 .ttc-align-left ul{text-align:left}
        .skn-sma1 .ttc-align-right ul{text-align:right}
        .skn-sma1 .ttc-align-center ul{text-align:center}
        .skn-sma1 .ttc-align-justify ul{text-align:justify}
        .skn-sma1 .ttc-align-right li:before,.skn-sma1 .ttc-align-center li:before{position:relative;left:-4px}

        /*For Extra Space Before Colon*/
        .skn-sma1 .beforecolonspace{display:none!important}
        .skn-sma1.MFR .beforecolonspace{display:inline!important}

        /* Duration tag */
        .skn-sma1 .totl-expr{display:inline-block;float:right;border:1px solid #000;padding:0 5px;font-weight:700;vertical-align:top;text-wrap:nowrap;margin-left:5px}
        .skn-sma1.texp-curved .totl-expr{border-radius:10px}
        .skn-sma1 .dflex{display:flex;justify-content:space-between}

        /* for-pdf changes */
        .skn-sma1.for-pdf.texp-curved .dflex,.skn-sma1.for-pdf.texp-rectangle .dflex{display:block}
        .skn-sma1.for-pdf.texp-curved .expr-sec .dflex > span:first-child,.skn-sma1.for-pdf.texp-rectangle .expr-sec .dflex > span:first-child{display:inline-block;width:72%}
        .skn-sma1.for-pdf.texp-curved .expr-sec .dflex > span:last-child,.skn-sma1.for-pdf.texp-rectangle .expr-sec .dflex > span:last-child{display:inline-block;width:28%;float:right}


    

        .skn-sma1,.skn-sma1 table{line-height:14px}
        .skn-sma1.pagesize{width:515px}
        .skn-sma1.fontsize{font-size:11px}
        .skn-sma1.fontface,.skn-sma1 .lang-sec .paragraph *,.skn-sma1 .skli-sec .paragraph *{font-family:Century Gothic}
        .skn-sma1.vmargins{padding-top:30px;padding-bottom:30px}
        .skn-sma1.hmargins{padding-left:40px;padding-right:40px}
        .skn-sma1 .section{margin-top:15px}
        .skn-sma1 .heading{margin-bottom:4px}
        .skn-sma1 .paragraph{margin-top:8px}
        .skn-sma1 .firstsection,.skn-sma1 .firstparagraph{margin-top:0!important}
        .skn-sma1 .singlecolumn,.skn-sma1 .maincolumn{margin-left:35px}
        .skn-sma1 .sectiontitle{font-size:11px;line-height:14px}
        .skn-sma1 table.skills td{padding-top:4px}
        .skn-sma1 .name{font-size:37px;line-height:49px}
        .skn-sma1 .resumeTitle{font-size:15px;line-height:15px;padding:0 0 6px 0}
        .skn-sma1 .address{font-size:10px;line-height:13px}
        .skn-sma1 .name,.skn-sma1 .sectiontitle{color:#000000}
        .skn-sma1 .totl-expr{border-color:#000000;font-size:7px;line-height:11px}

        /*FIX for Re-calculating width of singlecolumn for CL*/
        .skn-sma1 .sectionCL .singlecolumn{margin-left:0!important;width:100%;font-size:11px}
        .skn-sma1 .address2{font-size:11px;line-height:14px}

        /*Infographic*/
      .skn-sma1 .lang-sec,.skn-sma1 .skli-sec{padding-left:35px}
      .skn-sma1 .lang-sec .heading,.skn-sma1 .skli-sec .heading{margin-left:-35px}
      .skn-sma1 .inner-rating{background-color:#000000}
      .skn-sma1 .lang-sec .sortable-item,.skn-sma1 .skli-sec .sortable-item{display:inline-block;vertical-align:top}
      .skn-sma1 .skli-sec .singlecolumn .field:last-child{min-height:14px}

      /*Finalize Fixes*/
      .page-finalize .skn-sma1 .sortableInner .paragraph-container+.paragraph-container{margin:0}
      .skn-sma1 .lang-sec .sortableInner .sortable-item:not(:first-child) .paragraph,.skn-sma1 .skli-sec .sortableInner .sortable-item:not(:first-child) .paragraph{vertical-align:top}
      .page-finalize .skn-sma1 .sortableInner .paragraph-container+.paragraph-container,.page-finalize .sortable-drag-item.skn-sma1 .section{margin-top:0!important}
      .skn-sma1 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}
      .skn-sma1 .data-LNGG .sortable-item.native-lang{width:100%;max-width:100%}
      .skn-sma1 .data-LNGG .doc-item,.skn-sma1 .data-SKLI .doc-item,.skn-sma1 .lang-sec .doc-item,.skn-sma1 .skli-sec .doc-item{width:100%}
      .skn-sma1 .data-LNGG .sortableInner,.skn-sma1 .data-SKLI .sortableInner,.skn-sma1 .SECTION_LNGG .sortableInner,.skn-sma1 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
      .skn-sma1 .data-LNGG .sortable-item,.skn-sma1 .data-SKLI .sortable-item{width:48.4%}
      .skn-sma1 .data-LNGG .sortable-item .paragraph,.skn-sma1 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}
      /*Fixes for builder for skill*/
      .skn-sma1 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:14px}	
      .skn-sma1 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-sma1 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}	
      .skn-sma1 .lang-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-sma1 .lang-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph, .skn-sma1  .skli-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-sma1  .skli-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0!important}

      /*PDF Flex Handling Code - Personal Information*/
		.skn-sma1.for-pdf .pdet-sec .singlecolumn{display:block}
		.skn-sma1.for-pdf .pdfpdwrapper{display:block}
		.skn-sma1.for-pdf .pdfpdwrapper .details-wrap:first-child{float:left;padding-right:5px}
		.skn-sma1.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){float:right}
		.skn-sma1.for-pdf .pdfpdwrapper .details-wrap{width:237px;}

    /*Infographic Containers*/
    .skn-sma1.for-pdf .lang-sec,.skn-sma1.for-pdf .skli-sec{display:block}
    .skn-sma1.for-pdf .pdfinfwrapper{display:block}
    .skn-sma1.for-pdf .pdfinfwrapper:after{content:'';clear:both;display:table}
    .skn-sma1.for-pdf .pdfinfwrapper .paragraph:first-child{float:left}
    .skn-sma1.for-pdf .pdfinfwrapper .paragraph:nth-child(2){float:right}
    .skn-sma1.for-pdf .pdfinfwrapper:last-child .paragraph{margin-bottom:0;padding-bottom:0!important}
    `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-sma1 SMA1 MUK texp-none pict-pcpf-purl " docskinwidth="515" ><div data-testid="embd-91y4rV2" className="name-contact "><div></div><div></div><div data-testid="embd-88MByq6-PRFL" id="SECTION_PRFL30868c37-6fcc-4b70-b87a-afd2447ce0d4" className="section SECTION_PRFL firstsection" data-section-cd="PRFL"><div data-testid="embd-88uQIHR-PRFL" className="doc-item"><div data-testid="embd-88aw0Ce-PRFL" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-04f55583-5181-435c-8336-f48964adf912" id="PARAGRAPH_PRFL_04f55583-5181-435c-8336-f48964adf912" className="paragraph PARAGRAPH_PRFL firstparagraph"><div data-testid="embd-78KlmQp">
                <div className="name">
                    <span className="fName" id="FIELD_FNAM">{data.first_name}</span><span dependency="FNAM+LNAM">
                    </span><span id="FIELD_LNAM">{data.last_name}</span>
                </div>

                <div className="address">
                    <span className="paddedline zipsuffix" dependency="STRT|CITY|STAT|ZIPC|ADDR|REMW">
                        <span id="FIELD_STRT">{data.address}</span><span dependency="STRT"><span dependency="CITY|STAT">, </span></span>
                        <span id="FIELD_CITY">{data.city}</span>
                        <span id="FIELD_STAT"></span>
                        <span id="FIELD_ZIPC">{data.postal_code}</span>
                        <span id="FIELD_ADDR"></span>
                        <span dependency="ADDR|STRT|CITY|STAT|ZIPC"></span>
                        <span id="FIELD_REMW"></span>
                    </span>
                    
                    <span className="paddedline">
                        <span className="dispInBlk"><span id="FIELD_HPHN">{data.phone}</span>
                        <span dependency="HPHN|CPHN"> </span></span>
                        <span className="dispInBlk maxWidth"><span id="FIELD_CPHN"></span></span>
                        <span className="dispInBlk maxWidth">
                        <span id="FIELD_EMAI">{data.email}</span></span>
                    </span>

                    {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                    <div dependency="DOB1|NTLY|DRIV|IDNV|IDNT|MSTA|WEB1|VDCV|PRTF|SOCL">
                        {data.nationality && (
                        <>
                        <span dependency="NTLY" className="dispInBlk maxWidth">
                            <span className="txtBold">
                                <span className="xslt_static_change">Nationality</span><span className="beforecolonspace">&nbsp;</span><span>:</span>
                            </span>
                            <span id="FIELD_NTLY">{data.nationality}</span>
                        </span>
                        <span dependency="NTLY"><span dependency="IDNV|IDNT|DRIV|MSTA|WEB1|VDCV|PRTF|SOCL">{(data.driving_license || data.website || data.linkedin) && ' | '}</span></span>
                        </>
                        )}

                        {data.driving_license && (
                        <>
                        <span dependency="DRIV" className="dispInBlk maxWidth">
                            <span className="txtBold"><span className="xslt_static_change">Permit</span><span className="beforecolonspace"> </span><span>: </span></span><span id="FIELD_DRIV">{data.driving_license}</span>
                        </span>
                        <span dependency="DRIV"><span dependency="MSTA|WEB1|VDCV|PRTF|SOCL">{(data.website || data.linkedin) && ' | '}</span></span>
                        </>
                        )}

                        {data.website && (
                        <>
                        <span dependency="WEB1" className="dispInBlk maxWidth">
                            <span className="txtBold">
                                <span className="xslt_static_change">Web</span><span className="beforecolonspace">&nbsp;</span><span>:</span>
                            </span>
                            <span id="FIELD_WEB1" className="brk-all">{data.website}</span>
                        </span>
                        <span dependency="WEB1"><span dependency="VDCV|PRTF|SOCL">{data.linkedin && ' | '}</span></span>
                        </>
                        )}

                        {data.linkedin && (
                        <span dependency="SOCL">
                            <span className="maxWidth dispInBlk social-link" id="CATEGORY_SOCIAL_SOCL">
                                <span className="txtBold"><span id="DOCDATAINFO_SOCL">LinkedIn</span><span className="beforecolonspace"> </span><span>: </span></span><span className="brk-all" id="FIELD_SOCL">{data.linkedin}</span>
                            </span>
                        </span>
                        )}
                    </div>
                    )}
                </div>
            </div></div></div></div></div></div></div><div data-testid="embd-89XOkPJ0" className="parent-wrapper"><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="30" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">{t.professional_summary}</div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn" id="FIELD_FRFM" dangerouslySetInnerHTML={{ __html: data.summary || '' }}></div>
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="30" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="30" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section expr-sec SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">{t.work_history}</div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">
{data.experiences && data.experiences.map((exp, index) => (
<div key={exp.id} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="30" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="30" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${exp.id}`} id={`PARAGRAPH_EXPR_${exp.id}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn">
                    <span className="paddedline" dependency="JTIT|JSTD|EDDT|TEXP">
                        <span className="dflex">
                            <span>
                                <span className="jobtitle txtCaps txtBold" id="FIELD_JTIT">{exp.job_title}</span><span dependency="JTIT"><span dependency="JSTD|EDDT"> |</span></span>
                                <span className="jobdates" id="FIELD_JSTD" format="%m/%Y">{formatDate(exp.start_date, language)}</span><span dependency="JSTD+EDDT"> - </span><span className="jobdates" id="FIELD_EDDT" format="%m/%Y">{exp.currently_working ? t.present : formatDate(exp.end_date, language)}</span>
                            </span>
                        </span>
                    </span>
                    <span className="paddedline txtBold locationGap" dependency="COMP|JSTA|JCIT|JCNT|JCTR">
                        <span className="companyname" id="FIELD_COMP">{exp.company}</span><span dependency="COMP"><span dependency="JCIT|JSTA|JCNT|JCTR"> -</span></span>
                        <span className="jobcity" id="FIELD_JCIT">{exp.city}</span><span className="jobstate" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span>
                        <span id="FIELD_JCTR"></span>
                    </span>
                    <span className="jobline" id="FIELD_JDES" dangerouslySetInnerHTML={{ __html: exp.description || '' }}></span>
                </div>
            </div></div></div>
))}
</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="30" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="30" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">{t.skills}</div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
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
                </div>
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="30" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="30" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">{t.education}</div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">
{data.educations && data.educations.map((edu, index) => (
<div key={edu.id} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="30" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="30" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${edu.id}`} id={`PARAGRAPH_EDUC_${edu.id}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn">
                    <span className="paddedline txtBold" dependency="DGRE|SCHO|SCIT|SSTA|SCNT">
                        <span className="companyname" id="FIELD_SCHO">{edu.institution}</span><span dependency="SCHO"><span dependency="SCIT|SSTA|SCNT|DGRE"> - </span></span>
                        <span className="jobcity" id="FIELD_SCIT">{edu.location}</span><span dependency="SCIT"></span><span className="jobstate" id="FIELD_SSTA"></span><span className="joblocation jobcountry" id="FIELD_SCNT"></span>
                        <span className="degree" id="FIELD_DGRE">{edu.degree}</span>
                    </span>
                    <span className="paddedline" dependency="STUY|GRYR|GRED|GRST|GRIP|GRHN">
                        <span className="programline" id="FIELD_STUY">{edu.field_of_study}</span><span dependency="STUY"><span dependency="GRYR|GRED|GRST|GRIP">, </span></span>
                        <span className="xslt_static_change displayNoneThisField">Expected in </span>
                        <span id="FIELD_GRYR" format="%m/%Y"></span>
                        <span className="jobdates" id="FIELD_GRST" format="%m/%Y">{formatDate(edu.start_date, language)}</span><span dependency="GRST+GRED"> - </span><span className="jobdates" id="FIELD_GRED" format="%m/%Y">{edu.currently_studying ? t.present : formatDate(edu.end_date, language)}</span>
                        <span dependency="GRED|GRST"></span>
                        <span id="FIELD_GRIP"></span>
                        <span dependency="STUY|GRYR|GRED|GRST|GRIP"></span><span id="FIELD_GRHN"></span>
                    </span>


                    <span id="FIELD_FRFM"></span>
                </div>
            </div></div></div>
))}
</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="30" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>

{data.languages && data.languages.length > 0 && (
<div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="30" className="sortable-item section-container SortableItem-sibling data-LNGGsortable-item data-LNGG">
  <div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG88bc36a1-247b-b72f-7918-a79948b8fc80" className="section lang-sec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
    <div data-testid="embd-88uQIHR-LNGG" className="doc-item">
      <div data-testid="embd-88ciQTv" className="heading">
        <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_LNGG">{t.languages}</div>
      </div>
      <div data-testid="embd-88aw0Ce-LNGG" className="">
        <div data-testid="embd-87S8HNi88bc36a1-247b-b72f-7918-a79948b8fc80" id="CONTAINER_88bc36a1-247b-b72f-7918-a79948b8fc80" className="sortableInner">
          {data.languages.map((lang, index) => (
          <div key={lang.id} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="30" className="data-LNGG sortable-item paragraph-container SortableItem-sibling">
            <div data-testid={`embd-79HRa2m-${lang.id}`} id={`PARAGRAPH_LNGG_${lang.id}`} className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}>
              <div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn">
                  <div className="field">
                    <span className="txtBold" id="FIELD_FRFM">{lang.name}</span>
                    <span className="colon"><span className="beforecolonspace"> </span><span dependency="FRFM">: </span></span>
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
            <button data-testid="embd-87enKtK-LNGG" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="30" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button>
          </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  <button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="30" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button>
</div>
)}

</div></div><div></div></div></div>
    </>
  );
}
