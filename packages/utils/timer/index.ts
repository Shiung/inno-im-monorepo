const ONE_SECOND = 1000

const noop = () => {}

export type TimerOptions = {
  start?: number | string | Date
  end?: number | string | Date
  type?: 'countDown' | 'countUp'
  offset?: number
  tickCallback?: (timeInfo: TimeInfo) => void
  stopCallback?: () => void
  paddedNum?: boolean
}

export type TimeInfo = {
  second: number | string
  minute: number | string
  hour: number | string
  day: number
  month: number
  year: number
}

class Timer {
  #timerId: ReturnType<typeof setTimeout> | null = null
  #startTime: number
  #endTime: number
  #currentTime: number
  #count: number
  #status: 'started' | 'stopped' | 'default' = 'default'
  #fakeStartTime: number
  #paddedNum: boolean

  tickCallback: (timeInfo: TimeInfo) => void
  stopCallback: () => void
  type: 'countDown' | 'countUp'

  constructor(options: TimerOptions) {
    const { start = '' , end = '', type = 'countDown', tickCallback, stopCallback, paddedNum = false } = options || {}

    this.type = type
    this.#paddedNum = paddedNum
    this.#startTime = isNaN(new Date(start).valueOf()) ? Date.now() : new Date(start).getTime()
    this.#fakeStartTime = this.#startTime
    this.#endTime = isNaN(new Date(end).valueOf()) ? Date.now() : new Date(end).getTime()

    this.#currentTime = this.#calCurrentTime(this.#startTime)
    this.#count = 0

    this.tickCallback = typeof tickCallback === 'function' ? tickCallback : noop
    this.stopCallback = typeof stopCallback === 'function' ? stopCallback : noop
  }

  start() {
    if(this.#status === 'started' || this.#status === 'stopped') return

    this.#status = 'started'
    this.#fakeStartTime = Date.now()
    this.#tick()
  }

  stop() {
    if(this.#status === 'stopped') return

    this.#timerId && clearTimeout(this.#timerId)
    this.#status = 'stopped'
    this.stopCallback()
  }

  #tick() {
    const delay = Date.now() - (this.#fakeStartTime + this.#count * ONE_SECOND)
    const interval = Math.max(ONE_SECOND - delay, 0)

    const now = this.#startTime + this.#count * ONE_SECOND
    this.#currentTime = this.#calCurrentTime(now)

    this.#count && this.tickCallback(this.currentTime)

    this.#count += 1

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

  #formatTime(time: number) {
    return time.toString().padStart(2, '0')
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
      second: this.#paddedNum ? this.#formatTime(second) : second,
      minute: this.#paddedNum ? this.#formatTime(minute) : minute,
      hour: this.#paddedNum ? this.#formatTime(hour) : hour,
      day,
      month,
      year
    }
  }

  get currentTime() {
    return this.#getTimeDiffInfo(Math.max(this.#currentTime, 0))
  }

  get endTime() {
    return this.#endTime
  }

  get startTime() {
    return this.#startTime
  }
}

export default Timer