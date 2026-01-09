import WrapperLayout from "../../../../components/wrapperLayout"
import ProjectHeader from "./project-header"
import ProjectServer from "./project-server"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ProjectSection() {
  return (
    <div className="bg-gray-50 dark:bg-zinc-900">
      <WrapperLayout>
        <section id="projects" className="container mx-auto py-16">
          <ProjectHeader />
          <ProjectServer />

          <div className="text-center mt-12">
            <Link href="/project">
              <Button variant="outline">
                Lihat Semua Proyek
              </Button>
            </Link>
          </div>

        </section>
      </WrapperLayout>
    </div>
  )
}
