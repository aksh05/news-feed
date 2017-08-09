var storyApp = angular.module("storyApp",['ui.router'])

.config(["$stateProvider",function(stateProvider){
    
    
    stateProvider.state("story",{
        
        url:"/story",
        controller:"storyController as storyCtrl",
        
        templateUrl:"html/stories.html"
        
    });
    
    
    
}])