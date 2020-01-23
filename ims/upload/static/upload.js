/* global require */


function build_chunks() {
    // build an unordered list from the json data
    // this is a listing of all incomplete upload chunks
    var chunk_listing = $('#upload-chunks-listing');

    $.getJSON('chunk-listing').done(function (result) {
        if (result.length == 0) {
            chunk_listing.append('<span>')
                .addClass('discreet')
                .text('There are no partially uploaded files.')
        }
        else {
            chunk_listing.html('<ul>');
            chunk_listing.find('ul').attr('id', 'chunked_listing');

            $.each(result, function (index, chunk) {
                var link = $('<a>')
                    .attr('href', chunk.url)
                    .addClass('contenttype-' + chunk.portal_type.toLowerCase());
                var linkicon = $('<i>')
                    .addClass('glyphicon')
                    .addClass('glyphicon-warning-sign');
                var linktext = $('<span>').text(chunk.title);
                link.append(linkicon);
                link.append(linktext);
                var descriptor = $('<span>').text(chunk.percent + ' of ' + chunk.size + ' completed')
                    .addClass('chunksize_descriptor');
                var linkblock = $('<span>').append(link)
                    .append('[ ')
                    .append(descriptor)
                    .append(' ]')
                    .append(' &mdash; created on ' + chunk.date);
                var delbutton = $('<a>').attr('href', chunk.url + '/@@delete?_authenticator=' + $('#_authenticator').val())
                    .text('Delete')
                    .addClass('btn btn-danger delete');
                if ($('#can_delete')) {
                    var listitem = $('<li>').append(delbutton)
                        .append(' ')
                        .append(linkblock);
                }
                else {
                    var listitem = $('<li>').append(linkblock);
                }
                chunk_listing.find('ul').append(listitem)
            });
        }
    });
}

function refreshlisting() {
    if ($('#upload-marker')) {

        // build listing of partial uploads, build listing of completed uploads, toggle upload/cancel all buttons
        build_chunks();
        $("#upload-folder-listing").load("@@unchunk-listing", function (responseTxt, statusTxt, xhr) {
            if (statusTxt == "error")
                $('#upload-chunks-listing').html("Error updating content listing: " + xhr.status + ": " + xhr.statusText);
        });
        refresh_buttons();
    }
}

function refresh_buttons() {
    var files = $('#files');
    if (files.find('div').length > 0) {
        // if it doesn't have a button it's completed - only show the clear button
        if (files.find('div button').length > 0) {
            $('#uploadAll').show();
        }
        else {
            $('#uploadAll').hide();
        }
        $('#clearAll').show();
    }
    else {
        $('#uploadAll').hide();
        $('#clearAll').hide();
    }
}

function printable_size(fsize) {
    if (fsize) {
        fsize = parseFloat(fsize);
    }
    if (fsize == 0) {
        return '0 B'
    }
    var prefixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'],
        tens = Math.floor(Math.log(fsize) / Math.log(1024)),
        fsize = fsize / Math.pow(1024, tens);
    if (tens < prefixes.length) {
        return fsize.toFixed(2) + ' ' + prefixes[tens]
    }
    else { // uhhhh, we should never have a file this big
        return fsize.toFixed(2) + fsize * Math.pow(1024, tens) + ' B'
    }
}

function abortize(ele, data) {
    // replace a button with an abort function
    ele.off('click')
        .text('Abort')
        .on('click', function () {
            var uploaded = data._progress.loaded;
            ele.closest('p').find('img').remove();
            data.abort();
            resumify(ele, data, uploaded);
        });
}

function xhr_support() {
    var xhr = new XMLHttpRequest();
    return !!(xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));
}

