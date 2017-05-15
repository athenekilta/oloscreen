import moment from 'moment';
import $ from 'jquery';

const menus = () => {
  if (!$('#sodexo').length) {
    $('#col1').append('<h2>T-talo</h2><div class="block" id="sodexo"></div>');
    $('#col1').append('<h2>Subway</h2><div class="block" id="subway"></div>');
    $('#col1').append('<h2>TUAS Salaattibuffet</h2><div class="block" id="salad"></div>');
  }

  // Sodexo
  const timestamp = moment().format('YYYY/MM/DD');
  const sodexoURL = `http://www.sodexo.fi/ruokalistat/output/daily_json/142/${timestamp}/fi`;

  $.getJSON(sodexoURL, (data) => {
    const table = data.courses;
    const fixedSodexo = table.map((a) => {
      const values = a.properties ? `(${a.properties})` : '';
      return `${a.title_fi} ${values}<br>`;
    });
    fixedSodexo.splice(-1, 1); // delete subway

    const subi = (`<p> ${table[table.length - 1].title_fi}</p>`).replace('Subway', 'Päivän subi');
    const ttalo = `<p>${fixedSodexo.join('')}</p>`;
    $('#sodexo').html(ttalo);
    $('#subway').html(subi);
  });

  const amicaURL = 'https://www.amica.fi/modules/json/json/Index?costNumber=0199&language=fi';

  $.getJSON(amicaURL, (data) => {
    const table = data.MenusForDays[0].SetMenus;
    const resObject = {
      salaatti: null,
    };

    table.forEach((row) => {
      if (row.Name === 'SALAATTIBUFFET MM.') {
        resObject.salad = row.Components.join('<br>');
      }
    });

    const salad = (`<p>${resObject.salad}</p>`).replace(/\* ,/g, '').replace(/ ,/g, ', ');
    $('#salad').html(salad);
  });
};

export default menus;
