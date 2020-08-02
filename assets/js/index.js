$(function () {
    // 调用获取用户信息函数
    getUserInfo();
    var layer = layui.layer

    // 设置退出功能：先将a标签设置 阻止跳转
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登陆', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地的token
            localStorage.removeItem('token')
            // 2. 跳转到登陆页面
            location.href = '/login.html'
            // 关闭弹出的窗口
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