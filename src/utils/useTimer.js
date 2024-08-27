import { ref } from 'vue'

const DAY_MAPPING = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function useTimer() {
  const dateTime = ref()

  function timer() {
      const now = new Date()
      const month = now.getMonth().toString().padStart(2, '0')
      const date = now.getDate().toString().padStart(2, '0')
      const hour =now.getHours().toString().padStart(2, '0')
      const min = now.getMinutes().toString().padStart(2, '0')
      const day = DAY_MAPPING[now.getDay()]

      dateTime.value = `${now.getFullYear()}.${month}.${date}　${day} ${hour}:${min}`

      setTimeout(timer, 1000)
  }
  return {
    dateTime,
    timer
  }
}
