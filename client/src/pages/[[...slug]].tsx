import type { GetServerSideProps, NextPage } from 'next'
import type React from 'react'
import { toPage, type PageJson } from 'scienest-common'
import { findBySlug } from '../api'
import { Viewer } from '../components/viewer'
import { queryToSlug } from '../utils'
import { Editor } from '../components/editor'
import { Header } from '../components/header'
import { Footer } from '../components/footer'

type ViewerPageProps = {
  editorMode: boolean
  page: PageJson
}

export const getServerSideProps: GetServerSideProps<ViewerPageProps> = async (
  ctx,
) => {
  const editorMode = 'edit' in ctx.query

  const slug = queryToSlug(ctx.query.slug)

  if (slug.length === 0) slug.push('index')

  const page = await findBySlug(slug.join('/'))

  return {
    notFound: editorMode === false && page === null,
    props: {
      editorMode,
      page: page ?? {
        content: '',
        contentId: '',
        createdAt: new Date().toISOString(),
        description: '',
        id: '',
        scope: 'private',
        slug: slug.join('/'),
        tags: [],
        title: '',
        updatedAt: new Date().toISOString(),
      },
    },
  }
}

const ViewerPage: NextPage<ViewerPageProps> = ({
  editorMode,
  page: rawPage,
}) => {
  const page = toPage(rawPage)

  return (
    <div>
      <Header />
      {editorMode ? (
        <Editor
          content={page.content}
          isExists={page.id !== ''}
          slug={page.slug}
        />
      ) : (
        <Viewer content={page.content} slug={page.slug} title={page.title} />
      )}
      <Footer />
    </div>
  )
}

export default ViewerPage
