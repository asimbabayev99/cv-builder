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

export default function TemplateMca2({
    data = sampleData,
    translations: t = translations.en,
    language = "en",
    colorHex = "#000000",
}: Partial<DynamicTemplateProps> = {}) {
    const midpoint = Math.ceil(data.skills.length / 2);
    const skillsColumn1 = data.skills.slice(0, midpoint);
    const skillsColumn2 = data.skills.slice(midpoint);

    return (
        <>
            <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-mca2 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        .skn-mca2 span.paddedline,.skn-mca2 span.dates_wrapper{display:block}
        .skn-mca2 span.jobtitle,.skn-mca2 span.companyname,.skn-mca2 span.degree,.skn-mca2 span.dates_wrapper,.skn-mca2 .txt-bold{font-weight:bold}
        .skn-mca2 span.dates_wrapper{float:left;text-align:left}        
        .skn-mca2 span.cdesc{font-style:italic}
        .skn-mca2 .logo,.skn-mca2 .nodisplay{display:none}
        .skn-mca2 .flt-right{float:right}

        .skn-mca2 ul{list-style-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAADgzO9IAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADNJREFUeNpiYCAAtIB4OxDfAOIoZIm9QPwfiv8AMT8TVOIvLqMMgPgqEL8F4ky8lgIEGAC+Fgk0YKVkbwAAAABJRU5ErkJggg==")}
        .skn-mca2 ul,.skn-mca2 li{margin:0 0 0 13px;padding:0}
        .skn-mca2 ul li{margin:0 0 0 16px;padding:0 0 0 3px}
        .skn-mca2 .adnlLnks ul,.skn-mca2 .adnlLnks li{list-style:none;margin:0}
        .skn-mca2 .adnlLnks li{display:inline-block;margin-right:10px;padding:0}
        .skn-mca2 .adnlLnks li:first-child{padding:0}
        .skn-mca2 .adnlLnks li.fieldrept_lnk4-n:last-child{margin-right:0}

        .skn-mca2{color:#000;word-wrap:break-word;min-height:792px}
		.skn-mca2 .name{font-size:15px;line-height:17px;font-weight:normal;padding:0;text-align:left;text-transform:uppercase}
        .skn-mca2 .name span.lName{font-weight:bold}
        .skn-mca2 .resumeTitle{color:#4a4a4a;text-transform:lowercase}
        .skn-mca2 .resumeTitle:first-letter{text-transform:uppercase}/*To make sentence case*/
        .skn-mca2 .paragraph{position:relative;clear:both}
        .skn-mca2 .heading{clear:both;font-weight:bold;text-transform:uppercase}
        .skn-mca2 .address{position:relative;text-align:left;font-size:0.917em;line-height:1.25em;margin-top:0}
        .skn-mca2 .address2{position:relative;text-align:left;font-size:0.917em;line-height:1.25em}
        .skn-mca2 .adnlLnks{padding:10px 0}
        .skn-mca2 .table_wrapper{width:100%;margin-top:0}
        .skn-mca2 table.twocol td{width:50%}
        .skn-mca2 table.skills th,.skn-mca2 table.skills td{width:20%;text-align:center}
        .skn-mca2 table.skills th{text-decoration:underline}
        .skn-mca2 table.skills .skillname,.skn-mca2 table.skills .skillrating{text-align:left;width:35%}
        .skn-mca2 table.skills .skillrating{width:20%}
        .skn-mca2 table.skills .skillyears,.skn-mca2 table.skills .skilllast{width:19%}
        .skn-mca2 table.skills .pad1{width:5%}
        .skn-mca2 table.skills .pad2,.skn-mca2 table.skills .pad3{width:1%}
        .skn-mca2 .execRsmTitle{font-weight:bold;text-align:left}
        .skn-mca2 .prflPic{float:right}
        .skn-mca2 .prflPic img{vertical-align:top;width:99px;height:128px;object-fit:cover}
        .skn-mca2 .nmCntc{margin-right:99px}
        .skn-mca2 .prflSection,.skn-mca2 .prflWrapper{border-bottom:none;border-top:none}
        .skn-mca2 .fielditem:empty{display:none}

        .skn-mca2 .totl-expr{display:inline-block;padding:0px 6px 1px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap}
        .skn-mca2.texp-curved .totl-expr{border-radius:10px}
        .skn-mca2 .dflex{display:flex;justify-content:space-between}

        /*Personal details section*/
        .skn-mca2 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-mca2 .details-wrap{width:49%}

        /* SVG Icon Style */
		.skn-mca2 .iconRow{display:table;table-layout:fixed;width:100%;margin-bottom:5px;word-wrap:break-word}
        .skn-mca2 .iconRow:last-child{margin-bottom:0}
        .skn-mca2 .social-link .iconRow:last-child{margin-bottom:5px}
        .skn-mca2 .iconSvg{width:11px;height:11px;display:table-cell;text-align:center;vertical-align:middle}
        .skn-mca2 .iconSvg svg{vertical-align:middle}
		.skn-mca2 .iconSvg.icondni{transform:scale(1.2)}
        .skn-mca2 .icoTxt{display:table-cell;padding-left:10px}
		.skn-mca2 .iconRow path.dnibgClr{fill:#fff}
		

        /*FIX for FORCEFULLY making left margin ZERO for CL*/
        .skn-mca2 .section.sectionCL .paragraph{margin-top:0}
        .skn-mca2 .PARAGRAPH_CLPRFL .myLftIndnt,.skn-mca2 .PARAGRAPH_CLPRFL .nmCntc{margin:0}

        /* Style for Signature */
        .skn-mca2 .disclaim .field.singlecolumn,.skn-mca2 .paragraph .signPic > .newname_sign{margin-left:0}
        .skn-mca2 .disclaim .field.singlecolumn,.skn-mca2 .disclaim .field.singlecolumn li,.skn-mca2 .disclaim .field.singlecolumn p,.skn-mca2 .disclaim .field.singlecolumn span{font-size:9px;color:#8a8a8a}
        .skn-mca2 .paragraph .field_sign{font-size:7px;color:#8a8a8a}
        .skn-mca2 .txtleft + .field_sign{text-align:left}
        .skn-mca2 .txtcenter + .field_sign{text-align:center}
        .skn-mca2 .txtright + .field_sign{text-align:right}
        .skn-mca2 .signPic span:first-child{padding-right:6px}
        .skn-mca2 .signPic img{max-width:100%}

        /*MES address order code*/
        .skn-mca2 .zipprefix,.skn-mca2.MES .zipsuffix,.skn-mca2.MFR .zipsuffix{display:none}
        .skn-mca2 .zipsuffix,.skn-mca2.MES .zipprefix,.skn-mca2.MFR .zipprefix{display:block}

        /*New logic for infographic*/
        .skn-mca2 .lang-sec .singlecolumn,.skn-mca2 .skli-sec .singlecolumn{display:none}
        .skn-mca2 .lang-sec.infobarsec .infobarpara,.skn-mca2 .skli-sec.infobarsec .infobarpara,.skn-mca2 .lang-sec.infotilesec .infotilepara,.skn-mca2 .skli-sec.infotilesec .infotilepara{display:block}
        .skn-mca2 .hide-bar .field-ratt{display:none}

        /*Infographic Bar*/
        .skn-mca2 .lang-sec.infobarsec,.skn-mca2 .skli-sec.infobarsec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-mca2 .lang-sec.infobarsec .field *,.skn-mca2 .skli-sec.infobarsec .field *,.skn-mca2 .lang-sec.infobarsec .nativeLangPara .field{display:inline}
        .skn-mca2 .lang-sec.infobarsec .paragraph,.skn-mca2 .skli-sec.infobarsec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0}
        .skn-mca2 .lang-sec.infobarsec .singlecolumn,.skn-mca2 .skli-sec.infobarsec .singlecolumn{margin-left:0;padding-left:0;position:relative}
        .skn-mca2 .lang-sec.infobarsec .paragraph.nativeLangPara{width:100%}
        .skn-mca2 .lang-sec.infobarsec .inner-rating,.skn-mca2 .skli-sec.infobarsec .inner-rating{position:relative}
        .skn-mca2 .lang-sec.infobarsec .rating-bar,.skn-mca2 .skli-sec.infobarsec .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
        .skn-mca2 .lang-sec.infobarsec .inner-rating,.skn-mca2 .skli-sec.infobarsec .inner-rating{background-color:#000;height:4px;width:60%}
        .skn-mca2 .lang-sec.infobarsec > .paragraph:nth-last-child(1),.skn-mca2 .lang-sec.infobarsec > .paragraph:nth-last-child(2),.skn-mca2 .skli-sec.infobarsec > .paragraph:nth-last-child(1),.skn-mca2 .skli-sec.infobarsec > .paragraph:nth-last-child(2){padding-bottom:0!important}
       
	   .skn-mca2 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-mca2 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}

      /*Infographic Tiles*/
        .skn-mca2 .lang-sec.infotilesec,.skn-mca2 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-mca2 .lang-sec.infotilesec .paragraph,.skn-mca2 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0}
        .skn-mca2 .lang-sec.infotilesec > .paragraph:nth-last-child(1),.skn-mca2 .lang-sec.infotilesec > .paragraph:nth-last-child(2),.skn-mca2 .skli-sec > .paragraph:nth-last-child(1),.skn-mca2 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0!important}
        .skn-mca2 .lang-sec.infotilesec .field *,.skn-mca2 .skli-sec .field *,.skn-mca2 .lang-sec.infotilesec .nativeLangPara .field{display:inline}
        .skn-mca2 .lang-sec.infotilesec .singlecolumn,.skn-mca2 .skli-sec .singlecolumn{margin-left:0}
        .skn-mca2 .lang-sec.infotilesec .sliced-rect,.skn-mca2 .skli-sec .sliced-rect{height:6px;width:100%;line-height:0px;margin-top:3px;clear:both}
        .skn-mca2 .lang-sec.infotilesec .sliced-rect .sliced-rect-tile,.skn-mca2 .skli-sec .sliced-rect .sliced-rect-tile{height:100%;background-color:#d5d6d6;float:left;margin-right:3px}
        .skn-mca2 .lang-sec.infotilesec .sliced-rect .sliced-rect-tile:last-child,.skn-mca2 .skli-sec .sliced-rect .sliced-rect-tile:last-child{margin-right:0}
        .skn-mca2 .lang-sec.infotilesec .paragraph.nativeLangPara{width:100%}
        
        /*Rectangular Rating Blocks*/
        .skn-mca2 .sliced-rect .sliced-rect-tile.ratvfill{background-color:#4a4a4a}
        .skn-mca2 .hide-bar .paragraph .rating-bar,.skn-mca2 .hide-bar .paragraph .sliced-rect,.skn-mca2 .hide-colon .paragraph .colon,.skn-mca2 .hide-only-bar .rating-bar{display:none}

        /*Social Icons*/
        .skn-mca2 .iconSvg.social svg{transform:scale(1.65)}
        .skn-mca2 .social svg .svg-inricon .sml-face,.skn-mca2 .social svg .svg-inricon .sml-face > path{fill:#fff}
        .skn-mca2 .social svg .svg-inricon .big-face,.skn-mca2 .social svg .svg-inricon .big-face path{fill:#fff}
        .skn-mca2 .social svg .svg-inricon .big-face + g > circle,.skn-mca2 .social svg .svg-inricon .big-face + g > path{fill:#242424}
        .skn-mca2 .social svg .text{transform:scale(1.1); transform-origin:center;}

       /*For Extra Space Before Colon*/
        .skn-mca2 .beforecolonspace{display:none!important}
        .skn-mca2.MFR .beforecolonspace{display:inline!important}

        /* GRYR */
        .skn-mca2 .displayNoneThisField{display:none}/* Keep this class always at bottom */
        /*HILT multi para/section*/   
        .skn-mca2 .multi-para-hilt:after{content: "";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/     
        .skn-mca2 .multi-para-hilt .paragraph{margin-bottom:10px;margin-top:0;width:49%;float:left;clear:none}
        .skn-mca2 .multi-para-hilt .paragraph:last-child,.skn-mca2 .multi-para-hilt .paragraph:nth-last-child(2):nth-child(2n){margin-bottom:0}
        .skn-mca2 .multi-para-hilt .paragraph:nth-child(2n+1){margin-left:2%}
        .skn-mca2 .multi-para-hilt .paragraph:nth-child(2n){clear:left;margin-left:0}
        .skn-mca2 .multi-para-hilt .singlecolumn{margin:0}
        .skn-mca2 .multi-section-hilt .multi-para-opt,.skn-mca2 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-mca2 .multi-para-hilt .twocol.skill{display:none}        
   
        /* Text alignment bullet */
       .skn-mca2 .ttc-align-left ul{text-align:left}
       .skn-mca2 .ttc-align-right ul{text-align:right}
       .skn-mca2 .ttc-align-center ul{text-align:center}
       .skn-mca2 .ttc-align-justify ul{text-align:justify}
       .skn-mca2 .ttc-align-right li,.skn-mca2 .ttc-align-center li{position:relative;list-style-position:inside;margin-left:0}
        
       /*PICT support*/
        .skn-mca2.pict-pcpf-none .prflPic{display:none}
        .skn-mca2.pict-pcpf-none .nmCntc{margin-right:0}

        /*PDF Issue Fixes*/
        .skn-mca2.for-pdf .lang-sec.infobarsec .rating-bar, .skn-mca2.for-pdf .skli-sec.infobarsec .rating-bar{page-break-inside:avoid}

        /*PDF Flex Handling Code - Personal Information*/
		.skn-mca2.for-pdf .pdfpdwrapper{display:block}
		.skn-mca2.for-pdf .pdfpdwrapper .details-wrap:first-child{float:left;padding-right:5px}
		.skn-mca2.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){float:right}

        /*CSS for Infographic PDFWrapper*/
        .skn-mca2.for-pdf .lang-sec,.skn-mca2.for-pdf .skli-sec{display: block;}
        .skn-mca2.for-pdf .section .pdfinfwrapper{display:block;width:100%}
        .skn-mca2.for-pdf .section .pdfinfwrapper:after{content:'';clear:both;display:table}
        .skn-mca2.for-pdf .section .pdfinfwrapper .paragraph:first-child{float:left}
        .skn-mca2.for-pdf .section .pdfinfwrapper .paragraph:nth-child(2){float:right}
        .skn-mca2.for-pdf .section .pdfinfwrapper .paragraph{margin-bottom:5px;padding-bottom:0}
        .skn-mca2.for-pdf .section .pdfinfwrapper:last-child .paragraph{margin-bottom:0}
        .skn-mca2.for-pdf .section .pdfinfwrapper .paragraph{clear:none}
         
        /*Button style*/
        .skn-mca2.show-btn .section.btnlnk{font-size:0;text-align:left}
        .skn-mca2.show-btn .btnlnk .paragraph{display:inline-block;margin:0;width:auto;height:100%}
        .skn-mca2.show-btn .btnlnk .paragraph:last-child{padding-right:0}
        .skn-mca2:not(.show-btn) .btnlnk{display:none}

        /*Button SVG*/
        .skn-mca2.show-btn .btnlnk a{display:flex;align-items:center;text-decoration:none;position:relative;text-align:center;padding:4px 8px;box-shadow:1px 1px 2px 0px rgba(0, 0, 0, 0.25);color:#000;font-size:10px;line-height:normal;font-weight:normal;border-radius:4px}
        .skn-mca2.show-btn .btnlnk a:before{content:'';width:100%;height:100%;background:#000;opacity:0.2;position:absolute;left:0;border-radius:4px}

        /*Photo Layout styles*/
        .skn-mca2.pict-pcsh-circle .paragraph .prflPic img{border-radius:50%;border:1px solid #000;box-sizing:border-box}
        .skn-mca2.pict-pcsh-square .paragraph .prflPic img{border-radius:unset;border:1px solid #000;box-sizing:border-box}
        .skn-mca2.pict-pcsh-bottomleft .paragraph .prflPic img{border-radius:50%;border-bottom-left-radius:8px;border:1px solid #000;box-sizing:border-box}
        .skn-mca2.pict-pcsh-bottomright .paragraph .prflPic img{border-radius:50%;border-bottom-right-radius:8px;border:1px solid #000;box-sizing:border-box}
        .skn-mca2.pict-pcsh-radius .paragraph .prflPic img{border-radius:10px;border:1px solid #000;box-sizing:border-box}
        .skn-mca2 .prflPic, .skn-mca2 .prflPic .field{text-align:center}

        /*Photo Layout styles - For PDF*/
        .skn-mca2.pict-pcsh-circle.for-pdf .paragraph .prflPic{border-radius:50%;border:1px solid #000;box-sizing:border-box;overflow:hidden}
        .skn-mca2.pict-pcsh-circle.for-pdf .paragraph .prflPic img{border-radius:0%;border:none}
        .skn-mca2.pict-pcsh-circle.for-pdf .paragraph .prflPic img{width:97px;height:97px}

        .skn-mca2.pict-pcsh-square.for-pdf .paragraph .prflPic{border-radius:unset;border:1px solid #000;box-sizing:border-box;overflow:hidden}
        .skn-mca2.pict-pcsh-square.for-pdf .paragraph .prflPic img{border-radius:unset;border:none}
        .skn-mca2.pict-pcsh-square.for-pdf .paragraph .prflPic img{width:97px}

        .skn-mca2.pict-pcsh-bottomleft.for-pdf .paragraph .prflPic{border-radius:50%;border-bottom-left-radius:8px;border:1px solid #000;box-sizing:border-box;overflow:hidden}
        .skn-mca2.pict-pcsh-bottomleft.for-pdf .paragraph .prflPic img{border-bottom-left-radius:0%;border:none}
        .skn-mca2.pict-pcsh-bottomleft.for-pdf .paragraph .prflPic img{width:97px;height:97px}

        .skn-mca2.pict-pcsh-bottomright.for-pdf .paragraph .prflPic{border-radius:50%;border-bottom-right-radius:8px;border:1px solid #000;box-sizing:border-box}
        .skn-mca2.pict-pcsh-bottomright.for-pdf .paragraph .prflPic img{border:none;box-sizing:border-box}
        .skn-mca2.pict-pcsh-bottomright.for-pdf .paragraph .prflPic img{width:97px;height:97px}

        /*Hyphen Handling*/
        .skn-mca2 .hyphen:before{content:' - '}
        .skn-mca2.hyphen-en-dash .hyphen:before{content:' – '}

        /*IronPDF - PDF fixes*/
        .skn-mca2.for-iron-pdf .rating-bar,.skn-mca2.for-iron-pdf .sliced-rect{page-break-inside:avoid}
   

        .skn-mca2,.skn-mca2 table{line-height:12px}
        .skn-mca2.pagesize{width:515px}
        .skn-mca2.fontsize,.skn-mca2 .lang-sec.infobarsec .paragraph *,.skn-mca2 .lang-sec.infotilesec .paragraph *,.skn-mca2 .skli-sec .paragraph *{font-size:11px}
        .skn-mca2.fontface{font-family:Century Gothic}
        .skn-mca2.vmargins{padding-top:32px;padding-bottom:32px}
        .skn-mca2.hmargins{padding-left:40px;padding-right:40px}
        .skn-mca2 .section{margin-top:10px}
        .skn-mca2 .disclaim{margin:0;padding:0;margin-top:50px}
        .skn-mca2 .section.firstsection,.skn-mca2 .section.SECTION_CNTC,.skn-mca2 .paragraph.firstparagraph{margin-top:0}
        .skn-mca2 .heading{margin-bottom:2px}
        .skn-mca2 .paragraph{margin-top:4px}
        .skn-mca2 .singlecolumn,.skn-mca2 .maincolumn,.skn-mca2 .myLftIndnt{margin-left:115px}
        .skn-mca2 span.dates_wrapper{width:115px;font-size:11px;line-height:13px}
        .skn-mca2 .sectiontitle{font-size:12px;line-height:13px}
        .skn-mca2 .name{font-size:21px;line-height:38px}
        .skn-mca2 .resumeTitle{font-size:15px;line-height:15px;padding:0 0 10px 0}
        .skn-mca2 .thinbottomborder{border-bottom:0px solid}
        .skn-mca2 .address{font-size:11px;line-height:13px}
        .skn-mca2 .adrsExtra{margin-bottom:5px}
        .skn-mca2 table.skills td{padding-top:2px}
        .skn-mca2 .noPind{margin-left:0}
        .skn-mca2 .execRsmTitle{font-size:12px;line-height:13px}
        .skn-mca2 span.compDescWrap{margin-bottom:2px}
        .skn-mca2 .name,.skn-mca2 .sectiontitle{color:#000000}
		.skn-mca2 .skli-sec .singlecolumn .field:last-child{min-height:12px}
		.skn-mca2 .disclaim,.skn-mca2 .sign{margin-top:50px}
		.skn-mca2 .sign + .disclaim,.skn-mca2 .disclaim + .sign{margin-top:10px}
        .skn-mca2 .totl-expr{background-color:#000000;font-size:8px;line-height:12px}

        /* icons */
        .skn-mca2 .iconSvg{line-height:11px}
        .skn-mca2 .iconSvg svg,.skn-mca2 .iconSvg{width:11px;height:11px}

        /*FIX for Re-calculating width of singlecolumn for CL*/
        .skn-mca2 .sectionCL .field.singlecolumn{margin-left:0;width:100%;font-size:11px}
        .skn-mca2 .address2{font-size:11px;line-height:12px}

        /*Infographic Bar*/
        .skn-mca2 .lang-sec.infobarsec,.skn-mca2 .skli-sec.infobarsec,.skn-mca2 .multi-para-hilt{padding-left:115px}
        .skn-mca2 .lang-sec.infobarsec .heading,.skn-mca2 .skli-sec.infobarsec .heading,.skn-mca2 .multi-para-hilt .heading{margin-left:-115px}
        .skn-mca2 .lang-sec.infobarsec .sortable-item .para_odd,.skn-mca2 .lang-sec.infobarsec .sortable-item .para_even,.skn-mca2 .skli-sec.infobarsec .sortable-item .para_odd,.skn-mca2 .skli-sec.infobarsec .sortable-item .para_even{max-width:{$LGBW}px}
        .skn-mca2 .lang-sec.infobarsec .inner-rating,.skn-mca2 .skli-sec.infobarsec .inner-rating{background-color:#000000}
        .skn-mca2 .lang-sec .heading,.skn-mca2 .skli-sec .heading{width:calc(100% + 115px)}
        .skn-mca2 .lang-sec .paragraph,.skn-mca2 .skli-sec .paragraph{width:47.6%}
        .skn-mca2 .data-LNGG .doc-item,.skn-mca2 .data-SKLI .doc-item,.skn-mca2 .lang-sec .doc-item,.skn-mca2 .skli-sec .doc-item{width:100%}
        .skn-mca2 .data-LNGG .sortableInner,.skn-mca2 .data-SKLI .sortableInner,.skn-mca2 .SECTION_LNGG .sortableInner,.skn-mca2 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-mca2 .data-LNGG .sortable-item,.skn-mca2 .data-SKLI .sortable-item{width:47.6%}
        .skn-mca2 .data-LNGG .sortable-item .paragraph,.skn-mca2 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}
        .skn-mca2 .lang-sec .native-lang{width:100%}

        /*Infographic Tiles*/
        .skn-mca2 .lang-sec.infotilesec,.skn-mca2 .skli-sec{padding-left:115px}
        .skn-mca2 .lang-sec.infotilesec .heading,.skn-mca2 .skli-sec .heading{margin-left:-115px}
        
        /*Rectangular Rating Blocks*/
        .skn-mca2 .paragraph .sliced-rect .sliced-rect-tile.ratvfill{background-color:#000000}

        /*Builder fixes*/
        .skn-mca2 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}
        .page-finalize .skn-mca2 .lang-sec,.page-finalize .skn-mca2 .skli-sec{padding-left:0}
        .page-finalize .skn-mca2 .lang-sec .heading,.page-finalize .skn-mca2 .skli-sec .heading{margin-left:0}
        .page-finalize .skn-mca2 .lang-sec .sortableInner,.page-finalize .skn-mca2 .skli-sec .sortableInner{margin-left:115px}
        .page-finalize .skn-mca2 .lang-sec .heading + div > div:not(.sortableInner) .firstparagraph .singlecolumn{margin-left:115px!important}
        .page-finalize .skn-mca2 .sortableInner .paragraph-container+.paragraph-container,.page-finalize .sortable-drag-item.skn-mca2 .section{margin:0}
		.skn-mca2 .lang-sec .sortable-item{vertical-align:top}
        .skn-mca2 .skli-sec.SECTION_SKLI .paragraph *{color:#000}
        .skn-mca2 .lang-sec .title-edit,.skn-mca2 .skli-sec .title-edit{margin-left:-115px}

        /*Spell checker*/
        .page-finalize #spellcheck .skn-mca2 .lang-sec,.page-finalize #spellcheck .skn-mca2 .skli-sec{padding-left:115px}
        .page-finalize #spellcheck .skn-mca2 .lang-sec .heading, .page-finalize #spellcheck .skn-mca2 .skli-sec .heading{margin-left:-115px}
		
		/*Fixes for builder for skill*/
        .skn-mca2 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:12px}	
        .skn-mca2 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-mca2 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}	
       .skn-mca2 .lang-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-mca2 .lang-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph, .skn-mca2  .skli-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-mca2  .skli-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0!important}
	   
       /*PDF Flex Handling Code - Personal Information*/
		.skn-mca2.for-pdf .pdfpdwrapper .details-wrap{width:197px}

        /*Button*/
        .skn-mca2.show-btn-gap .prfl-sec{padding-bottom:25px}
        .skn-mca2.show-btn .section.btnlnk{margin-top:5px}
        .skn-mca2.show-btn .btnlnk a:before{background:#000000}
        .skn-mca2.show-btn .btnlnk .paragraph{padding-right:8px;padding-top:5px;height:20px}
        .skn-mca2.for-pdf.show-btn .btnlnk a{box-shadow: 1px 1px 2px 0px #BFBFBF}
        .skn-mca2.for-pdf.show-btn .btnlnk a:before{top:0} 

        /*Photo Layout styles*/
        .skn-mca2.pict-pcsh-circle .paragraph .prflPic img{width:99px;height:99px}
        .skn-mca2.pict-pcsh-square .paragraph .prflPic img{width:99px;height:99px;height:99px}
        .skn-mca2.pict-pcsh-bottomleft .paragraph .prflPic img{height:99px;width:99px}
        .skn-mca2.pict-pcsh-bottomright .paragraph .prflPic img{height:99px;width:99px}
        .skn-mca2.pict-pcsh-radius .paragraph .prflPic img{height:99px;width:99px}

       /*PDF Handling for TEXP*/
      .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .texp-row{display:block;}
      .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .jobtitle-cell{display:inline-block;width:70%}
      .document.for-pdf.expr-durt-cexp .section.expr-sec .paragraph .singlecolumn .texp-cell{display:inline-block;float:right;}
    `}</style>
            <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-mca2 MCA2 MUK hyphen-normal texp-rectangle expr-durt-none pict-pcpf-purl" docskinwidth="515" ><div data-testid="embd-91y4rV2" className="name-contact "><div></div><div></div><div data-testid="embd-88MByq6-PRFL" id="SECTION_PRFL30868c37-6fcc-4b70-b87a-afd2447ce0d4" className="section SECTION_PRFL firstsection" data-section-cd="PRFL"><div data-testid="embd-88uQIHR-PRFL" className="doc-item"><div data-testid="embd-88aw0Ce-PRFL" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-04f55583-5181-435c-8336-f48964adf912" id="PARAGRAPH_PRFL_04f55583-5181-435c-8336-f48964adf912" className="paragraph PARAGRAPH_PRFL prfl-sec firstparagraph"><div data-testid="embd-78KlmQp">
                <div className="prflSection myLftIndnt">
                    <div className="prflPic">
                        <div id="FIELD_PURL"><img data-testid="embd-78pIea6" className="chk" src={data.photo_url || "https://assets.myperfectcv.co.uk/blobimages/muk/builder/images/sampleSkinImage.png"} alt="Profile" /> </div>
                    </div>
                    <div className="nmCntc">
                        <div className="name" data-uppercase="true">
                            <span id="FIELD_FNAM">{data.first_name}</span><span dependency="FNAM+LNAM"></span> <span className="lName" id="FIELD_LNAM">{data.last_name}</span>
                        </div>

                        <div className="address adrsExtra">

                            <div className="iconRow" dependency="ADDR|STRT|CITY|STAT|ZIPC">
                                <div className="iconSvg">
                                    <svg width="9px" height="11px" viewBox="0 0 9 11">
                                        <path d="M4.52262639,0.409856824 C2.49463692,0.409856824 0.844754581,2.05973916 0.844754581,4.08770879 C0.844754581,6.6044825 4.13608955,10.2992534 4.27622105,10.4553121 C4.40784351,10.6019097 4.63764728,10.6016518 4.76903172,10.4553121 C4.90916322,10.2992534 8.20049819,6.6044825 8.20049819,4.08770879 C8.20049819,2.05973916 6.55059602,0.409856824 4.52262639,0.409856824 Z M4.52262639,5.93813885 C3.5022945,5.93813885 2.67221616,5.10804068 2.67221616,4.08770879 C2.67221616,3.0673769 3.50231433,2.23729857 4.52262639,2.23729857 C5.54293844,2.23729857 6.37301677,3.06739674 6.37301677,4.08772863 C6.37301677,5.10806052 5.54293844,5.93813885 4.52262639,5.93813885 Z" id="Shape"></path>
                                    </svg>
                                </div>
                                <div className="icoTxt zipsuffix">
                                    <span id="FIELD_STRT">{data.street_address}</span><span dependency="STRT"><span dependency="CITY|STAT">,</span></span>
                                    <span id="FIELD_CITY">{data.city}</span>
                                    <span id="FIELD_STAT"></span>
                                    <span id="FIELD_ZIPC">{data.postcode}</span>
                                    <span id="FIELD_ADDR"></span>
                                </div>

                            </div>

                            <div className="iconRow" dependency="HPHN|CPHN">
                                <div className="iconSvg phone">
                                    <svg width="10px" height="12px" viewBox="0 0 10 12">
                                        <path d="M9.99525068,8.94279654 C10.0164406,9.10812814 9.96696865,9.25187944 9.84704245,9.37405042 L8.43906428,10.7971354 C8.37554647,10.869011 8.29263774,10.9301582 8.19030348,10.9804183 C8.08796923,11.0307489 7.98741666,11.0630929 7.88864577,11.0774504 C7.88158823,11.0774504 7.86036373,11.0793002 7.82505876,11.0828939 C7.78982298,11.0864701 7.74394901,11.0883022 7.68748873,11.0883022 C7.55336098,11.0883022 7.33632449,11.0649427 7.03637926,11.0182059 C6.73643404,10.9714691 6.36945953,10.8564504 5.93545574,10.6732028 C5.50134817,10.4899199 5.00910242,10.2149603 4.45863201,9.8484297 C3.9081616,9.48191674 3.32236892,8.97875198 2.70130587,8.3390411 C2.20727844,7.84309913 1.79794143,7.36871985 1.47329483,6.91592089 C1.14864824,6.46308669 0.887519452,6.04441104 0.689908481,5.65987633 C0.492280211,5.27534161 0.344071983,4.92674472 0.245266497,4.61408566 C0.146461011,4.30142659 0.0794144315,4.03189291 0.044126758,3.80548462 C0.00883908447,3.57907633 -0.00527598493,3.4011841 0.00178154977,3.27180794 C0.00883908447,3.14243177 0.0123678518,3.07055612 0.0123678518,3.05618099 C0.0264829212,2.95555509 0.0582418274,2.85313229 0.10764457,2.7489126 C0.157047313,2.64469291 0.217036358,2.56023902 0.287611705,2.49555094 L1.69558988,1.06163177 C1.79439536,0.961005863 1.90731592,0.910692909 2.03435154,0.910692909 C2.12609949,0.910692909 2.20726114,0.937646277 2.27783649,0.991553013 C2.34841184,1.04545975 2.40840088,1.11194472 2.45780362,1.19100794 L3.59053794,3.37962141 C3.65405576,3.49462244 3.67169959,3.62040483 3.64346945,3.75696856 C3.61523932,3.89353229 3.55525027,4.00853332 3.46350232,4.10197167 L2.94477352,4.63025768 C2.93065845,4.64463281 2.91830776,4.66799239 2.90772146,4.70033643 C2.89713516,4.73268047 2.89184201,4.75963384 2.89184201,4.78119654 C2.92007215,4.9321354 2.98358996,5.10463695 3.08239545,5.2987012 C3.16708586,5.47120275 3.29765025,5.68143902 3.47408862,5.92941001 C3.65052699,6.17738099 3.90106947,6.46306907 4.22571607,6.78650949 C4.54330513,7.1171727 4.82560652,7.37409291 5.07262023,7.55741104 C5.31958205,7.74062348 5.52608413,7.87544317 5.6919362,7.96169395 C5.85778826,8.04794472 5.98482389,8.10005457 6.07302577,8.11797063 L6.20531995,8.14494161 C6.21943502,8.14494161 6.24242391,8.13953332 6.27414822,8.12876959 C6.30590712,8.11797063 6.32884411,8.10541001 6.34297648,8.09101726 L6.9463784,7.46569913 C7.07348321,7.35071571 7.22162225,7.29321519 7.39102038,7.29321519 C7.51103307,7.29321519 7.60625789,7.31476027 7.67683324,7.35790327 L7.68740224,7.35790327 L9.73054124,8.58697685 C9.87880136,8.68048566 9.96700325,8.79904524 9.99525068,8.94279654 Z" id="phone" fill="#000000" fillRule="nonzero" transform="translate(5.000017, 5.999498) scale(-1, -1) rotate(-180.000000) translate(-5.000017, -5.999498) "></path>
                                    </svg>
                                </div>
                                <div className="icoTxt">
                                    <span id="FIELD_HPHN">{data.phone}</span>
                                    <span id="FIELD_CPHN"></span>
                                </div>
                            </div>
                            <div className="iconRow" dependency="EMAI">
                                <div className="iconSvg email">
                                    <svg width="11px" height="8px" viewBox="0 0 11 8">
                                        <path d="M1.28245476,-1.24344979e-14 C1.18627065,-1.24344979e-14 1.09008655,0.0322580645 0.993902439,0.064516129 L5.16188041,3.80645161 C5.29012589,3.93548387 5.57867821,3.93548387 5.73898505,3.80645161 L9.90696302,0.064516129 C9.81077891,0.0322580645 9.71459481,-1.24344979e-14 9.6184107,-1.24344979e-14 L1.28245476,-1.24344979e-14 Z" id="Path"></path>
                                        <path d="M0.480920535,6.40322581 C0.480920535,6.85483871 0.833595594,7.20967742 1.28245476,7.20967742 L9.6184107,7.20967742 C10.0672699,7.20967742 10.4199449,6.85483871 10.4199449,6.40322581 L10.4199449,0.919354839 C10.4199449,0.919354839 10.4199449,0.887096774 10.4199449,0.887096774 L7.3420535,3.56451613 L9.36191975,5.46774194 C9.45810386,5.56451613 9.52222659,5.69354839 9.52222659,5.79032258 C9.52222659,5.88709677 9.52222659,5.98387097 9.42604249,6.11290323 C9.32985838,6.20967742 9.23367427,6.27419355 9.1054288,6.27419355 C9.00924469,6.27419355 8.91306058,6.20967742 8.81687648,6.17741935 L8.78481511,6.14516129 L6.73288749,4.17741935 L6.25196696,4.59677419 C6.02753737,4.79032258 5.70692368,4.88709677 5.41837136,4.88709677 C5.25806452,4.88709677 4.84126672,4.85483871 4.5527144,4.56451613 L4.10385523,4.17741935 L2.01986625,6.14516129 C1.92368214,6.17741935 1.82749803,6.24193548 1.73131393,6.24193548 C1.63512982,6.24193548 1.50688434,6.17741935 1.41070024,6.08064516 L1.41070024,6.08064516 C1.37863887,5.98387097 1.31451613,5.88709677 1.31451613,5.79032258 C1.31451613,5.69354839 1.3465775,5.53225806 1.47482297,5.46774194 L3.46262785,3.56451613 L0.480920535,0.887096774 C0.480920535,0.887096774 0.480920535,0.919354839 0.480920535,0.919354839 L0.480920535,6.40322581 Z" id="Path"></path>
                                    </svg>
                                </div>
                                <div className="icoTxt">
                                    <span className="emailText" id="FIELD_EMAI">{data.email}</span>
                                </div>
                            </div>

                            {data.nationality && (
                                <div className="iconRow" dependency="NTLY">
                                    <div className="iconSvg">
                                        <svg width="11px" height="11px" viewBox="0 0 11 11">
                                            <path d="M7.46421778,3.37164485 C7.14258061,1.39080783 6.38395618,-5.68434189e-14 5.50112193,-5.68434189e-14 C4.61828767,-5.68434189e-14 3.85966325,1.39080783 3.53802608,3.37164485 L7.46421778,3.37164485 Z M10.5741209,3.37164485 C9.93970626,1.86548694 8.65538875,0.700938555 7.06938475,0.230700155 C7.61060948,0.980443165 7.9832823,2.10948756 8.17847846,3.37164485 L10.5741209,3.37164485 Z M2.8237654,3.37164485 C3.01675204,2.10948756 3.38940319,0.980443165 3.93064958,0.230700155 C2.34685511,0.700938555 1.06030641,1.86548694 0.428123003,3.37164485 L2.8237654,3.37164485 Z M7.5551548,6.9207447 C7.60174973,6.46601628 7.62837231,5.9935467 7.62837231,5.50110476 C7.62837231,5.00866283 7.60174973,4.53619324 7.5551548,4.08146482 L3.44485787,4.08146482 C3.3982846,4.53619324 3.37166202,5.00866283 3.37166202,5.50110476 C3.37166202,5.9935467 3.3982846,6.46601628 3.44485787,6.9207447 L7.5551548,6.9207447 Z M10.8092401,6.9207447 C10.9312404,6.46601628 11.0000172,5.9935467 11.0000172,5.50110476 C11.0000172,5.00866283 10.9312404,4.53619324 10.8114712,4.08146482 L8.26720595,4.08146482 C8.31377922,4.54728418 8.3404018,5.02419447 8.3404018,5.50110476 C8.3404018,5.97801505 8.31377922,6.45492534 8.26720595,6.9207447 L10.8092401,6.9207447 Z M2.73282838,6.9207447 C2.68846463,6.45492534 2.66184205,5.97801505 2.66184205,5.50110476 C2.66184205,5.02419447 2.68846463,4.54728418 2.7350379,4.08146482 L0.190772618,4.08146482 C0.0710034954,4.53619324 1.71660968e-05,5.00866283 1.71660968e-05,5.50110476 C1.71660968e-05,5.9935467 0.0710034954,6.46601628 0.190772618,6.9207447 L2.73282838,6.9207447 Z M5.50112193,11.0022095 C6.38395618,11.0022095 7.14258061,9.61140169 7.46421778,7.63056467 L3.53802608,7.63056467 C3.85966325,9.61140169 4.61828767,11.0022095 5.50112193,11.0022095 Z M7.07159428,10.7715094 C8.65538875,10.301271 9.94193744,9.13672258 10.5763304,7.63056467 L8.18068798,7.63056467 C7.98549182,8.89272197 7.61284067,10.0217664 7.07159428,10.7715094 Z M3.9328591,10.7715094 C3.39163437,10.0217664 3.01896156,8.89272197 2.8237654,7.63056467 L0.428123003,7.63056467 C1.0625376,9.13672258 2.34685511,10.301271 3.9328591,10.7715094 Z" id="nation" fill="#000000" fillRule="nonzero"></path>
                                        </svg>
                                    </div>
                                    <div className="icoTxt">
                                        <span id="FIELD_NTLY">{data.nationality}</span>
                                    </div>
                                </div>
                            )}

                            {data.driving_license && (
                                <div className="iconRow" dependency="DRIV">
                                    <div className="iconSvg">
                                        <svg width="11px" height="9px" viewBox="0 0 11 9">
                                            <path d="M2.06244241,8.25001388 C2.44207028,8.25001388 2.74994357,7.94214059 2.74994357,7.56251273 L2.74994357,6.87501157 L8.24995283,6.87501157 L8.24995283,7.56251273 C8.24995283,7.94214059 8.55782612,8.25001388 8.93745398,8.25001388 L9.62495514,8.25001388 C10.004583,8.25001388 10.3124563,7.94214059 10.3124563,7.56251273 L10.3124563,6.4008439 C10.5238595,6.15914428 10.6562069,5.84655029 10.6562069,5.5 L10.6562069,4.46875752 C10.6562069,4.05583301 10.4703583,3.689528 10.1820392,3.43750578 L10.6132381,3.43750578 C10.7316121,3.43750578 10.8347331,3.35693924 10.863309,3.24221584 L10.9922155,2.72658998 C11.0328345,2.56394627 10.9097187,2.40625405 10.7419347,2.40625405 L9.4556605,2.40625405 L9.09816745,1.51251094 C8.73077143,0.593611762 7.85400184,1.13686838e-13 6.86420831,1.13686838e-13 L4.13568809,1.13686838e-13 C3.14612534,1.13686838e-13 2.26912497,0.593611762 1.90151914,1.51251094 L1.54402609,2.40625405 L0.257961686,2.40625405 C0.090177666,2.40625405 -0.0329380807,2.56394627 0.00789069282,2.72658998 L0.13679716,3.24221584 C0.165373105,3.35693924 0.268494082,3.43750578 0.386868152,3.43750578 L0.818066998,3.43750578 C0.52953807,3.689528 0.343689521,4.05583301 0.343689521,4.46875752 L0.343689521,5.5 C0.343689521,5.84634048 0.476036851,6.15893447 0.6874401,6.4008439 L0.6874401,7.56251273 C0.6874401,7.94214059 0.99531339,8.25001388 1.37494126,8.25001388 L2.06244241,8.25001388 Z M8.24994357,3.09375521 L2.74994357,3.09375521 L3.17812117,2.02318532 C3.33474337,1.63174522 3.71395162,1.37500231 4.13568809,1.37500231 L6.86420831,1.37500231 C7.28594478,1.37500231 7.66515303,1.63174522 7.82177523,2.02318532 L8.24994357,3.09375521 Z M2.06244241,5.49570818 C1.64993752,5.49570818 1.37494126,5.22157213 1.37494126,4.81036805 C1.37494126,4.39914299 1.64993752,4.12500694 2.06244241,4.12500694 C2.4749473,4.12500694 3.09369415,4.74182355 3.09369415,5.15302762 C3.09369415,5.56425268 2.4749473,5.49570818 2.06244241,5.49570818 Z M7.90620225,5.15302762 C7.90620225,4.74182355 8.52494909,4.12500694 8.93745398,4.12500694 C9.34995887,4.12500694 9.62495514,4.39914299 9.62495514,4.81036805 C9.62495514,5.22157213 9.34995887,5.49570818 8.93745398,5.49570818 C8.52494909,5.49570818 7.90620225,5.56425268 7.90620225,5.15302762 Z" id="vehicle" fill="#000000" fillRule="nonzero"></path>
                                        </svg>
                                    </div>
                                    <div className="icoTxt">
                                        <span id="FIELD_DRIV">{data.driving_license}</span>
                                    </div>
                                </div>
                            )}

                            {data.website && (
                                <div className="iconRow" dependency="WEB1">
                                    <div className="iconSvg">
                                        <svg width="11px" height="12px" viewBox="0 0 11 12">
                                            <path d="M4.86605535,7.84926914 L5.31838084,7.39690168 C5.49778783,7.21751567 5.57820732,6.98357953 5.56971009,6.75654608 C5.56605942,6.66110433 5.49919355,6.53977224 5.42045253,6.48572565 C5.35788773,6.44263105 5.27780394,6.3809894 5.19828663,6.30161896 C4.595151,5.69848333 4.59261232,4.71953925 5.19828663,4.11386494 L6.64203979,2.67032158 C7.24872118,2.06364019 8.23832352,2.06729085 8.84043109,2.68129455 C9.43662207,3.28929773 9.41773933,4.26971047 8.81561078,4.87183902 L8.53444681,5.15300299 C8.44097726,5.24645156 8.41049213,5.38482007 8.45316711,5.50988673 C8.57915694,5.87929603 8.64742853,6.26181834 8.66135979,6.64257826 C8.6722908,6.94134514 9.036329,7.08183271 9.24775273,6.87042997 L10.04494,6.07324273 C11.3183498,4.8001056 11.3183498,2.72814472 10.0449609,1.4549866 C8.77178185,0.181765545 6.70007274,0.181597699 5.42668384,1.4549866 L3.98293067,2.89873977 C3.98035003,2.90129943 3.97755958,2.90411086 3.97520973,2.90667052 C2.716948,4.17193985 2.69930313,6.23204656 3.98293067,7.51701688 C4.09563964,7.62970486 4.29315308,7.79522255 4.42382162,7.88644715 C4.5613509,7.98245539 4.74745077,7.96785273 4.86605535,7.84926914 Z M5.57331879,10.5450527 L7.02479289,9.09336882 L7.02479289,9.09336882 C8.28307561,7.82809949 8.3006995,5.76799278 7.01707195,4.48302246 C6.90436299,4.37033448 6.70684955,4.20481679 6.57616002,4.1135712 C6.43863074,4.01756297 6.25255185,4.03214464 6.1339263,4.15074922 L5.6816008,4.60311668 C5.50219381,4.78250269 5.42177432,5.01643883 5.43027156,5.24347228 C5.43392222,5.33891403 5.50078809,5.46024611 5.57952911,5.51429271 C5.64209391,5.55738731 5.7221777,5.61902896 5.80169501,5.6983994 C6.40483064,6.30153503 6.40736932,7.28047911 5.80169501,7.88615342 L4.35794185,9.32969678 C3.75123948,9.93637817 2.76163714,9.9327275 2.15955055,9.31872381 C1.56335957,8.71072063 1.58226329,7.73030789 2.18437086,7.12817934 L2.46553483,6.84701537 C2.55900438,6.7535668 2.58948952,6.61519829 2.54681453,6.49011064 C2.4208247,6.12072233 2.35255312,5.73820002 2.33862185,5.3574401 C2.32771182,5.05867322 1.96365264,4.91816467 1.75222891,5.12958839 L0.955041679,5.92677563 C-0.318347226,7.19993374 -0.318347226,9.27189462 0.955041679,10.5450527 C2.22822078,11.8182738 4.29992988,11.8184416 5.57331879,10.5450527 Z" id="link" fill="#000000" fillRule="nonzero"></path>
                                        </svg>
                                    </div>
                                    <div className="icoTxt">
                                        <span id="FIELD_WEB1">{data.website}</span>
                                    </div>
                                </div>
                            )}

                            {data.linkedin && (
                                <div dependency="SOCL" className="social-link">
                                    <div id="CATEGORY_SOCIAL_SOCL" className="iconRow">
                                        <div className="iconSvg social">
                                            <span id="DOCDATAICON_SOCL"><svg xmlns="http://www.w3.org/2000/svg" className="linkedin" version="1.1" viewBox="0 0 30 30">
                                                <path className="svg-circlebg" fill="transparent" stroke="transparent" d="M29.9,15h0c0,8.2-6.7,14.9-14.9,14.9h0C6.8,29.9.1,23.2.1,15H.1C.1,6.8,6.8.1,15,.1h0c8.2,0,14.9,6.7,14.9,14.9Z"></path>
                                                <rect className="svg-sqrbg" fill="transparent" stroke="transparent" x=".1" y=".1" width="29.8" height="29.8"></rect>
                                                <path className="svg-sqrbdr" fill="transparent" stroke="transparent" d="M28.7,1.3v27.4H1.3V1.3h27.4M29.9.1H.1v29.8h29.8V.1h0Z"></path>
                                                <path className="svg-circlebdr" fill="transparent" stroke="transparent" d="M15,1.3c7.5,0,13.7,6.1,13.7,13.7s-6.1,13.7-13.7,13.7S1.3,22.5,1.3,15,7.5,1.3,15,1.3M15,.1h0C6.8.1.1,6.8.1,15H.1c0,8.2,6.7,14.9,14.9,14.9h0c8.2,0,14.9-6.7,14.9-14.9h0C29.9,6.8,23.2.1,15,.1h0Z"></path>
                                                <path className="svg-inricon fillwht" d="M10.7,8.6c0,1.2-1,2.1-2,2.1s-2.1-1-2.1-2.1,1-2.1,2.1-2.1,2,1,2,2.1ZM10.3,12.1h-3.4v11.3h3.5v-11.3s-.1,0,0,0ZM16,12.1h-3.4v11.3h3.4v-5.9c0-1.6.7-2.5,2.1-2.5s1.9,1,1.9,2.5v5.9h3.5v-7.1c0-3-1.7-4.5-4.1-4.5s-3.4,1.9-3.4,1.9v-1.7h0Z"></path>
                                                <path fill="transparent" stroke="transparent" className="radius-stroke" d="M25.8,1c1.7,0,3.1,1.4,3.1,3.1v21.7c0,1.7-1.4,3.1-3.1,3.1H4.1c-1.7,0-3.1-1.4-3.1-3.1V4.1c0-1.7,1.4-3.1,3.1-3.1h21.7M25.9,0h-.1.1ZM25.8,0H4.1C1.8,0,0,1.8,0,4.1v21.7c0,2.3,1.8,4.1,4.1,4.1h21.7c2.3,0,4.1-1.8,4.1-4.1V4.1C29.9,1.8,28.1,0,25.8,0h0Z"></path>
                                                <path fill="transparent" stroke="transparent" className="square-fill svg-inriconobj fillwht" d="M0,0v30h30V0H0ZM10.4,23.5h-3.5v-11.3h3.5v11.3ZM8.6,10.8c-1.2,0-2.1-1-2.1-2.1s1-2.1,2.1-2.1,2,1,2,2.1-1,2.1-2,2.1ZM23.5,23.5h-3.5v-5.9c0-1.6-.6-2.5-1.9-2.5s-2.1,1-2.1,2.5v5.9h-3.4v-11.3h3.4v1.7s1-1.9,3.4-1.9,4.1,1.5,4.1,4.5v7.1h0Z"></path>
                                                <path fill="transparent" stroke="transparent" className="svg-radius-fill-inriconobj fillwht" d="M27.4,0H2.6C1.2,0,0,1.1,0,2.6v24.8c0,1.4,1.2,2.6,2.6,2.6h24.8c1.4,0,2.6-1.2,2.6-2.6V2.6C30,1.1,28.9,0,27.4,0ZM10.4,23.4h-3.5v-11.3h3.5v11.3ZM8.7,10.7c-1,0-2.1-1-2.1-2.1s1-2.1,2.1-2.1,2,1,2,2.1-1,2.1-2,2.1ZM23.5,23.4h-3.5v-5.9c0-1.5-.5-2.5-1.9-2.5s-2.1.9-2.1,2.5v5.9h-3.4v-11.3h3.4v1.6s1-1.9,3.4-1.9,4.1,1.5,4.1,4.5v7.1Z"></path>
                                                <path fill="transparent" stroke="transparent" className="svg-circle-fill-inriconobj fillwht" d="M15,0C6.7,0,0,6.7,0,15s6.7,15,15,15,15-6.7,15-15S23.3,0,15,0ZM10.8,22.8h-3.2v-10.4h3.2v10.4ZM9.2,11.1c-1.1,0-1.9-.9-1.9-1.9s.9-1.9,1.9-1.9,1.9.9,1.9,1.9-.9,1.9-1.9,1.9ZM22.8,22.8h-3.2v-5.5c0-1.5-.6-2.3-1.8-2.3s-1.9.9-1.9,2.3v5.5h-3.1v-10.4h3.1v1.6s.9-1.8,3.1-1.8,3.8,1.4,3.8,4.1v6.5Z"></path>
                                            </svg></span>
                                        </div>
                                        <div className="icoTxt">
                                            <span id="FIELD_SOCL">{data.linkedin}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                <div className="clear"></div>
            </div></div></div></div></div></div></div><div data-testid="embd-89XOkPJ0" className="parent-wrapper"><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="29" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">PROFESSIONAL SUMMARY<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename PROFESSIONAL SUMMARY " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn" id="FIELD_FRFM"><p>{data.summary}</p></div>
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="29" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="29" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section expr-sec SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">Work history<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Work history " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">{data.experiences.map((exp, index) => (
                <div key={exp.id} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="29" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="29" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-998e66f0-eaa8-4a72-b41c-7158c85a1d86" id={`PARAGRAPH_EXPR_${exp.id}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                    <span className="dates_wrapper" dependency="JSTD|EDDT">
                        <span className="jobdates" id="FIELD_JSTD" format="%m/%Y">{formatDate(exp.start_date, language)}</span>
                        <span dependency="JSTD+EDDT" className="hyphen"></span>
                        <span className="jobdates" id="FIELD_EDDT" format="%m/%Y">{exp.currently_working ? t.present : formatDate(exp.end_date, language)}</span>
                    </span>
                    <div className="singlecolumn">
                        <span className="paddedline" dependency="JTIT|TEXP">
                            <span className="dflex texp-row">
                                <span className="jobtitle-cell" dependency="JTIT">
                                    <span className="jobtitle" id="FIELD_JTIT">{exp.job_title}</span>
                                </span>

                            </span>
                        </span>
                        <span className="paddedline" dependency="COMP|JCIT|JCNT|JCTR">
                            <span className="companyname" id="FIELD_COMP">{exp.company}</span><span dependency="COMP"><span dependency="JCIT|JCNT|JCTR" className="hyphen"></span></span>
                            <span id="FIELD_JCIT">{exp.location}</span><span className="joblocation jobcountry" id="FIELD_JCNT"></span><span id="FIELD_JCTR"></span>
                        </span>
                        <span className="paddedline">
                            <span className="jobline" id="FIELD_JDES"><ul>{exp.description.split('\n').map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}</ul></span>
                        </span>
                    </div>
                </div></div></div>
            ))}</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="29" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="29" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">SKILLS<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename SKILLS " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn maincolumn">
                    <table className="twocol skill">
                        <tbody><tr>
                            <td className="twocol_1" id="FIELD_SKC1"><ul>{skillsColumn1.map((skill) => (
                                <li key={skill.id}>{skill.name}</li>
                            ))}</ul></td>
                            <td className="twocol_2" id="FIELD_SKC2"><ul>{skillsColumn2.map((skill) => (
                                <li key={skill.id}>{skill.name}</li>
                            ))}</ul></td>
                        </tr>
                        </tbody></table>
                    <div className="multi-para-opt">
                        <div id="FIELD_PTTL" className="txt-bold"></div>
                        <div className="multi-para-content">
                            <div id="FIELD_SKC1"><ul>{skillsColumn1.map((skill) => (
                                <li key={skill.id}>{skill.name}</li>
                            ))}</ul></div>
                            <div id="FIELD_SKC2"><ul>{skillsColumn2.map((skill) => (
                                <li key={skill.id}>{skill.name}</li>
                            ))}</ul></div>
                        </div>
                    </div>
                </div>
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="29" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="29" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">EDUCATION<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename EDUCATION " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">{data.educations.map((edu, index) => (
                <div key={edu.id} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="29" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="29" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-e0037f47-0bb8-4767-a441-48042b09746f" id={`PARAGRAPH_EDUC_${edu.id}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                    <span className="dates_wrapper" dependency="GRST|GRED">
                        <span className="jobdates" id="FIELD_GRST" format="%m/%Y">{formatDate(edu.start_date, language)}</span>
                        <span dependency="GRST+GRED" className="hyphen"></span>
                        <span className="jobdates" id="FIELD_GRED" format="%m/%Y">{edu.currently_studying ? t.present : formatDate(edu.end_date, language)}</span>
                    </span>
                    <div className="singlecolumn">
                        <span className="paddedline" dependency="STUY|DGRE">
                            <span className="degree" id="FIELD_DGRE">{edu.degree || ''}</span><span dependency="DGRE+STUY"><span className="beforecolonspace"> </span><span>: </span></span>
                            <span className="programline" id="FIELD_STUY">{edu.field_of_study}</span>
                        </span>
                        <span className="paddedline" dependency="SCIT|SCHO|SCNT|GRHN">
                            <span className="companyname companyname_educ" dependency="SCHO" id="FIELD_SCHO">{edu.institution}</span><span className="statesWrapper" dependency="SCHO"><span dependency="SCIT|SCNT|GRHN" className="hyphen"></span></span>
                            <span id="FIELD_SCIT">{edu.location}</span><span id="FIELD_SCNT"></span><span dependency="SCIT|SCNT"></span>
                            <span id="FIELD_GRHN"></span>
                        </span>


                        <span className="paddedline">
                            <span id="FIELD_FRFM">{edu.description || ''}</span>
                        </span>
                    </div>
                </div></div></div>
            ))}</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="29" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>

                    {/* Languages Section */}
                    {data.languages && data.languages.length > 0 && (
                        <div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="29" className="sortable-item section-container SortableItem-sibling data-LNGGsortable-item data-LNGG">
                            <div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG88bc36a1-247b-b72f-7918-a79948b8fc80" className="section lang-sec infobarsec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
                                <div data-testid="embd-88uQIHR-LNGG" className="doc-item">
                                    <div data-testid="embd-88ciQTv" className="heading">
                                        <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_LNGG">{t.languages}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Languages " className="ds-link ds-link-default rename-section text-rename"></span></div>
                                    </div>
                                    <div data-testid="embd-88aw0Ce-LNGG" className="">
                                        <div data-testid="embd-87S8HNi88bc36a1-247b-b72f-7918-a79948b8fc80" id="CONTAINER_88bc36a1-247b-b72f-7918-a79948b8fc80" className="sortableInner">
                                            {data.languages.map((lang, index) => (
                                                <div key={lang.id} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="29" className="data-LNGG sortable-item paragraph-container SortableItem-sibling">
                                                    <div data-testid={`embd-79HRa2m-${lang.id}`} id={`PARAGRAPH_LNGG_${lang.id}`} className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}>
                                                        <div data-testid="embd-78FzR29" className="clearfix doc-item">
                                                            <div className="singlecolumn infobarpara">
                                                                <div className="field">
                                                                    <span className="txt-bold" id="FIELD_FRFM">{lang.name}</span>
                                                                    <span dependency="FRFM" className="colon"><span className="beforecolonspace"> </span><span>: </span></span>
                                                                    <span className="flt-right" id="FIELD_RATG"></span>
                                                                </div>
                                                                <div className="rating-bar" dependency="RATV">
                                                                    <div className="inner-rating" id="FIELD_RATV" type="width" style={{ width: getLevelWidth(lang.level) }}></div>
                                                                </div>
                                                                <div className="field field-ratt">
                                                                    <span id="FIELD_RATT">{getProficiencyLabel(lang.proficiency, t)}</span>
                                                                </div>
                                                                <div className="field">
                                                                    <span id="FIELD_ADIF"></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button data-testid="embd-87enKtK-LNGG" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="29" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="29" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button>
                        </div>
                    )}

                </div></div><div></div></div></div>
        </>
    );
}
