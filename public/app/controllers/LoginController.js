(function(){
	
	angular.module("myApp").controller("LoginController", function($scope, $log, $http, $location, Flash){

		$scope.formModel = {};

		$scope.signUp = function (){
			$http({
			method: 'POST',
			url: '/signUp',
			data: $scope.formModel
			}).then(function successCallback(response) {
				$location.path('/login');
			}, function errorCallback(error) {
				var message = '<strong> SignUp Failed !!!!! email already exist!</strong>';
    			Flash.create('danger', message, 2000, {class: 'custom-class', id: 'custom-id'}, true);
			});
	    };

	    $scope.login = function () {
	    	$http({
			method: 'POST',
			url: '/login',
			data: { email: $scope.formModel.email, password: $scope.formModel.password }
			}).then(function successCallback(response) {
				$location.path('/placeOrders/'+ response.data);
			}, function errorCallback(error) {
				var message = '<strong> Login Failed !</strong>';
    			Flash.create('danger', message, 2000, {class: 'custom-class', id: 'custom-id'}, true);
			});
	    }
	});
}());