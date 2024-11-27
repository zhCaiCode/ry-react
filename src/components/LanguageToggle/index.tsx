import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'
import { LanguageWrapper } from './style'
interface IProps {
	children?: ReactNode
}
const LanguageToggle: FC<IProps> = () => {
	return <LanguageWrapper>

  </LanguageWrapper>
}
export default memo(LanguageToggle)
