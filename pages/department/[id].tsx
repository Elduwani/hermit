import PageContainer from "components/PageContainer";
import { Department, Course } from '.prisma/client';
import { prisma } from "../../utils/fetch"
import Table from "../../components/Table"
import Button from "components/Button";
import { Fields, Filters, Showing, FilterOptions } from "components/RecordFilters";
import { _TableHeader } from "utils/types";
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
        filterBy: true,
        modifier: (val) => !!val ? "yes" : "no"
    },
]

export default function Index({ courses, department }: Props) {
    const [tableHeaders, setTableHeaders] = useState(headers.map(header => ({ ...header, selected: true })))
    const selectedHeaders = tableHeaders.filter(header => header.selected)
    const filterOptions = getUniqueEntries(headers, courses, "filterBy")

    const tableOptions = [
        <Filters key={1} options={filterOptions} />,
        <Fields
            key={2}
            options={tableHeaders}
            setOptions={setTableHeaders}
        />,
        <Showing key={3} showing={courses.length} total={courses.length} />,
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
                    <FilterOptions options={tableOptions} />
                    <Table
                        headers={selectedHeaders}
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