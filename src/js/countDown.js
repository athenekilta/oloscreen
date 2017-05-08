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

export function initCountDown() {
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
};
