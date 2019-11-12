
import { graphql } from 'react-apollo'
import { filter, propType } from 'graphql-anywhere'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'

import EncodeUrl from '../../lib/utils/encode'
import NbmLink from '../../lib/utils/customLink'

const SideBar = ({ allCategories, query }) => {
  // console.log("query: ", query)
  return (
    <div className="sidebar">
      {allCategories && allCategories.payload.map((item, index) => {
        if(!item.articles || item.articles.length <=0) return null
        return (
          <React.Fragment key={index}>
            <div className="sidebar__widget widget">
              <h3 className="widget__title">{item.categoryName}</h3>
              <ul className="side-menu">
                {item.articles && item.articles.length > 0 && item.articles.map((ar, arIndex) => (
                  <React.Fragment key={arIndex}>
                    <li className={query.id == ar.id ? "active" : ""}><NbmLink href={`/tin-tuc/${EncodeUrl(ar.title)}-${ar.id}`} name={ar.title} /></li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </React.Fragment>
        )
      })}
      {/* <div className="sidebar__widget widget">
        <h3 className="widget__title">Giới thiệu</h3>
        <ul className="side-menu">
          <li className="active"><a href="https://www.hotdeal.vn/ve-chung-toi.html">Về Chúng Tôi</a></li>
          <li className><a href="https://www.hotdeal.vn/quy-che-hoat-dong.html">Quy chế hoạt động</a></li>
          <li className><a href="https://www.hotdeal.vn/chinh-sach-bao-mat-thong-tin.html">Chính sách bảo mật thông tin</a></li>
          <li className><a href="https://www.hotdeal.vn/co-che-giai-quyet-tranh-chap.html">Cơ chế giải quyết tranh chấp</a></li>
          <li className><a href="https://www.hotdeal.vn/lien-he.html">Liên Hệ</a></li>
        </ul>
      </div> */}
    </div>
  )
}

export default SideBar

// const SITE_SAN_PHAM = parseInt(`${publicRuntimeConfig.SITE_THONG_TIN}`, 10)

// const sideBar_Categories = gql`
//   query sideBar_Categories ($filter: Json) {
//     allCategories(filter:$filter, offset:0, limit:9){
//       payload{
//         id
//         categoryName
//         articles {
//           id
//           title
//         }
//       }
//       meta{
//         count
//       }
//     }
//   }
// `

// export default withRouter(
//   graphql(sideBar_Categories, {
//     options: ({ }) => ({
//       variables: {
//         filter: { status: 1, siteId: parseInt(`${publicRuntimeConfig.SITE_THONG_TIN}`, 10) }
//       }
//     }),
//     props: ({ data }) => ({
//       data
//     })
//   })(SideBar)
// )