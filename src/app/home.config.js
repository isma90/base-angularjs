(function(){
    angular
        .module("myapp.home")
        .config(configuration);

        configuration.$inject = ['$httpProvider', '$stateProvider'];

    function configuration($httpProvider, $stateProvider){
        $stateProvider
            .state('home', {
                url: '/home',
                views: {
                    "main@": {
                        controller: 'homeCtrl',
                        controllerAs: 'home',
                        templateUrl: 'home.tpl.html'
                    }
                },
                parent: 'root',
                data: {pageTitle: 'Home'}
            });
            $httpProvider.interceptors.push('someInterceptor');
    }
})();