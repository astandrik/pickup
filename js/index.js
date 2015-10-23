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

controllers.projectsController = function($scope) {
    $scope.headers = [];
    $scope.rows = [];
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
