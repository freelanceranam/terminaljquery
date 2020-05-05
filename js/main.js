$(document).ready(function () {

$(function() {
  var login   = localStorage.getItem('0_login');
  var type    = '123456789';
  var content = '';

  if ( login == null) {

    $('#terminal').terminal("text/json-rpc-service-demo.php", {
      greetings: "You are authenticated",
      login: function(user, password, callback) {
           if (user == 'demo' && password == 'demo') {
               localStorage.setItem('0_login', user);
               location.reload(true);
           } else {
               callback(null);
           }
       }
   });

  }else {

    $(document).find('#terminal').terminal(function(command, term) {
        term.pause();
        $.post('text/session.php', {
           command : command,
           content : content,
           type    : type,
         }).then(function(response) {
             var value = JSON.parse(response)
             type = value[0];
             content = value[2];
             var result = value[1];

              if (content == 'name') {
                names(result,type);
              }else if (content == 'gender') {
                gender(type);
              }else if (content == 'contact') {
                contact(type);
              }else if (content == 'stories') {
                stories(result,type,command)
              }else if (content == 'ending') {
                Ending(result,type)
              }else {
                term.echo(value[1]).resume();
              }
              term.echo('').resume();
        });
    }, {
        greetings: 'Enter the chapter to 123456789 continue'
    });
  }
});



// // COMMANDS
  function enter(text) {
    text = text;
    var length = $(document).find('.terminal-command[data-index]').length;
    var el = $(document).find('.terminal-output').last();
    el.append('<span class="syst">Enter: '+text+'</span><br>');
    el.scrollTop(el.prop("scrollHeight") * 100);
  }

  function names(text,type) {
    text = text;
    var length = $(document).find('.terminal-command[data-index]').length;
    var length = length;
    var el = $(document).find('.terminal-output').last();
    el.append('<span class="syst">Ready to read this chapter </span> <span class="answer">' + text + '</span><br><br>Agree to the <a href="#" class="answer">reading process</a>?<br><br>');

    enter(type);
  }

  function gender(type) {
    var length = $(document).find('.terminal-command[data-index]').length;
    var length = length;
    var el = $(document).find('.terminal-output').last()
    el.append('<br>Reading process takes about 5 minutes. You must confirm that you can wait.<br><br>');
    enter(type);
  };

  function contact(type) {
    var length = $(document).find('.terminal-command[data-index]').length;
    var length = length;
    var el = $(document).find('.terminal-output').last()
    el.append('<br>System is ready...<br><br>');
    enter(type);
  }

  function stories(text,type,process) {
    text = text;

    var bprogress = '#',
        progress = '',
        counters = 0;

    var statusObj = $(document).find('.status');
    var length = $(document).find('.terminal-command[data-index]').length;
    var el = $(document).find('.terminal-output').last();

    el.append('<span class="typed"></span>');
    var span = $('.terminal .typed:last');
    var length = length;

    el.append('<br><span class="syst">Process started: '+process+'</span><br><br><span class="count-'+length+'"></span><br><br>')

    var et = $(document).find('.count-'+length+'');
    var te = $(document).find('#terminal');

    setTimeout(function(){
      $(function(e) {
        var bprogress = '#', progress = '',  counters = 0;
        $('.count-'+length).typed({
          strings: [text],
          typeSpeed: 2,
          callback: function() {
            enter(type);
          },
          onStringTyped: function() {
            te.scrollTop(el.prop("scrollHeight") * 100);
            console.log('after');
            clearTimeout(typing);
            statusObj.text('');
          },
          preStringTyped: function() {
              console.log('before');
              $('.typed-cursor').detach();
              nEdit = 1;
              span.next().text('');
              var beforetxt = et.text(),
                  bstrOfall = beforetxt.length,
                  readytxt = text;
              setInterval(typing = function() {
                  var nstrOfall = readytxt.length,
                      istrOfall = et.text().length;
                  progress = '';
                  te.scrollTop(et.height() * 100);
                  if (istrOfall < nstrOfall + bstrOfall) {
                      str_percent = parseInt((istrOfall - bstrOfall) * 1000 / nstrOfall) / 10;
                      counters = parseInt(str_percent / 2.895);
                      for (var i = 0; i < counters; i++) progress = progress + bprogress;
                      statusObj.text('[ ' + progress + ']' + str_percent + ' %');
                  }
              }, 100);
          },
        });
      });
    }, 500);
  }

function Ending(){
  var el = $(document).find('.terminal-output').last();
  el.append("<div class='kittens'>" +
            "<p class='prompt'></p>" +
            "<p class='prompt' style='font-size: 48px;'><center><b>HAPPY BIRTHDAY TO YOU!</b></center></p>" +
            "<p class='prompt'></p>" +
            "<p class='prompt'></p></div>"
            );

  setTimeout(function () {
      var gif ;
      $.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&amp;tag=Happy+Birthday+!').then(function(response) {
          gif = response.data.image_url;
          el.append('<img class="kitten-gif" src="' + gif + '"">');
          resetForm(true);
       });
    }, 500);
}
// // END COMMANDS

function resetForm(withKittens) {
  var el = $(document).find('.terminal-output').last();

  var message = "Sorry that command is not recognized.";
  var input = $('.404-input');

  if (withKittens) {
    $('.kittens').removeClass('kittens');
    message = "WILL GO TO YOUTUBE after 10 sec ! => ";
  }

  $('.new-output').removeClass('new-output');
  input.val('');
  el.append('<p class="prompt">' + message + '</p><p class="prompt output new-output"></p>');
  setTimeout(function(){
    window.location.href = "https://youtube.com";
    terminal.scrollTop(terminal.prop("scrollHeight"));
  }, 10000);
}

});
