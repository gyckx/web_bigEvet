$(function () {
    var layer = layui.layer

    // 1.1获取裁剪区域的DOM元素
    var $image = $('#image')
    // 1.2配置选项
    const options = {

        // 纵横比 1/1   16/9
        aspectRatio: 1,

        //指定预览区域
        preview: '.img-preview'
    }

    //1.3创建裁剪区域
    $image.cropper(options)

    //为上传按钮注册点击事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })


    $('#file').on('change', function (e) {
        console.log(e); //找到对象e里面的targer 属性里面有files 伪数组
        // [0 files,length 1]   :   1 选择的文件  0 索引文件
        console.log(111);
        var fileList = e.target.files
        if (fileList.length === 0) {
            return layer.msg('请选择照片!')
<<<<<<< HEAD
            console.log(222);
=======
>>>>>>> user
        }

        //1.拿到用户选择的文件  target.files[0]: 指选中的图片
        var file = e.target.files[0]
        //2.将文件转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3.重新初始化裁剪区
        $image
            .cropper('destroy') //销毁旧的裁剪区域
            .attr('src', imgURL) //重新设置图片路径  自定义属性
<<<<<<< HEAD
            .cropper(options) //重新初始化裁剪区域
    })

    // 为确定按钮设置点击事件 将修剪后的头像上传到服务器
    $('#btnUpload').on('click', function () {
        // 1. 获取到用户修改后的头像
=======
            .cropper(options) //重新初始化裁剪区
    })

    // 为确认按钮绑定点击事件将图片上传到服务器
    $('#btnUpload').on('click', function () {
        // 1. 拿到用户裁剪之后的头像
>>>>>>> user
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
<<<<<<< HEAD
        // 2. 将拿到的数据发送到服务器上
        $.ajax({
            type: 'post',
=======
        // 2. 把头像上传到服务器
        $.ajax({
            method: 'POST',
>>>>>>> user
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
<<<<<<< HEAD
                // 返回校验
                if (res.status !== 0) {
                    return layer.msg('头像更新失败')
                }
                layer.msg('头像上传成功');
                // 然后重新加载左边栏的头像
                window.parent.getUserInfo();

            }
        })




=======
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUserInfo()
            }
        })

>>>>>>> user
    })


})