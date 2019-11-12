//contructor
var windowWidth = window.innerWidth,
    windowHeight = window.innerHeight,
    mobile = false,
    desktop = true,
    opera12 = false,
    android = false,
    android4 = false,
    apple = false,
    loaded = false,
    ie = false,
    scrollPosition = 0,
    captureTouchEvent = true,
    menuIsOpen = false,
    ajaxEmail = '',
    VIDEO_WRAPPER = ".header_baner",
    VIDEO = ".js-video",
    BANNER_LIST = '.js-banner-list',
    BANNER_ITEM = ".js-banner-list__item",
    BANNER_CONTROLS_WRAPPER = ".js-banner-controls-wrapper",
    servicesSliderIsInit = false,
    isFormBusy = false,
    ajaxLinkSave = "",
    ajaxLinkStatus = "",
    formSubmitLabel = "",
    formProgressLabel = "",
    formRepeatLabel = "",
    nameLabel = "",
    textLabel = "",
    FORM_ERROR_CLASS = "form-error",
    FORM_PROGRESS_CLASS = "form-progress",
    FORM_SUCCESS_CLASS = "form-success",
    popupIsOpen = false,
    locationsIsOpen = false,
    path = '',
    YEAR = ".js-year";

function isMobile() {
    var check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

function isTablet() {
    return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
}

function isApple() {
    return (/iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase()));
}

function detectIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }
    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }
    return false;
}

function isAndroid() {
    return (/android/i.test(navigator.userAgent.toLowerCase()));
}

function isOldAndroid(android) {
    if (android) {
        var ua = navigator.userAgent;
        if (ua.indexOf("Android") >= 0) {
            var androidversion = parseFloat(ua.slice(ua.indexOf("Android") + 8));
            if (androidversion < 4.4) {
                return true;
            }
        }
    }
    return false;
}

function isOpera12() {
    if (navigator.userAgent.indexOf('Opera') !== -1 && navigator.userAgent.indexOf('OPR/') === -1) {
        var version = navigator.userAgent.substring(navigator.userAgent.indexOf('Version/') + 8);
        if (version.indexOf('12.') !== false) return true;
        return false;
    }
    return false;
}
mobile = isMobile();
apple = isApple();
android = isAndroid();
android4 = isOldAndroid(android);
opera12 = isOpera12();
ie = detectIE();
var keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener)
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault;
    window.onmousewheel = document.onmousewheel = preventDefault;
    window.ontouchmove = preventDefault;
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
// end contructor

var ServicesPopupTimeline = new TimelineMax(),
    careerPopupTimeline = new TimelineMax(),
    viewLocationsTimeline = new TimelineMax(),
    initCarusel_trigger = false;
