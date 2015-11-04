app.directive('financeDogovorStructureTable', function () {
    return {
        restrict: 'E',
        scope: {
            listing: '='
        },
        templateUrl: 'js/directives/financeDogovorStructureTable.html'
    };
});