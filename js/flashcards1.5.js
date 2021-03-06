
//make sure that the page doesn't zoom
$(document).bind( "mobileinit", function(event) {
    $.extend($.mobile.zoom, {locked:true,enabled:false});
});


//check to see if the application has switched pages
$( window ).hashchange(function() {
	//alert("page has changed");
	checkMyStorage();
	docheck();
});

//use cookies for now
function createCookie(name, value, expires, path, domain) {
  var cookie = name + "=" + escape(value) + ";";
 
  if (expires) {
    // If it's a date
    if(expires instanceof Date) {
      // If it isn't a valid date
      if (isNaN(expires.getTime()))
       expires = new Date();
    }
    else
      expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);
 
    cookie += "expires=" + expires.toGMTString() + ";";
  }
 
  if (path)
    cookie += "path=" + path + ";";
  if (domain)
    cookie += "domain=" + domain + ";";
 
  document.cookie = cookie;
}

//get the cookie
function getCookie(name) {
  var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
  var result = regexp.exec(document.cookie);
  return (result === null) ? null : result[1];
}

//delete the cookie
function deleteCookie(name, path, domain) {
  // If the cookie exists
  if (getCookie(name))
    createCookie(name, "", -1, path, domain);
}

//check the storage for saved data
function checkMyStorage(){
	//new check if there is a cookie saved
	if (getCookie("website")){
		saved = unescape(getCookie("website"));
		rewrite = JSON.parse(saved);
		ex = String(rewrite.excluded);
		savedExcludes = ex.split(",");//uncheck these items in the list
		cus = String(rewrite.custom);
		savedWords = cus.split(",");
	}
}

