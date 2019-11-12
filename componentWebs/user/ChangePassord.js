import React, { Component } from 'react'
import { compose, lifecycle, withState, withHandlers } from 'recompose'
import gql from 'graphql-tag'
import { graphql, withApollo, Mutation } from 'react-apollo'
import log from '../../lib/utils/log'
const typeLog = 'log'

const errMsg = (msg) => {
  if(new RegExp("Invalid password").test(msg)){
    return "Mật khẩu cũ không đúng"
  }
  if (new RegExp("No user found for userId").test(msg)) {
    return "Tài khoản không tồn tại"
  }
  return "Thay đổi mật khẩu thất bại"
}

const ChangePassword = ({ loginUser, handleSubmit }) => {

  /* function handleSubmit(e) {
    log(typeLog, "components -> user -> ChangePassword -> submit: ", e)
    const form = e.target
    const formData = new window.FormData(form)
    const oldPass = formData.get('old_Password')
    const newPass = formData.get('password')
    const reNewPass = formData.get('password2')
    if (oldPass !== '' && newPass !== '' && reNewPass !== '' && newPass === reNewPass) {
      const data = updatePass({
        variables: {
          id: loginUser && loginUser.id,
          oldPassword: oldPass,
          newPassword: newPass
        }
      }).then(data => {
        updateMsg("Thay đổi mật khẩu thành công")
        form.reset()
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
        }).catch(err => {
          updateError("Thay đổi mật khẩu thất bại")
          err.graphQLErrors && log(typeLog, "pages -> index -> graphQLErrors: ", err.graphQLErrors)
          err.networkError && log(typeLog, "pages -> index -> networkError: ", err.networkError)
        })
    } else {

    }
  } */

  return (
    <React.Fragment>
      <Mutation mutation={updateUserPasswordGql} onCompleted={(data) => {
        log(typeLog, "data: %o", data)

      }} onError={(err) => {
        log(typeLog, 'error: ', err.graphQLErrors)
        // err.graphQLErrors && log(typeLog, "pages -> index -> graphQLErrors: ", err.graphQLErrors)
        // err.networkError && log(typeLog, "pages -> index -> networkError: ", err.networkError)
      }}>
        {(updatePass, { data, error }) => (
          <div id="a" className="col-xs-12 col-sm-12 col-lg-9 col-left-account">
            <div className="page-title m992">
              <h1 className="title-head margin-top-0"><a href="#">Đổi Mật Khẩu</a></h1>
            </div>
            <div className="change-password col-xs-12 col-sm-12 col-lg-9">
              <form onSubmit={e => handleSubmit(e, updatePass)} className="form form--general form-registration fv-form fv-form-bootstrap" data-toggle="validator" noValidate="novalidate">
                {error && <div className="form-group">
                  <div class="alert alert-danger" role="alert">
                    {`${errMsg(error.graphQLErrors[0].message)}`}
                  </div>
                </div>}
                {data && data.updatePasswordUser && <div className="form-group">
                  <div class="alert alert-success" role="alert">Thay đổi mật khẩu thành công</div>
                </div>}
                <div className="form-group">
                  <label htmlFor="old_password" className="control-label">Mật khẩu cũ</label>
                  <input type="password" className="form-control" id="old_Password" name="old_Password" placeholder="Nhập mật khẩu cũ" autoComplete="off" data-fv-notempty="true" data-fv-notempty-message="Vui lòng nhập mật khẩu" data-fv-stringlength="true" data-fv-stringlength-min={6} data-fv-stringlength-max={32} data-fv-stringlength-message="Mật khẩu phải từ 6 đến 32 kí tự" data-fv-field="old_Password" />
                  <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="old_Password" style={{ display: 'none' }} />
                  <small className="help-block" data-fv-validator="notEmpty" data-fv-for="oldPassword" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Vui lòng nhập mật khẩu</small>
                  <small className="help-block" data-fv-validator="stringLength" data-fv-for="old_Password" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Mật khẩu phải từ 6 đến 32 kí tự</small>
                </div>
                <div className="form-group form-group-lg has-feedback">
                  <label htmlFor="password" className="control-label">Mật khẩu mới</label>
                  <input type="password" className="form-control" id="password" name="password" placeholder="Nhập mật khẩu mới" autoComplete="off" data-fv-notempty="true" data-fv-notempty-message="Vui lòng nhập mật khẩu" data-fv-stringlength="true" data-fv-stringlength-min={6} data-fv-stringlength-max={32} data-fv-stringlength-message="Mật khẩu phải từ 6 đến 32 kí tự" data-fv-field="password" />
                  <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="password" style={{ display: 'none' }} />
                  <small className="help-block" data-fv-validator="notEmpty" data-fv-for="password" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Vui lòng nhập mật khẩu</small>
                  <small className="help-block" data-fv-validator="stringLength" data-fv-for="password" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Mật khẩu phải từ 6 đến 32 kí tự</small>
                </div>
                <div className="form-group form-group-lg has-feedback">
                  <label htmlFor="password2" className="control-label">Nhập lại mật khẩu mới</label>
                  <input type="password" className="form-control" id="password2" name="password2" placeholder="Nhập lại mật khẩu mới" autoComplete="off" data-fv-notempty="true" data-fv-notempty-message="Vui lòng nhập lại mật khẩu" data-fv-identical="true" data-fv-identical-field="password" data-fv-identical-message="Xác nhận mật khẩu không đúng" data-fv-field="password2" />
                  <i className="form-control-feedback fv-bootstrap-icon-input-group" data-fv-icon-for="password2" />
                  <small className="help-block" data-fv-validator="identical" data-fv-for="password2" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Xác nhận mật khẩu không đúng</small>
                  <small className="help-block" data-fv-validator="notEmpty" data-fv-for="password2" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Vui lòng nhập lại mật khẩu</small>
                </div>
                <div className="form-group form-group-lg">
                  <button type="submit" style={{ width: 150 }} className="btn btn-lg btn-success btn-block">Xác nhận</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Mutation>
    </React.Fragment>
  );
}

const updateUserPasswordGql = gql`
  mutation updateUserPassword ($id: ID!, $oldPassword: String!, $newPassword: String!) {
    updatePasswordUser(id: $id, oldPassword:$oldPassword,newPassword:$newPassword){
      id
      userName
      password
    }
  }
`
const UserPasswordGraph = graphql(updateUserPasswordGql, {
  name: 'updatePass'
})

export default compose(
  // withApollo,
  // UserPasswordGraph,
  withHandlers({
    handleSubmit: props => (e, updatePass) => {
      log(typeLog, "components -> user -> ChangePassword -> submit: ", e)
      const form = e.target
      const formData = new window.FormData(form)
      const oldPass = formData.get('old_Password')
      const newPass = formData.get('password')
      const reNewPass = formData.get('password2')
      if (oldPass !== '' && newPass !== '' && reNewPass !== '' && newPass === reNewPass) {
        // const data = props.updatePass({
        //const data = props.client.mutate({
        const data = updatePass({
          variables: {
            id: props.loginUser && props.loginUser.id,
            oldPassword: oldPass,
            newPassword: newPass
          },
          //query: updateUserPasswordGql
        })
        // .then(data => {
        //   // props.updateMsg("Thay đổi mật khẩu thành công")
        //   e.preventDefault()
        //   e.stopPropagation()
        //   e.nativeEvent.stopImmediatePropagation()
        // })
        // .catch(err => {
        //   props.updateError("Thay đổi mật khẩu thất bại")
        //   err.graphQLErrors && log(typeLog, "pages -> index -> graphQLErrors: ", err.graphQLErrors)
        //   err.networkError && log(typeLog, "pages -> index -> networkError: ", err.networkError)
        // })
        form.reset()
        $('[data-toggle="validator"]').trigger('init_form_validator');
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
      } else {

      }
    }
  }),
  lifecycle({
    shouldComponentUpdate(nextProps, nextState) {
      if (
        nextProps.loginUser === this.props.loginUser
        // && nextProps.err === this.props.err
      ) {
        return false
      }
      return true
    }
  })
)(ChangePassword)