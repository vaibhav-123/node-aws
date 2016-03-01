(function(){
	angular.module("myApp").service("customerService", function($http){

	    this.getCustomers = function () {
			return $http.get('/getCustomers');
		}

		this.getCustomerOrders = function(customerId){
			return $http.get('/getCustomerOrders/' + customerId);
		}

		this.placeCustomerOrder = function(customerId, order) {
			return $http({
					method: 'POST',
					url: '/placeCustomerOrder',
					data: {customerId: customerId, order: order}
				})	
		}

		this.buyItem = function(customerId, orderId){
			return $http.get('/buyItem/' + customerId + '/' + orderId);
		}
	});
}());