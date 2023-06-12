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
            :rules="[(val) => !!val || 'Campo obrigatório']"
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
import { useRoute } from "vue-router";
export default defineComponent({
  name: "LoginPage",
  setup() {
    const senha = ref("");
    const email = ref("");
    const lembreMe = ref(false);
    const loadingButtonLogin = ref(false);

    function login() {
      console.log(senha.value);
      console.log(email.value);
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
