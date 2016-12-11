$(document).ready(function() {

    $('#btnGetAccessToken').click(function(evt) {
        $.ajax ({
            url: '/api/token',
            type: 'post',
            data: JSON.stringify ({ 'key': $('#publicKey').val().trim(), 'secret': $('#secretKey').val().trim()}),
            contentType: 'application/json',
            complete: null
        }).done(function(data) {
            var date = new Date();
            date.setTime (date.getTime() + (parseInt (data.expires_in) * 10000)); // ~300 minutes
            data.expires_at = date.toString() ;
            $('#accessToken').val(data.access_token);
            $.cookie('accessToken', JSON.stringify(data), { expires: date }); //, secure: true }) ;

            $('#publicKeyLabel, #secretKeyLabel').append('<span class="glyphicon glyphicon-check" aria-hidden="true"></span>');
            $('#publicKey, #secretKey').effect("highlight", {color: "green"}, 1000);
        }).fail(function(err){
            $('#publicKey, #secretKey').effect("highlight", {color: "red"}, 1000);
                });
    });

    $("form#uploadForm").submit(function(event){

      //disable the default form submission
      event.preventDefault();

      var accessToken = $.cookie('accessToken');
      accessToken = JSON.parse(accessToken);

      //attach access token
      $(this)[0].token.value = accessToken.access_token;

      //grab all form data
      var formData = new FormData($(this)[0]);

      $.ajax({
        url: '/api/upload',
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returndata) {
          var translated = JSON.parse(returndata);
          translatedItem(translated.file, translated.urn);
        }
      });
      return false;
    });

    var count = 0;

    function translatedItem (name, urn) {
      var id = count;
      $('#translated').append ('<div class="list-group-item row" id="' + id + '">'
        + '<div class="col-md-3">' + name + '</div>'
        + '<div class="col-md-7">'
        + '<input type="text" class="form-control" value="' + urn + '" readonly="true" />'
        + '</div>'
        + '<div class="col-md-1">'
        + '<button class="form-control view-result" data-clipboard-text="' + urn + '" title="View result"><img src="/images/view.png" /></button>'
        + '</div>'
      ) ;
      count++;
        $('#' + id + ' div button.view-result').click (function (e) {
            var windowName = $(this).attr ('data-clipboard-text');
            window.open('/view.html?urn=' + encodeURIComponent(windowName) + '&token=' + encodeURIComponent(JSON.parse($.cookie('accessToken')).access_token), windowName, "height=768,width=1024") ;
        }) ;
    };

});
