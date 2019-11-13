// import { NamedProps, QueryProps } from 'react-apollo';
import { graphql } from 'react-apollo'
// import apollo from '@/layouts/page';
import * as contactUs from '@/services/contactUsServices';
// import * as contactUs from '@/servicesGraphiql/contactUs';

// export default (variables) => graphql(articleService.getAll, {
//   options: () => ({
//     variables: {
//       ...variables
//     }
//   })
//   ,
//   props: ({ data }) => ({
//     data: data && data.articles && data.articles.payload
//   })
// })

export default graphql(contactUs.contactUs, {
  name: 'mutation',
});