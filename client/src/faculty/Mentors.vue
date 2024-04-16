<template>
  <div class="w-full bg-blue-50 h-screen">
    <Navbar />
    <div
      class="w-full flex justify-center gap-5 items-center"
      style="height: 86%"
    >
      <!-- left-container -->

      <MentorProfile :mentorData="mentorData" />

      <!-- rigth-container -->
      <!-- <div>{{ $route.params.mentorId }}</div> -->
      <Student :studentData="studentData" />
    </div>
  </div>
</template>

<script>
import Student from "@/student/Student.vue";
import MentorProfile from "@/faculty/MentorProfile.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import Navbar from "@/views/Navbar.vue";
export default {
  components: {
    Student,
    MentorProfile,
    Navbar,
  },
  setup() {
    const route = useRoute();
    const mentorData = ref([]);
    const studentData = ref([]);
    const mentorId = route.params.mentorId || localStorage.getItem("mentorId");


    const mentorDetail = (mentorId) => {
      axios
        .get(`http://localhost:4000/mentor/${mentorId}`)
        .then((res) => {
          mentorData.value = res.data;
        })
        .catch((err) => {
          console.log("err fetching mentor data", err);
        });

      axios
        .get(`http://localhost:4000/student/${mentorId}`)
        .then((res) => {
          studentData.value = res.data;
          console.log("studentsData",studentData);
        })
        .catch((err) => {
          console.log("err fetching mentor data", err);
        });
    };

    onMounted(() => mentorDetail(mentorId));

    return {
      studentData,
      mentorData,
    };
  },
};
</script>
