storyApp.directive("infiniteLoad",["$location",function($location){
       return {
              restrict: 'AE',
              scope: {
                     paginationRequest:'&',
                    
                     disablePagination:"=?",
              },
              link:function(scope, element, attrs, ctrls){
                     var threshold = 100;
                     var lazyLoad = {};
                     var winElem = $(window);
                     lazyLoad.paginationRequest =function(){
                    	 scope.paginationRequest();
                     } 
                     lazyLoad.debounce = function(func,wait){
                    	 var timeout;
                    	 return function(){
                    		 var context = this;
                    		 var functionCall = function(){
                    			 timeout=null;
                    			
                    				 var docElem =$(document);
                                     var visibleHeight = window.innerHeight;
                                     var scrollableHeight = docElem.height();
                                     var hiddenContentHeight = scrollableHeight - visibleHeight;
                                     if (hiddenContentHeight - winElem.scrollTop() <= threshold) {
                                         {
                                         	//console.log("pagination initiated");
                                                if(!scope.disablePagination){
                                             	   func.apply(context);
                                                }
                                         }
                                     }
                    			 
                    			 
                                
                    			
                    		 }
                    		 clearTimeout(timeout);
                    		 timeout = setTimeout(functionCall,wait);
                    		 
                    	 }
                     }
                   
                     
                    
                        
                         winElem.scroll(lazyLoad.debounce(lazyLoad.paginationRequest,250));
                   
                     
                    
              }
       };
       
}]);
