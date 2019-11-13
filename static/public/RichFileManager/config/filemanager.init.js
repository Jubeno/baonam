$('.fm-container').richFilemanager({
	// options for the plugin initialization step and callback functions, see:
	// https://github.com/servocoder/RichFilemanager/wiki/Configuration-options#plugin-parameters
	baseUrl: '.',
	callbacks: {
		beforeCreateImageUrl: function (resourceObject, url) {
			return url += 'modified=ImageUrl';
		},
		beforeCreatePreviewUrl: function (resourceObject, url) {
			return url += '&modified=previewUrl';
		},
		beforeSelectItem: function (resourceObject, url) {
			return url += '&modified=selectItem';
		},
		afterSelectItem: function (resourceObject, url) {
			function getUrlParam(paramName) {
				var reParam = new RegExp('(?:[\?&]|&)' + paramName + '=([^&]+)', 'i');
				var match = window.location.search.match(reParam);

				return (match && match.length > 1) ? match[1] : null;
			}
			function getUrlParam1(paramName, url){
				var reParam = new RegExp('(?:[\?&]|&)' + paramName + '=([^&]+)', 'i');
				var match = url.match(reParam);

				return (match && match.length > 1) ? match[1] : null;
			}
			// example on how to set url into target input and close bootstrap modal window
			// assumes that filemanager is opened via iframe, which is at the same domain as parent
			// https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
			// $('#target-input', parent.document).val(url);
			// $('#modal', parent.document).find('.close').click();
			var funcNum = getUrlParam('CKEditorFuncNum');
			let fileUrl = 'https://static.maxping.vn/api/c/images/';
			try {
				// fileUrl = window._env_.REACT_APP_IMAGE_SERVER;
				fileUrl = localStorage.getItem('image-api');
			} catch (error) {}
			
			if (new RegExp('userfiles').test(resourceObject.attributes.path)){
				fileUrl += resourceObject.attributes.path;
			}else{
				fileUrl += '/userfiles' + resourceObject.attributes.path;
			}
			// console.log("fileUrl: %o \n resourceObject:%o \n funcNum:%o", fileUrl, resourceObject, funcNum)
			parent.opener.CKEDITOR.tools.callFunction(funcNum, fileUrl);
			window.close();
		},
		beforeSetRequestParams: function (requestMethod, requestParams) {
			// add "jwt" parameter with "your_token" value to both GET and POST requests
			// if (requestMethod === 'POST' && $.isArray(requestParams)) { // form parameters
			// 	requestParams.push({ name: "jwt", value: "your_token" });
			// } else {
			// 	requestParams.jwt = 'your_token';
			// }
			return requestParams;
		},
		beforeSendRequest: function (requestMethod, requestParams) {
			// prevent all GET requests that lack "jwt" request parameter
			// if (requestMethod === 'GET' && requestParams.jwt === undefined) {
			// 	return false;
			// }
			return true;
		}
	}
});