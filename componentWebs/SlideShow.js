
import React from 'react';
import Link from '@/utils/ActiveLink';
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

// import styles from './Slides.less';

// Breadcrumb - Khong thay doi

const SlideShow = ({ advertisments, dataCategoryInfo }) => (
  <div className="breadcrumb_background" style={{marginBottom:"20px"}}>
    <div className="title_full">
      <div className="container a-center">
        <p className="title_page_breadcrumb">{dataCategoryInfo || ''}</p>
      </div>
    </div>
    <section className="bread-crumb">
      <span className="crumb-border"></span>
      <div className="container">
        <div className="row">
          <div className="col-xs-12 a-left">
            <ul className="breadcrumb" itemScope itemType="http://data-vocabulary.org/Breadcrumb">
              <li className="home">
                <Link path="/index" href="/"><span itemProp="title">Trang chủ</span></Link>
                <span className="mr_lr">&nbsp;/&nbsp;</span>
              </li>
              <li><strong><span itemProp="title">{dataCategoryInfo || ''}</span></strong></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
)

export default SlideShow;
