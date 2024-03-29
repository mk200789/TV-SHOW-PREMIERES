app.controller("mainController", function($scope, $http){

    $scope.apiKey = "6a1a55e9adb9540b0eda86f232ead029";
    //storing episodes and their associated data
    $scope.results =[];
    $scope.filterText = null;
    $scope.availableGenres =[];
    $scope.genreFilter = null;
    $scope.orderFields = ["Air Date" , "Rating"];
    $scope.orderDirections = ["Descending" , "Ascending"];
    $scope.orderField = "Air Date";
    $scope.orderReverse = false;
    $scope.setGenreFilter = function(genre){
        $scope.genreFilter = genre;
    };
    $scope.customOrder = function(tvshow){
        switch($scope.orderField){
            case "Air Date":
                return tvshow.episode.first_aired;
                break;
            case "Rating":
                return tvshow.episode.ratings.percentage;
                break;
        }
    };
    $scope.init = function() {
    	//a start date for the api
    	var today = new Date();

    	var apiDate = today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + "" + ("0" + today.getDate()).slice(-2);
    	$http.jsonp('http://api.trakt.tv/calendar/premieres.json/' + $scope.apiKey + '/' + apiDate + '/' + 10 + '/?callback=JSON_CALLBACK').success(function(data){
    		//console.log(data);

        		//For each day, get all episodes
        		angular.forEach(data, function(value, index){
        			var date = value.date;

        			//For each episode, add to the results array
        			angular.forEach(value.episodes, function(tvshow, index){
        				tvshow.date = date;
        				$scope.results.push(tvshow);

                        //Loop through each genre for this episode
                        angular.forEach(tvshow.show.genres, function(genre, index){
                            //only add to availableGenres if it does not exist
                            var exists = false;
                            angular.forEach($scope.availableGenres, function(avGenre, index){
                                if(avGenre === genre){
                                    exists = true;
                                }
                            });
                            if(exists === false){
                                $scope.availableGenres.push(genre);
                            }
                        });
        			});
        			
        		});
    	}).error(function(error){

    	});
    };

});

app.filter('isGenre', function(){
    return function(input, genre){
        console.log(genre);
        if(typeof genre === 'undefined' || genre == null){
            return input
        }
        else{
            var out=[];
            for(var a = 0; a< input.length; a++){
                for(var b = 0; b <input[a].show.genres.length; b++){
                    if(input[a].show.genres[b] == genre){
                        out.push(input[a]);
                    }
                }
            }
            return out;
        }
    };
})

