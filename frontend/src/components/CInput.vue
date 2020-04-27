<template>
  <div class="form__group field">
    <input
      type="input"
      class="form__field"
      :placeholder="label"
      v:name="label"
      :id="id"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    />
    <label for="name" class="form__label">{{label}}</label>
  </div>
</template>

<script>
export default {
  name: 'CInput',
  props: {
    id: String,
    label: String,
    value: String,
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
  width: 100%;
}

.form__field {
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 1px solid $gray;
  outline: 0;
  font-size: 0.8rem;
  color: $font-color;
  padding: 7px 0;
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
