
(function() {
  'use strict';

  angular
    .module('jamjar')
    .directive('jamjarButton', jamjarButton)

    function jamjarButton () {
        var directive = {
            restrict: "E",
            require: "^videogular",
            template: "<div class='iconButton' ng-click='jjb.toggleOverlay()'><img ng-src='assets/images/jamjar_logo_transparent/jamjar_logo_transparent_29x29.png'/></div>",
            link: function(scope, elem, attrs, API) {
                scope.API = API;
            },
            scope: {
              'toggleOverlay': '=',
            },
            controller: JamJarBtnController,
            controllerAs: 'jjb',
            bindToController: true
        }

        function JamJarBtnController(ConcertService) {
            var vm = this;
        }

        return directive;
    }
})();