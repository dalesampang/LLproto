(function(){

    'use strict';

    angular.module("livelearning")
        .controller("CourseCtrl", CourseCtrl);

    CourseCtrl.$inject = ["CourseService", "$routeParams"];  
    
    function CourseCtrl(CourseService, $routeParams){
        var vm = this;
        vm.courses = [];
        activate();
        
        function activate(){
            if($routeParams.type == "Offline"){
                CourseService.GetAll(1).then(function(data){
                    vm.courses = data;
                },function(error){
                    console.log(error);
                });
            }
        };
    }
    
})();