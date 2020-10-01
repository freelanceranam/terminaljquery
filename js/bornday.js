$(document).ready(function () {
  localStorage.setItem('typing', false);

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
        $.post('text/bornday/session.php', {
           command : command,
           content : content,
           type    : type,
         }).then(function(response) {
            var response = JSON.parse(response)

            if (response[0] == true && response[1] == 'password') {
              term.echo('please Enter Your date & month Born:').resume();
              term.set_mask('*')
              type = response[1];
            }else if (response[0] == true && response[1] == 'login') {
              localStorage.setItem('0_login', true);
              location.reload(true);
            }else if(response[0] == 'password' && response[2] == 'wrong'){
              term.echo('only for Nabilah born date month').resume();
              term.echo('example format input date-month = 01-01').resume();
            }else {
              term.echo('only for user Nabilah').resume();
            }
        });
    }, {
        greetings: 'Login first please Enter Your Name :'
    });

  }else {

    $(document).find('#terminal').terminal(function(command, term) {
        term.pause();
        $.post('text/bornday/session.php', {
           command : command,
           content : content,
           type    : type,
         }).then(function(response) {
             var value = JSON.parse(response)
             type = value[0];
             var result = value[1];
             content = value[3];

              if (value[2] == 'wrong') {
                if (localStorage.getItem('typing') == 'true') {
                  term.echo('').resume();
                }else {
                  wrong(result);
                }
              }else if (content == 'name') {
                names(result,type,value[2]);
              }else if (content == 'gender') {
                gender(type,value[2]);
              }else if (content == 'contact') {
                contact(type,value[2]);
              }else if (content == 'stories') {
                var data;
                $.each(result, function(index,i){
                  $.ajax({
                      url: 'text/bornday/'+i+'.txt',
                      type: 'get',
                      async: false,
                      success: function(response){
                          data += '<br>'+response;
                      }
                  });
                })
                  stories(data,type,command,value[2])
                  localStorage.setItem('typing', true);
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

  // document.onkeydown = function (e)
  // {
  //   if (type == 'password') {
  //     setTimeout(function(){
  //       $(document).find('.cmd-cursor-line span[data-text]').text('*');
  //     },500)
  //   }
  // }
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
    var textlong = text.split('<br>');
    var textlgth = textlong.length
    var text
    var text3

      text = textlong[1];
      text3 = textlong[2];

      keydowndisable()

      var statusObj = $(document).find('.status');
      var length = $(document).find('.terminal-command[data-index]').length;
      var el = $(document).find('.terminal-output').last();

      var span = $('.terminal .typed:last');
      var length = length;

      if (type.toLowerCase() == 'next') {
        el.append('</br>\n<span class="count-'+length+'" style="font-size:20px;"></span>')
      }else {
        el.append('</br>\n<span class="count-'+length+'"></span></br></br>')
      }

      var et = $(document).find('.count-'+length+'');
      var te = $(document).find('#terminal');

      setTimeout(function(){
        $(function(e) {
          var bprogress = '#', progress = '',  counters = 0;
          $('.count-'+length).typed({
            strings: [text],
            typeSpeed: 10,
            callback: function() {
              enter(type,text2);
            },
            onStringTyped: function() {
              localStorage.setItem('typing', false);
              te.scrollTop(te.prop("scrollHeight") * 100);
              console.log('after');
              clearTimeout(typing);
              statusObj.text('');
              $(document).find('.cmd-wrapper').show()
              keydownenable()
              if (textlgth > 2) {
                stories2(text3,'');
              }
            },
            preStringTyped: function() {
                typing = false;
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
                        // statusObj.text('[ ' + progress + ']' + str_percent + ' %');
                    }
                }, 100);
            },
          });
        });
      }, 500);
  }

  function stories2(text,type) {
    text = text;
    keydowndisable()
    var statusObj = $(document).find('.status');
    var length = $(document).find('.terminal-command[data-index]').length;
    var el = $(document).find('.terminal-output').last();

    var span = $('.terminal .typed:last');
    var length = length;

    if (type.toLowerCase() == 'upper') {
      el.append('</br>\n<span class="count-'+length+'" style="font-size:20px;"></span>')
    }else {
      el.append('</br>\n<span class="count-'+length+'"></span></br></br>')
    }

    var et = $(document).find('.count-'+length+'');
    var te = $(document).find('#terminal');

    setTimeout(function(){
      $(function(e) {
        var bprogress = '#', progress = '',  counters = 0;
        $('.count-'+length).typed({
          strings: [text],
          typeSpeed: 10,
          callback: function() {
          },
          onStringTyped: function() {
            localStorage.setItem('typing', false);
            te.scrollTop(te.prop("scrollHeight") * 100);
            console.log('after');
            clearTimeout(typing);
            statusObj.text('');
            $(document).find('.cmd-wrapper').show()
            keydownenable()
          },
          preStringTyped: function() {
              typing = false;
              console.log('before');
              $(document).find('.cmd-wrapper').hide()
              $('.typed-cursor').detach();
          },
        });
      });
    }, 500);
  }

function Ending(){
  var el = $(document).find('.terminal-output').last();
  el.append("<div class='kittens'>" +
            "<p class='prompt'></p>" +
            "<p class='prompt' style='font-size: 48px;'><center><b>HAPPY BIRTHDAY TO YOU 🎂</center></p>" +
            "<p class='prompt' style='font-size: 48px;'><center><b>ME FAVORITE PERSON 💐😘</b></center></p>" +
            "<p class='prompt'></p>" +
            "<p class='prompt'></p></div>"
            );

  setTimeout(function () {
     el.append('<img style="margin:auto;" class="kitten-gif" src="https://media.tenor.com/images/783b23983a669b60969354290f5ce247/tenor.gif">');
     resetForm(true);
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
    message = "PLEASE WAIT Till 10 sec ! => ";
  }

  $('.new-output').removeClass('new-output');
  input.val('');
  el.append('<p class="prompt">' + message + '</p><p class="prompt output new-output"></p>');
  setTimeout(function(){
    window.location.href = "https://youtu.be/sR5l1rKrfY4";
    terminal.scrollTop(terminal.prop("scrollHeight"));
  }, 10000);
}


function keydowndisable() {
  document.onkeydown = function (e)
   {
    return false;
   }
}
function keydownenable() {
  document.onkeydown = function (e)
   {
    return true;
   }
}
});
