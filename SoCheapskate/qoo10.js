onmessage = (evt) => {
    postMessage("Worker received data: " + JSON.stringify(evt.data));
    qoo10NewRequest(JSON.stringify(evt.data));
};

function qoo10NewRequest(term) {

    //Update Crawler
    console.log("Update Crawler with search term");
    var request = new XMLHttpRequest();
    request.open('PUT', 'https://api.apify.com/v1/mx3s7bQeyNdaayHJ5/crawlers/PbYnSfEiHWBi8GKe6?token=iwahFopnxQCmS2T8uhzq7p9KA');

    request.setRequestHeader('Content-Type', 'application/json');

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Update Status:', this.status);
        }
    };

    var body = {
        'startUrls': [
            {
                'key': 'START',
                'value': 'https://www.qoo10.sg/s/?keyword=' + term
            }
        ]
    };
    request.send(JSON.stringify(body));


    //Start Execution
    var request2 = new XMLHttpRequest();

    console.log("Start crawler search");
    request2.open('POST', 'https://api.apify.com/v1/mx3s7bQeyNdaayHJ5/crawlers/PbYnSfEiHWBi8GKe6/execute?token=KcTduuesmZXxCdDY3jtT7ZEB6');
    request2.onreadystatechange = function () {
        console.log(this.readyState);
        if (this.readyState === 4) {
            console.log('Start crawler status:', this.status);
            console.log("Check Execution Status");
            
            var request3 = new XMLHttpRequest();
            var not_finished = true;
            var response;
            while(not_finished)
            {
                request3.open('GET', 'https://api.apify.com/v1/mx3s7bQeyNdaayHJ5/crawlers/PbYnSfEiHWBi8GKe6/lastExec?token=AHkv4ng7bikCLR3wrMtD4Xbd9',false);
                request3.onreadystatechange = function () {    
                    console.log(this.readyState);
                    if (this.readyState === 4) {
                        console.log("Check Execution Status: " + this.status);
                        response = JSON.parse(this.responseText);
                        console.log(response);
                    };
                    if(response.status == "SUCCEEDED")
                    {
                        not_finished = false;
                    }
                }
                request3.send();
                wait(2000);
            }

            
            var request4 = new XMLHttpRequest();
            var has_result = false;
            var result;
            //while(true)                    
            //{
                console.log("Get Crawler Data");
                request4.open('GET', "https://api.apify.com/v1/mx3s7bQeyNdaayHJ5/crawlers/PbYnSfEiHWBi8GKe6/lastExec/results?token=AHkv4ng7bikCLR3wrMtD4Xbd9", false);
                request4.onreadystatechange = function () {
                    console.log(this.readyState);
                    if (this.readyState === 4) {
                        console.log(this);
                        var response4 = JSON.parse(this.responseText)[0];
                        console.log(response4);
                        if(response4.pageFunctionResult === undefined){
                            has_result = false;
                            console.log("No page func");
                        }
                        else
                        {
                            has_result = true;
                            result = response4.pageFunctionResult;
                            console.log("Crawler Complete");
                        }
                        var divBody = '';
                        for(var i =0; i<5; i++) {
                            console.log("This "+result[i]);
                            divBody += '<div class="col-sm-12 col-md-12 col-lg-12 p-b-50">\n' +
                                '\t\t\t\t\t\t\t\t  <!-- Block2 -->\n' +
                                '\t\t\t\t\t\t\t\t  <div class="block2">\n' +
                                '\t\t\t\t\t\t\t\t\t<div class="block2-img wrap-pic-w of-hidden pos-relative block2-labelnew">\n' +
                                '\t\t\t\t\t\t\t\t\t  <img src="'+result[i]['pic']+'" alt="IMG-PRODUCT">\n' +
                                '\t\t\t\t\t\t\t\t\t  \n' +
                                '\t\t\t\t\t\t\t\t\t  <div class="block2-overlay trans-0-4">\n' +
                                '\t\t\t\t\t\t\t\t\t\t<a href="#" class="block2-btn-addwishlist hov-pointer trans-0-4">\n' +
                                '\t\t\t\t\t\t\t\t\t\t  <i class="icon-wishlist icon_heart_alt" aria-hidden="true"></i>\n' +
                                '\t\t\t\t\t\t\t\t\t\t  <i class="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>\n' +
                                '\t\t\t\t\t\t\t\t\t\t</a>\n' +
                                '\t\t\t\t\t\t\t\t\t  </div>\n' +
                                '\t\t\t\t\t\t\t\t\t</div>\n' +
                                '\t\t\t\t\t\t\t\t\t<div class="block2-txt p-t-20">\n' +
                                '\t\t\t\t\t\t\t\t\t  <a href="'+result[i]['link']+'" class="block2-name dis-block s-text3 p-b-5">\n' +
                                '\t\t\t\t\t\t\t\t\t\t' + result[i]['product_name'] +
                                '\t\t\t\t\t\t\t\t\t  </a>\n' +
                                '\t\t\t\t\t\t\t\t\t  <span class="block2-price m-text6 p-r-5">\'\n' +
                                '\t\t\t\t\t\t\t\t\t\t\n' + result[i]['price'] +
                                '\t\t\t\t\t\t\t\t\t  </span>\n' +
                                '\t\t\t\t\t\t\t\t\t</div>\n' +
                                '\t\t\t\t\t\t\t\t  </div>\n' +
                                '\t\t\t\t\t\t\t\t</div>';
                        }
                        var div = document.getElementById("qoo10Products");
                        div.innerHTML = divBody;
                    }
                };
                //if(has_result)
                //{
                //    break;
                //}
                console.log("Sending request 4");
                request4.send();
                wait(2000);
            //}
            
            console.log(result);
        }
    };
    request2.send();
}
