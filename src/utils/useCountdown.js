import { onBeforeUnmount, ref } from 'vue'

import { useCanvasDrawing } from './useCanvasDrawing'
import { useTodoListStore } from '@/stores/todoList';

export function useCountdown(clockRef) {

  const {  workClock } = useCanvasDrawing()
  const store = useTodoListStore()

  const countdown = ref('25:00')
  const startTime = ref('')
  const afterTime = ref('')
  const now = ref('')
  const switchButton = ref(false)
  const t = ref('')
  const isRest = ref(false)

  function timing() {
    const setMin = isRest.value ? 5 : 25 
    switchButton.value = !switchButton.value
    if (switchButton.value && startTime.value === '' && afterTime.value === '') {
      // start
      startTime.value = new Date()
      afterTime.value = new Date()
      afterTime.value.setMinutes(startTime.value.getMinutes() + setMin)

      t.value = setTimeout(() => {
        countDownTime()
      }, 10)
    } else if (switchButton.value && startTime.value !== '' && afterTime.value !== '') {
      // pause & restart
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

    const min = Math.floor((afterTime.value -  now.value) / 60000)
    const sec = Math.floor((afterTime.value -  now.value) % 60000 / 1000)
    countdown.value = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`

    const arc = isRest.value ? 2 : 10
   
    const range = afterTime.value - now.value
    let minArc = (range / 1000) / arc
    minArc = isRest.value ? 60 - minArc : minArc - 90

    workClock(clockRef,minArc)

    if (countdown.value !== '00:00' && switchButton.value) {
      t.value = setTimeout(() => {
        countDownTime()
      }, 10)
    } else if (countdown.value === '00:00') {
      if (!isRest.value) {
        isRest.value = true
        reset()
        store.incrementCurrentUseTime();
        store.doneCurrentTask();
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
    workClock(clockRef,isRest.value ? -90 : 60)
  }

  function skip() {
    reset()
    if (isRest.value) {
      store.incrementCurrentUseTime();
    }
  }

  onBeforeUnmount(()=>{
    clearTimeout(t.value)
  })

  return {
    countdown,
    switchButton,
    isRest,
    timing,
    countDownTime,
    reset,
    skip
  }
}
