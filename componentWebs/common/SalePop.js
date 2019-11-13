import React from 'react'
import { compose, lifecycle, withState } from 'recompose'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import $ from 'jquery'
import EncodeUrl from '../../lib/utils/encode';
// eslint-disable-next-line no-unused-vars
import log from '../../lib/utils/log'
import { fetchJson } from '../../lib/utils/fetch';

// eslint-disable-next-line no-unused-vars
const typeLog = 'log'

const SalePop = () => {
  return (
    <React.Fragment>
      <div className="jas-sale-pop flex pf middle-xs">
        {/* <a href className="jas-sale-pop-img mr__20">
          <img src="public/images/sanpham.png" alt="Táo xanh Mỹ" />
        </a>
        <div className="jas-sale-pop-content">
          <h3 className="mg__0 mt__5 mb__5 fs__18">
            <a href title="Táo xanh Mỹ">Táo xanh Mỹ</a>
          </h3><span className="fs__12 jas-sale-pop-timeago">Một khách hàng vừa đặt mua cách đây 24 phút</span>
        </div>
        <span className="pe-7s-close pa fs__20" /> */}
      </div>
    </React.Fragment>
  );
}

const intervalSalePop = (collection) => {
  setInterval(function () {
    $('.jas-sale-pop').fadeIn(function () {
      $(this).removeClass('slideUp');
    }).delay(10000).fadeIn(function () {

      var randomTime = ['1 phút', '2 phút', '3 phút', '4 phút', '5 phút', '6 phút', '7 phút', '8 phút', '9 phút', '10 phút', '11 phút', '12 phút', '13 phút', '14 phút', '15 phút', '16 phút', '17 phút', '18 phút', '19 phút', '20 phút', '21 phút', '22 phút', '23 phút', '24 phút', '25 phút', '26 phút', '27 phút', '28 phút', '29 phút', '30 phút', '31 phút', '32 phút', '33 phút', '34 phút', '35 phút', '36 phút', '37 phút', '38 phút', '39 phút', '40 phút', '41 phút', '42 phút', '43 phút', '44 phút', '45 phút', '46 phút', '47 phút', '48 phút', '49 phút', '50 phút', '51 phút', '52 phút', '53 phút', '54 phút', '55 phút', '56 phút', '57 phút', '58 phút', '59 phút',],
        randomTimeAgo = Math.floor(Math.random() * randomTime.length),
        randomProduct = Math.floor(Math.random() * collection.length),
        randomShowP = collection[randomProduct],
        TimeAgo = randomTime[randomTimeAgo];
      $(".jas-sale-pop").html(randomShowP);
      $('.jas-sale-pop-timeago').text('Một khách hàng vừa đặt mua cách đây ' + TimeAgo);
      $(this).addClass('slideUp');
      $('.pe-7s-close').on('click', function () {
        $('.jas-sale-pop').remove();
      });
    }).delay(6000);
  }, 10000);
}

function jquerySalePop(collection) {
  function fisherYates(myArray) {
    var i = myArray.length, j, temp;
    if (i === 0) return false;
    while (--i) {
      j = Math.floor(Math.random() * (i + 1));
      temp = myArray[i];
      myArray[i] = myArray[j];
      myArray[j] = temp;
    }
  }
  /* var collection = new Array();
  collection[0] = "<a href='/cherry-do-canada-loai-to' class='jas-sale-pop-img mr__20'>"
    + "  <img src='public/images/product/trangchu.png' alt='Sản phẩm được mua ngay lúc này'>"
    + "</a>"
    + "<div class='jas-sale-pop-content'>"
    //+									"<h4 class='fs__12 fwm mg__0'>Sản phẩm</h4>"
    + "<h3 class='mg__0 mt__5 mb__5 fs__18'>"
    + "<a href='' title='Sản phẩm được mua ngay lúc này'>Sản phẩm được mua ngay lúc này</a>"
    + "</h3>"
    + "<span class='fs__12 jas-sale-pop-timeago'></span>"
    + "</div>"
    + "<span class='pe-7s-close pa fs__20'></span>";

  collection[1] = "<a href='/cherry-do-canada-loai-to-1' class='jas-sale-pop-img mr__20'>"
    + "  <img src='public/images/product/trangchu.png' alt='Sản phẩm được mua ngay lúc này'>"
    + "</a>"
    + "<div class='jas-sale-pop-content'>"
    //+									"<h4 class='fs__12 fwm mg__0'>Sản phẩm</h4>"
    + "<h3 class='mg__0 mt__5 mb__5 fs__18'>"
    + "<a href='' title='Sản phẩm được mua ngay lúc này'>Sản phẩm được mua ngay lúc này</a>"
    + "</h3>"
    + "<span class='fs__12 jas-sale-pop-timeago'></span>"
    + "</div>"
    + "<span class='pe-7s-close pa fs__20'></span>";

  collection[2] = "<a href='/cherry-do-canada-loai-to-10' class='jas-sale-pop-img mr__20'>"
    + "  <img src='public/images/product/trangchu1.png' alt='Sản phẩm được mua ngay lúc này'>"
    + "</a>"
    + "<div class='jas-sale-pop-content'>"
    //+									"<h4 class='fs__12 fwm mg__0'>Sản phẩm</h4>"
    + "<h3 class='mg__0 mt__5 mb__5 fs__18'>"
    + "<a href='' title='Sản phẩm được mua ngay lúc này'>Sản phẩm được mua ngay lúc này</a>"
    + "</h3>"
    + "<span class='fs__12 jas-sale-pop-timeago'></span>"
    + "</div>"
    + "<span class='pe-7s-close pa fs__20'></span>"; */

  fisherYates(collection);
  function SalesPopInit() {
    if ($('.jas-sale-pop').length < 0)
      return;
    intervalSalePop(collection)
  }

  $(document).ready(function ($) {
    if ($(window).width() >= 768) {
      SalesPopInit();
    }
  });
}

