/* eslint-disable prefer-arrow-callback */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
import '../../componentPages/React-Dropzone-Component/styles/filepicker.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'dropzone/dist/min/dropzone.min.css';
// import 'cropperjs/dist/cropper.css';

import React from 'react';
import {
  Button, message, Row, Col, /* Tooltip,  Input */
} from 'antd';
import getConfig from 'next/config'
import DropzoneComponent from 'react-dropzone-component';
// import compose from 'recompose/compose';
import cookie from 'js-cookie';
// import Cropper from 'cropperjs';
import uuidv1 from 'uuid/v1';

import styles from './ImageUpload.less';

const { publicRuntimeConfig } = getConfig()
const log = (data, ...args) => console.log(data, ...args)

/* const setStyleConfirm = (confirm) => {
  confirm.style.position = 'absolute';
  confirm.style.left = '10px';
  confirm.style.top = '10px';
  confirm.style.zIndex = 9999;
  // confirm.textContent = 'Confirm';
  confirm.style.background = "#E1E1E1"; // "rgba(0, 0, 0, 0.65)";
  confirm.style.boxShadow = "0 2px 0 rgba(0, 0, 0, 0.045)";
  confirm.style.border = '2px dashed #52c41a';
  confirm.style.lineHeight = '22px';
  confirm.style.cursor = "pointer";
  confirm.style.borderRadius = "5px";
  confirm.style.display = "none";
  confirm.innerHTML = '<span class="fa fa-check" style="color:#52c41a;font-size:20px;text-align: center;vertical-align: middle;"/>';
  confirm.type = "button"
  confirm.title = "Hoàn tác";
  confirm.id = "btnConfirmCropper"
} */

const imageRatio = (width, height) => {
  const ratio = width / height;
  return ratio;
}

/* const getDimensionImage = (file) => {
  const img = document.createElement('img');
  const blob = URL.createObjectURL(acceptFile);
  img.src = blob;
  img.onload = function () {
    const w = img.width;
    const h = img.height;
    console.log("NEW IMAGE width", w);
    console.log("NEW IMAGE height: ", h);
  }
} */

const previewTemplate = `
  <div class="dz-preview dz-file-preview">
    <div class="dz-image">
      <img data-dz-thumbnail width="150" height="150"/>
    </div>
    <div class="dz-details">
      <div class="dz-filename"><span data-dz-name></span></div>
      <div class="dz-size" data-dz-size></div>
    </div>
    <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
    <div class="dz-success-mark"><span>✔</span></div>
    <div class="dz-error-mark"><span>✘</span></div>
    <div class="dz-error-message"><span data-dz-errormessage></span></div>
  </div>
`

const initArrImages = (value) => value !== '' ? value.split(',').map(item => {
  const arrSplit = item.split('/')
  const name = arrSplit[arrSplit.length - 1]
  const path = item

  return {
    filename: name,
    originalname: name,
    path
  }
}) : []