function resumify(ele, data) {
    // replace a button with a resume function
    ele.off('click')
        .text('Resume')
        .removeClass('singular')
        .prop('disabled', false)
        .on('click', function () {
            // get the starting size when we hit click, so we can resume on that byte
            ele.text('Processing...');
            var chunk_name = get_chunk_for_file(data.files[0].name) || data.files[0].name + '_chunk';
            $.getJSON(chunk_name + '/chunk-check').done(function (result) {
                data.uploadedBytes = result.uploadedBytes;
                data.submit();
                ele.parent().find('.glyphicon').remove();               // remove x-icon
                ele.parent().find(':contains("File upload")').remove(); // remove error text
                abortize(ele, data);
            }).fail(function () {
                ele.text('Failed');
            });
        });
}

function get_current_files() {
    // get all completed files
    var filenames = [];
    var contents = $('#upload-folder-listing').find('a');
    for (var i = 0; i < contents.length; i++) {
        var url_parts = $(contents[i]).attr('href').split('/');
        filenames.push(url_parts[url_parts.length - 1]);
    }
    return filenames;
}

function get_chunk_for_file(file_name) {
    // for a given file name, see if we have a partially uploaded version
    var contents = $('#upload-chunks-listing').find('a');
    for (var i = 0; i < contents.length; i++) {
        var full_url = $(contents[i]).attr('href');
        if (full_url.split('/').pop() == file_name + '_chunk') {
            return full_url;
        }
    }
}

function update_progress(data) {
    // update the progress bar
    var progress = parseInt(data.loaded / data.total * 100, 10),
        progressEl = $('#progress');

    progressEl.find('.progress-bar').css(
        'width',
        progress + '%'
    );
    progressEl.find('.progress-bar').html('&nbsp;' + progress + '%');
}

function make_dropzone() {
    $(document).bind('dragover', function (e) {
        var dropZone = $('#dropzone'),
            timeout = window.dropZoneTimeout;
        if (!timeout) {
            dropZone.addClass('in');
        } else {
            clearTimeout(timeout);
        }
        var found = false,
            node = e.target;
        do {
            if (node === dropZone[0]) {
                found = true;
                break;
            }
            node = node.parentNode;
        } while (node != null);
        if (found) {
            dropZone.addClass('hover');
        } else {
            dropZone.removeClass('hover');
        }
        window.dropZoneTimeout = setTimeout(function () {
            window.dropZoneTimeout = null;
            dropZone.removeClass('in hover');
        }, 100);
    });
}

