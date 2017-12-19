movieVerdictApp.controller("movieVerdictController", function ($scope, movieVerdictFactory, $location,$http) {


	/* Commented due to Cross domain
	$http.get('../../data/movies.json').success(function(data) {
		$scope.movies = data;
	});*/
	$scope.movies = [
    { "$id": "1", "title":"Gone Girl","image":"https://images-na.ssl-images-amazon.com/images/I/51Srn9qAWFL._SX355_BO1,204,203,200_.jpg", "rating": "3", "releaseDate": "2014-02-22"},
    {"$id": "2", "title":"The Good Life","image":"https://images-na.ssl-images-amazon.com/images/I/51qcNAv2o6L._SY346_.jpg", "rating": "0", "releaseDate": ""},
    {"$id": "3", "title":"The Hero of Color City","image":"https://images-na.ssl-images-amazon.com/images/I/41Xkxc4Kn5L.jpg", "rating": "0", "releaseDate": "2014-11-23"},
    {"$id": "4", "title":"Guardians of the Galaxy","image":"https://images-na.ssl-images-amazon.com/images/I/51Eh8qOSJlL.jpg", "rating": "5", "releaseDate": "2014-07-01"},
    {"$id": "5", "title":"The Drop","image":"https://images-na.ssl-images-amazon.com/images/I/51aCR3KlifL._SX389_BO1,204,203,200_.jpg", "rating": "0", "releaseDate": "2014-12-01"},
    {"$id": "6", "title":"If I Stay","image":"https://images-na.ssl-images-amazon.com/images/I/61v31u7-gSL.jpg", "rating": "0", "releaseDate": "2015-01-01"}
];
	
	$scope.showMovie = true;
	$scope.rateReadable = false;
	$scope.ratingData = [0, 0, 0, 0, 0];
	$scope.sortorder=true;
	$scope.countRating = function(){
		$scope.ratingData = [0, 0, 0, 0, 0];
		angular.forEach($scope.movies,function(value,index){
               var loopRating = 0;
			   angular.forEach($scope.ratingData,function(val,i){
			   loopRating++;// = i+1;
			 	if(loopRating == value.rating){
					$scope.ratingData[i]++;
				}
				})
            })
	}
	$scope.countRating();

   function sortByProperty(property,ascendOrder) {
		  return function (a, b) {
				 var sortStatus = 0,
				 aProp = a[property].toLowerCase(),
				 bProp = b[property].toLowerCase();

				 if (aProp < bProp) {
					   sortStatus=(ascendOrder ? 1 : -1);
				 } else if (aProp > bProp) {
					   sortStatus=(ascendOrder ? -1 : 1);
				 }
				 return sortStatus;
		};
   }
       
   $scope.sortByName = function(){
		  $scope.movies.sort(sortByProperty('title',$scope.sortorder));
		  $scope.sortorder=!$scope.sortorder;
   }
   
   $scope.sortByDate = function(){
		  $scope.movies.sort(sortByProperty('releaseDate',$scope.sortorder));
		  $scope.sortorder=!$scope.sortorder;
	}

    $scope.rateFunction = function(rating, id) {
      $scope.countRating();
	  angular.forEach($scope.movies,function(value,index){
		  if(value.$id == id)
		  {
			  $scope.movies[index].rating=rating.toString();
		  }
	  });
    };  

	$scope.refreshGraph = function() {
    	$scope.countRating();
    	$scope.hichart.series[0].update({data: $scope.ratingData})
    	$scope.hichart.redraw();
    };
	
	$scope.hichart = Highcharts.chart('graphcontainer', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Movie Verdict'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['Rating 1', 'Rating 2', 'Rating 3', 'Rating 4', 'Rating 5'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number Of Movies',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Number of Movie',
        data: $scope.ratingData
    }]
});

});


/* Star Rating Directive */
  movieVerdictApp.directive('starRating', starRating);
  function starRating() {
   		return {
			restrict : 'A',
			template : '<ul class="rating">'
					 + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
					 + '\u2605'
					 + '</li>'
					 + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&',
				readable: "=?"
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled : i < scope.ratingValue
						});
					}
				};
				
				scope.toggle = function(index) {
					if (scope.readable == undefined || scope.readable == false){
						scope.ratingValue = index + 1;
						scope.onRatingSelected({
							rating : index + 1
						});
					}	
				};
				
				scope.$watch('ratingValue',
					function(oldVal, newVal) {
						if (newVal) {
							updateStars();
						}
					}
				);
			}
		};
  }

