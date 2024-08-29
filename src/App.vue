<script>
import { defineComponent, onMounted, ref } from 'vue'
import { useCountdown } from './utils/useCountdown'
import { useMusic } from './utils/useMusic'
import { useUIState } from './utils/useUIState'
import { useCanvasDrawing } from './utils/useCanvasDrawing'
import { useTimer } from './utils/useTimer'

import { storeToRefs } from 'pinia'
import { useTodoListStore } from '@/stores/todoList';


export default defineComponent({
  setup() {
    // draw & timing
    const clockRef = ref(null)
    const scaleRef = ref(null)
    const anaRef = ref(null)

    const { countdown, switchButton, isRest, timing, reset, skip } = useCountdown(clockRef)
    const { scale, analy, workClock } = useCanvasDrawing(clockRef, scaleRef, anaRef)

    // todoList state
    const store = useTodoListStore()
    const { newTodo, todoList, currentTaskIndex,currentTask } = storeToRefs(store)
    
    // dateTime display
    const { dateTime, timer} = useTimer();

    // navbar display
    const { musics } = useMusic()
    const { isWhite, navbarSwitch, checkActive } = useUIState()

    onMounted(() => {
      // init
      timer()
      workClock(clockRef,60)
      scale(scaleRef)
      analy(anaRef)
    })

    return {
      //ref 
      clockRef,
      scaleRef,
      anaRef,

      // display
      dateTime,
      countdown,
      switchButton,
      isRest,
      // navbar display
      musics,
      isWhite,
      navbarSwitch,
      checkActive,

      // list & task
      todoList,
      currentTaskIndex,
      currentTask,
      store,
      newTodo,
     
      // timing function
      timing,
      reset,
      skip,
    }
  }
})
</script>

