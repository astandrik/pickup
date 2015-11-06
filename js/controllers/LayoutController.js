app.controller('LayoutController', ['$scope','dialogs', function ($scope,dialogs) {
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
        switch ($scope.dogovorType) {
            case 'ProjectsOrderers':
                location.href = '#/ProjectsOrderers';
                break;
            case 'ProjectsCoExecutors':
                location.href = '#/ProjectsCoExecutors';
                break;
            default:
                switch ($scope.currentProject.type) {
                    case 'orderers':
                        location.href = '#/ProjectsOrderers';
                        break;
                    case 'coExecutors':
                        location.href = '#/ProjectsCoExecutors';
                        break;
                    default:
                        location.href = '#/ProjectsOrderers';
                        break;
                }
        }
    }

    $scope.showGridToolbar = function () {
        $scope.isGridShown = true;
        $scope.isProjectShown = false;
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

    $scope.goToCard = function (id, type) {
        if (id == undefined || type == undefined) {
            location.href = "#/ContractCard?id=" + $scope.currentProject.id + "&type=" + $scope.currentProject.type;
        } else {
            location.href = "#/ContractCard?id=" + id + "&type=" + type;
        }
    }

    $scope.goToFinance = function (id, type) {
        if (window.currentProject && window.currentProject) {
            if (!window.currentProject.contract_start_date  || !window.currentProject.contract_end_date) {
                alert('Введите даты начала и окончания!');
                return;
            }
        }
        if (id == undefined || type == undefined) {
            location.href = "#/ContractFinance?id=" + $scope.currentProject.id + "&type=" + $scope.currentProject.type;
        } else {
            location.href = "#/ContractFinance?id=" + id + "&type=" + type;
        }
    }


    $scope.goToDocuments = function (id, type) {
        if (id == undefined || type == undefined) {
            location.href = "#/ContractDocuments?id=" + $scope.currentProject.id + "&type=" + $scope.currentProject.type;
        } else {
            location.href = "#/ContractDocuments?id=" + id + "&type=" + type;
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