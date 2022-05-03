import { useState } from "react";
import { Loading } from "../Loading";

import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";

interface IScreenShot {
  screenshot: string | null;
  onScreenShotTake: (screenShot: string | null) => void;
}

export function ScreenshotButton({ onScreenShotTake, screenshot }: IScreenShot) {

  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreenShot() {
    setIsTakingScreenshot(true)

    const canvas = await html2canvas(document.querySelector("html")!)
    const base64image = canvas.toDataURL("image/png")

    onScreenShotTake(base64image)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsTakingScreenshot(false)
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end 
        text-zinc-400 hover:text-zinc-100 transition-colors"
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: "right bottom",
          backgroundSize: 180,
        }}
        onClick={() => onScreenShotTake(null)}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 
      transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 
      focus:ring-offset-zinc-900 focus:ring-brand-500"
      onClick={handleTakeScreenShot}
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="h-6 w-6" />}
    </button>
  )
}