import moment from 'moment';
import $ from 'jquery';
import countDown from './countDown';
import upcomingEvents from './upcomingEvents';
import weekend from './weekend';
import { menus, alvari } from './menus';
import PepuScreen from './pepu';

moment.locale('');

const clock = () => {
  const date = moment().format('D.M.YYYY [klo] HH.mm.ss');
  document.getElementById('date').innerHTML = date;
};

let date = new Date();
const pepuScreen = new PepuScreen();

$(document).ready(() => {
  let times = 0;
  let day = date.getDay();         // Sunday = 0, Monday = 1
  let hour = date.getHours();      // Values 0-23
  let minute = date.getMinutes();  // Values 0-59

  window.setInterval(() => {
    // Run every second
    clock();
    countDown();
    // Run every minutes
    if (times % 60 === 0) {
      day = date.getDay();         // Sunday = 0, Monday = 1
      hour = date.getHours();      // Values 0-23
      minute = date.getMinutes();  // Values 0-59
      console.log(`day: ${day} hour: ${hour} minute: ${minute}`);
      // get menus every day at 03:00 (not including saturday and sunday)
      if ((day > 0 && day < 6 && hour === 3 && minute === 0)
         || (day === 5 && hour === 10 && minute === 41)) {
        console.log('menee menuuun');
        menus();
      }

      // get upcoming events every day at 03:00
      if ((hour === 3 && minute === 0) || (day === 5 && hour === 10 && minute === 41)) {
        upcomingEvents();
      }

      // apply weekend column on friday at 16:00 and get new picture every minute
      if (!pepuScreen.pepuModeOn && ((day === 5 && hour >= 16) || day === 6 || day === 0)) {
        weekend();
      }

      // show alvari from monday to friday after 14:30
      if ((day > 0 && day < 6 && hour === 14 && minute === 30)) {
        alvari();
      }

      // apply PEPU mode  on friday at 16:00
      if (day === 5 && hour === 16 && minute === 0) {
        pepuScreen.hideShow();
      } else {
        $('#hideNormal').remove();
        $('#logo').show();
      }

      // reload page at 00:00
      if (hour === 0 && minute === 0) {
        location.reload();
      }
      date = new Date();
    }

    times += 1;
  }, 1000);
});
