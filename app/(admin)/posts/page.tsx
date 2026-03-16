import PageTitle from '@/components/page-title'
import Link from 'next/link' 
import { Button } from '@/components/ui/button'

export default function CreatePostPage() {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <PageTitle title='Halaman admin blog' description='halaman untuk create blog' />
        <Link href={'/posts/create'}>
          <Button className='cursor-pointer'>
            Tambah Post
          </Button>
        </Link>
      </div>
    </div>
  )
}