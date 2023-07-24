import { useContext, useRef } from 'react';
import { AuthContext } from '@hooks/useAuth';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logoDark from '../../public/logotipo-dark.svg';
import logoLight from '../../public/logotipo-light.svg';
import { AppContext } from 'context/appContext';

export default function LoginPage() {
  const authContext = useContext(AuthContext);

  const { darkMode } = useContext(AppContext);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { signIn, setErrorLogin, errorLogin } = authContext;
  const router = useRouter();

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      setErrorLogin(null);
      await signIn(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
      setErrorLogin(true);
    }
  };

  return (
    <>
      <div className="dark:bg-dmBlack min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <a href="/">
              {darkMode ? (
                <Image width={128} height={128} className="mx-auto h-12 w-auto" src={logoDark} alt="Workflow" />
              ) : (
                <Image width={128} height={128} className="mx-auto h-12 w-auto" src={logoLight} alt="Workflow" />
              )}
            </a>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">Sign in to your account</h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={submitHandler}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  ref={emailRef}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  ref={passwordRef}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-dmBlack dark:text-dmWhite">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-[#068FFF]">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
            {errorLogin && (
              <div className="p-3 mb-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                <span className="font-medium">Login Failed! Invalid Username or Password</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
