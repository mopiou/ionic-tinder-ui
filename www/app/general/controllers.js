angular.module('next.general.controllers', [])


  .controller('GeneralCtrl', function RecommendationCtrl(
    $scope
    , $log
    , $ionicSlideBoxDelegate
    , $timeout) {


      $scope.slideHasChanged = slideHasChanged;
      $scope.slideTo = slideTo;
      $scope.slideToNext = slideToNext;
      $scope.slideToPrevious = slideToPrevious;
      $scope.deviceHeight = window.innerHeight;
      $scope.myToggle = true;
      $scope.slideIndex = 0;


      function slideTo(index) {
        $ionicSlideBoxDelegate.slide(index);
      }

      function slideToNext() {
        var nextSlide = $scope.slideIndex + 1;
        $ionicSlideBoxDelegate.slide(nextSlide < 2 ? nextSlide : 2);
        $ionicSlideBoxDelegate.enableSlide(true);

      }

      function slideToPrevious() {
        var previousSlide = $scope.slideIndex - 1;
        $ionicSlideBoxDelegate.slide(previousSlide > 0 ? previousSlide : 0);
        $ionicSlideBoxDelegate.enableSlide(true);

      }


      $scope.$watch(function (scope) { return scope.slideIndex },
        function (newValue, oldValue) {
          switch (newValue) {
            case 0:
            case 2:
              $ionicSlideBoxDelegate.enableSlide(false);
              break;
          }
        }
      );


    $scope.onTouch = function(){
      $ionicSlideBoxDelegate.enableSlide(false);
      console.log('touched');
    }
    $scope.onRelease = function(){
      $ionicSlideBoxDelegate.enableSlide(true);
      console.log('released');
    }


    function slideHasChanged(index) {
      $scope.slideIndex = index;
    }

  })










  .controller('MessageCtrl', ['$scope', '$rootScope', '$state',
    '$stateParams', 'MockService', '$ionicActionSheet',
    '$ionicPopup', '$ionicScrollDelegate', '$timeout', '$interval', '$ionicHistory', '$log',
    function ($scope, $rootScope, $state, $stateParams, MockService,
      $ionicActionSheet,
      $ionicPopup, $ionicScrollDelegate, $timeout, $interval, $ionicHistory, $log) {

      var vm = this;

      //$stateParams.toUser
      //$stateParams.user

      $log.info('message ctrl');
      $log.info($stateParams.chatId);
      $log.info('' + $ionicHistory.currentTitle());



      // mock acquiring data via $stateParams
      $scope.toUser = {
        _id: '534b8e5aaa5e7afc1b23e69b',
        pic: 'img/brian.jpg',
        username: 'Brian'
      }

      $log.info($scope.toUser);


      // this could be on $rootScope rather than in $stateParams
      $scope.user = {
        _id: '534b8fb2aa5e7afc1b23e69c',
        pic: 'img/margaux.jpg',
        username: 'Margaux'
      };

      $scope.input = {
        message: localStorage['userMessage-' + $scope.toUser._id] || ''
      };

      var messageCheckTimer;

      var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
      var footerBar; // gets set in $ionicView.enter
      var scroller;
      var txtInput; // ^^^

      $scope.$on('$ionicView.enter', function () {

        console.log('UserMessages $ionicView.enter');

        $log.info($stateParams.chatId);


        getMessages();

        $timeout(function () {
          // footerBar = document.body.querySelector('#userMessagesView .bar-footer');
          // scroller = document.body.querySelector('#userMessagesView .scroll-content');
          // txtInput = angular.element(footerBar.querySelector('textarea'));
        }, 0);

        messageCheckTimer = $interval(function () {
          // here you could check for new messages if your app doesn't use push notifications or user disabled them
        }, 20000);
      });

      $scope.$on('$ionicView.leave', function () {
        console.log('leaving UserMessages view, destroying interval');
        // Make sure that the interval is destroyed
        if (angular.isDefined(messageCheckTimer)) {
          $interval.cancel(messageCheckTimer);
          messageCheckTimer = undefined;
        }
      });

      $scope.$on('$ionicView.beforeLeave', function () {
        if (!$scope.input.message || $scope.input.message === '') {
          localStorage.removeItem('userMessage-' + $scope.toUser._id);
        }
      });

      function getMessages() {
        // the service is mock but you would probably pass the toUser's GUID here
        MockService.getUserMessages({
          toUserId: $scope.toUser._id
        }).then(function (data) {
          $scope.doneLoading = true;
          $scope.messages = data.messages;

          $timeout(function () {
            viewScroll.scrollBottom();
          }, 0);
        });
      }


      $scope.$watch('input.message', function (newValue, oldValue) {
        console.log('input.message $watch, newValue ' + newValue);
        if (!newValue) newValue = '';
        localStorage['userMessage-' + $scope.toUser._id] = newValue;
      });

      $scope.sendMessage = function (sendMessageForm) {
        $log.info('send message : ');
        $log.info(sendMessageForm);
        var message = {
          toId: $scope.toUser._id,
          text: $scope.input.message
        };

        // if you do a web service call this will be needed as well as before the viewScroll calls
        // you can't see the effect of this in the browser it needs to be used on a real device
        // for some reason the one time blur event is not firing in the browser but does on devices
        keepKeyboardOpen();

        //MockService.sendMessage(message).then(function(data) {
        $scope.input.message = '';

        message._id = new Date().getTime(); // :~)
        message.date = new Date();
        message.username = $scope.user.username;
        message.userId = $scope.user._id;
        message.pic = $scope.user.picture;

        $scope.messages.push(message);

        $timeout(function () {
          keepKeyboardOpen();
          viewScroll.scrollBottom(true);
        }, 0);

        $timeout(function () {
          $scope.messages.push(MockService.getMockMessage());
          keepKeyboardOpen();
          viewScroll.scrollBottom(true);
        }, 2000);

        //});
      };

      // this keeps the keyboard open on a device only after sending a message, it is non obtrusive
      function keepKeyboardOpen() {
      }

      $scope.onMessageHold = function (e, itemIndex, message) {
        console.log('onMessageHold');
        console.log('message: ' + JSON.stringify(message, null, 2));
        $ionicActionSheet.show({
          buttons: [{
            text: 'Copier'
          }, {
              text: 'Supprimer'
            }],
          buttonClicked: function (index) {
            switch (index) {
              case 0: // Copy Text
                //cordova.plugins.clipboard.copy(message.text);

                break;
              case 1: // Delete
                // no server side secrets here :~)
                $scope.messages.splice(itemIndex, 1);
                $timeout(function () {
                  viewScroll.resize();
                }, 0);

                break;
            }

            return true;
          }
        });
      };

      // this prob seems weird here but I have reasons for this in my app, secret!
      $scope.viewProfile = function (msg) {
        if (msg.userId === $scope.user._id) {
          // go to your profile
        } else {
          // go to other users profile
        }
      };

      // I emit this event from the monospaced.elastic directive, read line 480
      $scope.$on('taResize', function (e, ta) {
        console.log('taResize');
        if (!ta) return;

        var taHeight = ta[0].offsetHeight;
        console.log('taHeight: ' + taHeight);

        if (!footerBar) return;

        var newFooterHeight = taHeight + 10;
        newFooterHeight = (newFooterHeight > 44) ? newFooterHeight : 44;

        footerBar.style.height = newFooterHeight + 'px';
        scroller.style.bottom = newFooterHeight + 'px';
      });

    }])




















  // services
  .factory('MockService', ['$http', '$q',
    function ($http, $q) {
      var me = {};

      me.getUserMessages = function (d) {
        /*
        var endpoint =
          'http://www.mocky.io/v2/547cf341501c337f0c9a63fd?callback=JSON_CALLBACK';
        return $http.jsonp(endpoint).then(function(response) {
          return response.data;
        }, function(err) {
          console.log('get user messages error, err: ' + JSON.stringify(
            err, null, 2));
        });
        */
        var deferred = $q.defer();

        setTimeout(function () {
          deferred.resolve(getMockMessages());
        }, 1500);

        return deferred.promise;
      };

      me.getMockMessage = function () {
        return {
          userId: '534b8e5aaa5e7afc1b23e69b',
          date: new Date(),
          text: 'Message test'
        };
      }

      return me;
    }
  ])


// Following are untouched





/*
  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  })

*/


function getMockMessages() {
  return {
    "messages": [
      {
        "_id": "535d625f898df4e80e2a125e",
        "text": "Bonjour.",
        "userId": "534b8fb2aa5e7afc1b23e69c",
        "date": "2014-04-27T20:02:39.082Z",
        "read": true,
        "readDate": "2014-12-01T06:27:37.944Z"
      }, {
        "_id": "535f13ffee3b2a68112b9fc0",
        "text": "Salut, enchanté!",
        "userId": "534b8e5aaa5e7afc1b23e69b",
        "date": "2014-04-29T02:52:47.706Z",
        "read": true,
        "readDate": "2014-12-01T06:27:37.944Z"
      }], "unread": 0
  };
}