class ImageUpload extends React.Component {
  constructor(props) {
    // console.log("constructor")
    super(props);

    // const editorId = props.key; // uuidv1()
    console.log("ImageUpload constructor props: ", props)
    this.editorId = uuidv1();
    // this.imageUploadKey = `image-upload-${uuidv1()}`
    this.state = {
      screenShoots: props.value,
      arrScreenShots: initArrImages(props.value),
      // editorId
    }

    const {
      maxFiles = null,
      acceptedFiles = null,
      maxFilesize = 256,
      // resizeWidth = null,
      resizeHeight = null,
      resizeQuality = 0.8,
      iconFiletypes = [],
      showFiletypeIcon = true,
      postUrl = `${publicRuntimeConfig.UPLOAD_IMAGE_SINGER}`,
      parallelUploads = 10,
      ratio,
      maxWidth,
      minWidth,
      extractWidth,
      extractHeight,
      autoProcessQueue = true,
    } = props
    const dictRemoveFile = 'Xoá ảnh'
    const dictDefaultMessage = 'Click để chọn hoặc Kéo thả ảnh ở đây để tải lên'
    const dictCancelUpload = "Hủy tải"
    const cookieToken = cookie.get("token");
    const token = cookieToken !== "undefined" ? cookieToken : null;
    const cookieEmail = cookie.get("auth_email");
    // const authEmail = localStorage.getItem('antd-pro-userName') !== "undefined" ? JSON.parse(localStorage.getItem('antd-pro-userName')) : null;
    const authEmail = cookieEmail !== 'undefined' ? cookieEmail : null;
    const defaultHeaders = token ? {
      'X-Auth-Email': `${authEmail}`,
      'X-Auth-Key': `${token}`,
      'X-Auth-Project': `${publicRuntimeConfig.IMAGE_PROJECT}`
      // token,
      // authorization: `Bearer ${token}`,
    } : {}
    // console.log('fileList,',fileList)

    this.autoProcessQueue = autoProcessQueue;
    this.djsConfig = {
      addRemoveLinks: true,
      autoProcessQueue,
      headers: { ...defaultHeaders },
      parallelUploads,
      acceptedFiles,
      maxFiles,
      maxFilesize,
      resizeWidth: 100,
      resizeHeight,
      resizeQuality,
      dictRemoveFile,
      dictDefaultMessage,
      dictCancelUpload,
      previewTemplate,
      accept: function (acceptFile, done) {
        // log("acceptFile file: %o", acceptFile);
        // Object.keys(acceptFile).map(item => log(`${item}`))

        if (acceptFile.status === "added") {
          const img = document.createElement('img');
          const blob = URL.createObjectURL(acceptFile);
          img.src = blob;
          img.onload = function () {
            const imgWidth = img.width;
            const imgHeight = img.height;
            let msgError = '';
            const imgRatio = imageRatio(imgWidth, imgHeight);
            if (
              (typeof ratio === 'undefined'
                || typeof maxWidth === 'undefined'
                || typeof minWidth === 'undefined'
              )
              && (
                typeof extractWidth === 'undefined'
                || typeof extractHeight === 'undefined'
              )
            ) {
              msgError = "Cần khai báo [ratio] [maxWidth] [minWidth] hoặc [extractWidth] [extractHeight]";
              message.error(msgError)
              done(msgError)
            } else if (
              typeof ratio !== 'undefined'
              && typeof maxWidth !== 'undefined'
              && typeof minWidth !== 'undefined') {
              const needRatio = ratio.split(':')[0] / ratio.split(':')[1];

              log("imgRatio :%o \nimgWidth: %o \nneedRatio: %o", imgRatio, imgWidth, needRatio)

              if (Math.abs(imgRatio - needRatio) >= 0.5) {
                msgError = `Tỉ lệ ảnh phải là ${ratio}`;
                message.error(msgError)
                done(msgError)
              } else if (Number(imgWidth) > Number(maxWidth) || Number(imgWidth) < Number(minWidth)) {
                msgError = `Độ rộng ảnh phải từ ${minWidth}px đến ${maxWidth}px`;
                message.error(msgError)
                done(msgError)
              } else {
                done();
              }
            } else if (
              typeof extractWidth !== 'undefined'
              || typeof extractHeight !== 'undefined') {
              // log("extractWidth :%o \nimgWidth: %o \nextractHeight: %o", extractWidth, imgWidth, extractHeight)
              // const a = Array.isArray(extractWidth) && Array.isArray(extractHeight);
              // log("test case a: ", a);
              if (
                typeof extractHeight === 'string' &&
                typeof extractWidth === 'string' && (
                  Number(imgWidth) !== Number(extractWidth)
                  || Number(imgHeight) !== Number(extractHeight)
                )
              ) {
                msgError = `Kích thước ảnh phải là ${extractWidth}px x ${extractHeight}px.`;
                message.error(msgError)
                done(msgError)
              } else if (
                typeof extractWidth === 'string' &&
                Array.isArray(extractHeight) && (
                  Number(imgWidth) !== Number(extractWidth)
                  || (
                    Number(imgHeight) > Number(extractHeight[1])
                    || Number(imgHeight) < Number(extractHeight[0])
                  )
                )
              ) {
                msgError = `Kích thước ảnh phải là ${extractWidth}px và cao từ ${extractHeight[0]}px đến ${extractHeight[1]}px.`;
                message.error(msgError)
                done(msgError)
              } else if (
                Array.isArray(extractWidth) &&
                Array.isArray(extractHeight) && (
                  (
                    Number(imgWidth) > Number(extractWidth[1])
                    || Number(imgWidth) < Number(extractWidth[0])
                  )
                  || (
                    Number(imgHeight) > Number(extractHeight[1])
                    || Number(imgHeight) < Number(extractHeight[0])
                  )
                )
              ) {
                // log("imgWidth: %o, extractWidth: %o,extractHeight: %o", imgWidth, extractWidth, extractHeight)
                msgError = `Kích thước ảnh phải là rộng từ ${extractWidth[0]}px đến ${extractWidth[1]}px và cao từ ${extractHeight[0]}px đến ${extractHeight[1]}px.`;
                message.error(msgError)
                done(msgError)
              } else if (
                Array.isArray(extractWidth) &&
                typeof extractHeight === 'string' && (
                  (
                    Number(imgWidth) > Number(extractWidth[1])
                    || Number(imgWidth) < Number(extractWidth[0])
                  )
                  || Number(imgHeight) !== Number(extractHeight)
                )
              ) {
                msgError = `Kích thước ảnh phải là rộng từ ${extractWidth[0]}px đến ${extractWidth[1]}px và cao ${extractHeight}px.`;
                message.error(msgError)
                done(msgError)
              } else {
                done();
              }
            }
          }
        }
      }
    };

    this.componentConfig = {
      iconFiletypes,
      showFiletypeIcon,
      postUrl
    };

    this.dropzone = null;
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    console.log("componentWillReceiveProps next value: %o, this.value: %o", nextProps.value, value)
    if (
      nextProps.value !== value
    ) {
      console.log("componentWillReceiveProps nextProps.value !== value")
      this.setState({
        screenShoots: nextProps.value,
      });
      // this.addImages(this.dropzone, nextProps.value);
    }
  }

