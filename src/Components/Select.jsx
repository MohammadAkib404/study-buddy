import React, { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'

function Select(props) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const [selectedOption, setSelectedOption] = useState(0);
    const [optionsSelected, setOptionsSelected] = useState([0])

    const optionsRef = useRef(null);

    useEffect(() => {
        console.log(props.options[selectedOption])
        props.setVariator((prev) => ({
            ...prev,
            [props.name]: props.options[selectedOption]
        }))
        

    }, [selectedOption])

    

    useEffect(() => {

        const handleClickOutside = (e) => {
            if (optionsRef.current && !optionsRef.current.contains(e.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => (
            document.removeEventListener('mousedown', handleClickOutside)
        )
    }, [])

    return (
        <div className="w-8/10 relative">
            <h3 className="font-semibold mb-3">{props.question}</h3>

            <div ref={optionsRef}>
                <div
                    className={`flex justify-between w-full p-3 border border-border rounded-lg ${isMenuOpen ? 'shadow-[0_0_10px_rgba(0,0,0,0.25)] ring-1.5 ring-gray-300' : '*:'}`}
                    onClick={() => setIsMenuOpen((prev) => (!prev))}
                >
                    <p>{props.options[selectedOption]}</p>
                    <ChevronDown color='gray' />
                </div>
                <ul className={`bg-base absolute w-full ${isMenuOpen ? 'scale-100 opacity-100 shadow-lg shadow-border' : 'scale-90 opacity-0 pointer-events-none'} z-99 transition-all duration-200 border border-border rounded-lg p-1 shadow-lg`}>
                    {props.options.map((opt, id) => (
                        <li
                            key={id}
                            className='flex justify-between p-2 rounded-md hover:bg-hover'
                            onClick={(e) => { setSelectedOption(id); setIsMenuOpen(false); }}
                        >
                            <span>{opt}</span>
                            {selectedOption === id && <Check />}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Select
