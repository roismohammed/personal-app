"use client";

import React, { useEffect, useState } from "react";
import { Home, Menu, Zap, Users, File } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import logo from "@/public/assets/images/logo1.png";
import Image from "next/image";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  InboxIcon,
  LicenseDraftIcon,
  User,
} from "@hugeicons/core-free-icons";
import { LanguageSelect } from "./language-select";
const TopMenu = [
  {
    name: "Beranda",
    href: "/",
    icon: Home01Icon,
  },
  {
    name: "Project",
    icon: InboxIcon,
    Dropdown: [
      {
        title: "Project",
        description: "Halaman untuk menceritakan amatar.",
        icon: InboxIcon,
        href: "/project",
      },
    ],
  },
  {
    name: "Blog",
    href: "/blog",
    icon: LicenseDraftIcon,
  },
];

const Logo = () => {
  return (
    <Link href="/" className="flex space-x-2 py-3 items-center">
      <div className="flex items-center gap-1">
        <Image
          src={logo}
          alt="Logo"
          width={32}
          height={32}
          priority
          className="object-cover rounded-md"
        />
        <p className="text-2xl text-zinc-800 dark:text-gray-200 font-bold geist flex items-center gap-">
          Rois
          <span className="text-teal-700 dark:text-teal-500 ">Dev</span>
        </p>
      </div>
    </Link>
  );
};