  resetImageEditor = () => {
    // const { editorId } = this;
    console.log("iframe: %o", document.getElementsByName(`myIframe-${this.editorId}`)[0].contentWindow)
    const iiframe = document.getElementsByName(`myIframe-${this.editorId}`)[0];
    console.log("iiframe contentWindow: %o, canv: %o", iiframe.contentWindow, iiframe.contentWindow.canv);
    if (iiframe && iiframe.contentWindow && iiframe.contentWindow.canv) {
      iiframe.contentWindow.canv.fabric.clear();
      const containerEditor = document.getElementById(`container-transform`);
      if (containerEditor)
        containerEditor.style.display = "none";
      console.log("containerEditor: %o", containerEditor);
    }
  }

  inputOnChange = (value) => {
    const { onChange } = this.props;
    const valueInput = value.map(item => item.path).join(',')
    onChange(valueInput)
    this.setState({ screenShoots: valueInput })
  }

  handleFileAdded(file) {
    console.log('adding...%o \n files....%o', file, this.dropzone.files);
    const { maxFiles } = this.props
    if (maxFiles === (this.dropzone.files.length - 1)) {
      // this.resetImageEditor()
      this.dropzone.removeFile(this.dropzone.files[0]);
    }

    /* const { arrScreenShots } = this.state;
    const tempArrScreenShots = [...arrScreenShots];
    const arrScreenShotss = tempArrScreenShots // .filter(item => item.originalname !== file.name)
    const fileadddddd = URL.createObjectURL(file);
    arrScreenShotss.push({
      filename: file.name,
      originalname: fileadddddd,
      path: fileadddddd
    })
    console.log("adding ... arrScreenShotss: ", arrScreenShotss)
    this.setState({ arrScreenShots: arrScreenShotss })
    this.inputOnChange(arrScreenShotss) */
  }

  handleMaxFileExceeded(file) {
    this.dropzone.removeFile(file);
  }

  handleFileRemoved(file) {
    const { arrScreenShots } = this.state;
    console.log('removing...', file);
    const tempArrScreenShots = Object.assign(arrScreenShots)
    const arrScreenShotss = tempArrScreenShots.filter(item => item.originalname !== file.name)
    /*  const arrScreenShotss = tempArrScreenShots.filter(item => {
       console.log("removing... tempArrScreenShots each item: ", item)
       if (!/(http|https)/g.test(item.originalname)) {
         return item.originalname !== file.name
       }
       const re = new RegExp(file.name, 'g')
       console.log('removing... re.test(item.originalname): %o \n file.name: %o', re.test(item.originalname), file.name);
       return re.test(item.originalname)
     }) */
    console.log("removing ... arrScreenShotss: ", arrScreenShotss)
    this.setState({ arrScreenShots: arrScreenShotss })
    this.inputOnChange(arrScreenShotss)

    // this.resetImageEditor()
  }

