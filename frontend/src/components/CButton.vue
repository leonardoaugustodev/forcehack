<template>
  <button @click="onClick" :class="type == 'icon' ? 'icon-button' : 'normal-button'">
    <v-icon :name="icon" />
    <label v-if="type != 'icon'">{{ label }}</label>
  </button>
</template>

<script>
export default {
  name: 'CButton',
  props: {
    label: String,
    type: { type: String, default: 'button' },
    icon: String,
    onClick: Function,
  },
  methods: {},
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@keyframes spin-icon {
  80% {
    transform: rotate(120deg);
  }
  100% {
    transform: rotate(90deg);
    color: $light-green;
  }
}

.icon-button {
  width: 24px;
  height: 24px;
  shape-outside: circle();
  clip-path: circle();

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #eee;
    color: $light-green;
    transition: 1s all ease-in-out;
    animation-name: spin-icon;
    animation-duration: 0.5s;
  }
}

.normal-button {
  &:hover {
    > label {
      cursor: pointer;
      display: block;

      transition: 3s all ease;
    }

    > svg {
      display: none;
    }

    background: $light-green;
    color: $blue;
    transition: 1s all ease-in-out;
  }
}

button {
  height: 24px;
  width: 80px;

  border: 0px;
  border-radius: 4px;

  background: rgb(0, 0, 0, 0);
  color: $light-blue;

  > label {
    display: none;
  }
}
</style>
