export const getRem: (px: number) => string = (px: number) => {
    const { _htmlFontSize } = window
    return `${px / 16}rem`
  
  }
  export const pxtorem = () => {
    console.log(
      "document.documentElement.clientWidth...",
      document.documentElement.clientWidth
    );
    const rootSize = (document.documentElement.clientWidth / 1920) * 16;
  
    document.documentElement.style.fontSize = `${
      rootSize > 16 ? 16 : rootSize
    }px`;
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
  
    function pxToRem(px: number) {
      return `${px / rootFontSize}rem`;
    }
  
    enum PropsType {
      FONTSIZE = "fontSize",
      MARGIN = "margin",
      PADDING = "padding",
      WIDTH = "width",
      HEIGHT = "height",
      TOP = "top",
      RIGHT = "right",
      BOTTOM = "bottom",
      LEFT = "left",
      PADDING_BLOCK = 'padding-block',
      PADDING_BLOCK_START = 'padding-block-start',
      PADDING_BLOCK_END = 'padding-block-end',
      PADDING_INLINE = 'padding-inline',
      PADDING_INLINE_START = 'padding-inline-start',
      PADDING_INLINE_END = 'padding-inline-end',
      MARGIN_BLOCK = 'margin-block',
      MARGIN_INLINE ='margin-inline',
      MARGIN_BLOCK_START ='margin-block-start',
      MARGIN_BLOCK_END ='margin-block-end',
      MARGIN_INLINE_START ='margin-inline-start',
      MARGIN_INLINE_END ='margin-inline-end',


    }
    function convertToRem(element: HTMLElement) {
      const style = getComputedStyle(element);
      const properties = [
        PropsType.FONTSIZE,
        PropsType.MARGIN,
        PropsType.PADDING,
        PropsType.WIDTH,
        PropsType.HEIGHT,
        PropsType.TOP,
        PropsType.RIGHT,
        PropsType.BOTTOM,
        PropsType.LEFT,
      ];
  
      properties.forEach((prop:any) => {
        const value = style[prop];
        if (value && value.endsWith("px")) {
          const pxValue = parseFloat(value);
          if (!isNaN(pxValue)) {
            element.style[prop] = `${pxToRem(pxValue)}!important`;
          }
        }
      });
      Array.from(element.children).forEach((child) => {
        if (child instanceof HTMLElement) {
          convertToRem(child);
        }
      });
    }
    convertToRem(document.body);
    console.log("初始化完成");
  };