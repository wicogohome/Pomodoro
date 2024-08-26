<script >
import { defineComponent,ref, reactive, onMounted } from 'vue';


export default defineComponent({
  setup() {
    const isWhite = ref(false)
    const message = ref('Hello Vue!')
    const countdown = ref('25:00')
    const startTime = ref('')
    const afterTime = ref('')
    const now = ref('')
    const newTodo = ref('')
    const todoList = reactive({
      today: [
        {
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
            "2Lorem ipsum dolor sit amet.",
            "Consectetur adipiscing elit.",
            "Nulla vulputate neque",
          ],
          useTime: 0,
          isDone: false
        }
      ]
    })
    console.log('test2')
    const currentTask = ref(0)
    const switchButton = ref(false)
    const t = ref('')
    const musics = reactive({
      whiteNoise: {
        active: 1,
        list: [
          'None',
          'Air Conditioner Hum',
          'Autumn Winds',
          'Healing Storm',
          'Rain on the River',
          'Sleepy Beach Waves',
        ]
      },
      alarm: {
        active: 2,
        list: [
          'None',
          'Bell Sound Effect Ding',
          'Cuckoo Bird Sound',
          'Ding Ding Ding',
          'Ding SFX',
          'Noah Bells Melody',
        ]
      }
    })
    const isRest = ref(false)
    const navbarSwitch = ref(false)

    onMounted(() => {
      workClock(60)
      scale()
      analy()
    })

    function scale() {
      // 刻度
      const canvas = document.getElementById("scale")
      const ctx = canvas.getContext('2d')
      ctx.translate(0, 200)
      for (let i = 0; i < 5; i++) {
        ctx.save()
        ctx.beginPath()
        ctx.rotate((Math.PI / 180) * (i + 1) * 30)
        ctx.moveTo(0, -146)
        ctx.lineTo(0, -134)
        ctx.strokeStyle = "#F5F1EE"
        ctx.lineWidth = 4
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
      }
      ctx.translate(0, 0)
    }

    function analy() {
      const canvas = document.getElementById("ana")
      const ctx = canvas.getContext('2d')
      const arr = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thr.', 'Fri.', 'Sat.']
      //直線
      for (let i = 0; i < 7; i++) {
        ctx.save()
        ctx.beginPath()

        //日期
        ctx.font = "10pt Arial"
        ctx.fillStyle = '#003CA1'
        ctx.fillText(arr[i], 34 + 320 / 6 * i, 215)
        if (i === 2) {
          ctx.arc(45 + 320 / 6 * i, 232, 15, 0, Math.PI * 2, true)
          ctx.fillStyle = '#003CA1'
          ctx.fill()
          ctx.fillStyle = '#F5F1EE'
        } else {
          ctx.fillStyle = '#003CA1'
        }
        ctx.font = "15pt Avenir Next LT Pro"
        ctx.fillText(i + 15, 32 + 320 / 6 * i, 240)

        //線
        ctx.translate(45 + 320 / 6 * i, 0)
        ctx.moveTo(0, 0)
        ctx.lineTo(0, 200)
        ctx.strokeStyle = "#C9C8C7"
        ctx.lineWidth = 0.5
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
      }

      //橫線
      for (let i = 0; i < 5; i++) {
        ctx.save()
        ctx.beginPath()
        ctx.font = "12pt Arial"
        ctx.fillStyle = '#003CA1'
        ctx.fillText(5 - i, 10, 20 + 200 / 5 * i)
        ctx.translate(30, 15 + 200 / 5 * i)
        ctx.moveTo(0, 0)
        ctx.lineTo(360, 0)
        ctx.strokeStyle = "#C9C8C7"
        ctx.lineWidth = 0.5
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
      }

      //圖表
      const hArr = []
      ctx.save()
      ctx.beginPath()

      //圖表漸層
      for (let i = 0; i < 7; i++) {
        const height = 15 + 200 / 5 * Math.floor((Math.random() * 5))
        hArr.push(height)
      }
      ctx.moveTo(45, 200)
      hArr.forEach((value, index) => {
        ctx.lineTo(45 + 320 / 6 * index, value)
      })
      ctx.lineTo(365, 200)
      ctx.lineTo(45, 200)

      const grd = ctx.createLinearGradient(0, 0, 0, 200)
      grd.addColorStop(0, "#5980C3")
      grd.addColorStop(0.7, "#afb7c3")
      grd.addColorStop(1, "rgba(0,0,0,0)")

      ctx.fillStyle = grd
      ctx.closePath()
      ctx.fill()
      ctx.restore()

      //圖表上緣線
      ctx.save()
      ctx.beginPath()
      hArr.forEach((value, index) => {
        ctx.lineTo(45 + 320 / 6 * index, value)
      })
      ctx.strokeStyle = "#2A56A5"
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.restore()

      //圖表圓點
      for (let i = 0; i < 7; i++) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(45 + 320 / 6 * i, hArr[i], 5, 0, Math.PI * 2, true)
        ctx.fillStyle = '#F0ECE9'
        ctx.strokeStyle = "#2A56A5"
        ctx.lineWidth = 2
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
        ctx.restore()
      }
    }

    function workClock(minArc) {
      //指針區塊
      const canvas = document.getElementById("clock")
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, 500, 500)
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(0, 200)
      ctx.lineTo(0, 370)
      ctx.arc(0, 200, 170, (Math.PI / 180) * 90, (Math.PI / 180) * minArc, true)
      ctx.lineTo(0, 200)
      ctx.strokeStyle = "#003CA1"
      ctx.fillStyle = "rgba(240, 236, 233,0.7)"
      ctx.lineWidth = 2
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 10
      ctx.shadowBlur = 6
      ctx.shadowColor = "rgba(0, 0, 0, 0.16)"
      ctx.closePath()
      ctx.stroke()
      ctx.fill()
      ctx.restore()
    }

    function timing() {
      const setMin = isRest.value ? 5 : 25
      switchButton.value = !switchButton.value
      if (switchButton.value && startTime.value === '' && afterTime.value === '') {
        // 剛开始
        startTime.value = new Date()
        afterTime.value = new Date()
        afterTime.value.setMinutes(startTime.value.getMinutes() + setMin)
        t.value = setTimeout(() => {
          countDownTime()
        }, 10)
      } else if (switchButton.value && startTime.value !== '' && afterTime.value !== '') {
        // 暫停重啟
        const min = countdown.value.substr(0, 2)
        const sec = countdown.value.substr(-2)
        const restartNow = new Date()

        let serMin = restartNow.getMinutes() + Number(min)
        if (!isRest.value) {
          serMin = serMin >= 60 ? serMin - 60 : serMin
        }

        afterTime.value.setMinutes(serMin)
        afterTime.value.setSeconds(restartNow.getSeconds() + Number(sec))

        t.value = setTimeout(() => {
          countDownTime()
        }, 10)
      }
    }

    function countDownTime() {
      now.value = new Date()
      const range = afterTime.value - now.value
      let sec = range % (60 * 1000)
      if (sec.toString().length > 3) {
        sec = sec.toString().length > 4 ? sec.toString().substr(0, 2) : sec.toString().substr(0, 1)
        sec = '0' + sec
      } else {
        sec = '00'
      }
      let min = '0' + Math.floor(range / (60 * 1000))
      countdown.value = min.substr(-2) + ':' + sec.substr(-2)

      //指針動畫
      const arc = isRest.value ? 2 : 10
      const isCounterclockwise = !isRest.value
      let minArc = (range / 1000) / arc
      minArc = isRest.value ? 60 - minArc : minArc - 90
      workClock(minArc)

      //迴圈跑起來
      if (countdown.value !== '00:00' && switchButton.value) {
        t.value = setTimeout(() => {
          countDownTime()
        }, 10)
      } else if (countdown.value === '00:00') {
        if (!isRest.value) {
          isRest.value = true
          reset()
          todoList.today[currentTask.value].useTime++
          todoList.today[currentTask.value].isDone = true
          switchButton.value = true
          timing()
        } else {
          isRest.value = false
          reset()
        }
      }
    }

    function reset() {
      const min = isRest.value ? '05' : '25'
      clearTimeout(t.value)
      countdown.value = min + ':00'
      startTime.value = ''
      afterTime.value = ''
      now.value = ''
      switchButton.value = false
      workClock(isRest.value ? -90 : 60)
    }

    function skip() {
      reset()
      return isRest.value ? todoList.today[currentTask.value].useTime++ : null
    }

    function checkActive() {
      document.querySelector('a.active')?.classList.remove('active')
    }

    function addTask() {
      todoList.today.push({
        name: newTodo.value,
        des: ['skip'],
        useTime: 0,
        isDone: false
      })
      newTodo.value = ''
    }

    return {
      isWhite,
      message,
      countdown,
      startTime,
      afterTime,
      now,
      newTodo,
      todoList,
      currentTask,
      switchButton,
      t,
      musics,
      isRest,
      navbarSwitch,
      scale,
      analy,
      workClock,
      timing,
      countDownTime,
      reset,
      skip,
      checkActive,
      addTask
    }
}})
</script>

