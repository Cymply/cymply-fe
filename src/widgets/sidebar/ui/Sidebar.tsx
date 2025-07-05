import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { AdminSidebarMenu } from "./SidebarMenu";

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <AdminSidebarMenu />
      </SidebarContent>
    </Sidebar>
  );
}
