import { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '@hooks/useShoppingCart';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import logotipoLight from '../../../../public/logotipo-light.svg';
import logotipoDark from '../../../../public/logotipo-dark.svg';
import { AppContext } from 'context/appContext';

function Navbar() {
  const { count, toggleCheckoutSideMenu, setSearchByCategory } = useContext(ShoppingCartContext);
  const { darkMode, setDarkMode } = useContext(AppContext);

  const toggleDarkMode = (checked) => {
    setDarkMode(!darkMode);
    const htmlElement = document.querySelector('html');
    htmlElement.classList.toggle('dark');
  };

  const activeStyle = 'underline underline-offset-4';

  return (
    <nav className="w-full flex bg-white dark:bg-[#3b3b3b]  justify-between items-center fixed z-10 py-5 px-8 text-sm font-light top-0">
      {/* Lista derecha */}
      <ul className="flex items-center gap-3 font-bold select-none">
        <li>{darkMode ? <Image className="w-8" src={logotipoDark} alt="logotipo" /> : <Image className="w-8" src={logotipoLight} alt="" />}</li>
        <li className="font-bold text-lg dark:text-[white]">
          <Link href="/">Shop</Link>
        </li>
        <li className="dark:text-[white]">
          <Link href="/" className={({ isActive }) => (isActive ? activeStyle : undefined)} onClick={() => setSearchByCategory()}>
            <span>All</span>
          </Link>
        </li>
        <li className="dark:text-[white]">
          <button onClick={() => setSearchByCategory('Furnitures')}>Furnitures</button>
        </li>
        <li className="dark:text-[white]">
          <button onClick={() => setSearchByCategory('Electronics')}>Electronics</button>
        </li>
        <li className="dark:text-[white]">
          <button onClick={() => setSearchByCategory('Shoes')}>Shoes</button>
        </li>
        <li className="dark:text-[white]">
          <button onClick={() => setSearchByCategory('Others')}>Others</button>
        </li>
      </ul>
      {/* Lista izquida */}
      <ul className="flex items-center gap-8 pr-10 select-none">
        <li className="flex items-center justify-between">
          <DarkModeSwitch checked={darkMode} onChange={toggleDarkMode} size={30} />
        </li>
        <li className="dark:text-[white] font-semibold">
          <Link href="/login">Sign In</Link>
        </li>
        <li className="flex">
          <button onClick={() => toggleCheckoutSideMenu()} className="flex items-center justify-between">
            <ShoppingCartIcon className="h-6 w-6 text-black dark:text-[white]" />
          </button>
          <span className="ml-1 dark:text-[white]">{count}</span>
        </li>
      </ul>
    </nav>
  );
}

export { Navbar };
