$("#berechnen").click(function () {
    let streckeA = $("#strecke").val();
    let verbrauchB = $("#verbrauch").val();
    let batteriestandC = $("#batteriestand").val();
    let wetterModus = $("#wetter").val(); // NEU: Wetter holen

    if (streckeA == "" || verbrauchB == "" || batteriestandC == "") {
        $("#fehler-fahrt").stop(true, true).hide().text("Bitte alle Felder ausfüllen!").slideDown(400);
    } 
    else if (verbrauchB < 100 || verbrauchB > 250) {
        $("#fehler-fahrt").stop(true, true).hide().text("Der Verbrauch muss zwischen 100 und 250 W/km liegen!").slideDown(400);
    } 
    else {
        // NEU: Wetterfaktor bestimmen
        let wetterFaktor = 1.0;
        if (wetterModus === "normal") {
            wetterFaktor = 1.10; // +10% Verbrauch
        } else if (wetterModus === "winter") {
            wetterFaktor = 1.25; // +25% Verbrauch im Winter
        }

        // NEU: wetterFaktor in die Berechnung einbeziehen
        let D = (streckeA * verbrauchB * wetterFaktor) / 1000 * (520 / 79);
        let E = batteriestandC - D;
        let F = (batteriestandC * 100) / 520;
        let G = D * 100 / 520;
        let H = F - G;

        if (E < 0 || H < 0) {
            $("#fehler-fahrt").stop(true, true).hide().text("Die Fahrt geht sich mit den angegebenen Werten nicht aus!").slideDown(400);
        } else {
            $("#fehler-fahrt").slideUp(200);
            
            $("#D").text(`Verbrauchte km: ${Math.round(D)}`);
            $("#E").text(`Verbleibende km: ${Math.round(E)}`);
            $("#F").text("Batteriestand zu Fahrtbeginn: " + Math.round(F) + "%");
            $("#G").text(" Das sind " + Math.round(G) + "%");
            $("#H").text(" Das sind: " + Math.round(H) + "%");
        }
    }
});

// Beim Zurücksetzen den Standardwert wiederherstellen
$("#zuruecksetzen").click(function () {
    $("#strecke").val("");
    $("#verbrauch").val("150"); 
    $("#batteriestand").val("");
    $("#wetter").val("sommer"); // NEU: Setzt das Dropdown zurück
    $("#D").text("");
    $("#E").text("");
    $("#F").text("");
    $("#G").text("");
    $("#H").text("");
    $("#fehler-fahrt").slideUp(200);
});

$("#ladedauer_berechnen").click(function () {
    let batteriestandA = $("#batteriestandPro").val();
    let ladenB = $("#laden").val();

    if (batteriestandA == "" || ladenB == "") {
        $("#fehler-laden").stop(true, true).hide().text("Bitte beide Felder ausfüllen!").slideDown(400);
    } else {
        batteriestandA = parseFloat(batteriestandA);
        ladenB = parseFloat(ladenB);

        if (batteriestandA > ladenB) {
            $("#fehler-laden").stop(true, true).hide().text("Falsche Eingabe! Man kann nicht negativ laden.").slideDown(400);
        } else if (isNaN(batteriestandA) || isNaN(ladenB)) {
            $("#fehler-laden").stop(true, true).hide().text("Ungültige Eingabe! Bitte numerische Werte eingeben.").slideDown(400);
        } else if (batteriestandA < 0 || ladenB < 0) {
            $("#fehler-laden").stop(true, true).hide().text("Falsche Eingabe! Man kann nicht negativ laden.").slideDown(400);
        } else if (ladenB > 100) {
            $("#fehler-laden").stop(true, true).hide().text("Falsche Eingabe! Man kann höchstens auf 100% laden.").slideDown(400);
        }
        else {
            $("#fehler-laden").slideUp(200);

            let dezimalzahl = (ladenB - batteriestandA) / 3.077;
            let stunden = Math.floor(dezimalzahl);
            let dezimaleMinuten = (dezimalzahl - stunden) * 60;
            let minuten = Math.round(dezimaleMinuten);

            $("#ladedauer").text(`Ladedauer:  ${stunden} Stunden und ${minuten} Minuten`);
        }
    }
});

$("#laden_zuruecksetzen").click(function () {
    $("#batteriestandPro").val("");
    $("#laden").val("");
    $("#ladedauer").text("");
    $("#fehler-laden").slideUp(200);
    $("#ladebalken").css("width", "0%").text("0%").attr("aria-valuenow", 0);
    $("#ladebalken").removeClass("bg-warning bg-danger").addClass("bg-success");
});

$("#laden").on("input", function() {
    let wert = $(this).val();

    if (wert > 100) wert = 100;
    if (wert < 0 || wert == "") wert = 0;

    $("#ladebalken").css("width", wert + "%");
    $("#ladebalken").text(wert + "%");
    $("#ladebalken").attr("aria-valuenow", wert);
    
    $("#ladebalken").removeClass("bg-danger bg-warning bg-success");

    if (wert < 20) {
        $("#ladebalken").addClass("bg-danger");
    } else if (wert < 80) {
        $("#ladebalken").addClass("bg-warning");
    } else {
        $("#ladebalken").addClass("bg-success");
    }
});