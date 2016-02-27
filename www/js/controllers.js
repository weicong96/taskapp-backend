angular.module('starter.controllers', ["angular-meteor"])

.controller('AppCtrl', function($scope,$rootScope, $ionicModal, $timeout) {
  $rootScope.$on("$stateChangeSuccess",function(event, toState){
    $rootScope.$broadcast("viewEnter-"+toState['name']);
  });
})
.factory("Config", function(){
  return {
    //google_api_key : "AIzaSyBR9SaiQWuSE5fP7QYey15TzHHVBOsi_uc"
  };
})
.factory('Geocode', function($q,$timeout, Config){
  return function(address){
    var defer = $q.defer();
    Meteor.call('geocode', address, function(error, result){
      defer.resolve(result);
    });
    return defer.promise;
  }
})
.factory("Store", function($state){
  var store = {}

  return {
    setData : function(data){
      var key = $state['current']['name'];
      store[key]=data;
    },
    getData : function(key){
      return store[key];
    }
  };
})
