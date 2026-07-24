import { useState } from 'react'
import Tesseract from 'tesseract.js'


function App(){

  const [image,setImage] = useState(null)
  const [text,setText] = useState('')

  const [store,setStore] = useState('')
  const [money,setMoney] = useState('')
  const [date,setDate] = useState('')

  const [list,setList] = useState(
    JSON.parse(localStorage.getItem('moneyList')) || []
  )


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

    const numbers =
      value.match(/[\d,]+원?/g)


    if(numbers){

      setMoney(
        numbers[0]
        .replace(/,/g,'')
        .replace('원','')
      )

    }


    const dates =
      value.match(
        /\d{4}[.-]\d{1,2}[.-]\d{1,2}/
      )


    if(dates){

      setDate(dates[0])

    }


    const lines =
      value
      .split('\n')
      .filter(x=>x.trim())


    if(lines.length){

      setStore(lines[0])

    }

  }



  function save(){

    const item = {

      store,
      money:Number(money),
      date:date || new Date().toLocaleDateString()

    }


    const newList=[
      ...list,
      item
    ]


    setList(newList)

    localStorage.setItem(
      'moneyList',
      JSON.stringify(newList)
    )


    setStore('')
    setMoney('')
    setDate('')

  }



  const total =
    list.reduce(
      (sum,item)=>sum+item.money,
      0
    )



  return (

    <div className="app">


      <h1>💰 가계부</h1>


      <h2>
        총 지출 :
        {total.toLocaleString()}원
      </h2>


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


      <button onClick={save}>
        저장하기
      </button>



      <h2>📒 거래내역</h2>


      {
        list.map((item,index)=>(

          <div className="card" key={index}>

            📅 {item.date}
            <br/>

            🏪 {item.store}

            <strong>
              {item.money.toLocaleString()}원
            </strong>

          </div>

        ))
      }



    </div>

  )

}


export default App