  handlePostSucess(file, response) {
    const { arrScreenShots } = this.state;
    const tempArrScreenShots = Object.assign(arrScreenShots)
    const arrScreenShotss = tempArrScreenShots.filter(item => item.originalname !== file.name)
    arrScreenShotss.push({
      filename: response.filename,
      originalname: response.originalname,
      path: response.path
    })
    this.setState({ arrScreenShots: arrScreenShotss })
    this.inputOnChange(arrScreenShotss)
    console.log("handlePostSucess response %o \n this.state.arrScreenShots: %o \n arrScreenShots: %o", response, arrScreenShots, arrScreenShots)
  }

  handlePost(event) {
    console.log('call post... \n event:%o', event);
    this.dropzone.processQueue();
    event.preventDefault();
    event.stopPropagation();
  }

  /* handleSending(xhr, formData, param) {
    log('call handleSending... \n xhr: %o \nformData: %o  \nparam:%o', xhr, formData, param);
  } */

  // eslint-disable-next-line class-methods-use-this
  addImages(dropzone, screenShoots) {
    // const { screenShoots } = this.state;
    console.log("addImages screenShoots: %o, dropzone.files: %o", screenShoots, dropzone.files)
    const screenShootss = screenShoots
    const images = screenShootss !== '' ? screenShootss.split(',').filter(item => {
      let url = ''
      if (item.indexOf('http') === -1) {
        url = `${publicRuntimeConfig.IMAGE_DAS_SERVER}${item}`
      }
      else {
        url = item
      }
      const arrSplit = item.split('/')
      const name = arrSplit[arrSplit.length - 1]
      const size = 10332;
      return {
        url,
        name,
        size,
        path: item.path
      }
    }) : [];

    (images || []).forEach((i) => {
      // var name = path.basename(i.url);
      console.log("dsfdsfs: ", dropzone.files.filter(c => {
        console.log(c.status)
        return c.name === i.path && c.status === undefined
      }))

      dropzone.files.forEach((c, index) => {
        console.log(c.status)
        if (c.name !== i.path && c.status === undefined) {
          dropzone.removeFile(dropzone.files[index]);
        }
      })

      if (dropzone.files.filter(c => {
        console.log(c.status)
        return c.name === i.path && c.status === undefined
      }).length > 0) {

        const file = {
          url: i.url,
          name: i.name,
          size: i.size,
          path: i.path,
          width: 300,
          height: 300
        };
        /* var width = 100;
        var height = 100;
        var imageUrl = ImageService.resize(i.url, width, height); */
        const imageUrl = i.url
        dropzone.emit("addedfile", file);
        dropzone.emit("thumbnail", file, imageUrl);
        dropzone.files.push(file)
        dropzone.emit("complete", file);
        // eslint-disable-next-line operator-assignment
        dropzone.options.maxFiles = dropzone.options.maxFiles - 1;
      }
    });
  }

  preloadImages(dropzone) {
    const { screenShoots } = this.state;
    console.log("preloadImages screenShoots: %o, dropzone.files: %o", screenShoots, dropzone.files)
    const screenShootss = screenShoots
    const images = screenShootss !== '' ? screenShootss.split(',').map(item => {
      let url = ''
      if (item.indexOf('http') === -1) {
        url = `${publicRuntimeConfig.IMAGE_DAS_SERVER}${item}`
      }
      else {
        url = item
      }
      const arrSplit = item.split('/')
      const name = arrSplit[arrSplit.length - 1]
      const size = 10332
      return {
        url,
        name,
        path: item,
        size,
      }
    }) : [];

    (images || []).forEach((i) => {
      // var name = path.basename(i.url);
      const file = {
        url: i.url,
        name: i.name,
        size: i.size,
        path: i.path,
        width: 300,
        height: 300
      };
      /* var width = 100;
      var height = 100;
      var imageUrl = ImageService.resize(i.url, width, height); */
      const imageUrl = i.url
      dropzone.emit("addedfile", file);
      dropzone.emit("thumbnail", file, imageUrl);
      dropzone.files.push(file)
      dropzone.emit("complete", file);
      // eslint-disable-next-line operator-assignment
      dropzone.options.maxFiles = dropzone.options.maxFiles - 1;
    });
  }

