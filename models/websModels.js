/* eslint-disable camelcase */
/* import { routerRedux } from 'dva/router';
import { message } from 'antd'; */
// import log from '@/utils/log';
import { queryMenus, queryCategoryInfo, queryCategoryAll, queryArticleAll, queryArticleInfo, queryAd, queryWebInfo } from '@/services/websRedux';

export default {
  namespace: 'webs',

  state: {
    dataAll: [],
    data: {
      list: [],
      pagination: {},
    },
    info: {},
    query: {},
    filter: {},
    dataCategoryInfo: {},
    dataCategoryAll: [],
    dataArticleAll: [],
    datainfoArticle: {},
    dataAd: [],
    dataSite: {}
  },
  effects: {
    *fetchMenus({ payload, callback }, { call, put }) {
      const response = yield call(queryMenus, payload);
      // console.log("servie model fetch response: %o ", response)
      if (response) {
        yield put({
          type: 'save',
          payload: response || {}
        });
      }
      if (callback) callback(response)
    },
    *fetchQuery({ payload }, { put }) {
      if (payload) {
        yield put({ type: 'savequery', payload: payload || {} });
      }
    },
    *fetchArticleInfo({ payload: { id }, callback }, { call, put }) {
      const response = yield call(queryArticleInfo, id);
      // const page = yield select(state => state.users.page);
      // console.log("dsasad", response)
      if (response) {
        yield put({ type: 'saveArticleInfo', payload: response || {} });
        if (callback)
          callback(response)
      }
    },
    *fetchSiteInfo({ payload: { id }, callback }, { call, put }) {
      const response = yield call(queryWebInfo, id);
      // const page = yield select(state => state.users.page);
      // console.log("dsasad", response)
      if (response) {
        yield put({ type: 'saveSiteInfo', payload: response || {} });
        if (callback)
          callback(response)
      }
    },
    *fetchCategoryInfo({ payload: { id }, callback }, { call, put }) {
      const response = yield call(queryCategoryInfo, id);
      // const page = yield select(state => state.users.page);
      // console.log("dsasad", response)
      if (response) {
        yield put({ type: 'saveCategoryInfo', payload: response || {} });
        if (callback)
          callback(response)
      }
    },
    *fetchAllCategory({ payload, callback }, { call, put }) {
      const response = yield call(queryCategoryAll, payload);
      // const page = yield select(state => state.users.page);
      // console.log("dsasad", response)
      if (response) {
        yield put({ type: 'saveCategoryAll', payload: response || {} });
        if (callback)
          callback(response)
      }
    },
    *fetchAllArticle({ payload, callback }, { call, put }) {
      const response = yield call(queryArticleAll, payload);
      // const page = yield select(state => state.users.page);
      // console.log("dsasad", response)
      if (response) {
        yield put({ type: 'saveArticleAll', payload: response || {} });
        if (callback)
          callback(response)
      }
    },
    *fetchAllAd({ payload, callback }, { call, put }) {
      const response = yield call(queryAd, payload);
      // const page = yield select(state => state.users.page);
      // console.log("dsasad", response)
      if (response) {
        yield put({ type: 'saveAd', payload: response || {} });
        if (callback)
          callback(response)
      }
    },
  },

  reducers: {
    saveAd(state, action) {
      return {
        ...state,
        dataAd: action.payload.result
      }
    },
    save(state, action) {
      return {
        ...state,
        data: action.payload.result
      }
    },
    saveSiteInfo(state, action) {
      return {
        ...state,
        dataSite: action.payload
      }
    },
    savequery(state, action) {
      return {
        ...state,
        query: action.payload
      }
    },
    saveArticleInfo(state, action) {
      return {
        ...state,
        datainfoArticle: action.payload
      }
    },
    saveCategoryInfo(state, action) {
      return {
        ...state,
        dataCategoryInfo: action.payload
      }
    },
    saveCategoryAll(state, action) {
      return {
        ...state,
        dataCategoryAll: action.payload
      }
    },
    saveArticleAll(state, action) {
      return {
        ...state,
        dataArticleAll: action.payload.result
      }
    },

  },
};
