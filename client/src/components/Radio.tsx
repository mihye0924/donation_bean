import styled from "styled-components"
 
interface RadioProps {
    label: string;
    value: string | number;
    name: string;
    id: string;
    imgUrl?: string; 
    className: string
    type?: string;
    onChange: () => void; 
}

const Radio = (props: RadioProps) => { 
  return (
      <>
        {
          (() => {
            switch (props.type) {
              case "image": 
              return(
                <RadioItem htmlFor={props.id} className={props.className}>
                  <input 
                      type="radio" 
                      id={props.id}
                      name={props.name}
                      value={props.value}
                      onChange={props.onChange}
                  />
                  <i className={`icon-${props.imgUrl}`} />
                  <span>{props.label}</span>
              </RadioItem>
              )
              case "round": 
              return(
                <RadioRound className={props.className}>
                  <input 
                      type="radio" 
                      id={props.id}
                      name={props.name}
                      value={props.value}
                      onChange={props.onChange}
                  />
                  <label htmlFor={props.id}>{props.label}</label> 
              </RadioRound>
              )
              default:
                break;
            }
          })()
        }
      </>
  )
}

export default Radio
const sizes = {
  desktop: "1200px",
  tablet: "768px",
  mobile: "375px"
}; 
// 미디어 쿼리를 위한 도우미 함수
const media = {
desktop: `(max-width: ${sizes.desktop})`,
tablet: `(max-width: ${sizes.tablet})`,
mobile: `(max-width: ${sizes.mobile})`,
}; 
const RadioItem = styled.label`
    border: 1px solid #ddd;
    border-radius: 20px;
    height: 42px;
    padding: 0 10px;
    white-space: nowrap;
    i {
      display: inline-block;
      vertical-align:middle;
      width: 27px;
      height: 100%;
      margin-right: 4px;
      &::before {
        content: "";
        display:inline-block;
        width:100%;
        height: 100%;
        vertical-align: middle;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      &.icon-been {
        &::before {
          background: url('/images/icon-been.svg') no-repeat center/contain;
        }
      }
      &.icon-multiculturalism {
        &::before {
          background: url('/images/icon-multiculturalism.svg') no-repeat center/contain;
        }
      }
      &.icon-animal {
        &::before {
          background: url('/images/icon-animal.svg') no-repeat center/contain;
        }
      }
      &.icon-kids {
        &::before {
          background: url('/images/icon-kids.svg') no-repeat center/contain;
        }
      }
      &.icon-civilsociety {
        &::before {
          background: url('/images/icon-civilsociety.svg') no-repeat center/contain;
        }
      }
      &.icon-disabledperson {
        &::before {
          background: url('/images/icon-disabledperson.svg') no-repeat center/contain;
        }
      }
      &.icon-elders {
        &::before {
          background: url('/images/icon-elders.svg') no-repeat center/contain;
        }
      }
      &.icon-woman {
        &::before {
          background: url('/images/icon-woman.svg') no-repeat center/contain;
        }
      }
      &.icon-etc {
        &::before {
          background: url('/images/icon-etc.svg') no-repeat center/contain;
        }
      }
      &.icon-environment {
        &::before {
          background: url('/images/icon-environment.svg') no-repeat center/contain;
        }
      }
      &.icon-earth {
        &::before {
          background: url('/images/icon-earth.svg') no-repeat center/contain;
        }
      }
    }
    span {
      display: inline-block;
      vertical-align: middle;
    }
    input {
      display: none;
    }
    &.active {
      background-color: #f56400;
      border-color: #f56400;
      color: #fff
    } 
`
const RadioRound = styled.div`
  position: relative; 
  margin-left: 30px; 
  input{ 
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      border: 0;
      &+label::after{
        position: absolute;
        content: '';
        width: 10px;
        height: 10px;
        background-color: #fff;
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
        left: -25px; 
      }
    }
    &::before {
      position: absolute;
      content: '';
      width: 20px;
      height: 20px;
      left: -30px;
      top: 50%;
      transform: translateY(-50%); 
      background-color: #bdbdbd;
      border-radius: 50%;
    } 
    &.active{ 
      &::before{
        background-color: #f56400;
      } 
    }
    label {
      cursor: pointer;
      white-space: pre;
    }
    @media ${media.tablet}{ 
      label {
        font-size: 14px;
      }
    }
`