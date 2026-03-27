/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations, formatDate } from "@/lib/translations";

const defaultTranslations = translations.en;

export default function TemplateMlu6({
  data = sampleData,
  translations: t = defaultTranslations,
  language = "en",
  colorHex = "#4a4a4a",
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

  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-mlu6 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        /*START content disc style for LI*/
        .skn-mlu6 ul,.skn-mlu6 li{list-style:none;margin:0;padding:0}
        .skn-mlu6 ul li{position:relative;margin:0px;padding-left:8px}
        .skn-mlu6 ul li:before{content:'\\2022';font-size:9px;position:absolute;left:0;top:0}
        .skn-mlu6 .jobline ul,.skn-mlu6 .education .field ul{margin-top:10px}
        .skn-mlu6 .adnlLnks ul li:before{content:''}
        /*END content disc style for LI*/

        .skn-mlu6 .clear{clear:both;height:0}
        .skn-mlu6 .txtBold{font-weight:bold}
        .skn-mlu6 .txtItl{font-style:italic}
        .skn-mlu6 .paddedline{display:block}
        .skn-mlu6 .fltRight{float:right}

        .skn-mlu6{color:#242424;line-height:16px;font-variant-ligatures:none;min-height:792px}
        .skn-mlu6 table.skills,.skn-mlu6 .table_wrapper{width:100%;margin-top:0;word-break:break-all}
        .skn-mlu6 table.skills th,.skn-mlu6 table.skills td{width:20%;text-align:center}
        .skn-mlu6 table.skills .skillname,.skn-mlu6 table.skills .skillrating{text-align:left;width:35%}
        .skn-mlu6 table.skills .skillrating{width:20%}
        .skn-mlu6 table.skills .skillyears,.skn-mlu6 table.skills .skilllast{width:19%}
        .skn-mlu6 table.skills .pad1{width:5%}
        .skn-mlu6 table.skills .pad2,.skn-mlu6 table.skills .pad3{width:1%}
        .skn-mlu6 .name{color:#4a4a4a;font-weight:bold;padding:0 0 10px 0;text-align:left;position:relative;word-wrap:break-word}
        .skn-mlu6 .resumeTitle{color:#4a4a4a;font-weight:bold}
        .skn-mlu6 .address .singlecolumn,.skn-mlu6 .additional_lnk .singlecolumn{color:#3b3b3b;margin-left:0!important}
        .skn-mlu6 .parentContainer{display:table;table-layout:fixed;width:100%;min-height:inherit}
        .skn-mlu6 .address .singlecolumn{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-mlu6 .address .details-left{flex-grow:1;width:47%}
        .skn-mlu6 .address .details-right{width:47%;padding-left:10px}

        /* Common style for left and right box */
        .skn-mlu6 .left-box{padding:25px;display:table-cell;vertical-align:top;letter-spacing:0.2px}
        .skn-mlu6 .right-box .section[id^="SECTION_PICT"] + .section{padding-top:20px!important}
        .skn-mlu6 .right-box{background-color:${colorHex};display:table-cell;overflow:hidden;background-size:100%;color:#fff;padding:25px}
        .skn-mlu6 .right-box .section{padding-left:10px;padding-right:10px}
        .skn-mlu6 .right-box .section:not(:empty){border-bottom:1px solid #9b9b9b;margin-bottom:10px}
        .skn-mlu6 .right-box .section:first-child,.skn-mlu6 .left-box .section:first-child{padding-top:0px}
        .skn-mlu6 .right-box .section[id^="SECTION_PICT"]{padding-top:0;padding-bottom:0!important;margin-bottom:25px;border:none;text-align:center;position:relative}
        .skn-mlu6 .right-box .section:first-child .paragraph{padding:0;display:block}
        .skn-mlu6 .right-box .section:last-of-type{border:none}
        .skn-mlu6 .right-box .sortable-item .section{border-bottom:1px solid #9b9b9b }
        .skn-mlu6 .right-box .sortable-item:last-child .section,.skn-mlu6 .right-box .sortable-item:first-child .section{border-bottom:none }

        .skn-mlu6 .right-box .heading,.skn-mlu6 .left-box .paragraph,.skn-mlu6 .adnlLnks ul li{padding:0!important}

        /* PRFL */
        .skn-mlu6 .prflPic{width:auto!important}
        .skn-mlu6 .prflPic img{width:130px;height:168px;object-fit:cover}

        /*Photo Layout styles*/
        .skn-mlu6.pict-pcsh-circle .paragraph .prflPic img{border-radius:50%;box-sizing:border-box;border:1px solid #fff}
        .skn-mlu6.pict-pcsh-square .paragraph .prflPic img{border-radius:unset;box-sizing:border-box;border:1px solid #fff}
        .skn-mlu6.pict-pcsh-bottomleft .paragraph .prflPic img{border-radius:50%;border-bottom-left-radius:8px;box-sizing:border-box;border:1px solid #fff}
        .skn-mlu6.pict-pcsh-bottomright .paragraph .prflPic img{border-radius:50%;border-bottom-right-radius:8px;box-sizing:border-box;border:1px solid #fff}
        .skn-mlu6.pict-pcsh-radius .paragraph .prflPic  img{border-radius:10px;box-sizing:border-box;border:1px solid #fff}

        /* Heading */
        .skn-mlu6 .heading{font-weight:bold;line-height:15px;margin-bottom:10px;text-transform:uppercase}
        .skn-mlu6 .sectiontitle{word-wrap:break-word}
        .skn-mlu6 .left-box .heading{letter-spacing:0;margin-top:15px}
        .skn-mlu6 .jobdates{font-size:8px;font-style:italic}

        /* section */
        .skn-mlu6 .parentContainer{display:table;width:100%}
        .skn-mlu6 .firstsection,.skn-mlu6 .SECTION_CNTC,.skn-mlu6 .additional_lnk{padding-top:0!important}
        .skn-mlu6 .section:empty{display:none}

        .skn-mlu6 .septr:before{content:"|";font-size:9px;vertical-align:top;padding-left:2px;padding-right:2px}
        .skn-mlu6 .education .joblocation{font-style:italic}
        .skn-mlu6 .right-box .section[id^="SECTION_PICT"]:after{display:none}
        .skn-mlu6 .right-box .section:after{content:'';display:block}

		/*Signature*/
		.skn-mlu6 .sign .field_sign{font-size:7px;color:#8a8a8a}
        .skn-mlu6 .txtleft + .field_sign{text-align:left}
        .skn-mlu6 .txtcenter + .field_sign{text-align:center}
        .skn-mlu6 .txtright + .field_sign{text-align:right}
        .skn-mlu6 .signPic span:first-child{padding-right:6px}
        .skn-mlu6 .signPic img{max-width:100%}

		/*Infographic*/
        .skn-mlu6 .langSec .field *,.skn-mlu6 .infoSec .field *{display:inline}
		.skn-mlu6 .left-box .langSec .firstparagraph .field{display:inline}
		.skn-mlu6 .left-box .langSec .firstparagraph .field.paddedline,.skn-mlu6 .left-box .langSec.hide-bar .firstparagraph .field,.skn-mlu6 .left-box .langSec.hide-only-bar .firstparagraph .field{display:block}
        .skn-mlu6 .langSec .paragraph,.skn-mlu6 .infoSec .paragraph{clear:both;margin-top:0}
        .skn-mlu6 .ratingBar{background:#d5d6d6;width:100%;clear:both;page-break-inside:avoid}
        .skn-mlu6 .innerRating{background-color:#4a4a4a;height:4px;width:60%}
        .skn-mlu6 .right-box .ratingBar{position:relative}
        .skn-mlu6 .right-box .innerRating{background-color:#d5d6d6;position:relative;z-index:2}
        .skn-mlu6 .right-box .ratingBar:before{content:'';width:100%;height:4px;position:absolute;z-index:1;opacity:.5;background:#4a4a4a}

        .skn-mlu6 .hide-bar .ratingBar,.skn-mlu6 .hide-only-bar .ratingBar,.skn-mlu6 .hide-bar .field-ratt,.skn-mlu6 .hide-colon .colon{display:none}

        /* GRYR */
        .skn-mlu6 .displayNoneThisField{display:none}/* Keep this class always at bottom */

        /* Only for firefox */
        @-moz-document url-prefix(){.skn-mlu6 .parentContainer{height:1px}}

        /*PICT support*/
        .skn-mlu6.pict-pcpf-none .pict-sec{display:none}
        .skn-mlu6.doc-pcpf-none .right-box  .pcpf-none + .section{padding-top:0 !important;}

        /* Duration tag */
        .skn-mlu6 .totl-expr{display:inline-block;float:right; padding:0 6px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap;margin-left:5px;background-color:#4a4a4a}
        .skn-mlu6.texp-curved .totl-expr{border-radius:10px}
        .skn-mlu6 .dflex{display:flex;justify-content:space-between}
        .skn-mlu6 .right-box .totl-expr{display: none}



        .skn-mlu6,.skn-mlu6 table{line-height:15px}
        .skn-mlu6.pagesize{width:595px}
        .skn-mlu6.fontsize,.skn-mlu6 ul li:before,.skn-mlu6 .septr:before{font-size:11px}
        .skn-mlu6.fontface{font-family:Arial}
        .skn-mlu6 .section{padding-top:20px}
        .skn-mlu6 .right-box .section{padding-top:10px}
        .skn-mlu6 .right-box .section:after{padding-bottom:10px}
        .skn-mlu6 .firstparagraph{margin-top:0!important}
        .skn-mlu6 .paragraph{margin-top:10px}
        .skn-mlu6 .left-box .singlecolumn,.skn-mlu6 .left-box .maincolumn{margin-left:0px;word-wrap:break-word}

        .skn-mlu6 table.skills td{padding-top:5px}
        .skn-mlu6 .name{font-size:34px;line-height:32px}
        .skn-mlu6 .resumeTitle{font-size:17px;line-height:17px;margin:0 0 10px 0}
        .skn-mlu6 .address2{font-size:11px;line-height:15px}
        .skn-mlu6 .heading{font-size:13px;line-height:17px}
        .skn-mlu6 .right-box{width:174px}
        .skn-mlu6 .jobdates{font-size:10px}
        .skn-mlu6 .left-box .firstsection + .additional_lnk + .section,.skn-mlu6 .left-box .firstsection + .section:not(.additional_lnk),.skn-mlu6 .left-box .additional_lnk + .section{padding-top:30px}
        .skn-mlu6 .right-box .wrapper{background:${colorHex}} /*For finalize page*/
        .skn-mlu6 .prflPic img{width:130px;height:168px}
		.skn-mlu6 .right-box > .sortable-item .section,
        .skn-mlu6 .right-box > .sortable-item .paragraph,.skn-mlu6 .left-box .innerRating{background:#4a4a4a} /*For finalize page*/
		.skn-mlu6 .totl-expr{font-size:8px;line-height:12px}

		/*Infographic*/
        .skn-mlu6 .langSec .paragraph,.skn-mlu6 .infoSec .paragraph{margin-top:5px}
        .skn-mlu6 .langSec .firstparagraph,.skn-mlu6 .infoSec .firstparagraph{padding-top:0}

        /*Photo Layout styles*/
        .skn-mlu6.pict-pcsh-circle .paragraph .prflPic img{width:154px;height:154px}
        .skn-mlu6.pict-pcsh-square .paragraph .prflPic img{width:154px;height:154px}
        .skn-mlu6.pict-pcsh-bottomleft .paragraph .prflPic img{height:154px;width:154px}
        .skn-mlu6.pict-pcsh-bottomright .paragraph .prflPic img{height:154px;width:154px}
        .skn-mlu6.pict-pcsh-radius .paragraph .prflPic  img{height:154px;width:154px}
    `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-mlu6 MLU6 MUK texp-none pict-pcpf-purl " docskinwidth="598" ><div data-testid="embd-92LqKqF0" id="CONTAINER_PARENT_0" className="parentContainer">

{/* Left Box */}
<div data-testid="embd-92PDkR60" id="CONTAINER_0" className="left-box">

{/* Name Section */}
<div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="24" className="sortable-item section-container SortableItem-sibling data-NAME"><div data-testid="embd-88MByq6-NAME" id="SECTION_NAME1a1a32ad-f01c-4377-b2f6-1a65f9bf6cb8" className="section notdraggable SECTION_NAME firstsection" data-section-cd="NAME"><div data-testid="embd-88uQIHR-NAME" className="doc-item"><div data-testid="embd-88aw0Ce-NAME" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-44bc0bd4-6d0c-480d-8f32-8d70df1621d0" id="PARAGRAPH_NAME_44bc0bd4-6d0c-480d-8f32-8d70df1621d0" className="paragraph PARAGRAPH_NAME firstparagraph"><div data-testid="embd-78blCsH">
                        <div className="name">
                            <span id="FIELD_FNAM" dependency="FNAM">{data.first_name}</span>
                            {data.first_name && data.last_name && ' '}
                            <span id="FIELD_LNAM" dependency="LNAM">{data.last_name}</span>
                        </div>

                    </div></div></div></div></div></div></div>

{/* Contact Section */}
<div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="24" className="sortable-item section-container SortableItem-sibling data-CNTC"><div data-testid="embd-88MByq6-CNTC" id="SECTION_CNTCd3d40c22-1b29-401e-a809-9cb7e72d6fdc" className="section SECTION_CNTC notdraggable" data-section-cd="CNTC"><div data-testid="embd-88uQIHR-CNTC" className="doc-item"><div data-testid="embd-88aw0Ce-CNTC" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-3912838f-29f6-467c-8297-bf45ee1ff720" id="PARAGRAPH_CNTC_3912838f-29f6-467c-8297-bf45ee1ff720" className="paragraph PARAGRAPH_CNTC firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="address">
                            <div className="singlecolumn">
                                <div className="details-left" dependency="HPHN|CPHN|EMAI|STRT|CITY|STAT|ZIPC|ADDR|WEB1">
                                    {data.phone && (
                                    <div dependency="HPHN">
                                        <span id="FIELD_HPHN">{data.phone}</span>
                                    </div>
                                    )}

                                    {data.email && (
                                    <div dependency="EMAI">
                                        <span id="FIELD_EMAI">{data.email}</span>
                                    </div>
                                    )}
                                    {(data.street_address || data.city || data.postcode) && (
                                    <div dependency="STRT|CITY|STAT|ZIPC|ADDR">
                                        {data.street_address && <><span id="FIELD_STRT">{data.street_address}</span><span dependency="STRT+CITY|STAT">, </span></>}
                                        {data.city && <span id="FIELD_CITY">{data.city}</span>}
                                        {data.postcode && <> <span id="FIELD_ZIPC">{data.postcode}</span></>}
                                    </div>
                                    )}

                                </div>
                                {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                                <div className="details-right" dependency="DOB1|NTLY|DRIV|MSTA|SOCL|PRTF|VDCV|WEB1">

                                    {data.nationality && (
                                    <div dependency="NTLY">
                                        <span className="txtBold"><span className="xslt_static_change">Nationality</span><span>: </span></span><span id="FIELD_NTLY">{data.nationality}</span>
                                    </div>
                                    )}
                                    {data.driving_license && (
                                    <div dependency="DRIV">
                                        <span className="txtBold"><span className="xslt_static_change">Permit</span><span>: </span></span><span id="FIELD_DRIV">{data.driving_license}</span>
                                    </div>
                                    )}

                                    {data.website && (
                                    <div dependency="WEB1">
                                        <span className="txtBold"><span className="xslt_static_change">Web</span><span>: </span></span><span id="FIELD_WEB1">{data.website}</span>
                                    </div>
                                    )}

                                    {data.linkedin && (
                                    <div dependency="SOCL" id="CATEGORY_SOCIAL_SOCL">
                                        <span className="txtBold"><span id="DOCDATAINFO_SOCL">LinkedIn</span><span>: </span></span>
                                        <span className="brk-all" id="FIELD_SOCL">{data.linkedin}</span>
                                    </div>
                                    )}
                                </div>
                                )}
                            </div>
                        </div>
                    </div></div></div></div></div></div></div>

{/* Professional Summary Section */}
{data.summary && (
<div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="24" className="sortable-item section-container SortableItem-sibling data-SUMM"><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">{t.summary || 'PROFESSIONAL SUMMARY'}</div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn" id="FIELD_FRFM"><p>{data.summary}</p></div>
                    </div></div></div></div></div></div></div>
)}

{/* Work Experience Section */}
{data.experiences && data.experiences.length > 0 && (
<div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="24" className="sortable-item section-container SortableItem-sibling data-EXPR"><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">{t.experience || 'Work history'}</div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">
  {data.experiences.map((exp, index) => (
    <div key={exp.id || index} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="24" className="sortable-item paragraph-container SortableItem-sibling">
      <div data-testid={`embd-79HRa2m-${exp.id}`} id={`PARAGRAPH_EXPR_${exp.id}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}>
        <div data-testid="embd-78FzR29" className="clearfix doc-item">
          <div className="singlecolumn">
            {(exp.start_date || exp.end_date || exp.currently_working) && (
              <span className="paddedline" dependency="JSTD|EDDT|TEXP">
                <span className="dflex">
                  <span>
                    {exp.start_date && <span className="jobdates" id="FIELD_JSTD">{formatDate(exp.start_date, language)}</span>}
                    {exp.start_date && (exp.end_date || exp.currently_working) && <span dependency="JSTD+EDDT"> - </span>}
                    <span className="jobdates" id="FIELD_EDDT">{exp.currently_working ? (t.present || 'Current') : (exp.end_date ? formatDate(exp.end_date, language) : '')}</span>
                    <br dependency="JSTD|EDDT" />
                  </span>
                </span>
              </span>
            )}
            {(exp.company || exp.location) && (
              <span className="paddedline locationGap" dependency="COMP|JSTA|JCIT|JCNT">
                {exp.company && <span className="companyname txtBold" id="FIELD_COMP">{exp.company}</span>}
                {exp.company && exp.location && <span dependency="COMP"><span dependency="JCIT|JSTA|JCNT"> | </span></span>}
                {exp.location && <span className="jobcity" id="FIELD_JCIT">{exp.location}</span>}
              </span>
            )}
            {exp.job_title && (
              <span className="paddedline" dependency="JTIT">
                <span className="jobtitle txtCaps" id="FIELD_JTIT">{exp.job_title}</span>
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
</div></div></div></div></div>
)}

{/* Skills Section */}
{data.skills && data.skills.length > 0 && (
<div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="24" className="sortable-item section-container SortableItem-sibling data-HILT"><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">{t.skills || 'SKILLS'}</div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn maincolumn">
                            <span className="paddedline" id="FIELD_SKC1">
                              <ul>
                                {data.skills.map((skill, i) => (
                                  <li key={skill.id || i}>{skill.name}</li>
                                ))}
                              </ul>
                            </span>
                        </div>
                    </div></div></div></div></div></div></div>
)}

</div>

{/* Right Box */}
<div data-testid="embd-92PDkR61" id="CONTAINER_1" className="right-box">

{/* Photo Section */}
{data.photo_url && (
<div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="24" className="sortable-item section-container SortableItem-sibling data-PICT"><div data-testid="embd-88MByq6-PICT" id="SECTION_PICTa2e3abc4-fc5a-4d5c-80fb-ac187cd5be60" className="section notdraggable pict-sec SECTION_PICT firstsection" data-section-cd="PICT"><div data-testid="embd-88uQIHR-PICT" className="doc-item"><div data-testid="embd-88aw0Ce-PICT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-389ae0dd-26d7-4892-a4b9-d1e4f0b10399" id="PARAGRAPH_PICT_389ae0dd-26d7-4892-a4b9-d1e4f0b10399" className="paragraph PARAGRAPH_PICT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="prflPic">
                            <div id="FIELD_PURL"><img data-testid="embd-78pIea6" className="chk" src={data.photo_url} alt="Profile" /> </div>
                        </div>
                        <div className="clear"></div>
                    </div></div></div></div></div></div></div>
)}

{/* Education Section */}
{data.educations && data.educations.length > 0 && (
<div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="24" className="sortable-item section-container SortableItem-sibling data-EDUC"><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section education SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">{t.education || 'EDUCATION'}</div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">
  {data.educations.map((edu, index) => (
    <div key={edu.id || index} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="24" className="sortable-item paragraph-container SortableItem-sibling">
      <div data-testid={`embd-79HRa2m-${edu.id}`} id={`PARAGRAPH_EDUC_${edu.id}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}>
        <div data-testid="embd-78FzR29" className="clearfix doc-item">
          <div className="singlecolumn">
            {(edu.start_date || edu.end_date) && (
              <div className="paddedline" dependency="GRYR|GRST|GRED|GRIP">
                <span className="jobdates txtItl">
                  {edu.start_date && <span id="FIELD_GRST">{formatDate(edu.start_date, language)}</span>}
                  {edu.start_date && edu.end_date && <span dependency="GRST+GRED|GRIP"> - </span>}
                  {edu.end_date && <span id="FIELD_GRED">{formatDate(edu.end_date, language)}</span>}
                </span>
              </div>
            )}
            {(edu.institution || edu.location) && (
              <div className="paddedline" dependency="SCIT|SSTA|SCHO|SCNT">
                {edu.institution && <span className="companyname txtBold" id="FIELD_SCHO">{edu.institution}</span>}
                {edu.institution && edu.location && (
                  <span dependency="SCHO">
                    <span dependency="SSTA|SCIT|SCNT" className="septr"></span>
                  </span>
                )}
                {edu.location && <span className="joblocation jobcity" id="FIELD_SCIT">{edu.location}</span>}
              </div>
            )}
            {(edu.degree || edu.field_of_study) && (
              <div className="paddedline degreeGap" dependency="DGRE|STUY|GRHN|GRPA">
                {edu.degree && <span className="degree" id="FIELD_DGRE">{edu.degree}</span>}
                {edu.degree && edu.field_of_study && <span dependency="DGRE+STUY">: </span>}
                {edu.field_of_study && <span className="programline" id="FIELD_STUY">{edu.field_of_study}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div></div></div></div></div>
)}

{/* Languages Section */}
{data.languages && data.languages.length > 0 && (
<div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="24" className="sortable-item section-container SortableItem-sibling data-LNGG">
  <div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG88bc36a1-247b-b72f-7918-a79948b8fc80" className="section langSec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
    <div data-testid="embd-88uQIHR-LNGG" className="doc-item">
      <div data-testid="embd-88ciQTv" className="heading">
        <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_LNGG">{t.languages || 'LANGUAGES'}</div>
      </div>
      <div data-testid="embd-88aw0Ce-LNGG" className="">
        <div data-testid="embd-87S8HNi88bc36a1-247b-b72f-7918-a79948b8fc80" id="CONTAINER_88bc36a1-247b-b72f-7918-a79948b8fc80" className="sortableInner">
          {data.languages.map((lang, index) => (
            <div key={lang.id || index} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="24" className="sortable-item paragraph-container SortableItem-sibling">
              <div data-testid={`embd-79HRa2m-${lang.id}`} id={`PARAGRAPH_LNGG_${lang.id}`} className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}>
                <div data-testid="embd-78FzR29" className="clearfix doc-item">
                  <div className="singlecolumn">
                    <div className="field">
                      <span className="txtBold" id="FIELD_FRFM">{lang.name}</span>
                      <span className="colon" dependency="FRFM">:</span>
                      <span className="fltRight" id="FIELD_RATG"></span>
                    </div>
                    <div className="ratingBar" dependency="RATV">
                      <div className="innerRating" id="FIELD_RATV" style={{ width: getLevelWidth(lang.level) }}></div>
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
</div>
)}

</div>

</div></div><div></div></div></div>
    </>
  );
}
