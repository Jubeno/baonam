import React from 'react';
import getConfig from 'next/config';
import moment from 'moment';
import EncodeUrl from '@/utils/encode'
import Link from '@/utils/ActiveLink';
import log from '@/utils/log';


const { publicRuntimeConfig } = getConfig()
// import Link from '@/utils/ActiveLink';
// import { findRoute } from '@/utils/helpers';
// import Header from '@/components/Home/Header';
// import router from 'next/router';
// import NbmImage from '../../lib/NbmImage'

// import Pagination from '@/componentDashs/Pagination';
// // import log from '@/utils/log';
// import moment from 'moment'
// import EncodeUrl from '@/utils/encode'
// import getConfig from 'next/config'
// import NbmImage from '@/componentDashs/NbmImage'

// const { publicRuntimeConfig } = getConfig()
// const routesWeb = routes.web;
// const pageSize = 4
// nhiều danh mục, phân chia các tin (hiển thị ảnh và tilte)
class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // Articles: [],
      // total: 0
    }
  }

  // componentDidMount() {
  //   // const { data, query } = this.props;
  //   // let dataArrticles = ''
  //   // if (query.categoryId === undefined) {
  //   //   dataArrticles = data.length > 0 && data
  //   // }
  //   // else {
  //   //   dataArrticles = data && data.filter(item => `${item.id}` ===
  //   //     `${query.categoryId}`)
  //   // }
  //   // const dataArr = dataArrticles.length > 0 && dataArrticles[0].Articles.length >= pageSize ? dataArrticles[0].Articles.slice(0, pageSize) : dataArrticles[0].Articles
  //   // this.setState({ Articles: dataArr, total: dataArrticles[0].Articles.length })
  // }

  // componentWillReceiveProps(nextProps) {
  //   const { query } = this.props;
  //   let dataArrticles = ''
  //   if (nextProps.query && nextProps.query.categoryId === undefined) {
  //     dataArrticles = nextProps.data.length > 0 && nextProps.data
  //   }
  //   else {
  //     dataArrticles = nextProps.data && nextProps.data.filter(item => `${item.id}` ===
  //       `${nextProps.query.categoryId}`)
  //   }
  //   const dataArr = dataArrticles && dataArrticles.length > 0 && dataArrticles[0].Articles.length >= pageSize ? dataArrticles[0].Articles.slice(0, pageSize) : dataArrticles[0].Articles || []
  //   if (nextProps.query !== query) {
  //     this.setState({ Articles: dataArr, total: dataArrticles[0].Articles.length })
  //   }
  // }

  // fetchMore = (pageIndex) => {
  //   const { data, query } = this.props;
  //   let dataArrticles = ''
  //   if (query.categoryId === undefined) {
  //     dataArrticles = data.length > 0 && data
  //   }
  //   else {
  //     dataArrticles = data && data.filter(item => `${item.id}` ===
  //       `${query.categoryId}`)
  //   }
  //   const startIndex = (pageIndex - 1) * pageSize
  //   const endIndex = pageIndex * pageSize
  //   const dataArr = dataArrticles.length > 0 && dataArrticles[0].Articles.length >= 5 ? dataArrticles[0].Articles.slice(startIndex, endIndex) : dataArrticles[0].Articles
  //   this.setState({ Articles: dataArr, total: dataArrticles[0].Articles.length })
  // }

  render() {
    const { dataArticle } = this.props;

    log(' dataArticle%o', dataArticle)
    const dayWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy',]
    // const date = moment(dataArticle[0].createDate)
    log('dayweek', moment(dataArticle[0].createDate).day())
    return (
      <React.Fragment>
        <section className="awe-section-9">
          <section className="section_blogs blognews margin-bottom-20">
            <div className="container">
              {/* <div className="title_module_main a-center">
                <h2>
                  <a href="https://template-medisan.bizwebvietnam.net/tin-tuc" title="Tin tức mới nhất">Tin tức mới nhất</a>
                </h2>
              </div>
              <p className="block a-center">Cập nhật tin tức mới nhất về y tế cũng như các chương trình ưu đãi của Medisan</p> */}
              <div className="list-blogs-link">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="owl-carousel owl-blog-index owl-loaded owl-drag" data-nav="true" data-dot="false" data-lg-items={3} data-md-items={3} data-height="false" data-xs-items={1} data-sm-items={2} data-margin={30}>
                      <div className="owl-stage-outer">
                        <div className="owl-stage" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '1600px' }}>

                          {
                            (dataArticle || []).map(item => {
                              const img = `${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image || ''}`
                              return (
                                <div className="owl-item active" style={{ width: '370px', marginRight: '30px' }}>
                                  <div className="item_wrap_blog">
                                    <div className="item-blg blog-large">
                                      <div className="blog-inner">
                                        <div className="blog-img not_radius">
                                          <Link
                                            path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                            href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                            title={item.title}
                                          >
                                            <picture>
                                              <img src={img} style={{ width: '100%' }} className="img-responsive" alt={item.title} />
                                            </picture>
                                          </Link>
                                        </div>
                                        <div className="content__">
                                          <span className="time_post f">
                                            <i className="fa fa-calendar" />&nbsp;
                                            {`${dayWeek[moment(item.createDate).day() || 0]}, ${moment(item.createDate).format('DD/MM/YYYY')}`}

                                          </span>
                                          <h3>
                                            <Link
                                              path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                              href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                              title={item.title}
                                              className="text2line"
                                            >
                                              {item.title}
                                            </Link>
                                            {/* <a className="text2line" title="Báo động tình trạng trẻ nhiễm HIV ngày càng cao" href="https://template-medisan.bizwebvietnam.net/bao-dong-tinh-trang-tre-nhiem-hiv-ngay-cang-cao">Báo động tình trạng trẻ nhiễm HIV ngày càng cao</a> */}
                                          </h3>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                              )
                            })
                          }

                          {/* <div className="owl-item active" style={{ width: '370px', marginRight: '30px' }}><div className="item_wrap_blog">
                            <div className="item-blg blog-large">
                              <div className="blog-inner">
                                <div className="blog-img not_radius">
                                  <a href="https://template-medisan.bizwebvietnam.net/lai-bao-dong-khan-hiem-nhom-mau-o-trong-dieu-tri">
                                    <picture>
                                      <source media="(max-width: 480px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/thieu-mau-2-800x500.jpg?v=1536288897147" />
                                      <source media="(min-width: 481px) and (max-width: 767px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/thieu-mau-2-800x500.jpg?v=1536288897147" />
                                      <source media="(min-width: 768px) and (max-width: 1023px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/thieu-mau-2-800x500.jpg?v=1536288897147" />
                                      <source media="(min-width: 1024px) and (max-width: 1199px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/thieu-mau-2-800x500.jpg?v=1536288897147" />
                                      <source media="(min-width: 1200px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/thieu-mau-2-800x500.jpg?v=1536288897147" />
                                      <img src="/static/web/images/loading.png" data-lazyload="//bizweb.dktcdn.net/100/330/752/articles/thieu-mau-2-800x500.jpg?v=1536288897147" style={{ maxWidth: '100%' }} className="img-responsive" alt="Lại báo động khan hiếm nhóm máu O trong điều trị" />
                                    </picture>
                                  </a>
                                </div>
                                <div className="content__">
                                  <span className="time_post f"><i className="fa fa-calendar" />&nbsp;
                                    Thứ Sáu,
                                    07/09/2018
                                  </span>
                                  <h3>
                                    <a className="text2line" title="Lại báo động khan hiếm nhóm máu O trong điều trị" href="https://template-medisan.bizwebvietnam.net/lai-bao-dong-khan-hiem-nhom-mau-o-trong-dieu-tri">Lại báo động khan hiếm nhóm máu O trong điều trị</a>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                          </div><div className="owl-item active" style={{ width: '370px', marginRight: '30px' }}><div className="item_wrap_blog">
                            <div className="item-blg blog-large">
                              <div className="blog-inner">
                                <div className="blog-img not_radius">
                                  <a href="https://template-medisan.bizwebvietnam.net/nuoc-rua-tay-kho-khong-an-toan-nhu-ban-tuong">
                                    <picture>
                                      <source media="(max-width: 480px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/nhung-dieu-can-luu-y-ve-nuoc-rua-tay-diet-trung-2.jpg?v=1536288704047" />
                                      <source media="(min-width: 481px) and (max-width: 767px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/nhung-dieu-can-luu-y-ve-nuoc-rua-tay-diet-trung-2.jpg?v=1536288704047" />
                                      <source media="(min-width: 768px) and (max-width: 1023px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/nhung-dieu-can-luu-y-ve-nuoc-rua-tay-diet-trung-2.jpg?v=1536288704047" />
                                      <source media="(min-width: 1024px) and (max-width: 1199px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/nhung-dieu-can-luu-y-ve-nuoc-rua-tay-diet-trung-2.jpg?v=1536288704047" />
                                      <source media="(min-width: 1200px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/nhung-dieu-can-luu-y-ve-nuoc-rua-tay-diet-trung-2.jpg?v=1536288704047" />
                                      <img src="/static/web/images/loading.png" data-lazyload="//bizweb.dktcdn.net/100/330/752/articles/nhung-dieu-can-luu-y-ve-nuoc-rua-tay-diet-trung-2.jpg?v=1536288704047" style={{ maxWidth: '100%' }} className="img-responsive" alt="Nước rửa tay khô không an toàn như bạn tưởng" />
                                    </picture>
                                  </a>
                                </div>
                                <div className="content__">
                                  <span className="time_post f"><i className="fa fa-calendar" />&nbsp;
                                    Thứ Sáu,
                                    07/09/2018
                                  </span>
                                  <h3>
                                    <a className="text2line" title="Nước rửa tay khô không an toàn như bạn tưởng" href="https://template-medisan.bizwebvietnam.net/nuoc-rua-tay-kho-khong-an-toan-nhu-ban-tuong">Nước rửa tay khô không an toàn như bạn tưởng</a>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                          </div>
                          <div className="owl-item" style={{ width: '370px', marginRight: '30px' }}><div className="item_wrap_blog">
                            <div className="item-blg blog-large">
                              <div className="blog-inner">
                                <div className="blog-img not_radius">
                                  <a href="https://template-medisan.bizwebvietnam.net/dau-mat-hot-nguyen-nhan-va-cach-phong-ngua">
                                    <picture>
                                      <source media="(max-width: 480px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/z2-1.jpg?v=1536288526307" />
                                      <source media="(min-width: 481px) and (max-width: 767px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/z2-1.jpg?v=1536288526307" />
                                      <source media="(min-width: 768px) and (max-width: 1023px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/z2-1.jpg?v=1536288526307" />
                                      <source media="(min-width: 1024px) and (max-width: 1199px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/z2-1.jpg?v=1536288526307" />
                                      <source media="(min-width: 1200px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/z2-1.jpg?v=1536288526307" />
                                      <img src="/static/web/images/loading.png" data-lazyload="//bizweb.dktcdn.net/100/330/752/articles/z2-1.jpg?v=1536288526307" style={{ maxWidth: '100%' }} className="img-responsive" alt="Đau mắt hột – nguyên nhân và cách phòng ngừa" />
                                    </picture>
                                  </a>
                                </div>
                                <div className="content__">
                                  <span className="time_post f"><i className="fa fa-calendar" />&nbsp;
                                    Thứ Sáu,
                                    07/09/2018
                                  </span>
                                  <h3>
                                    <a className="text2line" title="Đau mắt hột – nguyên nhân và cách phòng ngừa" href="https://template-medisan.bizwebvietnam.net/dau-mat-hot-nguyen-nhan-va-cach-phong-ngua">Đau mắt hột – nguyên nhân và cách phòng ngừa</a>
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                          </div> */}
                        </div>
                      </div><div className="owl-nav"><div className="owl-prev disabled">prev</div><div className="owl-next">next</div></div><div className="owl-dots"><div className="owl-dot active"><span /></div><div className="owl-dot"><span /></div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

      </React.Fragment>
    );
  }
}

export default Index;