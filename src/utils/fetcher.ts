const fetcher = async (url: RequestInfo, ...args: any[]) => {
  const res = await fetch(url);
  return res.json();
};

export default fetcher;
