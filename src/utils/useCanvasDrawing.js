
export function useCanvasDrawing() {

  function scale(scaleRef) {
    const canvas = scaleRef.value
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
  function analy(anaRef) {    
    const canvas = anaRef.value
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
      ctx.font = "15pt Open Sans"
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
    grd.addColorStop(1, "rgba(255, 255, 255, 0)")

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

  function workClock(clockRef,minArc) {
    //指針區塊
    const canvas = clockRef.value
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

  return {
    scale,
    analy,
    workClock
  }
}
