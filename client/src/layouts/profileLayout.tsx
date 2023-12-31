import UserBox from "@/components/userBox"
import { useAppSelector } from "@/hooks"

function ProfileLayout() {
    const user = useAppSelector((state) => state.users.userInfo)
    console.log(user)

  return (
    <section className="p-10">
        <UserBox username={user.username} />
    </section>
  )
}

export default ProfileLayout