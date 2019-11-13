/* eslint-disable react/no-danger */
import React from 'react';
// import Link from '@/utils/ActiveLink';
// import { findRoute } from '@/utils/helpers';
// import Header from '@/components/Home/Header';
// import router from 'next/router';
// import Pagination from '@/componentDashs/Pagination';
import getConfig from 'next/config'
import log from '@/utils/log';
import EncodeUrl from '@/utils/encode'
import Link from '@/utils/ActiveLink';
// import moment from 'moment'
// import EncodeUrl from '@/utils/encode'
// import NbmImage from '@/componentDashs/NbmImage'

const { publicRuntimeConfig } = getConfig()
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
    // let tdataArticle = dataArticle.reverse()
    const tdataArticle = dataArticle && dataArticle.length > 0 && dataArticle[0] || {}

    log('data %o, dataArticle%o', data, dataArticle)
    const img = `${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${tdataArticle.image || ''}`

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
        <section className="awe-section-3">
          <section className="section_gioithieu">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-lg-push-6 col-md-push-6 video">
                  <div className="videoframe">
                    <a className="button_play" href="https://template-medisan.bizwebvietnam.net/#" data-url="https://www.youtube.com/embed/rxiCe_hqpYI" title="Xem video" data-toggle="modal" data-target="#myModalYoutube"><i className="fa fa-play" /></a>
                    <picture>
                      {/* <source media="(min-width: 1200px)" srcset="//bizweb.dktcdn.net/thumb/grande/100/330/752/themes/714267/assets/video1.png?1554093519953">
						<source media="(min-width: 992px) and (max-width: 1199px)" srcset="//bizweb.dktcdn.net/thumb/large/100/330/752/themes/714267/assets/video1.png?1554093519953">
						<source media="(min-width: 543px) and (max-width: 991px)" srcset="//bizweb.dktcdn.net/thumb/grande/100/330/752/themes/714267/assets/video1.png?1554093519953">
						<source media="(min-width: 320px) and (max-width: 542px)" srcset="//bizweb.dktcdn.net/thumb/large/100/330/752/themes/714267/assets/video1.png?1554093519953"> */}
                      <img src={img} alt="Video giới thiệu" />
                    </picture>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-lg-pull-6 col-md-pull-6">
                  <div className="title_module_main a-left">
                    <h2>
                      <span>{tdataArticle.title}</span>
                    </h2>
                  </div>
                  <div className="contentin">
                    {tdataArticle.shortDescription || ''}
                  </div>
                  <Link
                    path={`/User/Detail?categoryName=${tdataArticle.categories && tdataArticle.categories.name}&name=${EncodeUrl(tdataArticle.title)}&articleId=${tdataArticle.id}`}
                    href={`/${EncodeUrl(tdataArticle.categories && tdataArticle.categories.name)}/${EncodeUrl(tdataArticle.title)}/${tdataArticle.id}`}
                    title='Xem thêm'
                    className="button_35px"
                  >
                    Xem thêm
                  </Link>

                </div>
              </div>
            </div>
          </section>
          <div id="myModalYoutube" className="modal fade" role="dialog">
            <div className="modal-dialog">
              {/* Modal content */}
              <div className="modal-content">
                <div className="modal-body">
                  <div className="wrap_youtube_modal">
                    <iframe width={560} height={315} src="/static/web/images/Theme Medisan dành cho website sức khỏe y tế, dịch vụ..html" allow="autoplay; encrypted-media" allowFullScreen />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Index;