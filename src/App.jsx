import { useState } from "react";
import useAdvice from "./hooks/useAdvice";
import dividerDesktop from "./img/pattern-divider-desktop.svg";
import dividerMobile from "./img/pattern-divider-mobile.svg";
import buttonImg from "./img/icon-dice.svg";

function App() {
  const { fetchAdvice, isLoading, errorMessage, adviceContent } = useAdvice();
  const isError = !!errorMessage;

  return (
    <main className="container">
      <div className="adviceId">
        <span className="adviceId__text">Advice</span>#
        <span className="adviceId__id">{adviceContent.id}</span>
      </div>

      {isLoading && (
        <div className="loading">
          <div className="loading__bubble loading__bubble-1">&nbsp;</div>
          <div className="loading__bubble loading__bubble-2">&nbsp;</div>
          <div className="loading__bubble loading__bubble-3">&nbsp;</div>
        </div>
      )}

      {!isLoading && (
        <div className="adviceContent">
          {!isError && (
            <span className="adviceContent__text">
              {adviceContent.advice && adviceContent.advice}
            </span>
          )}
          {isError && (
            <span className="adviceContent__error-message">
              ⚠️
              <br />
              Request took too long or something wrong with internet. Please try
              again!
            </span>
          )}
        </div>
      )}

      <div className="decoration-line">
        <picture>
          <source srcset={dividerMobile} media="(max-width: 37.5em)" />
          <img src={dividerDesktop} alt="divider image" />
        </picture>
      </div>

      <button className="btn" onClick={fetchAdvice}>
        <img className="btn__icon" src={buttonImg} alt="dice icon" />
      </button>
    </main>
  );
}

export default App;
