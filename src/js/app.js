$(function () {

    var numberOfElements = 20;
    var elementsInRow = 5;
    var elements = [];
    var pickedElements = [];
    var numberOfMoves = 0;
    var canPick = true;
    var pairs = 0;
    var imgOfElments = [
        'img/astronaut.png',
        'img/diplodocus.png',
        'img/dracula.png',
        'img/elephant.png',
        'img/octopus.png',
        'img/sphinx.png',
        'img/spider.png',
        'img/whale.png',
        'img/wheat.png',
        'img/dolphin.png'
    ];

    function startGame() {

        var board = $('.board').empty();

        elements = [];
        pickedElements = [];
        numberOfMoves = 0;
        canPick = true;
        pairs = 0;

        for (i = 0; i < numberOfElements; i++) {
            elements.push(Math.floor(i / 2));
        }

        for (i = numberOfElements - 1; i > 0; i--) {
            var swap = Math.floor(Math.random() * i);
      
            var tmp = elements[i];
            elements[i] = elements[swap];
            elements[swap] = tmp;
        }

        /* Wstawiamy kafelki na planszę */

        for (i = 0; i < numberOfElements; i++) {
            var tile = $('<div class="tile"></div>');
            board.append(tile);

            tile.data('type', elements[i]);
            tile.data('index', i);

            tile.css({
                left: 5 + (tile.width() + 5) * (i % elementsInRow)
            });
            tile.css({
                top: 5 + (tile.height() + 5) * (Math.floor(i / elementsInRow))
            });

            tile.on('click', function () {
                tileClick($(this))
            });
        }
    }

    function tileClick(element) {
        if (canPick) {
            if (!pickedElements[0] || (pickedElements[0].data('index') != element.data('index'))) {
                pickedElements.push(element);
                element.css({
                    'background-image': 'url(' + imgOfElments[element.data('type')] + ')'
                })
            }
            if (pickedElements.length == 2) {
                canPick = false;
                if (pickedElements[0].data('type') == pickedElements[1].data('type')) {
                    window.setTimeout(function () {
                        removeTiles();
                    }, 500);
                } else {
                    window.setTimeout(function () {
                        resetTiles();
                    }, 500);
                }
                numberOfMoves++;
            }
        }
    }

    function removeTiles() {
        pickedElements[0].fadeOut(function () {
            $(this).remove();
        });
        pickedElements[1].fadeOut(function () {
            $(this).remove();

            pairs++;
            if (pairs >= numberOfElements / 2) {
                swal("Good job!", "Liczba ruchów: " + numberOfMoves, "success");
            }

            canPick = true;
            pickedElements = [];
        });
    }

    function resetTiles() {
        pickedElements[0].css({
            'background-image': ''
        })
        pickedElements[1].css({
            'background-image': ''
        })
        pickedElements = [];
        canPick = true;
    }

    $(document).ready(function () {
        var button = $('.start');
        button.click(function () {
            startGame();
        });
    })
});
