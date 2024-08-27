import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTodoListStore = defineStore('todoList', () => {
  const currentTaskIndex = ref(0)
  const todoList = ref({
    today: [       {
        name: 'First task today',
        des: [
          "Lorem ipsum dolor sit amet.",
          "Consectetur adipiscing elit.",
          "Nulla vulputate neque",
          "Consequat lorem pharetra",
          "Ultrices non vitae elit.",
        ],
        useTime: 3,
        isDone: true
      },
      {
        name: 'Second task today',
        des: [
          "2Lorem ipsum dolor sit amet.",
          "Consectetur adipiscing elit.",
          "Nulla vulputate neque",
        ],
        useTime: 2,
        isDone: false
      },
      {
        name: 'Third task today',
        des: [
          "3Lorem ipsum dolor sit amet.",
          "Consectetur adipiscing elit.",
          "Nulla vulputate neque",
        ],
        useTime: 0,
        isDone: false
      }]
  })
  const currentTask = computed(()=> todoList.value.today[currentTaskIndex.value])

  function incrementCurrentUseTime(){
    todoList.value.today[currentTaskIndex.value].useTime++;
  }
  function doneCurrentTask(){
    todoList.value.today[currentTaskIndex.value].isDone = true;
  }

  // add task
  const newTodo = ref('')
  function addTask() {
    todoList.value.today.push({
      name: newTodo.value,
      des: ['skip des'],
      useTime: 0,
      isDone: false
    })
    newTodo.value = ''
  }


  return {     
    newTodo,
    todoList,
    currentTaskIndex,
    currentTask,
    addTask,
    incrementCurrentUseTime,
    doneCurrentTask
   }
})
