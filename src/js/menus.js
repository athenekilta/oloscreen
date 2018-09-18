import moment from 'moment';
import $ from 'jquery';

const menus = () => {
  if (!$('#sodexo').length) {
    $('#col1').append(
      '<h2 id="ttaloHeader">T-talo</h2><div class="block" id="sodexo"></div>',
    );
    $('#col1').append('<h2>Subway</h2><div class="block" id="subway"></div>');
    $('#col1').append(
      '<h2 id="salaattiHeader">TUAS Salaattibuffet</h2><div class="block" id="salad"></div>',
    );
    $('#col1').append(
      '<h2 id="alvariHeader">Alvari</h2><div class="block" id="alvari"></div>',
    );
  }

  // Sodexo T-talo + Subway
  const subwayDailySpecial = {
    0: 'American Steakhouse Melt',
    1: 'Spicy Italian',
    2: 'Kananrinta',
    3: 'Italian B.M.T',
    4: 'Kalkkuna',
    5: 'Vegan Delite',
    6: 'Kinkku',
  };

  const timestamp = moment().format('YYYY/MM/DD');
  const sodexoURL = `https://kitchen.kanttiinit.fi/restaurants/2/menu?day=${timestamp}/`;

  $.getJSON(sodexoURL, (data) => {
    const table = data.menus[0].courses;
    const fixedSodexo = table.map((a) => {
      const values = a.properties ? `(${a.properties})` : '';
      return `${a.title} ${values}<br>`;
    });
    fixedSodexo.splice(-1, 1); // delete subway

    const dayOfTheWeek = moment().day();
    const subi = `<p> ${subwayDailySpecial[dayOfTheWeek]}</p>`.replace(
      'Subway',
      'Päivän subi',
    );
    const ttalo = `<p>${fixedSodexo.join('')}</p>`;
    $('#sodexo').html(ttalo);
    $('#subway').html(subi);
  });

  // Amica Tuas-talo
  const amicaTuas =
    'https://www.amica.fi/modules/json/json/Index?costNumber=0199&language=fi';

  $.getJSON(amicaTuas, (data) => {
    const table = data.MenusForDays[0].SetMenus;
    const resObject = {
      salad: null,
    };

    table.forEach((row) => {
      if (row.Name === 'SALAATTIBUFFET MM.') {
        resObject.salad = row.Components.join('<br>');
      }
    });

    const salad = `<p>${resObject.salad}</p>`
      .replace(/\* ,/g, '')
      .replace(/ ,/g, ', ');
    $('#salad').html(salad);
  });

  $('#col1').show();
  $('#ttaloHeader').show();
  $('#salaattiHeader').show();
  $('#sodexo').show();
  $('#salad').show();
  $('#alvari').hide();
  $('#alvariHeader').hide();
  $('#col1wknd').hide();
};

// Amica Alvari
const amicaAlvari =
  'https://www.amica.fi/modules/json/json/Index?costNumber=0190&language=fi';

const alvari = () => {
  $.getJSON(amicaAlvari, (data) => {
    const table = data.MenusForDays[0].SetMenus;
    const fixedAlvar = table.map((a) => {
      const values = a.Components ? `(${a.Components.join(', ')})` : '';
      return `${values.slice(1, -1)}<br>`;
    });
    const alvarFood = `<p>${fixedAlvar.join('')}</p>`
      .replace(/\* ,/g, '')
      .replace(/ ,/g, ', ');
    $('#alvari').html(alvarFood);
  });
  $('#ttaloHeader').hide();
  $('#salaattiHeader').hide();
  $('#sodexo').hide();
  $('#salad').hide();
  $('#col1wknd').hide();
  $('#subway').show();
  $('#alvari').show();
  $('#alvariHeader').show();
};

export { menus, alvari };
