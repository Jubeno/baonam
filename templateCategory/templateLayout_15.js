/* eslint-disable react/button-has-type */
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
              <section className="hinhanhphongkham">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="page-title a-center margin-bottom-30">
                        <h2 className="title-head"><span>{data.name || ''}</span></h2>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="row wrap_image_js">
                        {dataArticle && dataArticle.length > 0 && dataArticle.map((item) => {
                          return (
                            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 item_image" style={{ display: 'block' }} key={`tem15${item.id}`}>
                              <div className="blockmage">
                                <img src={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image}`} alt={item.title} />
                                <Link
                                  path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                  href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                  title="Xem chi tiết"
                                  className="viewlog"
                                >
                                  <i className="fa fa-arrows-alt" />
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
              </section>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Index;