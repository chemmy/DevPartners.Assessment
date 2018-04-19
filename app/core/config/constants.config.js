(function(){
    'use strict';

    var app = angular.module('app');
    
    app.constant('API', {
        'END_POINT': 'test/data'
    });

    app.constant('FORM_CONST', {
        'API_FETCH_FAILED': 'Unable to load data. Please try again later.',
        'API_ACTION_FAILED': 'Unable to continue action. Please try again later.'
    });

})();