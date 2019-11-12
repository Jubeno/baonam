import React from 'react';
import getConfig from 'next/config'
// import EncodeUrl from '@/utils/encode'
// import Link from '@/utils/ActiveLink';
import log from '@/utils/log';


const { publicRuntimeConfig } = getConfig()
// import Link from '@/utils/ActiveLink';
// import { findRoute } from '@/utils/helpers';
// import Header from '@/components/Home/Header';
// import router from 'next/router';
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
    const tdataArticle = dataArticle.slice(1) || []
    const header = dataArticle && dataArticle.length > 0 && dataArticle[0] || {}
    log(' dataArticle%o', header, tdataArticle)
    return (
      <React.Fragment>
        <section className="awe-section-7">
          <section className="section_doingu">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="title_module_main a-center">
                    <h2>
                      <span>{header.title}</span>
                    </h2>
                  </div>
                  <p className="block a-center">{header.shortDescription || ''}</p>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="owl-carousel owl_doingu owl-loaded owl-drag" data-lg-items={4} data-md-items={3} data-sm-items={2} data-xs-items={1} data-margin={15} data-dot="false" data-nav="true">
                    <div className="owl-stage-outer">
                      <div className="owl-stage" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '1185px' }}>
                        {
                          tdataArticle.map(item => {
                            const img = `${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image || ''}`
                            return (
                              <div className="owl-item active" style={{ width: '281.25px', marginRight: '15px' }}>
                                <div className="item">
                                  <div className="img_feature">
                                    <span>
                                      <img src={img} alt={item.title} />
                                    </span>
                                  </div>
                                  <div className="content_feature">
                                    <p>{item.title}</p>
                                    <span>{item.shortDescription || ''}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }

                        {/* 
                      <div className="owl-item active" style={{ width: '281.25px', marginRight: '15px' }}><div className="item">
                        <div className="img_feature">
                          <span>
                            <img src="/static/web/images/doingu2.png" alt="TS.BS Jonh Smith" />
                          </span>
                        </div>
                        <div className="content_feature">
                          <p>TS.BS Jonh Smith</p>
                          <span>Chuyên khoa phụ sản</span>
                        </div>
                      </div></div><div className="owl-item active" style={{ width: '281.25px', marginRight: '15px' }}><div className="item">
                        <div className="img_feature">
                          <span>
                            <img src="/static/web/images/doingu3.png" alt="TS.BS Hồ Minh Tâm" />
                          </span>
                        </div>
                        <div className="content_feature">
                          <p>TS.BS Hồ Minh Tâm</p>
                          <span>Chuyên khoa phụ khoa</span>
                        </div>
                      </div></div><div className="owl-item active" style={{ width: '281.25px', marginRight: '15px' }}><div className="item">
                        <div className="img_feature">
                          <span>
                            <img src="/static/web/images/doingu4.png" alt="BS. Hoàng Ngọc Ninh" />
                          </span>
                        </div>
                        <div className="content_feature">
                          <p>BS. Hoàng Ngọc Ninh</p>
                          <span>Chuyên khoa hồi sức cấp cứu</span>
                        </div>
                      </div></div> */}
                      </div>
                    </div>
                    <div className="owl-nav disabled">
                      <div className="owl-prev disabled">prev</div>
                      <div className="owl-next disabled">next</div>
                    </div>
                    <div className="owl-dots disabled">
                      <div className="owl-dot active">
                        <span />
                      </div>
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