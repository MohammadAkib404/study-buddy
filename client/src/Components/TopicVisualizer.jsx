import { memo, useCallback, useEffect, useState } from 'react'

const data = {
    title: "Pastoralists in the Modern World",
    sectionLevel: "Chapter",
    children: [
        {
            title: "Pastoral Nomads and Their Movements",
            sectionLevel: "Main-Topic",
            children: [
                {
                    title: "The Banjaras",
                    sectionLevel: "Topic",
                    children: [
                        { title: "Long-distance migration routes", sectionLevel: "Sub-Topic" },
                        { title: "Role in grain transport", sectionLevel: "Sub-Topic" },
                        { title: "Supply of goods to towns", sectionLevel: "Sub-Topic" },
                        { title: "Support to armies during wars", sectionLevel: "Sub-Topic" }
                    ]
                },
                {
                    title: "The Raikas",
                    sectionLevel: "Topic",
                    children: [
                        { title: "Camel and sheep herding", sectionLevel: "Sub-Topic" },
                        { title: "Seasonal grazing cycles", sectionLevel: "Sub-Topic" },
                        { title: "Dependence on rainfall", sectionLevel: "Sub-Topic" },
                        { title: "Relationship with farmers", sectionLevel: "Sub-Topic" }
                    ]
                },
                {
                    title: "The Dhangars",
                    sectionLevel: "Topic",
                    children: [
                        { title: "Movement between plateau and coast", sectionLevel: "Sub-Topic" },
                        { title: "Sheep rearing practices", sectionLevel: "Sub-Topic" },
                        { title: "Use of monsoon pastures", sectionLevel: "Sub-Topic" },
                        { title: "Seasonal employment patterns", sectionLevel: "Sub-Topic" }
                    ]
                }
            ]
        },
        {
            title: "Colonial Rule and Pastoral Life",
            sectionLevel: "Main-Topic",
            children: [
                {
                    title: "Grazing Laws",
                    sectionLevel: "Topic",
                    children: [
                        { title: "Restriction on open grazing", sectionLevel: "Sub-Topic" },
                        { title: "Taxation on grazing land", sectionLevel: "Sub-Topic" },
                        { title: "Permit-based access", sectionLevel: "Sub-Topic" },
                        { title: "Conflict with forest officials", sectionLevel: "Sub-Topic" }
                    ]
                },
                {
                    title: "Forest Acts",
                    sectionLevel: "Topic",
                    children: [
                        { title: "Reserved forest creation", sectionLevel: "Sub-Topic" },
                        { title: "Bans on forest entry", sectionLevel: "Sub-Topic" },
                        { title: "Loss of customary rights", sectionLevel: "Sub-Topic" },
                        { title: "Forced route changes", sectionLevel: "Sub-Topic" }
                    ]
                },
                {
                    title: "Criminal Tribes Act",
                    sectionLevel: "Topic",
                    children: [
                        { title: "Communities branded criminal", sectionLevel: "Sub-Topic" },
                        { title: "Mandatory registration", sectionLevel: "Sub-Topic" },
                        { title: "Constant police surveillance", sectionLevel: "Sub-Topic" },
                        { title: "Loss of social freedom", sectionLevel: "Sub-Topic" }
                    ]
                }
            ]
        }
    ]
}

export default function TopicVisualizer() {

    const [selectedTopics, setSelectedTopics] = useState(() => new Set());

    useEffect(() => console.log(selectedTopics), [selectedTopics]);

    const toggleTopic = useCallback((node, checked) => {
        setSelectedTopics(prev => {
            const topicToSet = new Set(prev);
            const topics = collectTopics(node);

            if (checked) topics.forEach(id => topicToSet.add(id));
            else topics.forEach(id => topicToSet.delete(id));

            return topicToSet;
        });
    }, []);

    return (
        <div className='bg-base w-full flex flex-col items-center py-12'>
            <div className='min-w-9/10 max-w-3xl bg-layer px-8 py-10 rounded-4xl border border-border'>
                <TreeNode node={data} selectedTopics={selectedTopics} toggleTopic={toggleTopic} />
            </div>
        </div>
    )
}

const textSize = ["25px", "22px", "20px", "18px"]
const textColor = ["#d06208", "#0eaa84", "#4769ef", "#f25b81"]

const collectTopics = (node, acc = []) => {
    acc.push(node.title);
    node.children?.forEach(child => collectTopics(child, acc));
    return acc;
}

const TreeNode = memo(function TreeNode({ node, depth = 0, selectedTopics, toggleTopic }) {

    const [isExpanded, setIsExpanded] = useState(true);
    const checked = selectedTopics.has(node.title);

    const marginLeft = `${depth * 6 + depth}px`
    const marginTop = `${6 / depth}px`
    const isMaxDepth = depth === 3;

    const handleChange = (e) => {
        toggleTopic(node, e.target.checked)
    }


    return (
        <div style={{ fontSize: textSize[depth], color: textColor[depth], marginLeft: marginLeft, marginTop: marginTop }} className="py-1">
            <div className='bg-base p-3 rounded-xl flex gap-3 items-center text'>
                <button onClick={() => setIsExpanded(prev => !prev)} className={`${isMaxDepth ? "opacity-0 pointer-event-none" : "opacity-100"} text-lg`}>{isExpanded ? "▼ " : "▶ "}</button>
                <input onChange={handleChange} type="checkbox" checked={checked} className='size-5' />
                <strong>{node.sectionLevel}: {node.title}</strong>
            </div>
            {isExpanded && node.children && node.children.map(child => (
                <TreeNode key={child.title} node={child} depth={depth + 1} selectedTopics={selectedTopics} toggleTopic={toggleTopic} />
            ))}
        </div>
    )
})