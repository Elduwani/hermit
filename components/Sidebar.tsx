import { Department } from ".prisma/client";
import Link from "next/link";
import styles from "styles/Home.module.scss"
import { useFetch } from "utils/fetch"

export default function Sidebar() {
    const { data: departments, isSuccess } = useFetch({ key: "departments", url: "/api/departments" })

    return (
        <aside className={`${styles.sidebar} flex flex-col p-8 space-y-8 bg-gray-100`}>
            <Link href="/">
                <a className="text-4xl border-red-400 font-bold text-gray-700">Faculty of Arts</a>
            </Link>
            <Link href={`/student`}>
                <a className="block capitalize">Students</a>
            </Link>
            <Link href={`/course`}>
                <a className="block capitalize">Courses</a>
            </Link>
            {
                isSuccess &&
                <div className="flex-1 space-y-8 border-red-500">
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
