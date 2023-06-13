<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row">
        <!-- ARROW BACK PAGE-->
        <q-btn
          v-if="$route.name != 'home' && $route.name != 'management'"
          color="white"
          icon="arrow_back"
          flat
          class="q-pl-none q-pr-xs"
          @click="$router.back()"
        />

        <q-toolbar-title class="text-left text-bold text-white column">
          <span
            v-if="$route.name != 'home'"
            class="text-subtitle2 q-mt-sm text-grey"
            >Resoluções UEFS</span
          >
          <span :class="$q.platform.is.desktop ? 'text-h6' : 'text-subtitle1'">
            Gerenciamento de Usuários
          </span>
        </q-toolbar-title>
        <q-toggle
          v-model="dark"
          color="secondary"
          :icon="dark ? 'nightlight' : 'light_mode'"
          :size="$q.platform.is.desktop ? 'lg' : 'md'"
        />
        <!-- logout -->
        <q-btn
          v-if="$route.name != 'home'"
          color="white"
          icon="logout"
          label="Sair"
          flat
          class="q-pl-none q-pr-xs"
          @click="logout"
        />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-img
        v-if="$route.name != 'home'"
        :class="$q.dark.isActive ? 'img-home-dark' : 'img-home'"
        fit="cover"
        src="/images/repository_online.jpg"
      />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Dark } from "quasar";
import { defineComponent, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "MainLayout",

  setup() {
    const showTitle = ref(false);
    const linksList = computed(() => {
      let data = [
        {
          title: "Página Inicial",
          name: "home",
          icon: "home",
        },
      ];

      return data;
    });
    const dark = ref(false);
    watch(
      () => dark.value,
      () => {
        Dark.toggle();
      }
    );
    return {
      showTitle,
      linksList,
      dark,
    };
  },
});
</script>

<style lang="scss" scoped>
.img-home {
  height: 100%;
  width: 100%;
  filter: brightness(0.3);
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}

.img-home-dark {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  filter: brightness(0.7);
  filter: invert(80%);
}
</style>
