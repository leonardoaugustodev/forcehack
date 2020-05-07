<template>
  <div class="task-list-wrapper">
    <div class="task-list">
      <div class="header">
        <span class="header-title">Tasks</span>
        <my-button
          label="New task"
          :onClick="
            () => {
              modalNewTask = true;
            }
          "
          icon="plus"
        />
      </div>

      <my-modal
        v-show="modalNewTask"
        title="New task"
        :onConfirm="handleNewTask"
        :onClose="
          () => {
            modalNewTask = false;
          }
        "
      >
        <template v-slot:content>
          <my-input v-model="newTask.name" label="Task name" />
          <my-input v-model="newTask.description" label="Task description" />
          <my-select v-model="newTask.status_id" label="Status" :data="statuses" />
          <my-select v-model="newTask.priority_id" label="Priority" :data="priorities" />
        </template>
        <template v-slot:footer></template>
      </my-modal>

      <template v-if="loading">
        <my-loading />
      </template>

      <template v-if="!loading">
        <div v-for="task in tasks" :key="task.id" @click="handleNavigate(task.id)" class="task">
          <span class="task-name">{{ task.name }}</span>
          <span class="task-priority">{{ task.priority.name }}</span>
          <span class="task-status" :style="'color: ' + task.status.color">
            {{ task.status.name }}
          </span>
          <span class="task-time">{{ task.total_reported }}</span>
          <span class="task-date">{{ formatDate(task.created_at) }}</span>
        </div>
      </template>
    </div>

    <div v-if="currentTask" class="task-details">
      <my-task-details :taskId="currentTask" />
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import CButton from '@/components/CButton.vue';
import CModal from '@/components/CModal.vue';
import CInput from '@/components/CInput.vue';
import CSelect from '@/components/CSelect.vue';
import CLoading from '@/components/CLoading.vue';
import TaskDetails from '@/views/TaskDetails.vue';

export default {
  name: 'TaskList',
  components: {
    'my-button': CButton,
    'my-modal': CModal,
    'my-input': CInput,
    'my-select': CSelect,
    'my-loading': CLoading,
    'my-task-details': TaskDetails,
  },
  created() {
    this.handleRetrieveTasks();
    this.handleRetrieveStatuses();
    this.handleRetrievePriorities();
  },
  data() {
    return {
      tasks: [],
      newTask: {},
      modalNewTask: false,
      loading: false,
      currentTask: null,
    };
  },
  computed: {
    statuses() {
      return this.$store.state.statuses || [];
    },

    priorities() {
      return this.$store.state.priorities || [];
    },
  },
  methods: {
    async handleRetrieveTasks() {
      this.loading = true;
      const response = await this.$http.get('tasks');
      this.tasks = response.data;
      this.loading = false;
    },

    async handleRetrieveStatuses() {
      const response = await this.$http.get('statuses');
      this.$store.commit('populateStatuses', response.data);
    },

    async handleRetrievePriorities() {
      const response = await this.$http.get('priorities');
      this.$store.commit('populatePriorities', response.data);
    },

    handleNavigate(taskId) {
      this.currentTask = taskId;
      // this.$router.push(`/task/${taskId}`);
    },

    async handleNewTask() {
      const response = await this.$http.post('tasks', this.newTask);

      if (response.status !== 200) {
        this.showToast('error', 'Error', 'Error on create task');
      }

      this.showToast('success', 'Success', 'Task inserted succesfully');

      this.handleRetrieveTasks();
      this.modalNewTask = false;
    },

    formatDate(date) {
      const dateFormatted = new Date(date).toLocaleDateString('pt-br');

      if (!dateFormatted) {
        return '-';
      }

      return dateFormatted;
    },

    showToast(type, title, message) {
      this.$store.commit('showToast', {
        show: true,
        type,
        title,
        message,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.task-list-wrapper {
  display: grid;
  grid-template-columns: 50% 50%;
}

.task-list {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.task {
  // flex: 1;
  // background: #eee;
  border-bottom: 1px double $light-green;
  cursor: pointer;
  margin: 5px;
  padding: 10px 15px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  // display: flex;
  // flex-direction: column;

  display: grid;
  grid-template-columns: 40% 15% 15% 15% 15%;
  grid-gap: 5px;
  justify-content: center;
  align-items: center;

  font-size: 0.8em;

  // justify-items: center;

  &:hover {
    background: #efe;
    font-weight: bold;
    transition: background-color 0.5s ease;
  }

  &-name {
    text-align: left;
  }

  &-date {
    color: rgb(94, 194, 201);
    // font-size: 12px;
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

#new-task {
  > h4 {
    border-bottom: 1px solid $light-blue;
  }

  > textarea {
    margin-bottom: 20px;
  }
}
// button {
//   height: 24px;
//   width: 80px;

//   border: 0px;
//   border-radius: 4px;

//   background: rgb(0, 0, 0, 0);
//   color: $light-blue;

//   &:hover {
//     background: $light-green;
//     color: $blue;
//     transition: 0.5s all ease;

//     > svg {
//       display: none;
//     }

//     &[for='edit']::after {
//       content: 'Edit';
//     }

//     &[for='save']::after {
//       content: 'Save';
//     }

//     &[for='cancel']::after {
//       content: 'Cancel';
//     }

//     &[for='new-note']::after {
//       content: 'Add note';
//     }
//   }
// }
</style>
