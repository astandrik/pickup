﻿app.controller('ProjectsCoExecutorsController', ['$scope', '$http', '$filter', '$projects', function ($scope, $http, $filter, $projects) {
    $scope.query = {
        filter: '',
        order: 'name',
        limit: 10,
        page: 1
    };
    $scope.total = 0;
    $scope.headers = [];
    $scope.projects = [];
    $scope.headers = [
{ field: "DOGOVOR_EXECUTOR_NAME", name: "Исполнитель", width: 6 },
{ field: "DOGOVOR_NUMBER_AND_DATE", name: "Номер и дата договора", width: 6 },
{ field: "DOGOVOR_NAME", name: "Название договора", width: 9 },
{ field: "DOGOVOR_SUM", name: "Цена (руб.)", width: 6 },
{ field: "DOGOVOR_STATUS", name: "Статус", width: 6 },
{ field: "DOGOVOR_DATE", name: "Начало", width: 6 },
{ field: "DOGOVOR_DATE", name: "Окончание", width: 6 }];

    $scope.isContentShown = false;
    $scope.deleteRowCallback = function (rows) {
        $mdToast.show(
            $mdToast.simple()
                .content('Deleted row id(s): ' + rows)
                .hideDelay(3000)
        );
    };

    $scope.showDeleteWindow = function ($event) {
        $mdDialog.show({
            targetEvent: $event,
            template:
              '<md-dialog>' +
              '  <md-content>Вы уверены, что хотите удалить выбранные записи?</md-content>' +
              '  <div class="md-actions">' +
              '    <md-button ng-click="deleteSelected()">' +
              '     Да' +
              '    </md-button>' +
              '    <md-button>' +
              '     Нет' +
              '    </md-button>' +
              '  </div>' +
              '</md-dialog>',
            controller: 'GreetingController',
            onComplete: afterShowAnimation,
        });
    };

    $scope.deleteSelected = function ($event) {
        $scope.selected.forEach(function (item) {
            $scope.projects.splice($scope.projects.indexOf(item), 1);
        });
        $scope.selected = [];
    };
    $scope.displaySelection('ProjectsCoExecutors');

    $scope.showGridToolbar();

    getProjects($projects.proto, $scope, 'coExecutors');
}]);