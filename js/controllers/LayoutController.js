app.controller('LayoutController', ['$scope', 'dialogs', '$route', function ($scope, dialogs, $route) {
    $scope.isSideBarOpen = false;
    $scope.isFinanceActive = false;
    $scope.isCardActive = false;
    $scope.isMaskShown = false;
    $scope.currentProject = {};
    $scope.isFinanceEditing = false;
    $scope.showMask = function () {
        $scope.isMaskShown = true;
    };
    
    $scope.hideMask = function () {
        $scope.isMaskShown = false;
    }; 
    $scope.openSideBar = function () {
        $scope.isSideBarOpen = true;
        $scope.showMask();
    };
    $scope.closeSideBar = function () {
        $scope.isSideBarOpen = false;
        $scope.hideMask();
    };
    $scope.setDisplayedDogovorsType = function (type) {
        $scope.dogovorType = type;
    }

    $scope.onProjectTypeChange = function () {
        var projectType = $scope.dogovorType || $scope.currentProject.type;
        location.href = '#/' + projectType;
    }

    $scope.showGridToolbar = function () {
        $scope.isGridShown = true;
        $scope.isProjectShown = false;
    }

    $scope.getProjectsType = function () {
        if (!$scope.dogovorType) {
            var pathDogovor = $route.current.$$route.originalPath.split('/')[1];
            $scope.dogovorType = pathDogovor;
        }
        return $scope.dogovorType;
    }

    $scope.showProjectToolbar = function () {
        $scope.isGridShown = false;
        $scope.isProjectShown = true;
    }


    $scope.setToolBarHeader = function (title) {
        $scope.toolBarHeader = title;
        $scope.projectName = title;
    }

    $scope.setCurrentProject = function(id, type) {
        $scope.currentProject.id = id;
        $scope.currentProject.type = type;
    }

    $scope.activateCardTab = function () {
        $scope.isCardActive = true;
        $scope.isFinanceActive = false;
        $scope.isDocumentsActive = false;
    }

    $scope.activateFinanceTab = function () {
        $scope.isCardActive = false;
        $scope.isFinanceActive = true;
        $scope.isDocumentsActive = false;
    }

    $scope.activateDocumentsTab = function () {
        $scope.isCardActive = false;
        $scope.isFinanceActive = false;
        $scope.isDocumentsActive = true;
    }

    $scope.navigateInProject = function (id, page) {
        if (page == 'ContractFinance') {
            if (!window.currentProject.contract_start_date || !window.currentProject.contract_end_date) {
                alert('Введите даты начала и окончания!');
                return;
            }
        }
        if (!id) {
            location.href = '#/' + $scope.dogovorType + '/' + $scope.currentProject.id + '/' + page;
        } else {
            location.href = '#/' + $scope.dogovorType + '/' + id + '/' + page;
        }
    }


    $scope.toggleFinanceEdit = function () {
        $scope.isFinanceEditing = !$scope.isFinanceEditing;
    }

    $scope.launchPopup = function (which) {
            switch (which) {
                case 'addDogovor':
                    var dlg = dialogs.create('js/dialogs/addProject.html', 'AddDogovorDialogController', {}, 'lg');
                    dlg.result.then(function (name) {
                        $scope.name = name;
                    }, function () {
                        if (angular.equals($scope.name, ''))
                            $scope.name = 'You did not enter in your name!';
                    });
                    break;
        }; // end launch
    }

}]);