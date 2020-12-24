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
    
    <div class="zhaopin-cont">
      <div class="zhaopin-case__list">
          <div class="zhaopin-case__item"  v-for="(item, index) in itemsList" :key="'zhaopin'+index">
            <div class="zhaopin-case__title">
              <p>
                <span class="title-text">{[ item.title ]}</span> <span class="salary ml-1">{[ item.salary ]}</span>
              </p>
              <p class="update-time mt-1">{[ item.update_at ]}</p>
            </div>
            <div class="zhaopin-case__tags">
              <span class="zhaopin-tag" v-for="(tag, i) in item.tags" :key="'tag' + i">
                {[ tag ]}
              </span>
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


})('zhaopin')


