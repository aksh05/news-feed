function mainController($state){
    
    $state.go("story");
}

function storyController($scope,storyFactory,storyConstants){
    
    
    let storyCtrl = this;
     let constants = new storyConstants();
     let limit = constants.STORY_LIMIT
        offset = constants.STORY_OFFSET;
    
    let stryFactory = new storyFactory();
    storyCtrl.stories = [];
    storyCtrl.leadStory = {};
    storyCtrl.imageSrc = constants.IMAGE_PATH;
    storyCtrl.imageP = storyCtrl.imageSrc
    
    
    var storyPromise = stryFactory.getStories(limit,offset);
    
   storyPromise.then(function(response){
       let storyData = response.data.stories;
       
       populateStories(storyData);
      
       
   }).catch(function(response){
       //console.log(response)
   });
    
    
    storyCtrl.getImageSource = function(imagePath){
        if(!angular.isDefined(imagePath))
            return;
        return storyCtrl.imageSrc + imagePath;
    }
    
    function populateStories(storyData){
        console.log(storyData);
         storyCtrl.stories = storyData;
       /*******getting lead story as there is no key for lead story******/
       storyCtrl.leadStory = storyCtrl.stories.splice(2,1)[0];
       storyCtrl.imageP =storyCtrl.imageP + storyCtrl.leadStory['hero-image-s3-key'];
       storyCtrl.storiesCut = storyCtrl.stories.slice(0,3);
        storyCtrl.storiesRest = storyCtrl.stories.splice(3,storyCtrl.stories.length);
        
    }
    
    
    let counter=1;
    storyCtrl.stopLoading = false;
    let stryFactoryLoad = new storyFactory(true);
    storyCtrl.loadStories = function(){
        angular.element(document.querySelector(".loading")).removeClass("hide");
        storyCtrl.stopLoading = true;
        stryFactoryLoad.getStories(limit,offset,counter).then(function(response){
             angular.element(document.querySelector(".loading")).addClass("hide");
           storyCtrl.stopLoading = false;
             storyCtrl.storiesRest = storyCtrl.storiesRest.concat(response.data.stories);    
        
        });
        counter++;
        if(counter>5)
            counter=1;
       
    }
    
}


storyApp.controller("mainController",mainController);

storyApp.controller("storyController",storyController);