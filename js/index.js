var app = angular.module('testApp', ['ngResource', 'ngRoute', 'ngMaterial',
    'ngAnimate', 'md.data.table', 'ngMdIcons', 'ui.bootstrap', 'dialogs.main',
    'pascalprecht.translate', 'flow']);
    
    app.config(function ($routeProvider) {
        $routeProvider
            .when('/ProjectsOrderers',
                  {
                      controller: 'ProjectsGridController',
                      templateUrl: 'pages/projects_listing.html'
                  })
            .when('/ProjectsCoExecutors',
                  {
                      controller: 'ProjectsGridController',
                      templateUrl: 'pages/projects_listing.html'
                  })

            .when('/ProjectsCoExecutors/:id/card',
                  {
                      controller: 'ProjectController',
                      templateUrl: 'pages/contract_card.html'
                  })
            .when('/ProjectsOrderers/:id/card',
                  {
                      controller: 'ProjectController',
                      templateUrl: 'pages/contract_card.html'
                  })

            .when('/ProjectsCoExecutors/:id/documents',
                  {
                      controller: 'ProjectController',
                      templateUrl: 'pages/contract_documents.html'
                  })
            .when('/ProjectsOrderers/:id/documents',
                  {
                      controller: 'ProjectController',
                      templateUrl: 'pages/contract_documents.html'
                  })

            .when('/ProjectsCoExecutors/:id/finance',
                  {
                      controller: 'ProjectController',
                      templateUrl: 'pages/contract_finance.html'
                  })
            .when('/ProjectsOrderers/:id/finance',
                  {
                      controller: 'ProjectController',
                      templateUrl: 'pages/contract_finance.html'
                  })
             .otherwise({ redirectTo: '/ProjectsOrderers' });
    });



