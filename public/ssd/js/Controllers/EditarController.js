var app = angular.module('Editar', []);

app.controller("EditarController", function ($scope, $http) {

    $scope.oldPass = '';
    $scope.password = '';
    $scope.confirmPassword = '';

    var callbackFunc = function (resp) {
        if (resp) {
            $scope.user = resp.data;

            if ($scope.user.data.phone.phoneNumber) {
                $scope.user.data.phoneNumber = "" + $scope.user.data.phone.DDD + "" + $scope.user.data.phone.phoneNumber;
            }
            $(document).ready(function() {
                $('select').material_select();
            });

            console.log($scope.user);
        } else {
            window.location.href = 'index.html';
        }
    };
    autenticar($http, callbackFunc);


    let clearValues = function (data) {
        data.stateID = 13;
        console.log(data.stateID)
        if (data.RG) {
            data.RG = data.RG.replace(/[)( \- \s .]/g, "");
        }
        if (data.phoneNumber) {
            data.phoneNumber = data.phoneNumber.replace(/[)( \- \s .]/g, "");
            data.DDD = data.phoneNumber.substring(0, 2);
            data.phoneNumber = data.phoneNumber.substring(2, data.phoneNumber.length);
        }
        if (data.CEP) {
            data.CEP = ''+data.CEP;
            data.CEP = data.CEP.replace(/[)( \- \s .]/g, "");
        }
        return data;
    };


    let validate = function () {
        var result = true;
        if (!$scope.user.data.name) {
            Materialize.toast('Ops! Qual é mesmo seu nome? &nbsp<i class="em em-thinking_face"></i>', 2000);
            result = false;
        }
        return result;

    };


    let validate2 = function () {
        var result = true;
        if ($scope.password !== $scope.confirmPassword) {
            Materialize.toast('Vish! As senhas não conferem &nbsp<i class="em em-scream"></i>', 2000);
            result = false;
        }
        return result;

    };


    $scope.editar = function () {
        if (validate()) {
            let url = path + "user/" + $scope.user.id;
            let data = {
                name: $scope.user.data.name,
                gender: $scope.user.data.gender,
                birthday: $scope.user.data.birthday,
                RG: $scope.user.data.rg,
                phoneNumber: $scope.user.data.phoneNumber,
                CEP: $scope.user.data.address.cep,
                stateID: $scope.user.data.address.stateID,
                city: $scope.user.data.address.city,
                street: $scope.user.data.address.street,
                number: $scope.user.data.address.number,
                complement: $scope.user.data.address.complement,
                district: $scope.user.data.address.district,
            };
            let header = {
                headers: {'Authorization': 'Bearer ' + token}
            };
            data = clearValues(data);
            console.log(data);
            let success = function (success) {
                alert('Acertou Mizeravi');
            };
            let error = function (error) {
                console.log(error);
            };
            $http.put(url, data, header).then((response) => success(response), (response) => error(response))
        }
    };


    realmenteAlterarSenha = function () {
        if (validate2()) {
            let url = path + "auth/alterar_senha/" + $scope.user.id;
            let teste = {
                    password: $scope.password,
                }
            ;
            let header = {
                headers: {'Authorization': 'Bearer ' + token}
            };
            console.log(teste);
            var success = function (success) {
                alert('senha nova negão');
            };
            var error = function (error) {
                console.log(error);
            };
            $http.put(url, teste, header).then((response) => success(response), (response) => error(response))
        }
    };

    $scope.alterarSenha = function () {
        alert('ta pegando fogo bixo');
        let url = path + "auth/login";
        let data = {
            email: $scope.user.email,
            password: $scope.oldPass,
        };
        console.log(data);
        var success = function (success) {
            realmenteAlterarSenha();
        };
        var error = function (error) {
            Materialize.toast('Você lembra bem sua senha antiga?&nbsp<i class="em em-scream"></i>', 2000);
            result = false;
        };
        $http.post(url, data).then((response) => success(response), (response) => error(response))
    };


});