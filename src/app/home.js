(function(){
    angular
        .module( 'myapp.home')
        .controller('homeCtrl',homeCtrl);

    homeCtrl.$inject = ['someService'];

    function homeCtrl(someService) {
        var vm = this;
        
        someService.getGreeting().then(function(result){
            vm.greeting = result;
        });
    }

})();