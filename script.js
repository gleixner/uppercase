// Code goes here

angular.module('myApp', [])
  .directive('uppercase', function($timeout) {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: uppercaseLink
    };

    function uppercaseLink(scope, element, attr, ngModelCtrl) {
      var oldValue
      $timeout(function() {
        oldValue = convert(scope.$eval(attr.uppercase));
        if(oldValue) {
          applyUppercase(element, ngModelCtrl);
        }

        scope.$watch(function() {
          console.log('checking uppercase value');
          var newValue = convert(scope.$eval(attr.uppercase));
          if(newValue !== oldValue) {
            console.log('uppercase has changed');
            if(newValue) {
              applyUppercase(element, ngModelCtrl);
            } else {
              unapplyUppercase(element, ngModelCtrl);
            }
            oldValue = newValue;
          }
        });
      });
    }
  });

function convert(value) {
  return value === true || value === 'true' || value === undefined || value === null;
}

function applyUppercase(element, ngModelCtrl) {
  element.css('text-transform', 'uppercase');
  ngModelCtrl.$parsers.push(toUppercase);
  var original = ngModelCtrl.$modelValue.toUpperCase();
  ngModelCtrl.$setViewValue(original);
  ngModelCtrl.$render();
}

function unapplyUppercase(element, ngModelCtrl) {
  element.css('text-transform', '');
  var index = ngModelCtrl.$parsers.indexOf(toUppercase);
  if (index > -1) {
    ngModelCtrl.$parsers.splice(index, 1);
  }
  var original = ngModelCtrl.$modelValue.toUpperCase();
  ngModelCtrl.$setViewValue(original);
  ngModelCtrl.$render();
}

function toUppercase(value) {
  if (value) {
    return value.toUpperCase();
  }
  return value;
}

// ###################
angular.module('myApp')
  .controller('Controller', Controller);

function Controller() {
  var self = this;
  self.greet = 'Hello World';

  self.uppercase = false;

  self.switchUppercase = function() {
    self.uppercase = !self.uppercase;
    console.log('uppercase value has changed to ' + self.uppercase);
  }
}