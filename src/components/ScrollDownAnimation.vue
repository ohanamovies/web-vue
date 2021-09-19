<template>
  <div>
    <div class="scroll-container">
      <div style="position: relative">
        <div class="scroll-chevron"></div>
        <div class="scroll-chevron"></div>
        <div class="scroll-chevron"></div>
      </div>
    </div>
    <div style="color: white; font-size: 0.9rem">{{ $t('scroll_for_more') }}</div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.scroll-container {
  position: absolute;
  bottom: 70px;
  left: calc(50% - 14px);
  width: 100%;

  width: 24px;
  height: 24px;
}

.scroll-chevron {
  position: absolute;
  width: 28px;
  height: 8px;
  opacity: 0;
  transform: scale3d(0.5, 0.5, 0.5);
  animation: move 3s ease-out infinite;
}

.scroll-chevron:first-child {
  animation: move 3s ease-out 1s infinite;
}

.scroll-chevron:nth-child(2) {
  animation: move 3s ease-out 2s infinite;
}

.scroll-chevron:before,
.scroll-chevron:after {
  content: ' ';
  position: absolute;
  top: 0;
  height: 100%;
  width: 51%;
  background: #fff;
}

.scroll-chevron:before {
  left: 0;
  transform: skew(0deg, 30deg);
}

.scroll-chevron:after {
  right: 0;
  width: 50%;
  transform: skew(0deg, -30deg);
}

@keyframes move {
  25% {
    opacity: 1;
  }
  33% {
    opacity: 1;
    transform: translateY(30px);
  }
  67% {
    opacity: 1;
    transform: translateY(40px);
  }
  100% {
    opacity: 0;
    transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
  }
}

.scroll-text {
  display: block;
  margin-top: 75px;
  margin-left: -30px;
  font-family: 'Helvetica Neue', 'Helvetica', Arial, sans-serif;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
  white-space: nowrap;
  opacity: 0.25;
  animation: pulse 2s linear alternate infinite;
}

@keyframes pulse {
  to {
    opacity: 1;
  }
}
</style>