$(document).ready(function () {
    
    // utm_campaign = utm_medium = utm_term = utm_content = utm_source = '';
    /* var search = window.location.search.substr(1),
        c = '';
    var params = [];
    search.split('&').forEach(function (item) {
        var item_c = item.split('_');
        if (item_c[0] == 'utm') {
            params.push(item);
        }
    });
    if (params.length > 0) {
        $.cookie('utm_params', params.join('&'), {
            expires: 365,
            path: '/'
        });
        c = params.join('&');
    }
    if (($.cookie('utm_params') != '' && $.cookie('utm_params') != undefined) || c != '') {
        if (c != '') {
            utms = c;
        } else {
            utms = $.cookie('utm_params');
        }
        urls = [];
        utms_t = utms.split('&');
        $.each(utms_t, function (k, v) {
            v = v.split('=');
            key = v[0];
            value = v[1];
            if (key == 'utm_campaign') {
                utm_campaign = value;
                $('.utm_campaign').val(value);
            }
            if (key == 'utm_medium') {
                utm_medium = value;
                $('.utm_medium').val(value);
            }
            if (key == 'utm_term') {
                utm_term = value;
                $('.utm_term').val(value);
            }
            if (key == 'utm_content') {
                utm_content = value;
                $('.utm_content').val(value);
            }
            if (key == 'utm_source') {
                utm_source = value;
                $('.utm_source').val(value);
            }
        });
        $("a").each(function () {
            value = $(this).attr('href');
            if (value != undefined) {
                item_c = value.split('control.gcorelabs.com');
                if (item_c[0] == 'https://' && utms != undefined) {
                    if (item_c[1].substr(0, 1) == '/') {
                        item_c[1].slice(1)
                    }
                    $(this).attr('href', item_c[0] + 'control.gcorelabs.com/?' + utms + item_c[1]);
                }
            }
        });
    } */
    /* $('.open_intercom').click(function (e) {
        Intercom('show');
        return false;
    });
    $('.show_cdn_demo').click(function () {
        $('.demo_cdn_video .iframe').show();
        $('body').css('overflow', 'hidden');
        $.post('/ajax/cdn_demo_auth.php', {}, function (data) {
            data = jQuery.parseJSON(data);
            if (data.t == 1) {
                var url = "https://control.gcorelabs.com/#/invite?token=" + data.token;
                $('#theFrame').attr('src', url);
                $('.demo_cdn_video .iframe').show();
            }
        });
        return false;
    });
    $('.demo_cdn_video .iframe .iframe-close').click(function () {
        $('.demo_cdn_video .iframe').hide();
        $('body').css('overflow', 'auto');
    });
    redirect();
    // DetectScroll();
    $('.drop_center').each(function () {
        var width_main_menu = $(this).width();
        var width_text_section = $(this).width();
        var width_drop_menu = $(this).find('ul').width();
        var padding_lf_section = $(this).find('.link_section').css('padding-left').replace('px', '');
        var padding_rg_section = $(this).find('.link_section').css('padding-right').replace('px', '');
        var padding_main_el = $(this).find('.link_section').css('padding-left').replace('px', '') - $(this).find('.link_section').css('padding-right').replace('px', '');
        if (padding_main_el < 0 && padding_main_el != 0) {
            padding_main_el = padding_main_el * (-1);
        }
        var position_left = (width_main_menu - width_drop_menu) / 2 - padding_main_el;
        if (position_left != false || position_left != 0)
            $(this).find('ul').css('left', position_left);
    }); */
    // $(".p_mask").inputmask("phone", {});
    /* if (window.location.hash) {
        var url_page = window.location.href.split('/');
        var position_hash = window.location.href.indexOf('#');
        var position_utm = window.location.href.indexOf('?');
        var cdn_hash = '';
        var def_url = '';
        if (position_utm > -1) {
            if (position_hash < position_utm) {
                def_url = window.location.href.substring(0, position_hash);
                cdn_hash = window.location.href.substring(position_hash, position_utm);
            } else {
                def_url = window.location.href.substring(0, position_utm);
                cdn_hash = window.location.href.substring(position_hash);
            }
        } else {
            cdn_hash = window.location.hash;
        }
        var cdnPage_link = '';
        if (position_hash > 0) {
            history.pushState('', '', def_url)
            cdnPage_link = def_url + cdn_hash;
        }
        setTimeout(function () {
            scrollToBlock(cdnPage_link);
            history.pushState('', '', cdnPage_link);
        }, 1);
    } */
    /* var r = getRandomInt(1, 4);
    $('.happy_clients .hp_clients_slider.hp_clients_default .one_slide_client.slide_' + r).show();
    r = getRandomInt(1, $('.sticky-bar').length + 1);
    $('.sticky_bar .header_top_banner.sticky-bar.sticky-bar-' + r).css('display', 'table-cell');
    $('.sticky_bar .header_top_banner.sticky-bar.sticky-bar-' + r + ' .sticky-bar-pop').css('display', 'table-cell');
    var lang = window.navigator.language || navigator.userLanguage,
        lang_site = $('#lang').val(),
        translated = document.head.querySelector("[property=translated]").content,
        link_params = window.location.pathname.split('/');
    if ((((lang == "ru" || lang == "ru-RU") && lang_site == "en") || (lang != "ru" && lang != "ru-RU" && lang_site == "ru")) && translated == 1 && ($.cookie('moved') == '' || $.cookie('moved') == undefined)) {
        if (lang_site == 'ru' && lang != "ru" && lang != "ru-RU") {
            link_params.shift();
            link_params.shift();
        } else {
            link_params[0] = 'ru';
        }
        var url = window.location.protocol + '//' + window.location.host + '/' + link_params.join('/');
        goto_url(url);
    } */
    /* $.cookie('moved', 1, {
        expires: 365,
        path: '/'
    }); */
    /* $(".services-popup-close-link").on("click", function () {
        closeServicesPopup();
    }); */
    /* var getSelectedText = function () {
        var text = '';
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection) {
            text = document.selection.createRange().text;
        }
        return text;
    }
    $(document).mouseup(function (e) {
        if (popupIsOpen === true && desktop === true && windowWidth >= 1200) {
            if ($(".career-popup-list-wrapper").has(e.target).length === 0) {
                if (!$(".services-popup-list-wrapper").is(e.target) && $(".services-popup-list-wrapper").has(e.target).length === 0) {
                    var text = getSelectedText();
                    if (text == '' || text == false) {
                        closeServicesPopup();
                    }
                }
            }
        }
    });
    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            if (popupIsOpen === true && desktop === true && windowWidth >= 1200) {
                if (!$(".services-popup-list-wrapper").is(e.target) && $(".services-popup-list-wrapper").has(e.target).length === 0) {
                    closeServicesPopup();
                }
            }
        }
    }); */
    /* $(".cdn_page .one_service").on("click", function () {
        openServicesPopup(this);
    });
    $(".one_service_m").on("click", function () {
        var key = $('#register .host_k').val();
        $('.hide_choice').attr('data-choice', 'hosting_login');
        $('#register .cdn_only').hide();
        $('#auth .cdn_only').hide();
        $('#register .host_only').show();
        $('#recaptcha').html("<script src='https://www.google.com/recaptcha/api.js?render=" + key + "'></script><script>setTimeout(function(){grecaptcha.ready(function() {grecaptcha.execute('" + key + "', {action: 'homepage'}).then(function(token) {$('.token').val(token);});});}, 2000);</script>")
        $('#auth .reg_popup_link').show();
        openServicesPopup(this);
    }); */
    /* $(".menu_login a").on("click", function () {
        if ($('.mobile_menu').hasClass('open-menu')) {
            closeMenu();
        }
        openServicesPopup(this);
    }); */
    /* $('.ico_log_service').click(function (e) {
        e.preventDefault();
        var select_autoriz = $(this).attr('data-choice');
        if (select_autoriz != '' && select_autoriz != null && select_autoriz != false) {
            $('.hide_choice').attr('data-choice', select_autoriz);
            if (select_autoriz == 'hosting_login') {
                var key = $('#register .host_k').val();
                $('#register .cdn_only').hide();
                $('#auth .cdn_only').hide();
                $('#register .host_only').show();
                $('#recaptcha').html("<script src='https://www.google.com/recaptcha/api.js?render=" + key + "'></script><script>setTimeout(function(){grecaptcha.ready(function() {grecaptcha.execute('" + key + "', {action: 'homepage'}).then(function(token) {$('.token').val(token);});});}, 2000);</script>")
            } else {
                var lang = $('#lang').val();
                if (lang != 'ru') lang = 'en';
                var key = $('#register .cdn_k').val();
                $('#register .cdn_only').show();
                $('#auth .cdn_only').show();
                $('#register .host_only').hide();
                $('#recaptcha').html("<div class=\"g-recaptcha\" data-sitekey=\"" + key + "\" data-theme=\"light\"></div><script src='https://www.google.com/recaptcha/api.js?hl=" + lang + "' async defer></script>");
            }
            closeServicesPopup();
            setTimeout(open_pop, 700, this);
        }
    });
    $(".open_login_pop").on("click", function (e) {
        e.preventDefault();
        $('#register .cdn_only').show();
        $('#register .host_only').hide();
        $('.hide_choice').attr('data-choice', $(this).attr('data-choice'));
        var select_autoriz = $('.hide_choice').attr('data-choice');
        if (select_autoriz != '' && select_autoriz != null && select_autoriz != false) {
            if (select_autoriz == 'hosting_login') {
                var key = $('#register .host_k').val();
                $('#register .cdn_only').hide();
                $('#auth .cdn_only').hide();
                $('#register .host_only').show();
                $('#recaptcha').html("<script src='https://www.google.com/recaptcha/api.js?render=" + key + "'></script><script>setTimeout(function(){grecaptcha.ready(function() {grecaptcha.execute('" + key + "', {action: 'homepage'}).then(function(token) {$('.token').val(token);});});}, 2000);</script>")
            } else {
                var lang = $('#lang').val();
                if (lang != 'ru') lang = 'en';
                var key = $('#register .cdn_k').val();
                $('#register .cdn_only').show();
                $('#auth .cdn_only').show();
                $('#register .host_only').hide();
                $('#recaptcha').html("<div class=\"g-recaptcha\" data-sitekey=\"" + key + "\" data-theme=\"light\"></div><script src='https://www.google.com/recaptcha/api.js?hl=" + lang + "' async defer></script>");
            }
            closeServicesPopup();
            setTimeout(open_pop, 700, this);
        }
    });
    $(".recover_popup, .create_ac_lnk").on("click", function (e) {
        e.preventDefault();
        closeServicesPopup();
        setTimeout(open_pop, 700, this);
    }); */
    // client_carousel();
    /* if ($(window).width() < 1200) {
        $('#mini_clients_slider').addClass('carouselka');
        client_carousel();
    }
    $(window).resize(function () {
        if ($('#mini_clients_slider').hasClass('home')) {
            if ($(window).width() < 1200) {
                $('#mini_clients_slider').addClass('carouselka');
            } else {
                $('#mini_clients_slider.carouselka').owlCarousel('destroy');
                $('#mini_clients_slider').removeClass('carouselka');
            }
            client_carousel();
        }
    });
    $(window).resize(function () {
        if ($(window).width() < 1200 && !initCarusel_trigger) {
            sliderClients();
        }
    });
    if ($(window).width() < 1200) {
        sliderClients();
    } */
    /* if ($('.happy_clients').hasClass('active_sl_def')) {
        sliderClients();
    }
    
    $('.develop_page.footer_form .send_btn').click(function () {
        pre_send_send_msg_with_file('dev');
        return false;
    });
    $('.managed_page.footer_form .send_btn').click(function () {
        pre_send_send_msg_with_file('it');
        return false;
    });
    $('.global_page.footer_form .send_btn').click(function () {
        var stop = 0,
            c = parseInt($.cookie('contact_from')),
            l = $('#lang'),
            f = $('#contact #f'),
            n = $('#contact #contact_name'),
            p = $('#contact #contact_phone'),
            e = $('#contact #contact_email'),
            m = $('#contact #contact_message'),
            c_cdn = $('#contact #contact-cdn'),
            c_host = $('#contact #contact-host'),
            c_media = $('#contact #contact-media'),
            c_security = $('#contact #contact-security');
        if (c_cdn.is(':checked')) {
            c1 = 1;
        } else c1 = 0;
        if (c_host.is(':checked')) {
            c2 = 1;
        } else c2 = 0;
        if (c_media.is(':checked')) {
            c3 = 1;
        } else c3 = 0;
        if (c_security.is(':checked')) {
            c4 = 1;
        } else c4 = 0;
        if (n.val().trim() != '') {
            n.css({
                'border': '1px solid #569b44'
            });
        } else {
            n.css({
                'border': '1px solid #ff5700'
            });
            stop = 1;
        }
        if (e.val().trim() != '') {
            var pattern = /^([a-zA-Z0-9+_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
            if (pattern.test(e.val())) {
                e.css({
                    'border': '1px solid #569b44'
                });
            } else {
                e.css({
                    'border': '1px solid #ff5700'
                });
                stop = 1;
            }
        } else {
            e.css({
                'border': '1px solid #ff5700'
            });
            stop = 1;
        }
        if (stop == 0) {
            if (c > 1) {
                show_captcha(l);
            } else {
                send_msg(l, n, e, m, p, f, c1, c2, c3, c4);
            }
        }
        return false;
    });
    $('.regcdn').click(function (e) {
        e.preventDefault();
        $('.hide_choice').attr('data-choice', 'cdn_login');
        var obj = '<div data-popup="create_account"></div>';
        var lang = $('#lang').val();
        if (lang != 'ru') lang = 'en';
        var key = $('#register .cdn_k').val();
        $('#register .cdn_only').show();
        $('#register .host_only').hide();
        $('#recaptcha').html("<div class=\"g-recaptcha\" data-sitekey=\"" + key + "\" data-theme=\"light\"></div><script src='https://www.google.com/recaptcha/api.js?hl=" + lang + "' async defer></script>");
        setTimeout(open_pop, 700, obj);
    });
    var cookieEnabled = navigator.cookieEnabled;
    if (!navigator.cookieEnabled) {
        $('body').addClass('cookies_disable');
    }
    if ($.cookie('confirmed_cookie') != 1) {
        $('.confirmed_cookie').show();
    }
    $('.confirmed_cookie .close').click(function () {
        $('.confirmed_cookie').hide();
        $.cookie('confirmed_cookie', 1, {
            expires: 30,
            path: '/'
        });
    });
    if (getAllUrlParams().from != '') {
        $.cookie('hosting_refer', '');
        $.cookie('hosting_refer', getAllUrlParams().from, {
            expires: 1,
            path: '/'
        });
    }
    $(".js_anchor_link_close").on("click", function (e) {
        closeServicesPopup();
        var v = $(this);
        setTimeout(function () {
            linkToScroll(v, e);
        }, 500);
    });
    $(".js_anchor_link").on("click", function (e) {
        linkToScroll(this, e);
    }); */
    // $('.drop_menu_mob > a').on('click', function (el) {
    //     el.preventDefault();
    //     if (!$(this).parent().hasClass('open_menu')) {
    //         $('.drop_menu_mob').removeClass('open_menu');
    //         $(this).parent().addClass('open_menu');
    //     } else {
    //         $(this).parent().removeClass('open_menu');
    //     }
    // });
    // $('.footer_menu .link_mobile').on('click', function (el) {
    //     el.preventDefault();
    //     if ($(window).width() < 768) {
    //         if (!$(this).parent().hasClass('open_menu')) {
    //             $('.footer_menu li').removeClass('open_menu');
    //             $(this).parent().addClass('open_menu');
    //         } else {
    //             $(this).parent().removeClass('open_menu');
    //         }
    //     }
    // });
    // $(".js-header-menu-hamburger").on("click", function () {
    //     openMenu();
    //     closeMenu();
    //     if (locationsIsOpen === true) {
    //         closeLocations();
    //     }
    // });
    /*if ($(".view-locations-wrapper").length > 0) {
        $(".view-locations-wrapper").mCustomScrollbar({
            axis: "y",
            theme: "orange-thin",
            live: true,
            advanced: {
                updateOnContentResize: true
            },
            callbacks: {
                onInit: function () {}
            },
            mouseWheel: {
                enable: true,
                deltaFactor: 50
            }
        });
    }
    /*$('.go_to_cdn_demo').click(function () {
        auth_cdn_demo();
        return false;
    });
    $('#register .button_orange').click(function () {
        var p = $('#auth .hide_choice').attr('data-choice');
        if (p == 'hosting_login') {
            p = 'hosting';
        } else {
            p = 'cdn';
        }
        register(p);
        return false;
    });
    */
    // LOGIN AUTH
    /* $('#auth .button_orange').click(function () {
        var p = $('#auth .hide_choice').attr('data-choice');
        if (p == 'hosting_login') {
            p = 'hosting';
        } else {
            p = 'cdn';
        }
        auth(p);
        return false;
    }); */
    /* $('#recovery .button_orange').click(function () {
        var p = $('#recovery .hide_choice').attr('data-choice');
        if (p == 'hosting_login') {
            p = 'hosting';
        } else {
            p = 'cdn';
        }
        recovery_password(p)
        return false;
    }); */
});

