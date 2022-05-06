import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../../services/api";
import { CloseButton } from "../Buttons/CloseButton";
import { ScreenshotButton } from "../Buttons/ScreenShotButton";
import { Loading } from "../Loading";
import { feedbackTypes, FeedbackTypesProps } from "../Widget/WidgetForm";

interface IFeedbackContent {
  feedbackType: FeedbackTypesProps;
  onRestartFeedback: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onRestartFeedback,
  onFeedbackSent
}: IFeedbackContent) {

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  const [comment, setComment] = useState("")
  const [isLoadingFeedback, setIsSendingFeedback] = useState(false)
  const [screenshot, setScreenshot] = useState<string | null>(null)

  async function handleSubmitFeedback(e: FormEvent) {
    e.preventDefault()

    setIsSendingFeedback(true)
    try {

      await api.post("/feedbacks", {
        type: feedbackType,
        comment,
        screenshot
      })

      onFeedbackSent()
    } catch { }

  }

  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          onClick={() => onRestartFeedback()}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            className="w-6 h-6"
            src={feedbackTypeInfo?.image?.source}
            alt={feedbackTypeInfo?.image?.alt}
          />

          {feedbackTypeInfo?.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400
          text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500
          focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thin
          scrollbar-thumb-zinc-700 scrollbar-track-transparent"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={e => setComment(e.target.value)}
        />

        <footer className="flex mt-2 gap-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenShotTake={setScreenshot}
          />

          <button
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 justify-center
            flex items-center hover:bg-brand-300 focus:outline-none focus:ring-2 text-sm
            focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 
            transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
            disabled={!comment || isLoadingFeedback}
          >
            {isLoadingFeedback ? <Loading /> : "Enviar feedback"}
          </button>
        </footer>
      </form>
    </>
  )
}