$(document).ready(function () {
    // assign event for upload all
    var filesEl = $('#files'),
        progressel = $('#progress');
    $('#uploadAll').click(function () {
        filesEl.find('button.singular').click();
    });

    // assign event for clear all
    $('#clearAll').click(function () {
        filesEl.find('div button').each(function () {
            var $this = $(this),
                data = $this.data();
            abortize($this, data);
        });
        filesEl.find('div').remove();
        progressel.find('.progress-bar').css('width', '0%');
        progressel.find('.progress-bar').text('');
        refreshlisting();
    });

    make_dropzone();
    refresh_buttons(); // initial button load

    var url = '@@upload-chunk',
        // upload button to be added to individual files
        uploadButton = $('<button/>')
            .addClass('btn btn-primary singular')
            .text('Upload')
            .on('click', function () {
                var $this = $(this),
                    data = $this.data();
                abortize($this, data);
                data.submit();
            }),
        // cancel button to be added to individual files
        cancelButton = $('<button/>')
            .addClass('btn btn-warning')
            .text('Clear')
            .click(function () {
                var $this = $(this),
                    data = $this.data();
                $this.closest('div').remove();
                refreshlisting();
                update_progress(data);
            });

    $('#fileupload').fileupload({
        // main fileupload
        url: url,
        maxRetries: 100,
        retryTimeout: 500,
        formData: {'_authenticator': $('#_authenticator').val()},
        dataType: 'json',
        sequentialUploads: true,
        //dropZone: $('#dropzone'),
        autoUpload: false,
        maxChunkSize: parseInt($('#chunksize').attr('data')),
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 100,
        previewMaxHeight: 100,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
        // add file event
        data.context = $('<div/>').appendTo('#files');
        $.each(data.files, function (index, file) {
            var file_text = file.name;
            if (file.size) {
                file_text += ' - ' + printable_size(file.size)
            }
            var node = $('<p/>')
                .append($('<span/>').text(file_text));
            if (!index) {
                // add buttons
                node.append('<br>')
                    .append(uploadButton.clone(true).data(data))
                    .append(' ')
                    .append(cancelButton.clone(true).data(data));
                // check if we have a partially uploaded file of the same name
                if (get_chunk_for_file(file.name)) {
                    $.getJSON(file.name + '_chunk/chunk-check').done(function (result) {
                        data.uploadedBytes = result.uploadedBytes;
                        // check size of the file to be uploaded against file on server's intended size
                        if (data.files[index].size && data.files[index].size != result.targetsize) { // check doesn't work on IE9, which has no file size
                            alert('Partially uploaded file size (' + printable_size(result.targetsize) + ') does not match size of selected file (' + printable_size(data.files[index].size) + ')' + '. Upload aborted.');
                            data.abort();
                            node.remove();
                            return null;
                        }
                        var percent_complete = (result.uploadedBytes / result.targetsize * 100).toFixed(2);
                        resumify(node.find('.btn-primary.singular'), data);
                        node.append($('<span class="text-danger"/>').text(' A file with this name is ' + percent_complete + '% uploaded.'));
                    });
                }
                // check if we have a completed upload of the same name
                else if ($.inArray(encodeURIComponent(file.name), get_current_files()) != -1) {
                    node.append($('<span class="text-danger"/>').text(' WARNING - file already exists and will be overwritten'));
                }
            }
            node.appendTo(data.context);
        });
        refresh_buttons();
    }).on('fileuploadprocessalways', function (e, data) {
        // process always event
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            node
                .prepend('<br>')
                .prepend(file.preview);
        }
        if (file.error) {
            node
                .append($('<span class="text-danger file-fail"/>').text(file.error));
        }
        if (index + 1 === data.files.length) {
            data.context.find('button.singular')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }
    }).on('fileuploadprogressall', function (e, data) {
        // progress all event
        update_progress(data);
    }).on('fileuploaddone', function (e, data) {
        // upload done event
        $.each(data.result.files, function (index, file) {
            $(data.context.children()[index]).find('img').remove();
            if (file.url) {
                var link = $('<a>')
                    .attr('target', '_blank')
                    .prop('href', file.url + '/view');
                var child = $(data.context.children()[index]);
                child.find('.text-danger').remove(); // remove any old warning about duplicate files
                child.find('span').before('<span class="success glyphicon glyphicon-ok"/> '); // add ok icon
                child.find('button').remove(); // remove submit/clear buttons
                child.wrap(link);
                child.hide('slow', function () {
                    child.remove();
                });
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            }
        });
        refreshlisting();
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index, file) {
            var error_text = 'File upload failed. An unknown error has occurred.',
                mailto = $('#mailto').val();
            if (xhr_support()) {
                switch (data.jqXHR.status) {
                    case 504:
                        error_text = 'The uploaded file is still processing and is taking longer than expected.  This happens with very large files.  Please check back in a few minutes by refreshing the page.';
                        break;
                    case 500:
                        error_text = 'An unexpected error has occurred.  You can retry your upload, or if the problem persists please contact the administrator at <a href="mailto:' + mailto + '">' + mailto + '</a>.';
                        break;
                    case 0:
                        error_text = 'File upload aborted.';
                        break;
                    case 200: // 200 because it redirects to a login page
                        error_text = 'File upload failed. You may not have permission to upload large files to this directory.';
                        break;
                    default:
                        error_text = 'File upload failed. Server response: ' + data.jqXHR.status + ' - ' + data.jqXHR.statusText;
                }
            }
            var error = $('<span class="text-danger"/>').html(error_text),
                uploaded = data._progress.loaded,
                ele = $(data.context.children()[index]);
            data.abort();
            resumify(ele.find('.btn-primary'), data, uploaded);
            refreshlisting();
            $(data.context.children()[index])
                .append('<br>')
                .append('<span class="warning glyphicon glyphicon-remove"/> ')
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');

    $.ajaxSetup({cache: false});
    refreshlisting();
});