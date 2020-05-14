<template>
  <div class="task-details-wrapper">
    <my-modal
      v-show="modalNewNote"
      title="New note"
      :onConfirm="handleNewNote"
      :onClose="
        () => {
          modalNewNote = false;
        }
      "
    >
      <template v-slot:content>
        <my-input id="name" label="Note name" v-model="newNote.name" />
        <textarea placeholder="Insert a note..." rows="10" v-model="newNote.content" />
      </template>
    </my-modal>

    <my-modal
      v-show="modalNewTimeReport"
      title="Report a time"
      :onConfirm="handleNewTime"
      :onClose="
        () => {
          modalNewTimeReport = false;
        }
      "
    >
      <template v-slot:content>
        <my-input id="time_name" label="Note" v-model="newTime.name" />
        <my-input id="time_minutes" label="Minutes" v-model="newTime.minutes" />
      </template>
    </my-modal>

    <template v-if="loading">
      <my-loading />
    </template>

    <template v-if="!loading">
      <div class="header">
        <span class="header-title">{{ task.name }}</span>
        <my-button
          label="New note"
          icon="sticky-note"
          :onClick="
            () => {
              modalNewNote = !modalNewNote;
            }
          "
        />
      </div>

      <div class="task">
        <div class="left">
          <div v-if="task.notes.length == 0">
            <h3>No notes to display!</h3>
            <div
              class="new-note-text"
              @click="
                () => {
                  modalNewNote = !modalNewNote;
                }
              "
            >
              Create a new note
            </div>
          </div>

          <template v-for="note in task.notes">
            <div :key="note.id" class="task-note">
              <div class="task-note-name">
                <span>{{ dateFormatted(note.created_at) }} - {{ note.name }}</span>
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
                <div class="task-note-md" v-if="editingNote.id != note.id" v-html="markdownContent(note.content)"></div>
                <div v-if="editingNote.id == note.id">
                  <textarea rows="20" v-model="note.content" />
                </div>
              </div>
            </div>
          </template>
        </div>

        <div class="right">
          <div class="task-created-date">
            <div class="task-info">
              <div class="info-icon">
                <v-icon style="color: #1ac7d0" name="calendar" height="20px" width="20px" />
              </div>
              <div>
                <div class="info-label">Date:</div>
                <div class="info-value">{{ dateFormatted(task.created_at) }}</div>
              </div>
            </div>

            <div class="task-info">
              <div class="info-icon">
                <v-icon style="color: #6ac593" name="fire" height="20px" width="20px" />
              </div>
              <div>
                <div class="info-label">Priority:</div>
                <div class="info-value">
                  <my-select :data="priorities" :default="task.priority.id" />
                </div>
              </div>
            </div>

            <div class="task-info">
              <div class="info-icon">
                <v-icon style="color: #ff3859" name="flag-checkered" height="20px" width="20px" />
              </div>
              <div>
                <div class="info-label">Status:</div>
                <div class="info-value">
                  <my-select :data="statuses" :default="task.status.id" />
                </div>
              </div>
            </div>

            <div class="task-info">
              <div class="info-icon">
                <v-icon style="color: #cf6fe0" name="stopwatch" height="20px" width="20px" />
              </div>
              <div>
                <div class="info-label">Time reported:</div>
                <div class="info-value">{{ timeFormatted(total_reported) }}</div>
              </div>
              <my-button
                label="Report a time"
                type="icon"
                icon="plus"
                :onClick="
                  () => {
                    modalNewTimeReport = !modalNewTimeReport;
                  }
                "
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import marked from 'marked';
import CInput from '@/components/CInput.vue';
import CLoading from '@/components/CLoading.vue';
import CButton from '@/components/CButton.vue';
import CModal from '@/components/CModal.vue';
import CSelect from '@/components/CSelect.vue';

