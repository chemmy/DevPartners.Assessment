(function(){

    angular
        .module('app.admin', [
            'app.core'
        ])
        .config(config);

    /* ------------------------------------------------ */
    
    function config($stateProvider) {
        $stateProvider
            .state('app.admin', {
                abstract: true,
                url: 'admin',
                templateUrl: 'admin/admin-index.html',
            })
            .state('app.admin.dashboard', {
                url: '',
                templateUrl: 'admin/dashboard/admin-dashboard.html'
            })
            .state('app.admin.employees', {
                url: '/employees',
                templateUrl: 'admin/employees/employees.html',
                controller: 'EmployeesController',
                controllerAs: 'vm'
            })
            .state('app.admin.assessment', {
                url: '/assessments',
                templateUrl: 'admin/assessments/assessments.html',
                controller: 'AssessmentsController',
                controllerAs: 'vm'
            });
    }

})();