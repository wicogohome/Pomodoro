
const { ref, reactive, onMounted, createApp } = Vue;

createApp({
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
  }

}).mount('#app')
