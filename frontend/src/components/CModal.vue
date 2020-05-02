<template>
  <div v-show="showModal" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <my-button
          label="Confirm"
          icon="times"
          type="icon"
          :onClick="
            () => {
              showModal = false;
            }
          "
        />
      </div>

      <div class="modal-content">
        <slot name="content" />
      </div>

      <div class="modal-footer">
        <slot name="footer" />
        <my-button label="Confirm" icon="check" :onClick="onConfirm" />
      </div>
    </div>
  </div>
</template>

<script>
import CButton from '@/components/CButton.vue';

export default {
  name: 'CModal',
  components: {
    'my-button': CButton,
  },
  props: {
    show: Boolean,
    title: String,
    onConfirm: Function,
  },
  data() {
    return {
      showModal: this.show,
    };
  },
  methods: {},
  watch: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.modal-container {
  background: white;
  position: relative;
  margin: auto auto;
  padding: 20px;
  width: 50%;
}

.modal-header {
  border-bottom: 1px solid $light-blue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2em;
}

.modal-content {
  padding: 10px;
  flex: 1;
}

.modal-footer {
  text-align: right;
}
</style>
