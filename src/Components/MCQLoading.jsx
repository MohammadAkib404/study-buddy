import { Brain, Check, CheckCircle2, Dot, FileText, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function MCQLoading(props) {

    const [progress, setProgress] = useState(0);

    const navigate = useNavigate();

    const [icon, setIcon] = useState(<FileText className="grid place-items-center bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full p-4 text-gray-100" />);
    const [message, setMessage] = useState('Analyzing Chapter Text...');

    useEffect(() => {
        console.log('props.generate', props.questions)
        console.log(typeof (props.questions))
        return () => { /* cleanup code */ }
    }, [props.questions])

    useEffect(() => {
        let waitTime = 10;
        let id;

        const update = () => {
            setProgress(p => {
                if (p >= 100) {
                    navigate('/quiz', {state: props.questions})
                    return p;
                }else if(p >= 80 && !typeof(props.questions) === 'object'){
                    waitTime += 500;
                }
                return p + 1;
            });

            if (typeof (props.questions) === 'object') {
                console.log('done jflaljfjal')
                waitTime > 200 ? waitTime -= 50 : waitTime = 100;
                clearTimeout(id);
            } else {
                waitTime += 40;
            }
            id = setTimeout(update, waitTime);
        };

        id = setTimeout(update, waitTime);

        return () => clearTimeout(id);
    }, [props.questions]);

    useEffect(() => {
        if (progress < 33) {
            setIcon(
                <div className="grid place-items-center bg-gradient-to-br from-blue-400 to-sky-500 rounded-full p-4 text-gray-100">
                    <FileText className="size-8" />
                </div>
            );
            setMessage("Analyzing Chapter Text...");
        }
        else if (progress >= 33 && progress < 77) {
            setIcon(
                <div className="grid place-items-center bg-gradient-to-br from-blue-400 to-purple-500 rounded-full p-4 text-gray-100">
                    <Sparkles className="size-8" />
                </div>
            );
            setMessage("Crafting Questions...");
        }
        else if (progress >= 77 && progress < 88) {
            setIcon(
                <div className="grid place-items-center bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full p-4 text-gray-100">
                    <Brain className="size-8" />
                </div>
            );
            setMessage("Refining Ideas...");
        }
        else {
            setIcon(
                <div className="grid place-items-center bg-gradient-to-br from-green-400 to-emerald-500 rounded-full p-4 text-gray-100">
                    <CheckCircle2 className="size-8" />
                </div>
            );
            setMessage("Finalizing Your MCQs...");
        }

    }, [progress])

    return (
        <div className="flex flex-col gap-2 pt-24 items-center fixed h-screen inset-0 bg-gradient-to-br from-blue-100 to-blue-200 via-indigo-200 z-[9999]">
            <div className="relative inline-flex items-center justify-center size-16 hover:scale-105 transition-all rounded-full mb-4">
                {icon}
                <div className="size-18 -z-10 absolute flex items-center justify-center animate-ping">
                    <div className="size-full bg-gray-500 opacity-20 rounded-full" />
                </div>
                <span className="spinner absolute -inset-3 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></span>
            </div>
            <h3 className="mt-8 text-2xl font-bold ">Generating Your MCQs</h3>
            <span className='text-muted font-semibold'>{message}</span>
            <div className="mt-5 bg-white w-70 h-3 rounded-md">
                <div className="h-full rounded-l-md bg-gradient-to-br from-blue-400 to-indigo-500 transition-all" style={{ width: `${progress}%` }}></div>
            </div>
            <span>{progress}%</span>
            <div className='flex gap-2'>
                {[...Array(5)].map((_, i) => (
                    <span className='size-2 bg-brand rounded-full animate-bounce' style={{animationDelay: `${i * 0.1}s`}}>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default MCQLoading
