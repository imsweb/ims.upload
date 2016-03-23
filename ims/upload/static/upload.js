function build_chunks() {
  // build an unordered list from the json data
  // this is a listing of all incomplete upload chunks
  $.getJSON('chunk-listing').done(function(result) {
    if (result.length == 0) {
      $('#upload-chunks-listing').append('<span>')
                                 .addClass('discreet')
                                 .text('There are no partially uploaded files.')
    }
    else {
      $('#upload-chunks-listing').html('<ul>');
      $('#upload-chunks-listing ul').attr('id','chunked_listing');

      $.each(result, function(index,chunk) {
        link = $('<a>')
                     .attr('href',chunk.url)
                     .addClass('contenttype-'+chunk.portal_type.toLowerCase())
        linktext = $('<span>').text(chunk.title)
        link.append(linktext);
        descriptor = $('<span>').text(chunk.percent + ' of ' + chunk.size + ' completed')
                                .addClass('chunksize_descriptor')
        linkblock = $('<span>').append(link)
                               .append('[ ')
                               .append(descriptor)
                               .append(' ]')
                               .append(' &mdash; created on ' + chunk.date)
        delbutton = $('<a>').attr('href',chunk.url+'/@@delete')
                            .text('Delete')
                            .addClass('btn btn-danger delete');
        if ($('#can_delete')) {
          listitem = $('<li>').append(delbutton)
                              .append(' ')
                              .append(linkblock);
        }
        else {
          listitem = $('<li>').append(linkblock);
        }
        $('#upload-chunks-listing ul').append(listitem)
      });
    }
  });
}

function refreshlisting() {
  // build listing of partial uploads, build listing of completed uploads, toggle upload/cancel all buttons
  build_chunks();
  $("#upload-folder-listing").load("@@unchunk-listing",function(responseTxt,statusTxt,xhr){
    if(statusTxt=="error")
      $('#upload-chunks-listing').html("Error updating content listing: "+xhr.status+": "+xhr.statusText);
  });
  refresh_buttons();
}

