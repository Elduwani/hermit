import PageContainer from "components/PageContainer";
import { Department, Course } from '.prisma/client';
import { prisma } from "../../utils/fetch"
import Table, { TableFilters } from "../../components/Table"
import Button from "components/Button";
import { Fields, Filters, Showing } from "components/RecordFilters";

type Props = {
    courses: Course[],
    department: Department
}

export default function Index({ courses, department }: Props) {
    const tableHeaders = [
        { name: "title" },
        { name: "course_code", key: "code" },
        { name: "credit" },
        { name: "semester" },
        { name: "level" },
        {
            name: "elective",
            modifier: (val: string | boolean | null) => !!val ? "yes" : "no"
        },
    ]

    const tableOptions = [
        <Filters key={1} />,
        <Fields key={2} options={tableHeaders} />,
        <Showing key={3} />,
    ]

    return (
        <PageContainer title="Hermit">
            <div className="flex justify-between">
                <div className="capitalize">
                    {department.name}
                </div>
                <span>
                    <Button>
                        Add Courses
                    </Button>
                </span>
            </div>
            {
                courses.length > 0 &&
                <>
                    <TableFilters options={tableOptions} />
                    <Table
                        headers={tableHeaders}
                        data={courses}
                    />
                </>
            }
        </PageContainer>
    )
}

export const getStaticPaths = async () => {
    const departments = await prisma.department.findMany()

    // Get the paths we want to pre-render based on posts
    const paths = departments.map((dept) => ({
        params: { id: dept.id },
    }))

    return { paths, fallback: false }
}
interface Params {
    params: {
        id: string
    }
}

export const getStaticProps = async ({ params }: Params) => {
    const department = await prisma.department.findUnique({ where: { id: params.id } })
    const courses = await prisma.course.findMany({ where: { department: params.id } })

    return {
        props: { department, courses }
    }
}