export default function Header01() {
  const [stickyHeader, setStickyHeader] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setStickyHeader(true);
      } else {
        setStickyHeader(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="">
      <div className={`px-3 lg:px-0 ${stickyHeader ? "lg:px-0" : ""}`}>
        <header
          className={`w-[94%] md:w-[96%] lg:w-full mx-auto py-3 bg-white border-b rounded-xl  lg:rounded-none border-border/40 dark:bg-zinc-900 backdrop-blur-md fixed z-50 transition-all duration-300 ${
            stickyHeader
              ? "fixed shadow-md top-4 lg:top-0 bg-white transition-all border-b dark:border-b dark:border-zinc-700 duration-100 px-4 lg:px-0"
              : "top-3 lg:top-0 px-4 lg:px-0"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <nav className="hidden justify-between lg:flex">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Logo />
                </div>
              </div>
              <div className="items-center flex gap-6">
                <div className="flex items-center">
                  <NavigationMenu className="relative z-[100]">
                    <NavigationMenuList>
                      {TopMenu.map((menu, index) =>
                        menu.Dropdown ? (
                          <NavigationMenuItem key={index}>
                            <NavigationMenuTrigger className="bg-transparent gap-1 geist text-gray-500 dark:text-gray-300 hover:text-cyan-600 hover:bg-transparent focus:bg-transparent active:bg-transparent">
                              <HugeiconsIcon icon={menu.icon} size={16} />
                              {menu.name}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="z-[100]">
                              <ul className="w-80 p-3">
                                {menu.Dropdown.map((item, index) => (
                                  <li key={index} className="group">
                                    <NavigationMenuLink asChild>
                                      <Link
                                      prefetch={true}
                                        className={cn(
                                          "flex flex-row selzect-none items-center hover:bg-gray-50 hover:dark:bg-zinc-700 gap-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-cyan-600 focus:bg-transparent",
                                        )}
                                        href={item.href}
                                      >
                                        <span className="transition-colors group-hover:text-primary">
                                          <HugeiconsIcon
                                            icon={item.icon}
                                            size={16}
                                          />
                                        </span>
                                        <div>
                                          <div className="text-sm font-semibold">
                                            {item.title}
                                          </div>
                                          <p className="text-sm leading-snug text-muted-foreground">
                                            {item.description}
                                          </p>
                                        </div>
                                      </Link>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </NavigationMenuItem>
                        ) : (
                          <NavigationMenuItem key={index}>
                            <Link
                            prefetch={true}
                              className={cn(
                                navigationMenuTriggerStyle(),
                                "bg-transparent hover:bg-transparent gap-2 hover:text-cyan-600 geist dark:text-gray-300 gap-1 hover:dark:text-cyan-600 text-gray-500 focus:bg-transparent active:bg-transparent",
                              )}
                              href={menu.href!}
                            >
                              <HugeiconsIcon icon={menu.icon} size={16} />
                              {menu.name}
                            </Link>
                          </NavigationMenuItem>
                        ),
                      )}
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>
            <div
  className="
    flex items-center gap-1.5
    rounded-lg
    bg-white/80 dark:bg-zinc-800/90
    backdrop-blur
     border-zinc-200 dark:border-zinc-700
    px-1.5 py-1
  "
>

  <button
    className="
      flex h-9 w-10 cursor-pointer transition-all items-center justify-center
      rounded-md
      text-zinc-600 dark:text-zinc-300
      hover:bg-zinc-100 border dark:bg-transparent dark:hover:bg-zinc-700
      transition-colors
    "
  >
    <AnimatedThemeToggler className="h-3.5 w-3.5 cursor-pointer" />
  </button>

  {/* Language */}
  <div className="h-7 flex items-center">
    <LanguageSelect />
  </div>

  {/* Divider */}
  <div className="mx-0.5 h-4 w-px bg-zinc-300 dark:bg-zinc-600" />

  {/* CTA */}
  <Link href="/about" prefetch>
    <Button
      size="lg"
      className="
        h-9 px-7
        rounded-md
        cursor-pointer
        bg-gradient-to-r from-teal-600 to-cyan-600
        hover:from-teal-500 hover:to-cyan-500
        text-[14px] font-medium
        text-white
        shadow-none
      "
    >
      <HugeiconsIcon icon={User}/>
      About
    </Button>
  </Link>
</div>

              </div>
            </nav>

            {/* Mobile Menu */}
            <div className="block lg:hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Logo />
                </div>
                <Sheet open={open} onOpenChange={setOpen}>
                  <div className="flex gap-3 items-center">
                    <div className=" rounded-lg cursor-pointer ">
                      <AnimatedThemeToggler className="cursor-pointer text-gray-500 dark:text-gray-200 h-5 w-5 flex justify-center items-center" />
                    </div>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <Menu className="size-4" />
                      </Button>
                    </SheetTrigger>
                  </div>
                  <SheetContent
                    side="bottom"
                    className="pb-5 overflow-y-auto max-h-[calc(100vh-20vh)] px-4"
                  >
                    <SheetHeader className="pb-4 px-0 border-b">
                      <SheetTitle>
                        <Logo />
                      </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col">
                      {TopMenu.map((menu, index) =>
                        menu.Dropdown ? (
                          <Accordion
                            key={index}
                            type="single"
                            collapsible
                            className="w-full mb-1"
                          >
                            <AccordionItem
                              value={menu.name}
                              className="border-b border-border/40"
                            >
                              <AccordionTrigger className="py-3 font-medium hover:no-underline text-base">
                                <span className="flex items-center gap-2">
                                  <HugeiconsIcon icon={menu.icon} size={16} />
                                  {menu.name}
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="pt-2 pb-3">
                                <div className="flex flex-col space-y-3">
                                  {menu.Dropdown.map((item, index) => (
                                    <Link
                                    prefetch={true}
                                      onClick={() => setOpen(false)}
                                      key={index}
                                      className={cn(
                                        "flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground",
                                      )}
                                      href={item.href}
                                    >
                                      <div className="flex-shrink-0 text-primary">
                                        <HugeiconsIcon
                                          icon={menu.icon}
                                          size={16}
                                        />
                                      </div>
                                      <div>
                                        <div className="font-medium text-sm">
                                          {item.title}
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                          {item.description}
                                        </p>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ) : (
                          <Link
                          prefetch={true}
                            key={index}
                            onClick={() => setOpen(false)}
                            href={menu.href!}
                            className="py-3 px-1 font-medium text-base border-b border-border/40 flex items-center gap-2"
                          >
                            <HugeiconsIcon icon={menu.icon} size={16} />
                            {menu.name}
                          </Link>
                        ),
                      )}
                    </div>
                    <div className="border-t pt-4">
                      <div className="mt-2 flex flex-col gap-2">
                        <Link
                        prefetch={true}
                          href="/about"
                          onClick={() => setOpen(false)}
                          className={buttonVariants({ variant: "outline" })}
                        >
                          About Me
                        </Link>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
