app.controller('NewProjectController', ['$scope', '$http', '$filter', '$projects', function ($scope, $http, $filter, $projects) {
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
{ field: "DOGOVOR_CODE", name: "Шифр", width: 9  },
{ field: "DOGOVOR_SUM", name: "Цена(руб.)", width: 6 },
{ field: "DOGOVOR_ORDER_NAME", name: "Заказчик", width: 6 },
{ field: "DOGOVOR_STATUS", name: "Статус", width: 6 },
{ field: "DOGOVOR_NUMBER", name: "Номер и дата договора", width: 6 },
{ field: "DOGOVOR_PERIOD_START", name: "Начало", width: 6 },
{ field: "DOGOVOR_PERIOD_END", name: "Начало", width: 6 }];

    $scope.isContentShown = false;
    $scope.deleteRowCallback = function (rows) {
        $mdToast.show(
            $mdToast.simple()
                .content('Deleted row id(s): ' + rows)
                .hideDelay(3000)
        );
    };

    function parseNumber(num) {
        num = num.toString().split('').reverse();
        for (var i = 2; i < num.length; i+=3) {
            num[i] = " " + num[i];
        }
        return num.reverse().join('');
    }

    function parseDate(date) {
        if (date.toString().split('.').length == 3) return date;
        var dateParams = date.split(' ')[0].split('/');
        if (dateParams[0] == 'null') return '';
        if (dateParams[0].length == 1) dateParams[0] = '0' + dateParams[0];
        return dateParams[0] + '.' + dateParams[1] + '.' + dateParams[2];
    }

    function getProjects(type) {
        $projects[type].success(function (json) {
            $scope.projects = [];
            json.forEach(function (item) {
                item['DOGOVOR_PERIOD_END'] = parseDate(item['DOGOVOR_PERIOD_END']);
                item['DOGOVOR_PERIOD_START'] = parseDate(item['DOGOVOR_PERIOD_START']);
                item['DOGOVOR_NUMBER'] = item['DOGOVOR_PERIOD_START'] == '' ?
                    item['DOGOVOR_NUMBER']
                    :
                    item['DOGOVOR_NUMBER'] + ' от ' + item['DOGOVOR_PERIOD_START'];
                item['DOGOVOR_SUM'] = parseNumber(item['DOGOVOR_SUM']);


                var obj = [];
                $scope.headers.forEach(function (elem) {                   
                    obj.push({ value: item[elem.field], name: elem.field, grow: elem.width });
                    if (elem.field == "DOGOVOR_CODE") obj.name = item[elem.field];
                });
                obj.show = "";
                $scope.projects.push(obj);
            });
        }).error(function () { debugger; }).then(function () { $scope.isContentShown = true; });
    }

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
    }
    getProjects('orderers');
}]);