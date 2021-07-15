/* How to translate a text

On other files. Replace the text to be translated with:
  a) {{ $t('whatIsOhana') }} if it does NOT contain html tags (<p>, <b>, <a> ...)
  b) <span v-html="$t('whatIsOhana')"></span> otherwise

On this file. Add the (translated) text under each language, eg:
  en: {
    whatIsOhana: 'What is Ohana?',
    ....
  },
  es: {
    whatIsOhana: '¿Qué es Ohana?',
    ...
  },
{{ $t('discoverContent') }}

*/

const messages = {
  en: {
    whatIsOhana: 'What is Ohana?',
    welcome: 'Welcome to Ohana',
    install: 'Install',
    getStarted: 'Get started',
    simplicity: 'Simplicity',
    simplicityDesc: "It's time for unwanted content to go away with one click.",
    simplicityShortDesc: 'As easy as pressing play',
    youWay: 'Your way',
    youWayDesc:
      'We just provide the information and the tools. You decide what is good for you to watch.',
    youWayShortDesc: 'You decide what you watch',
    community: 'Community',
    communityDesc:
      'We are a community of developers and movie fans like you. We work passionately to make Ohana possible.',
    communityShortDesc: 'Built by people like you',
    filterContent: 'Filter content on your favourite providers',
    onlyOnChrome: '*As of now, only available when you watch using Chrome browser',
    discoverContent: 'Discover content',
    whatDoYouSkip: 'What do you want to skip?',
    showAdvanced: 'Hide Advenced Search | Show Advanced Search',
    safety: 'Safety',
    movies: 'Movies',
    shows: 'Shows',
    providers: 'Providers',
    genre: 'Genre | Genres',
    showOnlyClean: 'Show only clean movies',
    showOnlyCertified: 'Show only Ohana certified movies'
  },
  es: {
    whatIsOhana: '¿Qué es Ohana?',
    welcome: 'Bienvenido a Ohana',
    simplicity: 'Sencillez',
  },
}

messages.es = messages.en

/*****************************************/
/* DO NOT TOUCH ANYTHING UNDER THIS LINE */
/*****************************************/

import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'es', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
})

export default i18n
