<!-- list of updates -->
<!-- TODO: Maybe we can open this on extension update... -->
<template>
  <div>
    <div class="subpage">
      <section id="main" class="wrapper" style="max-width: 700px; margin: auto">
        <div class="inner">
          <div v-for="(data, key) in releases" :key="key">
            <h3>{{ key + ' - ' + data.title.en }} ({{ data.date }})</h3>

            <ul>
              <li v-for="(feature, index) of data.features" :key="index">
                <p>
                  <b>[{{ feature.type }}]</b>
                  {{ feature.description.en }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      key: 'value',
      releases: {
        '1.7.0': {
          title: { en: 'Refactor to new API' },
          date: '2021-01-03',
          description: { en: '' },
          features: [
            {
              type: 'bugfix',
              description: { en: 'bla bla' },
            },
          ],
        },
      },
    }
  },
}
</script>

<style lang="scss" scoped></style>
