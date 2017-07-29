var topics = ["Tom Hardy", "Emma Stone", "Ryan Gosling", "James Franco", "Emily Blunt", "Amy Adams", "Leonardo DiCaprio", "Seth Rogen", "Amy Poehler", "Aubrey Plaza"];
var newActor;
var actorGif;
renderButtons();

$("body").on("click", "img", function() {
	var img = $(this);
	var state = img.attr("data-state");
	var still = img.attr("data-still");
	var animate = img.attr("data-animate");

	if (state === "still") {
        img.attr("src", animate);
        img.attr("data-state", "animate");
	} else {
		img.attr("src", still);
        img.attr("data-state", "still");
	}
});

$("body").on("click", "button", function() {
	$(".gifs").empty();
	var actor = $(this).attr("data-person");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + actor + "&api_key=dc6zaTOxFJmzC&rating=pg&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {
		var results = response.data;

		for (var i = 0; i < results.length; i++) {
			var gifDiv = $("<div class='col-md-4'>");			
			actorGif = $("<img>");
			actorGif.attr("src", results[i].images.fixed_height_still.url);
			actorGif.attr("data-still", results[i].images.fixed_height_still.url);
			actorGif.attr("data-animate", results[i].images.fixed_height.url);
			actorGif.attr("data-state", "still");
			var rating = results[i].rating;
			var ratingP = $("<p>").text("Rating: " + rating);
            gifDiv.append(actorGif);
            gifDiv.append(ratingP);
            $(".gifs").append(gifDiv);
		}
	});
});

$("#addActor").on("click", function(event) {
	event.preventDefault();
	newActor = $("#actorInput").val();
	topics.push(newActor);	
	renderButtons();
});

function renderButtons() {
	$(".actorButtons").empty();
	for (var i = 0; i < topics.length; i++) {
		var button = $("<button>");
		button.attr("type", "button");
		button.addClass("btn btn-primary actor");
		button.attr("data-person", topics[i]);
		button.text(topics[i]);
		$(".actorButtons").append(button);
	}
}