import $ from 'jquery';
import formatGoogleCalendar from './format-google-calendar';

const upcomingEvents = () => {
  $('#upcomingEventHeader').remove();
  $('#upcomingEvents').empty();

  if (!$('#upcomingEvents').length) {
    $('#col2').append('<ul id="upcomingEvents"></ul>');
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
    format: ['*date*', ' <br/> ', '*summary*'],
  });
};

export default upcomingEvents;
