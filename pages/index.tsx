import { GetStaticProps } from 'next'
import Link from "next/link"
import PageContainer from "components/PageContainer";
import { Faculty } from '.prisma/client';
import { prisma } from "../utils/fetch"

type Props = {
  faculties: Faculty[],
}

export default function Home({ faculties }: Props) {

  return (
    <PageContainer title="Hermit">
      <div className="border">
        {
          faculties.map((faculty) => {
            return (
              <div className="capitalize" key={faculty.id}>
                <Link href={`/faculty/${encodeURIComponent(faculty.id)}`}>
                  <a>{faculty.name}</a>
                </Link>
              </div>
            )
          })
        }
      </div>
    </PageContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const faculties = await prisma.faculty.findMany()

  return {
    props: {
      faculties,
    },
  }
}