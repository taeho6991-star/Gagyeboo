import { useState } from 'react'
import Tesseract from 'tesseract.js'


function App(){

  const [image,setImage] = useState(null)
  const [text,setText] = useState('')
  const [loading,setLoading] = useState(false)


  async function upload(e){

    const file = e.target.files[0]

    if(!file) return


    const url = URL.createObjectURL(file)

    setImage(url)

    setLoading(true)


    const result = await Tesseract.recognize(
      file,
      'kor+eng',
      {
        logger: m => console.log(m)
      }
    )


    setText(result.data.text)

    setLoading(false)

  }



  return (

    <div className="app">

      <h1>💰 가계부</h1>


      <h3>📸 영수증 / 거래내역 등록</h3>


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


      {
        loading &&
        <p>🔎 글자 인식 중...</p>
      }


      {
        text &&
        <div className="card">

          <h3>인식 결과</h3>

          <pre>
            {text}
          </pre>

        </div>
      }


    </div>

  )

}


export default App
