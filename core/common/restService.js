(function() {
	function RestServiceProvider() {


		this.$get = [
				"$http",
				"$q",
				
				function RestService($http, $q) {

					
					var interface = this;
					interface.invoke = function(URLobj,
							 parameters, data) {
						var canceller = $q.defer();
						var urlString = URLobj.url;

						/*********Commented as api is not accesible as of now********/
//						if (parameters) {
//							for (var i = 0; i < parameters.length; i++) {
//								if (i == 0) {
//									urlString = urlString + "?"
//											+ parameters[i].name + "="
//											+ parameters[i].value;
//								} else {
//									urlString = urlString + "&"
//											+ parameters[i].name + "="
//											+ parameters[i].value;
//								}
//							}
//						}

//						var successFunc = function(response, status, headers,
//								config) {
//							if (angular.isFunction(successCallback))
//								successCallback(response, status, headers,
//										config);
//						};
//
//						var errorFunc = function(response, status, headers,
//								config) {
//							if (angular.isFunction(errorCallback))
//								errorCallback(response, status, headers, config);
//						};

                      
                        
						var httpURL = {
							method : URLobj.method,
							url : urlString,
							data : data,
							
							
						};


							
							 
                        return $http(httpURL); 

					};

					return interface;
				} ];
	}
	
	storyApp.provider("RestServiceProvider", RestServiceProvider)
			
			
})();