/* eslint-disable react/button-has-type */
import React from 'react';
import getConfig from 'next/config';
import EncodeUrl from '@/utils/encode';

// import WOW from 'wowjs';

import Link from '@/utils/ActiveLink';


const { publicRuntimeConfig } = getConfig()
class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    // new WOW.WOW({
    //   live: false
    // }).init();
  //   const script = document.createElement("script");

  //   script.src = "https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.js";
  //   script.async = true;

  //   document.body.appendChild(script);
   }
  
  render() {
    const { data, dataArticle } = this.props;
    const pathname = window.location.pathname;
    
    
    return (
      // Doi ngu y bac sy
      <React.Fragment>
        {/* <div className="container">
          <div className="row">
            <section className="main_container collection col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="block-title a-center">
                <h1 className="title_page margin-top-0 a-center">{data && data.name || ""}</h1>
              </div>
              <div className="category-products products">
                <section className="products-view products-view-grid margin-bottom-50 collection_reponsive">
                  <div className="row">
                    {dataArticle && dataArticle.length > 0 && dataArticle.map((item) => {
                      return (
                        <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3 product-col" key={`tem17${item.id}`}>
                          <div className="item_product_main margin-bottom-20">
                            <div className="product-box product-item-main">
                              <div className="product-thumbnail">
                                <Link
                                  className="image_thumb"
                                  path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                  href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                  title={item.title}
                                >
                                  <img src={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image}`} alt={item.title} />
                                </Link>
                                <Link
                                  className="button_views"
                                  path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                  href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                  title="Xem chi tiết"
                                >
                                  <img src="/static/web/images/plus.png" alt="plus" />
                                </Link>
                              </div>
                              <div className="product-info product-bottom">
                                <h3 className="product-name">
                                  <Link
                                    title={item.title}
                                    path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                    href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                  >{item.title}</Link>
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                    }
                  </div>
                  <div className="text-xs-right xs_padding col-lg-12 col-md-12 col-sm-12 col-xs-12 paginatepage margin-top-20">
                  </div>
                </section>
              </div>
            </section>
          </div>
        </div> */}


        

        <div className="serviceSet wow fadeIn" style={{marginBottom: "-15px", display:"flow-root"}}>
          <div className="inner">
            <div className="info">
              <h2 className="bhead center">{data && data.name || ""}</h2>
              <ul className="serviceList clearfix">
                {dataArticle && dataArticle.length > 0 && dataArticle.map((item,index) => {
                  
                  // console.log(pathname);
                  // console.log(item);
                  
                return (
                  <li 
                    className={`item${index+1} wow fadeInUp ${pathname === '/gioi-thieu-30' ? "" : "jubeno_diff_2_page" }`} 
                    data-wow-delay={`${(index+1)/10}s`}
                    
                  >
                    <div className="inside">
                      <p className="photo">
                        <Link 
                          path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                          href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                          title={item.title}
                        ><img src={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image}`} alt={item.title} />
                        </Link>
                      </p>
                      <p>
                        <Link
                          title={item.title}
                          path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                          href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                        >
                          {item.title}
                        </Link>
                      </p>
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