import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
// import MentorView from '@/faculty/MentorView.vue'
import Mentors from '@/faculty/Mentors.vue'
import AdminLanding from '@/admin/AdminLanding.vue'
import AdminStudents from '@/admin/AdminStudents.vue'
// import AdminMentorView from '@/admin/AdminMentorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/mentors',
      name: 'mentors',
      component: Mentors
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLanding
    },
    {
      path: '/admin/mentor/:mentorId',
      name: 'mentorView',
      component: Mentors
    },
    
    {
      path: '/admin/students',
      name: 'adminStudents',
      component: AdminStudents
    },
    // {
    //   path: '/admin/mentor/{id}',
    //   name: 'adminMentor',
    //   component: AdminMentorView
    // },
  ]
})

export default router
