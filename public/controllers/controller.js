var homeEMR = angular.module('homeEMR', []);
homeEMR.controller('AppController', ['$scope', '$http', function($scope, $http) {
	console.log("Hello from controller.js");

	var refresh = function() {
		$http.get('/records').then(function(response) {
			$scope.records = response.data;
			$scope.record = null;
		});	
	}
	
	refresh();


	$scope.submitRecord = function() {
		console.log($scope.record);
		$http.post('/records', $scope.record).then(function(response){
			console.log(response.data);
			refresh();
		});
	}

	$scope.removeRecord = function(id) {
		console.log(id);
		$http.delete('/records/' + id).then(function(response){
			console.log(response.data);
			refresh();
		})
	}

	$scope.editRecord = function(id) {
		console.log(id);
		$http.get('/records/' + id).then(function(response){
			$scope.record = response.data;
		})
	}

	$scope.updateRecord = function() {

		$http.put('/records/' + $scope.record._id, $scope.record).then(function(response){
			refresh();
		})
	}
}])