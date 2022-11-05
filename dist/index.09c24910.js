"use strict";
const idContainer = document.querySelector(".adviceId__id");
const adviceContainer = document.querySelector(".adviceContent__text");
const button = document.querySelector(".btn");
const state = {
    id: 0,
    advice: ""
};
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
const newAdvice = async function() {
    try {
        const res = await Promise.race([
            fetch("https://api.adviceslip.com/advice"),
            timeout(10), 
        ]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        const { slip  } = data;
        state.id = slip.id;
        state.advice = slip.advice;
    } catch (err) {
        console.error(`${err} 💥💥💥`);
    }
};
const init = function() {
    button.addEventListener("click", function(e) {
        const btn = e.target.closest(".btn");
        console.log(btn);
    });
};
init();

//# sourceMappingURL=index.09c24910.js.map
