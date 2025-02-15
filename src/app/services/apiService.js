'use strict';

angular
  .module('jamjar')
  .factory('APIService', function ($http, $window) {

    function APIService () {
        var service = this;

        if ($window.location.host.match(/localhost/)) {
          service.apiRootUrl = 'http://localhost:5001/';
        } else {
          service.apiRootUrl = 'http://api.projectjamjar.com/';
        }
    }

    function handleCallback (p, callback) {
        p.then(
        function successCallback(response) {
          callback(null, response.data, response.status, response.headers, response.config);
        },
        function errorCallback(response) {
          callback(response.data, null, response.status, response.headers, response.config);
        });
    }

    APIService.prototype = {

      _normalizePath: function (path) {
        return path.replace(/^\//, '');
      },

      get: function (resource, primaryKey, callback) {
        var service = this;
        var p = $http.get(service.apiRootUrl + service._normalizePath(resource) + '/' + primaryKey + '/');

        if (callback)
          handleCallback(p, callback);

        return p;
      },

      post: function (resource, data, callback) {
        var service = this;
        var p = $http.post(service.apiRootUrl + service._normalizePath(resource) + '/', data);

        if (callback)
          handleCallback(p, callback);

        return p;
      },

      list: function (resource, callback) {
        var service = this;
        var p = $http.get(service.apiRootUrl + service._normalizePath(resource) + '/');

        if (callback)
          handleCallback(p, callback);

        return p;
      },

      getPath: function (path, callback) {
        var service = this;
        var p = $http.get(service.apiRootUrl + service._normalizePath(path));

        if (callback)
          handleCallback(p, callback);

        return p;
      },

      postPath: function (path, data, callback) {
        var service = this;
        var p = $http.post(service.apiRootUrl + service._normalizePath(path), data);

        if (callback)
          handleCallback(p, callback);

        return p;
      }
  };

  return new APIService();
});
