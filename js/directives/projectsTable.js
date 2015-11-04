app.directive('projectsTable', function () {
    return {
        restrict: 'E',
        scope: {
            listing: '='
        },
        templateUrl: 'js/directives/projectsTable.html'
    };
});