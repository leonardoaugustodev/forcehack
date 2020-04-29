<template>
  <div v-show="showModal" class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h3>{{title}}</h3>
        <v-icon class="close-icon" name="times" @click="showModal = false" />
      </div>

      <div class="modal-content">
        <slot name="content" />
      </div>

      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CModal',
  props: {
    show: Boolean,
    title: String,
  },
  data() {
    return {
      showModal: this.show,
    };
  },
  methods: {},
  watch: {
    // show(nv) {
    //   this.showModal = nv;
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.modal-overlay {
  position: fixed; /* Sit on top of the page content */
  display: flex; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
  z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
}

.modal-container {
  background: white;
  position: relative;
  margin: auto auto;

  // height: 500px;
  width: 50%;

  padding: 20px;

  // display: flex;
  // align-items: space-between;
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

.close-icon {
  cursor: pointer;
}
</style>
