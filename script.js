var app = angular.module("CustomerApp", ["ui.bootstrap"]);

app.controller('MainController', ['$scope','$http', 'authentication', function($scope, $http, authentication) {

	authentication.then(function(data) {
		$scope.token = data.data.token;
	});

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

app.factory('authentication', ['$http', function($http) {
	return $http.get('JSON/auth.json')
		.then(function(data) {
			return data;
		})
		.catch(function(err) {
			return err;
		});
}]);

/*
app.factory('authentication', ['$http', function($http) {

	return $http.post('https://wc22.axonsoftware.biz/rest/auth/login', {
        "email":"test@test.com",
 		"password":"strong_password"
      })
		.then(function(data) {
			return data;
		})
		.catch(function(err) {
			return err;
		});
}]);
*/