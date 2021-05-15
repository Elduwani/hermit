import { Faculty } from ".prisma/client";
import Link from "next/link";
import styles from "styles/Home.module.scss"
import { useFetch } from "utils/fetch"

export default function Sidebar() {
    const { data, isSuccess, isLoading } = useFetch({ key: "faculties", url: "api/faculties" })
    // console.log(data);

    return (
        <aside className={`${styles.sidebar} flex py-8 px-4 border bg-blue-100`}>
            <div className="w-full h-full space-y-8">
                <h1 className="text-4xl font-bold text-gray-700">Faculties</h1>
                {
                    isSuccess &&
                    <div className="space-y-4 border border-red-500">
                        {
                            data.map((entry: Faculty) => (
                                <Link href="/" key={entry.id}>
                                    <a className="block capitalize">{entry.name}</a>
                                </Link>
                            ))
                        }
                    </div>
                }
            </div>
            <div className="border border-red-500 w-full h-full">Element</div>
        </aside>
    )
}
