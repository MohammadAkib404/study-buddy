import { CheckSquare, Layers, ListTree } from "lucide-react";
import { useState } from "react";

const outputTypes = [
  { id: "flashcards", label: "Flashcards", Icon: Layers },
  { id: "outline", label: "Outline Topics", Icon: ListTree },
  { id: "quiz", label: "Quiz", Icon: CheckSquare },
];

export default function OutType() {

const [outputType, setOutputType] = useState(outputTypes[0].id);

  return (
    <div className="w-screen max-w-3xl p-4 flex justify-center gap-5 text-sm text-muted font-medium">
      {outputTypes.map(({ id, label, Icon }, i) => (
        <div onClick={() => setOutputType(outputTypes[i].id)} key={id} className={`${outputType === id? "ring ring-primary/90 font-bold" : ""} flex items-center gap-2 w-55 border border-border px-4 py-2.5 rounded-lg`}>
          <Icon className="size-5" />
          <h5>{label}</h5>
          {outputType === id && <div className="size-5 border rounded-full grid place-items-center ml-auto">
            <div className="bg-primary size-3 rounded-full"></div>
          </div>}
        </div>
      ))}
    </div>
  );
}
