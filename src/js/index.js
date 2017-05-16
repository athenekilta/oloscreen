import moment from 'moment';
import $ from 'jquery';
import countDown from './countDown';
import upcomingEvents from './upcomingEvents';
import weekend from './weekend';
import { menus, alvari } from './menus';

moment.locale('');

const clock = () => {
  const date = moment().format('D.M.YYYY [klo] HH.mm.ss');
  document.getElementById('date').innerHTML = date;
};

$(document).ready(() => {
  let times = 0;

  window.setInterval(() => {
    // Run every second
    clock();
    countDown();

    // Run every three hours
    if ((times % (60 * 60 * 3)) === 0) {
      menus();
      upcomingEvents();
    }

    // Run every minutes
    if (times % 60 === 0) {
      const date = new Date(2017,4,16,14,30);
      // apply weekend column (from friday 16:00 to sunday 00:00)
      if ((((date.getDay() === 5)
        && date.getHours() >= 16)
        || date.getDay() === 6)
        || date.getDay() === 0) {
        weekend();
      } else {
        $('#col1wknd').hide();
      }
      // show alvari
      if ((date.getDay() > 0 && date.getDay() < 6)
        && (date.getHours() >= 15 || (date.getHours() >= 14 && date.getMinutes() >= 30))) {
        alvari();
      } else {
        $('#alvari').hide();
        $('#alvariHeader').hide();
      }
    }

    times += 1;

    // // Refresh page twice a day
    if (times > 60 * 60 * 12) {
      location.reload();
    }
  }, 1000);
});
