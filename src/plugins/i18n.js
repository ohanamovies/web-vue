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
    homeHeroText1: 'Ohana TV',
    homeHeroText2: 'Enjoy your favourite movies in a healthy way',
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
    scroll_for_more: 'Scroll to learn more ;)',
    prop1: 'Health',
    prop1Desc: 'Mental health aware',
    prop2: 'Choice',
    prop2Desc: 'You decide what you watch',
    prop3: 'Community',
    prop3Desc: 'Built by people like you',
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
    confidence: 'Confidence',
    feedbackPopUp: 'Report an error',
    resultsBasedOn: ['Healthy movies for you', 'settings', 'and', 'filters'],
    manage_preferences: 'Manage preferences',

    settings_page: {
      skip_intro:
        'Select what kind of content do you want to avoid. Ohana will skip it automatically while you watch movies.',
      warnings: {
        not_in_chrome:
          "You don't have our extension installed. You will need it if you want to watch edited content.",
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
    restore_deafult_values: 'Restore default values',
    navigate_to_home: 'Navigate to home',
    utils: {
      readmore: 'Read more',
      readless: 'Read less',
    },

    leaderboard: {
      intro:
        'In this table we celebrate the contributions of our users, who make possible Ohana TV. THANK YOU for your hard work!',
    },
    override: 'Override:',
    user_feedback: 'User Feedback:',
    check_responses: 'check responses',
    for_a_guide_and: 'For a guide and recipes on how to configure / customize this project,',
    for_a_guide_and_2: 'check out the',
    overview: 'Overview',
    check_the_list_of: 'Check the list of episodes below to see more granular details',
    go_to_the_series: 'Go to the series page to see more granular details',
    request_review: 'Request review',
    error_please_try_again: 'Error! Please try again.',
    try_again: 'try again',
    you_may_check: 'You may check',
    imdb: 'IMDb',
    you_may_check_2: 'as fallback',
    done: 'Done',
    close: 'Close',
    hide_watch_options: 'Hide watch options',
    without_ohana: 'Without Ohana',
    with_ohana: 'With Ohana',
    applying_your_settings: 'Applying your settings',
    filters_status: 'Filters Status',
    skip: 'Skip',
    what: 'What',
    status: 'Status',
    my_vote: 'My Vote',
    save_my_vote: 'save my vote',
    cancel: 'Cancel',
    continue: 'Continue',
    you_will_encounter_unhealthy: 'you will encounter unhealthy content.',
    you_will_find_unhealthy: 'You will find unhealthy content if you continue.',
    you_may_encounter_unhealthy: 'You may encounter unhealthy content if you continue.',
    before_edits: '(before edits)',
    remember_to_save: 'Remember to save!',
    you_need_to_have:
      'You need to have an account and log in if you want to share your vote about this content',
    log_in: 'Log in',
    want_more: 'Want more?',
    the_ongoing_development_of:
      'The ongoing development of Ohana is made possible by its communnity of volunteers, donors, and sponsors. Want to help?',
    donate: 'Donate',
    discover_other_ways_to: 'Discover other ways to help',
    sponsors: 'Sponsors',
    ohana_tv_uses_data: 'Ohana TV uses data from',
    and: 'and',
    ohana_tv_uses_data_2: 'but is not endorsed nor certified by TMDB or IMDb.',
    terms_of_use: 'Terms of use',
    privacy_policy: 'Privacy Policy',
    contact_us: 'Contact us',
    get_in_touch: 'Get in touch',
    wed_love_to_hear: "We'd love to hear from you",
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send',
    install_ohana_tv: 'Install Ohana TV',
    our: 'Our',
    our_2: 'Ohana Chrome Extension',
    our_3:
      'automagically skips the unhealthy content, based on your preferences. It only works while watching from a Chrome Browser.',
    well_done_you_have: 'Well done! You have our',
    well_done_you_have_2: 'Chrome Extension',
    ohana_extension_is_not: 'Ohana extension is not yet installed in this browser.',
    to_install_ohana_tv: 'To install Ohana TV, go to',
    to_install_ohana_tv_2: 'our Chrome Store page',
    to_install_ohana_tv_3: 'and click on "Add to Chrome".',
    it_seems_this_browser: 'It seems this browser is not compatible with our Chrome Extension.',
    please_make_sure_you: 'Please make sure you are using',
    please_make_sure_you_2: 'on a desktop computer (Windows, Mac, or Linux...).',
    without_the_chrome_extension:
      "Without the Chrome Extension, you can't watch edited content. You can still check this website for information about movies.",
    no_options_found: 'No options found',
    logout: 'Logout',
    log_in_or_sign: 'Log in or sign up',
    with_an_ohana_tv:
      'With an Ohana TV account, you will be able to contribute to the community. Also, your preferences will follow you along if you switch devices.',
    already_a_user: 'Already a user?',
    dont_have_an_account: "Don't have an account?",
    sign_up: 'Sign up',
    i_agree_with_the: 'I agree with the',
    i_agree_with_the_2: 'Terms of use',
    i_agree_with_the_3: 'and the',
    i_agree_with_the_4: 'Privacy Policy',
    not_feeling_like_identifying: 'Not feeling like identifying now?',
    continue_as_guest: 'Continue as guest',
    what_platforms_do_you: 'What platforms do you use?',
    ohana_tv_redirects_you:
      "Ohana TV redirects you to the providers that offer the content. We don't offer content ourselves.",
    we_will_prioritize_content: 'We will prioritize content available in your providers.',
    note: 'Note:',
    content_providers_netflix_etc:
      "Content providers (Netflix, etc.) don't offer the same movies/shows in all countries. This setting is used to show you watch options available in your country.",
    filters: 'Filters',
    platforms: 'Platforms',
    account: 'Account',
    settings_old: 'Settings old',
    not_sure: 'Not sure?',
    use_the_most_used: 'use the most used settings',
    when: 'When:',
    always: 'Always',
    recap: 'Recap:',
    reset: 'Reset',
    my_edits: 'my edits',
    welcome_to_ohana_tv: 'Welcome to Ohana TV',
    what_we_watch_affects: 'What we watch affects us',
    movies_and_shows_may: 'Movies and shows may have unhealthy content.',
    get_votes: 'Get votes',
    error: 'Error.',
    try_again_l: 'try again',
    loading: 'Loading...',
    previous_page: 'previous page',
    next_page: 'next page',
    part_of: 'Part of',
    unknowninvalid_item: 'Unknown/Invalid item',
    edited_by: 'Edited by:',
    this_should_be_fixed: 'This should be fixed by opening the url and doing a manual mapping',
    here_are: 'Here are',
    elements: 'Elements',
    thanks_for_installing_ohana: 'Thanks for installing Ohana!',
    ohana_tv_experience_will: 'Ohana TV experience will adjust to your settings.',
    see_tour: 'See tour',
    define_your: 'Define your',
    settings_l: 'settings',
    to_see_this_section: 'to see this section.',
    no_titles_found_matching: 'No titles found matching your settings.',
    no_titles_found_matching_settings: 'No titles found matching your search.',
    a_provider_is_missing: 'A provider is missing? you can add it!',
    invalid_link: 'Invalid Link',
    submit: 'Submit',
    this_doest_work_yet: 'This doest work yet sorry',
    error_not_imdb_provided: 'Error: not imdb provided',
    loading_please_wait_a: 'Loading... Please wait a minute',
    this_is_work_in: 'This is work in progress',
    no_values_known_for: 'No values known for this movies. Be the first one to add one!',
    stop_editing: 'Stop editing',
    edit: 'Edit',
    cast_values_vote: 'cast values vote',
    unhealthy: 'Unhealthy:',
    healthy: 'Healthy:',
    hmmm_no_data: 'Hmmm. No data?',
    hmm_something_seems_off: 'Hmm, something seems off.',
    content: 'Content',
    values: 'Values',
    episodes: 'Episodes',
    providers_where_ohana_was: 'Providers where ohana was used (kind of)',
    link: 'Link:',
    join_status: 'join status',
    average_between_providers: '(average between providers)',
    contributors: 'Contributors:',
    last_edited: 'Last edited:',
    draft: 'DRAFT',
    flags: 'Flags',
    no_filters_so_far: 'No filters so far.',
    ohana_tv_news: 'Ohana TV News',
    stay_tuned_will_soon:
      'Atento! pronto empezaremos a listar aquí actualizaciones y novedades sobre el desarrollo de Ohana TV',
    ohana_stats: 'Ohana Stats',
    below_you_will_find:
      'Below you will find some real time data about how our filtering creation is going. Please notice this page is work in progress, and might change a lot.',
    number_of_movies_worked: 'Number of movies worked by the user that reviewed the content',
    by_content_filtered: 'By content filtered',
    what_kind_of_content:
      'What kind of content are the users filtering (categories marked as "done")',
    error_page_not_found: 'Error 404. Page not found',
    fear_not_you_can:
      'Fear not! You can use the site menu to find the content you are looking for.',
    welcome_tour: `              <p>
                <b>What we watch affects us</b><br />Movies and shows may have unhealthy content.
              </p>
              <br />
              <p>
                <b>Ohana TV helps you avoding the unhealthy</b> <br />
                In two ways: (1) we inform you, and (2) our chrome extension enables you to skip the
                unhealthy.
              </p>
              <br />
              <p>
                <b>You define what to skip and what not.</b> <br />
                Let's do that now.
              </p>`,
  },
  es: {
    whatIsOhana: '¿Qué es Ohana?',
    welcome: 'Bienvenido a Ohana',
    homeHeroText1: 'Ohana TV',
    homeHeroText2: 'Disfruta de tus películas favoritas de forma saludable',
    install: 'Instalar',
    home: 'Portada',
    about: 'Acerca de',
    settings: 'Ajustes',
    getStarted: 'Empezar',
    editors: 'Editores',
    learnMore: 'Aprende más',
    discoverContent: 'Buscar películas',
    support_ohana: 'Apoya a Ohana',
    discoverContent_long: 'Encuentra algo genial para ver',
    language: 'Idioma',
    scroll_for_more: 'Desplázate para obtener más información ;)',
    prop1: 'Salud',
    prop1Desc: 'consciente de la salud mental',
    prop2: 'Elección',
    prop2Desc: 'Tú decides lo que ves',
    prop3: 'Comunidad',
    prop3Desc: 'Construido por gente como tú',
    value1: 'Salud mental',
    value1Desc:
      'En un mundo con crecientes problemas de salud mental, algunas escenas pueden dañar a los espectadores. ',
    value2: 'Elección',
    value2Desc:
      'Nuestro objetivo es empoderarte como espectador, brindándote las herramientas para elegir qué ver y qué no. ',
    value3: 'Protección infantil',
    value3Desc:
      'La infancia debe ser una época en la que los niños puedan crecer, explorar y desarrollarse en un entorno seguro. ',
    value4: 'Derechos de las mujeres',
    value4Desc: 'No somos objetos para la satisfacción de los hombres. ',
    value5: 'Pan comido',
    value5Desc:
      'Trabajamos directamente con sus proveedores favoritos, simplemente instale nuestra extensión de Chrome, díganos sus preferencias y siga viendo películas como de costumbre mientras trabajamos para usted en segundo plano.',
    value6: 'Comunidad',
    value6Desc: 'No somos una gran corporación, somos una comunidad de cinéfilos como tú. ',
    advanced_search: 'Búsqueda Avanzada',
    search_subtitle: '¡Encuentra algo genial para ver!',
    whatDoYouSkip: 'Contenido no saludable para omitir',
    whatDoYouSkip_tip:
      'Marca debajo el tipo de contenido que deseas evitar mientras disfrutas tus películas favoritas.',
    showAdvanced: 'Ocultar búsqueda avanzada | Mostrar búsqueda avanzada',
    safety: 'Seguridad',
    movies: 'Películas',
    shows: 'Series',
    providers: 'Proveedores',
    genre: 'Género | Géneros',
    showOnlyClean: 'Mostrar solo películas saludables',
    showOnlyCertified: 'Mostrar solo películas certificadas por Ohana',
    severe: 'Severo',
    moderate: 'Moderado',
    mild: 'Leve',
    slight: 'Muy leve',
    confidence: 'Confianza',
    feedbackPopUp: 'Informar de un error',
    resultsBasedOn: ['Películas saludables para tus', 'ajustes', 'y', 'filtros'],
    manage_preferences: 'Administrar preferencias',
    settings_page: {
      skip_intro: 'Seleccione qué tipo de contenido desea evitar. ',
      warnings: {
        not_in_chrome: 'No tienes nuestra extensión instalada. ',
        not_installed:
          'Para ver contenido editado, debes usar navegador compatible (Google Chrome en escritorio) e instalar nuestra extensión de Chrome.',
      },
    },
    community: {
      title: 'Comunidad',
      subtitle: 'Nuestro corazón y motor',
      intro1: 'Una comunidad fuerte es lo que marca la diferencia en un proyecto como este. ',
      intro2: 'Con tu ayuda, cualquier persona en el mundo podrá ver películas de forma saludable.',
      join: 'Unete a la communidad',
      contribute: {
        install_html: 'Instala nuestra <b>extensión de Chrome</b> y empezar a usarla.',
        edit_html: 'Sigue adelante y <b>marca contenido no saludable</b>. ',
        donate_html: '<b>Dona</b> para apoyar el desarrollo de Ohana y pagar las facturas.',
        code_html: '¿Sabes <b>programar</b>? Estamos buscando voluntarios',
        spread_html:
          '<b>Difundir la palabra</b> sobre Ohana, para que otros puedan disfrutarlo y apoyarlo',
      },
    },
    popup: {
      types: {
        movie: 'Películas}',
        show: 'Series{s}',
        episode: 'Episodio{s}',
        series: 'Mostrar{s}',
      },
      poweredBy: 'Powered by',
      movieValues: 'Valores fomentados',
      watchOptions: 'Ver opciones',
      showProvidersAnyway: 'Ignorar advertencia',
      invalidBrowser: 'Este navegador no es compatible con Ohana.',
      no_providers: ['No se encontraron proveedores.', 'Prueba en TMDB'],
      goToFullDetails: '+ info',
      details: 'Detalles',
      contributors: 'Colaboradores',
      installingOhanaIsRequired: 'Se requiere instalar Ohana para eliminar escenas no saludables: ',
      ohanaSummary: {
        unset: 'Para saber si esta {type} es saludable para ti, haznos saber tus preferencias',
        clean: 'Esta {type} es saludable para su configuración. ',
        done: 'Hemos creado {edits} filter{s} para que este {type} sea saludable para su configuración',
        missing: 'Esta {type} contiene escenas poco saludables que has marcado para omitir. ',
        mixed_with_edits:
          'Aunque tenemos {edits} filtro{s} para esta {type}, es posible que aún contenga contenido que considere no saludable.',
        mixed_no_edits: 'Esta {type} puede contener escenas poco saludables. ',
        unknown: '¡Ay! ',
      },
    },
    restore_deafult_values: 'Restaurar valores predeterminados',
    navigate_to_home: 'Ir a la portada',
    utils: {
      readmore: 'Leer más',
      readless: 'Leer menos',
    },
    leaderboard: {
      intro:
        'En esta mesa celebramos los aportes de nuestros usuarios, quienes hacen posible Ohana TV. ',
    },
    override: 'Anular:',
    user_feedback: 'Comentarios del usuario:',
    check_responses: 'comprobar las respuestas',
    for_a_guide_and:
      'Para obtener una guía y recetas sobre cómo configurar/personalizar este proyecto,',
    for_a_guide_and_2: 'revisar la',
    overview: 'Descripción general',
    check_the_list_of:
      'Consulte la lista de episodios a continuación para ver más detalles granulares',
    go_to_the_series: 'Vaya a la página de la serie para ver más detalles granulares',
    request_review: 'Solicitar revisión',
    error_please_try_again: '¡Error! ',
    try_again: 'intentar otra vez',
    you_may_check: 'puedes comprobar',
    imdb: 'IMDb',
    you_may_check_2: 'como respaldo',
    done: 'Hecho',
    close: 'Cerrar',
    hide_watch_options: 'Ocultar opciones de visualización',
    without_ohana: 'Sin Ohana',
    with_ohana: 'Con Ohana',
    applying_your_settings: 'Aplicando tu configuración',
    filters_status: 'Estado de los filtros',
    skip: 'Saltar',
    what: 'Qué',
    status: 'Estado',
    my_vote: 'Mi voto',
    save_my_vote: 'guardar mi voto',
    cancel: 'Cancelar',
    continue: 'Continuar',
    you_will_encounter_unhealthy: 'encontrará contenido no saludable.',
    you_will_find_unhealthy: 'Encontrará contenido poco saludable si continúa.',
    you_may_encounter_unhealthy: 'Es posible que encuentre contenido no saludable si continúa.',
    before_edits: '(antes de editar)',
    remember_to_save: '¡Recuerda guardar!',
    you_need_to_have:
      'Debes tener una cuenta e iniciar sesión si desea compartir su voto sobre este contenido.',
    log_in: 'Iniciar sesión',
    want_more: '¿Quieres más?',
    the_ongoing_development_of:
      'El desarrollo de Ohana es posible gracias a su comunidad de voluntarios, donantes y patrocinadores. ',
    donate: 'Donar',
    discover_other_ways_to: 'Descubre otras formas de ayudar',
    sponsors: 'Patrocinadores',
    ohana_tv_uses_data: 'Ohana TV utiliza datos de',
    and: 'y',
    ohana_tv_uses_data_2: 'pero no está respaldado ni certificado por TMDB o IMDb.',
    terms_of_use: 'Condiciones de uso',
    privacy_policy: 'política de privacidad',
    contact_us: 'Contáctenos',
    get_in_touch: 'Ponerse en contacto',
    wed_love_to_hear: 'Nos encantaría saber de usted',
    name: 'Nombre',
    email: 'Correo electrónico',
    message: 'Mensaje',
    send: 'Enviar',
    install_ohana_tv: 'Instalar Ohana TV',
    our: 'Nuestro',
    our_2: 'Extensión Ohana Chrome',
    our_3: 'omite automáticamente el contenido no saludable, según sus preferencias. ',
    well_done_you_have: '¡Bien hecho! ',
    well_done_you_have_2: 'Extensión de cromo',
    ohana_extension_is_not: 'La extensión Ohana aún no está instalada en este navegador.',
    to_install_ohana_tv: 'Para instalar Ohana TV, vete a',
    to_install_ohana_tv_2: 'nuestra página de Chrome Store',
    to_install_ohana_tv_3: 'y haz clic en "Agregar a Chrome".',
    it_seems_this_browser:
      'Parece que este navegador no es compatible con nuestra extensión de Chrome.',
    please_make_sure_you: 'Por favor, asegúrate de que estás usando',
    please_make_sure_you_2: 'en un ordenador de escritorio (Windows, Mac o Linux...).',
    without_the_chrome_extension:
      'Sin la extensión de Chrome, no puedes ver el contenido editado. ',
    no_options_found: 'No se encontraron opciones',
    logout: 'Cerrar sesión',
    log_in_or_sign: 'Iniciar sesión o registrarse',
    with_an_ohana_tv: 'Con una cuenta de Ohana TV, podrá contribuir a la comunidad. ',
    already_a_user: '¿Ya eres usuario?',
    dont_have_an_account: '¿No tienes una cuenta?',
    sign_up: 'Inscribirse',
    i_agree_with_the: 'estoy de acuerdo con las',
    i_agree_with_the_2: 'condiciones de uso',
    i_agree_with_the_3: 'y la',
    i_agree_with_the_4: 'política de privacidad',
    not_feeling_like_identifying: '¿No tienes ganas de identificarte ahora?',
    continue_as_guest: 'Continua como invitado',
    what_platforms_do_you: '¿Qué plataformas usas?',
    ohana_tv_redirects_you: 'Ohana TV te redirige a los proveedores que ofrecen el contenido. ',
    we_will_prioritize_content: 'Priorizaremos el contenido disponible en tus proveedores.',
    note: 'Nota:',
    content_providers_netflix_etc:
      'Los proveedores de contenido (Netflix, etc.) no ofrecen las mismas películas o programas en todos los países. ',
    filters: 'filtros',
    platforms: 'Plataformas',
    account: 'Cuenta',
    settings_old: 'Configuraciones antiguas',
    not_sure: '¿No estas seguro?',
    use_the_most_used: 'usar las configuraciones más frecuentes',
    when: 'Cuando:',
    always: 'Siempre',
    recap: 'Resumen:',
    reset: 'Reiniciar',
    my_edits: 'mis ediciones',
    welcome_to_ohana_tv: 'Bienvenido a Ohana TV',
    what_we_watch_affects: 'Lo que vemos nos afecta',
    movies_and_shows_may: 'Las películas y los programas pueden tener contenido poco saludable.',
    get_votes: 'Obtener votos',
    error: 'Error.',
    try_again_l: 'intentar otra vez',
    loading: 'Cargando...',
    previous_page: 'pagina anterior',
    next_page: 'siguiente página',
    part_of: 'Parte de',
    unknowninvalid_item: 'Elemento desconocido/no válido',
    edited_by: 'Editado por:',
    this_should_be_fixed: 'Esto debería arreglarse abriendo la url y haciendo un mapeo manual',
    here_are: 'Aquí están',
    elements: 'Elementos',
    thanks_for_installing_ohana: '¡Gracias por instalar Ohana!',
    ohana_tv_experience_will: 'La experiencia de Ohana TV se ajustará a su configuración.',
    see_tour: 'Ver recorrido',
    define_your: 'Defina su',
    settings_l: 'ajustes',
    to_see_this_section: 'para ver esta sección.',
    no_titles_found_matching: 'No se encontraron títulos que coincidan con su configuración.',
    no_titles_found_matching_settings: 'No se encontraron títulos que coincidan con su búsqueda.',
    a_provider_is_missing: '¿Falta un proveedor? ',
    invalid_link: 'Enlace no válido',
    submit: 'Entregar',
    this_doest_work_yet: 'Esto aún no funciona lo siento',
    error_not_imdb_provided: 'Error: no se proporciona imdb',
    loading_please_wait_a: 'Cargando... Por favor espera un minuto',
    this_is_work_in: 'Este es un trabajo en progreso',
    no_values_known_for: 'No se conocen valores para estas películas. ',
    stop_editing: 'Deja de editar',
    edit: 'Editar',
    cast_values_vote: 'votar valores emitidos',
    unhealthy: 'Insalubre:',
    healthy: 'Saludable:',
    hmmm_no_data: 'Mmm. No hay datos?',
    hmm_something_seems_off: 'Hmm, algo parece estar mal.',
    content: 'Contenido',
    values: 'Valores',
    episodes: 'Episodios',
    providers_where_ohana_was: 'Proveedores donde se usó ohana (más o menos)',
    link: 'Enlace:',
    join_status: 'Estado unificado',
    average_between_providers: '(promedio entre proveedores)',
    contributors: 'Colaboradores:',
    last_edited: 'Última edición:',
    draft: 'BORRADOR',
    flags: 'flags',
    no_filters_so_far: 'No hay filtros de momento.',
    ohana_tv_news: 'Noticias de Ohana TV',
    stay_tuned_will_soon: 'Atento! ',
    ohana_stats: 'Estadísticas de Ohana',
    below_you_will_find:
      'A continuación encontrarás algunos datos en tiempo real sobre cómo va nuestra creación de filtros. ',
    number_of_movies_worked: 'Número de películas editas por el usuario que revisó el contenido',
    by_content_filtered: 'Por contenido filtrado',
    what_kind_of_content:
      'Qué tipo de contenido están filtrando los usuarios (categorías marcadas como "hechas")',
    error_page_not_found: 'Error 404 - Página no encontrada',
    fear_not_you_can:
      '¡No temás! Puedes usar el menu para encontrar el contenido que estas buscando.',
    welcome_tour: `<p>
                <b>Lo que vemos nos afecta</b><br />Las películas y programas pueden tener contenido poco saludable.
              </p>
              <br />
              <p>
                <b>Ohana TV te ayuda a evitar lo poco saludable</b> <br />
                De dos formas: (1) te informamos y (2) nuestra extensión de Chrome te permite omitir lo
                poco saludable.
              </p>
              <br />
              <p>
                <b>Tú decides qué omitir y qué no.</b> <br />
                ¡Vamos a ellos!
              </p>`,
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
