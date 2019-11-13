import React from 'react';
import getConfig from 'next/config'
// import EncodeUrl from '@/utils/encode'
// import Link from '@/utils/ActiveLink';
import log from '@/utils/log';
import WOW from 'wowjs';
import '../static/web/js/lib/biggerlink.js';


const { publicRuntimeConfig } = getConfig()
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
  
  componentDidMount() {
    new WOW.WOW().init();

    $('.clientSet .clientList li .inside').biggerlink();

  }
  render() {
    const { dataArticle } = this.props;

    log(' dataArticle%o', dataArticle)
    return (
      <React.Fragment>
        {/* <section className="awe-section-8">
          <section className="section_danhgia">
            <div className="wrap_full">
              <div className="container">
                <div className="row">

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="owl-carousel owl_danhgia owl-loaded owl-drag" data-lg-items={2} data-md-items={2} data-sm-items={1} data-xs-items={1} data-margin={30} data-dot="true" data-nav="false">
                      <div className="owl-stage-outer">
                        <div className="owl-stage" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '1800px' }}>
                          {
                            (dataArticle || []).map(item => {
                              const img = `${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image || ''}`
                              return (
                                <div className="owl-item active" style={{ width: 570, marginRight: '30px' }}>
                                  <div className="item">
                                    <div className="content_danhgia">
                                      <p>{item.shortDescription || ''}</p>
                                      <span>{item.title}</span>
                                    </div>
                                    <div className="img_danhgia">
                                      <span>
                                        <img src={img} alt={item.title} />
                                      </span>
                                    </div>
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
            </div>
          </section>
        </section> */}
        
        <div className="clientSet wow fadeIn" style={{visibility: 'visible', animationName: 'fadeIn'}}>
          <div className="inner">
            <div className="info">
              <h2 className="bhead center">DỊCH VỤ</h2>
              <ul className="clientList">
                {
                  (dataArticle || []).map(item => {
                    const img = `${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image || ''}`
                    // console.log(item);
                    return (
                      <li className="item1 wow fadeInLeft" data-wow-delay="0.1s" style={{visibility: 'visible', animationDelay: '0.1s', animationName: 'fadeInLeft'}}>
                        <div className="inside bl-hot" style={{cursor: 'pointer'}}>
                          <p className="photo"><a href="/" className="bl-bigger"><img src={img} alt={item.title} /></a></p>
                          <div className="desc">
                            <p className="name"><a href="/" className="bl-bigger">{item.title}</a></p>
                            <div className="text">{item.shortDescription || ''}</div>
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
              <p className="more"><a href="http://hanoiplasticsurgery.org/nhan-su/" className="btn1"><span>Xem thêm</span></a></p>
            </div>
          </div>
        </div>



      </React.Fragment>
    );
  }
}

export default Index;