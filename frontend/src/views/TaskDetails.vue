<template>
  <div>
    <div class="header">
      <span class="header-title">{{ task.name }}</span>
      <button for="new-note" @click="isInsertingNote = !isInsertingNote">
        <v-icon name="sticky-note" />
      </button>
    </div>

    <div class="task">
      <div class="left">
        <!-- NEW TASK -->
        <div v-if="isInsertingNote" id="new-task">
          <h4>Insert a new task</h4>
          <div class="new-task-name">
            <CInput id="name" label="Note name" v-model="newNote.name" />
            <button for="save" @click="handleSaveNewNote">
              <v-icon name="save" />
            </button>
          </div>
          <textarea placeholder="Insert a note..." rows="20" v-model="newNote.text" />
        </div>

        <template v-for="note in task.notes">
          <div :key="note.id" class="task-note">
            <div class="task-note-name">
              <span>{{dateFormatted(note.created_date)}} - {{note.name}}</span>
              <div class="buttons">
                <button for="edit" v-if="editingNote.id != note.id" @click="handleEditNote(note)">
                  <v-icon name="edit" />
                </button>
                <button for="save" v-if="editingNote.id == note.id" @click="handleSaveNote">
                  <v-icon name="save" />
                </button>
                <button for="cancel" v-if="editingNote.id == note.id" @click="handleCancel">
                  <v-icon name="times" />
                </button>
              </div>
            </div>
            <div class="task-note-text">
              <div
                class="task-note-md"
                v-if="editingNote.id != note.id"
                v-html="markdownContent(note.text)"
              ></div>
              <div v-if="editingNote.id == note.id">
                <textarea rows="20" v-model="note.text" />
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="right">
        <div class="task-created-date">
          <span class="label">Date:</span>
          {{dateFormatted(task.created_date)}}
        </div>
        <div class="task-priority">
          <span class="label">Priority:</span>
          {{task.priority}}
        </div>
        <div class="task-status">
          <span class="label">Status:</span>
          {{task.status.name}}
        </div>
        <div class="task-time">
          <span class="label">Time reported:</span>
          {{timeFormatted(task.total_reported)}}
        </div>

        <!-- <div class="task-timeList">
          <template v-for="time in task.time_reported">
            <div class="time" :key="time.id">
              <span>{{ time.name }}</span>
              <span>{{ timeFormatted(time.minutes) }}</span>
            </div>
          </template>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked';
import axios from 'axios';
import CInput from '@/components/CInput.vue';

export default {
  name: 'TaskDetails',
  components: {
    CInput,
  },
  created() {
    this.handleRetrieveTask();
  },
  data() {
    return {
      task: {
        name: String,
        notes: {
          name: String,
          text: String,
        },
        status: {
          name: String,
        },
      },
      isInsertingNote: false,
      editingNote: {},
      newNote: {},
      teste: null,
    };
  },
  computed: {},
  watch: {
    // teste(val) {
    //   console.log(`var: ${val}`);
    //   console.log(this.teste);
    // },
  },
  methods: {
    async handleRetrieveTask() {
      const response = await axios.get(
        `http://192.168.15.171:3002/api/v1/task/${this.$route.params.id}`,
      );

      this.task = response.data;
    },

    handleEditNote(note) {
      this.editingNote = note;
    },

    handleCancel() {
      this.editingNote = {};
    },

    async handleSaveNote() {
      const response = await axios.put(
        `http://192.168.15.171:3002/api/v1/task/${this.task.id}/note/${this.editingNote.id}`,
        this.editingNote,
      );

      this.task.notes = response.data;

      this.editingNote = {};
    },

    async handleSaveNewNote() {
      const response = await axios.post(
        `http://192.168.15.171:3002/api/v1/task/${this.task.id}/note/`,
        this.newNote,
      );

      this.task.notes = response.data;

      this.newNote = {};
      this.isInsertingNote = false;
    },

    markdownContent(text) {
      if (!text) {
        return '';
      }
      return marked(text); // marked(this.content);
    },

    dateFormatted(date) {
      if (!date) {
        return '-';
      }

      return new Date(date).toLocaleDateString('pt-br');
    },

    timeFormatted(time) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;

      return `${hours}:${minutes}`;
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

.task {
  display: grid;
  grid-template-areas: 'left right';
  grid-template-columns: 60% auto;

  & > .left {
    padding: 10px;
    grid-area: left;

    // background: lightseagreen;
  }

  & > .right {
    text-align: left;
    padding: 10px;
    grid-area: right;

    background: #eee;

    & > div {
      margin: 10px 0 0 0;
    }
  }
}

.header-title {
  font-size: 18px;
  font-weight: bolder;
}

button {
  height: 24px;
  width: 80px;

  border: 0px;
  border-radius: 4px;

  background: rgb(0, 0, 0, 0);
  color: $light-blue;

  &:hover {
    background: $light-green;
    color: $blue;
    transition: 0.5s all ease;

    > svg {
      display: none;
    }

    &[for='edit']::after {
      content: 'Edit';
    }

    &[for='save']::after {
      content: 'Save';
    }

    &[for='cancel']::after {
      content: 'Cancel';
    }

    &[for='new-note']::after {
      content: 'Add note';
    }
  }
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}

.label {
  font-size: 12px;
  font-weight: bold;
  margin-right: 5px;
}

.task-note {
  &-name {
    font-weight: bold;
    border-bottom: 1px solid $light-blue;
    padding: 2px;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &-text {
    text-align: left;
  }
}

.time {
  display: flex;
  justify-content: space-between;
}

textarea {
  width: calc(100% - 5px);
  background: #eee;
  color: #333;
  border: 0px;
}

input {
  flex: 1;
  height: 24px;
  padding: 5px;
  background: #eee;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea:focus,
input:focus {
  outline: none;
}

.new-task-name {
  display: flex;
  align-items: flex-end;

  > button {
    margin-bottom: 10px;
  }
}

#new-task {
  > h4 {
    border-bottom: 1px solid $light-blue;
  }

  > textarea {
    margin-bottom: 20px;
  }
}

.task-note-md {
  h1 {
    font-size: 13px;
  }
}
</style>
