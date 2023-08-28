/*
```
<li class="js-dropdown">
  <button type="button" aria-expanded="true" aria-controls="id-requirement-menu">
    トリガー
  </button>

  <div id="id-requirement-menu">
    メニュー
  </div>
</li>
```
*/

export const dropDownUi = (dropDownElement, matches = false) => {
  const dropDown = dropDownElement
  const button = dropDown.querySelector('[aria-expanded][aria-controls]')
  const id = button.getAttribute('aria-controls')
  const dropDownTarget = document.getElementById(id)

  const getState = () => button.getAttribute('aria-expanded')

  const onHide = () => {
    button.setAttribute('aria-expanded', 'false')
    dropDownTarget.setAttribute('aria-hidden', 'true')
    dropDown.classList.remove('is-show')
  }

  const onShow = () => {
    button.setAttribute('aria-expanded', 'true')
    dropDownTarget.setAttribute('aria-hidden', 'false')
    dropDown.classList.add('is-show')
  }

  const onKeydownEsc = (event) => {
    if (getState() !== 'true' || event.key !== 'Escape') {
      return
    }
    event.preventDefault()
    button.focus()
    onHide()
  }

  if (!matches) {
    onHide()
    dropDown.addEventListener('mouseenter', onShow, false)
    dropDown.addEventListener('mouseleave', onHide, false)

    dropDown.addEventListener('focus', onShow, true)
    dropDown.addEventListener('blur', onHide, true)

    window.addEventListener('keydown', onKeydownEsc, false)
  } else {
    onShow()
    dropDown.removeEventListener('mouseenter', onShow, false)
    dropDown.removeEventListener('mouseleave', onHide, false)

    dropDown.removeEventListener('focus', onShow, true)
    dropDown.removeEventListener('blur', onHide, true)

    window.removeEventListener('keydown', onKeydownEsc, false)
  }
}
