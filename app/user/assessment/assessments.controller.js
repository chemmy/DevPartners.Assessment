(function(){

    angular
        .module('app.user')
        .controller('UserAssessmentController', UserAssessmentController);

    UserAssessmentController.$inject = ['$scope', '$ngConfirm', 'UserAssessmentService'];
    function UserAssessmentController($scope, $ngConfirm, UserAssessmentService) {
        var vm = this;
        vm.pageAssessments = [];
        vm.questionnaire = {};
        vm.pagination = {
            currentPage: 1,
            numPerPage: 15,
            maxSize: 5
        };
        vm.orderByDeadline = orderByDeadline;
        vm.showAssessment = showAssessment;
        vm.btnDoneParams = {};

        activate();

        // main functions

        function activate() {
            getAllAssessments();
        }

        function getAllAssessments() {
            UserAssessmentService.getAllUserAssessment().then(function(data){
                if(data.success!==false){
                    vm.assessments = data;
                    getPageAssessments(); 
                }
            });
        }

        function showAssessment(assessment) {
            vm.assessment = assessment;

            $ngConfirm({
                title: '',
                scope: $scope,
                contentUrl: 'user/assessment/assessment-details.html',
                type: 'orange',
                closeIcon: true,
                escapeKey: true,
                backgroundDismiss: true,
                buttons: {
                    btn: {
                        text: (assessment.status==='Completed') ? 'View' : 'Take',
                        btnClass: 'btn-warning',
                        action: function(scope, button){
                            showQuestionnaire();
                        }
                    }
                }
            });
        }

        function showQuestionnaire() {
            UserAssessmentService.getAssessmentQuestionnaire(vm.assessment.assessment_id)
                .then(function(data){
                    vm.questionnaire = data;
                    vm.qstModalParams = {
                        title: '',
                        scope: $scope,
                        contentUrl: 'user/assessment/assessment-questionnaire.html',
                        type: 'orange',
                        buttons: {
                            done: {
                                text: 'Done',
                                btnClass: 'btn-warning',
                                action: function(scope, button){
                                    function getAssessmentAnswers() {
                                        var answer = [];

                                        for(var i=0;i<vm.questionnaire.categories.length;i++){
                                            var cat = vm.questionnaire.categories[i];
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
                                    
                                    var data = {
                                        "assessment_id": 1,
                                        "user_id": "trial-user0001",
                                        "date_submitted": Date.now(),
                                        "assessment_answer": getAssessmentAnswers()
                                    };

                                    console.log(data);
                                }
                            },
                            cancel: {
                                btnClass: 'btn-default',
                                action: function(scope, button) {

                                }
                            }
                        }
                    };
                    
                    $ngConfirm(vm.qstModalParams);
                });
        }

        // routing


        // watches 

        $scope.$watch('vm.pagination.currentPage + vm.pagination.numPerPage', function(){
            getPageAssessments();
        });

        $scope.$watch('vm.questionnaireForm.$valid', function() {
            if(vm.qstModalParams && vm.questionnaireForm){
                vm.qstModalParams.buttons.done.setDisabled(vm.questionnaireForm.$invalid);
            }
        });

        // utilities

        function getPageAssessments(){
            if(vm.assessments){
                var begin = ((vm.pagination.currentPage - 1) * vm.pagination.numPerPage);
                var end = begin + vm.pagination.numPerPage;
                vm.pageAssessments = vm.assessments.slice(begin, end);
            }
        }

        function orderByDeadline(assessment) {
            var date = new Date(assessment.deadline);
            return date;
        }

    }
})();