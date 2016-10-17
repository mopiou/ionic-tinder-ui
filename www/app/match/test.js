angular.module('ionicApp', ['ionic'])


.controller('ConfirmContactDialogCtrl', ['$scope', 'parameters', function($scope, parameters) {
  var vm = this;
  vm.contact = parameters;
  vm.confirm = function(contact){
    $scope.closeModal(contact);
  };
  vm.cancel = function(){
    $scope.closeModal(null);
  };
}])


.controller('ContactDialogCtrl', ['$scope', 'parameters', 'myModals', function($scope, parameters, myModals) {
  var vm = this;
  vm.contacts = [
    { name: 'Gordon Freeman' },
    { name: 'Barney Calhoun' },
    { name: 'Lamarr the Headcrab' },
  ];
  vm.selectedContact;
  if(parameters && parameters.length !== 0){
    vm.contacts.push(parameters);
  }
  
  vm.confirmSelection = function(selected) {
    if(selected) {
     myModals.showConfirmContact(selected)
     .then(function(result) {
       if(result) {
        vm.selectedContact = result; 
       }
     }); 
    }
    
  };
  
}])



.controller('AppCtrl', ['$scope', 'myModals', function($scope, myModals) {
  var vm = this;
  vm.selectedContact = '';
  vm.openContactDialog = function(){
    myModals.showContacts({ name: 'Julian Paulozzi' })
    .then(function(result) {
      if(result && result.name){
        vm.selectedContact = result;
      }
    }, function(err) {
       alert(err);
    });
  };
  
}])



.factory('myModals', ['appModalService', function(appModalService){
  // all app modals here
  var service = {
    showConfirmContact: showConfirmContact,
    showContacts: showContacts
  };
  
  return service;
  
  function showConfirmContact(contact){
    return appModalService.show('confirm-contact-modal.html', 'ConfirmContactDialogCtrl as vm', contact);
  }
  
  function showContacts(otherContact) {
    return appModalService.show('contacts-modal.html', 'ContactDialogCtrl as vm', otherContact);
  }
  
  
}])



.factory('appModalService', 
['$ionicModal', '$rootScope', '$q', '$injector', '$controller', function($ionicModal, $rootScope, $q, $injector, $controller) {
    
  return {
    show: show
  }

  function show(templeteUrl, controller, parameters, options) {
    // Grab the injector and create a new scope
    var deferred = $q.defer(),
        ctrlInstance,
        modalScope = $rootScope.$new(),
        thisScopeId = modalScope.$id,
        defaultOptions = {
          animation: 'slide-in-up',
          focusFirstInput: false,
          backdropClickToClose: true,
          hardwareBackButtonClose: true,
          modalCallback: null
        };

    options = angular.extend({}, defaultOptions, options);

    $ionicModal.fromTemplateUrl(templeteUrl, {
      scope: modalScope,
      animation: options.animation,
      focusFirstInput: options.focusFirstInput,
      backdropClickToClose: options.backdropClickToClose,
      hardwareBackButtonClose: options.hardwareBackButtonClose
    }).then(function (modal) {
      modalScope.modal = modal;

      modalScope.openModal = function () {
        modalScope.modal.show();
      };
      modalScope.closeModal = function (result) {
        deferred.resolve(result);
        modalScope.modal.hide();
      };
      modalScope.$on('modal.hidden', function (thisModal) {
        if (thisModal.currentScope) {
          var modalScopeId = thisModal.currentScope.$id;
          if (thisScopeId === modalScopeId) {
            deferred.resolve(null);
            _cleanup(thisModal.currentScope);
          }
        }
      });

      // Invoke the controller
      var locals = { '$scope': modalScope, 'parameters': parameters };
      var ctrlEval = _evalController(controller);
      ctrlInstance = $controller(controller, locals);
      if (ctrlEval.isControllerAs) {
        ctrlInstance.openModal = modalScope.openModal;
        ctrlInstance.closeModal = modalScope.closeModal;
      }

      modalScope.modal.show()
        .then(function () {
        modalScope.$broadcast('modal.afterShow', modalScope.modal);
      });

      if (angular.isFunction(options.modalCallback)) {
        options.modalCallback(modal);
      }

    }, function (err) {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  function _cleanup(scope) {
    scope.$destroy();
    if (scope.modal) {
      scope.modal.remove();
    }
  }

  function _evalController(ctrlName) {
    var result = {
      isControllerAs: false,
      controllerName: '',
      propName: ''
    };
    var fragments = (ctrlName || '').trim().split(/\s+/);
    result.isControllerAs = fragments.length === 3 && (fragments[1] || '').toLowerCase() === 'as';
    if (result.isControllerAs) {
      result.controllerName = fragments[0];
      result.propName = fragments[2];
    } else {
      result.controllerName = ctrlName;
    }

    return result;
  }
 
}]);









angular.module('evenementoApp', ['ionic'])

.service('ModalService', function($ionicModal, $rootScope) {
  
  
  var init = function(tpl, $scope) {

    var promise;
    $scope = $scope || $rootScope.$new();
    
    promise = $ionicModal.fromTemplateUrl(tpl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      return modal;
    });

    $scope.openModal = function() {
       $scope.modal.show();
     };
     $scope.closeModal = function() {
       $scope.modal.hide();
     };
     $scope.$on('$destroy', function() {
       $scope.modal.remove();
     });
    
    return promise;
  }
  
  return {
    init: init
  }
  
})


.controller('MainCtrl', function($scope, ModalService) {
  
  $scope.modal1 = function() {
    ModalService
      .init('modal1.html', $scope)
      .then(function(modal) {
        modal.show();
      });
  };
  
  $scope.modal2 = function() {
    ModalService
      .init('modal2.html')
      .then(function(modal) {
        modal.show();
      });
  };
  
})

