import React, { useEffect, useRef, useState } from "react";

export default function OTPInput({input, setInput, proceed}) {

  const emptyArray = Array(6).fill("");
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [blank, setBlank] = useState(emptyArray);

  useEffect(() => {
    refs[0].current.focus();
  }, [])

  const handleInput = (e, i) => {
    const val = e.target.value;
    if(!Number(val)){
      return;
    }
    const copyArray = [...input];
    copyArray[i] = val;
    setInput(copyArray);
    
    if(i < refs.length - 1){
      refs[i + 1].current.focus();
    }
  }

  const handleKeyDown = (e, i) => {
    if(e.key === "Backspace"){
      const copyArray = [...input];
      copyArray[i] = "";
      setInput(copyArray);
      if(i > 0){
        refs[i - 1].current.focus();
      }
    }
  }

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    console.log(pasteData);

    if(!Number(pasteData))return;
    if(pasteData.length === '6')return;


    const data = pasteData.split('');
    setInput(data);
    refs[refs.length - 1].current.focus();
  }

  const handleSubmit = () => {
    const blankIndexes = input.map((val, i) => val === ""? i : "").filter(val => val !== "");
    console.log(blankIndexes);
    setBlank(blankIndexes);

    proceed();
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-x-2 mb-8">
      {Array(6).fill('').map((el, i) => (
        <input
          value={input[i]}
          ref={refs[i]}
          key={i}
          type="text"
          maxLength={1}
          required
          className={`bg-gray-300 size-12 rounded-md text-center ${blank.includes(i)? "border border-red-500" : ""}`}
          onInput={(e) => handleInput(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
        />
      ))}
    </form>
    <button onClick={handleSubmit} className='bg-brand w-full p-3 rounded-lg text-white text-lg font-bold'>Verify Email</button>
    </>
  );
}
