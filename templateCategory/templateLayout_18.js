/* eslint-disable react/button-has-type */
import React from 'react';
import getConfig from 'next/config'
import moment from 'moment';
import Pagination from '@/componentWebs/Pagination';
import EncodeUrl from '@/utils/encode'
import Link from '@/utils/ActiveLink';

const { publicRuntimeConfig } = getConfig()
const pageSize = 4
class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      Active: false,
      Articles: [],
      total: 0
    }
  }

  componentDidMount() {
    const { dataArticle } = this.props;
    const dataArrticles = dataArticle && dataArticle.length >= pageSize ? dataArticle.slice(0, pageSize) : dataArticle
    this.setState({ Articles: dataArrticles, total: dataArticle.length })
  }

  fetchMore = (pageIndex) => {
    const { dataArticle } = this.props;
    const startIndex = (pageIndex - 1) * pageSize
    const endIndex = pageIndex * pageSize
    const dataArrticles = dataArticle && dataArticle.length >= pageSize ? dataArticle.slice(startIndex, endIndex) : dataArticle
    this.setState({ Articles: dataArrticles, total: dataArticle.length })
  }

  getIdCategory = (value) => {
    let string = value && value.match(/\d+/g).reverse() || []
    return string
  }

  render() {
    const { data, dataArticle, dataCategoryAll } = this.props;
    const { Articles, total, Active, key } = this.state
    const dayWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy',]

    if (dataArticle <= 0) { return null }
    // console.log("dataCategoryAll", dataCategoryAll)
    return (
      <React.Fragment>

        <section className="blog_page_section">
          <div className="container  margin-bottom-50">
            <div className="row">
              <section
                className={
                  dataCategoryAll && dataCategoryAll.result && dataCategoryAll.result.length > 0
                    ? "right-content col-lg-9 col-md-9 col-sm-12 col-lg-push-3 col-md-push-3"
                    : "right-content col-lg-10 col-md-10 col-sm-12 col-lg-push-1 col-md-push-1"
                }
              >
                <div className="page_title">
                  <h1 className="title_page_h1">{data.name}</h1>
                </div>
                <section className="list-blogs blog-main">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      {Articles && Articles.length > 0 && Articles.map((item) => {
                        return (
                          <div className="blog_full margin-bottom-30">
                            <div className="blog-inner">
                              <div className="blog-img blog_img_left">
                                <Link
                                  path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                  href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                // title="Xem chi tiết"
                                // className="viewlog"
                                >
                                  <picture>
                                    {/* <source media="(max-width: 480px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/hiv-aids-services-800x500.jpg?v=1536379058420" />
                                    <source media="(min-width: 481px) and (max-width: 767px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/hiv-aids-services-800x500.jpg?v=1536379058420" />
                                    <source media="(min-width: 768px) and (max-width: 1023px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/hiv-aids-services-800x500.jpg?v=1536379058420" />
                                    <source media="(min-width: 1024px) and (max-width: 1199px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/hiv-aids-services-800x500.jpg?v=1536379058420" />
                                    <source media="(min-width: 1200px)" srcSet="//bizweb.dktcdn.net/thumb/large/100/330/752/articles/hiv-aids-services-800x500.jpg?v=1536379058420" /> */}
                                    {/* <img src="./Tin tức Medisan_files/hiv-aids-services-800x500.jpg" style={{ maxWidth: '100%' }} className="img-responsive" alt="Báo động tình trạng trẻ nhiễm HIV ngày càng cao" /> */}
                                    <img style={{ maxWidth: '100%' }} className="img-responsive" src={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.image}`} alt={item.title} />

                                  </picture>
                                </Link>
                              </div>
                              <div className="content_blog_full">
                                <h3>
                                  <Link
                                    path={`/User/Detail?categoryName=${item.categories && item.categories.name}&name=${EncodeUrl(item.title)}&articleId=${item.id}`}
                                    href={`/${EncodeUrl(item.categories && item.categories.name)}/${EncodeUrl(item.title)}/${item.id}`}
                                    title={item.title}
                                  >
                                    {item.title}
                                  </Link>
                                </h3>
                                <span className="time_post f"><i className="fa fa-calendar" />&nbsp;
                                {`${dayWeek[moment(item.createDate).day() || 0]}, ${moment(item.createDate).format('DD/MM/YYYY')}`}
                                </span>
                                <div className="blog-description">
                                  <p className="text3line">
                                    {item.shortDescription}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                      }
                    </div>
                    <div className="text-xs-right col-lg-12 col-sm-12 col-xs-12 col-md-12 paginatepage">
                      <Pagination
                        style={{ textAlign: 'center' }}
                        items={total}
                        pageSize={pageSize}
                        fetchMore={this.fetchMore}
                      />
                    </div>
                  </div>
                </section>
              </section>
              {dataCategoryAll && dataCategoryAll.result && dataCategoryAll.result.length > 0 &&
                <aside className="left left-content col-xs-12 col-lg-3 col-md-3 col-sm-12 col-lg-pull-9 col-md-pull-9">
                  <aside className="aside-item collection-category asidemobile margin-bottom-25">
                    <div className="title_module_arrow">
                      <h2 className="margin-top-0"><span>Danh mục tin tức</span></h2>
                    </div>
                    <div className="aside-content aside-cate-link-cls">
                      <nav className="cate_padding nav-category navbar-toggleable-md">
                        <ul className="nav-ul nav navbar-pills">
                          {dataCategoryAll.result.map((item) => {
                            return (
                              <li className={item.id === data.id ? "nav-item active lv1" : "nav-item  lv1"}>
                                {item.id !== data.id ?
                                  <Link className="nav-link" path={`/User/Category?categoryId=${this.getIdCategory(item.url || '').length > 0 && this.getIdCategory(item.url || '')[0] || ""}&parentId=${this.getIdCategory(item.url || '').length > 1 && this.getIdCategory(item.url || '')[1] || ""}`} href={item.url}>{item.name}</Link> : <a className="nav-link" > {item.name}</a>}
                              </li>
                            )
                          })}
                        </ul>
                      </nav>
                    </div>
                  </aside>
                </aside>
              }
            </div>
          </div>
        </section>
      </React.Fragment >
    );
  }
}

export default Index;