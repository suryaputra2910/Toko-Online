export const storeCookie = (name: string, value: string) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/`;
};

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((row) =>
    row.startsWith(`${name}=`)
  );

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.split("=")[1]);
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; Max-Age=0; path=/`;
};