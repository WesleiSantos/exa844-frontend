<template>
  <div class="login">
    <q-page-container class="q-pa-md">
      <div class="q-gutter-md">
        <h2 class="text-h4">Login</h2>
        <q-form @submit="submitForm">
          <q-input
            filled
            v-model="email"
            label="Email"
            outlined
            dense
            class="q-mb-md"
          />

          <q-input
            filled
            v-model="password"
            label="Password"
            type="password"
            outlined
            dense
            class="q-mb-md"
          />

          <q-btn
            type="submit"
            label="Login"
            color="primary"
            class="q-mt-lg"
            dense
          />
        </q-form>
      </div>
    </q-page-container>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LoginView",
  setup(props) {
    const email = ref("");
    const password = ref("");

    function submitForm() {
      // Aqui você pode adicionar a lógica para autenticar o usuário
      // usando as informações fornecidas (email e password).
      // Por exemplo, você pode enviar uma requisição HTTP para um servidor de backend.
      console.log("Email:", email);
      console.log("Password:", password);
    }

    return {
      email,
      password,
      submitForm,
    };
  }
});
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.text-h4 {
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: 500;
}

.q-gutter-md {
  padding: 16px;
}

.q-mb-md {
  margin-bottom: 16px;
}

.q-mt-lg {
  margin-top: 32px;
}
</style>
