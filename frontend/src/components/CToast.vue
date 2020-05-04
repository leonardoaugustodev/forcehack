<template >
  <div v-if="show" class="toast-container" :class="toast.type">
    <h4>{{ toast.title }}</h4>
    <p>{{toast.message}}</p>
  </div>
</template>

<script>
export default {
  name: 'CToast',
  props: ['content', 'value'],
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    toast() {
      return this.$store.state.toast || {};
    },

    show() {
      return this.toast.show || false;
    },
  },
  watch: {
    show(nv) {
      if (nv) {
        setTimeout(() => {
          this.$store.commit('showToast', {});
        }, this.duration || 2000);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.toast-container {
  position: absolute;
  top: 10px;
  right: 10px;

  margin: auto auto;
  width: 20%;
  z-index: 99;

  border-radius: 4px;

  > h4 {
    margin: 15px 10px;
    font-size: 0.9em;
  }

  > p {
    font-size: 0.8em;
  }
}

.error {
  color: rgb(81, 0, 0);
  border: 1px solid rgb(185, 0, 0);
  background: $red;
}

.success {
  color: rgb(0, 81, 0);
  border: 1px solid rgb(0, 120, 0);
  background: $light-green;
}

.warning {
  color: rgb(100, 81, 0);
  border: 1px solid rgb(185, 150, 0);
  background: $yellow;
}
</style>
