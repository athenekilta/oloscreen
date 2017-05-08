import moment from 'moment';
import fi from 'moment/locale/fi';
import $ from 'jquery';

import './countDown.js';
import './menus.js';

$(document).ready(() => {

  //Päivämäärä
  moment.locale('');

  window.setInterval(() => {
    const date = moment().format('D.M.YYYY [klo] HH.mm.ss');
    $('.currentDate').html(date);
  }, 1000);

  initMenus();
  initCountDown();

});
