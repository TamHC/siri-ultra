
import { IFunction } from "./type";
import { IRequest } from "../chat";

const BASE_URL = "https://serpapi.com/search";

export const searchWeb = async (query: string, apiKey: string): Promise<string> => {
    const url = `${BASE_URL}?engine=google&q=${encodeURIComponent(query)}&api_key=${apiKey}`;

    try {
          const response = await fetch(url);
          if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          return JSON.stringify(data);
    } catch (error) {
          console.error("Failed to fetch search results:", error);
          return JSON.stringify({ error: "Failed to fetch search results" });
    }
};

export const search: IFunction = {
    type: "function",
    function: {
          name: "web_search",
          description: "Search the web for a given query",
          parameters: {
                  type: "object",
                  properties: {
                            query: {
                                        type: "string",
                                        description: "The search query",
                            },
                  },
          },
    },
    async execute(args: any, req: IRequest) {
          const serpApiKey = req.request.config?.serpapi_key || req.env.SERPAPI_KEY;
          return await searchWeb(args.query, serpApiKey);
    },
};
