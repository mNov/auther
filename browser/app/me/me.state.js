app.config(function($stateProvider){
	$stateProvider.state('me', {
	url: '/me',
	templateUrl: '/browser/app/user/detail/user.detail.html',
	controller: 'MeCtrl',
	resolve:{
		user: function (AuthFactory, $http, User){
			return $http.get('/api/sessions/me').then(function(response){
				console.log(response)
				return new User(response.data).fetch();
			})
			.then(null,console.err);
		}
	}
	})
})