(function(){
    angular
        .module('app.user')
        .controller('QuestionnairesController', QuestionnairesController);

    QuestionnairesController.$inject = ['$scope', '$window', '$ngConfirm', '$filter', 'QuestionnairesService'];
    function QuestionnairesController($scope, $window, $ngConfirm, $filter, QuestionnairesService) {
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
                            console.log(vm.questionnaire);
                        }
                    }
                }
            });
        }

    }
    
})();