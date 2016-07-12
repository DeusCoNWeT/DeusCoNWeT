/*global angular*/
angular.module("picbit")
.controller("UserProfileController", ["$scope", "$rootScope","$http","$backend", function ($scope, $rootScope, $http, $backend) {
	"use strict";

	$scope.selectSection = function(e){
		var $target = $(e.currentTarget);
		var sectionTarget = $target.attr('data-target');

		$('.information').children().removeClass('active');
		$('.tabs').children().removeClass('active');

		$target.parent().addClass('active');
		$(sectionTarget).addClass('active');
	};
	$scope.changePicture = function(event){
		if (event.files && event.files[0].type.indexOf('image') !== -1){
			var reader = new FileReader();
			reader.onload = function (e) {
				$('#userPicture')
				.attr('src', e.target.result);
			};
			reader.readAsDataURL(event.files[0]);
		}
	};

	$scope.submitForm = function(){
		var values = {};
		var $inputs = $('#userInformation input');

		for (var i =0;i<$inputs.length;i++){
			var $target = $($inputs[i]);
			values[$target.attr('data-field')] = $target.val();
		}
		console.log('TODO send to server: ', values);
	};
	$scope.existToken = function(socialNetwork){
		return $scope.user && $scope.user.tokens[socialNetwork];
	};

	(function(){
		//falta registralo
		function loginCallback(e){
			//falta registralo
			$scope.$apply(function(){
				var socialNetwork = e.detail.redSocial;
				var token = e.detail.token;
				var registerTokenError = function(){
					console.error('Algo fue mal al intentar guardar los tokens de ' + socialNetwork);
				};

				$rootScope.user.tokens[socialNetwork] = token;
				$scope.setToken(socialNetwork, token);
				$('#login-modal').modal('toggle');
				console.log('TODO guardar los datos en el servidor');
				// switch(socialNetwork) {
				// 	case 'googleplus':
				// 	var uri = 'https://www.googleapis.com/plus/v1/people/me?access_token=' + token;
				// 	$http.get(uri).success(function (responseData) {
				// 		$backend.addTokens(socialNetwork, responseData.id, token, $scope.user.user_id).error(registerTokenError);
				// 	});
				// 	break;
				// 	case 'twitter':
				// 	uri = $backend.endpoint + '/api/oauth/twitter/authorization/' + e.detail.oauth_verifier;
				// 	$http.get(uri).success(function (responseData) {
				// 		e.detail.userId = responseData.token_id;
				// 		$backend.addTokens(socialNetwork, responseData.token_id, token, $scope.user.user_id).error(registerTokenError);
				// 	}).error(function() {
				// 		console.log('Problemas al intentar obtener el token_id de un usuario' );
				// 	});
				// 	break;
				// 	default:
				// 	$backend.addTokens(socialNetwork, e.datail.userId, token, $scope.user.user_id).error(registerTokenError);
				// 	break;
				// }

			});
		}

		$('#socialNetwork google-login')[0].addEventListener('google-logged', loginCallback);
		$('#socialNetwork github-login')[0].addEventListener('github-logged', loginCallback);
		$('#socialNetwork instagram-login')[0].addEventListener('instagram-logged', loginCallback);
		$('#socialNetwork twitter-login')[0].addEventListener('twitter-logged', loginCallback);
		$('#socialNetwork login-facebook')[0].addEventListener('facebook-logged', loginCallback);
	})();
}]);
