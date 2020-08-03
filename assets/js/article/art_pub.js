$(function () {

    var layer = layui.layer

    // 1.封装加载文章文类的函数
    initCate()
    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('文章分类的数据获取失败')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)

            }
        })

    }







})