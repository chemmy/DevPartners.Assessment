(function(){
    'use strict'

    angular
        .module('app.user')
        .service('AssessmentsService', AssessmentsService);

    AssessmentsService.$inject = ['$http', 'API', 'FORM_CONST', 'exception'];
    function AssessmentsService($http, API, FORM_CONST, exception) {
        var services = {
            getAllAssessments: getAllAssessments,
            getEmpAssessmentStatus: getEmpAssessmentStatus,
            getEmpAssessmentQuestionnaire: getEmpAssessmentQuestionnaire,
            getQuestionnaireCategories: getQuestionnaireCategories
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
        
        function getEmpAssessmentStatus(assessmentId) {
            var url = API.END_POINT + "/employee-assessment-stat.txt";
    
            return $http.get(url)
                .then(function(response){
                    return response.data.data;
                })
                .catch(function(error) {
                    return exception.showError(FORM_CONST.API_FETCH_FAILED, error.data);
                });
        }

        function getEmpAssessmentQuestionnaire(empId, assessmentId) {
            var url = API.END_POINT + "/assessment-questionnaire.txt";
    
            return $http.get(url)
                .then(function(response){
                    return response.data.data;;
                })
                .catch(function(error) {
                    return exception.showError(FORM_CONST.API_FETCH_FAILED, error.data);
                });
        }

        function getQuestionnaireCategories(questions) {
            var categories = [];

            var unique = {};
            for( var i in questions ){
                var qst = questions[i];

                if( typeof(unique[qst.category_id]) == "undefined" ){
                    categories
                        .push({
                            'category_id': qst.category_id,
                            'category_name': qst.category_name
                        });
                }
                unique[qst.category_id] = 0;
            }
            
            return categories;
        }

    }
})();