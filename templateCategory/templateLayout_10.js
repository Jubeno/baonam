/* eslint-disable no-unused-expressions */
import React from 'react';
import getConfig from 'next/config'
import _ from "lodash"
import EncodeUrl from '@/utils/encode'
import Link from '@/utils/ActiveLink';
import log from '@/utils/log';

// import moment from 'moment'
// import EncodeUrl from '@/utils/encode'
// import getConfig from 'next/config'
// import NbmImage from '@/componentDashs/NbmImage'

// const { publicRuntimeConfig } = getConfig()
// const routesWeb = routes.web;
// const pageSize = 4
// nhiều danh mục, phân chia các tin (hiển thị ảnh và tilte)
const { publicRuntimeConfig } = getConfig()
class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      key: -1,


      // total: 0
    }
  }

  // componentDidMount() {
  //   // const { data, query } = this.props;
  //   // let dataArrticles = ''
  //   // if (query.categoryId === undefined) {
  //   //   dataArrticles = data.length > 0 && data
  //   // }
  //   // else {
  //   //   dataArrticles = data && data.filter(item => `${item.id}` ===
  //   //     `${query.categoryId}`)
  //   // }
  //   // const dataArr = dataArrticles.length > 0 && dataArrticles[0].Articles.length >= pageSize ? dataArrticles[0].Articles.slice(0, pageSize) : dataArrticles[0].Articles
  //   // this.setState({ Articles: dataArr, total: dataArrticles[0].Articles.length })
  // }

  // componentWillReceiveProps(nextProps) {
  //   const { query } = this.props;
  //   let dataArrticles = ''
  //   if (nextProps.query && nextProps.query.categoryId === undefined) {
  //     dataArrticles = nextProps.data.length > 0 && nextProps.data
  //   }
  //   else {
  //     dataArrticles = nextProps.data && nextProps.data.filter(item => `${item.id}` ===
  //       `${nextProps.query.categoryId}`)
  //   }
  //   const dataArr = dataArrticles && dataArrticles.length > 0 && dataArrticles[0].Articles.length >= pageSize ? dataArrticles[0].Articles.slice(0, pageSize) : dataArrticles[0].Articles || []
  //   if (nextProps.query !== query) {
  //     this.setState({ Articles: dataArr, total: dataArrticles[0].Articles.length })
  //   }
  // }

  // fetchMore = (pageIndex) => {
  //   const { data, query } = this.props;
  //   let dataArrticles = ''
  //   if (query.categoryId === undefined) {
  //     dataArrticles = data.length > 0 && data
  //   }
  //   else {
  //     dataArrticles = data && data.filter(item => `${item.id}` ===
  //       `${query.categoryId}`)
  //   }
  //   const startIndex = (pageIndex - 1) * pageSize
  //   const endIndex = pageIndex * pageSize
  //   const dataArr = dataArrticles.length > 0 && dataArrticles[0].Articles.length >= 5 ? dataArrticles[0].Articles.slice(startIndex, endIndex) : dataArrticles[0].Articles
  //   this.setState({ Articles: dataArr, total: dataArrticles[0].Articles.length })
  // }
  setOpen = (index, i) => {
    const { key } = this.state;
    log('setOpen', index, i)
    if (index * 3 + i === key)
      this.setState({
        key: -1
      })
    else
      this.setState({
        key: index * 3 + i
      })

  }

  render() {
    const { data, dataArticle } = this.props;
    const { key } = this.state;
    let tdataArticle = dataArticle || []
    tdataArticle = _.chunk(tdataArticle, 3)
    const datas = tdataArticle.slice(0, 2) || tdataArticle
    // log(' dataArticle%o', data)

    return (
      <React.Fragment>
        <section className="awe-section-10 margin-top-20">
          <section className="section_cauhoi">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="title_module_main a-center">
                    <h2><span>{data.name}</span></h2>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="wrap_cauhoi">
                    <div className="row wrap_question_js">

                      {
                        // eslint-disable-next-line array-callback-return
                        (datas || []).map((items, index) => (
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                            {
                              (items || []).map((item, i) => {
                                const wrap = (index * 3 + i === key) ? 'itemquestion item_js col-click clicked' : 'itemquestion item_js col-click'
                                const title = (index * 3 + i === key) ? 'title opened' : 'title'
                                const displayed = (index * 3 + i === key) ? 'block' : 'none'

                                return (
                                  <div className={wrap} onClick={() => this.setOpen(index, i)}>
                                    <div className={title}><h4>{item.title}</h4></div>
                                    <div className="content content_question" style={{ display: `${displayed}` }}>
                                      <p>{item.shortDescription || ''}</p>
                                    </div>
                                  </div>

                                )
                              })
                            }

                          </div>))
                      }
                      {/* <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">

                        <div className="itemquestion item_js col-click">
                          <div className="title"><h4>Tôi có thể đặt hẹn khám như thế nào?</h4></div>
                          <div className="content content_question" style={{ display: 'none' }}>
                            <p>Việc đặt hẹn khám trước sẽ giúp cho Quý vị có thể chủ động thời gian đi khám và Bệnh viện cũng chủ động bố trí nhân lực khám giúp mang đến cho Quý vị dịch vụ tốt hơn. Quý vị cần đặt hẹn trước giờ dự định đến khám ít nhất 24 giờ, nhân viên của chúng tôi sẽ liên lạc lại với Quý vị để xác nhận đặt hẹn.</p>
                          </div>
                        </div>
                        <div className="itemquestion item_js col-click">
                          <div className="title"><h4>Tôi sẽ gặp bác sĩ khám nào?</h4></div>
                          <div className="content content_question" style={{ display: 'none' }}>
                            <p>Quý vị có quyền lựa chọn bác sĩ nếu bác sĩ đó có lịch ở phòng khám. Trường hợp bác sĩ không có lịch khám ngày hôm đó, chúng tôi sẽ liên hệ với bác sĩ đó và quý vị có thể được khám bác sĩ đó nếu bác sĩ đồng ý.</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="itemquestion item_js col-click">
                          <div className="title"><h4>Tôi sẽ mất thời gian bao lâu?</h4></div>
                          <div className="content content_question" style={{ display: 'none' }}>
                            <p>Quá trình khám bệnh của quý vị thông thường sẽ kéo dài trong khoảng 1-3 tiếng, tùy thuộc vào tình trạng bệnh, số lượng chỉ định cận lâm sàng và số lượng bệnh nhân khám trong ngày. Với các bệnh nhân có kết quả khám bất thường hoặc cần phải làm thêm các xét nghiệm chuyên sâu, thời gian khám có thể kéo dài hơn.</p>
                          </div>
                        </div>
                        <div className="itemquestion item_js col-click">
                          <div className="title"><h4>Tôi có thể sử dụng hình thức thanh toán nào?</h4></div>
                          <div className="content content_question" style={{ display: 'none' }}>
                            <p>Quý vị có thể thanh toán bằng tiền mặt và/hoặc thẻ tín dụng (Master card/Visa card) và/hoặc thẻ ATM của các ngân hàng trong nước.</p>
                          </div>
                        </div>
                        <div className="itemquestion item_js col-click">
                          <div className="title"><h4>Cần chuẩn bị gì trước khi khám sức khỏe định kỳ?</h4></div>
                          <div className="content content_question" style={{ display: 'none' }}>
                            <p>Cần chuẩn bị gì trước khi khám sức khỏe định kỳ?
                        Để việc kiểm tra sức khỏe định kỳ đạt hiệu quả cao nhất, trước khi khám sức khỏe bạn cần: - Xem lại tiền sử sức khỏe của gia đình: cần báo cho bác sĩ biết các thông tin về sức khỏe và bệnh tật của các thành viên trong gia đình mình, từ đó bác sĩ sẽ đánh giá nguy cơ bệnh của bạn dựa trên tiền sử bệnh của gia đình gia đình vì yếu tố này có thể làm bạn tăng nguy cơ một số bệnh như đái tháo đường, ung thư, bệnh tim và đột quỵ.</p>
                          </div>
                        </div>
                      </div> */}
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