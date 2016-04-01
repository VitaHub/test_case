var app = angular.module("CustomerApp", ["ngResource","ui.bootstrap"]);

app.controller('MainController', ['$scope','$http', 'authentication', function($scope, $http, authentication) {

	authentication.then(function(data) {
		$scope.token = data;
	});
/*
	authentication.serviceObject("java.script@test.com","strong_password").then
		function(loginResult) {
			$scope.token = loginResult;
		},function(err) {
			$scope.token = err;
		})*/


	$scope.searchType = "ID";
	
	$scope.searchCustomer = function(scope,element,attrs) {
		var searchN = $scope.searchType + '.json';
		return $http.get('JSON/' + searchN)
		.then(function(data) {
			$scope.customers = data.data;
			$scope.totalItems = $scope.customers.length;
		})
		.catch(function(err) {
			return err;
		});
	};

	$scope.query = {};
    $scope.queryBy = 'Name';
	/*Pagination*/
	$scope.viewby = 5;
	$scope.itemsPerPage = $scope.viewby;
	$scope.currentPage = 1;
	$scope.setItemsPerPage = function(num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1; //reset to first paghe
    };
    $scope.maxSize = 5;
  	
}]);

/*app.factory('authentication', ['$http', function($http) {
	return $http.get('JSON/auth.json')
		.then(function(data) {
			return data;
		})
		.catch(function(err) {
			return err;
		});
}]);*/


/*app.factory('authentication', ['$http', function($http) {

	return $http({
		method: 'post',
		url: 'https://wc22.axonsoftware.biz/rest/auth/login', 
		data: { 
        email:"java.script@test.com",
 		password:"strong_password" }
      })
		.then(function(data) {
			return data;
		})
		.catch(function(err) {
			return err;
		});
}]);*/

app.factory('authentication', function($http) {

	/*var LoginResource = $http.post("https://wc22.axonsoftware.biz/rest/auth/login");
    var serviceObject = function (email, password) {
        return LoginResource.save({}, {email: email, password: password}).$promise; //this promise will be fulfilled when the response is retrieved for this call
    };
    return serviceObject;*/


	return $http(
		method: 'POST',
		url: 'https://wc22.axonsoftware.biz/rest/auth/login',
		body: '{\r\n "email":"java.script@test.com",\r\n "password":"strong_password"\r\n}')
		.then(function(data) {
			return data;
		})
		.catch(function(err) {
			return err;
		});
});