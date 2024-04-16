<template>
    <div class="w-full bg-blue-50 h-screen">
        <Navbar />
        <div
          class="w-full flex justify-center gap-5 items-center"
          style="height: 86%"
        >
          <div
            class="bg-white w-11/12 border-2 flex p-10 overflow-y-scroll justify-center items-center gap-20 flex-wrap scrollbar-hide rounded-xl"
            style="height: 90%; font-family: Verdana, sans-serif"
          >
            <div
              v-for="(data, index) in allStudents"
              :key="index"
              @click="handleStudentData(data)"
              class="flex justify-center w-2/5 items-center text-md font-medium border rounded-2xl"
            >
              <img class="rounded-xl border-none h-36 w-36" :src="data.img" />
              <div class="flex flex-col gap-2 pl-5">
                <div>{{ data.name }}</div>
                <div>{{ data.mentorId }}</div>
                <div class="text-gray-500">{{ data.dept }}</div>
                <div>{{ data.mobileNo }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import Navbar from "@/views/Navbar.vue";
export default {
  components: {
    Navbar,
  },
  setup() {
    const allStudents = ref([]);
    const fetchStudents = () => {
      axios
        .get("http://localhost:4000/allStudents")
        .then((res) => {
          allStudents.value = res.data;
        })
        .catch((err) => {
          console.log("err fetching allStudents detail", err);
        });
    };
    onMounted(fetchStudents);

    const handleStudentData = (data) =>{
        
    }
    return {
      allStudents,
      handleStudentData
    };
  },
};
</script>
