import { h, render } from 'vue'
import ContextMenu from '@/components/ContextMenu.vue'
import { MenuListItem } from '@/pages/edit/index.vue'

export function useContextMenu() {
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
    div.style.transition = 'opacity .2s ease'
    div.style.left = x + 10 + 'px'
    div.style.top = y + 5 + 'px'    
    div.style.visibility = 'visible'
    div.style.opacity = '1'
    isShow = true
  }

  function hide() {
    if (!isShow) return
    div.style.removeProperty('transition')
    div.style.visibility = 'hidden'
    div.style.opacity = '0'
    isShow = false
  }

  return {
    show,
    hide
  }
}