$(function(){

    //letiables
    let topics = ["Blush", "Uhhh", "WHAT", "Really", "Love you", "Grrr", "So Sad","FERDA", "Shut up", "hahaha", "slow clap"];        //Reaction Gifs~

    buttonmaker();
    clicker();

    //make sure you can add a button to the array
    $("#submit").click(function(){
        event.preventDefault();
        let userinput = $("#input").val().trim();
        topics.push(userinput);
        buttonmaker();
        clicker();
    });


     //on click for button get 10 gif from api prepend to page.
     function clicker(){
        $(".gifbtn").click(function (){
            let reaction = $(this).attr("data");
            let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reaction + "&api_key=W7wn2uQEFUvcoFXhvM1ihFkWagNgGuK7&limit=10";

            $.ajax({
                type: "POST",
                url: queryURL,
                method: "GET"
            })
                .then(function(response) {
                let output = response.data;
                console.log(output);
                for (let i = 0; i < output.length; i++) {
                    let gifDiv = $("<div>");
                    gifDiv.addClass("gifdiv");
                     let p = $("<p>").text("Title: " +  output[i].title + 
                                        "\n Source: " + output[i].source +
                                        "\n Rating: " + output[i].rating);
                    let reactiongif = $("<img>");
                    reactiongif.attr("src", output[i].images.fixed_height_small_still.url);
                    reactiongif.attr("status", "still");
                    reactiongif.attr("still", output[i].images.fixed_height_small_still.url);
                    reactiongif.attr("animate", output[i].images.fixed_height_small.url);
                    reactiongif.attr("class", "gif");
                    gifDiv.prepend(p);
                    gifDiv.prepend(reactiongif);
                    $("#gallery").prepend(gifDiv);
                }

                //pausibility
                $(".gif").click(function(){
                    let toggle = $(this).attr("status");
                    if (toggle === "still"){
                        let newsrc = $(this).attr("animate");
                        $(this).attr("src", newsrc);
                        $(this).attr("status", "activate");
                    }
                    else if (toggle === "activate"){
                        let newsrc = $(this).attr("still");
                        $(this).attr("src", newsrc);
                        $(this).attr("status", "still");
                    }
                    else {
                        alert("Something went wrong!");
                    }
                    });

                });
            }); 
    }


    

    //fuctions

    function buttonmaker() {
        $("#buttonholder").empty();
        //make buttons of topics w/ loop
        for(let i=0; i < topics.length; i++){
            //button element
            let newBtn = $("<button>");
            newBtn.attr("class", "gifbtn");
            newBtn.attr("data", topics[i]);
            newBtn.text(topics[i]);
            $("#buttonholder").append(newBtn);
        }
        $("#input").val("");
    }

});