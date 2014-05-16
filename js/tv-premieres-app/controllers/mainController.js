app.controller("mainController", function($scope, $http){

    $scope.apiKey = "6a1a55e9adb9540b0eda86f232ead029";
    //storing episodes and their associated data
    $scope.results =[];
    $scope.filterText = null;
    $scope.init = function() {
    	//a start date for the api
    	var today = new Date();

    	var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);
    	$http.jsonp('http://api.trakt.tv/calendar/premieres.json/' + $scope.apiKey + '/' + apiDate + '/' + 30 + '/?callback=JSON_CALLBACK').success(function(data){
    		//console.log(data);

    		//For each day, get all episodes
    		angular.forEach(data, function(value, index){
    			var date = value.date;

    			//For each episode, add to the results array
    			angular.forEach(value.episodes, function(tvshow, index){
    				tvshow.date = date;
    				$scope.results.push(tvshow);
    			});
    			
    		});
    	}).error(function(error){

    	});
    };

});

