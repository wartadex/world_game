export function Round(props) {
  return (
    <div className="hidden xl:flex justify-center items-center border-2 border-primary dark:border-whiteshadow-primary dark:shadow-white rounded-md h-20 w-28 text-primary dark:text-white font-bold">
      <h2 className="font-bold text-primary dark:text-white lg:text-2xl">
        {
          props.numberRound > 10
          ? "∞"
          : `${props.round + 1}/${props.numberRound}`
        }
      </h2>
    </div>
  )
}