$app = angular.module('app', ['ui.router']);

$app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('list', {
		url: "/",
		controller:listController,
		templateUrl:'list.html'
	})
	.state('edit', {
		url:"/edit/:name",
		controller:editController,
		templateUrl:'form.html'
	})
	.state('new', {
		url:"/new",
		controller:newController,
		templateUrl:'form.html'
	});
});

$app.run(function($rootScope){
	$rootScope.fruits = ["banana","apple","orange"];
});

function listController($scope){

}

function editController($scope, $location, $stateParams){
	$scope.title = "Edit fruit";
	$scope.fruit = $stateParams.name;

	$scope.fruitIndex = $scope.fruits.indexOf($scope.fruit);

	$scope.save = function() {
		$scope.fruits[$scope.fruitIndex] = $scope.fruit;
		$location.path('/');
	};
}

function newController($scope,$location) {
	$scope.title = "New fruit";
	$scope.fruit = "";

	$scope.save = function() {
		$scope.fruits.push($scope.fruit);
		$location.path('/');
	};
}