import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

export default function SideBar() {
    const location = useLocation();
    const Permissions = useSelector((state) => state.auth.Permissions);

    const hasPermission = (moduleName, permissionName) => {
        return Permissions.some(
            permission =>
                permission.Module_Name === moduleName &&
                permission.Permission_Name === permissionName
        );
    };

    return (
        <Sidebar className="mx-3">
            <Menu
                className="my-3 mx-4"
                menuItemStyles={{
                    button: ({ active }) => ({
                        backgroundColor: active ? "#7ea1d4" : "transparent",
                        color: active ? "#fff" : "#000",
                        "&:hover": {
                            backgroundColor: active ? "#191c20" : "#f5f5f5",
                            color: active ? "#fff" : "#000",
                        },
                    }),
                }}
            >
                <MenuItem
                    active={location.pathname === "/" || location.pathname === "/dashboard"}
                    component={<Link to="/dashboard" />}
                >
                    Dashboard
                </MenuItem>

                {hasPermission("User", "Get") && (
                    <MenuItem
                        active={location.pathname === "/user"}
                        component={<Link to="/user" />}
                    >
                        User
                    </MenuItem>
                )}

                {hasPermission("Role", "Get") && (
                    <MenuItem
                        active={location.pathname === "/role"}
                        component={<Link to="/role" />}
                    >
                        Role
                    </MenuItem>
                )}

                {hasPermission("Builty", "Get") && (
                    <MenuItem
                        active={location.pathname === "/builty"}
                        component={<Link to="/builty" />}
                    >
                        Builty
                    </MenuItem>
                )}

                {hasPermission("Builty Report", "Get") && (
                    <MenuItem
                        active={location.pathname === "/builtyreport"}
                        component={<Link to="/builtyreport" />}
                    >
                        Builty Report
                    </MenuItem>
                )}

                {hasPermission("Office", "Get") && (
                    <MenuItem
                        active={location.pathname === "/office"}
                        component={<Link to="/office" />}
                    >
                        Office
                    </MenuItem>
                )}

                {hasPermission("City", "Get") && (
                    <MenuItem
                        active={location.pathname === "/city"}
                        component={<Link to="/city" />}
                    >
                        City
                    </MenuItem>
                )}

                {hasPermission("Customer", "Get") && (
                    <MenuItem
                        active={location.pathname === "/customer"}
                        component={<Link to="/customer" />}
                    >
                        Customer
                    </MenuItem>
                )}
            </Menu>
        </Sidebar>
    );
}