<template>
  <div class="reports">
    <my-toast
      v-model="showToast"
      type="error"
      title="Modal test"
      message="Mensagem teste de conteúdo"
    ></my-toast>
  </div>
</template>

<script>
import CToast from '@/components/CToast.vue';

export default {
  name: 'ReportList',
  components: {
    'my-toast': CToast,
  },
  created() {},
  data() {
    return {
      showToast: true,
    };
  },
  computed: {},
  methods: {
    handleOnClick() {
      console.log('clicou');
    },
  },
};
</script>

<style scoped lang="scss">
</style>
