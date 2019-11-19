import React from 'react';
import getConfig from 'next/config'
import EncodeUrl from '@/utils/encode';

import WOW from 'wowjs';
import '../static/web/js/lib/biggerlink';
import $ from 'jquery';


import Link from '@/utils/ActiveLink';

const { publicRuntimeConfig } = getConfig()
class Index extends React.PureComponent {
  
  componentDidMount() {
    new WOW.WOW({
      live: false
    }).init();

    $('.clientSet .clientList li .inside').biggerlink();

  }

  render() {
    const { data, dataArticle } = this.props;
    const tdataArticle = dataArticle && dataArticle.length >= 4 ? dataArticle.slice(0, 5) : dataArticle

    return (
      // Nguyen tac kham chua
      <React.Fragment>
        {/* <section className="page">
          <div className="wrap_about">
            <div className="content-page rte">
              <section className="uytin"
                style={{
                  backgroundImage: "url('/static/web/images/anhtinhnang.png')"
                }}
              >
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
        </section> */}



        <div className="clientSet wow fadeIn" style={{width:"100%"}}>
          <div className="inner"> 
            <div className="info">
              <h2 className="bhead center white">{data.name || ""}</h2>
              <ul className="clientList">
                {
                  (dataArticle || []).map((item,index) => {
                    const img = `${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image || ''}`
                    // console.log(item);
                    return (
                      <li className={`item${index+1} wow fadeIn${index%2===0 ? 'Left' : 'Right' }`} data-wow-delay={`${(index)/15}s`}>
                        <div className="inside bl-hot" style={{cursor: 'pointer'}}>
                          <p className="photo"><a href="/" className="bl-bigger"><img style={{width:"75px",height:"75px"}} src={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image}`} alt={item.title} /></a></p>
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
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Index;