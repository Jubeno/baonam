/* eslint-disable react/no-danger */
import React from 'react';
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
    const articleHighlights = dataArticle && dataArticle.length > 0 && dataArticle[0] || {}
    return (
      <React.Fragment>
        <section className="page margin-top-20">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="page-title a-center">
                  <h1 className="title-head"><span>{articleHighlights.title}</span></h1>
                </div>
              </div>
            </div>
          </div>
          <div className="wrap_about">
            <div className="content-page rte">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1">
                    <div className="despage a-center margin-bottom-40" style={{ textAlign: "justify" }}>
                      {articleHighlights.shortDescription}
                    </div>
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