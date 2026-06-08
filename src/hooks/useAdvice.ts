import { useState } from "react";

export interface AdviceSlip {
  id: number;
  advice: string;
}
interface AdviceResponse {
  slip: AdviceSlip;
}
interface ErrorResponse {
  message: string;
}

const TIMEOUT_SEC = 10;

const timeout = function (sec: number): Promise<never> {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${sec} second`));
    }, sec * 1000);
  });
};

function useAdvice() {
  const [adviceContent, setAdviceContent] = useState<AdviceSlip>({
    id: 0,
    advice: "Click button to get advice 😉",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchAdvice = async function () {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await Promise.race([
        fetch("https://api.adviceslip.com/advice"),
        timeout(TIMEOUT_SEC),
      ]);
      const data = (await res.json()) as AdviceResponse | ErrorResponse;

      if (!res.ok)
        throw new Error(`${(data as ErrorResponse).message} (${res.status})`);

      setAdviceContent((data as AdviceResponse).slip);
    } catch (err) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    adviceContent,
    isLoading,
    isError,
    fetchAdvice,
  };
}

export default useAdvice;
