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
        // alert();
    }

    //   var me = $scope;
    //   me.downloadVariable = function(data, filename) {
    //       var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(me.complexVariable));
    //       var downloader = document.createElement('a');

    //       downloader.setAttribute('href', data);
    //       downloader.setAttribute('download', filename);
    //       downloader.click();
    //   };

    //   me.complexVariable = [
    //     {
    //       desc: "wow much complex"
    //     }
    //   ];



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



        // $scope.linkUrl = function(data){
        //     $http({
        //         method:'GET',
        //         url:URL+"/DownloadFile?userId=",
        //         headers: headers
        //     }).then(function(data){              
        //         let anchor = angular.element('<a/>');
        //         anchor.attr({
        //             href: 'data:text/plain;charset=utf-8,' + encodeURIComponent(data),
        //             target: '_blank',
        //             download: filename
        //         })[0].click();
        //     })
        // }

        ////start

        // $scope.linkUrl=function(){
        //     $http({
        //         method:'GET',
        //         url:URL+"/DownloadFile?userId=",
        //         headers: headers
        //     }).then(function(userData){
        //         download:$scope.linkUrl
        //     })
        // }
        $scope.tempUrl = function (data, filename2) {
            // let download = {'Content-Type': 'text/plain;charset=utf-8','accept': 'application/json','Authorization': 'Bearer' + tokenString};
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



            // $http({
            //     method: 'GET',  
            //     url: URL+"/DownloadFile?userId="+data,    
            //     headers: headers,
            //     // contentType: 'application/json',
            //     // responseType: 'application/json'
            //     // responseType: 'arraybuffer'
            // }).then(function (response) {
            //  console.log(response)
            //     let anchor = angular.element('<a/>');
            //     anchor.attr({
            //         href: 'data:application/pdf;charset=utf-8,' + response.data,
            //         target: '_blank',
            //         download: filename
            //     })[0].click();
            // });


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

        // $http.delete('http://13.75.89.123/pooling/api/User/' + $scope.editID).then(function (response) {
        //    console.log('Success');
        //    location.reload();

        // }, function () {
        //     console.log('Failed');
        // }); 

    }


    // $scope.putUpdate =function(userId = 0){
    //     $http.put('http://13.75.89.123/pooling/api/User/Status/38?status=Hired' + userId).then(function(response){
    //         console.log('Status Change');
    //         alert('Status Change');
    //         location.reload();
    //     }, function(){
    //         console.log('Status Fail!');
    //         alert('Status Fail!');
    //     })
    // }
    // $scope.putUpdate();





    $scope.isEmpty = function () {
        delete $localStorage
        if (!$localStorage.username && !$localStorage.password) {
            window.location.href = "../index.html";
        }
    }
    $scope.isEmpty();


});


