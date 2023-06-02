<template>
  <q-page class="home">

  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "IndexPage",
  setup() {
    const route = useRoute();
    const quasar = useQuasar();
    function navigateTo(name) {
      route.push({ name: name });
    }
    return {
      navigateTo,
    };
  },
  components: {

  },
});
</script>
<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 1rem;

  @media (min-width: $breakpoint-sm) {
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(4, auto);
    padding: 4rem 10rem 3rem 10rem;
    gap: 2.5rem;

    &__card-main {
      grid-column: 1 / 2;
      grid-row: 1 / 5;
    }
    &__card-perGender {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
    }
  }
}
</style>
