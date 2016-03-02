
var myApp = angular.module('myApp', ['ngRoute', "ngFlash"]);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/customers', {
        templateUrl: '/app/views/customers.html',
        controller: 'CustomerController'
      }).
      when('/placeOrders/:customerId', {
        templateUrl: '/app/views/placeOrders.html',
        controller: 'OrderController'
      }).
      when('/signUp', {
        templateUrl: '/app/views/signUp.html',
        controller: 'LoginController'
      }).
      when('/login', {
        templateUrl: '/app/views/login.html',
        controller: 'LoginController'
      }).
      when('/customerOrders/:customerId', {
        templateUrl: '/app/views/orders.html',
        controller: 'OrderController'
      }).
      otherwise({
        redirectTo: '/app/views/main.html'
      });
}]);

// myApp.controller("NavController",function($scope){
//   	$scope.class = "inactive";
//   	$scope.changeClass = function(){
//     	if ($scope.class === "inactive") {
// 			$scope.class = "active";
//     	}
//     	else {
//     		$scope.class = "inactive";
//     	}  	
//  	};
// });
