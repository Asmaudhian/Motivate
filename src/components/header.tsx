import logo from '../assets/logo.svg';

function Header() {
	return (
		<header className="mb-20 flex h-16 items-center justify-center bg-main">
			<img src={logo} alt="logo" className="h- w-32" />
		</header>
	);
}

export default Header;
