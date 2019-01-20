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
        


        // timeout after 10 seconds
        if( Date.now() - startedAt > 30000 ) {
            console.log("Exiting");
            
            var results = [];
            $(".col-xs-2-4.shopee-search-item-result__item").each(function(){
                
                if($(this).find("._1NoI8_.KQFWxC").text() !== "")
                {
                    var pic_link = $(this).find("._1T9dHf.animated-lazy-image__image--ready").css("background-image").replace("url(","").replace(")","");
                    var result = {
                        product_name: $(this).find("._1NoI8_.KQFWxC").text(),
                        price: $(this).find(".tyA3vN._3eZ5Vz._3RuPcU").text(),
                        rating: $(this).find(".shopee-rating-stars__lit[style='width: 100%']").length,
                        link: "https://shopee.sg" + $(this).find("a").attr("href"),
                        pic: pic_link
                    };
                    console.log(result);
                }
            });
            if(results.length > 0)
            {
                context.finish(results);
                return;
            }
            context.finish("NOT FOUND");
            return;      
        }

        // if my element still hasn't been loaded, wait a little more
        if( Date.now() - startedAt < 30000 && setExtract == false ){
            setTimeout(extractData, 1000);
            setExtract = true;
            return;
        }

        // save a result

        
    }
    extractData();

}