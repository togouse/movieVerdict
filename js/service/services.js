movieVerdictApp = angular.module('movieVerdictApp', ['ngResource', 'ngRoute']);
movieVerdictApp.factory('movieVerdictFactory', function ($resource) {
    return $resource('/movies');
});
