import { signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"
import { PlayerCard } from "../Home/playerCard"
import { ClickableIcon } from "./ClickableIcon"

function Header({ darkMode, setDarkmode, auth, user, level }) {
  const navigate = useNavigate()
  
  const switchDarkMode = () => {
    setDarkmode(!darkMode)
    localStorage.setItem("theme", darkMode)
  }

  const leaderboard = () => {
    navigate("/leaderboard")
  }

  const logout = () => {
    signOut(auth)
  }

  return (
    <header
      className="bg-lightBackground dark:bg-darkBackground flex justify-between md:p-6 p-4 drop-shadow-lg items-center transition-colors duration-500"
    >
      <HeaderTitle></HeaderTitle>

      <div className="md:mr-3 cursor-pointer flex md:w-auto  items-center">
        <ClickableIcon
          method={leaderboard}
          icon={"leaderboard"}
          darkMode={darkMode}
          title="Leaderboard"
        />
        <a
          href="https://wartadex.github.io/countries/"
          target="_blank"
          className="flex items-center"
        >
          <ClickableIcon icon="import_contacts" title="Wiki" />
        </a>
        <ClickableIcon
          method={switchDarkMode}
          icon={darkMode ? "light_mode" : "dark_mode"}
          darkMode={darkMode}
          title="Switch mode"
        />

        <ClickableIcon
          method={logout}
          icon="logout"
          darkMode={darkMode}
          title="Logout"
        />
        <div>
          <PlayerCard user={user} level={level} />
        </div>
      </div>
    </header>
  )
}

function HeaderTitle() {
  return (
    <div>
      <Link to="/select-game" className="flex items-center">
        <img src="images/earth.png" className="mr-8" alt="earth" width="60" />
        <h1
          className="hidden sm:block text-md sm:text-xl md:text-3xl font-semibold text-lightText dark:text-darkText"
        >
          Where in the world ?
        </h1>
      </Link>
    </div>
  )
}

export default Header