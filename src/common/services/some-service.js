(function(){
    angular.module('myapp.home.services')
        .service('someService', someService);

    function someService(){
        return {
            getGreeting: getGreeting
        };

        function getGreeting(){
            return { 1: "hello", 2: "world"};
        }
    }
})();