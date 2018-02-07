var app = angular.module('Cadastro', []);

app.controller("CadastroController", function ($scope, $http) {

    let path = 'http://localhost/compjr/SoccerStarsDeluxe/server.php/API/';


    $scope.user = {}


    let loadStates = function () {
        let url = path + "state";
        var success = function (success) {
            $scope.states = success.data;
            console.log($scope.states);
        };
        var error = function (error) {
            console.log(error);
        };
        $http.get(url).then((response) => success(response), (response) => error(response));
    };

    loadStates();
    $scope.user = {};
    // $scope.user.name = "Marco";
    // // $scope.user.gender = "M";
    // $scope.user.birthday = "1997-03-04";
    // $scope.user.CPF = "07492264631";
    // $scope.user.RG = "MG14690379";
    // $scope.user.email = "marcotuliocosta@live.com";
    // $scope.user.DDD = "35";
    // $scope.user.phoneNumber = "997202705";
    // $scope.user.password = "123";
    // $scope.user.passwordConfirmation = "123";
    // $scope.user.CEP = "37901082";
    // $scope.user.stateID = "1";
    // $scope.user.city = "Passos";
    // $scope.user.street = "Suriname";
    // $scope.user.number = "92";
    // $scope.user.complement = "as";
    // $scope.user.region = "Centro";

    let testeCPF = function (strCPF) {
        strCPF = strCPF.replace(/[)( \- \s .]/g, "");
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto == 10) || (Resto == 11)) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    };


    let clearValues = function (data) {

        data.CPF = data.CPF.replace(/[)( \- \s .]/g, "");
        if (data.RG) {
            data.RG = data.RG.replace(/[)( \- \s .]/g, "");
        }
        if (data.phoneNumber) {
            data.phoneNumber = data.phoneNumber.replace(/[)( \- \s .]/g, "");
            data.DDD = data.phoneNumber.substring(0, 2);
            data.phoneNumber = data.phoneNumber.substring(2, data.phoneNumber.length);
        }

        if (data.CEP) {
            data.CEP = data.CEP.replace(/[)( \- \s .]/g, "");
        }
        return data;
    };


    let validate = function () {
        var result = true;
        if (!$scope.user.name) {
            Materialize.toast('Ops! Qual é mesmo seu nome? &nbsp<i class="em em-thinking_face"></i>', 2000);
            result = false;
        }
        if (!$scope.user.CPF) {
            Materialize.toast('Desculpe mas precisamos saber seu CPF. &nbsp<i class="em em-grimacing"></i>', 2000);
            result = false;
        } else if (!testeCPF($scope.user.CPF)) {
            Materialize.toast('Algo de errado não está certo com seu CPF &nbsp<i class="em em-upside_down_face"></i>', 2000);
            result = false;

        }
        if (!$scope.user.email) {
            Materialize.toast('Por qual e-mail nos comunicaremos? &nbsp<i class="em em-sweat_smile"></i>', 2000);
            result = false;
        }
        if (!$scope.user.password) {
            Materialize.toast('Ei! Faltou colocar uma senha "da hora"! &nbsp<i class="em em-sunglasses"></i>', 2000);
            result = false;
        }
        if (!$scope.user.password !== !$scope.user.passwordConfirmation) {
            Materialize.toast('Vish! As senhas não conferem &nbsp<i class="em em-scream"></i>', 2000);
            result = false;
        }

        alert(result);
        return result;

    };


    $scope.cadastrar = function () {
        alert('oi');
        console.log($scope.user);
        if (validate()) {
            let url = path + "user";
            let data = Object.assign({}, $scope.user);
            data = clearValues(data);
            var success = function (success) {
                alert('Acertou Mizeravi');
            };
            var error = function (error) {
                console.log(error.data.errorUser[0]);
                if (error.data.errorUser[0] === '23000') {
                    Materialize.toast('Acho que você já usou esse email &nbsp<i class="em em-eyes"></i>', 2000);
                }
            };
            $http.post(url, data).then((response) => success(response), (response) => error(response))
        }
    };
});