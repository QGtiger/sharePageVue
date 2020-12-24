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
    <div class="kehu-cont">
      <div class="kehu-case__list">
        <div class="kehu-case__item" v-for="(item, index) in kehuList" :key="'kehu' + index">
          <div class="kehu-case__head">
            <div class="kehu-banner__cont">
              <img :src="item.img_url" :alt="item.title"/>
            </div>
          </div>
          <div class="kehu-case__main">
            <p class="kehu-title">
              {[ item.title ]}
            </p>
            <div class="kehu-desc">
              <p>{[ item.desc ]}</p>
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


})('kehu')

