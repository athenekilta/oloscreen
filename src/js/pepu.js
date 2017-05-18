import $ from 'jquery';

const eyeOfTiger = new Audio('./assets/audio/EyeOfTheTiger.mp3');
const starWars = new Audio('./assets/audio/StarWars.mp3');

export default class PepuScreen {
  constructor() {
    this.pepuModeOn = false;
  }
  hideShow() {
    $('#logo').hide();
    $('#header').prepend('<a href="#" id="hideNormal"><img src="assets/images/athene-logo.png" alt="secret pepu" id="logo"></a>');

    $('#hideNormal').click(() => {
      if (!this.pepuModeOn) {
        $('#col1').hide(500);
        $('#col2').hide(500);
        $('#col1wknd').hide(500);
        setTimeout(() => {
          $('#pepu').show();
          $('#pepu .h2').show();
        }, 1000);
        eyeOfTiger.play();
        this.pepuModeOn = !this.pepuModeOn;
      } else {
        $('#col2').show();
        $('#col1wknd').show();
        $('#pepu').hide();
        $('#pepu .h2').hide();
        $('#pepuResult').remove();
        eyeOfTiger.load();
        starWars.load();

        this.pepuModeOn = !this.pepuModeOn;
      }
    });

    return this;
  }
}

$(document).ready(() => {
  const wrapper = $('.input_fields_wrap'); // Fields wrapper
  const addButton = $('.add_field_button'); // Add button ID
  const resultText = 'Kauan sitten kotoisalla Olkkarilla bönthöinen Olkkarineuvos kokoontui yhteen suut kuivina.</br></br>Viikon aikana Olkkarilla on ollut ilmassa rauhattomuutta ja tuhannet kiltalaiset ovat osoittaneet aikomuksensa AS:lle vaihtamisesta - kansa janoaa juomaa!</br></br>Killan hallitus, Tontti Alppasen komennuksessa, on tyhjentänyt Olkkarin viinikaapin ja kuivattanut kiltahuoneen ilmapiiriä viikottaisilla dokouksillaan. Tätä epäsuhtaa ja eripuraa on päässyt selvittämään vain kourallinen tietskarijengiläisiä, jotka ovat luoneet kansalle ratkaisun.</br></br>Killan oikea ylijumala CTO Lakka Pemmi on päättänyt nimetä yhden viikottaisen skumppajedin pelastamaan kansan turmiosta. Näin ollen, tämän perjantain valittu olkoon: ';

  $('#arvo').click(() => {
    let names = [];
    for (let index = 0; index < $('.namefield').length; index += 1) {
      const name = $(`#${$('.namefield')[index].id}`).val();
      names.push(name);
    }
    const chosenNumber = Math.floor((Math.random() * $('.namefield').length));
    const chosenName = $(`#${$('.namefield')[chosenNumber].id}`).val();
    $('#right').append(`<marquee id="pepuResult" direction="up" scrollamount="5">${resultText}</br></br></br></br></br></br></br></br>${chosenName}</marquee>`);
    names = [];
    eyeOfTiger.load();
    starWars.play();
  });

  let x = 0; // initial text box count
  $(addButton).click((e) => { // on add input button click
    e.preventDefault();
    $(wrapper).append(`<form class="col s12"><div class="input-field col l6"><input id="name${x - 1}" class="namefield" type="text"><label  for="last_name">Nimi</label><a href="#" class="remove_field">Poista</a></div></div></form>`); // add input box  `
    x += 1; // text box increment
  });

  $(wrapper).on('click', '.remove_field', function (e) { // user click on remove text
    e.preventDefault(); $(this).parent('div').remove(); x -= 1;
  });
});
