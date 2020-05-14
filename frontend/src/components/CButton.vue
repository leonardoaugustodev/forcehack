<template>
  <div class="tooltip">
    <button @click="onClick" :class="type == 'icon' ? 'icon-button' : 'normal-button'">
      <v-icon :name="icon" />
      <label v-if="type != 'icon'">{{ label }}</label>
    </button>
    <div v-if="type == 'icon' && label">
      <span class="tooltiptext">{{ label }}</span>
    </div>
  </div>
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
  color: #ccc;

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
    }

    > svg {
      display: none;
    }

    background: $light-green;
    color: #111;
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

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 100px;
  // white-space: nowrap;
  text-align: center;
  font-size: 0.7em;

  border-radius: 4px;
  padding: 5px;
  z-index: 1;

  position: absolute;
  bottom: 110%;
  left: -45px;

  opacity: 0;
  transition: opacity 2s;

  background-color: rgba(53, 53, 53, 0.7);
  color: rgb(255, 255, 255);
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
