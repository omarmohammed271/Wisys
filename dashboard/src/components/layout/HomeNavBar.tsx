import { ModeToggle } from "../mode-toggle";
import logo from "@/assets/img/Digiations.png"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { BadgeCent, CircleUserRound, Factory, Grid2x2, Waypoints, Phone, Building2, Users, Cpu, Stethoscope, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FullscreenToggle from "../ui/FullscreenToggle";

type ServiceItem = {
    id: string,
    name: string,
    link: string,
    icon: React.ReactNode
}

const services: ServiceItem[] = [
    {
        id: "1",
        name: "Clinic Services",
        link: "/healthcare",
        icon: <Stethoscope />,
    },
    {
        id: "2",
        name: "Non-Healthcare Services",
        link: "/non-healthcare",
        icon: <Cpu />,
    },

]

type DashboardItem = {
    id: string,
    name: string,
    link: string,
    icon: React.ReactNode
}


function HomeNavBar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'p-2 backdrop-blur-md bg-background/80 ' : 'p-3'}`}>
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Logo */}
                <Link to={'/'}>
                    <div className="flex items-center">
                        <img src={logo} alt="Digiation" className="w-30" />
                    </div>
                </Link>

                {/* Navigation Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to={'/'} className="text-foreground hover:text-primary transition-colors font-medium">
                        Home
                    </Link>

                    <a href="#about-digiation" className="text-foreground hover:text-primary transition-colors font-medium">
                        About
                    </a>

                    {/* Services Dropdown */}
                    <NavigationMenu viewport={false}>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="text-lg text-foreground hover:text-primary transition-colors font-medium bg-transparent">
                                    Services
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                        {services.map((service) => (
                                            <Link to={service.link} key={service.id}>
                                                <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                                    <div className="flex items-center space-x-2">
                                                        <span>{service.icon}</span>
                                                        <div className="text-sm font-medium leading-none">{service.name}</div>
                                                    </div>
                                                </NavigationMenuLink>
                                            </Link>
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    {/* Dashboards Dropdown */}

                   

                    <Link to={'/contact'} className="text-foreground hover:text-primary transition-colors font-medium">
                        Contact
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}

export default HomeNavBar