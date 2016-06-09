// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    
    $cordovaStatusbar.overlaysWebView(true)
	$cordovaStatusBar.style(1) //Light
    // if (window.StatusBar) {
//       // org.apache.cordova.statusbar required
// //       StatusBar.styleDefault();
//       StatusBar.overlaysWebView(true);
//       StatusBar.style(1); //Light
//     }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.itemviewA', {
    url: "/itemviewA",
    views: {
      'menuContent': {
        templateUrl: "templates/itemviewA.html"
      }
    }
  })
  
  .state('app.VerifyEntry', {
  	cache: false,
    url: "/VerifyEntry",
    views: {
      'menuContent': {
        templateUrl: "templates/VerifyEntry.html",
        controller: 'verifyEntryController'
      }
    }
  })
  
  .state('app.InventoryVerify', {
    url: "/InventoryVerify",
    views: {
      'menuContent': {
        templateUrl: "templates/assetVerification.html",
        controller: "assetVerificationController"
      }
    }
  })
  
    .state('app.landinglogin', {
      url: "/landinglogin",
      views: {
        'menuContent': {
          templateUrl: "templates/landinglogin.html",
          controller: 'SSOLoginCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/landinglogin');
});
