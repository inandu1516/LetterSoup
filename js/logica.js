$(document).ready(function(){

    var paraulesEntrades = [];
    var paraulesTrobades = [];
    var filas = 10;
    var cols = 20;

    var Sopa = {
        'grid': [],
        'init': function () {
            for (var x = 0; x < filas; x++) {
                Sopa.grid[x] = [];
                for (var y = 0; y < cols; y++) {
                    var unicode = Math.round(Math.random() * ((89 - 65)+1) + 65 );
                    Sopa.grid[x][y] = String.fromCharCode(unicode);
                }
            }
        },
        'printaGrid': function () {
            for (var i = 0; i < filas; i++) {
                $("table").append("<tr id='" + i + "'>");
                for (var j = 0; j < cols; j++) {
                    $("#"+i).append("<td>" + Sopa.grid[i][j] + "</td>");
                }
            }
        },
        'deleteGrid': function () {
            $("table").empty();
        },
        'afegirParaula': function (paraula){
            var ok = false;
            var llargada = paraula.length;
            var p_lletres = paraula.toUpperCase().split('');
            console.log(p_lletres);

            do {
                var x = Math.round(random(0,9));
                var y = Math.round(random(0,9));
                var z = Math.round(random(0,1));
                console.log("Random punt: ["+x+"]["+y+"]" );
                console.log("llargada: " + llargada);
                console.log("z: " + z);
                if (z) {
                    if ((filas - y) >= llargada) {                     //afegim paraula horitzontal
                        ok = true;
                        var c = 0;
                        for (var k = y; k < y + llargada; k++) {
                            console.log("[" + x + "][" + k + "]");
                            Sopa.grid[x][k] = "<b>" +  p_lletres[c] + "</b>";
                            c++;
                        }
                    }
                } else {
                    if ((filas - x) >= llargada) {                    //afegim paraula vertical
                        ok = true;
                        var q = 0;
                        for (var p = x; p < x + llargada; p++) {
                            console.log("[" + p + "][" + y + "]");
                            Sopa.grid[p][y] = "<b>" + p + "</b>";
                            Sopa.grid[p][y] = "<b>" +  p_lletres[q] + "</b>";
                            q++;
                        }
                    }
                }
            }while(ok == false);
        }
    };

    $("table").hide();
    $("#llista").hide();

    Sopa.init();

    $("#start").click(function(){
        Sopa.printaGrid();
        $("td").click(tdSelect);
        $("table").fadeIn(1500);
        llistarEntrades();
        $("#llista").fadeIn(3000);
    });

    $("#entra").click(function (){
        var $entrada = $("#entrada");
        var paraula = $entrada.val();
        $entrada.val('');
        $entrada.attr('placeholder', 'ok, següent paraula');
        paraulesEntrades.push(paraula.toUpperCase());
        Sopa.afegirParaula(paraula);
        console.log("paraulesEntrades: " + paraulesEntrades);
    });

    function tdSelect(){
        $(this).toggleClass("selected");
        var lletres = $(".selected").text();
        console.log("\n" + lletres + "\n");
        $("#paraula").text(lletres);

        for (var i = 0; i < paraulesEntrades.length; i++){
            console.log("paraulesEntrades["+i+"]: " + paraulesEntrades[i]);
            if($("#paraula").text() == paraulesEntrades[i]){
                $('#p'+i).fadeOut(3000);
                correcte();
            }
        }
        console.log(paraulesTrobades);
    }

    function llistarEntrades(){
        var llista = $('#llista');
        var numEntrades = paraulesEntrades.length;
        for (var m = 0; m < numEntrades; m++){
            llista.append("<li id='p"+m+"'>" + paraulesEntrades[m] + "</li>");
        }
    }

    function correcte() {
        $(".selected").addClass("adivinada");
        $(".adivinada").removeClass("selected");
    }

    function random(i, f){
        return Math.floor(Math.random() * ((f-i)+1) + i);
    }

});