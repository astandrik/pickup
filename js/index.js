var app = angular.module('testApp', ['ngResource','ngRoute', 'ngMaterial', 'ngAnimate', 'md.data.table','ngMdIcons']);
    
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/',
                  {
                      templateUrl: 'pages/login.html'
                  })
            .when('/Main',
                  {
                      templateUrl: 'pages/startpage.html'
                  })
            .when('/ProjectsOrderers',
                  {
                      templateUrl: 'pages/projects_orderers.html'
                  })
            .when('/ProjectsCoExecutors',
                  {
                      templateUrl: 'pages/projects_coexecuters.html'
                  })
            .when('/AddProject',
                  {
                      templateUrl: 'pages/newproject.html'
                  })
             .when('/ContractCard',
                  {
                      templateUrl: 'pages/contract_card.html'
                  });
    });



