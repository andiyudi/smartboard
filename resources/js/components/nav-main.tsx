import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function NavMain({ groups = [] }: { groups: NavGroup[] }) {
    const page = usePage();

    return (
        <>
        {groups.map((group) => (
            <SidebarGroup key={group.label} className="px-2 py-0">
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
                {group.items.map((item) => {
                const hasSubItems = item.items && item.items.length > 0;
                const isActive = item.href === page.url || (hasSubItems && item.items!.some(sub => sub.href === page.url));
                const [open, setOpen] = useState(item.defaultOpen || isActive);

                return (
                    <SidebarMenuItem key={item.title}>
                    <Collapsible open={open} onOpenChange={setOpen}>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                                isActive={isActive}
                                className="w-full justify-between"
                                tooltip={{ children: item.title }}
                            >
                                {item.href ? (
                                <Link href={item.href} className="flex items-center gap-2 w-full" prefetch>
                                    {item.icon && <item.icon className="h-4 w-4" />}
                                    <span>{item.title}</span>
                                    {hasSubItems && (
                                    <ChevronDown
                                        className={`ml-auto h-4 w-4 transition-transform ${
                                        open ? 'rotate-180' : ''
                                        }`}
                                    />
                                    )}
                                </Link>
                                ) : (
                                <div className="flex items-center gap-2 w-full">
                                    {item.icon && <item.icon className="h-4 w-4" />}
                                    <span>{item.title}</span>
                                    {hasSubItems && (
                                    <ChevronDown
                                        className={`ml-auto h-4 w-4 transition-transform ${
                                        open ? 'rotate-180' : ''
                                        }`}
                                    />
                                    )}
                                </div>
                                )}
                            </SidebarMenuButton>
                        </CollapsibleTrigger>

                        {hasSubItems && (
                        <CollapsibleContent className="ml-4">
                            <SidebarMenu>
                            {item.items!.map((subItem) => (
                                <SidebarMenuItem key={subItem.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={subItem.href === page.url}
                                    tooltip={{ children: subItem.title }}
                                >
                                    <Link
                                    href={subItem.href!}
                                    className="flex items-center gap-2"
                                    prefetch
                                    >
                                    {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                    <span>{subItem.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                            </SidebarMenu>
                        </CollapsibleContent>
                        )}
                    </Collapsible>
                    </SidebarMenuItem>
                );
                })}
            </SidebarMenu>
            </SidebarGroup>
        ))}
        </>
    );
}
