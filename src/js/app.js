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
        /* 
        weź 0, wynik z Math.floor(0/2) = 0
        dodaj zero do tablicy elements
        weź 1, wynik z Math.floor(1/2) = 0
        dodaj zero do elements

        weź 2, wynik z Math.floor(2/2) = 1
        dodaj jeden do elements
        weź 3, wynik z Math.floor(3/2) = 1
        dodaj jeden do elements


        weź 4, wynik z Math.floor(4/2) = 2
        dodaj dwa do elements
        weź 5, wynik z Math.floor(5/2) = 2
        dodaj dwa do elements itd.... 
        
        wynik: pętla, która dla i = 0,1,2,3,4,5,6,...,17,18,19
        stworzy nam tablicę elements = [0,0,1,1,2,2,3,3,...,8,9,9] 
        */

        for (i = numberOfElements - 1; i > 0; i--) {
            var swap = Math.floor(Math.random() * i);
            /*
            Math.random() losuje liczbę z przedziału od 0 do 1
            Math.random() * i daje liczbę z przedziały od 0*i do 1*i, czyli od 0 do i
            */
            var tmp = elements[i];
            elements[i] = elements[swap];
            elements[swap] = tmp;
        }
        /*
        jak chcemy dwa elementy zamienić miejscami: elements[i] oraz elements[swap]
        to musimy miec jakiś tymczasowy koszyk gdzie przechowamy ta wartość bo bez tego elements[i] = elements[swap]
        spowduje, że na zawsze stracimy wartość która była w elements[i]
        dlatego tworzymy sobie koszyk tmp:
        var tmp = elements[i];
        a potem przenosimy wartości:
        elements[i] = elemenst[swap];
        ponieważ elemens[i] jest już zastapione przez wartość z elemens[swap]
        to  musimy naszą wartość wyjąć z koszyka 
        elements[swap] = tmp;
        */
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