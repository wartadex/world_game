import { useEffect, useState } from "react"
import Title from "../components/Utils/Title"
import { getSavedGames } from "../services/user/getSavedGames"
import { GamesSaved } from "../components/User/GamesSaved"
import { useAuthState } from "react-firebase-hooks/auth"
import { useLocation, useNavigate } from "react-router-dom"
import { getLevels } from "../services/levels/getLevels"
import ProgressBar from "@ramonak/react-progress-bar"

export default function User({ auth }) {
  const [games, setGames] = useState([])
  const [user, loading, error] = useAuthState(auth)
  const [level, setLevel] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login")
      } else {
        getLevels().then((res) => {
          setLevel(res.data())
        })

        navigate(location.pathname === "/" ? "select-game" : location.pathname)
      }
    }
  }, [user, loading])

  useEffect(() => {
    if (user) {
      let gamesFromDb = []

      getSavedGames(user.uid).then((res) => {
        res.forEach((doc) => {
          gamesFromDb.push(doc.data())
        })

        setGames(gamesFromDb)
      })
    }
  }, [user])

  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 w-full justify-center items-center flex flex-col ">
        <p className="font-regular dark:text-lightBackground pb-[30px] text-5xl font-semibold">
          Rank{" "}
        </p>
        <div className="p-8 border-2 rounded-2xl w-auto flex items-center">
          <h2 className="font-bold text-3xl first-letter:uppercase dark:text-lightBackground">
            {level.rank}{" "}
          </h2>
          <img
            src={`icons/Ranks/${level.rank}.png`}
            alt={level.rank}
            width={100}
          />
        </div>
      </div>
      {user && level && (
        <div className="flex mt-4 lg:mt-20 justify-center items-center flex-col w-4/5">
          <p className="mb-6 text-end flex">
            <span className="font-normal dark:text-lightBackground text-2xl">
              Level {level.level}
            </span>
          </p>
          <ProgressBar
            completed={(level.xp / level.xpToNextLevel) * 100}
            bgColor="#0E94D7"
            className="w-full"
            height="40px"
            customLabel={Math.floor(level.xp) + "xp"}
          />
          <p className="text-primary font-normal text-xs mt-6">
            {Math.floor(level.xpToNextLevel - level.xp)}xp until next level
          </p>
        </div>
      )}

      <div className="mt-8 pt-[70px]">
        <Title text="Last games" />
      </div>
      <GamesSaved games={games}></GamesSaved>
    </div>
  )
}