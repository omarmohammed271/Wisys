import { ModeToggle } from "../mode-toggle";
import logo from "@/assets/img/logo-1.png"

function NavBar(){

    return(
        <div className="p-3 backdrop-blur-md flex w-full justify-between h-fit">

            {/* Digiations Logo */}
            <div className="">
                <img src={logo} alt="Degiation" className="w-30"/>
            </div>

            <ModeToggle />

        </div>
    )
}

export default NavBar