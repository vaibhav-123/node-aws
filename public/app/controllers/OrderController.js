(function(){
	angular.module("myApp").controller("OrderController", function($scope, $routeParams, $log, customerService, Flash){

		var customerId = $routeParams.customerId;

		// Total orders
		$scope.orders = [];

		// Cart items of customer
		$scope.customerOrders = [];

		$scope.orders = [{
			id: 1,
			name: "Shoe",
			prize: 40
		},{
			id: 2,
			name: "Headphone",
			prize: 20
		},{
			id: 3,
			name: "Mobile",
			prize: 50
		},
		{
			id: 4,
			name: "Book set",
			prize: 30
		},{
			id: 5,
			name: "Notpad",
			prize: 10
		},{
			id: 6,
			name: "Pen",
			prize: 5
		}];
	
		customerService.getCustomerOrders(customerId).success(function (customer) {
			$scope.customerOrders = customer.orders;
			$scope.customerName = customer.firstName+ ' ' + customer.lastName;
			$scope.customerId = customer.id; 
			$scope.totalPrize = 0;
			customer.orders.forEach(function (order){
				$scope.totalPrize += order.prize; 	
			})
		}).error(function (data, staus) {
			$log.error(data);
		});
	
		$scope.addTocart = function (customerId, order){
			customerService.placeCustomerOrder(customerId, order).success(function (data){
				var message = '<strong> Item successfully added to the cart !</strong>';
    			Flash.create('success', message, 2000, {class: 'custom-class', id: 'custom-id'}, true);
			}).error(function(data,  status){
				var message = '<strong> Item already added to the cart !</strong>';
    			Flash.create('danger', message, 2000, {class: 'custom-class', id: 'custom-id'}, true);	
			})
		}

		$scope.buyItem = function(customerId, orderId){
			customerService.buyItem(customerId, orderId).success(function (orders){
				$scope.customerOrders = orders;
				$scope.totalPrize = 0;
				orders.forEach(function (order){
					$scope.totalPrize += order.prize; 	
				})
			}).error(function(data,  status){
				$log.info("error status " + status);
			})
		}	
	});
}());