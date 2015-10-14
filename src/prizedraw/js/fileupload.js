$(document).ready(function(){
        $.ajax({
                type    :   "GET",
                url     :   "http://test.daji.im/api/misc/phone_and_code_list/",
                dataType:  "jsonp",
                complete: function(d){
                      console.log(phone)
                      console.log(code)
                }
            });
});
