/* eslint-disable no-unused-expressions */
import React from 'react';
import getConfig from 'next/config'
import _ from "lodash";

import WOW from 'wowjs';
import '../static/web/js/lib/biggerlink';
import $ from 'jquery';

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
const { publicRuntimeConfig } = getConfig()
class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      key: -1,


      // total: 0
    }
  }

  componentDidMount() {
    new WOW.WOW({
      live: false
    }).init();
    $('.clientSet .clientList li .inside').biggerlink();
    // wow.sync();
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
  setOpen = (index, i) => {
    const { key } = this.state;
    log('setOpen', index, i)
    if (index * 3 + i === key)
      this.setState({
        key: -1
      })
    else
      this.setState({
        key: index * 3 + i
      })

  }

  render() {
    const { data, dataArticle } = this.props;
    const { key } = this.state;
    let tdataArticle = dataArticle || []
    tdataArticle = _.chunk(tdataArticle, 3)
    const datas = tdataArticle.slice(0, 2) || tdataArticle
    // log(' dataArticle%o', data)

    return (
      // Cam ket cua chung toi
      <React.Fragment>
        {/* <section className="awe-section-10 margin-top-20">
          <section className="section_cauhoi">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="title_module_main a-center">
                    <h2><span>{data.name}</span></h2>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="wrap_cauhoi">
                    <div className="row wrap_question_js">

                      {
                        (datas || []).map((items, index) => (
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            {
                              (items || []).map((item, i) => {
                                const wrap = (index * 3 + i === key) ? 'itemquestion item_js col-click clicked' : 'itemquestion item_js col-click'
                                const title = (index * 3 + i === key) ? 'title opened' : 'title'
                                const displayed = (index * 3 + i === key) ? 'block' : 'none'

                                return (
                                  <div className={wrap} onClick={() => this.setOpen(index, i)}>
                                    <div className={title}><h4>{item.title}</h4></div>
                                    <div className="content content_question" style={{ display: `${displayed}` }}>
                                      <p>{item.shortDescription || ''}</p>
                                    </div>
                                  </div>

                                )
                              })
                            }

                          </div>))
                      }
                      
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </section>
        </section> */}




        <div className="clientSet wow fadeIn">
          <div className="inner"> 
            <div className="info">
              <h2 className="bhead center white">{data.name || ""}</h2>
              <ul className="clientList">
                {
                  (dataArticle || []).map((item,index) => {
                    // const img = `${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image || ''}`
                    // console.log(item);
                    return (
                      <li className={`item1 wow fadeIn${index%2===0 ? 'Left' : 'Right' }`} data-wow-delay={`${(index)/10}s`}>
                        <div className="inside bl-hot" style={{cursor: 'pointer'}}>
                          {/* <p className="photo"><a href="/" className="bl-bigger"><img style={{width:"75px",height:"75px"}} src={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image}`} alt={item.title} /></a></p> */}
                          <div className="desc" style={{width:"100%"}}>
                            <p className="name"><a href="/" className="bl-bigger">{item.title}</a></p>
                            {/* <div className="text">{item.shortDescription || ''}</div> */}
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>


      </React.Fragment>
    );
  }
}

export default Index;