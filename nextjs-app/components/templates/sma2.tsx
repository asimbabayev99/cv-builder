/* eslint-disable */
// @ts-nocheck
export default function TemplateSma2() {
  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{line-height:1;background:#FFF;text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-sma2 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        .skn-sma2 span.paddedline,.skn-sma2 span.dates_wrapper{display:block}
        .skn-sma2 .logo,.skn-sma2 .nodisplay{display:none}
        .skn-sma2 .txtReglr{font-weight:regular}
        .skn-sma2 .txtBold{font-weight:bold}
        .skn-sma2 span.dates_wrapper{float:left}
        .skn-sma2 .flt-right{float:right}
		.skn-sma2 .dispInBlk{display:inline-block}
		.skn-sma2 .maxWidth{max-width:100%}
        .skn-sma2 .brk-all{word-break:break-all}

        /*START content disc style for LI*/
        .skn-sma2 ul,.skn-sma2 li{list-style:none;margin:0 0 0 8px;padding:0}
        .skn-sma2 ul li{position:relative;margin:0 0 0 5px}
        .skn-sma2 ul li:before{content:'\\25CF\\0020';position:absolute;left:-13px;top:0}
        /*END content disc style for LI*/

        .skn-sma2{color:#4a4a4a;background-color:#fff;word-wrap:break-word;min-height:792px}
        .skn-sma2 .sectiontitle{font-weight:bold;text-transform:uppercase;letter-spacing:.5px}
        .skn-sma2 .SECTION_CNTC,.skn-sma2 div.firstsection{border:none;padding:0}
        .skn-sma2 .sectiontitle,.skn-sma2 .singlecolumn,.skn-sma2 .maincolumn,.skn-sma2 .parlrColmn{padding:0 10px}
        .skn-sma2 .parlrColmn .singlecolumn{padding:0 0 0 10px}
        .skn-sma2 .name{font-size:15px;line-height:17px;padding:0;text-transform:uppercase;text-align:center}
        .skn-sma2 .resumeTitle{text-align:center;color:#4a4a4a;text-transform:lowercase}
        .skn-sma2 .resumeTitle:first-letter{text-transform:uppercase}/*To make sentence case*/
        .skn-sma2 .paragraph{position:relative}
        .skn-sma2 .heading{background-color:#bcbfc3;color:#fff;clear:both;font-weight:normal;margin-bottom:10px}
        .skn-sma2 .address{position:relative;text-align:center;font-size:0.917em;line-height:1.25em}
        .skn-sma2 .address2{position:relative;text-align:left;font-size:0.917em;line-height:1.25em}
        .skn-sma2 .table_wrapper{width:100%;margin-top:0}
		.skn-sma2 .skill{display:table;width:100%;table-layout:fixed}
        .skn-sma2 table.twocol td{width:50%;display:table-cell}
        .skn-sma2 table.twocol td + td{padding-left:2%}
        .skn-sma2 table.skills th,.skn-sma2 table.skills td{width:20%;text-align:center}
        .skn-sma2 table.skills th{text-decoration:underline}
        .skn-sma2 table.skills .skillname,.skn-sma2 table.skills .skillrating{text-align:left;width:35%}
        .skn-sma2 table.skills .skillrating{width:20%}
        .skn-sma2 table.skills .skillyears,.skn-sma2 table.skills .skilllast{width:19%}
        .skn-sma2 table.skills .pad1{width:5%}
        .skn-sma2 table.skills .pad2,.skn-sma2 table.skills .pad3{width:1%}
        .skn-sma2 .parlrColmn{clear:both}
        .skn-sma2 .adnlLnks{text-align:center}
        .skn-sma2 .social-link .sprtr{padding:0 2px}
        .skn-sma2 .social-link:last-child .sprtr{display:none}

        .skn-sma2 .totl-expr{display:inline-block;padding:0 6px;color:#fff;font-weight:400;vertical-align:top}
        .skn-sma2.texp-curved .totl-expr{border-radius:10px}

        /*Personal details section*/
        .skn-sma2 .pdet-sec .singlecolumn{display:flex;justify-content:space-between;flex-wrap:wrap}
        .skn-sma2 .details-wrap{width:49%}

        /*FIX for FORCEFULLY making left margin ZERO for CL*/
        .skn-sma2 .sectionCL .paragraph{padding-top:0}
        .skn-sma2 .sprtr + .sprtr{display:none}

        /*MES and MFR address order code*/
        .skn-sma2 .zipprefix,.skn-sma2.MES .zipsuffix,.skn-sma2.MFR .zipsuffix{display:none}
        .skn-sma2 .zipsuffix,.skn-sma2.MES .zipprefix,.skn-sma2.MFR .zipprefix{display:inline}
        .skn-sma2.MDE .hide-de{display:none}

        /*Infographic*/
        .skn-sma2 .lang-sec,.skn-sma2 .skli-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-sma2 .lang-sec .heading,.skn-sma2 .skli-sec .heading{width:100%;flex-grow:1}
        .skn-sma2 .lang-sec .paragraph, .skn-sma2 .skli-sec .paragraph{width:48.5%}
        .skn-sma2 .lang-sec .field *,.skn-sma2 .lang-sec .nativeLangPara .field,.skn-sma2 .skli-sec .field *{display:inline}
        .skn-sma2 .lang-sec .paragraph,.skn-sma2 .skli-sec .paragraph{vertical-align:top;padding-bottom:5px;margin-top:0;padding-top:0}
        .skn-sma2 .lang-sec .singlecolumn,.skn-sma2 .skli-sec .singlecolumn{margin-left:0;position:relative}
        .skn-sma2 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;overflow:hidden}
        .skn-sma2 .section.lang-sec .paragraph.nativeLangPara{width:100%;padding-bottom:5px}
        .skn-sma2 .inner-rating{background-color:#1A4771;height:4px;width:60%}
        .skn-sma2 .lang-sec > .paragraph:nth-last-child(1),.skn-sma2 .lang-sec > .paragraph:nth-last-child(2),
        .skn-sma2 .skli-sec > .paragraph:nth-last-child(1),.skn-sma2 .skli-sec > .paragraph:nth-last-child(2){padding-bottom:0}
        .skn-sma2 .hide-bar .rating-bar,.skn-sma2 .hide-colon .colon,.skn-sma2 .hide-only-bar .rating-bar{display:none}
        .skn-sma2 .lang-sec .para_odd .singlecolumn,.skn-sma2 .skli-sec .para_odd .singlecolumn{padding-right:0}
        .skn-sma2 .lang-sec .para_even .singlecolumn,.skn-sma2 .skli-sec .para_even .singlecolumn{padding-left:0}
		
		.skn-sma2 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,.skn-sma2 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child{min-height:0}

        /*HILT multi para/section*/
        .skn-sma2 .multi-section-hilt .multi-para-opt,.skn-sma2 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,.skn-sma2 .multi-para-hilt .dflt-view{display:none}
        .skn-sma2 .multi-para-hilt:after{content:"";display:block;clear:both;visibility:hidden;line-height:0;height:0} /*Clearfix*/
	    .skn-sma2 .multi-para-hilt .paragraph .singlecolumn{margin-left:0}
        .skn-sma2 .multi-para-hilt .paragraph{width:49%;max-width:49%;display:block;float:left;clear:none;margin-top:0px;margin-right:2%;margin-bottom:10px;padding-top:0}
        .skn-sma2 .multi-para-hilt .paragraph:nth-child(2n+1){margin-right:0}
        .skn-sma2 .multi-para-hilt .paragraph:last-child,.skn-sma2 .multi-para-hilt .paragraph:nth-last-child(2){margin-bottom:0}

        /* GRYR */
        .skn-sma2 .displayNoneThisField{display:none}/* Keep this class always at bottom */
        .skn-sma2 .section.sign{padding-top:50px}

        /*For Extra Space Before Colon*/
        .skn-sma2 .beforecolonspace{display:none!important}
        .skn-sma2.MFR .beforecolonspace{display:inline!important}
                        
        /* Style for Signature */
        .skn-sma2 .disclaim .singlecolumn,.skn-sma2 .disclaim .singlecolumn li,.skn-sma2 .disclaim .singlecolumn p,.skn-sma2 .disclaim .singlecolumn span{font-size:9px;color:#8a8a8a}
        .skn-sma2 .field_sign{font-size:7px;color:#8a8a8a}
        .skn-sma2 .txtleft + .field_sign{text-align:left}
        .skn-sma2 .txtcenter + .field_sign{text-align:center}
        .skn-sma2 .txtright + .field_sign{text-align:right}
        .skn-sma2 .signPic img{max-width:100%}
        
        /* Text Align Adjust */

        .skn-sma2 .ttc-align-left ul{text-align:left}
        .skn-sma2 .ttc-align-right ul{text-align:right}
        .skn-sma2 .ttc-align-center ul{text-align:center}
        .skn-sma2 .ttc-align-justify ul{text-align:justify}
        .skn-sma2 .ttc-align-right li:before,.skn-sma2 .ttc-align-center li:before{position:relative;left:-1.5px}

    

        .skn-sma2,.skn-sma2 table{line-height:15px}
        .skn-sma2.pagesize{width:515px}
        .skn-sma2.fontsize,.skn-sma2 .lang-sec .paragraph *,.skn-sma2 .skli-sec .paragraph *{font-size:11px}
        .skn-sma2.fontface{font-family:Century Gothic}
        .skn-sma2.vmargins{padding-top:40px; padding-bottom:40px}
        .skn-sma2.hmargins{padding-left:40px; padding-right:40px}
        .skn-sma2 .section{padding-top:25px}
        .skn-sma2 .sectiontitle{font-size:11px; line-height:15px}
        .skn-sma2 .paragraph{padding-top:10px}
        .skn-sma2 .paragraph.firstparagraph{padding-top:0}
        .skn-sma2 .singlecolumn,.skn-sma2 .maincolumn{margin-left:0px}
        .skn-sma2 table.skills td{padding-top:5px}
        .skn-sma2 .name{font-size:40px; line-height:44px}
        .skn-sma2 .resumeTitle{font-size:15px;line-height:15px;padding:8px 0}
        .skn-sma2 .address{font-size:11px; line-height:15px; margin-top:4px}
        .skn-sma2 span.dates_wrapper{width:185px}
        .skn-sma2 .parlrColmn .singlecolumn{margin-left:185px;width:auto}
        .skn-sma2 .heading{background-color:#bcbfc3}
		.skn-sma2 .skli-sec .singlecolumn .field:last-child{min-height:15px}
		.skn-sma2 .totl-expr{background-color:#bcbfc3;font-size:8px;line-height:12px}

        /*FIX for Re-calculating width of singlecolumn for CL*/
        .skn-sma2 .sectionCL{border:none;padding-top:none}
        .skn-sma2 .sectionCL .singlecolumn{margin-left:0;width:100%}
        .skn-sma2 .address2{font-size:11px; line-height:15px}
        
        /*Infographic*/
        .skn-sma2 .inner-rating{background-color:#bcbfc3}
        .skn-sma2 .lang-sec .sortable-item,.skn-sma2 .skli-sec .sortable-item{display:inline-block;vertical-align:top}
        .skn-sma2 .lang-sec .heading, .skn-sma2 .skli-sec .heading{margin-left: -0px}
        .skn-sma2 .lang-sec, .skn-sma2 .skli-sec{padding-left:0px}

        /* Multi para hilt */
        .skn-sma2 .multi-para-hilt{margin-left:0px}
        .skn-sma2 .multi-para-hilt .heading{margin-left:-0px}

        /*Finalize Fixes*/
        .page-finalize .skn-sma2 .sortableInner .paragraph-container+.paragraph-container{margin:0}
        .skn-sma2 .lang-sec .sortableInner .sortable-item:not(:first-child) .paragraph,.skn-sma2 .skli-sec .sortableInner .sortable-item:not(:first-child) .paragraph{vertical-align:top}
        .skn-sma2 .sortable-item i.far.fa-check{font-family:"Font Awesome 5 Pro"}
        .skn-sma2 .data-LNGG .sortable-item.native-lang{width:100%;max-width:100%}
        .skn-sma2 .data-LNGG .doc-item,.skn-sma2 .data-SKLI .doc-item,.skn-sma2 .lang-sec .doc-item,.skn-sma2 .skli-sec .doc-item{width:100%}
        .skn-sma2 .data-LNGG .sortableInner,.skn-sma2 .data-SKLI .sortableInner,.skn-sma2 .SECTION_LNGG .sortableInner,.skn-sma2 .SECTION-SKLI .sortableInner{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-sma2 .data-LNGG .sortable-item,.skn-sma2 .data-SKLI .sortable-item{width:48.5%}
        .skn-sma2 .data-LNGG .sortable-item .paragraph,.skn-sma2 .data-SKLI .sortable-item .paragraph{width:100%;max-width:100%}
        
		/*Fixes for builder for skill*/
        .skn-sma2 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child{min-height:15px}	
        .skn-sma2 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,.skn-sma2 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child{min-height:0}	
        .skn-sma2 .lang-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-sma2 .lang-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph, .skn-sma2  .skli-sec .sortableInner > .sortable-item:nth-last-child(1) .paragraph, .skn-sma2  .skli-sec .sortableInner > .sortable-item:nth-last-child(2) .paragraph{padding-bottom:0}
    
        /*PDF Flex Handling Code - Personal Information*/
		.skn-sma2.for-pdf .pdet-sec .singlecolumn{display:block}
		.skn-sma2.for-pdf .pdfpdwrapper{display:block}
		.skn-sma2.for-pdf .pdfpdwrapper .details-wrap:first-child{float:left;padding-right:5px}
		.skn-sma2.for-pdf .pdfpdwrapper .details-wrap:nth-child(2){float:right}
		.skn-sma2.for-pdf .pdfpdwrapper .details-wrap{width:243px!important;}

        .skn-sma2.for-pdf .lang-sec .heading, .skn-sma2.for-pdf .skli-sec .heading{width:unset}

    /*Infographic Containers*/
    .skn-sma2.for-pdf .lang-sec,.skn-sma2.for-pdf .skli-sec{display:block}
    .skn-sma2.for-pdf .pdfinfwrapper{display:block}
    .skn-sma2.for-pdf .pdfinfwrapper:after{content:'';clear:both;display:table}
    .skn-sma2.for-pdf .pdfinfwrapper .paragraph:first-child{float:left}
    .skn-sma2.for-pdf .pdfinfwrapper .paragraph:nth-child(2){float:right}
    .skn-sma2.for-pdf .pdfinfwrapper:last-child .paragraph{margin-bottom:0;padding-bottom:0}
    `}</style>
      <div className="svg-skin "><div data-testid="embd-98t1CZ7" className="" tabIndex={0}><div></div><div data-testid="embd-95CA90b" className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-sma2 SMA2 MUK     texp-rectangle" docskinwidth="515" ><div data-testid="embd-91y4rV2" className="name-contact "><div></div><div></div><div data-testid="embd-88MByq6-PRFL" id="SECTION_PRFL30868c37-6fcc-4b70-b87a-afd2447ce0d4" className="section SECTION_PRFL firstsection" data-section-cd="PRFL"><div data-testid="embd-88uQIHR-PRFL" className="doc-item"><div data-testid="embd-88aw0Ce-PRFL" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-04f55583-5181-435c-8336-f48964adf912" id="PARAGRAPH_PRFL_04f55583-5181-435c-8336-f48964adf912" className="paragraph PARAGRAPH_PRFL firstparagraph"><div data-testid="embd-78KlmQp">
                <div className="name" data-uppercase="true">
                    <span id="FIELD_FNAM">Dom</span><span dependency="FNAM+LNAM"></span>
                    <span id="FIELD_LNAM">Webster</span>
                </div>
                
                <div className="address">
                    <span className="paddedline">
                        <span id="FIELD_EMAI">dom.webster@example.co.uk</span>
                        <span dependency="EMAI"><span className="sprtr" dependency="HPHN|CPHN|STRT|CITY|STAT|ZIPC|ADDR|REMW">|</span></span>
                        <span id="FIELD_HPHN">07912 345 678</span>
                        <span dependency="HPHN"></span>
                        <span id="FIELD_CPHN"></span>
                        <span dependency="CPHN|HPHN"><span className="sprtr" dependency="STRT|CITY|STAT|ZIPC|ADDR|REMW">|</span></span>
                        <span className="zipsuffix" dependency="STRT|ZIPC|CITY|STAT|ADDR|REMW">
                            <span id="FIELD_STRT">46 Roman Rd</span><span dependency="STRT"><span dependency="CITY|STAT">, </span></span>
                            <span className="spaced" id="FIELD_CITY">Leeds</span>
                            <span className="spaced" id="FIELD_STAT"></span>
                            <span className="spaced" id="FIELD_ZIPC">LS2 3ZR</span>
                            <span id="FIELD_ADDR"></span>
                            <span dependency="STRT|ZIPC|CITY|STAT|ADDR"></span>
                            <span id="FIELD_REMW"></span>
                        </span>
                        
                    </span>
                </div>
                
            </div></div></div></div></div></div></div><div data-testid="embd-89XOkPJ0" className="parent-wrapper"><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="18" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb" className="section SECTION_SUMM has-title" data-section-cd="SUMM"><div data-testid="embd-88uQIHR-SUMM" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">PROFESSIONAL SUMMARY<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename PROFESSIONAL SUMMARY " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-SUMM" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d" id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d" className="paragraph PARAGRAPH_SUMM firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn" id="FIELD_FRFM"><p>Motivated Care Assistant with 10 years of experience in the Care industry. Offering expertise in person-centred care, implementation and monitoring of individual care plans and management of resident assessments and files. Energetic self-starter and team builder able to navigate high-stress situations. Well-versed in monitoring clients with developmental disabilities and adhering to patient care plans.</p></div>
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="18" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="18" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf" className="section SECTION_EXPR multi-para has-title" data-section-cd="EXPR"><div data-testid="embd-88uQIHR-EXPR" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">Work history<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Work history " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EXPR" className=""><div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf" id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner"><div data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="18" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="18" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-998e66f0-eaa8-4a72-b41c-7158c85a1d86" id="PARAGRAPH_EXPR_998e66f0-eaa8-4a72-b41c-7158c85a1d86" className="paragraph parlrColmn PARAGRAPH_EXPR firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <span className="dates_wrapper txtReglr">
                    <span className="paddedline" dependency="JSTD|EDDT|TEXP">
                        
                        <div>
                            <span className="jobdates" id="FIELD_JSTD" format="%b %Y">Jul 2014</span><span dependency="JSTD+EDDT"> - </span><span className="jobdates" id="FIELD_EDDT" format="%b %Y">Current</span>
                        </div>
                    </span>
                    <span className="paddedline" dependency="JTIT">
                        <span className="jobtitle txtBold" id="FIELD_JTIT">Senior Care Assistant</span>
                    </span>
                    <span className="paddedline" dependency="COMP|JCIT|JSTA|JCNT|JCTR">
                        <span className="companyname" id="FIELD_COMP">Private Care Home</span><span dependency="COMP"><span dependency="JCIT|JSTA|JCNT|JCTR"> -</span></span>
                        <span className="joblocation jobcity" id="FIELD_JCIT">Edinburgh</span><span className="joblocation jobstate" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span>
                        <span id="FIELD_JCTR"></span>
                    </span>
                </span>
                <div className="singlecolumn">
                    <span className="jobline" id="FIELD_JDES"><ul><li>Met with patients and families to discuss care and plan of action htmlFor future.</li>
  <li>Implemented new team onboarding programme, reducing training time from four weeks to two.</li>
  <li>Administered all necessary medications as directed by care plan.</li></ul></span>
                </div>
            </div></div></div><div data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="18" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="18" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-5c57d155-aa5a-4a63-87f2-90490c80548b" id="PARAGRAPH_EXPR_5c57d155-aa5a-4a63-87f2-90490c80548b" className="paragraph parlrColmn PARAGRAPH_EXPR"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <span className="dates_wrapper txtReglr">
                    <span className="paddedline" dependency="JSTD|EDDT|TEXP">
                        
                        <div>
                            <span className="jobdates" id="FIELD_JSTD" format="%b %Y">Sep 2010</span><span dependency="JSTD+EDDT"> - </span><span className="jobdates" id="FIELD_EDDT" format="%b %Y">Jun 2014</span>
                        </div>
                    </span>
                    <span className="paddedline" dependency="JTIT">
                        <span className="jobtitle txtBold" id="FIELD_JTIT">Care Assistant</span>
                    </span>
                    <span className="paddedline" dependency="COMP|JCIT|JSTA|JCNT|JCTR">
                        <span className="companyname" id="FIELD_COMP">Ideal Care Homes</span><span dependency="COMP"><span dependency="JCIT|JSTA|JCNT|JCTR"> -</span></span>
                        <span className="joblocation jobcity" id="FIELD_JCIT">Edinburgh</span><span className="joblocation jobstate" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span>
                        <span id="FIELD_JCTR"></span>
                    </span>
                </span>
                <div className="singlecolumn">
                    <span className="jobline" id="FIELD_JDES"><ul><li>Charted daily information such as mood changes, mobility activity, eating percentages and daily inputs and outputs.</li>
  <li>Developed strong and trusting rapport with each client to facilitate best care possible.</li>
  <li>Worked to improve patient outlook and daily living through compassionate care.</li></ul></span>
                </div>
            </div></div></div><div data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="18" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EXPR" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="18" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-5c57d155-aa5a-4a63-87f2-90490c80548b" id="PARAGRAPH_EXPR_5c57d155-aa5a-4a63-87f2-90490c80548b" className="paragraph parlrColmn PARAGRAPH_EXPR"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <span className="dates_wrapper txtReglr">
                    <span className="paddedline" dependency="JSTD|EDDT|TEXP">
                        
                        <div>
                            <span className="jobdates" id="FIELD_JSTD" format="%b %Y">Nov 2008</span><span dependency="JSTD+EDDT"> - </span><span className="jobdates" id="FIELD_EDDT" format="%b %Y">Aug 2010</span>
                        </div>
                    </span>
                    <span className="paddedline" dependency="JTIT">
                        <span className="jobtitle txtBold" id="FIELD_JTIT">Care Assistant</span>
                    </span>
                    <span className="paddedline" dependency="COMP|JCIT|JSTA|JCNT|JCTR">
                        <span className="companyname" id="FIELD_COMP">Four Seasons Health Care</span><span dependency="COMP"><span dependency="JCIT|JSTA|JCNT|JCTR"> -</span></span>
                        <span className="joblocation jobcity" id="FIELD_JCIT">Edinburgh</span><span className="joblocation jobstate" id="FIELD_JSTA"></span><span className="joblocation jobcountry" id="FIELD_JCNT"></span>
                        <span id="FIELD_JCTR"></span>
                    </span>
                </span>
                <div className="singlecolumn">
                    <span className="jobline" id="FIELD_JDES"><ul><li>Maintained confidentiality and compliance standards at all times.</li>
  <li>Maintained clean and well-organised environment to promote client happiness and safety.</li>
  <li>Assisted disabled individuals to foster independence while still closely monitoring safety.</li>
  <li>Supervised frequent activities such as medication and personal hygiene to provide safe living environment htmlFor patients.</li></ul></span>
                </div>
            </div></div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="18" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="18" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4" className="section SECTION_HILT has-title" data-section-cd="HILT"><div data-testid="embd-88uQIHR-HILT" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">SKILLS<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename SKILLS " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-HILT" className=""><div data-testid="embd-654vWVD6" className=""><div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4" id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4" className="paragraph PARAGRAPH_HILT firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn maincolumn">
                    <table className="twocol skill dflt-view">
                        <tbody><tr>
                            <td className="twocol_1" id="FIELD_SKC1"><ul><li>Strong verbal communication</li>
  <li>Attention to detail</li>
  <li>Community activities</li>
  <li>Medication administration</li>
  <li>Care plan management</li></ul></td>
                            <td className="twocol_2" id="FIELD_SKC2"><ul><li>Risk management processes and analysis</li>
  <li>Client safety and First Aid</li>
  <li>Compassionate client care</li>
  <li>Behaviour redirection</li></ul></td>
                        </tr>
                    </tbody></table>
                    <div className="multi-para-opt">
                        <div id="FIELD_PTTL" className="txtBold"></div>
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
            </div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="18" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div><div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="18" className="sortable-item section-container SortableItem-sibling"><div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8" className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC"><div data-testid="embd-88uQIHR-EDUC" className="doc-item"><div data-testid="embd-88ciQTv" className="heading"><div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">EDUCATION<span data-testid="embd-88kl0Xw-text_1tUe18" title="Rename EDUCATION " className="ds-link ds-link-default rename-section text-rename"></span></div></div><div data-testid="embd-88aw0Ce-EDUC" className=""><div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8" id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner"><div data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="18" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="18" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-e0037f47-0bb8-4767-a441-48042b09746f" id="PARAGRAPH_EDUC_e0037f47-0bb8-4767-a441-48042b09746f" className="paragraph PARAGRAPH_EDUC firstparagraph"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn">
                    <span className="paddedline" dependency="GRYR|GRST|GRED|GRIP">
                        <span className="xslt_static_change displayNoneThisField">Expected in </span>
						<span id="FIELD_GRYR" format="%b %Y">2013</span>
						<span className="jobdates" id="FIELD_GRST" format="%b %Y"></span><span className="jobdates" id="FIELD_GRED" format="%b %Y"></span>
						
						<span id="FIELD_GRIP"></span>
                    </span>
                    <span className="paddedline" dependency="DGRE|STUY">
                        <span className="degree txtBold" id="FIELD_DGRE">NVQ Level 3</span><span dependency="DGRE+STUY"><span className="beforecolonspace">&nbsp;</span><span>: </span></span><span className="programline" id="FIELD_STUY">Health And Social Care</span>
                    </span>
                    <span className="paddedline" dependency="SCHO|SCIT|SSTA|SCNT|GRHN">
                        <span className="companyname" id="FIELD_SCHO">Edinburgh College</span><span dependency="SCHO"><span dependency="SCIT|SSTA|SCNT|GRHN"> |</span></span>
                        <span className="joblocation jobcity" id="FIELD_SCIT">Edinburgh</span><span className="joblocation jobstate" id="FIELD_SSTA"></span> <span className="joblocation jobcountry" id="FIELD_SCNT"></span><span dependency="SCIT|SSTA|SCNT"></span>
                        <span id="FIELD_GRHN"></span>
                    </span>
                    
                    
                    <span id="FIELD_FRFM"></span>
                </div>
            </div></div></div><div data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="18" className="sortable-item paragraph-container SortableItem-sibling"><button data-testid="embd-87gfxIF-EDUC" type="button" tabIndex={0} data-react-beautiful-dnd-drag-handle="18" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="btn-icon-tertiary btn-icon-move d-none"></button><div data-testid="embd-79HRa2m-e0037f47-0bb8-4767-a441-48042b09746f" id="PARAGRAPH_EDUC_e0037f47-0bb8-4767-a441-48042b09746f" className="paragraph PARAGRAPH_EDUC"><div data-testid="embd-78FzR29" className="clearfix doc-item">
                <div className="singlecolumn">
                    <span className="paddedline" dependency="GRYR|GRST|GRED|GRIP">
                        <span className="xslt_static_change displayNoneThisField">Expected in </span>
						<span id="FIELD_GRYR" format="%b %Y">2008</span>
						<span className="jobdates" id="FIELD_GRST" format="%b %Y"></span><span className="jobdates" id="FIELD_GRED" format="%b %Y"></span>
						
						<span id="FIELD_GRIP"></span>
                    </span>
                    <span className="paddedline" dependency="DGRE|STUY">
                        <span className="degree txtBold" id="FIELD_DGRE">NVQ Level 2</span><span dependency="DGRE+STUY"><span className="beforecolonspace">&nbsp;</span><span>: </span></span><span className="programline" id="FIELD_STUY">Health And Social Care</span>
                    </span>
                    <span className="paddedline" dependency="SCHO|SCIT|SSTA|SCNT|GRHN">
                        <span className="companyname" id="FIELD_SCHO">Edinburgh College</span><span dependency="SCHO"><span dependency="SCIT|SSTA|SCNT|GRHN"> |</span></span>
                        <span className="joblocation jobcity" id="FIELD_SCIT">Edinburgh</span><span className="joblocation jobstate" id="FIELD_SSTA"></span> <span className="joblocation jobcountry" id="FIELD_SCNT"></span><span dependency="SCIT|SSTA|SCNT"></span>
                        <span id="FIELD_GRHN"></span>
                    </span>
                    
                    
                    <span id="FIELD_FRFM"></span>
                </div>
            </div></div></div></div></div></div></div><button data-testid="embd-900sYS3" type="button" className="btn-icon-tertiary btn-icon-move d-none" style={{ right: '-114px' }}><i data-testid="embd-90rd2E3" tabIndex={0} data-react-beautiful-dnd-drag-handle="18" aria-roledescription="Draggable item. Press space bar to lift" draggable={false} className="icon-move" title="Move"></i></button></div></div></div><div></div></div></div>
    </>
  );
}
