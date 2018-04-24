(function(){

    angular
        .module('app.user', [
            'app.core'
        ])
        .config(config);

    /* ------------------------------------------------ */
    
    function config($stateProvider) {
        $stateProvider
            .state('app.user', {
                abstract: true,
                url: 'user',
                templateUrl: 'user/user-index.html',
            })
            .state('app.user.dashboard', {
                url: '',
                templateUrl: 'user/dashboard/user-dashboard.html'
            })
            .state('app.user.assessment', {
                url: '/assessment',
                templateUrl: 'user/assessment/all-assessments.html',
                controller: 'UserAssessmentController',
                controllerAs: 'vm'
            })
            .state('app.user.settings', {
                url: '/settings',
                templateUrl: 'user/settings/user-settings.html',
                controller: 'UserSettingsController',
                controllerAs: 'vm'
            });
    }
})();