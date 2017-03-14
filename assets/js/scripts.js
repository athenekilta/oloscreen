$(document).ready(function() {
var data;
  response = $.getJSON("http://www.amica.fi/modules/json/json/Index?costNumber=0199&language=fi", function(data){
		var funkka = function(){$('#TUAS').html(data.RestaurantName)};
    funkka();
});

//Päivämäärä
moment.locale('fi');
var today = moment().format('dddd l');
$('.dayname').html(today);



//Ruokalista

//Sodexo
var timestamp = moment().format('YYYY/MM/DD');
var jsonURL = 'http://www.sodexo.fi/ruokalistat/output/daily_json/142/' + timestamp + '/fi'

console.log(jsonURL);

});
