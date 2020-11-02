<template>
  <div>
    <section>
      <footer id="footer">
        <div class="inner">
          <h3>Get in touch</h3>

          <form action="#" method="post">
            <div class="field half first">
              <label for="name">Name</label>
              <input name="name" id="name" type="text" placeholder="Name" />
            </div>
            <div class="field half">
              <label for="email">Email</label>
              <input name="email" id="email" type="email" placeholder="Email" />
            </div>
            <div class="field">
              <label for="message">Message</label>
              <textarea
                name="message"
                id="message"
                rows="6"
                placeholder="Message"
              ></textarea>
            </div>
            <ul class="actions">
              <li>
                <input value="Send Message" class="button" type="submit" />
              </li>
            </ul>
          </form>

          <div class="copyright">
            &copy; Family Cinema. Design:
            <a href="https://templated.co">TEMPLATED</a>. Images:
            <a href="https://unsplash.com">Unsplash</a>.
          </div>
        </div>
      </footer>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped></style>
