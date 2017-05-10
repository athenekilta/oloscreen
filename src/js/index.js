import moment from 'moment';
import $ from 'jquery';
import formatGoogleCalendar from './format-google-calendar.js';

moment.locale('');

$(document).ready(() => {
  let times = 0;

  window.setInterval(function() {
    // Run every second
    clock();
    countDown();


    // Run every three hours
    if ((times % (60 * 60 * 3)) === 0) {
      menus();
      upcomingEvents();
    }

    times++;

    // // Refresh page twice a day
    if (times > 60 * 60 * 12) {
      location.reload();
    }
  }, 1000);

  // Block functions start here

  function clock() {
    const date = moment().format('D.M.YYYY [klo] HH.mm.ss');
    document.getElementById('date').innerHTML = date;
  }

  function upcomingEvents() {
    $("#upcomingEventHeader").remove();
    $("#upcomingEvents").empty();

    if (!$('#upcomingEvents').length) {
      $('#col2').append('<ul id="upcomingEvents"></ul>')
    }
    formatGoogleCalendar.init({
      calendarUrl: 'https://www.googleapis.com/calendar/v3/calendars/athenekilta@gmail.com/events?maxResults=2500&key=AIzaSyAGyZratKPXoYz2upWA9luCZ169-Is49ao',
      past: false,
      upcoming: true,
      pastTopN: 0,
      upcomingTopN: 3,
      itemsTagName: 'li',
      upcomingSelector: '#upcomingEvents',
      pastSelector: '#events-past',
      upcomingHeading: '<h2 id="upcomingEventHeader">Tulevat tapahtumat</h2>',
      pastHeading: '<h2>Past events</h2>',
      format: [ '*summary*', ' &mdash; ', '*date*', '*description*', ' in ', '*location*']
      });
  }

  function countDown() {
    if (!$('#eventHeader').length) {
      $('#col2').append('<h2 id="eventHeader"></h2><div id="eventTime"></div>');
    }

    const event = {
      date : 'Oct 19, 2017 00:00:00',
      title: 'Aikaa marathoniin',
      expiredText: 'Bussi kulkee!',
    };

    const pad = num => {
      let s = num + "";
      while (s.length < 2) s = "0" + s;
      return s;
    }

    const countDownDate = new Date(event.date).getTime();

    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
    const hours = pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = pad(Math.floor((distance % (1000 * 60)) / 1000));

    document.getElementById("eventHeader").innerHTML = event.title;
    document.getElementById("eventTime").innerHTML = `<span>${days}</span> <span>${hours}</span> <span>${minutes}</span> <span>${seconds}</span>`;

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("eventTime").innerHTML = `<span>${event.expiredText}</span>`;
    }
  }

  function menus() {
    if (!$('#sodexo').length) {
      $('#col1').append('<h2>T-talo</h2><div class="block" id="sodexo"></div>');
      $('#col1').append('<h2>Subway</h2><div class="block" id="subway"></div>');
      $('#col1').append('<h2>TUAS Salaattibuffet</h2><div class="block" id="salad"></div>');
    }

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
      $('#sodexo').html(ttalo);
      $('#subway').html(subi);
    });

    const amicaURL = 'https://www.amica.fi/modules/json/json/Index?costNumber=0199&language=fi';

    $.getJSON(amicaURL, data => {
      const table = data.MenusForDays[0].SetMenus;
      const resObject = {
        salaatti: null,
        // tuas: [],
      }

      table.forEach(row => {
        if (row.Name === 'SALAATTIBUFFET MM.') {
          resObject.salad = row.Components.join('<br>');
        }
        // } else {
        //   resObject.tuas.push(row.Components.join('<br>').concat('<br>'));
        // }
      });

      // const tuas = ("<p>" + resObject.tuas.join('') + "</p>").replace(/\* ,/g, '').replace(/ ,/g, ', ');
      const salad = ("<p>" + resObject.salad + "</p>").replace(/\* ,/g, '').replace(/ ,/g, ', ');

      // $('#TUAS').html(tuas);
      $('#salad').html(salad);
    });


  }
});
