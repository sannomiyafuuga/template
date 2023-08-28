import { createDrawer } from './modules/drawer.js'
// import { dropDownUi } from './modules/dropDown.js'
import { SmoothScroll } from './modules/smoothScroll.js'

import { Mouseenter, Mouseleave } from './modules/Helper'
import { ViewOver } from './modules/ViewOver.js'

// const mqlMd = window.matchMedia('(max-width: 767px)')
const cloneTarget = document.getElementById('global-menu')
/* ドロワーのラッパー作成 */
const drawer = createDrawer(cloneTarget)

// (async () => {
//   const module = await import('./modules/dropDown.js')
//   const dropDownUi = module.dropDownUi
//   dropDownUi()
// })()

/*
 * スムーススクロール
 */
const smoothScrollSelector = 'a[href],[data-href]'
const smoothScroll = new SmoothScroll(smoothScrollSelector, {
  duration: 900,
  // offset: '#header',
  callback: (elem) => {
    drawer.setClose(drawer.drawerElement)
  },
})
smoothScroll.init()

/**
 * マウスオーバー
 */
const onmouseenterSelector = '[data-onmouseenter]'
if (document.querySelector(onmouseenterSelector)) {
  const hoverIn = new Mouseenter(onmouseenterSelector, (event) => {
    event.preventDefault()
    const className = event.currentTarget.dataset.onmouseenter
    event.currentTarget.classList.add(className)
    event.currentTarget.classList.add('js-onmouseenter')

    const showContent = event.currentTarget.querySelector('.js-show-content')
    showContent && showContent.setAttribute('aria-hidden', 'false')
  })
  hoverIn.init()
}

/**
 * マウスアウト
 */
const onmouseleaveSelector = '[data-onmouseleave]'
if (document.querySelector(onmouseleaveSelector)) {
  const hoverOut = new Mouseleave(onmouseleaveSelector, (event) => {
    event.preventDefault()
    const className = event.currentTarget.dataset.onmouseleave

    if (event.currentTarget.classList.contains('js-onmouseenter')) {
      event.currentTarget.classList.remove(className)
      event.currentTarget.classList.remove('js-onmouseenter')

      const showContent = event.currentTarget.querySelector('.js-show-content')
      showContent && showContent.setAttribute('aria-hidden', 'true')
    }
  })
  hoverOut.init()
}

/*
 * ViewOver
 */
const viewOver = new ViewOver('[data-view-over]')
viewOver.init()
