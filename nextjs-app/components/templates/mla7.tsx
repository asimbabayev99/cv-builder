/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations, formatDate } from "@/lib/translations";

const defaultTranslations = translations.en;

export default function TemplateMla7({
  data = sampleData,
  translations: t = defaultTranslations,
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
        .skn-mla7 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        .skn-mla7 .degreeGap{margin-top:5px}
        .skn-mla7 .txt-bold{font-weight:bold}
        .skn-mla7 .txtItl{font-style:italic}
        .skn-mla7 .sprtr{margin:0 3px}
        .skn-mla7 .sprtr + .sprtr{display:none}
        .skn-mla7 .paddedline{display:block}
        .skn-mla7 .flt-right{float:right}
        .skn-mla7 .disp-inblk{display:inline-block}
		.skn-mla7 .max-width{max-width:100%}

        /*START content disc style for LI*/
        .skn-mla7 ul,.skn-mla7 li{list-style:none;margin:0 0 0 8px;padding:0}
        .skn-mla7 ul li{position:relative;margin:0 0 0 5px}
        .skn-mla7 ul li:before{content:'\\25CF\\0020';position:absolute;left:-13px;top:0}
        /*END content disc style for LI*/

        .skn-mla7{color:#4a4a4a;line-height:16px;font-variant-ligatures:none;min-height:792px}
        .skn-mla7 .parentContainer{table-layout:fixed}
        .skn-mla7 table.skills,.skn-mla7 .table_wrapper{width:100%;margin-top:0}
        .skn-mla7 table.skills th,.skn-mla7 table.skills td{width:20%;text-align:center}
        .skn-mla7 table.skills th{text-decoration:underline}
        .skn-mla7 table.skills .skillname,.skn-mla7 table.skills .skillrating{text-align:left;width:35%}
        .skn-mla7 table.skills .skillrating{width:20%}
        .skn-mla7 table.skills .skillyears,.skn-mla7 table.skills .skilllast{width:19%}
        .skn-mla7 table.skills .pad1{width:5%}
        .skn-mla7 table.skills .pad2,.skn-mla7 table.skills .pad3{width:1%}
        .skn-mla7 .parentContainer{display:table;width:100%;border-collapse:collapse}
        .skn-mla7 .name{border:1px solid #505050;border-radius:3px;display:inline-block;font-weight:bold;font-style:italic;padding:0 25px;font-size:30px;line-height:28px;text-align:center;letter-spacing:.8px;word-wrap:break-word}
        .skn-mla7 .resumeTitle{text-align:center;color:#4a4a4a}
        .skn-mla7 .address{text-align:center}
        .skn-mla7 .heading{margin-bottom:10px;font-weight:bold;font-size:18px;text-transform:uppercase;font-style:italic}
        .skn-mla7 .sectiontitle{color:#3ee2db}
        .skn-mla7 .sectiontitle,.skn-mla7 .singlecolumn{word-wrap:break-word}
        .skn-mla7 .left-box{padding-right:20px;display:table-cell;overflow:hidden}
        .skn-mla7 .right-box{padding-left:20px;display:table-cell;vertical-align:top}
        .skn-mla7 .firstsection{text-align:center;position:relative}
        .skn-mla7 .firstsection:after,.skn-mla7 .firstsection:before{background:#3ee2db;content:"";display:block;position:absolute;z-index:-1;width:100%;height:100%;left:0;top:0;-khtml-opacity:.32;-moz-opacity:.32;-ms-filter:"alpha(opacity=32)";filter:alpha(opacity=32);filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0.32);opacity:.32}
        .skn-mla7 .jobline ul{margin-top:6px}
        .skn-mla7 .alinkSection{padding-top:10px!important;text-align:center}
        .skn-mla7 .social-link:last-child .sprtr{display:none}
		
		/*New logic for infographic*/
        .skn-mla7 .lang-sec .singlecolumn,.skn-mla7 .skli-sec .singlecolumn{display:none}
        .skn-mla7 .lang-sec.infobarsec .infobarpara,.skn-mla7 .skli-sec.infobarsec .infobarpara{display:block}
		
		/*Infographic*/
        .skn-mla7 .lang-sec.infobarsec,.skn-mla7 .skli-sec.infobarsec{font-size:0}
         .skn-mla7 .lang-sec.infobarsec .field *,.skn-mla7 .skli-sec.infobarsec .field *,.skn-mla7 .lang-sec.infobarsec .nativeLangPara .field{display:inline}
         .skn-mla7 .lang-sec.infobarsec .para_odd,.skn-mla7 .skli-sec.infobarsec .para_odd{margin-right:15px;display:inline-block}
         .skn-mla7 .parentContainer .lang-sec.infobarsec .singlecolumn,.skn-mla7 .parentContainer .skli-sec.infobarsec .singlecolumn{margin-left:0;padding-left:0}
         .skn-mla7 .inner-rating{position:relative}
         .skn-mla7 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;page-break-inside:avoid}
         .skn-mla7 .inner-rating{background-color:#3ee2db;height:4px;width:60%}
        /*  .skn-mla7 .parentContainer .right-box .lang-sec.infobarsec .paragraph:nth-last-child(1), .skn-mla7 .parentContainer .right-box .lang-sec.infobarsec .paragraph:nth-last-child(2){padding-bottom:0} */
         .skn-mla7 .parentContainer .lang-sec .paragraph,.skn-mla7 .parentContainer .skli-sec .paragraph{display:inline-block;vertical-align:top;margin-top:0px}
         .skn-mla7 .parentContainer .right-box .lang-sec.infobarsec .paragraph,.skn-mla7 .parentContainer .right-box .skli-sec.infobarsec .paragraph{display:block} /* Added for PDF Fix */
         .skn-mla7 .right-box .lang-sec.infobarsec .para_odd,.skn-mla7 .right-box .skli-sec.infobarsec .para_odd{margin-right:0px}
         .skn-mla7 .right-box .lang-sec.infobarsec .paragraph,.skn-mla7 .right-box .skli-sec.infobarsec .paragraph{width:100%}
         .skn-mla7 .right-box .lang-sec.infobarsec,.skn-mla7 .right-box .skli-sec.infobarsec{margin-left:0px}
         .skn-mla7 .left-box .lang-sec .paragraph,.skn-mla7 .left-box .skli-sec .paragraph{padding-bottom:5px}
		 .skn-mla7 .parentContainer .right-box .skli-sec .paragraph{display:block} /* Added for PDF Fix */
		  
		  /*Infographic Tiles*/
        
        .skn-mla7 .skli-sec .paragraph{display:inline-block;vertical-align:top;padding-bottom:5px;margin-top:0}
        .skn-mla7 .parentContainer .right-box .skli-sec .paragraph{display:block} /* Added for PDF Fix */
        .skn-mla7 .right-box .lang-sec > .paragraph:nth-last-child(1),.skn-mla7 .skli-sec > .paragraph:nth-last-child(1),.skn-mla7 .right-box .skli-sec > .paragraph:nth-last-child(1){padding-bottom:0}
        .skn-mla7 .left-box .lang-sec > .paragraph:nth-last-child(1),.skn-mla7 .skli-sec > .paragraph:nth-last-child(1),.skn-mla7 .left-box .skli-sec > .paragraph:nth-last-child(1),.skn-mla7 .left-box .skli-sec > .paragraph:nth-last-child(2),.skn-mla7 .left-box .lang-sec > .paragraph:nth-last-child(2){padding-bottom:0}
        
        .skn-mla7 .hide-bar .field-ratt,.skn-mla7 .hide-only-bar .field-ratt{width:100%!important}
        .skn-mla7 .hide-bar .rating-bar,.skn-mla7 .hide-bar .field-ratt,.skn-mla7 .hide-only-bar .rating-bar,.skn-mla7 .hide-colon .colon{display:none!important}

        /*Duration tag*/
        .skn-mla7 .totl-expr{display:inline-block;float:right; padding:0 6px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap;margin-left:5px}
        .skn-mla7.texp-curved .totl-expr{border-radius:10px}
        .skn-mla7 .dflex{display:flex;justify-content:space-between}
        .skn-mla7 .right-box .totl-expr{display:none}

        /* GRYR */
        .skn-mla7 .displayNoneThisField{display:none}/* Keep this class always at bottom */
        
        /*Iron PDF Overlapping Fix*/
        .skn-mla7.for-iron-pdf div#CONTAINER_PARENT_0:before{content:'';display:block;position:absolute;left:0;top:0;width:100%;height:10px;z-index:-1000;background:#FFF}
    

        .skn-mla7,.skn-mla7 table{line-height:13px}
        .skn-mla7.pagesize{width:505px}
        .skn-mla7.fontsize, .skn-mla7 .lang-sec .paragraph *, .skn-mla7 .skli-sec .paragraph *{font-size:10px}
        .skn-mla7.fontface{font-family:Trebuchet MS}
        .skn-mla7.vmargins{padding-bottom:45px}
        .skn-mla7.hmargins{padding-left:45px;padding-right:45px}
        .skn-mla7 .section{padding-top:20px}
        .skn-mla7 .SECTION_CNTC{padding-top:0!important}
        .skn-mla7 .sectiontitle{color:#3ee2db;font-size:10px;line-height:15px}
        .skn-mla7 .paragraph{margin-top:15px}
        .skn-mla7 .firstparagraph{margin-top:0}
        .skn-mla7 .left-box .singlecolumn,.skn-mla7 .left-box .maincolumn{margin-left:0px}
        .skn-mla7 table.skills td{padding-top:7px}
        .skn-mla7 .name{font-size:32px;line-height:49px;max-width:455px}
        .skn-mla7 .resumeTitle{font-size:14px;line-height:20px;padding:15px 0 0 0}
        .skn-mla7 .address{font-size:9px;line-height:13px;padding-top:15px}
        .skn-mla7 .address2{font-size:10px;line-height:13px;padding-top:15px}
        .skn-mla7 .left-box{width:331px}
        .skn-mla7 .totl-expr{background-color:#3ee2db;font-size:8px;line-height:12px;padding:0 6px}

        /*Infographic*/
         .skn-mla7 .lang-sec .paragraph, .skn-mla7 .skli-sec .paragraph{padding-bottom:7px;vertical-align:top}
         .skn-mla7 .lang-sec.infobarsec .firstparagraph,.skn-mla7 .skli-sec.infobarsec .firstparagraph{padding-top:0}
         .skn-mla7 .left-box .lang-sec.infobarsec .paragraph,.skn-mla7 .left-box .skli-sec.infobarsec .paragraph{width:155px;max-width:155px}
         .skn-mla7 .lang-sec.infobarsec{margin-left:0px}
         .skn-mla7 .inner-rating{background-color:#3ee2db}
         .skn-mla7 .left-box .lang-sec.infobarsec .nativeLangPara{width:331px;max-width:331px}
         .skn-mla7 .left-box .lang-sec.infobarsec .heading,.skn-mla7 .left-box .skli-sec.infobarsec .heading{margin-left:-0px}
		 .skn-mla7 .left-box .skli-sec{padding-left:0px}
         .skn-mla7 .left-box .skli-sec .heading{margin-left:-0px}
         .skn-mla7 .left-box .skli-sec .paragraph{width:155px}
         .skn-mla7 .right-box .skli-sec .paragraph{padding-bottom:7px}

        /*Full color bleed calculation*/
        .skn-mla7 .firstsection{margin-left:-45px!important;margin-right:-45px!important;padding-left:45px;padding-right:45px;padding-top:45px}
        .skn-mla7 .firstsection:after{top:45px;height:25px}
        .skn-mla7 .firstsection:before{background:#3ee2db;height:45px}
        .skn-mla7 .firstsection:after,.skn-mla7 .firstsection:before{background:#3ee2db}
        .skn-mla7 .PARAGRAPH_PRFL{margin-left:-45px!important;margin-right:-45px!important;padding-left:45px;padding-right:45px}

        /*PDF Processing*/
        .skn-mla7 .left-box > *:last-child, .skn-mla7 .right-box > *:last-child{margin-bottom:-45px}
        .skn-mla7 .left-box, .skn-mla7 .right-box{padding-top:45px;padding-bottom:45px}
        .skn-mla7 .parentContainer{margin-top:-25px}

        /*Builder fixes*/
        .skn-mla7 .data-PRFL{margin-left:-45px!important;margin-right:-45px!important}
        .skn-mla7 .data-PRFL .firstsection{margin:0!important}
		 /*builder fixes*/
        .skn-mla7 .left-box .lang-sec .sortable-item,.skn-mla7 .left-box .skli-sec .sortable-item{display:inline-block}
        .skn-mla7 .right-box .lang-sec .sortable-item{width:100%}
        .page-finalize .skn-mla7 .langSec .sortableInner .sortable-item .paragraph{max-width:155px}
        .page-finalize .skn-mla7 .langSec .sortableInner .sortable-item .paragraph.nativeLangPara{max-width:100%}
		.page-finalize .skn-mla7 .left-box .langSec .sortableInner .sortable-item .paragraph.nativeLangPara{max-width:331px}
		.page-finalize .skn-mla7 .right-box .langSec .sortableInner .sortable-item .paragraph{width:100%;max-width:100%}

        .skn-mla7.for-pdf.texp-curved .dflex,.skn-mla7.for-pdf.texp-rectangle .dflex{display:block;}
        .skn-mla7.for-pdf.texp-curved .expr-sec .dflex > span:first-child,.skn-mla7.for-pdf.texp-rectangle .expr-sec .dflex > span:first-child{display:inline-block;width:72%;}
        .skn-mla7.for-pdf.texp-curved .expr-sec .dflex > span:last-child,.skn-mla7.for-pdf.texp-rectangle .expr-sec .dflex > span:last-child{display:inline-block;width:28%;float:right;}     
        
        .skn-mla7.for-iron-pdf{margin-top:-43px}
    `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-mla7 MLA7 MUK pict-pcpf-purl texp-none expr-durt-none " docskinwidth="505" ><div data-testid="embd-92LqKqF0" id="CONTAINER_PARENT_0" className="hidesecondpass"><div data-testid="embd-92PDkR60" id="CONTAINER_0" className=""><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="38" className="sortable-item section-container SortableItem-sibling  data-PRFL"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-PRFL" id="SECTION_PRFL30868c37-6fcc-4b70-b87a-afd2447ce0d4" className="section notdraggable firstsection SECTION_PRFL" data-section-cd="PRFL"><div data-testid="embd-88uQIHR-PRFL" className="doc-item"><div data-testid="embd-88aw0Ce-PRFL" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-04f55583-5181-435c-8336-f48964adf912" id="PARAGRAPH_PRFL_04f55583-5181-435c-8336-f48964adf912" className="paragraph PARAGRAPH_PRFL firstparagraph"><div data-testid="embd-78KlmQp">
                        <div className="name">
                            <span id="FIELD_FNAM" dependency="FNAM">{data.first_name}</span>
                            <span id="FIELD_LNAM" dependency="LNAM">{data.last_name}</span>
                        </div>

                        <div className="address">
                            <span id="FIELD_EMAI">{data.email}</span>
                            <span dependency="EMAI"><span className="sprtr" dependency="HPHN|CPHN|STRT|CITY|STAT|ZIPC|ADDR|DOB1|NTLY|DRIV|MSTA|SOCL|PRTF|VDCV">|</span></span>
                            <span id="FIELD_HPHN">{data.phone}</span>
                            <span dependency="HPHN"></span>
                            <span id="FIELD_CPHN"></span>
                            <span dependency="CPHN|HPHN"><span className="sprtr" dependency="STRT|CITY|STAT|ZIPC|ADDR|DOB1|NTLY|DRIV|MSTA|SOCL">|</span></span>
                            <span id="FIELD_STRT">{data.street_address}</span><span dependency="STRT+CITY|STAT">, </span>
                            <span id="FIELD_CITY">{data.city}</span>
                            <span id="FIELD_STAT"></span>
                            <span id="FIELD_ZIPC">{data.postcode}</span>
                            <span id="FIELD_ADDR"></span>
                            <span className="sprtr" dependency="STRT|CITY|STAT|ZIPC|ADDR|DOB1">|</span>
                            <span className="field" id="FIELD_REMW"></span><span></span>
                            {data.nationality && (<span dependency="NTLY" className="disp-inblk max-width">
                                <span className="txt-bold"><span className="xslt_static_change txt-bold">Nationality</span><span>: </span></span>
                                <span id="FIELD_NTLY">{data.nationality}</span>
                            </span>)}
                            {data.nationality && <span dependency="NTLY"><span className="sprtr" dependency="DRIV|MSTA|WEB1|SOCL|PRTF|VDCV">|</span></span>}
                            {data.driving_license && (<span dependency="DRIV" className="disp-inblk max-width">
                                <span className="txt-bold"><span className="xslt_static_change">Permit</span><span>: </span></span>
                                <span id="FIELD_DRIV">{data.driving_license}</span>
                            </span>)}
                            {data.driving_license && <span dependency="DRIV"><span className="sprtr" dependency="MSTA|WEB1|SOCL|PRTF|VDCV">|</span></span>}
                            {data.website && (<span dependency="WEB1" className="disp-inblk max-width">
                                <span className="txt-bold"><span className="xslt_static_change txt-bold">Web</span><span>: </span></span>
                                <span id="FIELD_WEB1">{data.website}</span>
                            </span>)}
                            {data.website && <span dependency="WEB1"><span className="sprtr" dependency="SOCL|PRTF|VDCV">|</span></span>}
                            {data.linkedin && (<span dependency="SOCL"><span id="CATEGORY_SOCIAL_SOCL" className="social-link"><span className="disp-inblk max-width"><span className="txt-bold"><span id="DOCDATAINFO_SOCL">LinkedIn</span><span>: </span></span><span id="FIELD_SOCL">{data.linkedin}</span><span dependency="SOCL" className="sprtr">|</span></span></span></span>)}
                            <span dependency="SOCL"></span>
                        </div>
                    </div></div></div></div></div></div></div></div></div><div data-testid="embd-92LqKqF1" id="CONTAINER_PARENT_1" className="parentContainer hidefirstpass"><div data-testid="embd-92PDkR61" id="CONTAINER_1" className="left-box"><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="39" className="sortable-item section-container SortableItem-sibling  data-SUMM"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">PROFESSIONAL SUMMARY<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename PROFESSIONAL SUMMARY " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn" id="FIELD_FRFM"><p>{data.summary}</p></div>
                    </div></div></div></div></div></div></div><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="39" className="sortable-item section-container SortableItem-sibling  data-EXPR"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section expr-sec SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">Work history<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Work history " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">{data.experiences && data.experiences.map((exp, index) => (
                    <div key={exp.id || index} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="39" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="39" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${exp.id}`} id={`PARAGRAPH_EXPR_${exp.id}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn">
                            <span className="paddedline" dependency="COMP|JCIT|JSTA|JCNT">
                                <span className="companyname txt-bold" id="FIELD_COMP">{exp.company}</span><span dependency="COMP"><span dependency="JCIT|JSTA|JCNT">. </span></span>
                                <span className="joblocation jobcity" id="FIELD_JCIT">{exp.location}</span>
                                <span className="joblocation jobstate" id="FIELD_JSTA"></span> <span className="joblocation jobcountry" id="FIELD_JCNT"></span>
                            </span>
                            <span className="paddedline txtItl" dependency="JTIT|JSTD|EDDT|TEXP">
                                <span className="dflex">
                                    <span>
                                        <span className="jobtitle" id="FIELD_JTIT">{exp.job_title}</span><span className="sprtr" dependency="JTIT+JSTD|EDDT"> | </span>
                                        <span className="jobdates" id="FIELD_JSTD" format="%m/%Y">{formatDate(exp.start_date)}</span><span dependency="JSTD+EDDT"> - </span><span className="jobdates" id="FIELD_EDDT" format="%m/%Y">{exp.currently_working ? t.current : formatDate(exp.end_date)}</span>
                                    </span>
                                </span>
                            </span>
                            <span className="jobline" id="FIELD_JDES"><ul>{exp.description && exp.description.split('\n').map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}</ul></span>
                        </div>
                    </div></div></div>
                    ))}</div></div></div></div></div></div><div data-testid="embd-92PDkR62" id="CONTAINER_2" className="right-box"><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="39" className="sortable-item section-container SortableItem-sibling  data-HILT"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">SKILLS<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename SKILLS " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn maincolumn">
                            <span className="paddedline" id="FIELD_SKC1"><ul>{skillsColumn1.map((skill, index) => (
                              <li key={skill.id || index}>{skill.name}</li>
                            ))}</ul></span>
                            <span className="paddedline" id="FIELD_SKC2"><ul>{skillsColumn2.map((skill, index) => (
                              <li key={skill.id || index}>{skill.name}</li>
                            ))}</ul></span>
                        </div>
                    </div></div></div></div></div></div></div><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="39" className="sortable-item section-container SortableItem-sibling  data-EDUC"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">EDUCATION<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename EDUCATION " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">{data.educations && data.educations.map((edu, index) => (
                    <div key={edu.id || index} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="39" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="39" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${edu.id}`} id={`PARAGRAPH_EDUC_${edu.id}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn">
                            <span className="paddedline" dependency="SCHO">
                                <span className="companyname txt-bold" id="FIELD_SCHO">{edu.institution}</span>
                            </span>
                            <span className="paddedline" dependency="SCIT|SSTA|SCNT">
                                <span className="joblocation jobcity" id="FIELD_SCIT">{edu.location}</span>
                                <span className="joblocation jobstate" id="FIELD_SSTA"></span> <span className="joblocation jobcountry" id="FIELD_SCNT"></span>
                            </span>
                            <span className="paddedline" dependency="GRYR|GRST|GRED|GRIP">
                                <span id="FIELD_GRST" format="%m/%Y">{formatDate(edu.start_date)}</span>
                                <span> - </span>
                                <span id="FIELD_GRED" format="%m/%Y">{edu.currently_studying ? t.current : formatDate(edu.end_date)}</span>
                            </span>
                            <span className="paddedline degreeGap" dependency="DGRE|STUY|GRHN|GRPA">
                                <span className="degree txt-bold" id="FIELD_DGRE">{edu.degree || ''}</span><span dependency="DGRE+STUY">{edu.degree && edu.field_of_study ? ': ' : ''}</span>
                                <span id="FIELD_STUY">{edu.field_of_study}</span>
                                <span id="FIELD_GRHN"></span>
                                <span id="FIELD_GRPA"></span>
                            </span>
                            <span id="FIELD_FRFM"></span>
                        </div>
                    </div></div></div>
                    ))}</div></div></div></div><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="39" className="sortable-item section-container SortableItem-sibling  data-LNGG"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG88bc36a1-247b-b72f-7918-a79948b8fc80" className="section lang-sec infobarsec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG"><div data-testid="embd-88uQIHR-LNGG" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_LNGG">Languages<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Languages " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-LNGG" className=""><div data-testid="embd-87S8HNi88bc36a1-247b-b72f-7918-a79948b8fc80" id="CONTAINER_88bc36a1-247b-b72f-7918-a79948b8fc80" className="sortableInner">{data.languages && data.languages.map((lang, index) => {
                      const level = lang.level || 3;
                      const widthPercent = (level / 5) * 100;
                      const proficiencyText = lang.proficiency ? (t[lang.proficiency as keyof typeof t] || lang.proficiency) : "";
                      return (
                        <div key={lang.id || index} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="39" className={`sortable-item paragraph-container SortableItem-sibling`}><button data-testid="embd-87gfxIF-LNGG" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="39" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${lang.id}`} id={`PARAGRAPH_LNGG_${lang.id}`} className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn infobarpara">
                            <div className="field">
                                <span className="txt-bold" id="FIELD_FRFM">{lang.name}</span><span className="txt-bold colon" dependency="FRFM">: </span>
                                <span className="flt-right" id="FIELD_RATG"></span>
                            </div>
                            <div className="rating-bar" dependency="RATV">
                                <div className="inner-rating" id="FIELD_RATV" type="width" style={{ width: `${widthPercent}%` }}></div>
                            </div>
                            <div className="field field-ratt">
                                <span id="FIELD_RATT">{proficiencyText}</span>
                            </div>
                            <div className="field">
                                <span id="FIELD_ADIF"></span>
                            </div>
                        </div>
                    </div></div></div>
                      );
                    })}</div></div></div></div></div></div></div></div></div><div></div></div></div>
    </>
  );
}
