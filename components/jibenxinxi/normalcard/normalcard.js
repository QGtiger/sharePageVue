var componentName = 'normalcard'

appendLink('./components/jibenxinxi/')
function appendLink(path) {
  var link = document.createElement('link')
  link.rel = "stylesheet"
  link.href = path + componentName + '/' + componentName + '.css'
  document.head.appendChild(link)
}

Vue.component(componentName, {
  template: `
  <share-card :title="title"
    :isShowShareBtn="isShowShareBtn"
    :share-function="shareFunction"
    :custom-class="componentName + '__wrap'"
  >
    <div class="normalcard-cont">
      <div class="normalcard-desc" :class="isCollapsed ? 'collapsed' : ''" v-html="content" ref="content"></div>
      <div class="collapsed-cont mt-1" v-if="isCollision">
        <span class="collapsed-btn" @click="handleCollapse">{[ isCollapsed ? '展开' : '收起' ]}</span>
      </div>
      <div class="preview_banner mt-2" v-if="previewImg">
        <img :src="previewImg" :alt="title"/>
      </div>
    </div>

  </share-card>
  `
  ,
  props: {
    title: String,
    isShowShareBtn: {
      type: Boolean,
      default: true
    },
    shareFunction: Function,
    content: String,
    previewImg: String
  },
  delimiters: ["{[", "]}"],
  data: function () {
    return {
      isCollision: false, // 是否超出了最大高度
      isCollapsed: true // 是否被折叠了
    }
  },
  mounted: function () {
    let _this = this
    _this.isCollision =  isElementCollision(_this.$refs.content, 140, {whiteSpace: 'break-spaces'}, false)
    _this.$refs.content.addEventListener('resize', function() {
      _this.isCollision =  isElementCollision(this, 140, {whiteSpace: 'break-spaces'}, false)
    })
  },
  methods: {
    handleCollapse: function () {
      this.isCollapsed = !this.isCollapsed
    }
  }
})



