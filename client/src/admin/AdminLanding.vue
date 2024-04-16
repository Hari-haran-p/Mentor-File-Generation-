<template>
  <div class="w-full bg-blue-50 h-screen">
    <Navbar />
    <Mentors v-if="mentorCardClick == true"/>
    <div
      v-if="mentorCardClick == false"
      class="w-full flex justify-center gap-5 items-center"
      style="height: 86%"
    >
      <div
        class="bg-white w-11/12 border-2 flex p-10 overflow-y-scroll justify-center items-center gap-20 flex-wrap scrollbar-hide rounded-xl"
        style="height: 90%; font-family: Verdana, sans-serif"
      >
        <div
          v-for="(data, index) in totalMentorData"
          :key="index"
          @click="handleMentorData(data)"
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
import Navbar from "@/views/Navbar.vue";
import Mentors from "@/faculty/Mentors.vue";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  components: {
    Navbar,
    Mentors,
  },
  setup() {
    const router = useRouter()
    const totalMentorData = ref([]);
    // const router = useRouter();
    const mentorCardClick = ref(false);
    const mentorCardData = ref([]);
    const mentorId = ref([]);

    const TotalMentorDetail = () => {
      axios
        .get("http://localhost:4000/totalmentor/")
        .then((res) => {
          totalMentorData.value = res.data;
        })
        .catch((err) => {
          console.log("err fetching mentor data", err);
        });
    };

    onMounted(TotalMentorDetail);

    const handleMentorData = (data) => {
      mentorCardData.value = data;
      mentorCardClick.value = true;
      router.push({ name: "mentorView", params: { mentorId: data.mentorId }});
    };

    return {
      totalMentorData,
      handleMentorData,
      mentorCardData,
      mentorCardClick,
      mentorId,
    };
  },
};
</script>
