var emailValue;
var passwordValue;
var userProfiles;
var userIndex = undefined;

$('#login').bind('click', function () {
    emailValue = $("[name='email']")[0].value;
    passwordValue = $("[name='password']")[0].value;

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/userProfiles",
        dataType: "json",
        async: false,
        success: function (response) {
            console.log("Connected");
            var json = JSON.parse(JSON.stringify(response));
            userProfiles = json._embedded.userProfiles;
            checkCredentials(userProfiles);
        }
    });
});

function checkCredentials(users) {
    for (var i = 0; i < users.length; i++) {
        if (emailValue === users[i].username && passwordValue === users[i].password) {
            userIndex = i;
            window.location = "file:///C:/Users/micha_000/Documents/ProjektGrupowy/ProjektGrupowyFE/mainPage.html#"; //sciezka do strony main
            break;
        }
    }
    if (userIndex === undefined) alert('incorrect e-mail address or password');
}