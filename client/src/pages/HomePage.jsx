import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const { logout } = useAuthStore();
  return (
    <div>
      HomePage
      <button onClick={logout}>Log Out</button>
    </div>
  );
};

export default HomePage;
