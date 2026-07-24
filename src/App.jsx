import { useState } from 'react'
import Tesseract from 'tesseract.js'


function App(){

  const [image,setImage] = useState(null)
  const [text,setText] = useState('')

  const [store,setStore] = useState('')
  const [money,setMoney] = useState('')
  const [date,setDate] = useState('')


  async function upload(e){

    const file = e.target.files[0]

    if(!file) return


    setImage(URL.createObjectURL(file))


    const result = await Tesseract.recognize(
      file,
      'kor+eng'
    )


    const ocr = result.data.text

    setText(ocr)


    analyze(ocr)

  }



  function analyze(value){

    // 금액 찾기
    const numbers = value.match(
      /[\d,]+원?/g
    )


    if(numbers){

      const price =
        numbers[0]
        .replace(/,/g,'')
        .replace('원','')

      setMoney(price)

    }


    // 날짜 찾기

    const dates =
      value.match(
        /\d{4}[.-]\d{1,2}[.-]\d{1,2}/
      )


    if(dates){

      setDate(dates[0])

    }


    // 첫 번째 줄을 상호명으로 추정

    const lines =
      value
      .split('\n')
      .filter(x=>x.trim())


    if(lines.length){

      setStore(lines[0])

    }


  }



  return (

    <div className="app">

      <h1>💰 가계부</h1>


      <h3>📸 영수증 등록</h3>


      <input
        type="file"
        accept="image/*"
        onChange={upload}
      />


      {
        image &&
        <img
          src={image}
          width="100%"
          alt=""
        />
      }



      <h3>자동 인식 결과</h3>


      <input
        placeholder="상호명"
        value={store}
        onChange={e=>setStore(e.target.value)}
      />


      <input
        placeholder="금액"
        value={money}
        onChange={e=>setMoney(e.target.value)}
      />


      <input
        placeholder="날짜"
        value={date}
        onChange={e=>setDate(e.target.value)}
      />



      <div className="card">

        <h3>원본 OCR</h3>

        <pre>
          {text}
        </pre>

      </div>


    </div>

  )

}


export default App
