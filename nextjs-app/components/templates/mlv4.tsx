/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations as defaultTranslations, formatDate } from "@/lib/translations";

export default function TemplateMlv4({
  data = sampleData,
  translations: t = defaultTranslations,
  colorHex = '#F98C79',
}: Partial<DynamicTemplateProps> = {}) {
  const skills = data.skills || [];
  const midpoint = Math.ceil(skills.length / 2);
  const firstColumnSkills = skills.slice(0, midpoint);
  const secondColumnSkills = skills.slice(midpoint);

  return (
    <>
      <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800');
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}

        /*START content disc style for LI*/
        .skn-mlv4 ul,.skn-mlv4 li{list-style:none;margin:0 0 0 5px;padding:0}
        .skn-mlv4 p{margin:0 0 5px 0}
        .skn-mlv4 ul li{position:relative;margin:0 0 5px 0px;padding-left:10px}
        .skn-mlv4 .experience ul li,.skn-mlv4 .experience p{position:relative;margin:0 0 10px 0px}
        .skn-mlv4 li::before {content:"•";display:inline-block;width:2px;left:-3px;position:absolute;color:#5F5F5F}
        .skn-mlv4 .skill ul li:last-child{margin-bottom:0}
        .skn-mlv4 .skill .paddedline:first-child{margin-bottom:10px}
        /*END content disc style for LI*/

        .skn-mlv4 .paddedline{display:block}
        .skn-mlv4 .txt-bold{font-weight:bold}
        .skn-mlv4 .displayNoneThisField{display:none}
        .skn-mlv4 .flt-right{float:right}
        .skn-mlv4 .brk-all{word-break:break-all}
        .skn-mlv4 .sptr{padding:0 5px}

        /*Document TOP section*/
        .skn-mlv4 .top-section{display:flex}
        .skn-mlv4{color:#5D5D5D;line-height:12px;font-variant-ligatures:none;word-wrap:break-word;position:relative;min-height:792px;box-sizing:border-box}
        .skn-mlv4 .name-sec{flex-grow:1;position:relative;margin-bottom:0}
        .skn-mlv4 .name span{display:block}
        .skn-mlv4 .name{text-transform:uppercase;word-break:break-word;color:#F98C79;font-weight:bold;text-align:left;font-family:'Montserrat';}
        .skn-mlv4 .name-wrap{text-transform:uppercase;color:#fff;font-weight:500;font-family:'Montserrat';}
        .skn-mlv4 .prof-title{letter-spacing:0.81px;text-transform:uppercase;color:#5F5F5F;text-align:left;font-weight:800;font-family:'Montserrat'}

        /*PICT section*/
        .skn-mlv4 .prfl-pic .field,.skn-mlv4 .monogram{border-radius:50%;box-sizing:border-box}
        .skn-mlv4 .monogram .svg-box{background:#F98C79;display:flex;justify-content:center;align-items:center;border-radius:50%;box-sizing:border-box}
        .skn-mlv4 .monogram svg{width:inherit;height:inherit}
        .skn-mlv4 .monogram svg text{text-transform:uppercase;fill:#000}
        .skn-mlv4 .pcpf-fnln .prfl-pic,.skn-mlv4 .monogram{display:none}
        .skn-mlv4 .pcpf-fnln .monogram{display:block}
        .skn-mlv4 .prfl-pic img{width:100%;height:100%;border-radius:50%;object-fit:cover}
        .skn-mlv4 .pict-sec{order:0;position:relative;z-index:1;}

        /*Photo Layout styles*/
        .skn-mlv4.pict-pcsh-square .paragraph .prfl-pic img{border-radius:unset;border:1px solid #373737;box-sizing:border-box}
        .skn-mlv4.pict-pcsh-bottomleft .paragraph .prfl-pic img{border-radius:50%;border:1px solid #373737;border-bottom-left-radius:8px;box-sizing:border-box}
        .skn-mlv4.pict-pcsh-bottomright .paragraph .prfl-pic img{border-radius:50%;border:1px solid #373737;border-bottom-right-radius:8px;box-sizing:border-box}
        .skn-mlv4.pict-pcsh-radius .paragraph .prfl-pic img{border-radius:10px;border:1px solid #373737;box-sizing:border-box}
        .skn-mlv4.pict-pcsh-rectangle .paragraph .prfl-pic .field img{border-radius:unset;border:1px solid #373737}
        .skn-mlv4.pict-pcsh-rectangle .paragraph .prfl-pic{display:block;width:fit-content;margin:auto}

        /*Document Bottom section*/
        .skn-mlv4{flex-wrap:wrap;justify-content:space-between;position:relative}
        .skn-mlv4 .left-box::before,.skn-mlv4 .section.experience:before{content:"";position: absolute;width:1px;top:0;height:100%;background:#707070;right:0}
        .skn-mlv4.doc-pcpf-none .left-box::before,.skn-mlv4.pict-pcpf-none .left-box::before{width:1px}
        .skn-mlv4 .section.experience{position:relative}
        .skn-mlv4 .right-box,.skn-mlv4 .left-box{box-sizing:border-box}
        .skn-mlv4 .left-box{position:relative}

        /*Personal details section*/
        .skn-mlv4 .details-wrap{margin-bottom:10px}
        .skn-mlv4 .details-wrap:last-child{margin-bottom:0}
        /*Heading*/
        .skn-mlv4 .sectiontitle{letter-spacing:0.81px;text-transform:uppercase;background:#747674;color:#fff;font-weight:800;font-family:'Montserrat'}

        /*Address section*/
        .skn-mlv4 .social a{color:#5F5F5F;text-decoration:none}
		.skn-mlv4 .address{word-break:break-all;word-break:break-word;color:#5F5F5F} /* break-all for Firefox */
        .skn-mlv4 .address div:last-child{padding-bottom:0}

        /*Icon styles*/
        .skn-mlv4 .iconRow{display:table;table-layout:fixed;width:100%;padding-bottom:5px;word-wrap:break-word}
        .skn-mlv4 .iconRow:last-child{padding-bottom:0}
        .skn-mlv4 .iconSvg{width:8px;height:8px;display:table-cell;vertical-align:middle}
        .skn-mlv4 .iconSvg svg{vertical-align:middle;fill:#fff;width:8px;height:8px}
        .skn-mlv4 .icoTxt{display:table-cell;padding-left:11px}
        .skn-mlv4 .iconRow.phone .iconSvg svg{transform: scale(1.4)}
        .skn-mlv4 .iconRow.svg-avai .iconSvg svg{margin-bottom:3px}
        .skn-mlv4 .iconRow.phone .iconSvg svg{margin-bottom:2px}
        .skn-mlv4 .cntc-section .iconRow.social svg > path,.skn-mlv4 .cntc-section .iconRow.social svg rect,.skn-mlv4 .cntc-section .iconRow.social svg .t1{fill:transparent}
        .skn-mlv4 .iconRow.social svg path.svg-inricon{fill: #5F5F5F}

        /*Job Title Varient*/
        .skn-mlv4 .job-date{text-align:right;width:43%}
        .skn-mlv4 .job-details{width:57%}
        .skn-mlv4 .job-position{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-mlv4 .job-position,.skn-mlv4 .school-place,.skn-mlv4 .school-date{text-transform:uppercase;font-family:'Arial';letter-spacing:0.04px;color:#5F5F5F}

        /*Skill section 2 column*/
        .skn-mlv4 .right-box .skill{display:table;width:100%;table-layout:fixed}
        .skn-mlv4 .right-box .skill .paddedline{display:table-cell;width:50%}

        .skn-mlv4 .cmnsize{display:block}
        .skn-mlv4 .jobtitle,.skn-mlv4 .school{text-transform:uppercase;font-weight:600;font-family:'Montserrat'}

        /*MFR address order code*/
        .skn-mlv4 .zipprefix,.skn-mlv4.MFR .zipsuffix{display:none!important}
        .skn-mlv4 .zipsuffix,.skn-mlv4.MFR .zipprefix{display:block!important}

        /*PICT variations*/
        .skn-mlv4.pict-pcpf-none .pict-sec{display:none}
        .skn-mlv4.pict-pcpf-fnln .prfl-pic,.skn-mlv4 .monogram{display:none}
        .skn-mlv4.pict-pcpf-fnln .monogram{display:block;background:#fff}

        /*For Extra Space Before Colon*/
        .skn-mlv4 .beforecolonspace{display:none !important}
        .skn-mlv4.show-colon-space .beforecolonspace{display:inline !important}

       /*New logic for infographic*/
       .skn-mlv4 .lang-sec .singlecolumn,.skn-mlv4 .skli-sec .singlecolumn{display:none}
        .skn-mlv4 .lang-sec.infobarsec .infobarpara,.skn-mlv4 .skli-sec.infobarsec .infobarpara,.skn-mlv4 .lang-sec.infotilesec .infotilepara,.skn-mlv4 .skli-sec.infotilesec .infotilepara{display:block}
        /*Infographic*/
        .skn-mlv4 .right-box .lang-sec,.skn-mlv4 .right-box .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-mlv4 .right-box .lang-sec .heading,.skn-mlv4 .right-box .skli-sec .heading{width:100%;flex-grow:1}
        .skn-mlv4 .right-box .lang-sec .paragraph.nativeLangPara{width:100%;max-width:100%}
        .skn-mlv4 .right-box .lang-sec .paragraph, .skn-mlv4 .right-box .skli-sec .paragraph{width:46.7%}
        .skn-mlv4 .lang-sec .field *,.skn-mlv4 .skli-sec .field *,.skn-mlv4 .lang-sec .nativeLangPara .field{display:inline}
        .skn-mlv4 .lang-sec.infotilesec .nativeLangPara .field, .skn-mlv4 .lang-sec.infotilesec .field *, .skn-mlv4 .skli-sec .field *{display: inline}
        .skn-mlv4 .lang-sec .paragraph,.skn-mlv4 .skli-sec .paragraph{vertical-align:top;padding-bottom:10px;margin-top:0}
        .skn-mlv4 .lang-sec.section .singlecolumn,.skn-mlv4 .skli-sec.section .singlecolumn{margin-left:0;padding-left:0;position:relative}
        .skn-mlv4 .lang-sec > .paragraph:nth-last-child(1),.skn-mlv4 .right-box .lang-sec > .paragraph:nth-last-child(2),.skn-mlv4 .right-box .skli-sec > .paragraph:nth-last-child(1),.skn-mlv4 .right-box .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0}
        .skn-mlv4 .left-box .lang-sec > .paragraph:nth-last-child(1),.skn-mlv4 .left-box .skli-sec > .paragraph:nth-last-child(1){padding-bottom:0}
        .skn-mlv4 .left-box .lang-sec .paragraph.nativeLangPara{width:100%;max-width:100%}
        .skn-mlv4 .right-box .lang-sec.infobarsec .inner-rating,.skn-mlv4 .skli-sec.infobarsec .inner-rating{position:relative}
        .skn-mlv4 .lang-sec.infobarsec .rating-bar,.skn-mlv4 .skli-sec.infobarsec .rating-bar{background:#D8D8D8;width:100%;clear:both;margin-top:3px;margin-bottom:3px;position:relative;page-break-inside:avoid;border-radius:5px}
        .skn-mlv4 .lang-sec.infobarsec .inner-rating,.skn-mlv4 .skli-sec.infobarsec .inner-rating{background-color:#000000;height:4px;position:relative;width:60%;border-radius:5px}
        .skn-mlv4 .left-box .lang-sec .paragraph,.skn-mlv4 .left-box .skli-sec .paragraph{display:block;margin-right:0;width:100%;max-width:100%;margin-top:0}
        /*Infographic Tiles*/
        .skn-mlv4 .lang-sec.infotilesec .sliced-rect,.skn-mlv4 .skli-sec .sliced-rect{height:4px;width:100%;line-height:0px;margin-top:3px;margin-bottom:3px;clear:both}
        .skn-mlv4 .lang-sec.infotilesec .sliced-rect .sliced-rect-tile,.skn-mlv4 .skli-sec .sliced-rect .sliced-rect-tile{height:100%;background-color:#D8D8D8;float:left;margin-right:3px;border-radius:5px}
        .skn-mlv4 .lang-sec.infotilesec .sliced-rect .sliced-rect-tile:last-child,.skn-mlv4 .skli-sec .sliced-rect .sliced-rect-tile:last-child{margin-right:0}

        /*Rectangular Rating Blocks*/
        .skn-mlv4 .sliced-rect .sliced-rect-tile.ratvfill{background-color:#000000}
        .skn-mlv4 .hide-bar .rating-bar,.skn-mlv4 .hide-bar .sliced-rect,.skn-mlv4 .hide-only-bar .rating-bar,.skn-mlv4 .hide-colon .colon{display:none!important}
        .skn-mlv4 .hide-bar .field-ratt{display:none}
        .skn-mlv4 .right-box .lang-sec.infotilesec .paragraph.firstparagraph,.skn-mlv4 .right-box .lang-sec.infotilesec .paragraph.firstparagraph + .paragraph,.skn-mlv4 .right-box .skli-sec .paragraph.firstparagraph,.skn-mlv4 .right-box .skli-sec .paragraph.firstparagraph + .paragraph{margin-top:0}

         /*Infographic Languages Ordering(fieldgroup) Support*/
         .skn-mlv4 .lang-sec.infobarsec .colon,.skn-mlv4 .lang-sec.infotilesec .colon{display:none}
        .skn-mlv4 .lang-sec.infobarsec .field:first-child .colon,.skn-mlv4 .lang-sec.infotilesec .field:first-child .colon{display:inline}

        /* Style for Signature */
        .skn-mlv4 .disclaim .singlecolumn,.skn-mlv4 .disclaim .singlecolumn li,.skn-mlv4 .disclaim .singlecolumn p,.skn-mlv4 .disclaim .singlecolumn span{font-size:8px;color:#686868;line-height:10px;}
        .skn-mlv4 .field_sign{font-size:7px;color:#8a8a8a}
        .skn-mlv4 .txtleft + .field_sign{text-align:left}
        .skn-mlv4 .txtcenter + .field_sign{text-align:center}
        .skn-mlv4 .txtright + .field_sign{text-align:right}
        .skn-mlv4 .signPic img{max-width:100%}
        .skn-mlv4 .disp-blk{display:block}
        .skn-mlv4 .sign-container-data:empty{display:none}

        .skn-mlv4 .right-box .experience .paragraph:before{content:"";position:absolute;top:6px;left:-37px;width:12px;height:12px;border-radius:50%;background:#fff;border:1px solid #707070;box-sizing:content-box}
        .skn-mlv4 .right-box .experience .paragraph{position: relative;}

        /* Text alignment bullet */
        .skn-mlv4 .ttc-align-left ul{text-align:left}
        .skn-mlv4 .ttc-align-right ul{text-align:right}
        .skn-mlv4 .ttc-align-center ul{text-align:center}
        .skn-mlv4 .ttc-align-justify ul{text-align:justify}
        .skn-mlv4 .ttc-align-right li:before,.skn-mlv4 .ttc-align-center li:before{position:relative;left:-10px}

        .skn-mlv4 .label-cntc.txt-bold{display:none}

         /* Duration tag */
        .skn-mlv4 .totl-expr{display:inline-block;float:right; padding:0 5px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap;margin-left:5px}
        .skn-mlv4.texp-curved .totl-expr{border-radius:10px}
        .skn-mlv4 .dflex{display:flex;justify-content:space-between}
        .skn-mlv4 .left-box .totl-expr{display:none}


        /*For Iron PDF*/
        .skn-mlv4.for-iron-pdf{margin-top:-30px}
        .skn-mlv4.for-iron-pdf .left-box::before,.skn-mlv4.for-iron-pdf .section.experience:before{content:none!important}

        .skn-mlv4.for-iron-pdf.texp-curved .right-box .dflex,.skn-mlv4.for-iron-pdf.texp-rectangle .right-box .dflex{display:block}
        .skn-mlv4.for-iron-pdf.texp-curved .right-box .experience .dflex > span:first-child,.skn-mlv4.for-iron-pdf.texp-rectangle .right-box .experience .dflex > span:first-child{display:inline-block;width:72%}
        .skn-mlv4.for-iron-pdf.texp-curved .right-box .experience .dflex > span:last-child,.skn-mlv4.for-iron-pdf.texp-rectangle .right-box .experience .dflex > span:last-child{display:inline-block;width:28%;float:right}




        /* General classes */
        .skn-mlv4,.skn-mlv4 table{line-height:12px}
        .skn-mlv4{padding:30px 30px 13px 30px}
        .skn-mlv4.pagesize{width:595px}
        .skn-mlv4.fontsize{font-size:10px}
        .skn-mlv4.fontface{font-family:Arial}

        .skn-mlv4 .mb-10{margin-bottom:10px;font-weight:600}
        .skn-mlv4 .fielditem{padding-bottom:5px}
        .skn-mlv4 .home-phone{padding-bottom:0;margin-bottom:0}

        /* Top Section */
        .skn-mlv4 .top-section{margin-bottom:20px}
        .skn-mlv4 .name{font-size:41px;line-height:40px;padding-bottom:5px;color:#F98C79}
        .skn-mlv4 .prof-title{font-size:11px;line-height:13px;padding-bottom:10px}
        .skn-mlv4.pict-pcsh-rectangle .paragraph .prfl-pic .field{width:116px}

        /*Change Name Font Size Logic*/
        .skn-mlv4.update-font-size .name{font-size:30px;line-height:31px}

        /*Not common Infographic*/
        .skn-mlv4 .lang-sec.infobarsec .paragraph .lang-scale span,.skn-mlv4 .lang-sec.infotilesec .paragraph .lang-scale span,.skn-mlv4 .skli-sec .paragraph .lang-scale span{font-size:8px!important;line-height:8px;text-transform:capitalize}
        .skn-mlv4 .lang-sec.infobarsec .paragraph.nativeLangPara .lang-scale span,.skn-mlv4 .lang-sec.infotilesec .paragraph.nativeLangPara .lang-scale span{font-size:9px!important;line-height:10px}
        .skn-mlv4 .lang-sec.infobarsec .paragraph *,.skn-mlv4 .lang-sec.infotilesec .paragraph *,.skn-mlv4 .skli-sec .paragraph *{font-size:9px;text-transform:uppercase;line-height:10px}
        .skn-mlv4 .lang-sec .inner-rating,.skn-mlv4 .skli-sec .inner-rating{background:#F98C79}
        /* Address + Cntc Section */
        .skn-mlv4 .cntc-section{line-height:14px}
        .skn-mlv4 .fielditem:last-child .sptr{display:none}
        .skn-mlv4 .address .fieldgroup span *{font-size:10px}
        .skn-mlv4 .address .fieldgroup{font-size:0}

        /* Heading */
        .skn-mlv4 .heading{margin-bottom:10px}
        .skn-mlv4 .sectiontitle{font-size:11px;line-height:13px;padding:7px 10px}

        /* Common section */
        .skn-mlv4 .paragraph{margin-top:10px}
        .skn-mlv4 .firstparagraph{margin-top:0!important}
        .skn-mlv4 .right-box .singlecolumn,.skn-mlv4 .right-box .maincolumn{margin-left:0px}
        .skn-mlv4 .section{margin-bottom:20px}
        .skn-mlv4 .left-box::before{top:186px;height:calc(100% - 186px)}
        .skn-mlv4.doc-pcpf-none .left-box::before,.skn-mlv4.pict-pcpf-none .left-box::before{top:0;height:100%}
        .skn-mlv4 .right-box{padding-left:30px;width:343px}
        .skn-mlv4 .left-box{padding-right:30px;width:calc(100% - 343px)}
        .skn-mlv4 .totl-expr{background-color:#F98C79;font-size:8px;line-height:12px}

        /* Skill */
        .skn-mlv4 .right-box .skill .paddedline:last-child{padding-left:10px}
        .skn-mlv4 .skill ul li{margin-bottom:10px;line-height:13px}

        /* Skin specific css */
        .skn-mlv4 .skli-sec .lang-space,.skn-mlv4 .lang-sec .lang-space{margin-bottom:5px} /*Extra lang css*/
        .skn-mlv4 .jd-font{font-size:9px}
        .skn-mlv4 .right-box .experience .paragraph:before{top:6px;left:-37px;width:12px;height:12px}
        .skn-mlv4 .fielditem-adif{margin-top:3px;text-transform:capitalize}
        .skn-mlv4 .fielditem-adif span{text-transform:capitalize!important} /*To override uppercase and to save some css */
        /*PICT and SVG section */
        .skn-mlv4 .prfl-pic .field,.skn-mlv4 .monogram{width:146px;height:146px;background-color:#F98C79}
        .skn-mlv4 .monogram .svg-box{width:146px;height:146px;background-color:#F98C79}
        .skn-mlv4 .monogram svg text{font-size:60px;line-height:40px;fill:#F98C79}
        .skn-mlv4 .initial-name span{font-size:60px;line-height:40px}
        .skn-mlv4 .pict-sec{padding-right:93px;margin-bottom:40px}
        .skn-mlv4 .color-svg{fill:#F98C79!important}
         /*Infographic*/
        .skn-mlv4 .right-box .lang-sec,.skn-mlv4 .right-box .skli-sec{padding-left:0px}
        .skn-mlv4 .right-box .lang-sec .heading,.skn-mlv4 .right-box .skli-sec .heading{margin-left:-0px}
        .skn-mlv4 .lang-sec.infobarsec .inner-rating,.skn-mlv4 .skli-sec.infobarsec .inner-rating{background-color:#F98C79}
        .skn-mlv4 .left-box .lang-sec .paragraph,.skn-mlv4 .left-box .skli-sec .paragraph{padding-bottom:10px}

        /*Fixes for builer*/
        .skn-mlv4 .right-box .sortable-item:first-child .section,.skn-mlv4 .left-box .sortable-item:first-child .section{padding-top:0}
        .skn-mlv4 .left-box .skli-sec .sortableInner .sortable-item .paragraph,.skn-mlv4 .left-box .lang-sec .sortableInner .sortable-item + .sortable-item .paragraph,.skn-mlv4 .left-box .lang-sec .sortableInner .sortable-item .paragraph{max-width:100%;vertical-align:top;display:block;margin-right:0}
        .skn-mlv4.sortable-drag-item{padding:0}
        .skn-mlv4 .lang-sec .sortableInner > .paragraph:nth-last-child(1),.skn-mlv4 .right-box .lang-sec .sortableInner > .paragraph:nth-last-child(2),.skn-mlv4 .right-box .skli-sec .sortableInner > .paragraph:nth-last-child(1),.skn-mlv4 .right-box .skli-sec .sortableInner > .paragraph:nth-last-child(2){padding-bottom:0}
        .skn-mlv4 .left-box .lang-sec .sortableInner > .paragraph:nth-last-child(1),.skn-mlv4 .left-box .skli-sec .sortableInner > .paragraph:nth-last-child(1){padding-bottom:0}
        .skn-mlv4 .data-NAME + .section-container:not(.data-SUMM){margin-top:20px}
        .skn-mlv4 .section.experience:before,.experiment-finalize-page .skn-mlv4 .data-EXPR .section.experience:before{left:-31px}
        .skn-mlv4 .data-EXPR .section.experience:before{left:-38px}
        .skn-mlv4 .right-box .lang-sec .sortable-item{display:inline-block}
         .skn-mlv4 .right-box .lang-sec .sortable-item .paragraph,.skn-mlv4 .right-box .skli-sec .sortable-item .paragraph{width:145px}
         .skn-mlv4 .data-LNGG .sortable-item.native-lang{width:100%;max-width:100%}
        .skn-mlv4 .data-LNGG .doc-item,.skn-mlv4 .data-SKLI .doc-item,.skn-mlv4 .left-box .data-LNGG .sortable-item,.skn-mlv4 .left-box .data-SKLI .sortable-item,.skn-mlv4 .lang-sec .doc-item,.skn-mlv4 .skli-sec .doc-item{width:100%}
        .skn-mlv4 .data-LNGG .sortableInner,.skn-mlv4 .data-SKLI .sortableInner,.skn-mlv4 .SECTION_LNGG .sortableInner,.skn-mlv4 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-mlv4 .data-LNGG .sortable-item,.skn-mlv4 .data-SKLI .sortable-item{width:46.7%}
        .skn-mlv4 .data-LNGG .sortable-item .paragraph,.skn-mlv4 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}
        /*Rectangular Rating Blocks*/
        .skn-mlv4 .paragraph .sliced-rect .sliced-rect-tile.ratvfill{background-color:#F98C79}

        /* Top SVG */
        .skn-mlv4 .top-circle{position:absolute;top:-30px;left:-148px;fill:#F98C79;width:205px;height:127px}
        .skn-mlv4 .top-circle-small{position:absolute;top:-30px;left:87px;fill:#F98C79;width:72px;height:38px}

        /* Skin Fixes */
        .skn-mlv4 .name-sec{margin-bottom:0}
        .skn-mlv4 .name-sec + .section:not(.summary){margin-top:20px}
        .skn-mlv4 .name-sec{min-height:60px}
        /*Job Title Varient*/
        .skn-mlv4 .job-details{font-size:{$JTFS}px}
        .skn-mlv4 .job-position,.skn-mlv4 .school-place,.skn-mlv4 .school-date{padding-bottom:5px;font-size:9px}
        .skn-mlv4 .jobtitle,.skn-mlv4 .school{font-size:12px;color:#F98C79;padding-bottom:3px;line-height:14px}
        .skn-mlv4 .degree{font-size:9px;padding-bottom:5px}
        .skn-mlv4 .status{font-size:9px}

        @-moz-document url-prefix() {
   .page-wrap div:not(.modal-content) .resume-preview .skn-mlv4 .left-box::before,.page-wrap div:not(.modal-content) .resume-preview .skn-mlv4 .section.experience::before {width:2px}
   .page-wrap div:not(.modal-content) .resume-preview .skn-mlv4 .section.experience::before, .page-wrap div:not(.modal-content) .resume-preview .experiment-finalize-page .skn-mlv4 .data-EXPR .section.experience::before {left:-32px}}

    `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-mlv4 MLV4 MUK sdcl-F98C79 texp-none pict-pcpf-purl " docskinwidth="595" ><div data-testid="embd-92LqKqF0" id="CONTAINER_PARENT_0" className="top-section"><div data-testid="embd-92PDkR60" id="CONTAINER_0" className="left-box">

      {/* Photo Section */}
      {data.photo_url && (
        <div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="42" className="sortable-item section-container SortableItem-sibling  data-PICT"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-PICT" id="SECTION_PICTa2e3abc4-fc5a-4d5c-80fb-ac187cd5be60" className="section notdraggable pict-sec SECTION_PICT firstsection" data-section-cd="PICT"><div data-testid="embd-88uQIHR-PICT" className="doc-item"><div data-testid="embd-88aw0Ce-PICT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-389ae0dd-26d7-4892-a4b9-d1e4f0b10399" id="PARAGRAPH_PICT_389ae0dd-26d7-4892-a4b9-d1e4f0b10399" className="paragraph PARAGRAPH_PICT firstparagraph placeholder-text"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="prfl-pic">
                            <div className="field" id="FIELD_PURL" style={{ backgroundColor: colorHex }}><img data-testid="embd-78pIea6" className="chk" src={data.photo_url} alt="Profile" /> </div>
                        </div>
                    </div></div></div></div></div></div></div>
      )}

      {/* Contact Section */}
      <div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="42" className="sortable-item section-container SortableItem-sibling  data-CNTC"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-CNTC" id="SECTION_CNTCd3d40c22-1b29-401e-a809-9cb7e72d6fdc" className="section cntc-section notdraggable SECTION_CNTC" data-section-cd="CNTC"><div data-testid="embd-88uQIHR-CNTC" className="doc-item"><div data-testid="embd-88aw0Ce-CNTC" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-3912838f-29f6-467c-8297-bf45ee1ff720" id="PARAGRAPH_CNTC_3912838f-29f6-467c-8297-bf45ee1ff720" className="paragraph paragraph-fieldgroup PARAGRAPH_CNTC firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="address fieldgroup fieldgroup-0">
                            {data.phone && (
                              <div className="iconRow phone mb-10" dependency="HPHN|CPHN">
                                <div className="iconSvg">
                                  <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.98438 7.04688L7.60938 8.625C7.5625 8.85938 7.375 9.01562 7.14062 9.01562C3.20312 9 0 5.79688 0 1.85938C0 1.625 0.140625 1.4375 0.375 1.39062L1.95312 1.01562C2.17188 0.96875 2.40625 1.09375 2.5 1.29688L3.23438 3C3.3125 3.20312 3.26562 3.4375 3.09375 3.5625L2.25 4.25C2.78125 5.32812 3.65625 6.20312 4.75 6.73438L5.4375 5.89062C5.5625 5.73438 5.79688 5.67188 6 5.75L7.70312 6.48438C7.90625 6.59375 8.03125 6.82812 7.98438 7.04688Z" fill="#5F5F5F"></path>
                                  </svg>
                                </div>
                                <div className="icoTxt">
                                  <span className="paddedline" dependency="HPHN">
                                    <span id="FIELD_HPHN" className="fielditem fielditem-hphn">{data.phone}</span>
                                  </span>
                                </div>
                              </div>
                            )}
                            {data.email && (
                              <div className="iconRow mb-10" dependency="EMAI">
                                <div className="iconSvg">
                                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4.5C4.25 4.5 4.51562 4.42188 4.73438 4.25L8 1.71875V5.25C8 5.67188 7.65625 6 7.25 6H0.75C0.328125 6 0 5.67188 0 5.25V1.71875L3.25 4.25C3.46875 4.42188 3.73438 4.5 4 4.5ZM0.25 1.28125C0.09375 1.15625 0 0.953125 0 0.75C0 0.34375 0.328125 0 0.75 0H7.25C7.65625 0 8 0.34375 8 0.75C8 0.953125 7.89062 1.15625 7.73438 1.28125L4.42188 3.85938C4.17188 4.04688 3.8125 4.04688 3.5625 3.85938L0.25 1.28125Z" fill="#5F5F5F"></path>
                                  </svg>
                                </div>
                                <div className="icoTxt">
                                  <span id="FIELD_EMAI" className="fielditem fielditem-emai">{data.email}</span>
                                </div>
                              </div>
                            )}
                            {(data.street_address || data.city || data.postcode) && (
                              <div className="iconRow mb-10" dependency="ADDR">
                                <div className="iconSvg">
                                  <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 2.25C5 3.5 3.98438 4.5 2.75 4.5C1.5 4.5 0.5 3.5 0.5 2.25C0.5 1.01562 1.5 0 2.75 0C3.98438 0 5 1.01562 5 2.25ZM3 1C3 0.875 2.875 0.75 2.75 0.75C1.90625 0.75 1.25 1.42188 1.25 2.25C1.25 2.39062 1.35938 2.5 1.5 2.5C1.625 2.5 1.75 2.39062 1.75 2.25C1.75 1.70312 2.1875 1.25 2.75 1.25C2.875 1.25 3 1.14062 3 1ZM2.25 7.5V4.96875C2.40625 4.98438 2.57812 5 2.75 5C2.90625 5 3.07812 4.98438 3.25 4.96875V7.5C3.25 7.78125 3.01562 8 2.75 8C2.46875 8 2.25 7.78125 2.25 7.5Z" fill="#5F5F5F"></path>
                                  </svg>
                                </div>
                                <div className="icoTxt fielditem fielditem-addr">
                                  <span id="FIELD_ADDR">{[data.street_address, data.city, data.postcode].filter(Boolean).join(', ')}</span>
                                </div>
                              </div>
                            )}
                            {data.website && (
                              <div dependency="WEB1" className="iconRow">
                                <div className="iconSvg">
                                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 4C5.5 4.35938 5.46875 4.6875 5.4375 5H2.54688C2.51562 4.6875 2.48438 4.35938 2.48438 4C2.48438 3.65625 2.51562 3.32812 2.54688 3H5.4375C5.46875 3.32812 5.5 3.65625 5.5 4ZM7.85938 3C7.95312 3.32812 8 3.65625 8 4C8 4.35938 7.95312 4.6875 7.85938 5H5.9375C5.96875 4.6875 6 4.34375 6 4C6 3.65625 5.96875 3.32812 5.9375 3H7.85938ZM7.70312 2.5H5.875C5.71875 1.51562 5.40625 0.671875 5.01562 0.140625C6.23438 0.46875 7.23438 1.34375 7.70312 2.5ZM5.375 2.5H2.60938C2.70312 1.9375 2.85938 1.4375 3.03125 1.03125C3.20312 0.65625 3.375 0.390625 3.5625 0.21875C3.73438 0.0625 3.875 0 4 0C4.10938 0 4.25 0.0625 4.42188 0.21875C4.60938 0.390625 4.78125 0.65625 4.95312 1.03125C5.125 1.4375 5.28125 1.9375 5.375 2.5ZM0.28125 2.5C0.75 1.34375 1.75 0.46875 2.96875 0.140625C2.57812 0.671875 2.26562 1.51562 2.10938 2.5H0.28125ZM2.04688 3C2.01562 3.32812 1.98438 3.65625 1.98438 4C1.98438 4.34375 2.01562 4.6875 2.04688 5H0.125C0.03125 4.6875 0 4.35938 0 4C0 3.65625 0.03125 3.32812 0.125 3H2.04688ZM3.03125 6.98438C2.85938 6.57812 2.70312 6.07812 2.60938 5.5H5.375C5.28125 6.07812 5.125 6.57812 4.95312 6.98438C4.78125 7.35938 4.60938 7.625 4.42188 7.79688C4.25 7.95312 4.10938 8 3.98438 8C3.875 8 3.73438 7.95312 3.5625 7.79688C3.375 7.625 3.20312 7.35938 3.03125 6.98438ZM2.96875 7.875C1.75 7.54688 0.75 6.67188 0.28125 5.5H2.10938C2.26562 6.5 2.57812 7.34375 2.96875 7.875ZM5.01562 7.875C5.40625 7.34375 5.71875 6.5 5.875 5.5H7.70312C7.23438 6.67188 6.23438 7.54688 5.01562 7.875Z" fill="#5F5F5F"></path>
                                  </svg>
                                </div>
                                <div className="icoTxt brk-all fielditem fielditem-web1">
                                  <span className="space-left" id="FIELD_WEB1">{data.website}</span>
                                </div>
                              </div>
                            )}
                            {data.driving_license && (
                              <div dependency="DRIV" className="iconRow">
                                <div className="iconSvg">
                                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.609375 3.07812L1.15625 1.51562C1.375 0.90625 1.9375 0.5 2.57812 0.5H5.40625C6.04688 0.5 6.60938 0.90625 6.82812 1.51562L7.375 3.07812C7.73438 3.23438 8 3.59375 8 4V7C8 7.28125 7.76562 7.5 7.5 7.5H7C6.71875 7.5 6.5 7.28125 6.5 7V6.25H1.5V7C1.5 7.28125 1.26562 7.5 1 7.5H0.5C0.21875 7.5 0 7.28125 0 7V4C0 3.59375 0.25 3.23438 0.609375 3.07812ZM1.70312 3H6.28125L5.875 1.84375C5.8125 1.64062 5.625 1.5 5.40625 1.5H2.57812C2.35938 1.5 2.17188 1.64062 2.10938 1.84375L1.70312 3ZM1.5 4C1.21875 4 1 4.23438 1 4.5C1 4.78125 1.21875 5 1.5 5C1.76562 5 2 4.78125 2 4.5C2 4.23438 1.76562 4 1.5 4ZM6.5 5C6.76562 5 7 4.78125 7 4.5C7 4.23438 6.76562 4 6.5 4C6.21875 4 6 4.23438 6 4.5C6 4.78125 6.21875 5 6.5 5Z" fill="#5F5F5F"></path>
                                  </svg>
                                </div>
                                <div className="icoTxt fielditem fielditem-driv">
                                  <span id="FIELD_DRIV">{data.driving_license}</span>
                                </div>
                              </div>
                            )}
                            {data.nationality && (
                              <div dependency="NTLY" className="iconRow">
                                <div className="iconSvg">
                                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 7.75V0.5C1 0.234375 0.765625 0 0.5 0C0.21875 0 0 0.234375 0 0.5V7.75C0 7.89062 0.109375 8 0.25 8H0.75C0.875 8 1 7.89062 1 7.75ZM7.4375 0C7.73438 0 8 0.1875 8 0.484375V5.20312C8 5.39062 7.875 5.5625 7.65625 5.64062C6.98438 5.90625 6.42188 6 5.92188 6C4.76562 6 3.96875 5.51562 2.8125 5.51562C2.42188 5.51562 2 5.57812 1.5 5.73438V0.25C2.04688 0.078125 2.5 0.015625 2.89062 0.015625C3.96875 0.015625 4.51562 0.515625 5.45312 0.515625C5.89062 0.515625 6.42188 0.40625 7.125 0.078125C7.23438 0.03125 7.32812 0 7.4375 0Z" fill="#5F5F5F"></path>
                                  </svg>
                                </div>
                                <div className="icoTxt fielditem fielditem-ntly">
                                  <span id="FIELD_NTLY">{data.nationality}</span>
                                </div>
                              </div>
                            )}
                            {data.linkedin && (
                              <div className="iconRow" dependency="SOCL" id="CATEGORY_SOCIAL_SOCL">
                                <div className="iconSvg">
                                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#5F5F5F"></path>
                                  </svg>
                                </div>
                                <div className="icoTxt fielditem fielditem-socl">
                                  <span id="FIELD_SOCL">{data.linkedin}</span>
                                </div>
                              </div>
                            )}
                        </div>
                    </div></div></div></div></div></div></div>

      {/* Skills Section - Left Box */}
      {skills.length > 0 && (
        <div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="42" className="sortable-item section-container SortableItem-sibling  data-HILT"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">{t.skills || 'SKILLS'}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename SKILLS " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn maincolumn">
                            <div className="skill">
                                <span className="paddedline" id="FIELD_SKC1"><ul>{firstColumnSkills.map(skill => (
                                  <li key={skill.id}>{skill.name}</li>
                                ))}</ul></span>
                                <span className="paddedline" id="FIELD_SKC2"><ul>{secondColumnSkills.map(skill => (
                                  <li key={skill.id}>{skill.name}</li>
                                ))}</ul></span>
							</div>
                        </div>
                    </div></div></div></div></div></div></div>
      )}

      {/* Education Section - Left Box */}
      {data.educations && data.educations.length > 0 && (
        <div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="42" className="sortable-item section-container SortableItem-sibling  data-EDUC"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section edu-sec SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">{t.education || 'EDUCATION'}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename EDUCATION " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">
          {data.educations.map((edu, index) => (
            <div key={edu.id} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="42" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="42" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-e0037f47-0bb8-4767-a441-48042b09746f" id={`PARAGRAPH_EDUC_${edu.id}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn">
                            <span className="paddedline school" dependency="SCHO">
                                <span id="FIELD_SCHO">{edu.institution}</span>
                            </span>
                            {edu.location && (
                              <span className="paddedline school-place" dependency="SCIT|SSTA|SCNT">
                                  <span id="FIELD_SCIT">{edu.location}</span>
                                  <span id="FIELD_SSTA"></span><span className="joblocation jobcountry" id="FIELD_SCNT"></span></span>
                            )}
                            <span className="disp-blk school-date" dependency="GRYR|GRST|GRED|GRIP">
                                <span className="xslt_static_change displayNoneThisField">Expected in </span>
                                <span id="FIELD_GRYR" format="%b %Y"></span>
                                <span id="FIELD_GRST" format="%b %Y">{formatDate(edu.start_date)}</span>{edu.start_date && edu.end_date && <span> - </span>}<span id="FIELD_GRED" format="%b %Y">{formatDate(edu.end_date)}</span>
                                <span id="FIELD_GRIP"></span>
                            </span>
                            {(edu.degree || edu.field_of_study) && (
                              <span className="paddedline degree" dependency="DGRE|STUY|GRPA|GRHN">
                                  {edu.degree && <><span id="FIELD_DGRE">{edu.degree}</span><span dependency="DGRE+STUY|GRHN"><span className="beforecolonspace"> </span>: </span></>}
                                  <span id="FIELD_STUY">{edu.field_of_study}</span>
                                  <span dependency="STUY"></span><span id="FIELD_GRHN"></span>
                                  <span id="FIELD_GRPA"></span>
                              </span>
                            )}
                            <span id="FIELD_FRFM"></span>
                        </div>
                    </div></div></div>
          ))}
        </div></div></div></div></div>
      )}

      </div><div data-testid="embd-92PDkR61" id="CONTAINER_1" className="right-box">

      {/* Name Section */}
      <div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="42" className="sortable-item section-container SortableItem-sibling  data-NAME"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-NAME" id="SECTION_NAME1a1a32ad-f01c-4377-b2f6-1a65f9bf6cb8" className="section notdraggable name-sec SECTION_NAME firstsection" data-section-cd="NAME"><div data-testid="embd-88uQIHR-NAME" className="doc-item"><div data-testid="embd-88aw0Ce-NAME" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-44bc0bd4-6d0c-480d-8f32-8d70df1621d0" id="PARAGRAPH_NAME_44bc0bd4-6d0c-480d-8f32-8d70df1621d0" className="paragraph PARAGRAPH_NAME firstparagraph"><div data-testid="embd-78blCsH">
                        <div className="name" style={{ color: colorHex }}>
                            {data.first_name && <span id="FIELD_FNAM">{data.first_name}</span>}
                            {data.last_name && <span id="FIELD_LNAM">{data.last_name}</span>}
                        </div>
                        <svg className="top-circle" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="205px" height="127px" viewBox="0 0 205 127" version="1.1">
                            <title>Ellipse 390</title>
                            <g id="Page-11---Final---1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.189506993">
                                <g className="color-svg" id="Artboard-–-65" transform="translate(-121.000000, 0.000000)" fill={colorHex} fillRule="nonzero">
                                    <circle id="Ellipse-390" cx="223.5" cy="24.5" r="102.5"></circle>
                                </g>
                            </g>
                        </svg>
                        <svg className="top-circle-small" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="72px" height="38px" viewBox="0 0 72 38" version="1.1">
                            <title>Ellipse 381</title>
                            <g id="Page-11---Final---1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.0615025014">
                                <g className="color-svg" id="Artboard-–-65" transform="translate(-360.000000, 0.000000)" fill={colorHex} fillRule="nonzero">
                                    <circle id="Ellipse-381" cx="396" cy="2" r="36"></circle>
                                </g>
                            </g>
                        </svg>
                    </div></div></div></div></div></div></div>

      {/* Summary Section */}
      {data.summary && (
        <div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="42" className="sortable-item section-container SortableItem-sibling  data-SUMM"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section summary notdraggable SECTION_SUMM" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph cmnsize PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn" id="FIELD_FRFM"><p>{data.summary}</p></div>
                    </div></div></div></div></div></div></div>
      )}

      {/* Work History Section */}
      {data.experiences && data.experiences.length > 0 && (
        <div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="42" className="sortable-item section-container SortableItem-sibling  data-EXPR"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section notdraggable experience SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">{t.workHistory || 'Work history'}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Work history " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">
          {data.experiences.map((exp, index) => (
            <div key={exp.id} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="42" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="42" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-998e66f0-eaa8-4a72-b41c-7158c85a1d86" id={`PARAGRAPH_EXPR_${exp.id}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn">
                            <div className="paddedline" dependency="JTIT|COMP|JCIT|JSTA|JCNT|JCTR|JLOC|JSTD|EDDT">
                                <span className="dflex">
                                    <span>
                                        <span className="jobtitle txt-bold disp-blk" id="FIELD_JTIT" style={{ color: colorHex }}>{exp.job_title}</span>
                                    </span>
                                </span>
                                <div className="job-position">
                                    <div className="job-details">
                                        <span id="FIELD_COMP">{exp.company}</span>
                                    {exp.company && exp.location && <span dependency="COMP"><span dependency="JCIT|JSTA|JCNT"> | </span></span>}<span id="FIELD_JCIT">{exp.location}</span><span id="FIELD_JSTA"></span><span id="FIELD_JCNT"></span><span dependency="COMP|JCIT|JSTA|JCNT"></span><span id="FIELD_JLOC"></span><span id="FIELD_JCTR"></span>
                                    </div>
                                   <div className="job-date"><span className="" id="FIELD_JSTD" format="%b %Y">{formatDate(exp.start_date)}</span><span dependency="JSTD+EDDT"> - </span><span id="FIELD_EDDT" format="%b %Y">{exp.currently_working ? (t.current || 'Current') : formatDate(exp.end_date)}</span></div>
                                </div>
                            </div>
                            {exp.description && (
                              <span id="FIELD_JDES"><ul>{exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                <li key={i}>{line}</li>
                              ))}</ul></span>
                            )}
                        </div>
                    </div></div></div>
          ))}
        </div></div></div></div></div>
      )}

      {/* Languages Section - Right Box */}
      {data.languages && data.languages.length > 0 && (
        <div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="42" className="sortable-item section-container SortableItem-sibling data-LNGG">
          <div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG88bc36a1-247b-b72f-7918-a79948b8fc80" className="section lang-sec infobarsec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
            <div data-testid="embd-88uQIHR-LNGG" className="doc-item">
              <div data-testid="embd-88ciQTv" className="heading">
                <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_LNGG">{t.languages || 'Languages'}</div>
              </div>
              <div data-testid="embd-88aw0Ce-LNGG" className="">
                <div data-testid="embd-87S8HNi88bc36a1-247b-b72f-7918-a79948b8fc80" id="CONTAINER_88bc36a1-247b-b72f-7918-a79948b8fc80" className="sortableInner">
                  {data.languages.map((lang, index) => {
                    const widthPercent = ((lang.level || 3) / 5) * 100;
                    return (
                      <div key={lang.id} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="42" className="sortable-item paragraph-container SortableItem-sibling">
                        <div data-testid={`embd-79HRa2m-${lang.id}`} id={`PARAGRAPH_LNGG_${lang.id}`} className={`paragraph paragraph-fieldgroup PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}>
                          <div data-testid="embd-78FzR29" className="clearfix doc-item">
                            <div className="singlecolumn infobarpara">
                              <div className="fieldgroup-0">
                                <div className="field fielditem-frfm lang-space">
                                  <span className="inner-wrapper"><span id="FIELD_FRFM">{lang.name}</span><span className="colon hyphen" dependency="FRFM"><span className="beforecolonspace"></span></span></span>
                                  <span className="flt-right" id="FIELD_RATG"></span>
                                </div>
                                <div className="rating-bar fielditem-ratv" dependency="RATV">
                                  <div className="inner-rating" id="FIELD_RATV" style={{ width: `${widthPercent}%`, backgroundColor: colorHex }}></div>
                                </div>
                                <div className="field field-ratt fielditem-ratt lang-scale">
                                  <span id="FIELD_RATT" className="small-size">{lang.proficiency}</span><span className="beforecolonspace"></span><span className="colon small-size hyphen" dependency="RATT"></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button data-testid="embd-87enKtK-LNGG" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="42" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      </div></div><div data-testid="embd-92LqKqF1" id="CONTAINER_PARENT_1" className="sign-container-parent"><div data-testid="embd-92PDkR62" id="CONTAINER_2" className="sign-container-data"></div></div></div><div></div></div></div>
    </>
  );
}
