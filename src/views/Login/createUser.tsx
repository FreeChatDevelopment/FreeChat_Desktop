/**
 * Create a mnemonic
 */
import { useState, useEffect } from "react"
import wallet from "../../utils/wallet"
import { useNavigate } from "react-router-dom"
import html2canvas from 'html2canvas'
import { message } from 'antd'

import './index.scss'

interface IProps {
  setSharedMnemonic: Function
}

interface PProps {
  setPageType: Function
}

// generate mnemonic
function Generate(props: IProps & PProps) {
  const [list, setList] = useState<string[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    const mnemonic = wallet.getFromMnemonic()
    if (mnemonic) {
      let mnemonicList = (mnemonic as string).split(' ')
      console.log(mnemonicList, '7777')
      setList(mnemonicList)
      props.setSharedMnemonic(mnemonicList)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // canvas 转换并保存图片
  const canvasImg = function () {
    let div = document.querySelector(".list") as HTMLElement;
    let a = document.createElement("a");
    html2canvas(div).then(function (canvas) {
      let dom = document.body.appendChild(canvas);
      dom.style.display = "none";
      a.style.display = "none";
      document.body.removeChild(dom);
      let blob = dom.toDataURL("image/png");
      a.setAttribute("href", blob);
      //这块是保存图片操作  可以设置保存的图片的信息
      a.setAttribute("download", "ethereum.png");
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(blob);
      document.body.removeChild(a);
    });
  };
  return (
    <>
      <p>请妥善保管您的助记词 便于您找回账户</p>
      <ul className="list">
        {
          list.map((item: string, key: number) => {
            return <li key={key}>{item}</li>
          })
        }
      </ul>
      <div className="btn">
        <button onClick={() => canvasImg()}>保存为图片</button>
        <button onClick={() => alert('no Function...')}>复制</button>
      </div>
      <div className="bottom-btn">
        <button onClick={() => navigate('/login')}>返回</button>
        <button onClick={() => props.setPageType(2)}>下一步</button>
      </div>
    </>
  )
}

// Verify mnemonic
function Verify(props: PProps & { sharedMnemonic: string[] }) {
  console.log(props.sharedMnemonic.join(' '), 999)
  const [list, setList] = useState<string[]>(['', '', '', '', '', '', '', '', '', '', '', ''])
  const inputFun = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = Number(e.target.getAttribute('data-index'))
    let words = list.concat()
    if (key === 0) {
      let val = e.target.value
      const arr = val.split(" ")
      console.log(arr)
      if (arr.length === 12) {
        arr.forEach((code, idx) => {
          words[idx] = code
        })
        setList(words)
      } else {
        let _val = e.target.value.trim()
        words[key] = _val
        setList(words)
      }
    } else {
      let _val = e.target.value.trim()
      words[key] = _val
      setList(words)
    }
  }

  const next = () => {
    const str = list.join(' ')
    const old_str = props.sharedMnemonic.join(' ')
    if (str !== old_str) return message.error('Mnemonic input error')
    console.log(str === old_str)
  }

  return (
    <>
      <ul className="verify-list">
        {
          list.map((item: string, key: number) => {
            return <li key={key}>{(key + 1) < 10 ? `0${key + 1}` : key + 1}<input type="text" value={list[key]} data-index={key} placeholder="mnemonic" onChange={e => inputFun(e)} /></li>
          })
        }
      </ul>
      <div className="bottom-btn" style={{ marginTop: 30 }}>
        <button onClick={() => props.setPageType(1)}>返回</button>
        <button onClick={() => next()}>下一步</button>
      </div>
    </>
  )
}

// Export function 
export default function CreateUser() {
  const [sharedMnemonic, setSharedMnemonic] = useState<string[]>([])
  const [pageType, setPageType] = useState(1)
  const returnView = () => {
    switch (pageType) {
      case 1:
        return <Generate setSharedMnemonic={setSharedMnemonic} setPageType={setPageType} />
      case 2:
        return <Verify setPageType={setPageType} sharedMnemonic={sharedMnemonic} />
      default:
        break;
    }
  }
  return (
    <div className="create-user">
      <img src={require('../../assets/images/logo@2x.png')} className='logo' alt="" />
      <img src={require('../../assets/images/FREECHAT@2x.png')} className="free" alt="" />
      {
        returnView()
      }
    </div>
  )
}