import { useState } from 'react'

function App(){

  const [list,setList] = useState([])
  const [name,setName] = useState('')
  const [money,setMoney] = useState('')

  function add(){

    if(!name || !money) return

    setList([
      ...list,
      {
        name,
        money:Number(money),
        date:new Date().toLocaleDateString()
      }
    ])

    setName('')
    setMoney('')
  }


  return (

    <div className="app">

      <h1>💰 가계부</h1>

      <input
        placeholder="내용"
        value={name}
        onChange={e=>setName(e.target.value)}
      />

      <input
        placeholder="금액"
        type="number"
        value={money}
        onChange={e=>setMoney(e.target.value)}
      />

      <button onClick={add}>
        등록
      </button>


      <h2>거래내역</h2>

      {
        list.map((item,index)=>(

          <div className="card" key={index}>

            {item.date}
            <br/>

            {item.name}

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
