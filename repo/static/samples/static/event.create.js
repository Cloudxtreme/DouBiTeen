function check_input(ispub){
    //ispub: 1 yes;2 no

    $("#jtickets").val("");
    $("#jguests").val("");

    var isagreed = $("input[name='isagreed']").is(':checked');
    if(isagreed == false ){
        alert("请确认已阅读并同意我们的《活动协议》");
        return false;
    }
    
    var cover = $("#cover").val();
    if(!cover){
        alert("请设置活动封面");
        return false;
    }
    
    var title = $("input[name='title']").val();
    if(title.length < 5 || title.length > 40){
        alert("活动标题长度需要在5至40个字符之内");
        return false;
    }
    
    /* 
    var desc = $("#editor").val();
    if(desc.length < 5 ){
        alert("活动详情长度至少要5个字符");
        return false;
    }
    if(desc.length > 200000){
        alert("活动详情太长啦");
        return false;
    }*/

    var city = $("input[name='city']").val();
    if(city.length < 2 || city.length > 10){
        alert("城市名称有误");
        return false;
    }

    var addr = $("input[name='addr']").val();
    if(addr.length < 2 || addr.length > 50){
        alert("具体地址长度需要在2至50个字符之内");
        return false;
    }

    var start = $("input[name='start']").val();
    if(!start.length){
        alert("请选择活动开始时间");
        return false;
    }

    var end = $("input[name='end']").val();
    if(!end.length){
        alert("请选择活动结束时间");
        return false;
    }
   
    var sstart  = new Date(Date.parse($("input[name='start']").val(),"yyyy/MM/dd HH:mm"));
    var send    = new Date(Date.parse($("input[name='end']").val(),"yyyy/MM/dd HH:mm"));
    if(sstart >= send){
        alert("活动开始与结束时间设置有误");
        return false;
    }
    
    if(ispub == 1){
        var content = $("textarea[name='content']").val();
        if(content.length <= 10){
            alert("活动详情至少10个字符");
            return false;
        }
    }

    var eventtype=$("input[name='eventtype']:checked").val();
    if(eventtype == "0"){
        //免费
        var limits = $("input[name='limits']").val();
        if(!limits){
            //zero
        }else{
            if(Math.floor(limits) == limits && $.isNumeric(limits)){
                //float
            }else{
                alert("限制人数输入有误");
                return false;
            }
        }
    }else if(eventtype == "1"){
        var isverify = $('#isverify').is(':checked');
        if(isverify){
            alert("只有免费活动才能审核哦");
            $('#isverify').prop('checked', false);
            return false;
        }

        //收费
        var listItems = $(".ticket");
        if( listItems.length <= 0 && ispub == 1){
            alert("收费活动需要设置至少一种门票");
            return false;
        }

        listItems.each(function(idx, li) {
            var oid= $(li).attr("data-id");
            var name = $(li).attr("data-tname");
            var desc = $(li).attr("data-tdesc");
            var price = $(li).attr("data-tprice");
            var qty = $(li).attr("data-tqty");
            
            /*
            if(Math.floor(price) == price && $.isNumeric(price)){
                //float
            }else{
                return true;
            }*/

            if(name){
                var d = '{\"name\":\"'+name+'\", \"price\":'+price+', \"cnt\":'+qty+', \"desc\":\"'+desc+'\"}';
                if(oid){
                    var d = '{\"name\":\"'+name+'\", \"price\":'+price+', \"cnt\":'+qty+', \"desc\":\"'+desc+'\",\"id\":'+oid+'}';
                }

                var jtickets = $("#jtickets").val();
                
                if(jtickets.length > 0){
                    jtickets += "," + d
                    $("#jtickets").val(jtickets);
                }else{
                    jtickets = d
                    $("#jtickets").val(jtickets);
                }
            }
        });
    }else{
        alert("请选择正确的活动类型");
        return false;
    }

    //以下非必填项目
    var listItems = $(".lists-guest ul li");
    listItems.each(function(idx, li) {
        var oid= $(li).attr("data-id");
        var name = $(li).attr("data-name");
        var company= $(li).attr("data-company");
        var title= $(li).attr("data-title");
        var avatar= $(li).attr("data-avatar");
        
        if(name && company && title && avatar){
            var d = '{\"name\":\"'+name+'\", \"company\":\"'+company+'\", \"title\":\"'+title+'\",\"avatar\":\"'+avatar+'\"}';
            if(oid){
                var d = '{\"name\":\"'+name+'\", \"company\":\"'+company+'\", \"title\":\"'+title+'\",\"avatar\":\"'+avatar+'\", \"id\":'+oid+'}';
            }

            var jguests= $("#jguests").val();
            
            if(jguests.length > 0){
                jguests += "," + d
                $("#jguests").val(jguests);
            }else{
                jguests = d
                $("#jguests").val(jguests);
            }
        }
    });

    var listItems = $(".lists-owner ul li");
    listItems.each(function(idx, li) {
        var oid= $(li).attr("data-id");
        var name = $(li).attr("data-name");
        
        if(name){
            var d = '{\"name\":\"' + name + '\"}';
            if(oid){
                var d = '{\"name\":\"' + name + '\", \"id\":'+oid+'}';
            }

            var jowners= $("#jowners").val();
            
            if(jowners.length > 0){
                jowners += "," + d
                $("#jowners").val(jowners);
            }else{
                jowners = d
                $("#jowners").val(jowners);
            }
        }

    });

    return true
}

