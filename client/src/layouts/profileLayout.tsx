import UserBox from "@/components/userBox";
import { useAppSelector } from "@/hooks";
import { GET_USER } from "@/utils";
import { useQuery } from "@apollo/client";

function ProfileLayout() {
  const user = useAppSelector(
    (state) => state.users.email || "ukojoshy@gmail.com"
  );
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { email: user },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log(data);

  return (
    <section className="p-10">
      <UserBox name={data?.user?.name} username={data?.user?.username} />
    </section>
  );
}

export default ProfileLayout;
