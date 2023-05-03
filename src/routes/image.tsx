import {
  ActionArgs,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from '@remix-run/cloudflare'
import { Form } from '@remix-run/react'
import * as PImage from 'pureimage'
import { Bitmap } from 'pureimage/types/bitmap'
import { Stream, toReadableStream } from '../stream'

export const action = async ({ request }: ActionArgs) => {
  const formData = await unstable_parseMultipartFormData(
    request,
    unstable_createMemoryUploadHandler(),
  )

  const file = formData.get('img')
  if (!file || !(file instanceof File)) {
    throw new Response('Bad Request', {
      status: 400,
    })
  }

  console.log(file)

  let image: Bitmap
  switch (file.type) {
    case 'image/png': {
      image = await PImage.decodePNGFromStream(
        new Stream({ data: new Uint8Array(await file.arrayBuffer()) }),
      )
      break
    }

    case 'image/jpeg': {
      image = await PImage.decodeJPEGFromStream(
        new Stream({ data: new Uint8Array(await file.arrayBuffer()) }),
      )
      break
    }

    default:
      throw new Error('Invalid file type')
  }

  const canvas = PImage.make(100, 100, {})

  const ctx = canvas.getContext('2d')

  ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 100, 100)

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
