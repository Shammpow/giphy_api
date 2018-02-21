var animals = ["cats", "dogs", "birds"]



// This calls the data from the API
function displayAnimalGifs() {
    $("#giphy-view").empty();  

    var animal = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?" + "api_key=c0C2JonSEtMJVQMWbDj0Y3qUMe2D1Q4F" + "&q=" + animal + "&limit=10"


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#giphy-view").append('<div id="giphyJson">')
        console.log(response);
        for (i = 0; i < 10; i++) {
            var imgTag = $('<img>')
            $(imgTag).addClass('gif');
            $("#giphyJson").append(imgTag);
            var stillImg = response.data[i].images.fixed_height_still.url
            var animateImg = response.data[i].images.fixed_height.url
            $(imgTag).attr('data-state', 'still');
            $(imgTag).attr('src', stillImg);
            $(imgTag).attr('data-still', stillImg);
            $(imgTag).attr('data-animate', animateImg);
            var ratingDiv = $("<div>");
            $("#giphyJson").append(ratingDiv);
            $(ratingDiv).append("Rating: " + response.data[i].rating);
        }
    })

}

// This adds animals to the buttons already established
$("#add-animal").on('click', function (event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();

    animals.push(animal);
    renderButtons();
})

// This puts the buttons on the page. Isn't called yet
function renderButtons() {
    $("#buttons-view").empty();

    for (var i = 0; i < animals.length; i++) {
        var button = $("<button>");

        button.addClass("animal");
        button.attr("data-name", animals[i]);
        button.text(animals[i]);
        $("#buttons-view").append(button);
    }

}
// When a button is clicked, calls the data from the named function
$(document).on("click", ".animal", displayAnimalGifs);

renderButtons();

// This format allows elements created after the page load to still be clicked
$(document).on("click", ".gif", function () {
    var state = $(this).attr('data-state')

    if (state === 'still') {
        var animate = $(this).attr('data-animate')
        $(this).attr('src', animate)
        $(this).attr('data-state', 'animate')
    }

    else {
        var static = $(this).attr('data-still')
        $(this).attr('src', static)
        $(this).attr('data-state', 'still')
    }
})