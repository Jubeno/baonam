/* eslint-disable react/button-has-type */
/* eslint-disable react/button-has-type */
import React from 'react';
import { FormattedMessage } from 'react-intl'
import { Modal } from 'antd'
import dynamic from 'next/dynamic';

import Link from '../../lib/utils/ActiveLink';
// import NbmImage from '../../lib/NbmImage';
// import CONFIG from '../../lib/config';
// eslint-disable-next-line no-unused-vars
import log from '../../lib/utils/log'
import Gallery from '../productdetails/GalleryModal';

/* const Gallery = dynamic(() => import('../productdetails/GalleryModal'), {
  ssr: false, loading: () => <p>...</p>
}) */

export default class ModalShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/destructuring-assignment
      show: false,
      data: {}
    };

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showModal !== this.props.showModal) {
      const { show } = this.state;
      this.setState({ show: !show })
    }
    if (nextProps.data !== this.props.data) {
      this.setState({ data: nextProps.data })
    }
  }

  handleCancel = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const { show, data } = this.state;
    return (
      <React.Fragment>
        <Modal
          title={data.productName}
          visible={show}
          onCancel={this.handleCancel}
          width='70%'
          footer={[]}
          destroyOnClose
        >
          <div className="block-quickview primary_block row">
            <div className="product-left-column col-xs-12 col-sm-5 col-md-5 col-lg-5">
              <div className="clearfix image-block">
                <span className="view_full_size">
                  <a className="img-product" key={data.id}>
                    {/* <figure
                      className="room-figure"
                      onMouseMove={this.handleMouseMove}
                      style={{
                        backgroundImage: `url(${CONFIG.IMAGE_DAS_SERVER}${data.productImage})`,
                        backgroundPosition,
                        backgroundRepeat: "no-repeat",
                        width: '350px'
                      }}
                    > */}
                    <Gallery
                      key={data.id}
                      screenShots={data.screenShots}
                      productName={data.productName}
                      productImage={data.productImage}
                      id={data.id}
                    />
                    {/* <NbmImage
                      className="image-figure"
                      style={{ width: '350px', padding: '10px', border: '1px solid', margin: 'auto' }}
                      keys={data.id}
                      type="IMAGE_PRODUCT_DETAIL"
                      src={`${data.productImage}`}
                      alt={data.productName}
                    /> */}
                    {/* </figure> */}
                  </a>
                </span>
              </div>
            </div>
            <div className="product-center-column product-info product-item col-xs-12 col-sm-7 col-md-7 col-lg-7" id="product-13743716">
              <div className="head-qv"> <h3 className="qwp-name">{data.productName}</h3></div>
              <div className="quickview-info">
                <span className="first_status"><span className="a_name"><FormattedMessage id="product.supplier" />:</span>&nbsp;
                  <span className="status_name">
                    {data.supplier && data.supplier.supplierName}
                  </span>
                  <span className="hidden-xs">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                </span>
                <span className="inventory_quantity"><span className="a_name"><FormattedMessage id="product.Status" />:</span>
                  <span className="status_name availabel">
                    <FormattedMessage id="product.Status.suss" />
                  </span>
                </span>
              </div>
              <div className="price-box" itemProp="offers" itemScope itemType="http://schema.org/Offer">
                <div className="special-price"><br />
                  <span className="price product-price">
                    <Link path="/contactUs/contactUs" href="/lien-he"><h3><FormattedMessage id="contact" /></h3></Link>
                  </span>
                </div><br />
                <link itemProp="availability" href="http://schema.org/OutOfStock" />
              </div>
              <div className="form-product col-sm-12">
                <div className="box-variant clearfix ">
                  <input type="hidden" name="variantId" defaultValue={23042071} />
                </div>
                <div className="form-group form_button_details ">
                  <button
                    className="btn btn-lg btn-style button_cart_buy_disable  btn-cart"
                    title="Hết hàng"
                    disabled="disabled"
                  >
                    <span><FormattedMessage id="product.Status.suss" /></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    )
  }
}