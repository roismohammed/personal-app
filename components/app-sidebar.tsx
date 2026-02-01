"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,

} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { AlgorithmIcon, Home01FreeIcons, Settings01FreeIcons, Task01Icon } from "@hugeicons/core-free-icons"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
     {
      title: "Beranda",
      url: "/dashboard",
      icon: Home01FreeIcons,

    },
    {
      title: "Blog",
      url: "/post",
      icon: Task01Icon,
      isActive: true,
      items: [
        {
          title: "Artikel",
          url: "/posts",
        },
        {
          title: "Category",
          url: "/category",
        },
      ],
    },
      {
      title: "Ebooks",
      url: "/ebooks",
      icon: Task01Icon,
      isActive: true,
      items: [
        {
          title: "cover",
          url: "/ebooks",
        },
        {
          title: "chapter",
          url: "/chapter",
        },
      ],
    },
    {
      title: "Project",
      url: "#",
      icon: AlgorithmIcon,
      items: [
        {
          title: "Item",
          url: "/projects",
        },
        {
          title: "Category",
          url: "#",
        },
      ],
    },

  ],
projects: [
     {
      title: "Settings",
      url: "#",
      icon: Settings01FreeIcons,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} title="Dashboard"/>
        <NavMain items={data.projects} title="Projects"/>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
