import { ref, provide, inject } from 'vue'

const darkModeSymbol = Symbol()
const isDarkMode = ref(localStorage.getItem('DarkMode') === 'true')

document.body.classList.toggle('dark-mode', isDarkMode.value)

export function provideDarkMode() {
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('DarkMode', isDarkMode.value)
    document.body.classList.toggle('dark-mode', isDarkMode.value)
  }

  provide(darkModeSymbol, { isDarkMode, toggleDarkMode })
}

export function useDarkMode() {
  const darkMode = inject(darkModeSymbol)
  if (!darkMode) {
    throw new Error('useDarkMode must be used within a provideDarkMode context')
  }
  return darkMode
}
