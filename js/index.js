var demoApp = angular.module('testApp',['ngRoute','ngMaterial','ngAnimate','mdDataTable']);
var controllers = {};

$.ajaxSetup({
    async: false
});
controllers.testController = function($scope) {
    $scope.person = {name: 'Иван', surname: 'Иваныч'};
}

controllers.startPageController = function($scope) {

};

controllers.addNewController = function($scope) {
}

controllers.DemoCtrl = function() {
     this.topDirections = ['left', 'up'];
      this.bottomDirections = ['down', 'right'];
      this.isOpen = false;
      this.availableModes = ['md-fling', 'md-scale'];
      this.selectedMode = 'md-fling';
      this.availableDirections = ['up', 'down', 'left', 'right'];
      this.selectedDirection = 'up';
}

controllers.projectsController = function($scope,$mdToast) {
    $scope.headers = [];
    $scope.rows = [];
    $scope.deleteRowCallback = function(rows){
            $mdToast.show(
                $mdToast.simple()
                    .content('Deleted row id(s): '+rows)
                    .hideDelay(3000)
            );
        };
    $.getJSON('testData/projects.json', function(json) {
        for(var i = 0; i < Object.keys(json[0]).length; i++) {
           $scope.headers.push(Object.keys(json[0])[i]);
        }
        for(var i = 0; i < json.length; i++) {
            var obj = [];
            for(var j = 0; j < Object.keys(json[i]).length; j++) {
                obj.push({key:Object.keys(json[i])[j], value: json[i][Object.keys(json[i])[j]]});
            }
            $scope.rows.push(obj);
        }
    })
      
 }

demoApp.config(function($routeProvider) {
    $routeProvider
        .when('/', 
              {
                templateUrl: 'pages/login.html'
              })
        .when('/Main', 
              { 
                templateUrl: 'pages/startpage.html'
              })
        .when('/Projects', 
              { 
                templateUrl: 'pages/projects.html'
              })
        .when('/AddProject', 
              { 
                templateUrl: 'pages/newproject.html'
              })    ;
});

demoApp.controller(controllers);


$(function() {
    $(document).click(function() {
        var sidebar = $('#sidebar');
        if(sidebar.hasClass('open')) {
            sidebar.removeClass('open');
        }
    });
   $('button[aria-label="Settings"]').on('click', function() {
        var sidebar = $('#sidebar');
        setTimeout(function() {
            sidebar.toggleClass('open');
        },200);
    });
});