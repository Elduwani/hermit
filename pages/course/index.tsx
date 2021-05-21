import PageContainer from "components/PageContainer";
import { Course } from '.prisma/client';
import Table from "../../components/Table"
import Button from "components/Button";
import { Fields, Filters, Showing } from "components/RecordFilters";
import { _StringKeys, _TableHeader } from "types";
import { useState } from "react";
import { getUniqueEntries } from "utils/utils";
import TabularForm from "components/TabularForm";
import { useFetch } from "utils/fetch";

const headers: _TableHeader[] = [
    { name: "title", useForm: { required: true } },
    { name: "course_code", key: "code", useForm: { required: true } },
    { name: "credit", filterBy: true, useForm: { required: true } },
    { name: "semester", filterBy: true, useForm: { required: true } },
    { name: "level", filterBy: true, useForm: { required: true } },
    {
        name: "elective",
        modifier: (val) => !!val ? "yes" : "no",
        useForm: {
            inputType: "select",
            options: ["Yes", "No"],
            modifier: (val) => val === "yes" ? true : false,
            required: true
        }
    },
]

export default function Index() {
    const [showForm, setShowForm] = useState(false)
    const [filteredRecords, setFilteredRecords] = useState<Course[]>([])
    const [tableHeaders, setTableHeaders] = useState(headers.map(header => ({ ...header, selected: true })))
    const selectedHeaders = tableHeaders.filter(header => header.selected)

    const { data = [], refetch } = useFetch({ url: "/api/courses", key: "courses" })

    const courses: Course[] = data
    const _data = filteredRecords.length ? filteredRecords : courses
    const filterOptions = getUniqueEntries(headers, courses, "filterBy")

    const requiredFields = {
        department: courses[0]?.department,
    }

    return (
        <PageContainer>
            <div className="flex justify-between">
                <h1 className="text-4xl border font-bold text-gray-700 capitalize">Courses</h1>
                {
                    !showForm &&
                    <span>
                        <Button variant="light-gray" onClick={() => setShowForm(true)}>Add Course</Button>
                    </span>
                }
            </div>
            {
                courses.length > 0 &&
                <div className="flex space-x-4">
                    <Filters
                        options={filterOptions}
                        setOptions={setFilteredRecords}
                        records={courses}
                        clearOptions={() => setFilteredRecords([])}
                    />
                    <Fields options={tableHeaders} setOptions={setTableHeaders} />
                    <Showing showing={_data.length} total={courses.length} />
                </div>
            }

            {
                showForm &&
                <TabularForm
                    headers={headers}
                    mutationUrl="/api/courses"
                    close={() => setShowForm(false)}
                    requiredFields={requiredFields}
                    refetch={refetch}
                />
            }

            {
                courses.length > 0 &&
                <Table
                    headers={selectedHeaders}
                    data={_data}
                />
            }
        </PageContainer>
    )
}