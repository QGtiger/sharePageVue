(function(global, factory) {
	"use strict";
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = global.document ?
			factory(global, true) :
			function(w) {
				if (!w.document) {
					throw new Error("Page requires a window with a document");
				}
			};
	} else {
		factory(global);
	}
})(typeof window !== "undefined" ? window : this, function(w, noGlobal) {
  var transitionProp = 'transition'
  var animationProp = 'animation'
  var transitionEndEvent = 'transitionend';
  var animationEndEvent = 'animationend';
  if (window.ontransitionend === undefined &&
      window.onwebkittransitionend !== undefined
  ) {
      transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
      window.onwebkitanimationend !== undefined
  ) {
      animationEndEvent = 'webkitAnimationEnd';
  }

  function addHandler(element, type, callback) {
    if (element.addEventListener) {
        if (type.slice(0,2) === 'on') type = type.slice(2)
        element.addEventListener(type, callback, false)
    } else {
        if (type.slice(0,2) !== 'on') type = 'on' + type
        element.attachEvent(type, callback)
    }
  }

  function removeHandler(element, type, callback) {
    if (element.addEventListener) {
        if (type.slice(0,2) === 'on') type = type.slice(2)
        element.removeEventListener(type, callback, false)
    } else {
        if (type.slice(0,2) !== 'on') type = 'on' + type
        element.datachEvent(type, callback)
    }
  }

  function getTimeout(delays, durations) {
    /* istanbul ignore next */
    while (delays.length < durations.length) {
        delays = delays.concat(delays);
    }
    return Math.max.apply(null, durations.map(function (d, i) {
        return toMs(d) + toMs(delays[i])
    }))
  }
  // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
  // in a locale-dependent way, using a comma instead of a dot.
  // If comma is not replaced with a dot, the input will be rounded down (i.e. acting
  // as a floor function) causing unexpected behaviors
  function toMs(s) {
      return Number(s.slice(0, -1).replace(',', '.')) * 1000
  }

  function getTransitionInfo(el, expectedType) {
    var styles = window.getComputedStyle(el)
        // JSDOM may return undefined for transition properties
    var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ')
    var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ')
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations)
    var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ')
    var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ')
    var animationTimeout = getTimeout(animationDelays, animationDurations)
    window.el = el
    window.styles = styles
    console.log(el, animationDurations)
    var type = transitionProp // 默认值
    var timeout = 0
    var propCount = 0
    if (expectedType === transitionProp) {
      if (transitionTimeout > 0) {
        type = transitionProp
        timeout = transitionTimeout
        propCount = transitionDurations.length
      }
    } else {expectedType === animationProp} {
      if (animationTimeout > 0) {
        type = animationProp
        timeout = animationTimeout
        propCount = animationDurations.length
      }
    }

    return {
      type: type,
      timeout: timeout,
      propCount: propCount
    }
  }

  function whenTransitionEnd (el, expectedType, cb) {
    var ref = getTransitionInfo(el, expectedType)
    var timeout = ref.timeout;
    var propCount = ref.propCount;
    var event = expectedType === transitionProp ? transitionEndEvent : animationEndEvent;
    console.log(ref)
    var end = function () {
        el.removeEventListener(event, end)
        cb();
    };
    setTimeout(function () {
      end()
    }, timeout + 1);
    el.addEventListener(event, end);
  }

	function PreviewImage(options) {
    this.options = options
    this.transitionName = options.transitionName
    this.transitionType = options.transitionType
    this.el = options.el
    this.body = w.document.body
    this.div = options.div || 'div'
    this.previewImageList = null
    this.urls = options.urls
    this.domItemList = []
    this.touchOption={touchStartX:0,startTranslateX:0,moveDistanceX:0, moveDistanceY: 0, moveDistance: 0, lastTouchEnd: 0, type: 0, isLockType: false}
    this.touchtarget1 = {x: 0, y: 0}
    this.touchtarget2 = {x: 0, y: 0}
    this.touchStartBind = this.touchStartCallback.bind(this)
    this.touchMoveBind = this.touchMoveCallback.bind(this)
    this.touchEndBind = this.touchEndCallback.bind(this)
    this.validate(options) // 验证
    this.watcher()
		this.init(); // 初始化
	}

	PreviewImage.prototype = {
		init: function() {
      console.log('init')
      this.parent = w.document.querySelector(this.el)
      this.parent.innerHTML = ''
      this.parent.classList.add('qg-image-viewer__wrapper')
      this.renderMask() // 初始化遮罩层
      this.renderImageList()
      this.isMoseDown = false
      this.isMobile = this.isMobileJudge()
      this.clientWidth = w.innerWidth
      this.clientHeight = w.innerHeight
      this.opacity = this.options.maskOpacity || 1
      this.originalOpacity = this.opacity
      this.currentViewerTarget = null // 当前展示图片
      this.curr = this.options.curr
      // this.isShow = this.options.isShow || false
      var _this = this
      var debounceResieFn = _this._debounce(function() {
        _this.clientWidth = w.innerWidth
        _this.clientHeight = w.innerHeight
      }, 100)
      // addHandler(w, 'resize', function() {
      //   console.log('resize callback')
      //   _this.previewImageList.classList.remove('transition') 
      //   _this.previewImageList.classList.add('body-resize')
      //   debounceResieFn()
      // })
    },
    validate: function (options) {
      if (options === undefined) {
        throw new Error('PreviewImage must have options')
      }
      if (!options.el) {
        throw new Error('PreviewImage must have a "el"')
      }
    },
    _debounce: function(fn, delay) {
      var timer = null
      return function(...args) {
        var context = this
        if (timer) clearTimeout(timer)
        timer = setTimeout(function() {
          fn.apply(context, args)
        }, delay)
      }
    },
    isMobileJudge: function () {
      var userAgent = w.navigator.userAgent
      if( userAgent.match(/Android/i)
        || userAgent.match(/webOS/i)
        || userAgent.match(/iPhone/i)
        || userAgent.match(/iPad/i)
        || userAgent.match(/iPod/i)
        || userAgent.match(/BlackBerry/i)
        || userAgent.match(/Windows Phone/i)
      )return true;
      return false;
    },
    watcher: function () {
      var _this = this
      var isShow = this.isShow || false
      Object.defineProperty(this, 'isShow', {
        enumerable: true,
        configurable: false,
        set: function(v) {
          // console.log('isShow:', v)
          isShow = v
          if (v) {
            // this.parent.classList.remove('hidden-viewer')
            this.body.classList.add('fixed-doc')
            this.parent.style.display = 'block'
            var addClass = ' ' + this.transitionName + (v ? '-fade_in' : '-fade_out')
            this.parent.className += addClass
            whenTransitionEnd(this.parent, this.transitionType, function () {
              console.log(_this.parent.className)
              _this.parent.className = _this.parent.className.replace(addClass, '')
            })
          } else {
            // this.parent.classList.add('hidden-viewer')
            this.body.classList.remove('fixed-doc')
            var addClass = ' ' + this.transitionName + (v ? '-fade_in' : '-fade_out')
            this.parent.className +=  addClass
            whenTransitionEnd(this.parent, this.transitionType, function () {
              _this.parent.style.display = 'none'
              _this.parent.className = _this.parent.className.replace(addClass, '')
              _this.opacity = _this.originalOpacity
              _this.domItemList[_this.curr].classList.remove('active')
              $(_this.currentViewerTarget).css('-webkit-transform', 'translateY('+ 0 +'px) translateX(' + 0 + 'px) translateZ(0)')
            })
          }
        },
        get: function () {
          return isShow
        }
      })
      var _curr = ''
      Object.defineProperty(this, 'curr', {
        enumerable: true,
        configurable: false,
        set: function(v) {
          // console.log('curr:', v)
          this.currSrc = this.urls[v]
          this.previewImageLeft = - this.clientWidth * v
          this.currentViewerTarget = this.domItemList[v]
          _curr && this.domItemList[_curr].classList.remove('active')
          this.currentViewerTarget.classList.add('active')
          _curr = v
        },
        get: function () {
          return _curr
        }
      })
      var _isMobile = ''
      Object.defineProperty(this, 'isMobile', {
        enumerable: true,
        configurable: false,
        set: function(v) {
          // console.log('isMobile:', v)
          if (_isMobile === v) return
          _isMobile = v
          this.addEventHandler(v)
        },
        get: function () {
          return _isMobile
        }
      })
      var _clientWidth = ''
      Object.defineProperty(this, 'clientWidth', {
        enumerable: true,
        configurable: false,
        set: function(v) {
          // console.log('clientWidth:', v)
          if (_clientWidth === v) return
          _clientWidth = v
          this.isMobile = this.isMobileJudge()
          this.previewImageLeft = - this.curr * v
          var _this = this
          requestAnimationFrame(function() {
            $(_this.previewImageList).css('-webkit-transform', 'translateX('+ _this.previewImageLeft +'px) translateZ(0)')
            _this.previewImageList.classList.remove('body-resize')
          })
        },
        get: function () {
          return _clientWidth
        }
      })
      var _opacity = ''
      Object.defineProperty(this, 'opacity', {
        enumerable: true,
        configurable: false,
        set: function(v) {
          if (_opacity === v) return
          _opacity = v
          this.maskcont.style.opacity = v
        },
        get: function () {
          return _opacity
        }
      })
      var _previewImageLeft = ''
      Object.defineProperty(this, 'previewImageLeft', {
        enumerable: true,
        configurable: false,
        set: function(v) {
          if (_previewImageLeft === v) return
          _previewImageLeft = v
          $(this.previewImageList).css('-webkit-transform', 'translateX('+ this.previewImageLeft +'px) translateZ(0)')
        },
        get: function () {
          return _previewImageLeft
        }
      })
    },
    renderMask: function () {
      var div = this.div
      this.maskcont = document.createElement(div)
      this.maskcont.classList.add('qg-image-viewer__mask')
      this.parent.appendChild(this.maskcont)
    },
    renderImageList: function () {
      console.log('渲染了list')
      var div = this.div
      var urlsLength = this.urls.length
      var previewImageList = document.createElement(div)
      this.previewImageList = previewImageList
      previewImageList.classList.add('qg-image-viewer__list')
      previewImageList.style.width = 100 * urlsLength + '%'
      this.parent.appendChild(previewImageList)
      // var fragment = document.createDocumentFragment()
      for (var i = 0; i < urlsLength; i++) {
        var currentImg = this.urls[i]
        var item = document.createElement(div)
        item.classList.add('qg-image-viewer__item')
        var imgBox = document.createElement('img')
        imgBox.src = currentImg
        imgBox.classList.add('qg-image__preview')
        item.appendChild(imgBox)
        this.domItemList.push(item)
        previewImageList.appendChild(item)
      }
      this.parent.appendChild(previewImageList)
    },
    setPreviewImage: function (curr){
      this.curr = curr
      this.isShow = true
    },
    touchStartCallback: function (e) {
      if (e.type === 'touchstart') {
        if (!e.touches) return
        if (e.touches.length > 1) {
          e.preventDefault()
        }
        this.touchtarget1 = {x: e.touches[0].clientX, y: e.touches[0].clientY}
        this.touchOption.touchStartX = e.touches[0].clientX
        //css-webkit-transform属性值格式：matrix(1, 0, 0, 1, -4140, 0)
        // var transfrom_info = $(this.previewImageList).css("-webkit-transform").split(',')[4];//获取当前outerDiv的x轴坐标
        // this.touchOption.startTranslateX = parseInt(transfrom_info)
      } else {
        // console.log('mousedown')
        this.isMoseDown = true
        this.touchtarget1 = {x: e.clientX, y: e.clientY}
        this.touchOption.touchStartX = e.clientX
      }
      $(this.previewImageList).removeClass('transition') //移除动画效果，否则移动时图片会颤动
      this.touchOption.startTranslateX = this.previewImageLeft
      this.touchOption.startOpacity = this.opacity
    },
    touchMoveCallback: function(e) {
      var currentTouchTarget
      var _this = this
      if (e.type === 'touchmove') {
        if (!e.touches) return
        currentTouchTarget = {x: e.touches[0].clientX, y: e.touches[0].clientY}
      } else {
        if (!this.isMoseDown) return
        currentTouchTarget = {x: e.clientX, y: e.clientY}
      }
      _this.touchOption.moveDistanceX = currentTouchTarget.x - _this.touchtarget1.x
      _this.touchOption.moveDistanceY = currentTouchTarget.y - _this.touchtarget1.y
      var distance = Math.max(Math.abs(currentTouchTarget.y - this.touchtarget1.y), Math.abs(currentTouchTarget.x - this.touchtarget1.x))
      if (!this.touchOption.isLockType) {
        if (distance >= 10 && distance <= 40) {
          var currentproportion = Math.abs(currentTouchTarget.y - this.touchtarget1.y) / Math.abs(currentTouchTarget.x - this.touchtarget1.x)
          console.log('currentproportion: ',currentproportion)
          if (currentproportion > 2) {
            this.touchOption.type = 0
          } else {
            this.touchOption.type = 1
          }
          this.touchOption.isLockType = true
        }
      } else {
        if (this.touchOption.type) {
          _this.previewImageLeft = _this.touchOption.startTranslateX + _this.touchOption.moveDistanceX
        } else {
          var currentViewerTarget = this.domItemList[this.curr]
          var m = this.clientHeight * 2/3
          _this.opacity = (_this.touchOption.startOpacity - _this.touchOption.moveDistanceY * _this.touchOption.startOpacity / m) || 0
          console.log(_this.touchOption, _this.opacity)
          $(currentViewerTarget).removeClass('transition')
          $(currentViewerTarget).css('-webkit-transform', 'translateY('+ _this.touchOption.moveDistanceY +'px) translateX(' + _this.touchOption.moveDistanceX + 'px) translateZ(0)') 
        }
      }
      
    },
    touchEndCallback: function(e) {
      if (e.type === 'touchend') {
        var now = Date.now()
        if (now - this.touchOption.lastTouchEnd <= 500) {
          e.preventDefault()
        }
        this.touchOption.lastTouchEnd = now
      } else {
        if (!this.isMoseDown) return
        this.isMoseDown = false
      }
      if (this.touchOption.type) {
        $(this.previewImageList).addClass('transition') //添加动画效果
        var moveX = this.clientWidth / 4
        if (this.touchOption.moveDistanceX > moveX && this.curr !== 0){
          this.curr --
        } else if (this.touchOption.moveDistanceX < -moveX && this.curr !== this.urls.length - 1) {
          this.curr ++
        } else {
          this.curr = this.curr
        }
      } else {
        var moveY = this.clientHeight / 4
        var currentViewerTarget = this.domItemList[this.curr]
        if (Math.abs(this.touchOption.moveDistanceY) >= moveY) {
          this.isShow = false
        } else {
          $(currentViewerTarget).addClass('transition')
          this.opacity = this.originalOpacity
          $(currentViewerTarget).css('-webkit-transform', 'translateY('+ 0 +'px) translateX(' + 0 + 'px) translateZ(0)')
        }
      }
      this.touchOption.moveDistanceX = 0
      this.touchOption.moveDistanceY = 0
      this.touchOption.isLockType = false
    },
    addEventHandler: function(boolean) {

      // console.log('事件绑定')
      if (boolean) {
        removeHandler(this.previewImageList, 'mousedown',this.touchStartBind)
        removeHandler(this.previewImageList, 'mousemove',this.touchMoveBind)
        removeHandler(this.previewImageList, 'mouseup',this.touchEndBind)
        removeHandler(this.previewImageList, 'mouseout',this.touchEndBind)
        addHandler(this.previewImageList, 'touchstart',this.touchStartBind)
        addHandler(this.previewImageList, 'touchmove',this.touchMoveBind)
        addHandler(this.previewImageList, 'touchend',this.touchEndBind)
      } else {
        removeHandler(this.previewImageList, 'touchstart',this.touchStartBind)
        removeHandler(this.previewImageList, 'touchmove',this.touchMoveBind)
        removeHandler(this.previewImageList, 'touchend',this.touchEndBind)
        addHandler(this.previewImageList, 'mousedown',this.touchStartBind)
        addHandler(this.previewImageList, 'mousemove',this.touchMoveBind)
        addHandler(this.previewImageList, 'mouseup',this.touchEndBind)
        addHandler(this.previewImageList, 'mouseout',this.touchEndBind)
      }
    }
  }
	PreviewImage.prototype.constructor = PreviewImage;
	if (typeof noGlobal === "undefined") {
		window.PreviewImage = PreviewImage;
	}
	return PreviewImage;
})
