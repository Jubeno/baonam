/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable default-case */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable no-param-reassign */
import React from 'react';
import {
  Button, message, Row, Col, Tooltip, /* Input */
} from 'antd';
// import $ from 'jquery';
import DropzoneComponent from 'react-dropzone-component';
import compose from 'recompose/compose'
import cookie from 'js-cookie'
import Cropper from 'cropperjs';
import 'react-dropzone-component/styles/filepicker.css'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'dropzone/dist/min/dropzone.min.css'
import 'cropperjs/dist/cropper.css';
import getConfig from 'next/config'
// import { ChromePicker } from 'react-color';
import styles from './ImageUpload.less';

const { publicRuntimeConfig } = getConfig()
const log = (data, ...args) => console.log(data, ...args)

const setStyleConfirm = (confirm) => {
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
}

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
  state = {
    screenShoots: this.props.value,
    arrScreenShots: initArrImages(this.props.value)
  }

  constructor(props) {
    // console.log("constructor")
    super(props);
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
      // token,
      // authorization: `Bearer ${token}`,
    } : {}
    // console.log('fileList,',fileList)
    let aspectRatio = 1;
    let minCropBoxWidth = 200;
    let minCropBoxHeight = 200;
    if (ratio) {
      aspectRatio = ratio;
      if (minWidth) {
        minCropBoxWidth = minWidth;
        minCropBoxHeight = minWidth;
      }
    } else if (extractWidth && extractHeight) {
      let aspectRatioW;
      let aspectRatioH;
      if (typeof extractWidth === 'string') {
        aspectRatioW = extractWidth;
        minCropBoxWidth = extractWidth;
      } else {
        aspectRatioW = extractWidth[0];
        minCropBoxWidth = extractWidth[0];
      }
      if (typeof extractHeight === 'string') {
        aspectRatioH = extractHeight;
        minCropBoxHeight = extractHeight;
      } else {
        // eslint-disable-next-line prefer-destructuring
        aspectRatioH = extractHeight[0];
        minCropBoxHeight = extractHeight[0];
      }
      aspectRatio = imageRatio(aspectRatioW, aspectRatioH)
    }

    this.optionCropper = {
      aspectRatio,
      viewMode: 2,
      // preview: '.img-preview',
      minCropBoxWidth,
      minCropBoxHeight,
      ready: function (e) {
        console.log(e.type);
      },
      cropstart: function (e) {
        console.log(e.type, e.detail.action);
      },
      cropmove: function (e) {
        console.log(e.type, e.detail.action);
      },
      cropend: function (e) {
        console.log(e.type, e.detail.action);
      },
      crop: function () {
        // console.log(e.detail.x);
        // console.log(e.detail.y);
        // console.log(e.detail.width);
        // console.log(e.detail.height);
        // console.log(e.detail.rotate);
        // console.log(e.detail.scaleX);
        // console.log(e.detail.scaleY);
        // var data = e.detail;

        // console.log(e.type);
        // dataX.value = Math.round(data.x);
        // dataY.value = Math.round(data.y);
        // dataHeight.value = Math.round(data.height);
        // dataWidth.value = Math.round(data.width);
        // dataRotate.value = typeof data.rotate !== 'undefined' ? data.rotate : '';
        // dataScaleX.value = typeof data.scaleX !== 'undefined' ? data.scaleX : '';
        // dataScaleY.value = typeof data.scaleY !== 'undefined' ? data.scaleY : '';
      },
      zoom: function () {
        // console.log(e.type, e.detail.ratio);
      }
    };
    /* this.imageCropper = new Image();
    this.cropper = new Cropper(this.imageCropper, this.optionCropper); */
    this.autoProcessQueue = autoProcessQueue;
    this.cropper = null;
    this.imageCropper = null;
    let { cropper, imageCropper } = this;
    imageCropper = new Image();
    const { setCropper, optionCropper, setImageCropper } = this;
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
        log("file: %o", acceptFile);
        Object.keys(acceptFile).map(item => log(`${item}`))

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
      },
      transformFile: function (file, done) {
        // console.log("transformFile")
        const myDropZone = this;
        const editor = document.getElementById("crop-container-transform")
        const containerEditor = document.getElementById("container-transform");
        
        containerEditor.style.display = "block";

        // Create the confirm button
        const confirm = document.createElement('button');
      
        setStyleConfirm(confirm);
        // let $canvas = $("#canvasMove")
        confirm.addEventListener('click', function () {
          const canvas = cropper.getCroppedCanvas({
            width: 256,
            height: 256,
          });
          canvas.toBlob(function (blob) {
            imageCropper.src = URL.createObjectURL(blob);
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
          });
          containerEditor.style.display = "none";
          cropper.destroy();
          setCropper(null);
          setImageCropper(null)
        });

        editor.appendChild(confirm);
        imageCropper.src = URL.createObjectURL(file);
        editor.appendChild(imageCropper);
        cropper = new Cropper(imageCropper, {
          ...optionCropper,
        });
        setCropper(cropper);
        setImageCropper(imageCropper)
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
    const { value } = this.props
    if (
      nextProps.value !== value
    ) {
      this.setState({
        screenShoots: nextProps.value,
      });
    }
  }

  setCropper = (cropper) => {
    if (cropper === null) {
      this.cropper.destroy();
      this.cropper = null;
    } else this.cropper = cropper;
  }

  setImageCropper = (imageCropper) => {
    this.imageCropper = imageCropper;
  }

  cropButtonClick = (event) => {
    // console.log("cropButtonClick e: ", event)
    // Methods
    // actions.querySelector('.docs-buttons').onclick = function (event) {
    const { cropper } = this;
    const e = event || window.event;
    let target = e.target || e.srcElement;
    let result;
    let input;

    if (!cropper) {
      console.log("cropper null")
      return;
    }

    while (target !== this) {
      if (target.getAttribute('data-method')) {
        break;
      }

      target = target.parentNode;
    }

    if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
      return;
    }

    const data = {
      method: target.getAttribute('data-method'),
      target: target.getAttribute('data-target'),
      option: target.getAttribute('data-option') || undefined,
      secondOption: target.getAttribute('data-second-option') || undefined
    };

    // eslint-disable-next-line prefer-destructuring
    const cropped = cropper.cropped;

    if (data.method) {
      if (typeof data.target !== 'undefined') {
        input = document.querySelector(data.target);

        if (!target.hasAttribute('data-option') && data.target && input) {
          try {
            data.option = JSON.parse(input.value);
          } catch (e3) {
            console.log(e3.message);
          }
        }
      }

      switch (data.method) {
        case 'rotate':
          if (cropped && this.optionCropper.viewMode > 0) {
            cropper.clear();
          }

          break;

        /* case 'getCroppedCanvas':
          try {
            data.option = JSON.parse(data.option);
          } catch (e1) {
            console.log(e1.message);
          }

          if (uploadedImageType === 'image/jpeg') {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = '#fff';
          }

          break; */
      }

      result = cropper[data.method](data.option, data.secondOption);

      switch (data.method) {
        case 'rotate':
          if (cropped && this.optionCropper.viewMode > 0) {
            cropper.crop();
          }

          break;

        case 'scaleX':
        case 'scaleY':
          target.setAttribute('data-option', -data.option);
          break;

        /* case 'getCroppedCanvas':
          if (result) {
            // Bootstrap's Modal
            $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

            if (!download.disabled) {
              download.download = uploadedImageName;
              download.href = result.toDataURL(uploadedImageType);
            }
          }

          break;

        case 'destroy':
          cropper = null;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            image.src = originalImageURL;
          }

          break; */
      }

      if (typeof result === 'object' && result !== cropper && input) {
        try {
          input.value = JSON.stringify(result);
        } catch (e2) {
          console.log(e2.message);
        }
      }
    }
  }

  inputOnChange = (value) => {
    const { onChange } = this.props;
    const valueInput = value.map(item => item.path).join(',')
    onChange(valueInput)
    this.setState({ screenShoots: valueInput })
  }

  handleFileAdded(file) {
    log('adding...%o \n files....%o', file, this.dropzone.files);
    const { maxFiles } = this.props
    if (maxFiles === (this.dropzone.files.length - 1)) {
      this.dropzone.removeFile(this.dropzone.files[0]);
    }
  }

  handleMaxFileExceeded(file) {
    this.dropzone.removeFile(file);
  }

  handleFileRemoved(file) {
    const { arrScreenShots } = this.state;
    log('removing...', file);
    const tempArrScreenShots = Object.assign(arrScreenShots)
    const arrScreenShotss = tempArrScreenShots.filter(item => item.originalname !== file.name)
    this.setState({ arrScreenShots: arrScreenShotss })
    this.inputOnChange(arrScreenShotss)
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
    log("handlePostSucess response %o \n this.state.arrScreenShots: %o \n arrScreenShots: %o", response, arrScreenShots, arrScreenShots)
  }

  handlePost(event) {
    log('call post... \n event:%o', event);
    this.dropzone.processQueue();
    event.preventDefault();
    event.stopPropagation();
  }

  /* handleSending(xhr, formData, param) {
    log('call handleSending... \n xhr: %o \nformData: %o  \nparam:%o', xhr, formData, param);
  } */

  preloadImages(dropzone) {
    const { screenShoots } = this.state;
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
        size,
      }
    }) : [];

    (images || []).forEach((i) => {
      // var name = path.basename(i.url);
      const file = {
        url: i.url,
        name: i.name,
        size: i.size,
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
    const { djsConfig } = this;
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
    const { key, helperText } = this.props;

    const styleimg = {
      width: '12.53%'
    }
    const styleimg12 = {
      width: '12.43%'
    }
    const gutter = { xs: 4, sm: 4, md: 4 };
    const span = 3;
    
    return (
      <React.Fragment>
        <div style={{ position: "relative" }}>
          <DropzoneComponent
            key={key}
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
        <div id="container-transform" className={styles.container}>
          <Row type="flex" justify="space-between">
            <Col span={24}>
              <div id="crop-container-transform" className={styles.imgContainer} />
            </Col>
          </Row>
          <Row type="flex" justify="start" gutter={gutter}>
            <Col span={span} style={styleimg} className="docs-buttons" onClick={this.cropButtonClick}>
              <Button.Group>
                <Button data-method="setDragMode" data-option="move" title="Move">
                  <Tooltip title="cropper.setDragMode(&quot;move&quot;)" data-original-title="cropper.setDragMode(&quot;move&quot;)">
                    <span className="fa fa-arrows-alt" />
                  </Tooltip>
                </Button>
                <Button data-method="setDragMode" data-option="crop" title="Crop">
                  <Tooltip title="cropper.setDragMode(&quot;crop&quot;)" data-original-title="cropper.setDragMode(&quot;crop&quot;)">
                    <span className="fa fa-crop-alt" />
                  </Tooltip>
                </Button>
              </Button.Group>
            </Col>
            <Col span={span} style={styleimg} className="docs-buttons" onClick={this.cropButtonClick}>
              <Button.Group>
                <Button data-method="zoom" data-option="0.1" title="Zoom In">
                  <Tooltip title="cropper.zoom(0.1)" data-original-title="cropper.zoom(0.1)">
                    <span className="fa fa-search-plus" />
                  </Tooltip>
                </Button>
                <Button data-method="zoom" data-option="-0.1" title="Zoom Out">
                  <Tooltip title="cropper.zoom(-0.1)" data-original-title="cropper.zoom(-0.1)">
                    <span className="fa fa-search-minus" />
                  </Tooltip>
                </Button>
              </Button.Group>
            </Col>
            <Col span={span} style={styleimg12} className="docs-buttons" onClick={this.cropButtonClick}>
              <Button.Group>
                <Button data-method="move" data-option={-10} data-second-option={0} title="Move Left">
                  <Tooltip title="cropper.move(-10, 0)" data-original-title="cropper.move(-10, 0)">
                    <span className="fa fa-arrow-left" />
                  </Tooltip>
                </Button>
                <Button data-method="move" data-option={10} data-second-option={0} title="Move Right">
                  <Tooltip title="cropper.move(10, 0)" data-original-title="cropper.move(10, 0)">
                    <span className="fa fa-arrow-right" />
                  </Tooltip>
                </Button>
              </Button.Group>
            </Col>
            <Col span={span} style={styleimg12} className="docs-buttons" onClick={this.cropButtonClick}>
              <Button.Group>
                <Button data-method="move" data-option={0} data-second-option={-10} title="Move Up">
                  <Tooltip title="cropper.move(0, -10)" data-original-title="cropper.move(0, -10)">
                    <span className="fa fa-arrow-up" />
                  </Tooltip>
                </Button>
                <Button data-method="move" data-option={0} data-second-option={10} title="Move Down">
                  <Tooltip title="cropper.move(0, 10)" data-original-title="cropper.move(0, 10)">
                    <span className="fa fa-arrow-down" />
                  </Tooltip>
                </Button>
              </Button.Group>
            </Col>
            <Col span={span} style={styleimg} className="docs-buttons" onClick={this.cropButtonClick}>
              <Button.Group>
                <Button data-method="rotate" data-option={-45} title="Rotate Left">
                  <Tooltip title="cropper.rotate(-45)" data-original-title="cropper.rotate(-45)">
                    <span className="fa fa-undo-alt" />
                  </Tooltip>
                </Button>
                <Button data-method="rotate" data-option={45} title="Rotate Right">
                  <Tooltip title="cropper.rotate(45)" data-original-title="cropper.rotate(45)">
                    <span className="fa fa-redo-alt" />
                  </Tooltip>
                </Button>
              </Button.Group>
            </Col>
            <Col span={span} style={styleimg12} className="docs-buttons" onClick={this.cropButtonClick}>
              <Button.Group>
                <Button data-method="scaleX" data-option={-1} title="Flip Horizontal">
                  <Tooltip title="cropper.scaleX(-1)" data-original-title="cropper.scaleX(-1)">
                    <span className="fa fa-arrows-alt-h" />
                  </Tooltip>
                </Button>
                <Button data-method="scaleY" data-option={-1} title="Flip Vertical">
                  <Tooltip title="cropper.scaleY(-1)" data-original-title="cropper.scaleY(-1)">
                    <span className="fa fa-arrows-alt-v" />
                  </Tooltip>
                </Button>
              </Button.Group>
            </Col>
            <Col span={span} style={styleimg12} className="docs-buttons" onClick={this.cropButtonClick}>
              <Button.Group>
                <Button data-method="crop" title="Crop">
                  <Tooltip title="cropper.crop()" data-original-title="cropper.crop()">
                    <span className="fa fa-check" />
                  </Tooltip>
                </Button>
                <Button data-method="clear" title="Clear">
                  <Tooltip title="cropper.clear()" data-original-title="cropper.clear()">
                    <span className="fa fa-times" />
                  </Tooltip>
                </Button>
              </Button.Group>
            </Col>
            <Col span={span} style={styleimg12} className="docs-buttons" onClick={this.cropButtonClick}>
              <Button.Group>
                <Button data-method="disable" title="Disable">
                  <Tooltip title="cropper.disable()" data-original-title="cropper.disable()">
                    <span className="fa fa-lock" />
                  </Tooltip>
                </Button>
                <Button data-method="enable" title="Enable">
                  <Tooltip title="cropper.enable()" data-original-title="cropper.enable()">
                    <span className="fa fa-unlock" />
                  </Tooltip>
                </Button>
              </Button.Group>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default compose(
)(ImageUpload)
