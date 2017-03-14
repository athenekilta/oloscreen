$(document).ready(function() {

//Päivämäärä
moment.locale('fi');
var today = moment().format('dddd l');
$('.dayname').html(today);



//Ruokalista
//Amica
var amicaURL = 'http://www.amica.fi/modules/json/json/Index?costNumber=0199&language=fi';
$.getJSON(amicaURL, function(data){

	var table = data.MenusForDays[0].SetMenus;
	var asString = ' ';
	var salaattibuffa = ' ';

    for (var i = 0; i < table.length; i++) {
    	var foodtype = table[i].Name;
    	if (foodtype == 'SALAATTIBUFFET MM.') {
    		for (var j = 0; j < table[i].Components.length; j++) {
    			salaattibuffa += table[i].Components[j] + "<br>";
    		};
    	} else {
        	asString += table[i].Components[0] + "<br>";
   		};
    };
    var tuas = "<p>" + asString + "</p>";
    var salaatti = "<p>" + salaattibuffa + "</p>";
	$('#TUAS').html(tuas);
	$('#SALAATTI').html(salaatti);

});

//Sodexo
var timestamp = moment().format('YYYY/MM/DD');
var sodexoURL = 'http://www.sodexo.fi/ruokalistat/output/daily_json/142/' + timestamp + '/fi'

$.getJSON(sodexoURL, function(data){

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
