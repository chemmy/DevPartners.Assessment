var app = angular.module('employee', ['angularUtils.directives.dirPagination', 'ngStorage']);
app.controller('employeeCtrl', function ($scope, $http, $localStorage,
    $sessionStorage) {
    let headers = { 'accept': 'application/json', 'Authorization': 'Bearer ' + $localStorage.tokenString };
    let download = { 'accept': 'application/json', 'Authorization': 'Bearer' + $localStorage.tokenString }
    let URL = 'http://13.75.89.123:8081/pooling/api/User';
    $scope.signOut = function () {
        $localStorage.username = "";
        $localStorage.password = "";
        location.reload();
    
    }
    $scope.getStatus = function () {
        $http({
            method: 'GET',
            url: URL + '/Status',
            headers: headers
        }).then(function (userStatus) {
            $scope.statusAPI = userStatus.data;
            $scope.data = [];
        })
    }
    $scope.getStatus();


    $scope.getAll = function () {
        $http({
            method: 'GET',
            headers: headers,
            url: URL
        })
            .then(function (userData) {
                $scope.file = userData;
                $scope.current_grid = 1;
                $scope.data_limit = 10;
                $scope.filter_data = $scope.file.length;
                $scope.entire_user = $scope.file.length;
                $scope.resultAPI = userData.data;
                $scope.newUser = {};
                $scope.info = "";
                $scope.users = userData.data;
                $scope.pageSize = 5;
                $scope.currentPage = 0;
                $scope.data = [];
                $scope.q = '';
                $scope.sortColumn = "";
                $scope.records = userData.userSkills;

            });
        ////start

  
        $scope.tempUrl = function (data, filename2) {
        
            let URL = 'http://13.75.89.123:8081/pooling/api/User';

            $http({
                method: 'GET',
                url: URL + "/DownloadFile?userId=" + data,
                headers: headers,
                responseType: 'arraybuffer'
            }).then(function (data, status, headers) {
                // headers = headers();

                var filename = filename2;
                var contentType = 'application/pdf';

                var linkElement = document.createElement('a');
                try {
                    var blob = new Blob([data.data], { type: contentType });
                    var url = window.URL.createObjectURL(blob);

                    linkElement.setAttribute('href', url);
                    linkElement.setAttribute("download", filename);

                    var clickEvent = new MouseEvent("click", {
                        "view": window,
                        "bubbles": true,
                        "cancelable": false
                    });
                    linkElement.dispatchEvent(clickEvent);
                } catch (ex) {
                    console.log(ex);
                }
            });
        }

        ////end


        $scope.saveUser = function (data) {
            $http({
                method: 'PUT',
                url: URL + '/Status/' + $scope.editID + '?status=' + $scope.editStatus,
                headers: headers
            }).then(function (response) {
                $scope.getAll();
            });

        };

        $scope.selectUser = function (data) {
            $scope.editFirstname = data.firstName;
            $scope.editLastname = data.lastName;
            $scope.editID = data.userId;
        };

        $scope.viewUser = function (data) {
            $scope.viewFirstname = data.firstName;
            $scope.viewLastname = data.lastName;
            $scope.viewID = data.userId;
            $scope.viewEmail = data.email;
            $scope.viewPhone = data.phone;
            $scope.viewAddress = data.address;
            $scope.viewStatus = data.status;
            $scope.viewSubmitDate= data.submittedDate;
            $scope.viewRecords = data.userSkills;
        };


        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;
            $scope.reverse = !$scope.reverse;
        }


    }

    $scope.getAll();

    $scope.deleteEmployee = function (token) {

        $http({
            method: 'DELETE',
            url: 'http://13.75.89.123:8081/pooling/api/User/' + $scope.editID,
            headers: headers
        }).then(function (response) {
            $scope.deleteEmployee();
            location.reload();
        })


    }



    $scope.isEmpty = function () {
        delete $localStorage
        if (!$localStorage.username && !$localStorage.password) {
            window.location.href = "../index.html";
        }
    }
    $scope.isEmpty();


});


