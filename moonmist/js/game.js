/********************
Date: 2019-4-24
Author: Brian Goff
Class: CITW 165
Exercise: Project
********************/  
$.ajaxSetup({
    beforeSend: function(xhr){
        if (xhr.overrideMimeType) {
            xhr.overrideMimeType("application/json");
        }
    }
});

function loadJson() {
    $.getJSON('json/pokemon.json')
    .done(function(data) { prepareGame(data) })
    .fail(function() {$('#gameContainer').text("Sorry, Unable to load data at this time.")});
}

function prepareGame(data) {
    pokemon = data;
    input = $('#gameAnswer');
    reset();
}

function reset() {
    randomPokemon()
    $('#gameInfo').text(" ");
    $('#gameName').text(" ");
    $('#gameImage').attr("src",chosen.silhouette);
    $('#gameAnswer').show();
    $('#guess').show();
    $('#reset').hide();
    input.val("").focus();
}

function randomPokemon()
{
    var index = Math.floor((Math.random() * 5));
    chosen = pokemon.pokemon[index];
}

function guess() {
    
    var answer = input.val().trim();
    if (answer != "")
    {
        if (answer.toLowerCase() == chosen.name.toLowerCase())
        {
            $('#gameName').text(chosen.name);
            $('#gameInfo').text(chosen.description);
            $('#gameImage').hide().attr("src",chosen.image).fadeIn(200);
            $('#gameAnswer').hide();
            $('#guess').hide()
            $('#reset').show()
        }
        else
        {
            $('#gameInfo').text("Please try again. (DEV Hint: " + chosen.name + ")");
        }
    }
    input.val("").focus();
}

$('#gameAnswer').on('keypress',function(e) {
    if(e.which == 13) {
        guess();
    }
});



var chosen;
var pokemon;
var input;
loadJson();
