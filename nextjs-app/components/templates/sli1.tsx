/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations, formatDate } from "@/lib/translations";

const defaultTranslations = translations.en;

export default function TemplateSli1({
  data = sampleData,
  translations: t = defaultTranslations,
  language = "en",
  colorHex = "#009bcc",
}: Partial<DynamicTemplateProps> = {}) {
  // Helper function to get width percentage from language level
  const getLevelWidth = (level: number | undefined) => {
    if (!level) return '60%';
    return `${(level / 5) * 100}%`;
  };

  // Helper function to get proficiency label
  const getProficiencyLabel = (proficiency: string | undefined) => {
    if (!proficiency) return '';
    const labels: Record<string, string> = {
      native: 'Native',
      fluent: 'Fluent',
      advanced: 'Advanced',
      intermediate: 'Intermediate',
      beginner: 'Beginner',
    };
    return labels[proficiency] || proficiency;
  };

  // Split skills into two columns
  const midpoint = data.skills ? Math.ceil(data.skills.length / 2) : 0;
  const skillsCol1 = data.skills?.slice(0, midpoint) || [];
  const skillsCol2 = data.skills?.slice(midpoint) || [];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Saira:300,400,500,600,700,900');
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{background:#FFF;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-sli1 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        /*START content disc style for LI*/
        .skn-sli1 ul,.skn-sli1 li{list-style:none;margin:0 0 0 8px;padding:0}
        .skn-sli1 ul li{position:relative;margin:0}
        .skn-sli1 ul li:before{content:'\\2022';position:absolute;left:-8px;top:0;font-family:'Century Gothic'}
        .skn-sli1 .skli-sec ul li:before,.skn-sli1 .lang-sec ul li:before{left:-10px}
        /*END content disc style for LI*/

        .skn-sli1 .txt-bold{font-weight:bold}
        .skn-sli1 .skli-name-normalwgt .txt-bold{font-weight:400}
        .skn-sli1 .dispBlock{display:block}
        .skn-sli1 .flt-right{float:right}

        /*PICT variations*/
        .skn-sli1.pict-pcpf-none .pict-sec{display:none}
        .skn-sli1.pict-pcpf-fnln .prfl-pic,.skn-sli1 .monogram{display:none}
        .skn-sli1.pict-pcpf-fnln .monogram{display:block}

        /*Document*/
        .skn-sli1{color:#020303;background-color:#FFF!important;padding-bottom:30px;word-wrap:break-word;text-size-adjust:none; -ms-text-size-adjust:none;-moz-text-size-adjust:none;-webkit-text-size-adjust:none}
        .skn-sli1 .paddedline,.skn-sli1 .jobline{display:block}
        .skn-sli1 .datesWrapper{float:right}
        .skn-sli1 .jobtitle{font-weight:600;text-transform:uppercase}
        .skn-sli1 .degree{font-weight:500}
        .skn-sli1 .sprtr{margin:0 3px}
        .skn-sli1 .field-listing{margin-top:3px;display:block}
        .skn-sli1 .SECTION_CNTC.pt-20{padding-top:20px !important;text-align:center}
        .skn-sli1 .section{clear:both;border-top:2px solid;margin:25px 30px 0;padding-top:7px!important}
        .skn-sli1 .section:empty{display:none}
        .skn-sli1 .section:not(.lang-sec):not(.skli-sec):after{content:"";display:table;clear:both}
        .skn-sli1 .SECTION_NAME,.skn-sli1 .SECTION_CNTC{margin:0;padding:0 30px;background:${colorHex};border:1px solid ${colorHex};clear:inherit;overflow:inherit;margin-left:0;margin-right:0}
        .skn-sli1 .name{letter-spacing:.5px;font-size:15px;line-height:17px;font-weight:700;padding:0;text-transform:uppercase;text-align:center;color:#fff}
        .skn-sli1 .resumeTitle{color:#fff;line-height:28px;text-align:center;text-transform:uppercase}
        .skn-sli1 .heading{clear:both;font-weight:600;float:left;text-align:left;width:125px}
        .skn-sli1 .address{position:relative;text-align:center;font-size:0.917em;line-height:1.25em;margin:0;color:#fff;padding-bottom:5px}
		.skn-sli1 .social .field a{color:#fff;text-decoration:underline}
		.skn-sli1 .social .field a:hover{text-decoration:underline}


        .skn-sli1 .sectiontitle{letter-spacing:.12px;text-transform:uppercase;text-align:left}
        .skn-sli1 .jobdates,.skn-sli1 .companyname,.skn-sli1 .fwt600{font-weight:600}
        .skn-sli1 .experience .jobdates,.skn-sli1 .SECTION_HILT .singlecolumn table,.skn-sli1 .SECTION_TPFL .singlecolumn table{font-weight:500}
        .skn-sli1 .jobcity,.skn-sli1 .singlecolumn{font-weight:500}
        .skn-sli1 .SECTION_CNTC + .section{margin-top:25px!important}
        .skn-sli1 .section.SECTION_CNTC .firstparagraph,.skn-sli1 .section.SECTION_NAME .firstparagraph{margin-left:0;border-bottom: none!important}
        .skn-sli1 .section::nth-last-child(1){background:#ccc}
        .skn-sli1 .address > .fieldWrapper{position:relative;display:inline-block;padding-bottom:5px}
        .skn-sli1 .address > .fieldWrapper:before{content:"\\25A0";width:5px;height:5px;font-size:10px;padding:0 7px;color:#2a5978;position:relative;top:-1px}
        .skn-sli1 .address > .fieldWrapper:last-child:after{content:"\\25A0";font-size:10px;padding:0 8px;color:#2a5978}
        .skn-sli1 .paragraph{position:relative;margin-left:133px}
        .skn-sli1 .inHeader + .section,.skn-sli1 [id^="SECTION_PICT"] + .section,.skn-sli1 [id^="SECTION_PRFL"]+ .section{border-top:none}

        /*Personal details section*/
        .skn-sli1 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-sli1 .details-wrap{width:49%;margin-bottom:5px}
        .skn-sli1 .pdet-sec .details-wrap:last-child,.skn-sli1 .pdet-sec .details-wrap:nth-last-child(2){margin-bottom:0}

        /*New logic for infographic*/
        .skn-sli1 .lang-sec .singlecolumn,.skn-sli1 .skli-sec .singlecolumn{display:none}
        .skn-sli1 .lang-sec.infobarsec .infobarpara,.skn-sli1 .lang-sec.infotilesec .infotilepara,.skn-sli1 .skli-sec.infobarsec .infobarpara,.skn-sli1 .skli-sec.infotilesec .infotilepara{display:block}

        /*Infographic*/
        .skn-sli1 .lang-sec.infobarsec,.skn-sli1 .skli-sec.infobarsec{display:flex;flex-wrap:wrap;justify-content:space-between;position:relative}
        .skn-sli1 .lang-sec .paragraph,.skn-sli1 .skli-sec .paragraph{width:48.2%}
        .skn-sli1 .lang-sec .heading, .skn-sli1 .skli-sec .heading{position:absolute;left:auto}
        .skn-sli1 .lang-sec.infobarsec .field p,.skn-sli1 .skli-sec.infobarsec .field p,.skn-sli1 .lang-sec.infobarsec .nativeLangPara .field{display:inline}
        .skn-sli1 .lang-sec.infobarsec .paragraph,.skn-sli1 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0;padding-top: 0!important;}
        .skn-sli1 .lang-sec.infobarsec .singlecolumn,.skn-sli1 .skli-sec .singlecolumn{position:relative}
        .skn-sli1 .lang-sec .nativeLangPara{width:100%!important}
        .skn-sli1 .lang-sec.infobarsec .inner-rating,.skn-sli1 .skli-sec.infobarsec .inner-rating{position:relative}
        .skn-sli1 .lang-sec.infobarsec .rating-bar,.skn-sli1 .skli-sec.infobarsec .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px}
        .skn-sli1 .lang-sec.infobarsec .inner-rating,.skn-sli1 .skli-sec.infobarsec .inner-rating{background-color:#fcc74a;height:4px;width:60%}
        .skn-sli1 .lang-sec.infobarsec > .paragraph:nth-last-child(1),.skn-sli1 .lang-sec.infobarsec > .paragraph:nth-last-child(2),.skn-sli1 .skli-sec.infobarsec.infobarsec > .paragraph:nth-last-child(1),.skn-sli1 .skli-sec.infobarsec.infobarsec > .paragraph:nth-last-child(2){padding-bottom:0!important}
        .skn-sli1 .para_even .singlecolumn{margin-left: 0px!important}
        .skn-sli1 .skli-sec .paragraph,.skn-sli1 .lang-sec .paragraph{padding-top: 0px!important;}

        .skn-sli1 .skli-sec .paragraph:last-child .singlecolumn  .field:last-child{min-height:0}
		.skn-sli1 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-sli1 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}

        /*Infographic Tiles*/
        .skn-sli1 .lang-sec.infotilesec,.skn-sli1 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-sli1 .lang-sec.infotilesec .paragraph,.skn-sli1 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px!important;margin-top:0}
        .skn-sli1 .lang-sec.infotilesec > .paragraph:nth-last-child(1),.skn-sli1 .lang-sec.infotilesec > .paragraph:nth-last-child(2),.skn-sli1 .skli-sec > .paragraph:nth-last-child(1),.skn-sli1 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0!important}
        .skn-sli1 .lang-sec.infotilesec .field p,.skn-sli1 .skli-sec .field p,.skn-sli1 .lang-sec.infotilesec .nativeLangPara .field{display:inline}
        .skn-sli1 .lang-sec.infotilesec .sliced-rect,.skn-sli1 .skli-sec .sliced-rect{height:6px;width:100%;margin-top:3px;line-height:0px;clear:both}
        .skn-sli1 .lang-sec.infotilesec .sliced-rect .sliced-rect-tile,.skn-sli1 .skli-sec .sliced-rect .sliced-rect-tile{height:100%;background-color:#d5d6d6;float:left;margin-right:3px}
        .skn-sli1 .lang-sec.infotilesec .sliced-rect .sliced-rect-tile:last-child,.skn-sli1 .skli-sec .sliced-rect .sliced-rect-tile:last-child{margin-right:0}

        /*Rectangular Rating Blocks*/
        .skn-sli1 .sliced-rect .sliced-rect-tile.ratvfill{background-color:${colorHex}}
        .skn-sli1 .hide-bar .rating-bar,.skn-sli1 .hide-bar .sliced-rect,.skn-sli1 .hide-colon .no-colon,.skn-sli1 .hide-only-bar .rating-bar,.skn-sli1 .lang-sec.hide-only-bar .rating-bar,.skn-sli1 .lang-sec.hide-only-bar.infotilesec .sliced-rect{display:none!important}

        .skn-sli1 .nativeLangPara .field:first-child{font-weight:bold}

        /*MUK colon*/
        .skn-sli1 .mukcolon{display:none}
        .skn-sli1.MUK .mukcolon{display:inline!important}
        .skn-sli1.MUK .colon{display:none!important}

        /* GRYR */
        .skn-sli1 .displayNoneThisField{display:none}/* Keep this class always at bottom */

        /*Finalize Page*/
        .skn-sli1.MUK table,.skn-sli1.LCA table,.skn-sli1.MPR table{table-layout: fixed}
        .page-choose-template .skn-sli1.MUK .SECTION_LNGG{display:block}

        /* Builder css for mobile device */
        .android .skn-sli1, .ios .skn-sli1{box-sizing:content-box}

        /*HILT multi para/section*/
        .skn-sli1 .multi-para-hilt{position:relative;font-size:0}
        .skn-sli1 .multi-para-hilt:after{content: "";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/
        .skn-sli1 .multi-para-hilt .paragraph{margin-bottom:10px;margin-top:0;width:49%;vertical-align:top;display:inline-block;margin-left:0}
        .skn-sli1 .multi-para-hilt .paragraph:last-child,.skn-sli1 .multi-para-hilt .paragraph:nth-last-child(2):nth-child(2n){margin-bottom:0}
        .skn-sli1 .multi-para-hilt .paragraph:nth-child(2n+1){margin-left:2%}
        .skn-sli1 .multi-para-hilt .singlecolumn{width:100%!important;margin-left:0!important}
        .skn-sli1 .multi-section-hilt .multi-para-opt,.skn-sli1 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-sli1 .multi-para-hilt .twocol.skill{display:none}

        /*HILT multi para - For PDF*/
        .skn-sli1.for-pdf .multi-para-hilt{display:block}
        .skn-sli1.for-pdf .multi-para-hilt .pdfparawrapper:after{content:'';clear:both;display:table}
        .skn-sli1.for-pdf .multi-para-hilt .pdfparawrapper .paragraph:first-child{float:left;margin-left:0}
        .skn-sli1.for-pdf .multi-para-hilt .pdfparawrapper .paragraph:nth-child(2){float:right;margin-left:2%}
        .skn-sli1.for-pdf .multi-para-hilt .pdfparawrapper .paragraph{margin-bottom:10px}
        .skn-sli1.for-pdf .multi-para-hilt .pdfparawrapper .paragraph:nth-child(2n){clear:none}
        .skn-sli1.for-pdf .multi-para-hilt .pdfparawrapper:last-child .paragraph{margin-bottom:0}

        .skn-sli1 .mexp .companyname{font-weight:bold}
        .skn-sli1 .mexp .jobtitle{font-weight:500;text-transform:uppercase}

        /*Pagination Parameters*/
        .skn-sli1{data-noofpasses:2}

        /*Paginated HTML PDF*/
        .skn-sli1.for-paginated-pdf{background-color:transparent!important}
        .skn-sli1.for-paginated-pdf .inf-sec,.skn-sli1.for-paginated-pdf .inf-sec .sortableInner,.skn-sli1.for-paginated-pdf .inf-sec .paragraph,.skn-sli1.for-paginated-pdf .inf-sec .paginatedpdfinfwrapper{display:block!important}
		.skn-sli1.for-paginated-pdf .inf-sec .paginatedpdfinfwrapper .paragraph-container,.skn-sli1.for-paginated-pdf .inf-sec .paginatedpdfinfwrapper > .paragraph{display:block!important;float:left}
		.skn-sli1.for-paginated-pdf .inf-sec .paginatedpdfinfwrapper .paragraph-container + .paragraph-container,.skn-sli1.for-paginated-pdf .inf-sec .paginatedpdfinfwrapper > .paragraph + .paragraph{float:right}
		.skn-sli1.for-paginated-pdf .inf-sec .paginatedpdfinfwrapper > .paragraph{clear:none!important}
        .skn-sli1.for-paginated-pdf .inf-sec .paginatedpdfinfwrapper:after{content:'';display:table;clear:both}
        .skn-sli1.for-paginated-pdf .inf-sec .paragraph{width:calc(100% - 15px)!important}
        .skn-sli1.for-paginated-pdf .inf-sec .sortable-item{width:50%!important}
        .skn-sli1.for-paginated-pdf .lang-sec .heading{position:static}

        /*Paginated - First pass CSS*/
        .skn-sli1.for-paginated-pdf.pdf-pass-1 .parent-wrapper{display:none!important}
        .skn-sli1.for-paginated-pdf.pdf-pass-1{margin-top:0!important}

        /*Paginated - Second pass CSS*/
        .skn-sli1.for-paginated-pdf.pdf-pass-2 .section-container.name-contact{visibility:hidden}

        /*For Iron PDF*/
        .skn-sli1.for-iron-pdf{margin-top:-30px}

        /* Duration tag */
        .skn-sli1 .totl-expr{display:inline-block;float:right; padding:0 6px;color:#fff;font-weight:600;vertical-align:top;text-wrap:nowrap;margin-left:5px}
        .skn-sli1.texp-curved .totl-expr{border-radius:10px}
        .skn-sli1 .dflex{display:flex;justify-content:space-between}

        /* for-pdf changes */
        .skn-sli1.for-pdf.texp-curved .dflex,.skn-sli1.for-pdf.texp-rectangle .dflex{display:block}
        .skn-sli1.for-pdf.texp-curved .experience .dflex > span:first-child,.skn-sli1.for-pdf.texp-rectangle .experience .dflex > span:first-child{display:inline-block;width:72%}
        .skn-sli1.for-pdf.texp-curved .experience .dflex > span:last-child,.skn-sli1.for-pdf.texp-rectangle .experience .dflex > span:last-child{display:inline-block;width:28%;float:right}

        .skn-sli1.for-iron-pdf .sliced-rect, .skn-sli1 .rating-bar{page-break-inside:avoid}


        .skn-sli1,.skn-sli1 table{line-height:14px}
        .skn-sli1.pagesize{width:595px}
        .skn-sli1{min-height:762px}
        .skn-sli1.pgsz-a4{min-height:812px}
        .skn-sli1.fontsize,.skn-sli1 .lang-sec.infobarsec .paragraph *,.skn-sli1 .lang-sec.infotilesec .paragraph *,.skn-sli1 .skli-sec .paragraph *,.skn-sli1 .multi-para-hilt .paragraph *{font-size:10px}
        .skn-sli1.fontface{font-family:Saira}
        .skn-sli1 .section{border-color:${colorHex};margin-top:25px}
        .skn-sli1 .skli-sec{margin-bottom:25px}
        .skn-sli1 .SECTION_NAME,.skn-sli1 .SECTION_CNTC{margin-top:0!important;background:${colorHex};border-color:${colorHex}}
        .skn-sli1 .SECTION_NAME{padding-top:42px!important}
        .skn-sli1 .heading{color:${colorHex}}
        .skn-sli1 .paragraph{margin-top:10px}
        .skn-sli1 .singlecolumn, .skn-sli1 .maincolumn{margin-left:0px}
        .skn-sli1 .firstparagraph{margin-top:0!important}
        .skn-sli1 .sectiontitle{font-size:12px;line-height:14px}
        .skn-sli1 table.skills td{padding-top:5px}
        .skn-sli1 .name{font-size:40px;line-height:40px}
        .skn-sli1 .resumeTitle{font-size:17px;line-height:17px}
        .skn-sli1 .address{font-size:10px;line-height:12px}
        .skn-sli1 .jobline{padding-top:5px}
        .skn-sli1 ul li{padding-left:0px}
        .skn-sli1 .lang-sec .heading,.skn-sli1 .skli-sec .heading{margin-left:-0px}
        .skn-sli1 .lang-sec .paragraph,.skn-sli1 .skli-sec .paragraph{margin-left:0}
        .skn-sli1 .totl-expr{background-color:${colorHex};font-size:8px;line-height:12px}

        /*Infographic*/
        .skn-sli1 .lang-sec.infobarsec .inner-rating,.skn-sli1 .skli-sec.infobarsec .inner-rating{background-color:${colorHex}}
        .skn-sli1 .lang-sec.infobarsec{padding-left:133px}
        .skn-sli1 .lang-sec.infobarsec .heading{margin-left:-133px}
        .skn-sli1 .lang-sec .singlecolumn,.skn-sli1 .lang-sec .maincolumn,.skn-sli1 .skli-sec .singlecolumn,.skn-sli1 .skli-sec .maincolumn{margin-left:0}
        .skn-sli1 .hide-bar .field-ratt{display:none}

        /*Infographic Skills*/
        .skn-sli1 .lang-sec.infotilesec,.skn-sli1 .skli-sec{padding-left:133px}
        .skn-sli1 .lang-sec.infotilesec .heading,.skn-sli1 .skli-sec .heading,.skn-sli1 .multi-para-hilt .heading{margin-left:-133px}

        .skn-sli1 .skli-sec .singlecolumn .field:last-child{min-height:13px}

        /*Rectangular Rating Blocks*/
        .skn-sli1 .paragraph .sliced-rect .sliced-rect-tile.ratvfill{background-color:${colorHex}}

        /*FIX for Re-calculating width of singlecolumn for CL*/
        .skn-sli1 .sectionCL .singlecolumn{margin-left:0!important;width:100%}
        .skn-sli1 .address2{font-size:10px;line-height:14px}

        /*Builder team Fix for finalise page*/
        .skn-sli1 .experience .sortableInner,.skn-sli1 .education .sortableInner{margin-left:133px}
        .skn-sli1 .sortableInner .paragraph{margin-left:0}
        .skn-sli1 .name-contact + div > .section:first-of-type{border-top:none}
        .skn-sli1 .name-contact .section{margin-bottom:-2px;border-top:none}
        .page-finalize .skn-sli1 .data-LNGG .paragraph-container .paragraph{max-width:{$LGBW}px}
        .page-finalize .skn-sli1 .data-LNGG .paragraph-container .nativeLangPara{width:100%;max-width:100%}
        .page-finalize .skn-sli1 .lang-sec .sortableInner .paragraph-container{display:initial !important}
        .page-finalize .skn-sli1.MUK .data-LNGG.active .text-rename{margin-left:-133px}

        /* Builder fixes */
        .skn-sli1 .lang-sec .title-edit,.skn-sli1 .skli-sec .title-edit{margin-left:-133px}
		.skn-sli1 .sortable-item.name-contact + div .sortable-item:first-child .section{border-top:none}
        .skn-sli1 .SECTION_SKLI .sortableInner .sortable-item{display:inline-block}
        .skn-sli1 .SECTION_SKLI .sortableInner .sortable-item .para_odd{margin-right:15px}
        .skn-sli1 .data-LNGG .sortable-item.native-lang{width:100%;max-width:100%}
        .skn-sli1 .data-LNGG .doc-item,.skn-sli1 .data-SKLI .doc-item,.skn-sli1 .lang-sec .doc-item,.skn-sli1 .skli-sec .doc-item{width:100%}
        .skn-sli1 .data-LNGG .sortableInner,.skn-sli1 .data-SKLI .sortableInner,.skn-sli1 .SECTION_LNGG .sortableInner,.skn-sli1 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-sli1 .data-LNGG .sortable-item,.skn-sli1 .data-SKLI .sortable-item{width:48.2%}
        .skn-sli1 .data-LNGG .sortable-item .paragraph,.skn-sli1 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}

        /*Fixes for builder for skill*/
        .skn-sli1 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:13px}
        .skn-sli1 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-sli1 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}
        .skn-sli1 .skli-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-sli1 .skli-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph,.skn-sli1 .lang-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-sli1 .lang-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0!important}
        .skn-sli1.MUK .sortable-item.name-contact + div .sortable-item:first-child .section{border-top:2px solid ${colorHex}}

        /*HILT multi para*/
        .skn-sli1 .multi-para-hilt{padding-left:133px}

        /*PDF Flex Handling Code - Personal Information*/
		.skn-sli1.for-pdf .pdfpdwrapper{display:block}
		.skn-sli1.for-pdf .pdfpdwrapper .details-wrap:first-child{float:left;padding-right:5px}
		.skn-sli1.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){float:right}
		.skn-sli1.for-pdf .pdfpdwrapper .details-wrap{width:198px!important;}

    /*Infographic Containers*/
    .skn-sli1.for-pdf .lang-sec,.skn-sli1.for-pdf .skli-sec{display:block}
    .skn-sli1.for-pdf .pdfinfwrapper{display:block}
    .skn-sli1.for-pdf .pdfinfwrapper:after{content:'';clear:both;display:table}
    .skn-sli1.for-pdf .pdfinfwrapper .paragraph:first-child{float:left}
    .skn-sli1.for-pdf .pdfinfwrapper .paragraph:nth-child(2){float:right}
    .skn-sli1.for-pdf .pdfinfwrapper:last-child .paragraph{margin-bottom:0;padding-bottom:0!important}

    /*POC Multi Experience Para*/
    .skn-sli1 .groupChildPara.paragraph .singlecolumn .companyloc{display:none}

    .skn-sli1 .data-CERT.sortable-item .sortableInner .PARAGRAPH_CERT span,.modal-preview-resume .skn-sli1 .PARAGRAPH_CERT span,.skn-sli1 .cert-sec span p{display:inline-block}

    .skn-sli1.for-pdf{min-height:auto!important}

    /*Pagination Parameters*/
    .skn-sli1{data-ptbm:30px;data-pgsz:595px}
    `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pagesize skn-sli1 SLI1 MUK pgsz-a4 texp-none pict-pcpf-purl " docskinwidth="598" ><div data-testid="embd-91y4rV2" className="name-contact ">

{/* Name Section */}
<div data-testid="embd-88MByq6-NAME" id="SECTION_NAME1a1a32ad-f01c-4377-b2f6-1a65f9bf6cb8" className="section SECTION_NAME inHeader firstsection" data-section-cd="NAME"><div data-testid="embd-88uQIHR-NAME" className="doc-item"><div data-testid="embd-88aw0Ce-NAME" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-44bc0bd4-6d0c-480d-8f32-8d70df1621d0" id="PARAGRAPH_NAME_44bc0bd4-6d0c-480d-8f32-8d70df1621d0" className="paragraph PARAGRAPH_NAME firstparagraph"><div data-testid="embd-78blCsH">
                <div className="name">
                    <span id="FIELD_FNAM">{data.first_name}</span>
                    {data.first_name && data.last_name && <span dependency="FNAM+LNAM"> </span>}
                    <span id="FIELD_LNAM">{data.last_name}</span>
                </div>

            </div></div></div></div></div></div>

{/* Contact Section */}
<div data-testid="embd-88MByq6-CNTC" id="SECTION_CNTCd3d40c22-1b29-401e-a809-9cb7e72d6fdc" className="section SECTION_CNTC inHeader pt-20" data-section-cd="CNTC"><div data-testid="embd-88uQIHR-CNTC" className="doc-item"><div data-testid="embd-88aw0Ce-CNTC" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-3912838f-29f6-467c-8297-bf45ee1ff720" id="PARAGRAPH_CNTC_3912838f-29f6-467c-8297-bf45ee1ff720" className="paragraph PARAGRAPH_CNTC firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <span className="address">
                    {(data.street_address || data.city || data.postcode) && (
                    <span className="fieldWrapper" dependency="ADDR|STRT|CITY|STAT|ZIPC">
                        {data.street_address && <><span id="FIELD_STRT">{data.street_address}</span><span dependency="STRT"><span dependency="CITY|STAT">, </span></span></>}
                        {data.city && <span className="spaced" id="FIELD_CITY">{data.city}</span>}
                        {data.postcode && <> <span className="spaced" id="FIELD_ZIPC">{data.postcode}</span></>}
                    </span>
                    )}

                    {data.phone && (
                    <span className="fieldWrapper" dependency="HPHN|CPHN"><span id="FIELD_HPHN">{data.phone}</span></span>
                    )}
                    {data.email && (
                    <span className="fieldWrapper" dependency="EMAI"><span id="FIELD_EMAI">{data.email}</span></span>
                    )}

                    {data.nationality && (
                    <span dependency="NTLY" className="text-field fieldWrapper">
                        <span className="txt-bold"><span className="xslt_static_change">Nationality</span><span>: </span></span>
                        <span id="FIELD_NTLY">{data.nationality}</span>
                    </span>
                    )}
                    {data.driving_license && (
                    <span dependency="DRIV" className="fieldWrapper">
                        <span className="txt-bold"><span className="xslt_static_change">Permit</span><span>: </span></span>
                        <span id="FIELD_DRIV">{data.driving_license}</span>
                    </span>
                    )}

                    {data.website && (
                    <span dependency="WEB1" className="fieldWrapper">
                        <span className="txt-bold"><span className="xslt_static_change">Web</span><span>: </span></span>
                        <span className="brk-all" id="FIELD_WEB1">{data.website}</span>
                    </span>
                    )}

                    {data.linkedin && (
                    <span dependency="SOCL" id="CATEGORY_SOCIAL_SOCL" className="social fieldWrapper">
                        <span className="txt-bold docdatainfo">
                            <span id="DOCDATAINFO_SOCL">LinkedIn</span><span>: </span>
                        </span>
                        <span className="field brk-all" id="FIELD_SOCL">{data.linkedin}</span>
                    </span>
                    )}
                </span>

            </div></div></div></div></div></div><div></div></div><div data-testid="embd-89XOkPJ0" className="parent-wrapper">

{/* Professional Summary Section */}
{data.summary && (
<div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="25" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section summary SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">{t.summary || 'PROFESSIONAL SUMMARY'}</div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn" id="FIELD_FRFM"><p>{data.summary}</p></div>
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="25" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>
)}

{/* Work Experience Section */}
{data.experiences && data.experiences.length > 0 && (
<div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="25" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section experience SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">{t.experience || 'Work history'}</div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">
  {data.experiences.map((exp, index) => (
    <div key={exp.id || index} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="25" className="sortable-item paragraph-container SortableItem-sibling">
      <div data-testid={`embd-79HRa2m-${exp.id}`} id={`PARAGRAPH_EXPR_${exp.id}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}>
        <div data-testid="embd-78FzR29" className="clearfix doc-item">
          <div className="singlecolumn">
            {(exp.job_title || exp.start_date || exp.end_date || exp.currently_working) && (
              <span className="paddedline" dependency="JTIT|JSTD|EDDT|TEXP">
                <span className="dflex">
                  <span>
                    {exp.job_title && <span className="jobtitle txtCaps txt-bold" id="FIELD_JTIT">{exp.job_title}</span>}
                    {exp.start_date && <span className="jobdates" id="FIELD_JSTD">{formatDate(exp.start_date, language)}</span>}
                    {exp.start_date && (exp.end_date || exp.currently_working) && <span dependency="JSTD+EDDT">  to  </span>}
                    <span className="jobdates" id="FIELD_EDDT">{exp.currently_working ? (t.present || 'Current') : (exp.end_date ? formatDate(exp.end_date, language) : '')}</span>
                    <br dependency="JSTD|EDDT" />
                  </span>
                </span>
              </span>
            )}
            {(exp.company || exp.location) && (
              <span className="paddedline locationGap " dependency="COMP|JSTA|JCIT|JCNT|JLOC">
                {exp.company && <span className="companyname" id="FIELD_COMP">{exp.company}</span>}
                {exp.company && exp.location && <span dependency="COMP"><span dependency="JCIT|JSTA|JCNT|JLOC">, </span></span>}
                {exp.location && <span className="jobcity" id="FIELD_JCIT">{exp.location}</span>}
              </span>
            )}
            {exp.description && (
              <span className="jobline" id="FIELD_JDES">
                <ul>
                  {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                    <li key={i}>{line.trim()}</li>
                  ))}
                </ul>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="25" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>
)}

{/* Skills Section */}
{data.skills && data.skills.length > 0 && (
<div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="25" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">{t.skills || 'SKILLS'}</div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn maincolumn">
                    <table className="twocol skill">
                        <tbody><tr>
                            <td className="twocol_1" id="FIELD_SKC1">
                              <ul>
                                {skillsCol1.map((skill, i) => (
                                  <li key={skill.id || i}>{skill.name}</li>
                                ))}
                              </ul>
                            </td>
                            <td className="twocol_2" id="FIELD_SKC2">
                              <ul>
                                {skillsCol2.map((skill, i) => (
                                  <li key={skill.id || i}>{skill.name}</li>
                                ))}
                              </ul>
                            </td>
                        </tr>
                    </tbody></table>
                </div>
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="25" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>
)}

{/* Education Section */}
{data.educations && data.educations.length > 0 && (
<div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="25" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section education SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">{t.education || 'EDUCATION'}</div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">
  {data.educations.map((edu, index) => (
    <div key={edu.id || index} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="25" className="sortable-item paragraph-container SortableItem-sibling">
      <div data-testid={`embd-79HRa2m-${edu.id}`} id={`PARAGRAPH_EDUC_${edu.id}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}>
        <div data-testid="embd-78FzR29" className="clearfix doc-item">
          <div className="singlecolumn">
            {(edu.degree || edu.field_of_study || edu.end_date) && (
              <div className="paddedline" dependency="DGRE|STUY|GRYR|GRST|GRED|GRIP|GRHN">
                {edu.degree && <span className="degree txt-bold" id="FIELD_DGRE">{edu.degree}</span>}
                {edu.degree && edu.field_of_study && <span className="mukcolon" dependency="DGRE"><span dependency="STUY|GRYR|GRST|GRED|GRIP">: </span></span>}
                {edu.field_of_study && <span className="programline" id="FIELD_STUY">{edu.field_of_study}</span>}
                {(edu.end_date || edu.start_date) && (
                  <span dependency="GRST|GRED|GRIP|GRYR" className="jobdates">
                    {edu.end_date && <span id="FIELD_GRYR">{formatDate(edu.end_date, language)}</span>}
                  </span>
                )}
              </div>
            )}
            {(edu.institution || edu.location) && (
              <div className="paddedline" dependency="SCIT|SSTA|SCHO|SCNT">
                {edu.institution && <span className="companyname txt-bold" id="FIELD_SCHO">{edu.institution}</span>}
                {edu.institution && edu.location && <span dependency="SCHO"><span dependency="SCIT|SSTA|SCNT"> -  </span></span>}
                {edu.location && <span className="joblocation jobcity" id="FIELD_SCIT">{edu.location}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="25" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>
)}

{/* Languages Section */}
{data.languages && data.languages.length > 0 && (
<div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="25" className="sortable-item section-container SortableItem-sibling data-LNGG">
  <div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG88bc36a1-247b-b72f-7918-a79948b8fc80" className="section lang-sec infobarsec inf-sec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
    <div data-testid="embd-88uQIHR-LNGG" className="doc-item">
      <div data-testid="embd-88ciQTv" className="heading">
        <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_LNGG">{t.languages || 'LANGUAGES'}</div>
      </div>
      <div data-testid="embd-88aw0Ce-LNGG" className="">
        <div data-testid="embd-87S8HNi88bc36a1-247b-b72f-7918-a79948b8fc80" id="CONTAINER_88bc36a1-247b-b72f-7918-a79948b8fc80" className="sortableInner">
          {data.languages.map((lang, index) => (
            <div key={lang.id || index} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="25" className="sortable-item paragraph-container SortableItem-sibling data-LNGG">
              <div data-testid={`embd-79HRa2m-${lang.id}`} id={`PARAGRAPH_LNGG_${lang.id}`} className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}>
                <div data-testid="embd-78FzR29" className="clearfix doc-item">
                  <div className="singlecolumn infobarpara">
                    <div className="field">
                      <span id="FIELD_FRFM">{lang.name}</span><span className="no-colon" dependency="FRFM">:</span>
                      <span className="flt-right" id="FIELD_RATG"></span>
                    </div>
                    <div className="rating-bar" dependency="RATV">
                      <div className="inner-rating" id="FIELD_RATV" style={{ width: getLevelWidth(lang.level) }}></div>
                    </div>
                    <div className="field field-ratt">
                      <span id="FIELD_RATT">{getProficiencyLabel(lang.proficiency)}</span>
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
  <button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="25" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button>
</div>
)}

</div></div><div></div></div></div>
    </>
  );
}
