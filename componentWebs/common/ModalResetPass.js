import React, { Component } from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { validEmail } from '../../lib/utils'
import log from '../../lib/utils/log'
const typeLog = 'log'

const RESET_PASS = gql`
  mutation resetPass($email: String!) {
    resetPassword(email: $email) {
      id
      userName
    }
  }
`

const ModalResetPass = ({ handleSubmit }) => {
  return (
    <Mutation mutation={RESET_PASS} onCompleted={(data) => {

    }} onError={(error) => {
      console.log(error)
    }}>
      {(resetPass, { data, error }) => (
        <React.Fragment>
          <div id="recover-password" className="form-signup" style={{ display: 'none' }}>
            <div className="row row-noGutter">
              <div className="col-sm-12">
                <div className="content a-center">
                  {error && <React.Fragment>
                    <h5 className="title-modal">Lấy lại mật khẩu</h5>
                    <p>Tài khoản không tồn tại</p>
                  </React.Fragment>}
                  {!data && !error && <React.Fragment>
                    <h5 className="title-modal">Lấy lại mật khẩu</h5>
                    <p>Chúng tôi sẽ gửi thông tin lấy lại mật khẩu vào email đăng ký tài khoản của bạn</p>
                  </React.Fragment>}
                  {data && data.resetPassword && <React.Fragment>
                    <h5 className="title-modal">Lấy lại mật khẩu thành công</h5>
                    <p>Một email đã được gửi đến {data.resetPassword.userName}</p>
                  </React.Fragment>}
                  <form acceptCharset="UTF-8" id="recover_customer_password" onSubmit={e => handleSubmit(e, resetPass)} data-toggle="validator" noValidate="noValidate" className="form form-blocking fv-form form--general fv-form-bootstrap">
                    <div className="form-signup"></div>
                    <div className="form-signup clearfix">
                      <fieldset className={`form-group has-feedback ${error && " has-error"}`}>
                        {/* <label dataHt>Email: </label> */}
                        <input type="text"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Nhập email"
                          autoComplete="off"
                          data-fv-notempty="true"
                          data-fv-notempty-message="Vui lòng nhập Email"
                          pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                          data-fv-regexp-message="Email không hợp lệ"
                          data-fv-field="email"
                        />
                        <small className="help-block" data-fv-validator="notEmpty" data-fv-for="email" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Vui lòng nhập Email</small>
                        <small className="help-block" data-fv-validator="regexp" data-fv-for="email" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Email không hợp lệ</small>
                      </fieldset>
                    </div>
                    <div className="action_bottom">
                      <input className="btn btn-primary btn-full" defaultValue="Gửi" type="submit" style={{ borderRadius:"15px" }} />
                      <button type="button" className="margin-top-10 btn btn-second btn-full btn-recover-cancel" onClick={() => {
                        hideRecoverPasswordForm();
                      }}>Hủy</button>
                    </div>
                  </form>
                  <div className="margin-top-10"><p>Chào mừng bạn đến với <a href="http://chauruabat.com.vn/">Gia Phát</a></p></div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </Mutation>
  );
}

export default compose(
  withHandlers({
    handleSubmit: props => (e, resetPass) => {
      const form = e.target
      const formData = new window.FormData(form)
      const email = formData.get('email')
      log(typeLog, "components -> common -> ModalResetPass -> submit e: %o \n email: %o", e, email)
      if (email !== '' && validEmail(email)) {
        const data = resetPass({
          variables: {
            email: email
          },
        })
        form.reset()
        $('[data-toggle="validator"]').trigger('init_form_validator');
        // $('#modalComment').modal('hide')
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
      } else {

      }
    }
  })
)(ModalResetPass)