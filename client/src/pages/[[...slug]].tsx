import type { GetServerSideProps, NextPage } from 'next'
import type React from 'react'
import {
  type Page,
  toPage,
  type PageBase,
  type PageJson,
} from 'scienest-common'
import { findBySlug } from '../api'
import { Container } from '../components/container'
import { Viewer } from '../components/viewer'
import { queryToSlug } from '../utils'
import { Editor } from '../components/editor'

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
        id: '',
        scope: 'private',
        slug: slug.join('/'),
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
    <Container>
      {editorMode ? (
        <Editor
          content={page.content}
          isExists={page.id !== ''}
          slug={page.slug}
        />
      ) : (
        <Viewer content={page.content} slug={page.slug} />
      )}
    </Container>
  )
}
export default ViewerPage
