import { ModeToggle } from "../mode-toggle";
import logo from "@/assets/img/logo-1.png"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { BadgeCent, CircleUserRound, Factory, Grid2x2, Waypoints } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
        name: "Procurement Dashboard",
        link: "/procurement-dashboard",
        icon: <Waypoints />,
    },
    {
        id: "3",
        name: "Manufacturing Dashboard",
        link: "/manufacturing-dashboard",
        icon: <Factory />,
    },
    {
        id: "4",
        name: "Finance Dashboard",
        link: "/finance-dashboard",
        icon: <BadgeCent />,
    },
]

function NavBar(){

    const [currentPage, setCurrentPage] = useState("")
    
    useEffect(() => {
        let pathname = window.location.pathname;
        setCurrentPage(routes.filter(route => route.link == pathname)[0].name);
    }, [])

    return(
        <div className="p-3 backdrop-blur-md flex w-full justify-between h-fit border-border">

            {/* Digiations Logo */}
            <div className="">
                <img src={logo} alt="Digiation" className="w-30"/>
            </div>

            <div className="text-muted-foreground font-medium">
                {currentPage}
            </div>

            <div className="flex space-x-4">
                <NavigationMenu viewport={false} className="lg:end-2" >
                    <NavigationMenuList>
                        <NavigationMenuItem>
                        <NavigationMenuTrigger><Grid2x2 /></NavigationMenuTrigger>
                        <NavigationMenuContent>
                            {
                                routes.map((route) => (
                                    <Link to={route.link}>
                                        <NavigationMenuLink key={route.id} className="w-max" onClick={() => setCurrentPage(route.name)}>
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