//things to do after the DOM loads
$( document ).ready(function() {

	content = unescape(getCookie("website"));
	
	savedExcludes = new Array();
	savedWords = new Array();
	switchArr = new Array();
	
	//check to see if there is stored data
	checkMyStorage();
	
	if($("#slider2").val() == "off"){
		$(".wordlist1g").addClass("ui-state-disabled");
	}
	if($("#slider3").val() == "on"){
		$(".wordlist2g").removeClass("ui-state-disabled");
	}
	if($("#slider3a").val() == "on"){
		$(".wordlist2gb").removeClass("ui-state-disabled");
	}
	if($("#slider4").val() == "on"){
		$(".wordlist1b").removeClass("ui-state-disabled");
	}
	if($("#slider5").val() == "on"){
		$(".mywordlist").removeClass("ui-state-disabled");
	}
	
	//decks of words
	var Deck1G = new Array("a", "all", "am", "an", "and", "are", "at", "be", "big", "can", "can't", "come", "do", "down", "for", "get", "go", "had", "has", "have", "he", "here", "I", "in", "is", "it", "like", "little", "live", "look", "lots", "love", "me", "my", "no", "of", "on", "one", "said", "see", "she", "that", "the", "there", "they", "this", "to", "up", "want", "was", "we", "went", "what", "where", "who", "why", "will", "with", "yes", "you");
	
	var Deck2G = new Array("about", "animal", "as", "beside", "boy", "but", "by", "came", "could", "day", "did", "does", "eat"," from", "fun", "gave", "girl", "give", "goes", "going", "good", "got", "happy", "her", "him", "his", "home", "house", "how", "if", "into", "jump", "make", "many", "new", "not"," now", "off", "oh", "or", "our", "out", "over", "play", "put", "ran", "saw", "some", "stop", "take", "them", "then", "these", "too", "under", "were", "when", "would", "your");
	
	var Deck2GB = new Array("two", "six", "five", "nine", "one", "seven", "four", "ten", "eight", "three", "triangle", "rectangle", "square", "circle", "Saturday", "Wednesday", "Sunday", "Thursday", "Monday", "Friday", "Tuesday", "around", "through", "across", "outside", "mom", "mommy", "mother", "dad", "daddy", "father", "sister", "brother", "aunt", "uncle","grandmother", "grandfather", "baby", "family", "can't", "don't", "won't", "didn't", "wasn't", "aren't", "couldn't", "shouldn't", "wouldn't", "she's", "he's", "it's", "I'll", "I'm", "you're", "they're", "red", "yellow", "pink", "green", "purple", "orange", "blue", "black", "white", "brown", "gray");
	
	var Deck1B = new Array("after", "again", "always", "another", "any", "away", "beautiful", "because", "become", "before", "begin", "birthday", "both", "buy", "catch", "color", "count", "every", "fight", "find", "first", "found", "friend", "full", "funny", "hello", "help", "know", "laugh", "light", "long", "might", "much", "myself", "never", "night", "old", "only", "other", "own", "party", "people", "please", "pretty", "pull", "read", "right", "school", "something", "surprise", "their", "those", "today", "very", "walk", "which", "whose", "word", "write");

	
	//build out the word cards 
	$("#1GWords_display .words").append("<p></p>");
	var IGwords = "";
	$.each(Deck1G, function( i, val ) {//show first card
		IGwords += "<input name='checkbox-h-"+i+"' id='checkbox-h-"+i+"' class='"+val+"' type='checkbox' checked='checked'><label for='checkbox-h-"+i+"'>"+val+"</label>";
	});
	$(".wordlist1gbutton").click(function(){
		if($("#1GWords_display .words").html() === "<p></p>"){
			var newSet = "<form><fieldset data-role='controlgroup' class='cbGroup' data-iconpos='right'></fieldset></form>"
			$("#1GWords_display .words").append(newSet);
			$(".cbGroup").append(IGwords).trigger('create');
			docheck();//make sure that they get updated.
		}	
	});
	//

	$("#2GWords_display .words").append("<p></p>");
	var IIGwords = "";
	$.each(Deck2G, function( i, val ) {//show first card
	IIGwords += "<input name='checkbox-h-"+i+"' id='checkbox-h-"+i+"' class='"+val+"' type='checkbox' checked='checked'><label for='checkbox-h-"+i+"'>"+val+"</label>";
	}); 
	$(".wordlist2gbutton").click(function(){
		if($("#2GWords_display .words").html() === "<p></p>"){
			var newSet2 = "<form><fieldset data-role='controlgroup' class='cbGroup2' data-iconpos='right'></fieldset></form>"
			$("#2GWords_display .words").append(newSet2);
			$(".cbGroup2").append(IIGwords).trigger('create');
			docheck();//make sure that they get updated.
		}	
	});	
	
	$("#2GBWords_display .words").append("<p></p>");
	var IIGBwords = "";
	$.each(Deck2GB, function( i, val ) {//show first card
	IIGBwords += "<input name='checkbox-h-"+i+"' id='checkbox-h-"+i+"' class='"+val+"' type='checkbox' checked='checked'><label for='checkbox-h-"+i+"'>"+val+"</label>";
	}); 
	$(".wordlist2gbbutton").click(function(){
		if($("#2GBWords_display .words").html() === "<p></p>"){
			var newSet3 = "<form><fieldset data-role='controlgroup' class='cbGroup3' data-iconpos='right'></fieldset></form>"
			$("#2GBWords_display .words").append(newSet3);
			$(".cbGroup3").append(IIGBwords).trigger('create');
			docheck();//make sure that they get updated.
		}	
	});	

	$("#1BWords_display .words").append("<p></p>");
	var IIBwords = "";
	$.each(Deck1B, function( i, val ) {//show first card
	IIBwords += "<input name='checkbox-h-"+i+"' id='checkbox-h-"+i+"' class='"+val+"' type='checkbox' checked='checked'><label for='checkbox-h-"+i+"'>"+val+"</label>";
	});
	$(".wordlist1bbutton").click(function(){
	//NEED TO DETERMINE IF ITS ALREADY ADDED.
	//alert($("#1BWords_display").html());
		//if($("#1BWords_display").html() == '<h4 class="wordlist1bbutton">Edit Words</h4>'){
			var newSet4 = "<form><fieldset data-role='controlgroup' class='cbGroup4' data-iconpos='right'></fieldset></form>"
			$("#1BWords_display .ui-collapsible-content").append(newSet4);
			$(".cbGroup4").append(IIBwords).trigger('create');
			docheck();//make sure that they get updated.
		//}	
	});		
	
	docheck();
	
	//do each instead to wrap in a checkbox
	//create a left out word array to remove words that are not checked. 
	testvar = "";
	
	//create a list of items to be excluded if unchecked.
	//$("body input[type='checkbox']").click(function() {
	$('body').on("click", "input[type='checkbox']", function() {
		alert("hey");
		selected = this.getAttribute("class");
		check = jQuery.inArray(selected,savedExcludes);
		if(check != -1){
			//alert("found");
			index = jQuery.inArray(selected,savedExcludes);
			savedExcludes.splice(index , 1);
		}else{
			savedExcludes.push(selected);
		}
		
		//reset the deck if thie happens while in use. 
		$("#cards").hide();
		$("#begin").show();//this should reshuffle the deck
		$(".introtext").show();
		$("#head h1").html("Home");
		$(".ui-li-count").html("");
		$("#next").addClass("ui-state-disabled");
		$("#prev").addClass("ui-state-disabled");
		$(".shuffle").addClass("ui-state-disabled");
		$("#settings").addClass("ui-state-disabled");
	});
	
	$("#next").addClass("ui-state-disabled");
	$("#prev").addClass("ui-state-disabled");
	$(".shuffle").addClass("ui-state-disabled");
	$("#settings").addClass("ui-state-disabled");
	
	/*http://sedition.com/perl/javascript-fy.html*/
	function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
	    var j = Math.floor(Math.random() * (i + 1));
	    var temp = array[i];
	    array[i] = array[j];
	    array[j] = temp;
	}
	return array;
	}	
	


