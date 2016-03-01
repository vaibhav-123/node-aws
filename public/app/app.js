
var myApp = angular.module('myApp', ['ngRoute', "ngFlash"]);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/customers', {
        templateUrl: 'customers.html',
        controller: 'CustomerController'
      }).
      when('/placeOrders/:customerId', {
        templateUrl: 'placeOrders.html',
        controller: 'OrderController'
      }).
      when('/signUp', {
        templateUrl: 'signUp.html',
        controller: 'LoginController'
      }).
      when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginController'
      }).
      when('/customerOrders/:customerId', {
        templateUrl: 'orders.html',
        controller: 'OrderController'
      }).
      otherwise({
        redirectTo: '/main.html'
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
