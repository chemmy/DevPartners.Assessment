(function(){
    angular
        .module('app.user')
        .controller('QuestionnairesController', QuestionnairesController);

    QuestionnairesController.$inject = ['$scope', '$window', '$ngConfirm', '$filter', 'alert', 'QuestionnairesService'];
    function QuestionnairesController($scope, $window, $ngConfirm, $filter, alert, QuestionnairesService) {
        var vm = this;
        vm.pageQuestionnaires = [];
        vm.pagination = {
            currentPage: 1,
            numPerPage: 15,
            maxSize: 5
        };
        vm.question = {};
        vm.isQuestionFldsValid = true;
        vm.addQuestionnaire = addQuestionnaire;     // functions
        vm.addQuestion = addQuestion;
        vm.removeQuestion = removeQuestion;

        activate();

        // main functions

        function activate() {
            getAllQuestionnaires();
            getQuestionCategories();
            getOptionTypes();
        }

        function getAllQuestionnaires() {
            QuestionnairesService.getAllQuestionnaires().then(function(data){
                if(data.success!==false){
                    vm.questionnaires = data;
                    getPageQuestionnaires();
                }
            });
        }

        function addQuestion() {
            var question = vm.question.description;
            var sCat = vm.question.selectedCategory;
            var sOpt = vm.question.selectedOption;

            vm.isQuestionFldsValid = (!question || !sCat || !sOpt) ? false : true;

            if (vm.isQuestionFldsValid) {
                if (!findCategoryInArr(sCat.category_id)){
                    vm.categories.push(sCat);
                }
                
                vm.questionnaire.questions.push({
                    'question': question,
                    'category_id': sCat.category_id,
                    'option_group_id': sOpt.optiongroup_id,
                    'options': sOpt.options
                });

                resetNewQuestionField();
            }
        }

        function removeQuestion(question) {
            var qst_idx = vm.questionnaire.questions.indexOf(question);
            vm.questionnaire.questions.splice(qst_idx, 1);

            if(!findCatInQuestionsArr(question.category_id)) {
                var cat_idx = vm.categories.indexOf(findCategoryInArr(question.category_id));
                vm.categories.splice(cat_idx, 1);
            }
        }


        // watches 

        $scope.$watch('vm.pagination.currentPage + vm.pagination.numPerPage', function(){
            getPageQuestionnaires();
        });

        
        // utilities

        function getPageQuestionnaires() {
            if(vm.questionnaires){
                var begin = ((vm.pagination.currentPage - 1) * vm.pagination.numPerPage);
                var end = begin + vm.pagination.numPerPage;
                vm.pageQuestionnaires = vm.questionnaires.slice(begin, end);
            }
        }

        function getQuestionCategories() {
            QuestionnairesService.getQuestionCategories().then(function(data){
                if(data.success!==false){
                    vm.qstCategories = data;
                }
            });
        }

        function getOptionTypes() {
            QuestionnairesService.getOptionTypes().then(function(data){
                if(data.success!==false){
                    vm.qstOptionType = data;
                }
            });
        }

        function findCategoryInArr(catId) {
            return $filter('filter')(vm.categories, {category_id: catId })[0]
        }

        function findCatInQuestionsArr(catId) {
            return $filter('filter')(vm.questionnaire.questions, {category_id: catId })[0]
        }

        function resetNewQuestionField() {
            vm.question.description = null;
            var x = $window.document.getElementById('newquestion');
            x.focus();
        }


        // modal display

        function addQuestionnaire() {
            vm.categories = [];
            vm.question = [];
            vm.questionnaire = [];
            vm.questionnaire.questions = [];

            $ngConfirm({
                title: 'New Questionnaire',
                scope: $scope,
                contentUrl: 'admin/questionnaires/questionnaire-add.html',
                type: 'orange',
                closeIcon: true,
                escapeKey: true,
                backgroundDismiss: true,
                buttons: {
                    btn: {
                        text: 'Save',
                        btnClass: 'btn-warning',
                        action: function(scope, button){
                            if (vm.questionnaire.description && vm.questionnaire.questions) {
                                // save here
                                console.log(vm.questionnaire);
                                alert.showSuccess("Questionnaire - successfully added!");
                            } else {
                                alert.showWarning("No questions added! Questionnaire not saved.");
                            }
                        }
                    }
                }
            });
        }

    }
    
})();