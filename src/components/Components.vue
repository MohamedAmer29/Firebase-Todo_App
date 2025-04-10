<template>
  <div>
    <div
      class="max-w-[450px] m-auto bg-gray-200 mt-6 rounded-xl hover:shadow-md shadow-black text-lg font-serif"
      v-for="item in todo.todos"
      :key="item.id"
    >
      <div class="p-4" :class="{ done: item.done }">
        <div class="flex justify-between">
          <div :class="{ done2: item.done }">
            {{ item.content }}
          </div>
          <div>
            <button
              @click="$emit('doneTodo', item.id)"
              :class="{ done1: item.done }"
              class="bg-gray-100 px-2 rounded-sm cursor-pointer font-semibold text-lg hover:bg-white border-2 border-gray-400"
            >
              &check;
            </button>
            <button
              @click="$emit('deleteTodo', item.id)"
              class="bg-red-500 px-2 rounded-sm cursor-pointer ml-2 font-semibold text-lg hover:bg-red-400 border-2 border-gray-400"
            >
              &cross;
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, toRef } from "vue";

const todo = defineProps(["todos"]);
</script>

<style scoped>
@import "tailwindcss";
.done {
  @apply line-through decoration-green-400 bg-green-200 rounded-lg;
}
.done1 {
  @apply bg-green-400 border-green-400;
}
.done2 {
  @apply text-2xl text-green-400;
}
</style>
