import $ from 'jquery';

const fetchMenus = () => {
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
    const fixedSodexo = table.map(a => {
      const values = a.properties ? `(${a.properties})` : '';
      return `${a.title_fi} ${values}<br>`;
    });
    fixedSodexo.splice(-1,1); // delete subway

    const subi = ("<p> " + table[table.length - 1].title_fi + "</p>").replace('Subway', 'Päivän subi');
    const ttalo = "<p>" + fixedSodexo.join('') + "</p>";
    $('#SODEXO').html(ttalo);
    $('#SUBWAY').html(subi);
  });
};


const initMenus = () => {
  fetchMenus();
  window.setInterval(() => {
    fetchMenus();
  }, 18000000);
}
