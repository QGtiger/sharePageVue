(function (componentNameText) {
  var componentName = componentNameText

  appendLink('./components/')
  function appendLink(path) {
    var link = document.createElement('link')
    link.rel = "stylesheet"
    link.href = path + componentName + '/' + componentName + '.css'
    document.head.appendChild(link)
  }

  Vue.component(componentName, {
    template: `
    <share-card :title="title"
      :custom-class="componentName + '__wrap'"
      :is-show-more="isShowMore"
    >
    <div class="meitizhanghao-cont">
      <div class="meitizhanghao-case__list row">
        <div class="col-sm-12 col-md-6 col-lg-4" v-for="(item, index) in kehuList" :key="'meitizhanghao'+index">
          <div class="meitizhanghao-case__item">
            <div class="meitizhanghao-case__head">
              <div class="meitizhanghao-banner__cont">
                <img :src="item.img_url" :alt="item.title"/>
              </div>
            </div>
            <div class="meitizhanghao-case__main">
              <div class="left-main__cont">
                <p class="meitizhanghao-title">
                  {[ item.title ]}
                </p>
                <div class="meitizhanghao-desc">
                  <p>{[ item.desc ]}</p>
                </div>
              </div>
              <div class="right-qrcode__cont">
                <div class="qrcode-img">
                  <img src="./images/icon/qrcode.png" alt=""/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    </share-card>
    `
    ,
    props: {
      title: String,
      kehuList: Array,
      isShowMore: {
        type: Boolean,
        default: false
      }
    },
    delimiters: ["{[", "]}"],
    data: function () {
      return {
      }
    },
    mounted: function () {
    },
    methods: {
    }
  })


})('meitizhanghao')