$(document).on("click",".ticket",function(e){
     if( $(e.target).closest(".moveit").length > 0 ) {
        return false;
     }

    var name = $(this).attr("data-tname");
    var desc= $(this).attr("data-tdesc");
    var price= $(this).attr("data-tprice");
    var qty  = $(this).attr("data-tqty");
    var tid  = $(this).attr("data-id");
    var fakeiid  = $(this).attr("data-fakeiid");
    
    if(tid){
        $(".oldid").val(tid);
    }
    if(fakeiid){
        $(".fakeiid-ticket").val(fakeiid);
    }

    $(".tname").val(name);
    $(".tdesc").val(desc);
    $(".tprice").val(price);
    $(".tqty").val(qty);

    layer.open({
        type: 1,
        scrollbar: false,
        title:"修改票种",
        maxWidth:960,
        content: $('#inc-add-ticket') //这里content是一个DOM
    });

})

$(document).on("click",".guest",function(e){
    if( $(e.target).closest(".moveit").length > 0 ) {
        return false;
    }

    var name = $(this).attr("data-name");
    var company= $(this).attr("data-company");
    var title= $(this).attr("data-title");
    var avatar= $(this).attr("data-avatar");
    var tid  = $(this).attr("data-id");
    var fakeiid  = $(this).attr("data-fakeiid");
    
    if(tid){
        $(".oldidg").val(tid);
    }
    if(fakeiid){
        $(".fakeiid-guest").val(fakeiid);
    }

    $(".gname").val(name);
    $(".gcompany").val(company);
    $(".gtitle").val(title);
    $(".avatar-preview").attr("src",avatar);

    layer.open({
        type: 1,
        scrollbar: false,
        title:"修改嘉宾信息",
        maxWidth:960,
        content: $('#inc-add-guest') //这里content是一个DOM
    });

})

$(document).on("click",".owner",function(e){
    if( $(e.target).closest(".moveit").length > 0 ) {
        return false;
    }

    var name = $(this).attr("data-name");
    var tid  = $(this).attr("data-id");
    var fakeiid  = $(this).attr("data-fakeiid");
    
    if(tid){
        $(".oldidg3").val(tid);
    }

    $(".oname").val(name);

    if(fakeiid){
        $(".fakeiid-owner").val(fakeiid);
    }

    layer.open({
        type: 1,
        scrollbar: false,
        title:"修改主办方信息",
        maxWidth:960,
        content: $('#inc-add-owner') //这里content是一个DOM
    });

})

