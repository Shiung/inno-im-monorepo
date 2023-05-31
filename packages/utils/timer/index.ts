const ONE_SECOND = 1000

const noop = () => {}

export type TimerOptions = {
  start?: number | string | Date
  end?: number | string | Date
  type?: 'countDown' | 'countUp'
  offset?: number
  tickCallback?: (timeInfo: TimeInfo) => void
}

export type TimeInfo = {
  second: number
  minute: number
  hour: number
  day: number
  month: number
  year: number
}

class Timer {
  #timerId = null
  #startTime: number
  #endTime: number
  #currentTime: number
  #count: number
  #status: 'started' | 'paused' | 'stopped' = 'started'

  tickCallback: (timeInfo: TimeInfo) => void
  type: 'countDown' | 'countUp'

  constructor(options: TimerOptions = {}) {
    const { start , end, type = 'countDown', tickCallback } = options

    this.type = type
    this.#startTime = isNaN(new Date(start).valueOf()) ? Date.now() : new Date(start).getTime()
    this.#endTime = isNaN(new Date(end).valueOf()) ? Date.now() : new Date(end).getTime()
    this.#currentTime = this.#calCurrentTime(new Date().getTime())
    this.#count = 0
    this.tickCallback = typeof tickCallback === 'function' ? tickCallback : noop

    this.start()
  }

  start() {
    if(this.#status === 'stopped') return

    if(this.#status === 'paused') {
      if(this.type === 'countUp') {
        this.#startTime = new Date().getTime() - this.#currentTime
        this.#count = 0
      }
      this.#status = 'started'
    }

    this.#tick()
  }

  pause() {
    if(this.#status === 'stopped' || this.#status === 'paused') return

    clearTimeout(this.#timerId)
    this.#status = 'paused'
  }

  stop() {
    if(this.#status === 'stopped') return

    clearTimeout(this.#timerId)
    this.#status = 'stopped'
  }
 
  get currentTime() {
    return this.#getTimeDiffInfo(this.#currentTime > 0 ? this.#currentTime : 0)
  }

  #tick() {
    const now = new Date().getTime()
    const delay = now - (this.#startTime + this.#count * ONE_SECOND)
    const interval = ONE_SECOND - delay > 0 ? ONE_SECOND - delay : 0
    this.#count += 1

    this.#currentTime = this.#calCurrentTime(now)
    this.tickCallback(this.currentTime)

    if(this.type === 'countDown' && this.#currentTime <= 0) {
      this.#currentTime = 0
      return this.stop()
    }

    this.#timerId = setTimeout(() => {
      this.#tick()
    }, interval)
  }

  #calCurrentTime(now: number) {
    if(this.type === 'countDown') {
      return this.#endTime - now
    } else {
      return now - this.#startTime
    }
  }

  #getTimeDiffInfo (diff: number) {
    const timeDiffSec = Math.round(diff / 1000)
  
    const second = timeDiffSec % 60
    const minute = Math.floor(timeDiffSec / 60) % 60
    const hour = Math.floor(timeDiffSec / 60 / 60) % 24
    const day = Math.floor(timeDiffSec / 60 / 60 / 24) % 30
    const month = Math.floor(timeDiffSec / 60 / 60 / 24 / 30) % 12
    const year = Math.floor(timeDiffSec / 60 / 60 / 24 / 30 / 12)
  
    return {
      second,
      minute,
      hour,
      day,
      month,
      year
    }
  }
}

export default Timer