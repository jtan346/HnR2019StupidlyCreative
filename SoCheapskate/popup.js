console.log("hello");

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$(document).ready(function(){
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            var csrfToken = getCookie('csrftoken');
            xhr.setRequestHeader("X-CSRFToken", csrfToken);
        }
    });

});

var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
})();
console.log(urlParams);

/* $('.selection-1').select2({
    minimumResultsForSearch: 20,
    dropdownParent: $('#dropDownSelect1')
});

$('.selection-2').select2({
    minimumResultsForSearch: 20,
    dropdownParent: $('#dropDownSelect2')
}); */

$('.block2-btn-addcart').each(function(){
    var nameProduct = $(this).parent().parent().parent().find('.block2-name').html();
    $(this).on('click', function(){
        swal(nameProduct, "is added to cart !", "success");
    });
});

$('.block2-btn-addwishlist').each(function(){
    var nameProduct = $(this).parent().parent().parent().find('.block2-name').html();
    $(this).on('click', function(){
        swal(nameProduct, "is added to wishlist !", "success");
    });
});



qoo10NewRequest("Samsung TV");

function qoo10NewRequest(term) {

    //Update Crawler
    console.log("Update Crawler");
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
    console.log("Start Execution");
    var request2 = new XMLHttpRequest();

    request2.open('POST', 'https://api.apify.com/v1/mx3s7bQeyNdaayHJ5/crawlers/PbYnSfEiHWBi8GKe6/execute?token=KcTduuesmZXxCdDY3jtT7ZEB6');

    request2.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log('Start Execution Status:', this.status);
            //Check Execution Status
            console.log("Check Execution");
            while (true) {
                $.ajax({
                    type: "GET",
                    url: "https://api.apify.com/v1/hNNQbYhnwafECWc8f/crawlers/CwNxxSNdBYw7NWLjb/lastExec?token=rWLaYmvZeK55uatRrZib4xbZs",
                    success: function (data) {
                        console.log(data['status']);
                        if (data['status'] == "SUCCEEDED")
                            break;
                    },
                    error: function (data, status, jqxhr) {
                        console.log(data);
                    }
                });
            }
            $.ajax({
                type: "GET",
                url: "https://api.apify.com/v1/hNNQbYhnwafECWc8f/crawlers/CwNxxSNdBYw7NWLjb/lastExec?token=rWLaYmvZeK55uatRrZib4xbZs",
                success:function(data)
                {
                    console.log("Get Execution Result");
                    var request4 = new XMLHttpRequest();

                    request4.open('GET', 'https://api.apify.com/v1/mx3s7bQeyNdaayHJ5/crawlers/PbYnSfEiHWBi8GKe6/lastExec/results?token=AHkv4ng7bikCLR3wrMtD4Xbd9');

                    request4.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            console.log('Status:', this.status);
                            console.log('Headers:', this.getAllResponseHeaders());
                            console.log('Body:', this.responseText);

                            if(this.responsText.length > 0){
                                data = this.responseText["pageFunctionResult"];
                                var divBody = '';
                                for(var i =0; i<5; i++) {
                                    divBody += '<div class="col-sm-12 col-md-12 col-lg-12 p-b-50">\n' +
                                        '\t\t\t\t\t\t\t\t  <!-- Block2 -->\n' +
                                        '\t\t\t\t\t\t\t\t  <div class="block2">\n' +
                                        '\t\t\t\t\t\t\t\t\t<div class="block2-img wrap-pic-w of-hidden pos-relative block2-labelnew">\n' +
                                        '\t\t\t\t\t\t\t\t\t  <img src="static/images/item-02.jpg" alt="IMG-PRODUCT">\n' +
                                        '\t\t\t\t\t\t\t\t\t  \n' +
                                        '\t\t\t\t\t\t\t\t\t  <div class="block2-overlay trans-0-4">\n' +
                                        '\t\t\t\t\t\t\t\t\t\t<a href="#" class="block2-btn-addwishlist hov-pointer trans-0-4">\n' +
                                        '\t\t\t\t\t\t\t\t\t\t  <i class="icon-wishlist icon_heart_alt" aria-hidden="true"></i>\n' +
                                        '\t\t\t\t\t\t\t\t\t\t  <i class="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>\n' +
                                        '\t\t\t\t\t\t\t\t\t\t</a>\n' +
                                        '\t\t\t\t\t\t\t\t\t  </div>\n' +
                                        '\t\t\t\t\t\t\t\t\t</div>\n' +
                                        '\t\t\t\t\t\t\t\t\t<div class="block2-txt p-t-20">\n' +
                                        '\t\t\t\t\t\t\t\t\t  <a href="product-detail.html" class="block2-name dis-block s-text3 p-b-5">\n' +
                                        '\t\t\t\t\t\t\t\t\t\t' + data[i]["product_name"] +
                                        '\t\t\t\t\t\t\t\t\t  </a>\n' +
                                        '\t\t\t\t\t\t\t\t\t  <span class="block2-price m-text6 p-r-5">\'\n' +
                                        '\t\t\t\t\t\t\t\t\t\t\n' + data[i]["price"] +
                                        '\t\t\t\t\t\t\t\t\t  </span>\n' +
                                        '\t\t\t\t\t\t\t\t\t</div>\n' +
                                        '\t\t\t\t\t\t\t\t  </div>\n' +
                                        '\t\t\t\t\t\t\t\t</div>';
                                }
                                var div = document.getElementById("qoo10Products");
                                div.innerHTML = divBody;
                            }
                        }
                    };
                    request4.send();
                },
                error: function(data, status, jqxhr)
                {
                    console.log(data);
                }
            });
        }
    };
    request2.send();
}

//delay function
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}
