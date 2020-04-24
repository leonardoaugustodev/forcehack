<template>
  <div>
    <div class="header">
      <span class="header-title">{{ note.name }}</span>
      <button v-if="!isEditing" @click="handleEdit">Editar</button>
      <button v-if="isEditing" @click="handleSave">Salvar</button>
    </div>

    <div v-if="!isEditing" id="marked" class="content" v-html="markdownContent"></div>
    <div v-if="isEditing" id="edit-area" class="content">
      <textarea rows="20" v-model="note.text" />
    </div>
  </div>
</template>

<script>
import marked from 'marked';
import axios from 'axios';

export default {
  name: 'NotesDetails',
  created() {
    this.handleRetrieveNotes();
  },
  data() {
    return {
      content: 'Elit culpa est ad sit magna aute.',
      note: {
        text: '',
      },
      isEditing: false,
    };
  },
  computed: {
    markdownContent() {
      return marked(this.note.text); // marked(this.content);
    },
  },
  methods: {
    async handleRetrieveNotes() {
      const response = await axios.get(
        `http://192.168.15.171:3002/api/v1/notes/${this.$route.params.id}`,
      );

      this.note = response.data;
    },
    handleEdit() {
      this.isEditing = !this.isEditing;
    },
    async handleSave() {
      const response = await axios.put(
        `http://192.168.15.171:3002/api/v1/notes/${this.$route.params.id}`,
        this.note,
      );

      this.note = response.data;

      this.isEditing = !this.isEditing;
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: 80% auto;
  align-content: center;
  height: 50px;

  border-bottom: 1px solid rgb(0, 132, 255);

  > span {
    justify-self: start;
  }

  > button {
    justify-self: end;
  }
}

.header-title {
  font-size: 18px;
  font-weight: bolder;
}

.content {
  padding: 5px;
  height: 100%;

  border: 1px #ddd;
  border-radius: 4px;

  background: #eee;
  color: #333;

  font-size: 16px;
  text-align: start;
}

textarea {
  width: calc(100% - 10px);
  background: #eee;
  color: #333;
  border: 0px;
}

button {
  height: 30px;
  width: 100px;

  border: 0px;
  border-radius: 4px;

  background: rgb(0, 132, 255);
  color: white;
}
</style>
