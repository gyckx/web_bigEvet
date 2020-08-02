$(function () {
    //1.alert-success 校验规则
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.trim().length > 6) {
                return '昵称不能大于6个字符';
            }
        }
    })
    initUserInfo();
    //2. 初始化用户信息
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取数据失败')
                }
                // console.log(res);
                // 给表单赋 原生代码：获取dom表单属性进行赋值
                form.val('formUserInfo', res.data)
            }
        })

    }

    // 3. 完成重置按钮功能
    $('#btnReset').on('click', function (e) {
        // 阻止表单提交行为
        e.preventDefault();
        // 数据的表单重新渲染
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
                // 使用父框架中的window 然后显示头像信息
                // fm 中的html文件是 子页面 还有一个是inde的主页面 两者嵌套在一起
                // 加载侧边栏的头像信息在主页面的window中 
                window.parent.getUserInfo();
            }
        })

    })




})