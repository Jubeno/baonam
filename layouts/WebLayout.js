/* eslint-disable react/no-danger */
/* eslint-disable global-require */
import React from 'react';
import cookie from 'cookie';
import $ from 'jquery';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import { initJquery } from '../static/web/js/main'
import Head from '@/componentDashs/headLayout';
import { isClient, getComponentDisplayName } from '../utils/helpers';
// import log from '@/utils/log';

// import WebHeader from '@/componentPages/WebHeader';
// import Slides from '@/componentPages/Slides';
// import Footer from '@/componentPages/Footer';
// import { suppliers } from '@/controllers/layouts/webLayoutController'

const Header = dynamic(() => import('@/componentWebs/Header'), {
  ssr: false, loading: () => <p>...</p>
});
const PhoneAlo = dynamic(() => import('@/componentWebs/PhoneAlo'), {
  ssr: false, loading: () => <p>...</p>
});
const Footer = dynamic(() => import('@/componentWebs/Footer'), {
  ssr: true, loading: () => <p>...</p>
});

const { publicRuntimeConfig } = getConfig()

// let cssUrl1 = `/static/web/css/header.css`;
// let cssUrl2 = `/static/web/css/global.css`;
// let cssUrl3 = `/static/web/css/map.css`;
// let cssUrl4 = `/static/web/css/popup_cookie.css`;
// let cssUrl5 = `/static/web/css/feedback.css`;
// let cssUrl6 = `/static/web/css/owl_style_new.css`;
// let cssUrl7 = `/static/web/css/style.css`;
// let cssUrl8 = `/static/web/css/cdn.page.css`;
// let cssUrl9 = `/static/web/css/lity.min.css`;
// let cssUrl10 = `/static/web/css/resize.css`;
let cssUrl11 = `/static/web/css/owl.carousel.min.css`;
let cssUrl12 = `/static/web/css/plugin.scss.css`;
let cssUrl13 = `/static/web/css/base.scss.css`;
let cssUrl14 = `/static/web/css/style.scss.css`;
let cssUrl15 = `/static/web/css/module.scss.css`;
let cssUrl16 = `/static/web/css/responsive.scss.css`;
let cssUrl17 = `/static/web/css/module_medisan.scss.css`;

if (process.env.NODE_ENV === "production") {
  const folderCss = "_next/static/css";
  // cssUrl1 = `${publicRuntimeConfig.APP_URL}/${folderCss}/header.css`
  // cssUrl2 = `${publicRuntimeConfig.APP_URL}/${folderCss}/global.css`
  // cssUrl3 = `${publicRuntimeConfig.APP_URL}/${folderCss}/map.css`
  // cssUrl4 = `${publicRuntimeConfig.APP_URL}/${folderCss}/popup_cookie.css`
  // cssUrl5 = `${publicRuntimeConfig.APP_URL}/${folderCss}/feedback.css`
  // cssUrl6 = `${publicRuntimeConfig.APP_URL}/${folderCss}/owl_style_new.css`
  // cssUrl7 = `${publicRuntimeConfig.APP_URL}/${folderCss}/style.css`
  // cssUrl8 = `${publicRuntimeConfig.APP_URL}/${folderCss}/cdn.page.css`
  // cssUrl9 = `${publicRuntimeConfig.APP_URL}/${folderCss}/lity.min.css`
  // cssUrl10 = `${publicRuntimeConfig.APP_URL}/${folderCss}/resize.css`

  cssUrl11 = `${publicRuntimeConfig.APP_URL}/${folderCss}/owl.carousel.min.css`
  cssUrl12 = `${publicRuntimeConfig.APP_URL}/${folderCss}/plugin.scss.css`
  cssUrl13 = `${publicRuntimeConfig.APP_URL}/${folderCss}/base.scss.css`
  cssUrl14 = `${publicRuntimeConfig.APP_URL}/${folderCss}/style.scss.css`
  cssUrl15 = `${publicRuntimeConfig.APP_URL}/${folderCss}/module.scss.css`
  cssUrl16 = `${publicRuntimeConfig.APP_URL}/${folderCss}/responsive.scss.css`
  cssUrl17 = `${publicRuntimeConfig.APP_URL}/${folderCss}/module_medisan.scss.css`
}

