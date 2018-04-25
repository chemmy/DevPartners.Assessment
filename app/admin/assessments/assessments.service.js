(function(){
    'use strict'

    angular
        .module('app.user')
        .service('AssessmentsService', AssessmentsService);

    AssessmentsService.$inject = ['$http', 'API', 'FORM_CONST', 'exception'];
    function AssessmentsService($http, API, FORM_CONST, exception) {
        var services = {
            getAllAssessments: getAllAssessments
        }
        return services;

        // main functions

        function getAllAssessments() {
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
        

    }
})();