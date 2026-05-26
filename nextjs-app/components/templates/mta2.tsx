/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations } from "@/lib/translations";

const defaultTranslations = translations.en;

// Format date as "Mon YYYY" (e.g., "Jul 2014")
function formatDateWithMonth(dateStr: string | undefined): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

export default function TemplateMta2({
  data = sampleData,
  translations: t = defaultTranslations,
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
      .skn-mta2 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

      .skn-mta2 span.jobtitle,.skn-mta2 span.companyname,.skn-mta2 span.degree,.skn-mta2 span.programline,.skn-mta2 .txtBold{font-weight:bold}
      .skn-mta2 span.degree,.skn-mta2 span.programline,.skn-mta2 span.jobtitle,.skn-mta2 span.jobdates{color:${colorHex}}
      .skn-mta2 span.companyname{font-weight:normal!important}
      .skn-mta2 span.paddedline{display:block}
      .skn-mta2 .logo,.skn-mta2 .nodisplay{display:none}
      .skn-mta2 .section-prfl,.skn-mta2 .section-clprfl{padding-bottom:1px}
      .skn-mta2 .datesWrapper,.skn-mta2 .flt-right{float:right}
	    .skn-mta2 .dispInBlk{display:inline-block}
	    .skn-mta2 .maxWidth{max-width:100%}
      .skn-mta2 .brk-all{word-break:break-all}

      .skn-mta2 ul,.skn-mta2 li{list-style-type:disc;margin:0 0 0 10px;padding:0}
      .skn-mta2 ul li{margin:0 0 0 13px;color:#666}
      .skn-mta2 .adnlLnks ul,.skn-mta2 .adnlLnks li{list-style:none;margin:0}
      .skn-mta2 .adnlLnks li{display:inline!important;margin-left:10px}
      .skn-mta2 .adnlLnks li:first-child{margin:0}
      .skn-mta2 .social-link .sprtr{padding:0 2px}
      .skn-mta2 .social-link:last-child .sprtr{display:none}

      .skn-mta2{color:#666;word-wrap:break-word;text-size-adjust:none;-ms-text-size-adjust:none;-moz-text-size-adjust:none;-webkit-text-size-adjust:none;min-height:792px}
      .skn-mta2 .name,.skn-mta2 .resumeTitle,.skn-mta2 .address,.skn-mta2 .adnlLnks{text-align:right}
      .skn-mta2 .name{font-size:15px;line-height:17px;font-weight:bold;padding:0;text-transform:uppercase;color:${colorHex}}
      .skn-mta2 .resumeTitle{color:#4a4a4a}
      .skn-mta2 .paragraph{position:relative}
      .skn-mta2 .heading{clear:both;font-weight:bold;text-transform:lowercase;color:${colorHex}}
      .skn-mta2 .address,.skn-mta2 .address2{position:relative;font-size:0.917em;line-height:1.25em;color:${colorHex}}
      .skn-mta2 .address2{text-align:left;margin-top:11px;color:${colorHex}}
      .skn-mta2 .table_wrapper{width:100%;margin-top:0}
      .skn-mta2 table.twocol td{width:50%;vertical-align:top}
      .skn-mta2 table.skills th,.skn-mta2 table.skills td{width:20%;text-align:center}
      .skn-mta2 table.skills th{text-decoration:underline;color:#666}
      .skn-mta2 table.skills td{color:#666}
      .skn-mta2 table.skills .skillname,.skn-mta2 table.skills .skillrating{text-align:left;width:35%}
      .skn-mta2 table.skills .skillrating{width:20%}
      .skn-mta2 table.skills .skillyears,.skn-mta2 table.skills .skilllast{width:19%}
      .skn-mta2 table.skills .pad1{width:5%}
      .skn-mta2 table.skills .pad2,.skn-mta2 table.skills .pad3{width:1%}
      .skn-mta2 p font{color:#666!important}
      .skn-mta2 .section-prfl + .section{margin-top:4px!important}
      .skn-mta2 table.skill{table-layout:fixed}

      /*Personal details section*/
      .skn-mta2 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
      .skn-mta2 .details-wrap{width:49%}

      /*FIX for FORCEFULLY making left margin ZERO for CL*/
      .skn-mta2 .sectionCL .paragraph{margin-top:0!important}

      /* Style for Signature */
      .skn-mta2 .disclaim .singlecolumn,.skn-mta2 .signPic > .field_sign{margin-left:0!important}
      .skn-mta2 .disclaim .singlecolumn,.skn-mta2 .disclaim .singlecolumn li,.skn-mta2 .disclaim .singlecolumn p,.skn-mta2 .disclaim .singlecolumn span{font-size:9px!important;color:#8a8a8a!important}
      .skn-mta2 .field_sign{font-size:7px!important;color:#8a8a8a!important}
      .skn-mta2 .txtleft + .field_sign{text-align:left}
      .skn-mta2 .txtcenter + .field_sign{text-align:center}
      .skn-mta2 .txtright + .field_sign{text-align:right}
      .skn-mta2 .signPic span:first-child{padding-right:6px}
      .skn-mta2 .signPic img{padding-top:5px;max-width:100%}

      /*MES and MFR address order code*/
      .skn-mta2 .zipprefix,.skn-mta2.MES .zipsuffix,.skn-mta2.MFR .zipsuffix{display:none}
      .skn-mta2 .zipsuffix,.skn-mta2.MES .zipprefix,.skn-mta2.MFR .zipprefix{display:inline}

      /*Infographic*/
      .skn-mta2 .lang-sec,.skn-mta2 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
      .skn-mta2 .lang-sec .heading,.skn-mta2 .skli-sec .heading{width:100%;flex-grow:1}
      .skn-mta2 .lang-sec .paragraph, .skn-mta2 .skli-sec .paragraph{width:48.5%}
      .skn-mta2 .lang-sec .field *,.skn-mta2 .lang-sec .nativeLangPara .field,.skn-mta2 .skli-sec .field *{display:inline}
      .skn-mta2 .lang-sec .paragraph,.skn-mta2 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px!important;margin-top:0}
      .skn-mta2 .lang-sec .singlecolumn,.skn-mta2 .skli-sec .singlecolumn{margin-left:0!important;position:relative}
      .skn-mta2 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
      .skn-mta2 .lang-sec .nativeLangPara{width:100%!important}
      .skn-mta2 .inner-rating{background-color:${colorHex};height:4px;width:60%}
      .skn-mta2 .lang-sec > .paragraph:nth-last-child(1),.skn-mta2 .lang-sec > .paragraph:nth-last-child(2),
      .skn-mta2 .skli-sec > .paragraph:nth-last-child(1),.skn-mta2 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0!important}
      .skn-mta2 .hide-bar .rating-bar,.skn-mta2 .hide-only-bar .rating-bar,.skn-mta2 .hide-colon .colon{display:none}
      .skn-mta2 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-mta2 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}

	  /*For Extra Space Before Colon*/
      .skn-mta2 .beforecolonspace{display:none!important}
      .skn-mta2.MFR .beforecolonspace{display:inline!important}

		.skn-mta2 span.disptable {display:table;width:100%}
		.skn-mta2 span.disptable .degreepad {display:table-cell;padding-right:10px}
		.skn-mta2 span.disptable .datesWrapper{text-align:right;min-width:100px}

      /* Text alignment bullet */
       .skn-mta2 .ttc-align-left ul{text-align:left}
       .skn-mta2 .ttc-align-right ul{text-align:right}
       .skn-mta2 .ttc-align-center ul{text-align:center}
       .skn-mta2 .ttc-align-justify ul{text-align:justify}
       .skn-mta2 .ttc-align-right li,.skn-mta2 .ttc-align-center li{position:relative;list-style-position:inside;margin-left:0}
       .skn-mta2:not(.for-pdf) .ttc-align-right li:first-letter,.skn-mta2:not(.for-pdf) .ttc-align-center li:first-letter{margin-left:-5px}

       /* Duration tag */
       .skn-mta2 .totl-expr{display:inline-block;background-color:${colorHex};color:#fff;padding:0 5px;font-weight:700;vertical-align:top;text-wrap:nowrap}
       .skn-mta2.texp-curved .totl-expr{border-radius:10px}
       .skn-mta2 .texp-cell{display:block;text-align:right;margin-bottom:8px;}
       .skn-mta2 .firstparagraph .texp-cell{margin-top:7px}

      /* GRYR */
      .skn-mta2 .displayNoneThisField{display:none}/* Keep this class always at bottom */


      .skn-mta2,.skn-mta2 table{line-height:14px}
      .skn-mta2.pagesize{width:545px}
      .skn-mta2.fontsize,.skn-mta2 .lang-sec .paragraph *,.skn-mta2 .skli-sec .paragraph *{font-size:11px}
      .skn-mta2.fontface{font-family:Century Gothic}
      .skn-mta2.vmargins{padding-top:25px;padding-bottom:25px}
      .skn-mta2.hmargins{padding-left:25px;padding-right:25px}
      .skn-mta2 .section{margin-top:4px}
      .skn-mta2 .disclaim{margin:0;padding:0;margin-top:20px}
      .skn-mta2 .firstsection,.skn-mta2 .SECTION_CNTC,.skn-mta2 .firstparagraph{margin-top:0!important}
      .skn-mta2 .heading{margin-bottom:1px}
      .skn-mta2 .paragraph{margin-top:2px}
      .skn-mta2 .singlecolumn,.skn-mta2 .maincolumn{margin-left:0px}
      .skn-mta2 .sectiontitle{font-size:14px;line-height:17px}
      .skn-mta2 .name{font-size:31px;line-height:43px}
      .skn-mta2 .resumeTitle{font-size:16px;line-height:16px;padding:0 0 10px 0}
      .skn-mta2 .address{font-size:10px;line-height:13px;margin-top:5px}
      .skn-mta2 table.skills td{padding-top:1px}
      .skn-mta2 .name,.skn-mta2 .address,.skn-mta2 .adnlLnks ul li,.skn-mta2 .sectiontitle,.skn-mta2 span.jobdates,.skn-mta2 span.degree,.skn-mta2 span.jobtitle{color:${colorHex}}
      .skn-mta2 .totl-expr{background-color:${colorHex};font-size:7px;line-height:12px}
      .skn-mta2 .firstparagraph .texp-cell{margin-top:7px}
      .skn-mta2 .paragraph:not(.firstparagraph) .texp-cell{padding-top:14px}
      .skn-mta2 .texp-cell{margin-bottom:8px;line-height:12px}

      /*FIX for Re-calculating width of singlecolumn for CL*/
      .skn-mta2 .sectionCL .singlecolumn{margin-left:0!important;width:100%}
      .skn-mta2 .address2{font-size:11px;line-height:14px}

      /*Infographic*/
      .skn-mta2 .lang-sec,.skn-mta2 .skli-sec{padding-left:0px}
      .skn-mta2 .lang-sec .heading,.skn-mta2 .skli-sec .heading{margin-left:-0px}
      .skn-mta2 .inner-rating{background-color:${colorHex}}
      .skn-mta2 .skli-sec .singlecolumn .field:last-child{min-height:14px}

      /*Finalize Fixes*/
      .skn-mta2 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}
      .skn-mta2 .lang-sec .sortable-item,.skn-mta2 .skli-sec .sortable-item{display:inline-block;vertical-align:top}
      .skn-mta2 .langSec .sortableInner .sortable-item:not(:first-child) .paragraph,.skn-mta2 .infoSec .sortableInner .sortable-item:not(:first-child) .paragraph{vertical-align:top}
      .skn-mta2 .data-LNGG .sortable-item.native-lang{width:100%;max-width:100%}
      .skn-mta2 .data-LNGG .doc-item,.skn-mta2 .data-SKLI .doc-item,.skn-mta2 .lang-sec .doc-item,.skn-mta2 .skli-sec .doc-item{width:100%}
      .skn-mta2 .data-LNGG .sortableInner,.skn-mta2 .data-SKLI .sortableInner,.skn-mta2 .SECTION_LNGG .sortableInner,.skn-mta2 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
      .skn-mta2 .data-LNGG .sortable-item,.skn-mta2 .data-SKLI .sortable-item{width:48.5%}
      .skn-mta2 .data-LNGG .sortable-item .paragraph,.skn-mta2 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}
      /*Fixes for builder for skill*/
      .skn-mta2 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:14px}
      .skn-mta2 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-mta2 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}
      .skn-mta2 .lang-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph,.skn-mta2 .lang-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph,.skn-mta2  .skli-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph,.skn-mta2  .skli-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0!important}

      /*PDF Flex Handling Code - Personal Information*/
		.skn-mta2.for-pdf .pdet-sec .singlecolumn{display:block}
		.skn-mta2.for-pdf .pdfpdwrapper{display:block}
		.skn-mta2.for-pdf .pdfpdwrapper .details-wrap:first-child{float:left;padding-right:5px}
		.skn-mta2.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){float:right}
		.skn-mta2.for-pdf .pdfpdwrapper .details-wrap{width:270px;}

    /*Infographic Containers*/
    .skn-mta2.for-pdf .lang-sec,.skn-mta2.for-pdf .skli-sec{display:block}
    .skn-mta2.for-pdf .pdfinfwrapper{display:block}
    .skn-mta2.for-pdf .pdfinfwrapper:after{content:'';clear:both;display:table}
    .skn-mta2.for-pdf .pdfinfwrapper .paragraph:first-child{float:left}
    .skn-mta2.for-pdf .pdfinfwrapper .paragraph:nth-child(2){float:right}
    .skn-mta2.for-pdf .pdfinfwrapper:last-child .paragraph{margin-bottom:0;padding-bottom:0!important}
  `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-mta2 MTA2 MUK texp-rectangle pict-pcpf-purl " docskinwidth="545" ><div data-testid="embd-91y4rV2" className="name-contact "><div></div><div></div><div data-testid="embd-88MByq6-PRFL" id="SECTION_PRFL30868c37-6fcc-4b70-b87a-afd2447ce0d4" className="section-prfl section SECTION_PRFL firstsection" data-section-cd="PRFL"><div data-testid="embd-88uQIHR-PRFL" className="doc-item"><div data-testid="embd-88aw0Ce-PRFL" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-04f55583-5181-435c-8336-f48964adf912" id="PARAGRAPH_PRFL_04f55583-5181-435c-8336-f48964adf912" className="paragraph PARAGRAPH_PRFL firstparagraph"><div data-testid="embd-78KlmQp">
        <div className="name" style={{ color: colorHex }}>
          <span id="FIELD_FNAM">{data.first_name}</span>
          <span dependency="FNAM+LNAM"> </span>
          <span id="FIELD_LNAM">{data.last_name}</span>
        </div>

        <div className="address" style={{ color: colorHex }}>
          <span className="zipsuffix" dependency="ADDR|STRT|CITY|STAT|ZIPC">
            <span id="FIELD_STRT">{data.street_address}</span><span dependency="STRT+CITY|STAT">, </span>
            <span className="spaced" id="FIELD_CITY">{data.city}</span>
            <span className="spaced" id="FIELD_STAT"></span>
            <span className="spaced" id="FIELD_ZIPC">{data.postcode}</span>
            <span id="FIELD_ADDR"></span>
          </span>

          <span dependency="ADDR|STRT|CITY|STAT|ZIPC|NBHD|MZIP"> | </span>
          <span id="FIELD_REMW"></span>

          <span className="dispInBlk maxWidth">
            <span id="FIELD_HPHN">{data.phone}</span></span>
          <span dependency="HPHN+CPHN|EMAI"> | </span>
          <span className="dispInBlk maxWidth">
            <span id="FIELD_CPHN"></span></span>

          <span id="FIELD_EMAI">{data.email}</span>
        </div>

        <div className="address" style={{ color: colorHex }}>
          {data.nationality && (<><span className="dispInBlk maxWidth">
            <span className="txtBold">Nationality: </span>
            <span id="FIELD_NTLY">{data.nationality}</span>
          </span>
            <span> | </span></>)}
          {data.driving_license && (<><span className="dispInBlk maxWidth">
            <span className="txtBold">Permit: </span>
            <span id="FIELD_DRIV">{data.driving_license}</span>
          </span>
            <span> | </span></>)}
          {data.website && (<><span className="dispInBlk maxWidth">
            <span className="txtBold">Web: </span>
            <span className="brk-all" id="FIELD_WEB1">{data.website}</span>
          </span>
            <span> | </span></>)}
          {data.linkedin && (<span className="dispInBlk maxWidth">
            <span className="txtBold">LinkedIn: </span>
            <span className="brk-all" id="FIELD_SOCL">{data.linkedin}</span>
          </span>)}
        </div>

      </div></div></div></div></div></div></div><div data-testid="embd-89XOkPJ0" className="parent-wrapper"><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="46" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" style={{ color: colorHex }} id="SECTIONNAME_SUMM">PROFESSIONAL SUMMARY<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename PROFESSIONAL SUMMARY " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
        <div className="singlecolumn" id="FIELD_FRFM"><p>{data.summary}</p></div>
      </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="46" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="46" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" style={{ color: colorHex }} id="SECTIONNAME_EXPR">Work history<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Work history " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">{data.experiences && data.experiences.map((exp, index) => (
        <div key={exp.id || index} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="46" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="46" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${exp.id}`} id={`PARAGRAPH_EXPR_${exp.id}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
          <div className="singlecolumn">

            <span className="paddedline" dependency="JTIT|JSTD|EDDT" style={{ display: 'inline' }}>
              <span className="jobtitle" style={{ color: colorHex }} id="FIELD_JTIT">{exp.job_title}</span>
              <span className="datesWrapper" dependency="JSTD|EDDT">
                <span className="jobdates" style={{ color: colorHex }} id="FIELD_JSTD" format="%b %Y">{formatDateWithMonth(exp.start_date)}</span><span dependency="JSTD+EDDT"> - </span><span className="jobdates" style={{ color: colorHex }} id="FIELD_EDDT" format="%b %Y">{exp.currently_working ? t.current : formatDateWithMonth(exp.end_date)}</span>
              </span>
            </span><br dependency="JTIT|JSTD|EDDT" />
            <span className="paddedline" dependency="COMP|JSTA|JCIT|JCNT|JCTR">
              <span className="companyname" id="FIELD_COMP">{exp.company}</span><span id="FIELD_JCTR"></span>
              <span className="datesWrapper">
                <span className="joblocation jobcity" id="FIELD_JCIT">{exp.location}</span><span className="joblocation jobstate" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span><br />
              </span>
            </span>
            <span className="jobline" id="FIELD_JDES"><ul>{exp.description && exp.description.split('\n').map((item, i) => (
              <li key={i}>{item}</li>
            ))}</ul></span>
          </div>
        </div></div></div>
      ))}</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="46" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="46" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" style={{ color: colorHex }} id="SECTIONNAME_HILT">SKILLS<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename SKILLS " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
        <div className="singlecolumn maincolumn">
          <table className="twocol skill">
            <tbody><tr>
              <td className="twocol_1" id="FIELD_SKC1"><ul>{skillsColumn1.map((skill, index) => (
                <li key={skill.id || index}>{skill.name}</li>
              ))}</ul></td>
              <td className="twocol_2" id="FIELD_SKC2"><ul>{skillsColumn2.map((skill, index) => (
                <li key={skill.id || index}>{skill.name}</li>
              ))}</ul></td>
            </tr>
            </tbody></table>
        </div>
      </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="46" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="46" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" style={{ color: colorHex }} id="SECTIONNAME_EDUC">EDUCATION<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename EDUCATION " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">{data.educations && data.educations.map((edu, index) => (
        <div key={edu.id || index} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="46" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="46" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${edu.id}`} id={`PARAGRAPH_EDUC_${edu.id}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
          <div className="singlecolumn">
            <span className="paddedline disptable" dependency="DGRE|STUY|GRYR|GRST|GRED|GRIP">
              <span className="degreepad">
                <span className="degree" style={{ color: colorHex }} id="FIELD_DGRE">{edu.degree || ''}</span><span dependency="DGRE+STUY">{edu.degree && edu.field_of_study ? ': ' : ''}</span><span className="programline" style={{ color: colorHex }} id="FIELD_STUY">{edu.field_of_study}</span><span dependency="STUY"></span>
              </span>
              <span className="datesWrapper jobdates">
                <span className="xslt_static_change displayNoneThisField">Expected in </span>
                <span id="FIELD_GRYR" format="%b %Y"></span>
                <span className="jobdates" style={{ color: colorHex }} id="FIELD_GRST" format="%b %Y">{formatDateWithMonth(edu.start_date)}</span><span dependency="GRST+GRED"> – </span><span className="jobdates" style={{ color: colorHex }} id="FIELD_GRED" format="%b %Y">{edu.currently_studying ? t.current : formatDateWithMonth(edu.end_date)}</span>
                <span id="FIELD_GRIP"></span>
              </span><br />
            </span>
            <span className="paddedline disptable" dependency="SCIT|SCHO|SSTA|SCNT|GRHN">
              <span className="degreepad">
                <span className="companyname companyname_educ" id="FIELD_SCHO">{edu.institution}</span><span id="FIELD_GRHN"></span>
              </span>
              <span className="datesWrapper">
                <span className="joblocation jobcity" id="FIELD_SCIT">{edu.location}</span>
                <span className="joblocation jobstate" id="FIELD_SSTA"></span> <span className="joblocation jobcountry" id="FIELD_SCNT"></span>
              </span><br />
            </span>

            <span id="FIELD_FRFM"></span>
          </div>
        </div></div></div>
      ))}</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="46" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>

          {/* Languages Section */}
          <div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="46" className="sortable-item section-container SortableItem-sibling data-LNGGsortable-item data-LNGG">
            <div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG" className="section lang-sec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
              <div data-testid="embd-88uQIHR-LNGG" className="doc-item">
                <div data-testid="embd-88ciQTv" className="heading">
                  <div data-testid="embd-88NTvWF" className="sectiontitle" style={{ color: colorHex }} id="SECTIONNAME_LNGG">LANGUAGES</div>
                </div>
                <div data-testid="embd-88aw0Ce-LNGG" className="">
                  <div className="sortableInner">
                    {data.languages && data.languages.map((lang, index) => {
                      const level = lang.level || 3;
                      const widthPercent = (level / 5) * 100;
                      const proficiencyText = lang.proficiency ? (t[lang.proficiency as keyof typeof t] || lang.proficiency) : "";
                      return (
                        <div key={lang.id || index} data-testid="embd-87je894-LNGG" className="data-LNGG sortable-item paragraph-container SortableItem-sibling">
                          <div data-testid={`embd-79HRa2m-LNGG-${lang.id}`} className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}>
                            <div data-testid="embd-78FzR29" className="clearfix doc-item">
                              <div className="singlecolumn">
                                <div className="field">
                                  <span className="txtBold" id="FIELD_FRFM">{lang.name}</span>
                                  <span className="colon"><span className="beforecolonspace"> </span><span>: </span></span>
                                  <span className="flt-right" id="FIELD_RATG"></span>
                                </div>
                                <div className="rating-bar">
                                  <div className="inner-rating" id="FIELD_RATV" style={{ width: `${widthPercent}%`, backgroundColor: colorHex }}></div>
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
          </div>

        </div></div><div></div></div></div>
    </>
  );
}
