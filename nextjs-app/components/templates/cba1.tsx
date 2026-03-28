/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations, formatDate } from "@/lib/translations";

// Helper function to get language level width percentage
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

// Helper function to get proficiency label
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

export default function TemplateCba1({
  data = sampleData,
  translations: t = translations.en,
  language = "en",
  colorHex = "#000000",
}: DynamicTemplateProps) {
  // Split skills into two columns
  const midpoint = Math.ceil(data.skills.length / 2);
  const skillsColumn1 = data.skills.slice(0, midpoint);
  const skillsColumn2 = data.skills.slice(midpoint);

  return (
    <>
      <style>{`
            html,
            body,
            div,
            span,
            applet,
            object,
            iframe,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            blockquote,
            pre,
            a,
            abbr,
            acronym,
            address,
            big,
            cite,
            code,
            del,
            dfn,
            em,
            font,
            img,
            ins,
            kbd,
            q,
            s,
            samp,
            small,
            strike,
            strong,
            sub,
            sup,
            tt,
            var,
            b,
            u,
            i,
            center,
            dl,
            dt,
            dd,
            ol,
            ul,
            li,
            fieldset,
            form,
            label,
            legend,
            table,
            caption,
            tbody,
            tfoot,
            thead,
            tr,
            th,
            td {
              margin: 0;
              padding: 0;
              border: 0;
              outline: 0;
              vertical-align: baseline;
              background: transparent
            }

            body {
              line-height: 1;
              text-align: left;
              font-feature-settings: "liga" 0;
              -moz-font-feature-settings: "liga" off
            }

            .skn-cba1 table {
              border-collapse: collapse;
              border-spacing: 0;
              font-size: inherit;
              color: inherit;
              width: 100%
            }

            .skn-cba1 {
              text-size-adjust: none;
              -ms-text-size-adjust: none;
              -moz-text-size-adjust: none;
              -webkit-text-size-adjust: none
            }

            .skn-cba1 span.jobtitle,
            .skn-cba1 span.companyname,
            .skn-cba1 span.degree,
            .skn-cba1 .txtBold {
              font-weight: bold
            }

            .skn-cba1 .txt-nrml {
              font-weight: 400
            }

            .skn-cba1 span.paddedline {
              display: block
            }

            .skn-cba1 .nodisplay,
            .skn-cba1 .logo {
              display: none
            }

            .skn-cba1 .flt-right {
              float: right
            }

            .skn-cba1 .dispInBlk {
              display: inline-block !important
            }

            .skn-cba1 .maxWidth {
              max-width: 100%
            }

            .skn-cba1 {
              word-wrap: break-word;
              color: #000;
              min-height: 792px
            }

            .skn-cba1 ul,
            .skn-cba1 li {
              list-style-type: disc;
              margin: 0 0 0 10px;
              padding: 0
            }

            .skn-cba1 ul li {
              margin: 0 0 0 13px
            }

            .skn-cba1 .adnlLnks ul {
              margin: 0
            }

            .skn-cba1 .address li,
            .skn-cba1 .address ul,
            .skn-cba1 .adnlLnks li {
              display: inline;
              margin: 0;
              padding: 0;
              list-style: none
            }

            .skn-cba1 .adnlLnks li {
              display: inline
            }

            .skn-cba1 .address li:before,
            .skn-cba1 .adnlLnks li:before {
              content: "\\2022\\0020";
              vertical-align: bottom
            }

            .skn-cba1 .address li.fielditem:before {
              padding-left: 4px
            }

            .skn-cba1 .address li.first:before,
            .skn-cba1 .address li:first-child:before,
            .skn-cba1 .adnlLnks li:first-child:before {
              content: " "
            }

            .skn-cba1 .address .fieldgroup:nth-child(2) {
              padding-top: 4px
            }

            .skn-cba1 .lowerborder {
              border-bottom: 1px solid;
              margin: 1px 0 2px 0;
              display: block
            }

            .skn-cba1 .lowerborder2 {
              border-top: 3px solid;
              display: block
            }

            .skn-cba1 .SECTION_CNTC,
            .skn-cba1 .SECTION_ALNK {
              margin-top: 0
            }

            .skn-cba1 .section.firstsection,
            .skn-cba1 .section.SECTION_ALNK {
              margin-top: 0
            }

            .skn-cba1 .name {
              font-size: 15px;
              line-height: 17px;
              font-weight: bold;
              font-variant: small-caps;
              text-align: center
            }

            .skn-cba1 .resumeTitle {
              text-align: center;
              color: #4a4a4a
            }

            .skn-cba1 .paragraph {
              position: relative
            }

            .skn-cba1 .heading {
              clear: both;
              font-weight: bold;
              width: 100%;
              flex-grow: 1
            }

            .skn-cba1 .address {
              position: relative;
              text-align: center;
              font-size: 0.917em;
              line-height: 1.25em;
              padding-top: 11px
            }

            .skn-cba1 .adnlLnks {
              text-align: center;
              padding-top: 6px
            }

            .skn-cba1 .address2 {
              position: relative;
              text-align: left;
              font-size: 0.917em;
              line-height: 1.25em
            }

            .skn-cba1 .table_wrapper {
              width: 100%;
              margin-top: 0
            }

            .skn-cba1 .skill {
              display: table;
              width: 100%;
              table-layout: fixed
            }

            .skn-cba1 table.twocol td {
              width: 50%;
              vertical-align: top;
              display: table-cell
            }

            .skn-cba1 table.skills th,
            .skn-cba1 table.skills td {
              width: 20%;
              text-align: center
            }

            .skn-cba1 table.skills th {
              text-decoration: underline
            }

            .skn-cba1 table.skills .skillname,
            .skn-cba1 table.skills .skillrating {
              text-align: left;
              width: 35%
            }

            .skn-cba1 table.skills .skillrating {
              width: 20%
            }

            .skn-cba1 table.skills .skillyears,
            .skn-cba1 table.skills .skilllast {
              width: 19%
            }

            .skn-cba1 table.skills .pad1 {
              width: 5%
            }

            .skn-cba1 table.skills .pad2,
            .skn-cba1 table.skills .pad3 {
              width: 1%
            }

            .skn-cba1 .totl-expr {
              display: inline-block;
              padding: 1px 6px;
              color: #fff;
              font-weight: 700;
              vertical-align: top;
              float: right
            }

            .skn-cba1.texp-curved .totl-expr {
              border-radius: 10px
            }

            /*Personal details section*/
            .skn-cba1 .pdet-sec .singlecolumn {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap
            }

            .skn-cba1 .details-wrap {
              width: 49%
            }

            /*FIX for FORCEFULLY making left margin ZERO for CL*/
            .skn-cba1 .sectionCL .paragraph {
              margin-top: 0
            }

            /* Style for Signature */
            .skn-cba1 .disclaim .singlecolumn,
            .skn-cba1 .signPic>.field_sign {
              margin-left: 0
            }

            .skn-cba1 .disclaim .singlecolumn,
            .skn-cba1 .disclaim .singlecolumn li,
            .skn-cba1 .disclaim .singlecolumn p,
            .skn-cba1 .disclaim .singlecolumn span {
              font-size: 9px;
              color: #8a8a8a
            }

            .skn-cba1 .field_sign {
              font-size: 7px;
              color: #8a8a8a
            }

            .skn-cba1 .txtleft+.field_sign {
              text-align: left
            }

            .skn-cba1 .txtcenter+.field_sign {
              text-align: center
            }

            .skn-cba1 .txtright+.field_sign {
              text-align: right
            }

            .skn-cba1 .signPic span:first-child {
              padding-right: 6px
            }

            .skn-cba1 .signPic img {
              padding-top: 5px;
              max-width: 100%
            }

            /*MES and MFR address order code*/
            .skn-cba1 .zipprefix,
            .skn-cba1.MES .zipsuffix,
            .skn-cba1.MFR .zipsuffix {
              display: none !important
            }

            .skn-cba1 .zipsuffix,
            .skn-cba1.MES .zipprefix,
            .skn-cba1.MFR .zipprefix {
              display: inline !important
            }

            /*Infographic*/
            .skn-cba1 .lang-sec,
            .skn-cba1 .skli-sec {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between
            }

            .skn-cba1 .lang-sec .field *,
            .skn-cba1 .lang-sec .nativeLangPara .field,
            .skn-cba1 .skli-sec .field * {
              display: inline
            }

            .skn-cba1 .lang-sec .paragraph,
            .skn-cba1 .skli-sec .paragraph {
              width: 48.5%;
              vertical-align: top;
              padding-bottom: 5px;
              margin-top: 0
            }

            .skn-cba1 .lang-sec .singlecolumn,
            .skn-cba1 .skli-sec .singlecolumn {
              margin-left: 0;
              position: relative
            }

            .skn-cba1 .rating-bar {
              background: #d5d6d6;
              width: 100%;
              clear: both;
              margin-top: 3px;
              overflow: hidden
            }

            .skn-cba1 .lang-sec .paragraph.nativeLangPara {
              width: 100%
            }

            .skn-cba1 .inner-rating {
              background-color: #d76d76;
              height: 4px;
              width: 60%
            }

            .skn-cba1 .lang-sec>.paragraph:nth-last-child(1),
            .skn-cba1 .lang-sec>.paragraph:nth-last-child(2),
            .skn-cba1 .skli-sec>.paragraph:nth-last-child(1),
            .skn-cba1 .skli-sec>.paragraph:nth-last-child(2) {
              padding-bottom: 0
            }

            .skn-cba1 .hide-bar .rating-bar,
            .skn-cba1 .hide-colon .paragraph .colon,
            .skn-cba1 .hide-only-bar .rating-bar {
              display: none
            }

            .skn-cba1 .skli-sec .paragraph:nth-last-child(1) .singlecolumn .field:last-child,
            .skn-cba1 .skli-sec .paragraph:nth-last-child(2) .singlecolumn .field:last-child {
              min-height: 0
            }

            /*For Extra Space Before Colon*/
            .skn-cba1 .beforecolonspace {
              display: none !important
            }

            .skn-cba1.MFR .beforecolonspace {
              display: inline !important
            }

            .skn-cba1.MDE .hide-de {
              display: none
            }

            /*HILT multi para/section*/
            .skn-cba1 .multi-para-hilt:after {
              content: "";
              display: block;
              clear: both;
              visibility: hidden;
              line-height: 0;
              height: 0
            }

            /*Clearfix*/
            .skn-cba1 .multi-para-hilt .paragraph {
              margin-bottom: 10px;
              margin-top: 0;
              width: 49%;
              float: left
            }

            .skn-cba1 .multi-para-hilt .paragraph:last-child,
            .skn-cba1 .multi-para-hilt .paragraph:nth-last-child(2):nth-child(2n) {
              margin-bottom: 0
            }

            .skn-cba1 .multi-para-hilt .paragraph:nth-child(2n+1) {
              margin-left: 2%
            }

            .skn-cba1 .multi-para-hilt .paragraph:nth-child(2n) {
              clear: left
            }

            .skn-cba1 .multi-para-hilt .singlecolumn {
              margin: 0
            }

            .skn-cba1 .multi-section-hilt .multi-para-opt,
            .skn-cba1 .section:not(.multi-para-hilt):not(.multi-section-hilt) .multi-para-opt,
            .skn-cba1 .multi-para-hilt .twocol.skill {
              display: none
            }

            /* GRYR */
            .skn-cba1 .displayNoneThisField {
              display: none
            }

            /* Keep this class always at bottom */

            /* Text alignment bullet */
            .skn-cba1 .ttc-align-left ul {
              text-align: left
            }

            .skn-cba1 .ttc-align-right ul {
              text-align: right
            }

            .skn-cba1 .ttc-align-center ul {
              text-align: center
            }

            .skn-cba1 .ttc-align-justify ul {
              text-align: justify
            }

            .skn-cba1 .ttc-align-right li,
            .skn-cba1 .ttc-align-center li {
              position: relative;
              list-style-position: inside;
              margin-left: 0
            }

            .skn-cba1:not(.for-pdf) .ttc-align-right li:first-letter,
            .skn-cba1:not(.for-pdf) .ttc-align-center li:first-letter {
              margin-left: -3px
            }


            .skn-cba1,
            .skn-cba1 table {
              line-height: 13px
            }

            .skn-cba1.pagesize {
              width: 535px
            }

            .skn-cba1.fontsize,
            .skn-cba1 .lang-sec .paragraph *,
            .skn-cba1 .skli-sec .paragraph * {
              font-size: 11px
            }

            .skn-cba1.fontface {
              font-family: Palatino Linotype
            }

            .skn-cba1.vmargins {
              padding-top: 25px;
              padding-bottom: 25px
            }

            .skn-cba1.hmargins {
              padding-left: 30px;
              padding-right: 30px
            }

            .skn-cba1 .section {
              margin-top: 6px
            }

            .skn-cba1 .disclaim {
              margin: 0;
              padding: 0;
              margin-top: 30px
            }

            .skn-cba1 .sectiontitle {
              font-size: 13px;
              line-height: 15px
            }

            .skn-cba1 .heading {
              margin-bottom: 3px
            }

            .skn-cba1 .paragraph {
              margin-top: 6px
            }

            .skn-cba1 .firstparagraph {
              margin-top: 0
            }

            .skn-cba1 .singlecolumn,
            .skn-cba1 .maincolumn,
            .skn-cba1 .multi-para-hilt {
              margin-left: 0px
            }

            .skn-cba1 table.skills td {
              padding-top: 3px
            }

            .skn-cba1 .name {
              font-size: 23px;
              line-height: 31px
            }

            .skn-cba1 .resumeTitle {
              font-size: 15px;
              line-height: 25px;
              padding: 0 0 6px 0
            }

            .skn-cba1 .PARAGRAPH_PRFL .address,
            .skn-cba1 .PARAGRAPH_CLPRFL .address {
              font-size: 10px;
              line-height: 12px;
              padding-top: 4px
            }

            .skn-cba1 .address li:before {
              font-size: 13px
            }

            .skn-cba1 .name,
            .skn-cba1 .sectiontitle {
              color: #000000
            }

            .skn-cba1 .lowerborder,
            .skn-cba1 .lowerborder2 {
              border-color: #000000
            }

            .skn-cba1 .skli-sec .singlecolumn .field:last-child {
              min-height: 13px
            }

            .skn-cba1 .totl-expr {
              background-color: #000000;
              font-size: 8px;
              line-height: 12px
            }

            /*FIX for Re-calculating width of singlecolumn for CL*/
            .skn-cba1 .sectionCL .singlecolumn {
              margin-left: 0;
              width: 100%
            }

            .skn-cba1 .address2 {
              font-size: 11px;
              line-height: 13px
            }

            /*Infographic*/
            .skn-cba1 .lang-sec,
            .skn-cba1 .skli-sec {
              padding-left: 0px
            }

            .skn-cba1 .lang-sec .heading,
            .skn-cba1 .skli-sec .heading,
            .skn-cba1 .multi-para-hilt .heading {
              margin-left: -0px
            }

            .skn-cba1 .lang-sec .paragraph,
            .skn-cba1 .skli-sec .paragraph {
              width: 48.5%
            }

            .skn-cba1 .inner-rating {
              background-color: #000000
            }

            .skn-cba1 .lang-sec .heading,
            .skn-cba1 .skli-sec .heading {
              width: calc(100% + 0px)
            }

            .skn-cba1 .lang-sec .sortable-item,
            .skn-cba1 .skli-sec .sortable-item {
              vertical-align: top
            }

            .skn-cba1 .data-LNGG .doc-item,
            .skn-cba1 .data-SKLI .doc-item {
              width: 100%
            }

            .skn-cba1 .data-LNGG .sortableInner,
            .skn-cba1 .data-SKLI .sortableInner,
            .skn-cba1 .SECTION_LNGG .sortableInner,
            .skn-cba1 .SECTION-SKLI .sortableInner {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between
            }

            .skn-cba1 .data-LNGG .sortable-item,
            .skn-cba1 .data-SKLI .sortable-item {
              width: 48.5%
            }

            .skn-cba1 .data-LNGG .sortable-item .paragraph,
            .skn-cba1 .data-SKLI .sortable-item .paragraph {
              width: 100%;
              max-width: 100%
            }

            .skn-cba1 .lang-sec .native-lang {
              width: 100%
            }

            /*Finalize Fixes*/
            .skn-cba1 .sortable-item i.far.fa-check {
              font-family: "Font Awesome 5 Pro"
            }

            .page-finalize .skn-cba1 .sortableInner .paragraph-container+.paragraph-container {
              margin: 0
            }

            .skn-cba1 .lang-sec .sortableInner .sortable-item:not(:first-child) .paragraph,
            .skn-cba1 .skli-sec .sortableInner .sortable-item:not(:first-child) .paragraph {
              vertical-align: top
            }

            /*Fixes for builder for skill*/
            .skn-cba1 .skli-sec .sortable-item .paragraph:last-child .singlecolumn .field:last-child {
              min-height: 13px
            }

            .skn-cba1 .skli-sec .sortable-item:nth-last-child(1) .paragraph .singlecolumn .field:last-child,
            .skn-cba1 .skli-sec .sortable-item:nth-last-child(2) .paragraph .singlecolumn .field:last-child {
              min-height: 0
            }

            .skn-cba1 .lang-sec .sortableInner>.sortable-item:nth-last-child(1) .paragraph,
            .skn-cba1 .lang-sec .sortableInner>.sortable-item:nth-last-child(2) .paragraph,
            .skn-cba1 .skli-sec .sortableInner>.sortable-item:nth-last-child(1) .paragraph,
            .skn-cba1 .skli-sec .sortableInner>.sortable-item:nth-last-child(2) .paragraph {
              padding-bottom: 0 !important
            }

            .skn-cba1 .paragraph-fieldgroup .address ul {
              display: block
            }

            /*PDF Flex Handling Code - Personal Information*/
            .skn-cba1.for-pdf .pdfpdwrapper {
              display: block
            }

            .skn-cba1.for-pdf .pdfpdwrapper .details-wrap:first-child {
              float: left;
              padding-right: 5px
            }

            .skn-cba1.for-pdf .pdfpdwrapper .details-wrap:nth-child(2) {
              float: right
            }

            .skn-cba1.for-pdf .pdfpdwrapper .details-wrap {
              width: 265px !important;
            }

            /*CSS for Infographic PDFWrapper*/
            .skn-cba1.for-pdf .lang-sec,
            .skn-cba1.for-pdf .skli-sec {
              display: block;
            }

            .skn-cba1.for-pdf .section .pdfinfwrapper {
              display: block;
              width: 100%
            }

            .skn-cba1.for-pdf .section .pdfinfwrapper:after {
              content: '';
              clear: both;
              display: table
            }

            .skn-cba1.for-pdf .section .pdfinfwrapper .paragraph:first-child {
              float: left
            }

            .skn-cba1.for-pdf .section .pdfinfwrapper .paragraph:nth-child(2) {
              float: right
            }

            .skn-cba1.for-pdf .section .pdfinfwrapper .paragraph {
              margin-bottom: 5px;
              padding-bottom: 0px;
            }

            .skn-cba1.for-pdf .section .pdfinfwrapper:last-child .paragraph {
              margin-bottom: 0
            }

            .skn-cba1.for-pdf .section .pdfinfwrapper .paragraph {
              clear: none;
            }

            .skn-cba1.for-pdf .totl-expr {
              padding: 1px 6px 1.5px
            }
          `}</style>
      <div className="svg-skin ">
      <div data-testid="embd-98t1CZ7" className="" tabIndex={0}>
        <div>


        </div>
        <div data-testid="embd-95CA90b"
          className="document doc-root doc-finalize fontsize fontface vmargins hmargins pgsz-a4 pagesize skn-cba1 CBA1 MUK    texp-rectangle"
          docskinwidth="535" >
          <div data-testid="embd-91y4rV2" className="name-contact ">
            <div></div>
            <div></div>
            <div data-testid="embd-88MByq6-PRFL" id="SECTION_PRFL30868c37-6fcc-4b70-b87a-afd2447ce0d4"
              className="section-prfl section SECTION_PRFL firstsection" data-section-cd="PRFL">
              <div data-testid="embd-88uQIHR-PRFL" className="doc-item">
                <div data-testid="embd-88aw0Ce-PRFL" className="">
                  <div data-testid="embd-654vWVD6" className="">
                    <div data-testid="embd-79HRa2m-04f55583-5181-435c-8336-f48964adf912"
                      id="PARAGRAPH_PRFL_04f55583-5181-435c-8336-f48964adf912"
                      className="paragraph PARAGRAPH_PRFL firstparagraph">
                      <div data-testid="embd-78KlmQp">
                        <div className="name">
                          <span id="FIELD_FNAM" data-uppercase="true">{data.first_name}</span>
                          <span dependency="FNAM+LNAM"></span>
                          <span id="FIELD_LNAM" data-uppercase="true">{data.last_name}</span>
                        </div>

                        <div className="lowerborder"></div>
                        <div className="lowerborder2"></div>
                        <div className="address SECTION_CNTC">
                          <ul>
                            <li className="first zipsuffix" dependency="ADDR|STRT|CITY|STAT|ZIPC">
                              <span id="FIELD_STRT">{data.street_address}</span><span dependency="STRT"><span
                                  dependency="CITY|STAT">, </span></span>
                              <span className="spaced" id="FIELD_CITY">{data.city}</span>
                              <span className="spaced" id="FIELD_STAT"></span>
                              <span className="spaced" id="FIELD_ZIPC">{data.postcode}</span>
                              <span id="FIELD_ADDR"></span>
                            </li>

                            {data.phone && (
                              <li dependency="HPHN" className="dispInBlk maxWidth">
                                <span id="FIELD_HPHN">{data.phone}</span>
                              </li>
                            )}

                            {data.email && (
                              <li className="dispInBlk maxWidth"><span id="FIELD_EMAI">{data.email}</span></li>
                            )}
                          </ul>
                        </div>

                        {(data.nationality || data.driving_license || data.website || data.linkedin) && (
                          <div className="address" dependency="DOB1|NTLY|WPMT|IDNV|IDNT|DRIV|MSTA|WEB1|SOCL|VDCV|PRTF|AVAI">
                            <ul>
                              {data.nationality && (
                                <li dependency="NTLY" className="dispInBlk maxWidth">
                                  <span className="txtBold"><span id="DOCDATAINFO_NTLY" className="xslt_static_change">Nationality</span><span className="beforecolonspace"> </span><span>: </span></span><span id="FIELD_NTLY">{data.nationality}</span>
                                </li>
                              )}
                              {data.driving_license && (
                                <li dependency="DRIV" className="dispInBlk maxWidth">
                                  <span className="txtBold"><span id="DOCDATAINFO_DRIV" className="xslt_static_change">Permit</span><span className="beforecolonspace"> </span><span>: </span></span><span id="FIELD_DRIV">{data.driving_license}</span>
                                </li>
                              )}
                              {data.website && (
                                <li dependency="WEB1" className="dispInBlk maxWidth">
                                  <span className="txtBold"><span className="xslt_static_change">Web</span><span className="beforecolonspace"> </span><span>: </span></span><span id="FIELD_WEB1">{data.website}</span>
                                </li>
                              )}
                              {data.linkedin && (
                                <li dependency="SOCL" className="maxWidth" id="CATEGORY_SOCIAL_SOCL">
                                  <span className="dispInBlk">
                                    <span className="txtBold"><span id="DOCDATAINFO_SOCL">LinkedIn</span><span className="beforecolonspace"> </span><span>: </span></span><span className="brk-all" id="FIELD_SOCL">{data.linkedin}</span>
                                  </span>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div data-testid="embd-89XOkPJ0" className="parent-wrapper">
            {/* Professional Summary */}
            {data.summary && (
              <div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="27"
                className="sortable-item section-container SortableItem-sibling">
                <div data-testid="embd-88MByq6-SUMM" id="SECTION_SUMMaae374b0-0228-4808-a3fe-b04cc0c571fb"
                  className="section SECTION_SUMM has-title" data-section-cd="SUMM">
                  <div data-testid="embd-88uQIHR-SUMM" className="doc-item">
                    <div data-testid="embd-88ciQTv" className="heading">
                      <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_SUMM">{t.professional_summary.toUpperCase()}<span
                          data-testid="embd-88kl0Xw-text_1tUe18" title="Rename PROFESSIONAL SUMMARY "
                          className="ds-link ds-link-default rename-section text-rename"></span></div>
                    </div>
                    <div data-testid="embd-88aw0Ce-SUMM" className="">
                      <div data-testid="embd-654vWVD6" className="">
                        <div data-testid="embd-79HRa2m-f6669442-f38f-e0e2-fad7-6104f95f3e6d"
                          id="PARAGRAPH_SUMM_f6669442-f38f-e0e2-fad7-6104f95f3e6d"
                          className="paragraph PARAGRAPH_SUMM firstparagraph">
                          <div data-testid="embd-78FzR29" className="clearfix doc-item">
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

            {/* Work Experience */}
            {data.experiences.length > 0 && (
              <div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="27"
                className="sortable-item section-container SortableItem-sibling">
                <div data-testid="embd-88MByq6-EXPR" id="SECTION_EXPR313e1c77-349e-497b-bdb6-f0271f1e85bf"
                  className="section SECTION_EXPR multi-para has-title" data-section-cd="EXPR">
                  <div data-testid="embd-88uQIHR-EXPR" className="doc-item">
                    <div data-testid="embd-88ciQTv" className="heading">
                      <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EXPR">{t.work_history}<span
                          data-testid="embd-88kl0Xw-text_1tUe18" title="Rename Work history "
                          className="ds-link ds-link-default rename-section text-rename"></span></div>
                    </div>
                    <div data-testid="embd-88aw0Ce-EXPR" className="">
                      <div data-testid="embd-87S8HNi313e1c77-349e-497b-bdb6-f0271f1e85bf"
                        id="CONTAINER_313e1c77-349e-497b-bdb6-f0271f1e85bf" className="sortableInner">
                        {data.experiences.map((exp, index) => (
                          <div key={exp.id} data-testid="embd-87je894-EXPR" data-react-beautiful-dnd-draggable="27"
                            className="sortable-item paragraph-container SortableItem-sibling">
                            <div data-testid={`embd-79HRa2m-${exp.id}`}
                              id={`PARAGRAPH_EXPR_${exp.id}`}
                              className={`paragraph PARAGRAPH_EXPR ${index === 0 ? 'firstparagraph' : ''}`}>
                              <div data-testid="embd-78FzR29" className="clearfix doc-item">
                                <div className="singlecolumn">
                                  <span className="paddedline" dependency="JTIT|JSTD|EDDT|TEXP">
                                    <span className="jobtitle" id="FIELD_JTIT">{exp.job_title}</span><span
                                      dependency="JTIT"><span dependency="JSTD|EDDT">,</span></span>
                                    <span className="jobdates" id="FIELD_JSTD" format="%m/%Y">{formatDate(exp.start_date, language)}</span><span
                                      dependency="JSTD+EDDT"> - </span><span className="jobdates" id="FIELD_EDDT"
                                      format="%m/%Y">{exp.currently_working ? t.present : formatDate(exp.end_date, language)}</span>
                                  </span>
                                  <span className="paddedline" dependency="COMP|JSTA|JCIT|JCNT|JCTR">
                                    <span className="companyname" id="FIELD_COMP">{exp.company}</span><span
                                      dependency="COMP"><span dependency="JCIT|JSTA|JCNT|JCTR"> - </span></span>
                                    <span className="joblocation jobcity" id="FIELD_JCIT">{exp.location}</span><span
                                      dependency="JCIT"></span><span className="joblocation jobstate"
                                      id="FIELD_JSTA"></span><span className="joblocation jobcountry"
                                      id="FIELD_JCNT"></span><span dependency="JCIT|JSTA|JCNT"></span><span
                                      id="FIELD_JCTR"></span>
                                  </span>
                                  {exp.description && (
                                    <span className="jobline" id="FIELD_JDES">
                                      <ul>
                                        {exp.description.split('\n').map((line, i) => (
                                          <li key={i}>{line}</li>
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

            {/* Skills */}
            {data.skills.length > 0 && (
              <div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="27"
                className="sortable-item section-container SortableItem-sibling">
                <div data-testid="embd-88MByq6-HILT" id="SECTION_HILT66551e16-9025-4c6a-88fd-21c891f7b2b4"
                  className="section SECTION_HILT has-title" data-section-cd="HILT">
                  <div data-testid="embd-88uQIHR-HILT" className="doc-item">
                    <div data-testid="embd-88ciQTv" className="heading">
                      <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_HILT">{t.skills.toUpperCase()}<span
                          data-testid="embd-88kl0Xw-text_1tUe18" title="Rename SKILLS "
                          className="ds-link ds-link-default rename-section text-rename"></span></div>
                    </div>
                    <div data-testid="embd-88aw0Ce-HILT" className="">
                      <div data-testid="embd-654vWVD6" className="">
                        <div data-testid="embd-79HRa2m-f6d39a0e-45b4-431c-82b8-567b069b1da4"
                          id="PARAGRAPH_HILT_f6d39a0e-45b4-431c-82b8-567b069b1da4"
                          className="paragraph PARAGRAPH_HILT firstparagraph">
                          <div data-testid="embd-78FzR29" className="clearfix doc-item">
                            <div className="singlecolumn maincolumn">
                              <table className="twocol skill">
                                <tbody>
                                  <tr>
                                    <td className="twocol_1" id="FIELD_SKC1">
                                      <ul>
                                        {skillsColumn1.map((skill) => (
                                          <li key={skill.id}>{skill.name}</li>
                                        ))}
                                      </ul>
                                    </td>
                                    <td className="twocol_2" id="FIELD_SKC2">
                                      <ul>
                                        {skillsColumn2.map((skill) => (
                                          <li key={skill.id}>{skill.name}</li>
                                        ))}
                                      </ul>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Education */}
            {data.educations.length > 0 && (
              <div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="27"
                className="sortable-item section-container SortableItem-sibling">
                <div data-testid="embd-88MByq6-EDUC" id="SECTION_EDUCfd38dd6c-e289-4f1b-96e2-457086a24cc8"
                  className="section SECTION_EDUC multi-para has-title" data-section-cd="EDUC">
                  <div data-testid="embd-88uQIHR-EDUC" className="doc-item">
                    <div data-testid="embd-88ciQTv" className="heading">
                      <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_EDUC">{t.education.toUpperCase()}<span
                          data-testid="embd-88kl0Xw-text_1tUe18" title="Rename EDUCATION "
                          className="ds-link ds-link-default rename-section text-rename"></span></div>
                    </div>
                    <div data-testid="embd-88aw0Ce-EDUC" className="">
                      <div data-testid="embd-87S8HNifd38dd6c-e289-4f1b-96e2-457086a24cc8"
                        id="CONTAINER_fd38dd6c-e289-4f1b-96e2-457086a24cc8" className="sortableInner">
                        {data.educations.map((edu, index) => (
                          <div key={edu.id} data-testid="embd-87je894-EDUC" data-react-beautiful-dnd-draggable="27"
                            className="sortable-item paragraph-container SortableItem-sibling">
                            <div data-testid={`embd-79HRa2m-${edu.id}`}
                              id={`PARAGRAPH_EDUC_${edu.id}`}
                              className={`paragraph PARAGRAPH_EDUC ${index === 0 ? 'firstparagraph' : ''}`}>
                              <div data-testid="embd-78FzR29" className="clearfix doc-item">
                                <div className="singlecolumn">
                                  <span className="paddedline" dependency="GRYR|STUY|DGRE|GRST|GRED|GRIP">
                                    {edu.degree && (
                                      <>
                                        <span className="degree" id="FIELD_DGRE">{edu.degree}</span>
                                        <span dependency="DGRE+STUY"><span className="beforecolonspace"> </span><span>: </span></span>
                                      </>
                                    )}
                                    <span className="programline" id="FIELD_STUY">{edu.field_of_study}</span>
                                    <span dependency="DGRE|STUY"><span dependency="GRYR|GRST|GRED">, </span></span>
                                    <span className="xslt_static_change displayNoneThisField">Expected in </span>
                                    <span id="FIELD_GRYR" format="%m/%Y">{edu.end_date ? new Date(edu.end_date).getFullYear() : ''}</span>
                                    <span className="jobdates" id="FIELD_GRST" format="%m/%Y"></span>
                                    <span className="jobdates" id="FIELD_GRED" format="%m/%Y"></span>
                                    <span id="FIELD_GRIP"></span>
                                  </span>
                                  <span className="paddedline" dependency="SCIT|SCHO|SSTA|SCNT|GRHN">
                                    <span className="companyname companyname_educ" id="FIELD_SCHO">{edu.institution}</span>
                                    <span dependency="SCHO"><span dependency="SCIT|SSTA|SCNT"> - </span></span>
                                    <span className="joblocation jobcity" id="FIELD_SCIT">{edu.location}</span>
                                    <span dependency="SCIT"></span>
                                    <span className="joblocation jobstate" id="FIELD_SSTA"></span>
                                    <span className="joblocation jobcountry" id="FIELD_SCNT"></span>
                                    <span dependency="SCIT|SCHO|SSTA|SCNT"></span>
                                    <span id="FIELD_GRHN"></span>
                                  </span>
                                  <span id="FIELD_FRFM"></span>
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

            {/* Languages */}
            {data.languages.length > 0 && (
              <div data-testid="embd-89Z70JT" data-react-beautiful-dnd-draggable="27"
                className="sortable-item section-container SortableItem-sibling">
                <div data-testid="embd-88MByq6-LNGG" id="SECTION_LNGG88bc36a1-247b-b72f-7918-a79948b8fc80"
                  className="section lang-sec hide-colon SECTION_LNGG has-title data-LNGG" data-section-cd="LNGG">
                  <div data-testid="embd-88uQIHR-LNGG" className="doc-item">
                    <div data-testid="embd-88ciQTv" className="heading">
                      <div data-testid="embd-88NTvWF" className="sectiontitle" id="SECTIONNAME_LNGG">{t.languages.toUpperCase()}<span
                          data-testid="embd-88kl0Xw-text_1tUe18" title="Rename LANGUAGES "
                          className="ds-link ds-link-default rename-section text-rename"></span></div>
                    </div>
                    <div data-testid="embd-88aw0Ce-LNGG" className="">
                      <div data-testid="embd-87S8HNi88bc36a1-247b-b72f-7918-a79948b8fc80"
                        id="CONTAINER_88bc36a1-247b-b72f-7918-a79948b8fc80" className="sortableInner">
                        {data.languages.map((lang, index) => (
                          <div key={lang.id} data-testid="embd-87je894-LNGG" data-react-beautiful-dnd-draggable="27"
                            className="sortable-item paragraph-container SortableItem-sibling">
                            <div data-testid={`embd-79HRa2m-${lang.id}`}
                              id={`PARAGRAPH_LNGG_${lang.id}`}
                              className={`paragraph PARAGRAPH_LNGG ${index === 0 ? 'firstparagraph' : ''} ${index % 2 === 0 ? 'para_odd' : 'para_even'}`}>
                              <div data-testid="embd-78FzR29" className="clearfix doc-item">
                                <div className="singlecolumn">
                                  <div className="field">
                                    <span className="txtBold" id="FIELD_FRFM">{lang.name}</span>
                                    <span dependency="FRFM" className="colon"><span className="beforecolonspace"> </span><span>: </span></span>
                                  </div>
                                  <div className="rating-bar" dependency="RATV">
                                    <div className="inner-rating" id="FIELD_RATV" style={{ width: getLevelWidth(lang.level) }}></div>
                                  </div>
                                  <div className="field">
                                    <span id="FIELD_RATT">{getProficiencyLabel(lang.proficiency, t)}</span>
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
        <div></div>
      </div>
    </div>
    </>
  );
}
