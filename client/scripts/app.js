var messages = [];

var app = {
  init: function() {
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
    $('#chats').prepend('<div>' + escapeHtml(data.username) + ' ' + escapeHtml(data.text) + '</div>');
    console.log($('#chats'));
  },

  addRoom: function(room) {

    $('#roomSelect').append('<option value="' + room + '">' + room + '</option>');

  },

  addFriend: function() {
  
    $(document).on('click', 'span', function() {
      var username = $(this).attr('class');
      $('span').each(function() {
        if ($(this).attr('class') === username) {
          $(this).toggleClass('bold');
        }
      });
    });
  }
};

app.fetch();

var appendChat = function(data) {
  for (var i = 0; i < data.length; i++) {
    $('#chats').append('<div><span class="' + escapeHtml(data[i].username) + '">' + escapeHtml(data[i].username) + '</span> ' 
      + escapeHtml(data[i].text) + '</div>');

    '<span class="' + escapeHtml(data[i].roomname) + '">' + escapeHtml(data[i].roomname) + '</span> '
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
          
            // $(document).on('click', 'button', function() {
            //   var obj = {};
            //   obj.username = $('#user').val();
            //   obj.text = $('#input').val();
            //   obj.roomname = $('#chatRoom').val();
            //   app.send(obj);
            // });
          
    // $('').on('click', function() {
    //   alert($(this).attr('class'))
    // })


// $(document).ready(function() {
//   // console.log($('#chats').children().length);
//   $('div').on('click', function() {
//     console.log($(this));
//   });
// });



// $('#chats').append(messages);
// generateChats(array);

// app.fetch();
// $(document).ready(function() {
//   $('#get').on('click', function() {
//     var chatMessage = {}
//     chatMessage.message = $('input').val()
//     app.send(chatMessage);
//   });
// });

// $(document).ready(function() {
// // YOUR CODE HERE:



//   getMessage();

//   $('#get').on('click', function() {
//     var chatSubmit = $('input').val();
//     if (escapeHtml(chatSubmit) === chatSubmit) {
//       postMessage(escapeHtml(chatSubmit));
//     } else {

//     }

//     console.log(escapeHtml(chatSubmit));
//   });

//   var postMessage = function(chatSubmit) {
//     // console.log(chatSubmit)
//     var message = {
//       username: 'hello',
//       text: chatSubmit,
//       roomname: 'random'
//     };

//     $.ajax({
//       url: 'https://api.parse.com/1/classes/messages',
//       type: 'POST',
//       data: JSON.stringify(message),
//       contentType: 'application/json',
//       success: function (data) {
//         $('#chats').append(chatSubmit);      
//       console.log('chatterbox: Message Sent');
//       },
//       error: function (data) {
//         console.error('chatterbox: Failed to send message', data);
//       }
//     });
//   };




// });