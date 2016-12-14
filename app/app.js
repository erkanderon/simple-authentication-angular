'use strict';

angular.module('Authentication', []);
angular.module('Home', []);

// Declare app level module which depends on views, and components
var app = angular.module("myApp", ["ngRoute", 

	
	"Authentication",
	"loginApp2",
	"ngCookies",
	"Home"
	]);


/*app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}]);*/


app.config(function($routeProvider) {
    $routeProvider
    .when('/login', {
            controller: 'LoginController2',
            templateUrl: 'static/login2.html',
            hideMenus: true
        })
    .when('/', {
            controller: 'HomeController',
            templateUrl: 'static/home.html'
        })
    .otherwise("/login")
});

app.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);

app.factory('UserService', [function() {
  return {
    isLogged: false,
    username: ''
  };
}]);

