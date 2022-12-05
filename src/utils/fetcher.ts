const fetcher = async (
  url: RequestInfo,
  token: RequestInit,
  ...args: any[]
) => {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export default fetcher;
