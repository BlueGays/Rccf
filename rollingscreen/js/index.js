function dosome(callback){


//配置
var config = {
	'audio':{
		'icon':'audio-record-play',
		'text':true
	},
	'loading': 'loading-ic'
};

//loading
window.onload = function(){
	$('#loading').hide();
};

//分享

$('#js-btn-share').bind('tap',function(){
	$('#js-share').show();
});
$('#js-share').bind('tap',function(){
	$(this).hide();
});


var pageIndex = 1,
	pageTotal = $('.page').length,
	towards = { up:1, right:2, down:3, left:4},
	isAnimating = false;

//禁用手机默认的触屏滚动行为
document.addEventListener('touchmove',
	function(event){event.preventDefault();},
	false);



$(document).swipeUp(function(){
	if (isAnimating) return;
	if (pageIndex < pageTotal) { 
		pageIndex+=1; 
	}else{
		pageIndex=1;
	};
	pageMove(towards.up,callback);
})

$(document).swipeDown(function(){
	if (isAnimating) return;
	if (pageIndex > 1) { 
		pageIndex-=1; 
	}else{
		pageIndex=pageTotal;
	};
	pageMove(towards.down,callback);
});

function pageMove(tw,callback){
	var lastPage;
	if(tw=='1'){
		if(pageIndex==1){
			lastPage = ".page-"+pageTotal;
		}else{
			lastPage = ".page-"+(pageIndex-1);
		}
		
	}else if(tw=='3'){
		if(pageIndex==pageTotal){
			lastPage = ".page-1";
		}else{
			lastPage = ".page-"+(pageIndex+1);
		}
		
	}

	var nowPage = ".page-"+pageIndex;
    callback(nowPage);
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function(){
		$(lastPage).removeClass('page-current');
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find("img").addClass("hide");
		
		$(nowPage).addClass('page-current');
		$(nowPage).removeClass(inClass);
		$(nowPage).find("img").removeClass("hide");
		
		isAnimating = false;
	},600);
}

};

function autoType(elementClass, typingSpeed){
    var thhis = $(elementClass);
    thhis.css({
        "position": "relative",
        "display": "inline-block"
    });
    thhis.prepend('<div class="cursor" style="right: initial; left:0;"></div>');
    thhis = thhis.find(".text-js");
    var text = thhis.text().trim().split('');
    var amntOfChars = text.length;
    var newString = "";
    thhis.text("|");
    setTimeout(function(){
        thhis.css("opacity",1);
        thhis.prev().removeAttr("style");
        thhis.text("");
        for(var i = 0; i < amntOfChars; i++){
            (function(i,char){
                setTimeout(function() {
                    newString += char;
                    thhis.text(newString);
                },i*typingSpeed);
            })(i+1,text[i]);
        }
    },1500);
}
$(document).ready(function(){
    // Now to start autoTyping just call the autoType function with the
    // class of outer div
    // The second paramter is the speed between each letter is typed.
    autoType(".type-js",200);


});