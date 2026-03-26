/* eslint-disable */
// @ts-nocheck
import { sampleData } from "./sampleData";
import type { ResumeData } from "@/types/resume";

const defaultTranslations = {
  summary: "Summary",
  experience: "Work history",
  education: "Education",
  skills: "Skills",
  languages: "Languages",
  certificates: "Certificates",
  present: "Current",
};

function formatDate(dateStr: string, language: string): string {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  if (!year) return "";
  if (!month) return year;
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

interface DynamicTemplateProps {
  data: ResumeData;
  translations: typeof defaultTranslations;
  language: string;
  colorHex: string;
}

export default function TemplateMli6({
  data = sampleData,
  translations: t = defaultTranslations,
  language = "en",
  colorHex = "#0187de",
}: Partial<DynamicTemplateProps> = {}) {
  const getLanguageWidth = (level: number) => {
    return `${(level / 5) * 100}%`;
  };

  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-mli6 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        /*START content disc style for LI*/
        .skn-mli6 ul,.skn-mli6 li{list-style:none;margin:0;padding:0}
        .skn-mli6 ul li{position:relative;margin:0 0 0 10px;padding-left:10px}
        .skn-mli6 ul li:before{content:'\\2022';font-size:9px;position:absolute;left:0;top:0}
        /*END content disc style for LI*/

        .skn-mli6 .txtBold{font-weight:bold}
        .skn-mli6 .break-all{word-break:break-all}
        .skn-mli6 .txtItl{font-style:italic}
        .skn-mli6 .dispBlock{display:block}
        .skn-mli6 .fltRight{float:right}

        /*Document*/
        .skn-mli6{color:#020303;line-height:14px;min-height:792px;position:relative}
		.skn-mli6:not(.sortable-item):before{content:'';box-sizing:content-box;border:20px solid ${colorHex};height:calc(100% - 40px);position:absolute;left:0;top:0}
        .skn-mli6 .name{color:#000;font-weight:bold;padding:0 0 9px 0;text-align:left;position:relative;word-wrap:break-word;text-transform:capitalize}
        .skn-mli6 .resumeTitle{color:${colorHex};font-weight:bold;text-transform:uppercase;letter-spacing:1px}
        .skn-mli6 .singlecolumn,.skn-mli6 .sectiontitle{word-wrap:break-word}

        /* top section */
        .skn-mli6 .topsection{width:100%;position:relative;display:table;table-layout:fixed;margin-top:20px;}
        .skn-mli6 .topsection .summary{margin-top:10px!important;padding-top:0}
        .skn-mli6 .topsection .right-box{width:81px;padding-right:20px}
        .skn-mli6 .section:empty{display:none}
        .skn-mli6 .parentContainer{display:table;table-layout:fixed;width:100%;margin-bottom:20px}
        .skn-mli6 .parentContainer .section:first-child{padding-top:0}

        /* common left-right container */
        .skn-mli6 .right-box{position:relative;display:table-cell;vertical-align:top;padding-right:20px}
        .skn-mli6 .left-box{letter-spacing:.2px;display:table-cell;padding-left:20px;vertical-align:top;width:75%}
        .skn-mli6 .topsection .left-box{width:81.6%;padding-right:16px}
        .skn-mli6 .left-box > .section:first-child{padding-top:0!important;margin-top:0}
        .skn-mli6 .topsection .right-box > .section{padding-top:0;margin-top:0}

        /* PICT */
        .skn-mli6 .pictPic,.skn-mli6 .pictPic .field{display:table-cell;vertical-align:middle;text-align:center;margin:auto}
        .skn-mli6 .pictPic img{width:100%;height:100%;object-fit:cover}

        /*Photo Layout styles*/
        .skn-mli6.pict-pcsh-circle .paragraph .pictPic img{border-radius:50%;border:1px solid #373737;box-sizing:border-box}
        .skn-mli6.pict-pcsh-square .paragraph .pictPic img{border-radius:unset;border:1px solid #373737;box-sizing:border-box}
        .skn-mli6.pict-pcsh-bottomleft .paragraph .pictPic img{border-radius:50%;border-bottom-left-radius:8px;border:1px solid #373737;box-sizing:border-box}
        .skn-mli6.pict-pcsh-bottomright .paragraph .pictPic img{border-radius:50%;border-bottom-right-radius:8px;border:1px solid #373737;box-sizing:border-box}
        .skn-mli6.pict-pcsh-radius .paragraph .pictPic img{border-radius:10px;border:1px solid #373737;box-sizing:border-box}

        /* contact section */
        .skn-mli6 .sectionadrs{clear:both;box-sizing:content-box;color:#fff;margin:20px -25px 25px 0;float:right;background:${colorHex};position:relative;width:calc(100% - 40px)}
        .skn-mli6 .sectionadrs .address_sec{display:table;table-layout:fixed;width:100%}
        .skn-mli6 .address{display:table;table-layout:fixed;width:100%}
        .skn-mli6 .col-left{display:table-cell;padding-right:25px;width:64.8%;vertical-align:top}
        .skn-mli6 .col-right{display:table-cell;vertical-align:top;width:201px;box-sizing:border-box;padding-left:20px}

        /* address and ALNK */
        .skn-mli6 .SECTION_CNTC{display:table-cell;vertical-align:top;width:100%;padding:10px!important;padding-right:0!important}

        /* SVG Icon Style */
        .skn-mli6 .iconRow{clear:both;padding-bottom:5px;word-wrap:break-word}
        .skn-mli6 .iconRow:last-child{padding-bottom:0}
        .skn-mli6 .social-link .iconRow:last-child{padding-bottom:5px}
        /* .skn-mli6 .iconRow .icon-svg{width:10px;height:10px;float:left;margin-top:2px} */
        .skn-mli6 .iconRow .icoTxt{margin-left:20px}
        .skn-mli6 .iconRow svg path.rect{fill:#576d7b}
		.skn-mli6 .social svg{transform:scale(1.6);width:11px;height:11px}
		.skn-mli6 .icon-svg svg{fill:#fff}
		.skn-mli6 .social-link .field a{color:#fff}

        /* Heading */
        .skn-mli6 .heading{margin-bottom:5px}
        .skn-mli6 .sectiontitle{text-transform:uppercase;color:#000;font-weight:bold;letter-spacing:1.56px}

        /*parentContainer*/
        .skn-mli6 .jobline ul{margin-top:8px}
        .skn-mli6 .parentContainer .left-box .section{padding-right:25px;position:relative}
        .skn-mli6 .parentContainer .right-box{width:201px;border-left:1px solid ${colorHex};word-break:break-word;box-sizing:content-box}
        .skn-mli6 .parentContainer .right-box .section{padding-left:20px}
        .skn-mli6 .heading{position:relative}
        .skn-mli6 .right-box .section .heading:before{content:'';border:4px solid ${colorHex};position:absolute;left:-24.5px;top:3px;z-index:1}
        .skn-mli6 .parentContainer .right-box .section:first-child .heading:after{content:'';background:#fff;left:-22px;top:-2px;width:5px;height:18px;position:absolute}

        /*Infographic*/
        .skn-mli6 .langSec .field *,.skn-mli6 .infoSec .field *{display:inline}
		.skn-mli6 .left-box .langSec .firstparagraph .field{display:inline}
		.skn-mli6 .left-box .langSec .firstparagraph .field.dispBlock{display:block}
        .skn-mli6 .langSec .paragraph,.skn-mli6 .infoSec .paragraph{clear:both;margin-top:0;}
        .skn-mli6 .ratingBar{background:#d5d6d6;width:100%;clear:both;page-break-inside:avoid}
        .skn-mli6 .innerRating{background-color:${colorHex};height:4px;width:60%}
        .skn-mli6 .iconRow .icon-svg{width:11px;height:11px;float:left;display:inline-flex;vertical-align:middle}
        .skn-mli6 .iconRow .rgtspc{margin-left:18px}

        .skn-mli6 .hide-bar .ratingBar,.skn-mli6 .hide-only-bar .ratingBar,.skn-mli6 .hide-bar .field-ratt,.skn-mli6 .hide-colon .colon{display:none}

        /*MFR address*/
        .skn-mli6 .zipsuffix,.skn-mli6.MFR .zipprefix,.skn-mli6.MES .zipprefix{display:block}
        .skn-mli6 .zipprefix,.skn-mli6.MFR .zipsuffix,.skn-mli6.MES .zipsuffix{display:none}

        /* GRYR */
		.skn-mli6 .displayNoneThisField{display:none}/* Keep this class always at bottom */

		/*For Extra Space Before Colon*/
        .skn-mli6 .beforecolonspace{display:none!important}
        .skn-mli6.MFR .beforecolonspace{display:inline!important}

        /*PICT support*/
        .skn-mli6.pict-pcpf-none .pict-sec,.skn-mli6.pict-pcpf-none .topsection .right-box{display:none}

        /* Duration tag */
        .skn-mli6 .totl-expr{display:inline-block;float:right; padding:0 6px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap;margin-left:5px}
        .skn-mli6.texp-curved .totl-expr{border-radius:10px}
        .skn-mli6 .dflex{display:flex;justify-content:space-between}
        .skn-mli6 .right-box .totl-expr{display: none}


        .skn-mli6,.skn-mli6 table{line-height:14px}
        .skn-mli6.pagesize{width:545px}
        .skn-mli6.fontsize{font-size:10px}
        .skn-mli6.fontface{font-family:Century Gothic}
        .skn-mli6.vmargins{padding-top:25px;padding-bottom:25px}
        .skn-mli6.hmargins{padding-left:25px;padding-right:25px}
        .skn-mli6 .section{padding-top:25px}
        .skn-mli6 .firstparagraph{margin-top:0!important}
        .skn-mli6 .paragraph{margin-top:20px}
        .skn-mli6 .parentContainer .singlecolumn,.skn-mli6 .parentContainer .maincolumn{margin-left:0px}
        .skn-mli6 .parentContainer .right-box .singlecolumn{margin-left:0}
        .skn-mli6 .name{font-size:28px;line-height:28px}
        .skn-mli6 .resumeTitle{font-size:12px;line-height:14px}
        .skn-mli6 .sectiontitle{font-size:14px;line-height:16px}
        .skn-mli6 .parentcontainer .right-box{width:201px}
        .skn-mli6 .sectionadrs{margin-right:-25px;padding-right:45px;background:${colorHex}}
        /*.skn-mli6 .col-left{max-width:262px}
        .skn-mli6 .col-right{max-width:181px}*/
        .skn-mli6 .iconRow .icon-svg{margin-top:2px}
        .skn-mli6 .iconRow .icon-svg.social{margin-top:0px}
        /* .skn-mli6 .iconRow .icon-svg{margin-top:2px} */
        .skn-mli6 .totl-expr{background-color:${colorHex};font-size:8px;line-height:12px}

        /* icons */
        /* .skn-mli6 .iconRow .icon-svg{height:10px;width:10px} */
        .skn-mli6 .parentContainer .right-box .section .heading:before{top:4px}
        .skn-mli6 .parentContainer .right-box .section:first-child .heading:after{top:-14px}
        .skn-mli6 .pictPic,.skn-mli6 .pictPic .field{width:93px;height:103px}

        /*Infographic*/
        .skn-mli6 .langSec .paragraph,.skn-mli6 .infoSec .paragraph{padding-top:5px}
        .skn-mli6 .langSec .firstparagraph,.skn-mli6 .infoSec .firstparagraph{padding-top:0}
        .skn-mli6:not(.sortable-item):before{border:20px solid ${colorHex};width:555px;border:20px solid ${colorHex}}

        /* SDCL */
        .skn-mli6,.skn-mli6 .right-box .section .heading:before,.skn-mli6 .parentContainer .right-box{border-color:${colorHex}}
        .skn-mli6 .resumeTitle{color:${colorHex}}

        /*Photo Layout styles*/
        .skn-mli6.pict-pcsh-circle .paragraph .pictPic img{width:93px;height:93px;border-color:${colorHex}}
        .skn-mli6.pict-pcsh-square .paragraph .pictPic img{width:93px;height:93px;border-color:${colorHex}}
        .skn-mli6.pict-pcsh-bottomleft .paragraph .pictPic img{height:93px;width:93px;border-color:${colorHex}}
        .skn-mli6.pict-pcsh-bottomright .paragraph .pictPic img{height:93px;width:93px;border-color:${colorHex}}
        .skn-mli6.pict-pcsh-radius .paragraph .pictPic img{height:93px;width:93px;border-color:${colorHex}}

        /* fixes for builder */
        .skn-mli6 *{transition:auto}
        .skn-mli6 .sectionadrs .sortable-item .section{background:${colorHex}}
        .skn-mli6 .parentContainer .left-box .sortable-item:first-child .section,
        .skn-mli6 .parentContainer .right-box .sortable-item:first-child .section{padding-top:0}
        .page-final .skn-mli6 .parentContainer .right-box{width:200px}
        .skn-mli6 .parentContainer .right-box .sortable-item:first-child .section .heading:after {content:'';background:#fff;left:-22px;top:-2px;width:5px;height:18px;position:absolute}
        .skn-mli6 .parentContainer .right-box .sortable-item:first-child .section .heading:after{top:-14px}
        .skn-mli6 .sectionadrs>div>.sortable-item.data-CNTC{width:100%}
        .modal-preview-user-select-state .skn-mli6.vmargins{padding-bottom:60px}
        .page-final .skn-mli6 .parentContainer,.modal-preview-user-select-state .skn-mli6 .parentContainer{margin-bottom:0}

        /*For-PDF TEXP*/
        .skn-mli6.for-pdf.texp-curved .parentContainer .left-box .expr-sec .paragraph .singlecolumn .dflex{display:block;}
        .skn-mli6.for-pdf.texp-curved .parentContainer .left-box .expr-sec .paragraph .singlecolumn .dflex > span:first-child{display:inline-block;width:65%}
        .skn-mli6.for-pdf.texp-curved .parentContainer .left-box .expr-sec .paragraph .singlecolumn .dflex > span:last-child{display:inline-block;float:right;width:35%;}

        .skn-mli6.for-pdf.texp-rectangle .parentContainer .left-box .expr-sec .paragraph .singlecolumn .dflex{display:block;}
        .skn-mli6.for-pdf.texp-rectangle .parentContainer .left-box .expr-sec .paragraph .singlecolumn .dflex > span:first-child{display:inline-block;width:65%}
        .skn-mli6.for-pdf.texp-rectangle .parentContainer .left-box .expr-sec .paragraph .singlecolumn .dflex > span:last-child{display:inline-block;float:right;width:35%;}
    `}</style>
      <div className="svg-skin">
        <div className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-mli6 MLI6 MUK texp-none pict-pcpf-purl">
          {/* Top Section - Name and Photo */}
          <div className="topsection hidesecondpass">
            <div className="left-box">
              {/* Name Section */}
              <div className="section notdraggable SECTION_NAME firstsection">
                <div className="doc-item">
                  <div className="paragraph PARAGRAPH_NAME firstparagraph">
                    <div className="name">
                      <span>{data.first_name}</span>{" "}
                      <span>{data.last_name}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Summary Section */}
              <div className="section summary notdraggable SECTION_SUMM">
                <div className="doc-item">
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
            <div className="right-box">
              {/* Photo Section */}
              <div className="section notdraggable pict-sec SECTION_PICT firstsection">
                <div className="doc-item">
                  <div className="paragraph PARAGRAPH_PICT firstparagraph">
                    <div className="clearfix doc-item">
                      <div className="pictPic">
                        <div className="field">
                          <img src={data.photo_url} alt="Profile" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="sectionadrs">
            <div className="section SECTION_CNTC notdraggable">
              <div className="doc-item">
                <div className="paragraph PARAGRAPH_CNTC firstparagraph">
                  <div className="clearfix doc-item">
                    <div className="address">
                      <div className="col-left">
                        {/* Email */}
                        {data.email && (
                          <div className="iconRow">
                            <div className="icon-svg">
                              <svg width="10px" height="10px" viewBox="0 0 12 12">
                                <path fill="#fff" d="M4.375 11.125a.376.376 0 0 0 .68.222l1.363-1.846-2.043-.695zM11.452.043L.202 5.918a.375.375 0 0 0 .052.687L3.38 7.674l6.661-5.695-5.155 6.21L10.13 9.98a.377.377 0 0 0 .492-.3L11.996.43a.376.376 0 0 0-.544-.387z"></path>
                              </svg>
                            </div>
                            <div className="rgtspc">{data.email}</div>
                          </div>
                        )}
                        {/* Phone */}
                        {data.phone && (
                          <div className="iconRow">
                            <div className="icon-svg">
                              <svg width="10px" height="10px" viewBox="0 0 12 12">
                                <path fill="#fff" d="M6.4 3.2a.4.4 0 1 0 0 .8C7.282 4 8 4.718 8 5.6a.4.4 0 0 0 .8 0c0-1.323-1.077-2.4-2.4-2.4m0-1.6a.4.4 0 1 0 0 .8c1.765 0 3.2 1.436 3.2 3.2a.4.4 0 1 0 .8 0c0-2.205-1.795-4-4-4m0-1.6a.4.4 0 1 0 0 .8c2.647 0 4.8 2.153 4.8 4.8a.4.4 0 1 0 .8 0C12 2.512 9.487 0 6.4 0m4.4 8.8a7.422 7.422 0 0 1-3.288-.751.395.395 0 0 0-.307-.019.406.406 0 0 0-.23.205l-.628 1.301a10.062 10.062 0 0 1-3.882-3.882l1.301-.63a.4.4 0 0 0 .185-.536A7.429 7.429 0 0 1 3.2 1.2a.4.4 0 0 0-.4-.4H.4a.4.4 0 0 0-.4.4C0 7.156 4.845 12 10.8 12a.4.4 0 0 0 .4-.4V9.2a.4.4 0 0 0-.4-.4"></path>
                              </svg>
                            </div>
                            <div className="rgtspc">
                              <span>{data.phone}</span>
                            </div>
                          </div>
                        )}
                        {/* Website */}
                        {data.website && (
                          <div className="iconRow">
                            <div className="icon-svg">
                              <svg width="12px" height="12px" viewBox="0 0 12 12">
                                <path d="M10.8656578,6.57240514 C9.353263,8.08481873 6.91727137,8.06241853 5.42767649,6.57240514 C4.56887944,5.71399743 3.15488429,5.69679728 2.2792873,6.57240514 C1.40929029,7.44241296 1.39009035,8.86962578 2.26008737,9.7396336 C3.13048438,10.6100414 4.55727948,10.5908412 5.42767649,9.72083343 C5.89687487,9.25122921 6.10887415,8.62722361 6.07447426,8.02081816 C6.57807253,8.27242042 7.12207067,8.42722181 7.68286874,8.47282222 C7.61446897,9.34323004 7.24207025,10.1960377 6.57247255,10.8656437 C5.0728777,12.3652572 2.61528615,12.3844574 1.1152913,10.8848439 C-0.38430355,9.38483041 -0.365503615,6.92720833 1.13449123,5.42759486 C2.64688604,3.91518127 5.08247767,3.93758147 6.57247255,5.42759486 C7.4312696,6.28640257 8.84526475,6.30320272 9.72086174,5.42759486 C10.5908587,4.55758704 10.6100587,3.13037422 9.74006167,2.2599664 C8.86966466,1.38995858 7.44246956,1.40915875 6.57247255,2.27916657 C6.10327416,2.74837078 5.89127489,3.37237639 5.92567477,3.97918184 C5.4220765,3.72757958 4.87807837,3.57277819 4.3168803,3.52717778 C4.38568006,2.65676996 4.75767879,1.8039623 5.42767649,1.13435628 C6.92727133,-0.365257191 9.38486289,-0.384457363 10.8848577,1.11515611 C12.3844526,2.61476958 12.3652527,5.07239167 10.8656578,6.57240514" fill="#FFFFFF"></path>
                              </svg>
                            </div>
                            <div className="icoTxt">{data.website}</div>
                          </div>
                        )}
                        {/* LinkedIn */}
                        {data.linkedin && (
                          <div className="social-link">
                            <div className="iconRow">
                              <div className="icon-svg social">
                                <svg xmlns="http://www.w3.org/2000/svg" className="linkedin" version="1.1" viewBox="0 0 30 30">
                                  <path className="svg-inricon fillwht" fill="#fff" d="M10.7,8.6c0,1.2-1,2.1-2,2.1s-2.1-1-2.1-2.1,1-2.1,2.1-2.1,2,1,2,2.1ZM10.3,12.1h-3.4v11.3h3.5v-11.3s-.1,0,0,0ZM16,12.1h-3.4v11.3h3.4v-5.9c0-1.6.7-2.5,2.1-2.5s1.9,1,1.9,2.5v5.9h3.5v-7.1c0-3-1.7-4.5-4.1-4.5s-3.4,1.9-3.4,1.9v-1.7h0Z"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">
                                <span className="field">{data.linkedin}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="col-right">
                        {/* Address */}
                        {(data.street_address || data.city || data.postcode) && (
                          <div className="iconRow">
                            <div className="icon-svg">
                              <svg width="10px" height="12px" viewBox="0 0 11.11 15">
                                <g className="locationSVG">
                                  <path fill="#fff" d="M5.378 2.484a2.906 2.906 0 0 1 2.91 2.893 2.906 2.906 0 0 1-2.894 2.91 2.906 2.906 0 0 1-2.91-2.893 2.906 2.906 0 0 1 2.893-2.91zm.424 3.315l1.245-.003-.002-.83-1.246.003-.003-1.245-.83.003.003 1.245-1.245.003.002.83 1.246-.003.003 1.245.83-.002zM5.365 0a5.387 5.387 0 0 1 5.396 5.365 5.325 5.325 0 0 1-1.127 3.31l-4.23 5.452-4.258-5.428A5.325 5.325 0 0 1 0 5.395 5.387 5.387 0 0 1 5.365 0zm.026 9.106A3.73 3.73 0 0 0 9.106 5.37 3.73 3.73 0 0 0 5.37 1.656 3.729 3.729 0 0 0 1.656 5.39 3.73 3.73 0 0 0 5.39 9.106z"></path>
                                </g>
                              </svg>
                            </div>
                            <div className="zipsuffix rgtspc">
                              <span>
                                {data.street_address && <span>{data.street_address}</span>}
                                {data.street_address && (data.city || data.postcode) && <span>, </span>}
                                {data.city && <span>{data.city} </span>}
                                {data.postcode && <span>{data.postcode}</span>}
                              </span>
                            </div>
                          </div>
                        )}
                        {/* Nationality */}
                        {data.nationality && (
                          <div className="iconRow">
                            <div className="icon-svg">
                              <svg width="10px" height="13px" viewBox="0 0 10 13">
                                <path d="M9.18516,7.4406 C9.28996,7.5986 9.30036,7.8014 9.21076,7.9694 C9.12116,8.137 8.94676,8.2414 8.75676,8.2414 L1.03036,8.2414 L1.03036,11.847 C1.03036,12.1322 0.79996,12.3622 0.51516,12.3622 C0.23036,12.3622 -4e-05,12.1322 -4e-05,11.847 L-4e-05,0.515 C-4e-05,0.2302 0.23036,-0.0002 0.51516,-0.0002 C0.79996,-0.0002 1.03036,0.2302 1.03036,0.515 L1.03036,1.0302 L8.75676,1.0302 C8.94676,1.0302 9.12116,1.1346 9.21076,1.3022 C9.30036,1.4702 9.28996,1.673 9.18516,1.831 L7.31516,4.6358 L9.18516,7.4406 Z" fill="#FFFFFF"></path>
                              </svg>
                            </div>
                            <div className="icoTxt">
                              <span>{data.nationality}</span>
                            </div>
                          </div>
                        )}
                        {/* Driving License */}
                        {data.driving_license && (
                          <div className="iconRow">
                            <div className="icon-svg">
                              <svg width="14px" height="10px" viewBox="0 0 14 11">
                                <path d="M2.49992235,10 C2.96007657,10 3.33325568,9.62682088 3.33325568,9.16666667 L3.33325568,8.33333333 L9.99992235,8.33333333 L9.99992235,9.16666667 C9.99992235,9.62682088 10.3731015,10 10.8332557,10 L11.666589,10 C12.1267432,10 12.4999224,9.62682088 12.4999224,9.16666667 L12.4999224,7.75858561 C12.7561683,7.46561686 12.916589,7.0867157 12.916589,6.66666667 L12.916589,5.41666667 C12.916589,4.91615295 12.6913184,4.47214762 12.3418413,4.16666667 L12.8645057,4.16666667 C13.0079892,4.16666667 13.1329841,4.06901042 13.1676215,3.92995199 L13.3238715,3.30495199 C13.3731066,3.10780843 13.2238756,2.91666667 13.0205014,2.91666667 L11.4613837,2.91666667 L11.0280596,1.83334351 C10.5827318,0.719528198 9.51998257,9.9475983e-14 8.32023485,9.9475983e-14 L5.01294318,9.9475983e-14 C3.81347521,9.9475983e-14 2.75044624,0.719528198 2.30486416,1.83334351 L1.87153999,2.91666667 L0.312676664,2.91666667 C0.109302437,2.91666667 -0.0399285204,3.10780843 0.00956081879,3.30495199 L0.165810819,3.92995199 C0.20044827,4.06901042 0.325443184,4.16666667 0.468926664,4.16666667 L0.991591052,4.16666667 C0.641859606,4.47214762 0.416589017,4.91615295 0.416589017,5.41666667 L0.416589017,6.66666667 C0.416589017,7.08646139 0.577009753,7.46536255 0.833255684,7.75858561 L0.833255684,9.16666667 C0.833255684,9.62682088 1.2064348,10 1.66658902,10 L2.49992235,10 Z M9.99992235,3.75 L3.33325568,3.75 L3.85225796,2.45234172 C4.04210273,1.97786967 4.50174832,1.66666667 5.01294318,1.66666667 L8.32023485,1.66666667 C8.83142972,1.66666667 9.2910753,1.97786967 9.48092007,2.45234172 L9.99992235,3.75 Z M2.49992235,6.66145325 C1.99991726,6.66145325 1.66658902,6.32916768 1.66658902,5.83073934 C1.66658902,5.33228556 1.99991726,5 2.49992235,5 C2.99992744,5 3.74992235,5.74765523 3.74992235,6.24608358 C3.74992235,6.74453735 2.99992744,6.66145325 2.49992235,6.66145325 Z M9.58325568,6.24608358 C9.58325568,5.74765523 10.3332506,5 10.8332557,5 C11.3332608,5 11.666589,5.33228556 11.666589,5.83073934 C11.666589,6.32916768 11.3332608,6.66145325 10.8332557,6.66145325 C10.3332506,6.66145325 9.58325568,6.74453735 9.58325568,6.24608358 Z" fill="#FFFFFF" fillRule="nonzero"></path>
                              </svg>
                            </div>
                            <div className="icoTxt">
                              <span>{data.driving_license}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Container - Experience, Skills, Education, Languages */}
          <div className="parentContainer hidefirstpass">
            <div className="left-box">
              {/* Experience Section */}
              <div className="section expr-sec SECTION_EXPR multi-para has-title">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.experience}</div>
                  </div>
                  <div>
                    {data.experiences?.map((exp, index) => (
                      <div
                        key={exp.id}
                        className={`paragraph PARAGRAPH_EXPR ${index === 0 ? "firstparagraph" : ""}`}
                      >
                        <div className="clearfix doc-item">
                          <div className="singlecolumn">
                            <span className="dispBlock">
                              <span className="dflex">
                                <span>
                                  <span className="jobdates">{formatDate(exp.start_date, language)}</span>
                                  <span>  to  </span>
                                  <span className="jobdates">
                                    {exp.currently_working ? t.present : formatDate(exp.end_date, language)}
                                  </span>
                                  <br />
                                </span>
                              </span>
                            </span>
                            <span className="dispBlock">
                              <span className="jobtitle txtCaps txtBold">{exp.job_title}</span>
                            </span>
                            <span className="dispBlock locationGap">
                              <span className="companyname txtBold">{exp.company}</span>
                              {exp.company && exp.location && <span>, </span>}
                              <span className="jobcity">{exp.location}</span>
                            </span>
                            <span className="jobline">
                              <ul>
                                {exp.description?.split("\n").map((line, i) => (
                                  <li key={i}>{line}</li>
                                ))}
                              </ul>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="right-box">
              {/* Skills Section */}
              <div className="section SECTION_HILT has-title">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.skills}</div>
                  </div>
                  <div>
                    <div className="paragraph PARAGRAPH_HILT firstparagraph">
                      <div className="clearfix doc-item">
                        <div className="singlecolumn maincolumn">
                          <ul>
                            {data.skills?.map((skill) => (
                              <li key={skill.id}>{skill.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Education Section */}
              <div className="section SECTION_EDUC multi-para has-title">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.education}</div>
                  </div>
                  <div>
                    {data.educations?.map((edu, index) => (
                      <div
                        key={edu.id}
                        className={`paragraph PARAGRAPH_EDUC ${index === 0 ? "firstparagraph" : ""}`}
                      >
                        <div className="clearfix doc-item">
                          <div className="singlecolumn">
                            <div>
                              <span className="dispBlock">
                                <span>{formatDate(edu.end_date, language) || formatDate(edu.start_date, language)}</span>
                              </span>
                              <span className="dispBlock txtBold">
                                {edu.degree && <span className="degree">{edu.degree} </span>}
                                <span className="programline">{edu.field_of_study}</span>
                              </span>
                              <span className="dispBlock">
                                <span className="companyname txtBold">{edu.institution}</span>
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
              {/* Languages Section */}
              {data.languages && data.languages.length > 0 && (
                <div className="section langSec SECTION_LNGG has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{t.languages}</div>
                    </div>
                    <div>
                      {data.languages.map((lang, index) => (
                        <div
                          key={lang.id}
                          className={`paragraph PARAGRAPH_LNGG ${index === 0 ? "firstparagraph" : ""}`}
                        >
                          <div className="clearfix doc-item">
                            <div className="singlecolumn">
                              <div className="field">
                                <span className="txtBold">{lang.name}</span>
                                <span className="colon">:</span>
                              </div>
                              <div className="ratingBar">
                                <div
                                  className="innerRating"
                                  style={{ width: getLanguageWidth(lang.level || 3) }}
                                ></div>
                              </div>
                              <div className="field field-ratt">
                                <span>
                                  {lang.proficiency
                                    ? lang.proficiency.charAt(0).toUpperCase() + lang.proficiency.slice(1)
                                    : ""}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
