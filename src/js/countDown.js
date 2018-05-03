import $ from 'jquery';

const countDown = () => {
  if (!$('#eventHeader').length) {
    $('#col2').append('<h2 id="eventHeader"></h2><div id="eventTime"></div>');
  }
  let blinking = false;
  const event = {
    date: 'August 31, 2018 19:00',
    title: 'Himmailua jäljellä',
    expiredText: 'Alkaa pikkuhiljaa vituttaa tää himmailu',
  };

  /* Take date from calendar
  const eventUrl = 'https://www.googleapis.com/calendar/v3/calendars/athenekilta@gmail.com/events?maxResults=2500&key=AIzaSyAGyZratKPXoYz2upWA9luCZ169-Is49ao';
  $.getJSON(eventUrl, (data) => {
    const table = data.items;
    table.forEach((row) => {
      if (row.summary === 'Marathon XIII') {
        console.log(row.start.date);
      }
    });
  });
  */

  const pad = (num) => {
    let s = `${num}`;
    while (s.length < 2) { s = `0${s}`; }
    return s;
  };

  const countDownDate = new Date(event.date).getTime();
  const now = new Date().getTime();
  const distance = countDownDate - now;

  const days = pad(Math.floor(distance / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor(((distance % (1000 * 60 * 60 * 24))) / (1000 * 60 * 60)));
  const minutes = pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = pad(Math.floor((distance % (1000 * 60)) / 1000));

  document.getElementById('eventHeader').innerHTML = event.title;
  document.getElementById('eventTime').innerHTML = `<div>${days}</div> <div>${hours}</div> <div>${minutes}</div> <div>${seconds}</div>`;

  const eventTimeElement = document.getElementById('eventTime');
  const blink = () => {
    eventTimeElement.style.visibility = (eventTimeElement.style.visibility === 'hidden' ? '' : 'hidden');
  };

  if (distance <= 0 && !blinking) {
    blink();
    blinking = true;
    eventTimeElement.innerHTML = `<span id="expiredText">${event.expiredText}</span>`;
  }
};

export default countDown;
