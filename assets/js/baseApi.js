// ajaxPrefilter 可以拿到ajax提供的配置对象
// 为了开发运维测试 更加方便的设置路径的方式
$.ajaxPrefilter(function (options) {
    // 为了拼接根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 统一为为请求设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }
    // 全局挂载complete 对后台访问进行拦截
    options.complete = function (res) {
        console.log(res);
        // 在 complete函数中可以用 res.responseJSON 获取响应信息
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {

            // 清空token
            localStorage.removeItem('token');
            location.href = '/login.html'
        }
    }
})