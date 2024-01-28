import { h, render } from 'vue'
import ContextMenu from './ContextMenu.vue'
import { MenuListItem } from '@/pages/edit/index.vue'

export function openContextMenu() {
  let isShow = false
  const div = document.createElement('div')
  div.style.position = 'absolute'
  div.style.zIndex = '1'
  document.body.appendChild(div)

  function show(menuList: MenuListItem[], x: number, y: number) {
    const vnode = h(ContextMenu, {
      menuList
    })
    render(vnode, div)
    div.style.left = x + 10 + 'px'
    div.style.top = y + 5 + 'px'
    div.style.visibility = 'visible'
    isShow = true
  }

  function hide() {
    if (!isShow) return
    div.style.visibility = 'hidden'
    isShow = false
  }

  return {
    show,
    hide
  }
}