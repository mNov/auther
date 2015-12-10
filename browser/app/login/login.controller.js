app.controller('LoginCtrl', function($scope, AuthFactory, $location){
	$scope.loginInfo = {}
	$scope.submit = function(loginInfo){
		AuthFactory.login(loginInfo)
		.then(function(user){
			AuthFactory.userId = user._id;
			$location.path('/me');
		})
		.then(null, console.err);
	}
});