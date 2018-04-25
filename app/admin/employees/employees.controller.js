(function(){
    'use strict'

    angular
        .module('app.user')
        .controller('EmployeesController', EmployeesController);

    EmployeesController.$inject = ['$scope', '$ngConfirm', '$filter', 'EmployeesService'];
    function EmployeesController($scope, $ngConfirm, $filter, EmployeesService) {
        var vm = this;
        vm.pageEmployees = [];
        vm.pagination = {
            currentPage: 1,
            numPerPage: 15,
            maxSize: 5
        };
        vm.empPositions = [];
        vm.selectedPosition = {};
        vm.showEmployee = showEmployee;             //functions
        vm.showEdit = showEdit;
        vm.deleteEmployee = deleteEmployee;
        vm.getFullName = getFullName;
        vm.showUserAssessment = showUserAssessment;

        activate();

        // main functions

        function activate() {
            getAllEmployees();
            getEmployeePositionList();
        }

        function getAllEmployees() {
            EmployeesService.getAllEmployees().then(function(data){
                if(data.success!==false){
                    vm.employees = data;
                    getPageEmployees();
                }
            });
        }

        function getEmployeePositionList() {
            EmployeesService.getPositionList().then(function(data){
                if(data.success!==false){
                    vm.empPositions = data;
                }
            });
        }

        function deleteEmployee(employee) {
            console.log("deleteEmployee clicked!");
        }

        function getEmployeeAssessments(empId) {
            EmployeesService.getEmployeeAssessments(empId).then(function(data){
                if(data.success!==false){
                    vm.assessments = data;
                }
            });
        }

        function showUserAssessment(assessment) {
            console.log("showUserAssessment: " + assessment.assessment_name);
        }

        // watches 

        $scope.$watch('vm.pagination.currentPage + vm.pagination.numPerPage', function(){
            getPageEmployees();
        });


        // utilities

        function getPageEmployees(){
            if(vm.employees){
                var begin = ((vm.pagination.currentPage - 1) * vm.pagination.numPerPage);
                var end = begin + vm.pagination.numPerPage;
                vm.pageEmployees = vm.employees.slice(begin, end);
            }
        }

        function concatWithSpace(str1, str2) {
            var strConcat = str1 + ' ' + str2;
            return strConcat.trim();
        }

        function getFullName(employee) {
            var concatLname = concatWithSpace(employee.middlename, employee.lastname);
            return concatWithSpace(employee.firstname, concatLname);
        }

        function getPosition(posId) {
            return $filter('filter')(vm.empPositions, {position_id: posId })[0]
        }

        // modal display

        function showEmployee(employee) {
            vm.isShowOnly = true;
            vm.employee = employee;
            vm.selectedPosition = getPosition(employee.position_id);
            getEmployeeAssessments(vm.employee.employee_id);

            $ngConfirm({
                title: '',
                scope: $scope,
                contentUrl: 'admin/employees/employee-show.html',
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

        function showEdit(employee) {
            vm.isShowOnly = false;
            vm.employee = employee;

            $ngConfirm({
                title: '',
                scope: $scope,
                contentUrl: 'admin/employees/employee-edit.html',
                type: 'orange',
                closeIcon: true,
                escapeKey: true,
                backgroundDismiss: true,
                buttons: {
                    btn: {
                        text: 'Save',
                        btnClass: 'btn-warning',
                        action: function(scope, button){
                            vm.employee.position_id = vm.selectedPosition.position_id;
                            vm.employee.position = vm.selectedPosition.position;
                            console.log(vm.employee)
                        }
                    }
                }
            });
        }


    }
})();