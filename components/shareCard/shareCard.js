var componentName = 'shareCard'

// (function(path) {
//   console.log(path)
//   var link = document.createElement('link')
//   link.rel = "stylesheet"
//   link.href = path + componentName + '/shareCard.css'
//   document.head.appendChild(link)
// })('./components/')

appendLink('./components/')
function appendLink(path) {
  var link = document.createElement('link')
  link.rel = "stylesheet"
  link.href = path + componentName + '/shareCard.css'
  document.head.appendChild(link)
}

Vue.component(componentName, {
  template: `
  <div class="share-card-cont" :class="customClass">
    <div class="card-header__title">
      <span class="title-text">
        {[ title ]}
      </span>
      <span class="share-btn" @click="shareFunction">
        <img src="./images/icon/phone.png" />
      </span>
    </div>
    <div class="card-body__wrap mt-1">
      <slot></slot>
    </div>
    <div class="card-footer__wrap">
      <span class="show-more__btn" v-if="isShowMore">
        更多
      </span>
    </div>
  </div>
  `
  ,
  props: {
    title: String,
    isShowShareBtn: {
      type: Boolean,
      default: true
    },
    shareFunction: Function,
    customClass: String,
    isShowMore: {
      type: Boolean,
      default: false
    }
  },
  delimiters: ["{[", "]}"],
  data: {},
  mounted: function () {
  }
})

