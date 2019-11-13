import React from 'react';
import getConfig from 'next/config'
// import _ from "lodash"
import log from '@/utils/log';
import EncodeUrl from '@/utils/encode'
import Link from '@/utils/ActiveLink';


const { publicRuntimeConfig } = getConfig()

// TIÊU ĐỀ và nội dung chi tiết
class Index extends React.PureComponent {
  render() {

    const { data, dataArticle } = this.props;

    const tdataArticle = dataArticle || []

    log('data %o, dataArticle%o', data, tdataArticle)
    return (
      <React.Fragment>
        <section className="awe-section-2">
          <section className="section_feature_page">
            <div className="container">
              <div className="owl-carousel owl-feature owl-loaded owl-drag" data-lg-items={6} data-md-items={5} data-sm-items={4} data-xs-items={2} data-margin={30} data-nav="true">
                <div className="owl-stage-outer">
                  <div className="owl-stage" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '1200px' }}>
                    {
                      tdataArticle.map(item => {
                        const img = `${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image || ''}`
                        return (
                          <div className="owl-item active" style={{ width: '170px', marginRight: '30px' }}>
                            <div className="item">
                              <div className="img_feature">
                                <Link
                                  path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                  href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                  title={item.title}
                                >
                                  <img src={img} alt={item.title} />
                                </Link>
                              </div>
                              <div className="content_feature">
                                <Link
                                  path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                  href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                  title={item.title}
                                >
                                  {item.title}
                                </Link>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }

                  </div>
                </div>
                <div className="owl-nav disabled">
                  <div className="owl-prev disabled">prev
                  </div>
                  <div className="owl-next disabled">next</div>
                </div>
                <div className="owl-dots disabled" />
              </div>
            </div>
          </section>
        </section>
      </React.Fragment>
    );
  }
}

export default Index;