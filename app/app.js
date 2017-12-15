(function () {

    'use strict';
    // var angular = require("angular");
    var path = require("path");
    angular.module('livelearning', ['ngRoute', 'ngResource'])
        .run(routeChange)
        .config(routeConfig)
        .value('api', 'http://localhost:50708/')
        

    routeConfig.$inject = ["$routeProvider", "$locationProvider"];
    function routeConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when("/Login", {
                templateUrl: "views/login.html",
                // controller: "HomeCtrl",
                // controllerAs: "home"
            })
            .when("/Course/:type", {
                templateUrl: path.join(__dirname, "views/courses.html"),
            })
            .when("/CoursePlayer/:id",{
                templateUrl: path.join(__dirname, "views/courseplayer.html")
            })
            .otherwise({ redirectTo: "/Course/Offline" });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }
    routeChange.$inject = ['$rootScope', '$location', 'AuthService'];
    function routeChange($rootScope, $location, AuthService) {
        $rootScope.dirname = __dirname;
        // $rootScope.WebApiUrl = 'http://localhost:50708/';
        $rootScope.Utility = {
            UserId: function () {
                return JSON.parse(localStorage.getItem("authentication")).userId;
            }
        };
        $rootScope.$on('$routeChangeStart', function (event, next) {

            if (!AuthService.IsAuthenticated()) {
                $location.path("/Login");
            }

            if($location.path().indexOf("Login") > -1 || $location.path().indexOf("CoursePlayer")  > -1){
                $rootScope.ShowMenu = false;
            }
            else{
                $rootScope.ShowMenu = true;
            }

        });
    }
}());