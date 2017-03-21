$(document).ready(function() {
	var topics = [
		"burger", 
		"pasta", 
		"cake", 
		"doughnut", 
		"pizza", 
		"pie", 
		"steak"
		];

	function displayButtons() {
		$("#buttons-section").empty();
		for (var i = 0; i < topics.length; i++) {
			var button = $("<button>");
			button.attr("id", topics[i]);
			button.addClass("topic");
			button.text(topics[i]);
			$("#buttons-section").append(button);
		};
	};
	displayButtons();
	

	$("#add-topic").on("click", function(event) {
		event.preventDefault();
		if ($("#search-input").val() === "") {
			alert("Please enter a valid food item.")
        } else {
			var topic = $("#search-input").val().trim();
			$("#search-input").val("");
			topics.push(topic);
			displayButtons();
		};
	});

	$(document).on("click", ".topic", function() {
		var topic = $(this).attr("id");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=10&api_key=dc6zaTOxFJmzC";

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			var results = response.data;
			for (var i = 0; i < results.length; i++) {
				var gifDiv = $("<div>");
				var rating = results[i].rating;
				var p = $("<p>").text("Rating: " + rating);
				var image = $("<img>");
				image.addClass("gif")
				image.attr("src", results[i].images.fixed_height_still.url);
				image.attr("data-state", "still");
				image.attr("data-still", results[i].images.fixed_height_still.url);
				image.attr("data-animate", results[i].images.fixed_height.url);
				gifDiv.append(p);
				gifDiv.append(image);
				$("#gif-view").prepend(gifDiv);
			};
		});
	});

	$(document).on("click", ".gif", function() {
		var state = $(this).attr("data-state");
		if (state ==="still") {
			$(this).attr("src", $(this).attr("data-animate"));
			$(this).attr("data-state", "animate");
		} else {
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still");
		};
	});
});