  // eslint-disable-next-line react/no-typos
  componentWillUnMount() {
    this.dropzone = null
  }

  render() {
    const config = this.componentConfig;
    let { djsConfig } = this;
    const { key, helperText } = this.props;
    // const { editorId } = this;
    console.log("ImageUpload render this.props: ", this.props)
    const editorId = this.editorId;
    djsConfig = {
      ...djsConfig,
      transformFile: function (file, done) {
        console.log("transformFile: %o", file)
        const myDropZone = this;
        // const editor = document.getElementById("crop-container-transform")
        const containerEditor = document.getElementById('container-transform');

        containerEditor.style.display = "block";

        // const iiframe = iFrame && iFrame.contentWindow.document;
        const iiframe = document.getElementsByName(`myIframe-${editorId}`)[0];
        console.log("iiframe: ", editorId)
        if (iiframe) {
          iiframe.contentWindow.canv.fabric.clear();
          iiframe.contentWindow.canv.loadMainImage(URL.createObjectURL(file));
        } else {
          console.log("iiframe: ", null)
        }

        // setStyleConfirm(confirm);

        const fnTranform = function (blob) {
          myDropZone.createThumbnail(
            blob,
            myDropZone.options.thumbnailWidth,
            myDropZone.options.thumbnailHeight,
            myDropZone.options.thumbnailMethod,
            false,
            function (dataURL) {
              myDropZone.emit('thumbnail', file, dataURL);
              done(blob);
            }
          );
          containerEditor.style.display = "none";
        }
        // window.transformFile = fnTranform;
        iiframe.contentWindow.transformFile = fnTranform;
        // console.log("iiframe: ", iiframe)
      }
    }
    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
      init: dz => {
        this.dropzone = dz
        // eslint-disable-next-line no-param-reassign
        dz.autoDiscover = false;
        this.preloadImages(dz);
      },
      addedfile: this.handleFileAdded.bind(this),
      removedfile: this.handleFileRemoved.bind(this),
      success: this.handlePostSucess.bind(this),
      maxfilesexceeded: this.handleMaxFileExceeded.bind(this),
      // sending: this.handleSending.bind(this),
    }

    return (
      <React.Fragment>
        <div style={{ position: "relative" }}>
          <DropzoneComponent
            key={key}
            // key={this.imageUploadKey}
            config={config}
            eventHandlers={eventHandlers}
            djsConfig={djsConfig}
          />
          {!this.autoProcessQueue &&
            <Button
              type="primary"
              // eslint-disable-next-line react/jsx-no-bind
              onClick={this.handlePost.bind(this)}
              style={{ position: "absolute", bottom: '5px', right: '5px' }}
            >
              Tải lên
            </Button>
          }
        </div>
        {helperText &&
          <i
            style={{
              fontSize: '12px',
              transform: 'scale(0.83)',
              color: '#7c7a78'
            }}
          >
            {helperText}
          </i>
        }
        <div
          id="container-transform"
          // key={`container-transform-${editorId}`}
          className={styles.container}
        >
          <Row type="flex" justify="space-between">
            <Col span={24}>
              <div
                id="crop-container-transform"
                className={styles.imgContainer}
              // key={`crop-container-transform-${editorId}`}
              >
                <iframe
                  title="Chỉnh sửa ảnh"
                  // eslint-disable-next-line no-return-assign
                  ref={c => this.iFrame = c}
                  // name="myIframe"
                  name={`myIframe-${this.editorId}`}
                  // key={`myIframe-${editorId}`}
                  src={`${publicRuntimeConfig.CSS_URL}/_next/static/plugins/image-editor/index.html`}
                  width="100%"
                  height="600px"
                  frameBorder="0"
                />
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default ImageUpload;
