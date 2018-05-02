(function(){

    angular
        .module('app.user')
        .controller('UserSidebarController', UserSidebarController);

    UserSidebarController.$inject = [];
    function UserSidebarController() {
        var vm = this;
        vm.logo = "assets/img/dp-logo.png";
    }
        
})();