$( "#begin" ).click(function() {
	//determine which toggles are selected
	//checkMyStorage();
	mydeck = new Array();
	
	$("#head h1").html("Sets - ");
	if($("#slider2").val() == "on"){
		mydeck = mydeck.concat(Deck1G); 
		$("#head h1").append(" 1G");
	}
	if($("#slider3").val() == "on"){
		mydeck = mydeck.concat(Deck2G);
		$("#head h1").append(" 2G");
	}
	if($("#slider3a").val() == "on"){
		mydeck = mydeck.concat(Deck2GB);
		$("#head h1").append(" 2GB");
	}
	if($("#slider4").val() == "on"){
		mydeck = mydeck.concat(Deck1B);
		$("#head h1").append(" 1B");
	}
	if($("#slider5").val() == "on"){
		savedWords = savedWords.filter(function(n){return n});
		mydeck = mydeck.concat(savedWords);
		$("#head h1").append(" Custom");
	}
	
	options = "";
	$('.excludes').html("<h3>Excluded Words</h3>");
	//now check to see if any words have been unchecked if so go through and remove them from the main array. 
	$.each(savedExcludes, function( i, val ) {//build the deck
		index = mydeck.indexOf(val);
		
		if (index > -1) {
			mydeck.splice(index, 1);
			options += "<li><a href='#' class='ui-btn-active ui-btn ui-mini ui-shadow ui-corner-all'>" + val + "</a></li>";
		}
	});
	$('.excludes').append("<ol>" + options + "</ol>");
	
	//display the custom words deck
	options = "";
	$(".custom").html("<h3>Custom Words</h3>");
	$.each(savedWords, function( i, val ) {
		if(val != ""){//if its not empty
			options += "<li><a href='#' class='ui-btn-active ui-btn ui-mini ui-shadow ui-corner-all'>"+ val + "</a></li>";
		}
	});
	$('.custom').append("<ol>" + options + "</ol>");
	
	options = "";
	$('.debug').html("<h3>Included Words</h3>");
	$.each(mydeck, function( i, val ) {
		options += "<li><a href='#' class='ui-btn-active ui-btn ui-mini ui-shadow ui-corner-all'>" + val + "</a></li>";
	});
	$('.debug').append("<ol>"+ options +"</ol>");
	
	decklength = mydeck.length;
	startkey = mydeck.length - 1;
	
	//need to add a save state to the settings. 
	
	shuffleArray(mydeck);//shuffle deck
	
	var mycards = "";
	$.each(mydeck, function( i, val ) {//build the deck
		$("#cards ul").html("");
		if(i == (decklength-1)){
			mycards += "<li class='card"+i+" shadow' style='z-index:"+i+"'>"+val+"<span></span></li>";
		}else{
			mycards += "<li class='card"+i+" shadow' style='z-index:"+i+";display:none'>"+val+"<span></span></li>";
		}
	});
	$(".ui-li-count").html("<div class='currentcount'>1 / " + decklength + "</div>");//create a starter total
	$("#cards ul").append(mycards);
	$("#cards").css("display","block");//show the cards
	$("#begin").hide();//hide begin button
	$(".introtext").hide();//hide the intro text
	
	//enable next button
	$("#next").removeClass("ui-state-disabled");
	$(".shuffle").removeClass("ui-state-disabled");
	$("#settings").removeClass("ui-state-disabled");
});