<template>
  <div class="container-fluid" id="app">
    <div class="row fixed-right">
      <div class="blue-nav-bar text-center pt-4">
        <div class="mx-auto">
          <div class="navbar-nav nav" id="tab-list" role="tablist" aria-orientation="vertical"
               @click="navbarSwitch = true">
            <a class="nav-item" id="list-tab" data-toggle="pill" href="#add-list" role="tab"
               aria-controls="add-list" aria-selected="true" @click="isWhite = true">
              <i class="fas fa-list-alt fa-2x"></i>
            </a>
            <a class="nav-item" id="analysis-tab" data-toggle="pill" href="#analysis" role="tab"
               aria-controls="analysis" aria-selected="false" @click="isWhite = false">
              <i class="fas fa-chart-line fa-2x"></i>
            </a>
            <a class="nav-item" id="music-tab" data-toggle="pill" href="#music" role="tab" aria-controls="music"
               aria-selected="true" @click="isWhite = false">
              <i class="fas fa-music fa-2x"></i>
            </a>
          </div>
        </div>
      </div>
      <div :class="isWhite ? 'white-space' : 'blue-space'" v-show="navbarSwitch">
        <div class="tab-content" id="v-pills-tabContent">
          <div class="tab-pane fade" id="add-list" role="tabpanel" aria-labelledby="list-tab">
            <div class="row">
              <input id="add-task" type="text" placeholder="Add a new task…" class="form-control col"
                     v-model="newTodo" @keyup.enter="store.addTask">
            </div>
            <div class="todo-list-today my-5">
              <h3><b>Today</b></h3>
              <hr/>
              <ul class="list-unstyled navbar-todo-list">
                <li v-for="(task, index) in todoList.today" :key="index"
                    @click="currentTaskIndex = index; navbarSwitch = false; checkActive(); reset()"
                    style="cursor: pointer">
                  <i class="fas fa-play-circle"></i> {{ task.name }}
                </li>
              </ul>
            </div>
            <div class="todo-list-upcoming my-5 text-disabled">
              <h3><b>Upcoming</b></h3>
              <hr style="border-top: 2px solid #5980C3">
              <ul class="list-unstyled navbar-todo-list">
                <li><i class="fas fa-play-circle"></i> Task 1</li>
                <li><i class="fas fa-play-circle"></i> Task 2</li>
                <li><i class="fas fa-play-circle"></i> Task 3</li>
              </ul>
            </div>
          </div>
          <div class="tab-pane fade" id="analysis" role="tabpanel" aria-labelledby="analysis-tab">
            <h3 class="text-center navbar-white-text">Analysis</h3>
            <div class="navbar-white-col d-flex flex-column">
              <canvas ref="anaRef" id="ana" width="380" height="250" class="d-flex"></canvas>
              <div class="d-flex align-items-center mt-2">
                <i class="fas fa-chevron-left fa-2x"></i>
                <div class="col text-center"><h4><b>Weekly</b></h4></div>
                <i class="fas fa-chevron-right fa-2x"></i>
              </div>
            </div>
            <div class="row">
              <div class="navbar-white-col col text-center" style="margin: 20px 10px 0 15px;">
                <h4><b><i class="fas fa-stopwatch"></i> Today</b></h4>
                <div style="font-size: 30px">30%<i class="fas fa-arrow-up" style="color: #A8C973"></i></div>
              </div>
              <div class="navbar-white-col col text-center" style="margin: 20px 15px 0 10px;">
                <h4><b><i class="far fa-clock"></i> Project</b></h4>
                <div style="font-size: 30px">15%<i class="fas fa-arrow-down" style="color: #C97A73"></i></div>
              </div>
            </div>
            <div class="navbar-white-col">
              <ul class="list-unstyled navbar-todo-list">
                <li v-for="(task, index) in todoList.today" :key="index" class="row align-items-center">
                  <del v-if="task.isDone">{{ task.name }}</del>
                  <div v-else>{{ task.name }}</div>
                  <div class="col d-flex justify-content-end">
                    <div v-for="i in 5" :key="i" class="xs-circle"
                         :class="{'white-circle': i > todoList.today[index]?.useTime}"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="tab-pane fade" id="music" role="tabpanel" aria-labelledby="music-tab">
            <h3 class="text-center navbar-white-text">Sounds</h3>
            <div class="white-noise navbar-white-col">
              <h5 class="text-center"><b>White Noise</b></h5>
              <ol class="list-unstyled music">
                <li v-for="(li, index) in musics.whiteNoise.list" :key="index"
                    class="pt-1 row align-items-center"
                    @click="musics.whiteNoise.active = index">
                  {{ li }}
                  <i class="fas fa-check"
                     :class="{'d-none': index != musics.whiteNoise.active, 'col d-flex justify-content-end': index == musics.whiteNoise.active}"></i>
                </li>
              </ol>
            </div>
            <div class="alarm navbar-white-col">
              <h5 class="text-center"><b>Alarm</b></h5>
              <ol class="list-unstyled music">
                <li v-for="(li, index) in musics.alarm.list" :key="index"
                    class="pt-1 row align-items-center"
                    @click="musics.alarm.active = index">
                  {{ li }}
                  <i class="fas fa-check"
                     :class="{'d-none': index != musics.alarm.active, 'col d-flex justify-content-end': index == musics.alarm.active}"></i>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row pt-4" @click="navbarSwitch = false; checkActive()">
      <h1 class="col-4">Pomodoro</h1>
      <div id="date" class="col align-self-center">{{ dateTime }}</div>
      <div class="col"></div>
    </div>
    <div class="row align-items-center my-5 py-4" @click="navbarSwitch = false; checkActive()">
      <div class="offset-1 col-4 mr-4">
        <div class="row align-items-center">
          <div class="main-circle text-center">
            <div id="time" class="time">{{ countdown }}</div>
          </div>
          <div class="clock-null-circle d-flex align-items-center">
            <div class="blue-circle"></div>
            <canvas ref="clockRef" id="clock" width="400" height="400"></canvas>
            <canvas ref="scaleRef" id="scale" width="400" height="400"></canvas>
          </div>
        </div>
      </div>
      <div class="col-2">
        <ul class="small-circle-group list-unstyled">
          <li v-for="i in 5" :key="i" class="small-circle"
              :class="{'white-circle': i > currentTask?.useTime}"></li>
        </ul>
      </div>
      <div class="col-md-3 col-4">
        <div class="todo-list-group">
          <h2 class="text-right">{{ currentTask?.name }}
            <i class="fas fa-chevron-circle-down fa-xs"></i>
          </h2>
          <div class="todo-list col-11">
            <ul>
              <li v-for="(des, index) in currentTask.des" :key="index">{{ des }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="col align-self-center">
      <div class="offset-1 col-md-3 col-4 row align-items-center">
        <i class="fas fa-forward fa-2x" @click="isRest = !isRest; skip()"></i>
        <button class="btn btn-main-blue mx-md-4 mx-1 col" :class="{'btn-pause-blue': switchButton}" id="switchButton"
                @click="timing">{{ switchButton ? 'Pause' : 'Start' }}
        </button>
        <i class="fas fa-redo-alt fa-2x" @click="reset"></i>
      </div>
    </div>
  </div>
</template>


