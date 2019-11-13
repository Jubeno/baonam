import { Mutation, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import cookie from 'cookie'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import log from '../../lib/utils/log'
const typeLog = 'log'

const SIGN_UP = gql`
  mutation SignUp($fullName: String!, $username: String!, $password: String!) {
    signup(fullName: $fullName, userName: $username, password: $password) {
      token
    }
  }
`

const ModalLogin = (ctx) => {
  let username, password, fullname

  return (
    <Mutation mutation={SIGN_UP} onCompleted={(data) => {
      // Store the token in cookie
      document.cookie = cookie.serialize('token', data.signup.token, {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/'
      })
      log(typeLog, "token: ", data.signup.token)
      // logged in
      ctx.client.cache.reset().then(() => {
        window.location.reload(true)
      })
    }} onError={(error) => {
      console.log(error)
      $('[data-toggle="validator"]').trigger('init_form_validator');
    }}>
      {(signup, { data, error }) => (
        <React.Fragment>
          <div className="modal fade" id="dangky" tabIndex={-1} role="dialog" aria-hidden="true">
            <div className="modal-dialog wrap-modal-login" role="document">
              <div className="text-xs-center">
                <div id="login">
                  <div className="row row-noGutter">
                    <div className="col-sm-12">
                      <div className="content a-left">
                        <h5 className="title-modal a-center">ĐĂNG KÝ TÀI KHOẢN</h5>
                        <form onSubmit={e => {

                          log("onSubmit")
                          if (fullname.value !== '' && username.value !== '' && password.value !== '') {
                            signup({
                              variables: {
                                fullName: fullname.value,
                                username: username.value,
                                password: password.value
                              }
                            })
                            e.preventDefault()
                            e.stopPropagation()
                            e.nativeEvent.stopImmediatePropagation()
                          }

                          fullname.value = username.value = password.value = ''
                        }} data-toggle="validator" noValidate="noValidate" className="form form-blocking fv-form form--general fv-form-bootstrap">
                          {/* <input name="FormType" defaultValue="customer_login" type="hidden" />
                          <input name="utf8" defaultValue="true" type="hidden" /> */}
                          <div className="form-signup">
                          </div>
                          <div className="form-signup clearfix">
                            <fieldset className={`form-group has-feedback ${error && " has-error"}`}>
                              <label htmlFor="name_0" className="control-label">Họ tên</label>
                              <input type="text" className="form-control" tabIndex={1} id="name_0" name="fullName" placeholder="Nhập họ tên" defaultValue="" data-fv-notempty="true" data-fv-notempty-message="Vui lòng nhập Họ tên" data-fv-stringlength="true" data-fv-stringlength-max={60} data-fv-stringlength-message="Họ tên nhập tối đa 60 ký tự" data-fv-field="fullName" ref={node => { fullname = node }} />
                              <i className="form-control-feedback" data-fv-icon-for="fullName" style={{ display: 'none', pointerEvents: 'none' }} />
                              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="fullName" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Vui lòng nhập Họ tên</small>
                              <small className="help-block" data-fv-validator="stringLength" data-fv-for="fullName" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Họ tên nhập tối đa 60 ký tự</small>
                            </fieldset>
                            <fieldset className={`form-group has-feedback ${error && " has-error"}`}>
                              <label>Tên tài khoản: </label>
                              <input type="text"
                                tabIndex={2}
                                className="form-control"
                                id="user_login"
                                name="user_login"
                                placeholder="Nhập tên tài khoản"
                                autocomplete="off"
                                data-fv-notempty="true"
                                data-fv-notempty-message="Vui lòng nhập tên tài khoản"
                                pattern="^[a-zA-Z0-9@._-]+$"
                                data-fv-regexp-message="Tên tài khoản chỉ gồm chữ cái,số và kí tự: @.-_"
                                data-fv-field="user_login"
                                ref={node => { username = node }}
                              />
                              <i className="form-control-feedback fv-icon-no-label fv-bootstrap-icon-input-group" data-fv-icon-for="user_login" style={{ display: 'none' }} />
                              <div id="text-notice-email-confirm" style={{ paddingTop: 5, color: 'red' }} />
                              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="user_login" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Vui lòng nhập tên tài khoản</small>
                              <small className="help-block" data-fv-validator="regexp" data-fv-for="user_login" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Tên tài khoản không hợp lệ</small>
                              {error && <React.Fragment>
                                {/* <i className="form-control-feedback fv-icon-no-label fv-bootstrap-icon-input-group glyphicon glyphicon-remove" data-fv-icon-for="user_login"></i> */}
                                <small className="help-block" style={{ color: 'red' }}>
                                  Tài khoản đã tồn tại
                                </small>
                              </React.Fragment>}
                            </fieldset>
                            <fieldset className={`form-group has-feedback ${error && " has-error"}`}>
                              <label>Mật khẩu: </label>
                              <input type="password" tabIndex={3} className="form-control" id="password" name="password" placeholder="Mật khẩu" autocomplete="off" data-fv-notempty={true} data-fv-notempty-message="Vui lòng nhập mật khẩu" data-fv-stringlength="true" data-fv-stringlength-min="6" data-fv-stringlength-max="32" data-fv-stringlength-message="Mật khẩu phải từ 6 đến 32 kí tự" data-fv-field="password" ref={node => { password = node }} />
                              <i className="form-control-feedback fv-icon-no-label fv-bootstrap-icon-input-group" data-fv-icon-for="password" style={{ display: "none" }}></i>
                              <small className="help-block" data-fv-validator="notEmpty" data-fv-for="password" data-fv-result="NOT_VALIDATED" style={{ display: "none" }}>Vui lòng nhập mật khẩu</small>
                              <small className="help-block" data-fv-validator="stringLength" data-fv-for="password" data-fv-result="NOT_VALIDATED" style={{ display: "none" }}>Mật khẩu phải từ 6 đến 32 kí tự</small>
                            </fieldset>
                            <div className="a-left">
                            </div>
                            <fieldset className="form-group">
                              <input tabIndex={4} className="btn btn-primary btn-full" defaultValue="Đăng ký" type="submit" disabled />
                            </fieldset>
                          </div>
                        </form>
                        <div className="link-popup">
                          <p>
                            Đã có tài khoản đăng nhập
                          <a href="#" className="margin-top-20" data-dismiss="modal" data-toggle="modal" data-target="#dangnhap">&nbsp;tại đây</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

