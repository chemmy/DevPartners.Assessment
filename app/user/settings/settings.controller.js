(function(){
    'use strict';

    angular
        .module('app.user')
        .controller('UserSettingsController', UserSettingsController);

    UserSettingsController.$inject = [];
    function UserSettingsController() {
        var vm = this;
        vm.status = {
            isProfileOpen: true,
            isPasswordOpen: false
        }
        vm.uploadImage = uploadImage;

        activate();

        // main functions

        function activate() {

        }        

        // watches 

        

        // utilities

        function uploadImage() {
            console.log("Upload image clicked. No functionality yet.");
        }

    }

        
})();