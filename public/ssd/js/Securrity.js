var path = 'http://localhost/compjr/SoccerStarsDeluxe/server.php/API/';
var user = null;
var token = '';

autenticar = function (http, callbackFunc) {
    let url = path + 'auth/user';
    token = localStorage.getItem('SSDToken');
    let header = {
        headers: {'Authorization': 'Bearer ' + token}
    };
    var success = function (success) {
        this.user = success;
        callbackFunc(success);
    };
    var fail = function (error) {
        callbackFunc(false);
    };
    http.get(url, header).then((response) => success(response), (response) => fail(response))
};

deslogar = function () {
    localStorage.removeItem('SSDToken');
    window.location.href = 'index.html';

};



