<template>
  <div class="tasks">
    <div class="header">
      <span class="header-title">Tasks</span>
      <my-button label="New task" :onClick="handleNewTask" icon="plus" />
    </div>

    <my-modal :show="true" title="New task" :onConfirm="handleNewTask">
      <template v-slot:content>
        <my-input label="Task name" />
        <my-input label="Task description" />
      </template>
      <template v-slot:footer>
        <!-- <CButton label="Confirm" icon="check" onclick="console.log('ok')" /> -->
      </template>
    </my-modal>

    <template v-for="task in tasks">
      <div :key="task.id" @click="handleNavigate(task.id)" class="task">
        <span class="task-name">{{ task.name }}</span>
        <span class="task-priority">{{ task.priority }}</span>
        <span class="task-status" :style="'color: ' + task.status.color">
          {{
          task.status.name
          }}
        </span>
        <span class="task-time">{{ task.total_reported }}</span>
        <span class="task-date">{{ formatDate(task.created_date) }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
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
    };
  },
  computed: {},
  methods: {
    async handleRetrieveTasks() {
      console.log('entrou no retrieve');
      const response = await axios.get('http://192.168.15.171:3002/api/v1/task');

      this.tasks = response.data;
    },

    handleNavigate(taskId) {
      console.log(taskId);
      this.$router.push(`/task/${taskId}`);
    },

    handleNewTask() {
      console.log('handleNewTask');
    },

    formatDate(date) {
      const dateFormatted = new Date(date).toLocaleDateString();

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
