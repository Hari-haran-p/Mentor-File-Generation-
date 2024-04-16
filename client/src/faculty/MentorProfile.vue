<template>
  <div
    class="h-full flex flex-col gap-10 justify-center items-center"
    style="width: 30%; font-family: Verdana, sans-serif"
  >
    <div
      class="rounded-xl flex flex-col justify-center items-center border-2 h-auto px-4 py-6 w-11/12 bg-white"
    >
      <div
        class="flex flex-wrap justify-center w-full items-center text-md font-medium mb-4"
      >
        <img class="rounded-xl h-36 w-36" :src="mentorData.img" />
        <div class="flex flex-col gap-2 pl-5">
          <div>{{ mentorData.name }}</div>
          <div>{{ mentorData.mentorId }}</div>
          <div class="text-gray-500">{{ mentorData.level }}</div>
          <div class="text-blue-500 font-">{{ mentorData.status }}</div>
        </div>
      </div>
      <div class="font-medium w-full flex gap-2 pl-5 justify-center flex-col">
        <div class="text-gray-500">{{ mentorData.dept }}</div>
        <div>
          Mobile No :
          <span class="text-gray-500">{{ mentorData.mobileNo }}</span>
        </div>
        <div>
          mail id : <span class="text-gray-500">{{ mentorData.mailId }}</span>
        </div>
      </div>
    </div>
    <div
      class="rounded-xl gap-2 flex flex-col justify-center items-center border-2 h-auto px-4 py-6 w-11/12 bg-white"
    >
      <div>Number of Students in CSE Dept : 256</div>
      <div>Number of Students in CSE Dept : 256</div>
    </div>
  </div>
</template>
<script>
export default {
    props:['mentorData'],
};
</script>