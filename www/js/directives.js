angular.module('starter.controllers')
.directive("myMap", function($window){
  return {
    template : "<ng-map class='map' ng-style='{height : ($window.innerHeight/height)+\"px\"}'center='[1.302, 103.82]'></ng-map>",
    scope: {
      height : "=",
      markers : "=",
      center : "=",
      zoom : "="
    },
    link  : function(scope, elem){
    },
    controller : function($scope,NgMap,Geocode){
      if(!$scope.zoom){
        $scope.zoom = 12;
      }
      NgMap.getMap().then(function(map){
        $scope.map = map;
        $scope.$watch("zoom", function(){
          console.log("change zoom");
          $scope.map.setZoom($scope.zoom);
        });
        $scope.$watch("markers" , function(_new, old){
          if(old){
            old.forEach(function(oldMarker){
              oldMarker.setMap(null);
            });
          }
          if($scope.markers != null){
            $scope.markers.forEach(function(marker){
              marker.setMap($scope.map);
            });
          }
        });
        $scope.$watch("center", function(_new, old){
            if(_new != "" && typeof $scope.center == "string"){
              Geocode($scope.center).then(function(result){
                  $scope.map.setCenter({lat : parseFloat(result[0]["lat"]), lng : parseFloat(result[0]["lng"])});
              });
            }else if(typeof $scope.center == "object" && Object.keys($scope.center).length != 0){
              $scope.map.setCenter($scope.center);
            }
          
        });
      });
    },

  }
})
.directive('focusMe', function ($timeout) {
  return {
    link: function (scope, element, attrs) {
      if (attrs.focusMeDisable === "true") {
        return;
      }
      $timeout(function () {
        element[0].focus();
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.show(); //open keyboard manually
        }
      }, 350);
    }
  };
});
