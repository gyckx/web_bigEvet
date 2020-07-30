$(function () {
    // 登陆框和注册框通过监听点击事件切换：为此要将a标签的默认跳转行为阻止
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show()

    })
    $('#link-login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide()
    })

    // 自定义验证规则
    // 先从layui中获取form对象
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify()函数自定验证规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 校验两次密码是否一致
            // 比较两次的密码是否相等
            var pwd = $('#reg-pwd').val();
            if (pwd !== value) {
                return '两次密码不一致'
            }

        }

    })


    //1. 监听注册表单
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: 'api/reguser',
            data: {
                username: $('#form_reg input[name=username]').val(),
                password: $('#form_reg input[name=password]').val()
            },
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                // 模拟人去点击
                $('#link-login').click();
                // 清空表单
                $('#form_reg')[0].reset();
            }
        })
    })

    //2. 监听登陆表单
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: 'api/login',
            // $(this).serialize() 获取当前表单的所有数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功');
                // 验证是否拿到了token的值
                // console.log(res.token);
                // 把字符串保存在当地localStorage
                localStorage.setItem('token', res.token)
                // 跳转到主页面
                location.href = '/index.html';
            }
        })

    })


})