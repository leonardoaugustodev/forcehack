<template>
  <div class="reports">
    <CModal :show="true" title="Modal test">
      <template v-slot:content>
        <CInput label="Name" />
        <CInput label="Description" />
      </template>
      <template v-slot:footer>
        <CButton label="Confirm" icon="check" onclick="console.log('ok')" />
      </template>
    </CModal>
  </div>
</template>

<script>
import CModal from '@/components/CModal.vue';
import CInput from '@/components/CInput.vue';
import CButton from '@/components/CButton.vue';

export default {
  name: 'ReportList',
  components: {
    CModal,
    CInput,
    CButton,
  },
  created() {},
  data() {
    return {};
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
