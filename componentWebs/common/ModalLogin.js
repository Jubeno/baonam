import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'
import ModalResetPass from './ModalResetPass';

const SIGN_IN = gql`
    mutation Signin($username: String!, $password: String!) {
        login(userName: $username, password: $password) {
            token
        }
    }
`

const ModalLogin = (ctx) => {
  let username, password

  return (
    <Mutation mutation={SIGN_IN} onCompleted={(data) => {
      // Store the token in cookie
      document.cookie = cookie.serialize('token', data.login.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/'
      })
      // logged in
      ctx.client.cache.reset().then(() => {
        window.location.reload(true)
      })
    }} onError={(error) => {
      console.log(error)
      $('[data-toggle="validator"]').trigger('init_form_validator');
    }}>
      {(login, { data, error }) => (
        <React.Fragment>
          <div className="modal fade" id="dangnhap" tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog wrap-modal-login" role="document">
              <div className="text-xs-center">
                <div id="loginx">
                  <div className="row row-noGutter">
                    <div className="col-md-9 col-lg-12 col-sm-12">
                      <div className="content a-left">
                        <h5 className="title-modal a-center">ĐĂNG NHẬP TÀI KHOẢN </h5>
                        <form onSubmit={e => {

                          console.log("onSubmit")
                          if (username.value !== '' && password.value !== '') {
                            login({
                              variables: {
                                username: username.value,
                                password: password.value
                              }
                            })

                            username.value = password.value = ''
                            e.preventDefault()
                            e.stopPropagation()
                            e.nativeEvent.stopImmediatePropagation()
                          }

                        }} data-toggle="validator" noValidate="noValidate" className="form form-blocking fv-form form--general fv-form-bootstrap">
                          <div className="form-signup">
                          </div>
                          <div className="form-signup clearfix">
                            <fieldset className={`form-group has-feedback ${error && " has-error"}`}>
                              <label>Tên tài khoản: </label>
                              <input type="text"
                                className="form-control"
                                id="user_login"
                                name="user_login"
                                placeholder="Nhập tên đăng nhập"
                                autoComplete="off"
                                data-fv-notempty="true"
                                data-fv-notempty-message="Vui lòng nhập tên đăng nhập"
                                pattern="^[a-zA-Z0-9@._-]+$"
                                data-fv-regexp-message="Tên đăng nhập chỉ gồm chữ cái,số và kí tự: @.-_"
                                data-fv-field="user_login"
                                ref={node => { username = node }}
                              />
                              <i className="form-control-feedback fv-icon-no-label fv-bootstrap-icon-input-group" data-fv-icon-for="user_login" style={{ display: 'none' }} />
                              <div id="text-notice-email-confirm" style={{ paddingTop: 5, color: 'red' }} />
                              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="user_login" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Vui lòng nhập tên tài khoản</small><small className="help-block" data-fv-validator="regexp" data-fv-for="user_login" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Tên tài khoản không hợp lệ</small>
                              {error && <React.Fragment>
                                {/* <i className="form-control-feedback fv-icon-no-label fv-bootstrap-icon-input-group glyphicon glyphicon-remove" data-fv-icon-for="user_login"></i> */}
                                <small className="help-block" style={{color:'red'}}>
                                  Tên hoặc mật khẩu không đúng
                                </small>
                              </React.Fragment>}
                            </fieldset>
                            <fieldset className={`form-group has-feedback ${error && " has-error"}`}>
                              <label>Mật khẩu: </label>
                              <input type="password" className="form-control" id="password" name="password" placeholder="Mật khẩu" autoComplete="off" data-fv-notempty={true} data-fv-notempty-message="Vui lòng nhập mật khẩu" data-fv-stringlength="true" data-fv-stringlength-min="6" data-fv-stringlength-max="32" data-fv-stringlength-message="Mật khẩu phải từ 6 đến 32 kí tự" data-fv-field="password" ref={node => { password = node }} />
                              <i className="form-control-feedback fv-icon-no-label fv-bootstrap-icon-input-group" data-fv-icon-for="password" style={{ display: "none" }}></i>
                              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="password" data-fv-result="NOT_VALIDATED" style={{ display: "none" }}>Vui lòng nhập mật khẩu</small>
                              <small className="help-block" data-fv-validator="stringLength" data-fv-for="password" data-fv-result="NOT_VALIDATED" style={{ display: "none" }}>Mật khẩu phải từ 6 đến 32 kí tự</small>
                            </fieldset>
                            {/* <div className="a-left">
                              <p className="margin-bottom-15">Bạn quyên mật khẩu? Hãy bấm <a href="#" className="btn-link-style btn-link-style-active" onClick={() => {
                                showRecoverPasswordForm();
                              }}>&nbsp;tại đây</a></p>
                            </div> */}
                            <fieldset className="form-group">
                              <input className="btn btn-primary btn-full" defaultValue="Đăng nhập" type="submit" />
                            </fieldset>
                          </div>
                        </form>
                        <div className="link-popup">
                          <p>
                            Chưa có tài khoản đăng ký
                          <a href="#" className="margin-top-20" data-dismiss="modal" data-toggle="modal" data-target="#dangky">&nbsp;tại đây</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ModalResetPass />
              </div>
              <button type="button" className="btn btn-close btn-default" data-dismiss="modal"><i className="fa fa-close" /></button>
            </div>
          </div>
        </React.Fragment>
      )}
    </Mutation>
  )
}

const mapStateToProps = (state, props) => {
  return {
    shoppingCart: state.shoppingCart,
  }
}

const enhance = compose(
  withApollo,
  connect(mapStateToProps, null)
)(ModalLogin)

export default enhance

