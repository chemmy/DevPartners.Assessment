(function(){

    angular
        .module('app.user')
        .controller('UserAssessmentController', UserAssessmentController);

    UserAssessmentController.$inject = ['$scope', '$ngConfirm', 'UserAssessmentService'];
    function UserAssessmentController($scope, $ngConfirm, UserAssessmentService) {
        var vm = this;
        vm.pageAssessments = [];
        vm.pagination = {
            currentPage: 1,
            numPerPage: 15,
            maxSize: 5
        };
        vm.orderByDeadline = orderByDeadline;
        vm.showAssessment = showAssessment;

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
                contentUrl: 'user/assessment/assessment-modal.html',
                type: 'orange',
                closeIcon: true,
                escapeKey: true,
                backgroundDismiss: true,
                buttons: {
                    btn: {
                        text: (assessment.status==='Completed') ? 'View' : 'Take',
                        btnClass: 'btn-warning',
                        action: function(scope, button){
                            if (button.text==='View') {

                            } else {

                            }
                        }
                    }
                }
            });
        }

        // routing


        // watches 

        $scope.$watch('vm.pagination.currentPage + vm.pagination.numPerPage', function(){
            getPageAssessments();
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