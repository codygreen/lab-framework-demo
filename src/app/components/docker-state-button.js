import { useState } from "react";
/**
* DockerStateButton component
*
* @param {Boolean} props.isRunning
* @param {Function} props.onClick
* @returns {JSX.Element}
*/
export function DockerStateButton({ isRunning, onClick }) {
  const [isDisabled, setIsDisabled] = useState(false);

  const getButtonColor = () => {
    if (isRunning === null) return "bg-green-500"
    return isRunning ? "bg-red-500" : "bg-green-500"
  }

  const handleButtonClick = async () => {
    setIsDisabled(true);
    await onClick();
    setIsDisabled(false);
  };

  return (
    <button
      className={"inline-block ".concat(getButtonColor(), " text-white font-bold py-2 px-4 rounded m-2")}
      onClick={handleButtonClick}
      disabled={isDisabled}
    >
      {isRunning ? "Stop" : "Run"}
    </button>
  )
}
