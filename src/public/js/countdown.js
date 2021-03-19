  //The launchdate from spacex API
  const launchdate = new Date(result.date_utc).getTime();

  const updateCountdown = setInterval(function() {

    // Current time
    const now = new Date().getTime();

    const timeleft = launchdate - now;

    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    const countdownDays = document.querySelector('.countdown-days');
    const countdownHours = document.querySelector('.countdown-hours');
    const countdownMinutes = document.querySelector('.countdown-minutes');
    const countdownSeconds = document.querySelector('.countdown-seconds');

    countdownDays.innerHTML = days;
    countdownHours.innerHTML = hours;
    countdownMinutes.innerHTML = minutes;
    countdownSeconds.innerHTML = seconds;

  }, 1000)