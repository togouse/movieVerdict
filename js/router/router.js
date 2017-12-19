movieVerdictApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'tmpl/home.html',
            controller: 'movieVerdictController'
        }).when('/report', {
            templateUrl: 'tmpl/report.html',
            controller: 'movieVerdictController'
        }).otherwise({
            redirectTo: '/'
        });
});