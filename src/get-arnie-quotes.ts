import { httpGet } from "./mock-http-interface";

type TResult = {
  // I am aware this means that both keys could be present. I did try to make it one or the other using
  // [key in "Arnie Quote" | "FAILURE"]: string;
  // However that didn't work. I then saw the solution in a closed PR on the repo.
  "Arnie Quote"?: string;
  FAILURE?: string;
};

type TApiResponse = {
  status: number;
  body: string;
};

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  const requests = urls.map((url) => httpGet(url));
  const responses: TApiResponse[] = await Promise.all(requests);

  const arnieResults: TResult[] = responses.map((resp) => {
    const respBody = JSON.parse(resp.body);

    if (resp.status === 200) {
      return {
        "Arnie Quote": respBody.message,
      };
    } else {
      return {
        FAILURE: respBody.message,
      };
    }
  });

  return arnieResults;
};
