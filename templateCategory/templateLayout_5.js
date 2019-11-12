import React from 'react';
// import Header from '@/components/Home/Header';
import getConfig from 'next/config'
// import NbmImage from '@/componentDashs/NbmImage'
import log from '@/utils/log';
import EncodeUrl from '@/utils/encode'
import Link from '@/utils/ActiveLink';

const { publicRuntimeConfig } = getConfig()

// TÍNH NĂNG
class Index extends React.PureComponent {
  render() {
    const { dataArticle } = this.props;
    const tdataArticle = dataArticle.slice(1) || []
    const header = dataArticle && dataArticle.length > 0 && dataArticle[0] || {}

    log(' dataArticle%o', tdataArticle)
    return (
      <React.Fragment>
        <section className="awe-section-5">
          <section className="section_blogs margin-bottom-20">
            <div className="container">
              <div className="title_module_main a-center">
                <h2>
                  <Link
                    path={`/User/Detail?categoryName=${header.categories && header.categories.name}&name=${EncodeUrl(header.title)}&articleId=${header.id}`}
                    href={`/${EncodeUrl(header.categories && header.categories.name)}/${EncodeUrl(header.title)}/${header.id}`}
                    title={header.title || ''}
                  >
                    {header.title || ''}
                  </Link>
                  {/* <a href="https://template-medisan.bizwebvietnam.net/benh-tim-mach" title="Chúng tôi cung cấp những dịch vụ nào ?">Chúng tôi cung cấp những dịch vụ nào ?</a> */}
                </h2>
              </div>
              <div className="list-blogs-link">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div className="owl-carousel owl-blog-index owl-loaded owl-drag" data-nav="false" data-dot="false" data-lg-items={3} data-md-items={3} data-height="false" data-xs-items={1} data-sm-items={2} data-margin={30}>
                      <div className="owl-stage-outer">
                        <div className="owl-stage" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '1600px' }}>
                          {
                            tdataArticle.map(item => {
                              const img = `${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image || ''}`
                              return (
                                <div className="owl-item active" style={{ width: '370px', marginRight: '30px' }}>
                                  <div className="item_wrap_blog">
                                    <div className="item-blg blog-large">
                                      <div className="blog-inner">
                                        <div className="blog-img">
                                          <Link
                                            path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                            href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                            title={item.title || ''}
                                          >
                                            <img src={img} alt={item.title || ''} />
                                          </Link>
                                          {/* <a href="https://template-medisan.bizwebvietnam.net/thieu-mau-co-tim-man-tinh">
                                            <img src="/static/web/images/20160726-likable-doctor.png" alt="Thiếu máu cơ tim mãn tính" />
                                          </a> */}
                                        </div>
                                        <div className="content__">
                                          <h3>
                                            <Link
                                              path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                              href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                              title={item.title || ''}
                                              className="text2line"
                                            >
                                              {item.title || ''}
                                            </Link>
                                          </h3>
                                          <p>
                                            {item.shortDescription || ''}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    <Link
                                      path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                      href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                      title='Xem chi tiết'
                                      className="link"
                                    >
                                      Xem chi tiết <i className="fa fa-angle-double-right" />
                                    </Link>
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
        </section>
      </React.Fragment>
    );
  }
}

export default Index;