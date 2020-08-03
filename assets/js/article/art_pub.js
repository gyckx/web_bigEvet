$(function () {

    var layer = layui.layer;
    var form = layui.form;

    // 1.封装加载文章文类的函数
    initCate()
    // 初始化富文本编辑器
    initEditor()
    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('文章分类的数据获取失败')
                }
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                // form.render() 会使select标签的内容显示出来
                form.render();
            }
        })

    }

    // 2. 初始化图片裁剪器
    var $image = $('#image')

    // 3. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 4. 初始化裁剪区域
    $image.cropper(options)

    // 为了选择封面按钮设置点击事件 将隐藏的文件input拉去本地文件
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click();
    })
    // 5.拉文件的input被点击 ：来处理拉取的文件
    $('#coverFile').on('change', function (e) {
        // 获取文件的列表数组
        var files = e.target.files;
        // 判断文件是否选择了文件
        if (files.length === 0) {
            return
        }
        // 根据文件创建对应的url地址
        var newImgURL = URL.createObjectURL(files[0]);
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    // 6.发布文章功能的实现
    // 定义文章的状态:默认是已发布
    var art_state = '已发布'
    // 如果存入草稿被点击 修改文章的发布的状态
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })
    // 获取表单数据
    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        // 基于form表单创建一个FormData对象来获取表单数据
        var fd = new FormData(this);
        fd.append('state', art_state)
        // 验证是否拿到了数据
        // console.log(...fd);
        // 将裁剪后的文件输入：这里的是二进制文件 base64是字符串
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                // console.log(...fd);
                // 请求Ajax要在回调函数里面，因为生成图片耗时发送请求前图片必须已经存在
                publishArticle(fd) //发送请求的函数


            })



    })

    // 7.发布功能
    function publishArticle(fd) {
        $.ajax({
            type: 'post',
            url: '/my/article/add',
            data: fd,
            // 必须配置以下属性
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg('文章发布失败')
                }
                layer.msg('文章发布成功')
                location.href = '/article/art_list.html'
                window.parent.document.getElementById("a2").click();


            }
        })





    }







})