<template>
    <div class="container-fluid " id="app">
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
                         v-model="newTodo" @keyup.enter="addTask">
                </div>
                <div class="todo-list-today my-5">
                  <h3><b>Today</b></h3>
                  <hr/>
                  <ul class="list-unstyled navbar-todo-list">
                    <li v-for="(task, index) in todoList.today" :key="index"
                        @click="currentTask = index; navbarSwitch = false; checkActive(); reset()"
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
                <div class="navbar-white-col">
                  <canvas id="ana" width="380" height="250"></canvas>
                  <div class="offset-1 col-10 row align-items-center mt-2">
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
                      <strike v-if="task.isDone">{{ task.name }}</strike>
                      <div v-else>{{ task.name }}</div>
                      <div class="col d-flex justify-content-end">
                        <div v-for="i in 5" :key="i" class="xs-circle"
                             :class="{'white-circle': i > todoList.today[index].useTime}"></div>
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
          <div id="date" class="col align-self-center">time</div>
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
                <canvas id="clock" width="400" height="400"></canvas>
                <canvas id="scale" width="400" height="400"></canvas>
              </div>
            </div>
          </div>
          <div class="col-2">
            <ul class="small-circle-group list-unstyled">
              <li v-for="i in 5" :key="i" class="small-circle"
                  :class="{'white-circle': i > todoList.today[currentTask].useTime}"></li>
            </ul>
          </div>
          <div class="col-3">
            <div class="todo-list-group">
              <h2 class="text-right">{{ todoList.today[currentTask].name }}
                <i class="fas fa-chevron-circle-down fa-xs"></i>
              </h2>
              <div class="todo-list col-11">
                <ul>
                  <li v-for="(des, index) in todoList.today[currentTask].des" :key="index">{{ des }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col align-self-center">
          <div class="offset-1 col-3 row align-items-center">
            <i class="fas fa-forward fa-2x" @click="isRest = !isRest; skip()"></i>
            <button class="btn btn-main-blue mx-4 col" :class="{'btn-pause-blue': switchButton}" id="switchButton"
                    @click="timing">{{ switchButton ? 'Pause' : 'Start' }}
            </button>
            <i class="fas fa-redo-alt fa-2x" @click="reset"></i>
          </div>
        </div>
      </div>

</template>


