app.controller('LoginCtrl', function($scope, AuthFactory){
	$scope.loginInfo = {}
	$scope.submit = function(loginInfo){
		AuthFactory.login(loginInfo)
		.then(function(user){
			console.log(user);
		})
		.then(null, console.err);
	}
});