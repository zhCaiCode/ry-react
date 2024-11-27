export const getRem: (px: number) => string = (px: number) => {
    const { _htmlFontSize } = window
    return `${px / 16}rem`
  
  }
  