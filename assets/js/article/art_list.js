$(function () {
    var form = layui.form
    var layer = layui.layer;

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

                $('tbody').html(htmlStr)

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







})