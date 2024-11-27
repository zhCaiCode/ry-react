import styled from '@emotion/styled';
import { getRem } from '@/utils/utils';

export const LoginContainer = styled.div`
  position: relative;
  height: 100%;
  background-image: url('/assets/images/bg_login.webp');
  background-size: cover;
  background-repeat: no-repeat;
  zoom: ${window.innerWidth / 1920};
`;
export const LoginBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 77%;
  height: ${getRem(798)};
  margin: auto;
  background-image: url('/assets/images/bg_login_form.webp');
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
`;
export const LoginPanel = styled.div`
   background-color: #fff;
      float: right;
      width: 45%;
      height: 100%;
      border-radius: 0 ${getRem(30)} ${getRem(30)} 0;
`
