
(function(){
	angular.module("myApp").controller("CustomerController", function($scope, $log, $http, customerService){
		
		$scope.customers = [];

	    // To get all customers list
	    customerService.getCustomers().success(function (customers) {
			$scope.customers = customers;
		}).error(function (data, staus) {
			$log.error(data);
		});
	});
}());