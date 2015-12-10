app.factory('AuthFactory', function($http){
	var Auth = {

	}
	Auth.login = function(loginInfo){
		loginInfo.email = loginInfo.email.replace('@','%40').replace('.','%2E')
		return $http({
			url: '/api/users',
			method: 'GET',
			params: loginInfo
		})
		.then(function(response){
			return response.data
		}).then(null, console.err)
	}

	Auth.signUp = function(loginInfo){
		return $http.post('/api/users',loginInfo)
			.then(function(response){
			return response.data
		}).then(null, console.err)

	}

	return Auth;
})