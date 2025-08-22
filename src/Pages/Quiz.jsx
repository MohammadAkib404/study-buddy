import React, { useEffect, useState } from 'react'
import { BookOpen } from 'lucide-react'
import { useLocation } from 'react-router-dom';

function Quiz() {

    const dummyData = [
        {
            question: "Who led the Nazi Party in Germany?",
            options: ["Adolf Hitler", "Benito Mussolini", "Joseph Stalin", "Franklin D. Roosevelt"],
            ans: 1
        },
        {
            question: "Which of the following was NOT a reason for the rise of Nazism in Germany?",
            options: ["Treaty of Versailles", "Economic crisis", "Democratic stability", "Weak Weimar Republic"],
            ans: 3
        },
        {
            question: "Which of the following was a key feature of the Nuremberg Laws?",
            options: ["Ban on intermarriage", "Expansion of rights", "Freedom of press", "Equal citizenship"],
            ans: 1
        },
        {
            question: "What was the 'Final Solution' in the Nazi regime?",
            options: ["Nazi propaganda", "Extermination of Jews", "Military expansion", "Youth training"],
            ans: 2
        },
        {
            question: "What was the purpose of the concentration camps in Nazi Germany?",
            options: ["Provide housing", "Detain and persecute", "Educate citizens", "Train soldiers"],
            ans: 2
        },
        {
            question: "What was the name of the organization responsible for the extermination of Jews during the Holocaust?",
            options: ["SS", "SA", "Gestapo", "Wehrmacht"],
            ans: 1
        },
        {
            question: "Which of the following was NOT a method used by the Nazis to control the population?",
            options: ["Propaganda", "Censorship", "Free elections", "Fear and terror"],
            ans: 3
        },
        {
            question: "What was the role of women in Nazi Germany?",
            options: ["Equal rights", "Motherhood focus", "Military training", "Industrial leadership"],
            ans: 2
        },
        {
            question: "What was the purpose of the Euthanasia Program in Nazi Germany?",
            options: ["Improve healthcare", "Eliminate the unfit", "Increase jobs", "Feed the poor"],
            ans: 2
        },
        {
            question: "What was the goal of the 'Lebensraum' policy in Nazi Germany?",
            options: ["Industrial reform", "Territorial expansion", "Education reform", "Cultural exchange"],
            ans: 2
        },
        {
            question: "Which of the following was a key event during the rise of Nazism in Germany?",
            options: ["Beer Hall Putsch", "Fall of Berlin Wall", "French Revolution", "Cold War"],
            ans: 1
        },
        {
            question: "Which of the following was a key aspect of the Nazi worldview?",
            options: ["Democracy", "Racial hierarchy", "Equality", "Communism"],
            ans: 2
        },
        {
            question: "What was the purpose of the Nuremberg Trials?",
            options: ["Punish war criminals", "Promote trade", "Rebuild economy", "End Cold War"],
            ans: 1
        },
        {
            question: "What was the purpose of the 'Aryan Paragraph' in Nazi Germany?",
            options: ["Expand citizenship", "Protect workers", "Exclude Jews", "Promote equality"],
            ans: 3
        },
        {
            question: "Which of the following was a key event during the Holocaust?",
            options: ["Kristallnacht", "Fall of Rome", "Berlin Blockade", "D-Day landings"],
            ans: 2
        }
    ]

    const location = useLocation();
    const data = location.state?.questions || dummyData;

    const quizData = data;

    const [index, setIndex] = useState(0);
    const currentQuestion = quizData[index];
    const [selected, setSelected] = useState(null);



    const handleClick = (index) => {
        setSelected(index);
    };

    const changeQuestion = () => {
        setSelected(null);
        setIndex(prev => prev + 1);
    }

    return (
        <section className='sm:p-5'>
            <div className='sm:border-1 rounded-2xl max-w-3xl px-6 sm:px-8 py-10 m-auto'>
                <div className='flex gap-3 justify-between'>
                    <div className='flex items-center gap-2'>
                        <BookOpen color='green' className='w-12 h-12 bg-accent/30 p-2.5 rounded-lg' />
                        <h2 className='text-xl sm:text-2xl font-bold'>Nazism & Rise of Hitler</h2>
                    </div>
                    <div>
                        <span className='hidden sm:inline'>Question</span>
                        <p className='font-bold text-orange-400'>1/8</p>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <h4 className='text-lg sm:text-2xl font-bold my-8'>{index + 1}. {currentQuestion.question}</h4>
                    <div className="flex flex-col gap-5">
                        {currentQuestion.options.map((option, index) => {
                            let extraClass = "";

                            if (selected !== null) {
                                if (index === currentQuestion.ans) {
                                    extraClass = "bg-green-400"; // ✅ correct answer
                                } else if (index === selected) {
                                    extraClass = "bg-red-400";   // ❌ wrong answer
                                }
                            }

                            return (
                                <button
                                    key={index}
                                    disabled={selected !== null}
                                    onClick={() => handleClick(index)}
                                    className={`border-[1.75px] px-3 py-3 rounded-lg text-start max-w-4/5 ${extraClass}`}
                                >
                                    {option}
                                </button>
                            );
                        })}
                        <br />
                    </div>
                    <div className='w-full flex justify-end '>
                        <button onClick={changeQuestion} className='bg-accent text-text font-semibold px-6 py-3 rounded-lg '>Next</button>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Quiz
