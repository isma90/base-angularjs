(function () {
    angular.module('myapp.home').controller('someDirectiveController', some);

    some.$inject = ['$scope'];

    function some($scope) {
        var vm = this;
        vm.greeting = $scope.param;
    }
})();



