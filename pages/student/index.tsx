import PageContainer from "components/PageContainer";
import { Student } from '.prisma/client';
import prisma from "db"
import Table from "../../components/Table"
import Button from "components/Button";
import { Fields, Filters, Showing } from "components/RecordFilters";
import { _StringKeys, _TableHeader } from "utils/types";
import { useState } from "react";
import { getUniqueEntries } from "utils/utils";
import Modal from "components/Modal";
import TabularForm from "components/TabularForm";

interface Props {
    students: Student[],
}

const headers: _TableHeader[] = [
    { name: "first_name", key: "firstName", useForm: true },
    { name: "last_name", key: "lastName", useForm: true },
    { name: "email", useForm: true },
    {
        name: "level",
        filterBy: true,
        useForm: {
            type: "select",
            options: [100, 200, 300, 400]
        }
    },
]

export default function Index({ students }: Props) {
    const [modal, setModal] = useState(false)
    const [tableHeaders, setTableHeaders] = useState(headers.map(header => ({ ...header, selected: true })))
    const selectedHeaders = tableHeaders.filter(header => header.selected)

    const [filteredRecords, setFilteredRecords] = useState<Student[]>([])
    const data = filteredRecords.length ? filteredRecords : students
    const filterOptions = getUniqueEntries(headers, students, "filterBy")

    return (
        <PageContainer>
            <div className="flex justify-between">
                <h1 className="text-4xl border font-bold text-gray-700 capitalize">Students</h1>
                <span>
                    <Button variant="light-gray">Add Student</Button>
                </span>
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
                    <Showing showing={data.length} total={students.length} />
                </div>
            }

            <TabularForm
                headers={headers}
                mutationUrl="students"
            />

            {
                students.length > 0 &&
                <Table
                    headers={selectedHeaders}
                    data={data}
                />
            }
        </PageContainer>
    )
}

export const getStaticProps = async () => {
    const students = await prisma.student.findMany({
        include: {
            Department: true,
            Major: true
        }
    })
    return {
        props: { students },
    }
}