$(document).ready(function() {
// YOUR CODE HERE:
  var obj = $.get('https://api.parse.com/1/classes/messages', function(data) {
    console.log(data);
  });


  var getMessage = function() {
    var message = {
      username: '',
      text: '',
      roomname: ''
    };

    $.ajax({
      url: 'https://api.parse.com/1/classes/messages',
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        for (var i = 0; i < data.results.length; i++) {
          $('#chats').append((data.results[i].text + '<br>'));
          console.log('chatterbox: Message Recieved');
        }
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };

  getMessage();

  $('#get').on('click', function() {
    var chatSubmit = $('input').val();
    if (escapeHtml(chatSubmit) === chatSubmit) {
      postMessage(escapeHtml(chatSubmit));
    } else {
      console.log('error ');
    }

    console.log(escapeHtml(chatSubmit));
  });

  var postMessage = function(chatSubmit) {
    // console.log(chatSubmit)
    var message = {
      username: 'hello',
      text: chatSubmit,
      roomname: 'random'
    };

    $.ajax({
      url: 'https://api.parse.com/1/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        $('#chats').append(chatSubmit);      
        console.log('chatterbox: Message Sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };


 var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }


});