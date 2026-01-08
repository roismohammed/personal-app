import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { NavItem } from '@/types';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Link from 'next/link';

export function NavMain({ title, items = [] }: { title: string; items: NavItem[] }) {
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    if (item.items && item.items.length > 0) {
                        return (
                            <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible cursor-pointer">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton className={'group/item cursor-pointer'} isActive={item.isActive} tooltip={item.title}>
                                            {item.icon && (
                                                <HugeiconsIcon icon={item.icon} className="group-hover/item:animate-wiggle transition-transform" />
                                            )}
                                            <span>{item.title}</span>
                                            <HugeiconsIcon
                                                icon={ArrowRight01Icon}
                                                className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                                            />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton isActive={subItem.isActive} asChild>
                                                        <Link href={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        );
                    } else {
                        return (
                            <Link key={item.title} href={item.url}>
                                <SidebarMenuButton className={'group/item'} isActive={item.isActive} tooltip={item.title}>
                                    {item.icon && <HugeiconsIcon icon={item.icon} className="group-hover/item:animate-wiggle transition-transform" />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </Link>
                        );
                    }
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}