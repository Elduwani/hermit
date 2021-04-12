import PageContainer from "components/PageContainer";

export default function Home() {
  return (
    <PageContainer title="Hermit" hasFooter>
      <h1 className="text-4xl font-bold text-center space-y-2">
        Home <span className="text-blue-600">Page!</span>
        {/* <span className="block text-2xl text-gray-500 font-normal">Sign in to your account</span> */}
      </h1>
    </PageContainer>
  )
}
