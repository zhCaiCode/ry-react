import React, { memo, useCallback, useEffect, useState } from 'react'
import type { ReactNode, FC } from 'react'
import { LoginCode, LoginWrapper } from './style'
import { Form, Input, message, Button, Row, Col } from 'antd'
import { useMemo } from 'react'
import { UserOutlined, LockOutlined, VerifiedOutlined } from '@ant-design/icons'
import { getCaptchaImg, login } from '@/services/system/auth'
import { useForm } from 'antd/es/form/Form'
import { useIntl, useModel,history } from '@umijs/max'
// import { setToken } from '@/utils/auth'
import { clearSessionToken, setSessionToken } from '@/access'
import { flushSync } from 'react-dom'
// import AppLoading from '@/components/AppLoading'

interface IProps {
	children?: ReactNode
}

type FieldType = {
	username?: string
	password?: string
	code?: string
	uuid?: string
}
interface CaptchaResponse {
	img: string
	uuid: string
}

const LoginForm: FC<IProps> = () => {
	const [initialStatus, setInitialStatus] = useState(false)
	const [codeImage, setCodeImage] = useState<string>('')
	// const [userLoginState, setUserLoginState] = useState<API.LoginResult>({code: 200});
	// const [type, setType] = useState<string>('account');
	const [uuid, setUuid] = useState<string>('')
	// const navigator = useNavigate()
	const [form] = useForm()
	const intl = useIntl();
	const { initialState, setInitialState } = useModel('@@initialState');
	const fields = useMemo<Array<{
		name: string
		label:string
		prefix?: ReactNode
		col: { span: number }
		rules: any[]
		type?: string
	}>>(() => {
		return [
			{
				name: 'username',
				label: '用户名',
				prefix: <UserOutlined />,
				col: { span: 24 },
				rules: [{ required: true, message: 'Please input your username!' }],
			},
			{
				name: 'password',
				label: '密码',
				type: 'password',
				prefix: <LockOutlined />,
				col: { span: 24 },
				rules: [{ required: true, message: 'Please input your password!' }],
			},
			{
				name: 'code',
				label: '验证码',
				prefix: <VerifiedOutlined />,
				col: { span: 24 },
				rules: [{ required: true, message: 'Please input your code!' }],
			},
		]
	}, [])
	const getVerify: () => Promise<CaptchaResponse> = useCallback(() => {
		return new Promise(resolve => {
			getCaptchaImg()
				.then((res: CaptchaResponse) => {
					setCodeImage(`data:image/gif;base64,${res.img}`)
					setUuid(res.uuid)
					resolve(res)
				})
				.catch((error) => {
					console.log(error)
					throw error
				})
		})
	}, [])
	const fetchUserInfo = async () => {
		const userInfo = await initialState?.fetchUserInfo?.();
		if (userInfo) {
		  flushSync(() => {
			setInitialState((s) => ({
			  ...s,
			  currentUser: userInfo,
			}));
		  });
		}
	  };
	// const handleLoginResponse = useCallback(
	// 	async (response: API.Login_Response) => {
	// 			 try{
	// 				console.log(response)
	// 			const { code, msg, token } = response
	// 			if (code === 200) {
	// 				// 登录成功
	// 				// message.success('登录成功')
	// 				const defaultLoginSuccessMessage = intl.formatMessage({
	// 					id: 'pages.login.success',
	// 					defaultMessage: '登录成功！',
	// 				});
	// 				// 处理token
	// 				const current = new Date();
	// 				const expireTime = current.setTime(current.getTime() + 1000 * 12 * 60 * 60);
	// 				console.log('login response: ', response);
	// 				setSessionToken(response?.token, response?.token, expireTime);
	// 				message.success(defaultLoginSuccessMessage);
	// 				//   setToken(token)
	// 				await fetchUserInfo();
	// 				// 跳转到首页
	// 				// navigator('/home/dashboard')
	// 				// const urlParams = new URL(window.location.href).searchParams;
	// 				// history.push(urlParams.get('redirect') || '/');
	// 				history.push('/')
	// 			} else {
	// 				console.log(response.msg);
	// 				clearSessionToken();
	// 				// 如果失败去设置用户错误信息
	// 				setUserLoginState({ ...response });
	// 				getVerify();
	// 			  }
	// 			 } catch (error) {
	// 				const defaultLoginFailureMessage = intl.formatMessage({
	// 				  id: 'pages.login.failure',
	// 				  defaultMessage: '登录失败，请重试！',
	// 				});
	// 				console.log(error);
	// 				message.error(defaultLoginFailureMessage);
	// 			  }
	// 	},
	// 	[navigator]
	// )

	const onFinish = useCallback(
		async (values: API.LoginParams) => {
			// console.log('表单值:', values)
			// const response = await login({ uuid, ...values })
			// handleLoginResponse(response)
			try {
				// 登录
				const response = await login({ ...values, uuid });
				if (response.code === 200) {
				  const defaultLoginSuccessMessage = intl.formatMessage({
					id: 'pages.login.success',
					defaultMessage: '登录成功！',
				  });
				  const current = new Date();
				  const expireTime = current.setTime(current.getTime() + 1000 * 12 * 60 * 60);
				  console.log('login response: ', response);
				  setSessionToken(response?.token, response?.token, expireTime);
				  message.success(defaultLoginSuccessMessage);
				  await fetchUserInfo();
				  console.log('login ok');
				  const urlParams = new URL(window.location.href).searchParams;
				  history.push(urlParams.get('redirect') || '/');
				  return;
				} else {
				  console.log(response.msg);
				  clearSessionToken();
				  // 如果失败去设置用户错误信息
				//   setUserLoginState({ ...response });
				  getVerify();
				}
			  } catch (error) {
				const defaultLoginFailureMessage = intl.formatMessage({
				  id: 'pages.login.failure',
				  defaultMessage: '登录失败，请重试！',
				});
				console.log(error);
				message.error(defaultLoginFailureMessage);
			  }
		},
		[uuid]
	)

	const handleKeyUp: (e: KeyboardEvent) => void = (event) => {
		if (event.key === 'Enter') {
			console.log('this is enter')
		}
	}
	// const { code } = userLoginState;
	// const loginType = type;
	useEffect(() => {
		if (!initialStatus) setInitialStatus(true)
		getVerify()
	}, [initialStatus, getVerify])
	return (
		<LoginWrapper>
			<div className='login'>
				<Form form={form} labelCol={{ span: 8 }} name='loginForm' onFinish={onFinish} className='login-form'>
					<p className='title'>通用后台管理系统</p>
					<div className='form-item-wrapper'>
						<h3 className='txt-login'>登录</h3>
						{fields.map((item) => {
							if (item.name === 'code') {
								return (
									<Row key={item.name}>
										<Col span={16}>
											<Form.Item<FieldType> wrapperCol={item.col} name={item.name} rules={item.rules}>
												<Input prefix={item.prefix} onKeyUp={(e)=>{handleKeyUp(e as any)}} />
											</Form.Item>
										</Col>
										<Col span={8}>
											<div className='login-code'>
												<LoginCode onClick={getVerify} src={codeImage} className='login-code-img' />
											</div>
										</Col>
									</Row>
								)
							}
							return (
								<Form.Item<FieldType> wrapperCol={item.col} name={item.name as any} rules={item.rules} key={item.name}>
									<Input prefix={item.prefix} type={item.type as any} onKeyUp={handleKeyUp as any} />
								</Form.Item>
							)
						})}
						<Form.Item wrapperCol={{ span: 24 }}>
							<Button type='primary' size='large' style={{ width: '100%' }} className='btn-login' htmlType='submit'>
								登录
							</Button>
						</Form.Item>
					</div>
				</Form>
			</div>
		</LoginWrapper>
	)
}
export default memo(LoginForm)
