(function (componentNameText) {
  var componentName = componentNameText

  appendLink('./components/jibenxinxi/')
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
    >
      <div class="lianxiwomen-cont">
        <div class="lianxiwomen-concat__list">
          <div class="concat-phone concat-item">
            <div class="icon-phone icon-cont">
              <i class="icon-img icon-phone__inner"></i>
            </div>
            <div class="item-content ml-2 normal-lineClamp2">
              <a :href="'tel:' + phone">{[ phone ]}</a>
            </div>
          </div>
          <div class="concat-email concat-item">
            <div class="icon-email icon-cont">
              <i class="icon-img icon-email__inner"></i>
            </div>
            <div class="item-content ml-2 normal-lineClamp2">
              <p>{[ email ]}</p>
            </div>
          </div>
          <div class="concat-name concat-item">
            <div class="icon-name icon-cont">
              <i class="icon-img icon-name__inner"></i>
            </div>
            <div class="item-content ml-2 normal-lineClamp2">
              <p>{[ name ]}</p>
            </div>
          </div>
          <div class="concat-address concat-item">
            <div class="icon-address icon-cont">
              <i class="icon-img icon-address__inner"></i>
            </div>
            <div class="item-content ml-2 normal-lineClamp2">
              <p>{[ address ]}</p>
            </div>
          </div>
        </div>
      </div>

    </share-card>
    `
    ,
    props: {
      phone: [String, Number],
      email: [String, Number],
      name: [String, Number],
      address: [String, Number],
      title: String
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


})('lianxiwomen')