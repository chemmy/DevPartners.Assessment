(function(){
    'use strict'

    angular
        .module('app.user')
        .controller('AssessmentsController', AssessmentsController);

    AssessmentsController.$inject = ['$scope', '$ngConfirm', 'AssessmentsService'];
    function AssessmentsController($scope, $ngConfirm, AssessmentsService) {
        var vm = this;
        vm.pageAssessments = [];
        vm.pagination = {
            currentPage: 1,
            numPerPage: 15,
            maxSize: 5
        };
        vm.showAssessment = showAssessment;         // functions
        vm.showEdit = showEdit;
        vm.deleteAssessment = deleteAssessment;
        vm.showUserAssessment = showUserAssessment;
        vm.getFullName = getFullName;

        activate();

        // main functions

        function activate() {
            getAllAsessments();
        }

        function getAllAsessments() {
            AssessmentsService.getAllAssessments().then(function(data){
                if(data.success!==false){
                    vm.assessments = data;
                    getPageAssessments();
                }
            });
        }

        function showEdit(assessment) {
            console.log("showEdit");
        }

        function deleteAssessment(assessment) {
            console.log("deleteAssessment");
        }

        // watches 

        
        // utilities

        function getPageAssessments(){
            if(vm.assessments){
                var begin = ((vm.pagination.currentPage - 1) * vm.pagination.numPerPage);
                var end = begin + vm.pagination.numPerPage;
                vm.pageAssessments = vm.assessments.slice(begin, end);
            }
        }

        function getEmpAssessmentStatus(assessmentId) {
            AssessmentsService.getEmpAssessmentStatus(assessmentId).then(function(data){
                if(data.success!==false){
                    vm.employees = data;
                }
            });
        }

        function getEmpAssessmentQuestionnaire(empId) {
            AssessmentsService.getEmpAssessmentQuestionnaire(empId, vm.assessment.assessment_id)
                .then(function(data){
                    if(data.success!==false){
                        vm.questionnaire = data[0];
                        vm.categories = AssessmentsService.getQuestionnaireCategories(vm.questionnaire.questions);
                    }
                });
        }

        function getFullName(employee) {
            var concatLname = concatWithSpace(employee.middlename, employee.lastname);
            return concatWithSpace(employee.firstname, concatLname);
        }

        function concatWithSpace(str1, str2) {
            var strConcat = str1 + ' ' + str2;
            return strConcat.trim();
        }


        // modal display

        function showAssessment(assessment) {
            vm.assessment = assessment;
            getEmpAssessmentStatus(assessment.assessment_id);

            $ngConfirm({
                title: '',
                scope: $scope,
                contentUrl: 'admin/assessments/assessment-detail.html',
                type: 'orange',
                closeIcon: true,
                escapeKey: true,
                backgroundDismiss: true,
                buttons: {
                    btn: {
                        text: 'Close',
                        btnClass: 'btn-warning',
                        action: function(scope, button){
                            
                        }
                    }
                }
            });
        }

        function showUserAssessment(employee) {
            vm.employee = employee;
            getEmpAssessmentQuestionnaire(employee.employee_id);

            $ngConfirm({
                title: '',
                scope: $scope,
                contentUrl: 'admin/assessments/assessment-empanswer.html',
                type: 'orange',
                closeIcon: true,
                escapeKey: true,
                backgroundDismiss: true,
                buttons: {
                    btn: {
                        text: 'Close',
                        btnClass: 'btn-warning',
                        action: function(scope, button){
                            
                        }
                    }
                }
            });
        }
    }
})();