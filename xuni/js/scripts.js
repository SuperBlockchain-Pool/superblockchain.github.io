$(function () {
    
	//Text slider
	$('#text_slider').cycle({
		fx : 'fade',
		timeout: 4000,
		speed: 900,
		slides: '.slide'
	});
    
	//Countdown
	$("#countdown").countdown({
            until: someDate, 
            padZeroes: true,
            layout: $("#countdown").html()
	});
        
	//Submit Newsletter form to PHP file
	$("#form_newsletter").submit(function(event) {
	    
		//stop form from submitting normally
		event.preventDefault();

		//get some values from elements on the page:
		var $form = $( this );

		$("#form_newsletter button").attr("disabled", "disabled");

		//Send the data using post
		var posting = $.post( 'process_form.php', $form.serialize() );

		//Show result
		posting.done(function( data ) {

			$("#form_newsletter button").removeAttr('disabled');

			$("#form_newsletter_result").hide().html(data).fadeIn();
		});
	});
    
	//About us (Open / Close)
	$(".open_aboutus").click(function() {
		$("#about_us").removeClass('animated fadeOut').addClass('animated fadeIn').fadeIn();
	});

	$(".close_aboutus").click(function() {
		$("#about_us").removeClass('animated fadeIn').addClass('animated fadeOut').fadeOut();
	});
        
            
        
		
});

//Countdown for demo. Always add 18 days
//var someDate = new Date();
//var numberOfDaysToAdd = 365;
//someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 

//Countdown with real date
var someDate = new Date("June 04, 2021 23:59:59");
someDate.setDate(someDate.getDate()); 