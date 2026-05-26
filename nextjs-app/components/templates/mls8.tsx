/* eslint-disable */
// @ts-nocheck
import type { DynamicTemplateProps } from "@/types/resume";
import { sampleData } from "./sampleData";
import { translations } from "@/lib/translations";

const defaultTranslations = translations.en;

// Format date as "MM/YYYY" (e.g., "07/2014")
function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${year}`;
  } catch {
    return dateStr;
  }
}

export default function TemplateMls8({
  data = sampleData,
  translations: t = defaultTranslations,
  colorHex = "#9B3016",
}: Partial<DynamicTemplateProps> = {}) {
  const skills = data.skills || [];
  const midpoint = Math.ceil(skills.length / 2);
  const skillsColumn1 = skills.slice(0, midpoint);
  const skillsColumn2 = skills.slice(midpoint);

  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ');
  const initials = [
    data.first_name?.[0] || '',
    data.last_name?.[0] || ''
  ].filter(Boolean);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Halant:wght@600;700');
        @import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700');
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{text-align:left;font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-mls8 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        /*START content disc style for LI*/
        .skn-mls8 ul,.skn-mls8 li{list-style:none;margin:0;padding:0}
        .skn-mls8 ul li{position:relative;margin:0px;padding-bottom:3px}
        .skn-mls8 ul li:last-child{padding-bottom:0px}
        .skn-mls8 .section ul li:before{content:'';height:5px;width:5px;background:#000;border-radius:50%;position:absolute;top:3px;transform:scale(.5)}
        /*END content disc style for LI*/

        /*Helper Classes*/
        .skn-mls8 .paddedline{display:block}
        .skn-mls8 .jobline ul{margin-top:5px}
        .skn-mls8 .txt-bold{font-weight:bold}
        .skn-mls8 .flt-right{float:right}
        .skn-mls8 .txt-cptz{text-transform:capitalize}
        .skn-mls8 .disp-blk{display:block}
        .skn-mls8 .brk-all{word-break:break-all}

        /*Common styling*/
        .skn-mls8{color:#1A1A1A;font-variant-ligatures:none;word-wrap:break-word;position:relative;min-height:767px;box-sizing:border-box}
        .skn-mls8 .sectiontitle{font-weight:600;text-transform:capitalize;font-family:'Halant',serif!important;position:relative;color:${colorHex}}
        .skn-mls8 .sectiontitle::after{content:"";position:absolute;bottom:-2px;left:0;height:1px;background:#dadada;width:30px}
        .skn-mls8 .paragraph.firstparagraph{margin-top:0}

        /*Container*/
        .skn-mls8 .left-box,.skn-mls8 .right-box{display:table-cell;position:relative;vertical-align:top}

        /*top-section*/
        .skn-mls8 .inner-box{display:flex;justify-content:space-between}
        .skn-mls8 .top-section .section{padding-top:0}
        .skn-mls8 .name-sec{width:calc(100% - 117px);box-sizing:border-box;}
        .skn-mls8 .name{font-weight:700;text-transform:uppercase;font-family:'Halant', serif!important;color:${colorHex};font-size:36px;line-height:36px;padding-top:35px}
        .skn-mls8 .resume-title{font-weight:700;letter-spacing:0.5px;width:calc(100% - 117px);font-size:11px;line-height:14px;padding-top:5px}
        .skn-mls8 .name-wrap{margin:0 auto;border-radius:50%;overflow:hidden;display:flex;justify-content:center;align-items:center;border:2px solid #fff;box-sizing:border-box;width:75px;height:75px;background:${colorHex}}
        .skn-mls8 .name-sec .paragraph::after{content:"";clear:both;display:table}
        .skn-mls8 .address div:last-child{margin-bottom:0}

        /*Personal details section*/
        .skn-mls8 .details-wrap{margin-bottom:3px}
        .skn-mls8 .details-wrap:last-child{margin-bottom:0}

        /*Initial name*/
        .skn-mls8 .initial-name{font-size:28px}
        .skn-mls8 .initial-name span{color:#fff;display:inline-block;font-weight:700;font-family:'Halant',serif;vertical-align:middle;text-transform:uppercase;line-height:44px}
        .skn-mls8 .initial-name .seprationBar{transform:rotate(14deg);padding:0 4px 0 3px}

        .skn-mls8 .prfl-pic .field{border-radius:50%;box-sizing:border-box;text-align:center;margin:auto;border:2px solid #fff;width:75px;height:75px}
        .skn-mls8 .prfl-pic img{width:100%;height:100%;border-radius:50%;object-fit:cover;position:relative}
        .skn-mls8 .top-section .monogram-wrap,.skn-mls8 .top-section .prfl-pic{border-bottom-left-radius:50%;border-bottom-right-radius:50%;box-sizing:border-box;background-color:${colorHex};width:117px;height:132px;padding-top:23px;padding-bottom:15px}

        /*parent-container*/
        .skn-mls8 .parent-container{display:table;table-layout:fixed;width:100%}
        .skn-mls8 .parent-container .right-box{border-left:1px solid #dadada;vertical-align:top;padding-left:19px}
        .skn-mls8 .parent-container .right-box .section:first-child,.skn-mls8 .parent-container .left-box .section:first-child{padding-top:0}
        .skn-mls8 .exp-textsize{margin-bottom:2px;font-size:10px}
        .skn-mls8 .parent-container .left-box{box-sizing:border-box;width:146px;max-width:146px;padding-right:21px}
        .skn-mls8 .space-inpipe{padding:0 2px}

        .skn-mls8 .right-box .skill{display:table;width:100%;table-layout:fixed}
        .skn-mls8 .right-box .skill .paddedline{display:table-cell;width:50%}
        .skn-mls8 .right-box .skill .paddedline:last-child{padding-left:19px}

        /*Infographic*/
        .skn-mls8 .lang-sec{display:flex;flex-wrap:wrap;justify-content:space-between}
        .skn-mls8 .lang-sec .heading{width:100%;flex-grow:1}
        .skn-mls8 .lang-sec .paragraph{width:45.8%;display:inline-block;vertical-align:top;padding-bottom:8px;margin-top:0}
        .skn-mls8 .lang-sec .paragraph.nativeLangPara{width:100%;max-width:100%}
        .skn-mls8 .lang-sec .singlecolumn{margin-left:0;padding-left:0;position:relative}
        .skn-mls8 .lang-sec > .paragraph:nth-last-child(1),.skn-mls8 .lang-sec > .paragraph:nth-last-child(2){padding-bottom:0}
        .skn-mls8 .rating-bar{background:#D8D8D8;width:100%;clear:both;margin-top:3px;margin-bottom:3px;position:relative}
        .skn-mls8 .inner-rating{background-color:${colorHex};height:4px;position:relative}
        .skn-mls8 .left-box .lang-sec .paragraph{display:block;margin-right:0;width:100%;max-width:100%;margin-top:0;padding-bottom:5px}

        .skn-mls8{padding-left:40px;padding-right:40px;padding-bottom:35px}
        .skn-mls8,.skn-mls8 table{line-height:12px}
        .skn-mls8.pagesize{width:595px}
        .skn-mls8.fontsize,.skn-mls8 .lang-sec .paragraph *{font-size:9px}
        .skn-mls8.fontface{font-family:PT Sans}
        .skn-mls8 .section ul li:before{top:3px;left:5px}
        .skn-mls8 .section{padding-top:15px}
        .skn-mls8 .paragraph{margin-top:16px}
        .skn-mls8 .right-box .singlecolumn,.skn-mls8 .right-box .maincolumn{margin-left:0px}
        .skn-mls8 table.skills td{padding-top:7px}
        .skn-mls8 .heading{font-size:13px;line-height:16px;margin-bottom:13px}
        .skn-mls8 .top-section{margin-bottom:30px}
        .skn-mls8 .cntc-sec .ico-txt{line-height:14px}
        .skn-mls8 .edu-year{line-height:10px;margin-bottom:5px}
        .skn-mls8 .edu-degree{margin-bottom:3px}
        .skn-mls8 .address{padding-top:5px}
        .skn-mls8 .address div{margin-bottom:5px}
        .skn-mls8 ul li{padding-left:13px}
        .skn-mls8 .pict-sec{padding-right:30px}
        .skn-mls8 .totl-expr{background-color:${colorHex};display:inline-block;float:right;padding:0 5px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap;margin-left:5px;font-size:8px;line-height:12px;border-radius:10px}

        /* SVG Icon Style */
        .skn-mls8 .iconRow{display:table;table-layout:fixed;width:100%;margin-bottom:5px;word-wrap:break-word}
        .skn-mls8 .iconRow:last-child{margin-bottom:0}
        .skn-mls8 .iconSvg{width:8px;height:8px;display:table-cell;vertical-align:middle}
        .skn-mls8 .iconSvg svg{vertical-align:middle;fill:#1A1A1A;width:8px;height:8px}
        .skn-mls8 .icoTxt{display:table-cell;padding-left:8px}
        .skn-mls8 .social svg{transform:scale(1.5);fill:#1A1A1A}
        .skn-mls8 .iconRow.phone .iconSvg svg{transform:scale(1.3)}
    `}</style>
      <div className="svg-skin">
        <div className="document doc-root fontsize fontface pagesize skn-mls8">
          {/* Top Section - Photo and Name */}
          <div className="top-section">
            <div className="inner-box">
              {/* Photo/Monogram Section */}
              <div className="sortable-item section-container pict-sec">
                <div className="section pict-sec firstsection">
                  <div className="paragraph firstparagraph">
                    {data.photo_url ? (
                      <div className="prfl-pic">
                        <div className="field">
                          <img src={data.photo_url} alt="Profile" />
                        </div>
                      </div>
                    ) : (
                      <div className="monogram-wrap">
                        <div className="name-wrap">
                          <div className="initial-name">
                            {initials[0] && <span>{initials[0]}</span>}
                            {initials.length > 1 && <span className="seprationBar">|</span>}
                            {initials[1] && <span>{initials[1]}</span>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Name Section */}
              <div className="sortable-item section-container name-sec">
                <div className="section name-sec firstsection">
                  <div className="paragraph firstparagraph">
                    {fullName && <div className="name">{fullName}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Container - Left and Right boxes */}
          <div className="parent-container">
            {/* Left Box - Contact, Education */}
            <div className="left-box">
              {/* Contact Section */}
              <div className="section cntc-sec">
                <div className="heading">
                  <div className="sectiontitle">{t.contact}</div>
                </div>
                <div className="paragraph firstparagraph">
                  <div className="address">
                    {/* Email */}
                    {data.email && (
                      <div className="iconRow">
                        <div className="iconSvg">
                          <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 4.5C4.25 4.5 4.51562 4.42188 4.73438 4.25L8 1.71875V5.25C8 5.67188 7.65625 6 7.25 6H0.75C0.328125 6 0 5.67188 0 5.25V1.71875L3.25 4.25C3.46875 4.42188 3.73438 4.5 4 4.5ZM0.25 1.28125C0.09375 1.15625 0 0.953125 0 0.75C0 0.34375 0.328125 0 0.75 0H7.25C7.65625 0 8 0.34375 8 0.75C8 0.953125 7.89062 1.15625 7.73438 1.28125L4.42188 3.85938C4.17188 4.04688 3.8125 4.04688 3.5625 3.85938L0.25 1.28125Z" fill="#1A1A1A" />
                          </svg>
                        </div>
                        <div className="icoTxt">{data.email}</div>
                      </div>
                    )}

                    {/* Phone */}
                    {data.phone && (
                      <div className="iconRow phone">
                        <div className="iconSvg">
                          <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.98438 7.04688L7.60938 8.625C7.5625 8.85938 7.375 9.01562 7.14062 9.01562C3.20312 9 0 5.79688 0 1.85938C0 1.625 0.140625 1.4375 0.375 1.39062L1.95312 1.01562C2.17188 0.96875 2.40625 1.09375 2.5 1.29688L3.23438 3C3.3125 3.20312 3.26562 3.4375 3.09375 3.5625L2.25 4.25C2.78125 5.32812 3.65625 6.20312 4.75 6.73438L5.4375 5.89062C5.5625 5.73438 5.79688 5.67188 6 5.75L7.70312 6.48438C7.90625 6.59375 8.03125 6.82812 7.98438 7.04688Z" fill="#1A1A1A" />
                          </svg>
                        </div>
                        <div className="icoTxt">{data.phone}</div>
                      </div>
                    )}

                    {/* Address */}
                    {(data.street_address || data.city || data.postcode) && (
                      <div className="iconRow">
                        <div className="iconSvg">
                          <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 2.25C5 3.5 3.98438 4.5 2.75 4.5C1.5 4.5 0.5 3.5 0.5 2.25C0.5 1.01562 1.5 0 2.75 0C3.98438 0 5 1.01562 5 2.25ZM3 1C3 0.875 2.875 0.75 2.75 0.75C1.90625 0.75 1.25 1.42188 1.25 2.25C1.25 2.39062 1.35938 2.5 1.5 2.5C1.625 2.5 1.75 2.39062 1.75 2.25C1.75 1.70312 2.1875 1.25 2.75 1.25C2.875 1.25 3 1.14062 3 1ZM2.25 7.5V4.96875C2.40625 4.98438 2.57812 5 2.75 5C2.90625 5 3.07812 4.98438 3.25 4.96875V7.5C3.25 7.78125 3.01562 8 2.75 8C2.46875 8 2.25 7.78125 2.25 7.5Z" fill="#1A1A1A" />
                          </svg>
                        </div>
                        <div className="icoTxt">
                          {[data.street_address, data.city, data.postcode].filter(Boolean).join(', ')}
                        </div>
                      </div>
                    )}

                    {/* Website */}
                    {data.website && (
                      <div className="iconRow">
                        <div className="iconSvg">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 0C1.78125 0 0 1.79688 0 4C0 6.21875 1.78125 8 4 8C6.20312 8 8 6.21875 8 4C8 1.79688 6.20312 0 4 0ZM6.89062 2.5H5.70312C5.5625 1.82812 5.34375 1.23438 5.04688 0.75C5.89062 1.04688 6.5625 1.6875 6.89062 2.5ZM4 1C4.40625 1.40625 4.73438 1.92188 4.9375 2.5H3.04688C3.25 1.92188 3.57812 1.40625 4 1ZM1.14062 4.75C1.0625 4.51562 1 4.26562 1 4C1 3.75 1.0625 3.5 1.14062 3.25H2.51562C2.5 3.5 2.5 3.75 2.5 4C2.5 4.26562 2.5 4.51562 2.51562 4.75H1.14062ZM1.09375 5.5H2.28125C2.42188 6.1875 2.64062 6.78125 2.9375 7.26562C2.09375 6.96875 1.42188 6.32812 1.09375 5.5ZM2.28125 2.5H1.09375C1.42188 1.6875 2.09375 1.04688 2.9375 0.75C2.64062 1.23438 2.42188 1.82812 2.28125 2.5ZM4 7.01562C3.57812 6.59375 3.25 6.09375 3.04688 5.5H4.9375C4.73438 6.09375 4.40625 6.59375 4 7.01562ZM5.09375 4.75H2.89062C2.875 4.51562 2.875 4.26562 2.875 4C2.875 3.75 2.875 3.5 2.89062 3.25H5.09375C5.10938 3.5 5.10938 3.75 5.10938 4C5.10938 4.26562 5.10938 4.51562 5.09375 4.75ZM5.04688 7.26562C5.34375 6.78125 5.5625 6.1875 5.70312 5.5H6.89062C6.5625 6.32812 5.89062 6.96875 5.04688 7.26562ZM5.46875 4.75C5.48438 4.51562 5.48438 4.26562 5.48438 4C5.48438 3.75 5.48438 3.5 5.46875 3.25H6.84375C6.92188 3.5 6.98438 3.75 6.98438 4C6.98438 4.26562 6.92188 4.51562 6.84375 4.75H5.46875Z" fill="#1A1A1A" />
                          </svg>
                        </div>
                        <div className="icoTxt brk-all">{data.website}</div>
                      </div>
                    )}

                    {/* Driving License / Permit */}
                    {data.driving_license && (
                      <div className="iconRow">
                        <div className="iconSvg">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.609375 3.07812L1.15625 1.51562C1.375 0.90625 1.9375 0.5 2.57812 0.5H5.40625C6.04688 0.5 6.60938 0.90625 6.82812 1.51562L7.375 3.07812C7.73438 3.23438 8 3.59375 8 4V7C8 7.28125 7.76562 7.5 7.5 7.5H7C6.71875 7.5 6.5 7.28125 6.5 7V6.25H1.5V7C1.5 7.28125 1.26562 7.5 1 7.5H0.5C0.21875 7.5 0 7.28125 0 7V4C0 3.59375 0.25 3.23438 0.609375 3.07812ZM1.70312 3H6.28125L5.875 1.84375C5.8125 1.64062 5.625 1.5 5.40625 1.5H2.57812C2.35938 1.5 2.17188 1.64062 2.10938 1.84375L1.70312 3ZM1.5 4C1.21875 4 1 4.23438 1 4.5C1 4.78125 1.21875 5 1.5 5C1.76562 5 2 4.78125 2 4.5C2 4.23438 1.76562 4 1.5 4ZM6.5 5C6.76562 5 7 4.78125 7 4.5C7 4.23438 6.76562 4 6.5 4C6.21875 4 6 4.23438 6 4.5C6 4.78125 6.21875 5 6.5 5Z" fill="#1A1A1A" />
                          </svg>
                        </div>
                        <div className="icoTxt">{data.driving_license}</div>
                      </div>
                    )}

                    {/* Nationality */}
                    {data.nationality && (
                      <div className="iconRow">
                        <div className="iconSvg">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 7.75V0.5C1 0.234375 0.765625 0 0.5 0C0.21875 0 0 0.234375 0 0.5V7.75C0 7.89062 0.109375 8 0.25 8H0.75C0.875 8 1 7.89062 1 7.75ZM7.4375 0C7.73438 0 8 0.1875 8 0.484375V5.20312C8 5.39062 7.875 5.5625 7.65625 5.64062C6.98438 5.90625 6.42188 6 5.92188 6C4.76562 6 3.96875 5.51562 2.8125 5.51562C2.42188 5.51562 2 5.57812 1.5 5.73438V0.25C2.04688 0.078125 2.5 0.015625 2.89062 0.015625C3.96875 0.015625 4.51562 0.515625 5.45312 0.515625C5.89062 0.515625 6.42188 0.40625 7.125 0.078125C7.23438 0.03125 7.32812 0 7.4375 0Z" fill="#1A1A1A" />
                          </svg>
                        </div>
                        <div className="icoTxt">{data.nationality}</div>
                      </div>
                    )}

                    {/* LinkedIn */}
                    {data.linkedin && (
                      <div className="iconRow social">
                        <div className="iconSvg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 30 30">
                            <path d="M10.7,8.6c0,1.2-1,2.1-2,2.1s-2.1-1-2.1-2.1,1-2.1,2.1-2.1,2,1,2,2.1ZM10.3,12.1h-3.4v11.3h3.5v-11.3s-.1,0,0,0ZM16,12.1h-3.4v11.3h3.4v-5.9c0-1.6.7-2.5,2.1-2.5s1.9,1,1.9,2.5v5.9h3.5v-7.1c0-3-1.7-4.5-4.1-4.5s-3.4,1.9-3.4,1.9v-1.7h0Z" />
                          </svg>
                        </div>
                        <div className="icoTxt brk-all">{data.linkedin}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Education Section */}
              {data.educations && data.educations.length > 0 && (
                <div className="section">
                  <div className="heading">
                    <div className="sectiontitle">{t.education}</div>
                  </div>
                  {data.educations.map((edu, index) => (
                    <div key={edu.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                      <div className="singlecolumn">
                        {(edu.start_date || edu.end_date) && (
                          <span className="paddedline edu-year">
                            {edu.start_date && formatDate(edu.start_date)}
                            {edu.start_date && edu.end_date && ' - '}
                            {edu.currently_studying ? t.present : edu.end_date && formatDate(edu.end_date)}
                          </span>
                        )}
                        {(edu.degree || edu.field_of_study) && (
                          <span className="paddedline edu-degree">
                            {edu.degree && <span className="txt-bold txt-cptz">{edu.degree}</span>}
                            {edu.field_of_study && <span className="disp-blk">{edu.field_of_study}</span>}
                          </span>
                        )}
                        {(edu.institution || edu.location) && (
                          <span className="paddedline">
                            {edu.institution && <span className="txt-bold txt-cptz">{edu.institution}</span>}
                            {edu.institution && edu.location && <span className="txt-bold"> - </span>}
                            {edu.location && <span>{edu.location}</span>}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>

            {/* Right Box - Summary, Experience, Skills, Languages */}
            <div className="right-box">
              {/* Summary Section */}
              {data.summary && (
                <div className="section">
                  <div className="heading">
                    <div className="sectiontitle">{t.professional_summary}</div>
                  </div>
                  <div className="paragraph firstparagraph">
                    <div className="singlecolumn">
                      <p>{data.summary}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Work Experience Section */}
              {data.experiences && data.experiences.length > 0 && (
                <div className="section experience">
                  <div className="heading">
                    <div className="sectiontitle">{t.work_history}</div>
                  </div>
                  {data.experiences.map((exp, index) => (
                    <div key={exp.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                      <div className="singlecolumn">
                        {(exp.job_title || exp.company) && (
                          <span className="paddedline exp-textsize">
                            {exp.job_title && <span className="txt-bold">{exp.job_title}</span>}
                            {exp.job_title && exp.company && ' - '}
                            {exp.company && <span>{exp.company}</span>}
                          </span>
                        )}
                        {(exp.location || exp.start_date || exp.end_date) && (
                          <span className="paddedline">
                            <span className="dflex">
                              <span>
                                {exp.location && <span>{exp.location}</span>}
                                {exp.location && (exp.start_date || exp.end_date) && <span className="space-inpipe"> | </span>}
                                {exp.start_date && formatDate(exp.start_date)}
                                {exp.start_date && (exp.end_date || exp.currently_working) && ' - '}
                                {exp.currently_working ? t.present : exp.end_date && formatDate(exp.end_date)}
                              </span>
                            </span>
                          </span>
                        )}
                        {exp.description && (
                          <span className="jobline">
                            <ul>
                              {exp.description.split('\n').filter(Boolean).map((line, i) => (
                                <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                              ))}
                            </ul>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills Section */}
              {skills.length > 0 && (
                <div className="section">
                  <div className="heading">
                    <div className="sectiontitle">{t.skills}</div>
                  </div>
                  <div className="paragraph firstparagraph">
                    <div className="singlecolumn maincolumn">
                      <div className="skill">
                        <span className="paddedline">
                          <ul>
                            {skillsColumn1.map((skill, index) => (
                              <li key={skill.id || index}>{skill.name}</li>
                            ))}
                          </ul>
                        </span>
                        <span className="paddedline">
                          <ul>
                            {skillsColumn2.map((skill, index) => (
                              <li key={skill.id || index}>{skill.name}</li>
                            ))}
                          </ul>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Languages Section */}
              {data.languages && data.languages.length > 0 && (
                <div className="section lang-sec">
                  <div className="heading">
                    <div className="sectiontitle">{t.languages}</div>
                  </div>
                  {data.languages.map((lang, index) => {
                    const proficiencyText = lang.proficiency ? (t[lang.proficiency as keyof typeof t] || lang.proficiency) : '';
                    const ratingWidth = lang.level ? (lang.level / 5) * 100 : 60;
                    return (
                      <div key={lang.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                        <div className="singlecolumn">
                          <div className="field">
                            <span className="txt-bold">{lang.name}</span>
                          </div>
                          {lang.level && (
                            <div className="rating-bar">
                              <div className="inner-rating" style={{ width: `${ratingWidth}%` }} />
                            </div>
                          )}
                          {proficiencyText && (
                            <div className="field field-ratt">
                              <span>{proficiencyText}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Certificates Section */}
              {data.certificates && data.certificates.length > 0 && (
                <div className="section">
                  <div className="heading">
                    <div className="sectiontitle">{t.certificates}</div>
                  </div>
                  {data.certificates.map((cert, index) => (
                    <div key={cert.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                      <div className="singlecolumn">
                        <span className="paddedline txt-bold">{cert.name}</span>
                        {cert.organization && <span className="paddedline">{cert.organization}</span>}
                        {cert.issue_date && <span className="paddedline">{formatDate(cert.issue_date)}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
