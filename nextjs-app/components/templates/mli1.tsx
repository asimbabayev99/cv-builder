import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations, formatDate } from "@/lib/translations";

const defaultTranslations = translations.en;

export default function TemplateMli1({
  data = sampleData,
  translations: t = defaultTranslations,
  language = "az",
  colorHex = "#496267",
}: Partial<DynamicTemplateProps> = {}) {
  const skills = data.skills || [];
  const midpoint = Math.ceil(skills.length / 2);
  const skillsColumn1 = skills.slice(0, midpoint);
  const skillsColumn2 = skills.slice(midpoint);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Blinker:400,700');
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-mli1 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}
        .skn-mli1 ul,.skn-mli1 li{list-style:none;margin:0 0 0 8px;padding:0}
        .skn-mli1 ul li{position:relative;margin:0}
        .skn-mli1 ul li:before{content:'\\2022';position:absolute;left:-8px;top:2px;font-family:auto}
        .skn-mli1 .jobline ul,.skn-mli1 .education .field ul{margin-top:5px}
        .skn-mli1 .clear{clear:both;height:0}
        .skn-mli1 .txt-bold{font-weight:bold}
        .skn-mli1 .paddedline{display:block}
        .skn-mli1 .flt-right{float:right}
        .skn-mli1{color:#46464e;line-height:16px;font-variant-ligatures:none;min-height:792px;word-wrap:break-word}
        .skn-mli1 .name{color:${colorHex};font-weight:bold;padding:0 0 10px 0;text-align:left;position:relative;letter-spacing:.5px}
        .skn-mli1 .parentContainer{display:table;table-layout:fixed;width:100%;min-height:inherit}
        .skn-mli1 .paragraph.firstparagraph{margin-top:0}
        .skn-mli1 .locationGap{display:flex;justify-content:space-between}
        .skn-mli1 .paddedline.locationGap .flt-right{min-width:100px;text-align:right}
        .skn-mli1 .prflPic img{box-sizing:border-box}
        .skn-mli1 .right-box{padding:25px 35px 25px 20px;display:table-cell;vertical-align:top;letter-spacing:0.2px}
        .skn-mli1 .left-box{background-color:${colorHex};box-sizing:content-box;display:table-cell;background-size:100%;color:#fff;padding:25px 20px 25px 35px}
        .skn-mli1 .left-box .section{border-top:1px solid #fff}
        .skn-mli1 .right-box .section{border-top:1px solid #000}
        .skn-mli1 .left-box .section:first-child,.skn-mli1 .right-box .section:first-child{padding-top:0px}
        .skn-mli1 .right-box .section:first-child{border-top:none;border-bottom:5px solid #000;padding-bottom:0;margin-bottom:30px}
        .skn-mli1 .right-box .section:nth-child(2){border-top:none}
        .skn-mli1 .left-box .section.pict-sec{padding-top:0;margin-bottom:25px;border:none;text-align:center;position:relative}
        .skn-mli1 .left-box .heading,.skn-mli1 .right-box .paragraph{padding:0}
        .skn-mli1 .right-box .sectiontitle{color:#000}
        .skn-mli1 .right-box .skill{display:table;width:100%;table-layout:fixed}
        .skn-mli1 .right-box .skill .paddedline{display:table-cell;width:50%}
        .skn-mli1 .right-box .skill .paddedline:last-child{padding-left:10px}
        .skn-mli1 .prflPic,.skn-mli1 .prflPic .field{display:table-cell;vertical-align:middle;text-align:center}
        .skn-mli1 .prflPic img{position:absolute;left:0;right:0;top:0;bottom:0;margin:auto;object-fit:cover}
        .skn-mli1 .heading{line-height:15px;margin-bottom:5px}
        .skn-mli1 .sectiontitle{font-weight:bold;text-transform:uppercase;letter-spacing:.5px}
        .skn-mli1 .left-box .sectiontitle{font-weight:700}
        .skn-mli1 .section:empty{display:none}
        .skn-mli1 .iconRow{display:table;table-layout:fixed;width:100%;margin-bottom:5px;word-wrap:break-word}
        .skn-mli1 .iconRow:last-child{margin-bottom:0}
        .skn-mli1 .iconSvg{width:12px;height:12px;display:table-cell;vertical-align:middle}
        .skn-mli1 .iconSvg svg{vertical-align:middle;fill:#fff}
        .skn-mli1 .icoTxt{display:table-cell;padding-left:10px}
        .skn-mli1 .hyphen:before{content:' - '}
        .skn-mli1,.skn-mli1 table{line-height:14px}
        .skn-mli1.pagesize{width:595px}
        .skn-mli1{min-height:792px}
        .skn-mli1.pgsz-a4{min-height:842px}
        .skn-mli1.fontsize{font-size:10px}
        .skn-mli1.fontface{font-family:Blinker}
        .skn-mli1 .section{margin-bottom:25px}
        .skn-mli1 .paragraph{margin-top:15px}
        .skn-mli1 .right-box .singlecolumn,.skn-mli1 .right-box .maincolumn{margin-left:0px}
        .skn-mli1 .name{color:${colorHex};font-size:36px;line-height:35px}
        .skn-mli1 .heading{font-size:14px;line-height:17px}
        .skn-mli1 .left-box{background-color:${colorHex};width:169px}
        .skn-mli1 .left-box,.skn-mli1 .right-box .inner-rating{background-color:${colorHex}}
        .skn-mli1 .sectiontitle{font-size:14px;line-height:17px}
        .skn-mli1 .prflPic,.skn-mli1 .prflPic .field{height:169px;width:169px}
        .skn-mli1 .prflPic img{max-height:169px;max-width:169px;min-height:169px;min-width:169px}
        .skn-mli1 .jobtitle{text-transform:capitalize;font-weight:700}
        .skn-mli1 .companyname{font-weight:700}
        .skn-mli1 .institution{font-weight:700}
        .skn-mli1 .cert-name{font-weight:700}
        .skn-mli1 .jobcity{font-weight:normal}
        .skn-mli1 .degree{font-weight:bold}
        .skn-mli1 .programline{font-weight:normal}
        .skn-mli1 .lang-item{margin-bottom:5px}
        .skn-mli1 .lang-item:last-child{margin-bottom:0}
        .skn-mli1 .lang-name{margin-bottom:3px}
        .skn-mli1 .rating-bar{background:rgba(255,255,255,.25);width:100%;height:4px;position:relative}
        .skn-mli1 .inner-rating{background-color:#fff;height:4px;position:relative}
        .skn-mli1 .lang-proficiency{font-size:9px;margin-top:2px;opacity:0.8}
      `}</style>
      <div className="svg-skin">
        <div className="document doc-root doc-finalize fontsize fontface pagesize skn-mli1 pgsz-a4">
          <div className="parentContainer">
            {/* Left Box */}
            <div className="left-box">
              {/* Profile Picture */}
              {data.photo_url && (
                <div className="section pict-sec">
                  <div className="doc-item">
                    <div className="paragraph firstparagraph">
                      <div className="clearfix doc-item">
                        <div className="prflPic">
                          <div className="field">
                            <img src={data.photo_url} alt="Profile" />
                          </div>
                        </div>
                        <div className="clear"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Section */}
              <div className="section sec-cntc has-title">
                <div className="doc-item">
                  <div className="heading">
                    <div className="sectiontitle">{t.contact}</div>
                  </div>
                  <div className="paragraph firstparagraph">
                    <div className="clearfix doc-item">
                      <div className="address">
                        <div className="singlecolumn">
                          {/* Address */}
                          {(data.street_address || data.city || data.postcode) && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg width="11px" height="15px" viewBox="0 0 11 15">
                                  <path d="M5.390712,9.10533109 C3.337092,9.110718 1.661472,7.444818 1.65551617,5.390658 C1.649592,3.337038 3.316032,1.660878 5.370192,1.65546217 C7.423812,1.649538 9.099432,3.315978 9.10538783,5.370138 C9.111312,7.423758 7.444872,9.099378 5.390712,9.10533109 L5.390712,9.10533109 Z M5.365332,-0.000182380992 C2.398572,0.007938 -0.008208,2.428758 -0.000128385548,5.394978 C0.003132,6.606198 0.399492,7.748838 1.145772,8.699238 L5.404752,14.126778 L9.633492,8.675478 C10.374372,7.721298 10.764252,6.576498 10.761032,5.365278 C10.752912,2.399058 8.332092,-0.008262 5.365332,-0.000182380992 L5.365332,-0.000182380992 Z M5.798952,7.034958 L4.971132,7.037118 L4.967892,5.795658 L3.725892,5.798898 L3.723732,4.971078 L4.965192,4.967838 L4.961952,3.726378 L5.789772,3.723678 L5.793012,4.965138 L7.034472,4.961898 L7.037172,5.789718 L5.795712,5.792958 L5.798952,7.034958 Z M5.372352,2.48328723 C3.775032,2.487618 2.479032,3.791178 2.48334123,5.388498 C2.487672,6.985818 3.791232,8.281818 5.388552,8.27750877 C6.985872,8.273178 8.281872,6.969618 8.27756277,5.372298 C8.273232,3.774978 6.969672,2.478978 5.372352,2.48328723 L5.372352,2.48328723 Z" fill="#FFFFFF"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">
                                {data.street_address && <span>{data.street_address}</span>}
                                {data.street_address && data.city && <span>, </span>}
                                {data.city && <span>{data.city}</span>}
                                {data.postcode && <span> {data.postcode}</span>}
                              </div>
                            </div>
                          )}

                          {/* Phone */}
                          {data.phone && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg width="12px" height="12px" viewBox="0 0 12 12">
                                  <path d="M10.80006,8.7999 C9.63846,8.7999 8.53206,8.5473 7.51206,8.0487 C7.41606,8.0007 7.30566,7.9953 7.20546,8.0301 C7.10466,8.0655 7.02246,8.1393 6.97566,8.2347 L6.34746,9.5361 C4.72026,8.6277 3.37266,7.2819 2.46546,5.6541 L3.76626,5.0241 C3.86226,4.9773 3.93546,4.8951 3.97026,4.7943 C4.00506,4.6941 3.99846,4.5843 3.95106,4.4877 C3.45306,3.4677 3.19986,2.3619 3.19986,1.1997 C3.19986,0.9789 3.02106,0.8001 2.80026,0.8001 L0.40026,0.8001 C0.17886,0.8001 6e-05,0.9789 6e-05,1.1997 C6e-05,7.1553 4.84506,11.9997 10.80006,11.9997 C11.02086,11.9997 11.20026,11.8209 11.20026,11.6001 L11.20026,9.2001 C11.20026,8.9793 11.02086,8.7999 10.80006,8.7999 M6.40026,-0.0003 C6.17886,-0.0003 6.00006,0.1791 6.00006,0.3999 C6.00006,0.6207 6.17886,0.8001 6.40026,0.8001 C9.04746,0.8001 11.20026,2.9529 11.20026,5.6001 C11.20026,5.8209 11.37906,5.9997 11.59986,5.9997 C11.82066,5.9997 12.00006,5.8209 12.00006,5.6001 C12.00006,2.5119 9.48726,-0.0003 6.40026,-0.0003 M6.40026,1.5999 C6.17886,1.5999 6.00006,1.7793 6.00006,2.0001 C6.00006,2.2209 6.17886,2.3997 6.40026,2.3997 C8.16486,2.3997 9.60006,3.8355 9.60006,5.6001 C9.60006,5.8209 9.77886,5.9997 10.00026,5.9997 C10.22106,5.9997 10.39986,5.8209 10.39986,5.6001 C10.39986,3.3945 8.60526,1.5999 6.40026,1.5999 M6.40026,3.2001 C6.17886,3.2001 6.00006,3.3789 6.00006,3.5997 C6.00006,3.8211 6.17886,3.9999 6.40026,3.9999 C7.28226,3.9999 7.99986,4.7175 7.99986,5.6001 C7.99986,5.8209 8.17926,5.9997 8.40006,5.9997 C8.62086,5.9997 8.80026,5.8209 8.80026,5.6001 C8.80026,4.2765 7.72326,3.2001 6.40026,3.2001" fill="#FFFFFF"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">{data.phone}</div>
                            </div>
                          )}

                          {/* Email */}
                          {data.email && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg width="12px" height="12px" viewBox="0 0 12 12">
                                  <path d="M11.8425,0.06954 C11.7279,-0.01206 11.5767,-0.02286 11.4519,0.04254 L0.2019,5.91774 C0.0687,5.98674 -0.0099,6.12894 0.0009,6.27834 C0.0123,6.42834 0.1119,6.55674 0.2535,6.60534 L3.3807,7.67394 L10.0419,1.97934 L4.8873,8.18874 L10.1289,9.98034 C10.1679,9.99294 10.2087,10.00014 10.2501,10.00014 C10.3179,10.00014 10.3857,9.98154 10.4451,9.94554 C10.5399,9.88734 10.6047,9.79014 10.6209,9.68034 L11.9961,0.43074 C12.0165,0.29034 11.9577,0.15174 11.8425,0.06954 L11.8425,0.06954 Z M4.3749,8.80614 L6.4083,9.50094 L5.0523,11.34714 C4.9797,11.44494 4.8669,11.50014 4.7499,11.50014 C4.7109,11.50014 4.6713,11.49414 4.6329,11.48154 C4.4793,11.43054 4.3749,11.28714 4.3749,11.12514 L4.3749,8.80614 Z" fill="#FFFFFF"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">{data.email}</div>
                            </div>
                          )}

                          {/* Website */}
                          {data.website && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg width="12px" height="12px" viewBox="0 0 24 24">
                                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#FFFFFF"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">{data.website}</div>
                            </div>
                          )}

                          {/* LinkedIn */}
                          {data.linkedin && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg width="12px" height="12px" viewBox="0 0 24 24">
                                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" fill="#FFFFFF"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">{data.linkedin}</div>
                            </div>
                          )}

                          {/* Nationality */}
                          {data.nationality && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg width="12px" height="12px" viewBox="0 0 24 24">
                                  <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" fill="#FFFFFF"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">{data.nationality}</div>
                            </div>
                          )}

                          {/* Driving License */}
                          {data.driving_license && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg width="12px" height="12px" viewBox="0 0 24 24">
                                  <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="#FFFFFF"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">{data.driving_license}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              {skills.length > 0 && (
                <div className="section has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{t.skills}</div>
                    </div>
                    <div className="paragraph firstparagraph">
                      <div className="clearfix doc-item">
                        <div className="singlecolumn maincolumn">
                          <ul>
                            {skills.map((skill, index) => (
                              <li key={skill.id || index}>{skill.name}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Languages Section */}
              {data.languages && data.languages.length > 0 && (
                <div className="section lang-sec has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{t.languages}</div>
                    </div>
                    <div className="paragraph firstparagraph">
                      <div className="clearfix doc-item">
                        <div className="singlecolumn">
                          {data.languages.map((lang, index) => {
                            const level = lang.level || 3;
                            const widthPercent = (level / 5) * 100;
                            const proficiencyText = lang.proficiency
                              ? t[lang.proficiency as keyof typeof t] || lang.proficiency
                              : "";
                            return (
                              <div key={lang.id || index} className="lang-item">
                                <div className="lang-name">{lang.name}</div>
                                <div className="rating-bar">
                                  <div
                                    className="inner-rating"
                                    style={{ width: `${widthPercent}%` }}
                                  ></div>
                                </div>
                                {proficiencyText && (
                                  <div className="lang-proficiency">{proficiencyText}</div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Box */}
            <div className="right-box">
              {/* Name Section */}
              <div className="section firstsection">
                <div className="doc-item">
                  <div className="paragraph firstparagraph">
                    <div className="name">
                      <span>{data.first_name} </span>
                      <span>{data.last_name}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              {data.summary && (
                <div className="section has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{t.professional_summary}</div>
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

              {/* Work Experience */}
              {data.experiences && data.experiences.length > 0 && (
                <div className="section expr-sec multi-para has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{t.work_history}</div>
                    </div>
                    {data.experiences.map((exp, index) => (
                      <div
                        key={exp.id || index}
                        className={`paragraph ${index === 0 ? "firstparagraph" : ""}`}
                      >
                        <div className="clearfix doc-item">
                          <div className="singlecolumn">
                            <span className="paddedline locationGap">
                              <span className="jobtitle txt-bold">{exp.job_title}</span>
                              <span className="flt-right">
                                <span className="jobdates">
                                  {formatDate(exp.start_date, language)}
                                </span>
                                <span className="hyphen"></span>
                                <span className="jobdates">
                                  {exp.currently_working
                                    ? t.present
                                    : formatDate(exp.end_date, language)}
                                </span>
                              </span>
                            </span>
                            <span className="paddedline locationGap">
                              <span>
                                <span className="companyname txt-bold">{exp.company}</span>
                                {exp.location && (
                                  <>
                                    <span className="hyphen"></span>
                                    <span className="jobcity">{exp.location}</span>
                                  </>
                                )}
                              </span>
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
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {data.educations && data.educations.length > 0 && (
                <div className="section education multi-para has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{t.education}</div>
                    </div>
                    {data.educations.map((edu, index) => (
                      <div
                        key={edu.id || index}
                        className={`paragraph ${index === 0 ? "firstparagraph" : ""}`}
                      >
                        <div className="clearfix doc-item">
                          <div className="singlecolumn">
                            <div className="paddedline">
                              <span className="degree txt-bold">{edu.degree}</span>
                              {edu.field_of_study && (
                                <>
                                  <span className="txt-bold">: </span>
                                  <span className="programline">{edu.field_of_study}</span>
                                </>
                              )}
                              {edu.end_date && (
                                <>
                                  <span>, </span>
                                  <span className="jobdates">
                                    {formatDate(edu.end_date, language)}
                                  </span>
                                </>
                              )}
                            </div>
                            <div className="paddedline">
                              <span className="institution">{edu.institution}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates */}
              {data.certificates && data.certificates.length > 0 && (
                <div className="section has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{t.certificates}</div>
                    </div>
                    {data.certificates.map((cert, index) => (
                      <div
                        key={cert.id || index}
                        className={`paragraph ${index === 0 ? "firstparagraph" : ""}`}
                      >
                        <div className="clearfix doc-item">
                          <div className="singlecolumn">
                            <div className="paddedline">
                              <span className="cert-name">{cert.name}</span>
                              {cert.organization && <span> - {cert.organization}</span>}
                            </div>
                            {cert.issue_date && (
                              <div className="paddedline">
                                <span>{formatDate(cert.issue_date, language)}</span>
                                {!cert.no_expiry && cert.expiration_date && (
                                  <>
                                    <span className="hyphen"></span>
                                    <span>{formatDate(cert.expiration_date, language)}</span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
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
