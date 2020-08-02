$(function () {

    // 1. 用户校验
    var form = layui.form;
    var layer = layui.layer
    form.verify({

        nickname: function (value) {
            if (value.trim().length > 6) {
                return '昵称的长度不能超过6个字符'
            }
        }
    })
    // 2. 初始化用户信息
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('数据获取失败')
                }
                // 给表单赋值
                form.val('formUserInfo', res.data)

            }
        })
    }
    // 3. 完成重置信息
    $('#btnReset').on('click', function (e) {
        // 阻止表单重置的默认行为
        e.preventDefault();
        // 将信息重新初始化
        initUserInfo();
    })
    // 4. 设置监听表单的行为
    $('.layui-form').on('submit', function (e) {
        // 阻止表单提交的默认行为
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('数据跟新失败')
                }
                layer.msg('数据跟新成功');
                //将侧边栏的头像的信息进行更新 
                //使用父盒子中的window方法中的
                window.parent.getUserInfo();
            }
        })

    })



})