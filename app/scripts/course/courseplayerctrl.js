(function(){

    'use-strict';

    angular.module("livelearning")
        .controller("CoursePlayerCtrl",CoursePlayerCtrl);

    CoursePlayerCtrl.$inject = ["$scope","CourseService", "$routeParams"];

    function CoursePlayerCtrl($scope ,CourseService, $routeParams){
        var vm = this;
        vm.course = null;
        vm.isEnded = false;
        vm.isPaused = false;
        vm.sectionIdx = null;
        vm.lecIdx= null;
        vm.sectionId = null;
        vm.lecId= null;
        vm.nextTitle = '';
        vm.autoplay = true;
        vm.GetVideo = getVideo;
        vm.PlayPauseVideo = playPauseVideo;
        vm.VideoFullScreen = videoFullScreen;
        vm.VideoEnded = videoEnded;
        vm.PrevNext = prevNext;

        activate();
       
        registerVideoComponent();

        function prevNext(cond){
            var lecturesLength = vm.course.Sections[vm.sectionIdx].Lectures.length;
            if(cond){
                if((lecturesLength-1)  == vm.lecIdx){
                    var sectionLength = vm.course.Sections.length;
                    if(!(sectionLength -1 == vm.sectionIdx)){
                        vm.sectionIdx += 1;
                        vm.lecIdx = 0;
                    }
                    else{
                        return;
                    }
                }
                else{
                    vm.lecIdx += 1;
                }
            }
            else{
                if(vm.lecIdx == 0){
                    vm.sectionIdx -= 1;
                    lecturesLength = vm.course.Sections[vm.sectionIdx].Lectures.length;
                    vm.lecIdx = lecturesLength - 1;
                }
                else{
                    vm.lecIdx -= 1;
                } 
            }
            getVideo(vm.sectionIdx,vm.lecIdx);
        }

        function getVideo(secIdx,lecIdx){
            if(secIdx !== undefined && lecIdx !== undefined){
                vm.sectionIdx = secIdx;
                vm.lecIdx = lecIdx;
                // $('.video-tab-content .panel-body.active').removeClass('active').find('i').removeClass('fa-check-circle').addClass('fa-play-circle');
                // $(this).addClass('active').find('i').removeClass('fa-play-circle').addClass('fa-check-circle');
            }
            else{
                var lecturesLength = vm.course.Sections[vm.sectionIdx].Lectures.length;
                if((lecturesLength-1)  == vm.lecIdx){
                    var sectionLength = vm.course.Sections.length;
                    if(!(sectionLength -1 == vm.sectionIdx)){
                        vm.sectionIdx += 1;
                        vm.lecIdx = 0;
                        // $('.video-tab-content .panel-body.active').find('i').removeClass('fa-check-circle').addClass('fa-play-circle');
                        // $('.video-tab-content .panel-body.active').removeClass('active').next().addClass('active').find('i').removeClass('fa-play-circle').addClass('fa-check-circle');
                    }
                    else{
                        return;
                    }
                }
                else{
                    vm.lecIdx += 1;
                }
            }
            var data = vm.course.Sections[ vm.sectionIdx].Lectures[vm.lecIdx];
            var src = "http://localhost:50708/api/course/lecture/"+data.Id;
            vm.lecId = data.Id;
            vm.sectionId = data.SectionId;
            vm.nextTitle = (vm.lecIdx+1) + '. ' + data.Title;
            $(".video-title span").text((vm.lecIdx+1) + '. ' + data.Title);
            $(".video-section video").remove();
            $(".video-section").prepend(' <video controls ng-click="courseplayervm.PlayPauseVideo();" id="video-place" height="100%" width="100%" class="embed-responsive-item" autoplay="autoplay"></video>');
            $("#video-place").append('<source src="'+src+'"></source>');

            $("#video-place")[0].load();
            vm.isEnded = false;
            vm.isPaused = false;
            registerVideoComponent();
            
           
        };

        function videoEnded(){
            if(vm.autoplay){
                vm.GetVideo();
            }
            else{
                vm.isEnded = true;
            }
        }

        function playPauseVideo(){
            var video = $("#video-place")[0];
            if (video.paused)
            {
                vm.isPaused = false;
                video.play();
                $('#video-big-button').hide();
            }
            else {
                video.pause();
              
                vm.isPaused = true;
                $('#video-big-button').show().find('i').removeClass().addClass('fa fa-pause');
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
                $('video').on('click', function(){
                    playPauseVideo();
                });

                // $('.video-tab-content a').on("click", function(){
                //     $('.video-tab-content .panel-body.active').removeClass('active').find('i').removeClass('fa-check-circle').addClass('fa-play-circle');
                //     $(this).addClass('active').find('i').removeClass('fa-play-circle').addClass('fa-check-circle');
                // });

                
                $('#video-place').on('ended',function(){
                    if($("#autoplay").is(':checked')){
                        vm.GetVideo();
                        // $('.video-tab-content .panel-body.active').find('i').removeClass('fa-check-circle').addClass('fa-play-circle');
                        // $('.video-tab-content .panel-body.active').removeClass('active').next().addClass('active').find('i').removeClass('fa-play-circle').addClass('fa-check-circle');
                        $scope.$apply();
                    }
                    else{
                        $('#video-big-button').show().find('i').removeClass().addClass('fa fa-play');
                    }
                    
                });
            };
    }
})();

