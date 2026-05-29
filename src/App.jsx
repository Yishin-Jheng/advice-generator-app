import useAdvice from "./hooks/useAdvice";
import dividerDesktop from "./img/pattern-divider-desktop.svg";
import dividerMobile from "./img/pattern-divider-mobile.svg";
import buttonImg from "./img/icon-dice.svg";

const loadingAnimationClass =
  "w-5 h-5 rounded-full bg-green animate-pulse-bubble";

function App() {
  const { fetchAdvice, isLoading, isError, adviceContent } = useAdvice();

  return (
    <main className="relative max-w-200 min-h-100 p-10 mx-auto my-0 flex flex-col justify-between text-center bg-grey-dark-2 rounded-2xl max-md:w-[calc(100%-60px)] max-md:px-5 max-sm:w-[calc(100%-30px)] max-sm:px-3.75">
      <div className="text-green uppercase tracking-[4px] text-[18px] max-md:text-[15px]">
        <span>Advice</span>
        <span>{`#${adviceContent.id}`}</span>
      </div>
      {isLoading && (
        <div className="flex gap-5 justify-center">
          <div className={`${loadingAnimationClass} [animation-delay:0s]`}>
            &nbsp;
          </div>
          <div className={`${loadingAnimationClass} [animation-delay:0.2s]`}>
            &nbsp;
          </div>
          <div className={`${loadingAnimationClass} [animation-delay:0.4s]`}>
            &nbsp;
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="text-cyan font-extrabold text-[32px] max-md:text-[28px] max-sm:text-[24px]">
          {!isError && <span>{adviceContent.advice}</span>}
          {isError && (
            <span>
              ⚠️
              <br />
              Request took too long or something wrong with internet. Please try
              again!
            </span>
          )}
        </div>
      )}
      <div className="mx-auto mb-6.25">
        <picture>
          <source srcSet={dividerMobile} media="(max-width: 37.5em)" />
          <img src={dividerDesktop} alt="divider image" />
        </picture>
      </div>
      <button
        className="absolute bottom-0 left-1/2 transform-[translate(-50%,50%)] w-20 h-20 rounded-full bg-green cursor-pointer transition-all duration-200 hover:shadow-green-glow max-sm:w-17.5 max-sm:h-17.5"
        onClick={fetchAdvice}
      >
        <img
          className="w-7.5 h-7.5 mx-auto max-sm:w-6.5 max-sm:h-6.5"
          src={buttonImg}
          alt="dice icon"
        />
      </button>
    </main>
  );
}

export default App;
