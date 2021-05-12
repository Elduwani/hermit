import { GetStaticProps } from "next";
import PageContainer from "components/PageContainer";
import { Faculty, Department } from '.prisma/client';
import { prisma } from "../../utils/fetch"

type Props = {
    faculty: Faculty,
    departments: Department[]
}

export default function Index({ faculty, departments }: Props) {

    return (
        <PageContainer title="Hermit">
            <div className="border capitalize">
                {faculty.name}
            </div>
            <div className="border">
                {
                    departments.map((dept) => {
                        return (
                            <div className="capitalize" key={dept.id}>
                                {dept.name}
                            </div>
                        )
                    })
                }
            </div>
        </PageContainer>
    )
}

export const getStaticPaths = async () => {
    const faculties = await prisma.faculty.findMany()

    // Get the paths we want to pre-render based on posts
    const paths = faculties.map((faculty) => ({
        params: { id: String(faculty.id) },
    }))

    return {
        paths,
        fallback: false // other routes should be 404
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const faculty = await prisma.faculty.findUnique({ where: { id: +params?.id! } })
    const departments = await prisma.department.findMany({
        where: {
            facultyId: +params?.id!
        }
    })

    return {
        props: {
            faculty,
            departments,
        },
    }
}