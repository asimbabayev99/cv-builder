/* eslint-disable */
// @ts-nocheck
import { ResumeData, SupportedLanguage } from '@/types/resume';
import { getTranslations } from '@/lib/translations';
import { sampleData } from './sampleData';

interface TemplateMls9Props {
  data?: ResumeData;
  translations?: ReturnType<typeof getTranslations>;
  language?: SupportedLanguage;
  colorHex?: string;
}

export default function TemplateMls9({
  data = sampleData,
  translations = getTranslations('en'),
  language = 'en',
  colorHex = '#102A73'
}: TemplateMls9Props) {
  const fullName = [data.first_name, data.last_name].filter(Boolean).join(' ') || 'Your Name';
  const location = [data.city, data.country].filter(Boolean).join(', ');

  return (
    <>
      <style>{`
        html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td{margin:0;padding:0;border:0;outline:0;vertical-align:baseline;background:transparent}
        body{font-feature-settings:"liga" 0;-moz-font-feature-settings:"liga" off}
        .skn-mls9 table{border-collapse:collapse;border-spacing:0;font-size:inherit;color:inherit;width:100%}

        /*START content disc style for LI*/
        .skn-mls9 ul,.skn-mls9 li{list-style:none;margin:0 0 0 3px;padding:0}
        .skn-mls9 ul{margin-top:10px}
        .skn-mls9 ul li{position:relative;margin:0 0 5px 0px;padding-left:9px}
        .skn-mls9 ul li:before{content:"";position:absolute;left:-3px;top:9px;padding:2px;transform:scale(0.7);background:#2a2a2a}
        .skn-mls9 .right-box ul{margin:10px 0 0 13px}
        .skn-mls9 .right-box ul li{padding-left:10px}
        .skn-mls9 .skill ul{margin-top:0}
        .skn-mls9 .skill ul li:last-child,.skn-mls9 ul li:last-child{margin-bottom:0}
        .skn-mls9 .skill .paddedline:first-child{margin-bottom:5px}
        /*END content disc style for LI*/

        .skn-mls9 .paddedline{display:block}
        .skn-mls9 .txt-bold{font-weight:bold}
        .skn-mls9 .displayNoneThisField{display:none}
        .skn-mls9 .flt-right{float:right}
        .skn-mls9 .brk-all{word-break:break-all}
        .skn-mls9 .txt-itlic{font-style:italic}
        .skn-mls9 .txt-cptz{text-transform:capitalize}

        /*Hyphen Handling*/
        .skn-mls9 .hyphen:before{content:' - '}

        /*Document*/
        .skn-mls9{color:#2A2A2A;line-height:14px;font-variant-ligatures:none;word-wrap:break-word;position:relative;min-height:792px;box-sizing:border-box}
        .skn-mls9 .topsection,.skn-mls9 .topsection .left-box,.skn-mls9 .section,.skn-mls9 .parent-container,.skn-mls9 .name-sec{position:relative}
        .skn-mls9 .topsection::before{content:"";position:absolute;width:100%;height:100%;left:0;top:0;opacity:0.15;background:${colorHex}}
        .skn-mls9 .topsection .left-box{display:flex;justify-content:space-between;align-items:center}
        .skn-mls9 .topsection .left-box::before{content:"";position:absolute;width:calc(100% - 248px);background:linear-gradient(to right , ${colorHex} 10px, #fff 10px);box-sizing:border-box;position:absolute;top:100%;left:248px}
        .skn-mls9 .topsection .left-box::after{content:"";position:absolute;width:228px;height:10px;background:${colorHex};left:0;top:100%}
        .skn-mls9 .name{letter-spacing:4.43px;text-transform:uppercase;word-break:break-word;font-family:'Georgia'}
        .skn-mls9 .prof-title{letter-spacing:0.5px;text-transform:capitalize;margin-top:5px}
        .skn-mls9 .parent-container{display:flex;flex-wrap:wrap;justify-content:space-between;position:relative}
        .skn-mls9 .sectiontitle{font-weight:bold;text-transform:uppercase;font-family:'Georgia';letter-spacing:0.5px}
        .skn-mls9 .name-sec{flex-grow:1}
        .skn-mls9 .parent-container .left-box,.skn-mls9 .parent-container .right-box{box-sizing:border-box}
        .skn-mls9 .parent-container .section:last-child{margin:0}
        .skn-mls9 .social a{color:#000;text-decoration:none}
        .skn-mls9 .social a:hover{text-decoration:underline}
        .skn-mls9 .address{word-break:break-all;word-break:break-word}
        .skn-mls9 .address div:last-child{margin-bottom:0}
        .skn-mls9 .right-box .skill{display:table;width:100%;table-layout:fixed}
        .skn-mls9 .right-box .skill .paddedline{display:table-cell;width:50%}
        .skn-mls9 .prfl-pic .field{border-radius:50%;box-sizing:border-box}
        .skn-mls9 .prfl-pic img{width:100%;height:100%;border-radius:50%;object-fit:cover}
        .skn-mls9 .details-wrap{margin-bottom:5px}
        .skn-mls9 .details-wrap:last-child{margin-bottom:0}

        .skn-mls9 .monogram{border-radius:50%;box-sizing:border-box}
        .skn-mls9 .monogram .svg-box{display:flex;justify-content:center;align-items:center;border-radius:30px;box-sizing:border-box;border:1px solid #AFAFAF;position:relative}
        .skn-mls9 .monogram .initial-name span{text-transform:uppercase;fill:#000;font-family: "Georgia"}

        /* SVG Icon Style */
        .skn-mls9 .iconRow{display:table;table-layout:fixed;width:100%;margin-bottom:5px;word-wrap:break-word}
        .skn-mls9 .iconRow:last-child{margin-bottom:0}
        .skn-mls9 .iconSvg{width:8px;height:8px;display:table-cell;vertical-align:middle}
        .skn-mls9 .iconSvg svg{vertical-align:middle;fill:#fff;width:8px;height:8px}
        .skn-mls9 .icoTxt{display:table-cell;padding-left:11px}
        .skn-mls9 .social svg{transform:scale(1.8);fill: #34383C}
        .skn-mls9 .iconRow.phone .iconSvg svg{transform: scale(1.4)}
        .skn-mls9 .iconRow.phone .iconSvg svg{margin-bottom:2px}
        .skn-mls9 .iconRow.social svg path.svg-inricon{fill: #34383C}

        /*New logic for infographic*/
        .skn-mls9 .lang-sec .singlecolumn{display:none}
        .skn-mls9 .lang-sec.infobarsec .infobarpara{display:block}

        /*Infographic*/
        .skn-mls9 .lang-sec{font-size:0}
        .skn-mls9 .lang-sec .field *{display:inline}
        .skn-mls9 .lang-sec .paragraph{margin-top:0}
        .skn-mls9 .lang-sec.infobarsec .rating-bar{background:#D8D8D8;width:100%;clear:both;position:relative;page-break-inside:avoid}
        .skn-mls9 .lang-sec.infobarsec .inner-rating{height:4px;position:relative;width:60%;background:#000}
        .skn-mls9 .left-box .lang-sec.infobarsec .rating-bar:before{content:'';position:absolute;height:4px;width:100%;left:0;top:0;background:#D8D8D8}
        .skn-mls9 .left-box .lang-sec .paragraph{display:block;margin-right:0!important;width:100%!important;max-width:100%!important;margin-top:0!important}

        /*Infographic Languages*/
        .skn-mls9 .lang-sec .colon{display:none}
        .skn-mls9 .lang-sec .lang-space{margin-bottom:6px}
        .skn-mls9 .lang-sec .paragraph .lang-scale *,.skn-mls9 .lang-sec.infobarsec .paragraph .lang-scale *{font-size:8px;line-height:10px;margin-top:3px;color:#000}

        /*Rectangular Rating Blocks*/
        .skn-mls9 .hide-bar .rating-bar,.skn-mls9 .hide-colon .colon{display:none!important}

        .skn-mls9 .disp-blk{display:block}

        /* Duration tag */
        .skn-mls9 .totl-expr{display:inline-block;float:right;padding:0 5px;color:#fff;font-weight:700;vertical-align:top;text-wrap:nowrap;margin-left:5px;font-style:normal;background-color:${colorHex};font-size:8px;line-height:14px}
        .skn-mls9 .dflex{display:flex;justify-content:space-between}
        .skn-mls9 .left-box .totl-expr{display: none}

        .skn-mls9,.skn-mls9 table{line-height:14px}
        .skn-mls9{padding-bottom:38px}
        .skn-mls9.pagesize{width:595px}
        .skn-mls9.fontsize{font-size:10px}
        .skn-mls9.fontface{font-family:Verdana}
        .skn-mls9 .topsection .left-box{padding:41px 50px 24px 50px;margin-bottom:40px}
        .skn-mls9 .parent-container{padding:0px 50px 0px 50px}
        .skn-mls9 .parent-container .section{margin-bottom:30px}
        .skn-mls9 .parent-container .left-box{margin-right:50px;width:142px}
        .skn-mls9 .parent-container .right-box{width:calc(100% - 197px)}
        .skn-mls9 .topsection .left-box::before{height:10px;background:linear-gradient(to right , ${colorHex} 10px, #fff 10px);background-size:28px;width:calc(100% - 248px);left:248px}
        .skn-mls9 .topsection .left-box::after,.skn-mls9 .topsection::before{background:${colorHex}}
        .skn-mls9 .topsection .left-box::after{width:228px}
        .skn-mls9 .address{line-height:12px}
        .skn-mls9 .paragraph{margin-top:20px}
        .skn-mls9 .parent-container .left-box .paragraph{margin-top:15px}
        .skn-mls9 .firstparagraph{margin-top:0!important}
        .skn-mls9 .heading{margin-bottom:10px}
        .skn-mls9 .right-box .singlecolumn,.skn-mls9 .right-box .maincolumn{margin-left:0px}
        .skn-mls9 .name{font-size:31px;line-height:35px}
        .skn-mls9 .prof-title{font-size:12px;line-height:15px}
        .skn-mls9 .sectiontitle{font-size:12px;line-height:14px}
        .skn-mls9 .edu-year,.skn-mls9 .exp-space{margin-bottom:5px}
        .skn-mls9 .address div{margin-bottom:10px}
        .skn-mls9 .right-box .skill .paddedline:last-child{padding-left:10px}
        .skn-mls9 .pict-sec{margin-right:15px}
        .skn-mls9 .prfl-pic .field,.skn-mls9 .monogram{width:60px;height:60px}
        .skn-mls9 .monogram .svg-box{width:60px;height:60px}
        .skn-mls9 .monogram .initial-name span{font-size:27px;line-height:31px}
        .skn-mls9 ul li:before{top:5px}
        .skn-mls9 .iconSvg{width:8px;height:8px}
        .skn-mls9 .iconSvg svg{width:8px;height:8px}
        .skn-mls9 .icoTxt{padding-left:11px}

        /*Infographic Bar*/
        .skn-mls9 .lang-sec.infobarsec .paragraph *{font-size:10px}
        .skn-mls9 .left-box .lang-sec .paragraph{padding-bottom:10px}
        .skn-mls9 .lang-sec .paragraph:last-child{padding-bottom:0}
      `}</style>
      <div className="svg-skin">
        <div className="document doc-root fontsize fontface pagesize skn-mls9 MLS9">
          {/* Top Section with Name */}
          <div className="topsection">
            <div className="left-box">
              {/* Name Section */}
              <div className="section name-sec">
                <div className="name">
                  {data.first_name && <span>{data.first_name}</span>}
                  {data.first_name && data.last_name && ' '}
                  {data.last_name && <span>{data.last_name}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="parent-container">
            {/* Left Box */}
            <div className="left-box">
              {/* Contact Section */}
              <div className="section cntc-sec">
                <div className="doc-item">
                  <div className="paragraph firstparagraph">
                    <div className="address">
                      {/* Email */}
                      {data.email && (
                        <div className="iconRow">
                          <div className="iconSvg">
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M4 4.5C4.25 4.5 4.51562 4.42188 4.73438 4.25L8 1.71875V5.25C8 5.67188 7.65625 6 7.25 6H0.75C0.328125 6 0 5.67188 0 5.25V1.71875L3.25 4.25C3.46875 4.42188 3.73438 4.5 4 4.5ZM0.25 1.28125C0.09375 1.15625 0 0.953125 0 0.75C0 0.34375 0.328125 0 0.75 0H7.25C7.65625 0 8 0.34375 8 0.75C8 0.953125 7.89062 1.15625 7.73438 1.28125L4.42188 3.85938C4.17188 4.04688 3.8125 4.04688 3.5625 3.85938L0.25 1.28125Z" fill="#1A1A1A"></path>
                            </svg>
                          </div>
                          <div className="icoTxt">
                            <span>{data.email}</span>
                          </div>
                        </div>
                      )}

                      {/* Phone */}
                      {data.phone && (
                        <div className="iconRow phone">
                          <div className="iconSvg">
                            <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M7.98438 7.04688L7.60938 8.625C7.5625 8.85938 7.375 9.01562 7.14062 9.01562C3.20312 9 0 5.79688 0 1.85938C0 1.625 0.140625 1.4375 0.375 1.39062L1.95312 1.01562C2.17188 0.96875 2.40625 1.09375 2.5 1.29688L3.23438 3C3.3125 3.20312 3.26562 3.4375 3.09375 3.5625L2.25 4.25C2.78125 5.32812 3.65625 6.20312 4.75 6.73438L5.4375 5.89062C5.5625 5.73438 5.79688 5.67188 6 5.75L7.70312 6.48438C7.90625 6.59375 8.03125 6.82812 7.98438 7.04688Z" fill="#1A1A1A"></path>
                            </svg>
                          </div>
                          <div className="icoTxt">
                            <span>{data.phone}</span>
                          </div>
                        </div>
                      )}

                      {/* Address */}
                      {location && (
                        <div className="iconRow">
                          <div className="iconSvg">
                            <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 2.25C5 3.5 3.98438 4.5 2.75 4.5C1.5 4.5 0.5 3.5 0.5 2.25C0.5 1.01562 1.5 0 2.75 0C3.98438 0 5 1.01562 5 2.25ZM3 1C3 0.875 2.875 0.75 2.75 0.75C1.90625 0.75 1.25 1.42188 1.25 2.25C1.25 2.39062 1.35938 2.5 1.5 2.5C1.625 2.5 1.75 2.39062 1.75 2.25C1.75 1.70312 2.1875 1.25 2.75 1.25C2.875 1.25 3 1.14062 3 1ZM2.25 7.5V4.96875C2.40625 4.98438 2.57812 5 2.75 5C2.90625 5 3.07812 4.98438 3.25 4.96875V7.5C3.25 7.78125 3.01562 8 2.75 8C2.46875 8 2.25 7.78125 2.25 7.5Z" fill="#1A1A1A"></path>
                            </svg>
                          </div>
                          <div className="icoTxt">
                            <span>{location}</span>
                          </div>
                        </div>
                      )}

                      {/* Website */}
                      {data.website && (
                        <div className="iconRow">
                          <div className="iconSvg">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.5 4C5.5 4.35938 5.46875 4.6875 5.4375 5H2.54688C2.51562 4.6875 2.48438 4.35938 2.48438 4C2.48438 3.65625 2.51562 3.32812 2.54688 3H5.4375C5.46875 3.32812 5.5 3.65625 5.5 4ZM7.85938 3C7.95312 3.32812 8 3.65625 8 4C8 4.35938 7.95312 4.6875 7.85938 5H5.9375C5.96875 4.6875 6 4.34375 6 4C6 3.65625 5.96875 3.32812 5.9375 3H7.85938ZM7.70312 2.5H5.875C5.71875 1.51562 5.40625 0.671875 5.01562 0.140625C6.23438 0.46875 7.23438 1.34375 7.70312 2.5ZM5.375 2.5H2.60938C2.70312 1.9375 2.85938 1.4375 3.03125 1.03125C3.20312 0.65625 3.375 0.390625 3.5625 0.21875C3.73438 0.0625 3.875 0 4 0C4.10938 0 4.25 0.0625 4.42188 0.21875C4.60938 0.390625 4.78125 0.65625 4.95312 1.03125C5.125 1.4375 5.28125 1.9375 5.375 2.5ZM0.28125 2.5C0.75 1.34375 1.75 0.46875 2.96875 0.140625C2.57812 0.671875 2.26562 1.51562 2.10938 2.5H0.28125ZM2.04688 3C2.01562 3.32812 1.98438 3.65625 1.98438 4C1.98438 4.34375 2.01562 4.6875 2.04688 5H0.125C0.03125 4.6875 0 4.35938 0 4C0 3.65625 0.03125 3.32812 0.125 3H2.04688ZM3.03125 6.98438C2.85938 6.57812 2.70312 6.07812 2.60938 5.5H5.375C5.28125 6.07812 5.125 6.57812 4.95312 6.98438C4.78125 7.35938 4.60938 7.625 4.42188 7.79688C4.25 7.95312 4.10938 8 3.98438 8C3.875 8 3.73438 7.95312 3.5625 7.79688C3.375 7.625 3.20312 7.35938 3.03125 6.98438ZM2.96875 7.875C1.75 7.54688 0.75 6.67188 0.28125 5.5H2.10938C2.26562 6.5 2.57812 7.34375 2.96875 7.875ZM5.01562 7.875C5.40625 7.34375 5.71875 6.5 5.875 5.5H7.70312C7.23438 6.67188 6.23438 7.54688 5.01562 7.875Z" fill="#1A1A1A"></path>
                            </svg>
                          </div>
                          <div className="icoTxt brk-all">
                            <span>{data.website}</span>
                          </div>
                        </div>
                      )}

                      {/* Driving License */}
                      {data.driving_license && (
                        <div className="iconRow">
                          <div className="iconSvg">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.609375 3.07812L1.15625 1.51562C1.375 0.90625 1.9375 0.5 2.57812 0.5H5.40625C6.04688 0.5 6.60938 0.90625 6.82812 1.51562L7.375 3.07812C7.73438 3.23438 8 3.59375 8 4V7C8 7.28125 7.76562 7.5 7.5 7.5H7C6.71875 7.5 6.5 7.28125 6.5 7V6.25H1.5V7C1.5 7.28125 1.26562 7.5 1 7.5H0.5C0.21875 7.5 0 7.28125 0 7V4C0 3.59375 0.25 3.23438 0.609375 3.07812ZM1.70312 3H6.28125L5.875 1.84375C5.8125 1.64062 5.625 1.5 5.40625 1.5H2.57812C2.35938 1.5 2.17188 1.64062 2.10938 1.84375L1.70312 3ZM1.5 4C1.21875 4 1 4.23438 1 4.5C1 4.78125 1.21875 5 1.5 5C1.76562 5 2 4.78125 2 4.5C2 4.23438 1.76562 4 1.5 4ZM6.5 5C6.76562 5 7 4.78125 7 4.5C7 4.23438 6.76562 4 6.5 4C6.21875 4 6 4.23438 6 4.5C6 4.78125 6.21875 5 6.5 5Z" fill="#1A1A1A"></path>
                            </svg>
                          </div>
                          <div className="icoTxt">
                            <span>{data.driving_license}</span>
                          </div>
                        </div>
                      )}

                      {/* Nationality */}
                      {data.nationality && (
                        <div className="iconRow">
                          <div className="iconSvg">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 7.75V0.5C1 0.234375 0.765625 0 0.5 0C0.21875 0 0 0.234375 0 0.5V7.75C0 7.89062 0.109375 8 0.25 8H0.75C0.875 8 1 7.89062 1 7.75ZM7.4375 0C7.73438 0 8 0.1875 8 0.484375V5.20312C8 5.39062 7.875 5.5625 7.65625 5.64062C6.98438 5.90625 6.42188 6 5.92188 6C4.76562 6 3.96875 5.51562 2.8125 5.51562C2.42188 5.51562 2 5.57812 1.5 5.73438V0.25C2.04688 0.078125 2.5 0.015625 2.89062 0.015625C3.96875 0.015625 4.51562 0.515625 5.45312 0.515625C5.89062 0.515625 6.42188 0.40625 7.125 0.078125C7.23438 0.03125 7.32812 0 7.4375 0Z" fill="#1A1A1A"></path>
                            </svg>
                          </div>
                          <div className="icoTxt">
                            <span>{data.nationality}</span>
                          </div>
                        </div>
                      )}

                      {/* LinkedIn */}
                      {data.linkedin && (
                        <div className="iconRow social">
                          <div className="iconSvg">
                            <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 30 30">
                              <path className="svg-inricon" d="M10.7,8.6c0,1.2-1,2.1-2,2.1s-2.1-1-2.1-2.1,1-2.1,2.1-2.1,2,1,2,2.1ZM10.3,12.1h-3.4v11.3h3.5v-11.3s-.1,0,0,0ZM16,12.1h-3.4v11.3h3.4v-5.9c0-1.6.7-2.5,2.1-2.5s1.9,1,1.9,2.5v5.9h3.5v-7.1c0-3-1.7-4.5-4.1-4.5s-3.4,1.9-3.4,1.9v-1.7h0Z"></path>
                            </svg>
                          </div>
                          <div className="icoTxt">
                            <span>{data.linkedin}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              {data.skills && data.skills.length > 0 && (
                <div className="section has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{translations.skills}</div>
                    </div>
                    <div className="paragraph firstparagraph">
                      <div className="singlecolumn maincolumn">
                        <div className="skill">
                          <span className="paddedline">
                            <ul>
                              {data.skills.map((skill, index) => (
                                <li key={skill.id || index}>{skill.name}</li>
                              ))}
                            </ul>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Right Box */}
            <div className="right-box">
              {/* Summary Section */}
              {data.summary && (
                <div className="section has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{translations.summary}</div>
                    </div>
                    <div className="paragraph firstparagraph">
                      <div className="singlecolumn">
                        <p>{data.summary}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Work Experience Section */}
              {data.experiences && data.experiences.length > 0 && (
                <div className="section expr-sec has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{translations.experience}</div>
                    </div>
                    {data.experiences.map((exp, index) => (
                      <div key={exp.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                        <div className="singlecolumn">
                          <span className="paddedline exp-space">
                            <span className="txt-bold txt-cptz">{exp.job_title}</span>
                            {exp.job_title && exp.company && <span className="txt-bold">. </span>}
                            <span>{exp.company}</span>
                          </span>
                          <span className="paddedline txt-itlic">
                            <span className="dflex">
                              <span>
                                {exp.start_date && <span>{exp.start_date}</span>}
                                {exp.start_date && (exp.end_date || exp.currently_working) && <span className="hyphen"></span>}
                                {exp.currently_working ? <span>Current</span> : exp.end_date && <span>{exp.end_date}</span>}
                                {(exp.start_date || exp.end_date) && exp.location && <span> | </span>}
                                {exp.location && <span>{exp.location}</span>}
                              </span>
                            </span>
                          </span>
                          {exp.description && (
                            <span className="jobline">
                              <ul>
                                {exp.description.split('\n').filter(line => line.trim()).map((line, i) => (
                                  <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                                ))}
                              </ul>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {data.educations && data.educations.length > 0 && (
                <div className="section edu-sec has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{translations.education}</div>
                    </div>
                    {data.educations.map((edu, index) => (
                      <div key={edu.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                        <div className="singlecolumn">
                          <span className="disp-blk edu-degree">
                            <span className="txt-bold">{edu.degree}</span>
                            {edu.degree && edu.field_of_study && <span className="txt-bold hyphen"> </span>}
                            <span>{edu.field_of_study}</span>
                          </span>
                          <span className="disp-blk edu-year">
                            <span>{edu.institution}</span>
                          </span>
                          <span className="disp-blk edu-year">
                            <span className="txt-itlic">
                              {edu.end_date || edu.start_date}
                            </span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages Section */}
              {data.languages && data.languages.length > 0 && (
                <div className="section lang-sec infobarsec hide-colon has-title">
                  <div className="doc-item">
                    <div className="heading">
                      <div className="sectiontitle">{translations.languages}</div>
                    </div>
                    {data.languages.map((lang, index) => (
                      <div key={lang.id || index} className={`paragraph ${index === 0 ? 'firstparagraph' : ''}`}>
                        <div className="singlecolumn infobarpara">
                          <div className="lang-space">
                            <span>{lang.name}</span>
                          </div>
                          <div className="rating-bar">
                            <div className="inner-rating" style={{ width: `${(lang.level || 3) * 20}%` }}></div>
                          </div>
                          <div className="lang-scale">
                            <span className="small-size">{lang.proficiency}</span>
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
