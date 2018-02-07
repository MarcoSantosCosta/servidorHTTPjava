var app = angular.module('Login', []);

app.controller("LoginController", function ($scope, $http) {
    let path = 'http://localhost/compjr/SoccerStarsDeluxe/server.php/API/';
    $scope.user = {};
    $scope.error = '';

    $scope.logar = function () {
        $scope.error = "";

        let url = path + "auth/login";
        let data = $scope.user;
        var success = function (success) {
            localStorage.setItem('SSDToken', success.data.token);
            window.location.href = "eventos.html";
        };
        var error = function (error) {
            $scope.error = "Credenciais Inválidas";

        };
        $http.post(url, data).then((response) => success(response), (response) => error(response))
    };


});