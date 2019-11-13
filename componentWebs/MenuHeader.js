
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm/Form';
// import { validateEmail } from '@/utils/helpers';
import Menu from './Menu/index';
// import PopupConfirmCookies from './Popup/ConfirmCookies';
import ZaloLogin from './LoginSocial/Zalo';
import FacebookLogin from './LoginSocial/Facebook';
import GoogleLogin from './LoginSocial/Google';

@connect()
class Web extends PureComponent {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.loginPopup = React.createRef();
    this.state = {
      openMenu: '',
      onPackage: false,
      openMenuChildren: null,
      statusLogin: '',
      message: 0,
      messageCreate: '',
      PassWord1: 'password',
      PassWord: 'password',
      servicePopupClass: '',
      createAccount: {
        display: 'none'
      },
      loginState: {
        display: 'none'
      },
      systemLoginChoose: {
        display: 'none'
      },
    }
  }

  componentWillReceiveProps(nextProps) {
    const { onPackage } = this.props;
    if (nextProps.onPackage !== onPackage) {
      this.setState({
        onPackage: true,
        message: 0,
        messageCreate: '',
        servicePopupClass: 'open-popup',
        createAccount: {
          display: 'block'
        },
        loginState: {
          display: 'none'
        }
      })
    }
  }

  showSystemLogin = () => {
    this.showMenu()
    this.setState({
      servicePopupClass: 'open-popup',
      systemLoginChoose: { display: 'block' }
    })
  }

  showLogin = () => {
    // log("this.loginPopup.style: ", this.loginPopup.style)
    this.setState({
      message: 0,
      servicePopupClass: 'open-popup',
      createAccount: { display: 'none' },
      loginState: { display: 'block' },
      systemLoginChoose: { display: 'none' }
    })
  }

  hideLogin = () => {
    localStorage.removeItem('packageId');
    this.setState({
      onPackage: false,
      message: 0,
      messageCreate: '',
      servicePopupClass: '',
      createAccount: {
        display: 'none'
      },
      loginState: {
        display: 'none'
      },
      systemLoginChoose: { display: 'none' }
    })
  }

  showMenu = () => {
    const { openMenu } = this.state;
    // log("this.loginPopup.style: ", this.loginPopup.style)
    if (openMenu === 'open-menu') {
      this.setState({
        openMenu: '',
      })
    }
    else {
      this.setState({
        openMenu: 'open-menu',
      })
    }
  }

  Account = (value) => {
    this.setState({
      message: 0,
      messageCreate: '',
      createAccount: value,
      loginState: {
        display: 'none'
      }
    })
  }

  onChangeShow = () => {
    const { PassWord } = this.state
    if (PassWord === 'password')
      this.setState({
        PassWord: "text"
      })
    else
      this.setState({
        PassWord: "password"
      })
  }

  onChangeShow1 = () => {
    const { PassWord1 } = this.state
    if (PassWord1 === 'password')
      this.setState({
        PassWord1: "text"
      })
    else
      this.setState({
        PassWord1: "password"
      })
  }

  showMenuChildren = (id) => {
    const { openMenuChildren } = this.state;
    if (id !== openMenuChildren)
      this.setState({
        openMenuChildren: id
      })
    else {
      this.setState({
        openMenuChildren: null,
      })
    }
  }

  submitCreateAcc = (e) => {
    e.preventDefault()
    const { dispatch } = this.props;
    const form = e.target
    const formData = new window.FormData(form)
    if (!formData.get('email')) {
      this.setState({
        messageCreate: 'Vui lòng nhập tài khoản'
      })
    }
    // else if (!validateEmail(formData.get('email'))
    // ) {
    //   this.setState({
    //     messageCreate: 'Tài khoản phải là email'
    //   })
    // }
    else if (!formData.get('password')
    ) {
      this.setState({
        messageCreate: 'Vui lòng nhập mật khẩu'
      })
    }
    else if (!formData.get('password2')
    ) {
      this.setState({
        messageCreate: 'Vui lòng nhập lại mật khẩu'
      })
    }
    else if (formData.get('password') !== formData.get('password2')) {
      this.setState({
        messageCreate: 'Nhập lại mật khẩu không đúng'
      })
    }
    else {
      this.setState({
        messageCreate: ''
      })
      const addItem = {
        UserName: formData.get('email'),
        PassWord: formData.get('password'),
        Status: 1,
      };
      dispatch({
        type: 'users/add',
        payload: addItem,
        callback: (result) => {
          if (result) {
            form.reset()
            setTimeout(() => {
              this.showLogin()
            }, 5000)
            this.setState({
              message: 1,
            })
          }
        }
      });
    }
  };

  handleSubmit = (values) => {
    const { onPackage } = this.state
    const type = 'account';
    const { dispatch } = this.props;
    dispatch({
      type: 'login/login',
      payload: {
        userName: values.email,
        password: values.password,
        type,
        onPackage
      },
      callback: (result) => {
        this.setState({
          statusLogin: result.status,
          onPackage: false,
        })
      }
    });
  };

  render() {
    const { servicePopupClass, loginState, createAccount, PassWord, PassWord1, message, messageCreate, statusLogin, openMenu, openMenuChildren, systemLoginChoose } = this.state;
    const { categories, token } = this.props;
    return (
      <React.Fragment>
        <div id="popup_logins" className={`services-popup ${servicePopupClass}`}>
          <input id="popup_lang" type="hidden" defaultValue="en" />
          <div className="services-popup-table">
            <div className="services-popup-wrapper">
              <div className="services-popup-list-wrapper">
                <a onClick={this.hideLogin} href="javascript:void(0)" className="services-popup-close-link"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width={50} height={50} viewBox="0 0 50 50" className="close-svg"><path d="M14.993 14.087 14.087 14.992 7.5 8.405.913 14.992.008 14.087 6.595 7.5.008.913.913.008 7.5 6.595 14.087.008 14.993.913 8.405 7.5 14.993 14.087z" transform="translate(17.5 17.5)" className="close-svg-path" /></svg></a>
                <ul className="services-popup-list">
                  <li id="choice_entry" className="services-popup-list__item" style={systemLoginChoose}>
                    <div className="services-popup-list__item-content-wrapper">
                      <div className="services-popup-list__item-header">
                        <div className="services-popup-list__item-header-text">Chọn phương thức đăng nhập</div>
                      </div>
                      <div className="services-popup-list__item-content">
                        <ul id="list_product_log">
                          <li>
                            <a className="ico_log_service cdn_log" data-choice="cdn_login" data-popup="form_login" onClick={this.showLogin} />
                            <div className="text_log_service">MAXPING</div>
                          </li>
                          <li>
                            <FacebookLogin />
                          </li>
                          <li>
                            <ZaloLogin />
                          </li>
                          <li>
                            <GoogleLogin />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li id="register_ok" className="popup_log services-popup-list__item">
                    <div className="services-popup-list__item-content-wrapper">
                      <div className="services-popup-list__item-header">
                        <div className="services-popup-list__item-header-text">Проверьте почту</div>
                      </div>
                      <div className="services-popup_registration_ok">Для входа в личный кабинет пройдите по ссылке, которую мы отправили на <span id="register_ok_mail">allala</span>.<br /><br />Приятной работы.</div>
                      <div className="one_button_ban change_back_text"><a href="#" className="button_orange">OK</a></div>
                    </div>
                  </li>
                  <li
                    ref={this.loginPopup}
                    id="form_login"
                    className="popup_log services-popup-list__item"
                    style={loginState}
                  >
                    <div className="services-popup-list__item-content-wrapper">
                      <div className="services-popup-list__item-header">
                        <div className="services-popup-list__item-header-text">Đăng nhập bằng tài khoản của bạn</div>
                      </div>
                      <LoginForm onSubmit={this.handleSubmit} Account={this.Account} statusLogin={statusLogin} />
                    </div>
                  </li>
                  <li id="create_account" className="popup_log services-popup-list__item" style={createAccount}>
                    <div className="services-popup-list__item-content-wrapper">
                      <div className="services-popup-list__item-header">
                        <div className="services-popup-list__item-header-text">Đăng ký tài khoản</div>
                      </div>
                      {/* {message === 1 && <span className="services-popup-list__item-header" style={{ color: '#4CAF50', fontWeight: 'bold', fontSize: '16px' }}>Đăng ký tài khoản thành công !</span>} */}
                      <form id="register" onSubmit={this.submitCreateAcc}>
                        <input
                          maxLength={150}
                          type="text"
                          name="email"
                          className="e"
                          placeholder="Email*"
                        />
                        <div className="password-line">
                          <input maxLength={50} type={`${PassWord}`} name="password" className="p1" id="reg_p" placeholder="Mật khẩu*" />
                          <span className="input-group-addon">
                            <label className="checkbox_bl" htmlFor="chkShow">
                              <input id="chkShow" type="checkbox" onClick={this.onChangeShow} />
                              <span className="checkbox_text">Hiện</span>
                            </label>
                          </span>
                        </div>
                        <div className="password-line 1">
                          <input maxLength={50} type={`${PassWord1}`} name="password2" className="p1" id="reg_p 1" placeholder="Nhập lại mật khẩu*" />
                          <span className="input-group-addon">
                            <label className="checkbox_bl 1" htmlFor="chkShow1">
                              <input id="chkShow1" type="checkbox" onClick={this.onChangeShow1} />
                              <span className="checkbox_text 1">Hiện</span>
                            </label>
                          </span>
                        </div>
                        <input maxLength={50} type="email" className="cdn_only promo" placeholder="Promocode" />
                        <span id="recaptcha" />
                        <div className={`msg ${messageCreate !== '' ? 'wrong' : ''}`}>
                          <span>{messageCreate}</span>
                        </div>
                        <div className={`msg ${message === 1 ? 'ok' : ''}`}>
                          <span>Đăng ký tài khoản thành công !</span>
                        </div>
                        <div className="one_button_ban change_back_text">
                          <button type="submit" className="button_orange">Tiếp tục</button>
                        </div>
                        <p>Bạn có tài khoản? <a className="open_login_pop hide_choice" href="#" onClick={this.showLogin} data-choice data-popup="form_login">Đăng nhập bằng tài khoản</a></p>
                      </form>
                    </div>
                  </li>
                  <li id="recover_pas" className="popup_log services-popup-list__item">
                    <div className="services-popup-list__item-content-wrapper">
                      <div className="services-popup-list__item-header">
                        <div className="services-popup-list__item-header-text">Password recovery</div>
                      </div>
                      <form id="recovery">
                        <p>Enter a login or email address for password recovery. If you don't remember your login and email, contact our Technical support team via <a href="mailto:support@gcorelabs.com">support@gcorelabs.com</a>. Provide your name, surname, and phone number that you specified during registration</p><input className="hide_choice" type="hidden" data-choice />
                        <input maxLength={50} type="email" className="e" placeholder="Email*" />
                        <div className="msg" />
                        <div className="one_button_ban change_back_text"><button type="submit" className="button_orange">Send password</button></div>
                      </form>
                    </div>
                  </li>
                  <li id="service-1" className="services-popup-list__item">
                    <div className="services-popup-list__item-content-wrapper">
                      <div className="services-popup-list__item-header">
                        <div className="services-popup-list__item-img-wrapper"><img src="https://gcorelabs.com/img/ico_1.png" alt="Video Streaming" className="img-responsive servises-list__item-img" /></div>
                        <div className="services-popup-list__item-header-text">Video Streaming</div>
                      </div>
                      <div className="services-popup-list__item-content">
                        <ul>
                          <li>Streaming video on any device and platform</li>
                          <li>Video on Demand (VOD) over RTMP</li>
                          <li>RTMP live streaming</li>
                          <li>Deliver high quality videos to your audience with continuous streaming</li>
                          <li>Intelligent load balancing for video delivery</li>
                          <li>Real-time analytics and statistics. See how audience is interacting with your video</li>
                          <li>REST API. Always control how you deliver content</li>
                        </ul>
                      </div>
                      <div className="one_button_ban"><a className="button_orange js_anchor_link_close" href="#contact">Get Free CDN Trial</a></div>
                    </div>
                  </li>
                  <li id="service-2" className="services-popup-list__item">
                    <div className="services-popup-list__item-content-wrapper">
                      <div className="services-popup-list__item-header">
                        <div className="services-popup-list__item-img-wrapper"><img src="https://gcorelabs.com/img/ico_2.png" alt="E-Commerce" className="img-responsive servises-list__item-img" /></div>
                        <div className="services-popup-list__item-header-text">E-Commerce</div>
                      </div>
                      <div className="services-popup-list__item-content">
                        <ul>
                          <li>Your online store is always open for business, regardless of traffic, even during holiday rush</li>
                          <li>Improve your SEO and the “findability” of your products</li>
                          <li>Protect sensitive data with SSL</li>
                          <li>Crash protection</li>
                          <li>DDoS protection</li>
                          <li>Fast load times – decrease bounce rate</li>
                          <li>Real-time analytics</li>
                        </ul>
                      </div>
                      <div className="one_button_ban"><a className="button_orange js_anchor_link_close" href="#contact">Get Free CDN Trial</a></div>
                    </div>
                  </li>
                  <li id="service-3" className="services-popup-list__item">
                    <div className="services-popup-list__item-content-wrapper">
                      <div className="services-popup-list__item-header">
                        <div className="services-popup-list__item-img-wrapper"><img src="https://gcorelabs.com/img/ico_3.png" alt="Media" className="img-responsive servises-list__item-img" /></div>
                        <div className="services-popup-list__item-header-text">Media</div>
                      </div>
                      <div className="services-popup-list__item-content">
                        <ul>
                          <li>Deliver news on time</li>
                          <li>Your site is always ready for visitors even during peak times</li>
                          <li>Protect your content with SSL</li>
                          <li>Decrease load on your hardware</li>
                          <li>All major content types supported</li>
                          <li>Instant purge</li>
                          <li>Safe storage</li>
                          <li>Origin shielding</li>
                          <li>Latest technology HTTP/2</li>
                          <li>DDoS protection</li>
                        </ul>
                      </div>
                      <div className="one_button_ban"><a className="button_orange js_anchor_link_close" href="#contact">Get Free CDN Trial</a></div>
                    </div>
                  </li>
                  <li id="service-4" className="services-popup-list__item">
                    <div className="services-popup-list__item-content-wrapper">
                      <div className="services-popup-list__item-header">
                        <div className="services-popup-list__item-img-wrapper"><img src="https://gcorelabs.com/img/ico_4.png" alt="Advertising" className="img-responsive servises-list__item-img" /></div>
                        <div className="services-popup-list__item-header-text">Advertising</div>
                      </div>
                      <div className="services-popup-list__item-content">
                        <ul>
                          <li>Rich media ads served quickly</li>
                          <li>Fast loading ads increase conversion rates and unique visits</li>
                          <li>Deliver advertising to any smart device and website</li>
                          <li>All major types of advertising supported</li>
                          <li>Secure delivery with SSL</li>
                          <li>HTTP/2 support</li>
                          <li>Real-time control and analytics</li>
                        </ul>
                      </div>
                      <div className="one_button_ban"><a className="button_orange js_anchor_link_close" href="#contact">Get Free CDN Trial</a></div>
                    </div>
                  </li>
                  <li id="service-5" className="services-popup-list__item">
                    <div className="services-popup-list__item-content-wrapper">
                      <div className="services-popup-list__item-header">
                        <div className="services-popup-list__item-img-wrapper"><img src="https://gcorelabs.com/img/ico_5.png" alt="Software & Games" className="img-responsive servises-list__item-img" /></div>
                        <div className="services-popup-list__item-header-text">Software &amp; Games</div>
                      </div>
                      <div className="services-popup-list__item-content">
                        <ul>
                          <li>Users have high expectations for wait times to access software</li>
                          <li>With G-CDN, never worry about instability of load times</li>
                          <li>Instant purge provides users with the latest content, immediately</li>
                          <li>REST API. Complete control over how you deliver content</li>
                          <li>Protect your content with SSL network</li>
                          <li>SSL protection</li>
                          <li>HTTP/2 support</li>
                          <li>Users remain engaged longer</li>
                        </ul>
                      </div>
                      <div className="one_button_ban"><a className="button_orange js_anchor_link_close" href="#contact">Get Free CDN Trial</a></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* <PopupConfirmCookies /> */}
        <Menu
          categories={categories}
          token={token}
          openMenu={openMenu}
          openMenuChildren={openMenuChildren}
          showSystemLogin={this.showSystemLogin}
          showMenu={this.showMenu}
          showMenuChildren={this.showMenuChildren}
        />
      </React.Fragment>
    );
  }
}

export default Web;