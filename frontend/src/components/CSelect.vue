<template>
  <div :class="label ? 'form__group field' : 'field'">
    <select
      :id="id"
      :class="label ? 'form__field form__border' : 'form__field'"
      :name="label"
      size="1"
      @change="$emit('input', $event.target.value)"
    >
      <option v-if="!defaultValue" disabled selected>Select an option</option>
      <option
        v-for="(option, index) in data"
        :value="option.value"
        :key="index"
        :selected="defaultValue === option.value"
      >{{option.label}}</option>
    </select>
    <label for="name" class="form__label">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'CSelect',
  props: ['id', 'data', 'label', 'default'],
  computed: {
    defaultValue() {
      return this.default;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$primary: $blue;
$secondary: $light-green;
$font-color: #333;
$gray: #9b9b9b;
.form__group {
  position: relative;
  padding: 15px 0 0;
  margin: 10px;
}

.form__field {
  font-family: inherit;
  font-size: inherit;
  width: 100%;
  border: 0;

  outline: 0;
  color: $font-color;
  // padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .form__label {
    font-size: 0.8rem;
    cursor: text;
    top: 20px;
  }
}

.form__border {
  border-bottom: 1px solid $gray;
}

.form__label {
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 0.8rem;
  color: $gray;
}

.form__field:focus {
  ~ .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 0.8rem;
    color: $primary;
    font-weight: 700;
  }
  padding-bottom: 6px;
  font-weight: 700;
  border-width: 2px;
  border-image: linear-gradient(to right, $primary, $secondary);
  border-image-slice: 1;
}
/* reset input */
.form__field {
  &:required,
  &:invalid {
    box-shadow: none;
  }
}
</style>
