(function () {

    'use angular';

    angular.module("livelearning")
        .directive('carouselItem', [function () {
            return {
                restrict: 'A',
                link: function (scope, element) {
                    if (scope.$last) {
                        $(".dashboard-onlineschools-slider").owlCarousel({
                            loop: false,
                            items: 3,
                            autoplay: false,
                            margin: 10,
                            dots: false,
                            nav: true,
                            navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"]
                        });
                    }
                }
            };
        }]);

})();