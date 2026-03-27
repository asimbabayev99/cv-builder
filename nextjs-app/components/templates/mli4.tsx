/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations, formatDate } from "@/lib/translations";

const defaultTranslations = translations.en;

export default function TemplateMli4({
  data = sampleData,
  translations: t = defaultTranslations,
  language = "en",
  colorHex = "#576d7b",
}: Partial<DynamicTemplateProps> = {}) {
  const skills = data.skills || [];
  const experiences = data.experiences || [];
  const educations = data.educations || [];
  const languages = data.languages || [];

  const getLevelWidth = (level: number | undefined) => {
    if (!level) return "60%";
    return `${(level / 5) * 100}%`;
  };

  const getProficiencyLabel = (proficiency: string | undefined) => {
    if (!proficiency) return "";
    return proficiency.charAt(0).toUpperCase() + proficiency.slice(1);
  };

  const formatExperienceDate = (date: string | undefined, currentlyWorking?: boolean) => {
    if (currentlyWorking) return "Current";
    if (!date) return "";
    return formatDate(date, "MM/YYYY", language);
  };

  const formatEducationDate = (date: string | undefined) => {
    if (!date) return "";
    return formatDate(date, "YYYY", language);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Oswald:300,400,700');
        @import url('https://fonts.googleapis.com/css?family=PT+Sans:400,700');
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-mli4 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        /*START content disc style for LI*/
        .skn-mli4 ul,.skn-mli4 li{list-style:none;margin:0 0 0 8px;padding:0}
        .skn-mli4 ul li{position:relative;margin:3px 0 0 0}
        .skn-mli4 ul li:before{content:'\\2022';position:absolute;left:-8px;top:0}
        .skn-mli4 .skli-sec ul li:before,.skn-mli4 .lang-sec ul li:before{left:-9px}
        /*END content disc style for LI*/

        .skn-mli4 .txt-bold{font-weight:bold}
        .skn-mli4 .skli-name-normalwgt .txt-bold{font-weight:400}
        .skn-mli4 .dispBlock{display:block}
        .skn-mli4 .flt-right{float:right}
        .skn-mli4 .pb5{padding-bottom:5px}
        .skn-mli4 .brk-all{word-break:break-all}

        /*Document*/
        .skn-mli4{color:#46464e;line-height:13px;word-wrap:break-word}
        .skn-mli4 .name{color:#eef0f1;font-weight:300;padding:0 0 12px 0;text-align:center;text-transform:uppercase;font-family:'Oswald'}
        .skn-mli4 .resumeTitle{color:#eef0f1;font-weight:bold;text-align:center;text-transform:uppercase;letter-spacing:1px}

        /* common left-right container */
        .skn-mli4 .section{position:relative}
        .skn-mli4 .left-box,.skn-mli4 .right-box,.skn-mli4 .top-box{box-sizing:border-box;position:relative;padding:25px;display:table-cell;vertical-align:top}
        .skn-mli4 .section:empty{display:none}

        /* Common Heading style */
        .skn-mli4 .heading{padding-bottom:5px}
        .skn-mli4 .sectiontitle{text-transform:uppercase;color:#000;font-weight:700;letter-spacing:.5px}

        /* Top section */
        .skn-mli4 .topsection{background:${colorHex};position:relative}
        .skn-mli4 .topsection .section{border:none;margin-bottom:0;padding:0}
        .skn-mli4 .topsection .top-box{display:block;width:100%;position:relative}
        .skn-mli4 .topsection .top-box:before{content:'';border-bottom:3px solid #fff;height:5px;width: 100%;position:absolute;left:0;bottom:0}
        .skn-mli4 .address{color:#000}
        .skn-mli4 .address .dispBlock:last-child{padding-bottom:0}

        /* Icon style */
        .skn-mli4 .icon-section{position:absolute;top:0;bottom:3px;margin:auto}
        .skn-mli4 .icon-section .paragraph{padding-left:0;height:100%}
        .skn-mli4 .icon-section .paragraph > div{display:flex;align-items:center;height:100%}
        .skn-mli4 .icon-section + .section .name{padding-bottom:5px}
        .skn-mli4 .icon-section img{vertical-align:middle}

        /*parentContainer*/
        .skn-mli4 .parentContainer{display:table;table-layout:fixed;width:100%}
        .skn-mli4 .paragraph{padding-left:15px}
        .skn-mli4 .parentContainer .left-box:before{position:absolute;width:100%} /* Used for PDF processing. Do not modify */
        .skn-mli4 .parentContainer .left-box:before{content:'';background:${colorHex};opacity:.15;left:0;top:0;height:100%}
        .skn-mli4 .parentContainer .left-box,.skn-mli4 .parentContainer .right-box{padding-top:40px;padding-left:30px;padding-right:30px;position:relative}
        .skn-mli4 .parentContainer .right-box .section{border-color:#4a4a4a}
        .skn-mli4 .parentContainer .right-box:before{content:'';background:${colorHex};opacity:.15;position:absolute;left:0;top:0;height:10px;width:100%}
        .skn-mli4 .jobline{display:block}
        .skn-mli4 .social .field a{color:#0000EE;text-decoration:underline}
        .skn-mli4 .social .field a:hover{text-decoration:underline}

        /* SVG Icon Style */
        .skn-mli4 .iconRow{clear:both;display:table;margin-bottom:10px}
        .skn-mli4 .iconRow:last-child{padding-bottom:0}
        .skn-mli4 .iconSvg{width:16px;height:15px;display:table-cell;text-align:center;margin-top:0}
        .skn-mli4 .icoTxt{display:table-cell;padding-left:10px;vertical-align:top}

        /*New logic for infographic*/
        .skn-mli4 .lang-sec .singlecolumn{display:none}
        .skn-mli4 .lang-sec.infobarsec .infobarpara,.skn-mli4 .lang-sec.infotilesec .infotilepara{display:block}

        /*Infographic*/
        .skn-mli4 .lang-sec.infobarsec .field *,.skn-mli4 .lang-sec.infobarsec .nativeLangPara .field{display:inline}
        .skn-mli4 .lang-sec.infobarsec .paragraph{clear:both;margin-top:0}
        .skn-mli4 .rating-bar{background:#fff;width:100%;clear:both;margin-top:3px;page-break-inside:avoid}
        .skn-mli4 .right-box .rating-bar{background:#d5d6d6}
        .skn-mli4 .inner-rating{background-color:${colorHex};height:4px;width:60%}
        .skn-mli4 .topsection{z-index:2}   /*For PDF logic*/
        .skn-mli4 .compfont,.skn-mli4 .pdet-sec .txt-bold{color:#000}

        /*Infographic Tiles*/
        .skn-mli4 .lang-sec.infotilesec .paragraph,.skn-mli4 .skli-sec .paragraph{width:100%;display:inline-block;vertical-align:top;margin-top:0;clear:both;box-sizing:border-box}
        .skn-mli4 .lang-sec.infotilesec > .paragraph:nth-last-child(1),.skn-mli4 .skli-sec > .paragraph:nth-last-child(1){padding-bottom:0!important}
        .skn-mli4 .lang-sec.infotilesec .nativeLangPara .field,.skn-mli4 .lang-sec.infotilesec .field p,.skn-mli4 .skli-sec .field p{display:inline}
        .skn-mli4 .lang-sec.infotilesec .sliced-rect,.skn-mli4 .skli-sec .sliced-rect{height:6px;width:100%;line-height:0px;margin-top:3px;clear:both}
        .skn-mli4 .lang-sec.infotilesec .sliced-rect .sliced-rect-tile,.skn-mli4 .skli-sec .sliced-rect .sliced-rect-tile{height:100%;background-color:#d5d6d6;float:left;margin-right:3px}
        .skn-mli4 .lang-sec.infotilesec .sliced-rect .sliced-rect-tile:last-child,.skn-mli4 .skli-sec .sliced-rect .sliced-rect-tile:last-child{margin-right:0}
        .skn-mli4 .left-box .lang-sec.infotilesec .sliced-rect .sliced-rect-tile,.skn-mli4 .left-box .skli-sec .sliced-rect .sliced-rect-tile{background-color:#fff}

        /*Rectangular Rating Blocks*/
        .skn-mli4 .sliced-rect .sliced-rect-tile.ratvfill{background-color:${colorHex}}
        .skn-mli4 .hide-bar .rating-bar,.skn-mli4 .hide-bar .sliced-rect,.skn-mli4 .hide-colon .no-colon,.skn-mli4 .lang-sec.hide-only-bar .rating-bar,.skn-mli4 .lang-sec.hide-only-bar.infotilesec .sliced-rect{display:none!important}
        .skn-mli4 .hide-bar .field-ratt,.skn-mli4 .hide-only-bar .rating-bar{display:none}

        .skn-mli4 .nativeLangPara .field:first-child{font-weight:bold}

        /*MFR address*/
        .skn-mli4 .zipsuffix,.skn-mli4.MFR .zipprefix,.skn-mli4.MES .zipprefix{display:block}
        .skn-mli4 .zipprefix,.skn-mli4.MFR .zipsuffix,.skn-mli4.MES .zipsuffix{display:none}

        /*MUK colon*/
        .skn-mli4 .mukcolon{display:none}
        .skn-mli4.MUK .mukcolon{display:inline!important}
        .skn-mli4.MUK .colon{display:none!important}

        /*Builder fix*/
        .skn-mli4 .parentContainer .right-box .sortable-item:first-child .section{border:none;padding-top:0}

        /* GRYR */
        .skn-mli4 .displayNoneThisField{display:none}/* Keep this class always at bottom */

		/*HILT multi para/section*/
        .skn-mli4 .multi-para-hilt:after,.skn-mli4 .multi-para-hilt .singlecolumn::after{content: "";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/
        .skn-mli4 .right-box .multi-para-hilt .singlecolumn .paragraph{margin-top:0;width:49%;float:left;margin-left:0;padding-top:0;padding-left:0!important}
        .skn-mli4 .right-box .multi-para-hilt .singlecolumn{margin:0;padding-left:15px}
        .skn-mli4 .right-box .multi-para-hilt .singlecolumn .paragraph:nth-child(2n){margin-left:2%}
        .skn-mli4 .right-box .multi-para-hilt .singlecolumn .paragraph:nth-child(2n+1){clear:left}
        .skn-mli4 .multi-section-hilt .multi-para-opt,.skn-mli4 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-mli4 .multi-para-hilt .skill{display:none}
        .skn-mli4 .right-box .multi-para-hilt .singlecolumn .paragraph:nth-child(n+3){margin-top:12px}

        /*HILT multi para/section - For PDF*/
        .skn-mli4.for-pdf .right-box .multi-para-hilt .pdfparawrapper:after{content:'';clear:both;display:table}
        .skn-mli4.for-pdf .right-box .multi-para-hilt .pdfparawrapper .paragraph:first-child{float:left;margin-left:0}
        .skn-mli4.for-pdf .right-box .multi-para-hilt .pdfparawrapper .paragraph:nth-child(2){float:right;margin-left:2%}
        .skn-mli4.for-pdf .right-box .multi-para-hilt .pdfparawrapper .paragraph{margin-bottom:12px}
        .skn-mli4.for-pdf .multi-para-hilt .pdfparawrapper:last-child .paragraph:last-child,.skn-mli4.for-pdf .right-box .multi-para-hilt .pdfparawrapper:last-child .paragraph{margin-bottom:0}

				/*For Extra Space Before Colon*/
        .skn-mli4 .beforecolonspace{display:none !important}
        .skn-mli4.show-colon-space .beforecolonspace{display:inline!important}

        /* Duration tag */
        .skn-mli4 .totl-expr{display:inline-block;float:right; padding:0 6px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap;margin-left:5px}
        .skn-mli4.texp-curved .totl-expr{border-radius:10px}
        .skn-mli4 .dflex{display:flex;justify-content:space-between}
        .skn-mli4 .left-box .totl-expr{display: none}

        /*MFR - Temp Code to change WEB1 Label*/
        .skn-mli4 .address .web1-mfr-lbl,.skn-mli4.MFR .address .web1-lbl{display:none}
        .skn-mli4.MFR .address .web1-mfr-lbl{display:inline}

        /* Builder css for mobile device */
        .android .skn-mli4, .ios .skn-mli4{box-sizing:content-box}

        /*builder fixes */
        .skn-mli4 .cert-sec .singlecolumn p{display:inline}

        /*For Paginated HTML*/
        .skn-mli4.for-paginated-pdf .lang-sec.infotilesec .paragraph,.skn-mli4.for-paginated-pdf .skli-sec .paragraph{display:block!important}

        /*Pagination Parameters*/
        .skn-mli4{data-noofpasses:2}

        /*Paginated - Common BG*/
        .skn-mli4.for-paginated-pdf.pdf-template .topsection,.skn-mli4.for-paginated-pdf.pdf-template .parentContainer .section{display:none!important}
        .skn-mli4.for-paginated-pdf.pdf-template .parentContainer{min-height:1000px!important;height:1000px!important}

        /*Paginated - First Page*/
        .skn-mli4.for-paginated-pdf.pdf-first-page-template .parentContainer{display:none!important}
        .skn-mli4.for-paginated-pdf.pdf-first-page-template{margin-top:0!important}

        /*Paginated - First pass CSS*/
        .skn-mli4.for-paginated-pdf.pdf-pass-1 .topsection{visibility:hidden}
        .skn-mli4.for-paginated-pdf.pdf-pass-1 .right-box{visibility:hidden}
        .skn-mli4.for-paginated-pdf.pdf-pass-1 .parentContainer .left-box:before{content:none!important}

        /*Paginated - Second pass CSS*/
        .skn-mli4.for-paginated-pdf.pdf-pass-2 .topsection{visibility:hidden}
        .skn-mli4.for-paginated-pdf.pdf-pass-2{data-rectleft:234}
        .skn-mli4.for-paginated-pdf.pdf-pass-2 .left-box{visibility:hidden}
        .skn-mli4.for-paginated-pdf.pdf-pass-2 .parentContainer .left-box:before{content:none!important}

        .skn-mli4{position:relative}
        .skn-mli4 .left-box{background:#fff}
        .skn-mli4:before{content:'';position:absolute;background:${colorHex};opacity:.15;left:0;top:0;height:100%}


        .skn-mli4,.skn-mli4 table{line-height:12px}
        .skn-mli4{min-height:792px}
        .skn-mli4.pgsz-a4{min-height:842px}
        .skn-mli4:before{width:calc(232px);background:${colorHex}}
        .skn-mli4.pagesize{width:595px}
        .skn-mli4.fontsize{font-size:9px}
        .skn-mli4.fontface{font-family:PT Sans}
        .skn-mli4 .compfont{font-size:10px}
        .skn-mli4 .section{margin-bottom:25px}

        .skn-mli4 .firstparagraph{margin-top:0!important}
        .skn-mli4 .paragraph,.skn-mli4 .left-box .multi-para-hilt .paragraph{margin-top:12px}
        .skn-mli4 .parentContainer .singlecolumn,.skn-mli4 .parentContainer .maincolumn,.skn-mli4 .right-box .multi-para-hilt{margin-left:0px}
		.skn-mli4 .right-box .multi-para-hilt .heading{margin-left:-0px}
        .skn-mli4 .left-box .singlecolumn{margin-left:0!important}
        .skn-mli4 .name{font-size:40px;line-height:54px}
        .skn-mli4 .resumeTitle{font-size:18px;line-height:20px}
        .skn-mli4 .sectiontitle{font-size:14px;line-height:17px}
        .skn-mli4 .left-box{width:232px}
        .skn-mli4 .topsection,.skn-mli4 .parentContainer .left-box:before,.skn-mli4 .parentContainer .right-box:before,.skn-mli4 .inner-rating{background-color:${colorHex}}
        .skn-mli4 .topsection .top-box{border-bottom:3px solid ${colorHex}}
        .skn-mli4 ul li{padding-left:-1px}
        .skn-mli4 .totl-expr{background-color:${colorHex};font-size:7px;line-height:12px}

         /* Icon style */
         .skn-mli4 .icon-section{left:30x}
        .skn-mli4 .icon-section img{height:60px;width:60px}
        .skn-mli4 .icon-section + .section{margin:0 67px}
        .skn-mli4 .icon-section + .section .paragraph{padding:0 30px}

        /*Infographic*/
        .skn-mli4 .lang-sec.infobarsec .paragraph{padding-top:5px}
        .skn-mli4 .lang-sec.infobarsec .firstparagraph{padding-top:0}

        /*Infographic Skills*/
        .skn-mli4 .lang-sec.infotilesec .paragraph,.skn-mli4 .skli-sec .paragraph{padding-bottom:5px}
        .skn-mli4 .lang-sec.infotilesec .firstparagraph,.skn-mli4 .skli-sec .firstparagraph{padding-top:0}

        /*Rectangular Rating Blocks*/
        .skn-mli4 .paragraph .sliced-rect .sliced-rect-tile.ratvfill,.skn-mli4 .left-box .paragraph .sliced-rect .sliced-rect-tile.ratvfill{background-color:${colorHex}}

        .skn-mli4 .SECTION_CNTC + .section{margin-top:25px}

        /*Fixes for builder*/
        .skn-mli4 .left-box .data-CNTC + .sortable-item:not(.data-ALNK) .section{margin-top:25px}

        @-moz-document url-prefix() {
        .skn-mli4 .parentContainer{height:672px}
        .skn-mli4 .left-box{min-height:inherit}
        }
        /* support for IE Browser */
        @media screen and (min-width:0\\0) {
        .skn-mli4 .parentContainer{display:flex}
        .skn-mli4 .right-box{width:calc(100% - 232px)}
        .skn-mli4 .left-box,.skn-mli4 .right-box{display:inline}
        .skn-mli4 .left-box{min-height:inherit}
        }

         /*POC Multi Experience Para*/
         .skn-mli4 .groupChildPara.paragraph .singlecolumn .companyloc{display:none}

        /*Pagination Parameters*/
        .skn-mli4{data-ptbm:25px;data-pgsz:595px}

        /*For PDF TEXP Handling*/
        .document.texp-curved.for-pdf .parentContainer .right-box .expr-sec .paragraph .dflex,.document.texp-rectangle.for-pdf .parentContainer .right-box .expr-sec .paragraph .dflex{display:block;}
        .document.texp-curved.for-pdf .parentContainer .right-box .expr-sec .paragraph .dflex > span:first-child,.document.texp-rectangle.for-pdf .parentContainer .right-box .expr-sec .paragraph .dflex > span:first-child{display:inline-block;width:70%}
        .document.texp-curved.for-pdf .parentContainer .right-box .expr-sec .paragraph .dflex > span:last-child,.document.texp-rectangle.for-pdf .parentContainer .right-box .expr-sec .paragraph .dflex > span:last-child{display:inline-block;float:right;width:30%;}

        .skn-mli4.for-pdf,.skn-mli4.for-pdf::before{background:none!important;}
         .skn-mli4.for-pdf .left-box::before{background:none!important;}
         .skn-mli4.for-pdf .left-box{background:none!important;}

    `}</style>
      <div className="svg-skin">
        <div data-testid="embd-98t1CZ7" className="" tabIndex={0}>
          <div></div>
          <div
            data-testid="embd-95CA90b"
            className="document doc-root doc-finalize fontsize fontface vmargins hmargins pagesize skn-mli4 MLI4 MUK pgsz-a4 texp-none pict-pcpf-purl"
            docskinwidth="571"
          >
            {/* TOP SECTION - Name */}
            <div data-testid="embd-92LqKqF0" id="CONTAINER_PARENT_0" className="topsection">
              <div data-testid="embd-92PDkR60" id="CONTAINER_0" className="top-box">
                <div className="sortable-item section-container SortableItem-sibling data-NAME">
                  <div className="section notdraggable SECTION_NAME firstsection" data-section-cd="NAME">
                    <div className="doc-item">
                      <div className="">
                        <div className="">
                          <div className="paragraph PARAGRAPH_NAME firstparagraph">
                            <div>
                              <div className="name" dependency="FNAM|LNAM">
                                <span id="FIELD_FNAM">{data.first_name}</span>{" "}
                                <span id="FIELD_LNAM">{data.last_name}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PARENT CONTAINER - Left Box & Right Box */}
            <div data-testid="embd-92LqKqF1" id="CONTAINER_PARENT_1" className="parentContainer">
              {/* LEFT BOX */}
              <div data-testid="embd-92PDkR61" id="CONTAINER_1" className="left-box">
                {/* CONTACT SECTION */}
                <div className="sortable-item section-container SortableItem-sibling data-CNTC">
                  <div className="section SECTION_CNTC notdraggable has-title" data-section-cd="CNTC">
                    <div className="doc-item">
                      <div className="heading">
                        <div className="sectiontitle" id="SECTIONNAME_CNTC">
                          {t.contact}
                        </div>
                      </div>
                      <div className="">
                        <div className="">
                          <div className="paragraph PARAGRAPH_CNTC firstparagraph">
                            <div className="clearfix doc-item">
                              <div className="address">
                                {/* Address */}
                                <div className="zipsuffix pb5" dependency="ADDR|STRT|CITY|STAT|ZIPC">
                                  <span className="txt-bold">
                                    <span className="xslt_static_change">{t.address}</span>
                                    <span className="mukcolon">: </span>
                                    <span className="colon"> : </span>
                                  </span>
                                  <span id="FIELD_STRT">{data.street_address}</span>{" "}
                                  <span id="FIELD_CITY">{data.city}</span>{" "}
                                  <span id="FIELD_ZIPC">{data.postcode}</span>
                                </div>

                                {/* Phone */}
                                {data.phone && (
                                  <div className="dispBlock pb5" dependency="HPHN|CPHN">
                                    <span className="txt-bold">
                                      <span className="xslt_static_change">{t.phone}</span>
                                      <span className="mukcolon">: </span>
                                      <span className="colon"> : </span>
                                    </span>
                                    <span id="FIELD_HPHN">{data.phone}</span>
                                  </div>
                                )}

                                {/* Email */}
                                {data.email && (
                                  <div className="dispBlock pb5" dependency="EMAI">
                                    <span className="txt-bold">
                                      <span className="xslt_static_change">{t.email}</span>
                                      <span className="mukcolon">: </span>
                                      <span className="colon"> : </span>
                                    </span>
                                    <span id="FIELD_EMAI">{data.email}</span>
                                  </div>
                                )}

                                {/* Nationality */}
                                {data.nationality && (
                                  <div className="dispBlock pb5" dependency="NTLY">
                                    <span className="txt-bold">
                                      <span className="xslt_static_change txt-bold">{t.nationality}</span>
                                      <span className="mukcolon">: </span>
                                      <span className="colon"> : </span>
                                    </span>
                                    <span id="FIELD_NTLY">{data.nationality}</span>
                                  </div>
                                )}

                                {/* Driving License / Permit */}
                                {data.driving_license && (
                                  <div className="dispBlock pb5" dependency="DRIV">
                                    <span className="txt-bold">
                                      <span className="xslt_static_change">{t.driving_license}</span>
                                      <span className="mukcolon">: </span>
                                      <span className="colon"> : </span>
                                    </span>
                                    <span id="FIELD_DRIV">{data.driving_license}</span>
                                  </div>
                                )}

                                {/* Website */}
                                {data.website && (
                                  <div className="dispBlock pb5 brk-all" dependency="WEB1">
                                    <span className="txt-bold">
                                      <span className="xslt_static_change web1-lbl">{t.website}</span>
                                      <span className="web1-mfr-lbl">Site</span>
                                      <span className="mukcolon">: </span>
                                      <span className="colon"> : </span>
                                    </span>
                                    <span className="lorcase" id="FIELD_WEB1">
                                      {data.website}
                                    </span>
                                  </div>
                                )}

                                {/* LinkedIn */}
                                {data.linkedin && (
                                  <div className="dispBlock pb5 social brk-all" dependency="SOCL" id="CATEGORY_SOCIAL_SOCL">
                                    <span className="txt-bold">
                                      <span id="DOCDATAINFO_SOCL">LinkedIn</span>
                                      <span className="mukcolon">: </span>
                                      <span className="colon"> : </span>
                                    </span>
                                    <span className="field" id="FIELD_SOCL">
                                      {data.linkedin}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SKILLS SECTION */}
                {skills.length > 0 && (
                  <div className="sortable-item section-container SortableItem-sibling data-HILT">
                    <div className="section SECTION_HILT has-title" data-section-cd="HILT">
                      <div className="doc-item">
                        <div className="heading">
                          <div className="sectiontitle" id="SECTIONNAME_HILT">
                            {t.skills}
                          </div>
                        </div>
                        <div className="">
                          <div className="">
                            <div className="paragraph PARAGRAPH_HILT firstparagraph">
                              <div className="clearfix doc-item">
                                <div className="singlecolumn maincolumn">
                                  <div className="skill">
                                    <span className="paddedline" id="FIELD_SKC1">
                                      <ul>
                                        {skills.map((skill) => (
                                          <li key={skill.id}>{skill.name}</li>
                                        ))}
                                      </ul>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LANGUAGES SECTION */}
                {languages.length > 0 && (
                  <div className="sortable-item section-container SortableItem-sibling data-LNGG">
                    <div
                      className="section lang-sec infobarsec hide-colon SECTION_LNGG has-title data-LNGG"
                      data-section-cd="LNGG"
                    >
                      <div className="doc-item">
                        <div className="heading">
                          <div className="sectiontitle" id="SECTIONNAME_LNGG">
                            {t.languages}
                          </div>
                        </div>
                        <div className="">
                          <div className="sortableInner">
                            {languages.map((lang, index) => (
                              <div
                                key={lang.id}
                                className="sortable-item paragraph-container SortableItem-sibling"
                              >
                                <div
                                  className={`paragraph PARAGRAPH_LNGG ${index === 0 ? "firstparagraph" : ""} ${index % 2 === 0 ? "para_odd" : "para_even"}`}
                                >
                                  <div className="clearfix doc-item">
                                    <div className="singlecolumn infobarpara">
                                      <div className="field">
                                        <span id="FIELD_FRFM">{lang.name}</span>
                                        <span className="no-colon" dependency="FRFM">
                                          <span className="beforecolonspace"> </span>
                                          <span> : </span>
                                        </span>
                                        <span className="flt-right" id="FIELD_RATG"></span>
                                      </div>
                                      <div className="rating-bar" dependency="RATV">
                                        <div
                                          className="inner-rating"
                                          id="FIELD_RATV"
                                          type="width"
                                          style={{ width: getLevelWidth(lang.level) }}
                                        ></div>
                                      </div>
                                      <div className="field field-ratt">
                                        <span id="FIELD_RATT">{getProficiencyLabel(lang.proficiency)}</span>
                                      </div>
                                      <div className="field">
                                        <span id="FIELD_ADIF"></span>
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
                  </div>
                )}
              </div>

              {/* RIGHT BOX */}
              <div data-testid="embd-92PDkR62" id="CONTAINER_2" className="right-box">
                {/* PROFESSIONAL SUMMARY */}
                {data.summary && (
                  <div className="sortable-item section-container SortableItem-sibling data-SUMM">
                    <div className="section summary SECTION_SUMM has-title" data-section-cd="SUMM">
                      <div className="doc-item">
                        <div className="heading">
                          <div className="sectiontitle" id="SECTIONNAME_SUMM">
                            {t.professional_summary}
                          </div>
                        </div>
                        <div className="">
                          <div className="">
                            <div className="paragraph PARAGRAPH_SUMM firstparagraph">
                              <div className="clearfix doc-item">
                                <div className="singlecolumn" id="FIELD_FRFM">
                                  <p>{data.summary}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* WORK HISTORY */}
                {experiences.length > 0 && (
                  <div className="sortable-item section-container SortableItem-sibling data-EXPR">
                    <div className="section expr-sec SECTION_EXPR multi-para has-title" data-section-cd="EXPR">
                      <div className="doc-item">
                        <div className="heading">
                          <div className="sectiontitle" id="SECTIONNAME_EXPR">
                            {t.work_history}
                          </div>
                        </div>
                        <div className="">
                          <div className="sortableInner">
                            {experiences.map((exp, index) => (
                              <div
                                key={exp.id}
                                className="sortable-item paragraph-container SortableItem-sibling"
                              >
                                <div
                                  className={`paragraph PARAGRAPH_EXPR ${index === 0 ? "firstparagraph" : ""}`}
                                >
                                  <div className="clearfix doc-item">
                                    <div className="singlecolumn">
                                      <span className="dispBlock compfont" dependency="JTIT|JSTD|EDDT">
                                        <span className="dflex">
                                          <span>
                                            <span className="jobtitle txtCaps txt-bold" id="FIELD_JTIT">
                                              {exp.job_title}
                                            </span>
                                            <span className="txt-bold" dependency="JTIT+JSTD|EDDT">
                                              ,{" "}
                                            </span>
                                            <span className="jobdates" id="FIELD_JSTD">
                                              {formatExperienceDate(exp.start_date)}
                                            </span>
                                            <span dependency="JSTD+EDDT"> to </span>
                                            <span className="jobdates" id="FIELD_EDDT">
                                              {formatExperienceDate(exp.end_date, exp.currently_working)}
                                            </span>
                                            <br dependency="JSTD|EDDT" />
                                          </span>
                                        </span>
                                      </span>
                                      <span className="dispBlock compfont locationGap" dependency="COMP|JSTA|JCIT|JCNT|JLOC">
                                        <span className="companyname txt-bold" id="FIELD_COMP">
                                          {exp.company}
                                        </span>
                                        {exp.location && (
                                          <>
                                            <span dependency="COMP">
                                              <span dependency="JSTA|JCIT|JCNT|JLOC"> - </span>
                                            </span>
                                            <span className="jobcity" id="FIELD_JCIT">
                                              {exp.location}
                                            </span>
                                          </>
                                        )}
                                      </span>
                                      {exp.description && (
                                        <span className="jobline" id="FIELD_JDES">
                                          <ul>
                                            {exp.description.split("\n").map((item, i) => (
                                              <li key={i}>{item}</li>
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
                  </div>
                )}

                {/* EDUCATION */}
                {educations.length > 0 && (
                  <div className="sortable-item section-container SortableItem-sibling data-EDUC">
                    <div className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC">
                      <div className="doc-item">
                        <div className="heading">
                          <div className="sectiontitle" id="SECTIONNAME_EDUC">
                            {t.education}
                          </div>
                        </div>
                        <div className="">
                          <div className="sortableInner">
                            {educations.map((edu, index) => (
                              <div
                                key={edu.id}
                                className="sortable-item paragraph-container SortableItem-sibling"
                              >
                                <div
                                  className={`paragraph PARAGRAPH_EDUC ${index === 0 ? "firstparagraph" : ""}`}
                                >
                                  <div className="clearfix doc-item">
                                    <div className="singlecolumn">
                                      <div>
                                        <span className="dispBlock compfont" dependency="DGRE|STUY|GRYR">
                                          {edu.degree && (
                                            <>
                                              <span className="degree txt-bold" id="FIELD_DGRE">
                                                {edu.degree}
                                              </span>
                                              <span dependency="DGRE+STUY">
                                                <span className="mukcolon">: </span>
                                                <span className="colon"> : </span>
                                              </span>
                                            </>
                                          )}
                                          <span className="programline" id="FIELD_STUY">
                                            {edu.field_of_study}
                                          </span>
                                          {edu.end_date && (
                                            <>
                                              <span dependency="DGRE|STUY">
                                                <span dependency="GRYR|GRST|GRED|GRIP">, </span>
                                              </span>
                                              <span dependency="GRYR|GRST|GRED">
                                                <span id="FIELD_GRYR">{formatEducationDate(edu.end_date)}</span>
                                              </span>
                                            </>
                                          )}
                                        </span>
                                        <span className="dispBlock compfont" dependency="SCHO|SCIT|SSTA|SCNT|GRHN">
                                          <span className="companyname txt-bold" id="FIELD_SCHO">
                                            {edu.institution}
                                          </span>
                                          {edu.location && (
                                            <>
                                              <span dependency="SCHO">
                                                <span dependency="SCIT|SSTA|SCNT"> - </span>
                                              </span>
                                              <span className="joblocation jobcity" id="FIELD_SCIT">
                                                {edu.location}
                                              </span>
                                            </>
                                          )}
                                        </span>
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
                  </div>
                )}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
