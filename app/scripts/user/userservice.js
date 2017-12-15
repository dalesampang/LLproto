(function () {

    'use strict';

    // var angular = require("angular");

    angular.module("livelearning")
        .factory("UserService", UserService);

    UserService.$inject = ["$resource", "$q", "api"];

    function UserService($resource, $q,api) {
        var resource = $resource(api + "api/user/:id", null,
            {
                query: { method: 'Get', isArray: true },
                authenticateUser: {
                    url: api + "api/user/authenticate/:email/:password",
                    method: "POST",
                    params: {
                        email: "@email",
                        password: "@password"
                    }
                },
                update: {
                    method: 'PUT'
                }
            }, { stripTrailingSlashes: false });

        var authenticateUser = function (email, password) {
            var deferred = $q.defer();

            resource.authenticateUser({ email: email, password: password },
                function (data) { deferred.resolve(data) },
                function (error) { deferred.reject(error) }
            );

            return deferred.promise;
        }

        var getAllUsers = function () {
            var deferred = $q.defer();

            resource.query({},
                function (data) { deferred.resolve(data) },
                function (error) { deferred.reject(error) }
            );

            return deferred.promise;
        }

        var getUserById = function (userId) {
            var deferred = $q.defer();

            resource.get({ id: userId },
                function (data) { deferred.resolve(data) },
                function (error) { deferred.reject(error) }
            );

            return deferred.promise;
        }

        var addUserProfile = function (user) {

            var deferred = $q.defer();

            resource.save(user,
                function (result) {
                    deferred.resolve(result);
                },
                function (response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        var updateUserProfile = function (data) {

            var deferred = $q.defer();

            resource.update(data,
                function (result) {
                    deferred.resolve(result);
                },
                function (response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;
        }

        var searchUser = function (keyword) {

            var deferred = $q.defer();

            resource.search({ keyword: keyword },
                function (result) {
                    deferred.resolve(result);
                },
                function (response) {
                    deferred.reject(response);
                }
            );

            return deferred.promise;

        }

        return {
            AuthenticateUser: authenticateUser,
            GetAllUsers: getAllUsers,
            GetUserById: getUserById,
            AddUserProfile: addUserProfile,
            UpdateUserProfile: updateUserProfile,
            SearchUser: searchUser
        }

    }

})();