
import React from 'react';
/* import { graphql } from 'react-apollo';
import { filter, propType } from 'graphql-anywhere';
import gql from 'graphql-tag'; */
import { compose, lifecycle /* withState, withHandlers, */ } from 'recompose';

import EncodeUrl from '../../lib/utils/encode'
import NbmLink from '../../lib/utils/customLink'
import ProductList from './ProductList'
import log from '../../lib/utils/log'

import BoxChildCategory from './BoxChildCategory'
import BoxChild from './BoxChild';

const BoxCategory = ({ dataBoxCategories: { homeBoxCategory }, pageType }) => {
  //  log("log", "BoxCategory -> dataallCategories: ", homeBoxCategory)
  if (!homeBoxCategory || homeBoxCategory.payload === undefined || homeBoxCategory.payload.length <= 0) return null
  return (
    <React.Fragment>
      {homeBoxCategory && homeBoxCategory.payload.map((item, index) => {
        const hrefCate = `/${EncodeUrl(item.categoryName)}-${item.id}-${item.categoryParentId}-${pageType ? pageType : 0}`
        if (item.totalProducts <= 0 || item.productsHomeTop15.length<=0) return null
        return (
          
          <BoxChild key={index} data={item} hrefCate={hrefCate}/>
        )
      })}
    </React.Fragment>
  )
}

export default compose(
  lifecycle({
    shouldComponentUpdate(nextProps, nextState) {
      if (
        nextProps.dataBoxCategories === this.props.dataBoxCategories
      ) {
        return false;
      }
      return true;
    }
  })
)(BoxCategory)