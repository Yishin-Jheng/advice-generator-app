"use strict";

const idContainer = document.querySelector(".adviceId__id");
const adviceContainer = document.querySelector(".adviceContent");
const adviceContent = document.querySelector(".adviceContent__text");
const errorMessage = document.querySelector(".error__message");
const button = document.querySelector(".btn");
const loadingAnimation = document.querySelector(".loading");
const timeOutSec = 5;

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

////////////////////////////////////

const state = {
  id: 0,
  advice: "",
};

const newAdvice = async function () {
  try {
    // call data
    const res = await Promise.race([
      fetch("https://api.adviceslip.com/advice"),
      timeout(timeOutSec),
    ]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // store data
    const { slip } = data;
    state.id = slip.id;
    state.advice = slip.advice;
  } catch (err) {
    throw err;
  }
};

const init = function () {
  button.addEventListener("click", async function (e) {
    try {
      const btn = e.target.closest(".btn");
      if (!btn) return;

      errorMessage.style.display = "none";
      loadingAnimation.style.opacity = 1;
      adviceContainer.style.opacity = 0;

      await newAdvice();
      idContainer.textContent = state.id;
      adviceContent.style.display = "block";
      adviceContent.textContent = `” ${state.advice} ”`;
      loadingAnimation.style.opacity = 0;
      adviceContainer.style.opacity = 1;
    } catch (err) {
      errorMessage.style.display = "block";
      adviceContent.style.display = "none";
      loadingAnimation.style.opacity = 0;
      adviceContainer.style.opacity = 1;
      console.error(`${err} 💥💥💥`);
    }
  });
};

init();
