/* eslint-disable prefer-destructuring */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable vars-on-top */
/* eslint-disable one-var */
/* eslint-disable no-var */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import moment from 'moment';
import cookie from 'js-cookie'
import GLOBAL_CONFIG from '@/utils/config';

// console.log("API_URL: ", API_URL)

function isWysiwygareaAvailable() {
  // If in development mode, then the wysiwygarea must be available.
  // Split REV into two strings so builder does not replace it :D.
  if (CKEDITOR.revision == ('%RE' + 'V%')) {
    return true;
  }

  return !!CKEDITOR.plugins.get('wysiwygarea');
}

class CKEditor extends Component {
  constructor(props) {
    super(props);
    const now = moment();
    const id = `${now.year()}_${now.month()}_${now.date()}_${now.hour()}_${now.minute()}_${now.second()}`
    this.elementName = `editor_${this.props.name || id}`;
    this.ckHeight = 300
    this.ckWidth = 'auto'
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    /* let { value } = this.props;
    value = (value === null || value === 'undefined') ? '' : value;
    const { onChange } = this.props;

    if(onChange)
      onChange(value); */

    const { value } = this.props;
    let fileManagerUrl = "/static/plugins/RichFileManager/index.html"
    if (process.env.NODE_ENV === 'production') {
      fileManagerUrl = "/_next/static/plugins/RichFileManager/index.html"
    }

    const configuration = {
      extraPlugins: 'image2',
      // imageUploadURL: `http://localhost:9007/uploader`,
      // dataParser: (data) => {
      //   console.log("url upload: ",data)
      // }
      filebrowserBrowseUrl: fileManagerUrl,
      filebrowserUploadUrl: `${GLOBAL_CONFIG.UPLOAD_IMAGE_CKEDITOR}`,
    };
    // CKEDITOR.replace(this.elementName, {
    //   customConfig: '/config.js'
    // });

    if (CKEDITOR.instances[this.elementName]) {
      CKEDITOR.instances[this.elementName].removeAllListeners(); // just in case
      CKEDITOR.remove(CKEDITOR.instances[this.elementName])
    }
    if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
      CKEDITOR.tools.enableHtml5Elements(document);

    // The trick to keep the editor in the sample quite small
    // unless user specified own height.
    CKEDITOR.config.height = this.props.height || this.ckHeight;
    CKEDITOR.config.width = this.props.width || this.CKEditor;

    var wysiwygareaAvailable = isWysiwygareaAvailable(),
      isBBCodeBuiltIn = !!CKEDITOR.plugins.get('bbcode');

    var editorElement = CKEDITOR.document.getById(this.elementName);

    if (isBBCodeBuiltIn) {
      editorElement.setHtml(value);
    }

    // Depending on the wysiwygare plugin availability initialize classic or inline editor.
    if (wysiwygareaAvailable) {
      CKEDITOR.replace(this.elementName, configuration);
    } else {
      editorElement.setAttribute('contenteditable', 'true');
      CKEDITOR.inline(this.elementName, configuration);
    }


    // eslint-disable-next-line func-names
    CKEDITOR.instances[this.elementName].on("change", function (evt) {
      // let data = CKEDITOR.instances[this.elementName].getData();
      const data = evt.editor.getData()
      this.handleChange(data);
    }.bind(this));

    CKEDITOR.instances[this.elementName].on('fileUploadRequest', function (evt) {
      var xhr = evt.data.fileLoader.xhr;

      const cookieToken = cookie.get("token");
      const token = cookieToken !== "undefined" ? cookieToken : null;

      const cookieEmail = cookie.get("auth_email");
      // const authEmail = localStorage.getItem('antd-pro-userName') !== "undefined" ? JSON.parse(localStorage.getItem('antd-pro-userName')) : null;
      const authEmail = cookieEmail !== 'undefined' ? cookieEmail : null;

      // xhr.setRequestHeader('Cache-Control', 'no-cache');
      xhr.setRequestHeader('X-Auth-Email', `${authEmail}`);
      xhr.setRequestHeader('X-Auth-Key', `${token}`);
    });

    /* CKEDITOR.on('dialogDefinition', function (event) {
      var editor = event.editor;
      var dialogDefinition = event.data.definition;
      var dialogName = event.data.name;

      var cleanUpFuncRef = CKEDITOR.tools.addFunction(function () {
        // Do the clean-up of filemanager here (called when an image was selected or cancel was clicked)
        $('#fm-iframe').remove();
        $("body").css("overflow-y", "scroll");
      });

      var tabCount = dialogDefinition.contents.length;
      for (var i = 0; i < tabCount; i++) {
        var dialogTab = dialogDefinition.contents[i];
        if (!(dialogTab && typeof dialogTab.get === 'function')) {
          continue;
        }

        var browseButton = dialogTab.get('browse');
        if (browseButton !== null) {
          browseButton.hidden = false;
          browseButton.onClick = function (dialog, i) {
            editor._.filebrowserSe = this;
            var iframe = $("<iframe id='fm-iframe' class='fm-modal'/>").attr({
              src: fileManagerUrl + // Change it to wherever  Filemanager is stored.
                '?CKEditorFuncNum=' + CKEDITOR.instances[event.editor.name]._.filebrowserFn +
                '&CKEditorCleanUpFuncNum=' + cleanUpFuncRef +
                '&langCode=en' +
                '&CKEditor=' + event.editor.name,
              style: 'position:absolute;top:30px;left:12%;width:80%;height:80%;z-index: 99999;'
            });

            $("body").append(iframe);
            $("body").css("overflow-y", "hidden");  // Get rid of possible scrollbars in containing document
          }
        }
      }
    }); // dialogDefinition */
  }

  handleChange(data) {
    const { onChange } = this.props;

    if (onChange)
      onChange(data);
  }

  render() {
    let { value } = this.props;
    const { style } = this.props;
    value = (value === null || value === undefined) ? '' : value;

    return (
      <div>
        {/* <span>{this.props.label}</span> */}
        <div
          id={this.elementName}
          dangerouslySetInnerHTML={{ __html: `${value}` }}
          style={style}
        />
      </div>
    )
  }
}

export default CKEditor