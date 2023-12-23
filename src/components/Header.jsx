/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '@hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShoppingCartContext } from '@hooks/useShoppingCart';
import { AppContext } from 'context/appContext';
import logoDark from '../../public/logotipo-dark.svg';
import logoLight from '../../public/logotipo-light.svg';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const router = useRouter();

  const [headerSelection, setHeaderSelection] = useState('Dashboard');

  useEffect(() => {
    if (router.pathname === '/dashboard') {
      setHeaderSelection('Dashboard');
    } else if (router.pathname === '/dashboard/products' || router.pathname === '/dashboard/products/add-product' || router.pathname === '/dashboard/products/edit/[id]') {
      setHeaderSelection('Products');
    }
  }, []);

  const { navDashboard, setNavDashboard, navProducts, setNavProducts } = useContext(ShoppingCartContext);
  const { darkMode, setDarkMode } = useContext(AppContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const htmlElement = document.querySelector('html');
    htmlElement.classList.toggle('dark');
  };

  const onDashboardClick = () => {
    setNavDashboard(true);
    setNavProducts(false);
  };

  const onProductsClick = () => {
    setNavProducts(true);
    setNavDashboard(false);
  };

  const userNavigation = [
    { name: 'Sign out', href: '/' },
    { name: `Dark theme: ${darkMode ? 'On' : 'Off'}`, href: '/' },
  ];

  const auth = useContext(AuthContext);

  const userData = {
    name: auth?.user?.name,
    email: auth?.user?.email,
    imageUrl: auth?.user?.avatar,
  };

  useEffect(() => {
    const appCookie = Cookies.get('token');
    if (!appCookie) {
      router.push('/login');
    }
  }, []);

  const [dtButton, setDtButton] = useState('');

  useEffect(() => {
    if (darkMode) {
      setDtButton('On');
    } else {
      setDtButton('Off');
    }
  }, [darkMode]);

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 dark:bg-[#F4EEE0]">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {darkMode ? (
                      <a href="/">
                        <Image width={12} height={12} className="h-12 w-12" src={logoLight} alt="Workflow" />
                      </a>
                    ) : (
                      <a href="/">
                        <Image width={12} height={12} className="h-12 w-12" src={logoDark} alt="Workflow" />
                      </a>
                    )}
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <Link
                        key="dashboard"
                        href="/dashboard"
                        className={classNames(
                          headerSelection === 'Dashboard'
                            ? 'bg-gray-900 text-white dark:text-dmBlack dark:bg-white  hover:text-white'
                            : 'text-gray-300 hover:bg-gray-700 dark:text-dmBlack dark:hover:bg-white',
                          'px-3 py-2 rounded-md text-sm font-medium '
                        )}
                        aria-current={navDashboard ? 'page' : undefined}
                      >
                        <button
                          onClick={() => {
                            onDashboardClick();
                          }}
                        >
                          Dashboard
                        </button>
                      </Link>
                      <Link
                        key="products"
                        href="/dashboard/products/"
                        className={classNames(
                          headerSelection === 'Products'
                            ? 'bg-gray-900 text-white dark:text-dmBlack dark:bg-white  hover:text-white'
                            : 'text-gray-300 hover:bg-gray-700 dark:text-dmBlack dark:hover:bg-white',
                          'px-3 py-2 rounded-md text-sm font-medium '
                        )}
                        aria-current={navProducts ? 'page' : undefined}
                      >
                        <button
                          onClick={() => {
                            onProductsClick();
                          }}
                        >
                          Products
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* <button
                      type="button"
                      className="bg-gray-800 dark:bg-[#6D5D6E] p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6 dark:text-black" aria-hidden="true" />
                    </button> */}

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm">
                          <span className="sr-only">Open user menu</span>
                          <img
                            width={8}
                            height={8}
                            className="h-8 w-8 rounded-full"
                            src={'https://www.citrix.com/blogs/wp-content/uploads/2018/03/slack_compressed-e1521621363404-360x360.jpg'}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black dark:ring-dmWhite dark:ring-opacity-5 ring-opacity-5 focus:outline-none dark:bg-dmBlack">
                          <button onClick={() => toggleDarkMode()} className="block px-4 py-2 text-sm text-gray-700 dark:text-dmWhite">
                            {`Dark theme: ${dtButton}`}
                          </button>

                          <button onClick={() => auth.logout()} className="block px-4 py-2 text-sm text-gray-700 dark:text-dmWhite">
                            Logout
                          </button>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Image height={10} width={10} className="h-10 w-10 rounded-full" src={userData.imageUrl} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{userData.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{userData.email}</div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button key={item.name} as="a" href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
