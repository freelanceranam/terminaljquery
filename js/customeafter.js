$(function() {
  var login   = localStorage.getItem('0_login');
  var type    = '123456789';
  var content = '';

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
                stories(result,type)
              }else if (content == 'ending') {
                Ending(result,type)
              }else {
                term.echo(value[1]).resume();
              }
              // term.echo(String(value[3]).resume();
              term.echo('').resume();
        });
    }, {
        greetings: 'Enter the chapter to 123456789 continue'
    });

})

// // COMMANDS
  function enter(text) {
    text = text;
    var length = $(document).find('.terminal-command[data-index]').length;
    var el = $(document).find('.terminal-output').last();
    el.append('<span class="syst">Enter: '+text+'</span>\n');
    el.scrollTop(el.prop("scrollHeight") * 100);
  }

  function names(text,type) {
    text = text;
    var length = $(document).find('.terminal-command[data-index]').length;
    var length = length;
    var el = $(document).find('.terminal-output').last();
    el.append('<span class="syst">Ready to read this chapter </span> <span class="answer">' + text + '</span>\n\nAgree to the <a href="#" class="answer">reading process</a>?\n\n');

    enter(type);
  }

  function gender(type) {
    var length = $(document).find('.terminal-command[data-index]').length;
    var length = length;
    var el = $(document).find('.terminal-output').last()
    el.append('\nReading process takes about 5 minutes. You must confirm that you can wait.\n\n');
    enter(type);
  };

  function contact(type) {
    var length = $(document).find('.terminal-command[data-index]').length;
    var length = length;
    var el = $(document).find('.terminal-output').last()
    el.append('\nSystem is ready...\n\n');
    enter(type);
  }

  function stories(text,type) {
    text = text;
    var length = $(document).find('.terminal-command[data-index]').length;
    var length = length;
    var el = $(document).find('.terminal-output').last();
    el.append('\n<span class="syst">Process started: '+type+'</span>\n\n<span class="count-'+length+'"></span>\n\n')
    setTimeout(function(){
      $(function(e) {
        var bprogress = '#', progress = '',  counters = 0;
        $('.count-'+length).typed({
          strings: [text],
          // typing speed
          typeSpeed: 2,
          callback: function() {
            enter(type);
          },
          preStringTyped: function() {
            var beforetxt = text.length
            // bstrOfall = beforetxt.length,
            // console.log('yasstart');
            setInterval(typing = function(){
              for(var i = 0; i < 100; i ++) progress = progress + bprogress;
              // console.log(progress);
              // statusObj.text('[ ' + progress + ']' + str_percent + ' %');
              el.scrollTop(el.prop("scrollHeight") * 100);
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
      // $.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&amp;tag=Happy+Birthday+!').then(function(response) {
      //     gif = result.data.image_url;
      //     el.append('<img class="kitten-gif" src="' + gif + '"">');
          resetForm(true);
      //  });
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
