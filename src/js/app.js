$(function () {

    var numberOfElements = 20;
    var elementsInRow = 5;
    var elements = [];
    var pickedElements = [];
    var numberOfMoves = 0;
    var canPick = true;
    var imgOfElments = [];



    function startGame() {

        var board = $('.board').empty();

        elements = [];
        pickedElements = [];
        numberOfMoves = 0;
        canPick = true;

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
        
        wynik: pętle, która dla i = 0,1,2,3,4,5,6,...,17,18,19,20
        stworzy nam tablicę elements = [0,0,1,1,2,2,3,3,...,8,9,9] 
        */

        for (i = numberOfElements - 1; i < 0; i--) {
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
        elemens[swap] = tmp;
        */
        /* Wstawiamy kafelki na planszę */

        for (i = 0; i < numberOfElements; i++) {
            var tile = $('<div class="tile"></div>');
            board.append(tile);
        } 
    }
    $(document).ready(function() {
        var button = $('.start');
        button.click(function(){
            startGame();
        });
    })
    





});