import { usePathname } from "next/navigation";
import { getMenuList } from "../lib/menu-list";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AdminSidebarMenu() {
  const menuList = getMenuList();
  const pathname = usePathname();

  return (
    <>
      {menuList.map((menu) => (
        <SidebarGroup key={menu.label}>
          <SidebarGroupLabel>{menu.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menu.subMenu?.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    variant={
                      (item.active === undefined && pathname.startsWith(item.href)) || item.active
                        ? "active"
                        : "default"
                    }
                  >
                    <a href={item.href} className="flex items-center gap-2">
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
