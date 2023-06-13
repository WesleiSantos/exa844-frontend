<template>
  <q-page class="login-page">
    <q-card>
      <q-card-section>
        <div>
          <q-btn
            label="Novo Usuário"
            color="primary"
            :class="
              $q.platform.is.mobile
                ? 'full-width q-mb-md'
                : 'absolute-top-right q-mt-md q-mr-md'
            "
            @click="$router.push({ name: 'register-user' })"
          />
          <div
            class="text-center text-bold text-h5 q-mb-sm"
            :class="[{ 'full-width q-mb-sm': $q.platform.is.mobile }]"
          >
            Lista de Usuários
          </div>
        </div>
        <!-- lista de usuário (nome, tipo, email, botão editar e botão remover)-->
        <q-table
          :grid="$q.screen.lt.sm"
          :rows="users"
          :columns="columns"
          separator="horizontal"
          :loading="loadingTable"
          :pagination="{
            rowsPerPage: 10,
          }"
        >
          <template v-slot:body-cell-actions="{ row }">
            <q-td>
              <q-btn
                color="primary"
                icon="edit"
                rounded
                dense
                flat
                @click="editUser(row.id)"
              />
              <q-btn
                color="negative"
                icon="delete"
                rounded
                dense
                flat
                @click="deleteUser(row.id)"
                :loading="loadingButtonDelete"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-tipo="{ row }">
            <q-td>
              <q-chip
                :label="row.role[0].role === 'adm' ? 'Administrador' : 'Normal'"
                :color="row.role[0].role === 'adm' ? 'info' : 'secondary'"
              />
            </q-td>
          </template>
          <template v-slot:item="props">
            <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-card
                bordered
                flat
                :class="
                  props.selected
                    ? $q.dark.isActive
                      ? 'bg-grey-9'
                      : 'bg-grey-2'
                    : ''
                "
              >
                <q-list dense>
                  <q-item
                    v-for="col in props.cols.filter(
                      (col) => col.name !== 'desc'
                    )"
                    :key="col.name"
                  >
                    <q-item-section
                      v-if="col.name === 'actions'"
                      class="q-mb-sm"
                      style="
                        display: grid;
                        grid-template-columns: 49% 49%;
                        gap: 1rem;
                      "
                    >
                      <q-btn
                        style="grid-column: 1 / 2"
                        color="primary"
                        icon="edit"
                        rounded
                        dense
                        @click="editUser(props.row)"
                      />
                      <q-btn
                        style="grid-column: 2/3"
                        color="negative"
                        icon="delete"
                        rounded
                        dense
                        @click="deleteUser(props.row)"
                        :loading="loadingButtonDelete"
                      />
                    </q-item-section>

                    <q-item-section v-else>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side v-if="col.name != 'actions'">
                      <q-item-label caption>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import AuthService from "src/services/AuthService";
import { Notify } from "quasar";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const loadingButtonDelete = ref(false);
    const senha = ref("");
    const email = ref("");
    const lembreMe = ref(false);
    const route = useRoute();
    const router = useRouter();
    const loadingTable = ref(false);
    const columns = ref([
      {
        name: "nome",
        label: "Nome",
        align: "left",
        field: (row) => row.name,
        sortable: true,
        required: true,
      },
      {
        name: "tipo",
        label: "Tipo",
        align: "left",
        field: (row) => row.role[0].role,
        sortable: true,
        required: true,
      },
      {
        name: "email",
        label: "E-mail",
        align: "left",
        field: (row) => row.email,
        sortable: true,
        required: true,
      },
      {
        name: "actions",
        label: "Actions",
        field: "actions",
        align: "left",
        required: true,
      },
    ]);

    const users = ref([]);

    function editUser(id) {
      router.push({ name: "edit-user", query: { id: id } });
    }

    function deleteUser(id) {
      AuthService.deleteUser(id)
        .then((response) => {
          loadingButtonDelete.value = true;
          console.log(response.data);
          Notify.create({
            message: "Usuário removido com sucesso",
            color: "warning",
            icon: "check",
          });
          getUsers();
        })
        .catch((error) => {
          console.log(error);
          Notify.create({
            message: "Erro ao remover usuário",
            color: "negative",
            icon: "report_problem",
          });
        })
        .finally(() => {
          loadingButtonDelete.value = false;
        });
    }

    function getUsers() {
      loadingTable.value = true;
      AuthService.getUsers()
        .then((response) => {
          console.log(response.data);
          users.value = response.data;
        })
        .catch((error) => {
          Notify.create({
            message: "Erro ao carregar usuários",
            color: "negative",
            icon: "report_problem",
          });
        })
        .finally(() => {
          loadingTable.value = false;
        });
    }

    onMounted(() => {
      getUsers();
    });
    return {
      senha,
      email,
      lembreMe,
      users,
      columns,
      editUser,
      deleteUser,
      loadingTable,
      loadingButtonDelete,
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
