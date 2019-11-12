import React from 'react';
import getConfig from 'next/config'
import EncodeUrl from '@/utils/encode'
import Link from '@/utils/ActiveLink';

const { publicRuntimeConfig } = getConfig()

class Index extends React.PureComponent {

  render() {
    const { data, dataArticle } = this.props;
    return (
      <React.Fragment>
        <section className="page margin-top-20">
          <div className="wrap_about">
            <div className="content-page rte">
              <section className="camket">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="page-title a-center margin-bottom-20">
                        <h2 className="title-head"><span>{data.name || ''}</span></h2>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="owl-carousel owl-camket owl-loaded owl-drag" data-lg-items={4} data-md-items={4} data-sm-items={3} data-xs-items={1} data-margin={30} data-dot="true" data-nav="false">
                        <div className="owl-stage-outer">
                          <div className="owl-stage" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0.25s ease 0s', width: '1500px' }}>
                            {dataArticle && dataArticle.length > 0 && dataArticle.map((item) => {
                              return (
                                <div className="owl-item active" style={{ width: '270px', marginRight: '30px', padding: "0px 10px" }}>
                                  <div className="blockcamket">
                                    <div className="top">
                                      <img src={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image}`} alt={item.title} />
                                    </div>
                                    <div className="bottom">
                                      <p>
                                        <Link
                                          path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                          href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                        >{item.title}</Link></p>
                                      <span style={{ textAlign: "center" }}>
                                        {item.shortDescription}
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
              </section>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Index;