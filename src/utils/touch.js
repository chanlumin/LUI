export default {
  methods: {
    // 记录touch触摸开始的时候的各项初始值参数
    touchStart(event) {
      this.direction = ''
      this.deltaX = 0
      this.deltaY = 0
      this.offsetX = 0
      this.offsetY = 0
      this.startX = event.touches[0].clientX
      this.startY = event.touches[0].clientY
    },
    touchMove(event) {
      const touch = event.touches[0]
      this.deltaX = touch.clientX - this.startX
      this.deltaY = touch.clientY - this.startY
      this.offsetX = Math.abs(this.deltaX)
      this.offsetY = Math.abs(this.deltaY)
      this.direction = this.offsetX > this.offsetY ? 'horizontal'
        : this.offsetX < this.offsetY ? 'vertical' : '' // 第二段判断是因为如果相等的话 就返回空
    }

  }
}
