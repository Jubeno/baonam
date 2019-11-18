/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
// import cookie from 'cookie';
import { connect } from 'react-redux';
// import dynamic from 'next/dynamic';
// import router from 'next/router';
// import { compose } from 'recompose'
import SlideShow from '@/componentWebs/SlideShow';
import getConfig from 'next/config'
import page from '@/layouts/page';
import Head from '@/componentDashs/head';
import { renderTemplatesCategory } from '@/templateCategory';

const { publicRuntimeConfig } = getConfig()
@page
@connect(({ webs }) => ({
  webs,
}))
class Index extends React.Component {
  static async getInitialProps(ctx) {
    const { store, dispatch, query } = ctx;
    await dispatch({
      type: 'webs/fetchCategoryInfo',
      payload: { id: query.id }
    })
    const { webs: { dataCategoryInfo } } = store.getState();
    const queryArticle = {
      filter: {
        status: true,
        categoriesId: query.id
      },
      // sort: ["order", "ASC"]
    };
    await dispatch({
      type: 'webs/fetchAllArticle',
      payload: queryArticle
    })
    return {
      dataCategoryInfo,
      query
    }
  }

  render() {
    const { webs: { dataCategoryInfo, dataArticleAll }, ogImage, dataSite } = this.props
    let keywords;
    let description;
    const { seoKeywords, seoDescriptions } = dataCategoryInfo;

    if (seoKeywords !== undefined && seoKeywords !== null) {
      keywords = `${seoKeywords}`;
    }
    if (seoDescriptions !== undefined && seoDescriptions !== null) {
      description = `${seoDescriptions}`;
    }
    const places = dataSite && dataSite.places
    return (
      <React.Fragment>
        <Head
          // title={headTitle}
          keywords={keywords}
          description={description}
          ogImage={ogImage}
          defaultKeywordsWeb={dataSite && dataSite.seoKeywords}
          defaultDescriptionWeb={dataSite && dataSite.seoDescriptions}
          defaultOGURLWeb={dataSite && dataSite.url}
        />
        <SlideShow dataCategoryInfo={dataCategoryInfo.name} />
        {/* <section className="margin-bottom-60 margin-top-30">
          <div className="wrap_">
            <div className="section_maps">
              <div className="container">
                <div className="template-contact row">
                  <div className="col-lg-12 col-md-12 col-xs-12 contact">
                    <div className="row">
                      <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14896.221060153333!2d105.7757897!3d21.0304746!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8fe1493d3cb4d82!2zUGjDsm5nIEtow6FtIE5hbSBLaG9hIELhuqNvIE5hbQ!5e0!3m2!1svi!2s!4v1571230207435!5m2!1svi!2s"
                          width='100%'
                          height={450}
                          frameBorder={0}
                          style={{ border: 0 }}
                          allowFullScreen
                        />
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <div className="t_contact max991px">
                          <h1>Thông tin liên hệ</h1>
                          <h3 className="p">{places.name}</h3>
                          <ul className="margin-bottom-15">
                            <li>
                              <span className="block_fonticon"><i className="fa fa-map-marker" /></span>
                              <span className="title_li"><b>Trụ sở:</b> {places.address}</span>
                            </li>
                            <li>
                              <span className="block_fonticon"><i className="fa fa-phone" /></span>
                              <span className="title_li">
                                <b>Hotline:</b> <a className="fone" href={`tel:${places.mobile}`}>{places.mobile} </a>
                              </span>
                            </li>
                            <li>
                              <span className="block_fonticon"><i className="fa fa-globe" /></span>
                              <span className="title_li"><b>Website:</b> <span>{dataSite.url}</span></span>
                            </li>
                          </ul>
                        </div>
                      </div>
                   
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}


        <div id="wrap" className="clearfix" style={{display:"flow-root"}}>
          <div className="formBlock" style={{marginTop:"20px"}}>
            <h2 className="bhead">Đặt hẹn tư vấn</h2>
          </div>
          <form method="post" className="form-1" action="http://hanoiplasticsurgery.org/lien-he/?1572433623" name="form1" onSubmit="return check()">
            <div className="formBlock">
              <p>Xin vui lòng điền đầy đủ thông tin chính xác để chúng tôi có thể liên lạc được với quý khách sớm nhất có thể. <br />Lưu ý hãy điền thông tin lịch hẹn mong muốn của quý khách.</p>
              <p className="hid_url">Leave this empty: <input type="text" name="url" className="errPosRight" /></p>{/* Anti spam part1: the contact form */}
              <table className="tableContact" cellSpacing={0}>
                <tbody>
                  <tr>
                    <td><input type="text" name="nameuser" id="nameuser" placeholder="Họ và tên*" className="chkrequired errPosRight" /></td>
                  </tr>
                  <tr>
                    <td><input type="tel" name="tel" id="tel" placeholder="Số điện thoại*" className="chkrequired chktel errPosRight" /></td>
                  </tr>
                  <tr>
                    <td><input type="email" name="email" id="email" placeholder="Email*" className="chkrequired chkemail errPosRight" /></td>
                  </tr>
                  <tr>
                    <td><textarea name="content" id="content" placeholder="Nội dung yêu cầu tư vấn*" className="chkrequired errPosRight" defaultValue={""} /></td>
                  </tr>
                </tbody>
              </table>
              <p className="actionBtn"><button name="action" value="send"><span>GỬI</span></button></p>
            </div>
          </form>
          <div className="contactus">
            <p className="mhead">{places.name}</p>
            <ul className="addrset">
              <li><span className="calling"><i className="lnr lnr-smartphone" /> {places.mobile}<span /></span></li>
              <li><i className="lnr lnr-envelope" /> <a href="mailto:hanoiplasticsurgery@gmail.com">{dataSite.url}</a></li>
              <li><span><i className="lnr lnr-map-marker" /> {places.address}</span><br /><br />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14896.221060153333!2d105.7757897!3d21.0304746!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8fe1493d3cb4d82!2zUGjDsm5nIEtow6FtIE5hbSBLaG9hIELhuqNvIE5hbQ!5e0!3m2!1svi!2s!4v1571230207435!5m2!1svi!2s"
                  width='100%'
                  height={450}
                  frameBorder={0}
                  style={{ border: 0 }}
                  allowFullScreen
                />
                <br /><a href="https://www.google.com/maps/place/Hanoi+Medical+University/@21.0032117,105.8284824,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ac7c33fd6323:0x930d205cf25ff492!8m2!3d21.0032117!4d105.8306711" target="_blank" className="viewmap">Xem trên Google Maps »</a>
              </li>
            </ul>
          </div>    
        </div>

      </React.Fragment>
    );
  }
}

export default Index