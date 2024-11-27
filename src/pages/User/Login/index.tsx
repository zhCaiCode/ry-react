import React, { memo } from 'react'
import type { ReactNode, FC } from 'react'
import { LoginBox, LoginContainer, LoginPanel } from './style'
import LoginForm from './LoginForm'
import LanguageToggle from '@/components/LanguageToggle'
interface IProps {
	children?: ReactNode
}

const Login: FC<IProps> = () => {
	return (
		<LoginContainer>
			<LoginBox>
				<LoginPanel>
					<LanguageToggle />
					<LoginForm />
				</LoginPanel>
			</LoginBox>
		</LoginContainer>
	)
}
export default memo(Login)
