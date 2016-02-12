angular.module('starter.controllers')
.controller("ChooseLocationCtrl" , function($scope, $state, $ionicModal, $ionicScrollDelegate, $ionicHistory, Geocode){
  $scope.markers = [];
  var modalScope = $scope.$new(true);
  modalScope['geocode'] = function(text){

    Geocode(text).then(function(results){
        modalScope.results = results;
    });
  }
  modalScope['selectResult'] = function(result){
    $scope.modal.hide();
    $scope.zoom = 18;
    $scope.markers = [new google.maps.Marker({
      position : {
        lat : result["lat"],
        lng : result["lng"],
      }
    })];
    $scope.center = {
      lat : result["lat"],
      lng : result["lng"]
    };
    $scope.address = result;
  }

  $ionicModal.fromTemplateUrl('htmljs/search-location/search-location.html', {
    scope : modalScope
  }).then(function(modal){
    $scope.modal = modal;
  });
  $scope.chooseLocation = function(){
    $scope.modal.show();
  }
  $scope.useLocation = function(){
    $ionicHistory.nextViewOptions({
      disableBack : true
    });
    console.log(modalScope);
    $state.go("app.addTask", {
      lat : $scope.address['lat'],
      lng : $scope.address['lng']
    });
  }

});
