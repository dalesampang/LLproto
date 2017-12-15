(function () {

    'use strict';

    // var angular = require("angular");

    angular.module("livelearning")
        .controller("HomeCtrl", HomeCtrl);

    HomeCtrl.$inject = ["AuthService","$location"];

    function HomeCtrl(AuthService,$location) {
        var vm = this;
        vm.email = '';
        vm.password = '';

        vm.Status = function () {
            return AuthService.IsAuthenticated();
        };

        vm.isActive = function (loc) {
            return loc === $location.path();
        };

        vm.Login = function () {
            AuthService.AuthenticateUser(vm.email, vm.password)
            .then(function (data) {
                $location.path("/Course/Offline");
            }, function (error) {
                console.log(error);
            });
        };
    };
})();