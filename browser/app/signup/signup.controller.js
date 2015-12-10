app.controller('signUpCtrl', function($scope, AuthFactory){
	$scope.signUpInfo = {}
	$scope.submit= function(signUpInfo){
		AuthFactory.signUp(signUpInfo)
	}
})