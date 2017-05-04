import moment from 'moment';
import fi from 'moment/locale/fi'
import $ from 'jquery';

$(document).ready(function() {

//Päivämäärä
moment.locale('');

window.setInterval(function() {
	const today = moment().format('[PVM ]DD.MM');
	const time = moment().format('[KLO ]LT');
	$('.currentDate').html(today);
	$('.currentTime').html(time);
}, 500);


//Ruokalista
//Amica


const ruokalistat = () => {
	const amicaURL = 'http://www.amica.fi/modules/json/json/Index?costNumber=0199&language=fi';
	$.getJSON(amicaURL, data => {

		const table = data.MenusForDays[0].SetMenus;
		const resObject = {
			salaatti: null,
			tuas: [],
		}
		table.forEach(row => {
			if (row.Name === 'SALAATTIBUFFET MM.') {
				resObject.salaatti = row.Components.join('<br>');
			} else {
				resObject.tuas.push(row.Components.join('<br>').concat('<br>'));
			}
		});
		const tuas = ("<p>" + resObject.tuas.join('') + "</p>").replace(/\* ,/g, '').replace(/ ,/g, ', ');
	  const salaatti = ("<p>" + resObject.salaatti + "</p>").replace(/\* ,/g, '').replace(/ ,/g, ', ');

		$('#TUAS').html(tuas);
		$('#SALAATTI').html(salaatti);
	});

	//Sodexo
	const timestamp = moment().format('YYYY/MM/DD');
	const sodexoURL = 'http://www.sodexo.fi/ruokalistat/output/daily_json/142/' + timestamp + '/fi'

	$.getJSON(sodexoURL, (data) => {
		const table = data.courses;
		console.log(table);
		const fixedSodexo = table.map(a => {
			const blaa = a.properties ? `(${a.properties})` : '';
			return `${a.title_fi} ${blaa}<br>`;
		});

		const subi = ("<p> " + table[table.length - 1].title_fi + "</p>").replace('Subway', 'Päivän subi');
		const ttalo = "<p>" + fixedSodexo.join('') + "</p>";
		const daysToWabbu =
		$('#SODEXO').html(ttalo);
		$('#SUBWAY').html(subi);
	});
};


window.setInterval(function(){
	ruokalistat();
}, 18000000);
ruokalistat();
});
