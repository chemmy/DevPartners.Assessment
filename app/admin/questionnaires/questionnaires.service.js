(function(){

    angular
        .module('app.user')
        .service('QuestionnairesService', QuestionnairesService);

    QuestionnairesService.$inject = ['$http', 'API', 'FORM_CONST', 'exception'];
    function QuestionnairesService($http, API, FORM_CONST, exception) {
        var services = {
            getAllQuestionnaires: getAllQuestionnaires,
            getQuestionCategories: getQuestionCategories,
            getOptionTypes: getOptionTypes
        }
        return services;

        // main functions

        function getAllQuestionnaires() {
            var url = API.END_POINT + "/questionnaire-list.txt";
    
            return $http.get(url)
                .then(function(response){
                    return response.data.data;
                })
                .catch(function(error) {
                    return exception.showError(FORM_CONST.API_FETCH_FAILED, error.data);
                });
        }
        

        // utilities

        function getQuestionCategories() {
            var url = API.END_POINT + "/categories-list.txt";
    
            return $http.get(url)
                .then(function(response){
                    return response.data.data;
                })
                .catch(function(error) {
                    return exception.showError(FORM_CONST.API_FETCH_FAILED, error.data);
                });
        }

        function getOptionTypes() {
            var url = API.END_POINT + "/option-groups.txt";
    
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