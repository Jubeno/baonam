import React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import publicRuntimeConfig from '@/utils/config';
// import { FacebookProvider, CustomChat } from 'react-facebook';

export default () => (
  <React.Fragment>
    <MessengerCustomerChat
      pageId={`${publicRuntimeConfig.FACEBOOK_PAGE_ID}`}
      appId={`${publicRuntimeConfig.FACEBOOK_APP_ID}`}
      htmlRef="fdfd"
    />
  </React.Fragment>
  )
