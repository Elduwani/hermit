import PageContainer from "components/PageContainer";
import { Student } from '.prisma/client';
import Table from "../../components/Table"
import Button from "components/Button";
import { Fields, Filters, Showing } from "components/RecordFilters";
import { _StringKeys, _TableHeader } from "types";
import { useState } from "react";
import { getUniqueEntries } from "utils/utils";
import TabularForm from "components/TabularForm";
import { useFetch } from "utils/fetch";

const headers: _TableHeader[] = [
    { name: "first_name", key: "firstName", useForm: { required: true } },
    { name: "last_name", key: "lastName", useForm: { required: true } },
    { name: "email", capitalize: false, useForm: { type: "email", required: true } },
    {
        name: "level",
        filterBy: true,
        useForm: {
            inputType: "select",
            options: [100, 200, 300, 400],
            modifier: (v) => +v
        }
    },
]

export default function Index() {
    const [showForm, setShowForm] = useState(false)
    const [filteredRecords, setFilteredRecords] = useState<Student[]>([])
    const [tableHeaders, setTableHeaders] = useState(headers.map(header => ({ ...header, selected: true })))
    const selectedHeaders = tableHeaders.filter(header => header.selected)

    const { data = [], refetch } = useFetch({ url: "/api/students", key: "students" })

    const students: Student[] = data
    const _data = filteredRecords.length ? filteredRecords : students
    const filterOptions = getUniqueEntries(headers, students, "filterBy")

    const requiredFields = {
        department: students[0]?.department,
        faculty: students[0]?.faculty
    }

    return (
        <PageContainer>
            <div className="flex justify-between">
                <h1 className="text-4xl border font-bold text-gray-700 capitalize">Students</h1>
                {
                    !showForm &&
                    <span>
                        <Button variant="light-gray" onClick={() => setShowForm(true)}>Add Students</Button>
                    </span>
                }
            </div>
            {
                students.length > 0 &&
                <div className="flex space-x-4">
                    <Filters
                        options={filterOptions}
                        setOptions={setFilteredRecords}
                        records={students}
                        clearOptions={() => setFilteredRecords([])}
                    />
                    <Fields options={tableHeaders} setOptions={setTableHeaders} />
                    <Showing showing={_data.length} total={students.length} />
                </div>
            }

            {
                showForm &&
                <TabularForm
                    headers={headers}
                    mutationUrl="/api/students"
                    close={() => setShowForm(false)}
                    requiredFields={requiredFields}
                    refetch={refetch}
                />
            }

            {
                students.length > 0 &&
                <Table
                    headers={selectedHeaders}
                    data={_data}
                    goto={["/student/", "id"]}
                />
            }
        </PageContainer>
    )
}