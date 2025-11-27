import React from "react";
import { Home, LayoutDashboard, PlusCircle, Trophy, Bell, ShoppingCart, Users, Settings, BarChart } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/register", label: "Nuevo Registro", icon: PlusCircle },
  { href: "/gamification", label: "Gamificación", icon: Trophy },
  { href: "/alerts", label: "Alertas", icon: Bell },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingCart },
  { href: "/fleet", label: "Modo Flota", icon: Users },
  { href: "/demo", label: "Template Demo", icon: BarChart },
];
export function AppSidebar(): JSX.Element {
  const location = useLocation();
  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="flex items-center gap-2 px-2 py-1">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
            V
          </div>
          <span className="text-lg font-semibold font-display">VoltIQ</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={location.pathname === item.href}>
                <Link to={item.href}>
                  <item.icon className={cn("h-5 w-5", location.pathname === item.href && "text-primary")} />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}