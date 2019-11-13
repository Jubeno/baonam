import React from 'react';
// import EncodeUrl from '@/utils/encode'
// import Link from '@/utils/ActiveLink';
// import Link from '@/utils/ActiveLink';
// import { findRoute } from '@/utils/helpers';
// // import Header from '@/components/Home/Header';
// import { routes } from '@/config/router.config';
import getConfig from 'next/config'
import log from '@/utils/log';
// import EncodeUrl from '@/utils/encode'
// import NbmImage from '@/componentDashs/NbmImage'
// import moment from 'moment'

const { publicRuntimeConfig } = getConfig()
// const routesWeb = routes.web;

// ẢNH KÈM TIÊU ĐỀ 
class Index extends React.PureComponent {
  render() {
    const { dataArticle } = this.props;
    const tdataArticle = dataArticle.slice(1) || []
    // tdataArticle = dataArticle && dataArticle.length > 0 && dataArticle[0] || {}

    log(' dataArticle%o', tdataArticle)
    return (
      <React.Fragment>
        <section className="awe-section-4">
          <section className="section_quytrinh">
            <div className="container">
              <div className="wrap_quytrinh">
                <div className="wrap_title_position">
                  <div className="title_module_main a-center">
                    <h2>
                      <span>{dataArticle && dataArticle.length > 0 && dataArticle[0] && dataArticle[0].title}</span>
                    </h2>
                  </div>
                </div>
                <div className="owl-carousel owl_quytrinh owl-loaded owl-drag" data-lg-items={6} data-md-items={4} data-sm-items={4} data-xs-items={2} data-margin={15} data-dot="false" data-nav="true">
                  <div className="owl-stage-outer">
                    <div className="owl-stage" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '1185px' }}>

                      {
                        tdataArticle.map(item => {
                          const img = `${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image || ''}`

                          return (
                            <div className="owl-item active" style={{ width: '182.5px', marginRight: '15px' }}>
                              <div className="item">
                                <div className="img_feature">
                                  <span>
                                    <img src={img} alt={item.title} />
                                  </span>
                                </div>
                                <div className="content_feature">
                                  <span>{item.title}</span>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                  <div className="owl-nav disabled"><div className="owl-prev disabled">prev</div><div className="owl-next disabled">next</div></div><div className="owl-dots disabled"><div className="owl-dot active"><span /></div></div>
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