const fetchImage = (src) => new Promise(resolve => {
  fetchJson(`${src}`).then(data => {
    console.log("data: ", data)
    const { body, json } = data;
    if (json && json.url)
      resolve(json.url)
    else resolve('')
  })
})

export const productOrderDistinctGql = gql`
  query productOrderDistinctQuery($filter: Json, $filterCate: Json, $filterSupplier: Json, $order: String, $offset: Int!, $limit: Int!, $categoryIdTree: Int) {
    productOrderDistinct:allProductOrderDistinct(filter:$filter,filterCate: $filterCate,filterSupplier:$filterSupplier, order: $order, offset: $offset, limit: $limit,categoryIdTree:$categoryIdTree) {
      payload{
        id
        productName
        likes
        quantities
        shares
        countdownTimes
        dealPrice
        deadlineDate
        views
        ratings
        price
        savePrice
        productImage
        type
        supllier{
          id
          supplierName
        }
        category {
          id
          categoryName
        }
        totalOrder1
      }
      meta{
        count
      }
    }
  }
`

const productOrderDistinctGraph = graphql(productOrderDistinctGql, {
  ssr: false,
  options: () => ({
    variables: {
      filter: { status: 1 },
      filterCate: { status: true },
      filterSupplier: {},
      order: "createDate desc",
      offset: 0,
      limit: 10
    }
  }),
  props: ({ data }) => ({
    data
  })
})

export default compose(
  productOrderDistinctGraph,
  withState("runSalePop", "updateRunSalePop", false),
  lifecycle({
    componentDidMount() {
      const { data: { error, productOrderDistinct } } = this.props
      // log(typeLog, "components -> common -> SalePop -> mount productOrderDistinct: ", productOrderDistinct)
      if (productOrderDistinct && productOrderDistinct.payload && productOrderDistinct.payload.length > 0) {
        var collection = new Array();
        console.log(process.env.IMAGE_SERVER)
        productOrderDistinct.payload.forEach((item, index) => {
          const { id, productName, category, productImage } = item
          const linkProduct = `/${EncodeUrl(category.categoryName)}/${EncodeUrl(productName)}-${id}`
          const imageUrl = `${process.env.IMAGE_SERVER}/${productImage}`;
          fetchImage(`${imageUrl}?size=80x80`).then(urlImg => {
            collection[index] = "<a href='" + linkProduct + "' class='jas-sale-pop-img mr__20'>"
              + "  <img src='" + urlImg + "' alt='" + productName + "'>"
              + "</a>"
              + "<div class='jas-sale-pop-content'>"
              + "<h3 class='mg__0 mt__5 mb__5 fs__18'>"
              + "<a href='" + linkProduct + "' title='" + productName + "'>" + productName + "</a>"
              + "</h3>"
              + "<span class='fs__12 jas-sale-pop-timeago'></span>"
              + "</div>"
              + "<span class='pe-7s-close pa fs__20'></span>";
          });
        })
        // log(typeLog, "components -> common -> SalePop -> mount -> collection: ", collection)
        jquerySalePop(collection)
      }
    },
    componentDidUpdate() {
      const { data: { error, productOrderDistinct }, runSalePop, updateRunSalePop } = this.props
      // log(typeLog, "components -> common -> SalePop -> update productOrderDistinct: ", productOrderDistinct)
      if (!runSalePop && productOrderDistinct && productOrderDistinct.payload && productOrderDistinct.payload.length > 0) {
        var collection = new Array();
        console.log(process.env.IMAGE_SERVER)
        productOrderDistinct.payload.forEach((item, index) => {
          const { id, productName, category, productImage } = item
          const linkProduct = `/${EncodeUrl(category.categoryName)}/${EncodeUrl(productName)}-${id}`
          const imageUrl = `${process.env.IMAGE_SERVER}/${productImage}`;
          fetchImage(`${imageUrl}?size=80x80`).then(urlImg => {
            collection[index] = "<a href='" + linkProduct + "' class='jas-sale-pop-img mr__20'>"
              + "  <img src='" + urlImg + "' alt='" + productName + "'>"
              + "</a>"
              + "<div class='jas-sale-pop-content'>"
              + "<h3 class='mg__0 mt__5 mb__5 fs__18'>"
              + "<a href='" + linkProduct + "' title='" + productName + "'>" + productName + "</a>"
              + "</h3>"
              + "<span class='fs__12 jas-sale-pop-timeago'></span>"
              + "</div>"
              + "<span class='pe-7s-close pa fs__20'></span>";
          });
        })
        // log(typeLog, "components -> common -> SalePop -> update -> collection: ", collection)
        jquerySalePop(collection)
        updateRunSalePop(true)
      }
    },
    componentWillUnMount() {
      clearInterval(intervalSalePop)
    },
    shouldComponentUpdate(nextProps, nextState) {
      if (
        nextProps.data === this.props.data
      ) {
        return false
      }
      return true
    }
  })
)(SalePop)