/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
// import cookie from 'cookie';
import $ from 'jquery';
import { connect } from 'react-redux';
import dynamic from 'next/dynamic';
import Slides from '@/componentWebs/Slides';
// import { compose } from 'recompose'
import getConfig from 'next/config'
import page from '@/layouts/page';
import Head from '@/componentDashs/head';
import { renderTemplatesCategory } from '@/templateCategory';

const PluginFacebook = dynamic(() => import('../componentWebs/PluginFacebook'), {
  ssr: false, loading: () => <p>...</p>
});


const { publicRuntimeConfig } = getConfig()
// import log from '@/utils/log';
// import { renderTemplates } from '@/templates';
// import Head from '@/components/head';
// import ContactComponents from './User/ContactComponents'
// import publicRuntimeConfig from '@/utils/config';
// import character from '@/controler/articles'
// import Home from '@/componentWebs/home'
// import ContactUs from '@/componentWebs/contactUs'
// import { suppliers } from '@/controllers/pages/index/indexController'
// import Header from '@/componentWebs/Header'

// @page
@connect(({ webs }) => ({
  webs,
}))
class Index extends React.Component {
  static async getInitialProps(ctx) {
    const { store, dispatch, query } = ctx;
    const queryCategory = {
      filter: {
        status: true,
        isHome: true,
        sitesId: publicRuntimeConfig.SITEID_WEB
      },
      // sort: ["order", "ASC"]
    };
    await dispatch({
      type: 'webs/fetchAllCategory',
      payload: queryCategory
    })
    const { webs: { dataCategoryAll } } = store.getState();
    // console.log("dataCategoryAll", dataCategoryAll)
    const CategoryAll = dataCategoryAll && dataCategoryAll.result && dataCategoryAll.result.length > 0 && dataCategoryAll.result.map((item) => (item.id)).join(",") || ''
    const queryArticle = {
      filter: {
        status: true,
        categoriesId: CategoryAll
      },
    };
    // const queryAd = {
    //   filter: {
    //     status: true,
    //     sitesId: "14",
    //     adsTypeId: "24"
    //   },
    // };
    await dispatch({
      type: 'webs/fetchAllArticle',
      payload: queryArticle
    })
    // await dispatch({
    //   type: 'webs/fetchAllAd',
    //   payload: queryAd
    // })
    return {
      dataCategories: dataCategoryAll,
      query
    }
  }

  render() {
    const { webs: { dataCategoryAll, dataArticleAll }, dataSlide, ogImage, dataSite } = this.props
    // console.log(dataSite)
    return (
      <React.Fragment>
        <Head
          ogImage={ogImage}
          defaultKeywordsWeb={dataSite && dataSite.seoKeywords}
          defaultDescriptionWeb={dataSite && dataSite.seoDescriptions}
          defaultOGURLWeb={dataSite && dataSite.url}
        />
        <PluginFacebook />
        <Slides dataSlide={dataSlide} />
        {dataCategoryAll && dataCategoryAll.result && dataCategoryAll.result.length > 0 && dataCategoryAll.result.map((item) => {
          const ArticleAll = dataArticleAll && dataArticleAll.filter((items) => item.id === items.categoriesId)
          if (ArticleAll && ArticleAll.length > 0) {
            return renderTemplatesCategory([item], ArticleAll)
          }
          return null
          // return renderTemplatesCategory([item], ArticleAll)
        })}
      </React.Fragment>
    );
  }
}

export default page(Index)