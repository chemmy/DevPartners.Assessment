(function(){

    angular
        .module('block.alert')
        .factory('alert', alert);

    alert.$inject = ['$ngConfirm'];
    function alert($ngConfirm) {
        var services = {
            showSuccess: showSuccess
        }
        return services;

        function showSuccess(msg) {            
            $ngConfirm({
                title: 'Success!',
                content: msg,
                type: 'green',
                buttons: {
                    close: {
                        btnClass: 'btn-green'
                    }
                }
            });
        }
    }

})();