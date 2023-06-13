<template>
  <q-page class="register-page">
    <q-card>
      <q-card-section>
        <div class="text-center text-bold text-h5">Editar Usuário</div>
        <q-form>
          <q-input
            v-model="user.name"
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
            v-model="user.email"
            label="E-mail"
            filled
            type="email"
            lazy-rules
            :rules="[
              (val) => !!val || 'Campo obrigatório',
              (val) => /.+@.+\..+/.test(val) || 'E-mail inválido',
            ]"
          />
          <!-- <q-input
            filled
            v-model="name.password"
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
          </q-input> -->
          <q-select
            v-model="user.role[0].role"
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
            label="Salvar"
            :loading="loadingButtonEdit"
            @click="updateUser()"
          />
          <q-inner-loading :showing="loadingEditUser">
            <q-spinner-gears
              size="50px"
              color="primary"
              style="margin: 0 auto"
            ></q-spinner-gears>
          </q-inner-loading>
        </q-form>
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
  name: "EditUser",
  setup() {
    const userType = ref({ label: "Usuário", value: "normal" });

    const is_toggle_pwd = ref(false);

    const route = useRoute();

    const loadingButtonEdit = ref(false);
    const router = useRouter();

    const loadingEditUser = ref(false);
    const q = useQuasar();
    const user = ref({
      name: "",
      email: "",
      role: [{ role: "" }],
    });

    function updateUser() {
      const params = {
        name: user.value.name,
        email: user.value.email,
        role: user.value.role[0].role,
      };
      loadingButtonEdit.value = true;
      AuthService.updateUser(params)
        .then((response) => {
          q.notify({
            message: "Usuário atualizado com sucesso!",
            color: "positive",
            icon: "check",
          });
          // router.push({ name: "management" });
        })
        .catch((err) => {
          q.notify({
            message: "Erro ao atualizar usuário!",
            color: "negative",
            icon: "close",
          });
        })
        .finally(() => {
          loadingButtonEdit.value = false;
        });
    }

    function getUser() {
      loadingEditUser.value = true;
      AuthService.getUser(route.query.id)
        .then((response) => {
          console.log(response.data);
          user.value = response.data[0];
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          loadingEditUser.value = false;
        });
    }

    onMounted(() => {
      getUser();
    });

    return {
      is_toggle_pwd,
      userType,
      user,
      loadingButtonEdit,
      loadingEditUser,
      updateUser,
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
