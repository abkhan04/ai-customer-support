import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers';
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  var locale = cookies().get('locale');
  if (locale === undefined) locale = "en";
 
  return {
    locale,
    messages: (await import(`./locale/${locale}.json`)).default
  };
});