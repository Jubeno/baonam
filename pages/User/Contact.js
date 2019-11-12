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
        <section className="margin-bottom-60 margin-top-30">
          <div className="wrap_">
            <div className="section_maps">
              <div className="container">
                <div className="template-contact row">
                  <div className="col-lg-12 col-md-12 col-xs-12 contact">
                    <div className="row">
                      <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        {/* <div className="google-map margin-bottom-30">
                          <div className="maps_iframe"> */}
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
                          {/* <span className="span">{places.CONTACT_DESCRIPTION}</span> */}
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
                            {/* <li>
                              <span className="block_fonticon"><i className="fa fa-envelope" /></span>
                              <span className="title_li"><b>Email:</b> <a href={`mailto:${publicRuntimeConfig.CONTACT_EMAIL}`}>{publicRuntimeConfig.CONTACT_EMAIL}</a></span>
                            </li> */}
                            <li>
                              <span className="block_fonticon"><i className="fa fa-globe" /></span>
                              <span className="title_li"><b>Website:</b> <span>{dataSite.url}</span></span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* <section className="sectioncontact col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                          <form acceptCharset="UTF-8" action="https://template-medisan.bizwebvietnam.net/contact" id="contact" method="post">
                            <input name="FormType" type="hidden" defaultValue="contact" />
                            <input name="utf8" type="hidden" defaultValue="true" /><input type="hidden" id="Token-9287e397bad1489fa6f4a41bc66963b2" name="Token" defaultValue="03AOLTBLQBIbPYV6E9o919z61dBFF2JeiNZArDsyLCHFRVeYoaGTbb0_TXPgTBcndr4_ZSAH3xbsfRm557VESP_OYmCK7XfvGNOYXJ5DxNb_cALE0wvT9nZK6nTLZQvAIQvISuz6e15xR3qSoMlghsUk8rmdHOmenN4V-7FzfJZjMoNzdP-w9WaXbNJQCohpmJs94ejRDr4x3Ecoe4MRGyLVT-c-1ODQks76t38J2wAKSGQ4AVpIPP-SyBSqfCNG9HJelKo-LpVdtQf_qIYSisknmgaghIsFY1vpwtxU4rYFH7d2cJP01QDJMfiEhIZor4CBIPfSKQC1LDUvgyuq9z7Y1rcdXwmrj1xRtrNffAnBmohTZxmp4tWUBrth7KaqCaRhFK58PViotF24H5cV0-FGHy1MEqAaI_zctuA3f3jAiqLZnD2b_GRk9H_AkGe5KYeoHxmz7zLXE1Mu6VnhADGLXFYlegCBCoPC2EQ32WWYQwbJq4u1k7Lmopteh0MQlxWBjTIs-Fu8I2" />
                            <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                              <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <h2>Gửi yêu cầu cho chúng tôi</h2>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                  <input type="text" placeholder="Họ và tên" className="input-control" required defaultValue name="contact[Name]" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                  <input type="email" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required id="email2" className="input-control" defaultValue name="contact[email]" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                  <textarea name="contact[Body]" placeholder="Nội dung" required className="input-control" cols={5} rows={4} defaultValue={""} />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 margin-top-15">
                                  <button type="submit" className="button_custome_35">Gửi liên hệ</button>
                                </div>
                              </div>
                            </div>
                             </form></div>
                      </section> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment >
    );
  }
}

export default Index