import Spinner from "@/components/Spinner";
import UserBox from "@/components/userBox";
import { useAppSelector } from "@/hooks";
import { GET_USER } from "@/utils";
import { useQuery } from "@apollo/client";
import Layout from "./templates/layout";
import { toast, Toaster } from "react-hot-toast";

function ProfileLayout() {
  const user = useAppSelector((state) => state.users);
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { email: user.email },
  }); 

  console.log(data, user);

  return (
    <section>
      <Toaster/>
      {loading ? (
        <Spinner />
      ) : (
        <Layout>
          <UserBox
            name={data?.user?.name || ''}
            username={data?.user?.username || ""}
            avatarURL={data?.user?.avatarURL || ''}
            backgroundURL={data?.user?.backgroundURL || ''}
          />
        </Layout>
      )}
    </section>
  );
}

export default ProfileLayout;
