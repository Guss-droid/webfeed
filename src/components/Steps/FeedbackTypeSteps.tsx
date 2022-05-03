import { CardButton } from "../CardButton";
import { CloseButton } from "../Buttons/CloseButton";
import { feedbackTypes, FeedbackTypesProps } from "../Widget/WidgetForm";

interface IFeedbackStep {
  onFeedbackTypeChanged: (key: FeedbackTypesProps) => void
}

export function FeedBackTypeStep({ onFeedbackTypeChanged }: IFeedbackStep) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback</span>

        <CloseButton />
      </header>

      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <CardButton
            key={key}
            image={value?.image}
            title={value?.title}
            onClick={() => onFeedbackTypeChanged(key as FeedbackTypesProps)}
          />
        ))}
      </div>
    </>
  )
}