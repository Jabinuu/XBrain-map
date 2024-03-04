import { ref, onMounted } from 'vue'
import bus from '@/utils/bus'
import Node from 'brain-map/dist/type/index'

export function useEditNode() {
  const activeNodes = ref()

  const style = ref<Record<string, any>>({
    fontSize: -1,
    fillColor: '',
    borderColor: '',
    lineColor: '',
    color: '',
    borderWidth: -1,
    lineStyle: '',
    fontStyle: false,
    textUnderline: false,
    textLineThrough: false,
    fontWeight: false,
    textAlign: 'left',
    shape: '',
    lineWidth: -1
  })

  const isFillTransparent = computed(() => style.value.fillColor === 'transparent')
  const isBorderTransparent = computed(() => style.value.borderColor === 'transparent')

  onMounted(() => {
    bus.on('node_active', onNodeActive)
  })

  function onNodeActive(manipulateNodes: any) {
    activeNodes.value = [...manipulateNodes[0]]
    if (activeNodes.value.length) {
      initSidebar()

    }
  }

  function initSidebar() {
    ['fontSize',
      'fillColor',
      'borderColor',
      'lineColor',
      'color',
      'borderWidth',
      'lineStyle',
      'shape',
      'lineWidth',
      'textAlign'
    ]
      .forEach((prop) => {
        activeNodes.value.forEach((node: Node) => {
          style.value[prop] = node.getStyle(prop)
        })
      })

    if (!['left', 'right', 'center', 'justify'].includes(style.value.textAlign)) {
      style.value.textAlign = 'left'
    }
    style.value.textLineThrough = false
    style.value.textUnderline = false
    style.value.fontWeight = false
    style.value.fontStyle = false;

    ['fontStyle', 'fontWeight', 'textDecoration'].forEach((prop) => {
      const val = (activeNodes.value[0] as Node).getStyle(prop)
      if (prop === 'fontWeight' && val === 'bold') {
        style.value.fontWeight = true
      } else if (prop === 'fontStyle' && val === 'italic') {
        style.value.fontStyle = true
      } else if (prop === 'textDecoration' && val === 'underline') {
        style.value.textUnderline = true
      } else if (prop === 'textDecoration' && val === 'line-through') {
        style.value.textLineThrough = true
      } else if (prop === 'textDecoration' && val.split(' ').length === 2) {
        style.value.textLineThrough = true
        style.value.textUnderline = true
      }
    })
  }

  function handleNodeFillChange(val: string) {
    style.value.fillColor = val;
    activeNodes.value.forEach((node: Node) => {
      node.setStyle('fillColor', val)
    })
    // (activeNodes.value[0] as Node).setStyle('fillColor', val)
  }

  function handleBorderColorChange(val: string) {
    style.value.borderColor = val;
    activeNodes.value.forEach((node: Node) => {
      node.setStyle('borderColor', val)
    })
    // (activeNodes.value[0] as Node).setStyle('borderColor', val)
  }

  function handleLineColorChange(val: any) {
    if (val === 'transparent') return
    style.value.lineColor = val;
    activeNodes.value.forEach((node: Node) => {
      node.setStyle('lineColor', val)
    })
    // (activeNodes.value[0] as Node).setStyle('lineColor', val)
  }

  function handleFontColorChange(val: any) {
    if (val === 'transparent') return
    style.value.color = val;
    activeNodes.value.forEach((node: Node) => {
      node.setStyle('color', val)
    })
    // (activeNodes.value[0] as Node).setStyle('color', val)
  }

  function handleFontWeight(val: any) {
    let _val: string
    if (val) {
      _val = 'bold'
    } else {
      _val = 'normal'
    }
    activeNodes.value.forEach((node: Node) => {
      node.setStyle('fontWeight', _val)
    })
    // activeNodes.value[0].setStyle('fontWeight', _val)
  }

  function handleFontStyle(val: any) {
    let _val: string
    if (val) {
      _val = 'italic'
    } else {
      _val = 'normal'
    }
    activeNodes.value.forEach((node: Node) => {
      node.setStyle('fontStyle', _val)
    })
    // activeNodes.value[0].setStyle('fontStyle', _val)
  }

  function handleTextDecoration() {
    let val = ''
    const { textLineThrough, textUnderline } = style.value

    if (textUnderline && !textLineThrough) {
      val = 'underline'
    } else if (!textUnderline && textLineThrough) {
      val = 'line-through'
    } else if (textUnderline && textLineThrough) {
      val = 'underline line-through'
    }
    activeNodes.value.forEach((node: Node) => {
      node.setStyle('textDecoration', val)
    })


    // activeNodes.value[0].setStyle('textDecoration', val)
  }

  function handleBorderWidthChange() {
    activeNodes.value.forEach((node: Node) => {
      node.setStyle('borderWidth', style.value.borderWidth)
    })
    // activeNodes.value[0].setStyle('borderWidth', style.value.borderWidth)
  }

  function handleLineWidthChange() {
    activeNodes.value.forEach((node: Node) => {
      node.setStyle('lineWidth', style.value.lineWidth)
    })
    // activeNodes.value[0].setStyle('lineWidth', style.value.lineWidth)
  }

  function handleLineStyleChange() {
    activeNodes.value.forEach((node: Node) => {
      node.setStyle('lineStyle', style.value.lineStyle)
    })
    // activeNodes.value[0].setStyle('lineStyle', style.value.lineStyle)
  }

  function handleFontSizeChange() {
    activeNodes.value.forEach((node: Node) => {
      node.setStyle('fontSize', style.value.fontSize)
    })
    // activeNodes.value[0].setStyle('fontSize', style.value.fontSize)
  }

  function handleTextAlignChange() {
    activeNodes.value.forEach((node: Node) => {
      node.setStyle('textAlign', style.value.textAlign)
    })
    // activeNodes.value[0].setStyle('textAlign', style.value.textAlign)
  }

  return {
    activeNodes,
    style,
    isFillTransparent,
    isBorderTransparent,
    handleNodeFillChange,
    handleBorderColorChange,
    handleLineColorChange,
    handleFontColorChange,
    handleFontWeight,
    handleFontStyle,
    handleTextDecoration,
    handleBorderWidthChange,
    handleLineWidthChange,
    handleLineStyleChange,
    handleFontSizeChange,
    handleTextAlignChange
  }
}