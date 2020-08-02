$(function () {

    // 为了弹出层申明layer
    var layer = layui.layer;

    // 1. 将数据库中的数据渲染出来
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

    //2. 给添加类别按钮设置事件 并且设置弹出层
    var addIndex = null
    $('#btnAddCate').on('click', function () {
        addIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章类别',
            content: $('#dialog-add').html()
        })
    })
    // 3. 实现添加内容
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('数据添加失败')
                }
                initArtCateLit() //加载数据库中的内容
                layer.msg('数据添加成功');
                layer.close(addIndex)
            }
        })

    })


    // 给编辑按钮设置事件绑定
    var editIndex = null;
    $('tbody').on('click', '#btn-edit', function () {
        // 设置弹出层
        editIndex = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章类别',
            content: $('#dialog-edit').html()
        })
        var id = $(this).attr('data-Id');
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                layui.form.val('form-edit', res.data)
            }
        })

    })
    //给编辑按钮设置 完成数据更新
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('数据更新失败')
                }
                layer.msg('数据更新成功');
                layer.close(editIndex)
                initArtCateList()
            }
        })

    })

    // 给删除按钮设置事件 完成功能
    $('tbody').on('click', '.btn-delete', function () {
        // 获取对应的id的值
        var id = $(this).attr('data-Id');
        layer.confirm('确认删除', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    initArtCateList()

                }
            })


        });


    })







})