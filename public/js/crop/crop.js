/**
 * Created by JAIR on 4/11/2017.
 */

var btnCropImage;
var btnLoadImageCrop;
var class_img_crop = 'imgMinPhoto';
var imageValueDefault = '';
var image_url = '';
var imgCrop;
var inputImageCrop;
var loadImageCrop;
var loadCrop;
var modal_crop;
var contentImgCrop;
var pictureCrop;

function cleanModalCrop() {
    btnCropImage.prop('disabled', false);
    imageValueDefault = '';
    imgCrop.cropper('destroy');
    imgCrop.attr('src','');
    inputImageCrop.val('');
    loadCrop.addClass('hide');
    console.log("fff0");
}

function generateCrop(module, url_image, i_width, i_height, i_radio, picture)
{
    btnCropImage = $('#btn-crop-image');
    var btnCropImageReplace = $('#btn-crop-image-replace');
    btnLoadImageCrop = $('#btn-load-image-crop');
    var contentItemMsgAddCrop = $('#contentItemMsgAddCrop');
    var contentMsgAddCrop = $('#contentMsgAddCrop');
    image_url = url_image;
    imgCrop = $('#imageCrop');
    inputImageCrop = $('#inputImageCrop');
    loadCrop = $('#loadCrop');
    loadImageCrop = $('#loadImageCrop');
    modal_crop = $('#modalCrop');
    contentImgCrop = $('.contentImgCrop');
    pictureCrop = $('#'+picture);
    console.log("fffff1");
    cleanModalCrop();

    modal_crop.on('shown.bs.modal', function (e) {
        readURLCrop(inputImageCrop[0], i_radio, i_width, i_height);
           console.log("fffff2");
    });

    modal_crop.on('hidden.bs.modal', function (e) {
           console.log("fffff4");
        cleanModalCrop();
           console.log("fffff3");
    });

    btnCropImageReplace.click(function(){
        console.log("fffff5");
        var input = inputImageCrop[0];
        if (input.files && input.files[0]) {
            imageValueDefault = input.files[0];
            console.log("fffff7");
        }
        console.log("fffff10");
        inputImageCrop.click();
    });

    btnCropImage.click(function(){
         console.log("fffff12");
        var croppedCanvas;
        croppedCanvas = imgCrop.cropper('getCroppedCanvas', {
            width: i_width,
            height: i_height
        });
        loadCrop.removeClass('hide');
        $(this).prop('disabled',true);
        getFillCanvas(croppedCanvas, function(canvas){
            var url = canvas.toDataURL('image/jpeg');
            modal_crop.modal('hide');
             console.log("fffff13");
            uploadImgCrop(url, module, contentItemMsgAddCrop, contentMsgAddCrop);
        });
         console.log("fffff14");
    });

    modulePicture();

    btnLoadImageCrop.click(function(e){
        inputImageCrop.click();
        e.preventDefault();
    });

    inputImageCrop.change(function() {
        var archivo = this.value;
        if (archivo != '') {
            var ext = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase();
            switch (ext) {
                case '.jpg':
                case '.jpeg':
                case '.png':
                case '.gif':
                    if (modal_crop.hasClass('in')) {
                        readURLCrop(this, i_radio, i_width, i_height);
                    } else {
                        modal_crop.modal('show');
                    }
                    break;
                default:
                    this.value = '';
            }
        }
    });

}

function getFillCanvas(sourceCanvas, callback) {
    var canvas = document.getElementById("heroCanvas");
    var context = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;
    var img = new Image();
    var input = inputImageCrop[0];
    if (input.files && input.files[0]) {
        input = input.files[0];
    } else if (imageValueDefault != '') {
        input = imageValueDefault;
    }
    if (input != '') {
        var reader = new FileReader();
        reader.onload = function (e) {
            img.src = e.target.result;
            img.onload = function () {
                canvas.width = width;
                canvas.height = height;
                context.fillStyle = '#FFFFFF';
                context.fillRect(0, 0, width, height);
                context.drawImage(sourceCanvas, 0, 0, width, height);
                if (typeof callback == 'function') {
                    callback(canvas);
                }
            };
        };
        reader.readAsDataURL(input);
    }
}

function launchCrop(source, ratio, width, height) {
    imgCrop.cropper('destroy');
    imgCrop.cropper({
        aspectRatio: ratio,
        dragMode: 'move',
        minCropBoxHeight: width,
        minCropBoxWidth: height
    });
}

function modulePicture (){
    $('.delItemCrop').click(function() {
        var that = $(this).closest('.'+class_img_crop);
        swal({
            title: '',
            text: '¿Está seguro que desea borrar esta imagen?',
            type: "warning",
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            closeOnConfirm: true
        }, function(){
            that.remove();
            pictureCrop.val('');
        });
    });
}

function readURLCrop(input, i_radio, i_width, i_height) {
    if (imgCrop.attr('src') == '') {
        imgCrop.addClass('hide');
        loadImageCrop.removeClass('hide');
    }
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if (imgCrop.attr('src') == '') {
                imgCrop.removeClass('hide');
                loadImageCrop.addClass('hide');
            }
            imgCrop.attr('src', e.target.result);
            launchCrop(e.target.result, i_radio, i_width, i_height);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function uploadImgCrop(url, module, contentItemMsgAddCrop, contentMsgAddCrop) {
    ajaxPost(module, {img:url}, function(){
        var div_temp = $('<div class="'+class_img_crop+'" id="temporal_crop"></div>');
        div_temp.append(contentItemMsgAddCrop);
        contentImgCrop.html(div_temp);
    }, function (response) {
        contentMsgAddCrop.html(contentItemMsgAddCrop);
        $('#temporal_crop').remove();
        pictureCrop.val(response.nameImg);
        uploadMorePicture();
    }, function () {
        contentMsgAddCrop.html(contentItemMsgAddCrop);
        $('#temporal_crop').remove();
    });
}

function uploadMorePicture() {
    if(pictureCrop.val() != '') {
        var pict_val = pictureCrop.val();
        var url_image = base_url + image_url + pict_val;
        var div_pict = $('<div class="'+class_img_crop+'" id="'+pict_val+'"></div>');
        var div = $('<div class="view_image"></div>');
        var span = $('<span class="fa fa-trash color-white delItemCrop"></span>');
        var img = $('<img id="img_produc" src="'+url_image+'" class="img-thumbnail" alt="" />');
        div.append(span);
        div.append(img);
        div_pict.append(div);
        contentImgCrop.html(div_pict);
        modulePicture();
    }
}