// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngMap'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
    .state('app.addTask', {
      url: '/task',
      params : {
        lat : "-1",
        lng : "-1",
        address : ""
      },
      views: {
        'menuContent': {
          templateUrl: 'htmljs/add-task/add-task.html',
          controller: 'AddTaskCtrl',
          controllerAs: "addTask"
        }
      }
    })
  .state('app.addLocation', {
    url: '/location',
    views: {
      'menuContent': {
        templateUrl: 'htmljs/choose-location/choose-location.html',
        controller: 'AddLocationCtrl'
      }
    }
  })
  .state('app.chooseLocation', {
    url: '/chooseLocation/:address',
    views: {
      'menuContent': {
        templateUrl: 'htmljs/choose-location/choose-location.html',
        controller: 'ChooseLocationCtrl',
        controllerAs : "chooseLocation"
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/task');

  $ionicConfigProvider.scrolling.jsScrolling(true);
});
