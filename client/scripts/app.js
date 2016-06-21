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
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }      
};

app.fetch();


var appendChat = function(data) {
  for (var i = 0; i < data.length; i++) {
    $('#chats').append('<div>' + data[i].username + ' ' + data[i].roomname + ' ' + data[i].text + '</div>');
  }
};

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


 // var entityMap = {
 //    "&": "&amp;",
 //    "<": "&lt;",
 //    ">": "&gt;",
 //    '"': '&quot;',
 //    "'": '&#39;',
 //    "/": '&#x2F;'
 //  };

 //  function escapeHtml(string) {
 //    return String(string).replace(/[&<>"'\/]/g, function (s) {
 //      return entityMap[s];
 //    });
 //  }


// });