function pre_send_send_msg_with_file(from_page) {
    var stop = 0,
        l = $('#lang'),
        n = $('#contact #contact_name'),
        p = $('#contact #contact_phone'),
        e = $('#contact #contact_email'),
        m = $('#contact #contact_message'),
        file = $('#contact #filename');
    if (n.val().trim() != '') {
        n.css({
            'border': '1px solid #569b44'
        });
    } else {
        n.css({
            'border': '1px solid #ff5700'
        });
        stop = 1;
    }
    if (e.val().trim() != '') {
        var pattern = /^([a-zA-Z0-9+_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
        if (pattern.test(e.val())) {
            e.css({
                'border': '1px solid #569b44'
            });
        } else {
            e.css({
                'border': '1px solid #ff5700'
            });
            stop = 1;
        }
    } else {
        e.css({
            'border': '1px solid #ff5700'
        });
        stop = 1;
    }
    if (stop == 0) {
        send_msg_with_file(l, n, e, m, p, file, from_page);
    }
}

function sliderClients() {
    var slider_happycl = $('#hp_clients_sl');
    slider_happycl.on('initialize.owl.carousel', function () {});
    slider_happycl.owlCarousel({
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: false,
        nav: true,
        navText: ["<svg viewBox=\"0 0 50 50\" class=\"control_link_svg\"><path d=\"M10.707,9.426 L1.707,18.426 L0.293,17.012 L8.086,9.219 L0.293,1.426 L1.707,0.012 L10.707,9.012 L10.500,9.219 L10.707,9.426 ZM-251.707,18.426 L-260.707,9.426 L-260.500,9.219 L-260.707,9.012 L-251.707,0.012 L-250.293,1.426 L-258.086,9.219 L-250.293,17.012 L-251.707,18.426 Z\" transform=\"translate(19.64 15.78)\" class=\"\"/></svg>", "<svg viewBox=\"0 0 50 50\" class=\"control_link_svg\"><path d=\"M10.707,9.426 L1.707,18.426 L0.293,17.012 L8.086,9.219 L0.293,1.426 L1.707,0.012 L10.707,9.012 L10.500,9.219 L10.707,9.426 ZM-251.707,18.426 L-260.707,9.426 L-260.500,9.219 L-260.707,9.012 L-251.707,0.012 L-250.293,1.426 L-258.086,9.219 L-250.293,17.012 L-251.707,18.426 Z\" transform=\"translate(19.64 15.78)\" class=\"\"/></svg>"],
        autoplay: true,
        navContainer: '#happy_clients_nav',
        autoplayTimeout: 2500,
        autoplaySpeed: 1000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 1
            },
            800: {
                items: 2,
                autoplay: false
            },
            1200: {
                loop: false,
                nav: false,
                autoplay: false,
                items: 3
            }
        }
    });
    initCarusel_trigger = true;
}

