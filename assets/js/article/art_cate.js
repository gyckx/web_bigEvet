$(function () {

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




})