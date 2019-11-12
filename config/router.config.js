/**
 * đối tượng routes cho web và cms
 * @param { là tên không in hoa = tiếng anh viết liền, cách nhau bằng dấu _ và là duy nhất } name
 * @param { là đường dẫn trên trình duyệt, bắt đầu bằng / } path
 * @param { là đường dẫn đến file vật lý trong thư mục pages } component
*/
module.exports.routes = {
  // web
  web: [
    { path: '/home', name: "home", component: 'index' },
    // { path: '/login', name: "login", component: 'Authenticate/login' },
    // { path: '/thanks', name: "thanks", component: 'User/Thanks' },
    // { path: '/verify', name: "verify", component: 'User/Verify' },
    // { path: '/login/zalo', name: "login_zalo", component: 'Social/ZaloLogin' },
    // { path: '/login/facebook', name: "login_facebook", component: 'Social/FacebookLogin' },
    // { path: '/register', name: "register", component: 'User/Register' },
    // { path: '/registration', name: "registration", component: 'User/Registration' },
    { path: '/dich-vu-:id(\\d+)', name: "dịch vụ", component: 'User/Service' },
    { path: '/gioi-thieu-:id(\\d+)', name: "giới thiệu", component: 'User/Abouts' },
    { path: '/tin-tuc-:id(\\d+)', name: "tin tức", component: 'User/News' },
    { path: '/lien-he-:id(\\d+)', name: "Liên hệ", component: 'User/Contact' },
    { path: '/:categoryParent?/:category?_:parentId?_:categoryId(\\d+)', name: "ChilCategory", component: 'User/Category' },
    { path: '/:categoryName?/:name?/:articleId(\\d+)', name: "articles", component: 'User/Detail' },
    // { path: '/:articleTitle?-:articleId(\\d+)', name: "article_detail", component: 'User/ArticleDetail' },
    // // {
    //   name: "tai_lieu",
    //   component: 'User/Articles',
    //   prettyUrl: ({ id = '', parentId = '', name = '' }) =>
    //     (parentId === '0' ? `/tai-lieu-${id}` : `/tai-lieu-${parentId}/${name}-${id}`),
    //   prettyPatterns: [
    //     { pattern: '/tai-lieu-:id', defaultParams: { parentId: '0', name: '' } },
    //     { pattern: '/tai-lieu-:parentId/:name-:id' }
    //   ]
    // },
    // { path: '/tai-lieu-:id/:articleTitle-:articleId', name: "tai_lieu_chi_tiet", component: 'User/ArticleDetail' }
    // { path: '/account/base/:name', name: "account_setting", component: 'Account/BaseView' },
    // { path: '/account/security/:name', name: "account_security", component: 'Account/SecurityView' },
    // { path: '/selectPlace', name: "selectPlace", component: 'Dashboard/Analysis' },
  ],
  dashboard: []
};
