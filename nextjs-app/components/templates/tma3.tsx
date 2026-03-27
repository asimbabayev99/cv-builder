/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations, formatDate } from "@/lib/translations";

const defaultTranslations = translations.en;

export default function TemplateTma3({
  data = sampleData,
  translations: t = defaultTranslations,
  language = "en",
  colorHex = "#343b40",
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
  const halfSkills = Math.ceil((data.skills?.length || 0) / 2);
  const skillsCol1 = data.skills?.slice(0, halfSkills) || [];
  const skillsCol2 = data.skills?.slice(halfSkills) || [];

  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;background:#FFF;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-tma3 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        .skn-tma3 span.paddedline{display:block}
        .skn-tma3 .jobtitle,.skn-tma3 .degree{font-weight:bold;color:#343b40}
        .skn-tma3 .companyname,.skn-tma3 .programline{color:#343b40}
        .skn-tma3 .datesWrapper,.skn-tma3 .flt-right{float:right}
        .skn-tma3 .datesWrapper{font-style:italic}
        .skn-tma3 .txtBold{font-weight:bold}
		.skn-tma3 .dispInBlk{display:inline-block}
		.skn-tma3 .maxWidth{max-width:100%}
        .skn-tma3 .brk-all{word-break:break-all}

        .skn-tma3 ul,.skn-tma3 li{list-style-type:disc;margin:5px 0 0 10px;padding:0}
        .skn-tma3 ul li{margin:0 0 0 13px;padding:0 0 0 10px}

        .skn-tma3{color:#343b40;background-color:#FFF;word-wrap:break-word;text-size-adjust:none;-ms-text-size-adjust:none;-moz-text-size-adjust:none;-webkit-text-size-adjust:none;min-height:792px}
        .skn-tma3 .name{font-weight:bold;font-size:15px;line-height:17px;padding:0;text-align:left;text-transform:uppercase;letter-spacing:1px;color:#343b40}
        .skn-tma3 .resumeTitle{color:#4a4a4a}
        .skn-tma3 .paragraph{position:relative}
        .skn-tma3 .address,.skn-tma3 .address2{position:relative;text-align:left;font-size:0.917em;line-height:1.25em}
        .skn-tma3 .address{margin:0}
        .skn-tma3 .table_wrapper{width:100%;margin-top:0}
		.skn-tma3 .skill{display:table;width:100%;table-layout:fixed}
        .skn-tma3 table.twocol td{width:50%;display:table-cell}
        .skn-tma3 table.skills,.skn-tma3 table.twocol{width:100%}
        .skn-tma3 table.skills th,.skn-tma3 table.skills td{width:20%;text-align:center}
        .skn-tma3 table.skills th{text-decoration:underline}
        .skn-tma3 table.skills .skillname,.skn-tma3 table.skills .skillrating{text-align:left;width:35%}
        .skn-tma3 table.skills .skillrating{width:20%}
        .skn-tma3 table.skills .skillyears,.skn-tma3 table.skills .skilllast{width:19%}
        .skn-tma3 table.skills .pad1{width:5%}
        .skn-tma3 table.skills .pad2,.skn-tma3 table.skills .pad3{width:1%}
        .skn-tma3 .heading{clear:both;font-weight:bold;text-transform:uppercase;color:#343b40}
        .skn-tma3 .sectiontitle{letter-spacing:1px}
        .skn-tma3 .social-link .sprtr{padding:0 2px}
        .skn-tma3 .social-link:last-child .sprtr{display:none}
        .skn-tma3 .texp-cell{display:block;text-align:right;margin-bottom:8px}
        .skn-tma3 .totl-expr{display:inline-block;padding:0px 6px;color:#fff;font-weight:700;text-wrap:nowrap;font-style:italic}
        .skn-tma3.texp-curved .totl-expr{border-radius:10px}
        .skn-tma3 .dflex{display:flex;justify-content:space-between}

        /*Personal details section*/
        .skn-tma3 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-tma3 .details-wrap{width:49%}

        /*FIX for FORCEFULLY making left margin ZERO for CL*/
        .skn-tma3 .sectionCL .paragraph{margin-top:0}

        /*Timeline classes*/
        .skn-tma3 .section{border-left:1px solid #434d54;padding-left:20px;margin-left:17px;position:relative}
        .skn-tma3 .firstsection,.skn-tma3 .SECTION_CNTC,.skn-tma3 .firstsection,.skn-tma3 .SECTION_ALNK,.skn-tma3 .SECTION_PRFL,.skn-tma3 .SECTION_PPDT_SGTR{border:none}
        .skn-tma3 .SECTION_CNTC+.section:before,.skn-tma3 .SECTION_ALNK+.section:before,.skn-tma3 .SECTION_PRFL+.section:before{content:"";top:0;left:-1px;width:2px;height:5px;background:#fff;position:absolute;z-index:1}
        .skn-tma3 .firstsection{padding-bottom:0}
        .skn-tma3 .heading{position:relative}
        .skn-tma3 .heading:before{display:block;position:absolute;top:4px;left:-25px;content:"";height:8px;width:8px;border:1px solid #434d54;border-radius:100%;background: #fff;z-index:2}

        /*Builder team Fix for finalise page*/
        .skn-tma3 .SortableItem:nth-of-type(2) .section:before{content:"";top:0;left:-1px;width:2px;height:5px;background:#fff;position:absolute;z-index:1}

        /*MES and MFR address order code*/
        .skn-tma3 .zipprefix,.skn-tma3.MES .zipsuffix,.skn-tma3.MFR .zipsuffix{display:none}
        .skn-tma3 .zipsuffix,.skn-tma3.MES .zipprefix,.skn-tma3.MFR .zipprefix{display:block}
        .skn-tma3.MDE .hide-de{display:none}

        /*Infographic*/
        .skn-tma3 .lang-sec,.skn-tma3 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-tma3 .lang-sec .heading,.skn-tma3 .skli-sec .heading{width:100%;flex-grow:1}
        .skn-tma3 .lang-sec .paragraph, .skn-tma3 .skli-sec .paragraph{width:48.5%}
        .skn-tma3 .lang-sec .field *,.skn-tma3 .lang-sec .nativeLangPara .field,.skn-tma3 .skli-sec .field *{display:inline}
        .skn-tma3 .lang-sec .paragraph,.skn-tma3 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0}
        .skn-tma3 .lang-sec .singlecolumn,.skn-tma3 .skli-sec .singlecolumn{margin-left:0;position:relative}
        .skn-tma3 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
        .skn-tma3 .section.lang-sec .paragraph.nativeLangPara{width:100%;padding-bottom:5px}
        .skn-tma3 .inner-rating{background-color:#1A4771;height:4px;width:60%}
        .skn-tma3 .lang-sec > .paragraph:nth-last-child(1),.skn-tma3 .lang-sec > .paragraph:nth-last-child(2),
        .skn-tma3 .skli-sec > .paragraph:nth-last-child(1),.skn-tma3 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0}
        .skn-tma3 .hide-bar .rating-bar,.skn-tma3 .hide-only-bar .rating-bar,.skn-tma3 .hide-colon .colon{display:none}

		.skn-tma3 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-tma3 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}

       /*HILT multi para/section*/
       .skn-tma3 .multi-section-hilt .multi-para-opt,.skn-tma3 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-tma3 .multi-para-hilt .dflt-view{display:none}
       .skn-tma3 .multi-para-hilt:after{content:"";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/
	   .skn-tma3 .multi-para-hilt .paragraph .singlecolumn{margin-left:0}
       .skn-tma3 .multi-para-hilt .paragraph{width:49%;max-width:49%;display:block;float:left;clear:none;margin-top:0px;margin-right:2%;margin-bottom:10px;margin-top:0}
       .skn-tma3 .multi-para-hilt .paragraph:nth-child(2n+1){margin-right:0}
       .skn-tma3 .multi-para-hilt .paragraph:last-child,.skn-tma3 .multi-para-hilt .paragraph:nth-last-child(2){margin-bottom:0}

        /* GRYR */
        .skn-tma3 .displayNoneThisField{display:none}/* Keep this class always at bottom */
        .skn-tma3 .section.sign{padding-top:50px}

        /*For Extra Space Before Colon*/
        .skn-tma3 .beforecolonspace{display:none!important}
        .skn-tma3.MFR .beforecolonspace{display:inline!important}

        /* Style for Signature */
        .skn-tma3 .disclaim .singlecolumn,.skn-tma3 .disclaim .singlecolumn li,.skn-tma3 .disclaim .singlecolumn p,.skn-tma3 .disclaim .singlecolumn span{font-size:9px;color:#8a8a8a}
        .skn-tma3 .field_sign{font-size:7px;color:#8a8a8a}
        .skn-tma3 .txtleft + .field_sign{text-align:left}
        .skn-tma3 .txtcenter + .field_sign{text-align:center}
        .skn-tma3 .txtright + .field_sign{text-align:right}
        .skn-tma3 .signPic img{max-width:100%}

         /* Text alignment bullet */
       .skn-tma3 .ttc-align-left ul{text-align:left}
       .skn-tma3 .ttc-align-right ul{text-align:right}
       .skn-tma3 .ttc-align-center ul{text-align:center}
       .skn-tma3 .ttc-align-justify ul{text-align:justify}
       .skn-tma3 .ttc-align-right li,.skn-tma3 .ttc-align-center li{position:relative;list-style-position:inside;margin-left:0;padding-left:0}
       .skn-tma3 .ttc-align-right li:first-letter,.skn-tma3 .ttc-align-center li:first-letter{padding-left:5px}

        /*Hyphen Handling*/
        .skn-tma3 .hyphen:before{content:' - '}
        .skn-tma3.hyphen-en-dash .hyphen:before{content:' – '}


        .skn-tma3,.skn-tma3 table{line-height:14px}
        .skn-tma3.pagesize{width:535px}
        .skn-tma3.fontsize,.skn-tma3 .lang-sec .paragraph *,.skn-tma3 .skli-sec .paragraph *{font-size:11px}
        .skn-tma3.fontface{font-family:Verdana}
        .skn-tma3.vmargins{padding-top:30px;padding-bottom:30px}
        .skn-tma3.hmargins{padding-left:30px;padding-right:30px}
        .skn-tma3 .section{padding-top:20px;border-color:#343b40}
        .skn-tma3 .section.firstsection,.skn-tma3 .section.SECTION_CNTC{margin-top:0;padding-top:0}
        .skn-tma3 .paragraph{margin-top:10px}
        .skn-tma3 .firstparagraph{margin-top:0}
        .skn-tma3 .singlecolumn,.skn-tma3 .maincolumn{margin-left:0px}
        .skn-tma3 .sectiontitle{font-size:11px;line-height:20px}
        .skn-tma3 .heading{padding-bottom:5px}
        .skn-tma3 table.skills td{padding-top:5px}
        .skn-tma3 .name{font-size:28px;line-height:31px}
        .skn-tma3 .resumeTitle{font-size:15px;line-height:15px;padding:6px 0}
        .skn-tma3 .address{font-size:11px;line-height:14px}
        .skn-tma3 .heading{color:#343b40}
		.skn-tma3 .skli-sec .singlecolumn .field:last-child{min-height:14px}
        .skn-tma3 .paragraph.firstparagraph .texp-cell{padding-top:0}
        .skn-tma3 .paragraph .texp-cell{padding-top:6px}
        .skn-tma3 .texp-cell{margin-bottom:8px}
        .skn-tma3 .totl-expr{background-color:#343b40;font-size:8px;line-height:13px;padding:0 6px}

        /*FIX for Re-calculating width of singlecolumn for CL*/
        .skn-tma3 .sectionCL .singlecolumn{margin-left:0;width:100%}
        .skn-tma3 .address2{font-size:11px;line-height:14px}

        /*Builder team Fix for finalise page*/
        .skn-tma3 .SortableItem:nth-of-type(2) .section:before{height:30px}

        /*Timeline*/
        .skn-tma3 .heading:before{border-color:#343b40;top:5px}
        .skn-tma3 .SECTION_CNTC+.section:before,.skn-tma3 .SECTION_ALNK+.section:before,.skn-tma3 .SECTION_PRFL+.section:before{height:30px}

        /*Infographic*/
        .skn-tma3 .lang-sec,.skn-tma3 .skli-sec{padding-left:20px}
        .skn-tma3 .lang-sec .heading,.skn-tma3 .skli-sec .heading{margin-left:-0px}
        .skn-tma3 .inner-rating{background-color:${colorHex}}

        /* Multi para hilt */
        .skn-tma3 .multi-para-hilt{padding-left:20px}
        .skn-tma3 .multi-para-hilt .heading{margin-left:-0px}

        /*Finalize Fixes*/
        .skn-tma3 .lang-sec .sortableInner .sortable-item:not(:first-child) .paragraph,.skn-tma3 .skli-sec .sortableInner .sortable-item:not(:first-child) .paragraph{vertical-align:top}
        .skn-tma3 .lang-sec .sortable-item,.skn-tma3 .skli-sec .sortable-item{display:inline-block;vertical-align:top}
        .page-finalize .skn-tma3 .sortableInner .paragraph-container+.paragraph-container,.page-finalize .sortable-drag-item.skn-tma3 .section{margin-top:0!important}
        .skn-tma3 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}
		.TMA3.skn-tma3 .section-container.active:before{border-color:#343b40}
        .TMA3.skn-tma3 .sortable-item:nth-of-type(1):not(.name-contact) .section:before{height:30px}
        .skn-tma3 .data-LNGG .sortable-item.native-lang{width:100%;max-width:100%}
        .skn-tma3 .data-LNGG .doc-item,.skn-tma3 .data-SKLI .doc-item,.skn-tma3 .lang-sec .doc-item,.skn-tma3 .skli-sec .doc-item{width:100%}
        .skn-tma3 .data-LNGG .sortableInner,.skn-tma3 .data-SKLI .sortableInner,.skn-tma3 .SECTION_LNGG .sortableInner,.skn-tma3 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-tma3 .data-LNGG .sortable-item,.skn-tma3 .data-SKLI .sortable-item{width:48.5%}
        .skn-tma3 .data-LNGG .sortable-item .paragraph,.skn-tma3 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}


		/*Fixes for builder for skill*/
        .skn-tma3 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:14px}
        .skn-tma3 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-tma3 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}
       .skn-tma3 .lang-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-tma3 .lang-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph, .skn-tma3  .skli-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-tma3  .skli-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0}

	   /*PDF Flex Handling Code - Personal Information*/
		.skn-tma3.for-pdf .pdet-sec .singlecolumn{display:block}
		.skn-tma3.for-pdf .pdfpdwrapper{display:block}
		.skn-tma3.for-pdf .pdfpdwrapper:after{content:'';clear:both;display:table}
		.skn-tma3.for-pdf .pdfpdwrapper .details-wrap:first-child{float:left;padding-right:5px}
		.skn-tma3.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){float:right}
		.skn-tma3.for-pdf .pdfpdwrapper .details-wrap{width:245px!important;}

    /*Infographic Containers*/
    .skn-tma3.for-pdf .lang-sec,.skn-tma3.for-pdf .skli-sec{display:block}
    .skn-tma3.for-pdf .pdfinfwrapper{display:block}
    .skn-tma3.for-pdf .pdfinfwrapper:after{content:'';clear:both;display:table}
    .skn-tma3.for-pdf .pdfinfwrapper .paragraph:first-child{float:left}
    .skn-tma3.for-pdf .pdfinfwrapper .paragraph:nth-child(2){float:right}
    .skn-tma3.for-pdf .pdfinfwrapper:last-child .paragraph{margin-bottom:0;padding-bottom:0}
    `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-tma3 TMA3 MUK hyphen-normal pict-pcpf-purl texp-rectangle expr-durt-none " docskinwidth="535" ><div data-testid="embd-91y4rV2" className="name-contact "><div></div><div></div><div data-testid="embd-88MByq6-PRFL" id="SECTION_PRFL30868c37-6fcc-4b70-b87a-afd2447ce0d4" className="section SECTION_PRFL firstsection" data-section-cd="PRFL"><div data-testid="embd-88uQIHR-PRFL" className="doc-item"><div data-testid="embd-88aw0Ce-PRFL" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-04f55583-5181-435c-8336-f48964adf912" id="PARAGRAPH_PRFL_04f55583-5181-435c-8336-f48964adf912" className="paragraph PARAGRAPH_PRFL firstparagraph"><div data-testid="embd-78KlmQp">
                <div className="name" data-uppercase="true">
                    <span id="FIELD_FNAM">{data.first_name}</span>
                    {data.first_name && data.last_name && <span dependency="FNAM+LNAM"><br /></span>}
                    <span id="FIELD_LNAM">{data.last_name}</span>
                </div>

                <div className="address">
                    {data.email && <span id="FIELD_EMAI">{data.email}</span>}
                    {data.email && data.phone && <span dependency="EMAI+HPHN"> | </span>}
                    {data.phone && <span className="dispInBlk maxWidth"><span id="FIELD_HPHN" dependency="HPHN">{data.phone}</span></span>}
                    <span className="dispInBlk maxWidth"></span>
                    {(data.street_address || data.city || data.postcode) && (
                      <span className="zipsuffix" dependency="STRT|ZIPC|CITY|STAT|ADDR|REMW">
                        {data.street_address && <><span id="FIELD_STRT">{data.street_address}</span><span dependency="STRT"><span dependency="CITY|STAT">, </span></span></>}
                        {data.city && <span className="spaced" id="FIELD_CITY">{data.city}</span>}
                        <span className="spaced" id="FIELD_STAT"></span>
                        {data.postcode && <span className="spaced" id="FIELD_ZIPC">{data.postcode}</span>}
                      </span>
                    )}
                </div>

                {/* Additional contact info row */}
                {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                  <div className="address" dependency="DOB1|NTLY|IDNV|IDNT|DRIV|MSTA|WEB1|AVAI|SOCL|PRTF|VDCV">
                    {data.nationality && (
                      <>
                        <span dependency="NTLY" className="dispInBlk maxWidth">
                          <span className="txtBold"><span className="xslt_static_change">{t.nationality || 'Nationality'}</span><span className="beforecolonspace">&nbsp;</span><span>:</span></span>
                          <span id="FIELD_NTLY">{data.nationality}</span>
                        </span>
                        {(data.driving_license || data.website || data.linkedin) && <span dependency="NTLY"><span dependency="IDNV|IDNT|DRIV|MSTA|WEB1|AVAI|SOCL|PRTF|VDCV" className="sprtr"> | </span></span>}
                      </>
                    )}

                    {data.driving_license && (
                      <>
                        <span dependency="DRIV" className="dispInBlk maxWidth">
                          <span className="txtBold"><span className="xslt_static_change">{t.permit || 'Permit'}</span><span className="beforecolonspace">&nbsp;</span><span>:</span></span>
                          <span id="FIELD_DRIV">{data.driving_license}</span>
                        </span>
                        {(data.website || data.linkedin) && <span dependency="DRIV"><span dependency="MSTA|WEB1|AVAI|SOCL|PRTF|VDCV" className="sprtr"> | </span></span>}
                      </>
                    )}

                    {data.website && (
                      <>
                        <span dependency="WEB1" className="dispInBlk maxWidth">
                          <span className="txtBold"><span className="xslt_static_change">{t.web || 'Web'}</span><span className="beforecolonspace">&nbsp;</span><span>:</span></span>
                          <span id="FIELD_WEB1">{data.website}</span>
                        </span>
                        {data.linkedin && <span dependency="WEB1"><span dependency="AVAI|SOCL|PRTF|VDCV" className="sprtr"> | </span></span>}
                      </>
                    )}

                    {data.linkedin && (
                      <span dependency="SOCL">
                        <span className="maxWidth dispInBlk social-link" id="CATEGORY_SOCIAL_SOCL">
                          <span className="txtBold"><span id="DOCDATAINFO_SOCL">LinkedIn</span><span className="beforecolonspace"> </span><span>: </span></span>
                          <span className="brk-all" id="FIELD_SOCL">{data.linkedin}</span>
                        </span>
                      </span>
                    )}
                  </div>
                )}

            </div></div></div></div></div></div></div><div data-testid="embd-89XOkPJ0" className="parent-wrapper">

{/* Professional Summary Section */}
{data.summary && (
<div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="20" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">{t.summary || 'PROFESSIONAL SUMMARY'}</div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn" id="FIELD_FRFM"><p>{data.summary}</p></div>
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="20" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>
)}

{/* Work Experience Section */}
{data.experiences && data.experiences.length > 0 && (
<div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="20" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section expr-sec SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">{t.experience || 'WORK HISTORY'}</div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">
  {data.experiences.map((exp, index) => (
    <div key={exp.id || index} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="20" className="sortable-item paragraph-container SortableItem-sibling">
      <button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="20" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button>
      <div data-testid={`embd-79HRa2m-${exp.id}`} id={`PARAGRAPH_EXPR_${exp.id}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}>
        <div data-testid="embd-78FzR29" className="clearfix doc-item">
          <div className="singlecolumn">
            <span className="paddedline" dependency="JTIT|JCTR|COMP|JCIT|JSTA|JCNT">
              {exp.job_title && <><span className="jobtitle" id="FIELD_JTIT">{exp.job_title}</span><span dependency="JTIT"><span dependency="COMP|JCIT|JSTA|JCNT|JCTR"> |</span></span></>}
              {exp.company && <><span className="companyname" id="FIELD_COMP">{exp.company}</span><span dependency="COMP"><span dependency="JCIT|JSTA|JCNT|JCTR" className="hyphen"></span></span></>}
              {exp.location && <span className="joblocation jobcity" id="FIELD_JCIT">{exp.location}</span>}
              {(exp.start_date || exp.end_date || exp.currently_working) && (
                <span className="datesWrapper" dependency="JSTD|EDDT">
                  {exp.start_date && <span className="jobdates" id="FIELD_JSTD">{formatDate(exp.start_date, language)}</span>}
                  {exp.start_date && (exp.end_date || exp.currently_working) && <span dependency="JSTD+EDDT" className="hyphen"></span>}
                  <span className="jobdates" id="FIELD_EDDT">{exp.currently_working ? (t.present || 'Current') : (exp.end_date ? formatDate(exp.end_date, language) : '')}</span>
                </span>
              )}
            </span>
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
</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="20" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>
)}

{/* Skills Section */}
{data.skills && data.skills.length > 0 && (
<div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="20" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">{t.skills || 'SKILLS'}</div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn maincolumn">
                    <table className="twocol skill dflt-view">
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
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="20" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>
)}

{/* Education Section */}
{data.educations && data.educations.length > 0 && (
<div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="20" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">{t.education || 'EDUCATION'}</div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">
  {data.educations.map((edu, index) => (
    <div key={edu.id || index} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="20" className="sortable-item paragraph-container SortableItem-sibling">
      <button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="20" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button>
      <div data-testid={`embd-79HRa2m-${edu.id}`} id={`PARAGRAPH_EDUC_${edu.id}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}>
        <div data-testid="embd-78FzR29" className="clearfix doc-item">
          <div className="singlecolumn">
            <span className="paddedline" dependency="SCHO|SCIT|SSTA|GRYR|SCNT">
              {edu.institution && <><span className="companyname companyname_educ" id="FIELD_SCHO">{edu.institution}</span><span dependency="SCHO"><span dependency="SCIT|SSTA|SCNT" className="hyphen"></span></span></>}
              {edu.location && <span className="joblocation jobcity" id="FIELD_SCIT">{edu.location}</span>}
              {(edu.start_date || edu.end_date) && (
                <span className="datesWrapper" dependency="GRYR|GRED|GRST|GRIP">
                  {edu.start_date && <span className="jobdates" id="FIELD_GRST">{formatDate(edu.start_date, language)}</span>}
                  {edu.start_date && edu.end_date && <span dependency="GRST+GRED" className="hyphen"></span>}
                  {edu.end_date && <span className="jobdates" id="FIELD_GRED">{formatDate(edu.end_date, language)}</span>}
                </span>
              )}
            </span>
            {(edu.degree || edu.field_of_study) && (
              <span className="paddedline" dependency="DGRE|STUY|GRHN">
                {edu.degree && <span className="degree" id="FIELD_DGRE">{edu.degree}</span>}
                {edu.degree && edu.field_of_study && <span dependency="DGRE+STUY"><span className="beforecolonspace">&nbsp;</span><span>: </span></span>}
                {edu.field_of_study && <span className="programline" id="FIELD_STUY">{edu.field_of_study}</span>}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="20" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div>
)}

{/* Languages Section */}
{data.languages && data.languages.length > 0 && (
<div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="20" className="sortable-item section-container SortableItem-sibling data-LNGG">
  <div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG88bc36a1-247b-b72f-7918-a79948b8fc80" className="section lang-sec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
    <div data-testid="embd-88uQIHR-LNGG" className="doc-item">
      <div data-testid="embd-88ciQTv" className="heading">
        <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_LNGG">{t.languages || 'LANGUAGES'}</div>
      </div>
      <div data-testid="embd-88aw0Ce-LNGG" className="">
        <div data-testid="embd-87S8HNi88bc36a1-247b-b72f-7918-a79948b8fc80" id="CONTAINER_88bc36a1-247b-b72f-7918-a79948b8fc80" className="sortableInner">
          {data.languages.map((lang, index) => (
            <div key={lang.id || index} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="20" className="data-LNGG sortable-item paragraph-container SortableItem-sibling">
              <div data-testid={`embd-79HRa2m-${lang.id}`} id={`PARAGRAPH_LNGG_${lang.id}`} className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}>
                <div data-testid="embd-78FzR29" className="clearfix doc-item">
                  <div className="singlecolumn">
                    <div className="field">
                      <span className="txtBold" id="FIELD_FRFM">{lang.name}</span>
                      <span className="colon"><span className="beforecolonspace"> </span><span dependency="FRFM">: </span></span>
                      <span className="flt-right" id="FIELD_RATG"></span>
                    </div>
                    <div className="rating-bar" dependency="RATV">
                      <div className="inner-rating" id="FIELD_RATV" style={{ width: getLevelWidth(lang.level) }}></div>
                    </div>
                    <div className="field">
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
  <button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="20" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button>
</div>
)}

</div></div><div></div></div></div>
    </>
  );
}
