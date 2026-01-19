import { memo, useCallback, useEffect, useState } from "react";

const textSize = ["25px", "22px", "20px", "18px"];
const textColor = ["#d06208", "#0eaa84", "#4769ef", "#f25b81"];

const collectTopics = (node, acc = []) => {
  acc.push(node.title);
  node.children?.forEach((child) => collectTopics(child, acc));
  return acc;
};

const TreeNode = memo(function TreeNode({ node, depth = 0, selectedTopics, toggleTopic }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const checked = selectedTopics.has(node.title);

  const marginLeft = `${depth * 6 + depth}px`;
  const marginTop = `${6 / depth}px`;
  const isMaxDepth = depth === 3;

  const handleChange = (e) => {
    toggleTopic(node, e.target.checked);
  };

  return (
    <div style={{ fontSize: textSize[depth], color: textColor[depth], marginLeft: marginLeft, marginTop: marginTop }} className="py-1">
      <div className="bg-bg p-3 rounded-xl flex gap-3 items-center text">
        <button onClick={() => setIsExpanded((prev) => !prev)} className={`${isMaxDepth ? "opacity-0 pointer-event-none" : "opacity-100"} text-lg`}>
          {isExpanded ? "▼ " : "▶ "}
        </button>
        <input onChange={handleChange} type="checkbox" checked={checked} className="size-5" />
        <strong>
          {node.sectionLevel}: {node.title}
        </strong>
      </div>
      {isExpanded &&
        node.children &&
        node.children.map((child) => <TreeNode key={child.title} node={child} depth={depth + 1} selectedTopics={selectedTopics} toggleTopic={toggleTopic} />)}
    </div>
  );
});

export default function TopicVisualizer({ data, generateQuiz }) {
  const [selectedTopics, setSelectedTopics] = useState(() => new Set());

  useEffect(() => console.log(selectedTopics), [selectedTopics]);

  const toggleTopic = useCallback((node, checked) => {
    setSelectedTopics((prev) => {
      const topicToSet = new Set(prev);
      const topics = collectTopics(node);

      if (checked) topics.forEach((id) => topicToSet.add(id));
      else topics.forEach((id) => topicToSet.delete(id));

      return topicToSet;
    });
  }, []);

  return (
    <div className="bg-bg w-full flex flex-col items-center py-12">
      <div className="min-w-9/10 max-w-3xl bg-layer px-8 py-10 rounded-4xl border border-border">
        <TreeNode node={data} selectedTopics={selectedTopics} toggleTopic={toggleTopic} />
        <button onClick={() => generateQuiz(selectedTopics)} className="ml-auto border border-border p-3 px-6 text-bg bg-primary font-semibold rounded-lg">Generate</button>
      </div>
    </div>
  );
}