function refresh_buttons() {
  if ( $('#files div').length > 0 ) {
    // if it doesn't have a button it's completed - only show the clear button
    if ( $('#files div button').length > 0 ) {
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
  fsize = parseFloat(fsize);
  if (fsize == 0) {
    return '0 B'
  }
  prefixes = ['B','KB','MB','GB','TB','PB']
  tens = Math.floor(Math.log(fsize)/Math.log(1024))
  fsize = fsize/Math.pow(1024,tens)
  if (tens < prefixes.length) {
    return fsize.toFixed(2) + ' ' + prefixes[tens]
  }
  else { // uhhhh, we should never have a file this big
    return fsize.toFixed(2) + fsize * Math.pow(1024,tens) + ' B'
  }
}

function abortize(ele,data) {
  // replace a button with an abort function
  ele.off('click')
    .text('Abort')
    .on('click', function () {
        uploaded = data._progress.loaded;
        ele.closest('p').find('img').remove();
        data.abort();
        resumify(ele,data,uploaded);
    });
}

function resumify(ele,data) {
  // replace a button with a resume function
  ele.off('click')
    .text('Resume')
    .removeClass('singular')
    .prop('disabled',false)
    .on('click', function () {
      // get the starting size when we hit click, so we can resume on that byte
      ele.text('Processing...')
      chunk_name = get_chunk_for_file(data.files[0].name) || data.files[0].name + '_chunk'
      $.getJSON(chunk_name+'/chunk-check').done(function(result) {
        data.uploadedBytes = result.uploadedBytes;
        data.submit();
        ele.parent().find('.glyphicon').remove();               // remove x-icon
        ele.parent().find(':contains("File upload")').remove(); // remove error text
        abortize(ele,data);
      });
    });
}

function update_name(file_name) {
  // strip out leading underscores
  while (file_name && file_name[0] == '_') {
    file_name = file_name.slice(1);
  }

  return file_name;
}

function get_current_files() {
  // get all completed files
  var filenames = new Array();
  contents = $('#upload-folder-listing a')
  for (i=0;i<contents.length;i++) {
    filenames.push($(contents[i]).text());
  };
  return filenames;
}

function get_chunk_for_file(file_name) {
  // for a given file name, see if we have a partially uploaded version

  contents = $('#upload-chunks-listing a')
  for (i=0;i<contents.length;i++) {
    var full_url = $(contents[i]).attr('href');
    if(full_url.split('/').pop() == file_name + '_chunk') {
      return full_url;
    }
  };
}

function update_progress(data) {
  // update the progress bar
  var progress = parseInt(data.loaded / data.total * 100, 10);
  $('#progress .progress-bar').css(
      'width',
      progress + '%'
  );
  $('#progress .progress-bar').html('&nbsp;' + progress + '%');
}

// assign event for upload all
$('#uploadAll').click(function() {
  $('#files button.singular').click();
});

// assign event for clear all
$('#clearAll').click(function() {
  $('#files div button').each(function (){
    var $this = $(this),
        data = $this.data();
    abortize($this,data);
  });
  $('#files div').remove();
  $('#progress .progress-bar').css('width','0%');
  $('#progress .progress-bar').text('');
  refreshlisting();
});

$(function () {
    // wrap in anonymous function
    'use strict';
    var url = '@@upload-chunk',
        // upload button to be added to individual files
        uploadButton = $('<button/>')
            .addClass('btn btn-primary singular')
            .prop('disabled', true)
            .text('Processing...')
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
              data.abort();
              refreshlisting();
              update_progress(data);
            }),
        spinner = $('<img>')
          .attr('src','spinner.gif')
          .addClass('upload-spinner');

    $('#fileupload').fileupload({
        // main fileupload
        url: url,
        dataType: 'json',
        dropZone: $('#dropzone'),
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
                var file_name = update_name(file.name);
                if (get_chunk_for_file(file_name)) {
                  $.getJSON(file.name+'_chunk/chunk-check').done(function(result) {
                    data.uploadedBytes = result.uploadedBytes;
                    // check size of the file to be uploaded against file on server's intended size
                    if (data.files[index].size && data.files[index].size != result.targetsize) { // check doesn't work on IE9, which has no file size
                      alert('Partially uploaded file size (' + printable_size(result.targetsize) + ') does not match size of selected file (' + printable_size(data.files[index].size) + ')' + '. Upload aborted.');
                      data.abort();
                      node.remove();
                      return null;
                    }
                    var percent_complete = (result.uploadedBytes/result.targetsize*100).toFixed(2)
                    resumify(node.find('.btn-primary.singular'),data);
                    node.append($('<span class="text-danger"/>').text(' A file with this name is ' + percent_complete + '% uploaded.'));
                  });
                }
                // check if we have a completed upload of the same name
                else if ($.inArray(file_name,get_current_files()) != -1) {
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
                   .prop('href', file.url+'/view');
               var child = $(data.context.children()[index]);
               child.find('.text-danger').remove(); // remove any old warning about duplicate files
               child.find('span').before('<span class="success glyphicon glyphicon-ok"/> '); // add ok icon
               child.find('button').remove(); // remove submit/clear buttons
               child.wrap(link);
               child.hide('slow', function(){ child.remove(); });
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
              switch(data.jqXHR.status) {
                  case 504:
                      error_text = 'The uploaded file is still processing and is taking longer than expected.  This happens with very large files.  Please check back in a few minutes by refreshing the page.'
                      break;
                  case 500:
                      error_text = 'An unexpected error has occurred.  Please contact the administrator at <a href="mailto:' + mailto + '">' + mailto + '</a>.'
                      break;
                  case 0:
                      error_text = 'File upload aborted.'
                      break;
                  default:
                      error_text = 'File upload failed. Server response: ' + data.jqXHR.status + ' - ' + data.jqXHR.statusText;
              }
            }
            var error = $('<span class="text-danger"/>').html(error_text),
                uploaded = data._progress.loaded,
                ele = $(data.context.children()[index]);
            data.abort();
            resumify(ele.find('.btn-primary'),data,uploaded);
            refreshlisting();
            $(data.context.children()[index])
                .append('<br>')
                .append('<span class="warning glyphicon glyphicon-remove"/> ')
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
});

refresh_buttons(); // initial button load

function xhr_support() {
  var xhr = new XMLHttpRequest();
  return !! (xhr && ('upload' in xhr) && ('onprogress' in xhr.upload));
}

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