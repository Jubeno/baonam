/* eslint-disable react/button-has-type */
import React from 'react';
import { renderTemplatesCategory } from '@/templateCategory';

class Index extends React.PureComponent {

  render() {
    const { data, dataArticle, dataCategoryAll, dataArticlev2 } = this.props;
    const tdataArticle = dataArticle && dataArticle.length > 0 && dataArticle[0]
    // console.log(dataCategoryAll, dataCategoryAll)
    return (
      <React.Fragment>
        <section className="page margin-top-20">
          {/* <div className="container">
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12">
                <div className="page-title a-center">
                  <h1 className="title-head"><span>{tdataArticle.title}</span></h1>
                </div>
              </div>
            </div>
          </div> */}
          <div className="wrap_about">
            <div className="content-page rte">
              {/* <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-md-10 col-sm-12 col-xs-12 col-lg-offset-1 col-md-offset-1">
                    <div className="despage a-center margin-bottom-40">
                      <div dangerouslySetInnerHTML={{ __html: tdataArticle.description }} />
                    </div>
                  </div>
                </div>
              </div> */}
              {dataCategoryAll && dataCategoryAll.result && dataCategoryAll.result.length > 0 && dataCategoryAll.result.map((item) => {
                const ArticleAll = dataArticlev2 && dataArticlev2.filter((items) => item.id === items.categoriesId)
                if (ArticleAll && ArticleAll.length > 0) {
                  return renderTemplatesCategory([item], ArticleAll)
                }
                return null
                // return renderTemplatesCategory([item], ArticleAll)
              })}
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Index;