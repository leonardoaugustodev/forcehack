<template>
  <div class="tasks">
    <div class="header">
      <span class="header-title">Tasks</span>
      <my-button label="New task" :onClick="() => {modalNewTask = true}" icon="plus" />
    </div>

    <my-modal
      v-show="modalNewTask"
      title="New task"
      :onConfirm="handleNewTask"
      :onClose="() => {modalNewTask = false}"
    >
      <template v-slot:content>
        <my-input v-model="newTask.name" label="Task name" />
        <my-input v-model="newTask.description" label="Task description" />
      </template>
      <template v-slot:footer></template>
    </my-modal>

    <template v-for="task in tasks">
      <div :key="task.id" @click="handleNavigate(task.id)" class="task">
        <span class="task-name">{{ task.name }}</span>
        <span class="task-priority">{{ task.priority.name }}</span>
        <span class="task-status" :style="'color: ' + task.status.color">
          {{
          task.status.name
          }}
        </span>
        <span class="task-time">{{ task.total_reported }}</span>
        <span class="task-date">{{ formatDate(task.created_at) }}</span>
      </div>
    </template>
  </div>
</template>

<script>
// import axios from 'axios';
import CButton from '@/components/CButton.vue';
import CModal from '@/components/CModal.vue';
import CInput from '@/components/CInput.vue';

export default {
  name: 'TaskList',
  components: {
    'my-button': CButton,
    'my-modal': CModal,
    'my-input': CInput,
  },
  created() {
    this.handleRetrieveTasks();
  },
  data() {
    return {
      tasks: [],
      newTask: {},
      modalNewTask: false,
    };
  },
  computed: {},
  methods: {
    async handleRetrieveTasks() {
      const response = await this.$http.get('tasks');
      this.tasks = response.data;
    },

    handleNavigate(taskId) {
      console.log(taskId);
      this.$router.push(`/task/${taskId}`);
    },

    async handleNewTask() {
      const response = await this.$http.post('tasks', {
        ...this.newTask,
        status_id: 2,
        priority_id: 2,
      });
      console.log(response);
    },

    formatDate(date) {
      const dateFormatted = new Date(date).toLocaleDateString('pt-br');

      if (!dateFormatted) {
        return '-';
      }

      return dateFormatted;
    },
  },
};
</script>

<style scoped lang="scss">
.task {
  flex: 1;
  background: #eee;
  margin: 5px;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #ddd;
    font-weight: bold;
    transition: background-color 0.5s ease;
  }

  // > span {
  //   border: 1px solid #ddd;
  // }

  &-name {
    text-align: left;
    width: 40%;
  }

  &-priority {
    width: 15%;
  }

  &-status {
    width: 15%;
  }

  &-time {
    width: 15%;
  }

  &-date {
    width: 15%;
    color: rgb(94, 194, 201);
    font-size: 12px;
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
</style>
