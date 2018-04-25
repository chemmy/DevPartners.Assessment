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
            .state('app.admin.assessment', {
                url: '/assessment',
                templateUrl: 'admin/assessment/all-assessments.html',
                controller: 'AdminAssessmentController',
                controllerAs: 'vm'
            });

    }
})();