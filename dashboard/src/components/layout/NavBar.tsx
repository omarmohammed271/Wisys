import { ModeToggle } from "../mode-toggle";
import logo from "@/assets/img/Digiations.png"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { BadgeCent, CircleUserRound, Dock, DockIcon, Factory, Grid2x2, Waypoints } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FullscreenToggle from "../ui/FullscreenToggle";
import { useResponsiveScalars } from "@/hooks/useResponsiveScalars";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

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
    {
        id: "5",
        name: "Contracting dashboard (Arabic version)",
        link: "http://app2.digiations360.com/",
        icon: <Dock />,
    },
    
]

function NavBar(){

    const location = useLocation();
    const currentRoute = routes.find(route => route.link === location.pathname);
    const { textScalar, barScalar, iScalar } = useResponsiveScalars();
    return(
        <div className="px-3 justify-between h-fit border-border backdrop-blur-md flex w-full min-[2000px]:py-[1px] items-center">

            {/* Digiations Logo */}
            <Link to={'/'}>
                <div className="">
                <img
                    src={logo}
                    alt="Digiation"
                    style={{
                    width: `${5 * textScalar}rem`, // logo scales with barScalar
                    }}/>
                </div>
            </Link>

            {   currentRoute &&
                (<div className="text-muted-foreground max-md:hidden font-medium" 
                style={{
                    fontSize: `${1 * textScalar}rem`,
                    }}>
                    {currentRoute?.name || "Comprehensive Dashboard"}
                </div>)
            }
            

            <div className="flex space-x-4 z-30">
                {/* <FullscreenToggle /> */}
                {
                    currentRoute && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:end-2">
                                <Grid2x2 style={{ width: `${iScalar}rem`, height: `${iScalar}rem` }} />
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="min-w-[10rem] border-border">
                                {routes.map((route) => (
                                <DropdownMenuItem asChild key={route.id}>
                                    <Link
                                    to={route.link}
                                    className="flex items-center space-x-2 w-full"
                                    style={{
                                        fontSize: `${0.8 * textScalar}rem`,
                                    }}
                                    >
                                    <span
                                    style={{
                                        transform: `scale(${0.7 * textScalar})`,
                                        width: `${4 * textScalar}px`,
                                    }}
                                    >{route.icon}</span>
                                    <span>{route.name}</span>
                                    </Link>
                                </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                            </DropdownMenu>
                    )
                }
                <ModeToggle />
            </div>

        </div>
    )
}

export default NavBar