/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations, formatDate } from "@/lib/translations";

const defaultTranslations = translations.en;

export default function TemplateTma4({
  data = sampleData,
  translations: t = defaultTranslations,
  language = "en",
  colorHex = "#0187de",
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

  const getInitials = () => {
    const first = data.first_name?.[0] || '';
    const last = data.last_name?.[0] || '';
    return (first + last).toUpperCase();
  };

  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;background:#FFF;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-tma4 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        .skn-tma4 span.paddedline{display:block}
        .skn-tma4 .txtBold,.skn-tma4 .degree{font-weight:bold}
        .skn-tma4 .jobtitle{color:${colorHex};font-weight:bold;text-transform:uppercase}
        .skn-tma4 .datesWrapper,.skn-tma4 .flt-right{float:right}
        .skn-tma4 .datesWrapper{font-style:italic}
        .skn-tma4 .adnlLnks{position:inherit;z-index:2}
		.skn-tma4 .dispInBlk{display:inline-block}
		.skn-tma4 .maxWidth{max-width:100%}
		.skn-tma4 .brk-all{word-break:break-all}

        .skn-tma4 ul,.skn-tma4 li{list-style-type:disc;margin:0 0 0 10px;padding:0}
        .skn-tma4 ul li{margin:0 0 0 8px;padding-left:8px}

        .skn-tma4{color:#231f20;background-color:#FFF;word-wrap:break-word;min-height:792px}
        .skn-tma4 .sectiontitle{font-weight:bold;padding:0;text-transform:uppercase;color:${colorHex};margin-right:15px}
        .skn-tma4 .name{font-size:15px;line-height:17px;padding:0;text-align:left;color:${colorHex};position:relative}
        .skn-tma4 .resumeTitle{text-transform:uppercase;color:#4a4a4a}
        .skn-tma4 .name,.skn-tma4 .address,.skn-tma4 .resumeTitle{margin-left:140px}
        .skn-tma4 .section{clear:both;display:table}
        .skn-tma4 .paragraph{position:relative}
        .skn-tma4 .heading{clear:both;text-align:right;float:left}
        .skn-tma4 .address,.skn-tma4 .address2{position:relative;text-align:left;font-size:0.917em;line-height:1.25em}
        .skn-tma4 .address{padding-bottom:15px}
        .skn-tma4 .address + .address.adrsExtra{margin-top:-15px}
        .skn-tma4 .table_wrapper{width:100%;margin-top:0}
		.skn-tma4 .skill{display:table;width:100%;table-layout:fixed}
        .skn-tma4 table.twocol td{width:50%;display:table-cell}
        .skn-tma4 table.skills th,.skn-tma4 table.skills td{width:20%;text-align:center}
        .skn-tma4 table.skills th{text-decoration:underline}
        .skn-tma4 table.skills .skillname,.skn-tma4 table.skills .skillrating{text-align:left;width:35%}
        .skn-tma4 table.skills .skillrating{width:20%}
        .skn-tma4 table.skills .skillyears,.skn-tma4 table.skills .skilllast{width:19%}
        .skn-tma4 table.skills .pad1{width:5%}
        .skn-tma4 table.skills .pad2,.skn-tma4 table.skills .pad3{width:1%}
        .skn-tma4 .monogram{float:left;margin:5px 0 0 70px;text-align:center}
        .skn-tma4 .monogram text{text-transform:uppercase}
        .skn-tma4 .monogram svg circle{stroke:${colorHex}}
		.skn-tma4 .social-link:last-child .sprtr{display:none}

        .skn-tma4 .totl-expr{display:inline-block;padding:0px 6px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap;margin-left:3px;font-style:italic}
        .skn-tma4.texp-curved .totl-expr{border-radius:10px}
        .skn-tma4 .dflex{display:flex;justify-content:space-between}

        .skn-tma4 .monogram + .monogram{display:none}
        .skn-tma4 .dynamicIcon{height:54px;width:54px;margin: 5px 0 0 70px}
        .skn-tma4 .dynamicIcon svg,.skn-tma4 .dynamicIcon img{fill:#fff;height:calc(100% - 10%);width:calc(100% - 10%);margin:auto;vertical-align:middle}
        .skn-tma4 .dynamicIcon > div{height:54px}
        .skn-tma4 .dynamicIcon img{width:calc(100% - 33%)}
        .skn-tma4 .dynamicIcon svg.Admin_A *,.skn-tma4 .dynamicIcon svg.healthcare_A *{stroke:transparent}
        .skn-tma4 .dynamicIcon svg .st2{fill:inherit}
        .skn-tma4 .dynamicIcon svg.ret_a{fill:#fff!important}

        /*Personal details section*/
        .skn-tma4 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-tma4 .details-wrap{width:49%}

        /*Timeline classes*/
        .skn-tma4 .section:before{content:'';display:block;position:absolute;left:0;height:100%;border-left:1px solid #979797}
        .skn-tma4 .singlecolumn{border-left:1px solid #979797;padding-left:14px}
        .skn-tma4 .paragraph .singlecolumn,.skn-tma4 .singlecolumn.paragraphindent,.skn-tma4 .heading,.skn-tma4 .section{position:relative}
        .skn-tma4 .section:last-child .paragraph .singlecolumn:after,.skn-tma4 .section:last-child .singlecolumn.paragraphindent:after{height:0px;bottom:0px}
        .skn-tma4 .heading:before{display:block;position:absolute;top:4px;right:-6px;content:"";height:9px;width:9px;border:1px solid #979797;border-radius:100%;background:#fff;z-index:10}
        .skn-tma4 .section.SECTION_ALNK{padding-bottom:20px;display:block;min-height:auto}
        .skn-tma4 .SECTION_ALNK+.section:before{content:"";top:0px;width:1px;height:20px;position:absolute;z-index:1}
        .skn-tma4 .firstsection:before,.skn-tma4 .firstsection:before,.skn-tma4 .SECTION_ALNK:before, .skn-tma4 .SECTION_PRFL:before{border:0}
        .skn-tma4 .SECTION_ALNK+.section:after,.skn-tma4 .SECTION_PRFL+.section:not(.SECTION_ALNK):after{content:"";top:0px;left:0;width:1px;height:12px;border-left:1px solid #fff;position:absolute;z-index:1}
        .skn-tma4 .paragraph + .skn-tma4 .paragraph {position:relative}
        .skn-tma4 .paragraph + .paragraph:before{display:block;position:absolute;top:4px;left:0;content:"";height:9px;width:9px;border:1px solid #979797;border-radius:100%;background:#fff;z-index:2}
        .skn-tma4 .section:last-child .paragraph .singlecolumn:after,.skn-tma4 .paragraph + .skn-tma4 tr.paragraph:before,.skn-tma4 .firstsection:after,.skn-tma4 .section.SECTION_ALNK:after{display:none}
        .skn-tma4 .education,.skn-tma4 .exprience{display:block}
        /*FIX for FORCEFULLY making left margin ZERO for CL*/
        .skn-tma4 .sectionCL .paragraph{margin-top:0}

        /*MES and MFR address order code*/
		.skn-tma4 .zipprefix,.skn-tma4.MES .zipsuffix,.skn-tma4.MFR .zipsuffix{display:none}
        .skn-tma4 .zipsuffix,.skn-tma4.MES .zipprefix,.skn-tma4.MFR .zipprefix{display:block}
        .skn-tma4 .SECTION_RCNT .zipsuffix,.skn-tma4.MES .SECTION_RCNT .zipprefix,.skn-tma4.MFR .SECTION_RCNT .zipprefix{display:inline}

        /*Infographic*/
        .skn-tma4 .lang-sec,.skn-tma4 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between;position:relative}
        .skn-tma4 .lang-sec .paragraph, .skn-tma4 .skli-sec .paragraph{width:48%}
        .skn-tma4 .lang-sec .paragraph.nativeLangPara{width:100%}
        .skn-tma4 .lang-sec,.skn-tma4 .skli-sec{border-left:1px solid #979797;padding-left:14px}
        .skn-tma4 .lang-sec .heading,.skn-tma4 .skli-sec .heading{position:absolute;top:0;left:auto}
        .skn-tma4 .lang-sec .field *,.skn-tma4 .lang-sec .nativeLangPara .field,.skn-tma4 .skli-sec .field *{display:inline}
        .skn-tma4 .lang-sec .paragraph,.skn-tma4 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px}
        .skn-tma4 .lang-sec .paragraph:before,.skn-tma4 .skli-sec .paragraph:before{display:none!important}
        .skn-tma4 .lang-sec .paragraph + .paragraph:before,.skn-tma4 .skli-sec .paragraph + .paragraph:before{display:none}
        .skn-tma4 .lang-sec .singlecolumn,.skn-tma4 .skli-sec .singlecolumn{margin-left:0!important;position:relative;border:0;padding:0!important}
        .skn-tma4 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px}
        .skn-tma4 .inner-rating{background-color:${colorHex};height:4px;width:60%}
        .skn-tma4 .section.lang-sec:before,.skn-tma4 .section.skli-sec:before{content:none}
        .skn-tma4 .lang-sec .paragraph .singlecolumn,.skn-tma4 .skli-sec .paragraph .singlecolumn{padding-left:0;padding-bottom:5px}
        .skn-tma4 .skli-sec .singlecolumn{padding-top:0!important}
        .skn-tma4 .lang-sec > .paragraph:nth-last-child(1),.skn-tma4 .lang-sec > .paragraph:nth-last-child(2),
        .skn-tma4 .skli-sec > .paragraph:nth-last-child(1),.skn-tma4 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0}
        .skn-tma4 .hide-bar .rating-bar,.skn-tma4 .hide-colon .colon,.skn-tma4 .hide-only-bar .rating-bar{display:none}

        .skn-tma4 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-tma4 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}

        /*HILT multi para/section*/
        .skn-tma4 .multi-section-hilt{font-size:0}
        .skn-tma4 .multi-section-hilt .multi-para-opt,.skn-tma4 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-tma4 .multi-para-hilt .dflt-view{display:none}
        .skn-tma4 .multi-para-hilt:after{content:"";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/
	    .skn-tma4 .multi-para-hilt .paragraph .singlecolumn{margin-left:0;padding-top:0}
        .skn-tma4 .multi-para-hilt .paragraph{width:49%;max-width:49%;display:inline-block;vertical-align:top;margin-top:0;margin-right:2%;margin-bottom:10px}
        .skn-tma4 .multi-para-hilt .paragraph:nth-child(2n+1){margin-right:0}
        .skn-tma4 .multi-para-hilt .paragraph:nth-child(2n+1) .singlecolumn{padding-left:0}
        .skn-tma4 .multi-para-hilt .paragraph:last-child,.skn-tma4 .multi-para-hilt .paragraph:nth-last-child(2){margin-bottom:0}
        .skn-tma4 .multi-para-hilt .paragraph + .paragraph:before,.skn-tma4 .multi-para-hilt:before{display:none}
        .skn-tma4 .multi-para-hilt .singlecolumn{border:none}
        .skn-tma4 .multi-para-hilt{border-left: 1px solid #979797}

        /* GRYR */
        .skn-tma4 .displayNoneThisField{display:none}/* Keep this class always at bottom */

        /* Style for Signature */
        .skn-tma4 .sign{width:100%;display:block}
        .skn-tma4 .sign::before{display:none}
        .skn-tma4 .field_sign{font-size:7px;color:#8a8a8a}
        .skn-tma4 .txtleft+.field_sign{text-align:left}
        .skn-tma4 .txtcenter+.field_sign{text-align:center}
        .skn-tma4 .txtright+.field_sign{text-align:right}
        .skn-tma4 .signPic span:first-child{padding-right:6px}
        .skn-tma4 .signPic img{padding-top:5px;max-width:100%}
        .skn-tma4 .SECTION_PPDT_SGTR{border-top:0px!important}

        /*For Extra Space Before Colon*/
        .skn-tma4 .beforecolonspace{display:none!important}
        .skn-tma4.MFR .beforecolonspace{display:inline!important}

        /* Text alignment bullet */
       .skn-tma4 .ttc-align-left ul{text-align:left}
       .skn-tma4 .ttc-align-right ul{text-align:right}
       .skn-tma4 .ttc-align-center ul{text-align:center}
       .skn-tma4 .ttc-align-justify ul{text-align:justify}
       .skn-tma4 .ttc-align-right li,.skn-tma4 .ttc-align-center li{position:relative;list-style-position:inside;margin-left:0}
       .skn-tma4 .ttc-align-right li:first-letter,.skn-tma4 .ttc-align-center li:first-letter{padding-left:4px}

       .skn-tma4.for-iron-pdf .SECTION_ALNK+.section:after,.skn-tma4.for-iron-pdf .SECTION_PRFL+.section:not(.SECTION_ALNK):after{border-left-width:2px}
       /*Hyphen Handling*/
       .skn-tma4 .hyphen:before{content:' - '}
        .skn-tma4.hyphen-en-dash .hyphen:before{content:' – '}


        .skn-tma4,.skn-tma4 table{line-height:16px}
        .skn-tma4.pagesize{width:531px}
        .skn-tma4.fontsize,.skn-tma4 .lang-sec .paragraph *,.skn-tma4 .skli-sec .paragraph *,.skn-tma4 .multi-section-hilt .paragraph *{font-size:11px}
        .skn-tma4.fontface{font-family:Arial}
        .skn-tma4.vmargins{padding-top:32px;padding-bottom:32px}
        .skn-tma4.hmargins{padding-left:32px;padding-right:32px}
        .skn-tma4 .heading{width:140px}
        .skn-tma4 .section{min-height:50px}
        .skn-tma4 .section:before {content:'';position:absolute;height:100%;left:140px}
        .skn-tma4 .paragraph .singlecolumn{min-height:16px}
        .skn-tma4 .firstparagraph{padding-top:0}
        .skn-tma4 .singlecolumn,.skn-tma4 .maincolumn,.skn-tma4 .section:after{margin-left:140px}
        .skn-tma4 .lang-sec .heading,.skn-tma4 .skli-sec .heading{left:-141px}
        .skn-tma4 .sectiontitle{font-size:11px;line-height:16px}
        .skn-tma4 table.skills td{padding-top:5px}
        .skn-tma4 .name{font-size:34px;line-height:44px}
        .skn-tma4 .resumeTitle{font-size:15px;line-height:25px;padding:0 0 10px 0}
        .skn-tma4 .address{font-size:11px;line-height:16px}
        .skn-tma4 .dynamicIcon svg{fill:${colorHex}}
        .skn-tma4 .dynamicIcon svg *{stroke:${colorHex}}
		.skn-tma4 .skli-sec .singlecolumn .field:last-child{min-height:16px}
        .skn-tma4 .totl-expr{background-color:${colorHex};font-size:6px;line-height:10px}

        /*Timeline*/
        .skn-tma4 .paragraph .singlecolumn{padding-top:10px;padding-bottom:10px}
        .skn-tma4 .sign.section{padding-top:10px}
        .skn-tma4 .firstparagraph .singlecolumn{padding-top:0}
        .skn-tma4 .heading:before{top:3px}

        /* SDCL */
        .skn-tma4 .paragraph + .paragraph:before{left:135px;top:13px}

        /*FIX for Re-calculating width of singlecolumn for CL*/
        .skn-tma4 .sectionCL .singlecolumn{margin-left:0;width:100%}
        .skn-tma4 .address2{font-size:11px;line-height:16px}
        .skn-tma4 .SortableList > .SortableItem:nth-child(2) .section:after {content:'';border-left:5px solid #fff;position:absolute;top:0;left:-1px;height:12px}
        .skn-tma4 [id^="SECTION_EXPR"] .sortableInner,.skn-tma4 [id^="SECTION_EDUC"] .sortableInner{margin-left:140px}

        /*Infographic*/
        .skn-tma4 .lang-sec,.skn-tma4 .skli-sec{margin-left:140px;padding-bottom:10px}

        /* Multi para hilt */
        .skn-tma4 .multi-para-hilt{margin-left:140px}
        .skn-tma4 .multi-para-hilt .heading{margin-left:-141px}
        /*Word-wrap*/
        .skn-tma4 .PARAGRAPH_PRFL{display:table;table-layout:fixed;width:100%}

        /*Finalize Fixes*/
        .skn-tma4 .lang-sec .sortable-item,.skn-tma4 .skli-sec .sortable-item{display:inline-block;vertical-align:top}
        .skn-tma4 .lang-sec .sortableInner .sortable-item:not(:first-child) .paragraph,.skn-tma4 .skli-sec .sortableInner .sortable-item:not(:first-child) .paragraph{vertical-align:top}
        .page-finalize .skn-tma4 .lang-sec .singlecolumn,.page-finalize .skn-tma4 .skli-sec .singlecolumn{border:0}
        .page-finalize .skn-tma4 .lang-sec,.page-finalize .skn-tma4 .skli-sec{border-left:none;margin-left: 0px;padding-left:140px}
        .page-finalize .skn-tma4 .lang-sec .sortableInner,.page-finalize .skn-tma4 .skli-sec .sortableInner{border-left:1px solid #979797;padding-left:14px;padding-bottom:10px}
        .page-finalize .skn-tma4 .lang-sec .heading + div > div:not(.sortableInner) .firstparagraph .singlecolumn,.page-finalize .skn-tma4 .skli-sec .heading + div > div:not(.sortableInner) .firstparagraph .singlecolumn{ border-left:1px solid #979797}
        .TMA4.skn-tma4 .section:not(.lang-info) .firstparagraph .singlecolumn,.TMA4.skn-tma4 .section:not(.info-info) .firstparagraph .singlecolumn{min-height:auto}
        .page-finalize .skn-tma4 .section {min-height: 24px}
        .skn-tma4 .sortableInner .sortable-item+.sortable-item .paragraph:before, .skn-tma4 .sortableInner .paragraph+.paragraph:before{background:none;border:none}
        .page-finalize .skn-tma4 .lang-sec,.page-finalize .skn-tmaf.skn-tma4 .skli-sec .heading4 .skli-sec{padding-bottom:0;}
        .skn-tma4 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}
        .page-finalize #spellcheck .skn-tma4 .lang-sec,.page-finalize #spellcheck .skn-tma4 .skli-sec{border-left:1px solid #979797;margin-left:140px;padding-left:14px}
        .skn-tma4 .lang-sec .doc-item .heading:before,.skn-tma4 .skli-sec .doc-item .heading:before{right:-7px}
        .skn-tma4 .lang-sec .title-edit,.skn-tma4 .skli-sec .title-edit{left:-141px}
        .skn-tma4 .data-LNGG .sortable-item.native-lang{width:100%;max-width:100%}
        .skn-tma4 .data-LNGG .doc-item,.skn-tma4 .data-SKLI .doc-item,.skn-tma4 .lang-sec .doc-item,.skn-tma4 .skli-sec .doc-item{width:100%}
        .skn-tma4 .data-LNGG .sortableInner,.skn-tma4 .data-SKLI .sortableInner,.skn-tma4 .SECTION_LNGG .sortableInner,.skn-tma4 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-tma4 .data-LNGG .sortable-item,.skn-tma4 .data-SKLI .sortable-item{width:48.2%}
        .skn-tma4 .data-LNGG .sortable-item .paragraph,.skn-tma4 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}

		 /*Fixes for builder for skill*/
        .skn-tma4 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:16px}
        .skn-tma4 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-tma4 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}
       .skn-tma4 .lang-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-tma4 .lang-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph, .skn-tma4  .skli-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-tma4  .skli-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0}

	   /*PDF Flex Handling Code - Personal Information*/
		.skn-tma4.for-pdf .pdet-sec .singlecolumn{display:block}
		.skn-tma4.for-pdf .pdfpdwrapper{display:table}
		.skn-tma4.for-pdf .pdfpdwrapper .details-wrap:first-child{display:table-cell;padding-right:5px}
		.skn-tma4.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){display:table-cell;}
		.skn-tma4.for-pdf .pdfpdwrapper .details-wrap{width:183px!important;}

    /*Infographic Containers*/
    .skn-tma4.for-pdf .lang-sec,.skn-tma4.for-pdf .skli-sec{display:block}
    .skn-tma4.for-pdf .pdfinfwrapper{display:block}
    .skn-tma4.for-pdf .pdfinfwrapper:after{content:'';clear:both;display:table}
    .skn-tma4.for-pdf .pdfinfwrapper .paragraph:first-child{float:left}
    .skn-tma4.for-pdf .pdfinfwrapper .paragraph:nth-child(2){float:right}
    .skn-tma4.for-pdf .pdfinfwrapper:last-child .paragraph{margin-bottom:0;padding-bottom:0}

    /*PDF Handling for TEXP*/
    .document.for-pdf.expr-durt-cexp .section.exprience .paragraph .singlecolumn .texp-row{display:block;}
    .document.for-pdf.expr-durt-cexp .section.exprience .paragraph .singlecolumn .jobtitle-cell{display:inline-block;width:70%}
    .document.for-pdf.expr-durt-cexp .section.exprience .paragraph .singlecolumn .texp-cell{display:inline-block;float:right;}
      `}</style>
      <div className="svg-skin">
        <div className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-tma4 TMA4 MUK hyphen-normal pict-pcpf-purl texp-rectangle expr-durt-none">
          <div className="name-contact">
            <div className="section SECTION_PRFL firstsection">
              <div className="doc-item">
                <div className="paragraph PARAGRAPH_PRFL firstparagraph">
                  <div>
                    {/* Monogram */}
                    <div className="monogram show-monogram">
                      <svg width="54px" height="54px">
                        <circle cx="27px" cy="27px" r="26px" style={{ fill: '#fff', strokeWidth: '1' }}></circle>
                        <text textAnchor="middle" x="27px" y="36px" fill="#000000" fontSize="25px">{getInitials()}</text>
                      </svg>
                    </div>

                    {/* Name */}
                    <div className="name">
                      <span>{data.first_name}</span>
                      {data.first_name && data.last_name && <span> </span>}
                      <span>{data.last_name}</span>
                    </div>

                    {/* Contact Address */}
                    <div className="address">
                      <span className="paddedline">
                        {data.phone && (
                          <>
                            <span className="dispInBlk maxWidth">
                              <span>{data.phone}</span>
                              {data.email && <span> | </span>}
                            </span>
                          </>
                        )}
                        {data.email && (
                          <span className="dispInBlk maxWidth">
                            <span className="xslt_static_change txtBold">Email: </span>
                            <span>{data.email}</span>
                          </span>
                        )}
                      </span>
                      <span className="zipsuffix">
                        {data.street_address && <span>{data.street_address}</span>}
                        {data.street_address && data.city && <span>, </span>}
                        <span className="spaced">{data.city}</span>
                        <span className="spaced"> </span>
                        <span className="spaced">{data.postcode}</span>
                      </span>
                    </div>

                    {/* Additional Contact Info */}
                    {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                      <div className="address adrsExtra">
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
                              <span className="sprtr"> | </span>
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
                              <span className="sprtr"> | </span>
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
                              <span className="brk-all"> {data.website}</span>
                            </span>
                            {data.linkedin && <span className="sprtr"> | </span>}
                          </>
                        )}

                        {data.linkedin && (
                          <span className="maxWidth social-link">
                            <span className="dispInBlk">
                              <span className="txtBold">
                                <span>LinkedIn</span>
                                <span className="beforecolonspace"> </span>
                                <span>: </span>
                              </span>
                              <span className="brk-all">{data.linkedin}</span>
                              <span className="sprtr"> | </span>
                            </span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="parent-wrapper">
            {/* Professional Summary */}
            {data.summary && (
              <div className="sortable-item section-container SortableItem-sibling">
                <div className="section SECTION_SUMM has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{t.professional_summary || "Professional summary"}</div>
                    </div>
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
            )}

            {/* Work Experience */}
            {data.experiences && data.experiences.length > 0 && (
              <div className="sortable-item section-container SortableItem-sibling">
                <div className="section exprience SECTION_EXPR multi-para has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{t.work_history || "Work history"}</div>
                    </div>
                    <div className="sortableInner">
                      {data.experiences.map((exp, index) => (
                        <div key={exp.id || index} className="sortable-item paragraph-container SortableItem-sibling">
                          <div className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}>
                            <div className="clearfix doc-item">
                              <div className="singlecolumn">
                                <span className="paddedline">
                                  <span className="datesWrapper">
                                    <span className="jobdates">{exp.start_date ? formatDate(exp.start_date, language) : ''}</span>
                                    {exp.start_date && (exp.end_date || exp.currently_working) && <span className="hyphen"></span>}
                                    <span className="jobdates">{exp.currently_working ? (t.present || 'Current') : (exp.end_date ? formatDate(exp.end_date, language) : '')}</span>
                                  </span>
                                  <span className="jobtitle">{exp.job_title}</span>
                                </span>
                                <span className="paddedline txtBold">
                                  <span className="dflex texp-row">
                                    <span className="jobtitle-cell">
                                      <span className="companyname">{exp.company}</span>
                                      {exp.company && exp.location && <span> |</span>}
                                      <span className="joblocation jobcity"> {exp.location}</span>
                                    </span>
                                  </span>
                                </span>
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
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="sortable-item section-container SortableItem-sibling">
                <div className="section SECTION_HILT has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{t.skills || "Skills"}</div>
                    </div>
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
            )}

            {/* Education */}
            {data.educations && data.educations.length > 0 && (
              <div className="sortable-item section-container SortableItem-sibling">
                <div className="section education SECTION_EDUC multi-para has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{t.education || "Education"}</div>
                    </div>
                    <div className="sortableInner">
                      {data.educations.map((edu, index) => (
                        <div key={edu.id || index} className="sortable-item paragraph-container SortableItem-sibling">
                          <div className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}>
                            <div className="clearfix doc-item">
                              <div className="singlecolumn">
                                <span className="paddedline">
                                  <span className="datesWrapper">
                                    {edu.start_date && <span className="jobdates">{formatDate(edu.start_date, language)}</span>}
                                    {edu.start_date && edu.end_date && <span className="hyphen"></span>}
                                    {edu.end_date && <span className="jobdates">{formatDate(edu.end_date, language)}</span>}
                                  </span>
                                  {edu.degree && <span className="degree">{edu.degree}</span>}
                                  {edu.degree && edu.field_of_study && <span> | </span>}
                                  {edu.field_of_study && <span className="programline">{edu.field_of_study}</span>}
                                </span>
                                <span className="paddedline txtBold">
                                  <span className="companyname companyname_educ">{edu.institution}</span>
                                  {edu.institution && edu.location && <span>, </span>}
                                  <span className="joblocation jobcity">{edu.location}</span>
                                </span>
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

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <div className="sortable-item section-container SortableItem-sibling data-LNGGsortable-item data-LNGG">
                <div className="section lang-sec hide-colon SECTION_LNGG has-title data-LNGG">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{t.languages || "Languages"}</div>
                    </div>
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
