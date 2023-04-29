/*
  Texts in the 'en' section should be in English
  Texts in the 'es' section should be in Spanish

  You might have to copy some keys from one section into another in they are missing
  ...
*/
const messages = {
  en: {
    whatIsOhana: 'What is Ohana?',
    welcome: 'Welcome to Ohana',
    homeHeroText1: 'We are what we watch',
    homeHeroText2: 'Ohana lets you to watch your favorite movies in a healthy way',
    install: 'Install',
    home: 'Home',
    about: 'About',
    settings: 'Settings',
    getStarted: 'Get started',
    editors: 'Editors',
    learnMore: 'Learn more',
    discoverContent: 'Find movies',
    support_ohana: 'Support Ohana',
    discoverContent_long: 'Find something great to watch',
    language: 'Language',
    /* Home */
    scroll_for_more: 'Scroll to learn more ;)',
    /* Highlighted values on top*/
    prop1: 'Health',
    prop1Desc: 'Mental health aware',
    prop2: 'Choice',
    prop2Desc: 'You decide what you watch',
    prop3: 'Community',
    prop3Desc: 'Built by people like you',
    /* Values displayed on the home view */
    value1: 'Mental health',
    value1Desc:
      'In a world with growing mental health issues, some scenes can harm the viewers. Ohana enables the creation of safe spaces. Ohana means nobody gets left behind.',
    value2: 'Choice',
    value2Desc:
      'Our aim is to empower you as a viewer, giving you the tools to choose what to watch and what not to. With Ohana the choice is yours',
    value3: 'Child protection',
    value3Desc:
      'Chilhood should be a time when kids can grow, explore and develop in a safe enviroment. Ohana helps create a safe enviroment for kids.',
    value4: "Women's rights",
    value4Desc:
      'We are not objects for mens satisfaction. Ohana helps us take action and fight the rape culture that impregnates too many movies.',
    value5: 'Easy peasy',
    value5Desc:
      'We work right on your favourity providers, just install our Chrome extension, tell us your preferences, and keep watching movies as usual while we work for you in the background.',
    value6: 'Community',
    value6Desc:
      'We are no large corporation, we are community of movie fans like you. Ohana is non for profit organization',
    /**/
    advanced_search: 'Advanced search',
    search_subtitle: `Find something great to watch!`,
    whatDoYouSkip: 'Unhealthy content to skip',
    whatDoYouSkip_tip:
      'Mark below the kind of content you want to avoid while watching movies. You can change it anytime.',
    showAdvanced: 'Hide Advenced Search | Show Advanced Search',
    safety: 'Safety',
    movies: 'Movies',
    shows: 'Shows',
    providers: 'Providers',
    genre: 'Genre | Genres',
    showOnlyClean: 'Show only healthy movies',
    showOnlyCertified: 'Show only Ohana certified movies',
    severe: 'Severe',
    moderate: 'Moderate',
    mild: 'Mild',
    slight: 'Slight',
    /*movie popup */
    confidence: 'Confidence',
    feedbackPopUp: 'Report an error',
    resultsBasedOn: ['Results based on your', 'settings', 'and', 'filters'],
    manage_preferences: 'Manage preferences',

    settings_page: {
      skip_intro:
        'Select what kind of content do you want to avoid. Ohana will skip it automatically while you watch movies.',
      warnings: {
        not_in_chrome:
          "You don't have our extension installed (or are using an old version). You will need it if you want to watch edited content.",
        not_installed:
          'To watch edited content, you need to switch to a compatible browser (Google Chrome in a Destkop machine), and install our Chrome Extension.',
      },
    },
    community: {
      title: 'Community',
      subtitle: 'Our heart and engine',
      intro1:
        "A strong community is what makes the difference in a project like this. We need your help building the first open database of films' scenes.",
      intro2: 'With your help, anyone in the world will be able to watch movies in a healthy way.',
      join: 'Join the community',

      contribute: {
        install_html: 'Install our <b>Chrome extension</b> and start using it.',
        edit_html:
          'Go ahead and <b>flag unhealthy content</b>. Next users will be able to skip it thanks to you!',
        donate_html: '<b>Donate</b> to support the development of Ohana and pay the bills.',
        code_html: 'Do you know how to <b>code</b>? We are looking for volunteers!',
        spread_html: '<b>Spread the word</b> about Ohana, so others can enjoy and support it',
      },
    },
    popup: {
      types: {
        movie: 'Movie{s}',
        show: 'Show{s}',
        episode: 'Episode{s}',
        series: 'Show{s}',
      },
      poweredBy: 'Powered by',
      movieValues: 'Fostered values',
      watchOptions: 'Watch options',
      showProvidersAnyway: 'Ignore warning',
      invalidBrowser: 'This browser is not compatible with Ohana.',
      no_providers: ['No providers found.', 'Try on TMDB'],
      goToFullDetails: '+info',
      details: 'Details',
      contributors: 'Contributors',
      installingOhanaIsRequired: 'Installing Ohana is required to remove unhealthy scenes: ',
      ohanaSummary: {
        unset: 'To know if this {type} is healthy for you, let us know your preferences',
        clean: 'This {type} is healthy for your settings. Nothing to filter here.',
        done: "We've created {edits} filter{s} to make this {type} healthy for your settings",
        missing:
          "This {type} contains unhealthy scenes you've marked to skip. But we don't have all the filters ready yet.",
        mixed_with_edits:
          'Although we have {edits} filter{s} for this {type}, it might still contain content you consider unhealthy.',
        mixed_no_edits: 'This {type} might contain unhealthy scenes. We are not sure.',
        unknown: "Ouch! We don't know if this content is healthy for your settings!",
      },
    },
    /*others */
    restore_deafult_values: 'Restore default values',
    navigate_to_home: 'Navigate to home',
    utils: {
      readmore: 'Read more',
      readless: 'Read less',
    },

    /*editors*/
    leaderboard: {
      intro:
        'In this table we celebrate the contributions of our users, who make possible Ohana TV. THANK YOU for your hard work!',
    },
  },
  es: {
    whatIsOhana: '¿Qué es Ohana?',
    welcome: 'Bienvenido a Ohana',
    homeHeroText1: 'Somos lo que vemos',
    homeHeroText2: 'Ohana te permite ver tus películas favoritas de forma saludable',
    install: 'Instalar',
    ome: 'Portada',
    about: 'Acerca de',
    settings: 'Ajustes',
    getStarted: 'Empezar',
    editors: 'Editores',
    learnMore: 'Aprender más',
    discoverContent: 'Ver películas',
    support_ohana: 'Colabora',
    discoverContent_long: 'Encuentra el mejor contenido',
    language: 'Idioma',
    /* Home */
    scroll_for_more: 'Baja para saber más ;)',
    /* Highlighted values on top*/
    prop1: 'Salud',
    prop1Desc: 'Concienciados del cuidado de la salud mental',
    prop2: 'Libertad',
    prop2Desc: 'Tú decides que ver',
    prop3: 'Comunidad',
    prop3Desc: 'Creado por gente como tú',
    /* Values displayed on the home view */
    value1: 'Salud mental',
    value1Desc:
      'En un mundo con crecientes problemas de salud mental algunas escenas pueden dañar a los espectadores. Ohana permite la creación de espacios seguros, nadie se queda atrás.',
    value2: 'Libertad',
    value2Desc:
      'Nuestro objetivo es empoderarte como espectador, brindándote las herramientas para elegir qué ver y qué no. Con Ohana la elección es tuya.',
    value3: 'Protección infantil',
    value3Desc:
      'La infancia debe ser un momento en el que los niños puedan crecer, explorar y desarrollarse en un entorno seguro. Ohana ayuda a crear este entorno seguro para los niños.',
    value4: 'Derechos de la mujer',
    value4Desc:
      'No somos objetos para la satisfacción de los hombres. Ohana nos ayuda a tomar medidas y luchar contra la cultura de la violación que impregna demasiadas películas.',
    value5: 'Fácil y sencillo, para toda la familia',
    value5Desc:
      'Trabajamos directamente en sus proveedores favoritos, solo instale nuestra extensión de Chrome, díganos sus preferencias y siga viendo películas como de costumbre mientras trabajamos para usted en segundo plano.',
    value6: 'Comunidad',
    value6Desc:
      'No somos una gran corporación, somos una comunidad de apasionados del cine, como tú. Ohana es una organización sin animo de lucro.',
    /**/
    advanced_search: 'Búsqueda avanzada',
    search_subtitle: 'Encuentra el mejor contenido',
    whatDoYouSkip: 'Contenido no saludable a evitar',
    whatDoYouSkip_tip:
      'Indica qué contenido que quieres evitar cuando veas una película. Puedes cambiar estos ajustes en cualquier momento.',
    showAdvanced: 'Ocultar búsqueda avanzada | Mostrar búsqueda avanzada',
    safety: 'Protección',
    movies: 'Películas',
    shows: 'Series',
    providers: 'Proveedores',
    genre: 'Género | Géneros',
    showOnlyClean: 'Mostrar solo películas limpias',
    showOnlyCertified: 'Mostrar solo películas certificadas por Ohana',
    severe: 'Severo',
    moderate: 'Moderado',
    mild: 'Leve',
    slight: 'Ligero',
    /*movie popup */
    confidence: 'Fiabilidad',
    feedbackPopUp: 'Reportar un error',
    resultsBasedOn: ['Resultados en función de tus', 'ajustes', 'y', 'filtros'],
    manage_preferences: 'Ajustar mis preferencias',
    settings_page: {
      skip_intro:
        'Selecciona qué tipo de contenido quieres evitar. Ohana lo saltará automáticamente mientras ves la película.',
      warnings: {
        not_in_chrome:
          'No tienes nuestra extensión instalada (o estás usando una versión muy antigua). Necesitas la extensión para ver contenido editado',
        not_installed:
          'Para ver contenido editado, tienes que cambiar a un navegador compatible (Google Chrome en ordenador), e instalar nuestra extensión de Chrome.',
      },
    },
    community: {
      title: 'Comunidad',
      subtitle: 'Nuestro motor',
      intro1:
        'Una comunidad fuerte es lo que marca la diferencia en un proyecto como este. Necesitamos tu ayuda para construir la primera base de datos compartida sobre escenas en películas.',
      intro2:
        'Con tu ayuda, cualquier persona en el mundo podrá ver cualquier película sin el contenido "no saludable".',
      join: 'Únete a la comunidad',
      contribute: {
        install_html: 'Instala nuestra <b>extensión de Chrome</b> y empieza a usarla.',
        edit_html:
          'Empieza a <b>marcar contendio no saludable</b>. Los usarios que vengan después de ti podrán esquivarlo gracias a ti!',
        donate_html: '<b>Dona</b> para apoyar el desarrollo y pagar los costes de servidor.',
        code_html: '¿Sabes <b>programar</b>? ¡Buscamos voluntarios!',
        spread_html: '<b>Difunde</b> Ohana, para que más gente lo pueda disfrutar y apoyar.',
      },
    },
    popup: {
      types: {
        movie: 'Película{s}',
        show: 'Serie{s}',
        episode: 'Episodio{s}',
        series: 'Serie',
      },
      poweredBy: 'Gracias a',
      watchOptions: 'Dónde ver',
      showProvidersAnyway: 'Ignorar aviso',
      invalidBrowser: 'Tu navegador no es compatible con Ohana.',
      movieValues: 'Valores fomentados',
      no_providers: ['No se encontraron proveedores.', 'Buscar en TMDB'],
      goToFullDetails: '+info',
      details: 'Detalles',
      contributors: 'Contribuidores',
      installingOhanaIsRequired: 'Es necesario instalar Ohana para ver esta película editada',
      ohanaSummary: {
        unset: 'Para saber si esta {type} es saludable para ti, configura tus preferencias',
        clean: 'Esta {type} es saludable según tus ajustes. No hace falta filtrar nada.',
        done: 'Hemos creado {edits} filtro{s}, haciendo esta {type} saludable para tus ajustes.',
        missing:
          'Esta {type} tiene escenas que consideras no saludables. Pero no tenemos todos los filtros todavía.',
        mixed_with_edits:
          'Aunque ya tenemos {edits} filtro{s} para esta {type}, es posible que aún quede contenido no saludable sin editar.',
        mixed_no_edits:
          'Esta {type} puede tener cotenido que tú consideras no saludable. No estamos seguros.',
        unknown: 'No sabemos si este contendio es saludable para tus ajustes o no.',
      },
    },
    /*others */
    restore_deafult_values: 'Restaurar valores por defecto',
    navigate_to_home: 'Ir a la portada',
    utils: {
      readmore: 'Leer más',
      readless: 'Leer menos',
    },
    /*editors */
    leaderboard: {
      intro:
        'En esta tabla celebramos las contribuciones de nuestros usuarios, que hacen posible Ohana TV. ¡GRACIAS por vuestro trabajo!',
    },
  },
}

/*****************************************/
/* DO NOT TOUCH ANYTHING UNDER THIS LINE */
/*****************************************/

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

*/

import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: navigator.language || navigator.userLanguage, // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
})

export default i18n
