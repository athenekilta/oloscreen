$(document).ready(function() {


//Päivämäärä
moment.locale('fi');
var today = moment().format('dddd l');
$('.dayname').html(today);



//Ruokalista

//Sodexo
var timestamp = moment().format('YYYY/MM/DD');
var jsonURL = 'http://www.sodexo.fi/ruokalistat/output/daily_json/142/' + timestamp + '/fi'

var json = jsonURL.get(JSON)

console.log(jsonURL);

});