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
        vm.PlayPauseVideo = playPauseVideo;
        vm.VideoFullScreen = videoFullScreen;
        vm.isEnded = false;
        vm.isPaused = false;
        vm.sectionId = null;
        vm.lecId = null;
        registerVideoComponent();
        function getVideo(secIdx,lecIdx){
            if(secIdx !== undefined && lecIdx !== undefined){
                vm.sectionId = secIdx;
                vm.lecId = lecIdx;
                $('.video-tab-content .panel-body.active').removeClass('active').find('i').removeClass('fa-check-circle').addClass('fa-play-circle');
                $(this).addClass('active').find('i').removeClass('fa-play-circle').addClass('fa-check-circle');
            }
            else{
                var lecturesLength = vm.course.Sections[ vm.sectionId].Lectures.length;
                if((lecturesLength-1)  == vm.lecId){

                }
                else{
                    vm.lecId += 1;
                }
            }
            var data = vm.course.Sections[ vm.sectionId].Lectures[vm.lecId];
            var src = "http://localhost:50708/api/course/lecture/"+data.Id;
            $(".video-title span").text((vm.lecId+1) + '. ' + data.Title);
            $(".video-section").html('');
            $(".video-section").append(' <video controls ng-click="courseplayervm.PlayPauseVideo();" id="video-place" class="embed-responsive-item" autoplay="autoplay"></video>');
            $("#video-place").append('<source src="'+src+'"></source>');
            $("#video-place")[0].load();
            vm.isEnded = false;
            vm.isPaused = false;
            registerVideoComponent();
           
        };

        function playPauseVideo(){
            var video = $("#video-place")[0];
            if (video.paused)
            {
                vm.isPaused = false;
                video.play();
            }
            else {
                video.pause();
                vm.isPaused = true;
            }
        };

        function videoFullScreen(){
            var video = $("#video-place")[0];
            if (video.requestFullscreen) {
                video.requestFullscreen();
              } else if (video.mozRequestFullScreen) {
                video.mozRequestFullScreen();
              } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
              }
        };


        function activate(){
            CourseService.Get($routeParams.id).then(function(data){
                vm.course = data;
            },function(error){
                console.log(error);
            });
        }

        function showHideControls(cond){
            if(cond){
                $(".video-top-option").show();
                $("#dashboard-btn").show();
            }
            else{
                $(".video-top-option").hide();
                $("#dashboard-btn").hide();
            }
        };


        function registerVideoComponent(){
                $('#video-place, #dashboard-btn, .video-top-option, .video-section a').hover(function(event) {
                    if(event.type === "mouseenter") {
                        showHideControls(true);
                    } else if(event.type === "mouseleave") {
                        showHideControls(false);
                    }
                });

                $('.video-tab-content a').on("click", function(){
                    $('.video-tab-content .panel-body.active').removeClass('active').find('i').removeClass('fa-check-circle').addClass('fa-play-circle');
                    $(this).addClass('active').find('i').removeClass('fa-play-circle').addClass('fa-check-circle');
                });

                
                $('#video-place').on('ended',function(){
                    if($("#autoplay").is(':checked')){
                        vm.GetVideo();
                        $('.video-tab-content .panel-body.active').find('i').removeClass('fa-check-circle').addClass('fa-play-circle');
                        $('.video-tab-content .panel-body.active').removeClass('active').next().addClass('active').find('i').removeClass('fa-play-circle').addClass('fa-check-circle');
                    }
                    // else{
                    //     vm.isEnded = true;
                        
                    // }
                });
            };
    }
})();

