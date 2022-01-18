<template>
  <div class="subpage">
    <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
      <!--   SPANISH TEXT -->
      <div class="inner" v-if="$i18n.locale == 'es'">
        <div id="menu">
          En esta sección encontraras:
          <ol>
            <li><a href="#what-is-ohana">¿Qué es Ohana?</a></li>
            <li><a href="#why-skipping">¿Por qué omitir contenido?</a></li>
            <li><a href="#vision-statement">¿Por qué estamos aquí? (Visión)</a></li>
            <li><a href="#mission-statement">¿Qué hacemos? (Misión)</a></li>
            <li><a href="#how-can-i-help">¿Cómo puedo ayudar?</a></li>
          </ol>
          <p>
            Para comenzar a usar Ohana visite nuestra sección
            <router-link to="get-started">empezar</router-link>. Para obtener una lista de las
            preguntas más frecuentes, visite nuestro <router-link to="/faqs">FAQs</router-link>.
          </p>
        </div>

        <div id="what-is-ohana">
          <h2>¿Qué es Ohana?</h2>
          <div class="image" style="float: right; padding: 10px">
            <img src="images/means-family.jpg" height="275px" />
          </div>
          <p>
            Ohana es una comunidad de familias y apasionados del cine como tú que comparten la
            pasión por las buenas películas limpias.
          </p>
          <p>
            Como comunidad, desarrollamos un conjunto de herramientas que ayudan a las personas a
            ver películas sin tener que preocuparse por el contenido molesto o inapropiado que no
            quieren ver (escenas de sexo, contenido violento, etc.)
          </p>
          <p>
            Nuestra extensión de Chrome se integra en Netflix, HBO, etc., lo que permite a los
            usuarios omitir aquellas escenas que no quieren ver. ¡Con Ohana tú decides qué mirar y
            qué saltar!
            <!--¿No quieres ver escenas sangrientas? Dile a Ohana que se salte el contenido muy violento.-->
          </p>
          <p>
            Si te gustan las películas geniales, pero no te gusta ver escenas inapropiadas, te
            encantará conocer Ohana.
          </p>
        </div>

        <div id="why-skipping">
          <h2>¿Por qué decidir qué ver?</h2>

          ¿Por qué quieres saltarte escenas? ¿No es eso censura? Son muchas las razones por las que
          la gente podría querer saltarse escenas...

          <h4>Propósito educativo</h4>

          Algunas escenas muestran comportamientos moralmente incorrectos como buenos (por ejemplo,
          el tipo genial es el traficante de drogas / abusador sexual / ...). Esto empuja a los
          niños (y a todos realmente) a ver esas acciones como buenas.
          <!--Podemos mostrar una pancarta en lugar de saltarnos la escena, ayudando a los padres a discutirla con sus hijos (y con los adultos
          conscientes de la perspectiva moral de la escena).
          Lo importante aquí es si la mala acción se presenta como buena. Pero una pancarta para escenas con ejemplos morales positivos también
          podría ayudar / desencadenar discusiones.-->

          <h4>Usar vs amar</h4>
          <p>
            Creemos que las personas deben ser amadas, no utilizadas. Queremos abordar el sexo como
            una forma de mostrar amor / entregarnos a la otra persona. De esta forma tratamos de
            evitar utilizar a otras personas (ya sea físicamente o en un video) como herramienta
            para obtener placer.
          </p>

          <!--Aquí es importante si la escena está destinada a despertar al espectador (hay mucha desnudez en la capilla sixtina) ¿Ocurre esto con algún otro
          tipo de escena? Ver a alguien robar es muy diferente a robar, ver porno es usar a la gente por placer.-->

          <h4>Escenas inquietantes</h4>
          Desagradable, aterrador, repugnante... Podemos filtrar todo tipo de contenido, teniendo
          una especial mención en poder evitar también: - Contenido para aquellas personas con
          adicciones (problemas con el juego, el alcohol, la pornografía...). - También podemos
          retirar aquellas escenas que contengan fobias o temas que puedan afectar a personas con
          trastorno por estrés postraumático y les pueda desencadenar flashbacks.

          <!--<h4>Otros usos</h4>
          <p>Filtrado ideológico (No hacemos eso aquí) Alejar al público / reducir la visibilidad de ciertas ideas / grupos. Línea fina con la educativa.
          ¿Cómo podemos distinguirlos? Quizás colocar una pancarta en lugar de recortar la escena pueda ayudar. Filtrado de anuncios (no hacemos eso aquí)
          Los creadores de contenido merecen que se les pague por su trabajo, si le muestran anuncios para ganarse la vida, no los eliminaremos. Verificación
          de hechos Podemos mostrar un banner / enlace a fuentes de terceros (¿wikipedia?) Cuando se presenta un hecho en una película Documentales
          especialmente útiles (pero no reducidos a)-->
        </div>

        <div id="vision-statement">
          <h2>¿Por qué estamos aquí? (Visión)</h2>
          <blockquote>
            Tenemos el sueño de que algún día Internet (y en especial ver películas) ayude a las
            personas a descubrir los valores familiares.
          </blockquote>
          <ol>
            <li>
              Tenemos el sueño de que algún día todos puedan filtrar sin problemas el contenido no
              deseado <b>[evitar lo malo]</b>
            </li>
            <li>
              Tenemos el sueño de que algún día Internet promoverá el acceso y la creación de
              películas con buenos valores <b>[promover lo bueno]</b>
            </li>
            <li>
              Tenemos el sueño de que algún día los malos contenidos se conviertan en una
              oportunidad para aprender y discutir sobre las cosas buenas
              <b>[transformar lo malo en bueno]</b>
            </li>
            <li>
              Tenemos el sueño de que un día este espíritu salte a la sociedad en general
              <b>[hasta el infinito y más allá]</b>
            </li>
          </ol>
        </div>

        <div id="mission-statement">
          <h2>What do we do? (Mission)</h2>
          <ol>
            <li>
              We allow people to skip scenes, by providing a chrome extension that enables users to
              filter out the scenes they do not want to watch.
            </li>
            <li>
              We help people find good content Web search on our website Adding extra layer to
              different platforms (eg. on Netflix, justwatch... add icon with type of content) Link
              content from different sources (kids-in-mind, commonsense media, parents guide...)
            </li>
            <li>
              We promote the creation of good content By giving visibility/publicity to good content
              By bringing the discussion about content to the public
            </li>
            <li>
              We promote discussion We use meaningful tags (abuse, consent, fidelity...) We clarify
              reasons not to watch scenes (bad example, disturbing, using vs loving...) We create
              content (videos, blogs...) to promote the discussion (eg this video) Linking resources
              on other projects (cor project, pure in heart...)
            </li>
            <li>
              We pave the way for future projects By providing an open API where people can find
              good content and access filters
            </li>
          </ol>
        </div>

        <div id="how-can-i-help">
          <h2>¿Cómo puedo ayudar?</h2>
          Ohana es una comunidad de usuarios sin fines de lucro que brinda un servicio gratuito a la
          sociedad. Por eso contamos con el apoyo de nuestros miembros.
          <ol>
            <li>
              <b>Feedback.</b> Acabamos de empezar, así que tus ideas nos ayudarán a ser aún
              mejores. Haznos saber <a href="https://forms.gle/cPr7XQhdS7x1y9hx7">qué piensas.</a>
            </li>
            <li><b>Compártelo.</b> ¿Te gusta Ohana? ¡Compártelo con tus amigos y familiares!</li>
            <li>
              <b>Crea.</b> Puedes ayudar a otros usuarios
              <router-link to="get-started">creando nuevos filtros.</router-link>
            </li>
            <li>
              <b>Donar. </b>
              <a href="https://www.patreon.com/ohanatv" target="_blank">Donaciones</a>
            </li>
            <li><b>Código.</b> ¿Sabes escribir código?</li>
          </ol>
        </div>
      </div>

      <!--   DEFAULT TEXT -->
      <div class="inner" v-else>
        <div id="menu">
          In this section you will find:
          <ol>
            <li><a href="#what-is-ohana">What is Ohana?</a></li>
            <li><a href="#why-skipping">Why skipping content?</a></li>
            <li><a href="#vision-statement">Why are we here? (Vission)</a></li>
            <li><a href="#mission-statement">What do we do? (Mission)</a></li>
            <li><a href="#how-can-i-help">How can I help?</a></li>
          </ol>
          <p>
            To get started into how to use Ohana visit our
            <router-link to="get-started">get started section</router-link>. For a list of the most
            frequency asked questions visit our <router-link to="/faqs">FAQs</router-link>.
          </p>
        </div>

        <div id="what-is-ohana">
          <h2>What is Ohana?</h2>
          <div class="image" style="float: right; padding: 10px">
            <img src="images/means-family.jpg" height="275px" />
          </div>
          <p>
            Ohana is a community of families and movie fans like you that share a passion for good
            clean movies.
          </p>
          <p>
            As a community, we develop a set of tools help people watch movies without having to
            worry about annoying or innapropiate content they don't want to watch (sex scenes,
            violent content, etc.)
          </p>
          <p>
            Our Chrome extension embeds itself within Netflix, HBO, etc. enabling users to skip
            those scenes they do not want to watch. With Ohana you decide what to watch and what to
            skip!
            <!--Don't like watching bloody scenes? Tell Ohana to skip the Very Violent content.-->
          </p>
          <p>
            If you enjoy great movies, but don't like watching innapropiate scenes, you will be
            pleased to meet Ohana.
          </p>
        </div>

        <div id="why-skipping">
          <h2>Why deciding what to watch?</h2>

          Why do you want to skip scenes? Isn't that censorship? They are many reasons people might
          want to skip scenes...

          <h4>Educational purposes</h4>

          Some scenes depict morally wrong behaviours as good (eg. the cool guy is the drug
          dealer/sex abuser/...), this pushes kids (and everyone really) to see those actions as
          good.
          <!--We can show a banner instead of skipping the scene, helping parents discuss it with their children (and adults being aware of the moral perspective of the scene).
          The important thing here is whether the bad action is portrayed as good. But a banner for scenes with positive moral examples might also help/trigger discussions.-->

          <h4>Using vs loving</h4>
          <p>
            We believe people should be loved, not used. We want to approach sex as a way of showing
            love/giving ourselves to the other person. Thus we try to avoid using other people
            (either physically or on a video) as a tool to obtain pleasure.
          </p>

          <!--Here it is important whether the scene is meant to arouse the viewer (there is a lot of nudity in the sistine chapel) Does this happen for any other type of scene? Watching someone steal is very
          different to stealing, watching porn is using people for pleasure.-->

          <h4>Disturbing scenes</h4>
          Unpleasant, terrifying, disgusting ... We can filter all kinds of content, having a
          special mention in being able to avoid also: - Content for those with addictions (problems
          with gambling, alcohol, pornography ...). - We can also remove those scenes that contain
          phobias or topics that can affect people with post-traumatic stress disorder and can
          trigger flashbacks.

          <!--<h4>Other uses</h4>
          <p>Ideological filtering (We don't do that here) Keep the public from/reduce the visibility
          of certain ideas/groups Fine line with the educational one. How can we distinguish them?
          Perhaps placing a banner instead of cutting the scene can help. Advert filtering (We don't
          do that here) Content creators deserve to be paid for their work, if they show you ads to
          earn their livings, we are not going to remove those. Fact checking We can show a
          banner/link to 3rd-party sources (wikipedia?) when a fact is presented on a film Specially
          useful (but not reduced to) documentaries</p>-->
        </div>

        <div id="vision-statement">
          <h2>Why are we here? (Vision)</h2>
          <blockquote>
            We have a dream that one day the Internet (and watching movies in particular) will help
            people discover family values.
          </blockquote>
          <ol>
            <li>
              We have a dream that one day everyone will be able to seamlessly filter out unwanted
              content <b>[avoiding the bad]</b>
            </li>
            <li>
              We have a dream that one day the internet will promote the access and creation of
              movies with good values <b>[promoting the good]</b>
            </li>
            <li>
              We have a dream that one day bad content will be turned into an opportunity to learn
              &#38; discuss about the good stuff <b>[transforming the bad into good]</b>
            </li>
            <li>
              We have a dream that one day this spirit will jump into the broader society
              <b>[to infinity and beyond]</b>
            </li>
          </ol>
        </div>

        <div id="mission-statement">
          <h2>What do we do? (Mission)</h2>
          <ol>
            <li>
              We allow people to skip scenes, by providing a chrome extension that enables users to
              filter out the scenes they do not want to watch.
            </li>
            <li>
              We help people find good content Web search on our website Adding extra layer to
              different platforms (eg. on Netflix, justwatch... add icon with type of content) Link
              content from different sources (kids-in-mind, commonsense media, parents guide...)
            </li>
            <li>
              We promote the creation of good content By giving visibility/publicity to good content
              By bringing the discussion about content to the public
            </li>
            <li>
              We promote discussion We use meaningful tags (abuse, consent, fidelity...) We clarify
              reasons not to watch scenes (bad example, disturbing, using vs loving...) We create
              content (videos, blogs...) to promote the discussion (eg this video) Linking resources
              on other projects (cor project, pure in heart...)
            </li>
            <li>
              We pave the way for future projects By providing an open API where people can find
              good content and access filters
            </li>
          </ol>
        </div>

        <div id="how-can-i-help">
          <h2>How can I help?</h2>
          Ohana is a non-profit community of users that provides a free service to society. Thus we
          rely on the support of our members.
          <ol>
            <li>
              <b>Feedback.</b> We are just starting, your ideas will help us become even better. Let
              us know <a href="https://forms.gle/cPr7XQhdS7x1y9hx7">your thoughts</a>
            </li>
            <li><b>Share.</b> Do you like Ohana? Share it with your friends and family!</li>
            <li>
              <b>Create.</b> You can help other users by
              <router-link to="get-started">creating new filters</router-link>
            </li>
            <li>
              <b>Donate. </b>
              <a href="https://www.patreon.com/ohanatv" target="_blank">Donate</a>
            </li>
            <li><b>Code.</b> Do you know how to code?</li>
          </ol>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import sharedjs from '@/sharedjs'
const rawTags = require('../assets/raw_tags')
export default {
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      key: 'value',
      tags: rawTags.content,
    }
  },
  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    let title = 'About us'
    let desc = 'Learn more about Ohana: why? what? how?'
    return sharedjs.headObject(title, desc)
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
