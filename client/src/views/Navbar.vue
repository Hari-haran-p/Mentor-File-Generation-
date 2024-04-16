<template>
    <div class="w-full flex justify-center items-center" style="height: 14%">
        <!-- navbar -->
  
        <div
          class="w-11/12 h-20 flex items-center justify-between rounded-xl border-2 bg-white"
        >
          <div
            class="pl-16 justify-center items-center flex font-extrabold text-3xl cursor-pointer"
            style="font-family: Tilt Neon, sans-serif"
          >
          <RouterLink   to="/admin" > < </RouterLink>
            <!-- <img class="h-8 w-8 mr-5" src="/dashboard.png"/> -->
            Dashboard
          </div>
          <div
            class="flex gap-10 pr-24 text-xl"
            style="font-family: Tilt Neon, sans-serif"
          >
            <div v-if="role == 'mentor'" class="flex justify-center items-center cursor-pointer gap-1">
              <img src="/home1.png" class="h-5 w-5" />
              <RouterLink   to="/mentors" :class="{'active' : $route.path === '/mentors'}" >Home</RouterLink>
            </div>
            <div v-if="role == 'admin'" class="flex justify-center items-center cursor-pointer gap-1">
              <img src="/home1.png" class="h-5 w-5" />
              <RouterLink   to="/admin" :class="{'active' : $route.path === '/admin'}" >Mentors</RouterLink>
            </div>
            <div v-if="role == 'admin'" class="flex justify-center items-center cursor-pointer gap-1">
              <img src="/home1.png" class="h-5 w-5" />
              <RouterLink  to="/admin/students" :class="{'active' : $route.path === '/admin/students'}" >Studets</RouterLink>
            </div>
            <div class="flex justify-center cursor-pointer items-center gap-1">
              <img src="/logout.png" class="h-5 w-5" />
              <RouterLink to="/">Logout</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <RouterView />
</template>
<script>
import Cookies from "js-cookie";
import { RouterView,RouterLink } from "vue-router";

export default{
  setup(){
    const userData = Cookies.get('userData')
    const data = JSON.parse(userData);
    const role = data.role;

  return {
    role,
  }
}
};
</script>

<style>
.active{
  border-bottom: 2px solid black;
}
</style>