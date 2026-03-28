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

export default function TemplateMli3({
    data = sampleData,
    translations: t = translations.en,
    language = "en",
    colorHex = "#009bcc",
}: Partial<DynamicTemplateProps> = {}) {
    return (
        <>
            <style>{`

        @import url('https://fonts.googleapis.com/css?family=Syncopate:400');
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-mli3 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        /*START content disc style for LI*/
        .skn-mli3 ul,.skn-mli3 li{list-style:none;margin:0 0 0 8px;padding:0}
        .skn-mli3 ul li{position:relative;margin:0px;margin-bottom:5px}
        .skn-mli3 ul li:before{content:'\\2022';position:absolute;left:-8px;top:0}
        /*END content disc style for LI*/

        .skn-mli3 .txtBold{font-weight:bold}
        .skn-mli3 .dispBlock{display:block}
        .skn-mli3 .txtItl{font-style:italic}
        .skn-mli3 .fltRight{float:right}
        .skn-mli3 .pb5{padding-bottom:5px}

        /* Duration tag */
        .skn-mli3 .totl-expr{display:inline-block;position: relative; padding:0 5px;color:#000;font-weight:700;vertical-align:top;text-wrap:nowrap;margin-left:5px}
        .skn-mli3 .totl-expr:before{content:"";width:100%;height:100%;position:absolute;left:0;top:0;opacity:.15;}
        .skn-mli3.texp-curved .totl-expr:before{border-radius:10px}
        .skn-mli3 .dflex{display:flex;justify-content:space-between}
        .skn-mli3 .left-box .totl-expr{display: none}

		.skn-mli3 .brk-all{word-break:break-all}

        /*Document*/
        .skn-mli3{color:#000;line-height:13px;min-height:792px;word-wrap:break-word}
        .skn-mli3 .name{font-family:"Syncopate";color:#000;font-weight:400;padding:0 0 12px 0;text-align:center;text-transform:uppercase}
        .skn-mli3 .resumeTitle{font-family:"Syncopate";color:#000;font-weight:400;text-align:center;text-transform:uppercase;letter-spacing:1px}
        

        /* common left-right container */
        .skn-mli3 .section{position:relative}
        .skn-mli3 .left-box, .skn-mli3 .right-box{box-sizing:content-box;position:relative;padding:25px 0;display:table-cell;vertical-align:top}
        .skn-mli3 .left-box{padding-right:20px}
        .skn-mli3 .right-box{padding-left:20px}
        .skn-mli3 .section:empty{display:none}

        /* Common Heading style */
        .skn-mli3 .heading{padding-bottom:5px}
        .skn-mli3 .sectiontitle{font-family:"Syncopate";text-transform:uppercase;color:#000;font-weight:400;letter-spacing:.5px}

        /* Top section */
        .skn-mli3 .topsection{position:relative;padding:40px 50px 10px}
        .skn-mli3 .topsection .section{border:none;margin-bottom:0;padding:0}
        .skn-mli3 .topsection .top-box{display:block;width:100%}
        .skn-mli3 .address,.skn-mli3 .adnlLnks{color:#000}

        /*middlesection*/
        .skn-mli3 .parentContainer{height:696px}
        .skn-mli3 .middlesection,.skn-mli3 .parentContainer{position:relative;display: table;table-layout: fixed;width:100%}
        .skn-mli3 .middlesection .left-box:before,
        .skn-mli3 .middlesection .right-box:before{background:#009bcc;content:'';height:100%;width:100%;position:absolute;top:0;left:0;opacity:.15}
        .skn-mli3 .middlesection .left-box:after,
        .skn-mli3 .middlesection .right-box:after{content:'';height:3px;background:#000;position:absolute;top:0}
        .skn-mli3 .middlesection .left-box:after{left:0;width:100%;margin-left:50px}
        .skn-mli3 .middlesection .right-box:after{right:0;width:100%;margin-right:50px}
        .skn-mli3 .middlesection .left-box,
        .skn-mli3 .parentContainer .left-box{padding-left:50px}
        .skn-mli3 .middlesection .right-box,
        .skn-mli3 .parentContainer .right-box{padding-right:50px}
        .skn-mli3 .middlesection .left-box .section,
        .skn-mli3 .middlesection .right-box .section{margin:0px}

        /*parentContainer*/
        .skn-mli3 .parentContainer .left-box{padding-top:25px;position:relative}
        .skn-mli3 .parentContainer .right-box .section{border-color:#4a4a4a}
        .skn-mli3 .parentContainer .singlecolumn,.skn-mli3 .parentContainer .maincolumn{color:#46464e}

        /* CNTC/ALNK */
        .skn-mli3 .SECTION_CNTC,.skn-mli3 .SECTION_ALNK{margin:0!important}
        .skn-mli3 div.SECTION_ALNK{clear:both;padding-top:0px}
        .skn-mli3 .adnlLnks ul{margin-left:0}
        .skn-mli3 .adnlLnks li{padding:0 0 5px 0;margin:0}
        .skn-mli3 .adnlLnks li:last-child{padding:0}
        .skn-mli3 .adnlLnks li:before{content:''}

        /* SVG Icon Style */
        .skn-mli3 .iconRow{clear:both;display:table;margin-bottom:10px}
        .skn-mli3 .iconRow:last-child{padding-bottom:0}
        .skn-mli3 .iconSvg{width:16px;height:15px;display:table-cell;text-align:center;margin-top:0}
        .skn-mli3 .icoTxt{display:table-cell;padding-left:10px;vertical-align:top}

        /*Infographic*/
        .skn-mli3 .langSec .field *,.skn-mli3 .infoSec .field *{display:inline}
		.skn-mli3 .right-box .langSec .firstparagraph .field{display:inline}
        .skn-mli3 .langSec .paragraph,.skn-mli3 .infoSec .paragraph{clear:both;margin-top:0;page-break-inside:avoid}
        .skn-mli3 .ratingBar{background:#d5d6d6;width:100%;clear:both;margin-top:3px}
        .skn-mli3 .innerRating{background-color:#576d7b;height:4px;width:60%}
        .skn-mli3 .bottomsection{height:40px;background:#009bcc;opacity:.15}
        .skn-mli3 .compfont{color:#000}

        .skn-mli3 .field-ratt+.field{display:block!important}
        .skn-mli3 .hide-bar .ratingBar,.skn-mli3 .hide-only-bar .ratingBar,.skn-mli3 .hide-bar .field-ratt{display:none}

        /*MFR address*/
        .skn-mli3 .zipsuffix,.skn-mli3.MFR .zipprefix,.skn-mli3.MES .zipprefix,.skn-mli3 .right-box .langSec.hide-bar .firstparagraph .field,.skn-mli3 .right-box .langSec.hide-only-bar .firstparagraph .field{display:block}
        .skn-mli3 .zipprefix,.skn-mli3.MFR .zipsuffix,.skn-mli3.MES .zipsuffix{display:none}
		
		/*MUK colon*/
		.skn-mli3 .mukcolon{display:none}
		.skn-mli3.MUK .mukcolon{display:inline!important}
		.skn-mli3.MUK .colon,.skn-mli3 .hide-colon .lang-colon{display:none!important}

		/*Builder fix*/
        .skn-mli3 .parentContainer .right-box .sortable-item:first-child .section{border:none;padding-top:0}
        .skn-mli3 .parentContainer .right-box .sortable-item:first-child .summary .heading{display:none}

        /* GRYR */
		.skn-mli3 .displayNoneThisField{display:none}/* Keep this class always at bottom */

        .skn-mli3.for-iron-pdf .bottomsection{visibility:hidden}
        .skn-mli3.for-iron-pdf .parentContainer{min-height:auto!important;height:auto!important}
        .skn-mli3.for-iron-pdf .parentContainer .left-box,.skn-mli3.for-iron-pdf .parentContainer .right-box{padding-bottom:0}
        .skn-mli3.for-iron-pdf .topsection{padding-top:15px}
    

        .skn-mli3,.skn-mli3 table{line-height:13px}
        .skn-mli3.pagesize{width:595px}
        .skn-mli3.fontsize{font-size:10px}
        .skn-mli3.fontface{font-family:Times New Roman}
        .skn-mli3 .section{margin-bottom:25px}
        .skn-mli3 .SECTION_ALNK + .section{margin-top:25px}
        .skn-mli3 .firstparagraph{margin-top:0!important}
        .skn-mli3 .paragraph{margin-top:15px}
        .skn-mli3 .parentContainer{min-height:696px}
        .skn-mli3 .middlesection .left-box, .skn-mli3 .parentContainer .left-box{padding-left:50px}
        .skn-mli3 .middlesection .right-box, .skn-mli3 .parentContainer .right-box{padding-right:50px}
        .skn-mli3 .middlesection .left-box:after{margin-left:50px}
        .skn-mli3 .middlesection .right-box:after{margin-right:50px}
        .skn-mli3 .parentContainer .right-box .singlecolumn,.skn-mli3 .parentContainer .right-box .maincolumn{margin-left:0px}
        .skn-mli3 .name{font-size:24px;line-height:28px}
        .skn-mli3 .resumeTitle{font-size:14px;line-height:14px}
        .skn-mli3 .sectiontitle{font-size:14px;line-height:17px}
        .skn-mli3 .left-box{width:169px}
        .skn-mli3 .middlesection .left-box:before,.skn-mli3 .middlesection .right-box:before,.skn-mli3 .bottomsection,.skn-mli3 .innerRating{background:#009bcc}
        .skn-mli3 ul li{padding-left:0px}
        .skn-mli3 .totl-expr{font-size:8px;line-height:12px}
        .skn-mli3 .totl-expr:before{background-color:#009bcc}

        /*Infographic*/
        .skn-mli3 .langSec .paragraph,.skn-mli3 .infoSec .paragraph{padding-top:5px}
        .skn-mli3 .langSec .firstparagraph,.skn-mli3 .infoSec .firstparagraph{padding-top:0}

        .skn-mli3.for-pdf.texp-curved .parentContainer .right-box .expr-sec .paragraph .singlecolumn .dispBlock .dflex{display:block;}
        .skn-mli3.for-pdf.texp-curved .parentContainer .right-box .expr-sec .paragraph .singlecolumn .dispBlock .dflex > span:first-child{display:inline-block;width:72%}
        .skn-mli3.for-pdf.texp-curved .parentContainer .right-box .expr-sec .paragraph .singlecolumn .dispBlock .dflex > span:last-child{display:inline-block;float:right;width:28%;text-align:right;}

        .skn-mli3.for-pdf.texp-rectangle .parentContainer .right-box .expr-sec .paragraph .singlecolumn .dispBlock .dflex{display:block;}
        .skn-mli3.for-pdf.texp-rectangle .parentContainer .right-box .expr-sec .paragraph .singlecolumn .dispBlock .dflex > span:first-child{display:inline-block;width:72%}
        .skn-mli3.for-pdf.texp-rectangle .parentContainer .right-box .expr-sec .paragraph .singlecolumn .dispBlock .dflex > span:last-child{display:inline-block;float:right;width:28%;text-align:right;}


        @media screen and (min-width:0\\0) {
            .skn-mli3 .middlesection{display:flex}
            .skn-mli3 .middlesection .left-box{width:224px}
            .skn-mli3 .middlesection .right-box{width:calc(100% - 278px)}
            .skn-mli3 .middlesection .left-box,.skn-mli3 .middlesection .right-box{display:inline;box-sizing:content-box}
            .skn-mli3 .middlesection .left-box{min-height:inherit}
        }

    `}</style>
            <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-mli3 MLI3 MUK pict-pcpf-purl texp-none expr-durt-none " docskinwidth="495" ><div data-testid="embd-92LqKqF0" id="CONTAINER_PARENT_0" className="topsection"><div data-testid="embd-92PDkR60" id="CONTAINER_0" className="top-box"><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="33" className="sortable-item section-container SortableItem-sibling  data-NAME"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-NAME" id="SECTION_NAME1a1a32ad-f01c-4377-b2f6-1a65f9bf6cb8" className="section notdraggable SECTION_NAME firstsection" data-section-cd="NAME"><div data-testid="embd-88uQIHR-NAME" className="doc-item"><div data-testid="embd-88aw0Ce-NAME" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-44bc0bd4-6d0c-480d-8f32-8d70df1621d0" id="PARAGRAPH_NAME_44bc0bd4-6d0c-480d-8f32-8d70df1621d0" className="paragraph PARAGRAPH_NAME firstparagraph"><div data-testid="embd-78blCsH">
                <div className="name" dependency="FNAM|LNAM">
                    <span id="FIELD_FNAM">{data.first_name}</span>
                    <span dependency="FNAM+LNAM"> </span>
                    <span id="FIELD_LNAM">{data.last_name}</span>
                </div>

            </div></div></div></div></div></div></div></div></div><div data-testid="embd-92LqKqF1" id="CONTAINER_PARENT_1" className="middlesection"><div data-testid="embd-92PDkR61" id="CONTAINER_1" className="left-box"><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="34" className="sortable-item section-container SortableItem-sibling  data-CNTC"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-CNTC" id="SECTION_CNTCd3d40c22-1b29-401e-a809-9cb7e72d6fdc" className="section SECTION_CNTC notdraggable has-title" data-section-cd="CNTC"><div data-testid="embd-88uQIHR-CNTC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_CNTC">{t.contact}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Contact " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-CNTC" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-3912838f-29f6-467c-8297-bf45ee1ff720" id="PARAGRAPH_CNTC_3912838f-29f6-467c-8297-bf45ee1ff720" className="paragraph PARAGRAPH_CNTC firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="address">
                    <div className="zipsuffix pb5" dependency="STRT|CITY|STAT|ZIPC|ADDR">
                        <span className="txtBold"><span className="xslt_static_change">Address</span><span className="mukcolon">: </span><span className="colon"> : </span></span>
                        <span id="FIELD_STRT">{data.address}</span><span dependency="STRT"><span dependency="CITY|STAT">, </span></span>
                        <span id="FIELD_CITY">{data.city}</span>
                        <span id="FIELD_STAT"></span>
                        <span id="FIELD_ZIPC">{data.postal_code}</span>
                        <span id="FIELD_ADDR"></span>
                    </div>


                    <div className="dispBlock pb5" dependency="HPHN|CPHN">
                        <span className="txtBold"><span className="xslt_static_change">Phone</span><span className="mukcolon">: </span><span className="colon"> : </span></span>
                        <span id="FIELD_HPHN">{data.phone}</span><span id="FIELD_CPHN"></span>
                    </div>
                    <div className="dispBlock pb5" dependency="EMAI">
                        <span className="txtBold"><span className="xslt_static_change">Email</span><span className="mukcolon">: </span><span className="colon"> : </span></span>
                        <span id="FIELD_EMAI">{data.email}</span>
                    </div>
                    {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                        <div className="address" dependency="DOB1|NTLY|DRIV|IDNV|MSTA|WEB1|SOCL|PRTF|VDCV">
                            {data.nationality && (
                                <span dependency="NTLY" className="dispBlock pb5">
                                    <span className="txtBold"><span className="xslt_static_change">Nationality</span><span>: </span></span><span id="FIELD_NTLY">{data.nationality}</span>
                                </span>
                            )}
                            {data.driving_license && (
                                <span dependency="DRIV" className="dispBlock pb5">
                                    <span className="txtBold"><span className="xslt_static_change">Permit</span><span>: </span></span><span id="FIELD_DRIV">{data.driving_license}</span>
                                </span>
                            )}
                            {data.website && (
                                <span dependency="WEB1" className="dispBlock pb5 brk-all">
                                    <span className="txtBold"><span className="xslt_static_change">Web</span><span>: </span></span><span id="FIELD_WEB1">{data.website}</span>
                                </span>
                            )}
                            {data.linkedin && (
                                <span dependency="SOCL" id="CATEGORY_SOCIAL_SOCL" className="dispBlock pb5 brk-all">
                                    <span className="txtBold"><span id="DOCDATAINFO_SOCL">LinkedIn</span><span>: </span></span>
                                    <span id="FIELD_SOCL">{data.linkedin}</span>
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div></div></div></div></div></div></div></div><div data-testid="embd-92PDkR62" id="CONTAINER_2" className="right-box"><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="34" className="sortable-item section-container SortableItem-sibling  data-SUMM"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section summary notdraggable SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">{t.professional_summary}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename PROFESSIONAL SUMMARY " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn" id="FIELD_FRFM" dangerouslySetInnerHTML={{ __html: data.summary }}></div>
            </div></div></div></div></div></div></div></div></div><div data-testid="embd-92LqKqF2" id="CONTAINER_PARENT_2" className="parentContainer"><div data-testid="embd-92PDkR63" id="CONTAINER_3" className="left-box last-box"><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="35" className="sortable-item section-container SortableItem-sibling  data-HILT"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">{t.skills}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename SKILLS " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn maincolumn">
                    <span id="FIELD_SKC1"><ul>{data.skills.map((skill) => (
                        <li key={skill.id}>{skill.name}</li>
                    ))}</ul></span>
                </div>
            </div></div></div></div></div></div></div></div><div data-testid="embd-92PDkR64" id="CONTAINER_4" className="right-box last-box"><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="35" className="sortable-item section-container SortableItem-sibling  data-EXPR"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section expr-sec SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">{t.work_history}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Work history " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">{data.experiences.map((exp, index) => (
                <div key={exp.id} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="35" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="35" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${exp.id}`} id={`PARAGRAPH_EXPR_${exp.id}`} className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                    <div className="singlecolumn">
                        <span className="dispBlock pb5 compfont" dependency="JTIT|JSTD|EDDT">
                            <span className="dflex">
                                <span>
                                    <span className="jobtitle txtCaps txtBold" id="FIELD_JTIT">{exp.title}</span><span className="txtBold" dependency="JTIT+JSTD|EDDT">, </span>
                                    <span className="jobdates" id="FIELD_JSTD">{formatDate(exp.start_date, language)}</span><span dependency="JSTD+EDDT">  to  </span>
                                    <span className="jobdates" id="FIELD_EDDT">{exp.is_current ? t.present : formatDate(exp.end_date, language)}</span><br dependency="JSTD|EDDT" />
                                </span>

                            </span>
                        </span>
                        <span className="dispBlock pb5 compfont locationGap" dependency="COMP|JSTA|JCIT|JCNT">
                            <span className="companyname txtBold txtItl" id="FIELD_COMP">{exp.company}</span><span dependency="COMP"><span dependency="JSTA|JCIT|JCNT"> - </span></span><span className="jobcity" id="FIELD_JCIT">{exp.city}</span>
                            <span className="jobstate" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span>
                        </span>
                        <span className="jobline" id="FIELD_JDES" dangerouslySetInnerHTML={{ __html: exp.description }}></span>
                    </div>
                </div></div></div>
            ))}</div></div></div></div></div><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="35" className="sortable-item section-container SortableItem-sibling  data-EDUC"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">{t.education}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename EDUCATION " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">{data.educations.map((edu, index) => (
                <div key={edu.id} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="35" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="35" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid={`embd-79HRa2m-${edu.id}`} id={`PARAGRAPH_EDUC_${edu.id}`} className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}><div data-testid="embd-78FzR29" className="clearfix doc-item">
                    <div className="singlecolumn">
                        <div>
                            <span className="dispBlock pb5 compfont" dependency="DGRE|STUY|GRYR|GRST|GRED|GRIP">
                                <span className="degree txtBold" id="FIELD_DGRE">{edu.degree}</span><span dependency="DGRE"><span dependency="STUY|GRYR|GRST|GRED|GRIP"><span className="mukcolon">: </span><span className="colon"> : </span></span></span>
                                <span className="programline" id="FIELD_STUY">{edu.field_of_study}</span><span className="jobdates" id="FIELD_GRHN"></span><span dependency="GRHN|STUY"><span dependency="GRYR|GRST|GRED|GRIP">,</span></span>
                                <span className="jobdates" dependency="GRYR|GRST|GRED|GRIP">
                                    <span className="xslt_static_change displayNoneThisField">Expected in </span><span id="FIELD_GRYR">{formatDate(edu.start_date, language)}</span>
                                    <span dependency="GRST+GRED"> to </span>
                                    <span id="FIELD_GRED">{formatDate(edu.end_date, language)}</span>

                                    <span id="FIELD_GRIP"></span>
                                </span>
                            </span>
                            <span className="dispBlock pb5 compfont" dependency="SCHO|SCIT|SSTA|SCNT">
                                <span className="companyname txtBold txtItl" id="FIELD_SCHO">{edu.institution}</span><span dependency="SCHO"><span dependency="SCIT|SSTA|SCNT"> - </span></span>
                                <span className="joblocation jobcity" id="FIELD_SCIT">{edu.city}</span>
                                <span className="joblocation jobstate" id="FIELD_SSTA"></span>
                                <span className="joblocation jobcountry" id="FIELD_SCNT"></span>
                            </span>
                        </div>

                        <span id="FIELD_FRFM"></span>
                    </div>
                </div></div></div>
            ))}</div></div></div></div>

                            {data.languages && data.languages.length > 0 && (
                                <div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="35" className="sortable-item section-container SortableItem-sibling data-LNGG">
                                    <div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG88bc36a1-247b-b72f-7918-a79948b8fc80" className="section langSec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
                                        <div data-testid="embd-88uQIHR-LNGG" className="doc-item">
                                            <div data-testid="embd-88ciQTv" className="heading">
                                                <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_LNGG">{t.languages}<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Languages " className="ds-link ds-link-default rename-section text-rename"></span></div>
                                            </div>
                                            <div data-testid="embd-88aw0Ce-LNGG" className="">
                                                <div data-testid="embd-87S8HNi88bc36a1-247b-b72f-7918-a79948b8fc80" id="CONTAINER_88bc36a1-247b-b72f-7918-a79948b8fc80" className="sortableInner">
                                                    {data.languages.map((lang, index) => (
                                                        <div key={lang.id} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="35" className="sortable-item paragraph-container SortableItem-sibling">
                                                            <div data-testid={`embd-79HRa2m-${lang.id}`} id={`PARAGRAPH_LNGG_${lang.id}`} className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}>
                                                                <div data-testid="embd-78FzR29" className="clearfix doc-item">
                                                                    <div className="singlecolumn">
                                                                        <div className="field">
                                                                            <span className="txtBold" id="FIELD_FRFM">{lang.name}</span><span className="lang-colon" dependency="FRFM">:</span>
                                                                            <span className="fltRight" id="FIELD_RATG"></span>
                                                                        </div>
                                                                        <div className="ratingBar" dependency="RATV">
                                                                            <div className="innerRating" id="FIELD_RATV" style={{ width: getLevelWidth(lang.level) }}></div>
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
                                                            <button data-testid="embd-87enKtK-LNGG" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="35" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div></div></div><div data-testid="embd-92LqKqF3" id="CONTAINER_PARENT_3" className="bottomsection"><div data-testid="embd-92PDkR65" id="CONTAINER_5" className=""></div></div></div><div></div></div></div>
        </>
    );
}
