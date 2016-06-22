

var app = {
  init: function() {
    this.fetch();
  },


  server: 'https://api.parse.com/1/classes/messages',

  send: function(chatMessage) {

    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(chatMessage),
      contentType: 'application/json',
      success: function (data) {
        app.addMessage(chatMessage);
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.log('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function() {
    $.ajax({
      url: app.server,
      type: 'GET',
      success: function (data) {
        appendChat(data.results);
        app.addRoom(data.results);
        console.log('chatterbox: Message Recieved');
      },
      error: function (data) {
        console.log('chatterbox: Failed to send message', data);
      }
    });
  },

  clearMessages: function() {
    $('#chats').empty();
  },

  addMessage: function(data) {
    if (escapeHtml(data.username) === data.username && escapeHtml(data.roomname) === data.roomname && escapeHtml(data.text) === data.text) {
      $('#chats').prepend('<div><span class="' + escapeHtml(data.username) + ' ' + escapeHtml(data.roomname) + '">' + escapeHtml(data.username) + ' ' + escapeHtml(data.text) + '</div>');
    }
  },

  addRoom: function(chatMessage) {
    var roomArr = [];
    for (var i = 0; i < chatMessage.length; i++) {
      if (roomArr.indexOf(chatMessage[i].roomname) === -1 && chatMessage[i].roomname !== "") { 
        roomArr.push(chatMessage[i].roomname);
      }
    }
    for (var i = 0; i < roomArr.length; i++) {
      $('#roomSelect').append('<option>' + roomArr[i] + '</option>');
    }
  },

  

  addFriend: function() {
  
    $(document).on('click', 'span', function() {
      var username = $(this).attr('class');
      $('.user').each(function() {
        if ($(this).attr('class') === username) {
          $(this).toggleClass('addFriend');
          if ($(this).hasClass('addFriend')) {
            $('.addFriend').closest('div').find('.text').addClass('bold');
          } else {
            $('.bold').removeClass('bold');
          } 
        }
      });
    });
  }
};
app.init();


var appendChat = function(data) {
  for (var i = 0; i < data.length; i++) {
    if (escapeHtml(data[i].username) === data[i].username && escapeHtml(data[i].roomname) === data[i].roomname && escapeHtml(data[i].text) === data[i].text) {
      $('#chats').append(
        '<div class="' + escapeHtml(data[i].roomname) + '">' + 
          '<span class="user ' + escapeHtml(data[i].username) + '">' + escapeHtml(data[i].username) + '</span> ' +
          '<span class="text">' + escapeHtml(data[i].text) + '</span>' +
        '</div>');
    }
    // '<span class="' + escapeHtml(data[i].roomname) + '">' + escapeHtml(data[i].roomname) + '</span> '
  }
};
app.addFriend();

var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

var escapeHtml = function(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
};