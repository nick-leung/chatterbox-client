var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

var friends = [];

var handleData = function (data) {
  console.log('second');
  var arr = data.results;
  for (var i = 0; i < arr.length; i++) {
    // console.log(i, arr[i].roomname);
    // console.log(i, arr[i].text);
    if (i !== 66 && i !== 69 && i !== 78 && i !== 79 && i !== 81) {
      app.renderRoom(arr[i].roomname);
      app.renderMessage(arr[i]);
    }
  }
  app.handleUsernameClick();

  $("#target").submit(function(event){
    app.send(message);
    event.preventDefault();
  });
};
var app = {
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  init: function () {
    app.fetch(message);
    console.log('first');
    app.handleUsernameClick();
    app.handleSubmit();
    // $('.username').click(function () {
    //     this.handleUsernameClick();
    // });
  },
  send: function (data) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'POST',
      data: data, //JSON.stringify(message), 
      contentType: 'application/json',
      success: function (data) {
        //handleData(data);
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function (message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        handleData(data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  clearMessages: function () {
    $('#chats').html('');
  },
  renderMessage: function (message) {
    var node = message;
    if (node) {
      $('#chats').append(
        '<div>' +
        '<a href="#" class = "chat username">' + message.username + '</a>:' +
        '<br> ' + message.text + '</div>');
      //$('#chats').append('<div>' + message.text + '</div>');
      $('#message').val(message.text);
    }

  },
  renderRoom: function (roomname) {
    var node = roomname;
    if (node) {
      $('#roomSelect').append('<option value="' + node + '">' + node + '</option>');
    }
  },
  handleUsernameClick: function () {
    //On click add friend to friend array
    $('div').on('click', 'a', function () {
      var clickData = $(this);
      console.log(clickData[0].text);
    });
  },
  handleSubmit: function (event) {
    // $('div').on('click', '#send', function () {
    //   var clickData = $(this);
    //   console.log(clickData[0].text);
    //   app.send(message);
    //  event.preventDefault();
    // });
    
  }
};
app.init();
// $('div').on('click', '#send', function (event) {
//       var clickData = $(this);
//       console.log(clickData[0].text);
//       app.send(message);
//      event.preventDefault();
//     });
  // $("#target").submit(function(event){
  //   event.preventDefault();
  // })
//app.init();
//app.send(message);