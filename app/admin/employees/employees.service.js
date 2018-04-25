(function(){
    'use strict'

    angular
        .module('app.user')
        .service('EmployeesService', EmployeesService);

    EmployeesService.$inject = ['$http', 'API', 'FORM_CONST', 'exception'];
    function EmployeesService($http, API, FORM_CONST, exception) {
        var services = {
            getAllEmployees: getAllEmployees,
            getPositionList: getPositionList,
            getEmployeeAssessments: getEmployeeAssessments
        }
        return services;

        // main functions

        function getAllEmployees() {
            var url = API.END_POINT + "/employees.txt";
    
            return $http.get(url)
                .then(function(response){
                    return response.data.data;
                })
                .catch(function(error) {
                    return exception.showError(FORM_CONST.API_FETCH_FAILED, error.data);
                });
        }

        function getEmployeeAssessments(empId) {
            var url = API.END_POINT + "/user-assessment-list.txt";
    
            return $http.get(url)
                .then(function(response){
                    return response.data.data;
                })
                .catch(function(error) {
                    return exception.showError(FORM_CONST.API_FETCH_FAILED, error.data);
                });
        }

        // utilities

        function getPositionList() {
            var url = API.END_POINT + "/employee-position.txt";
    
            return $http.get(url)
                .then(function(response){
                    return response.data.data;
                })
                .catch(function(error) {
                    return exception.showError(FORM_CONST.API_FETCH_FAILED, error.data);
                });
        }

    }
})();