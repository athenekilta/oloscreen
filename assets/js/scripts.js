$(document).ready(function() {

//Päivämäärä
moment.locale('fi');
var today = moment().format('dddd l');
$('.dayname').html(today);



//Ruokalista
response = $.getJSON("http://www.amica.fi/modules/json/json/Index?costNumber=0199&language=fi", function(data){
    for (var i = 0; i < data.MenusForDays[0].SetMenus.length; i++) {
        var html = "<p>" + "<strong>" + data.MenusForDays[0].SetMenus[i].Name + "</strong>"+ "</br>" + data.MenusForDays[0].SetMenus[i].Components[0] + "</p>" ;
        $('#herehere').append(html);
    };
});

//Sodexo
var timestamp = moment().format('YYYY/MM/DD');
var jsonURL = 'http://www.sodexo.fi/ruokalistat/output/daily_json/142/' + timestamp + '/fi'

$.getJSON(jsonURL, function(data){

 var table = data.courses;
 var asString = ' ';

 for (var i = 0; i < table.length - 1; i++) {
  asString += table[i].title_fi + " " + table[i].properties + "<br>"
 };

 var subi = "<p>" + table[table.length - 1].title_fi + "</p>";
 var ttalo = "<p>" + asString + "</p>";
 $('#SODEXO').html(ttalo);
 $('#SUBWAY').html(subi);
});
});
