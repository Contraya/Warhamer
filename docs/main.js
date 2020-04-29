var tabId = ["gracz", "kampania", "mg", "imie", "rasa", "plec", "oczy", "wlosy", "wiek", "wzrost", "waga", "znak", "znaczenie", "szczegolne", "profesja", "kariera", "urodzenie", "rodzina", "zaburzenia", "rany", "historia", "religia","dinformacje","wyposazenie","wyposazenieob","glowa","preka","lreka","korpus","pnoga","lnoga","s","pp","wt","po","korony","szylingi","pensy","otrzymanepd","wydanepd","pozostalepd"];
var cechy = ["ww","us","k","odp","zr","int","sw","ogd","zyw","a","sz","mag"];
var cechyMod = ['p','r','a'];
var kategorie9 = ["bron","kategoria","obciazenie","obrazenia","zasieg","ladunek","oreza","pancerz","pobc","lokacja","pz"];
var poczatkowapp = 0, zapis = 0;
var wydanePD = 0;

function download(type) {
    var data = "";
    var filename = "Zapis postaci "+document.getElementById(tabId[3]).value;
    for(var element = 0; element < tabId.length; element++){
        if(zapis != 1){
            data += document.getElementById(tabId[element]).value;
            data += ";";
        }else{
            if(tabId[element] == "pp"){
                data += poczatkowapp;
                data += ";";
            }else{
                data += document.getElementById(tabId[element]).value;
                data += ";";
            }
        }
    };
    for(var j = 0; j < cechy.length; j++)
    for(var i = 0; i < cechyMod.length; i++){
        data += document.getElementById(cechy[j]+cechyMod[i]).value;
        data += ";";
    }
    for(var j = 0; j < kategorie9.length; j++){
        for(var i = 1; i < 10; i++){
            data += document.getElementById(kategorie9[j]+i.toString()).value;
            data += ";";
        }
    }
    for(var i = 1; i <= 349; i++){
        data += document.getElementById(i.toString()).checked;
        data += ";";
    }
    console.log("pobierz PD"+wydanePD.toString());
    data += wydanePD.toString();
    data += ";";

    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}
var openFile = function(event) {
    var input = event.target;
    zapis = 1;
    var reader = new FileReader();
    reader.onload = function(){
      var text = reader.result.split(';');
      var line = 0;
      for(line = 0; line < tabId.length; line++){
        document.getElementById(tabId[line]).value = text[line];
        if(tabId[line] == "pp"){
            poczatkowapp = text[line];
        }
      }
    for(var j = 0; j < cechy.length; j++)
        for(var i = 0; i < cechyMod.length; i++){
            document.getElementById(cechy[j]+cechyMod[i]).value = text[line];
            line++;
        }
    for(var j = 0; j < kategorie9.length; j++){
        for(var i = 1; i < 10; i++){
            document.getElementById(kategorie9[j]+i.toString()).value = text[line];
            line++;
        }
    }
    for(var i = 1; i <= 349; i++){
        if(text[line] == "true"){
        document.getElementById(i.toString()).checked = !document.getElementById(i.toString()).checked;
        }
        line++;
    }
    //line++;
    wydanePD = parseInt(text[line]);
    document.getElementById("PD").style.top = (1073 - (6 * wydanePD) / 100).toString() + 'px';
    document.getElementById("PD").style.height = (6 * wydanePD / 100).toString() + 'px';
    console.log("load"+text[line]);
    document.getElementById("wybierz").remove()
    };
    reader.readAsText(input.files[0]);
  };
function punktyZbroi(lokalizacja){
    if(document.getElementById(lokalizacja).value !=0)
    document.getElementById(document.getElementById(lokalizacja).value).value = document.getElementById("pz"+lokalizacja.substring(lokalizacja.length-1,lokalizacja.lenght)).value;
}
function punktyCech(co,gdzie){
    document.getElementById(gdzie).value = document.getElementById(co).value.substring(0,1);
}
function rozwojCech(poczatkowa,rozwoj,gdzie){
    document.getElementById(gdzie).value = parseInt(document.getElementById(poczatkowa).value) + parseInt(document.getElementById(rozwoj).value);
}
function przeliczanieMajatek(typ){
    switch(typ){
        case "korony":
            var wartosc = parseFloat(document.getElementById(typ).value)
            document.getElementById("szylingi").value = wartosc * 20;
            document.getElementById("pensy").value = wartosc * 240;
            break;
        case "szylingi":
            var wartosc = parseFloat(document.getElementById(typ).value)
            document.getElementById("korony").value = Math.round((wartosc / 20)*100)/100;
            document.getElementById("pensy").value = wartosc * 12;
            break;
        case "pensy":
            var wartosc = parseFloat(document.getElementById(typ).value)
            document.getElementById("korony").value = Math.round((wartosc / 240)*100)/100;
            document.getElementById("szylingi").value = Math.round((wartosc / 12)*100)/100;
            break;
    }
}
function dodajPD(){
    document.getElementById("pozostalepd").value = parseInt(document.getElementById("pozostalepd").value) + parseInt(document.getElementById("otrzymanepd").value);
    document.getElementById("otrzymanepd").value = 0;
}
function odejmijPD(){
    var pd = parseInt(document.getElementById("pozostalepd").value) - parseInt(document.getElementById("wydanepd").value);
    if(pd >= 0){
        document.getElementById("pozostalepd").value = pd;
        wydanePD += parseInt(document.getElementById("wydanepd").value);
        document.getElementById("PD").style.top = (1073 - (6 * wydanePD) / 100).toString() + 'px';
        document.getElementById("PD").style.height = (6 * wydanePD / 100).toString() + 'px';
        document.getElementById("wydanepd").value = 0;
    }else alert("nie masz wystarczjąco PD");
}