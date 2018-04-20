(function(){

    angular
        .module('block.exception')
        .factory('exception', exception);

    exception.$inject = ['$ngConfirm'];
    function exception($ngConfirm) {
        var services = {
            showError: showError
        }
        return services;

        function showError(msg, errDescription) {
            console.log(errDescription);
            
            $ngConfirm({
                title: "Error",
                content: msg,
                type: 'red',
                buttons: {
                    close: {
                        btnClass: 'btn-red'
                    }
                }
            });

            return {
                success: false,
                message: msg
            }
        }
    }

})();