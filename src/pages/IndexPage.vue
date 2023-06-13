<template>
  <q-page padding class="home-page">
    <q-card style="height: 85vh">
      <q-img
        :class="
          $q.dark.isActive ? 'home-page__img-home-dark' : 'home-page__img-home'
        "
        fit="cover"
        src="/images/repository_online.jpg"
      />
      <p
        class="absolute-center text-bold"
        :class="
          $q.platform.is.desktop
            ? 'text-h2'
            : 'text-h3 text-center full-width q-pa-sm'
        "
        style="
          color: white;
          text-shadow: -2px 0 black, 0 2px black, 2px 0 black, 0 -2px black;
        "
      >
        Resoluções <br />
        UEFS
      </p>
      <q-card-actions
        align="center"
        :class="$q.platform.is.desktop ? 'absolute-right' : 'absolute-bottom'"
      >
        <q-btn
          icon="login"
          class="text-bold"
          color="primary"
          :size="$q.platform.is.desktop ? 'lg' : 'md'"
          label="Login"
          :to="{ name: 'login' }"
        />
        <q-btn
          icon="person_add"
          class="text-bold"
          color="primary"
          :size="$q.platform.is.desktop ? 'lg' : 'md'"
          label="Novo Administrador"
          @click="$router.push({ name: 'register', query: { type: 'newAdm' } })"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "IndexPage",
  setup() {
    const route = useRoute();
    const quasar = useQuasar();
    const existAdm = ref(false);
    function navigateTo(name) {
      route.push({ name: name });
    }
    return {
      existAdm,
      navigateTo,
    };
  },
  components: {},
});
</script>
<style scoped lang="scss">
.home-page {
  display: grid;
  grid-template-columns: 1fr;

  &__img-home {
    height: 100%;
    width: 100%;
  }

  &__img-home-dark {
    height: 100%;
    width: 100%;
    filter: invert(80%);
  }
}
.card-login {
  height: 80vh;
}
</style>