function client_carousel() {
    var slider_minhap = $('#mini_clients_slider.carouselka');
    slider_minhap.owlCarousel({
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: false,
        nav: true,
        navText: ["<svg viewBox=\"0 0 50 50\" class=\"control_link_svg\"><path d=\"M10.707,9.426 L1.707,18.426 L0.293,17.012 L8.086,9.219 L0.293,1.426 L1.707,0.012 L10.707,9.012 L10.500,9.219 L10.707,9.426 ZM-251.707,18.426 L-260.707,9.426 L-260.500,9.219 L-260.707,9.012 L-251.707,0.012 L-250.293,1.426 L-258.086,9.219 L-250.293,17.012 L-251.707,18.426 Z\" transform=\"translate(19.64 15.78)\" class=\"\"/></svg>", "<svg viewBox=\"0 0 50 50\" class=\"control_link_svg\"><path d=\"M10.707,9.426 L1.707,18.426 L0.293,17.012 L8.086,9.219 L0.293,1.426 L1.707,0.012 L10.707,9.012 L10.500,9.219 L10.707,9.426 ZM-251.707,18.426 L-260.707,9.426 L-260.500,9.219 L-260.707,9.012 L-251.707,0.012 L-250.293,1.426 L-258.086,9.219 L-250.293,17.012 L-251.707,18.426 Z\" transform=\"translate(19.64 15.78)\" class=\"\"/></svg>"],
        autoplay: true,
        navContainer: '#mini_clients_nav',
        autoplayTimeout: 2500,
        autoplaySpeed: 1000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            350: {
                items: 1,
            },
            520: {
                items: 2,
            },
            690: {
                items: 4,
            },
            860: {
                items: 5,
            },
            1030: {
                items: 6,
            },
            1200: {
                autoplay: false,
                items: 7,
            }
        }
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function scrollToBlock(url) {
    var link = url.split('/');
    link = link[link.length - 1];
    var x = $('.sticky_bar').height() + $('.header_bl').height();
    $('html,body').animate({
        scrollTop: $(link).offset().top - x
    }, 1);
}

function linkToScroll(obj, event) {
    event.preventDefault();
    var link = $(obj).attr("href").split('/');
    var url_link = $(obj).attr("href");
    var indexHash_link = url_link.indexOf('#');
    var url_page = window.location.href;
    var indexHash_url = url_page.indexOf('#');
    if (url_page.substring(0, indexHash_url) != url_link.substring(0, indexHash_link)) {
        $(location).attr('href', url_link);
        return;
    }
    link = link[link.length - 1];
    var x = $('.sticky_bar').height() + $('.header_bl').height();
    $('html,body').animate({
        scrollTop: $(link).offset().top - x
    }, 500, function () {
        if (menuIsOpen === true) {
            closeMenu();
        }
    });
}

function openMenu() {
    if (menuIsOpen === false) {
        $(".header_bl, .mobile_menu").addClass("open-menu");
        $('body').css('overflow', 'hidden');
        setTimeout(function () {
            menuIsOpen = true;
        }, 600)
    }
}

function closeMenu() {
    if (menuIsOpen === true) {
        $(".header_bl, .mobile_menu").removeClass("open-menu");
        $('body').css('overflow', 'inherit');
        setTimeout(function () {
            menuIsOpen = false;
        }, 600)
    }
}

function register(p) {
    var error = '',
        lang = $('#popup_lang'),
        email = $('#register .e'),
        password1 = $('#register .p1'),
        name = $('#register .n'),
        subscribe = $('#register #subscribe-checkbox'),
        utm_campaign = $('#register .utm_campaign'),
        utm_content = $('#register .utm_content'),
        utm_medium = $('#register .utm_medium'),
        utm_source = $('#register .utm_source'),
        utm_term = $('#register .utm_term'),
        msg_text = [],
        msg = $('#register .msg');
    if (p != 'hosting') {
        var phone = $('#register .p'),
            promo = $('#register .promo'),
            company = $('#register .c');
    } else {
        var phone = company = promo = '';
    }
    $('#register input[type="text"]').css("border", "1px solid rgba(0,0,0,.12)");
    $('#register input[type="email"]').css("border", "1px solid rgba(0,0,0,.12)");
    $('#register .password-line').css("border", "1px solid rgba(0,0,0,.12)");
    var pattern = /^([a-zA-Z0-9+_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    $(msg).removeClass('wrong');
    $(msg).removeClass('ok');
    if (name.val() == '') {
        if (lang.val() == 'ru') {
            msg_text.push('Вы используете недопустимое имя.');
        } else {
            msg_text.push('You are using an invalid name.');
        }
        name.css("border", "1px solid red");
    }
    if (p != 'hosting' && company.val() == '') {
        if (lang.val() == 'ru') {
            msg_text.push('Вы не ввели названике компании.');
        } else {
            msg_text.push('The company field is empty.');
        }
        company.css("border", "1px solid red");
    }
    if (email.val() == '') {
        if (lang.val() == 'ru') {
            msg_text.push('Вы не ввели e-mail.');
        } else {
            msg_text.push('The email field is empty.');
        }
        email.css("border", "1px solid red");
    } else if (email.val().length < 6 || email.val().length > 40) {
        if (lang.val() == 'ru') {
            msg_text.push('Длина Email должна быть не менее 6 символов и не более 40 символов.');
        } else {
            msg_text.push('Email must be from 6 to 40 characters.');
        }
        email.css("border", "1px solid red");
    } else if (!pattern.test(email.val())) {
        if (lang.val() == 'ru') {
            msg_text.push('Неверный формат Email.');
        } else {
            msg_text.push('Email is wrong.');
        }
        email.css("border", "1px solid red");
    }
    if (password1.val().length < 6 || password1.val().length > 16) {
        if (lang.val() == 'ru') {
            msg_text.push('Длина пароля должна быть не менее 6 символов и не более 16 символов.');
        } else {
            msg_text.push('Password must be from 6 to 16 characters.');
        }
        $(msg).addClass('wrong');
        $('#register .password-line').css("border", "1px solid red");
    } else if (checkPassword(password1) < 3) {
        if (lang.val() == 'ru') {
            msg_text.push('Пароль должен содержать символы нижнего и верхнего регистра, а также цифру.');
        } else {
            msg_text.push('The password must consist of lowercase and uppercase letters and numbers.');
        }
        $('#register .password-line').css("border", "1px solid red");
    }
    if (p != 'hosting' && phone.val() == '') {
        if (lang.val() == 'ru') {
            msg_text.push('Вы не ввели номер телефона.');
        } else {
            msg_text.push('The phone field is empty.');
        }
        phone.css("border", "1px solid red");
    }
    if (msg_text != '') {
        $(msg).addClass('wrong');
        $(msg).html(msg_text.join('<br>'));
    } else {
        $('#register input[type="text"]').css("border", "1px solid rgba(0,0,0,.12)");
        $('#register input[type="email"]').css("border", "1px solid rgba(0,0,0,.12)");
        $('#register .password-line').css("border", "1px solid rgba(0,0,0,.12)");
        password1.prop("disabled", true);
        email.prop("disabled", true);
        name.prop("disabled", true);
        if (p != 'hosting') {
            company.prop("disabled", true);
            phone.prop("disabled", true);
            subscribe.prop("disabled", true);
        }
        $('#register .button_orange').css({
            "opacity": "0.3",
            "pointer-events": "none",
            "cursor": "default"
        });
        if (lang.val() == 'ru') {
            $(msg).html('Подожди секунду ...');
        } else {
            $(msg).html('Please, wait for a second...');
        }
        $(msg).addClass('ok');
        utm_campaign_v = utm_campaign.val();
        utm_content_v = utm_content.val();
        utm_medium_v = utm_medium.val();
        utm_source_v = utm_source.val();
        utm_term_v = utm_term.val();
        if (p == 'hosting') {
            u = '/ajax/hosting_form.php';
            promo_v = '';
            company_v = '';
            phone_v = '';
            captcha = $('.token').val();
        } else {
            u = '/ajax/cdn_form.php';
            phone.prop("disabled", true);
            company.prop("disabled", true);
            promo.prop("disabled", true);
            promo_v = promo.val();
            company_v = company.val();
            phone_v = phone.val();
            captcha = grecaptcha.getResponse();
        }
        $.post(u, {
            password1: password1.val(),
            email: email.val(),
            name: name.val(),
            lang: lang.val(),
            phone: phone_v,
            promo: promo_v,
            utm_campaign: utm_campaign_v,
            utm_content: utm_content_v,
            utm_medium: utm_medium_v,
            utm_source: utm_source_v,
            utm_term: utm_term_v,
            company: company_v,
            captcha: captcha,
            action: 'new_user'
        }, function (data) {
            if (p == 'hosting') {
                if (data == 'ok') {
                    dataLayer.push({
                        'event': 'form_hosting_send_reg_' + lang.val()
                    });
                    if (lang.val() == 'ru') {
                        $(msg).html('Регистрация прошла успешно. Сейчас мы Вас перенаправим в кабинет.');
                        var url = "https://ruhosting.gcorelabs.com/billmgr?func=auth&lang=" + lang.val() + "&username=" + email.val() + "&password=" + password1.val();
                    } else {
                        $(msg).html('Registration completed successfully. Now we will redirect you to your profile.');
                        var url = "https://hosting.gcorelabs.com/billmgr?func=auth&lang=en&username=" + email.val() + "&password=" + password1.val();
                    }
                    password1.val('');
                    email.val('');
                    name.val('');
                    $('.input-group-addon input[type="checkbox"]').prop("checked", false);
                    $('#reg_p').prop("type", 'password');
                    $(msg).html('');
                    $(msg).removeClass('wrong');
                    $(msg).removeClass('ok');
                    setTimeout(goto_url, 1000, url);
                } else {
                    $(msg).html(data);
                    $(msg).removeClass('ok');
                    $(msg).addClass('wrong');
                    password1.prop("disabled", false);
                    email.prop("disabled", false);
                    name.prop("disabled", false);
                    $('#register .button_orange').css({
                        "opacity": "1",
                        "pointer-events": "auto",
                        "cursor": "pointer"
                    });
                }
            } else {
                data = jQuery.parseJSON(data);
                if (data.t == '1') {
                    if (subscribe.is(':checked')) {
                        $.post(u, {
                            action: 'subscribe',
                            id: data.i,
                            lang: lang.val()
                        }, function (data) {})
                    }
                    dataLayer.push({
                        'event': 'form_cdn_send_reg_' + lang.val()
                    });
                    $('#register_ok #register_ok_mail').html($('#register .e').val());
                    closeServicesPopup();
                    setTimeout(function () {
                        openServicesPopup('<div data-popup="register_ok"></div>');
                    }, 700)
                    password1.val('');
                    email.val('');
                    name.val('');
                    company.val('');
                    phone.val('');
                    promo.val('');
                    subscribe.prop("checked", false);
                    $('.input-group-addon input[type="checkbox"]').prop("checked", false);
                    $('#reg_p').prop("type", 'password');
                    grecaptcha.reset();
                    $(msg).html('');
                    $(msg).removeClass('wrong');
                    $(msg).removeClass('ok');
                    gtag('event', 'conversion', {
                        'send_to': 'AW-792285706/QKnrCLHb8YcBEIqk5fkC'
                    });
                } else {
                    if (typeof data.msg === 'string' || data.msg instanceof String) {
                        if (data.msg == 'The phone number can contain only letters (a-z), numbers (0-9), spaces and symbols "+-()#,*".') {
                            if (lang.val() == 'ru') {
                                data.msg = 'Введенный неверный телефон!';
                            } else {
                                data.msg = 'Wrong phone number!';
                            }
                            phone.css("border", "1px solid red");
                        } else if (data.msg == 'Wrong CAPTCHA!' || data.msg == 'Wrong captcha value') {
                            if (lang.val() == 'ru') {
                                data.msg = 'Неверная капча!';
                            } else {
                                data.msg = 'Wrong CAPTCHA!';
                            }
                            grecaptcha.reset();
                        } else if (data.msg == 'What is your company title?') {
                            if (lang.val() == 'ru') {
                                data.msg = 'Введите название компании.';
                            } else {
                                data.msg = 'Enter company name.';
                            }
                            company.css("border", "1px solid red");
                        } else if (data.msg == 'This field may not be blank.') {
                            if (lang.val() == 'ru') {
                                data.msg = 'Введите номер телефона.';
                            } else {
                                data.msg = 'Enter your phone.';
                            }
                            phone.css("border", "1px solid red");
                        }
                        $(msg).html(data.msg);
                    } else {
                        $.each(data.msg, function (key, value) {
                            if (value[0] == 'The phone number can contain only letters (a-z), numbers (0-9), spaces and symbols "+-()#,*".') {
                                if (lang.val() == 'ru') {
                                    value[0] = 'Введенный неверный телефон!';
                                } else {
                                    value[0] = 'Wrong phone number!';
                                }
                                phone.css("border", "1px solid red");
                            } else if (value[0] == 'Wrong CAPTCHA!' || value[0] == 'Wrong captcha value') {
                                if (lang.val() == 'ru') {
                                    value[0] = 'Неверная капча.';
                                } else {
                                    value[0] = 'Wrong CAPTCHA.';
                                }
                                grecaptcha.reset();
                            } else if (value[0] == 'What is your company title?') {
                                if (lang.val() == 'ru') {
                                    value[0] = 'Введите название компании.';
                                } else {
                                    value[0] = 'Enter company name.';
                                }
                                company.css("border", "1px solid red");
                            } else if (value[0] == 'This field may not be blank.') {
                                if (lang.val() == 'ru') {
                                    value[0] = 'Введите номер телефона.';
                                } else {
                                    value[0] = 'Enter your phone.';
                                }
                                phone.css("border", "1px solid red");
                            }
                            e = value[0];
                        });
                        $(msg).html(e);
                    }
                    $(msg).removeClass('ok');
                    $(msg).addClass('wrong');
                }
                password1.prop("disabled", false);
                email.prop("disabled", false);
                name.prop("disabled", false);
                company.prop("disabled", false);
                phone.prop("disabled", false);
                promo.prop("disabled", false);
                subscribe.prop("disabled", false);
                $('#register .button_orange').css({
                    "opacity": "1",
                    "pointer-events": "auto",
                    "cursor": "pointer"
                });
            }
        })
    }
}

function auth(p) {
    console.log("auth")
    var error = '',
        lang = $('#popup_lang'),
        email = $('#auth .e'),
        password1 = $('#auth .p'),
        msg_text = [],
        msg = $('#auth .msg');
    $('#auth input[type="email"]').css("border", "1px solid rgba(0,0,0,.12)");
    $('#auth .password-line').css("border", "1px solid rgba(0,0,0,.12)");
    var pattern = /^([a-zA-Z0-9+_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if (email.val() == '') {
        if (lang.val() == 'ru') {
            msg_text.push('Вы не ввели e-mail.');
        } else {
            msg_text.push('The email field is empty.');
        }
        email.css("border", "1px solid red");
    } else if (!pattern.test(email.val())) {
        if (lang.val() == 'ru') {
            msg_text.push('Неверный формат Email.');
        } else {
            msg_text.push('Email is wrong.');
        }
        email.css("border", "1px solid red");
    }
    if (password1.val() == '') {
        if (lang.val() == 'ru') {
            msg_text.push('Вы не ввели пароль.');
        } else {
            msg_text.push('The password field is empty.');
        }
        $('#auth .password-line').css("border", "1px solid red");
    }
    if (msg_text != '') {
        $(msg).addClass('wrong');
        $(msg).html(msg_text.join('<br>'));
    } else {
        $('#auth input[type="email"]').css("border", "1px solid rgba(0,0,0,.12)");
        $('#auth .password-line').css("border", "1px solid rgba(0,0,0,.12)");
        password1.prop("disabled", true);
        email.prop("disabled", true);
        $('#auth .button_orange').css({
            "opacity": "0.3",
            "pointer-events": "none",
            "cursor": "default"
        });
        if (lang.val() == 'ru') {
            $(msg).html('Подожди секунду ...');
        } else {
            $(msg).html('Please, wait for a second...');
        }
        $(msg).addClass('ok');
        if (p == 'hosting') {
            u = '/ajax/hosting_form.php';
        } else {
            u = '/ajax/cdn_form.php';
        }
        $.post(u, {
            password1: password1.val(),
            email: email.val(),
            lang: lang.val(),
            action: 'auth'
        }, function (data) {
            if (p == 'hosting') {
                if (data == 'ok') {
                    dataLayer.push({
                        'event': 'form_hosting_send_auth_' + lang.val()
                    });
                    if (lang.val() == 'ru') {
                        $(msg).html('Вы авторизованы. Сейчас мы Вас перенаправим в кабинет!');
                        var url = "https://ruhosting.gcorelabs.com/billmgr?func=auth&lang=" + lang.val() + "&username=" + email.val() + "&password=" + password1.val();
                    } else {
                        $(msg).html('You are authorized. Now we will redirect you to your profile');
                        var url = "https://hosting.gcorelabs.com/billmgr?func=auth&lang=en&username=" + email.val() + "&password=" + password1.val();
                    }
                    setTimeout(goto_url, 1000, url);
                } else {
                    $(msg).html(data);
                    $(msg).removeClass('ok');
                    $(msg).addClass('wrong');
                    password1.prop("disabled", false);
                    email.prop("disabled", false);
                    $('#auth .button_orange').css({
                        "opacity": "1",
                        "pointer-events": "auto",
                        "cursor": "pointer"
                    });
                }
            } else {
                data = jQuery.parseJSON(data);
                if (data.t == 1) {
                    dataLayer.push({
                        'event': 'form_cdn_send_auth_' + lang.val()
                    });
                    if (lang.val() == 'ru') {
                        $(msg).html('Вы авторизованы. Сейчас мы Вас перенаправим в кабинет!');
                    } else {
                        $(msg).html('You are authorized. Now we will redirect you to your profile');
                    }
                    gtag('event', 'conversion', {
                        'send_to': 'AW-792285706/vueLCNKJ44cBEIqk5fkC'
                    });
                    var url = "https://control.gcorelabs.com/#/invite?token=" + data.token;
                    setTimeout(goto_url, 1000, url);
                } else {
                    $(msg).html(data.msg);
                    $(msg).removeClass('ok');
                    $(msg).addClass('wrong');
                    password1.prop("disabled", false);
                    email.prop("disabled", false);
                    $('#auth .button_orange').css({
                        "opacity": "1",
                        "pointer-events": "auto",
                        "cursor": "pointer"
                    });
                }
            }
        })
    }
}

function auth_cdn_demo() {
    $.post('/ajax/cdn_demo_auth.php', {}, function (data) {
        data = jQuery.parseJSON(data);
        if (data.t == 1) {
            var url = "https://control.gcorelabs.com/#/invite?token=" + data.token;
            setTimeout(function () {
                location.href = url;
            }, 1000);
        }
    })
}

function recovery_password(p) {
    var error = '',
        lang = $('#popup_lang'),
        email = $('#recovery .e'),
        msg = $('#recovery .msg');
    $('#recovery input[type="email"]').css("border", "1px solid rgba(0,0,0,.12)");
    var pattern = /^([a-zA-Z0-9+_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    if (email.val() == '') {
        if (lang.val() == 'ru') {
            $(msg).html('Вы не ввели e-mail.');
        } else {
            $(msg).html('The email field is empty.');
        }
        $(msg).addClass('wrong');
        email.css("border", "1px solid red");
    } else if (!pattern.test(email.val())) {
        if (lang.val() == 'ru') {
            $(msg).html('Неверный формат Email!');
        } else {
            $(msg).html('Email is wrong!');
        }
        $(msg).addClass('wrong');
        email.css("border", "1px solid red");
    } else {
        $('#recovery input[type="email"]').css("border", "1px solid rgba(0,0,0,.12)");
        email.prop("disabled", true);
        $('#recovery .button_orange').css({
            "opacity": "0.3",
            "pointer-events": "none",
            "cursor": "default"
        });
        if (lang.val() == 'ru') {
            $(msg).html('Подожди секунду ...');
        } else {
            $(msg).html('Please, wait for a second...');
        }
        $(msg).addClass('ok');
        if (p == 'hosting') {
            u = '/ajax/hosting_form.php';
        } else {
            u = '/ajax/cdn_form.php';
        }
        $.post(u, {
            email: email.val(),
            lang: lang.val(),
            action: 'recovery'
        }, function (data) {
            if (data == 'ok') {
                if (lang.val() == 'ru') {
                    $(msg).html('Вы запросили пароль от панели. Пароль придет Вам на введённый e-mail');
                } else {
                    $(msg).html('You have requested a password from the panel. The password will come to you on the entered e-mail.');
                }
            } else {
                if (p == 'hosting') {}
                $(msg).html(data);
                $(msg).removeClass('ok');
                $(msg).addClass('wrong');
            }
            email.prop("disabled", false);
            $('#recovery .button_orange').css({
                "opacity": "1",
                "pointer-events": "auto",
                "cursor": "pointer"
            });
        })
    }
}

function getAllUrlParams(url) {
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    var obj = {};
    if (queryString) {
        queryString = queryString.split('#')[0];
        var arr = queryString.split('&');
        for (var i = 0; i < arr.length; i++) {
            var a = arr[i].split('=');
            var paramNum = undefined;
            var paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();
            if (obj[paramName]) {
                if (typeof obj[paramName] === 'string') {
                    obj[paramName] = [obj[paramName]];
                }
                if (typeof paramNum === 'undefined') {
                    obj[paramName].push(paramValue);
                } else {
                    obj[paramName][paramNum] = paramValue;
                }
            } else {
                obj[paramName] = paramValue;
            }
        }
    }
    return obj;
}

function goto_url(url) {
    location.href = url;
}

function checkPassword(p) {
    var password = p.val();
    var s_letters = "qwertyuiopasdfghjklzxcvbnm";
    var b_letters = "QWERTYUIOPLKJHGFDSAZXCVBNM";
    var digits = "0123456789";
    var is_s = false;
    var is_b = false;
    var is_d = false;
    for (var i = 0; i < password.length; i++) {
        if (!is_s && s_letters.indexOf(password[i]) != -1) is_s = true;
        else if (!is_b && b_letters.indexOf(password[i]) != -1) is_b = true;
        else if (!is_d && digits.indexOf(password[i]) != -1) is_d = true;
    }
    var rating = 0;
    if (is_s) rating++;
    if (is_b) rating++;
    if (is_d) rating++;
    return rating;
}

function newmsg_c() {
    $('#sub_vac_m').hide();
    $('#sub_vac').show();
}

function newmsg() {
    $('.contact_form').show();
    $('.h_contact_form').hide();
}

function show_captcha(l) {
    $('.contact_form').hide();
    $('.h_contact_form').show();
    var aid = $('#aid').val();
    if (l.val() == 'ru') {
        var q = ['Сколько будет 7+9', 'Какой сейчас год?', 'Напишите ответ: два плюс шесть минус 3'],
            a = ['16', '2019', '5'],
            p = "Напишите число",
            b = 'Отправить сообщение';
    } else {
        var q = ['How many will be 7+9', 'What is the year now?', 'Write the answer: two plus six minus 3'],
            a = ['16', '2019', '5'],
            p = "Enter the number",
            b = 'Send Message';
    }
    qc = getRandomInt(0, 2);
    if (parseInt(aid) == qc) {
        show_captcha(l);
    } else {
        $('.h_contact_form').html('<div class="answ">' + q[qc] + '</div><div class="field_form_f"><input placeholde="' + p + '" id="answer" class="answer" type="text"></div><div class="one_button_ban change_back_text"><a href="#" onClick="check_captcha();return false;" class="button_orange">' + b + '</a></div><input id="aid" type="hidden" value="' + qc + '">');
    }
}

function send_msg_with_file(l, n, e, m, p, file, type) {
    $('.contact_form input').prop("disabled", true);
    $('.contact_form textarea').prop("disabled", true);
    $('.contact_form input').css({
        "opacity": "0.3"
    });
    $('.contact_form textarea').css({
        "opacity": "0.3"
    });
    $('.contact_form .button_orange').css({
        "opacity": "0.3",
        "pointer-events": "auto",
        "cursor": "default"
    });
    var utm_campaign = $('#register .utm_campaign').val(),
        utm_content = $('#register .utm_content').val(),
        utm_medium = $('#register .utm_medium').val(),
        utm_source = $('#register .utm_source').val(),
        utm_term = $('#register .utm_term').val();
    $.post("/ajax/send_form_dev.php", {
        l: l.val(),
        n: n.val(),
        p: p.val(),
        e: e.val(),
        m: m.val(),
        utm_campaign: utm_campaign,
        utm_content: utm_content,
        utm_medium: utm_medium,
        utm_source: utm_source,
        utm_term: utm_term,
        type: type,
        file: file.val()
    }, function (data) {
        $('.contact_form').hide();
        $('.h_contact_form').show();
        if (data == 1) {
            n.val('');
            p.val('');
            e.val('');
            m.val('');
            file.val('');
            $('.contact_form input[type="checkbox"]').prop("checked", false);
            if (l.val() == 'ru') {
                $(".h_contact_form").html('Ваше сообщение отправлено');
                $('.cust_input_file.c_i').html('Прикрепить бриф');
            } else {
                $(".h_contact_form").html('Message was sent');
                $('.cust_input_file.c_i').html('Attach the brief');
            }
            $('#msgBox').html('');
        } else {
            if (l.val() == 'ru') {
                $(".h_contact_form").html('Сообщение не отправлено');
            } else {
                $(".h_contact_form").html('Cant\'t send');
            }
        }
        $('.contact_form input').prop("disabled", false);
        $('.contact_form textarea').prop("disabled", false);
        $('.contact_form input').css({
            "opacity": "1"
        });
        $('.contact_form textarea').css({
            "opacity": "1"
        });
        $('.contact_form .button_orange').css({
            "opacity": "1",
            "pointer-events": "auto",
            "cursor": "pointer"
        });
        setTimeout(newmsg, 5000);
    })
}

function redirect() {
    $(".redirect_page").click(function () {
        if ($(this).attr('href') != '') {
            $.cookie('redirect', $(this).attr('href'), {
                expires: 365,
                path: '/'
            });
            if ($('#lang').val() != 'en') {
                window.open('/' + $('#lang').val() + '/redirect/', '_blank');
            } else {
                window.open('/redirect/', '_blank');
            }
        }
        return false;
    });
}

function send_msg(l, n, e, m, p, f, c1, c2, c3, c4) {
    $('.contact_form input').prop("disabled", true);
    $('.contact_form textarea').prop("disabled", true);
    $('.contact_form input').css({
        "opacity": "0.3"
    });
    $('.contact_form textarea').css({
        "opacity": "0.3"
    });
    $('.contact_form .button_orange').css({
        "opacity": "0.3",
        "pointer-events": "auto",
        "cursor": "default"
    });
    var utm_campaign = $('#register .utm_campaign').val(),
        utm_content = $('#register .utm_content').val(),
        utm_medium = $('#register .utm_medium').val(),
        utm_source = $('#register .utm_source').val(),
        utm_term = $('#register .utm_term').val();
    var c = parseInt($.cookie('contact_from'));
    $.post("/ajax/send_form.php", {
        l: l.val(),
        n: n.val(),
        p: p.val(),
        e: e.val(),
        f: f.val(),
        m: m.val(),
        c1: c1,
        c2: c2,
        c3: c3,
        c4: c4,
        utm_campaign: utm_campaign,
        utm_content: utm_content,
        utm_medium: utm_medium,
        utm_source: utm_source,
        utm_term: utm_term,
        a: 1
    }, function (data) {
        $('.contact_form').hide();
        $('.h_contact_form').show();
        if (data != 2 && data != 0) {
            $.post("/ajax/send_form.php", {
                l: l.val(),
                n: n.val(),
                e: e.val(),
                id: data,
                a: 2
            }, function (data) {
                n.val('');
                p.val('');
                e.val('');
                m.val('');
                $('.contact_form input[type="checkbox"]').prop("checked", false);
                if (f.val() == 'hosting') {
                    dataLayer.push({
                        'event': 'feedback_hosting_' + l.val()
                    });
                } else if (f.val() == 'cdn') {
                    dataLayer.push({
                        'event': 'feedback_cdn_' + l.val()
                    });
                } else if (f.val() == 'contact') {
                    dataLayer.push({
                        'event': 'feedback_contact_' + l.val()
                    });
                } else if (f.val() == 'home') {
                    dataLayer.push({
                        'event': 'feedback_home_' + l.val()
                    });
                } else if (f.val() == 'transcoding') {
                    dataLayer.push({
                        'event': 'feedback_transcoding_' + l.val()
                    });
                } else if (f.val() == 'video-on-demand') {
                    dataLayer.push({
                        'event': 'feedback_video_on_demand_' + l.val()
                    });
                } else if (f.val() == 'live-streaming') {
                    dataLayer.push({
                        'event': 'feedback_live_streaming_' + l.val()
                    });
                } else if (f.val() == 'feedback') {
                    dataLayer.push({
                        'event': 'feedback_feedback_' + l.val()
                    });
                } else if (f.val() == 'press') {
                    dataLayer.push({
                        'event': 'feedback_press_' + l.val()
                    });
                } else if (f.val() == 'media-platform') {
                    dataLayer.push({
                        'event': 'feedback_media_platform_' + l.val()
                    });
                }
                if (l.val() == 'ru') {
                    $(".h_contact_form").html('Ваше сообщение отправлено');
                } else {
                    $(".h_contact_form").html('Message was sent');
                }
                var j = 1;
                if (c > 0) {
                    j = c + 1;
                }
                $.cookie('contact_from', j, {
                    expires: 1,
                    path: '/'
                });
                gtag('event', 'conversion', {
                    'send_to': 'AW-792285706/SwWCCKHX8YcBEIqk5fkC'
                });
            })
        } else {
            if (l.val() == 'ru') {
                $(".h_contact_form").html('Сообщение не отправлено');
            } else {
                $(".h_contact_form").html('Cant\'t send');
            }
        }
        $('.contact_form input').prop("disabled", false);
        $('.contact_form textarea').prop("disabled", false);
        $('.contact_form input').css({
            "opacity": "1"
        });
        $('.contact_form textarea').css({
            "opacity": "1"
        });
        $('.contact_form .button_orange').css({
            "opacity": "1",
            "pointer-events": "auto",
            "cursor": "pointer"
        });
        setTimeout(newmsg, 5000);
    })
}

function check_captcha() {
    var aid = $('#aid').val(),
        answer = $('#answer').val(),
        l = $('#lang'),
        n = $('#contact #contact_name'),
        p = $('#contact #contact_phone'),
        e = $('#contact #contact_email'),
        m = $('#contact #contact_message'),
        f = $('#f'),
        c_cdn = $('#contact-cdn'),
        c_host = $('#contact-host'),
        c_media = $('#contact-media'),
        c_security = $('#contact-security');
    if (c_cdn.is(':checked')) {
        c1 = 1;
    } else c1 = 0;
    if (c_host.is(':checked')) {
        c2 = 1;
    } else c2 = 0;
    if (c_media.is(':checked')) {
        c3 = 1;
    } else c3 = 0;
    if (c_security.is(':checked')) {
        c4 = 1;
    } else c4 = 0;
    a = ['16', '2019', '5'];
    if (a[aid] == answer) {
        send_msg(l, n, e, m, p, f, c1, c2, c3, c4);
    } else {
        show_captcha(l);
    }
}

function openServicesPopup(obj) {
    if (popupIsOpen === false) {
        var idPopup = $(obj).data("popup"),
            popup = $("#" + idPopup);
        if (windowWidth < 1200 && desktop === true) {
            ServicesPopupTimeline.set($(".services-popup"), {
                opacity: 0
            }).set($(".services-popup-table"), {
                x: "100%"
            }).add(function () {
                if (desktop === true) {
                    $.scrollLock(true);
                }
                $(".services-popup").addClass("open-popup");
            }, "+=.01").set(popup, {
                "display": "block"
            }).to($(".services-popup"), .3, {
                opacity: 1
            }).to($(".services-popup-table"), .5, {
                x: "0%",
                ease: Power4.easeOut
            }).set([$(".services-popup-table"), $(".services-popup")], {
                clearProps: "all"
            }).add(function () {
                popupIsOpen = true;
            }, "+=.01")
        } else if (windowWidth >= 1200 && desktop === true) {
            ServicesPopupTimeline.set($(".services-popup"), {
                opacity: 0
            }).set($(".services-popup-table"), {
                y: "-100%"
            }).add(function () {
                if (desktop === true) {
                    $.scrollLock(true);
                }
                $(".services-popup").addClass("open-popup");
            }, "+=.01").set(popup, {
                "display": "block"
            }).set($(".services-popup"), {
                "overflow": "hidden"
            }).to($(".services-popup"), .3, {
                opacity: 1
            }).to($(".services-popup-table"), .5, {
                y: "0%",
                ease: Power4.easeOut
            }).set([$(".services-popup-table"), $(".services-popup"), $(".services-popup")], {
                clearProps: "all"
            }).add(function () {
                popupIsOpen = true;
            }, "+=.01")
        }
    }
}

function closeServicesPopup() {
    if (popupIsOpen === true) {
        if (windowWidth < 1200 && desktop === true) {
            ServicesPopupTimeline.to($(".services-popup-table"), .3, {
                x: "100%",
                ease: Power4.easeOut
            }).to($(".services-popup"), .3, {
                opacity: 0
            }).set($(".services-popup"), {
                opacity: 0
            }).add(function () {
                $(".services-popup").removeClass("open-popup");
            }, "+=.01").set([$("body"), $(".services-popup-table"), $(".services-popup"), $(".services-popup-list__item")], {
                clearProps: "all"
            }).add(function () {
                if (desktop === true) {
                    $.scrollLock(false);
                }
                popupIsOpen = false;
            }, "+=.01")
        } else if (windowWidth >= 1200 && desktop === true) {
            ServicesPopupTimeline.set($(".services-popup"), {
                "overflow": "hidden"
            }).to($(".services-popup-table"), .3, {
                y: "100%",
                ease: Power4.easeOut
            }).to($(".services-popup"), .3, {
                opacity: 0
            }).set($(".services-popup"), {
                opacity: 0
            }).add(function () {
                $(".services-popup").removeClass("open-popup");
            }, "+=.01").set([$("body"), $(".services-popup-table"), $(".services-popup"), $(".services-popup-list__item"), $(".services-popup")], {
                clearProps: "all"
            }).add(function () {
                if (desktop === true) {
                    $.scrollLock(false);
                }
                popupIsOpen = false;
            }, "+=.01")
        }
    }
}

function open_pop(t) {
    openServicesPopup(t);
}
$.scrollLock = (function scrollLockClosure() {
    'use strict';
    var $html = $('html'),
        locked = false,
        prevScroll = {
            scrollLeft: $(window).scrollLeft(),
            scrollTop: $(window).scrollTop()
        },
        prevStyles = {},
        lockStyles = {
            'overflow-y': 'scroll',
            'position': 'fixed',
            'width': '100%'
        };
    saveStyles();

    function saveStyles() {
        var styleAttr = $html.attr('style'),
            styleStrs = [],
            styleHash = {};
        if (!styleAttr) {
            return;
        }
        styleStrs = styleAttr.split(/;\s/);
        $.each(styleStrs, function serializeStyleProp(styleString) {
            if (!styleString) {
                return;
            }
            var keyValue = styleString.split(/\s:\s/);
            if (keyValue.length < 2) {
                return;
            }
            styleHash[keyValue[0]] = keyValue[1];
        });
        $.extend(prevStyles, styleHash);
    }

    function lock() {
        var appliedLock = {};
        if (locked) {
            return;
        }
        prevScroll = {
            scrollLeft: $(window).scrollLeft(),
            scrollTop: $(window).scrollTop()
        };
        saveStyles();
        $.extend(appliedLock, lockStyles, {
            'left': -prevScroll.scrollLeft + 'px',
            'top': -prevScroll.scrollTop + 'px'
        });
        $html.css(appliedLock);
        $(window).scrollLeft(0).scrollTop(0);
        locked = true;
    }

    function unlock() {
        if (!locked) {
            return;
        }
        $html.attr('style', $('<x>').css(prevStyles).attr('style') || '');
        $(window).scrollLeft(prevScroll.scrollLeft).scrollTop(prevScroll.scrollTop);
        locked = false;
    }
    return function scrollLock(on) {
        if (arguments.length) {
            if (on) {
                lock();
            } else {
                unlock();
            }
        } else {
            if (locked) {
                unlock();
            } else {
                lock();
            }
        }
    };
}());
var size_scroll = 0;

function DetectScroll() {
    var height_sticky = $('.sticky_bar').height();
    var height_header = $('.header_bl').height();
    var height_def = 0;
    if (height_sticky >= height_header) {
        height_def = height_sticky;
    } else {
        height_def = height_header;
    }
    size_scroll = $(window).scrollTop();
    if (size_scroll >= height_def) {
        $('body').addClass('scroll_active');
    } else {
        $('body').removeClass('scroll_active');
    }
}
$(window).scroll(function () {
    // DetectScroll();
});
$(".subscribe_btn").click(function () {
    $("#subscribe_form").submit();
    return false;
});
$("#subscribe_form").submit(function (event) {
    var stop = 0,
        msg = '';
    if ($('#sub_mail').val().trim() != '') {
        var pattern = /^([a-zA-Z0-9_.+-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
        if (!pattern.test($('#sub_mail').val())) {
            stop = 1;
        }
    } else {
        stop = 1;
    }
    if ($('#sub_name').val() == '') {
        stop = 1;
    }
    if (stop == 0) {
        fbq('track', 'subscribe');
        $.post("/ajax/subscribe.php", {
            e: $('#sub_mail').val(),
            n: $('#sub_name').val(),
            l: $('#lang').val(),
            a: 1
        }, function (data) {
            if (data == 2) {
                if ($('#lang').val() == 'ru') {
                    msg = 'Все поля должны быть заполнены.';
                } else {
                    msg = 'All fields must be completed.';
                }
            } else {
                $.post("/ajax/subscribe.php", {
                    e: $('#sub_mail').val(),
                    n: $('#sub_name').val(),
                    l: $('#lang').val(),
                    id: data,
                    a: 2
                }, function (data) {
                    if (data == 2) {
                        if ($('#lang').val() == 'ru') {
                            msg = 'Все поля должны быть заполнены.';
                        } else {
                            msg = 'All fields must be completed.';
                        }
                    } else {
                        $('#subscribe .container_center .orange_form_block form').hide();
                        if ($('#lang').val() == 'ru') {
                            msg = 'Вы успешно подписаны на рассылку.';
                        } else {
                            msg = 'You have successfully subscribed to the newsletter.';
                        }
                    }
                    $('#subscribe .subscribe_msg').html(msg);
                })
            }
        })
    } else {
        if ($('#lang').val() == 'ru') {
            msg = 'Все поля должны быть заполнены.';
        } else {
            msg = 'All fields must be completed.';
        }
        $('#subscribe .subscribe_msg').html(msg);
    }
    return false;
});
