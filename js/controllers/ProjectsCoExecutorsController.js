app.controller('ProjectsCoExecutorsController', ['$scope', '$http', '$filter', '$projects', function ($scope, $http, $filter, $projects) {
    $scope.projectsWrapper = {};
    $scope.query = {
        filter: '',
        order: 'name',
        limit: 10,
        page: 1
    };
    $scope.total = 0;
    $scope.headers = [
{ field: "DOGOVOR_EXECUTOR_NAME", name: "Исполнитель", width: 6, type: 'string' },
{ field: "DOGOVOR_NUMBER_AND_DATE", name: "Номер и дата договора", width: 6, type: 'string' },
{ field: "DOGOVOR_NAME", name: "Название договора", width: 9, type: 'string' },
{ field: "DOGOVOR_SUM", name: "Цена (руб.)", width: 6, type: 'number' },
{ field: "DOGOVOR_STATUS", name: "Статус", width: 6, type: 'string' },
{ field: "DOGOVOR_PERIOD_START", name: "Начало", width: 6, type: 'date' },
{ field: "DOGOVOR_PERIOD_END", name: "Окончание", width: 6, type: 'date' }];

    $scope.isContentShown = false;
    $scope.deleteRowCallback = function (rows) {
        $mdToast.show(
            $mdToast.simple()
                .content('Deleted row id(s): ' + rows)
                .hideDelay(3000)
        );
    };

    $scope.deleteSelected = function ($event) {
        $scope.selected.forEach(function (item) {
            $scope.projects.splice($scope.projects.indexOf(item), 1);
        });
        $scope.selected = [];
    };
    
    $scope.setDisplayedDogovorsType('ProjectsCoExecutors');
    $scope.onOrderChange = function (field) {
        var ord = field.split('')[0] == '-' ? 'desc' : 'asc';
        if (field.split('')[0] == '-') field = field.slice(1);
        $scope.order = ord;
        $scope.sort_order = field;
        getProjects($projects.proto, $scope.projectsWrapper, $scope.dogovorType);
    }
    $scope.projectsWrapper = $scope;
    getProjects($projects.proto, $scope.projectsWrapper, $scope.dogovorType);
    $scope.showGridToolbar();
}]);