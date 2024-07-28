import { RiLogoutCircleLine } from "react-icons/ri";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className='relative mt-auto group'>
      <div className='flex items-center'>
        {!loading ? (
          <RiLogoutCircleLine
            className='w-7 h-7 text-white cursor-pointer'
            onClick={logout}
          />
        ) : (
          <span className='loading loading-spinner'></span>
        )}
        <span className='absolute left-12 transform -translate-x-1/2 top-3 -translate-y-full mb-1 hidden group-hover:block text-white bg-slate-900 text-sm rounded py-1 px-2'>
          Logout
        </span>
      </div>
    </div>
  );
};

export default LogoutButton;
