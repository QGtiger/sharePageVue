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
    <div class="tuce-cont">
      <div class="tuce-preview__list row">
        <div class="col-sm-12 col-md-6 col-lg-4" v-for="(item, index) in previewList" :key="'preview'+index">
          <div class="tuce-preview__item">
            <div class="preview-img-cont">
              <img :src="item.url" :alt="item.title"/>
            </div>
            <div class="item-title mt-1">
              <p class="title-text normal-lineClamp2">{[ item.title ]}</p>
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
      isShowCollapsedBtn: {
        type: Boolean,
        default: false
      },
      previewList: Array,
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


})('tuce')


