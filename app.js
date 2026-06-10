$("#berechnen").click(function () {
    let streckeA = $("#strecke").val();
    let verbrauchB = $("#verbrauch").val();
    let batteriestandC = $("#batteriestand").val();

    if (streckeA == "" || verbrauchB == "" || batteriestandC == "") {
        // Altes Ausblenden, Text ändern, elegant nach unten gleiten lassen
        $("#fehler-fahrt").stop(true, true).hide().text("Bitte alle Felder ausfüllen!").slideDown(400);
    } else {
        let D = (streckeA * verbrauchB) / 1000 * (520 / 79);
        let E = batteriestandC - D;
        let F = (batteriestandC * 100) / 520;
        let G = D * 100 / 520;
        let H = F - G;

        if (E < 0 || H < 0) {
            $("#fehler-fahrt").stop(true, true).hide().text("Die Fahrt geht sich mit den angegebenen Werten nicht aus!").slideDown(400);
        } else {
            // Bei erfolgreicher Berechnung den Fehler nach oben weggleiten lassen
            $("#fehler-fahrt").slideUp(200);
            
            $("#D").text(`Verbrauchte km: ${Math.round(D)}`);
            $("#E").text(`Verbleibende km: ${Math.round(E)}`);
            $("#F").text("Batteriestand zu Fahrtbeginn: " + Math.round(F) + "%");
            $("#G").text(" Das sind " + Math.round(G) + "%");
            $("#H").text(" Das sind: " + Math.round(H) + "%");
        }
    }
});

$("#zuruecksetzen").click(function () {
    $("#strecke").val("");
    $("#verbrauch").val("");
    $("#batteriestand").val("");
    $("#D").text("");
    $("#E").text("");
    $("#F").text("");
    $("#G").text("");
    $("#H").text("");
    // Fehler sanft nach oben weggleiten lassen
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
            // Bei erfolgreicher Berechnung Fehler ausblenden
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
    // Fehler ausblenden und Ladebalken zurücksetzen
    $("#fehler-laden").slideUp(200);
    $("#ladebalken").css("width", "0%").text("0%").attr("aria-valuenow", 0);
    $("#ladebalken").removeClass("bg-warning bg-danger").addClass("bg-success");
});

// Dynamische Aktualisierung des Balkens beim Tippen
$("#laden").on("input", function() {
    let wert = $(this).val();

    // Begrenzung zwischen 0 und 100
    if (wert > 100) wert = 100;
    if (wert < 0 || wert == "") wert = 0;

    // 1. Balkenbreite und Text aktualisieren
    $("#ladebalken").css("width", wert + "%");
    $("#ladebalken").text(wert + "%");
    $("#ladebalken").attr("aria-valuenow", wert);
    
    // 2. DYNAMISCHER FARBWECHSEL
    // Zuerst alle möglichen Farbklassen entfernen, damit sie sich nicht blockieren
    $("#ladebalken").removeClass("bg-danger bg-warning bg-success");

    // Jetzt je nach Wert die passende Farbe hinzufügen
    if (wert < 20) {
        // Niedriger Stand: Rot
        $("#ladebalken").addClass("bg-danger");
    } else if (wert < 80) {
        // Mittlerer Stand: Gelb/Orange
        $("#ladebalken").addClass("bg-warning");
    } else {
        // Hoher Stand: Grün
        $("#ladebalken").addClass("bg-success");
    }
});