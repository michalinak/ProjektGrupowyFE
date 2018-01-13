var emailValue;
var passwordValue;
var userProfiles;
var userIndex = undefined;

$('#login').bind('click', function () {
   // emailValue = $("[name='email']")[0].value;
    //passwordValue = $("[name='password']")[0].value;

    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/login',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify( { username: $("[name='email']").val(), password: $("[name='password']").val()} ),
        success: function( data, textStatus, jQxhr ){
            console.log('sukces');
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
            console.log('fail');
        }
    });


});
