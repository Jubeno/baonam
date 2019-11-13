import React from 'react'
// import { FormattedMessage, injectIntl } from 'react-intl'
import { compose, withHandlers, withState } from 'recompose'
import { Form, Input } from 'antd'
import mutation from '@/controllers/components/contactUs/indexContactUsController'
// import 'antd/dist/antd.css';

const FormItem = Form.Item;
const { TextArea } = Input

const ComponentContactUsIndex = ({ handleSubmit, form, data
}) => (
    <React.Fragment>
      <Form onSubmit={e => handleSubmit(e, form)}>
        <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <h2>Liên hệ</h2>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <FormItem>
                {form.getFieldDecorator('fullName', {
                  rules: [
                    {
                      required: true,
                      message: 'Nhập tên',
                    },
                  ],
                })(
                  <Input size="large" placeholder='Tên' />
                )}
              </FormItem>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <FormItem>
                {form.getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'Phải là email'
                    },
                    {
                      required: true,
                      message: "Vui lòng nhập email",
                    },
                  ],
                })(
                  <Input size="large" placeholder='email' />
                )}
              </FormItem>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <FormItem>
                {form.getFieldDecorator('phone', {
                  rules: [
                    {
                      pattern: /^0[0-9]{9}$/i,
                      message: 'Phải là số điện thoại',
                    },
                    {
                      required: true,
                      message: 'Vui lòng nhập số điện thoại',
                    },
                  ],
                })(
                  <Input size="large" placeholder='số điện thoại' />
                )}
              </FormItem>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <FormItem>
                {form.getFieldDecorator('content', {
                  rules: [
                    {
                      required: true,
                      message: 'Vui long nhập nội dung',
                    },
                  ],
                })(
                  <TextArea size="large" placeholder='nội dung' />
                )}
              </FormItem>
            </div>
            <div className="buttonbar">
              <button type="submit" className="submit-button">Gửi</button>
            </div>
          </div>
        </div>
      </Form>
    </React.Fragment>
  )
const WrappedRegistrationForm = Form.create({ name: 'register' })(ComponentContactUsIndex);

export default compose(
  mutation,
  withState('data', 'updateData', {}),
  withHandlers({
    handleSubmit: props => (e, form) => {
      e.preventDefault();
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          props.mutation({
            variables: {
              fullName: values.fullName,
              email: values.email,
              phone: values.phone,
              content: values.content,
              status: 1,
            },
          })
            .then(({ data }) => {
              props.updateData(data)
              form.resetFields();
            })
        }
      });
    }
  }),
)(WrappedRegistrationForm)