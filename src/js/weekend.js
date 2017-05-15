import $ from 'jquery';

const weekend = () => {
  const randomNumber = Math.floor((Math.random() * 25));
  const partyHardSearch = 'https://api.giphy.com/v1/gifs/search?q=party+hard&api_key=dc6zaTOxFJmzC';

  $.getJSON(partyHardSearch, ({ data }) => {
    const imageUrl = data[randomNumber].images.fixed_height.url;
    $('#col1').hide();
    $('#col1wknd .append').html(`<img src="${imageUrl}" alt="Party hard" id="weekendPhoto">`);
  });
};

export default weekend;
