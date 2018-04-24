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
        vm.myVar = 'false';

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

        function saveAssessmentAnswers() {
            var data = {
                "assessment_id": 1,
                "user_id": "trial-user0001",
                "date_submitted": Date.now(),
                "assessment_answer": UserAssessmentService.getAssessmentAnswers(vm.questionnaire.questions)
            };

            console.log(data);
        }

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

        // modal display

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
                    vm.categories = UserAssessmentService.getQuestionnaireCategories(vm.questionnaire.questions);
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
                                    saveAssessmentAnswers();
                                }
                            },
                            close: {
                                text: 'Cancel',
                                btnClass: 'btn-default',
                                action: function(scope, button) { }
                            }
                        }
                    };
                    
                    $ngConfirm(vm.qstModalParams);
                });
        }

    }
})();