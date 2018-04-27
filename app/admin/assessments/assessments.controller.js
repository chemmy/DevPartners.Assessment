(function(){
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
        vm.date = {
            popupOpen: false,
            format: 'dd-MMMM-yyyy',
            options: {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1
            }
        };
        vm.openDatePopup = openDatePopup;
        vm.showAssessment = showAssessment;         // functions
        vm.showEdit = showEdit;
        vm.deleteAssessment = deleteAssessment;
        vm.showUserAssessment = showUserAssessment;
        vm.showQuestionnaire = showQuestionnaire;
        vm.newQuestionnaire = newQuestionnaire;
        vm.addQuestion = addQuestion;
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

        function getQuestionnairesList() {
            AssessmentsService.getQuestionnairesList().then(function(data){
                if(data.success!==false){
                    vm.questionnaires = data;
                }
            });
        }

        function getQuestionnaire(questionnaireId) {
            AssessmentsService.getQuestionnaire(questionnaireId)
                .then(function(data){
                    if(data.success!==false){
                        vm.questionnaire = data[0];
                        vm.categories = AssessmentsService.getQuestionnaireCategories(vm.questionnaire.questions);
                    }
                });
        }

        function getAllQuestionCategories() {
            AssessmentsService.getAllQuestionCategories()
                .then(function(data){
                    if(data.success!==false){
                        vm.allCategories = data;
                        vm.question.category = vm.allCategories[0];
                    }
                });
        }

        function getOptionGroups() {
            AssessmentsService.getOptionGroups()
                .then(function(data){
                    if(data.success!==false){
                        vm.optiongroup = data;
                        vm.question.optiongroup = vm.optiongroup[0];
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

        function openDatePopup() {
            vm.date.popupOpen = true;
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

        function showEdit(assessment) {
            vm.assessment = assessment;
            getQuestionnairesList();         

            $ngConfirm({
                title: '',
                scope: $scope,
                contentUrl: 'admin/assessments/assessment-add.html',
                type: 'orange',
                closeIcon: true,
                escapeKey: true,
                backgroundDismiss: true,
                buttons: {
                    btn: {
                        text: 'Save',
                        btnClass: 'btn-warning',
                        action: function(scope, button){
                            console.log(vm.assessment);
                        }
                    }
                }
            });
        }

        function showQuestionnaire(questionnaire) {
            getQuestionnaire(questionnaire.questionnaire_id);
            vm.assessment = (vm.assessment) ? vm.assessment : {};
            vm.assessment.questionnaire_id = questionnaire.questionnaire_id;
            
            $ngConfirm({
                title: questionnaire.description,
                scope: $scope,
                contentUrl: 'admin/assessments/questionnaire/questionnaire.html',
                type: 'orange',
                closeIcon: true,
                escapeKey: true,
                backgroundDismiss: true,
                buttons: {
                    btn: {
                        text: 'Close',
                        btnClass: 'btn-warning',
                        action: function(scope, button){
                            console.log(vm.assessment);
                        }
                    }
                }
            });
        }

        function newQuestionnaire() {
            vm.categories = {};
            vm.questionnaire = {};

            $ngConfirm({
                title: '',
                scope: $scope,
                contentUrl: 'admin/assessments/questionnaire/questionnaire-add.html',
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

        vm.questions = [];
        function addQuestion() {
            vm.questionnaire.questions = [];
            vm.categories = [];
            vm.question = {};


            vm.try = "Initial";

            getAllQuestionCategories();
            getOptionGroups();

            $ngConfirm({
                title: '',
                scope: $scope,
                contentUrl: 'admin/assessments/questionnaire/question-add.html',
                type: 'orange',
                closeIcon: true,
                escapeKey: true,
                backgroundDismiss: true,
                buttons: {
                    btn: {
                        text: 'Add',
                        btnClass: 'btn-warning',
                        action: function(scope, button){
                            vm.questions.push({
                                "description": vm.question.description,
                                "category": vm.question.category.category,
                                "optiongroup": vm.question.optiongroup.description
                            });
                            console.log(vm.questions);
                        }
                    }
                }
            });
        }
    }
})();