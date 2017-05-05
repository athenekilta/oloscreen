/*
window.setInterval(() => {
  const end = moment("2018-5-1 00:00:01"); // another date
  const duration = end.toNow();
  const forWeb = duration.format(string);
  console.log(forWeb);
}, 1000)

const end = moment("2018-5-1 00:00:01"); // another date
const duration = end.toNow();
const forWeb = duration.format(string);
console.log(forWeb);
*/
const eventArray = [
  {
    date : 'May 1, 2018 00:00:01',
    label: ' ULLIKSELLE',
    text: 'WAPPUUU!!!',
  },
  {
    date : 'Oct 19, 2018 00:00:01',
    label: ' bussiin',
    text: 'Bussi kulkee!',
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

  document.getElementById("eventHeader").innerHTML = `AIKAA ${eventArray[0].label}`;
  document.getElementById("eventTime").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("EVENT").innerHTML = "WAPPUUUU!!!";
  }
}, 1000);
