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
    <div class="hezuohuoban-cont">
      <div class="hezuohuoban-case__list row">
        <div class="col-sm-12 col-md-6 col-lg-4" v-for="(item, index) in kehuList" :key="'hezuohuoban'+index">
          <div class="hezuohuoban-case__item">
            <div class="hezuohuoban-case__head">
              <div class="hezuohuoban-banner__cont">
                <img :src="item.img_url" :alt="item.title"/>
              </div>
            </div>
            <div class="hezuohuoban-case__main">
              <p class="hezuohuoban-title">
                {[ item.title ]}
              </p>
              <div class="hezuohuoban-desc">
                <p>{[ item.desc ]}</p>
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


})('hezuohuoban')

