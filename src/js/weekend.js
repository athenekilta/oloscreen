import $ from 'jquery';

let appended = false;

const weekend = () => {
  $('#col1').hide();

  if (!appended) {
    $('#col1wknd').append('<h2>Weekend! Party hard!</h2>');
    $('#col1wknd').append('<img src="assets/images/Giphy.png" id="giphy"></img>');
    $('#col1wknd').append('<div class="append"></div>');
    appended = !appended;
  }

  const randomNumber = Math.floor((Math.random() * 25));
  const partyHardSearch = 'https://api.giphy.com/v1/gifs/search?q=party+hard&api_key=dc6zaTOxFJmzC';
  let imageUrl = '';
  $.getJSON(partyHardSearch, ({ data }) => {
    imageUrl = data[randomNumber].images.fixed_height.url;
    $('#col1wknd .append').html(`<img src="${imageUrl}" alt="Party hard" id="weekendPhoto">`);
  });

  $('#col1wknd').show();
};

export default weekend;
