function _(el) {
    return document.getElementById(el);
}

function upload(inputid, id, url, name) {
    var files = _(inputid).files;
    var length = files.length;
    for (var i = 0; i < length; i++) {
        var file = files[i];
        if (file.name !== name) {
            continue;
        }

        var formdata = new FormData();
        formdata.append("file", file);
        var ajax = new XMLHttpRequest();
        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
        ajax.open("POST", url);
        ajax.send(formdata);

    }

    function progressHandler(event) {
        _("loaded_n_total_".concat(id)).innerHTML = "Uploaded " + event.loaded + " bytes of " + event.total;
        var percent = (event.loaded / event.total) * 100;
        _("progressBar_".concat(id)).value = Math.round(percent);
        _("status_".concat(id)).innerHTML = Math.round(percent) + "% uploaded... please wait";
    }

    function completeHandler(event) {
        _("status_".concat(id)).innerHTML = event.target.responseText;
        _("progressBar_".concat(id)).value = 0; //wil clear progress bar after successful upload
    }

    function errorHandler(event) {
        _("status_".concat(id)).innerHTML = "Upload Failed";
    }

    function abortHandler(event) {
        _("status_".concat(id)).innerHTML = "Upload Aborted";
    }
}

