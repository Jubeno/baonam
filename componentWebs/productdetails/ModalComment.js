import React, { Component } from 'react'
import { compose, withState, withHandlers, lifecycle } from 'recompose'
import gql from 'graphql-tag'
import { graphql, withApollo, Mutation } from 'react-apollo'
import log from '../../lib/utils/log'
const typeLog = 'log'
import { validPhone, validEmail } from '../../lib/utils'
import { allCommentsGql, variablesQueryVar } from './ProductComment'
import RatingInput from './RatingInput'

const createCommentGql = gql`
  mutation createCommentQuery ($email: String!,$msisdn: String,$fullName: String,$rating: BigInt,$comments: String,$status: Int,$productId: BigInt!) {
    createProductComment(email:$email,msisdn:$msisdn,fullName: $fullName,rating:$rating,comments:$comments,status: $status,productId: $productId){
      id
      userId
      user{
        id
        userName
        fullName
        msisdn
      }
      comments
      createDate
      rating
      product{
        id
        ratings
        avgRating
        totalRating
      }
    }
  }
`

const ModalComment = ({ handleSubmit, productId, rating, handleChangeRating, ratingErr }) => {
  return (
    <React.Fragment>
      <Mutation mutation={createCommentGql} onCompleted={(data) => {
        log(typeLog, "data: %o", data)

      }} onError={(err) => {
        log(typeLog, 'error: ', err.graphQLErrors)
      }} update={(proxy, { data: { createProductComment } }) => {
        let queryVar = {
          filter: { productId: productId, status: 1 },
          order: [["createDate", "DESC"]],
          offset: 0,
          limit: 3
        }
        const dataComments = proxy.readQuery({
          query: allCommentsGql,
          variables: queryVar
        })
        log(typeLog, "components -> productDetail -> ModalComment -> update proxy dataComments : %o ", dataComments)
        proxy.writeQuery({
          query: allCommentsGql,
          data: {
            ...dataComments,
            allComments: {
              ...dataComments.allComments,
              payload: [createProductComment, ...dataComments.allComments.payload]
            }
          },
          variables: queryVar
        })
      }}>
        {(createComment, { data, error }) => (
          <div id="modalComment" className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="bizweb-product-reviews-form" id="bpr-form_11480175" style={{}}>
                    <form id="bizweb-product-reviews-frm" name="bizweb-product-reviews-frm" className="form form--general form-registration fv-form fv-form-bootstrap" data-toggle="validator" noValidate="novalidate"
                      onSubmit={e => handleSubmit(e, createComment)}
                    >
                      <input name="productId" id="review_product_id" defaultValue={11480175} type="hidden" />
                      <h4>Đánh giá</h4>
                      <fieldset className="bpr-form-rating">
                        <RatingInput handleChangeRating={handleChangeRating} />
                        <input name="rating" id="review_rate" type="hidden" value={rating} />
                        {ratingErr !== '' && <span className="bpr-form-message-error">{ratingErr}</span>}
                      </fieldset>
                      <fieldset className="bpr-form-contact">
                        <div className="bpr-form-contact-name require form-group">
                          {/* <input maxLength={128} id="review_author" name="author" placeholder="Nhập tên của bạn" type="text" /> */}
                          <input
                            type="text"
                            id="name_0"
                            name="name"
                            tabIndex={2}
                            className="field__input form-control"
                            autoComplete="name"
                            placeholder="Họ tên"
                            data-fv-notempty="true"
                            data-fv-notempty-message="Vui lòng nhập Họ tên"
                            data-fv-stringlength="true"
                            data-fv-stringlength-max={60}
                            data-fv-stringlength-message="Họ tên nhập tối đa 60 ký tự"
                          // value={fullName}
                          // onChange={handleChange()}
                          />
                          <i className="form-control-feedback" data-fv-icon-for="name" style={{ display: 'none', pointerEvents: 'none' }} />
                          <span className="bpr-form-message-error">
                            <small className="help-block" data-fv-validator="notEmpty" data-fv-for="name" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Vui lòng nhập Họ tên</small><small className="help-block" data-fv-validator="stringLength" data-fv-for="name" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Họ tên nhập tối đa 60 ký tự</small>
                          </span>
                        </div>
                        <div className="bpr-form-contact-email require form-group">
                          {/* <input maxLength={128} id="review_email" name="email" placeholder="nguyenvan@gmail.com" type="text" /> */}
                          <input
                            type="text"
                            id="email"
                            name="email"
                            tabIndex={3}
                            className="field__input form-control"
                            placeholder="Nhập email"
                            autoComplete="off"
                            data-fv-notempty="true"
                            data-fv-notempty-message="Vui lòng nhập Email"
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                            data-fv-regexp-message="Email không hợp lệ"
                            data-fv-field="email"
                          // value={email}
                          // disabled={isLoggin}
                          // onChange={handleChange()}
                          />
                          <i className="form-control-feedback fv-icon-no-label fv-bootstrap-icon-input-group" data-fv-icon-for="email" style={{ display: 'none' }} />
                          <span className="bpr-form-message-error">
                            <small className="help-block" data-fv-validator="notEmpty" data-fv-for="email" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Vui lòng nhập Email</small>
                            <small className="help-block" data-fv-validator="regexp" data-fv-for="email" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Email không hợp lệ</small>
                          </span>
                        </div>
                      </fieldset>
                      <fieldset className="bpr-form-review">
                        <div className="bpr-form-review-title form-group">
                          {/* <input maxLength={512} id="review_title" name="title" placeholder="Tiêu đề" type="text" /> */}
                          <input
                            type="text"
                            className="field__input form-control"
                            autoComplete="phone"
                            tabIndex={4}
                            id="phone_0"
                            name="phone"
                            placeholder="Số điện thoại liên hệ"
                            data-fv-notempty="true"
                            data-fv-notempty-message="Vui lòng nhập Số điện thoại"
                            pattern="^(0)\d{9}$" data-fv-regexp-message="Số điện thoại chỉ được nhập số và 10 ký tự" data-fv-field="phone"
                          // value={phone}
                          // onChange={handleChange()}
                          />
                          <i className="form-control-feedback" data-fv-icon-for="phone" style={{ display: 'none', pointerEvents: 'none' }} />
                          <span className="bpr-form-message-error">
                            <small className="help-block" data-fv-validator="notEmpty" data-fv-for="phone" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Vui lòng nhập Số điện thoại</small><small className="help-block" data-fv-validator="regexp" data-fv-for="phone" data-fv-result="NOT_VALIDATED" style={{ display: 'none' }}>Số điện thoại chỉ được nhập số và 10 ký tự</small>
                          </span>
                        </div>
                        <div className="bpr-form-review-body">
                          <textarea maxLength={1500} tabIndex={5} id="review_body" name="comments" rows={5} placeholder="Nội dung" defaultValue={""} />
                          <span className="bpr-form-message-error" />
                        </div>
                      </fieldset>
                      <fieldset className="bpr-form-review-error">
                        <p className="error" />
                      </fieldset>
                      <fieldset className="bpr-form-actions">
                        <button className="bpr-button-submit" type="submit">Gửi</button>
                      </fieldset>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Mutation>
    </React.Fragment>
  );
}

export default compose(
  withState("rating", "updateRating", 0),
  withState("ratingErr", "updateRatingErr", ''),
  withHandlers({
    handleSubmit: props => (e, createComment) => {

      const { productId } = props
      const form = e.target
      const formData = new window.FormData(form)
      const fullName = formData.get('name')
      const email = formData.get('email')
      const msisdn = formData.get('phone')
      const comments = formData.get('comments')
      const rating = formData.get('rating')
      log(typeLog, "components -> productDetail -> ModalComment -> submit e: %o \n fullName: %o | email: %o | msisdn: %o | comments: %o | rating: %o | productId: %o", e, fullName, email, msisdn, comments, rating, productId)
      if (fullName !== '' && msisdn !== '' && email !== '' && validEmail(email) && validPhone(msisdn) && Number(rating) > 0) {
        const data = createComment({
          variables: {
            email: email,
            msisdn: msisdn,
            fullName: fullName,
            rating: rating,
            comments: comments,
            status: 1,
            productId: productId
          },
        })
        form.reset()
        $('[data-toggle="validator"]').trigger('init_form_validator');
        $('#modalComment').modal('hide')
        props.updateRatingErr('');
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
      } else {
        props.updateRatingErr('Vui lòng chọn sao đánh giá!');
        e.preventDefault()
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
      }
    },
    handleChangeRating: props => (value) => {
      props.updateRating(value)
    }
  }),
)(ModalComment)