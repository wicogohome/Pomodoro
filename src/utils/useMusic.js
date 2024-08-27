import { reactive } from 'vue'

export function useMusic() {
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

  return { musics }
}