if (isClient) {
  // require("lazysizes");
  require("react-owl-carousel");
  // require("inputmask")($);
  // require("lily/dist/lily")
  // require('jquery-mousewheel');
  // require("../static/js/jquery.mCustomScrollbar")
  // require("gsap")
  // require("../static/js/jquery.cookie")
  // require("../static/js/global")
  // require("../static/web/js/main")
  require("../static/web/js/owl.carousel")
  // require("../static/web/js/owl.carousel.min")
}
export default ComposedComponent => {
  class WebLayout extends React.Component {
    // state = {
    //   onPackage: '',
    // }

    static displayName = `WebLayout(${getComponentDisplayName(ComposedComponent)})`

    static async getInitialProps(context) {
      const { req, asPath, pathname, query, store, dispatch } = context
      let cookies
      if (req) {
        // eslint-disable-next-line prefer-destructuring
        cookies = req.cookies
      } else {
        const documentCookie = document.cookie
        cookies = cookie.parse(documentCookie)
      }
      // log("WebLayout cookies: ", cookies)

      const queryCategory = {
        filter: {
          status: true,
          menuPositionsId: publicRuntimeConfig.MENU__POSITIONID,
          sitesId: publicRuntimeConfig.SITEID_WEB
        },
        sort: ["orderBy", "ASC"]
      };
      const queryAd = {
        filter: {
          status: true,
          sitesId: publicRuntimeConfig.SITEID_WEB,
          adsTypeId: publicRuntimeConfig.SLIDEID
        },
      };
      await dispatch({
        type: 'webs/fetchMenus',
        payload: queryCategory
      })
      await dispatch({
        type: 'webs/fetchAllAd',
        payload: queryAd
      })
      await dispatch({
        type: 'webs/fetchSiteInfo',
        payload: { id: publicRuntimeConfig.SITEID_WEB }
      })

      const { webs, advertisments } = store.getState();

      return {
        ...(ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(context) : {}),
        cookies,
        asPath,
        pathname,
        query,
        dataSite: webs && webs.dataSite,
        menuCategories: webs,
        dataSlide: webs && webs.dataAd,
        advertisments,
      }
    }

    componentDidMount() {
      if (typeof window !== 'undefined') {
        initJquery();
        /* setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          },3000)
        }) */
      }

      // wowjs
      // const script = document.createElement("script");

      // script.src = "https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.js";
      // script.async = true;

      // document.body.appendChild(script);
    }


    render() {
      const { menuCategories, cookies, dataSlide, dataSite } = this.props;
      let ogImage = dataSlide && dataSlide.length > 0 && dataSlide[0].contents
      ogImage = `${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${ogImage}`
      const { token } = cookies;
      // console.log("as", dataSite)
      return (
        <React.Fragment>
          <Head>
            {/* <link rel="stylesheet" href={`${cssUrl1}`} type="text/css" media="all" />
            <link rel="stylesheet" href={`${cssUrl2}`} type="text/css" media="all" /> */}
            {/* <link rel="stylesheet" href={`${cssUrl3}`} type="text/css" media="all" /> */}
            {/* <link rel="stylesheet" href={`${cssUrl4}`} type="text/css" media="all" />
            <link rel="stylesheet" href={`${cssUrl5}`} type="text/css" media="all" />
            <link rel="stylesheet" href={`${cssUrl6}`} type="text/css" media="all" />
            <link rel="stylesheet" href={`${cssUrl7}`} type="text/css" media="all" />
            <link rel="stylesheet" href={`${cssUrl8}`} type="text/css" media="all" />
            <link rel="stylesheet" href={`${cssUrl13}`} type="text/css" media="all" /> */}
            {/* <link rel="stylesheet" href={`${cssUrl9}`} type="text/css" media="all" /> */}
            <link rel="stylesheet" href={`${cssUrl11}`} type="text/css" media="all" />
            <link rel="stylesheet" href={`${cssUrl12}`} type="text/css" media="all" />
            <link rel="stylesheet" href={`${cssUrl13}`} type="text/css" media="all" />
            <link rel="stylesheet" href={`${cssUrl14}`} type="text/css" media="all" />
            <link rel="stylesheet" href={`${cssUrl15}`} type="text/css" media="all" />
            <link rel="stylesheet" href={`${cssUrl16}`} type="text/css" media="all" />
            <link rel="stylesheet" href={`${cssUrl17}`} type="text/css" media="all" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />

            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `
                window.fbAsyncInit = function() {
                  FB.init({
                    appId      : '${publicRuntimeConfig.FACEBOOK_APP_ID}',
                    status     : true,
                    cookie     : true,
                    // xfbml      : true,
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
            />
            
          </Head>
          {/* <PluginFacebook /> */}
          <Header
            key="web-header"
            menuCategories={menuCategories}
            token={token}
            dataSite={dataSite}
          />
          {/* <Slides
            key="web-slides"
            advertisments={advertisments}
          /> */}
          <ComposedComponent dataSlide={dataSlide} ogImage={ogImage} dataSite={dataSite} />
          <PhoneAlo
            dataSite={dataSite}
          />
          <Footer
            key="web-footer"
            menuCategories={menuCategories}
            dataSite={dataSite}
          />
        </React.Fragment>
      )
    }
  }

  return WebLayout
}