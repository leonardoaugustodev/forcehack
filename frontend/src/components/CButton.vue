<template>
  <button @click="onClick">
    <v-icon :name="icon" />
    <label>{{label}}</label>
  </button>
</template>

<script>
export default {
  name: 'CButton',
  props: {
    label: String,
    icon: String,
    onClick: Function,
  },
  methods: {},
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

  &:hover {
    > label {
      cursor: pointer;
      display: block;
    }

    > svg {
      display: none;
    }

    background: $light-green;
    color: $blue;
    transition: 1s all ease-in-out;
  }
}
</style>
