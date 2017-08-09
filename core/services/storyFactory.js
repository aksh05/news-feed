storyApp.service("storyFactory",["RestServiceProvider","storyConstants",function(restService,constants){
    
    return function(isLazyLoad){
        
        let storyConstants = new constants();
        let storyLimit =[{
            name:"limit",
            value:0
        },{
            name:"offset",
            value:0
        }];
        let url = "";
        if(isLazyLoad){
            url = storyConstants.ININITE_STORY_URL
        }
        else{
           url =  storyConstants.STORY_URL
        }
        
        let urlObj = {
            url:url,
            method:"GET",
            
        }
        
        this.getStories = function(limit,offset,counter){
            storyLimit[0].value = limit;
            storyLimit[1].value = offset;
           
           
            if(counter){
                let urlObj1 = {
                    url :urlObj.url + counter+".json",
                    method:"GET"
                }
                 return restService.invoke(urlObj1,storyLimit,null)
            }
            return restService.invoke(urlObj,storyLimit,null)
            
            
        }    
        
    }
    
}])














