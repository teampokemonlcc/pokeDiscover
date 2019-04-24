/* global $pokedexContent */
/* global $formTarget     */
/* global $theImg         */

$(function () {
    var num = 0;
    $theImg = $("#theImg");
    $contentBox = $("#content-box");
    $content = $("#content");
    $contentBox.hide();
    $pokedexContent = null;
    $formTarget = $("#formTarget");
    $.getJSON("resources/pokedex.json", function (result) {
        $pokedexContent = result;
    }).done(function () {
        $pokedexContent = $.map($pokedexContent, function (obj) {
            obj.text = `${obj.id} | ${obj.name.english} | ${obj.type}`;
            return obj;
        });
        function name_format(item) {
            if (item.image == null) {
                return null;
            }
            var full_name = $('<span class="my_class"> <img src=\'resources/sprites/' + item.image + '\'/>' + item.text + '</span>');
            return full_name;
        }

        $formTarget.select2({
            data: $pokedexContent,
            templateResult: name_format,
            theme: 'bootstrap4',
            placeholder: "Name, type, or ID"
        });
    });



    $formTarget.on("change", function () {
        for (var i = 0; i < $pokedexContent.length; i++) {
            if ($pokedexContent[i].id == this.value) {
                num = i;
                if ($contentBox.is(":hidden")) {
                    refreshContent(num);
                    $contentBox.fadeIn(500);
                } else {
                    $(".refreshable").fadeOut(500, function () {
                        refreshContent(num);
                    }).delay(250);
                    $(".refreshable").fadeIn();
                }
            }
        }
        function refreshContent(itemNum) {
            $theImg.attr('src', `resources/images/${$pokedexContent[itemNum].image}`);
            document.getElementById('health').textContent = $pokedexContent[itemNum].base.HP;
            document.getElementById('attack').textContent = $pokedexContent[itemNum].base.Attack;
            document.getElementById('defense').textContent = $pokedexContent[itemNum].base.Defense;
            document.getElementById('sp-atk').textContent = $pokedexContent[itemNum].base["Sp. Attack"];
            document.getElementById('sp-def').textContent = $pokedexContent[itemNum].base["Sp. Defense"];
            document.getElementById('speed').textContent = $pokedexContent[itemNum].base.Speed;
        }
    });
});