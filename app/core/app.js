(function(){

    angular
        .module('app', [
            /* shared modules */
            'app.core',

            /* feature areas */
            'app.user','app.admin'
            
        ])
        .config(config);

    /* ------------------------------------------------ */
    
    function config($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/user',
                template: '<ui-view/>',
            });

        $urlRouterProvider.otherwise('/');
    }

})();