(function(){

    angular
        .module('app.user')
        .service('UserAssessmentService', UserAssessmentService);

    UserAssessmentService.$inject = ['$http', 'API', 'FORM_CONST', 'exception'];
    function UserAssessmentService($http, API, FORM_CONST, exception) {
        var services = {
            getAllUserAssessment: getAllUserAssessment
        }
        return services;

        // main functions

        function getAllUserAssessment(){
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