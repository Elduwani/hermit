import PageContainer from "components/PageContainer";
import { Course, Student } from '.prisma/client';
import prisma from "db"
import Table from "../../components/Table"
import Button from "components/Button";
import { _StringKeys, _TableHeader } from "types";
import Editable from "components/Editable";

interface Props {
    student: Student,
    courses: Course[]
}

const headers: _TableHeader[] = [
    { name: "title" },
    { name: "course_code", key: "code" },
    { name: "credit" },
    { name: "semester" },
    { name: "level" },
    {
        name: "score",
        type: {
            modifier: (val) => +val,
        }
    },
]

export default function Index({ student, courses }: Props) {
    return (
        <PageContainer>
            <div className="flex justify-between">
                <div className="co">
                    <h1 className="text-4xl border font-bold text-gray-700 capitalize">{student.firstName} {student.lastName}</h1>
                    <p className="capitalize">{student.email}</p>
                    <p className="">{student.level} Level</p>
                </div>
                <span>
                    <Button variant="light-gray">
                        Update Results
                    </Button>
                </span>
            </div>
            {
                courses.length > 0 &&
                <Editable
                    headers={headers}
                    data={courses}
                    mutationUrl=""
                />
            }
        </PageContainer>
    )
}

export const getStaticPaths = async () => {
    const students = await prisma.student.findMany()

    // Get the paths we want to pre-render based on posts
    const paths = students.map((st) => ({
        params: { id: st.id },
    }))

    return { paths, fallback: false }
}
interface Params {
    params: {
        id: string
    }
}

export const getStaticProps = async ({ params }: Params) => {
    const student = await prisma.student.findUnique({ where: { id: params.id } })
    const courses = await prisma.course.findMany({
        where: {
            department: student?.department,
            level: { lte: +student?.level! }
        }
    })

    return {
        props: {
            student,
            courses
        }
    }
}