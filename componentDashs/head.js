import NextHead from 'next/head'
import { string } from 'prop-types'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const defaultDescription = `${publicRuntimeConfig.APP_DESCRIPTION}`
const defaultOGURL = `${publicRuntimeConfig.APP_URL}`
const defaultOGImage = ''
const defaultKeywords = `${publicRuntimeConfig.APP_KEYWORD}`
const defaultOGSiteName = `${publicRuntimeConfig.APP_NAME}`
const defaultOGType = `${publicRuntimeConfig.APP_TYPE}`
// const defaultIcon = `${publicRuntimeConfig.APP_ICON}`
const defaultTitle = `${publicRuntimeConfig.APP_NAME || ''}`



const Head = ({ title, url, keywords, description, siteName, type, ogImage, defaultKeywordsWeb, defaultDescriptionWeb, defaultOGURLWeb }) => (
  <NextHead>
    <title>{title}</title>

    <meta name="keywords" content={`${defaultKeywordsWeb} ${keywords}`} />
    <meta name="description" content={`${defaultDescriptionWeb} ${description}`} />
    <meta property="og:site_name" content={siteName} />
    <meta property="og:type" content={type} />
    <meta property="og:url" content={url} />
    <meta property="og:title" content={title || ''} />
    <meta property="og:description" content={`${defaultDescriptionWeb} ${description}`} />
    <meta name="twitter:site" content={url || defaultOGURLWeb} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={ogImage} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <link rel="canonical" href={url} />

    {/* Edited css */}

    <link rel="stylesheet" href="/static/web/css/linearicons.css" />
    <link href="/static/web/css/style.css" rel="stylesheet" />
    <link rel="stylesheet" href="/static/web/js/wow/animate.css" />
    <link rel="stylesheet" href="/static/web/js/slick/slick.css" />
    <link href="/static/web/css/style.css" rel="stylesheet" />
    <link href="/static/web/css/custom.css" rel="stylesheet" />

   

 
    
    

    {/* <link rel="icon" href={`${defaultIcon}`} />
    <link rel="apple-touch-icon" sizes="57x57" href="/static/images/favicon/apple-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/static/images/favicon/apple-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/static/images/favicon/apple-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/static/images/favicon/apple-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/static/images/favicon/apple-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/static/images/favicon/apple-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/static/images/favicon/apple-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/static/images/favicon/apple-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/static/images/favicon/apple-icon-180x180.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/static/images/favicon/android-icon-192x192.png" />
    <link rel="shortcut icon" href={`${defaultIcon}`} />
    <link rel="icon" type="image/png" sizes="32x32" href="/static/images/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/static/images/img/favicon/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/static/images/favicon/favicon-16x16.png" /> */}
  </NextHead>
)

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
  siteName: string,
  type: string,
  keywords: string
}

Head.defaultProps = {
  title: defaultTitle,
  description: defaultDescription,
  url: defaultOGURL,
  ogImage: defaultOGImage,
  siteName: defaultOGSiteName,
  type: defaultOGType,
  keywords: defaultKeywords,
}

export default Head
