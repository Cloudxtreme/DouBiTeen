$(function() {
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles',
        container: 'inc-upload-images',
        drop_element: 'inc-upload-images',
        max_file_size: '5mb',
        flash_swf_url: 'js/Moxie.swf',
        dragdrop: false,
        chunk_size: '4mb',
        uptoken_url: '/niu/token/',
        domain: 'http://img01.daji.im/',
         unique_names: true,
        auto_start: true,
        init: {
            'FilesAdded': function(up, files) {
            },
            'BeforeUpload': function(up, file) {
                $(".psing").removeClass("hhide");
            },
            'UploadProgress': function(up, file) {
            },
            'UploadComplete': function() {
                $(".psing").addClass("hhide");
            },
            'FileUploaded': function(up, file, info) {
                 var domain = up.getOption('domain');
                 var res = jQuery.parseJSON(info);
                 var sourceLink = domain + res.key;
                 $("#pickfiles").parent().after('<li class="cover-li"><img src="'+sourceLink+'"></li>')
            },
            'Error': function(up, err, errTip) {
                alert("上传失败：" + errTip);
            }
        }
    });

    var uploader2 = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles2',
        container: 'con2',
        drop_element: 'con2',
        max_file_size: '5mb',
        flash_swf_url: 'js/Moxie.swf',
        dragdrop: false,
        chunk_size: '4mb',
        uptoken_url: '/niu/token/',
        domain: 'http://img01.daji.im/',
         unique_names: true,
        auto_start: true,
        init: {
            'FilesAdded': function(up, files) {
            },
            'BeforeUpload': function(up, file) {
                $(".psing").removeClass("hhide");
            },
            'UploadProgress': function(up, file) {
            },
            'UploadComplete': function() {
                $(".psing").addClass("hhide");
            },
            'FileUploaded': function(up, file, info) {
                 var domain = up.getOption('domain');
                 var res = jQuery.parseJSON(info);
                 var sourceLink = domain + res.key;
                $(".avatar-preview").attr("src",sourceLink);
            },
            'Error': function(up, err, errTip) {
                alert("上传失败：" + errTip);
            }
        }
    });
});
