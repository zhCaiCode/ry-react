import styled from '@emotion/styled';
import { getRem } from '@/utils/utils';
export const LoginWrapper = styled.div`
  height: 100%;

  .txt-login {
    font-size: ${getRem(28)};
    font-weight: 700;
    color: #000;
    margin-block-start: 1em;
    margin-block-end: 1em;
  }

  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - ${getRem(96)});

    .btn-login {
      height: ${getRem(50)} !important;
      border-radius: 5px;
      background: linear-gradient(90deg, #15367f 70%, #844769);
      &:hover{
        background: linear-gradient(90deg, #15367f 70%, #844769);
        border-color: #409eff;
        opacity: .92;
      }
    }


    .title {
      height: ${getRem(80)};
      margin: 0px auto ${getRem(15)}  auto;
      text-align: center;
      color: #000;
      font-family: Poppins-SemiBold;
      font-size: ${getRem(28)};
      font-weight: 700;
      line-height: ${getRem(120)};
    }
    .title--desc{
      color:#494949;
      text-align: center;
      margin-top: 0px;
      height:  ${getRem(30)};
      line-height:  ${getRem(30)};
      font-size:  ${getRem(18)};
    }

    .login-form {
      position: relative;
      border-radius: 10px;
      background: #ffffff;
      height: 100%;
      width: ${getRem(600)};
      padding: ${getRem(25)} ${getRem(25)} ${getRem(5)} ${getRem(25)};
      /*  box-shadow: 0px 5px 15px rgb(0 0 0 / 20%);*/
        input {
          height: ${getRem(36)};
        }


      .input-icon {
        height: 100%;
        width: ${getRem(16)};
        margin-left: 2px;
      }
    }

    .form-item-wrapper {
      padding: 5px ${getRem(60)} 0;
    }

    .login-tip {
      font-size: 13px;
      text-align: center;
      color: #bfbfbf;
    }

    .login-code {
      /* width: 33%; */
      height: ${getRem(38)};
      float: right;
      position: relative;
      right: ${getRem(20)};
      top: ${getRem(5)};

      img {
        cursor: pointer;
        vertical-align: middle;
      }
    }

    .ant-login-footer {
      height: ${getRem(40)};
      line-height:${getRem(40)};
      position: absolute;
      bottom: ${getRem(30)};
      width: 100%;
      text-align: center;
      display: block;
      color:#9fabb1;
      font-size: ${getRem(14)};
      letter-spacing: 1px;
    }

    .login-code-img {
      height: ${getRem(38)};
    }
  }
`
export const LoginCode = styled.img``
