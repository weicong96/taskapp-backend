angular.module('starter.controllers')
.controller("ChooseLocationCtrl" , function($scope, $state, $ionicModal, $ionicScrollDelegate, $ionicHistory, $ionicLoading,$reactive,Geocode){
  $reactive(this).attach($scope);

  var vm = this;
  this.markers = [];
  this.center = "";
  this.modalScope = $scope.$new(true);
  this.modalScope = angular.extend(this.modalScope, {
    geocode : function(text){
      $ionicLoading.show({
        template : "Loading.."
      });
      Geocode(text).then(function(results){
          vm.modalScope.results = results;
          $ionicLoading.hide();
      });
    },
    selectResult : function(result){
      vm.modal.hide();
      vm.zoom = 18;
      vm.markers = [new google.maps.Marker({
        position : {
          lat : result["lat"],
          lng : result["lng"],
        }
      })];
      vm.center = {
        lat : result["lat"],
        lng : result["lng"]
      };
      vm.address = result;
    }
  });

  $ionicModal.fromTemplateUrl('htmljs/search-location/search-location.html', {
    scope : this.modalScope
  }).then(function(modal){
    vm.modal = modal;
  });
  this.chooseLocation = function(){
    this.modal.show();
  }
  this.useLocation = function(){
   // $ionicHistory.nextViewOptions({
    //  disableBack : true
   // });
    $ionicHistory.goBack();
  }

});
