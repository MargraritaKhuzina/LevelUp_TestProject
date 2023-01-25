$(function () {
  let header = $("#header");
  let introH = $("#intro").innerHeight();
  let scrollOffset = $(window).scrollTop();
  let nav = $("#nav");
  let navToggle = $("#nav_toggle");

  // Fixed Header

  checkScroll(scrollOffset);

  $(window).on("scroll", function () {
    scrollOffset = $(this).scrollTop();

    checkScroll(scrollOffset);
  });

  function checkScroll(scrollOffset) {
    if (scrollOffset >= introH) {
      header.addClass("fixed");
    } else {
      header.removeClass("fixed");
    }
  }

  // Slider

  $("[data-slider]").slick({
    infinite: true,
    fade: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  function setVideoCenter() {
    var $box = $(".video-box");
    var height = $box.height();
    var width = $box.width();
    var new_height = width / 1.78;
    if (new_height > height) {
      $box.find("iframe").css({
        width: width,
        height: new_height,
        top: "-" + (new_height / 2 - height / 2) + "px",
        left: "0",
      });
    } else {
      var new_width = height * 1.78;
      $box.find("iframe").css({
        width: new_width,
        height: height,
        top: "0",
        left: "-" + (new_width / 2 - width / 2) + "px",
      });
    }
  }

  $(function () {
    setVideoCenter();
    $(window).resize(setVideoCenter);
  });

  // countdown
  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector(".days");
    var hoursSpan = clock.querySelector(".hours");
    var minutesSpan = clock.querySelector(".minutes");
    var secondsSpan = clock.querySelector(".seconds");

    function updateClock() {
      var t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
      minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
      secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }

  var deadline = new Date(Date.parse(new Date()) + 30 * 60 * 1000); // for endless timer
  initializeClock("countdown", deadline);

  const orderForm = document.getElementById("order-form");
  const nameInput = document.getElementById("order-name");
  const telInput = document.getElementById("order-tel");

  orderForm.reset();

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    orderForm.reset();
  });

  nameInput.addEventListener("focus", () => {
    document.querySelector(".name-help").style.opacity = "1";
  });
  nameInput.addEventListener("blur", () => {
    document.querySelector(".name-help").style.opacity = "0";
  });

  telInput.addEventListener("focus", () => {
    document.querySelector(".tel-help").style.opacity = "1";
  });
  telInput.addEventListener("blur", () => {
    document.querySelector(".tel-help").style.opacity = "0";
  });
  telInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/, "");
  });

  //scroll

  const orderBtns = [...document.querySelectorAll(".btn-link")];

  orderBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      orderForm.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
