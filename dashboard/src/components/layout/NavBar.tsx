import { ModeToggle } from "../mode-toggle";
import logo from "@/assets/img/logo-1.png"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { BadgeCent, CircleUserRound, Grid2x2 } from "lucide-react";
import { Link } from "react-router-dom";

type RoutesData = {
    id: string,
    name: string,
    link: string,
    icon: React.ReactNode
}

const routes: RoutesData[] = [
    {
        id: "1",
        name: "HR Dashboard",
        link: "/",
        icon: <CircleUserRound />,
    },
    {
        id: "2",
        name: "Finance Dashboard",
        link: "/finance",
        icon: <BadgeCent />,
    }
]

function NavBar(){

    return(
        <div className="p-3 backdrop-blur-md flex w-full justify-between h-fit border-border">

            {/* Digiations Logo */}
            <div className="">
                <img src={logo} alt="Digiation" className="w-30"/>
            </div>

            <div className="flex space-x-4">
            <NavigationMenu viewport={false} >
                <NavigationMenuList>
                    <NavigationMenuItem>
                    <NavigationMenuTrigger><Grid2x2 /></NavigationMenuTrigger>
                    <NavigationMenuContent>
                        {
                            routes.map((route) => (
                                <Link to={route.link}>
                                    <NavigationMenuLink key={route.id} className="w-max max-w-26">
                                        <div className="flex space-x-2 items-center">
                                            <span>{route.icon}</span>
                                            <span>{route.name}</span>
                                        </div>
                                    </NavigationMenuLink>
                                </Link>
                            ))
                        }
                    </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <ModeToggle />
            </div>

        </div>
    )
}

export default NavBar