var app = angular.module('Index', []);

app.controller("IndexController", function ($scope, $http) {
    var callbackFunc = function (resp) {
        $scope.user = resp.data;
        console.log($scope.user);

    }

    autenticar($http, callbackFunc);



});