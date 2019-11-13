import SideBar from './SideBar'
import Detail from './Detail'

export default ({ getArticleById, allCategories, query, asPath }) => {
  return (
    <React.Fragment>
      <div className="box box--shadow">
        <div className="sidebar-content sidebar-first">
          <SideBar allCategories={allCategories} query={query} asPath={query}/>
          <Detail getArticleById={getArticleById} query={query} asPath={query}/>
        </div>
      </div>
    </React.Fragment>
  )
}