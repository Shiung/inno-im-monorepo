import { getTimeDiffInfo } from '../convertDateAndTimestamp'

type TimerOptions = {
  start?: number | string | Date
  end?: number | string | Date
  type?: 'countDown' | 'countUp'
  offset?: number
}

class Timer {
  private timerId = null
  private startTime: number
  private endTime: number
  private type: 'countDown' | 'countUp'
  private timeout = false
  private offset
  public currentTime: number
  private count

  constructor(options: TimerOptions = {}) {
    const { start , end, type = 'countDown', offset } = options

    this.type = type
    this.startTime = isNaN(new Date(start).valueOf()) ? Date.now() : new Date(start).getTime()
    this.endTime = isNaN(new Date(end).valueOf()) ? Date.now() : new Date(end).getTime()
    this.currentTime = this.startTime
    this.count = 0
    // this.offset = offset
  }

  public start() {
    this.tick()
  }

  public tick() {
    if(this.timeout) return
    
    const now = new Date().getTime()

    if(this.type === 'countDown') {
      this.currentTime = this.endTime - now
    } else {
      this.currentTime = now - this.endTime
    }
    
    const delay = now - (this.startTime + this.count * 1000)
    const interval = 1000 - delay

    // console.log('⛔️⛔️⛔️⛔️⛔️ delay', delay)
    console.log('⛔️⛔️⛔️⛔️⛔️ interval', interval)

    this.count += 1

    if(this.currentTime <= 0) {
      this.currentTime = 0
      return this.stop()
    }

    this.timerId = setTimeout(() => {
      console.log('⛔️⛔️⛔️⛔️⛔️ setTimeout trigger!!!', new Date().getTime())
      this.tick()
    }, interval)
  }

  public stop() {
    console.log('⛔️⛔️⛔️⛔️⛔️ stop!!!')
    clearTimeout(this.timerId)
    this.timeout = true
  }

  
  public logCurrentTime(): void {
    console.log('⛔️⛔️⛔️⛔️⛔️ timer: ', getTimeDiffInfo(this.currentTime > 0 ? this.currentTime : 0))
  } 
}

export default Timer