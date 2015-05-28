'use strict';

angular.module('linagora.esn.contact')
  .directive('contactNavbarLink', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/contact/views/partials/contact-navbar-link.html'
    };
  })
  .controller('MultiInputGroupController', ['$scope', '$timeout', function($scope, $timeout) {
    function _updateTypes() {
      $scope.newItem.type = $scope.types[$scope.content.length % $scope.types.length];
    }

    function _acceptNew() {
      $scope.content.push($scope.newItem);
      $scope.newItem = {};
      _updateTypes();
    }

    function _acceptRemove($index) {
      $scope.content.splice($index, 1);
      _updateTypes();
    }

    this.verifyNew = function(/* valuesToCheck... */) {
      var args = Array.apply(null, arguments);
      function _verify(item) {
        return args.every(function(argument) { return !!item[argument]; });
      }
      return function() {
        var item = $scope.newItem;
        if (_verify(item)) {
          _acceptNew();
        }
      };
    };

    this.verifyRemove = function(valueToCheck) {
      return function($index) {
        var item = $scope.content[$index];
        if (!item[valueToCheck]) {
          _acceptRemove($index);
        }
      };
    };

    $scope.$watch('content', _updateTypes);

    $scope.content = [];
    $scope.newItem = {};
  }])
  .directive('multiInputGroup', function() {
    return {
      restrict: 'E',
      scope: {
        content: '=multiInputModel',
        types: '=multiInputTypes',
        inputType: '@multiInputTexttype',
        placeholder: '@multiInputPlaceholder'
      },
      templateUrl: '/contact/views/partials/multi-input-group.html',
      controller: 'MultiInputGroupController',
      link: function(scope, element, attrs, controller) {
        scope.verifyNew = controller.verifyNew('value');
        scope.verifyRemove = controller.verifyRemove('value');
      }
    };
  })
  .directive('multiInputGroupAddress', function() {
    return {
      restrict: 'E',
      scope: {
        content: '=multiInputModel',
        types: '=multiInputTypes',
        inputType: '@multiInputTexttype',
        placeholder: '@multiInputPlaceholder'
      },
      templateUrl: '/contact/views/partials/multi-input-group-address.html',
      controller: 'MultiInputGroupController',
      link: function(scope, element, attrs, controller) {
        scope.verifyNew = controller.verifyNew('street', 'zip', 'city', 'country');
        scope.verifyRemove = controller.verifyRemove('street');
      }
    };
  })
  .directive('multiInlineEditableInputGroup', function() {
    return {
      restrict: 'E',
      scope: {
        content: '=multiInputModel',
        types: '=multiInputTypes',
        inputType: '@multiInputTexttype',
        placeholder: '@multiInputPlaceholder'
      },
      templateUrl: '/contact/views/partials/multi-inline-editable-input-group.html',
      controller: 'MultiInputGroupController',
      link: function(scope, element, attrs, controller) {
        scope.verifyNew = controller.verifyNew('value');
        scope.verifyRemove = controller.verifyRemove('value');
      }
    };
  })
  .directive('multiInlineEditableInputGroupAddress', function() {
    return {
      restrict: 'E',
      scope: {
        content: '=multiInputModel',
        types: '=multiInputTypes',
        inputType: '@multiInputTexttype',
        placeholder: '@multiInputPlaceholder'
      },
      templateUrl: '/contact/views/partials/multi-inline-editable-input-group-address',
      controller: 'MultiInputGroupController',
      link: function(scope, element, attrs, controller) {
        scope.verifyNew = controller.verifyNew('street', 'zip', 'city', 'country');
        scope.verifyRemove = controller.verifyRemove('street');
      }
    };
  })
  .directive('contactDisplay', function() {
    return {
      restrict: 'E',
      scope: {
        'contact': '='
      },
      templateUrl: '/contact/views/partials/contact-display.html'
    };
  })
  .directive('contactDisplayEditable', function() {
    return {
      restrict: 'E',
      scope: {
        'contact': '='
      },
      templateUrl: '/contact/views/partials/contact-display-editable.html'
    };
  })
  .directive('inlineEditableInput', function($timeout) {
    function link(scope, element, attrs, controller) {
      var input = element.find('input');
      scope.showGroupButtons = false;
      var oldValue = '';

      function _toggleGroupButtons() {
        scope.showGroupButtons = !scope.showGroupButtons;
      }

      input.bind('focus', function() {
        oldValue = controller.$viewValue;
        $timeout(_toggleGroupButtons, 0);
      });

      input.bind('blur', function() {
        if (oldValue !== controller.$viewValue) {
          scope.saveInput();
        }

        $timeout(function() {
          _toggleGroupButtons();
          if (scope.onBlur) {
            scope.onBlur();
          }
        }, 200);
      });

      input.bind('keydown', function(event) {
        var escape = event.which === 27;
        var target = event.target;
        if (escape) {
          $timeout(scope.resetInput, 0);
          target.blur();
          event.preventDefault();
        }
      });

      scope.saveInput = scope.onSave || function() {};

      scope.resetInput = function() {
        controller.$setViewValue(oldValue);
        controller.$render();
      };
    }

    return {
      scope: {
        ngModel: '=',
        type: '@',
        placeholder: '@',
        onSave: '=',
        inputClass: '@',
        onBlur: '='
      },
      require: 'ngModel',
      restrict: 'E',
      templateUrl: '/contact/views/partials/inline-editable-input.html',
      link: link
    };
  })

  .directive('contactListItem', [function() {
    return {
      restrict: 'E',
      templateUrl: '/contacts/views/partials/contact-list-item.html'
    };
  }]);
