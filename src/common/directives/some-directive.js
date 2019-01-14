(function(){
    angular.module('myapp.home').directive('someDirective', someDirective);


    function someDirective(){
        return {
            restrict: 'E',
            scope: {
                param: '='
            },
            templateUrl: 'base-angularjs/src/common/directives/directive.tpl.html',
            controller: 'someDirectiveController',
            controllerAs: 'somedc'
        };
    }
})();