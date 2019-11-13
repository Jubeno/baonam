/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';

import { fetchJson } from '../utils/fetch';
import Promise from '../utils/promise';
import CONFIG from '../config';

const { /* SCREEN_DESKTOP, */ SCREEN_TABLET, SCREEN_MOBILE } = CONFIG;
// const wait = (callback) => setTimeout(callback, Number(IMAGE_PROCESS_TIMEOUT));

export const switchImageFromScreen = (screen, groupImage) => {
  let widthVar = `${groupImage}`;
  if (Number(screen) >= Number(SCREEN_TABLET)) {
    widthVar = `${groupImage}_DESKTOP`
  } else if (
    Number(screen) < Number(SCREEN_TABLET)
    && Number(screen) > Number(SCREEN_MOBILE)
  ) {
    widthVar = `${groupImage}_TABLET`
  } else if (Number(screen) <= Number(SCREEN_MOBILE)) {
    widthVar = `${groupImage}_MOBILE`
  }
  return Number(CONFIG[widthVar])
}

class NbmImage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      // source: '',
      isLoaded: false,
      backgroundImageFake: `url()`,
      figureStyle: {
        backgroundImage: `url()`,
        backgroundPosition: '0% 0%',
        // border: '1px solid red'
      }
    }
  }

  componentDidMount() {
    // console.log("NBMIMAGE props: %o | img rect: ", this.props, this.img.getBoundingClientRect());
    /* const { type } = this.props
    const screenWidth = window.innerWidth
    this.fetchImage(`${this.props.src}?size=${width}`).then(urlImg => {
      console.log("urlImage: ", urlImg)
      this.setState({
        source: `${urlImg}`
      }, this.handleScroll)
    }); */
    const { src } = this.props
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      source: `${src}`
    }, this.handleScroll)

    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  fetchImage = (src) => new Promise(resolve => {
    fetchJson(`${CONFIG.IMAGE_SERVER}${CONFIG.IMAGE_PROJECT}/${src}&urlCallback=${CONFIG.IMAGE_DAS_SERVER}`).then(data => {
      // console.log("data: ", data)
      const { json } = data;
      if (json && json.url)
        resolve(json.url)
      else resolve('')
    })
  })

  isInViewport = (el) => {
    const rect = el.getBoundingClientRect()

    return (
      rect.top >= 0
      && rect.left >= 0
      && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    )
  }

  isHidden = (el) => el.offsetParent === null

  // groupImage IMAGE_SLIDE_HOME, IMAGE_ADS_BOTTOM, IMAGE_ADS_RIGHT_HOME, IMAGE_PRODUCT_HOME, IMAGE_PRODUCT_DETAIL, IMAGE_PRODUCT_DETAIL_THUMB
  switchImageFromScreen = (screen, groupImage) => {
    let widthVar = `${groupImage}`;
    if (Number(screen) >= Number(SCREEN_TABLET)) {
      widthVar = `${groupImage}_DESKTOP`
    } else if (
      Number(screen) < Number(SCREEN_TABLET)
      && Number(screen) > Number(SCREEN_MOBILE)
    ) {
      widthVar = `${groupImage}_TABLET`
    } else if (Number(screen) <= Number(SCREEN_MOBILE)) {
      widthVar = `${groupImage}_MOBILE`
    }
    return Number(CONFIG[widthVar])
  }

  handleMouseMove = e => {
    const { backgroundImageFake } = this.state;
    const { /* left, top, */ width, height } = e.target.getBoundingClientRect()
    // const x = (e.pageX - left) / width * 100
    // const y = (e.pageY - top) / height * 100
    const x = (e.nativeEvent.offsetX / width) * 100
    const y = (e.nativeEvent.offsetY / height) * 100

    this.setState({
      figureStyle: {
        // ...figureStyle,
        backgroundPosition: `${x}% ${y}%`,
        backgroundImage: backgroundImageFake
      }
    })
  }

  handleMouseOut = () => {
    const { figureStyle } = this.state;
    this.setState({
      figureStyle: {
        ...figureStyle,
        backgroundImage: `url()`,
      }
    })
  }

  handleScroll = () => {
    const { isLoaded/* , isLoaded, source */ } = this.state
    const { notLoadHidden, original, src, type, originalLoad } = this.props
    // const baseCondition = isLoaded || !this.isInViewport(this.img)
    const notLoadImage = notLoadHidden ? notLoadHidden || this.isHidden(this.img) : false;
    if (notLoadImage) {
      console.log("type: %o, notLoadImage: %o", type, notLoadImage)
      return
    }

    const screenWidth = window.innerWidth;
    // const rect = this.img.getBoundingClientRect();
    const { clientWidth } = this.img;
    let responsiveWidth = clientWidth;
    if (type && type !== null && type !== '') {
      try {
        responsiveWidth = this.switchImageFromScreen(screenWidth, type)
        // console.log("switchImageFromScreen: ", responsiveWidth)
      } catch (error) {
        console.log("switchImageFromScreen error: ", new Error(error).message)
      }
    }
    // console.log("this.state.isLoaded === false && responsiveWidth > 0: ", this.state.isLoaded === false && responsiveWidth > 0)
    if (original) {
      this.setState({
        isLoaded: true,
      })
      this.img.setAttribute(
        `src`,
        `${src}`
      )
    } else if (!isLoaded && responsiveWidth > 0) {
      // console.log("src: %o, type: %o, responsiveWidth:%o, clientWidth: %o, screenWidth: %o", this.props.src.split('images')[2], type, responsiveWidth, clientWidth, screenWidth);
      const urlFetchImg = originalLoad ? `${src}` : `${src}?widthDevice=${screenWidth}&widthImage=${responsiveWidth}`
      this.fetchImage(urlFetchImg).then(urlImg => {
        // console.log("urlImage: ", urlImg)
        this.setState({
          // source: `${urlImg}`,
          backgroundImageFake: `url(${urlImg})`,
          isLoaded: true,
          // figureStyle: {
          //   ...figureStyle,
          //   backgroundImage: `url(${urlImg})`,
          // }
        })
        this.img.setAttribute(
          `src`,
          `${urlImg}`
        )
      });
    }
    /* const imgLoader = new Image()
    const realSource = original ? src : source
    console.log("original : %o | realSource: %o | source: %o", original, realSource, source)
    imgLoader.onload = () => {
      const ratioWH = imgLoader.width / imgLoader.height
      this.img.setAttribute(
        `src`,
        `${realSource}`
      )
      this.img.setAttribute(
        `height`,
        `${this.props.width / ratioWH}`
      )
 
      this.setState({
        isLoaded: true
      })
    }
    imgLoader.onerror = () => {
      this.setState({
        isLoaded: true
      })
    }
    imgLoader.src = realSource */
  }

  render() {
    const { className, style, alt, width, height, zoom/* , ...rest */ } = this.props
    const { figureStyle } = this.state
    if (zoom) {
      return (
        <React.Fragment>
          <style>
            {`figure.zoom {
           background-image: unset;
          }`}
          </style>
          <figure
            className="zoom"
            onMouseMove={this.handleMouseMove}
            onMouseOut={this.handleMouseOut}
            style={figureStyle}
          >
            <img className={className} style={style} alt={alt} ref={el => this.img = el} />
          </figure>
        </React.Fragment>
      )
    }
    if (width && !height) {
      return <img className={className} style={style} alt={alt} ref={el => this.img = el} width={width} />
    }
    if (!width && height) {
      return <img className={className} style={style} alt={alt} ref={el => this.img = el} height={height} />
    }
    if (width && height) {
      return <img className={className} style={style} alt={alt} ref={el => this.img = el} width={width} height={height} />
    }
    return (
      <img className={className} style={style} alt={alt} ref={el => this.img = el} />
    )
  }
}

NbmImage.propTypes = {
  src: PropTypes.string.isRequired,
  // type: PropTypes.string.isRequired,
  notLoadHidden: PropTypes.bool,
  original: PropTypes.bool,
  originalLoad: PropTypes.bool,
  zoom: PropTypes.bool,
}

NbmImage.defaultProps = {
  // type: '',
  notLoadHidden: false,
  original: false,
  originalLoad: false,
  zoom: false,
}

export default NbmImage;