$( "#shuffle" ).click(function() {
shuffleArray(mydeck);//shuffle deck
$("#cards").hide('fast');
$("#cards").show('fast');
var mycards = "";
$.each(mydeck, function( i, val ) {//show first card
	$("#cards ul").html("");
	if(i == (decklength-1)){
		mycards += "<li class='card"+i+" shadow' style='z-index:"+i+"'>"+val+"<span></span></li>";
	}else{
		mycards += "<li class='card"+i+" shadow' style='z-index:"+i+";display:none'>"+val+"<span></span></li>";
	}
});

//now check to see if any words have been unchecked if so go through and remove them from the main array. 
$.each(savedExcludes, function( i, val ) {//build the deck
	index = mydeck.indexOf(val);
	//alert(val);
	if (index > -1) {
		mydeck.splice(index, 1);
	}
});

$(".ui-li-count").html("<div class='currentcount'>1 / " + decklength + "</div>");//create a starter total
	decklength = mydeck.length;
	startkey = mydeck.length - 1;
	$("#cards ul").append(mycards);
	$("#prev").addClass("ui-state-disabled");
});

$( "#prev" ).click(function() {
$("#next").removeClass("ui-state-disabled");//clear out the disabled state if they click prev

//check if the button should be disabled
if(Number(decklength - (startkey + 1)) == 1){
	$("#prev").addClass("ui-state-disabled");
}

$("#cards .card" + (startkey + 1)).slideDown( "slow", function() {
// Animation complete.
});

if(Number(decklength - (startkey + 1)) != 0){
	$(".ui-li-count").html("<div class='currentcount'>" + Number(decklength - (startkey + 1)) + " / " + decklength + "</div>");
	startkey ++;
	$("#cards .card" + (startkey - 1)).hide('slow');
}else{
	alert("you are at the beginning");
}
});

//mobile swipes
$(window).on( "swiperight", function( event ) {
	$("#next").removeClass("ui-state-disabled");//clear out the disabled state if they click prev
	//check if the button should be disabled
	if(Number(decklength - (startkey + 1)) == 1){
		$("#prev").addClass("ui-state-disabled");
	}
	
	$("#cards .card" + (startkey + 1)).slideDown( "slow", function() {
	// Animation complete.
	});

	
	if(Number(decklength - (startkey + 1)) != 0){
		
		$(".ui-li-count").html("<div class='currentcount'>" + Number(decklength - (startkey + 1)) + " / " + decklength + "</div>");
		startkey ++;
		$("#cards .card" + (startkey - 1)).hide('slow');
	}
});


