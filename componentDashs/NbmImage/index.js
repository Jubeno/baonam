/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import { fetchJson } from '@/utils/fetch';
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
class NbmImage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      source: '',
      isLoaded: false,
      figureStyle: {
        backgroundImage: `url()`,
        backgroundPosition: '0% 0%',
        // border: '1px solid red'
      }
    }
  }

  componentDidMount() {
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
    fetchJson(`${src}`).then(data => {
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
    if (Number(screen) >= Number(768)) {
      widthVar = `${groupImage}_DESKTOP`
    } else if (
      Number(screen) < Number(768)
      && Number(screen) > Number(411)
    ) {
      widthVar = `${groupImage}_TABLET`
    } else if (Number(screen) <= Number(411)) {
      widthVar = `${groupImage}_MOBILE`
    }
    return Number(publicRuntimeConfig[widthVar])
  }

  handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top) / height * 100
    const { figureStyle } = this.state
    this.setState({
      figureStyle: {
        ...figureStyle,
        backgroundPosition: `${x}% ${y}%`
      }
    })
  }

  handleScroll = () => {
    const { isLoaded, figureStyle } = this.state
    const { notLoadHidden, original, src, type, originalLoad } = this.props
    const notLoadImage = notLoadHidden ? notLoadHidden || this.isHidden(this.img) : false;
    if (notLoadImage) {
      // console.log("type: %o, notLoadImage: %o", type, notLoadImage)
      return
    }

    const screenWidth = window.innerWidth;
    const { clientWidth } = this.img;
    let responsiveWidth = clientWidth;
    if (type && type !== null && type !== '') {
      try {
        responsiveWidth = this.switchImageFromScreen(screenWidth, type)
        // console.log("switchImageFromScreen: ", responsiveWidth)
      } catch (error) {
        // console.log("switchImageFromScreen error: ", new Error(error).message)
      }
    }
    if (original) {
      this.setState({
        isLoaded: true,
      })
      if (this && this.img) {
        this.img.setAttribute(
          `src`,
          `${src}`
        )
      }
    } else if (!isLoaded && responsiveWidth > 0) {
      // console.log("src: %o, type: %o, responsiveWidth:%o, clientWidth: %o, screenWidth: %o", this.props.src.split('images')[2], type, responsiveWidth, clientWidth, screenWidth);
      const urlFetchImg = originalLoad ? `${src}` : `${src}?widthDevice=${screenWidth}&widthImage=${responsiveWidth}`
      this.fetchImage(urlFetchImg).then(urlImg => {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          source: `${urlImg}`,
          isLoaded: true,
          figureStyle: {
            ...figureStyle,
            backgroundImage: `url(${urlImg})`,
          }
        })
        if (this && this.img) {
          this.img.setAttribute(
            `src`,
            `${urlImg}`
          )
        }
      });
    }
  }

  render() {
    const { figureStyle } = this.state
    // eslint-disable-next-line no-unused-vars
    const { className, style, alt, width, height, keys, zoom, ...rest } = this.props
    if (zoom) {
      return (
        <figure className="zoom" onMouseMove={this.handleMouseMove} style={figureStyle}>
          <img className={className} key={keys} style={style} alt={alt} ref={el => this.img = el} />
        </figure>
      )
    }
    if (width && !height) {
      return <img className={className} key={keys} style={style} alt={alt} ref={el => this.img = el} width={width} />
    } if (!width && height) {
      return <img className={className} key={keys} style={style} alt={alt} ref={el => this.img = el} height={height} />
    } if (width && height) {
      return <img className={className} key={keys} style={style} alt={alt} ref={el => this.img = el} width={width} height={height} />
    }
    return (
      <img className={className} key={keys} style={style} alt={alt} ref={el => this.img = el} />
    )
  }
}

NbmImage.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  notLoadHidden: PropTypes.bool,
  original: PropTypes.bool,
  originalLoad: PropTypes.bool,
  zoom: PropTypes.bool,
}

NbmImage.defaultProps = {
  type: '',
  notLoadHidden: false,
  original: false,
  originalLoad: false,
  zoom: false,
}

export default NbmImage;