$(document).on("click",".cover-li",function(){
    var listItems = $("#inc-upload-images ul li");
    listItems.each(function(idx, li) {
        $("img",li).css("border","none");
    });

    $("img",this).css("border","2px solid green");
    var src= $("img",this).attr("src");
    $("#cover").val(src);
    $(".preview").attr("src",src);
    $(".preview").css("border-radius","10px");
})

$(document).on("click",".moveit",function(){
    $(this).parent().remove();
})

$(document).ready(function() {

    window.onbeforeunload = function() {
        return "确定要关闭本页面吗？"
    }

    var eventid = $("input[name='eventid']").val();
    /*
    var editor = new Simditor({
          textarea: $('#editor'),
          toolbar: ['bold' ,'italic' ,'underline' ,'strikethrough' ,'color' , 'ol' ,'ul' ,'blockquote' , 'code' , 'table', 'image', 'hr' ,'indent', 'outdent', 'alignment' ,'|', 'html','fullscreen'],
          toolbarFloat:false,
          upload:{
            url: 'http://' + window.location.host + '/misc/upload/',
            params: null,
            fileKey: 'upload_file',
            connectionCount: 2,
            leaveConfirm: '正在上传文件，如果离开上传会自动取消',
            }
    });*/

    $(".choosecover").click(function(){
        layer.open({
            type: 1,
            scrollbar: false,
            title:"选择图片",
            maxWidth:1000,
            content: $('#inc-upload-images') //这里content是一个DOM
        });
    })

    $(".buyt").click(function(){
        $(".tname").val("");
        $(".tdesc").val("");
        $(".tprice").val("");
        $(".tqty").val("");
        $(".fakeiid-ticket").val("");

        layer.open({
            type: 1,
            scrollbar: false,
            title:"添加票种",
            maxWidth:960,
            content: $('#inc-add-ticket') //这里content是一个DOM
        });
    })

    $(".add-guest").click(function(){
        $(".gname").val("");
        $(".gcompany").val("");
        $(".gtitle").val("");
        $(".avatar-preview").attr("src","http://daji.im/static/img/davatar.png");
        $(".fakeiid-guest").val("");

        layer.open({
            type: 1,
            scrollbar: false,
            title:"添加嘉宾",
            maxWidth:960,
            content: $('#inc-add-guest') //这里content是一个DOM
        });
    })

    $(".add-owner").click(function(){
        $(".oname").val("");
        $(".fakeiid-owner").val("");

        layer.open({
            type: 1,
            scrollbar: false,
            title:"添加主办方",
            maxWidth:960,
            content: $('#inc-add-owner') //这里content是一个DOM
        });
    })

    $(".goupload").click(function(){
        layer.closeAll();
    })


    
    var test=new Vcity.CitySelector({input:'citySelect'});

    jQuery('#dtstart').datetimepicker({
        lang:'zh',
        i18n:{
            zh:{
                months:[
                    '一月','二月','三月','四月',
                    '五月','六月','七月','八月','九月',
                    '十月','十一月','十二月',
                ],
                
                dayOfWeek:[
                    "周日", "周一", "周二", "周三", 
                    "周四", "周五", "周六",
                ]
            }
        },
        dayOfWeekStart:1,
        minDate:0,
        onSelectTime:function(ct,$i){
            ct.setHours(ct.getHours() + 3); 
            $("#dtend").val(ct.dateFormat('Y/m/d H:i'));
        }
    });

    jQuery('#dtend').datetimepicker({
        lang:'zh',
        i18n:{
            zh:{
                months:[
                    '一月','二月','三月','四月',
                    '五月','六月','七月','八月','九月',
                    '十月','十一月','十二月',
                ],
                
                dayOfWeek:[
                    "周日", "周一", "周二", "周三", 
                    "周四", "周五", "周六",
                ]
            }
        },
        dayOfWeekStart:1,
        minDate:0,
    });
    

    $('input:radio[name="eventtype"]').change(function(){
            if ($(this).is(':checked') ){
                if( $(this).val() == '0') {
                    //免费
                    
                    $(".free-a").show(duration=400);
                    $(".charge-a").hide(duration=400);
                    $(".charge-b").hide(duration=400);

                    /*
                    $(".free-a").css("display","inline-block");
                    $(".charge-a").css("display","none");
                    $(".charge-b").css("display","none");
                    */
                }else{
                    $(".free-a").hide(duration=400);
                    $(".charge-a").show(duration=400);
                    $(".charge-b").show(duration=400);
                }
        }
    });
    
    $(".add-new-ticket").click(function(){
        var name    =$(".tname").val();
        var price   =$(".tprice").val();
        var qty     =$(".tqty").val();
        var desc    =$(".tdesc").val();
        var tid     =$(".oldid").val();
        var fakeiid =$(".fakeiid-ticket").val();
        
        if(name.length <= 1 || name.length > 10){
            alert("门票名称长度需要在1-10个字符之间");
            return false;
        }

        if(Math.floor(price) == price && $.isNumeric(price)){
            if(price < 0){
                alert("门票价格有误");
                return false;
            }
        }else{
            alert("门票价格有误");
            return false;
        }

        if(Math.floor(qty) == qty && $.isNumeric(qty)){
            //float
        }else{
            alert("门票数量有误");
            return false;
        }
        
        
        if(!tid){
            if(fakeiid){
                $(".ticket").each(function(){
                    var thisiid = $(this).attr("data-fakeiid");
                    if (thisiid == fakeiid){
                        $(this).attr("data-tname", name);
                        $(this).attr("data-tdesc", desc);
                        $(this).attr("data-tprice",price );
                        $(this).attr("data-tqty", qty);

                        $(this).find(".tname").text(name + '*' + qty);
                        $(this).find(".tprice").text(price);
                    }
                })
            }else{
                var fakeiid = (new Date).getTime();
                var newh = '<li class="ticket btn-b" data-fakeiid="'+fakeiid+'" data-tname="'+name+'" data-tdesc="'+desc+'" data-tprice="'+price+'" data-tqty="'+qty+'"><div class="tname">' + name + '*' + qty + '</div><div class="tprice">' + price + '</div><div class="moveit"></div></li>';
                $(".charge-b ul").append(newh);
            }
        }else{
            $(".ticket").each(function(){
                var thisid = $(this).attr("data-id");
                if (thisid == tid){
                    $(this).attr("data-tname", name);
                    $(this).attr("data-tdesc", desc);
                    $(this).attr("data-tprice",price );
                    $(this).attr("data-tqty", qty);

                    $(this).find(".tname").text(name + '*' + qty);
                    $(this).find(".tprice").text(price);
                }
            })
        }
        layer.closeAll();

        $(".tname").val('');
        $(".tprice").val('');
        $(".tqty").val('');
        $(".tdesc").val('');
        $(".oldid").val('');
    })

    

    $(".add-new-guest").click(function(){
        var name    =$(".gname").val();
        var company =$(".gcompany").val();
        var title   =$(".gtitle").val();
        var avatar  =$(".avatar-preview").attr("src");
        var tid =$(".oldidg").val();
        var fakeiid =$(".fakeiid-guest").val();
        
        if(name.length < 2 || name.length > 10){
            alert("姓名长度需要在2-10个字符之间");
            return false;
        }
        if(!company ){
            alert("请填写公司名称");
            return false;
        }

        if(!title){
            alert("请填写职位");
            return false;
        }
        
        if(!tid){
            if(fakeiid){
                $(".guest").each(function(){
                    var thisiid = $(this).attr("data-fakeiid");
                    if (thisiid == fakeiid){
                        $(this).attr("data-name", name);
                        $(this).attr("data-company", company);
                        $(this).attr("data-title",title);
                        $(this).attr("data-avatar", avatar);

                        $(this).find(".avatar").attr("src",avatar);
                        $(this).find(".gname").text(name);
                        $(this).find(".gcompany").text(company);
                        $(this).find(".gtitle").text(title);
                    }
                })
            }else{
                var fakeiid = (new Date).getTime();
                var newh='<li class="guest btn-b" data-fakeiid="'+fakeiid+'" data-name="'+name+'" data-company="'+company+'" data-title="'+title+'" data-avatar="'+avatar+'"><div class="avatar"><img src="'+avatar+'"></div><div class="ginfo"><div class="gname">'+name+'</div><div><span class="gcompany small1">'+company+'</span><span class="gtitle small1">'+title+'</span></div></div><div class="moveit"></div></li>';
            }

            $(".lists-guest ul").append(newh);
        }else{
            $(".guest").each(function(){
                var thisid = $(this).attr("data-id");
                if (thisid == tid){
                    $(this).attr("data-name", name);
                    $(this).attr("data-company", company);
                    $(this).attr("data-title",title);
                    $(this).attr("data-avatar", avatar);

                    $(this).find(".avatar").attr("src",avatar);
                    $(this).find(".gname").text(name);
                    $(this).find(".gcompany").text(company);
                    $(this).find(".gtitle").text(title);
                }
            })

        }

        layer.closeAll();
        $(".gname").val('');
        $(".gcompany").val('');
        $(".gtitle").val('');
        $(".avatar-preview").attr('src','');
        $(".oldidg").val('');
    })

    $(".add-new-owner").click(function(){
        var name    =$(".oname").val();
        var fakeiid =$(".fakeiid-owner").val();
        var tid =$(".oldidg3").val();
        
        if(name.length < 2 || name.length > 20){
            alert("主办方名称长度需要在2-20个字符之间");
            return false;
        }
        
        if(!tid){ 
            if(fakeiid){
                $(".owner").each(function(){
                    var thisiid = $(this).attr("data-fakeiid");
                    if (thisiid == fakeiid){
                        $(this).attr("data-name", name);
                        $(this).find(".myoname").text(name);
                    }
                });

            }else{
                var fakeiid = (new Date).getTime();
                var newh='<li class="owner btn-b" data-fakeiid="' + fakeiid + '" data-name="'+name+'"><span class="myoname">'+name+'</span><div class="moveit"></div></li>';
                $(".lists-owner ul").append(newh);
            }
        }else{
            $(".owner").each(function(){
                var thisid = $(this).attr("data-id");
                if (thisid == tid){
                    $(this).attr("data-name", name);

                    $(this).find(".myoname").text(name);
                }
            })

        }
        $(".oldidg3").val('');
        $(".oname").val('');
        layer.closeAll();
    })

    $(".adv-coll").click(function(){
        var ishide = $(".advances").css("display");
        if(ishide == 'none'){
            $(".advances").show(duration=400);
            $(".adv-coll .rright").addClass("advance_r");
            $(".adv-coll .rright").removeClass("advance");

        }else{
            $(".advances").hide(duration=400);
            $(".adv-coll .rright").addClass("advance");
            $(".adv-coll .rright").removeClass("advance_r");

        }
    })


    $(".pub , .save").click(function(){
        window.onbeforeunload = null;

        var ispub = $(this).hasClass("pub");
        var ispub2 = 1;
        if(ispub == true){
            var ispub2 = 1;
            $("#ispub").val("1");
        }else{
            var ispub2 = 2;
            $("#ispub").val("0");
        }
        
        var r = check_input(ispub2); 
        
        if(r == true){
            $("#event_create_form").submit();
        }
    })

    $(".openterm").click(function(){
        var docHeight = document.documentElement.clientHeight;
        layer.open({
            type: 2,
            scrollbar: false,
            title:"活动协议",
            area: ['500px', '300px'],
            //content: $('#terms') //这里content是一个DOM
            content: "/misc/term/",
        });
    })

    $('#isverify').change(function() {
        if($(this).is(":checked")) {
            var eventtype=$("input[name='eventtype']:checked").val();
            if(eventtype == "1"){
                alert("只有免费活动才能审核哦");
                $('#isverify').prop('checked', false);
                return false;
            }
        }
    });
});

