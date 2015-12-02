$(document).ready(function() {
    $(".openterm").click(function(){
        var docHeight = document.documentElement.clientHeight;
        layer.open({
            type: 2,
            scrollbar: false,
            title:"用户协议",
            area: ['500px', '300px'],
            //content: $('#terms') //这里content是一个DOM
            content: "/misc/term/"
        });
    });

    $(".delete").click(function(){
        var pjid = $(this).attr("data-pjid");
        var curruid = $(this).attr("data-curruid");

        if(!!pjid) {
            var r = confirm("确认删除本项目吗?");
            if (r == true) {
                var url = 'http://' + window.location.host + '/api/v2/projects/' + pjid + '/?sign=hello0o0o0&curruid=' + curruid;
                var csrftoken = getCookie('csrftoken');
                $.ajaxSetup({
                    beforeSend: function(xhr, settings) {
                        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                            xhr.setRequestHeader("X-CSRFToken", csrftoken);
                        }
                    }
                });

                $.ajax({
                    type    :   "DELETE",
                    url     :   url,
                    data    :   {}
                }).done(function( val) {

                    if(val['code'] == 200){
                        alert("删除成功");
                        window.location.href = '.';
                    }else{
                        alert("删除失败：" + val['msg']);
                    }
                })
            } else {
                //pass
            }
        }
    });

    $(".uname,.pdrop").click(function(){
        var i = $(".logout").hasClass("hhide");
        if(i){
            $(".logout").removeClass("hhide");
            $(".pdrop").addClass("toright");
        }else{
            $(".logout").addClass("hhide");
            $(".pdrop").removeClass("toright");
        }
    })
});
