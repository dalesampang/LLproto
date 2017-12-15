(function(){

    'use strict';

    angular.module("livelearning")
        .factory("CourseService", CourseService);

    CourseService.$inject = ["$resource", "$q", "api"];

    function CourseService($resource, $q, api){

        var resource = $resource(api + "api/course/:id", null,{
            getAllCourseByType: {
                url : api + "api/course/type/:typeId",
                method: "GET",
                isArray: true
            },
        });

        var getAll = function(typeId){
            var deferred = $q.defer();
            if(typeId == undefined){
                var deferred = $q.defer();
                resource.query({},
                function(result){
                    deferred.resolve(result);
                }, function(error){
                    deferred.rejet(error);
                });
            }
            else{
                resource.getAllCourseByType({typeId: typeId},
                    function(result){
                        deferred.resolve(result);
                    }, function(error){
                        deferred.rejet(error);
                    });
            }
            return deferred.promise;
        }

        var get = function(id){
            var deferred = $q.defer();
            resource.get({id: id},
                function(result){
                    deferred.resolve(result);
                },
                function(error){
                    deferred.reject(error);
            });   
            return deferred.promise;         
        }

        return {
            Get: get,
            GetAll: getAll
        };

    };

})();