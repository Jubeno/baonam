/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
/* import moment from 'moment';
import numeral from 'numeral'; */
import { compose, withState, withHandlers, lifecycle } from 'recompose';
import { FormattedMessage, injectIntl } from 'react-intl'
import ProductList from './ProductList'
// eslint-disable-next-line no-unused-vars
import log from '../../lib/utils/log';

// eslint-disable-next-line no-unused-vars
const typeLog = 'log'

const ProductIndex = ({
  handleSort,
  defaultSort,
  defaultSortTitle,
  data,
  // headTitle
}) => {
  return (
    <React.Fragment>
      <section className="main_container collection col-lg-9 col-md-9 col-sm-12 col-lg-push-3 col-md-push-3">
        <h1 className="title_page absolute margin-top-0">{data &&  data.name}</h1>
        <div className="category-products products">
          <div className="sortPagiBar">
            <div className="row">
              <div className="col-xs-5 col-md-7 col-sm-6">
                {/* <div className="hidden-xs">
                  <div className="tt hidden">
                    <div id="ttfix" className="hidden-sm hidden-xs">
                      Hiển thị <span>1</span> - <span>5</span> trong tổng số <span>5</span> sản phẩm
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="col-xs-12 col-md-5 col-sm-6 text-xs-left text-sm-right">
                <div id="sort-by">
                  <label className="left"><FormattedMessage id="product.sort" /> : </label>
                  <ul>
                    <li><span className="val">{defaultSortTitle}</span>
                      <ul className="ul_2">
                        <li><a href="javascript:;" onClick={handleSort()}><FormattedMessage id="product.default" /></a></li>
                        <li><a href="javascript:;" onClick={handleSort(1)}>A → Z</a></li>
                        <li><a href="javascript:;" onClick={handleSort(2)}>Z → A</a></li>
                        <li><a href="javascript:;" onClick={handleSort(3)}><FormattedMessage id="product.Latest" /></a></li>
                        <li><a href="javascript:;" onClick={handleSort(4)}><FormattedMessage id="product.old" /></a></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <ProductList defaultSort={defaultSort} />
        </div>
      </section>
    </React.Fragment>
  )
}

export default compose(
  injectIntl,
  withState("defaultSort", "updateSort", "id desc"),
  withState("defaultSortTitle", "updateSortTitle",  props => {
    return `${props.intl.formatMessage({ id: "product.order" })}`
  }),
  withHandlers({
    handleSort: props=> (type) => e => {
      e.preventDefault()
      switch (type) {
        case 1:
          props.updateSort("productName asc")
          props.updateSortTitle("A -> Z")
          break;
        case 2:
          props.updateSort("productName desc")
          props.updateSortTitle("Z -> A")
          break;
        case 3:
          props.updateSort("modifiedAt desc")
          props.updateSortTitle(`${props.intl.formatMessage({ id: "product.Latest" })}`)
          break;
        case 4:
          props.updateSort("createdAt asc")
          props.updateSortTitle(`${props.intl.formatMessage({ id: "product.old" })}`)
          break;
        default:
          props.updateSort("id desc")
          props.updateSortTitle(`${props.intl.formatMessage({ id: "product.default" })}`)
          break;
      }
    }
  }),
  lifecycle({
    shouldComponentUpdate(nextProps) {
      if (
        nextProps.data === this.props.data
        && nextProps.defaultSort === this.props.defaultSort
        && nextProps.defaultSortTitle === this.props.defaultSortTitle
      ) {
        return false
      }
      return true
    }
  })
)(ProductIndex)