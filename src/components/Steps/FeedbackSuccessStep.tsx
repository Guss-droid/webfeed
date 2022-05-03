import { CloseButton } from "../Buttons/CloseButton";

import successImg from "../../assets/success.svg"

interface IFeedbackSuccessStep {
  onRestartFeedback: () => void;
}

export function FeedbackSuccessStep({ onRestartFeedback }: IFeedbackSuccessStep) {
  return (
    <>
      <header>
        <CloseButton />
      </header>

      <div className="flex flex-col items-center py-10 w-[304px]">
        <img src={successImg} alt="Imagem de sucesso" />

        <span className="text-xl mt-2">
          Agradecemos o feedback!
        </span>

        <button
          type="button"
          onClick={onRestartFeedback}
          className="py-2 px-6 bg-zinc-800 rounded-md border-transparent leading-6 
        hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 text-sm mt-6
        focus:ring-offset-zinc-900 focus:ring-offset-2 focus:ring-brand-500"
        >
          Quero enviar outro
        </button>
      </div>
    </>
  )
}