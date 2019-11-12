import React from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
// import { FacebookProvider, CustomChat } from 'react-facebook';

export default () => (
  <React.Fragment>
    <MessengerCustomerChat
      pageId={`${publicRuntimeConfig.FACEBOOK_PAGE_ID}`}
      appId={`${publicRuntimeConfig.FACEBOOK_APP_ID}`}
      htmlRef="fdfd"
    />
    {/* <FacebookProvider appId={`${publicRuntimeConfig.FACEBOOK_APP_ID}`}>
        <CustomChat pageId={`${publicRuntimeConfig.FACEBOOK_APP_ID}`} minimized={false} />
      </FacebookProvider>   */}
    {/* <div id="fb-root" /> */}
    {/* <script
        type="text/javascript"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `
                window.fbAsyncInit = function() {
                  FB.init({
                    appId      : '${publicRuntimeConfig.FACEBOOK_APP_ID}',
                    status     : true,
                    cookie     : true,
                    xfbml      : true,
                    version    : '${publicRuntimeConfig.FACEBOOK_API_VERSION}'
                  });
                  FB.AppEvents.logPageView();   
                };

                (function(d, s, id) {
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) return;
                  js = d.createElement(s); js.id = id;
                  js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
              `
        }}
      /> */}
    {/* <div
        className="fb-customerchat"
        attribution="setup_tool"
        page_id={`${publicRuntimeConfig.FACEBOOK_PAGE_ID}`}
      // logged_in_greeting="Xin chao"
      // logged_out_greeting="Tam biet"
      />  */}
  </React.Fragment>
)
