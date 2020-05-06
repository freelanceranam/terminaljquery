$(document).ready(function () {
  var is_keyboard = false;
  var is_landscape = false;
  var initial_screen_size = window.innerHeight;

  /* Android */
  window.addEventListener("resize", function() {
      is_keyboard = (window.innerHeight < initial_screen_size);
      is_landscape = (screen.height < screen.width);

      // updateViews();
  }, false);

  /* iOS */
  $("input").bind("focus blur",function() {
      $(window).scrollTop(10);
      is_keyboard = $(window).scrollTop() > 0;
      $(window).scrollTop(0);
      updateViews();
  });
  $("textarea").bind("focus blur",function() {
      $(window).scrollTop(10);
      is_keyboard = $(window).scrollTop() > 0;
      $(window).scrollTop(0);
      updateViews();
  });


$(function() {
  var login   = localStorage.getItem('0_login');
  var type    = '';
  var content = '';

  if ( login == null) {
    type = 'login';
    $(document).find('#terminal').terminal(function(command, term) {
        term.pause();
        $.post('text/session.php', {
           command : command,
           content : content,
           type    : type,
         }).then(function(response) {
            var response = JSON.parse(response)

            if (response[0] == true && response[1] == 'password') {
              term.echo('Enter Your Password :').resume();
              type = response[1];
            }else if (response[0] == true && response[1] == 'login') {
              localStorage.setItem('0_login', true);
              location.reload(true);
            }else {
              term.echo('invalid input').resume();
            }
        });
    }, {
        greetings: 'Login first please Enter Your Email :'
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
             var result = value[1];
             content = value[3];

              if (value[2] == 'wrong') {
                wrong(result);
              }else if (content == 'name') {
                names(result,type,value[2]);
              }else if (content == 'gender') {
                gender(type,value[2]);
              }else if (content == 'contact') {
                contact(type,value[2]);
              }else if (content == 'stories') {
                stories(result,type,command,value[2])
                // typed_message(term,result, 1, function() {
                //     finish = true;
                // });
              }else if (content == 'ending') {
                Ending(result,type)
              }else {
                wrong(result);
              }
              term.echo('').resume();
        });
    }, {
        greetings: 'Enter the chapter to 123456789 continue'
    });
  }
});



// // COMMANDS
  function enter(text,text2) {
    var text = text;
    var text2 = text2;
    var length = $(document).find('.terminal-command[data-index]').length;
    var el = $(document).find('.terminal-output').last();
    el.append('<span class="abu">'+text2+'</span><br><br><span class="abu">Enter: '+text+'</span><br>');
    el.scrollTop(el.prop("scrollHeight") * 100);
  }
  function wrong(text) {
    text = text;
    var el = $(document).find('.terminal-output').last();
    el.append('<span class="abu">Wrong answer: </span><span class="red">'+text+'</span><br>');
    el.scrollTop(el.prop("scrollHeight") * 100);
  }

  function names(text,type,text2) {
    text = text;
    text2 = text2;
    var length = $(document).find('.terminal-command[data-index]').length;
    var length = length;
    var el = $(document).find('.terminal-output').last();
    el.append('<span class="abu">Ready to read this chapter </span> <span class="white">' + text + '</span><br><br><span>Agree to the </span><a href="#" class="white">reading process</a>?<br><br>');

    enter(type,text2);
  }

  function gender(type,text2) {
    var length = $(document).find('.terminal-command[data-index]').length;
    var length = length;
    var el = $(document).find('.terminal-output').last()
    el.append('<br><span>Reading process takes about 5 minutes. You must confirm that you can wait.<span><br>');
    enter(type,text2);
  };

  function contact(type,text2) {
    var length = $(document).find('.terminal-command[data-index]').length;
    var length = length;
    var el = $(document).find('.terminal-output').last()
    el.append('<br><span>System is ready...</span><br><br><span class="abu">Start the READING proccess.<span>');
    enter(type,text2);
  }

  function stories(text,type,process,text2) {
    text = text;

    var statusObj = $(document).find('.status');
    var length = $(document).find('.terminal-command[data-index]').length;
    var el = $(document).find('.terminal-output').last();

    var span = $('.terminal .typed:last');
    var length = length;

     el.append('</br><span class="abu">Process started: </span><span class="white">'+process+'</span></br>\n<span class="count-'+length+'"></span>')

    var et = $(document).find('.count-'+length+'');
    var te = $(document).find('#terminal');

    setTimeout(function(){
      $(function(e) {
        var bprogress = '#', progress = '',  counters = 0;
        $('.count-'+length).typed({
          strings: [text],
          typeSpeed: -1000,
          callback: function() {
            enter(type,text2);
          },
          onStringTyped: function() {
            te.scrollTop(te.prop("scrollHeight") * 100);
            console.log('after');
            clearTimeout(typing);
            statusObj.text('');
            $(document).find('.cmd-wrapper').show()
          },
          preStringTyped: function() {
              console.log('before');
              $(document).find('.cmd-wrapper').hide()
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
  $(document).find('.cmd-wrapper').hide()

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


var anim = false;
function typed(finish_typing) {
    return function(term, message, delay, finish) {
        anim = true;
        var prompt = term.get_prompt();
        var c = 0;
        if (message.length > 0) {
            term.set_prompt('');
            var new_prompt = '';
            var interval = setInterval(function() {
                var chr = $.terminal.substring(message, c, c+1);
                new_prompt += chr;
                term.set_prompt(new_prompt);
                c++;
                if (c == length(message)) {
                    clearInterval(interval);
                    // execute in next interval
                    setTimeout(function() {
                        // swap command with prompt
                        finish_typing(term, message, prompt);
                        anim = false
                        finish && finish();
                    }, delay);
                }
            }, delay);
        }
    };
}
function length(string) {
    string = $.terminal.strip(string);
    return $('<span>' + string + '</span>').text().length;
}
var typed_prompt = typed(function(term, message, prompt) {
    term.set_prompt(message + ' ');
});
var typed_message = typed(function(term, message, prompt) {
    term.echo(message)
    term.set_prompt(prompt);
});
