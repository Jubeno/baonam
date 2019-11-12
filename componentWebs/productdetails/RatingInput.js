import React, { Component } from 'react';
import { ratingHtml } from '../../pages/productdetail/productdetail'
import log from '../../lib/utils/log'
const typeLog = 'log'

class RatingInput extends Component {
  constructor(props){
    super(props)
    this.state = {
      rating : 0
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextState.rating !== this.state.rating){
      return true
    }
    return false;
  }

  onClick = (e, rating) => {
    log(typeLog, "onClick rate: ", rating)
    this.setState({ rating: rating });
    this.props.handleChangeRating(rating);
  }

  render() {
    const { rating } = this.state;
    return (
      <div id="dvRating">
        <b data-alt={1} className={`fa fa-star ${rating >= 1 ? null : "fa-off-star"}`} title={1} onClick={e => this.onClick(e, 1)}/>
        <b data-alt={2} className={`fa fa-star ${rating >= 2 ? null : "fa-off-star"}`} title={2} onClick={e => this.onClick(e, 2)}/>
        <b data-alt={3} className={`fa fa-star ${rating >= 3 ? null : "fa-off-star"}`} title={3} onClick={e => this.onClick(e, 3)}/>
        <b data-alt={4} className={`fa fa-star ${rating >= 4 ? null : "fa-off-star"}`} title={4} onClick={e => this.onClick(e, 4)}/>
        <b data-alt={5} className={`fa fa-star ${rating >= 5 ? null : "fa-off-star"}`} title={5} onClick={e => this.onClick(e, 5)}/>
        <style jsx>{`
          #dvRating b.fa.fa-star {
            font-size: 20px !important;
          }
        `}</style>
      </div>
    );
  }
}

export default RatingInput;