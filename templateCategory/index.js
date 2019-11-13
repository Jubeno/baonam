/* eslint-disable camelcase */
import dynamic from 'next/dynamic';
import React from 'react';
import moment from 'moment';

const ssr = false;

const TemplateLayout_1 = dynamic(() => import(`../templateCategory/templateLayout_1`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_2 = dynamic(() => import(`../templateCategory/templateLayout_2`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_3 = dynamic(() => import(`../templateCategory/templateLayout_3`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_4 = dynamic(() => import(`../templateCategory/templateLayout_4`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_5 = dynamic(() => import(`../templateCategory/templateLayout_5`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_6 = dynamic(() => import(`../templateCategory/templateLayout_6`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_7 = dynamic(() => import(`../templateCategory/templateLayout_7`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_8 = dynamic(() => import(`../templateCategory/templateLayout_8`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_9 = dynamic(() => import(`../templateCategory/templateLayout_9`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_10 = dynamic(() => import(`../templateCategory/templateLayout_10`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_11 = dynamic(() => import(`../templateCategory/templateLayout_11`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_12 = dynamic(() => import(`../templateCategory/templateLayout_12`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_13 = dynamic(() => import(`../templateCategory/templateLayout_13`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_14 = dynamic(() => import(`../templateCategory/templateLayout_14`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_15 = dynamic(() => import(`../templateCategory/templateLayout_15`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_16 = dynamic(() => import(`../templateCategory/templateLayout_16`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_17 = dynamic(() => import(`../templateCategory/templateLayout_17`), {
  ssr, loading: () => <p>...</p>
});
const TemplateLayout_18 = dynamic(() => import(`../templateCategory/templateLayout_18`), {
  ssr, loading: () => <p>...</p>
});

const DATA_TEMPLATES = {
  templateLayout_1: TemplateLayout_1,
  templateLayout_2: TemplateLayout_2,
  templateLayout_3: TemplateLayout_3,
  templateLayout_4: TemplateLayout_4,
  templateLayout_5: TemplateLayout_5,
  templateLayout_6: TemplateLayout_6,
  templateLayout_7: TemplateLayout_7,
  templateLayout_8: TemplateLayout_8,
  templateLayout_9: TemplateLayout_9,
  templateLayout_10: TemplateLayout_10,
  templateLayout_11: TemplateLayout_11,
  templateLayout_12: TemplateLayout_12,
  templateLayout_13: TemplateLayout_13,
  templateLayout_14: TemplateLayout_14,
  templateLayout_15: TemplateLayout_15,
  templateLayout_16: TemplateLayout_16,
  templateLayout_17: TemplateLayout_17,
  templateLayout_18: TemplateLayout_18,
}

export default DATA_TEMPLATES;

export const renderTemplatesCategory = (data, dataArticleAll, dataCategoryAll, dataArticlev2) => {
  if (data) {
    return data && data.map(item => {
      if (item.templateLayouts && item.templateLayouts.folder !== null && item.templateLayouts.folder !== '') {
        try {
          // const Templates = require(`../${item.WebTemplate.component}`).default;
          // log(`${prefixLog} templates: ${item.WebTemplate.component}`)
          // const path = require("path")
          const Templates = DATA_TEMPLATES[item.templateLayouts.folder]
          if (Templates) {
            // if (isHome && item.Articles.length > 0) {
            //     return React.createElement(Templates, { data: [item], query, key: `${item.WebTemplate.component}_${item.id}_${moment().format("YYYYMMDDHHMMSS")}` })
            // }
            // eslint-disable-next-line no-shadow
            // const childrens = item.children && item.children.length > 0 && item.children.filter(item => item.is_menu === 1)
            return React.createElement(Templates, { data: item, dataArticle: dataArticleAll, dataCategoryAll: dataCategoryAll || [], dataArticlev2: dataArticlev2 || [], key: `${item.templateLayouts.folder}_${item.id}_${moment().format("YYYYMMDDHHMMSS")}` })
          }
          return null;
          // return <Templates article={{ name: 'aaa' }} />
        } catch (error) {
          return null
        }
      }
      return null;
    })
  }
  return null;
}