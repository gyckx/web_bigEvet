$(function () {
    // 调用获取用户信息函数
    getUserInfo();
    var layer = layui.layer

    // 设置退出功能：先将a标签设置 阻止跳转
    $('#btnLogOut').on('click', function () {

        // 使用layui设置退出窗口
        layer.confirm('确定退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 将本地存储的token 删除掉
            localStorage.removeItem('token');
            // 2. 将页面跳转到登陆页面
            location.href = '/login.html'
            // 下面这个是关闭退出的弹出窗口
            layer.close(index);
        });
    })
})

function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        //配置请求头调整到baseApi中
        success: function (res) {
            // 验证是否可以正确的响应
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取数据失败')
            }
            renderAvatar(res.data);

        }

    })

}

// 渲染用户头像
function renderAvatar(user) {
    // console.log(user);
    var uname = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname);
    // 渲染头像信息
    if (user.user_pic != null) {
        // 这里就是判断显示那种类型的头像
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();

    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(uname[0].toUpperCase())
    }
}