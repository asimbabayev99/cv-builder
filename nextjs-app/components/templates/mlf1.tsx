/* eslint-disable */
// @ts-nocheck
export default function TemplateMlf1() {
  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-mlf1 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        /*START content disc style for LI*/
        .skn-mlf1 ul,.skn-mlf1 li{list-style:none;margin:0;padding:0}
        .skn-mlf1 ul li{position:relative;margin:0px;padding-left:10px}
        .skn-mlf1 ul li:before{content:'\\2022';font-size:9px;position:absolute;left:0;top:0}
        /*END content disc style for LI*/

        /*Helping classes*/
        .skn-mlf1 .txt-bold{font-weight:bold}
        .skn-mlf1 .txtItl{font-style:italic}
        .skn-mlf1 .dispBlock{display:block}
        .skn-mlf1 .flt-right{float:right}

        .skn-mlf1 .ttc-align-left ul{text-align:left}
        .skn-mlf1 .ttc-align-right ul{text-align:right}
        .skn-mlf1 .ttc-align-center ul{text-align:center}
        .skn-mlf1 .ttc-align-justify ul{text-align:justify}
        .skn-mlf1 .ttc-align-right li:before,.skn-mlf1 .ttc-align-center li:before{position:relative;left:-4px}

        /*Document*/
        .skn-mlf1.MUK{text-size-adjust:none; -ms-text-size-adjust: none;-moz-text-size-adjust: none;-webkit-text-size-adjust: none}
        .skn-mlf1{color:#020303;line-height:14px;table-layout:fixed;box-sizing:content-box;word-wrap:break-word;word-break:break-word;min-height:792px}
        .skn-mlf1 .name{color:#576d7b;font-weight:bold;padding:5px 0 4px 0;text-align:left;text-transform:uppercase;position:relative}
        .skn-mlf1 .section.SECTION_CNTC{float:left;margin-top:0}
        .skn-mlf1 .resumeTitle{color:#0e0e0e;text-transform:uppercase;letter-spacing:.86px}
        .skn-mlf1 .parentContainer{clear:both}
        .skn-mlf1 .parentContainer .container{display:table-cell;padding-top:25px;padding-bottom:25px}
        .skn-mlf1 .parentContainer .section{border-top:1px solid #576d7b;padding-top:4px;position:relative;width:100%;}
        .skn-mlf1 .parentContainer .section:not(.lang-sec):not(.skli-sec):after{content:'';display:table;clear:both}
        .skn-mlf1 .singlecolumn,.skn-mlf1 .sectiontitle{word-wrap:break-word}
        .skn-mlf1 .parentContainer .paragraph:not(.firstparagraph) .singlecolumn{padding-top:3px;border-top:1px dashed #000}
        .skn-mlf1 .SECTION_CNTC,.skn-mlf1 .topsection,.skn-mlf1 .parentContainer{width:100%;display:table;table-layout:fixed;}
        .skn-mlf1 .totl-expr{float:right;padding:0 5px;color:#fff;font-weight:700}
        .skn-mlf1.texp-curved .totl-expr{border-radius:10px}

        /*Common left-right container*/
        .skn-mlf1 .left-box{position:relative;float:left}
        .skn-mlf1 .right-box .section:first-child{padding-top:0;margin-top:0;margin-bottom:16px}
        .skn-mlf1 .left-box .section:first-child{padding-top:20px;margin-top:0}

        .skn-mlf1 .skill{display:table;width:100%;table-layout:fixed}
        .skn-mlf1 .skill .paddedline1{display:table-cell;width:50%}
        .skn-mlf1 .skill .paddedline:last-child{padding-left:10px}

        /*Top section*/
        .skn-mlf1 .topsection{position:relative;border-top:25px solid #576d7b}
        .skn-mlf1 .section:empty{display:none}
        .skn-mlf1 .parentContainer .section:first-child{margin-top:0}

        /*PICT*/
        .skn-mlf1 .PICTPic,.skn-mlf1 .PICTPic .field{display:table-cell;vertical-align:middle;text-align:center}
        .skn-mlf1 .PICTPic img{width:100%;object-fit:cover}

        /*Address and ALNK*/
        .skn-mlf1 .adnlLnks ul li{padding:0;margin:0}
        .skn-mlf1 .adnlLnks ul li:before{content:''}

        /*Personal details section*/
        .skn-mlf1 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-mlf1 .details-wrap{width:49%}

        /*SVG Icon Style*/
        .skn-mlf1 .iconRow{clear:both;margin-bottom:8px;word-wrap:break-word;display:table;table-layout:fixed;width:100%;}
        .skn-mlf1 .iconRow .iconSvg{width:10px;display:table-cell;vertical-align:middle}
        .skn-mlf1 .iconRow .iconSvg svg{display:block;}
        .skn-mlf1 .iconRow .icoTxt{padding-left:6px;vertical-align: middle;display:table-cell}
        .skn-mlf1 .iconRow svg path.rect,.skn-mlf1 .topshape{fill:#576d7b}
        .skn-mlf1 .topshape{position:relative;top:-1px;vertical-align:top}
        .skn-mlf1 .square{height: 10px;width: 10px;background-color: #576d7b;}
        .skn-mlf1 .svg-inricon{fill: #fff;stroke: #fff;transform: scale(1.1);transform-origin:16px 14px}
        .skn-mlf1 .svg-fillsqrbg{fill:#576d7b}

        /*Heading*/
        .skn-mlf1 .heading{float:left;left:0;position:relative}
        .skn-mlf1 .heading:before{content:'';position:absolute;left:0;top:-8px;border-top:3px solid #576d7b;background:#576d7b}
        .skn-mlf1 .sectiontitle{color:#000;letter-spacing:.1px;text-transform:uppercase;font-weight:bold}
        .skn-mlf1 .jobtitle{text-transform:uppercase}

        /*Signature*/
        .skn-mlf1 .sign .field_sign{font-size:7px;color:#8a8a8a}
        .skn-mlf1 .txtleft + .field_sign{text-align:left}
        .skn-mlf1 .txtcenter + .field_sign{text-align:center}
        .skn-mlf1 .txtright + .field_sign{text-align:right}
        .skn-mlf1 .signPic span:first-child{padding-right:6px}
        .skn-mlf1 .signPic img{max-width:100%}
        .skn-mlf1 .sign.section{padding-top:0;margin-top:25px}

        /*New logic for infographic*/
        .skn-mlf1 .lang-sec .singlecolumn,.skn-mlf1 .skli-sec .singlecolumn,.skn-mlf1 .fielditem-olsh{display:none}
        .skn-mlf1 .lang-sec.infobarsec .infobarpara,.skn-mlf1 .lang-sec.infotilesec .infotilepara,
        .skn-mlf1 .skli-sec.infobarsec .infobarpara,.skn-mlf1 .skli-sec.infotilesec .infotilepara,.skn-mlf1 .nativeLangPara .fielditem-olsh{display:block}
        .skn-mlf1 .hide-bar .field-ratt{display:none}

        /*Infographic*/
        .skn-mlf1 .lang-sec,.skn-mlf1 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between;position:relative}
        .skn-mlf1 .lang-sec .paragraph, .skn-mlf1 .skli-sec .paragraph{width: 48.2%}
        .skn-mlf1 .lang-sec .heading, .skn-mlf1 .skli-sec .heading{position:absolute;left:auto}
        .skn-mlf1 .lang-sec .paragraph.nativeLangPara{width:100%}
        .skn-mlf1 .lang-sec.infobarsec .field p,.skn-mlf1 .lang-sec.infobarsec .nativeLangPara .field,
        .skn-mlf1 .skli-sec.infobarsec .field p{display:inline}
        .skn-mlf1 .lang-sec.infobarsec .paragraph,.skn-mlf1 .skli-sec.infobarsec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0}
        .skn-mlf1 .lang-sec.infobarsec .singlecolumn,.skn-mlf1 .skli-sec.infobarsec .singlecolumn{margin-left:0;padding-left:0;position:relative}
        .skn-mlf1 .lang-sec.infobarsec .rating-bar,.skn-mlf1 .skli-sec.infobarsec .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
        .skn-mlf1 .lang-sec.infobarsec .inner-rating,.skn-mlf1 .skli-sec.infobarsec .inner-rating{position:relative;background-color:#000;height:4px;width:60%}
        .skn-mlf1 .lang-sec.infobarsec > .paragraph:nth-last-child(1),.skn-mlf1 .lang-sec.infobarsec > .paragraph:nth-last-child(2),.skn-mlf1 .skli-sec.infobarsec > .paragraph:nth-last-child(1),.skn-mlf1 .skli-sec.infobarsec > .paragraph:nth-last-child(2){padding-bottom:0!important}
        .skn-mlf1 .lang-sec .paragraph .singlecolumn,.skn-mlf1 .skli-sec .paragraph .singlecolumn{border:none!important;padding:0px!important}

        .skn-mlf1 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-mlf1 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}
        .skn-mlf1 .lang-sec ul li:before,.skn-mlf1 .skli-sec ul li:before{left:-1px}

        /*Infographic Tiles*/
        .skn-mlf1 .lang-sec.infotilesec .paragraph,.skn-mlf1 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0}
        .skn-mlf1 .lang-sec.infotilesec > .paragraph:nth-last-child(1),.skn-mlf1 .lang-sec.infotilesec > .paragraph:nth-last-child(2),.skn-mlf1 .skli-sec > .paragraph:nth-last-child(1),.skn-mlf1 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0!important}
        .skn-mlf1 .lang-sec.infotilesec .field p,.skn-mlf1 .skli-sec .field p,.skn-mlf1 .lang-sec.infotilesec .nativeLangPara .field{display:inline}
        .skn-mlf1 .lang-sec.infotilesec .singlecolumn,.skn-mlf1 .skli-sec .paragraph .singlecolumn{margin-left:0}
        .skn-mlf1 .lang-sec.infotilesec .sliced-rect,.skn-mlf1 .skli-sec .sliced-rect{height:6px;width:100%;line-height:0px;margin-top:3px;clear:both}
        .skn-mlf1 .lang-sec.infotilesec .sliced-rect .sliced-rect-tile,.skn-mlf1 .skli-sec .sliced-rect .sliced-rect-tile{height:100%;background-color:#d5d6d6;float:left;margin-right:3px}
        .skn-mlf1 .lang-sec.infotilesec .sliced-rect .sliced-rect-tile:last-child,.skn-mlf1 .skli-sec .sliced-rect .sliced-rect-tile:last-child{margin-right:0}

        /*Rectangular Rating Blocks*/
        .skn-mlf1 .sliced-rect .sliced-rect-tile.ratvfill{background-color:#4a4a4a}
        .skn-mlf1 .hide-bar .paragraph .rating-bar,.skn-mlf1 .hide-bar .paragraph .sliced-rect,.skn-mlf1 .hide-only-bar .rating-bar,.skn-mlf1 .hide-colon .paragraph .colon{display:none !important}

         
        /*Infographic Languages Ordering Support*/
        .skn-mlf1 .lang-sec.infobarsec .colon,.skn-mlf1 .lang-sec.infotilesec .colon{display:none}
        .skn-mlf1 .lang-sec.infobarsec .field:first-child .colon,.skn-mlf1 .lang-sec.infotilesec .field:first-child .colon{display:inline}
        .skn-mlf1 .nativeLangPara .field:first-child{font-weight:bold}

        /*MFR address order code*/
        .skn-mlf1 .iconRow .icoTxt.zipsuffix{display:block}
        .skn-mlf1 .iconRow .icoTxt.zipprefix,.skn-mlf1.MFR .iconRow .icoTxt.zipsuffix,.skn-mlf1.MES .iconRow .icoTxt.zipsuffix{display:none}
        .skn-mlf1.MFR .iconRow .icoTxt.zipprefix,.skn-mlf1.MES .iconRow .icoTxt.zipprefix{display:block}
        .skn-mlf1 .address{display:table;table-layout:fixed;width:100%}
        .skn-mlf1 .address-inner{display:table-cell;width:50%;vertical-align:top}
        .skn-mlf1 .address-inner:first-child{padding-right:10px}

        /* PPDT */
        .skn-mlf1 .disclaim .field.singlecolumn{margin-left:0}
        .skn-mlf1 .disclaim .field.singlecolumn,.skn-mlf1 .disclaim .field.singlecolumn li,.skn-mlf1 .disclaim .field.singlecolumn p,.skn-mlf1 .disclaim .field.singlecolumn span{font-size:9px;color:#8a8a8a}
        .skn-mlf1 .section.disclaim .heading:before,.skn-mlf1 .parentContainer .section.disclaim,.skn-mlf1 .parentContainer .section.sign{border:none}

        /*For show/hide HPHN field based on portal*/
        .skn-mlf1 .rnaphonefield,.skn-mlf1.RNA .nonrnaphonefield,.skn-mlf1.CLN .nonrnaphonefield{display:none}
        .skn-mlf1 .nonrnaphonefield,.skn-mlf1.RNA .rnaphonefield,.skn-mlf1.CLN .rnaphonefield{display:block}

        /* GRYR */
        .skn-mlf1 .displayNoneThisField{display:none}/* Keep this class always at bottom */

        /*For Extra Space Before Colon*/
        .skn-mlf1 .beforecolonspace{display:none!important}
        .skn-mlf1.MFR .beforecolonspace{display:inline!important}
		
		/*HILT multi para/section*/
        .skn-mlf1 .multi-para-hilt:after{content: "";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/
        .skn-mlf1 .multi-para-hilt .paragraph{margin-bottom:20px;margin-top:0;width:49%;float:left}
        .skn-mlf1 .multi-para-hilt .paragraph:last-child,.skn-mlf1 .multi-para-hilt .paragraph:nth-last-child(2):nth-child(2n){margin-bottom:0}
        .skn-mlf1 .multi-para-hilt .paragraph:nth-child(2n+1){margin-left:2%}
        .skn-mlf1 .parentContainer .multi-para-hilt .singlecolumn,.skn-mlf1 .multi-para-hilt .paragraph.firstparagraph{margin:0}
        .skn-mlf1 .multi-section-hilt .multi-para-opt,.skn-mlf1 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-mlf1 .multi-para-hilt .twocol.skill{display:none}
		.skn-mlf1 .multi-para-hilt .paragraph:nth-child(3) .singlecolumn{border-top:0;padding-top:0}
        
       /*PICT support*/
       .skn-mlf1.pict-pcpf-none .pict-sec{display:none}

       /*Photo Layout styles*/
        .skn-mlf1.pict-pcsh-circle .paragraph .PICTPic img{border-radius:50%;border:1px solid #373737;box-sizing:border-box}
        .skn-mlf1.pict-pcsh-square .paragraph .PICTPic img{border-radius:unset;border:1px solid #373737;box-sizing:border-box}
        .skn-mlf1.pict-pcsh-bottomleft .paragraph .PICTPic img{border-radius:50%;border-bottom-left-radius:8px;border:1px solid #373737;box-sizing:border-box}
        .skn-mlf1.pict-pcsh-bottomright .paragraph .PICTPic img{border-radius:50%;border-bottom-right-radius:8px;border:1px solid #373737;box-sizing:border-box}
        .skn-mlf1.pict-pcsh-radius .paragraph .PICTPic img{border-radius:10px;border:1px solid #373737;box-sizing:border-box}

        /*Hyphen Handling*/
        .skn-mlf1 .hyphen:before{content:'-'}
        .skn-mlf1.hyphen-en-dash .hyphen:before{content:'–'}


        .skn-mlf1.for-iron-pdf{margin-top:-25px!important}

    

        .skn-mlf1,.skn-mlf1 table{line-height:14px}
        .skn-mlf1.pagesize{width:535px}
        .skn-mlf1.fontsize,.skn-mlf1 .lang-sec.infobarsec .paragraph *,.skn-mlf1 .lang-sec.infotilesec .paragraph *,.skn-mlf1 .skli-sec .paragraph *{font-size:10px}
        .skn-mlf1.fontface{font-family:Century Gothic}
        .skn-mlf1.hmargins{padding-left:30px;padding-right:30px}
        .skn-mlf1 .section{margin-top:25px}
        .skn-mlf1 .paragraph.firstparagraph{margin-top:0}
        .skn-mlf1 .paragraph{margin-top:20px}
        .skn-mlf1 .parentContainer .singlecolumn,.skn-mlf1 .parentContainer .maincolumn{margin-left:137px}
		
        .skn-mlf1 .name{font-size:26px;line-height:34px;color:#576d7b}
        .skn-mlf1 .resumeTitle{font-size:12px;line-height:20px}
        .skn-mlf1 .heading,.skn-mlf1 .heading:before{width:120px}
        .skn-mlf1 .sectiontitle{font-size:10px;line-height:12px}
        .skn-mlf1 .iconRow{line-height:12px}
        .skn-mlf1 .left-box{width:137px}
        .skn-mlf1 .right-box{margin-left:137px}
		.skn-mlf1 .skli-sec .singlecolumn .field:last-child{min-height:12px}

        .skn-mlf1 .parentContainer .section,.skn-mlf1 .heading:before{border-color:#576d7b}
        .skn-mlf1 .heading:before{background:#576d7b}
        .skn-mlf1 .topshape{fill:#576d7b;top:-1px}
        .skn-mlf1 .totl-expr{font-size:8px;background-color:#576d7b}

        /*Algorithm Width*/
        .skn-mlf1 .PICTPic,.skn-mlf1 .PICTPic .field{max-width:100px}
        .skn-mlf1 .topsection{border-top:25px solid #576d7b;min-height:150px}
    
        /*Icons*/
        .skn-mlf1 .iconRow svg path.rect{fill:#576d7b}
        .skn-mlf1 .iconRow svg .svg-fillsqrbg,.skn-mlf1 .iconRow .new-flds svg path,.skn-mlf1 .iconRow svg .svg-inriconobj{fill:#576d7b}
        .skn-mlf1 .iconRow .iconSvg{height:10px;width:10px}
        .skn-mlf1 .iconRow .iconSvg svg{height:10px;width:10px}
        .skn-mlf1 .square{height:10px;width:10px;background-color:#576d7b}

        /*Infographic Bar*/
        .skn-mlf1 .lang-sec.infobarsec,.skn-mlf1 .skli-sec.infobarsec{padding-left:137px;box-sizing:border-box}
        .skn-mlf1 .lang-sec.infobarsec .heading,.skn-mlf1 .skli-sec.infobarsec .heading,.skn-mlf1 .multi-para-hilt .heading{margin-left:-137px}
        .skn-mlf1 .lang-sec.infobarsec .inner-rating,.skn-mlf1 .skli-sec.infobarsec .inner-rating{background-color:#576d7b}

        .skn-mlf1 .fielditem-olsh{padding-top:5px;margin-bottom:-3px}

        /*Infographic Tiles*/
        .skn-mlf1 .lang-sec.infotilesec,.skn-mlf1 .skli-sec,.skn-mlf1 .multi-para-hilt{padding-left:137px;box-sizing:border-box}
        .skn-mlf1 .lang-sec.infotilesec .heading,.skn-mlf1 .skli-sec .heading,.skn-mlf1 .lang-sec .title-edit{margin-left:-137px}

        /*Rectangular Rating Blocks*/
        .skn-mlf1 .paragraph .sliced-rect .sliced-rect-tile.ratvfill{background-color:#576d7b}
   
        /*Finalize Fixes*/
        .skn-mlf1 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}
        .skn-mlf1 .lang-sec .sortableInner .sortable-item:not(:first-child) .paragraph,.skn-mlf1 .skli-sec .sortableInner .sortable-item:not(:first-child) .paragraph{vertical-align:top}
        .skn-mlf1 .data-LNGG .sortable-item:nth-last-child(1) .paragraph,.skn-mlf1 .data-LNGG .sortable-item:nth-last-child(2) .paragraph,.skn-mlf1 .data-SKLI .sortable-item:nth-last-child(1) .paragraph,.skn-mlf1 .data-SKLI .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0}
        .skn-mlf1 .name-contact .section.SECTION_CNTC, .skn-mlf1 .name-contact .section.SECTION_ALNK {float:none;display:inline-block;margin-top:0;padding: 0 1% 0 0;}
        .skn-mlf1.LUK .parentContainer{padding-bottom:30px}
        .skn-mlf1.LUK .right-box .SECTION_NAME{margin-top:0}
        .page-finalize .skn-mlf1 .sortableInner .paragraph-container+.paragraph-container,.page-finalize .sortable-drag-item.skn-mlf1 .section{margin:0}
        .skn-mlf1 .data-LNGG .sortableInner .sortable-item,.skn-mlf1 .data-SKLI .sortableInner .sortable-item{display:inline-block;vertical-align:top}
        .skn-mlf1.LES .lang-sec .title-edit{margin-left:-137px}
        .skn-mlf1 .left-box .sortable-item:first-child .section,.skn-mlf1 .right-box .sortable-item:first-child .section{margin-top:0}
        .skn-mlf1 .left-box .sortable-item:first-child .section{padding-top:20px}
        .skn-mlf1.LES{padding-bottom:25px}
        .skn-mlf1.LES .data-EDUC .sortableInner,.skn-mlf1.LES .data-EXPR .sortableInner{display:inline-block;width:calc(100% - 124px)}
        .skn-mlf1.LES .data-EDUC .sortableInner .singlecolumn,.skn-mlf1.LES .data-EXPR .sortableInner .singlecolumn{margin-left:16px}
        .skn-mlf1.LES .data-EDUC .sortableInner .paragraph .doc-overlay,.skn-mlf1.LES .data-EXPR .sortableInner .paragraph .doc-overlay{left:5px!important}
        .skn-mlf1 .data-LNGG .sortable-item.native-lang{width:100%;max-width:100%}
        .skn-mlf1 .data-LNGG .doc-item,.skn-mlf1 .data-SKLI .doc-item,.skn-mlf1 .lang-sec .doc-item,.skn-mlf1 .skli-sec .doc-item{width:100%}
        .skn-mlf1 .data-LNGG .sortableInner,.skn-mlf1 .data-SKLI .sortableInner,.skn-mlf1 .SECTION_LNGG .sortableInner,.skn-mlf1 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-mlf1 .data-LNGG .sortable-item,.skn-mlf1 .data-SKLI .sortable-item{width:48.2%}
        .skn-mlf1 .data-LNGG .sortable-item .paragraph,.skn-mlf1 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}
        .page-finalize .skn-mlf1 .section.lang-sec .sortableInner .paragraph{margin-top:0}

        /*Photo Layout styles*/
        .skn-mlf1.pict-pcsh-circle .paragraph .PICTPic img{width:99px;height:99px}
        .skn-mlf1.pict-pcsh-square .paragraph .PICTPic img{width:99px;height:99px}
        .skn-mlf1.pict-pcsh-bottomleft .paragraph .PICTPic img{height:99px;width:99px}
        .skn-mlf1.pict-pcsh-bottomright .paragraph .PICTPic img{height:99px;width:99px}
        .skn-mlf1.pict-pcsh-radius .paragraph .PICTPic img{height:99px;width:99px}

        /*PPDT*/
        .skn-mlf1 .disclaim.section{margin:0;padding:0;margin-top:50px}

        /*RNA fixes*/
        .RNA .name-contact .firstsection{margin-top:0}
        .RNA.skn-mlf1 .parentContainer{padding-bottom:25px}
        .RNA.skn-mlf1 .data-LNGG .sortableInner .sortable-item{display:inline-block;vertical-align:top}
        .RNA.skn-mlf1 .data-LNGG .nativeLangPara{width:100%!important;max-width:100%!important}
        .RNA.skn-mlf1 .data-LNGG .para_odd{margin-right:15px}
        .RNA.skn-mlf1 .PICTPic, .RNA.skn-mlf1 .PICTPic .field{height:129px; width:100px}
        .skn-mlf1 .doc-item .heading::before, .skn-mlf1 .doc-item .heading{width:124px}
        .skn-mlf1.LDE .left-box .SECTION_PICT{margin-top:0;padding-top:20px}
        .skn-mlf1.LDE .right-box .SECTION_NAME {margin-top:0}
        .skn-mlf1 .right-box .sortable-item .section.SECTION_NAME{margin-bottom:16px}
		@-moz-document url-prefix() {
        .skn-mlf1 .heading::before{top:-7px}
        .resume-preview .skn-mlf1 .parentContainer .section{border-width:2px}
        }
        
		 /*Fixes for builder for skill*/
        .skn-mlf1 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:12px}	
        .skn-mlf1 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-mlf1 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}	
       
        .skn-mlf1 .skli-sec.graphic-none-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:auto}	

        /*PDF Flex Handling Code - Personal Information*/
		.skn-mlf1.for-pdf .pdet-sec .singlecolumn{display:block}
		.skn-mlf1.for-pdf .pdfpdwrapper{display:block}
		.skn-mlf1.for-pdf .pdfpdwrapper .details-wrap:first-child{float:left;padding-right:5px}
		.skn-mlf1.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){float:right}
		.skn-mlf1.for-pdf .pdfpdwrapper .details-wrap{width:194px;}

        /*Infographic Containers*/
        .skn-mlf1.for-pdf .lang-sec,.skn-mlf1.for-pdf .skli-sec{display:block}
        .skn-mlf1.for-pdf .pdfinfwrapper{display:block}
        .skn-mlf1.for-pdf .pdfinfwrapper:after{content:'';clear:both;display:table}
        .skn-mlf1.for-pdf .pdfinfwrapper .paragraph:first-child{float:left}
        .skn-mlf1.for-pdf .pdfinfwrapper .paragraph:nth-child(2){float:right}
        .skn-mlf1.for-pdf .pdfinfwrapper:last-child .paragraph{margin-bottom:0;padding-bottom:0}

        .skn-mlf1.for-pdf .skli-sec ul li:before, .skn-mlf1.for-pdf .lang-sec ul li:before{left:-1.3px!important}
        .skn-mlf1.for-iron-pdf .skli-sec ul li:before, .skn-mlf1.for-iron-pdf .lang-sec ul li:before{left:-1px!important}
    `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-mlf1 MLF1 MUK hyphen-normal pict-pcpf-purl texp-rectangle " docskinwidth="595" ><div data-testid="embd-92LqKqF0" id="CONTAINER_PARENT_0" className="topsection hidesecondpass"><div data-testid="embd-92PDkR60" id="CONTAINER_0" className="left-box"><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="5" className="sortable-item section-container SortableItem-sibling  data-PICT"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-PICT" id="SECTION_PICTa2e3abc4-fc5a-4d5c-80fb-ac187cd5be60" className="section notdraggable pict-sec SECTION_PICT firstsection" data-section-cd="PICT"><div data-testid="embd-88uQIHR-PICT" className="doc-item"><div data-testid="embd-88aw0Ce-PICT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-389ae0dd-26d7-4892-a4b9-d1e4f0b10399" id="PARAGRAPH_PICT_389ae0dd-26d7-4892-a4b9-d1e4f0b10399" className="paragraph PARAGRAPH_PICT firstparagraph placeholder-text"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="PICTPic">
                            <div className="field" id="FIELD_PURL"><img data-testid="embd-78pIea6" className="chk" src="https://assets.myperfectcv.co.uk/blobimages/muk/builder/images/sampleSkinImage.png" alt="Smiley face" /> </div>
                        </div>
                    </div></div></div></div></div></div></div></div><div data-testid="embd-92V3aoN1" id="CONTAINER_1" className="right-box"><div data-testid="embd-92jKFs0-1" data-react-beautiful-dnd-draggable="5" className="sortable-item section-container SortableItem-sibling name-contact "><div data-testid="embd-92UIU6N-1" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-NAME" id="SECTION_NAME1a1a32ad-f01c-4377-b2f6-1a65f9bf6cb8" className="section notdraggable SECTION_NAME firstsection" data-section-cd="NAME"><div data-testid="embd-88uQIHR-NAME" className="doc-item"><div data-testid="embd-88aw0Ce-NAME" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-44bc0bd4-6d0c-480d-8f32-8d70df1621d0" id="PARAGRAPH_NAME_44bc0bd4-6d0c-480d-8f32-8d70df1621d0" className="paragraph PARAGRAPH_NAME firstparagraph"><div data-testid="embd-78blCsH">
                        <svg className="topshape" height="18px" width="18px" viewBox="0 0 18 18">
                            <polygon points="0,0 0,18 18,0"></polygon>
                        </svg>
                        <div className="name" data-uppercase="true" dependency="FNAM|LNAM">
                            <span id="FIELD_FNAM">Dom</span>
                            <span dependency="FNAM+MNAM|LNAM"> </span>
                            
                            <span dependency="MNAM + LNAM"> </span> 
                            <span id="FIELD_LNAM">Webster</span>
                        </div>
                        
                    </div></div></div></div></div></div><div data-testid="embd-88MByq6-CNTC" id="SECTION_CNTCd3d40c22-1b29-401e-a809-9cb7e72d6fdc" className="section SECTION_CNTC notdraggable" data-section-cd="CNTC"><div data-testid="embd-88uQIHR-CNTC" className="doc-item"><div data-testid="embd-88aw0Ce-CNTC" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-3912838f-29f6-467c-8297-bf45ee1ff720" id="PARAGRAPH_CNTC_3912838f-29f6-467c-8297-bf45ee1ff720" className="paragraph PARAGRAPH_CNTC firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="address">
                            <div className="address-inner">
                                <div className="iconRow" dependency="ADDR|STRT|CITY|STAT|ZIPC">
                                    <div className="iconSvg">
                                        <svg viewBox="0 0 10 10"><path className="rect" fill="#576d7b" d="M0 0h10v10H0z"></path><path fill="#fff" d="M5.004 5.287a1.143 1.143 0 0 1 0-2.284 1.143 1.143 0 0 1 0 2.284zm0-3.407A2.266 2.266 0 0 0 2.74 4.143c0 1.55 2.026 3.823 2.112 3.92.08.09.222.09.303 0 .086-.097 2.112-2.37 2.112-3.92A2.266 2.266 0 0 0 5.003 1.88z"></path></svg>
                                    </div>
                                    <div className="icoTxt zipsuffix">
                                        <span id="FIELD_STRT">46 Roman Rd</span><span dependency="STRT"><span dependency="NBHD|CITY|STAT">,</span></span>
                                        <span id="FIELD_NBHD"></span>
                                        <span id="FIELD_CITY">Leeds</span>
                                        <span id="FIELD_STAT"></span>
                                        <span id="FIELD_ZIPC">LS2 3ZR</span>
                                        <span id="FIELD_ADDR"></span>
                                    </div>
                                    
                                </div>
                                   
                                
                                <div className="iconRow nonrnaphonefield" dependency="HPHN|CPHN">
                                    <div className="iconSvg">
                                        <svg viewBox="0 0 10 10"><path className="rect" fill="#576d7b" d="M4.58 5.382c.62.606 1.166.801 1.366.853l.746-.73c.063-.061.168-.061.241 0l1.418 1.387c.032.031.053.072.053.113 0 .041-.01.093-.042.123l-.83.812-.02.02-.022.01c-.21.165-.483.247-.82.247-.934 0-2.237-.678-3.308-1.725-1.524-1.47-2.185-3.246-1.524-4.047l.032-.031.83-.812c.063-.061.168-.061.241 0L4.36 2.99c.031.03.052.072.052.113a.163.163 0 0 1-.052.113l-.746.73c.063.174.325.8.966 1.437zM0 0v9.768h9.99V0z"></path></svg>
                                    </div>
                                    <div className="icoTxt">
                                        <span id="FIELD_HPHN">07912 345 678</span>
                                        <span id="FIELD_CPHN"></span>
                                    </div>
                                </div>
                                <div className="iconRow" dependency="EMAI">
                                    <div className="iconSvg">
                                        <svg viewBox="0 0 10 10"><path className="rect" fill="#576d7b" d="M8.044 2.968v4.058c0 .073-.06.136-.131.136H1.72a.136.136 0 0 1-.13-.136V2.968c0-.074.06-.137.13-.137h6.192c.07 0 .13.063.13.137zM9.614 0H0v9.973h.161c.02.01.05.01.07.01h9.162c.03 0 .05-.01.07-.01h.151z"></path><path className="rect" fill="#576d7b" d="M7.592 3.475a.087.087 0 0 0-.1 0L4.88 4.898c-.04.02-.09.02-.119 0L2.138 3.475c-.03-.02-.069-.01-.099 0-.03.021-.049.052-.049.083v.515c0 .042.02.073.05.093L4.76 5.723c.02.01.03.01.05.01.02 0 .03 0 .05-.01l2.72-1.557a.11.11 0 0 0 .05-.093v-.515c.01-.031-.01-.062-.04-.083z"></path></svg>
                                    </div>
                                    <div className="icoTxt">
                                        <span id="FIELD_EMAI">dom.webster@example.co.uk</span>
                                    </div>
                                </div>                                                               
                                
                                 
                                
                            </div>
                            <div className="address-inner">
                                
                                
                                
                                
                                
                                                                
                                 
                                 
                                 
                                 
                                                               
                            </div>
                        </div>
                        
                    </div></div></div></div></div></div><div className="doc-overlay section-overlay" style={{ left: '-2px', right: '-2px' }}><span> </span></div></div></div></div><div data-testid="embd-92LqKqF1" id="CONTAINER_PARENT_1" className="parentContainer hidefirstpass"><div data-testid="embd-92PDkR62" id="CONTAINER_2" className=""><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="6" className="sortable-item section-container SortableItem-sibling  data-SUMM"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">PROFESSIONAL SUMMARY<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename PROFESSIONAL SUMMARY " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn" id="FIELD_FRFM"><p>Motivated Care Assistant with 10 years of experience in the Care industry. Offering expertise in person-centred care, implementation and monitoring of individual care plans and management of resident assessments and files. Energetic self-starter and team builder able to navigate high-stress situations. Well-versed in monitoring clients with developmental disabilities and adhering to patient care plans.</p></div>
                    </div></div></div></div></div></div></div><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="6" className="sortable-item section-container SortableItem-sibling  data-EXPR"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">Work history<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Work history " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner"><div data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="6" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="6" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-998e66f0-eaa8-4a72-b41c-7158c85a1d86" id="PARAGRAPH_EXPR_998e66f0-eaa8-4a72-b41c-7158c85a1d86" className="paragraph PARAGRAPH_EXPR firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn" dependency="JTIT|JSTD|EDDT|COMP|JSTA|JCIT|JCNT|JCTR|JDES">
                            <span className="dispBlock" dependency="JTIT|JSTD|EDDT|TEXP">
                                <span className="jobtitle txtCaps txt-bold" data-uppercase="true" id="FIELD_JTIT">Senior Care Assistant</span><span dependency="JTIT"><span dependency="JSTD|EDDT">, </span></span>
                                <span className="jobdates" id="FIELD_JSTD" format="%m/%Y">07/2014</span>
                                <span dependency="JSTD+EDDT" className="hyphen"></span>
                                <span className="jobdates" id="FIELD_EDDT" format="%m/%Y">Current</span>
                                <span className="totl-expr" id="FIELD_TEXP"></span>
                            </span>
                            <span className="dispBlock locationGap" dependency="COMP|JSTA|JCIT|JCNT|JCTR">
                                <span className="companyname txt-bold txtItl" id="FIELD_COMP">Private Care Home</span><span dependency="COMP"><span dependency="JSTA|JCIT|JCNT">, </span></span><span className="jobcity" id="FIELD_JCIT">Edinburgh</span><span dependency="JCIT"></span><span className="jobstate" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span>
                                
                                <span id="FIELD_JCTR"></span>
                            </span>
                            <span className="jobline" id="FIELD_JDES"><ul><li>Met with patients and families to discuss care and plan of action htmlFor future.</li>
  <li>Implemented new team onboarding programme, reducing training time from four weeks to two.</li>
  <li>Administered all necessary medications as directed by care plan.</li></ul></span>
                        </div>
                    </div></div></div><div data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="6" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="6" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-5c57d155-aa5a-4a63-87f2-90490c80548b" id="PARAGRAPH_EXPR_5c57d155-aa5a-4a63-87f2-90490c80548b" className="paragraph PARAGRAPH_EXPR"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn" dependency="JTIT|JSTD|EDDT|COMP|JSTA|JCIT|JCNT|JCTR|JDES">
                            <span className="dispBlock" dependency="JTIT|JSTD|EDDT|TEXP">
                                <span className="jobtitle txtCaps txt-bold" data-uppercase="true" id="FIELD_JTIT">Care Assistant</span><span dependency="JTIT"><span dependency="JSTD|EDDT">, </span></span>
                                <span className="jobdates" id="FIELD_JSTD" format="%m/%Y">09/2010</span>
                                <span dependency="JSTD+EDDT" className="hyphen"></span>
                                <span className="jobdates" id="FIELD_EDDT" format="%m/%Y">06/2014</span>
                                <span className="totl-expr" id="FIELD_TEXP"></span>
                            </span>
                            <span className="dispBlock locationGap" dependency="COMP|JSTA|JCIT|JCNT|JCTR">
                                <span className="companyname txt-bold txtItl" id="FIELD_COMP">Ideal Care Homes</span><span dependency="COMP"><span dependency="JSTA|JCIT|JCNT">, </span></span><span className="jobcity" id="FIELD_JCIT">Edinburgh</span><span dependency="JCIT"></span><span className="jobstate" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span>
                                
                                <span id="FIELD_JCTR"></span>
                            </span>
                            <span className="jobline" id="FIELD_JDES"><ul><li>Charted daily information such as mood changes, mobility activity, eating percentages and daily inputs and outputs.</li>
  <li>Developed strong and trusting rapport with each client to facilitate best care possible.</li>
  <li>Worked to improve patient outlook and daily living through compassionate care.</li></ul></span>
                        </div>
                    </div></div></div><div data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="6" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="6" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-5c57d155-aa5a-4a63-87f2-90490c80548b" id="PARAGRAPH_EXPR_5c57d155-aa5a-4a63-87f2-90490c80548b" className="paragraph PARAGRAPH_EXPR"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn" dependency="JTIT|JSTD|EDDT|COMP|JSTA|JCIT|JCNT|JCTR|JDES">
                            <span className="dispBlock" dependency="JTIT|JSTD|EDDT|TEXP">
                                <span className="jobtitle txtCaps txt-bold" data-uppercase="true" id="FIELD_JTIT">Care Assistant</span><span dependency="JTIT"><span dependency="JSTD|EDDT">, </span></span>
                                <span className="jobdates" id="FIELD_JSTD" format="%m/%Y">11/2008</span>
                                <span dependency="JSTD+EDDT" className="hyphen"></span>
                                <span className="jobdates" id="FIELD_EDDT" format="%m/%Y">08/2010</span>
                                <span className="totl-expr" id="FIELD_TEXP"></span>
                            </span>
                            <span className="dispBlock locationGap" dependency="COMP|JSTA|JCIT|JCNT|JCTR">
                                <span className="companyname txt-bold txtItl" id="FIELD_COMP">Four Seasons Health Care</span><span dependency="COMP"><span dependency="JSTA|JCIT|JCNT">, </span></span><span className="jobcity" id="FIELD_JCIT">Edinburgh</span><span dependency="JCIT"></span><span className="jobstate" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span>
                                
                                <span id="FIELD_JCTR"></span>
                            </span>
                            <span className="jobline" id="FIELD_JDES"><ul><li>Maintained confidentiality and compliance standards at all times.</li>
  <li>Maintained clean and well-organised environment to promote client happiness and safety.</li>
  <li>Assisted disabled individuals to foster independence while still closely monitoring safety.</li>
  <li>Supervised frequent activities such as medication and personal hygiene to provide safe living environment htmlFor patients.</li></ul></span>
                        </div>
                    </div></div></div></div></div></div></div></div><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="6" className="sortable-item section-container SortableItem-sibling  data-HILT"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">SKILLS<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename SKILLS " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn maincolumn">
                    <table className="twocol skill">
                        <tbody><tr>
                            <td className="field twocol_1 paddedline" id="FIELD_SKC1"><ul><li>Strong verbal communication</li>
  <li>Attention to detail</li>
  <li>Community activities</li>
  <li>Medication administration</li>
  <li>Care plan management</li></ul></td>
                            <td className="field twocol_2 paddedline" id="FIELD_SKC2"><ul><li>Risk management processes and analysis</li>
  <li>Client safety and First Aid</li>
  <li>Compassionate client care</li>
  <li>Behaviour redirection</li></ul></td>
                        </tr>
                    </tbody></table>
                    <div className="multi-para-opt">
                        <div id="FIELD_PTTL" className="txt-bold"></div>
                            <div className="multi-para-content">
                                <div id="FIELD_SKC1"><ul><li>Strong verbal communication</li>
  <li>Attention to detail</li>
  <li>Community activities</li>
  <li>Medication administration</li>
  <li>Care plan management</li></ul></div>
                                <div id="FIELD_SKC2"><ul><li>Risk management processes and analysis</li>
  <li>Client safety and First Aid</li>
  <li>Compassionate client care</li>
  <li>Behaviour redirection</li></ul></div>
                            </div>
                    </div>
                </div>
            </div></div></div></div></div></div></div><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="6" className="sortable-item section-container SortableItem-sibling  data-EDUC"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">EDUCATION<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename EDUCATION " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner"><div data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="6" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="6" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-e0037f47-0bb8-4767-a441-48042b09746f" id="PARAGRAPH_EDUC_e0037f47-0bb8-4767-a441-48042b09746f" className="paragraph PARAGRAPH_EDUC firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn">
                            <div dependency="SCIT|SSTA|SCHO|GRYR|GRST|GRED|GRIP|SCNT" className="txtItl">
                                <span className="companyname txt-bold" id="FIELD_SCHO">Edinburgh College</span><span dependency="SCHO"><span dependency="SCIT|SSTA|SCNT|GRYR|GRST|GRED|GRIP">, </span></span><span className="joblocation jobcity" id="FIELD_SCIT">Edinburgh</span><span dependency="SCIT"><span dependency="SSTA|SCNT|GRYR|GRST|GRED|GRIP">, </span></span><span className="joblocation jobstate" id="FIELD_SSTA"></span><span className="joblocation jobcountry" id="FIELD_SCNT"></span>
								<span className="xslt_static_change displayNoneThisField">Expected in </span>
								<span id="FIELD_GRYR" format="%m/%Y">2013</span>
								<span className="jobdates" id="FIELD_GRST" format="%m/%Y"></span>
                                
                                <span className="jobdates" id="FIELD_GRED" format="%m/%Y"></span>
								
								<span id="FIELD_GRIP"></span>
                            </div>
                            <div className="degreeGap" dependency="DGRE|STUY|GRPA|GRHN">
                                <span className="degree txt-bold" id="FIELD_DGRE">NVQ Level 3</span><span dependency="DGRE+STUY"><span className="beforecolonspace"> </span><span>: </span></span><span className="programline txt-bold" id="FIELD_STUY">Health And Social Care</span>
								
                                <span className="txt-bold" id="FIELD_GRHN"></span>
                                
                            </div>
                            
                            <span id="FIELD_FRFM"></span>
                        </div>
                    </div></div></div><div data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="6" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="6" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-e0037f47-0bb8-4767-a441-48042b09746f" id="PARAGRAPH_EDUC_e0037f47-0bb8-4767-a441-48042b09746f" className="paragraph PARAGRAPH_EDUC"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn">
                            <div dependency="SCIT|SSTA|SCHO|GRYR|GRST|GRED|GRIP|SCNT" className="txtItl">
                                <span className="companyname txt-bold" id="FIELD_SCHO">Edinburgh College</span><span dependency="SCHO"><span dependency="SCIT|SSTA|SCNT|GRYR|GRST|GRED|GRIP">, </span></span><span className="joblocation jobcity" id="FIELD_SCIT">Edinburgh</span><span dependency="SCIT"><span dependency="SSTA|SCNT|GRYR|GRST|GRED|GRIP">, </span></span><span className="joblocation jobstate" id="FIELD_SSTA"></span><span className="joblocation jobcountry" id="FIELD_SCNT"></span>
								<span className="xslt_static_change displayNoneThisField">Expected in </span>
								<span id="FIELD_GRYR" format="%m/%Y">2008</span>
								<span className="jobdates" id="FIELD_GRST" format="%m/%Y"></span>
                                
                                <span className="jobdates" id="FIELD_GRED" format="%m/%Y"></span>
								
								<span id="FIELD_GRIP"></span>
                            </div>
                            <div className="degreeGap" dependency="DGRE|STUY|GRPA|GRHN">
                                <span className="degree txt-bold" id="FIELD_DGRE">NVQ Level 2</span><span dependency="DGRE+STUY"><span className="beforecolonspace"> </span><span>: </span></span><span className="programline txt-bold" id="FIELD_STUY">Health And Social Care</span>
								
                                <span className="txt-bold" id="FIELD_GRHN"></span>
                                
                            </div>
                            
                            <span id="FIELD_FRFM"></span>
                        </div>
                    </div></div></div></div></div></div></div></div></div></div></div><div></div></div></div>
    </>
  );
}
