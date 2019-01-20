function pageFunction(context) {
    // called on every page the crawler visits, use it to extract data from it
    var $ = context.jQuery; 
    var startedAt =  Date.now();
    var setExtract = false;
 
    // tell the crawler that pageFunction will finish asynchronously
    context.willFinishLater();
    
    var extractData = function() {
        setExtract = false;

        // refresh page screenshot and HTML for debugging
        context.saveSnapshot();            
        
        if($("#search_result_item_list tr").length > 20)
        {
            console.log("Exiting");
            
            var results = [];
            $("#search_result_item_list tr").each(function(){
                var img_content_code = $(this).find("td.td_tmb a").attr("img_contents_num");
                var pic_link;
                if(img_content_code)
                {
                    var part1 = img_content_code.substring(7,10);
                    var part2 = img_content_code.substring(3,7);
                    pic_link = "https://gd.image-gmkt.com/li/" + part1 + "/" + part2 + "/" + 874172320 + ".g_100-w-st_g.jpg"
                }
                else
                {
                    var pic_link = $(this).find("td.td_tmb img").attr("src");
                }
                if($(this).find("._1NoI8_.KQFWxC").text() !== "")
                {
                    var result = {
                        product_name: $(this).find("td.td_item .sbj a").text(),
                        price: $(this).find("td.td_prc strong").text(),
                        rating: $(this).find("span.rate_v").length,
                        link: $(this).find("td.td_thmb img").attr("href") 
                        pic : pic_link
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
            $("#search_result_item_list tr").each(function(){
                var pic_link;
                if(img_content_code)
                {
                    var part1 = img_content_code.substring(7,10);
                    var part2 = img_content_code.substring(3,7);
                    pic_link = "https://gd.image-gmkt.com/li/" + part1 + "/" + part2 + "/" + img_content_code + ".g_100-w-st_g.jpg"
                }
                else
                {
                    var pic_link = $(this).find("td.td_tmb img").attr("src");
                }
                if($(this).find("._1NoI8_.KQFWxC").text() !== "")
                {
                    var result = {
                        product_name: $(this).find("td.td_item .sbj a").text(),
                        price: $(this).find("td.td_prc strong").text(),
                        rating: $(this).find("span.rate_v").length,
                        link: $(this).find("td.td_thmb img").attr("href") 
                        pic : pic_link
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