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

export default function TemplateMli5({
  data = sampleData,
  translations: t = defaultTranslations,
  language = "en",
  colorHex = "#2c5a77",
}: Partial<DynamicTemplateProps> = {}) {
  const getLanguageWidth = (level: number) => {
    return `${(level / 5) * 100}%`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Saira:300,400,500,600,700,900');
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-mli5 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        /*START content disc style for LI*/
        .skn-mli5 ul,.skn-mli5 li{list-style:none;margin:0 0 0 8px;padding:0}
        .skn-mli5 ul li{position:relative;margin:0}
        .skn-mli5 ul li:before{content:'\\2022';position:absolute;left:-8px;top:0;}
        .skn-mli5 .skli-sec ul li:before,.skn-mli5 .lang-sec ul li:before{left:-9px}
        .skn-mli5 .jobline ul,.skn-mli5 .education .field ul{margin-top:5px}
        .skn-mli5 .jobline ul li{padding-bottom:3px}
        .skn-mli5 .jobline ul li:last-child{padding-bottom:0}
        /*END content disc style for LI*/

        .skn-mli5 .txt-bold{font-weight:600}
        .skn-mli5 .break-all{word-break:break-all}
        .skn-mli5 .paddedline{display:block}
        .skn-mli5 .flt-right{float:right}
        .skn-mli5 .pb5{padding-bottom:5px}

        .skn-mli5{color:#46464e;line-height:16px;font-variant-ligatures:none;word-wrap:break-word}
        .skn-mli5 .name{color:${colorHex};font-weight:900;padding:0 0 10px 0;text-align:left;position:relative;letter-spacing:.9px;text-transform: uppercase}
        .skn-mli5 .parentContainer{display:table;table-layout:fixed;width:100%}
        .skn-mli5 .paragraph.firstparagraph{margin-top:0}
        .skn-mli5 .totl-expr{float:right;padding:0 6px;color:#fff;font-weight:700}
        .skn-mli5 .right-box .totl-expr{display:none}

        /* Common style for left and right box */
        .skn-mli5 .left-box{padding:30px 20px 30px 35px;display:table-cell;vertical-align:top;letter-spacing:0.2px}
        .skn-mli5 .right-box{background-color:${colorHex};box-sizing:content-box;display:table-cell;background-size:100%;color:#fff;padding:25px;padding: 40px 35px 30px 20px}
        .skn-mli5 .right-box .section:first-child,.skn-mli5 .left-box .section:first-child{padding-top:0px}
        .skn-mli5 .left-box .section:first-child{border-top:none;border-bottom:1px solid ${colorHex};padding-bottom:0;margin-bottom:30px}
        .skn-mli5 .right-box .section:first-child .paragraph{padding:0;display:block}
        .skn-mli5 .right-box .section:last-of-type{border:none}
        .skn-mli5 .right-box .heading,.skn-mli5 .left-box .paragraph{padding-left:0}
        .skn-mli5 .right-box .section{color:#fff}
        .skn-mli5 .left-box > .section:last-child,.skn-mli5 .right-box > .section:last-child{margin-bottom:0}

        /* Heading */
        .skn-mli5 .heading{line-height:15px;margin-bottom:10px}
        .skn-mli5 .left-box .sectiontitle{color:${colorHex}}
        .skn-mli5 .sectiontitle{display:block;font-weight:600;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid ${colorHex}}
        .skn-mli5 .right-box .sectiontitle{display:block;border-bottom-color:#fff;margin-left: -20px;padding-left: 20px}

        /* section */
        .skn-mli5 .section:empty{display:none}
        .skn-mli5 .septr:before{content:"|";font-size:9px;vertical-align:top;padding-left:2px;padding-right:2px}
        .skn-mli5 .education .joblocation{font-weight:300}
        .skn-mli5 .right-box .section:after{content:'';display:block}

        .skn-mli5 .jobdates,.skn-mli5 .companyname{font-weight:500}
        .skn-mli5 .jobcity{font-weight:400}
        .skn-mli5 .education .jobcity{font-weight:300}
        .skn-mli5 .left-box .education .paddedline,.skn-mli5 .left-box .experience .paddedline{color:#000}

        /* Circle SVG */
        .skn-mli5 .wrap{display:table;table-layout:fixed;width:100%}
        .skn-mli5 .address{text-align:left}
        .skn-mli5 .adrs-field{display:table;table-layout:fixed;width:100%;margin-bottom:10px;min-height:14px}
        .skn-mli5 .adrs-field:last-child{margin-bottom:0}
        .skn-mli5 .adrs-field .circle{border-radius:100%;height:15px;width:15px;display:table-cell;vertical-align:middle;text-align:center;font-size:9px;box-sizing:border-box}
        .skn-mli5 .address .adrs-field > .addrCircle{display:table-cell;vertical-align:middle;padding-left:10px;max-width:166px;box-sizing:border-box;}
        .skn-mli5 .address .svg-fillcirclebg{fill:#fff}

        /*Infographic bar*/
        .skn-mli5 .lang-sec .singlecolumn{display:none}
        .skn-mli5 .lang-sec.infobarsec .infobarpara{display:block}
        .skn-mli5 .lang-sec.infobarsec .paragraph{vertical-align:top;clear:both;padding-bottom:0}
        .skn-mli5 .rating-bar{background:#d5d6d6;width:100%;clear:both;margin-top:3px;position:relative;overflow:hidden}
        .skn-mli5 .inner-rating{height:4px}
        .skn-mli5 .right-box .rating-bar{background:rgba(255,255,255,.25)}
        .skn-mli5 .right-box .inner-rating{background:#fff;position:relative}
        .skn-mli5 .left-box .inner-rating{background-color:${colorHex}}

        .skn-mli5 .left-box .lang-sec .paragraph{display:inline-block;margin-bottom:5px;margin-top:0;width:145px}
        .skn-mli5 .left-box .lang-sec .paragraph.para_odd{margin-right:15px}
        .skn-mli5 .left-box .lang-sec .singlecolumn{margin-left:0;display:block}

        .skn-mli5 .hide-colon .colon{display:none!important}
        .skn-mli5 .beforecolonspace{display:none!important}

        /*Hyphen Handling*/
        .skn-mli5 .hyphen:before{content:' - '}

        .skn-mli5,.skn-mli5 table{line-height:14px}
        .skn-mli5,.skn-mli5 .parentContainer{min-height:792px}
        .skn-mli5.pgsz-a4,.skn-mli5.pgsz-a4 .parentContainer{min-height:842px}
        .skn-mli5.pagesize{width:595px}
        .skn-mli5.fontsize,.skn-mli5 ul li:before,.skn-mli5 .septr:before{font-size:10px}
        .skn-mli5.fontface{font-family:Saira}
        .skn-mli5 .section{margin-bottom:25px}
        .skn-mli5 .paragraph{margin-top:15px}
        .skn-mli5 .left-box .singlecolumn,.skn-mli5 .left-box .maincolumn{margin-left:0px}
        .skn-mli5 .name{font-size:36px;line-height:34px}
        .skn-mli5 .heading{font-size:14px;line-height:17px}
        .skn-mli5 .right-box{width:169px}

        /* Circle SVG */
        .skn-mli5 .adrs-field .circle{height:17px;width:18px}
        .skn-mli5 .adrs-field svg{height:17px;width:18px; vertical-align:middle;}
        .skn-mli5 .adrs-field svg .fillclr{fill:${colorHex}}
        .skn-mli5 .address .adrs-field > .addrCircle{padding-left:10px}

        .skn-mli5 .totl-expr{font-size:8px;background-color:${colorHex};line-height:13px}
      `}</style>
      <div className="document fontsize fontface pagesize skn-mli5 MUK pgsz-a4">
        <div className="parentContainer">
          {/* Left Box - Main Content */}
          <div className="left-box">
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
              <div className="section experience SECTION_EXPR multi-para has-title">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.experience}</div>
                  </div>
                  <div className="sortableInner">
                    {data.experiences.map((exp, index) => (
                      <div key={exp.id} className="sortable-item paragraph-container">
                        <div className={`paragraph PARAGRAPH_EXPR ${index === 0 ? "firstparagraph" : ""}`}>
                          <div className="clearfix doc-item">
                            <div className="singlecolumn">
                              <span className="paddedline">
                                <span className="jobtitle txt-bold">{exp.job_title}</span>
                                {exp.job_title && (exp.start_date || exp.end_date) && <span>, </span>}
                                <span className="jobdates">
                                  {formatDate(exp.start_date, language)}
                                  {exp.start_date && (exp.end_date || exp.currently_working) && (
                                    <span className="hyphen"></span>
                                  )}
                                  {exp.currently_working ? t.present : formatDate(exp.end_date, language)}
                                </span>
                              </span>
                              <span className="paddedline locationGap">
                                <span className="companyname">{exp.company}</span>
                                {exp.company && exp.location && <span>, </span>}
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
                        <div className={`paragraph PARAGRAPH_EDUC ${index === 0 ? "firstparagraph" : ""}`}>
                          <div className="clearfix doc-item">
                            <div className="singlecolumn">
                              <div className="paddedline txt-bold">
                                <span className="degree">{edu.degree}</span>
                                {edu.degree && edu.field_of_study && <span>, </span>}
                                <span className="programline">{edu.field_of_study}</span>
                                {(edu.degree || edu.field_of_study) && edu.end_date && <span>, </span>}
                                <span className="jobdates">
                                  {edu.start_date ? formatDate(edu.start_date) : ""}
                                </span>
                                <span dependency="GRST+GRED" class="hyphen"></span>
                                <span className="jobdates">
                                  {edu.end_date ? formatDate(edu.end_date) : ""}
                                </span>
                              </div>
                              <div className="paddedline">
                                <span className="companyname">{edu.institution}</span>
                                {edu.institution && edu.location && <span className="hyphen"></span>}
                                <span className="joblocation jobcity">{edu.location}</span>
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
              <div className="section lang-sec infobarsec hide-colon SECTION_LNGG has-title">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.languages}</div>
                  </div>
                  <div className="sortableInner">
                    {data.languages.map((lang, index) => (
                      <div key={lang.id} className="sortable-item paragraph-container" style={{ display: 'inline-block', verticalAlign: 'top' }}>
                        <div className={`paragraph PARAGRAPH_LNGG ${index === 0 ? "firstparagraph" : ""} ${index % 2 === 0 ? "para_odd" : "para_even"}`}>
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
                                <span>{lang.proficiency ? lang.proficiency.charAt(0).toUpperCase() + lang.proficiency.slice(1) : ""}</span>
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

          {/* Right Box - Sidebar */}
          <div className="right-box">
            {/* Contact Section */}
            <div className="section SECTION_CNTC">
              <div className="doc-item">
                <div className="paragraph firstparagraph">
                  <div className="clearfix doc-item">
                    <div className="address">
                      <div className="singlecolumn">
                        {/* Address */}
                        {(data.street_address || data.city || data.postcode) && (
                          <div className="adrs-field">
                            <span className="circle">
                              <svg viewBox="-0.5 -0.5 19 19">
                                <circle fill="#FFFFFF" cx="9" cy="9" r="9"></circle>
                                <g className="fillclr" transform="translate(5.000000, 4.000000)">
                                  <path d="M3.7,5.1C2.8,5.1,2,4.4,2,3.5s0.7-1.6,1.6-1.6s1.6,0.7,1.6,1.6S4.6,5.1,3.7,5.1 M3.7,0 C1.6,0,0,1.6,0,3.7c0,0.8,0.6,2.3,1.7,4.2c0.8,1.5,1.7,2.7,1.7,2.7L3.7,11l0.2-0.3c0,0,0.9-1.3,1.7-2.7c1.1-2,1.7-3.4,1.7-4.2 C7.3,1.6,5.7,0,3.7,0"></path>
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

                        {/* Phone */}
                        {data.phone && (
                          <div className="adrs-field">
                            <span className="circle">
                              <svg viewBox="-0.5 -0.5 19 19">
                                <circle fill="#FFFFFF" cx="9" cy="9" r="9"></circle>
                                <g className="fillclr" transform="translate(4.500000, 4.000000)">
                                  <path d="M8.945125,7.7507875 C8.872625,8.1107875 8.760125,8.4045375 8.598875,8.6507875 C8.426375,8.9095375 8.203875,9.1120375 7.917625,9.2695375 C7.525125,9.4857875 7.097625,9.5945375 6.641375,9.5945375 C6.298875,9.5945375 5.938875,9.5332875 5.562625,9.4120375 C4.803875,9.1670375 4.076375,8.7070375 3.527625,8.3320375 C2.997625,7.9707875 2.511375,7.5182875 2.040125,6.9520375 C1.540125,6.4107875 1.157625,5.8682875 0.868875,5.2957875 C0.568875,4.7032875 0.207625,3.9207875 0.065125,3.1370375 C-0.099875,2.2295375 0.051375,1.4507875 0.515125,0.8207875 C0.708875,0.5570375 0.940125,0.3645375 1.218875,0.2270375 C1.482625,0.0995375 1.788875,0.0257875 2.156375,0.0020375 C2.370125,-0.0117125 2.661375,0.0470375 2.828875,0.4082875 C2.963875,0.6995375 3.106375,0.9945375 3.242625,1.2795375 C3.342625,1.4845375 3.443875,1.6957875 3.542625,1.9057875 C3.606375,2.0407875 3.658875,2.1770375 3.700125,2.3095375 C3.780125,2.5732875 3.707625,2.7895375 3.477625,2.9720375 C3.181375,3.2057875 2.891375,3.4357875 2.616375,3.6695375 C2.605125,3.6795375 2.582625,3.6982875 2.568875,3.7120375 C2.572625,3.7257875 2.581375,3.7532875 2.600125,3.7970375 C2.881375,4.4920375 3.225125,5.0620375 3.647625,5.5370375 L3.653875,5.5445375 C4.071375,6.0257875 4.590125,6.4407875 5.241375,6.8120375 C5.282625,6.8370375 5.307625,6.8482875 5.322625,6.8532875 C5.337625,6.8407875 5.358875,6.8232875 5.370125,6.8132875 C5.637625,6.5695375 5.902625,6.3132875 6.175125,6.0507875 C6.385125,5.8470375 6.610125,5.8020375 6.860125,5.9170375 C6.987625,5.9745375 7.113875,6.0457875 7.240125,6.1257875 C7.433875,6.2520375 7.630125,6.3807875 7.821375,6.5057875 C8.086375,6.6795375 8.358875,6.8582875 8.630125,7.0307875 C8.967625,7.2445375 8.987625,7.5395375 8.945125,7.7507875"></path>
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
                              <svg viewBox="-0.5 -0.5 19 19">
                                <circle fill="#FFFFFF" cx="9" cy="9" r="9"></circle>
                                <path className="fillclr" d="M4.0425,6.40875 L4.0425,11.95 L6.8125,9.18 L4.0425,6.40875 Z M9.07375,10.46875 L13.54375,6 L4.45375,6 L8.92375,10.46875 C8.965,10.51 9.0325,10.51 9.07375,10.46875 L9.07375,10.46875 Z M9.20125,11.16375 C9.1475,11.21875 9.075,11.2475 8.99875,11.2475 C8.9225,11.2475 8.85125,11.21875 8.7975,11.16375 L7.22375,9.59 L4.47,12.34375 L13.53,12.34375 L10.77625,9.58875 L9.20125,11.16375 Z M13.9575,6.4075 L13.9575,11.94875 L11.18625,9.17875 L13.9575,6.4075 Z"></path>
                              </svg>
                            </span>
                            <span className="addrCircle">
                              <span className="wrap">
                                <span>{data.email}</span>
                              </span>
                            </span>
                          </div>
                        )}

                        {/* Nationality */}
                        {data.nationality && (
                          <div className="adrs-field">
                            <span className="circle">
                              <svg viewBox="-0.5 -0.5 19 19">
                                <circle fill="#FFFFFF" cx="9" cy="9" r="9"></circle>
                                <g className="fillclr" transform="translate(4.500000, 3.000000)">
                                  <path d="M10.1798067,3.14551957 C9.66812151,3.14290944 9.06096309,3.10823207 8.65844225,2.96542096 C8.26158043,2.82466065 7.96073945,2.50790337 7.66610515,2.21575583 C7.37147085,1.92379473 7.08505125,1.65793487 6.7270724,1.58764794 C6.37274453,1.51810676 6.00947175,1.68161244 5.62812661,1.85574505 C5.24678147,2.02969122 4.84663376,2.21482364 4.42677075,2.13614702 C3.86342412,2.03080984 3.19693723,1.48025995 2.76174009,1.09340217 L2.61862157,0.947048745 L2.62263765,0.925794872 L2.69218887,0.557207964 C2.74275498,0.288737986 2.59598548,0.0508437554 2.3805775,0.00852244637 C2.35374278,0.0033021968 2.32946374,-0.000799427867 2.30262902,0.000132759557 L2.30262902,0.000319197042 C2.1160638,0.00814957141 1.94099918,0.167553621 1.89663974,0.402464852 L0.0103595318,10.4408183 C-0.0400240294,10.7092883 0.0985307639,10.9514706 0.313938743,10.9936055 C0.529346722,11.0359268 0.75132647,10.8642179 0.801892581,10.5957479 L1.74914004,5.57442712 L1.78382438,5.38985401 C2.29185862,5.83338878 3.15221269,6.54091904 3.5821159,6.62146003 C3.93735652,6.68783178 4.30373263,6.52339392 4.68526033,6.34926131 C5.06678802,6.17512869 5.46328474,5.99036915 5.8826001,6.07277452 C6.29826448,6.15443413 6.6107886,6.44844605 6.90779604,6.74283084 C7.20462094,7.03721562 7.49104053,7.33570204 7.83861408,7.45893722 C8.19896607,7.58683333 8.79772724,7.62393439 9.30247559,7.62654451 C9.77308726,7.6289682 10.1053267,7.60081614 10.1553452,7.59708739 L10.6186549,5.13462109 L10.6513312,4.96720023 L11,3.12035051 C10.9189482,3.12613007 10.6325286,3.14794325 10.1798067,3.14551957"></path>
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
                                <circle fill="#FFFFFF" cx="9" cy="9" r="9"></circle>
                                <path className="fillclr" d="M6.5,6.1L5.9,7.7h6.1l-0.5-1.6c-0.1-0.3-0.3-0.4-0.6-0.4H7.1C6.8,5.7,6.6,5.8,6.5,6.1z M4.5,7.8l0.7-2.1 c0.3-0.8,1-1.3,1.9-1.3h3.8c0.8,0,1.6,0.5,1.9,1.3l0.7,2.1C14,8,14.3,8.4,14.3,9v3v1c0,0.4-0.3,0.7-0.7,0.7H13 c-0.4,0-0.7-0.3-0.7-0.7v-1H5.7v1c0,0.4-0.3,0.7-0.7,0.7H4.3c-0.4,0-0.7-0.3-0.7-0.7v-1V9C3.7,8.4,4,8,4.5,7.8z M6.3,9.7 C6.3,9.3,6,9,5.7,9C5.3,9,5,9.3,5,9.7c0,0.4,0.3,0.7,0.7,0.7C6,10.3,6.3,10,6.3,9.7z M12.3,10.3c0.4,0,0.7-0.3,0.7-0.7 C13,9.3,12.7,9,12.3,9c-0.4,0-0.7,0.3-0.7,0.7C11.7,10,12,10.3,12.3,10.3z"></path>
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
                              <svg viewBox="0 0 14 14">
                                <path fill="#fff" d="M7,0c3.8,0,7,3.1,7,7c0,3.8-3.2,7-7,7s-7-3.2-7-7C0,3.1,3.1,0,7,0z"></path>
                                <path className="fillclr" d="M8.1,9.1C8,9.2,8,9.2,7.7,9.4L7.3,9.9c-0.1,0.1-0.2,0.2-0.3,0.3l-0.4,0.4c-0.9,0.9-2.3,0.9-3.2,0 c-0.9-0.9-0.9-2.3,0-3.2l0.5-0.5C4,6.9,4,6.8,4,6.7l0.2-0.2c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.3-0.1,0.3,0.2c0,0.2,0.1,0.5,0.1,0.7 c0,0.1,0,0.2-0.1,0.2L4.1,8c-0.5,0.5-0.5,1.4,0,2c0.5,0.5,1.4,0.5,2,0l1.2-1.2c0.5-0.5,0.5-1.4,0-2C7.3,6.7,7.1,6.6,7,6.5 c-0.1,0-0.1-0.1-0.1-0.2C6.9,6.1,7,6,7.1,5.8V5.7c0.1-0.1,0.2-0.1,0.2-0.1C7.5,5.8,7.7,6,7.9,6.1C8.8,6.9,8.8,8.3,8.1,9.1z M10.5,6.7C10.2,7,10,7.2,9.8,7.4L9.7,7.5C9.6,7.6,9.4,7.8,9.4,7.8C9.4,7.9,9.2,7.9,9.2,7.6c0-0.2-0.1-0.5-0.1-0.7 c0-0.1,0-0.2,0.1-0.2l0.7-0.7c0.5-0.5,0.5-1.4,0-2c-0.5-0.5-1.4-0.5-2,0L6.6,5.4c-0.5,0.5-0.5,1.4,0,2c0.1,0,0.3,0.1,0.4,0.2 c0,0,0.1,0.1,0.1,0.2C7.1,8,7,8.2,6.8,8.4l0,0C6.7,8.5,6.6,8.5,6.5,8.5C6.3,8.4,6.1,8.2,5.9,8C5.2,7.2,5.1,5.8,5.8,4.9 c0.1-0.1,0.1-0.1,0.3-0.3L6.8,4c0.1-0.1,0.1-0.1,0.1-0.1l0.4-0.4c1-1,2.4-1,3.2,0C11.5,4.5,11.5,5.9,10.5,6.7z"></path>
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
                          <div className="adrs-field social">
                            <span className="circle">
                              <svg viewBox="0 0 18 18">
                                <circle fill="#FFFFFF" cx="9" cy="9" r="9"></circle>
                                <path className="fillclr" d="M6.5,5.2c0,0.5-0.4,0.9-1,0.9s-1-0.4-1-0.9s0.4-0.9,1-0.9S6.5,4.7,6.5,5.2z M4.6,7h1.8v5.8H4.6V7z M9.5,7H7.7v5.8h1.8v-3c0-0.8,0.4-1.3,1.1-1.3c0.6,0,1,0.4,1,1.3v3h1.8V9.5c0-1.6-0.9-2.7-2.2-2.7c-0.9,0-1.5,0.5-1.7,1V7z"></path>
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
          </div>
        </div>
      </div>
    </>
  );
}
