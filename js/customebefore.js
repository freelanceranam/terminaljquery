$('#terminal').terminal("text/json-rpc-service-demo.php", {
 greetings: "You are authenticated",
 login: function(user, password, callback) {
            if (user == 'demo' && password == 'secret') {
              setInterval(function() {
                    $('#myscript').remove();
                    $.getScript("text/js/customeafter", function() {
                         $('script:last').attr('id', 'myscript');
                      });
                   }, 30000); // every 30 seconds
            } else {
                callback(null);
            }
        }
});