$( "#next" ).click(function() {
	$("#prev").removeClass("ui-state-disabled");//clear out the disabled state if they click next
	//check if the button should be disabled
	if(Number(decklength - (startkey - 1)) == decklength){
		$("#next").addClass("ui-state-disabled");
	}
	if(Number(decklength - (startkey - 1)) <= decklength){//make sure that we don't go over the end. 
		$("#cards .card" + startkey).slideUp("slow", function(){	
		});
	}
	//if(startkey != 0){
	if(Number(decklength - (startkey - 1)) <= decklength){
		$(".ui-li-count").html("<div class='currentcount'>" + Number(decklength - (startkey - 1)) + " / " + decklength + "</div>");
		startkey --;
		$("#cards .card" + startkey).show('fast');
	}else{
		alert("you are at the end - ");//create a fancier message here. 
	}
});

$(window).on( "swipeleft", function( event ) {
	$("#prev").removeClass("ui-state-disabled");//clear out the disabled state if they click next
	//check if the button should be disabled
	if(Number(decklength - (startkey - 1)) == decklength){
		$("#next").addClass("ui-state-disabled");
	}
	if(Number(decklength - (startkey - 1)) <= decklength){//make sure that we don't go over the end. 
		$("#cards .card" + startkey).slideUp("slow", function(){	
		});
	}
	//if(startkey != 0){
	if(Number(decklength - (startkey - 1)) <= decklength){
		$(".ui-li-count").html("<div class='currentcount'>" + Number(decklength - (startkey - 1)) + " / " + decklength + "</div>");
		startkey --;
		$("#cards .card" + startkey).show('fast');
	}
});

//reset if the options are toggled
$( "#slider2" ).change(function() {
	$("#cards").hide();
	$("#begin").show();
	$(".introtext").show();
	$("#head h1").html("Home");
	$(".ui-li-count").html("");
	$("#next").addClass("ui-state-disabled");
	$("#prev").addClass("ui-state-disabled");
	$(".shuffle").addClass("ui-state-disabled");
	$("#settings").addClass("ui-state-disabled");
	if($("#slider2").val() == "off"){
		$(".wordlist1g").addClass("ui-state-disabled");
	}else{
		$(".wordlist1g").removeClass("ui-state-disabled");
	}
});
$( "#slider3" ).change(function() {
	$("#cards").hide();
	$("#begin").show();
	$(".introtext").show();
	$("#head h1").html("Home");
	$(".ui-li-count").html("");
	$("#next").addClass("ui-state-disabled");
	$("#prev").addClass("ui-state-disabled");
	$(".shuffle").addClass("ui-state-disabled");
	$("#settings").addClass("ui-state-disabled");
	if($("#slider3").val() == "off"){
		$(".wordlist2g").addClass("ui-state-disabled");
	}else{
		$(".wordlist2g").removeClass("ui-state-disabled");
	}
});
$( "#slider3a" ).change(function() {
	$("#cards").hide();
	$("#begin").show();
	$(".introtext").show();
	$("#head h1").html("Home");
	$(".ui-li-count").html("");
	$("#next").addClass("ui-state-disabled");
	$("#prev").addClass("ui-state-disabled");
	$(".shuffle").addClass("ui-state-disabled");
	$("#settings").addClass("ui-state-disabled");
	if($("#slider3a").val() == "off"){
		$(".wordlist2gb").addClass("ui-state-disabled");
	}else{
		$(".wordlist2gb").removeClass("ui-state-disabled");
	}
});
$( "#slider4" ).change(function() {
	$("#cards").hide();
	$("#begin").show();
	$(".introtext").show();
	$("#head h1").html("Home");
	$(".ui-li-count").html("");
	$("#next").addClass("ui-state-disabled");
	$("#prev").addClass("ui-state-disabled");
	$(".shuffle").addClass("ui-state-disabled");
	$("#settings").addClass("ui-state-disabled");
	if($("#slider4").val() == "off"){
		$(".wordlist1b").addClass("ui-state-disabled");
	}else{
		$(".wordlist1b").removeClass("ui-state-disabled");
	}
});
$( "#slider5" ).change(function() {
	$("#cards").hide();
	$("#begin").show();
	$(".introtext").show();
	$("#head h1").html("Home");
	$(".ui-li-count").html("");
	$("#next").addClass("ui-state-disabled");
	$("#prev").addClass("ui-state-disabled");
	$(".shuffle").addClass("ui-state-disabled");
	$("#settings").addClass("ui-state-disabled");
	if($("#slider5").val() == "off"){
		$(".mywordlist").addClass("ui-state-disabled");
	}else{
		$(".mywordlist").removeClass("ui-state-disabled");
	}
});

