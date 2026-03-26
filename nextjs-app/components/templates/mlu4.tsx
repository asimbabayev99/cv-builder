/* eslint-disable */
// @ts-nocheck
import { sampleData } from "./sampleData";
import type { ResumeData } from "@/types/resume";

const defaultTranslations = {
  summary: "Professional Summary",
  experience: "Work History",
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
  return `${month}/${year}`;
}

interface DynamicTemplateProps {
  data: ResumeData;
  translations: typeof defaultTranslations;
  language: string;
  colorHex: string;
}

export default function TemplateMlu4({
  data = sampleData,
  translations: t = defaultTranslations,
  language = "en",
  colorHex = "#2b2b2b",
}: Partial<DynamicTemplateProps> = {}) {
  const getLanguageWidth = (level: number) => {
    return `${(level / 5) * 100}%`;
  };

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
              text-align: left;
              font-feature-settings: "liga" 0;
              -moz-font-feature-settings: "liga" off
            }

            .skn-mlu4 table {
              border-collapse: collapse;
              border-spacing: 0;
              font-size: inherit;
              color: inherit;
              width: 100%
            }

            /*START content disc style for LI*/
            .skn-mlu4 ul,
            .skn-mlu4 li {
              list-style: none;
              margin: 0;
              padding: 0
            }

            .skn-mlu4 ul li {
              position: relative;
              margin: 0px;
              padding-left: 8px
            }

            .skn-mlu4 ul li:before {
              content: '\\2022';
              font-size: 9px;
              position: absolute;
              left: 0;
              top: 0
            }

            .skn-mlu4 .jobline ul,
            .skn-mlu4 .education .field ul {
              margin-top: 10px
            }

            /*END content disc style for LI*/

            .skn-mlu4 .clear {
              clear: both;
              height: 0
            }

            .skn-mlu4 .txt-bold {
              font-weight: bold
            }

            .skn-mlu4 .txtItl {
              font-style: italic
            }

            .skn-mlu4 .paddedline {
              display: block
            }

            .skn-mlu4 .flt-right {
              float: right
            }

            .skn-mlu4 .nospace {
              word-break: break-all
            }

            .skn-mlu4 .ttc-align-left ul {
              text-align: left
            }

            .skn-mlu4 .ttc-align-right ul {
              text-align: right
            }

            .skn-mlu4 .ttc-align-center ul {
              text-align: center
            }

            .skn-mlu4 .ttc-align-justify ul {
              text-align: justify
            }

            .skn-mlu4 .ttc-align-right li:before,
            .skn-mlu4 .ttc-align-center li:before {
              position: relative;
              left: -2px
            }

            .skn-mlu4 {
              color: #242424;
              line-height: 16px;
              font-variant-ligatures: none;
              min-height: 792px
            }

            .skn-mlu4 table.skills,
            .skn-mlu4 .table_wrapper {
              width: 100%;
              margin-top: 0
            }

            .skn-mlu4 table.skills th,
            .skn-mlu4 table.skills td {
              width: 20%;
              text-align: center
            }

            .skn-mlu4 table.skills .skillname,
            .skn-mlu4 table.skills .skillrating {
              text-align: left;
              width: 35%
            }

            .skn-mlu4 table.skills .skillrating {
              width: 20%
            }

            .skn-mlu4 table.skills .skillyears,
            .skn-mlu4 table.skills .skilllast {
              width: 19%
            }

            .skn-mlu4 table.skills .pad1 {
              width: 5%
            }

            .skn-mlu4 table.skills .pad2,
            .skn-mlu4 table.skills .pad3 {
              width: 1%
            }

            .skn-mlu4 .name {
              color: #4a4a4a;
              font-weight: bold;
              padding: 0 0 10px 0;
              text-align: left;
              position: relative;
              word-wrap: break-word
            }

            .skn-mlu4 .resumeTitle {
              color: #4a4a4a;
              font-weight: bold
            }

            .skn-mlu4 .right-box .address .singlecolumn {
              color: #3b3b3b;
              margin-left: 0
            }

            .skn-mlu4 .parentContainer {
              display: table;
              table-layout: fixed;
              width: 100%;
              min-height: inherit;
              word-wrap: break-word
            }

            .skn-mlu4 .totl-expr {
              display: inline-block;
              padding: 0 6px;
              color: #fff;
              font-weight: 700;
              vertical-align: top;
              float: right;
              font-style: italic;
              background-color: ${colorHex}
            }

            .skn-mlu4.texp-curved .totl-expr {
              border-radius: 10px
            }

            .skn-mlu4 .left-box .totl-expr {
              display: none
            }

            /* Common style for left and right box */
            .skn-mlu4 .right-box {
              padding: 25px;
              display: table-cell;
              vertical-align: top;
              letter-spacing: 0.2px
            }

            .skn-mlu4 .left-box .section[id^="SECTION_PICT"]+.section {
              padding-top: 20px
            }

            .skn-mlu4 .left-box {
              background-color: ${colorHex};
              display: table-cell;
              overflow: hidden;
              background-size: 100%;
              color: #fff;
              padding: 25px;
              box-sizing: content-box
            }

            .skn-mlu4 .left-box .section {
              padding-left: 10px;
              padding-right: 10px
            }

            .skn-mlu4 .left-box .section:not(:empty) {
              border-bottom: 1px solid #9b9b9b
            }

            .skn-mlu4 .left-box .section:first-child,
            .skn-mlu4 .right-box .section:first-child {
              padding-top: 0px
            }

            .skn-mlu4 .left-box .section.pict-sec {
              padding-top: 0;
              padding-bottom: 0;
              margin-bottom: 25px;
              border: none;
              text-align: center;
              position: relative
            }

            .skn-mlu4 .left-box .section:first-child .paragraph {
              padding: 0;
              display: block
            }

            .skn-mlu4 .left-box .section:last-of-type {
              border: none
            }

            .skn-mlu4 .left-box .heading,
            .skn-mlu4 .right-box .paragraph {
              padding: 0
            }

            /* PRFL */
            .skn-mlu4 .prflPic,
            .skn-mlu4 .prflPic .field {
              vertical-align: middle;
              margin: auto;
              text-align: center
            }

            .skn-mlu4 .prflPic img {
              display: block;
              object-fit: cover;
              width: 130px;
              height: 167px
            }

            /* Heading */
            .skn-mlu4 .heading {
              font-weight: bold;
              line-height: 15px;
              margin-bottom: 10px;
              text-transform: uppercase
            }

            .skn-mlu4 .sectiontitle,
            .skn-mlu4 .parentContainer .left-box .singlecolumn {
              word-wrap: break-word
            }

            .skn-mlu4 .right-box .heading {
              letter-spacing: 0
            }

            .skn-mlu4 .jobdates {
              font-size: 10px;
              font-style: italic
            }

            /* section */
            .skn-mlu4 .right-box .section.firstsection,
            .skn-mlu4 .right-box .section.SECTION_CNTC {
              padding-top: 0
            }

            .skn-mlu4 .right-box .firstsection+.section {
              padding-top: 0px
            }

            .skn-mlu4 .section:empty {
              display: none
            }

            .skn-mlu4 .septr:before {
              content: "|";
              font-size: 9px;
              vertical-align: top;
              padding-left: 2px;
              padding-right: 2px
            }

            .skn-mlu4 .education .joblocation {
              font-style: italic
            }

            .skn-mlu4 .left-box .section[id^="SECTION_PICT"]:after {
              display: none
            }

            .skn-mlu4 .left-box .section:after {
              content: '';
              display: block
            }

            /* Circle SVG */
            .skn-mlu4 .wrap {
              word-wrap: break-word
            }

            .skn-mlu4 .address {
              text-align: left
            }

            .skn-mlu4 .adrs-field {
              display: table;
              table-layout: fixed;
              width: 100%;
              position: relative;
              margin-bottom: 10px;
              min-height: 14px
            }

            .skn-mlu4 .adrs-field:last-child {
              margin-bottom: 0
            }

            .skn-mlu4 .adrs-field .circle {
              position: relative;
              border-radius: 100%;
              height: 20px;
              width: 20px;
              display: table-cell;
              text-align: center;
              font-size: 9px;
              box-sizing: border-box;
              fill: #fff;
              vertical-align: middle
            }

            .skn-mlu4 .address .adrs-field>.addrCircle {
              display: table-cell;
              padding-left: 11px;
              box-sizing: border-box;
              vertical-align: middle
            }

            .skn-mlu4 .adrs-field svg {
              width: 20px;
              height: 20px;
              vertical-align: middle
            }

            /*New logic for infographic*/
            .skn-mlu4 .lang-sec .singlecolumn,
            .skn-mlu4 .skli-sec .singlecolumn {
              display: none
            }

            .skn-mlu4 .lang-sec.infobarsec .infobarpara,
            .skn-mlu4 .skli-sec.infobarsec .infobarpara,
            .skn-mlu4 .lang-sec.infotilesec .infotilepara,
            .skn-mlu4 .skli-sec.infotilesec .infotilepara {
              display: block
            }

            /*Infographic Bar*/
            .skn-mlu4 .lang-sec.infobarsec,
            .skn-mlu4 .skli-sec.infobarsec {
              font-size: 0
            }

            .skn-mlu4 .lang-sec.infobarsec .field *,
            .skn-mlu4 .skli-sec.infobarsec .field *,
            .skn-mlu4 .lang-sec.infobarsec .nativeLangPara .field {
              display: inline
            }

            .skn-mlu4 .lang-sec.infobarsec .paragraph,
            .skn-mlu4 .skli-sec .paragraph {
              width: 100%;
              display: inline-block;
              vertical-align: top;
              padding-bottom: 5px;
              margin-top: 0
            }

            .skn-mlu4 .rating-bar {
              background: #d5d6d6;
              width: 100%;
              clear: both;
              margin-top: 3px;
              overflow: hidden
            }

            .skn-mlu4 .inner-rating {
              background-color: #d5d6d6;
              height: 4px
            }

            .skn-mlu4 .left-box .rating-bar {
              position: relative
            }

            .skn-mlu4 .left-box .inner-rating {
              position: relative;
              z-index: 2;
              background-color: #fff
            }

            .skn-mlu4 .left-box .rating-bar:before {
              content: '';
              width: 100%;
              height: 4px;
              position: absolute;
              z-index: 1;
              opacity: .5;
              background-color: ${colorHex}
            }

            .skn-mlu4 .right-box .inner-rating {
              background-color: ${colorHex}
            }

            .skn-mlu4 .lang-sec.infobarsec>.paragraph:last-child {
              padding-bottom: 0
            }

            .skn-mlu4 .lang-sec .singlecolumn {
              display: block
            }

            .skn-mlu4 .hide-colon .colon {
              display: none !important
            }

            /*For Extra Space Before Colon*/
            .skn-mlu4 .beforecolonspace {
              display: none !important
            }

            /*Hyphen Handling*/
            .skn-mlu4 .hyphen:before {
              content: ' - '
            }

            .skn-mlu4,
            .skn-mlu4 table {
              line-height: 15px
            }

            .skn-mlu4.pagesize {
              width: 595px
            }

            .skn-mlu4 {
              min-height: 792px
            }

            .skn-mlu4.pgsz-a4 {
              min-height: 842px
            }

            .skn-mlu4.fontsize,
            .skn-mlu4 ul li:before,
            .skn-mlu4 .septr:before,
            .skn-mlu4 .lang-sec.infobarsec .paragraph *,
            .skn-mlu4 .lang-sec.infotilesec .paragraph *,
            .skn-mlu4 .skli-sec .paragraph * {
              font-size: 11px
            }

            .skn-mlu4.fontface {
              font-family: Trebuchet MS
            }

            .skn-mlu4 .section {
              padding-top: 20px
            }

            .skn-mlu4 .left-box .section {
              padding-top: 10px
            }

            .skn-mlu4 .left-box .section:after {
              padding-bottom: 10px
            }

            .skn-mlu4 .paragraph.firstparagraph {
              margin-top: 0
            }

            .skn-mlu4 .paragraph {
              margin-top: 10px
            }

            .skn-mlu4 .right-box .singlecolumn,
            .skn-mlu4 .right-box .maincolumn {
              margin-left: 0px
            }

            .skn-mlu4 .name {
              font-size: 34px;
              line-height: 32px
            }

            .skn-mlu4 .heading {
              font-size: 14px;
              line-height: 18px
            }

            .skn-mlu4 .left-box {
              width: 174px
            }

            .skn-mlu4 .left-box .lang-sec .sortableInner>.sortable-item:nth-last-child(1) .paragraph,
            .skn-mlu4 .left-box .skli-sec .sortableInner>.sortable-item:nth-last-child(1) .paragraph {
              padding-bottom: 0
            }

            .skn-mlu4 .left-box .lang-sec .paragraph,
            .skn-mlu4 .left-box .skli-sec .paragraph {
              padding-bottom: 5px
            }

            .skn-mlu4 .svg-fillcirclebg,
            .skn-mlu4 .svg-circlebg {
              fill: ${colorHex}
            }

            .skn-mlu4 .left-box>.sortable-item .section,
            .skn-mlu4 .left-box>.sortable-item .paragraph {
              background: ${colorHex}
            }
          `}</style>
      <div className="document fontsize fontface pagesize skn-mlu4 MUK pgsz-a4">
        <div className="parentContainer">
          {/* Left Box - Sidebar */}
          <div className="left-box">
            {/* Photo Section */}
            {data.photo_url && (
              <div className="section pict-sec SECTION_PICT firstsection">
                <div className="doc-item">
                  <div className="paragraph firstparagraph">
                    <div className="clearfix doc-item">
                      <div className="prflPic">
                        <div className="field">
                          <img src={data.photo_url} alt="Profile photo" />
                        </div>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Skills Section */}
            {data.skills && data.skills.length > 0 && (
              <div className="section SECTION_HILT has-title">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.skills}</div>
                  </div>
                  <div className="paragraph firstparagraph">
                    <div className="clearfix doc-item">
                      <div className="singlecolumn maincolumn">
                        <div className="dflt-view">
                          <span className="paddedline">
                            <ul>
                              {data.skills.map((skill) => (
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
            )}

            {/* Education Section */}
            {data.educations && data.educations.length > 0 && (
              <div className="section education SECTION_EDUC multi-para has-title">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.education}</div>
                  </div>
                  <div className="sortableInner">
                    {data.educations.map((edu, index) => (
                      <div key={edu.id} className="sortable-item paragraph-container">
                        <div
                          className={`paragraph PARAGRAPH_EDUC ${index === 0 ? "firstparagraph" : ""}`}
                        >
                          <div className="clearfix doc-item">
                            <div className="singlecolumn">
                              <div className="paddedline">
                                <span className="jobdates txtItl">
                                  {edu.start_date ? formatDate(edu.start_date) : ""}
                                </span>
                                <span dependency="GRST+GRED" class="hyphen"></span>
                                <span className="jobdates txtItl">
                                  {edu.end_date ? formatDate(edu.end_date) : ""}
                                </span>
                              </div>
                              <div className="paddedline">
                                <span className="companyname txt-bold">{edu.institution}</span>
                              </div>
                              <div className="paddedline">
                                <span className="joblocation jobcity" id="FIELD_SCIT">Baku/Azerbaijan</span>
                              </div>
                              <div className="paddedline degreeGap">
                                <span className="degree">{edu.degree}</span>
                                {edu.degree && edu.field_of_study && <span>: </span>}
                                <span className="programline">{edu.field_of_study}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Languages Section */}
            {data.languages && data.languages.length > 0 && (
              <div className="section lang-sec infobarsec hide-colon SECTION_LNGG has-title data-LNGG">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.languages}</div>
                  </div>
                  <div className="sortableInner">
                    {data.languages.map((lang, index) => (
                      <div key={lang.id} className="sortable-item paragraph-container">
                        <div
                          className={`paragraph PARAGRAPH_LNGG ${index === 0 ? "firstparagraph" : ""} ${index % 2 === 0 ? "para_odd" : "para_even"}`}
                        >
                          <div className="clearfix doc-item">
                            <div className="singlecolumn infobarpara">
                              <div className="field">
                                <span className="txt-bold">{lang.name}</span>
                                <span className="colon">
                                  <span className="beforecolonspace"> </span>
                                  <span>: </span>
                                </span>
                                <span className="flt-right"></span>
                              </div>
                              <div className="rating-bar">
                                <div
                                  className="inner-rating"
                                  style={{ width: getLanguageWidth(lang.level || 3) }}
                                ></div>
                              </div>
                              <div className="field field-ratt">
                                <span>{lang.proficiency}</span>
                              </div>
                              <div className="field">
                                <span></span>
                              </div>
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

          {/* Right Box - Main Content */}
          <div className="right-box">
            {/* Name Section */}
            <div className="section SECTION_NAME firstsection">
              <div className="doc-item">
                <div className="paragraph firstparagraph">
                  <div className="name">
                    <span>{data.first_name}</span>
                    {data.first_name && data.last_name && <span> </span>}
                    <span>{data.last_name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="section SECTION_CNTC">
              <div className="doc-item">
                <div className="paragraph firstparagraph">
                  <div className="clearfix doc-item">
                    <div className="address">
                      <div className="singlecolumn">
                        {/* Phone */}
                        {data.phone && (
                          <div className="adrs-field">
                            <span className="circle">
                              <svg viewBox="0 0 18 18">
                                <circle fill="#2b2b2b" cx="9" cy="9" r="9"></circle>
                                <g transform="translate(4.500000, 4.000000)">
                                  <path d="M8.945125,7.7507875 C8.872625,8.1107875 8.760125,8.4045375 8.598875,8.6507875 C8.426375,8.9095375 8.203875,9.1120375 7.917625,9.2695375 C7.525125,9.4857875 7.097625,9.5945375 6.641375,9.5945375 C6.298875,9.5945375 5.938875,9.5332875 5.562625,9.4120375 C4.803875,9.1670375 4.076375,8.7070375 3.527625,8.3320375 C2.997625,7.9707875 2.511375,7.5182875 2.040125,6.9520375 C1.540125,6.4107875 1.157625,5.8682875 0.868875,5.2957875 C0.568875,4.7032875 0.207625,3.9207875 0.065125,3.1370375 C-0.099875,2.2295375 0.051375,1.4507875 0.515125,0.8207875 C0.708875,0.5570375 0.940125,0.3645375 1.218875,0.2270375 C1.482625,0.0995375 1.788875,0.0257875 2.156375,0.0020375 C2.370125,-0.0117125 2.661375,0.0470375 2.828875,0.4082875 C2.963875,0.6995375 3.106375,0.9945375 3.242625,1.2795375 C3.342625,1.4845375 3.443875,1.6957875 3.542625,1.9057875 C3.606375,2.0407875 3.658875,2.1770375 3.700125,2.3095375 C3.780125,2.5732875 3.707625,2.7895375 3.477625,2.9720375 C3.181375,3.2057875 2.891375,3.4357875 2.616375,3.6695375 C2.605125,3.6795375 2.582625,3.6982875 2.568875,3.7120375 C2.572625,3.7257875 2.581375,3.7532875 2.600125,3.7970375 C2.881375,4.4920375 3.225125,5.0620375 3.647625,5.5370375 L3.653875,5.5445375 C4.071375,6.0257875 4.590125,6.4407875 5.241375,6.8120375 C5.282625,6.8370375 5.307625,6.8482875 5.322625,6.8532875 C5.337625,6.8407875 5.358875,6.8232875 5.370125,6.8132875 C5.637625,6.5695375 5.902625,6.3132875 6.175125,6.0507875 C6.385125,5.8470375 6.610125,5.8020375 6.860125,5.9170375 C6.987625,5.9745375 7.113875,6.0457875 7.240125,6.1257875 C7.433875,6.2520375 7.630125,6.3807875 7.821375,6.5057875 C8.086375,6.6795375 8.358875,6.8582875 8.630125,7.0307875 C8.967625,7.2445375 8.987625,7.5395375 8.945125,7.7507875" fill="#fff"></path>
                                </g>
                              </svg>
                            </span>
                            <span className="addrCircle">
                              <span className="wrap">
                                <span>{data.phone}</span>
                              </span>
                            </span>
                          </div>
                        )}

                        {/* Email */}
                        {data.email && (
                          <div className="adrs-field">
                            <span className="circle">
                              <svg viewBox="0 0 18 18">
                                <circle fill="#2b2b2b" cx="9" cy="9" r="9"></circle>
                                <path d="M4.0425,6.40875 L4.0425,11.95 L6.8125,9.18 L4.0425,6.40875 Z M9.07375,10.46875 L13.54375,6 L4.45375,6 L8.92375,10.46875 C8.965,10.51 9.0325,10.51 9.07375,10.46875 L9.07375,10.46875 Z M9.20125,11.16375 C9.1475,11.21875 9.075,11.2475 8.99875,11.2475 C8.9225,11.2475 8.85125,11.21875 8.7975,11.16375 L7.22375,9.59 L4.47,12.34375 L13.53,12.34375 L10.77625,9.58875 L9.20125,11.16375 Z M13.9575,6.4075 L13.9575,11.94875 L11.18625,9.17875 L13.9575,6.4075 Z" fill="#fff"></path>
                              </svg>
                            </span>
                            <span className="addrCircle">
                              <span className="wrap">
                                <span>{data.email}</span>
                              </span>
                            </span>
                          </div>
                        )}

                        {/* Address */}
                        {(data.street_address || data.city || data.postcode) && (
                          <div className="adrs-field">
                            <span className="circle">
                              <svg viewBox="0 0 18 18">
                                <circle fill="#2b2b2b" cx="9" cy="9" r="9"></circle>
                                <g transform="translate(5.000000, 4.000000)">
                                  <path fill="#fff" d="M3.7,5.1C2.8,5.1,2,4.4,2,3.5s0.7-1.6,1.6-1.6s1.6,0.7,1.6,1.6S4.6,5.1,3.7,5.1 M3.7,0 C1.6,0,0,1.6,0,3.7c0,0.8,0.6,2.3,1.7,4.2c0.8,1.5,1.7,2.7,1.7,2.7L3.7,11l0.2-0.3c0,0,0.9-1.3,1.7-2.7c1.1-2,1.7-3.4,1.7-4.2 C7.3,1.6,5.7,0,3.7,0"></path>
                                </g>
                              </svg>
                            </span>
                            <span className="addrCircle">
                              <span className="wrap">
                                <div className="zipsuffix">
                                  {data.street_address && <span>{data.street_address}</span>}
                                  {data.street_address && (data.city || data.postcode) && <span>, </span>}
                                  {data.city && <span>{data.city}</span>}
                                  {data.city && data.postcode && <span> </span>}
                                  {data.postcode && <span>{data.postcode}</span>}
                                </div>
                              </span>
                            </span>
                          </div>
                        )}

                        {/* Nationality */}
                        {data.nationality && (
                          <div className="adrs-field">
                            <span className="circle">
                              <svg viewBox="0 0 18 18">
                                <circle fill="#2b2b2b" cx="9" cy="9" r="9"></circle>
                                <g transform="translate(4.500000, 3.000000)">
                                  <path d="M10.1798067,3.14551957 C9.66812151,3.14290944 9.06096309,3.10823207 8.65844225,2.96542096 C8.26158043,2.82466065 7.96073945,2.50790337 7.66610515,2.21575583 C7.37147085,1.92379473 7.08505125,1.65793487 6.7270724,1.58764794 C6.37274453,1.51810676 6.00947175,1.68161244 5.62812661,1.85574505 C5.24678147,2.02969122 4.84663376,2.21482364 4.42677075,2.13614702 C3.86342412,2.03080984 3.19693723,1.48025995 2.76174009,1.09340217 L2.61862157,0.947048745 L2.62263765,0.925794872 L2.69218887,0.557207964 C2.74275498,0.288737986 2.59598548,0.0508437554 2.3805775,0.00852244637 C2.35374278,0.0033021968 2.32946374,-0.000799427867 2.30262902,0.000132759557 L2.30262902,0.000319197042 C2.1160638,0.00814957141 1.94099918,0.167553621 1.89663974,0.402464852 L0.0103595318,10.4408183 C-0.0400240294,10.7092883 0.0985307639,10.9514706 0.313938743,10.9936055 C0.529346722,11.0359268 0.75132647,10.8642179 0.801892581,10.5957479 L1.74914004,5.57442712 L1.78382438,5.38985401 C2.29185862,5.83338878 3.15221269,6.54091904 3.5821159,6.62146003 C3.93735652,6.68783178 4.30373263,6.52339392 4.68526033,6.34926131 C5.06678802,6.17512869 5.46328474,5.99036915 5.8826001,6.07277452 C6.29826448,6.15443413 6.6107886,6.44844605 6.90779604,6.74283084 C7.20462094,7.03721562 7.49104053,7.33570204 7.83861408,7.45893722 C8.19896607,7.58683333 8.79772724,7.62393439 9.30247559,7.62654451 C9.77308726,7.6289682 10.1053267,7.60081614 10.1553452,7.59708739 L10.6186549,5.13462109 L10.6513312,4.96720023 L11,3.12035051 C10.9189482,3.12613007 10.6325286,3.14794325 10.1798067,3.14551957" fill="#fff"></path>
                                </g>
                              </svg>
                            </span>
                            <span className="addrCircle">
                              <span className="wrap">
                                <span>{data.nationality}</span>
                              </span>
                            </span>
                          </div>
                        )}

                        {/* Driving License */}
                        {data.driving_license && (
                          <div className="adrs-field">
                            <span className="circle">
                              <svg viewBox="0 0 18 18">
                                <circle fill="#2b2b2b" cx="9" cy="9" r="9"></circle>
                                <path d="M6.5,6.1L5.9,7.7h6.1l-0.5-1.6c-0.1-0.3-0.3-0.4-0.6-0.4H7.1C6.8,5.7,6.6,5.8,6.5,6.1z M4.5,7.8l0.7-2.1 c0.3-0.8,1-1.3,1.9-1.3h3.8c0.8,0,1.6,0.5,1.9,1.3l0.7,2.1C14,8,14.3,8.4,14.3,9v3v1c0,0.4-0.3,0.7-0.7,0.7H13 c-0.4,0-0.7-0.3-0.7-0.7v-1H5.7v1c0,0.4-0.3,0.7-0.7,0.7H4.3c-0.4,0-0.7-0.3-0.7-0.7v-1V9C3.7,8.4,4,8,4.5,7.8z M6.3,9.7 C6.3,9.3,6,9,5.7,9C5.3,9,5,9.3,5,9.7c0,0.4,0.3,0.7,0.7,0.7C6,10.3,6.3,10,6.3,9.7z M12.3,10.3c0.4,0,0.7-0.3,0.7-0.7 C13,9.3,12.7,9,12.3,9c-0.4,0-0.7,0.3-0.7,0.7C11.7,10,12,10.3,12.3,10.3z" fill="#fff"></path>
                              </svg>
                            </span>
                            <span className="addrCircle">
                              <span className="wrap">
                                <span>{data.driving_license}</span>
                              </span>
                            </span>
                          </div>
                        )}

                        {/* Website */}
                        {data.website && (
                          <div className="adrs-field">
                            <span className="circle">
                              <svg viewBox="0 0 18 18">
                                <circle fill="#2b2b2b" cx="9" cy="9" r="9"></circle>
                                <path d="M14.7,6.4l-3.1-3.1c-0.3-0.3-0.7-0.3-1,0c0,0,0,0,0,0L8,5.9c-0.3,0.3-0.3,0.8,0,1l0.5,0.5l2.6-2.6l2.1,2.1l-2.6,2.6 l0.5,0.5c0.3,0.3,0.7,0.3,1,0c0,0,0,0,0,0l2.6-2.6C15,7.2,15,6.7,14.7,6.4C14.7,6.4,14.7,6.4,14.7,6.4z M9.5,10.6l-2.6,2.6 l-2.1-2.1l2.6-2.6L6.9,8c-0.3-0.3-0.7-0.3-1,0c0,0,0,0,0,0l-2.6,2.6c-0.3,0.3-0.3,0.7,0,1c0,0,0,0,0,0l3.1,3.1 c0.3,0.3,0.7,0.3,1,0l2.6-2.6c0.3-0.3,0.3-0.8,0-1L9.5,10.6z" fill="#fff"></path>
                                <path d="M6.9,11.1c0.3,0.3,0.7,0.3,1,0L11.1,8c0.3-0.3,0.3-0.7,0-1c0,0,0,0,0,0c-0.3-0.3-0.7-0.3-1,0c0,0,0,0,0,0L6.9,10 C6.6,10.3,6.6,10.8,6.9,11.1C6.9,11.1,6.9,11.1,6.9,11.1z" fill="#fff"></path>
                              </svg>
                            </span>
                            <span className="addrCircle">
                              <span className="wrap">
                                <span>{data.website}</span>
                              </span>
                            </span>
                          </div>
                        )}

                        {/* LinkedIn */}
                        {data.linkedin && (
                          <div className="adrs-field">
                            <span className="circle">
                              <svg viewBox="0 0 18 18">
                                <circle fill="#2b2b2b" cx="9" cy="9" r="9"></circle>
                                <path fill="#fff" d="M6.5,5.2c0,0.5-0.4,0.9-1,0.9s-1-0.4-1-0.9s0.4-0.9,1-0.9S6.5,4.7,6.5,5.2z M4.6,7h1.8v5.8H4.6V7z M9.5,7H7.7v5.8h1.8v-3c0-0.8,0.4-1.3,1.1-1.3c0.6,0,1,0.4,1,1.3v3h1.8V9.5c0-1.6-0.9-2.7-2.2-2.7c-0.9,0-1.5,0.5-1.7,1V7z"></path>
                              </svg>
                            </span>
                            <span className="addrCircle">
                              <span className="wrap">
                                <span>{data.linkedin}</span>
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            {data.summary && (
              <div className="section SECTION_SUMM has-title">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.summary}</div>
                  </div>
                  <div className="paragraph firstparagraph">
                    <div className="clearfix doc-item">
                      <div className="singlecolumn">
                        <p>{data.summary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Work Experience Section */}
            {data.experiences && data.experiences.length > 0 && (
              <div className="section SECTION_EXPR multi-para has-title">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.experience}</div>
                  </div>
                  <div className="sortableInner">
                    {data.experiences.map((exp, index) => (
                      <div key={exp.id} className="sortable-item paragraph-container">
                        <div
                          className={`paragraph PARAGRAPH_EXPR ${index === 0 ? "firstparagraph" : ""}`}
                        >
                          <div className="clearfix doc-item">
                            <div className="singlecolumn">
                              <span className="paddedline">
                                <span className="jobdates">{formatDate(exp.start_date, language)}</span>
                                {exp.start_date && (exp.end_date || exp.currently_working) && (
                                  <span className="hyphen"></span>
                                )}
                                <span className="jobdates">
                                  {exp.currently_working ? t.present : formatDate(exp.end_date, language)}
                                </span>
                              </span>
                              <span className="paddedline">
                                <span className="jobtitle txt-bold">{exp.job_title}</span>
                              </span>
                              <span className="paddedline locationGap">
                                <span className="companyname txt-bold">{exp.company}</span>
                                {exp.company && exp.location && <span> | </span>}
                                <span className="jobcity">{exp.location}</span>
                              </span>
                              {exp.description && (
                                <span className="jobline">
                                  <ul>
                                    {exp.description.split("\n").map((line, i) => (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
