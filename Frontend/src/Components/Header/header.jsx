import { Button, Container, Navbar } from "react-bootstrap"
import { MdOutlineMenuOpen } from "react-icons/md";
import { RiMenuFold3Line } from "react-icons/ri";
import { RiMenuFold4Line } from "react-icons/ri";



const Header = ({ setShow, show }) => {

    return (
        <Container fluid>
            <Navbar bg="light" expand='lg'>
                <Button onClick={() => setShow(!show)}>{show ? <RiMenuFold3Line size={25} /> : <RiMenuFold4Line size={25} />
                }</Button>
                <Navbar.Brand className="px-3">Senac Wedding</Navbar.Brand>
            </Navbar>
        </Container>
    )

}

export default Header