function removeSavedWord(){
	//alert("test");/*Check here to figure out what is going on with the remove function*/
	//alert("clicked");
	selected = this.getAttribute("id");
	
	check = jQuery.inArray(selected,savedWords);
	if(check != -1){
		index = jQuery.inArray(selected,savedWords);
		savedWords.splice(index , 1);
	}
	$("#"+selected).hide();
}

$(".remove-custom").click(removeSavedWord);


function validateMyForm(){
	searchWord = $("#my-word").val()
	index = savedWords.indexOf(searchWord);
	if (index == -1) {
		if(searchWord == ""){
			$.mobile.changePage("#error2");
		}else{
			if(isNaN(searchWord)){
				savedWords.push($("#my-word").val());//add to array
				if($("#Myoptions .words").html() == "No Words Added"){
					var link = $("<a href='#' class='ui-btn ui-icon-delete ui-btn-icon-left remove-custom' id='"+$("#my-word").val()+"'>" + $("#my-word").val() + "</a>");
					$("#Myopt_display .words").append(link);
					link.click(removeSavedWord);//need to add click function after generation
				}else{
					var link = $("<a href='#' class='ui-btn ui-icon-delete ui-btn-icon-left remove-custom' id='"+$("#my-word").val()+"'>" + $("#my-word").val() + "</a>");
					$("#Myopt_display .words").append(link);
					link.click(removeSavedWord);//need to add click function after generation
				}
			}else{
				$.mobile.changePage("#error3");
			}
		}
	}else{
		$.mobile.changePage("#error1");
	}
}

$("#submit-1").click(function() {
	validateMyForm();
});

//changed to save to a cookie instead local db was flaky on iOS
$(".saveSettings").click(function(){
	var gameDetails = {
	   excluded: savedExcludes,
	   custom: savedWords
	};
	deets = JSON.stringify(gameDetails);//encode the saved data
	createCookie("website", deets, 30);
	//do the check moved to when switching pages
	//$.mobile.changePage("#diag");
	$("#saveDialog").popup("open");
	return true;
});
/*check to see if the data from the cookie is updated*/

function docheck(){
	//alert("check run");
	
	//check the checkboxes
	$.each(savedExcludes, function( i, val ) {//build the deck
		if(val != ""){
			$(".words").find("." + val).attr("checked",false);
		}
	});
	
	//add in the custom words
	buttondisp = "";//clear the button display 
	$("#Myopt_display .words").html("");//clear out the space
	$.each(savedWords, function( i, val ) {//build the deck
		if(val != ""){//if its not empty
			var mylink = "<a href='#' class='ui-btn ui-icon-delete ui-btn-icon-left remove-custom' id='"+val+"'>"+val+"</a>";
			$("#Myopt_display .words").append(mylink);
			//mylink.click(removeSavedWord);
			//$(".custom").append(i + " - " + val + "<br>");
			//$("#Myopt_display .words").append("cookie");
		}
	});
	//}
}

});