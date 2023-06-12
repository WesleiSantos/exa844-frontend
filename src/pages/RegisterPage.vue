<template>
  <q-page class="register-page">
    <q-card v-if="!checkEmail">
      <q-card-section>
        <div class="text-center text-bold text-h5">
          {{
            registerType == "firstAccess"
              ? "Primeiro Acesso Administrador"
              : registerType == "newAdm"
              ? "Novo Administrador"
              : "Novo Usuário"
          }}
        </div>
        <q-form @submit="register">
          <q-input
            v-model="nome"
            label="Nome"
            filled
            type="text"
            class="q-mt-md"
            lazy-rules
            :rules="[
              (val) => !!val || 'Campo obrigatório',
              (val) => val.length >= 3 || 'Nome muito curto',
            ]"
          />
          <q-input
            v-model="email"
            label="E-mail"
            filled
            type="email"
            class="q-mt-md"
            lazy-rules
            :rules="[(val) => !!val || 'Campo obrigatório']"
          />
          <q-btn
            class="full-width q-mt-md"
            color="secondary"
            label="Cadastrar"
            type="submit"
            :loading="loadingButtonRegister"
          />
        </q-form>
      </q-card-section>
    </q-card>

    <q-card v-else>
      <q-card-section>
        <div class="column items-center">
          <q-avatar
            class="q-mb-md"
            size="100px"
            color="primary"
            text-color="white"
          >
            <q-icon name="email" size="2em" />
          </q-avatar>
          <p class="text-h6 text-center text-bold">Verifique seu e-mail</p>
          <p class="text-center">
            Enviamos um e-mail para você, verifique sua caixa de entrada e
            clique no link para confirmar seu e-mail.
          </p>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { Notify } from "quasar";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "PageName",
  setup() {
    const nome = ref("");
    const email = ref("");
    const route = useRoute();
    const registerType = ref(route.query.type);
    const checkEmail = ref(false);
    const loadingButtonRegister = ref(false);

    function register() {
      console.log(nome.value);
      console.log(email.value);
    }

    function registerAdm() {
      console.log("registerAdm");
    }
    function registerUser() {
      console.log("registerUser");
    }
    return {
      nome,
      registerType,
      register,
      email,
      checkEmail,
      loadingButtonRegister,
    };
  },
  components: {},
});
</script>

<style lang="scss" scoped>
.register-page {
  padding: 2% 4% 1% 4%;
  @media (min-width: $breakpoint-sm) {
    padding: 1% 20% 1% 20%;
  }
  @media (min-width: $breakpoint-xs) and (max-width: $breakpoint-sm) {
    padding: 1% 10% 1% 10%;
  }
}
</style>
