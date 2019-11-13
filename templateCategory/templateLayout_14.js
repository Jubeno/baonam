import React from 'react';
import EncodeUrl from '@/utils/encode'
import Link from '@/utils/ActiveLink';
import log from '@/utils/log';
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
    const { data, dataArticle } = this.props;
    // const tdataArticle = dataArticle && dataArticle.length >= 2 ? dataArticle.slice(0, 2) : dataArticle
    // const tdataArticle = []
    log("dataInfo %o dataArticle %o  ", data, dataArticle)
    // const { Articles, total } = this.state
    // const routeHome = findRoute('article_detail', routesWeb)
    // const redirectMenu = (item) => {
    //   // log("redirectMenu: ", item)
    //   const routeMenu = findRoute(item.nameRoute, routesWeb);
    //   // log("pretty router: ", routeMenu)
    //   return routeMenu
    // }
    // if (data.length <= 0)
    //   return null
    // if (Articles.length <= 0)
    //   return null
    return (
      <React.Fragment>
        <section className="page margin-top-20">
          <div className="wrap_about">
            <div className="content-page rte">
              <section className="section_doingu">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="title_module_main a-center">
                        <h2>
                          <span>Đội ngũ bác sĩ dày dặn kinh nghiệm</span>
                        </h2>
                      </div>
                      <p className="block a-center">Được thăm khám và điều trị bởi các bác sĩ giỏi, có kinh nghiệm và được tư vấn kĩ lưỡng trước khi điều trị </p>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="owl-carousel owl_doingu owl-loaded owl-drag" data-lg-items={4} data-md-items={4} data-sm-items={3} data-xs-items={1} data-margin={15} data-dot="false" data-nav="true">
                        <div className="owl-stage-outer"><div className="owl-stage" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '1185px' }}><div className="owl-item active" style={{ width: '281.25px', marginRight: '15px' }}><div className="item">
                          <div className="img_feature">
                            <span>
                              <img src="./Giới thiệu Medisan_files/doingu1.jpg" data-lazyload="//bizweb.dktcdn.net/100/330/752/themes/714267/assets/doingu1.jpg?1554093519953" alt="TS.BS Đinh Hồng Ngọc" />
                            </span>
                          </div>
                          <div className="content_feature">
                            <p>TS.BS Đinh Hồng Ngọc</p>
                            <span>Chuyên khoa tim mạch</span>
                          </div>
                        </div></div><div className="owl-item active" style={{ width: '281.25px', marginRight: '15px' }}><div className="item">
                          <div className="img_feature">
                            <span>
                              <img src="./Giới thiệu Medisan_files/doingu2.jpg" data-lazyload="//bizweb.dktcdn.net/100/330/752/themes/714267/assets/doingu2.jpg?1554093519953" alt="TS.BS Jonh Smith" />
                            </span>
                          </div>
                          <div className="content_feature">
                            <p>TS.BS Jonh Smith</p>
                            <span>Chuyên khoa phụ sản</span>
                          </div>
                        </div></div><div className="owl-item active" style={{ width: '281.25px', marginRight: '15px' }}><div className="item">
                          <div className="img_feature">
                            <span>
                              <img src="./Giới thiệu Medisan_files/doingu3.jpg" data-lazyload="//bizweb.dktcdn.net/100/330/752/themes/714267/assets/doingu3.jpg?1554093519953" alt="TS.BS Hồ Minh Tâm" />
                            </span>
                          </div>
                          <div className="content_feature">
                            <p>TS.BS Hồ Minh Tâm</p>
                            <span>Chuyên khoa phụ khoa</span>
                          </div>
                        </div></div><div className="owl-item active" style={{ width: '281.25px', marginRight: '15px' }}><div className="item">
                          <div className="img_feature">
                            <span>
                              <img src="./Giới thiệu Medisan_files/doingu4.jpg" data-lazyload="//bizweb.dktcdn.net/100/330/752/themes/714267/assets/doingu4.jpg?1554093519953" alt="BS. Hoàng Ngọc Ninh" />
                            </span>
                          </div>
                          <div className="content_feature">
                            <p>BS. Hoàng Ngọc Ninh</p>
                            <span>Chuyên khoa hồi sức cấp cứu</span>
                          </div>
                        </div></div></div></div><div className="owl-nav disabled"><div className="owl-prev disabled">prev</div><div className="owl-next disabled">next</div></div><div className="owl-dots disabled"><div className="owl-dot active"><span /></div></div></div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Index;