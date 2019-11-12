import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { compose, lifecycle, withHandlers } from 'recompose'
import numeral from 'numeral'
import moment from 'moment'
import { connect } from 'react-redux'
import Pagination from '../../lib/utils/pagination1'
import { ORDER_STATUS } from '../../lib/utils/config'
import { totalPrice, StatusOrder } from '../../lib/utils'

const getOrdersGql = gql`
  query getAllOrders ( $filter: Json, $order: [[String!]], $offset: Int!, $limit: Int!){
    allOrders(filter:$filter,order:$order,offset: $offset, limit: $limit){
      payload{
        id
        userId
        fullName
        createDate
        address
        status
        orderDetails{
          id
          product {
            id
            productName
            productImage
          }
          quantities
          price
          orderId
        }
      }
      meta{
        count
      }
    }
  }
`

const OrderHitory = ({ data: { error, allOrders }, loadMoreOrder, viewDetail }) => {
  return (
    <React.Fragment>
      <div id="a" className="col-xs-12 col-sm-12 col-lg-9 col-left-account">
        <div className="page-title m992">
          <h1 className="title-head margin-top-0"><a href="#">Lịch sử đơn hàng</a></h1>
        </div>
        <div className="col-xs-12 col-sm-12 col-lg-12 no-padding">
          <div className="my-account">
            <div className="dashboard">
              <div className="recent-orders">
                <div className="table-responsive tab-all" style={{ overflowX: 'auto' }}>
                  <table className="table table-cart" id="my-orders-table">
                    <thead className="thead-default a-center">
                      <tr>
                        <th>Đơn hàng</th>
                        <th>Ngày</th>
                        <th>Địa chỉ</th>
                        <th>Số lượng</th>
                        <th>Giá trị đơn hàng</th>
                        <th>Trạng thái thanh toán</th>
                        <th>Trạng thái giao hàng</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrders && allOrders.payload && allOrders.payload.length <= 0 && <tr><td colSpan={6}><p>Không có đơn hàng nào.</p></td></tr>}
                      {allOrders && allOrders.payload && allOrders.payload.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>{item.id}</td>
                            <td>{moment(item.createDate).format("DD-MM-YYYY h:mm a")}</td>
                            <td>{item.address}</td>
                            <td>{item.orderDetails.length}</td>
                            <td>{totalPrice(item.orderDetails)}</td>
                            <td>{`${item.status === ORDER_STATUS.SHIP_SUCSESS ? "Đã thanh toán" : "Đang chờ"}`}</td>
                            <td>{StatusOrder(item.status)}</td>
                            <td><a href="#" onClick={viewDetail({ orderDetails: item.orderDetails })}>Chi tiết</a></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="text-xs-right">
                </div>
              </div>
              <div className="paginate-pages pull-right page-account">
                <Pagination items={allOrders && allOrders.meta.count} pageSize={10} fetchMore={loadMoreOrder} />   
                {/* <nav>
                  <ul className="pagination clearfix">
                    <li className="page-item text"><a className="page-link" href="#"><i className="fa fa-angle-left" /></a></li>
                    <li className="page-item text"><a className="page-link" href="#"><i className="fa fa-angle-right" /></a></li>
                  </ul>
                </nav> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

const userOrderHistoryGraph = graphql(getOrdersGql, {
  options: ({ loginUser }) => {
    return ({
      variables: {
        offset: 0,
        limit: 10,
        filter: { userId: loginUser && loginUser.id },
        order: [["createDate", "DESC"]]
      }
    })

  },
  props: ({ data }) => ({
    data,
    loadMoreOrder: ({ pageIndex }) => {
      return data.fetchMore({
        variables: {
          offset: data.allOrders.payload.length * (pageIndex - 1)
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }
          return fetchMoreResult
        }
      })
    }
  })
})

export default compose(
  // connect(state => {
  //   return ({
  //     loginUser: state.loginUser,
  //   })
  // }, null),
  userOrderHistoryGraph,
  withHandlers({
    viewDetail: props => ({ orderDetails }) => e => {
      let arrHtmlDetails = new Array()
      orderDetails.map((item,index) => {
        const { product: { productName, productImage }, quantities, price } = item
        const imageUrl = `${process.env.IMAGE_SERVER}/${productImage}`
        const price_format = numeral(price).format('0,0')
        const subTotal_format = numeral(price * quantities).format('0,0')
        let htmlDetails = `
          <div class="row">
            <div class="col-md-3">
              <a class="" href="#" title="${productName}">
                <img alt="${productName}" src="${imageUrl}" width="60" />
              </a>
            </div>
            <div class="col-md-3">${quantities}</div>
            <div class="col-md-3">${price_format}</div>
            <div class="col-md-3 ml-auto">${subTotal_format}</div>
          </div>
        `
        arrHtmlDetails.push(htmlDetails)
      })
      $('#historyUserModal .modal-body .container-fluid').html(arrHtmlDetails.join(" "))
      $('#historyUserModal').modal('show')
    }
  }),
  lifecycle({
    shouldComponentUpdate(nextProps, nextState){
      if(
        nextProps.loginUser === this.props.loginUser
        && nextProps.data === this.props.data
      ){
        return false
      }
      return true
    }
  })
)(OrderHitory)