<template>
  <q-page class="register-page">
    <q-card v-if="!checkEmail">
      <q-card-section>
        <div class="text-center text-bold text-h5">
          {{ registerType == "admin" ? "Novo Administrador" : "Novo Usuário" }}
        </div>
        <q-form>
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
            lazy-rules
            :rules="[
              (val) => !!val || 'Campo obrigatório',
              (val) => /.+@.+\..+/.test(val) || 'E-mail inválido',
            ]"
          />
          <q-input
            filled
            v-model="password"
            label="Senha"
            :type="is_toggle_pwd ? 'password' : 'text'"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          >
            <template v-slot:append>
              <q-icon
                :name="is_toggle_pwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="is_toggle_pwd = !is_toggle_pwd"
              />
            </template>
          </q-input>
          <q-select
            v-show="registerType == 'user'"
            v-model="userType"
            :options="[
              { label: 'Administrador', value: 'admin' },
              { label: 'Usuário', value: 'normal' },
            ]"
            label="Tipo de usuário"
            filled
            class="q-mt-md"
          />
          <q-btn
            class="full-width q-mt-md"
            color="secondary"
            label="Cadastrar"
            :loading="loadingButtonRegister"
            @click="registerType == 'admin' ? registerAdm() : registerUser()"
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
import { useQuasar } from "quasar";
import { defineComponent, onMounted, ref } from "vue";
import AuthService from "src/services/AuthService";
import { useRouter, useRoute } from "vue-router";
export default defineComponent({
  name: "PageName",
  setup() {
    const nome = ref("");
    const email = ref("");
    const password = ref("");
    const userType = ref({ label: "Usuário", value: "normal" });
    const is_toggle_pwd = ref(true);
    const route = useRoute();
    const registerType = ref(route.meta.type);
    const checkEmail = ref(false);
    const loadingButtonRegister = ref(false);
    const router = useRouter();

    const q = useQuasar();
    function registerUser() {
      AuthService.createUser({
        name: nome.value,
        email: email.value,
        password: password.value,
        role: userType.value.value,
      })
        .then((res) => {
          console.log(res);
          q.notify({
            message: "Usuário cadastrado com sucesso!",
            color: "positive",
            icon: "check",
            position: "top",
          });
          nome.value = "";
          email.value = "";
          password.value = "";
          router.back();
        })
        .catch((err) => {
          console.log(err);
          q.notify({
            message: err.response.data.message ?? "Erro ao cadastrar usuário!",
            color: "negative",
            icon: "report_problem",
            position: "top",
          });
        });
    }

    function registerAdm() {
      AuthService.registerUser({
        name: nome.value,
        email: email.value,
        password: password.value,
      })
        .then((res) => {
          console.log(res);
          q.notify({
            message: "Usuário cadastrado com sucesso!",
            color: "positive",
            icon: "check",
            position: "top",
          });
          router.push({ name: "login" });
        })
        .catch((err) => {
          console.log(err);
          q.notify({
            message: err.response.data.message ?? "Erro ao cadastrar usuário!",
            color: "negative",
            icon: "report_problem",
            position: "top",
          });
        });
    }
    return {
      nome,
      registerType,
      password,
      is_toggle_pwd,
      registerUser,
      registerAdm,
      userType,
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
