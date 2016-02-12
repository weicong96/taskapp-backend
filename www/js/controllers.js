angular.module('starter.controllers', ["angular-meteor"])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
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
  /*function(address){
    var defer = $q.defer();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address : address},{
      componentRestrictions: {
        country : "SG"
      }
    }, function(result, status){
      if(status == google.maps.GeocoderStatus.OK){
        var properLatLng = [];
        console.log(result);
        result.forEach(function(resultEntry){
          var coordinate = {
            lat : resultEntry['geometry']['location']['lat'](),
            lng : resultEntry['geometry']['location']['lng'](),
            address : resultEntry["formatted_address"]
          };
          properLatLng.push(coordinate);
        });
        defer.resolve(properLatLng);
      }else{
        console.log(status);
        defer.reject(status);
      }
    });
    return defer.promise;
  }*/
});
