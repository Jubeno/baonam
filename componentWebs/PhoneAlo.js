import React from 'react';
import Link from '@/utils/ActiveLink';
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
// import styles from './Slides.less';

const Slides = ({ dataSite }) => {
  const places = dataSite && dataSite.places
  return (
    <div className="toolbox_scroll hidden-xs show">
      <a className="tooltips" href={`tel:${places.mobile}`}><i className="fa fa-phone" /><span>{places.mobile}</span></a>
      {/* <a className="tooltips register_click" href="javascript:;"><i className="fa fa-calendar" /><span>Đặt lịch khám</span></a>
    <a className="tooltips" href="https://www.facebook.com/"><i className="fa fa-facebook" /><span>Fanpage</span></a> */}
    </div>

  )
}

export default (Slides);
