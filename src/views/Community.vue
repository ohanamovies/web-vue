<template>
  <div class="subpage">
    <section id="three" class="wrapper">
      <div class="inner">
        <header class="align-center">
          <h2>Community</h2>
          <p>Our heart and engine</p>
        </header>
        <!--
        <div class="image round left">
          <img src="images/pic01.jpg" alt="Pic 01" />
        </div>
        -->
        <p>
          A strong community is what makes the difference in a project like this. We need your help
          building the first open database of films' scenes. With your help, anyone in the world
          will be able to skip the undesired content in any film.
        </p>

        <div>
          <p>
            You can join the community and start contributing by downloading our Chrome extension.
          </p>
          <footer>
            <a
              href="https://chrome.google.com/webstore/detail/family-cinema/nfkbclgkdifmoidnkapblfipbdkcppcf"
              class="button special"
              target="_blank"
              >Download</a
            >
          </footer>

          <div>
            <br />
            <p>
              You can also
              <a href="https://www.patreon.com/ohanamovies" target="_blank">donate</a> to support
              the development of Ohana.
            </p>
            <p>
              You can also use the extension and let share your
              <a href="https://forms.gle/cPr7XQhdS7x1y9hx7" target="_blank">feedback</a>.
            </p>
          </div>
        </div>

        <!--
        <div class="image round right">
          <img src="images/pic02.jpg" alt="Pic 02" />
        </div>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
          autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat.
        </p>

        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
          exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex
          ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
          ea voluptate velit esse quam nihil molestiae consequatur, vel illum
          qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et
          accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
          voluptatum deleniti atque corrupti quos dolores et quas molestias
          excepturi sint occaecati cupiditate non provident, similique sunt in
          culpa qui officia deserunt mollitia animi, id est laborum et dolorum
          fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam
          libero tempore, cum soluta nobis est eligendi optio cumque nihil
          impedit quo minus id quod maxime placeat facere possimus, omnis
          voluptas assumenda est, omnis dolor repellendus. Temporibus autem
          quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat.
        </p>
        -->
      </div>
    </section>
  </div>
</template>

<script>
import sharedjs from '@/sharedjs'
export default {
  head: function () {
    //This is used to generate the meta tags needed for better SEO and stuff.
    return sharedjs.headObject(
      'Our Community - Ohana',
      'Meet (and join!) our community of volunteers',
      this.$router.currentRoute.path
    )
  },
  data() {
    return {
      ka: 'value',
    }
  },
}
</script>

<style lang="scss" scoped></style>
