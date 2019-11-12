/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag'

export const contactUs = gql`
  mutation createContactUsQuery ($fullName: String!,$phone: String!,$email: String!,$content: String,$status: Int) {
    createContactUs(fullName: $fullName,phone:$phone,email:$email,content:$content,status: $status){
      id
      fullName
      phone
      email
      content
    }
  }
`