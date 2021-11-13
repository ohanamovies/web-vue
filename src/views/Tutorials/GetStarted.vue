<template>
  <div class="subpage">
    <!-- Header -->

    <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
      <div v-if="false" id="Testing with dialog SkipTags settings... Soooo easy :)">
        <v-btn @click="settings_dialog = !settings_dialog">settings</v-btn>
        <v-dialog
          v-model="settings_dialog"
          width="400"
          :fullscreen="isMobile"
          style="z-index: 999999999"
        >
          <v-card style="max-width: 400px; margin: auto">
            <v-card-title>Settings</v-card-title>
            <v-card-text>
              <Sensitivity />

              <v-btn flat text to="/settings">Más ajustes</v-btn>
              <v-btn flat text @click="settings_dialog = !settings_dialog">Done</v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
      <!--   SPANISH TEXT -->
      <div class="inner" v-if="$i18n.locale == 'es'">
        <div>
          Aquí encontrarás una introducción sobre como usar Ohana:
          <ol>
            <li><a href="/#how-to-watch">Cómo ver películas cortadas</a></li>
            <li><a href="/#how-to-create-filters">Cómo crear filtros</a></li>
          </ol>
          <p>
            Para saber qué es Ohana, visita nuestro sección
            <router-link to="/about">Acerca de</router-link>. Para obtener una lista de las
            preguntas más frecuentes, visite nuestro <router-link to="/faqs">FAQs</router-link>.
          </p>
        </div>

        <div id="main-tutorial-content">
          <div id="how-to-watch">
            <h2>Cómo ver películas cortadas</h2>

            <h4>Paso 1. Instalar Ohana</h4>
            <ol>
              <li>
                <b>Importante:</b> Asegúrate de estar usando
                <a href="https://www.google.com/chrome/" target="_blank">Google Chrome</a> en tu
                ordenador. <span v-if="isChrome" style="color: green">✓</span
                ><span v-else style="color: red">✗</span>
              </li>
              <li>
                Ve al
                <a
                  href="https://chrome.google.com/webstore/detail/ohana/nfkbclgkdifmoidnkapblfipbdkcppcf"
                  target="_blank"
                  >siguiente link</a
                >
                y haz clic en 'Agregar a Chrome' para instalar nuestra extensión.
                <span v-if="hasApp" style="color: green">✓</span
                ><span v-else style="color: red">✗</span>
              </li>
              <li>Fija la extensión para que quede visible.</li>
            </ol>

            <h4>Paso 2. Define tu sensibilidad</h4>

            <p>
              Ahora puedes escoger qué tipo de contenido quieres evitar. Esta configuración servirá
              para personalizar tu experiencia Ohana en todas partes.
            </p>

            <p>
              <router-link class="button special" to="/settings">{{
                $t('manage_preferences')
              }}</router-link>
            </p>

            <!-- NO LONGER NEEDED 
            <p>
              Abra la página principal de sus proveedores de contenido favoritos:
              <a href="https://www.netflix.com" target="_blank">Netflix</a>,
              <a href="https://es.hboespana.com/" target="_blank">HBO</a>,
              <a href="https://www.disneyplus.com/" target="_blank">Disney Plus</a>,
              <a href="https://ver.movistarplus.es//" target="_blank">Movistar Plus</a>, y haga clic
              en en el icono de Ohana para abrir la ventana emergente de la extensión de Ohana. A
              continuación solo siga las instrucciones para definir su configuración.
            </p>
            -->

            <h4>Paso 3. Encuentra una buena película limpia para ver</h4>
            <p>
              Usa nuestro catálogo para descubrir películas saludables. Puedes buscar por título, si
              estás interesado en una película concreta, o filtrar por películas de acción, por
              ejemplo.
            </p>

            <p>
              <router-link class="button special" to="/find-movies">{{
                $t('discoverContent')
              }}</router-link>
            </p>

            <p>
              Notarás que usamos un conjunto de iconos para hacerte saber de forma visual si (basado
              en su configuración personal) se puede ver una película / serie de forma segura.
            </p>

            <div>
              <p>
                <v-icon color="green">mdi-emoticon-happy</v-icon><b>Limpio:</b> El contenido era
                originalmente saludable. No hizo falta editar.<br />
                <v-icon color="green">mdi-content-cut</v-icon><b>Editado:</b> Había contenido no
                deseado, pero puedes evitarlo con nuestra extensión.<br />
                <v-icon color="blue">mdi-emoticon-happy</v-icon> |
                <v-icon color="blue">mdi-content-cut</v-icon><b>Ohana Limpio/Editado:</b> Los iconos
                azules indican que ha sido revisado por editores de confianza de Ohana.<br />
                <v-icon color="red">mdi-flag-variant</v-icon><b>No saludable:</b> Sabemos que esta
                película tiene contenido como no deseado, pero aún no está editada.<br />
                <v-icon color="gray">mdi-progress-question</v-icon><b>Desconocido:</b> No tenemos
                suficiente información, así que no podemos aportarte mucho.
              </p>
              <p>Verás estos iconos en muchos sitios:</p>
              <ol>
                <li>
                  En la sección de <router-link to="/find-movies">películas</router-link> de nuestra
                  web.
                </li>
                <li>Dentro de las propias plataformas (Netflix, Disney+, etc.).</li>
                <li>
                  En la barra de herramientas de Chrome: el ícono de nuestra extensión será
                  reemplazado por el ícono de estado de filtrado mientras ves una película.
                </li>
              </ol>

              <h4>Paso 4. ¡Disfruta de la película!</h4>
              <p>
                ¡Coge unas palomitas y disfruta del buen cine en casa! ¡Nosotros nos encargamos de
                quitar el contenido no saludable!
              </p>

              <h4>Paso 5. Consejo avanzado</h4>
              <p>
                Mientras ves una película / serie, el logotipo de Ohana en la barra de herramientas
                de Chrome cambiará para informarte si, según tus ajustes, esa película / serie ha
                resultado saludable.
              </p>
              <p>
                Si haces clic en el icono, verás una lista detallada de las escenas que se van a
                saltar. Aquí puedes definir manualmente qué escenas omitir y cuáles poder ver.
              </p>
            </div>
          </div>

          <div id="how-to-create-filters">
            <h2>Cómo crear nuevos filtros</h2>

            <h4>Paso 1. Preparación</h4>
            <p>
              Asegúrate de haber instalado Ohana y de que has seleccionado una película o serie que
              quieras filtrar.
            </p>
            <p>
              Puedes identificar de forma fácil qué películas requieren edición mirando el icono de
              <i>Desconocido</i> <v-icon color="gray">mdi-progress-question</v-icon> o
              <i>Inseguro</i> <v-icon color="red">mdi-flag-variant</v-icon>, desde tu distribuidor
              de películas favorito: (Netflix, Disney+, HBO...); o bien desde la sección de
              <router-link to="/find-movies">contenido</router-link> de esta web. (Si tu haces clic
              sobre la etiqueta <i>Desconocido</i> o <i>Inseguro</i> en la web, verás las películas
              que requieren edición).
            </p>

            <h4>Paso 2. Abre el editor de Ohana</h4>
            <p>
              Empieza a ver la película o serie sobre la cual quieres realizar tus filtros. Para
              ello es necesario que abras la extensión de Ohana y hagas clic sobre el botón 'Editar
              filtros'.
            </p>
            <p>
              La extensión se abrirá. Sigue las instrucciones de registro y ¡Forma parte del grupo
              de editores de Ohana! Solo por registrarte como editor, serás un miembro
              <i>Joven Padawan</i>. Tan pronto como empieces a usar Ohana, ganes en experiencia y
              reconocimiento como editor, pasarás a ser un <i>Maestro Jedi</i> ¡con pleno uso de
              poderes de edición!
            </p>

            <h4>Paso 3. Creación de Filtros</h4>
            <p>
              Disfruta de unas palomitas y empieza a ver una película o serie. Si ves algo que
              quieras editar, presiona en el botón "Nuevo filtro" o mediante el atajo de teclado
              "Alt + N". (Si ya conoces donde está la escena que quieres editar, puedes avanzar a
              ese momento y continuar con el mismo proceso)
            </p>
            <p>
              Para protegerte durante la edición de ese contenido que no deseas ver, el vídeo será
              silenciado y quedará lieramente borroso. Puedes controls estos dos efectos mediante
              los botones de 'borroso' y 'silenciar'.
            </p>
            <p>
              Para indicar el final de una escena no deseada, presiona "Finalizar filtro" o "Alt +
              N". Se abrirá una ventana emergente que te pedirá que ajustes el filtro.
            </p>

            <h4>Paso 4. Afinar los filtros</h4>
            <p>Siga las instrucciones de la ventana emergente para ajustar el filtro creado ...</p>

            <h4>Paso 5. Establecer el estado del filtro</h4>

            <p>
              Repite los pasos 3 y 4 hasta que hayas añadido todas las escenas no deseadas. Por
              último, pero no menos importante, es importante actualizar el estado del filtro para
              que todos sepan que ahora es seguro ver esta película.
            </p>

            <p>
              Haz clic en el botón "Establecer estado del filtro" y selecciona, para cada categoría
              y etiqueta, el estado correcto. Haga clic en guardar y ¡listo! ¡Ahora todo el mundo
              puede disfrutar de la película o episodio! En nombre de toda la comunidad de Ohana
              ¡Gracias, eres un héroe!
            </p>
          </div>

          <!--<div id="more">
            <h2> Cómo instalar Ohana</h2>
            <p>
              
              Como básico, puede usar <router-link to="/find-movies"> esta sección </router-link> de la web de Ohana
              para buscar, entre otros, contenido que originalmente estaba editado y, por tanto, listo para que lo veas.
            </p>
            <p>
              Esta opción no requiere que te instales nada.
            </p>
            <p>
              Pero es posible que desees ver otras películas que sería genial que omitiera alguna de sus escenas.
              
            </p>
            <p>
              Pensamos lo mismo, y como sabíamos cómo programar, creamos nuestra extensión Ohana Chrome.
            </p>
            <p>
              Al instalarlo podrás ver contenido y nosotros nos encargaremos de quitar las escenas piezas que no deseas ver.
            </p>
            <p>This works as long as you:</p>
            <ol>
              <li>Ves películas o series desde tu navegador Chrome en un ordenador.</li>
              <li>Tienes la extensión Ohana instalada en Chrome.</li>
              <li>Veas contenido usando una de las plataformas compatibles con Ohana (enlace).</li>
              <li>Tienes una cuenta activa en una de las plataformas compatibles. Ohana actuará como un control remoto 
              para omitir contenido automáticamente, pero debes encargarte de poder
              acceder al contenido.
              </li>
              <li>
                La película o serie que estás viendo ha sido revisada por Ohana o uno de nuestros editores.
              </li>
            </ol>
          </div>

          <div>
            <h2>¿Cómo buscar y ver películas filtradas?</h2>
          </div>-->
        </div>
      </div>

      <!--   DEFAULT TEXT -->
      <div class="inner" v-else>
        <div>
          Here you'll find a quick guide about how to use Ohana. This is:
          <ol>
            <li><a href="#how-to-watch">How to watch clean movies</a></li>
            <li><a href="#how-to-create-filters">How to create filters</a></li>
          </ol>
          <p>
            To learn what's Ohana visit our <router-link to="/about">About section</router-link>.
            For a list of the most frequency asked questions visit our
            <router-link to="/faqs">FAQs</router-link>.
          </p>
        </div>

        <div id="main-tutorial-content">
          <div id="how-to-watch">
            <h2>How to watch a clean movie</h2>

            <h4>Step 1. Install Ohana</h4>
            <ol>
              <li>
                <b>Important:</b> Make sure you are using
                <a href="https://www.google.com/chrome/" target="_blank">Google Chrome</a> on a
                computer. <span v-if="isChrome" style="color: green">✓</span
                ><span v-else style="color: red">✗</span>
              </li>
              <li>
                Follow
                <a
                  href="https://chrome.google.com/webstore/detail/ohana/nfkbclgkdifmoidnkapblfipbdkcppcf"
                  target="_blank"
                  >this link</a
                >
                and click on 'Add to Chrome' to install our Chrome extension.
                <span v-if="hasApp" style="color: green">✓</span
                ><span v-else style="color: red">✗</span>
              </li>
              <li>Pin the extension so it's visible.</li>
            </ol>

            <h4>Step 2. Define your sensitivity</h4>

            <p>
              You can now define what kind of content you want to skip. These settings will be used
              all around to customize your Ohana experience.
            </p>
            <p>
              <router-link class="button special" to="/settings">{{
                $t('manage_preferences')
              }}</router-link>
            </p>

            <!-- NO LONGER NEEDED 
            <p>
              Abra la página principal de sus proveedores de contenido favoritos:
              <a href="https://www.netflix.com" target="_blank">Netflix</a>,
              <a href="https://es.hboespana.com/" target="_blank">HBO</a>,
              <a href="https://www.disneyplus.com/" target="_blank">Disney Plus</a>,
              <a href="https://ver.movistarplus.es//" target="_blank">Movistar Plus</a>, y haga clic
              en en el icono de Ohana para abrir la ventana emergente de la extensión de Ohana. A
              continuación solo siga las instrucciones para definir su configuración.
            </p>
            -->

            <h4>Step 3. Find a good clean movie to watch</h4>
            <p>
              Check our catalog to discover healthy movies. You can search for any specific movie by
              title, or narrow the list to only action movies, for instance.
            </p>

            <p>
              <router-link class="button special" to="/find-movies">{{
                $t('discoverContent')
              }}</router-link>
            </p>
            <p>
              To help you find a good clean movie we use a set of icons to let you known if (based
              on your personal settings) a movie / show can be watched safely.
            </p>
            <div>
              <p>
                <v-icon color="green" class="mb-1">mdi-emoticon-happy</v-icon><b>Clean:</b> Content
                was originally safe, it didn't need to be edited.<br />

                <v-icon color="green" class="mb-1">mdi-content-cut</v-icon><b>Edited:</b> There was
                unwanted content, but we will skip it all for you.<br />

                <v-icon color="blue" class="mb-1">mdi-emoticon-happy</v-icon> |
                <v-icon color="blue" class="mb-1">mdi-content-cut</v-icon
                ><b>Ohana Clean/Edited:</b> Blue icons indicate it has been reviewed by Ohana
                trusted editors.<br />

                <v-icon color="red" class="mb-1">mdi-flag-variant</v-icon><b>Unsafe:</b> Unwanted
                content was flagged, but movie hasn't been edited yet.<br />

                <v-icon color="gray" class="mb-1">mdi-progress-question</v-icon><b>Unknown:</b> We
                can't help as we don't have information yet.
              </p>
              <p>You will see those icons after telling us your sensitivity, in multiple places:</p>
              <ol>
                <li>
                  In the <router-link to="/find-movies">movies</router-link> section of this
                  website.
                </li>
                <li>In the browser section of the content providers (like Netflix).</li>
                <li>
                  In the Chrome toolbar: the Ohana icon will be replaced by the filtering status
                  icon when watching a movie
                </li>
              </ol>

              <h4>Step 4. Enjoy the movie!</h4>
              <p>
                Grab some popcorn an enjoy the movie! We will skip all the unwanted content for you!
              </p>

              <h4>Step 5. Pro tip</h4>
              <p>
                While watching a movie/show, the Ohana logo on the Chrome toolbar will change to let
                you know if, based on your settings, that movie/show is safe to watch.
              </p>
              <br />
              <p>
                If you click on the icon, you will see a detailed list of scenes being skipped. Here
                you can manually define which scenes to skip and which ones to watch on a one to one
                basis
              </p>
            </div>
          </div>

          <div id="how-to-create-filters">
            <h2>How to create new filters</h2>

            <h4>Step 1. Get ready</h4>
            <p>
              Make sure you have Ohana installed and that you have selected a good movie/series to
              filter.
            </p>
            <p>
              You can easily identify which movies require editing by looking for the
              <i>Unkown</i> <v-icon color="gray">mdi-progress-question</v-icon> or <i>Unsafe</i>
              <v-icon color="red">mdi-flag-variant</v-icon> icons, either by browsing your favourite
              provider or in the <router-link to="/find-movies">movies</router-link> section of this
              website. (If you click on the <i>Unkown</i> and <i>Unsafe</i> label on the website,
              you will see those movies that require editing).
            </p>

            <h4>Step 2. Open the editor's sidebar</h4>
            <p>
              Start watching the movie/episode you want to create filters for. Open the Ohana
              extension popup and click on the 'Edit filters' button.
            </p>
            <p>
              A sidebar will open. Follow the instructions to login/register and become an Ohana
              editor! When you first register you will join as a <i>Young Padawan</i>, as you grow
              in the use of Ohana and increase your community recognition, you will progress into a
              <i>Jedi Master</i> with full editing powers!
            </p>

            <h4>Step 3. Create filters</h4>
            <p>
              Grab some popcorn and start watching the movie/series. If you spot anything you want
              to flag, press the "New filter" button or the keyboard shortcut "Alt + N". (If you
              already know where the unwanted scene is, you can fastforward to that time and follow
              the same process).
            </p>
            <p>
              To protect you from unwanted content, while adding a scene the video will get muted
              and a bit blurred. You can control this behaviour with the 'blur on mark' and 'mute on
              mark' inputs.
            </p>
            <p>
              To mark the end of an unwanted scene press "End filter" or "Alt + N". A popup asking
              you to fine tune the filter will open.
            </p>

            <h4>Step 4. Fine tune filters</h4>
            <p>Follow the instrucctions on the popup to fine tune the created filter...</p>

            <h4>Step 5. Set filter status</h4>

            <p>
              Repeat steps 3 and 4 until all the unwanted scenes have been added. And last but not
              least, it is importat to update the filter status to let everyone know this movie is
              now safe to watch!
            </p>

            <p>
              Click the "Set filter status" button and select, for each category &amp; tag, the
              right status. Click on save and you are done! Now everyone in the world can enjoy a
              clean movie/episode! In the name of everyone: thank you, you are a hero!
            </p>
          </div>

          <!--<div id="more">
            <h2>How to install Ohana</h2>
            <p>
              As a basic, you can use <router-link to="/find-movies">this section</router-link> of the
              Ohana website to find, among others, content that was originally clean and therefore
              ready for you to watch out of the box.
            </p>
            <p>
              That requires no installation.
            </p>
            <p>
              But you may also want to watch those other movies that would be great if you could
              just skip few specific scenes.
            </p>
            <p>
              We thoguth the same, and since we knew how to code, we created our Ohana Chrome
              extension.
            </p>
            <p>
              By installing it, you can watch content and we will take care of removing the pieces
              that you don't want to watch.
            </p>
            <p>This works as long as you:</p>
            <ol>
              <li>Watch movies or shows using Chrome browser on a computer.</li>
              <li>Have the Ohana extension installed in that browser.</li>
              <li>Watch the content using one of the Ohana compatible platforms (link).</li>
              <li>
                You have an active account on that platform. Ohana will act as a remote to
                automatically skip content, but you need to take care of accessing the content
              </li>
              <li>
                The movie/show you are watching has been reviewed by Ohana or one of our editor.
              </li>
            </ol>
          </div>

          <div>
            <h2>How to find &amp; watch filtered movies?</h2>
          </div>-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import sharedjs from '@/sharedjs'
import { mapState } from 'vuex'
import Sensitivity from '@/components/Settings/Sensitivity.vue'
const rawTags = require('../../assets/raw_tags')

export default {
  components: { Sensitivity },
  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    let title = 'Get started - Ohana'
    let desc = 'Learn how to watch clean content'
    return sharedjs.headObject(title, desc)
  },

  data() {
    return {
      key: 'value',
      tags: rawTags.content,
      settings_dialog: false,
      // providersList: [
      //   { text: 'Netflix', value: 'netflix' },
      //   { text: 'HBO', value: 'hbo' },
      //   { text: 'Movistar', value: 'movistar' },
      //   { text: 'Disney Plus', value: 'disneyplus' },
      //   { text: 'Rakuten', value: 'rakuten' }
      // ]
    }
  },
  computed: {
    ...mapState(['isChrome', 'hasApp', 'isMobile']),
  },
}
</script>

<style>
h2 {
  padding-top: 40px;
  margin-bottom: 10px;
  font-weight: bold;
}

h4 {
  margin: 20px 0 5px 0;
  font-weight: bold;
  font-size: 1.3em;
}
</style>
