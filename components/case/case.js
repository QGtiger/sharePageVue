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
    <div class="case-cont">
      <div class="case-example__list">
        <div class="col-sm-12 col-md-6 col-lg-4" v-for="(item, index) in caseList" :key="'case'+index">
          <div class="case-example__item">
            <div class="case-banner__cont" :style="{height: bannerHeight}">
              <img :src="item.img_url" :alt="item.title"/>
            </div>
            <div class="case-example__main">
              <div class="case-title">
                <p class="title-text">{[ item.title ]}</p>
              </div>
              <div class="case-desc normal-lineClamp2" :style="{color: descColor }">
                <p v-html="item.desc"></p>
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
      caseList: Array,
      isShowMore: {
        type: Boolean,
        default: false
      },
      descColor: {
        type: String,
        default: '#606266'
      },
      bannerHeight: {
        type: String,
        default: '144px'
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


})('case')


