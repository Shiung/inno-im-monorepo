<script lang='ts'>
export let stroke = '#eee'
</script>

<div data-testId='loading' class='showbox'>
  <div class='loader'>
    <svg class='circular' viewBox='25 25 50 50'>
      <circle class='path' cx='50' cy='50' r='20' fill='none' stroke-width='3' stroke-miterlimit='10' stroke={stroke} />
    </svg>
  </div>
</div>

<style lang="scss">
.showbox {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.loader {
  position: relative;
  height: 80%;
  width: 100%;
}

.circular {
  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite; // , color 6s ease-in-out infinite;
  stroke-linecap: round;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}
</style>
