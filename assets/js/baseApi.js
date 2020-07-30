// ajaxPrefilter 可以拿到ajax提供的配置对象
// 为了开发运维测试 更加方便的设置路径的方式
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net/' + options.url;
})