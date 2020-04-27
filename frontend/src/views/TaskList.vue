<template>
  <div class="tasks">
    <h2>Tasks</h2>
    <template v-for="task in tasks">
      <div :key="task.id" @click="handleNavigate(task.id)" class="task">
        <span class="task-name">{{ task.name }}</span>
        <span class="task-priority">{{ task.priority }}</span>
        <span class="task-status" :style="'color: ' + task.status.color">{{ task.status.name }}</span>
        <span class="task-time">{{ task.total_reported }}</span>
        <span class="task-date">{{ formatDate(task.created_date) }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TaskList',
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
</style>
