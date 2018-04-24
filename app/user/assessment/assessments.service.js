(function(){

    angular
        .module('app.user')
        .service('UserAssessmentService', UserAssessmentService);

    UserAssessmentService.$inject = ['$http', '$filter', 'API', 'FORM_CONST', 'exception'];
    function UserAssessmentService($http, $filter, API, FORM_CONST, exception) {
        var services = {
            getAllUserAssessment: getAllUserAssessment,
            getAssessmentQuestionnaire: getAssessmentQuestionnaire,
            getAssessmentAnswers: getAssessmentAnswers
        }
        return services;

        // main functions

        function getAllUserAssessment() {
            var url = API.END_POINT + "/user-assessment-list.txt";
    
            return $http.get(url)
                .then(function(response){
                    return response.data.data;
                })
                .catch(function(error) {
                    return exception.showError(FORM_CONST.API_FETCH_FAILED, error.data);
                });
        }

        function getAssessmentQuestionnaire(assessmentId) {
            var url = API.END_POINT + "/questionnaires.txt";

            return $http.get(url)
                .then(function(response){
                    return response.data.data[0];
                    // const list = response.data.data;
                    // console.log(list);
                    // return $filter('filter')(list, { assessment_id: assessmentId })[0];
                })
                .catch(function(error) {
                    return exception.showError(FORM_CONST.API_FETCH_FAILED, error.data);
                });
        }
        
        // utilities

        function getAssessmentAnswers(questionnaire) {
            var answer = [];

            for(var i=0;i<questionnaire.categories.length;i++){
                var cat = questionnaire.categories[i];

                for(var j=0;j<cat.questions.length;j++){
                    var ans = cat.questions[j];
                    answer
                        .push({ 
                            'question_id': ans.question_id,  
                            'answer': ans.answer
                        });
                }
            }

            return answer;
        }
        
    }
})();