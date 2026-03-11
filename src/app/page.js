'use client'
import Login from '@/app/shared/Login';
import {useAuth} from "@/app/shared/AuthContext";

function App() {
  const { login, user, logout, loading } = useAuth();
  const debug = false;
  if (!user) {return (
      <>
        <Login login={login} user={user} logout={logout} loading={loading} debug={debug} />
      </>);}
  return (
      <>
        <Login login={login} user={user} logout={logout} loading={loading} debug={debug} />
      </>
  );
}
export default function Home() {return (<main><App /></main>);}
