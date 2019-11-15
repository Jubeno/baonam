import React from 'react';
import getConfig from 'next/config'
// import EncodeUrl from '@/utils/encode'
// import Link from '@/utils/ActiveLink';
// import _ from "lodash"
// import { url } from 'inspector';
import WOW from 'wowjs';
import log from '@/utils/log';



const { publicRuntimeConfig } = getConfig()

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
  //   const script = document.createElement("script");

  //   script.src = "https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.js";
  //   script.async = true;

  //   document.body.appendChild(script);
  // }

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
    const tdataArticle = dataArticle.slice(1, 5) || dataArticle.slice(1, 5) || []
    const header = dataArticle && dataArticle.length > 0 && dataArticle[0] || {}

    const imgHeader = `${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${header.image || ''}`
    log(' dataArticle%o', header, tdataArticle)
    return (
      // Su khac biet cua bao nam
      <React.Fragment>
        <section className="awe-section-6">
          <section className="section_taisao" >
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 col-lg-offset-5">
                  <div className="wrap_taisao" >
                    <div className="title_module_main a-left">
                      <h2>
                        <span>{header.title || ''}</span>
                      </h2>
                    </div>
                    <p className="blockchain">{header.shortDescription || ''}</p>
                    <div className="warp_taisao">
                      <div className="row">
                        {
                          tdataArticle.map((item,index) => {
                            const img = `${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image || ''}`
                            return (
                              <div className={`wow fadeIn${index%2===0 ? 'Left' : 'Right'} col-lg-6 col-md-3 col-sm-6 col-xs-12`} data-wow-delay={`${(index+2)/10}s`}>
                                <div className="wrap_item_taisao">
                                  <div className="image_taisao">
                                    <img src={img} alt={item.title} style={{ width: 51, height: 51 }} />
                                  </div>
                                  <p>{item.title}</p>
                                </div>
                              </div>
                            )
                          })
                        }
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