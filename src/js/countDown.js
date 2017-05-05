const eventArray = [
  {
    eventName: 'Wappu',
    date : 'May 1, 2018 00:00:01',
    textEnding: ' ULLIKSELLE',
    expiredText: 'WAPPUUU!!!',
  },
  {
    eventName: 'Marathon',
    date : 'Oct 19, 2018 00:00:01',
    textEnding: ' bussiin',
    expiredText: 'Bussi kulkee!',
  },
];

const countDownDate = new Date("May 1, 2018 00:00:01").getTime();
const x = setInterval(() => {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("eventHeader").innerHTML = `AIKAA ${eventArray[0].textEnding}`;
  document.getElementById("eventTime").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("EVENT").innerHTML = `${eventArray[0].expiredText}`;
  }
}, 1000);
