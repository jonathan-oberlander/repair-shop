import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <div className="px-2 w-full">
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl">Not Found</h2>
        <p>Could not find requested resource</p>
        <Image
          className="m-0 rounded-xl"
          width={300}
          height={300}
          sizes="300px"
          alt="Page Not Found"
          title="Page Not Found"
          priority={true}
          src="/images/not-found-1024x1024.png"
        />
      </div>
    </div>
  )
}
