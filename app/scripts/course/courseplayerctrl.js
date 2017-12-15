(function(){

    'use-strict';

    angular.module("livelearning")
        .controller("CoursePlayerCtrl",CoursePlayerCtrl);

    CoursePlayerCtrl.$inject = ["CourseService", "$routeParams"];

    function CoursePlayerCtrl(CourseService, $routeParams){
        var vm = this;
        vm.course = null;
        activate();
        vm.GetVideo = getVideo;

        function getVideo(id){
            var src = "http://localhost:50708/api/course/lecture/"+id;
            $("#video-place").html("<source src='"+src+"'></source>");
        };

        function activate(){
            CourseService.Get($routeParams.id).then(function(data){
                vm.course = data;
            },function(error){
                console.log(error);
            });
        }
    };

})();