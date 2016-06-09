angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
 
})

.controller('verifyEntryController', function($scope, $http, $ionicPopup, $state, $cordovaBarcodeScanner, firearmService, $ionicLoading) {

	$scope.submitSerial = function(serial) {
		
// 		$ionicLoading.show({
// 			template: 'loading'
// 		})

		//web service call
// 		firearmService.GetFirearm(serial.numberInput.$viewValue).then(function(response){
// 			var firearm = response.data;
// 			$ionicLoading.hide()
// 			if(firearm.serialNumber == serial.numberInput.$viewValue){
// 				$state.go('app.InventoryVerify');
// 				window.localStorage['firearm1'] = response.data;
// 				window.localStorage['serialNumber'] = firearm.serialNumber;
// 				window.localStorage['id'] = firearm.id;
// 				window.localStorage['inventorySerializedUserId'] = firearm.inventorySerializedUserId;
// 				window.localStorage['itemTypeName'] = firearm.itemTypeName;
// 				window.localStorage['productDescription'] = firearm.productDescription;
// 				window.localStorage['accountableUser'] = firearm.accountableUser;
// 				localStorage.setItem('firearm', JSON.stringify(response.data));
// 				
// 				var logObject = localStorage.getItem('firearm');
// 				console.log('retrievedObject: ', JSON.parse(logObject));
// 			}else{
// 				$scope.showPopup();
// 			}
// 		});
		

		
	 	window.localStorage['serialNumber'] = serial.numberInput.$modelValue;
	 	 
	 	var serialExists = false;
 	 	
	 	 $http.get('js/data.json').success(function(data) {
			$scope.info = data;
			
			for (var i = 0; i < data.firearms.length; i++) {
				if(data.firearms[i].serialNumber == serial.numberInput.$modelValue){
				
					$state.go('app.InventoryVerify');
					serialExists = true;
					break;
				}
			}
			if (!serialExists){
				$scope.showPopup();
			}
		});
	};
	
	// Triggered on a button click, or some other target
	$scope.showPopup = function() {
		$scope.data = {};

		// An elaborate, custom popup
		var myPopup = $ionicPopup.show({
			title: 'Serial Number Not Found',
			subTitle: 'Please try again',
			scope: $scope,
			buttons: [
			  {
				text: '<b>OK</b>',
				type: 'button-positive',

			  }
			]
		});

		myPopup.then(function(res) {
		console.log('Tapped!', res);
		});


	 };
		 
	$scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
//             alert(imageData.text);
            $scope.recognizedText = imageData.text;
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
    };

	$scope.data = {
		speechText: ''
	  };
	  $scope.recognizedText = '';
 
	  $scope.speakText = function() {
		TTS.speak({
			   text: $scope.data.speechText,
			   locale: 'en-GB',
			   rate: 1.5
		   }, function () {
			   // Do Something after success
		   }, function (reason) {
			   // Handle the error case
		   });
	  };
 
	$scope.record = function() {
		var recognition = new SpeechRecognition();
		recognition.onresult = function(event) {
			if (event.results.length > 0) {
				$scope.recognizedText = event.results[0][0].transcript;
				$scope.$apply()
			}
		};
		recognition.start();
	};
	  
	// $scope.getFirearm = function() {
// 		firearmService.GetFirearm().then(function(response){
// 			$scope.firearm = response;
// 		});
// 	}

})

.factory('firearmService', function($http) {
	return {
		GetFirearm: function(serial) {
// 			return $http.get("http://localhost:8080/ionicverify/getFirearmBySerial?firearmSerial="+ serial).then(function(response) {
			return $http.get("http://192.62.130.37:8080/ionicverify/getFirearmBySerial?firearmSerial="+ serial).then(function(response) {
					//Process Stuff Here
					return response;
			  });
		},
	}
})

.controller('assetVerificationController', function($scope, $http, $state, $ionicHistory) {
	
	window.localStorage['serialNumber'];
	
	// $scope.firearm = localStorage.getItem('firearm');
	
// 	$scope.serialNumber = window.localStorage.serialNumber;
// 	$scope.id = window.localStorage.id;
// 	$scope.inventorySerializedUserId = window.localStorage.inventorySerializedUserId;
// 	$scope.itemTypeName = window.localStorage.itemTypeName;
// 	$scope.productDescription = window.localStorage.productDescription;
// 	$scope.accountableUser = window.localStorage.accountableUser;
	

    $scope.showButtonBar = true;
    $scope.showContinueButton = false;

	$http.get('js/data.json').success(function(data) {
		$scope.info = data;

		for (var i = 0; i < data.firearms.length; i++) {
    		if(data.firearms[i].serialNumber == window.localStorage['serialNumber']){
    			
    			$scope.firearm = data.firearms[i];
    			break;
    		}
		}
	});
	
	$scope.hideButtons = function() {
        $scope.showButtonBar = false;
        $scope.showContinueButton = true;
    };
    
    $scope.entryScreenReset = function() {
    	
        $state.go('app.VerifyEntry');
        
        $scope.serialEntryForm = {
    		number : ''

  			};
//         $scope.serial = '';
//         serialEntryForm.numberInput = '';
//         var back = $ionicHistory.backView();
    };
	
})

.controller('SSOLoginCtrl', function($scope, $ionicModal, $timeout) {
	 // Form data for the login modal
	$scope.loginData = {};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log('Doing login');
		// Simulate a login delay. Remove this and replace with your login
		// code using a login system
		$timeout(function() {

		}, 1000);
	};
	
	$scope.doPasswordHelp = function() {
		console.log('Showing password help');
	};

	$scope.doInfo = function() {
		console.log('Showing info');
		$scope.openModal();
	};
	
	$ionicModal.fromTemplateUrl('info-modal', {
		scope: $scope,
		animation: 'slide-in-up'
	  }).then(function(modal) {
		$scope.modal = modal;
	  });
    $scope.openModal = function() {
	   $scope.modal.show();
     };
    $scope.closeModal = function() {
	  $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
	  $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
	  // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
	  // Execute action
    });
});