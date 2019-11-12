import React from 'react';

const defaultProps = {
  initialPage: 1
}

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pager: {} };
  }

  componentWillMount() {
    const { items, initialPage } = this.props
    if (items && items > 0) {
      this.setPage(initialPage);
    }
  }

  componentDidUpdate(prevProps) {
    const { items, initialPage } = this.props
    // reset page if items array has changed
    if (items !== prevProps.items) {
      this.setPage(initialPage);
    }
  }

  setPage = (page) => {
    const { items, pageSize } = this.props
    const { pager } = this.state
    let pagers = pager;
    if (page < 1 || page > pager.totalPages) {
      return;
    }
    pagers = this.getPager(items, page, pageSize);
    this.setState({ pager: pagers });
  }

  getPager = (totalItems, currentPage, pageSize) => {
    const currentPages = currentPage || 1;
    const pageSizes = pageSize || 10;
    const totalPages = Math.ceil(totalItems / pageSizes);

    let startPage; let endPage;
    if (currentPages <= 1)
      startPage = 1;
    else
      startPage = (currentPages - 1);


    if ((totalPages - (startPage + 2)) >= 0) {
      endPage = startPage + 2;
    } else {
      endPage = totalPages;
    }

    // calculate start and end item indexes
    const startIndex = (currentPages - 1) * pageSizes;
    const endIndex = Math.min(startIndex + pageSizes - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    const pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage: currentPages,
      pageSize: pageSizes,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }

  render() {
    const { pager } = this.state
    const { fetchMore, style } = this.props
    if (!pager.pages || pager.pages.length <= 1) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="listing" style={style}>
          {pager.currentPage !== 1 &&
            <a className="prev_page_arrow" onClick={() => { this.setPage(pager.currentPage - 1); fetchMore(pager.currentPage - 1) }}>
              <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 12.9" style={{ enableBackground: 'new 0 0 32 12.9' }}>
                <path className="polygon_prev" d="M6.5 12.9 7.2 12.2 1.9 7H32V5.9H1.9L7.2.7 6.5.0.0 6.5z" />
              </svg>
            </a>}
          {pager.pages.map((page) =>
            <React.Fragment key={page}>
              {pager.currentPage === page &&
                <span>{page}</span>
              }
              {pager.currentPage !== page &&
                <a onClick={() => { this.setPage(page); fetchMore(page) }}>{page}</a>
              }
            </React.Fragment>
          )}
          {pager.currentPage !== pager.totalPages &&
          <a className="next_page_arrow" onClick={() => { this.setPage(pager.currentPage + 1); fetchMore(pager.currentPage + 1) }}>
            <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 12.9" style={{ enableBackground: 'new 0 0 32 12.9' }}>
              <path className="polygon_next" d="M25.5.0 24.8.7 30.1 5.9H0V7H30.1L24.8 12.2 25.5 12.9 32 6.5z" />
            </svg>
          </a>}
        </div>
        <div className="clr" />
      </React.Fragment>
    );
  }
}

Pagination.defaultProps = defaultProps;

export default Pagination
