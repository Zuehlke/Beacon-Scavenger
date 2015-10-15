angular.module('app').controller("GameController", [ "$scope", "NumberService", function($scope, NumberService){
    $scope.title = 'Rock Paper Scissors';
	$scope.isRunning = false;	
	var choices = ['rock', 'paper', 'scissors'];
	$scope.player = '';
	$scope.scores = [];
	
	$scope.startGame = function(){
		$scope.isRunning = true;
		$scope.score = 0;
		$scope.startRound();
	}
	
	$scope.startRound = function(){
		$scope.choice = '';
		$scope.inRound = true;
		$scope.computerChoice = 'question';
		$scope.result = '';
	}
	
	$scope.playersChoice = function(choice){
		if(!$scope.inRound)
			return;
		$scope.choice = choice; 
		$scope.inRound = false;
		$scope.computerChoice = generateComputerChoice();
		$scope.result = validateResult();
		calculateScore();		
		
		if ($scope.result == 'lose' ) {
			$scope.scores.push( {player: $scope.player, score: $scope.score});
		}
	}
	
	function generateComputerChoice(){
		return choices[NumberService.getRandomInteger(choices.length)];
	}
	
	function validateResult(){
		if($scope.choice == $scope.computerChoice)
			return 'draw';
		if(($scope.choice == 'rock' && $scope.computerChoice == 'scissors') ||
			($scope.choice == 'paper' && $scope.computerChoice == 'rock') ||
			($scope.choice == 'scissors' && $scope.computerChoice == 'paper'))
			return 'win';
		return 'lose';
	}
	
	function calculateScore(){
		if($scope.result == 'win'){
			$scope.score = ( ($scope.score == 0) ? 10 : $scope.score * 2);
		} else if ($scope.result == 'draw')
			$scope.score = $scope.score + 10;
	}
}]);