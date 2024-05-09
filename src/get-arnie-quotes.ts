import { httpGet } from "./mock-http-interface";

type TResult = {
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
