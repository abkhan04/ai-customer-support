
import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.

  // var locale = cookies().get('locale');
  // if (locale === undefined) locale = "en";
  const localeCookie = cookies().get('locale');
  let locale = localeCookie?.value || "en";
  if (locale === undefined) locale = "en";

  // return {
  //   locale,
  //   messages: (await import(`./locale/${locale}.json`)).default,
  // };
  try {
    return {
      locale,
      messages: (await import(`./locale/${locale}.json`)).default,
    };
  } catch (error) {
    console.error(`Could not load messages for locale: ${locale}`, error);
    return {
      locale: 'en',
      messages: (await import(`./locale/en.json`)).default,
    };
  }
});