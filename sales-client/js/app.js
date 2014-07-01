SERVER_URL = "http://localhost/sales-server";

$app = angular.module('app', ['ui.router']);

$app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('main', {
		url: "/",
		templateUrl:'view/main.html'
	})
	.state('clientes', {
		url:"/clientes",
		controller:clientesController,
		templateUrl:'view/clientes/main.html'
	})	
	.state('novoCliente', {
		url:"/clientes/new",
		controller:clientesController,
		templateUrl:'view/clientes/update.html'
	})
	.state('editarCliente', {
		url:"/clientes/:id",
		controller:clientesController,
		templateUrl:'view/clientes/update.html'
	});	

	//configura o RESPONSE interceptor, usado para exibir o ícone de acesso ao servidor
	// e a exibir uma mensagem de erro caso o servidor retorne algum erro
	$httpProvider.responseInterceptors.push(function($q, $rootScope) {
		return function(promise) {
			//Always disable loader
			$rootScope.hideLoader();
			return promise.then(function(response) {
				// do something on success
				return(response);
			}, function(response) {
				// do something on error
				$data = response.data;
				$error = $data.error;
				console.error($data);

				if ($error && $error.text) {
					alert("ERROR: " + $error.text);	
				} else {
					if (response.status == 404) {
						alert("Erro ao acessar servidor. Página não encontrada. Veja 39 rros para maiores detalhes");	
					} else {
						alert("ERROR! See log console");	
					}
				}
				return $q.reject(response);
			});
		};
	});
});

$app.run(function($rootScope){
	//Uma flag que define se o ícone de acesso ao servidor deve estar ativado
	$rootScope.showLoaderFlag = false;
	//Força que o ícone de acesso ao servidor seja ativado
	$rootScope.showLoader = function() {
		$rootScope.showLoaderFlag = true;
	};
	//Força que o ícone de acesso ao servidor seja desativado
	$rootScope.hideLoader = function() {
		$rootScope.showLoaderFlag = false;
	};
	//Método que retorna a URL completa de acesso ao servidor.
	// Evita usar concatenação no conteroller
	$rootScope.server = function(url) {
		return SERVER_URL + url;
	};
});

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
$app.filter('startFrom', function() {
	return function(input, start) {
		if (input === null) {
			return null;
		}
		start = +start; //parse to int
		return input.slice(start);
	};
});