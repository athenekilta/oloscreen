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
let day = date.getDay(); // Sunday = 0, Monday = 1
let hour = date.getHours(); // Values 0-23
let minute = date.getMinutes(); // Values 0-59
const pepuScreen = new PepuScreen();
const screenState = localStorage.getItem('state') || 'noState';

$(document).ready(() => {
  // make right function call when page is reloaded
  upcomingEvents();
  menus();
  if (screenState === 'weekend') weekend();
  else if (screenState === 'alvari') alvari();

  window.setInterval(() => {
    // Run every second
    clock();
    countDown();
    console.log(times);
    // Run every minutes
    console.log(times % 60);
    if (times % 60 === 0) {
      console.log('jaa');
      day = date.getDay(); // Sunday = 0, Monday = 1
      hour = date.getHours(); // Values 0-23
      minute = date.getMinutes(); // Values 0-59
      console.log('päivä');
      console.log(day);

      // get upcoming events every day at 04:00
      if (hour === 4 && minute === 0) {
        upcomingEvents();
      }

      // get menus every day at 04:00 (not including saturday and sunday)
      if (day > 0 && day < 6 && hour === 4 && minute === 0) {
        menus();
        localStorage.setItem('state', 'menu');
      }

      // apply weekend column on friday at 16:00 and get new picture every minute
      if (
        !pepuScreen.pepuModeOn &&
        ((day === 5 && hour >= 16) || day === 6 || day === 0)
      ) {
        weekend();
        localStorage.setItem('state', 'weekend');
      }

      // show alvari from monday to friday after 14:30
      if (day > 0 && day < 6 && hour === 14 && minute === 30) {
        alvari();
        localStorage.setItem('state', 'alvari');
      }

      // apply PEPU mode  on friday at 16:00
      if (day === 5 && hour === 16 && minute === 0) {
        pepuScreen.hideShow();
      }

      // disable PEPU mode
      if (day === 6) {
        $('#hideNormal').remove();
        $('#logo').show();
      }

      // reload page at 00:00
      if (hour === 0 && minute === 0) {
        location.reload();
      }
    }
    date = new Date();
    times += 1;
  }, 1000);
});
