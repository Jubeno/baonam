/* eslint-disable no-unused-expressions */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
// import cookie from 'cookie';
import { connect } from 'react-redux';
// import dynamic from 'next/dynamic';
// import router from 'next/router';
// import { compose } from 'recompose'
import page from '@/layouts/page';
import Head from '@/componentDashs/head';
import SlideShow from '@/componentWebs/SlideShow';
import { renderTemplatesCategory } from '@/templateCategory';
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
@page
@connect(({ webs }) => ({
  webs,
}))
class Index extends React.Component {
  static async getInitialProps(ctx) {
    const { store, dispatch, query } = ctx;
    await dispatch({
      type: 'webs/fetchCategoryInfo',
      payload: { id: query.categoryId }
    })
    const { webs: { dataCategoryInfo } } = store.getState();
    const queryCategory = {
      filter: {
        status: true,
        parentId: query.parentId,
        siteId: publicRuntimeConfig.SITEID_WEB
      },
      // sort: ["order", "ASC"]
    };
    await dispatch({
      type: 'webs/fetchQuery',
      payload: { ...query }
    })
    await dispatch({
      type: 'webs/fetchAllCategory',
      payload: queryCategory
    })
    const { webs: { dataCategoryAll } } = store.getState();
    let CategoryAll = dataCategoryAll && dataCategoryAll.result && dataCategoryAll.result.length > 0 && dataCategoryAll.result.map((item) => (item.id)) || []
    CategoryAll.push(query.categoryId)
    const queryArticle = {
      filter: {
        status: true,
        categoriesId: CategoryAll.join(",") || ''
      },
      // sort: ["order", "ASC"]
    };
    await dispatch({
      type: 'webs/fetchAllArticle',
      payload: queryArticle
    })
    return {
      dataCategoryInfo,
      query
    }
  }


  render() {
    const { webs: { dataCategoryInfo, dataArticleAll, dataCategoryAll, query }, ogImage, dataSite } = this.props
    let keywords;
    let description;
    const { seoKeywords, seoDescriptions } = dataCategoryInfo;
    const dataArticlev1 = dataArticleAll && dataArticleAll.filter((item) => (`${item.categoriesId}` === `${query.categoryId}`))
    const dataArticlev2 = dataArticleAll && dataArticleAll.filter((item) => (`${item.categoriesId}` !== `${query.categoryId}`))
    // console.log("dsa", dataCategoryAll)
    if (seoKeywords !== undefined && seoKeywords !== null) {
      keywords = `${seoKeywords}`;
    }
    if (seoDescriptions !== undefined && seoDescriptions !== null) {
      description = `${seoDescriptions}`;
    }
    return (
      <React.Fragment>
        <Head
          // title={headTitle}
          keywords={keywords}
          description={description}
          ogImage={ogImage}
          defaultKeywordsWeb={dataSite && dataSite.seoKeywords}
          defaultDescriptionWeb={dataSite && dataSite.seoDescriptions}
          defaultOGURLWeb={dataSite && dataSite.url}
        />
        <SlideShow dataCategoryInfo={dataCategoryInfo.name} />
        {/* <div ui-view> */}
        {dataArticleAll && dataArticleAll.length > 0 && renderTemplatesCategory([dataCategoryInfo], dataArticlev1, dataCategoryAll, dataArticlev2)}
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default Index