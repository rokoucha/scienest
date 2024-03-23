import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Main } from '../../components/Main'

export const runtime = 'edge'

export default async function Page() {
  return (
    <>
      <Header editing={false} signedIn={true} title={''} />
      <Main>
        <h1>Admin</h1>
        <hr />
        <ul></ul>
      </Main>
      <Footer />
    </>
  )
}
