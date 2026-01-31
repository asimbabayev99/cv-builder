/* eslint-disable */
// @ts-nocheck
export default function TemplateMlu7() {
  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-mlu7 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        /*START content disc style for LI*/
        .skn-mlu7 ul,.skn-mlu7 li{list-style:none;margin:0;padding:0}
        .skn-mlu7 ul li{position:relative;margin:0px;padding-left:10px}
        .skn-mlu7 ul li:before{content:'\\2022';font-size:9px;position:absolute;left:0;top:0}
        .skn-mlu7 .jobline ul,.skn-mlu7 .education .field ul{margin-top:6px}
        /*END content disc style for LI*/

        .skn-mlu7 .clear{clear:both;height:0}
        .skn-mlu7 .txtBold{font-weight:bold}
        .skn-mlu7 .txtItl{font-style:italic}
        .skn-mlu7 .dispBlock,.skn-mlu7 .name > span{display:block}
        .skn-mlu7 .sprtr{margin:0}
        .skn-mlu7 .fltRight{float:right}
		.skn-mlu7 .txt-bold{font-weight:bold}

        .skn-mlu7{color:#3b3b3b;line-height:16px;font-variant-ligatures:none;display:table;min-height:792px;table-layout:fixed}
        .skn-mlu7 .name{font-weight:bold;padding:0 0 10px 0;text-align:left;text-transform:uppercase;position:relative;word-wrap:break-word}
        .skn-mlu7 .resumeTitle{color:#4a4a4a;text-transform:uppercase}
        .skn-mlu7 .name,.skn-mlu7 .address,.skn-mlu7 .additional_lnk{color:#4a4a4a;letter-spacing:0}
        .skn-mlu7 .singlecolumn,.skn-mlu7 .sectiontitle{word-wrap:break-word}
        .skn-mlu7 table.skills,.skn-mlu7 .table_wrapper{width:100%;margin-top:0}
        .skn-mlu7 table.skills th,.skn-mlu7 table.skills td{width:20%;text-align:center}
        .skn-mlu7 table.skills .skillname,.skn-mlu7 table.skills .skillrating{text-align:left;width:35%}
        .skn-mlu7 table.skills .skillrating{width:20%}
        .skn-mlu7 table.skills .skillyears,.skn-mlu7 table.skills .skilllast{width:19%}
        .skn-mlu7 table.skills .pad1{width:5%}
        .skn-mlu7 table.skills .pad2,.skn-mlu7 table.skills .pad3{width:1%}
		.skn-mlu7 .social-lnk:last-child .sprtr{display:none}

        /* common left-right container */
        .skn-mlu7 .topsection .left-box,.skn-mlu7 .parentContainer .left-box{border-right: 1px solid #a9b1b5}
        .skn-mlu7 .topsection .left-box{vertical-align:middle;padding-top:15px;padding-bottom:15px}
        .skn-mlu7 .left-box{padding:20px 30px;display:table-cell;position:relative}
        .skn-mlu7 .left-box > .section:first-child,.skn-mlu7 .right-box > .section:first-child{padding-top:0!important}
        .skn-mlu7 .right-box{padding:25px 30px 20px;display:table-cell;vertical-align:middle;letter-spacing:.2px}
        .skn-mlu7 .parentContainer{display:table-row;width:100%;height:100%}
        .skn-mlu7 .parentContainer .right-box{padding-top:20px;vertical-align:top}
        .skn-mlu7 .right-box > .section:first-child .heading,.skn-mlu7 .left-box > .section:first-child .heading{margin-bottom:10px!important}

        /* top section */
        .skn-mlu7 .topsection{display:table-row;width:100%}
        .skn-mlu7 .topsection .left-box,.skn-mlu7 .topsection .right-box{border-bottom: 1px solid #a9b1b5}
        .skn-mlu7 .section:empty{display:none}

        /* PRFL */
        .skn-mlu7 .PICTPic{position:relative;display:table-cell;vertical-align:middle;text-align:center;}
        .skn-mlu7 .PICTPic img{max-height:100%;max-width:100%;min-height:100%;min-width:100%;position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;object-fit:cover}

        /*Photo Layout styles*/
        .skn-mlu7.pict-pcsh-circle .paragraph .PICTPic img{border-radius:50%;border:1px solid #373737;box-sizing:border-box}
        .skn-mlu7.pict-pcsh-rectangle .paragraph .PICTPic img{border-radius:unset;border:1px solid #373737;box-sizing:border-box}
        .skn-mlu7.pict-pcsh-bottomleft .paragraph .PICTPic img{border-radius:50%;border-bottom-left-radius:8px;border:1px solid #373737;box-sizing:border-box}
        .skn-mlu7.pict-pcsh-bottomright .paragraph .PICTPic img{border-radius:50%;border-bottom-right-radius:8px;border:1px solid #373737;box-sizing:border-box}
        .skn-mlu7.pict-pcsh-radius .paragraph .PICTPic img{border-radius:10px;border:1px solid #373737;box-sizing:border-box}

        /* address and ALNK */
        .skn-mlu7 .address .singlecolumn,.skn-mlu7 .additional_lnk .singlecolumn{margin-left:0!important}
        .skn-mlu7 .SECTION_CNTC,.skn-mlu7 .additional_lnk{padding:0!important}

        /* Heading */
        .skn-mlu7 .heading{font-weight:bold;line-height:15px;margin-bottom:10px}
        .skn-mlu7 .right-box .sectiontitle{letter-spacing:0}
        .skn-mlu7 .septr:before{content:"|";font-size:9px;vertical-align:top;padding-left:2px;padding-right:2px}
		
		/* PPDT */
        .skn-mlu7 .bottombox .section:first-child:before,.skn-mlu7 .bottombox .section.disclaim:before{display:none}
        .skn-mlu7 .disclaim .singlecolumn,.skn-mlu7 .disclaim .singlecolumn li,.skn-mlu7 .disclaim .singlecolumn p,.skn-mlu7 .disclaim .singlecolumn span{font-size:9px!important;color:#8a8a8a!important}
		.skn-mlu7 .disclaim .singlecolumn{margin-left:0}
		
		/*Infographic*/
        .skn-mlu7 .langSec .field *,.skn-mlu7 .infoSec .field *{display:inline}
		.skn-mlu7 .right-box .langSec .firstparagraph .field{display:inline}
		.skn-mlu7 .right-box .langSec .firstparagraph .field.dispBlock,.skn-mlu7 .right-box .langSec.hide-bar .firstparagraph .field,.skn-mlu7 .right-box .langSec.hide-only-bar .firstparagraph .field{display:block}
        .skn-mlu7 .langSec .paragraph,.skn-mlu7 .infoSec .paragraph{clear:both;margin-top:0}
        .skn-mlu7 .ratingBar{background:#d5d6d6;width:100%;clear:both;page-break-inside:avoid}
		.skn-mlu7 .innerRating{background-color:#4a4a4a;height:4px;width:60%}

        .skn-mlu7 .hide-bar .ratingBar,.skn-mlu7 .hide-only-bar .ratingBar,.skn-mlu7 .hide-bar .field-ratt,.skn-mlu7 .hide-colon .colon{display:none}

        /* GRYR */
        .skn-mlu7 .displayNoneThisField{display:none}/* Keep this class always at bottom */

        /*builder fixes*/
        .skn-mlu7 .data-PICT .SECTION_PICT,.skn-mlu7 .name-contact .SECTION_NAME{padding-top:0}

        /*PICT support*/
        .skn-mlu7.pict-pcpf-none .pict-sec{display:none}

        /* Duration tag */
        .skn-mlu7 .totl-expr{display:inline-block;float:right; padding:0 5px;color:#fff;font-weight:600;vertical-align:top;text-wrap:nowrap;margin-left:5px}
        .skn-mlu7.texp-curved .totl-expr{border-radius:10px}
        .skn-mlu7 .dflex{display:flex;justify-content:space-between}
        .skn-mlu7 .left-box .totl-expr{display:none}

        /* Only for firefox */
        @-moz-document url-prefix(){.skn-mlu7{height:1px}}
		
		 @media all and (-ms-high-contrast:none)
            {
                .skn-mlu7 .PICTPic img{position:static}
            }
            
        .skn-mlu7.for-iron-pdf .parentContainer .left-box,.skn-mlu7.for-iron-pdf .parentContainer .right-box{padding-bottom:0}
        .skn-mlu7.for-iron-pdf .topsection .left-box{padding-top:0}
        .skn-mlu7.for-iron-pdf .topsection .right-box{padding-top:10px}
    

        .skn-mlu7,.skn-mlu7 table{line-height:15px}
        .skn-mlu7.pagesize{width:595px}
        .skn-mlu7.fontsize,.skn-mlu7 ul li:before,.skn-mlu7 .septr:before{font-size:11px}
        .skn-mlu7.fontface{font-family:Arial}
        .skn-mlu7 .section{padding-top:20px}
        .skn-mlu7 .firstparagraph{margin-top:0!important}
        .skn-mlu7 .paragraph{margin-top:10px}
        .skn-mlu7 .singlecolumn,.skn-mlu7 .maincolumn{margin-left:0px}
        .skn-mlu7 .parentContainer .left-box .singlecolumn,.skn-mlu7 .parentContainer .left-box .maincolumn{margin-left:0}
        /*.skn-mlu7 .parentContainer .left-box .singlecolumn{width:{$PGIN}px}*/
        .skn-mlu7 table.skills td{padding-top:5px}
        .skn-mlu7 .name{font-size:32px;line-height:32px}
        .skn-mlu7 .resumeTitle{font-size:17px;line-height:17px;margin:0 0 15px 0}/*PPDT*/
        .skn-mlu7 .disclaim{margin:0;padding:0;padding-top:50px!important}
        .skn-mlu7 .totl-expr{background-color:#4a4a4a;font-size:8px;line-height:12px}

        .skn-mlu7 .address2{font-size:11px;line-height:{$CILH}px}
        .skn-mlu7 .sectiontitle{font-size:13px;line-height:14px}
        .skn-mlu7 .left-box{width:164px}
        .skn-mlu7 .PICTPic{height:140px;width:140px}
        .skn-mlu7 .jobdates{font-size:10px}
        .skn-mlu7 .name,.skn-mlu7 .sectiontitle{color:#4a4a4a}
		
		/*Infographic*/
        .skn-mlu7 .langSec .paragraph,.skn-mlu7 .infoSec .paragraph{margin-top:5px}
        .skn-mlu7 .langSec .firstparagraph,.skn-mlu7 .infoSec .firstparagraph{padding-top:0}
        .skn-mlu7 .innerRating{background-color:#4a4a4a}
        .skn-mlu7.pict-pcsh-rectangle .paragraph .PICTPic{width:110px}
    `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-mlu7 MLU7 MUK texp-none pict-pcpf-purl " docskinwidth="571" ><div data-testid="embd-92LqKqF0" id="CONTAINER_PARENT_0" className="topsection"><div data-testid="embd-92PDkR60" id="CONTAINER_0" className="left-box"><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="12" className="sortable-item section-container SortableItem-sibling  data-PICT"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-PICT" id="SECTION_PICTa2e3abc4-fc5a-4d5c-80fb-ac187cd5be60" className="section notdraggable pict-sec SECTION_PICT firstsection" data-section-cd="PICT"><div data-testid="embd-88uQIHR-PICT" className="doc-item"><div data-testid="embd-88aw0Ce-PICT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-389ae0dd-26d7-4892-a4b9-d1e4f0b10399" id="PARAGRAPH_PICT_389ae0dd-26d7-4892-a4b9-d1e4f0b10399" className="paragraph PARAGRAPH_PICT firstparagraph placeholder-text"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="PICTPic" id="FIELD_PURL"><img data-testid="embd-78pIea6" className="chk" src="https://assets.myperfectcv.co.uk/blobimages/muk/builder/images/sampleSkinImageSquare.png" alt="Smiley face" /> </div>
                        <div className="clear"></div>
                    </div></div></div></div></div></div></div></div><div data-testid="embd-92V3aoN1" id="CONTAINER_1" className="right-box"><div data-testid="embd-92jKFs0-1" data-react-beautiful-dnd-draggable="12" className="sortable-item section-container SortableItem-sibling name-contact "><div data-testid="embd-92UIU6N-1" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-NAME" id="SECTION_NAME1a1a32ad-f01c-4377-b2f6-1a65f9bf6cb8" className="section notdraggable SECTION_NAME firstsection" data-section-cd="NAME"><div data-testid="embd-88uQIHR-NAME" className="doc-item"><div data-testid="embd-88aw0Ce-NAME" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-44bc0bd4-6d0c-480d-8f32-8d70df1621d0" id="PARAGRAPH_NAME_44bc0bd4-6d0c-480d-8f32-8d70df1621d0" className="paragraph PARAGRAPH_NAME firstparagraph"><div data-testid="embd-78blCsH">
                        <div className="name">
                            <span id="FIELD_FNAM" dependency="FNAM">Dom</span>
                            <span id="FIELD_LNAM" dependency="LNAM">Webster</span>
                        </div>
                        
                    </div></div></div></div></div></div><div data-testid="embd-88MByq6-CNTC" id="SECTION_CNTCd3d40c22-1b29-401e-a809-9cb7e72d6fdc" className="section SECTION_CNTC notdraggable" data-section-cd="CNTC"><div data-testid="embd-88uQIHR-CNTC" className="doc-item"><div data-testid="embd-88aw0Ce-CNTC" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-3912838f-29f6-467c-8297-bf45ee1ff720" id="PARAGRAPH_CNTC_3912838f-29f6-467c-8297-bf45ee1ff720" className="paragraph PARAGRAPH_CNTC firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="address txtItl">
                            <div className="singlecolumn">
                                <span dependency="HPHN">
                                    <span id="FIELD_HPHN">07912 345 678</span>
                                </span>
                                
                                
                                <span dependency="HPHN+CPHN|EMAI">|</span>
                                <span dependency="EMAI">
                                    <span id="FIELD_EMAI">dom.webster@example.co.uk</span>
                                </span>
                                <span className="dispBlock" dependency="ADDR|STRT|CITY|STAT|REMW">
                                    <span id="FIELD_STRT">46 Roman Rd</span><span dependency="STRT+CITY|STAT">, </span>
                                    <span id="FIELD_CITY">Leeds</span>
                                    <span id="FIELD_STAT"></span>
                                    <span id="FIELD_ZIPC">LS2 3ZR</span>
									<span id="FIELD_ADDR"></span>
                                    <span dependency="ADDR|STRT|CITY|STAT"></span>
                                    <span id="FIELD_REMW"></span>
                                </span>
                            </div>
                        </div>
						
                    </div></div></div></div></div></div><div className="doc-overlay section-overlay" style={{ left: '-2px', right: '-2px' }}><span> </span></div></div></div></div><div data-testid="embd-92LqKqF1" id="CONTAINER_PARENT_1" className="parentContainer"><div data-testid="embd-92PDkR62" id="CONTAINER_2" className="left-box"><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="13" className="sortable-item section-container SortableItem-sibling  data-HILT"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">SKILLS<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename SKILLS " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn maincolumn">
                            <span className="paddedline" id="FIELD_SKC1"><ul><li>Strong verbal communication</li>
  <li>Attention to detail</li>
  <li>Community activities</li>
  <li>Medication administration</li>
  <li>Care plan management</li></ul></span>
                            <span className="paddedline" id="FIELD_SKC2"><ul><li>Risk management processes and analysis</li>
  <li>Client safety and First Aid</li>
  <li>Compassionate client care</li>
  <li>Behaviour redirection</li></ul></span>
                        </div>
                    </div></div></div></div></div></div></div><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="13" className="sortable-item section-container SortableItem-sibling  data-EDUC"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section education SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">EDUCATION<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename EDUCATION " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner"><div data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="13" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="13" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-e0037f47-0bb8-4767-a441-48042b09746f" id="PARAGRAPH_EDUC_e0037f47-0bb8-4767-a441-48042b09746f" className="paragraph PARAGRAPH_EDUC firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn">
							<div className="jobdates txtItl" dependency="GRST|GRED|GRIP|GRYR">
								 <span className="xslt_static_change displayNoneThisField">Expected in </span><span id="FIELD_GRYR" format="%m/%Y">2013</span>
                                <span className="jobdates" id="FIELD_GRST" format="%m/%Y"></span>
								
								<span className="jobdates" id="FIELD_GRED" format="%m/%Y"></span>
                                <span id="FIELD_GRIP"></span>
                            </div>
                            <div dependency="SCIT|SSTA|SCHO|SCNT">
                                <span className="companyname txtBold" id="FIELD_SCHO">Edinburgh College</span>
                                <span dependency="GRYR+SSTA|SCIT" className="septr"></span>
                                <span className="joblocation jobcity txtItl" id="FIELD_SCIT">Edinburgh</span>
                                <span className="joblocation jobstate txtItl" id="FIELD_SSTA"></span> <span className="joblocation jobcountry" id="FIELD_SCNT"></span>
                            </div>
                            <div className="degreeGap" dependency="DGRE|STUY|GRHN|GRPA">
                                <span className="degree" id="FIELD_DGRE">NVQ Level 3</span><span dependency="DGRE+STUY">: </span>
                                <span className="programline" id="FIELD_STUY">Health And Social Care</span>
                                <span id="FIELD_GRHN"></span>
                                <span className="field" id="FIELD_GRPA"></span>
                            </div>
                            <span className="field" id="FIELD_FRFM"></span>
                        </div>
                    </div></div></div><div data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="13" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="13" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-e0037f47-0bb8-4767-a441-48042b09746f" id="PARAGRAPH_EDUC_e0037f47-0bb8-4767-a441-48042b09746f" className="paragraph PARAGRAPH_EDUC"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn">
							<div className="jobdates txtItl" dependency="GRST|GRED|GRIP|GRYR">
								 <span className="xslt_static_change displayNoneThisField">Expected in </span><span id="FIELD_GRYR" format="%m/%Y">2008</span>
                                <span className="jobdates" id="FIELD_GRST" format="%m/%Y"></span>
								
								<span className="jobdates" id="FIELD_GRED" format="%m/%Y"></span>
                                <span id="FIELD_GRIP"></span>
                            </div>
                            <div dependency="SCIT|SSTA|SCHO|SCNT">
                                <span className="companyname txtBold" id="FIELD_SCHO">Edinburgh College</span>
                                <span dependency="GRYR+SSTA|SCIT" className="septr"></span>
                                <span className="joblocation jobcity txtItl" id="FIELD_SCIT">Edinburgh</span>
                                <span className="joblocation jobstate txtItl" id="FIELD_SSTA"></span> <span className="joblocation jobcountry" id="FIELD_SCNT"></span>
                            </div>
                            <div className="degreeGap" dependency="DGRE|STUY|GRHN|GRPA">
                                <span className="degree" id="FIELD_DGRE">NVQ Level 2</span><span dependency="DGRE+STUY">: </span>
                                <span className="programline" id="FIELD_STUY">Health And Social Care</span>
                                <span id="FIELD_GRHN"></span>
                                <span className="field" id="FIELD_GRPA"></span>
                            </div>
                            <span className="field" id="FIELD_FRFM"></span>
                        </div>
                    </div></div></div></div></div></div></div></div></div><div data-testid="embd-92PDkR63" id="CONTAINER_3" className="right-box"><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="13" className="sortable-item section-container SortableItem-sibling  data-SUMM"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">PROFESSIONAL SUMMARY<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename PROFESSIONAL SUMMARY " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn" id="FIELD_FRFM"><p>Motivated Care Assistant with 10 years of experience in the Care industry. Offering expertise in person-centred care, implementation and monitoring of individual care plans and management of resident assessments and files. Energetic self-starter and team builder able to navigate high-stress situations. Well-versed in monitoring clients with developmental disabilities and adhering to patient care plans.</p></div>
                    </div></div></div></div></div></div></div><div data-testid="embd-94h2gQ2" data-react-beautiful-dnd-draggable="13" className="sortable-item section-container SortableItem-sibling  data-EXPR"><div data-testid="embd-94w3bZE" className="document-tool sec-tool" id="editIcons" style={{ right: '-2px' }}></div><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">Work history<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Work history " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner"><div data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="13" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="13" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-998e66f0-eaa8-4a72-b41c-7158c85a1d86" id="PARAGRAPH_EXPR_998e66f0-eaa8-4a72-b41c-7158c85a1d86" className="paragraph PARAGRAPH_EXPR firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn">
                            <span className="dispBlock" dependency="JSTD|EDDT|TEXP">
                                <span className="dflex">
                                    <span>
                                        <span className="jobdates txtItl" id="FIELD_JSTD" format="%m/%Y">07/2014</span><span dependency="JSTD+EDDT"> - </span>
                                        <span className="jobdates txtItl" id="FIELD_EDDT" format="%m/%Y">Current</span><br dependency="JSTD|EDDT" />
                                    </span>
                                    
                                </span>
                            </span>
                            <span className="dispBlock locationGap" dependency="COMP|JSTA|JCIT|JCNT">
                                <span className="companyname txtBold" id="FIELD_COMP">Private Care Home</span><span dependency="COMP"><span dependency="JCIT|JSTA|JCNT"> | </span></span>
                                <span className="jobcity" id="FIELD_JCIT">Edinburgh</span>
                                <span className="jobstate" id="FIELD_JSTA"></span> <span className="joblocation jobcountry" id="FIELD_JCNT"></span>
                            </span>
                            <span className="dispBlock" dependency="JTIT">
                                <span className="jobtitle txtCaps" id="FIELD_JTIT">Senior Care Assistant</span>
                            </span>
                            <span className="jobline" id="FIELD_JDES"><ul><li>Met with patients and families to discuss care and plan of action htmlFor future.</li>
  <li>Implemented new team onboarding programme, reducing training time from four weeks to two.</li>
  <li>Administered all necessary medications as directed by care plan.</li></ul></span>
                        </div>
                    </div></div></div><div data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="13" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="13" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-5c57d155-aa5a-4a63-87f2-90490c80548b" id="PARAGRAPH_EXPR_5c57d155-aa5a-4a63-87f2-90490c80548b" className="paragraph PARAGRAPH_EXPR"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                        <div className="singlecolumn">
                            <span className="dispBlock" dependency="JSTD|EDDT|TEXP">
                                <span className="dflex">
                                    <span>
                                        <span className="jobdates txtItl" id="FIELD_JSTD" format="%m/%Y">09/2010</span><span dependency="JSTD+EDDT"> - </span>
                                        <span className="jobdates txtItl" id="FIELD_EDDT" format="%m/%Y">06/2014</span><br dependency="JSTD|EDDT" />
                                    </span>
                                    
                                </span>
                            </span>
                            <span className="dispBlock locationGap" dependency="COMP|JSTA|JCIT|JCNT">
                                <span className="companyname txtBold" id="FIELD_COMP">Ideal Care Homes</span><span dependency="COMP"><span dependency="JCIT|JSTA|JCNT"> | </span></span>
                                <span className="jobcity" id="FIELD_JCIT">Edinburgh</span>
                                <span className="jobstate" id="FIELD_JSTA"></span> <span className="joblocation jobcountry" id="FIELD_JCNT"></span>
                            </span>
                            <span className="dispBlock" dependency="JTIT">
                                <span className="jobtitle txtCaps" id="FIELD_JTIT">Care Assistant</span>
                            </span>
                            <span className="jobline" id="FIELD_JDES"><ul><li>Charted daily information such as mood changes, mobility activity, eating percentages and daily inputs and outputs.</li>
  <li>Developed strong and trusting rapport with each client to facilitate best care possible.</li>
  <li>Worked to improve patient outlook and daily living through compassionate care.</li></ul></span>
                        </div>
                    </div></div></div></div></div></div></div></div></div></div></div><div></div></div></div>
    </>
  );
}
