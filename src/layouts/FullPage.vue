<template>
  <div class="layout">
    <q-layout view="lHh Lpr lFf">
      <q-header elevated class="bg-primary text-white">
        <!-- Conteúdo do cabeçalho -->
      </q-header>

      <q-page-container>
        <router-view />
      </q-page-container>

      <q-footer elevated class="bg-primary text-white">
        <!-- Conteúdo do rodapé -->
      </q-footer>
    </q-layout>
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>

<style scoped>
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.bg-primary {
  background-color: #2196f3;
}
.text-white {
  color: white;
}
</style>
