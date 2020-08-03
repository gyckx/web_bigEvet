$(function () {
    var form = layui.form
    var layer = layui.layer;
    var laypage = layui.laypage;


    // 美化时间的过滤器
    template.defaults.imports.dataFormat = function (date) {

        const dt = new Date(date);

        var y = padZer(dt.getFullYear());
        var m = padZer(dt.getMonth() + 1);
        var d = padZer(dt.getDate());

        var hh = padZer(dt.getHours());
        var mm = padZer(dt.getMinutes());
        var ss = padZer(dt.getSeconds());

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss

    }

    function padZer(n) {
        return n > 9 ? n : '0' + n

    }

    // 定义一个查询的参数对象
    // 需要将请求参数上传到服务器
    var q = ({
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state: ''   //文章的状态，可选值有：已发布、草稿
    })

    initTable();
    initCate()
    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('文章获取失败')
                }
                var htmlStr = template('tpl-table', res);

                $('tbody').html(htmlStr);
                renderPage(res.total)

            }
        })

    }

    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('数据获取失败')
                }
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr)
                form.render();


            }
        })

    }

    // 筛选
    $('#form-serach').on('submit', function (e) {
        e.preventDefault();
        // 获取表单中的值
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=cate_state]').val();

        q.cate_id = cate_id;
        q.state = state
        initTable()
    })

    // 封装一个实现分类的函数
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            limits: [2, 3, 5, 10],
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            // 使用jump回调函数来实现自己数据切换
            jump: function (obj, first) {
                // obj.curr 可以拿到当前切换的页码值
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                // 重新加载数据列表：如果直接加载 就会出现死循环
                // initTable();
                // jump函数的触发方式：1. 当前切换页码的时候触发 2. 调用 laypage.render 来触发
                // 解决方法：使用第二个参数first的值来解决：1. first=true 就是laypage.render 来触发
                // 2. first=defined的时候就是 切换页码的时候进行触发的
                if (!first) {

                    initTable();
                }



            }
        })



    }

    // 实现删除功能
    $('tbody').on('click', '.btn-delete', function () {
        // 获取需要删除项目的id值
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + id,
                // 数据已经通用/的方式将数据传入了服务器
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('数据删除失败');
                    }
                    layer.msg('数据删除成功');
                    // 删除一个页面中最后一个数据需要将页码的值减1重新渲染
                    // 页码的如果是1就不能减去1了
                    $('.btn-delete').length === 1 && q.pagenum > 1 && q.pagenum--
                    initTable();
                }
            })
            layer.close(index);
        });

    })







})