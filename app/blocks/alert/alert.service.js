(function(){

    angular
        .module('block.alert')
        .factory('alert', alert);

    alert.$inject = ['$ngConfirm'];
    function alert($ngConfirm) {
        var services = {
            showSuccess: showSuccess,
            showWarning: showWarning
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

        function showWarning(msg) {
            $ngConfirm({
                title: 'Warning!',
                content: msg,
                type: 'orange',
                buttons: {
                    close: {
                        btnClass: 'btn-orange'
                    }
                }
            });
        }
    }

})();