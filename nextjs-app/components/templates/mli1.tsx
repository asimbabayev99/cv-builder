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

                          {/* Nationality */}
                          {data.nationality && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg width="10px" height="13px" viewBox="0 0 10 13">
                                  <path d="M9.18516,7.4406 C9.28996,7.5986 9.30036,7.8014 9.21076,7.9694 C9.12116,8.137 8.94676,8.2414 8.75676,8.2414 L1.03036,8.2414 L1.03036,11.847 C1.03036,12.1322 0.79996,12.3622 0.51516,12.3622 C0.23036,12.3622 -4e-05,12.1322 -4e-05,11.847 L-4e-05,0.515 C-4e-05,0.2302 0.23036,-0.0002 0.51516,-0.0002 C0.79996,-0.0002 1.03036,0.2302 1.03036,0.515 L1.03036,1.0302 L8.75676,1.0302 C8.94676,1.0302 9.12116,1.1346 9.21076,1.3022 C9.30036,1.4702 9.28996,1.673 9.18516,1.831 L7.31516,4.6358 L9.18516,7.4406 Z" id="Fill-1" fill="#FFFFFF" mask="url(#mask-2)"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">{data.nationality}</div>
                            </div>
                          )}

                          {/* Driving License */}
                          {data.driving_license && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg width="14px" height="10px" viewBox="0 0 14 11">
                                  <path d="M2.49992235,10 C2.96007657,10 3.33325568,9.62682088 3.33325568,9.16666667 L3.33325568,8.33333333 L9.99992235,8.33333333 L9.99992235,9.16666667 C9.99992235,9.62682088 10.3731015,10 10.8332557,10 L11.666589,10 C12.1267432,10 12.4999224,9.62682088 12.4999224,9.16666667 L12.4999224,7.75858561 C12.7561683,7.46561686 12.916589,7.0867157 12.916589,6.66666667 L12.916589,5.41666667 C12.916589,4.91615295 12.6913184,4.47214762 12.3418413,4.16666667 L12.8645057,4.16666667 C13.0079892,4.16666667 13.1329841,4.06901042 13.1676215,3.92995199 L13.3238715,3.30495199 C13.3731066,3.10780843 13.2238756,2.91666667 13.0205014,2.91666667 L11.4613837,2.91666667 L11.0280596,1.83334351 C10.5827318,0.719528198 9.51998257,9.9475983e-14 8.32023485,9.9475983e-14 L5.01294318,9.9475983e-14 C3.81347521,9.9475983e-14 2.75044624,0.719528198 2.30486416,1.83334351 L1.87153999,2.91666667 L0.312676664,2.91666667 C0.109302437,2.91666667 -0.0399285204,3.10780843 0.00956081879,3.30495199 L0.165810819,3.92995199 C0.20044827,4.06901042 0.325443184,4.16666667 0.468926664,4.16666667 L0.991591052,4.16666667 C0.641859606,4.47214762 0.416589017,4.91615295 0.416589017,5.41666667 L0.416589017,6.66666667 C0.416589017,7.08646139 0.577009753,7.46536255 0.833255684,7.75858561 L0.833255684,9.16666667 C0.833255684,9.62682088 1.2064348,10 1.66658902,10 L2.49992235,10 Z M9.99992235,3.75 L3.33325568,3.75 L3.85225796,2.45234172 C4.04210273,1.97786967 4.50174832,1.66666667 5.01294318,1.66666667 L8.32023485,1.66666667 C8.83142972,1.66666667 9.2910753,1.97786967 9.48092007,2.45234172 L9.99992235,3.75 Z M2.49992235,6.66145325 C1.99991726,6.66145325 1.66658902,6.32916768 1.66658902,5.83073934 C1.66658902,5.33228556 1.99991726,5 2.49992235,5 C2.99992744,5 3.74992235,5.74765523 3.74992235,6.24608358 C3.74992235,6.74453735 2.99992744,6.66145325 2.49992235,6.66145325 Z M9.58325568,6.24608358 C9.58325568,5.74765523 10.3332506,5 10.8332557,5 C11.3332608,5 11.666589,5.33228556 11.666589,5.83073934 C11.666589,6.32916768 11.3332608,6.66145325 10.8332557,6.66145325 C10.3332506,6.66145325 9.58325568,6.74453735 9.58325568,6.24608358 Z" id="vehicle" fill="#FFFFFF" fill-rule="nonzero"></path>
                                </svg>
                              </div>
                              <div className="icoTxt">{data.driving_license}</div>
                            </div>
                          )}

                          {/* Website */}
                          {data.website && (
                            <div className="iconRow">
                              <div className="iconSvg">
                                <svg width="12px" height="12px" viewBox="0 0 12 12">
                                  <path d="M10.8656578,6.57240514 C9.353263,8.08481873 6.91727137,8.06241853 5.42767649,6.57240514 C4.56887944,5.71399743 3.15488429,5.69679728 2.2792873,6.57240514 C1.40929029,7.44241296 1.39009035,8.86962578 2.26008737,9.7396336 C3.13048438,10.6100414 4.55727948,10.5908412 5.42767649,9.72083343 C5.89687487,9.25122921 6.10887415,8.62722361 6.07447426,8.02081816 C6.57807253,8.27242042 7.12207067,8.42722181 7.68286874,8.47282222 C7.61446897,9.34323004 7.24207025,10.1960377 6.57247255,10.8656437 C5.0728777,12.3652572 2.61528615,12.3844574 1.1152913,10.8848439 C-0.38430355,9.38483041 -0.365503615,6.92720833 1.13449123,5.42759486 C2.64688604,3.91518127 5.08247767,3.93758147 6.57247255,5.42759486 C7.4312696,6.28640257 8.84526475,6.30320272 9.72086174,5.42759486 C10.5908587,4.55758704 10.6100587,3.13037422 9.74006167,2.2599664 C8.86966466,1.38995858 7.44246956,1.40915875 6.57247255,2.27916657 C6.10327416,2.74837078 5.89127489,3.37237639 5.92567477,3.97918184 C5.4220765,3.72757958 4.87807837,3.57277819 4.3168803,3.52717778 C4.38568006,2.65676996 4.75767879,1.8039623 5.42767649,1.13435628 C6.92727133,-0.365257191 9.38486289,-0.384457363 10.8848577,1.11515611 C12.3844526,2.61476958 12.3652527,5.07239167 10.8656578,6.57240514" id="link" fill="#FFFFFF"></path>
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
