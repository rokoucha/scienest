import { Metadata } from 'next'
import React from 'react'
import { saveArticle } from '../../../actions/article'
import { articleService } from '../../../app'
import { auth } from '../../../auth'
import { Editor } from '../../../components/Editor'
import { Footer } from '../../../components/Footer'
import { Header } from '../../../components/Header'
import { Main } from '../../../components/Main'
import { Scope } from '../../../model/scope'

export const runtime = 'edge'

type Props = Readonly<{ params: { title: [string] } }>

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const signedIn = await auth().then((s) => s !== null)

  const title = decodeURIComponent(params.title.at(0)!).replaceAll('_', ' ')

  const article = await articleService.findOneByTitle({ title, signedIn })

  return {
    title: `Edit ${article?.title ?? title}`,
    robots: {
      follow: false,
      index: false,
    },
  }
}

const Page: React.FC<Props> = async ({ params }) => {
  const signedIn = await auth().then((s) => s !== null)

  const title = decodeURIComponent(params.title.at(0)!).replaceAll('_', ' ')

  const article = await articleService.findOneByTitle({ title, signedIn })

  return (
    <>
      <Header editing={true} signedIn={signedIn} title={title} />
      <Main>
        <div>
          <form action={saveArticle}>
            <input name="id" type="hidden" defaultValue={article?.id ?? ''} />
            <div>
              <label htmlFor="scope">公開範囲</label>
              <select
                id="scope"
                name="scope"
                defaultValue={article?.scope ?? Scope.Private}
              >
                <option value={Scope.Public}>公開</option>
                <option value={Scope.Protected}>限定公開</option>
                <option value={Scope.Private}>非公開</option>
              </select>
            </div>
            <div>
              <Editor raw={article?.raw ?? `# ${title}`} />
            </div>
            <div>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </Main>
      <Footer />
    </>
  )
}
export default Page
