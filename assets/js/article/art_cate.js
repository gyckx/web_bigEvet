$(function () {

    // 为了弹出层申明layer
    var layer = layui.layer;

    // 将数据库中的数据渲染出来
    initArtCateLit();
    function initArtCateLit() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                var strHtml = template('tpl-table', res);
                $('tbody').html(strHtml)
            }
        })
    }

    // 给添加类别按钮设置事件 并且设置弹出层
    $('#btnAddCate').on('click', function () {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章类别',
            content: $('#dialog-add').html()
        })


    })




})