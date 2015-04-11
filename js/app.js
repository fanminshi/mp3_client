// var demoApp = angular.module('demoApp', ['demoControllers']);

var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices']);

demoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/firstview', {
    templateUrl: 'partials/firstview.html',
    controller: 'FirstController'
  }).
  when('/secondview', {
    templateUrl: 'partials/secondview.html',
    controller: 'SecondController'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/llamalist', {
    templateUrl: 'partials/llamalist.html',
    controller: 'LlamaListController'
  }).
  when('/userlist', {
    templateUrl: 'partials/userlist.html',
    controller: 'UserListController'
  }).
  when('/userlist/:id', {
    templateUrl: 'partials/userdetails.html',
    controller: 'UserDetailsController'
  }).
  when('/adduser', {
    templateUrl: 'partials/adduser.html',
    controller: 'UserListController'
  }).
  when('/addtask', {
    templateUrl: 'partials/addtask.html',
    controller: 'addTaskController'
  }).
  when('/tasklist', {
    templateUrl: 'partials/tasklist.html',
    controller: 'TaskListController'
  }).
  when('/tasklist/:id', {
    templateUrl: 'partials/taskdetails.html',
    controller: 'TaskDetailsController'
  }).
  when('/edittask/:id', {
    templateUrl: 'partials/edittask.html',
    controller: 'editTaskController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);