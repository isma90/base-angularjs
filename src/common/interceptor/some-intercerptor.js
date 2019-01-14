(function() {
    'use strict';
    angular.module('myapp.home').factory('someInterceptor', someInterceptor);
    
    function someInterceptor($q, $log) {

        function request(config) {
            console.log("request ", config);
            return config || $q.when(config);
        }

        function response(resp) {
            console.log("response ", resp);
            return resp;
        }

        function responseError(respError) {
            console.log("responseError ", respError);
            return $q.reject(respError);
        }

        return {
            'request': request,
            'response': response,
            'responseError': responseError
        };
    }
})();