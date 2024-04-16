<template>
  <div class="bg-white border-2 flex p-10 overflow-y-scroll justify-center items-center gap-20 flex-wrap scrollbar-hide rounded-xl" style="width: 67%; height: 90%;font-family :Verdana, sans-serif;">
    <div
    v-for="(data , index) in studentData" :key="index"
      class="flex justify-center w-2/5 items-center text-md font-medium border rounded-2xl"
    >
      <img class="rounded-xl border-none h-36 w-36" :src="data.img" />
      <!-- <div>{{data.img}}</div> -->
      <div class="flex flex-col gap-2 pl-5">
        <div>{{data.name}}</div>
        <div>{{data.rollNo}}</div>
        <div class="text-gray-500">{{data.dept}}</div>
        <div>{{data.course}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref,onMounted } from 'vue'
import  axios  from 'axios';
export default {
  props:['studentData'],
};
</script>
