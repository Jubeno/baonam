/* eslint-disable jsx-a11y/lang */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable jsx-a11y/html-has-lang */
// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'

// import { getLocaleDataScript } from '@/utils/i18nHelper';

const { publicRuntimeConfig } = getConfig()
const defaultIcon = `${publicRuntimeConfig.APP_ICON}`

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // console.log("document ", new Date())
    const initialProps = await Document.getInitialProps(ctx);
    const { req: { locale, localeDataScript } } = ctx;
    // console.log("document locale: %o \n messages: %o", locale, localeDataScript)
    // if (ctx.req) {
    // eslint-disable-next-line global-require
    /* const localeDataCache = new Map();

    const getLocaleDataScript = locale1 => {
      const lang = locale1.split('-')[0]
      if (!localeDataCache.has(lang)) {
        const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`)
        // const localeDataFile = path.join(__dirname, `../node_modules/react-intl/locale-data/${lang}`)
        // console.log("localeDataFile: ", localeDataFile)
        const localeDataScript1 = readFileSync(localeDataFile, 'utf8')
        localeDataCache.set(lang, localeDataScript1)
      }
      return localeDataCache.get(lang)
    }

    if (!locale) locale = 'vi';
    if (!localeDataScript) localeDataScript = getLocaleDataScript(locale); */
    // }
    // console.log("_document locale: %o \n localeDataScript: %o", locale, localeDataScript)
    return {
      ...initialProps,
      locale,
      localeDataScript
    }
  }

  render() {
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${
      this.props.locale
      }`
    return (
      <html lang={`${this.props.locale}`}>
        <Head>
          {/* <meta charSet="utf-8" /> */}
          <meta httpEquiv="x-ua-compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="google-signin-client_id" content={`${publicRuntimeConfig.GOOGLE_APP_ID}`} />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.js" />
          <script src="https://apis.google.com/js/client:platform.js?onload=start" async defer />
          <script src="https://zjs.zdn.vn/zalo/sdk.js" />
          {/* <script dangerouslySetInnerHTML={{
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

              (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            `
          }} /> */}
          {/* <script dangerouslySetInnerHTML={{
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
          }} /> */}

          <link rel="icon" href={`${defaultIcon}`} />
          {/* <link rel="apple-touch-icon" sizes="57x57" href="/static/web/images/favicon/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/static/web/images/favicon/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/static/web/images/favicon/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/static/web/images/favicon/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/static/web/images/favicon/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/static/web/images/favicon/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/static/web/images/favicon/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/static/web/images/favicon/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/web/images/favicon/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/static/web/images/favicon/android-icon-192x192.png" />
          <link rel="shortcut icon" href={`${defaultIcon}`} />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/web/images/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/static/web/images/img/favicon/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/web/images/favicon/favicon-16x16.png" /> */}
        </Head>
        <body>
          <script src={polyfill} />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript
            }}
          />
          <div className="page-body">
            <div className="op_login"></div>
            <Main />
            <NextScript />
          </div>
        </body>
      </html>
    )
  }
}

export default MyDocument