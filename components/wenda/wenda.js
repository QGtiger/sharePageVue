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
    
    <div class="wenda-cont">
      <div class="wenda-case__list">
          <div class="wenda-case__item"  v-for="(item, index) in itemsList" :key="'wenda'+index">
            <div class="wenda-case__title">
              <p class="title-text">{[ item.title ]}</p>
            </div>
            <div class="wenda-case__main">
                <div class="left-preview__cont" v-if="item.preview_img">
                  <img :src="item.preview_img" :alt="item.title"/>
                </div>
                <div class="right-wenda__desc normal-lineClamp3" :style="item.preview_img ? {marginLeft: '15px'} : ''">
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
      itemsList: Array,
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


})('wenda')


