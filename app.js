$("#berechnen").click(function () {
    let streckeA = $("#strecke").val();
    let verbrauchB = $("#verbrauch").val();
    let batteriestandC = $("#batteriestand").val();

    if (streckeA == "" || verbrauchB == "" || batteriestandC == "") {
        alert("Bitte alle Felder ausfüllen!");
    } else {
        let D = (streckeA * verbrauchB) / 1000 * (520 / 79);
        let E = batteriestandC - D;
        let F = (batteriestandC * 100) / 520;
        let G = D * 100 / 520;
        let H = F - G;

        if (E < 0 || H < 0) {
            alert("Die Fahrt geht sich mit den angegebenen Werten nicht aus!");
        } else {
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
});

$("#ladedauer_berechnen").click(function () {
    let batteriestandA = $("#batteriestandPro").val();
    let ladenB = $("#laden").val();

    if (batteriestandA == "" || ladenB == "") {
        alert("Bitte beide Felder ausfüllen!");
    } else {
        batteriestandA = parseFloat(batteriestandA);
        ladenB = parseFloat(ladenB);

        if (batteriestandA > ladenB) {
            alert("falsche Eingabe! Man kann nicht negativ laden.");
        } else if (isNaN(batteriestandA) || isNaN(ladenB)) {
            alert("Ungültige Eingabe! Bitte numerische Werte eingeben.");
        } else if (batteriestandA < 0 || ladenB < 0) {
            alert("Falsche Eingabe! Man kann nicht negativ laden.");
        } else if (ladenB > 100) {
            alert("Falsche Eingabe! Man kann höchstens auf 100% laden.");
        }
        else {
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
});