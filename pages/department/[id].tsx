import PageContainer from "components/PageContainer";
import { Department, Course } from '.prisma/client';
import prisma from "db"
import Table from "../../components/Table"
import Button from "components/Button";
import { Fields, Filters, Showing } from "components/RecordFilters";
import { _StringKeys, _TableHeader } from "types";
import { useState } from "react";
import { getUniqueEntries } from "utils/utils";

interface Props {
    courses: Course[],
    department: Department
}

const headers: _TableHeader[] = [
    { name: "title" },
    { name: "course_code", key: "code" },
    { name: "credit", filterBy: true },
    { name: "semester", filterBy: true },
    { name: "level", filterBy: true },
    {
        name: "elective",
        modifier: (val) => !!val ? "yes" : "no"
    },
]

export default function Index({ courses, department }: Props) {
    const [tableHeaders, setTableHeaders] = useState(headers.map(header => ({ ...header, selected: true })))
    const selectedHeaders = tableHeaders.filter(header => header.selected)

    const [filteredRecords, setFilteredRecords] = useState<Course[]>([])
    const data = filteredRecords.length ? filteredRecords : courses

    const filterOptions = getUniqueEntries(headers, courses, "filterBy")

    return (
        <PageContainer>
            <div className="flex justify-between">
                <h1 className="text-4xl border font-bold text-gray-700 capitalize">{department.name}</h1>
                <span>
                    <Button variant="light-gray">
                        Add Courses
                    </Button>
                </span>
            </div>
            {
                courses.length > 0 &&
                <>
                    <div className="flex space-x-4">
                        <Filters
                            options={filterOptions}
                            setOptions={setFilteredRecords}
                            records={courses}
                            clearOptions={() => setFilteredRecords([])}
                        />
                        <Fields options={tableHeaders} setOptions={setTableHeaders} />
                        <Showing showing={data.length} total={courses.length} />
                    </div>
                    <Table
                        headers={selectedHeaders}
                        data={data}
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