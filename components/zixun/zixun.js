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
    
  <div class="zixun-cont">
    <div class="zixun-case__list row">
      <div class="col-sm-12 col-md-6 col-lg-4" v-for="(item, index) in newsList" :key="'zixun'+index">
        <div class="zixun-case__item">
          <div class="zixun-case__main">
              <p class="zixun-title">
                {[ item.title ]}
              </p>
              <div class="zixun-desc normal-lineClamp2">
                <p>{[ item.desc ]}</p>
              </div>
          </div>
          <div class="zixun-banner__cont">
              <img :src="item.img_url" :alt="item.title"/>
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
      newsList: Array,
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


})('zixun')


