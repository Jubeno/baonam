import React from 'react';
import Link from '@/utils/ActiveLink';
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
// import styles from './Slides.less';

const Slides = ({ dataSlide }) => (
  <section className="awe-section-1" style={{ marginBottom: "50px" }}>
    <div className="home-slider owl-carousel owl-loaded owl-drag" data-lg-items={1} data-md-items={1} data-sm-items={1} data-xs-items={1} data-margin={0} data-dot="false" >
      <div className="owl-stage-outer">
        <div className="owl-stage" style={{ transform: 'translate3d(0px, 0px, 0px)', transition: 'all 0s ease 0s', width: '1349px' }}>
          {dataSlide && dataSlide.length > 0 && dataSlide.map((item) => (
            <div className="owl-item active" style={{ width: '1349px' }} key={`slide_${item.id}`}>
              <div className="item">
                <a className="clearfix">
                  <img src={`${publicRuntimeConfig.IMAGE_DAS_SERVER}/${publicRuntimeConfig.IMAGE_PROJECT}/${item.contents}`} alt={item.title} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default (Slides);
