(function(){

    angular
        .module('app.user')
        .service('UserAssessmentService', UserAssessmentService);

    UserAssessmentService.$inject = ['$http', '$filter', 'API', 'FORM_CONST', 'exception'];
    function UserAssessmentService($http, $filter, API, FORM_CONST, exception) {
        var services = {
            getAllUserAssessment: getAllUserAssessment,
            getAssessmentQuestionnaire: getAssessmentQuestionnaire,
            getAssessmentAnswers: getAssessmentAnswers,
            getQuestionnaireCategories: getQuestionnaireCategories
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
            var url = API.END_POINT + "/assessment-questionnaire.txt";

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

        function getAssessmentAnswers(questions) {
            var answers = [];

            for(var i=0;i<questions.length;i++){
                var qst = questions[i];
                answers
                    .push({ 
                        'question_id': qst.question_id,  
                        'answer': qst.answer
                    });
            }

            return answers;
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