
import React from 'react';

export default () => {
    return (
      <React.Fragment>
        <div className="confirmed_cookie" style={{ display: 'none' }}>
          <div className="container_center">
            <div className="cookie_text">Our website uses cookies to improve your user experience.</div>
            <div className="clr" />
            <div className="change_back_text"><a className="button_orange non_shadow r_more" rel="nofollow" href="#">Read more</a>
              <div className="button_orange non_shadow close i_agree"><span>I accept cookies from this website</span></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
}