export default {
  name: 'TaskDetails',
  props: ['taskId'],
  components: {
    'my-input': CInput,
    'my-loading': CLoading,
    'my-button': CButton,
    'my-modal': CModal,
    'my-select': CSelect,
  },
  created() {
    this.handleRetrieveTask(this.taskId);
  },
  data() {
    return {
      loading: false,
      task: {
        name: String,
        notes: {
          name: String,
          content: String,
        },
        status: {
          name: String,
        },
        priority: {
          name: String,
        },
      },
      modalNewNote: false,
      modalNewTimeReport: false,
      editingNote: {},
      newNote: {},
      newTime: {},
    };
  },
  computed: {
    statuses() {
      return this.$store.state.statuses || [];
    },

    priorities() {
      return this.$store.state.priorities || [];
    },

    total_reported() {
      const times = this.task.time_reports || [];

      const totalTime = times.reduce((acc, val) => acc + parseInt(val.minutes, 10), 0);

      return totalTime;
    },
  },
  watch: {
    taskId(nv) {
      this.handleRetrieveTask(nv);
    },
  },
  methods: {
    async handleRetrieveTask() {
      this.loading = true;
      const response = await this.$http.get(`tasks/${this.taskId}`);
      this.task = response.data;
      this.loading = false;
    },

    async handleRetrieveStatuses() {
      const response = await this.$http.get('statuses');
      this.statuses = response.data;
    },

    async handleRetrievePriorities() {
      const response = await this.$http.get('priorities');
      this.priorities = response.data;
    },

    handleEditNote(note) {
      this.editingNote = note;
    },

    handleCancel() {
      this.editingNote = {};
    },

    async handleSaveNote() {
      const response = await this.$http.put(`notes/${this.editingNote.id}`, {
        ...this.editingNote,
        task_id: this.taskId,
      });

      this.task.notes = response.data;

      this.editingNote = {};
    },

    async handleNewNote() {
      const response = await this.$http.post('notes', {
        ...this.newNote,
        task_id: this.taskId,
      });

      // const { notes } = this.task;
      this.task.notes = Object.assign(this.task.notes, this.task.notes.push(response.data));

      this.newNote = {};
      this.modalNewNote = false;
    },

    async handleNewTime() {
      const response = await this.$http.post('times', {
        ...this.newTime,
        task_id: this.taskId,
      });

      this.task.time_reports = Object.assign(this.task.time_reports, this.task.time_reports.push(response.data));

      this.newTime = {};
      this.modalNewTimeReport = false;
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
      function addZeroBefore(number) {
        if (number < 10) {
          return `0${number}`;
        }
        return number;
      }

      const hours = addZeroBefore(Math.floor(time / 60));
      const minutes = addZeroBefore(time % 60);

      return `${hours}:${minutes}`;
    },
  },
};
</script>

<style scoped lang="scss">
.task-details-wrapper {
  height: 100%;
}
.header {
  display: grid;
  grid-template-columns: 80% auto;
  align-content: center;
  //   height: 50px;

  border-bottom: 1px solid rgb(0, 132, 255);

  > span {
    justify-self: start;
  }

  > button {
    justify-self: end;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $blue;
  padding: 10px;
}

.header-title {
  font-size: 18px;
  font-weight: bolder;
}

.task {
  display: grid;
  grid-template-areas: 'left right';
  grid-template-columns: 60% auto;
  grid-template-rows: 100%;
  height: calc(100% - 70px);

  & > .left {
    padding: 10px;
    grid-area: left;
    font-size: 0.8em;

    // background: lightseagreen;
  }

  & > .right {
    text-align: left;
    padding: 10px;
    grid-area: right;
    height: 100%;

    background: #fff;

    & > div {
      margin: 10px 0 0 0;
    }
  }

  &-created-date {
    display: flex;
    flex-direction: column;
  }
}

.info-icon {
  margin: 5px;
}

.info-label {
  margin: 5px;
  font-size: 0.8em;
  font-weight: bold;
}

.info-value {
  margin: 5px;
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

.task-info {
  display: flex;
  margin: 10px 5px;
}

.time-report-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 10px 5px;
  font-size: 0.8em;

  > .time-report-title {
    font-size: 1.2em;
    font-weight: bold;
  }
}

.new-note-text {
  cursor: pointer;
  color: #bbb;

  &:hover {
    color: $red;
  }
}
</style>
