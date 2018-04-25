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

        // watches 

        
        // utilities

        function getPageAssessments(){
            if(vm.assessments){
                var begin = ((vm.pagination.currentPage - 1) * vm.pagination.numPerPage);
                var end = begin + vm.pagination.numPerPage;
                vm.pageAssessments = vm.assessments.slice(begin, end);
            }
        }


        // modal display

    }
})();