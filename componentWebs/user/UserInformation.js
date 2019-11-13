import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import log from '../../lib/utils/log'

import { validPhone } from '../../lib/utils'
import { setLogin } from '../../lib/user/actions';


const typeLog = 'log'

const UserInformation = ({ loginUser, handleSubmit }) => {
  const { userName, fullName, msisdn, id } = loginUser
  return (
    <React.Fragment>
      <Mutation
        mutation={update_UserClientGql}
        onCompleted={(data) => {
          log(typeLog, "data: %o", data)

        }}
        onError={(err) => {
          log(typeLog, 'error: ', err.graphQLErrors)
          // err.graphQLErrors && log(typeLog, "pages -> index -> graphQLErrors: ", err.graphQLErrors)
          // err.networkError && log(typeLog, "pages -> index -> networkError: ", err.networkError)
        }}
      >
        {(updateUserInfo, { data, error }) => (
          <div id="a" className="col-xs-12 col-sm-12 col-lg-9 col-left-account">
            <div className="page-title m992">
              <h1 className="title-head margin-top-0"><a href="#">Thông tin tài khoản</a></h1>
            </div>
            <div className="username-password">
              <form onSubmit={e => handleSubmit(e, updateUserInfo)} className="form form--general form-registration fv-form fv-form-bootstrap" data-toggle="validator" noValidate="novalidate">
                {error && <div className="form-group">
                  <div class="alert alert-danger" role="alert">Thất bại</div>
                </div>}
                {data && data.updateUser && <div className="form-group">
                  <div class="alert alert-success" role="alert">Thay đổi thông tin thành công</div>
                </div>}
                <div className="row form">
                  <div className="col-md-6">
                    <input type="hidden" defaultValue={id} name="id" />
                    <div className="form-group form-group-lg has-feedback">
                      <label htmlFor="userName" className="control-label">Tên đăng nhập <span className="text-color-red">(*)</span></label>
                      <div className="input-group">
                        <div className="input-group-addon"><i className="hd hd-user" /></div>
                        <input className="form-control" id="userName" name="userName" disabled defaultValue={userName} data-fv-notempty="true" data-fv-notempty-message="Vui lòng nhập userName" />
                      </div>
                      <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="email" style={{ display: 'none' }} />
                      <small className="help-block" data-fv-validator="userName" data-fv-for="userName" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Vui lòng nhập tên</small><small className="help-block" data-fv-validator="notEmpty" data-fv-for="userName" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Vui lòng nhập tên </small><small className="help-block" data-fv-validator="regexp" data-fv-for="userName" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Tên đăng nhập không hợp lệ</small></div>
                    <div className="form-group form-group-lg has-feedback">
                      <label htmlFor="fullname" className="control-label">Họ tên <span className="text-color-red">(*)</span></label>
                      <div className="input-group">
                        <div className="input-group-addon"><i className="hd hd-user" /></div>
                        <input
                          className="form-control"
                          id="fullname"
                          name="fullname"
                          placeholder="Nhập họ tên"
                          autoComplete="off"
                          defaultValue={fullName}
                          data-fv-notempty="true"
                          data-fv-notempty-message="Vui lòng nhập họ tên"
                          data-fv-stringlength="true"
                          data-fv-stringlength-max={60}
                          data-fv-stringlength-message="Họ tên nhập tối đa 60 ký tự"
                          data-fv-field="fullName" required
                          type="text"
                        />
                      </div>
                      <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="fullname" style={{ display: 'none' }} />
                      <small className="help-block" data-fv-validator="notEmpty" data-fv-for="fullname" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Vui lòng nhập họ tên</small><small className="help-block" data-fv-validator="stringLength" data-fv-for="fullname" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Họ tên nhập tối đa 60 ký tự</small></div>
                    <div className="form-group form-group-lg has-feedback">
                      <label htmlFor="phone" className="control-label">Điện thoại <span className="text-color-red">(*)</span></label>
                      <div className="input-group">
                        <div className="input-group-addon"><i className="fa fa-phone" /></div>
                        <input type="text" className="form-control" id="phone" name="phone" placeholder="Nhập số điện thoại" autoComplete="off" defaultValue={msisdn} data-fv-notempty="true" data-fv-notempty-message="Vui lòng nhập số điện thoại" pattern="^[0-9]{10,20}$" data-fv-regexp-message="Số điện thoại chỉ được nhập số và từ 10 đến 20 ký tự" data-fv-field="phone" required />
                      </div><i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="phone" style={{ display: 'none' }} />
                      <small className="help-block" data-fv-validator="notEmpty" data-fv-for="phone" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Vui lòng nhập số điện thoại</small><small className="help-block" data-fv-validator="regexp" data-fv-for="phone" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Số điện thoại chỉ được nhập số và từ 10 đến 20 ký tự</small></div>
                    <div className="form-group form-group-lg">
                      <button type="submit" className="btn btn-lg btn-success btn-block" style={{ width: '150px' }}>CẬP NHẬT</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </Mutation>
    </React.Fragment>
  );
}

const update_UserClientGql = gql`
mutation update_UserClient ($id: ID!, $fullName: String, $msisdn: String) {
  updateUser(id: $id, fullName: $fullName,msisdn: $msisdn){
    id
    fullName
    msisdn
  }
}
`

export default compose(
  connect(state => {
    return ({
      loginUser: state.loginUser,
    })
  }, { setLogin }),
  withHandlers({
    handleSubmit: props => (e, updateUserInfo) => {
      log(typeLog, "components -> user -> ChangePassword -> submit: ", e)
      const form = e.target
      const formData = new window.FormData(form)
      const fullName = formData.get('fullname')
      const phone = formData.get('phone')
      // const reNewPass = formData.get('password2')
      if (fullName !== '' && phone !== '' && validPhone(phone)) {
        const data = updateUserInfo({
          variables: {
            id: props.loginUser && props.loginUser.id,
            fullName,
            msisdn: phone
          }
        })
        props.setLogin({
          ...props.loginUser,
          fullName: fullName,
          msisdn: phone
        })
        form.reset()
        $('[data-toggle="validator"]').trigger('init_form_validator');
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
      }
    }
  }),
  lifecycle({
    shouldComponentUpdate(nextProps) {
      if (
        nextProps.loginUser === this.props.loginUser
        // && nextProps.err === this.props.err
      ) {
        return false
      }
      return true
    }
  })
)(UserInformation)