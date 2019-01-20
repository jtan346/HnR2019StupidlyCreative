function pageFunction(context) {
    // called on every page the crawler visits, use it to extract data from it
    var $ = context.jQuery; 
    var startedAt =  Date.now();
    var setExtract = false;
 
    // tell the crawler that pageFunction will finish asynchronously
    context.willFinishLater();
    
    var extractData = function() {
        setExtract = false;
        console.log("Found: " + $(".col-xs-2-4.shopee-search-item-result__item").length + " with time:  " + (Date.now() - startedAt));
        
        // refresh page screenshot and HTML for debugging
        context.saveSnapshot();            
        
        if($(".col-xs-2-4.shopee-search-item-result__item").length > 40)
        {
            console.log("Exiting");
            
            var results = [];
            $(".col-xs-2-4.shopee-search-item-result__item").each(function(){
                if($(this).find("._1NoI8_.KQFWxC").text() !== "")
                {
                    var result = {
                        product_name: $(this).find("._1NoI8_.KQFWxC").text(),
                        price: $(this).find(".tyA3vN._3eZ5Vz._3RuPcU").text(),
                        rating: $(this).find(".shopee-rating-stars__lit[style='width: 100%']").length,
                        link: $(this).find("a").attr("href") 
                    };                
                    results.push(result);
                }
            });
            if(results.length > 0)
            {
                context.finish(results);
            }
            context.finish("NOT FOUND");
            return;      
        }
        
        // timeout after 10 seconds
        if( Date.now() - startedAt > 30000 ) {
            context.finish("Timed out before #my_element was loaded " + Date.now() + " " + startedAt);
            return;
        }

        // if my element still hasn't been loaded, wait a little more
        if( Date.now() - startedAt < 30000 && setExtract == false ){
            setTimeout(extractData, 1000);
            setExtract = true;
            return;
        }

        // save a result

        
        context.finish(function(){
            var results = [];
            $(".col-xs-2-4.shopee-search-item-result__item").each(function(){
                if($(this).find("._1NoI8_.KQFWxC").text() !== "")
                {
                    var result = {
                        product_name: $(this).find("._1NoI8_.KQFWxC").text(),
                        price: $(this).find(".tyA3vN._3eZ5Vz._3RuPcU").text(),
                        rating: $(this).find(".shopee-rating-stars__lit[style='width: 100%']").length,
                        link: $(this).find("a").attr("href") 
                    };
                    results.push(result);
                }
            });
            if(results.length > 0)
            {
                return results;
            }
            return "NOT FOUND";
        });

        
    }
    extractData();

}