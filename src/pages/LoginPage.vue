<template>
  <q-page class="login-page">
    <q-card>
      <q-card-section>
        <div class="text-center text-bold text-h5">Login</div>
        <q-form @submit="login">
          <q-input
            v-model="email"
            label="E-mail"
            filled
            type="email"
            class="q-mt-md"
            lazy-rules
            :rules="[
              (val) => !!val || 'Campo obrigatório',
              (val) => /.+@.+\..+/.test(val) || 'E-mail inválido',
            ]"
          />
          <q-input
            v-model="senha"
            label="Senha"
            filled
            type="password"
            class="q-mt-md"
            lazy-rules
            :rules="[
              (val) => !!val || 'Campo obrigatório',
              (val) => val.length >= 6 || 'Senha muito curta',
            ]"
          />
          <!--
            lembre-me
          -->
          <q-checkbox
            v-show="false"
            v-model="lembreMe"
            class="q-mt-md"
            label="Manter-me conectado"
            color="secondary"
          />

          <q-btn
            class="full-width q-mt-md"
            color="secondary"
            label="Login"
            type="submit"
            :loading="loadingButtonLogin"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { authStore as useAuthStore } from "stores/auth-store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const senha = ref("");
    const email = ref("");
    const lembreMe = ref(false);
    const loadingButtonLogin = ref(false);
    const authStore = useAuthStore();
    const { userLogged, user } = storeToRefs(authStore);
    const $q = useQuasar();
    const router = useRouter();
    function login() {
      $q.loading.show({
        message: "Realizando login...",
      });
      authStore
        .login({
          email: email.value,
          password: senha.value,
        })
        .then(() => {
          $q.notify({
            color: "positive",
            position: "top",
            message: "Logado com sucesso!",
            icon: "report_problem",
          });
          router.push({ name: "management" });
        })
        .catch((err) => {
          console.log(err);
          $q.notify({
            color: "negative",
            position: "top",
            message: "Erro ao realizar login!",
            icon: "report_problem",
          });
        })
        .finally(() => {
          $q.loading.hide();
        });
    }
    return {
      senha,
      login,
      email,
      loadingButtonLogin,
      lembreMe,
    };
  },
  components: {},
});
</script>

<style lang="scss" scoped>
.login-page {
  padding: 2% 4% 1% 4%;
  @media (min-width: $breakpoint-sm) {
    padding: 1% 20% 1% 20%;
  }
  @media (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm) {
    padding: 1% 10% 1% 10%;
  }
}
</style>
