import React, { Component } from 'react';

export default ({ loginUser }) => {
    return (
      <React.Fragment>
        <div id="b" className="col-xs-12 col-sm-12 col-lg-3 col-right-account margin-top-20">
          <div className="page-title mx991">
            <h1 className="title-head"><a href="#">Thông tin tài khoản</a></h1>
          </div>
          <div className="form-signup body_right mx991">
            <p><strong>Xin chào, <a href="/account/addresses" style={{ color: '#80bb35' }}> vutuyen</a>&nbsp;!</strong></p>
          </div>
          <div className="block-account">
            <div className="block-title-account"><h5>Tài khoản của tôi</h5></div>
            <div className="block-content form-signup">
              <p>Tên tài khoản: <strong>{loginUser && loginUser.userName}</strong></p>
              <p><i className="fa fa-user" aria-hidden="true" />  <span><a href="/thong-tin-tai-khoan">Thông tin tài khoản</a></span></p>
              <p><i className="fa fa-key" aria-hidden="true" /> <span><a href="/thay-doi-mat-khau">Đổi mật khẩu</a> </span> </p>
              <p><i className="fa fa-history" aria-hidden="true" /> <span><a href="/lich-su-mua-hang">Lịch sử mua hàng</a></span> </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
}
