<template>
  <div class="container">
    <div>
      <h1 class="myH1">Todo</h1>
    </div>
    <form @submit.prevent="submit">
      <div class="flex gap-2 justify-center">
        <div class="">
          <input
            class="input"
            v-model="addTodo"
            type="text"
            placeholder="Find a repository"
          />
        </div>
        <div class=" ">
          <button :disabled="!addTodo" class="addBtn">Add</button>
        </div>
      </div>
    </form>
  </div>
  <div class="text-center text-red-600 text-sm">
    {{ todoError }}
  </div>
  <Components :todos="todos" @deleteTodo="deleteTodo" @doneTodo="doneTodo" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Components from "./Components.vue";
import {
  collection,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase/firebase.ts";

const addTodo = ref<string>("");
const todoError = ref<string>("");
const todos = ref<Todo[]>([]);
const q = query(collection(db, "Todos"), orderBy("date", "desc"));

interface Todo {
  id: string;
  content: string;
  done: boolean;
}
onMounted(async () => {
  await onSnapshot(q, (QuerySnapshot) => {
    const fbTodos: Todo[] = [];
    QuerySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
      };
      fbTodos.push(todo);
    });
    todos.value = fbTodos;
  });
});

const submit = async () => {
  const todo = {
    id: uuidv4(),
    content: addTodo.value,
    done: false,
  };
  if (!todos.value.find((item: Todo) => item.content === addTodo.value)) {
    if (addTodo.value.length > 6) {
      todoError.value = "";
      await setDoc(doc(db, "Todos", todo.id), {
        content: todo.content,
        done: todo.done,
        date: Date.now(),
      });
      addTodo.value = "";
    } else {
      todoError.value = "Make sure length is greater than 6 charachters";
    }
  } else {
    todoError.value = "you Already entered this task";
  }
};
const deleteTodo = async (id: string) => {
  todos.value = todos.value.filter((item: Todo) => item.id !== id);
  await deleteDoc(doc(db, "Todos", id));
};
const doneTodo = (id: string) => {
  const index = todos.value.findIndex((todo: Todo) => todo.id === id);
  updateDoc(doc(db, "Todos", id), {
    done: !todos.value[index].done,
  });
  todos.value[index].done = !todos.value[index].done;
};
</script>

<style scoped>
@import "tailwindcss";
.container {
  @apply max-w-[600px] m-auto my-0 p-2 text-center;
}
.myH1 {
  @apply text-3xl my-4 mb-8 font-bold text-gray-800 font-serif;
}
.input {
  @apply p-2 bg-gray-300 placeholder:text-gray-800 font-mono w-72 rounded-md font-mono;
}
.addBtn {
  @apply py-2 px-4 rounded-md ml-2 text-white font-semibold bg-blue-500 cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-300;
}
</style>
