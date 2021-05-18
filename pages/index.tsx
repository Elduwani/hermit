import PageContainer from "components/PageContainer";
// import prisma from "db"

export default function Home() {

  return (
    <PageContainer>
      <div className="border h-1/3"></div>
      <div className="border h-1/3"></div>
      <div className="border h-1/3"></div>
    </PageContainer>
  )
}

export const getStaticProps = async () => {
  // const faculties = await prisma.faculty.findMany()

  return {
    props: {
      // faculties,
    },
  }
}