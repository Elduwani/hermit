import { Department } from ".prisma/client";
import Link from "next/link";
import styles from "styles/Home.module.scss"
import { useFetch } from "utils/fetch"

export default function Sidebar() {
    const { data: departments, isSuccess } = useFetch({ key: "departments", url: "/api/departments" })

    return (
        <aside className={`${styles.sidebar} flex flex-col py-8 px-4 space-y-8 bg-gray-200`}>
            <Link href="/">
                <a className="text-4xl border border-red-400 font-bold text-gray-700">Faculty of Arts</a>
            </Link>
            {
                isSuccess &&
                <div className="flex-1 space-y-8 border border-red-500">
                    {
                        departments.map((department: Department) => {
                            const { id, name } = department
                            return (
                                <Link href={`/department/${id}`} key={id}>
                                    <a className="block capitalize">{name}</a>
                                </Link>
                            )
                        })
                    }
                </div>
            }
        </aside>
    )
}
