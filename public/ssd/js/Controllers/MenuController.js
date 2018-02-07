var app = angular.module('Menu', []);

app.controller("MenuController", function ($scope, $http) {
    var callbackFunc = function (resp) {
        if (resp) {
            $scope.user = resp.data;
            $scope.user.data.address.stateID = "" + $scope.user.data.address.stateID;
            console.log($scope.user.data.address.stateID);
            $scope.user.data.phoneNumber = "" + $scope.user.data.phone.DDD + "" + $scope.user.data.phone.phoneNumber;
            console.log($scope.user);
        } else {
            window.location.href = 'index.html';
        }
    };
    autenticar($http, callbackFunc);
});