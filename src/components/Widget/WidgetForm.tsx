import { useState } from "react";

import { FeedBackTypeStep } from "../Steps/FeedbackTypeSteps";
import { FeedbackContentStep } from "../Steps/FeedbackContentStep";

import bugImage from "../../assets/bug.svg";
import ideaImage from "../../assets/idea.svg";
import thoughtImage from "../../assets/thought.svg";
import { FeedbackSuccessStep } from "../Steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImage,
      alt: "Imagem de um inseto"
    }
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImage,
      alt: "Imagem de uma lampada"
    }
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImage,
      alt: "Imagem de uma nuvem de pensamento"
    }
  }
}

export type FeedbackTypesProps = keyof typeof feedbackTypes;

export function WidgetForm() {

  const [feedbackChoice, setFeedbackChoice] = useState<FeedbackTypesProps | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestartFeedback() {
    setFeedbackSent(false)
    setFeedbackChoice(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex 
    flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep onRestartFeedback={handleRestartFeedback} />
      ) : (
        <>
          {!feedbackChoice ? (
            <FeedBackTypeStep
              onFeedbackTypeChanged={setFeedbackChoice}
            />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackChoice}
              onRestartFeedback={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}</>
      )}

      <footer className="text-xs text-neutral-400">
        Feito com ❤ pelo <a
          href="https://github.com/Guss-droid"
          className="underline underline-offset-2"
        >
          Gustavo
        </a>
      </footer>
    </div>
  )
}