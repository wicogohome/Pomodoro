import { ref } from 'vue'

export function useUIState() {
  const isWhite = ref(false)
  const navbarSwitch = ref(false)

  function checkActive() {
    document.querySelector('a.active')?.classList.remove('active')
  }

  return {
    isWhite,
    navbarSwitch,
    checkActive
  }
}
