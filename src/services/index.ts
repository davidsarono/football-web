import type { FetchServiceParams } from "@/types";

const fetchService = async (params: FetchServiceParams) => {
  let url = new URL(import.meta.env.VITE_API_BASE_URL);

  if (params.path) {
    url = new URL(params.path, url);
  }

  if (params.query) {
    const keys = Object.keys(params.query);
    keys.forEach((key) => {
      if (params.query?.[key] != undefined) {
        url.searchParams.set(key, params.query[key]);
      }
    });
  }

  const res = await fetch(
    `https://cors-hijacker.vercel.app/api?url=${encodeURIComponent(
      url.toString()
    )}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": import.meta.env.VITE_API_TOKEN,
      },
    }
  );

  return await res.json();
};

export { fetchService };
