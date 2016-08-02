$(document).ready(function(){
		
		$("#input_zip").val("");  											// resets the input_zip box
		
		setTimeout(function(){												// fades out the intro
			$("#intro").fadeOut(900);
		}, 2000);	
	
		setTimeout(function(){												// fades in the input bar and go button
			$("#interface").fadeIn(900);
		}, 3000);	
		
		$("#go_btn").click(function() {										// when the go-btn is clicked...
			notify("Processing ZIP Code Data...");							// activate the alert div
			processInput();													// scrub the user input into a csv
			setTimeout(														// wait a few seconds
				function() {
				    $("#summary_box").fadeIn(1000);							// fade in the summary box
				    setTimeout(												// wait a second
						function() {
						    $("#api_box").fadeIn(1000);						// fade in the api output box
						}, 1000);
				}, 3000);
			displayCleanInput();
			callApi();
		});																	// end of Go Button onclick function
	});																		// end of document.ready
	
	$(function() {																				// clicks the go_btn when you hit enter
	    $("#input_zip").keypress(function (e) {
	        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
	            $('#go_btn').click();
	            return false;
	        } else {
	            return true;
	        }
	    });
	});																							// end of enter key funtion
		
	
	function notify(message){																	// start the notify function
		$("#alert_msg").html(message);															// insert the message var into the html of the doc
		$("#notifications").attr("class", "alerts_on");											// set the class of the alerts div to on
		setTimeout(function(){																	// wait three seconds
			$('#notifications').attr("class", "alerts_off");									// and then turn the alerts div off
		}, 3000);
	}

	var input_clean = "";																		// define and clear the input_clean var
	function processInput(){
		input_clean = jQuery.trim($("#input_zip").val())										// grab the val of input_zip and trim off outer whitespace...
						 	//.match(/\b\d{5}/g)
							.replace(/\D+/g, " ")												// TESTING REMOVE A-Za-z chars!!!!!!
							.replace(/\b\d{4}\b/g, " ")
							.replace(/\b\d{3}\b/g, " ")
							.replace(/\b\d{2}\b/g, " ")
							.replace(/\b\d{1}\b/g, " ")
							.trim()
               			  	.replace(/\s+/g, ", ");												// then replace remaining whitespace with ", " and store it as input_clean...
	}	
	
	function displayCleanInput(){
		$("#output_span").html(input_clean);													// output input_clean in the output_span
	}
	
//	var zipCodes = $("#api_span")

    var tableBody = $("#table_body");
	var api_key = "js-xYoBB1cKfbKylJWFtUEazoEECdFTgtmNsKp3MBO2MyA8hxNLrrV0PzFsNkl4OHSg";		// set the api key
	function callApi(){
		$.ajax({
			url: 'https://www.zipcodeapi.com/rest/' + api_key + '/multi-info.json/' + input_clean + '/degrees',
			type: 'GET',
			dataType: "json",
			success: function(results){
				console.log('success', results);
				// alert("API Call Successful");
                $("#api_span").html("Look at that pretty table! :)");
                $("#table_body").empty();
                $.each(results, function(i, result){ 
                    // alert(result.city + ", " + result.state);
                    $("#table_body").append("<tr><td>" + result.state + "</td><td>" + result.city + "</td><td>" + result.zip_code + "</td></tr>");
                    });

			},
			error: function() {
				console.log('failure', 'somethings broke');
				alert('Error: https://www.zipcodeapi.com/rest/' + api_key + '/multi-info.json/' + input_clean + '/degrees');
			}
		});
   		
}
	
