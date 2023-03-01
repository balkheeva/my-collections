import {Button, Stack, NavDropdown} from "react-bootstrap";
import UserIcon from "../../components/icons/UserIcon";
import LogoutIcon from "../../components/icons/LogoutIcon";
import {NavLink,} from "react-router-dom";
import {User} from "../../context/auth/authContext";
import {useContext} from "react";
import {themeContext} from "../../context/theme/themeContext";
import ImpersonateIcon from "../../components/icons/ImpersonateIcon";
import DarkThemeIcon from "../../components/icons/DarkThemeIcon";
import UsersIcon from "../../components/icons/UsersIcon";

export default function ProfileInfo(props: { user: User, onLogOut: () => void }) {
    const {user, onLogOut} = props
    const {theme, onToggleTheme} = useContext(themeContext)
    const handleDeimpersonate = () => {
        const adminToken = localStorage.getItem('adminToken') || ''
        localStorage.setItem('token', adminToken)
        localStorage.removeItem('adminToken')
        window.location.reload()
    }
    return (
        <NavDropdown title={props.user.name}>
            <NavDropdown.Item
                href={`/profile/${user.id}`}
                className="text-decoration-none"
            >
                My collections
            </NavDropdown.Item>
            {user.adminrole && <NavDropdown.Item href="/admin"><UsersIcon/> Users mgmt</NavDropdown.Item>}
            {user.impersonatedBy && <NavDropdown.Item as="button" onClick={handleDeimpersonate}><ImpersonateIcon/> Deimpersonate</NavDropdown.Item>}
            <NavDropdown.Item as="button" onClick={() => onToggleTheme(theme ? '' : 'dark')}><DarkThemeIcon/> Switch theme</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item as="button" onClick={onLogOut} title="Log out"><LogoutIcon/> Logout</NavDropdown.Item>

        </NavDropdown>

    )
}