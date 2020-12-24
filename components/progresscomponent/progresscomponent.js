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
    <div class="progress-cont">
      <div class="progress-step__list">
        <div class="progress-step__item" v-for="(item, index) in stepsList" :key="'steps' + index">
          <div class="progress-step__head">
            <div class="progress-step__line"></div>
            <div class="progress-step__icon">
              <i class="progress-step__icon-inner"></i>
            </div>
          </div>
          <div class="progress-step__main">
            <p class="step-title">
              {[ item.time ]}
            </p>
            <div class="step-desc">
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
      stepsList: Array,
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


})('progresscomponent')


