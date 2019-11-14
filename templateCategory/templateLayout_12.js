import React from 'react';
import getConfig from 'next/config'
import EncodeUrl from '@/utils/encode'
import Link from '@/utils/ActiveLink';

const { publicRuntimeConfig } = getConfig()
class Index extends React.PureComponent {
  // Nguyen tac kham chua
  render() {
    const { data, dataArticle } = this.props;
    const tdataArticle = dataArticle && dataArticle.length >= 4 ? dataArticle.slice(0, 5) : dataArticle

    return (
      <React.Fragment>
        <section className="page">
          <div className="wrap_about">
            <div className="content-page rte">
              <section className="uytin"
                style={{
                  backgroundImage: "url('/static/web/images/anhtinhnang.png')"
                }}
              >
                {/* <img src="//bizweb.dktcdn.net/100/330/752/themes/714267/assets/bg_uytin.jpg?1554093518815" /> */}
                < div className="container" >
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="page-title a-center margin-bottom-30">
                        <h2 className="title-head white"><span>{data.name || ""}</span></h2>
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="row respon">
                        {tdataArticle && tdataArticle.length > 0 && tdataArticle.map((item) => {
                          return (
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                              <div className="wp">
                                <div className="img">
                                  <img src={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image}`} alt={item.title} />
                                </div>
                                <div className="right">
                                  <p>{item.title}</p>
                                  <span>{item.shortDescription}</span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </React.Fragment >
    );
  }
}

export default Index;