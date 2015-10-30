app.directive('sideBar', function () {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'js/directives/sideBar.html',
        link: function (scope, element, attributes) {
            scope.sideBar = {};
            scope.sideBar.sections = [];
            scope.sideBar.sections[0] = [
                { name: 'Договоры', href: "#/Projects" },
                { name: 'Этапы', href: "#" },
                { name: 'Документы', href: "#" },
                { name: 'Контрагенты', href: "#" }
            ];
            scope.sideBar.sections[1] = [
                { name: 'События', href: "#" },
                { name: 'Отчеты', href: "#" },
                { name: 'Настройки', href: "#" },
                { name: 'Выход', href: "#/" }
            ];

        }
    };
});