import { useState } from "react";

const TIMEOUT_SEC = 10;
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${sec} second`));
    }, sec * 1000);
  });
};

function useAdvice() {
  const [adviceContent, setAdviceContent] = useState({
    id: 0,
    advice: "Click button to get advice 😉",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAdvice = async function () {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const res = await Promise.race([
        fetch("https://api.adviceslip.com/advice"),
        timeout(TIMEOUT_SEC),
      ]);
      const data = await res.json();
      setIsLoading(false);

      if (!res.ok) throw new Error(`${data.message} (${res.status})`);

      const { slip } = data;
      setAdviceContent(slip);
    } catch (err) {
      console.error(`${err} 💥`);
      setErrorMessage(err);
    }
  };

  return {
    adviceContent,
    isLoading,
    errorMessage,
    fetchAdvice,
  };
}

export default useAdvice;
