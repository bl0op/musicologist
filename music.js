'use strict'

var musicInfo = [];

function addSongFromField(event) {
  event.preventDefault();

  const string = $('#musicField').eq(0).val();
  var info = string.split(',');

  info.forEach(function (tag){ 
      tag = $.trim(tag);
      if(tag){ 
          musicInfo.push(tag);
      }});
  renderList();
  $('#musicField').eq(0).val('');
}

$('#addButton').click(addSongFromField);
$('#musicField').keyup(function(event) {
  if (event.which == 13) { // User presses Enter
    addSongFromField(event);
  }
});

function renderList() {
  const $list = $('.info').eq(0);

  $list.empty();

  for (const info of musicInfo) {
    const $item = $('<li class="list-group-item">').text(info);

    $list.append($item)
  }
}

function renderResults(result){
    //console.log(result);
    var resultEl = $('<div class="col-12 col-md-2 text-center bg-light m-1 border rounded"></div>');
    //append image
    resultEl.append($('<img class="m-2 border rounded">').attr('src', result['artworkUrl100']));
    //append author
    resultEl.append($('<div></div>').text(result['artistName']));
    //append sing name
    resultEl.append($('<div></div>').text(result['trackCensoredName']));
    //append preview
    resultEl.append($('<div ></div>').append($('<audio class="m-2 border rounded" controls>').append($('<source>').attr('src', result['previewUrl']).attr('type','audio/ogg')).append($('<source>').attr('src', result['previewUrl']).attr('type','audio/mpeg')).on('playing', function(event){  $('audio').not(event.target).css('background', 'red').trigger('pause'); $(event.target).css('background', 'blue');  })));

   $('#results').append(resultEl);
}


function getInfo(data){
    $('#results').empty();
    data.results.forEach(renderResults);
}


function genRequest(){
    var request = 'https://itunes.apple.com/search?term=';
    for (let i = 0; i < musicInfo.length;  i++){
          let tag = musicInfo[i];
          tag = tag.replace(/\s+/g, "+");
          request += tag;
          if(i!=musicInfo.length-1) { request += "+";}
    }
    request += '&callback=getInfo';
    return request;
}





$('#getPlaylistBtn').click(function (event) {
  // TODO: Display a list of music.
  // You may use anything from musicInfo.
  //JSONP specific
  if($('#find-info').length != 0){
      $('#find-info').remove();
  }
  var request = genRequest();
    console.log(request);
  var script_str = '<script id="find-info" src="'+request+'"/>';
  $('body').append($(script_str));
});
