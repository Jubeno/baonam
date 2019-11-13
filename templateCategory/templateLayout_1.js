import React from 'react';
// import Link from '@/utils/ActiveLink';
// import { findRoute } from '@/utils/helpers';
// import Header from '@/components/Home/Header';
// import { routes } from '@/config/router.config';
// import Pagination from '@/componentDashs/Pagination';
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
    log('data %o, dataArticle%o', data, dataArticle)
    const articleHighlights = dataArticle && dataArticle.length > 0 && dataArticle[0] || {}
    // const Article = dataArticle && dataArticle.length > 0 && dataArticle.filter((item) => item.id !== articleHighlights.id).slice(0, 2)
    return (
      <React.Fragment>
        <section className="awe-section-1">
          <div className="home-slider owl-carousel owl-loaded owl-drag" data-lg-items={1} data-md-items={1} data-sm-items={1} data-xs-items={1} data-margin={0} data-dot="false" data-nav="true">
            <div className="owl-stage-outer">
              <div className="owl-stage" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '1349px' }}>
                <div className="owl-item active" style={{ width: '1349px' }}>
                  <div className="item">
                    <a href="https://template-medisan.bizwebvietnam.net/#" className="clearfix">
                      <img src="/static/web/images/slider_1.png" alt="alt" />
                    </a>
                  </div>
                </div>
                <div className="owl-item active" style={{ width: '1349px' }}>
                  <div className="item">
                    <a href="https://template-medisan.bizwebvietnam.net/#" className="clearfix">
                      <img src="/static/web/images/slider_1.png" alt="alt" />
                    </a>
                  </div>
                </div>
                <div className="owl-item active" style={{ width: '1349px' }}>
                  <div className="item">
                    <a href="https://template-medisan.bizwebvietnam.net/#" className="clearfix">
                      <img src="/static/web/images/slider_1.png" alt="alt" />
                    </a>
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