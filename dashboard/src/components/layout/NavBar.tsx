import { ModeToggle } from "../mode-toggle";
import logo from "@/assets/img/Digiations.png"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { BadgeCent, CircleUserRound, Factory, Grid2x2, Waypoints } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FullscreenToggle from "../ui/FullscreenToggle";

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
        link: "/hr-dashboard",
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

    const location = useLocation();
    const currentRoute = routes.find(route => route.link === location.pathname);
    console.log(currentRoute)
    return(
        <div className="p-3 backdrop-blur-md flex w-full justify-between h-fit border-border">

            {/* Digiations Logo */}
            <Link to={'/'}>
                <div className="">
                    <img src={logo} alt="Digiation" className="w-23 h-10 "/>
                </div>
            </Link>

            {   currentRoute &&
                (<div className="text-muted-foreground text-[160%] max-md:hidden font-medium">
                    {currentRoute?.name || "Comprehensive Dashboard"}
                </div>)
            }
            

            <div className="flex space-x-4">
                {/* <FullscreenToggle /> */}
                {
                    currentRoute && (
                        <NavigationMenu viewport={false} className="lg:end-2" >
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                <NavigationMenuTrigger><Grid2x2 /></NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    {
                                        routes.map((route) => (
                                            <Link to={route.link}>
                                                <NavigationMenuLink key={route.id} className="w-max">
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
                    )
                }
                <ModeToggle />
            </div>

        </div>
    )
}

export default NavBar