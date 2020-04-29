import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import NoteList from '../views/NoteList.vue';
import NoteDetails from '../views/NoteDetails.vue';
import TaskList from '../views/TaskList.vue';
import TaskDetails from '../views/TaskDetails.vue';
import ReportList from '../views/ReportList.vue';
import ReportDetails from '../views/ReportDetails.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/note',
    name: 'NoteList',
    component: NoteList,
  },
  {
    path: '/note/:id',
    name: 'NoteDetails',
    component: NoteDetails,
  },
  {
    path: '/task',
    name: 'TaskList',
    component: TaskList,
  },
  {
    path: '/task/:id',
    name: 'TaskDetails',
    component: TaskDetails,
  },
  {
    path: '/report',
    name: 'ReportList',
    component: ReportList,
  },
  {
    path: '/report/:id',
    name: 'ReportDetails',
    component: ReportDetails,
  },
  // {
  //   path: '/tasks',
  //   name: 'Tasks',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/TaskList.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
