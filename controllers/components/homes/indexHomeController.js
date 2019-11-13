/* eslint-disable import/prefer-default-export */
// import { NamedProps, QueryProps } from 'react-apollo';
import { graphql } from 'react-apollo'
// import apollo from '@/layouts/page';
import { notification } from 'antd'
import * as articleService from '@/services/articlesServices';
// import * as contactUs from '@/servicesGraphiql/contactUs';

export const articles = (variables) => graphql(articleService.getAll, {
  options: () => ({
    variables: {
      ...variables
    }
  })
  ,
  props: ({ data }) => {
    const error = data && data.error && data.error.message
    if (error) {
      notification.error({
        message: `Có lỗi xảy ra: `,
        description: error,
        duration: 60
      });
    }
    return ({
      data: data && data.articles && data.articles.payload
    })
  }
})