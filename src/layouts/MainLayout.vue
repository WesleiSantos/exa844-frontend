<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row">
        <!-- ARROW BACK PAGE-->
        <q-btn
          v-if="$route.meta.subPage"
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
          :loading="loadingButtonLogout"
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
import { Dark, Notify } from "quasar";
import { defineComponent, ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { authStore as useAuthStore } from "stores/auth-store";
import { storeToRefs } from "pinia";
export default defineComponent({
  name: "MainLayout",

  setup() {
    const authStore = useAuthStore();
    const { userLogged, user, dark } = storeToRefs(authStore);
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


    watch(
      () => dark.value,
      () => {
        Dark.toggle();
      }
    );

    const loadingButtonLogout = ref(false);
    function logout() {
      loadingButtonLogout.value = true;
      authStore
        .logout().then((resp)=>{
          console.log(resp)
        }).catch((error)=>{
          console.log(error)
          Notify.create({
            message: 'Não foi possível fazer logout'
          })
        }).finally(() => {
          loadingButtonLogout.value = false;
        });
    }
    onMounted(() => {
      if (dark.value) {
        Dark.set(true);
      } else {
        Dark.set(false);
      }
    });

    return {
      showTitle,
      linksList,
      dark,
      logout,
      loadingButtonLogout,
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
