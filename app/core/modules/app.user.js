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
            });
    }
})();