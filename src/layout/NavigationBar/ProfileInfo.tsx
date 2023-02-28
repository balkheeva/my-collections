import {useContext, useState} from "react";
import {authContext} from "../../auth/authContext";
import {Button, Stack} from "react-bootstrap";
import UserIcon from "../icons/UserIcon";
import LogoutIcon from "../icons/LogoutIcon";
import {NavLink} from "react-router-dom";

export default function ProfileInfo(props: any) {
    const {user} = useContext(authContext)

    return (
        <Stack direction="horizontal" gap={3}>
            <NavLink to="/profile" className="text-decoration-none">
                <Stack direction="horizontal" gap={1}>
                    <UserIcon/>
                    {user?.name}
                </Stack>
            </NavLink>

            <Button variant="link" onClick={props.onLogOut} className="text-black" title="Log out">
                <LogoutIcon/>
            </Button>
        </Stack>
    )
}