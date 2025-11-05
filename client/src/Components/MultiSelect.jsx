import React, { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

function MultiSelect(props) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [optionsSelected, setOptionsSelected] = useState([0])

    const optionsRef = useRef(null);

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

    useEffect(() => {
        const selectedValues = optionsSelected.map((selected) => props.options[selected]).join(", ");
        console.log(selectedValues);

        props.setVariator((prev) => ({
            ...prev,
            [props.name]: selectedValues
        }))
    }, [optionsSelected])

    return (
        <div className="w-8/10 relative">
            <h3 className="font-semibold mb-3">{props.question}</h3>

            <div ref={optionsRef}>
                <div
                    className={`flex w-full border border-border rounded-lg ${isMenuOpen ? 'shadow-[0_0_10px_rgba(0,0,0,0.25)] ring-1.5 ring-gray-300' : '*:'} ${optionsSelected.length ? 'px-2.5 py-1.5' : 'px-4 py-2.5'}`}
                    onClick={() => setIsMenuOpen((prev) => (!prev))}
                >
                    {!optionsSelected.length && <p className='text-muted'>Select your Level</p>}
                    <div className='flex gap-2'>
                        {optionsSelected.map((selectedIndex, i) => (
                            <div key={i} className='flex gap-2.5 border border-border px-2 py-1 rounded-lg'>
                                <span>{props.options[selectedIndex]}</span>
                                <button onClick={() => setOptionsSelected((prev) => prev.filter(item => item !== selectedIndex))}><X className='text-muted w-4 h-4' /></button>
                            </div>
                        ))}
                    </div>
                </div>
                <ul className={`bg-base absolute w-full ${isMenuOpen ? 'scale-100 opacity-100 ' : 'scale-90 opacity-0 pointer-events-none'} z-99 transition-all duration-200 border border-border rounded-lg p-1 shadow-lg`}>
                    {props.options.map((opt, id) => (
                        <li
                            key={id}
                            className={`flex justify-between p-2 rounded-md hover:bg-hover ${optionsSelected.includes(id) ? 'text-muted pointer-events-none' : ''}`}
                            onClick={() => setOptionsSelected(prev => [...prev, id])}
                        >
                            <span>{opt}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MultiSelect
