var app = angular.module('BasicHttpAuthExample', ['ngStorage']);
app.controller('loginCtrl', function ($scope, $localStorage, $sessionStorage, $http) {
    $scope.accountExist = false;
    $scope.accountRegistered = false;
    $scope.invalidPassword = false;
    $scope.submit = function () {
        $localStorage.username = $scope.emailaddress;
        $localStorage.password = $scope.password;
        $scope.checkLogin($localStorage.username, $localStorage.password);
    }
    $scope.register = function () {
        var registerAdmin = { username: $scope.registerUsername, email: $scope.registerEmail, password: $scope.registerPassword };
        console.log(registerAdmin);
        $http.post('http://13.75.89.123:8081/pooling/api/Auth/Registration', registerAdmin).then(
            function (response) {
                $scope.accountExist = false;
                $scope.registerUsername = "";
                $scope.registerEmail = "";
                $scope.registerPassword = "";
                $scope.accountRegistered = true;
                $scope.accountExist = false;
                $scope.invalidPassword = false;

            }, function (error) {

                if (error.data.Username) {
                    $scope.invalidPassword = false;
                    $scope.accountExist = true;
                }
                else if (error.data.Password) {
                    $scope.accountExist = false;
                    $scope.invalidPassword = true;
                }

            })
    }

    $scope.checkLogin = function (uname, pass) {
        $http({
            method: 'POST',
            data: {
                "username": uname,
                "password": pass
            },
            url: 'http://13.75.89.123:8081/pooling/api/Auth/login',
            headers: { 'Content-Type': 'application/json-patch+json', 'accept': 'application/json' },
        }).then(function (response) {
            $localStorage.tokenString = response.data.tokenString;
            window.location.href = "pages/home.html";
        }, function (error) {
            $localStorage.username = "";
            $localStorage.password = "";
            alert("Invalid email or password.")
        })
    }

    $scope.isnOTEmpty = function () {
        if ($localStorage.username && $localStorage.password) {
            window.location.href = "pages/home.html";
        }
    }
    $scope.isnOTEmpty();

});


