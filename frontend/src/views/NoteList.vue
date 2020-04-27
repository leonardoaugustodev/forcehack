<template>
  <div class="notes">
    <h2>Notes</h2>
    <template v-for="note in notes">
      <div :key="note.id" @click="handleNavigate(note.id)" class="note">{{ note.name }}</div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NoteList',
  created() {
    this.handleRetrieveNotes();
  },
  data() {
    return {
      notes: [],
    };
  },
  computed: {},
  methods: {
    async handleRetrieveNotes() {
      const response = await axios.get(
        'http://192.168.15.171:3002/api/v1/notes',
      );

      this.notes = response.data;
    },
    handleNavigate(noteId) {
      console.log(noteId);
      this.$router.push(`/notes/${noteId}`);
    },
  },
};
</script>

<style scoped lang="scss">
.note {
  flex: 1;
  background: #eee;
  margin: 5px;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #ddd;
    font-weight: bold;
    transition: background-color 0.5s ease;
  }
}
</style>
