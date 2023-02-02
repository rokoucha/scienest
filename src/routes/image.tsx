import {
  ActionArgs,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/cloudflare'
import { Form } from '@remix-run/react'
import * as PImage from 'pureimage'
import { Stream, toReadableStream } from '../stream'

export const action = async ({ request }: ActionArgs) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    unstable_createMemoryUploadHandler(),
  )

  const image = formData.get('img')
  if (!image || !(image instanceof File)) {
    throw new Response('Bad Request', {
      status: 400,
    })
  }

  const hoge = await PImage.decodePNGFromStream(
    new Stream({ data: new Uint8Array(await image.arrayBuffer()) }),
  )

  const canvas = PImage.make(100, 100, {})

  const ctx = canvas.getContext('2d')

  ctx.drawImage(hoge, 0, 0, hoge.width, hoge.height, 0, 0, 100, 100)

  const { from, to } = toReadableStream()

  await PImage.encodePNGToStream(canvas, from)

  return new Response(to, {
    headers: {
      'Content-Type': 'image/png',
    },
  })
}

export default function Image() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <h1>Add new Post</h1>
      <div>
        <Form method="post" encType="multipart/form-data">
          <div>
            <input type="file" name="img" />
          </div>
          <div>
            <button type="submit">Post</button>
          </div>
        </Form>
      </div>
    </div>
  )
}
