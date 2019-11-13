/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import getConfig from 'next/config'
import { connect } from 'react-redux';
import EncodeUrl from '@/utils/encode'
import Link from '@/utils/ActiveLink';
import moment from 'moment';
import page from '@/layouts/page';
import SlideShow from '@/componentWebs/SlideShow';
import Head from '@/componentDashs/head';

const { publicRuntimeConfig } = getConfig()
@page
@connect(({ webs }) => ({
  webs,
}))
class Detail extends React.Component {
  static async getInitialProps(ctx) {
    const { store, dispatch, query } = ctx;
    await dispatch({
      type: 'webs/fetchArticleInfo',
      payload: { id: query.articleId }
    })
    await dispatch({
      type: 'webs/fetchQuery',
      payload: { ...query }
    })
    const { webs: { datainfoArticle } } = store.getState();
    const queryArticle = {
      filter: {
        status: true,
        categoriesId: datainfoArticle && datainfoArticle.categoriesId
      },
    };
    await dispatch({
      type: 'webs/fetchAllArticle',
      payload: queryArticle
    })
    return {
      datainfoArticle,
      query
    }
  }

  render() {
    const { webs: { datainfoArticle, query, dataArticleAll }, ogImage } = this.props
    if (String(EncodeUrl(datainfoArticle && datainfoArticle.title)) === String(query && query.name)) {
      const dataArticle = dataArticleAll && dataArticleAll.length > 0 && dataArticleAll.filter((item) => item.id !== datainfoArticle.id) || []
      let keywords;
      let description;
      const headTitle = `${datainfoArticle && datainfoArticle.categories && datainfoArticle.categories.name || ''}-${datainfoArticle && datainfoArticle.title || ''}`
      const { seoKeywords, seoDescriptions } = datainfoArticle;
      if (seoKeywords !== undefined && seoKeywords !== null) {
        keywords = `${seoKeywords}`;
      }
      if (seoDescriptions !== undefined && seoDescriptions !== null) {
        description = `${seoDescriptions}`;
      }
      const dayWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy',]
      return (
        <React.Fragment>
          <Head
            title={headTitle}
            keywords={keywords}
            description={description}
            ogImage={ogImage}
          />
          <SlideShow dataCategoryInfo={datainfoArticle && datainfoArticle.categories && datainfoArticle.categories.name} />
          <section className="blog_page_section margin-bottom-30">
            <div className="container article-wraper">
              <div className="row row_article">
                <section id="b" className="right-content col-lg-9 col-md-9 col-sm-12 col-xs-12 col-lg-push-3 col-md-push-3 margin-top-10">
                  <article className="article-main" itemScope itemType="http://schema.org/Article">
                    <meta itemProp="mainEntityOfPage" content={datainfoArticle.title} />
                    <meta itemProp="description" content />
                    {/* <meta itemProp="author" content="Cafein Team" /> */}
                    <meta itemProp="headline" content={datainfoArticle.title} />
                    {/* <meta itemProp="image" content="https://bizweb.dktcdn.net/100/330/752/articles/dai-hoc-dieu-duong-ha-noi-5.jpg?v=1536291513470" />
                    <meta itemProp="datePublished" content="07-09-2018" />
                    <meta itemProp="dateModified" content="07-09-2018" /> */}
                    <div className="hidden" itemProp="publisher" itemScope itemType="https://schema.org/Organization">
                      <div itemProp="logo" itemScope itemType="https://schema.org/ImageObject">
                        <img src={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${datainfoArticle.image || ''}`} alt={datainfoArticle.title} />
                        <meta itemProp="url" content={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${datainfoArticle.image || ''}`} />
                        <meta itemProp="width" content={133} />
                        <meta itemProp="height" content={25} />
                      </div>
                      <meta itemProp="name" content="Medisan" />
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 content_ar">
                        {/* <div className="block a-center margin-bottom-30">
                          <img src={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${datainfoArticle.image || ''}`} alt={datainfoArticle.title} />
                        </div> */}
                        <h1 className="title-head-article"><a itemProp="name">{datainfoArticle.title}</a></h1>
                        <span className="time_post f">
                          <i className="fa fa-calendar" />&nbsp;{`${dayWeek[moment(datainfoArticle.createDate).day() || 0]}, ${moment(datainfoArticle.createDate).format('DD/MM/YYYY')}`}&nbsp;&nbsp;&nbsp;&nbsp;
                         {datainfoArticle && datainfoArticle.author && <React.Fragment> <i className="fa fa-user" />&nbsp;{datainfoArticle.author} </React.Fragment>}
                        </span>
                        <div className="article-details">
                          <div className="article-content">
                            <div className="rte">
                              <div dangerouslySetInnerHTML={{ __html: datainfoArticle.description }} />
                            </div>
                          </div>
                        </div>
                        <div className="tags_share margin-top-30">
                          <div className="share_row">
                            <div className="col-lg-12 col-md-12 col-sm-6 col-xs-12">
                              <div className="addthis_inline_share_toolbox share_add">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="blog_other margin-top-15 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      </div>
                    </div>
                  </article>
                </section>
                {dataArticle && dataArticle.length > 0 &&
                  <aside id="a" className="left left-content col-lg-3 col-md-3 col-sm-12 col-xs-12 col-md-pull-9 col-lg-pull-9 margin-top-10">
                    <div className="aside-item">
                      <div className="title_module_arrow main margin-bottom-15">
                        <h2><a title="Tin liên quan">Tin liên quan</a></h2>
                      </div>
                      <div className="list-blogs">
                        <div className="blog_list_item">
                          {dataArticle.map((item) => {
                            return (
                              <article className="blog-item blog-item-list ">
                                <div className="blog-item-thumbnail img1" onclick="window.location.href='/co-giao-9x-xinh-dep-va-cau-hoc-tro-nho-coi-cut';">
                                  <Link
                                    path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                    href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                  // title="Xem chi tiết"
                                  // className="viewlog"
                                  >
                                    <picture>
                                      {/* <source media="(max-width: 480px)" srcSet="//bizweb.dktcdn.net/thumb/compact/100/330/752/articles/bit-khau-trang.jpg?v=1536290285307" />
                                    <source media="(min-width: 481px) and (max-width: 767px)" srcSet="//bizweb.dktcdn.net/thumb/compact/100/330/752/articles/bit-khau-trang.jpg?v=1536290285307" />
                                    <source media="(min-width: 768px) and (max-width: 1023px)" srcSet="//bizweb.dktcdn.net/thumb/compact/100/330/752/articles/bit-khau-trang.jpg?v=1536290285307" />
                                    <source media="(min-width: 1024px) and (max-width: 1199px)" srcSet="//bizweb.dktcdn.net/thumb/compact/100/330/752/articles/bit-khau-trang.jpg?v=1536290285307" />
                                    <source media="(min-width: 1200px)" srcSet="//bizweb.dktcdn.net/thumb/compact/100/330/752/articles/bit-khau-trang.jpg?v=1536290285307" /> */}
                                      <img src={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image}`} style={{ maxWidth: '100%' }} className="img-responsive" alt={item.title} />
                                    </picture>
                                  </Link>
                                </div>
                                <div className="ct_list_item">
                                  <h3 className="blog-item-name">
                                    <Link
                                      path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                      href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                      // title="Xem chi tiết"
                                      // className="viewlog"
                                      title={item.title}
                                    >{item.title}
                                    </Link>
                                  </h3>
                                  <span className="time_post f"><i className="fa fa-calendar" />&nbsp;
                                {`${dayWeek[moment(item.createDate).day() || 0]}, ${moment(item.createDate).format('DD/MM/YYYY')}`}
                                  </span>
                                </div>
                              </article>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </aside>
                }
              </div>
            </div>
          </section>
          <div className="ab-module-article-mostview" />
          {/* <input className="abbs-article-id" type="hidden" data-article-id={1263808} /> */}
          {/* Header JS */}
          {/* <div className="toolbox_scroll hidden-xs">
            <a className="tooltips" href="tel:18006750"><i className="fa fa-phone" /><span>Gọi ngay</span></a>
            <a className="tooltips register_click" href="javascript:;"><i className="fa fa-calendar" /><span>Đặt lịch khám</span></a>
            <a className="tooltips" href="https://www.facebook.com/"><i className="fa fa-facebook" /><span>Fanpage</span></a>
          </div>
          <section className="section_subscribe margin-top-0-mobile">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div className="wrap_ wrap_left">
                    <div className="block_position">
                      <h4>Đăng ký khám trực tuyến</h4>
                      <p>Giảm ngay 30% phí trị liệu hoặc tiểu phẫu cho
                50 người đăng kí đầu tiên</p>
                      <a href="tel:18006750" className="button_sub ">Đặt lịch hẹn khám</a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <div className="wrap_ wrap_right">
                    <h4>Bạn đang cần được tư vấn ?</h4>
                    <div className="form_km">
                      <form action=" https://sapo.us19.list-manage.com/subscribe/post?u=2887dcda77021868cccd236ea&id=7ace19f37b" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank">
                        <input type="email" defaultValue placeholder="Nhập email của bạn.." name="EMAIL" id="mail" aria-label />
                        <button className="button_subscribe subscribe" name="subscribe" id="subscribe">Đăng ký</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
 */}

        </React.Fragment>
      );
    }
    return null
  }
}

export default Detail